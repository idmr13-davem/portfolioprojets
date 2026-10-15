/* Actual media metadata; private local preview is deliberately noindex. */
(() => {
  const media = [
  {
    "file": "Ingreso datos del adulto.mov",
    "bytes": 10084998,
    "audio": false,
    "metadata": [],
    "duration": 20.878333333333334,
    "created": "2026-10-14T15:39:06+00:00"
  },
  {
    "file": "Análisis IA.mov",
    "bytes": 1640211,
    "audio": false,
    "metadata": [],
    "duration": 12.685,
    "created": "2026-10-14T15:44:06+00:00"
  },
  {
    "file": "Invitación al menor.mov",
    "bytes": 1543750,
    "audio": false,
    "metadata": [],
    "duration": 9.68,
    "created": "2026-10-14T15:39:43+00:00"
  },
  {
    "file": "Creación de cuenta.mov",
    "bytes": 739175,
    "audio": false,
    "metadata": [],
    "duration": 7.346666666666667,
    "created": "2026-10-14T16:02:17+00:00"
  }
];
  const config = window.caseStudyV2;
  function sync(lang) {
    const copy = config.translations[lang];
    const title = config.titles[lang], description = config.descriptions[lang];
    document.querySelector('meta[property="og:locale"]').content = lang === 'es' ? 'es_MX' : 'en_US';
    document.querySelector('meta[name="twitter:title"]').content = title;
    document.querySelector('meta[name="twitter:description"]').content = description;
    const hero = document.querySelector('.rml-hero-image img');
    for (const [attribute, key, content] of [['property','og:image',hero.src],['property','og:url',location.href],['name','twitter:image',hero.src]]) {
      let meta = document.querySelector('meta['+attribute+'="'+key+'"]');
      if (!meta) {meta = document.createElement('meta');meta.setAttribute(attribute,key);document.head.append(meta);}
      meta.content = content;
    }
    const graph = [{ '@type':'CreativeWork', name:title, description, inLanguage:lang,
      author:{'@type':'Person', name:'David Montealegre'}, image:hero.src,
      url:location.href, creativeWorkStatus:'In progress' }];
    document.querySelectorAll('[data-flow-video]').forEach((video, i) => {
      const entry = { '@type':'VideoObject', name:copy['video'+(i+1)+'Caption'].replace('\n',' '),
        description:copy['video'+(i+1)+'Description'], thumbnailUrl:video.poster,
        contentUrl:video.querySelector('source').src, duration:'PT'+Number(media[i].duration.toFixed(3))+'S',
        inLanguage:lang };
      if (media[i].created) entry.dateCreated = media[i].created;
      graph.push(entry);
      video.setAttribute('aria-describedby', 'step-'+(i+1)+'-description video-'+(i+1)+'-description');
    });
    document.querySelector('#menores-schema').textContent = JSON.stringify({'@context':'https://schema.org','@graph':graph});
    document.querySelector('.menores-steps').setAttribute('aria-label',lang === 'es' ? 'Pasos para crear la cuenta' : 'Account creation steps');
    document.querySelectorAll('.v2-contact-link').forEach(link => {
      const span = link.querySelector('[data-copy]');
      link.setAttribute('aria-label',span.textContent + (link.target === '_blank' ? ' — ' + copy.external : ''));
    });
  }
  document.addEventListener('case-language-change',({detail:{lang}}) => sync(lang));
  sync(document.documentElement.lang);
  // Dev Mode 4899:3702: one shared timeline, starts at 0 / 20 / 31 / 40s.
  // Visibility, explicit pause and buffering suspend that timeline.
  const videos = [...document.querySelectorAll('[data-flow-video]')];
  const starts = [0, 20000, 31000, 40000];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const visible = new Set();
  let active = 0, elapsed = 0, runningSince = null, animationFrame = 0;
  let started = false, userPaused = false, finished = false;

  function suspendClock() {
    if (runningSince !== null) elapsed += performance.now() - runningSince;
    runningSince = null;
    cancelAnimationFrame(animationFrame);
  }
  function pauseAll() {
    suspendClock();
    videos.forEach(video => video.pause());
  }
  function playActive(manual = false) {
    const video = videos[active];
    if (!started || finished || userPaused || document.hidden || !visible.has(video) || (reduced.matches && !manual)) return;
    videos.forEach(other => { if (other !== video) other.pause(); });
    video.muted = true;
    video.play().catch(() => { suspendClock(); userPaused = true; });
  }
  function tick(now) {
    if (runningSince === null) return;
    const next = starts[active + 1];
    if (next !== undefined && elapsed + now - runningSince >= next) {
      pauseAll();
      elapsed = next;
      active += 1;
      videos[active].currentTime = 0;
      playActive();
      return;
    }
    animationFrame = requestAnimationFrame(tick);
  }
  function toggleVideo(index) {
    const video = videos[index];
    if (index === active && !video.paused) {
      userPaused = true; pauseAll();
      return;
    }
    const switchClip = index !== active || finished || !started;
    pauseAll();
    if (switchClip) { elapsed = starts[index]; video.currentTime = 0; }
    active = index; started = true; finished = false; userPaused = false;
    playActive(true);
  }
  videos.forEach((video, index) => {
    video.loop = false;
    video.autoplay = false;
    video.addEventListener('play', () => {
      // Also enforce exclusivity for native/API playback outside our button.
      if (index !== active) {
        suspendClock();
        videos.forEach(other => { if (other !== video) other.pause(); });
        active = index; elapsed = starts[index];
        started = true; finished = false; userPaused = false;
      }
      videos.forEach(other => { if (other !== video) other.pause(); });
      if (document.hidden || !visible.has(video)) video.pause();
    });
    video.addEventListener('playing', () => {
      if (index !== active || video.paused || reduced.matches) return;
      suspendClock(); runningSince = performance.now();
      animationFrame = requestAnimationFrame(tick);
    });
    video.addEventListener('pause', () => { if (index === active) suspendClock(); });
    video.addEventListener('waiting', () => { if (index === active) suspendClock(); });
    video.addEventListener('ended', () => {
      if (index === active) { suspendClock(); finished = true; }
    });
  });
  const playback = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    if (!started && visible.size && !reduced.matches) started = true;
    if (!visible.has(videos[active])) pauseAll();
    else if (videos[active].paused) playActive();
  }, {threshold:[0,.5]});
  videos.forEach(video => playback.observe(video));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseAll(); else playActive();
  });
  reduced.addEventListener('change', event => {
    if (event.matches) pauseAll();
    else { if (!started && visible.size) started = true; playActive(); }
  });

  // Native controls remain the no-JavaScript fallback; the compact control
  // preserves Figma's phone composition and stays reachable by keyboard.
  document.querySelectorAll('[data-flow-video]').forEach((video, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'menores-video-player';
    video.before(wrapper); wrapper.append(video);
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'menores-video-control';
    wrapper.append(button);
    function label() {
      const lang = document.documentElement.lang;
      const caption = config.translations[lang]['video'+(index+1)+'Caption'].replace('\n',' ');
      button.textContent = video.paused ? '▶' : 'Ⅱ';
      button.setAttribute('aria-label', (lang === 'es' ? (video.paused ? 'Reproducir video: ' : 'Pausar video: ') : (video.paused ? 'Play video: ' : 'Pause video: ')) + caption);
    }
    button.addEventListener('click', () => toggleVideo(index));
    video.addEventListener('play',label); video.addEventListener('pause',label);
    document.addEventListener('case-language-change',label);
    video.controls = false; label();
  });
})();
