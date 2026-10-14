/* Dev Mode 4903:68101: parallel comparison; 4903:68171: variants at 0/9/20s.
   One suspended clock per sequence; no hidden-tab playback or individual loops. */
(() => {
  const config=window.caseStudyV2;
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const videos=[...document.querySelectorAll('[data-flow-video]')];
  const controllers=[];
  let language=document.documentElement.lang;
  function copy(){return config.translations[language];}
  function sync(lang){
    language=lang;
    const text=copy();
    document.querySelector('meta[property="og:locale"]').content=lang==='es'?'es_AR':'en_US';
    for(const name of ['title','description'])document.querySelector('meta[name="twitter:'+name+'"]').content=name==='title'?config.titles[lang]:config.descriptions[lang];
    const hero=document.querySelector('.rml-hero-image img');
    for(const [attribute,key,value] of [['property','og:image',hero.src],['property','og:url',location.href],['name','twitter:image',hero.src]]){
      let meta=document.querySelector('meta['+attribute+'="'+key+'"]');
      if(!meta){meta=document.createElement('meta');meta.setAttribute(attribute,key);document.head.append(meta);}
      meta.content=value;
    }
    const graph=[{'@type':'CreativeWork',name:config.titles[lang],description:config.descriptions[lang],inLanguage:lang,author:{'@type':'Person',name:'David Montealegre'},image:hero.src,url:location.href,creativeWorkStatus:'In progress'}];
    videos.forEach((video,i)=>{
      const metadata=config.media[i];
      const item={'@type':'VideoObject',name:text['video'+(i+1)+'Caption'],description:text['video'+(i+1)+'Description'],inLanguage:lang,thumbnailUrl:video.poster,contentUrl:video.querySelector('source').src,duration:'PT'+Number(metadata.duration.toFixed(3))+'S'};
      if(metadata.created)item.dateCreated=metadata.created;
      graph.push(item);
    });
    document.querySelector('#country-schema').textContent=JSON.stringify({'@context':'https://schema.org','@graph':graph});
    document.querySelectorAll('[data-nav-label]').forEach(link=>link.setAttribute('aria-label',text[link.dataset.navLabel]));
    document.querySelectorAll('.v2-contact-link').forEach(link=>link.setAttribute('aria-label',link.textContent.trim()+(link.target==='_blank'?' — '+text.external:'')));
    controllers.forEach(c=>c.update());
  }
  document.addEventListener('case-language-change',({detail:{lang}})=>sync(lang));
  document.body.classList.add('country-media-ready');
  for(const gallery of document.querySelectorAll('[data-playback]')){
    const group=[...gallery.querySelectorAll('video')];
    const visible=new Set();
    const sequence=gallery.dataset.playback==='sequence';
    const starts=[0,9000,20000];
    const groupButton=gallery.querySelector('[data-group-control]');
    let active=0,elapsed=0,runningSince=null,frame=0,started=false,userPaused=false,finished=false,manual=false;
    const buttons=group.map(v=>v.parentElement.querySelector('[data-video-control]'));
    function suspend(){
      if(runningSince!==null)elapsed+=performance.now()-runningSince;
      runningSince=null;cancelAnimationFrame(frame);
    }
    function update(){
      buttons.forEach((button,i)=>{
        const playing=!group[i].paused;
        button.textContent=copy()[playing?'pauseVideo':'playVideo'];
        button.setAttribute('aria-label',button.textContent+': '+copy()['video'+group[i].dataset.videoIndex+'Caption']);
        button.setAttribute('aria-controls','country-video-'+group[i].dataset.videoIndex);
      });
      if(groupButton){
        groupButton.textContent=copy()[group.some(v=>!v.paused)?'pauseGroup':'playGroup'];
        groupButton.setAttribute('aria-label',groupButton.textContent);
      }
    }
    function pause(){suspend();group.forEach(v=>v.pause());update();}
    function eligible(){return !document.hidden&&!userPaused&&!finished&&(!reduced.matches||manual)&&(sequence?visible.has(group[active]):visible.size>0);}
    function play(){
      if(!eligible())return;
      started=true;
      const targets=sequence?[group[active]]:group.filter(video=>!video.ended);
      targets.forEach(video=>{video.muted=true;video.play().catch(()=>{userPaused=true;pause();});});
    }
    function select(index){
      pause();active=index;elapsed=starts[index];finished=false;
      group[active].currentTime=0;play();
    }
    function tick(now){
      if(!eligible()){pause();return;}
      const time=elapsed+(runningSince===null?0:now-runningSince);
      if(active<group.length-1&&time>=starts[active+1]){select(active+1);return;}
      frame=requestAnimationFrame(tick);
    }
    group.forEach((video,i)=>{
      video.id='country-video-'+video.dataset.videoIndex;
      video.controls=false;video.loop=false;
      const button=buttons[i];
      button.addEventListener('click',()=>{
        manual=true;
        if(!video.paused){userPaused=true;pause();}
        else{
          userPaused=false;finished=false;
          if(sequence&&active!==i)select(i);
          else{if(video.ended){video.currentTime=0;if(sequence)elapsed=starts[i];}play();}
        }
      });
      video.addEventListener('playing',()=>{
        if(!eligible()||(sequence&&i!==active)){video.pause();return;}
        if(sequence&&runningSince===null){runningSince=performance.now();frame=requestAnimationFrame(tick);}
        update();
      });
      video.addEventListener('pause',()=>{if(sequence&&i===active)suspend();update();});
      video.addEventListener('waiting',()=>{if(sequence&&i===active)suspend();});
      video.addEventListener('ended',()=>{
        if(sequence){
          if(i!==active)return;
          suspend();
          if(active===group.length-1){finished=true;update();}
          else select(active+1);
        }else if(group.every(v=>v.ended)){finished=true;update();}
      });
    });
    groupButton?.addEventListener('click',()=>{
      manual=true;
      if(group.some(v=>!v.paused)){userPaused=true;pause();}
      else{userPaused=false;finished=false;if(group.some(v=>v.ended))group.forEach(v=>{v.currentTime=0;});play();}
    });
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting&&entry.intersectionRatio>0)visible.add(entry.target);else visible.delete(entry.target);});
      if(eligible())play();else pause();
    },{threshold:[0,.01,.5]});
    group.forEach(v=>observer.observe(v));
    document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else play();});
    reduced.addEventListener('change',()=>{manual=false;if(reduced.matches)pause();else play();});
    controllers.push({update});update();
  }
  sync(language);
})();
