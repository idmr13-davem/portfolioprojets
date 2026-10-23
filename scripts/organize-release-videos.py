#!/usr/bin/env python3
"""Centralize an existing static release's video files and posters, without encoding."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit, quote
import argparse, hashlib, json, posixpath, shutil, unicodedata, zipfile

EXTENSIONS={'.mov','.mp4','.webm','.m4v','.avi','.mkv','.ogv'}
def nfc(value):return unicodedata.normalize('NFC',value)
def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()
class Media(HTMLParser):
    def __init__(self,page):super().__init__();self.page=page;self.posters=set()
    def handle_starttag(self,tag,attrs):
        if tag!='video':return
        for key,value in attrs:
            if key=='poster' and value:
                u=urlsplit(value)
                if not u.scheme and not u.netloc:
                    self.posters.add(nfc(posixpath.normpath(posixpath.join(posixpath.dirname(self.page),unquote(u.path)))))

def organize(root):
    root=Path(root).resolve()
    assert (root/'index.html').is_file(),'Expected a static site root'
    files={nfc(p.relative_to(root).as_posix()):p for p in root.rglob('*') if p.is_file()}
    video={p for p in files if Path(p).suffix.lower() in EXTENSIONS}
    posters=set()
    for path,p in files.items():
        if p.suffix=='.html':
            parser=Media(path);parser.feed(p.read_text());posters.update(parser.posters)
    assert posters<=files.keys(), 'Missing video posters: '+str(posters-files.keys())
    mapping={}
    for old in sorted(video|posters):
        if old.startswith('assets/Videos/'):
            tail=old[len('assets/Videos/'):]
            new='assets/Videos/Home/'+tail if '/' not in tail else old
        elif old.startswith('assets/Motion DS/Videos/'):
            new='assets/Videos/Motion DS/'+old[len('assets/Motion DS/Videos/'):]
        elif old.startswith('assets/Motion DS/v2/'):
            new='assets/Videos/Motion DS/v2/'+old[len('assets/Motion DS/v2/'):]
        elif old.startswith('assets/Registro ML/v2/'):
            new='assets/Videos/Registro/'+Path(old).name
        elif old.startswith('assets/Menores/v2/'):
            new='assets/Videos/Menores/'+Path(old).name
        else:raise AssertionError('Unclassified video asset: '+old)
        if old!=new:mapping[old]=new
    hashes={path:digest(files[path]) for path in video|posters}
    for old,new in mapping.items():
        source=files[old];destination=root/new
        if destination.exists():assert digest(destination)==digest(source),'Name collision: '+new
        destination.parent.mkdir(parents=True,exist_ok=True)
        if source.resolve()!=destination.resolve():
            if not destination.exists():shutil.move(str(source),str(destination))
            else:source.unlink()
    replacements=dict(mapping)
    runtime_text='\n'.join(p.read_text() for p in root.rglob('*') if p.is_file() and p.suffix in {'.html','.css','.js'} )
    # Keep an existing user-supplied MP4 when it has replaced a referenced MOV.
    for path in video:
        if Path(path).suffix.lower()=='.mp4':
            old=str(Path(path).with_suffix('.mov'))
            spellings={old,unicodedata.normalize('NFD',old)}
            variants={v for spelling in spellings for v in [spelling,quote(spelling,safe='/')]}
            if old not in files and any(v in runtime_text for v in variants):replacements[old]=mapping.get(path,path)
    variants=[]
    for old,new in replacements.items():
        for spelling in {old,unicodedata.normalize('NFD',old)}:
            for variant in {spelling,quote(spelling,safe='/')}:
                variants.append((variant,quote(new,safe='/')))
    for p in root.rglob('*'):
        if not p.is_file() or p.suffix not in {'.html','.css','.js','.json'} or p.name=='release-manifest.json':continue
        original=p.read_text();text=original
        for old,new in sorted(set(variants),key=lambda item:-len(item[0])):text=text.replace(old,new)
        if text!=original:p.write_text(text)
    for old,sha in hashes.items():assert digest(root/mapping.get(old,old))==sha,'Changed media bytes: '+old
    for p in root.rglob('*'):
        if p.is_file() and p.suffix.lower() in EXTENSIONS:assert p.relative_to(root).as_posix().startswith('assets/Videos/'),str(p)
    # Remove only folders made empty by the moves.
    for p in sorted(root.rglob('*'),key=lambda p:len(p.parts),reverse=True):
        if p.is_dir() and not any(p.iterdir()):p.rmdir()
    return {'videoCount':len(video),'posterCount':len(posters),'movedAssets':mapping,'updatedLegacyReferences':{k:v for k,v in replacements.items() if k not in mapping}}

def package(root):
    root=Path(root).resolve();items=[]
    for p in sorted(root.rglob('*')):
        if p.is_file() and p.name not in {'.portfolio-generated','release-manifest.json'}:
            items.append({'path':nfc(p.relative_to(root).as_posix()),'bytes':p.stat().st_size,'sha256':digest(p)})
    (root/'release-manifest.json').write_text(json.dumps({'files':items},ensure_ascii=False,indent=2)+'\n')
    archive=root.parent/'portfolio-v2-github-pages.zip'
    with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
        for p in sorted(root.rglob('*')):
            if p.is_file() and p.name!='.portfolio-generated':z.write(p,nfc(p.relative_to(root).as_posix()))
    return archive

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('folder',type=Path);args=parser.parse_args()
    report=organize(args.folder);archive=package(args.folder)
    (args.folder.resolve().parent/'video-asset-relocation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'videos':report['videoCount'],'posters':report['posterCount'],'moved':len(report['movedAssets']),'legacyReferences':report['updatedLegacyReferences'],'zip':str(archive)},ensure_ascii=False))
