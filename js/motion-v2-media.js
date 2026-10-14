/* Dev Mode: internal examples at 0/10/17s; property columns at 0/2/4/6s;
   expressivity examples share one clock. Offscreen/hidden/reduced motion pauses playback. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const groups = [];
  let copy = window.caseStudyV2.translations[document.documentElement.lang];
  document.addEventListener('case-language-change', event => {
    copy = event.detail.copy;
    groups.forEach(updateControl);
  });
  function updateControl(group) {
    group.button.textContent = copy[group.userPaused ? 'play' : 'pause'];
    group.button.setAttribute('aria-pressed', String(group.userPaused));
    if (group.type === 'hero') {
      const displayed = group.videos.filter(video => video.getBoundingClientRect().width > 0);
      group.button.hidden = displayed.length > 0 && displayed.every(video => group.completed.has(video));
    }
  }
  function pause(group) { group.videos.forEach(video => video.pause()); }
  function reset(group) {
    pause(group); group.elapsed = 0; group.lastFrame = 0; group.activeColumn = -1;
    group.completed.clear();
    group.videos.forEach(video => { if (video.readyState) video.currentTime = 0; });
  }
  function play(video) {
    if (video.dataset.playPending || !video.paused || !video.getAttribute('src')) return;
    video.dataset.playPending = 'true'; video.muted = true;
    video.play().catch(() => {}).finally(() => { delete video.dataset.playPending; });
  }
  document.querySelectorAll('[data-media-group]').forEach(element => {
    const type = element.dataset.mediaGroup;
    const videos = [...element.querySelectorAll('video')];
    const button = element.querySelector('[data-media-toggle]');
    const group = {element, type, videos, button, visible:new Set(), completed:new Set(), elapsed:0, lastFrame:0, activeColumn:-1, userPaused:reduced.matches};
    groups.push(group);
    element.querySelector('.motion-media-controls').hidden = !videos.some(video => video.getAttribute('src'));
    videos.forEach(video => { video.preload = type === 'hero' ? 'metadata' : 'none'; });
    button.addEventListener('click', () => {
      group.userPaused = !group.userPaused; group.lastFrame = 0;
      if (group.userPaused) pause(group);
      updateControl(group);
    });
    element.querySelector('[data-media-restart]').addEventListener('click', () => {
      reset(group); group.userPaused = false; updateControl(group);
    });
    videos.forEach(video => {
      video.loop = type === 'internal';
      if (type === 'hero') video.addEventListener('ended', () => {
        group.completed.add(video);
        updateControl(group);
      });
      video.addEventListener('loadedmetadata', () => {
        element.querySelector('.motion-media-controls').hidden = false;
        if (type === 'properties') video.playbackRate = Math.max(1, video.duration);
      });
      video.addEventListener('error', () => { video.controls = false; });
    });
    updateControl(group);
  });
  const observed = new Map(groups.flatMap(group => group.videos.map(video => [video, group])));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const group = observed.get(entry.target);
      if (entry.isIntersecting && entry.intersectionRatio >= .25 && entry.target.getBoundingClientRect().width > 0) {
        group.visible.add(entry.target);
        if (!entry.target.dataset.mediaLoaded) {entry.target.dataset.mediaLoaded='true';entry.target.preload='auto';entry.target.load();}
      }
      else { group.visible.delete(entry.target); entry.target.pause(); }
      group.lastFrame = 0;
      if (group.type === 'hero') updateControl(group);
      // Start the visible mobile row at its own phase; desktop shares the full sequence.
      if (group.type === 'internal' && matchMedia('(max-width:767px)').matches && group.visible.size) {
        const column = Number([...group.visible][0].dataset.column);
        group.elapsed = [0,10000,17000][column]; group.activeColumn = -1;
      }
    });
  }, {threshold:[0,.25]});
  observed.forEach((group,video) => observer.observe(video));
  let frame;
  function tick(now) {
    groups.forEach(group => {
      if (document.hidden || group.userPaused || !group.visible.size) { pause(group);group.lastFrame = 0;return; }
      if (!group.lastFrame) group.lastFrame = now;
      group.elapsed += Math.min(now - group.lastFrame, 100); group.lastFrame = now;
      if (group.type === 'hero') {
        // Complete each visible video once, from left to right. Leaving the
        // viewport pauses the current video without restarting the sequence.
        const next = group.videos.find(video => group.visible.has(video) && !group.completed.has(video));
        group.videos.forEach(video => {
          if (video === next) play(video);
          else video.pause();
        });
      } else if (group.type === 'internal') {
        const lastVideo = group.videos[2];
        const cycle = 17000 + (Number.isFinite(lastVideo.duration) ? lastVideo.duration * 1000 : 10000);
        const elapsed = group.elapsed % cycle;
        const column = elapsed < 10000 ? 0 : elapsed < 17000 ? 1 : 2;
        if (column !== group.activeColumn) {
          pause(group);group.activeColumn = column;
          group.videos.filter(v => Number(v.dataset.column) === column).forEach(v => { if(v.readyState) v.currentTime = 0; });
        }
        group.videos.forEach(video => { if (Number(video.dataset.column) === column && group.visible.has(video)) play(video);else video.pause(); });
      } else if (group.type === 'properties') {
        const elapsed = group.elapsed % 8000;
        const column = Math.floor(elapsed / 2000);
        if (column !== group.activeColumn) {
          pause(group);group.activeColumn = column;
          group.videos.filter(v => Number(v.dataset.column) === column).forEach(v => { if(v.readyState) v.currentTime=0; });
        }
        // Each column plays its one-second examples, then leaves one second to compare.
        group.videos.forEach(video => {
          if (Number(video.dataset.column) === column && elapsed % 2000 < 1000 && group.visible.has(video) && !video.ended) play(video);
          else video.pause();
        });
      } else {
        const visible = group.videos.filter(video => group.visible.has(video));
        if (group.type === 'expressivity') {
          if (!visible.every(video => video.readyState >= 3)) {group.lastFrame = 0;return;}
          const duration = Math.max(...group.videos.map(video => video.duration));
          const cycle = Math.floor(group.elapsed / (duration * 1000));
          if (cycle !== group.activeColumn) {
            group.activeColumn = cycle;
            group.videos.forEach(video => {video.currentTime = 0;});
          }
          const time = (group.elapsed % (duration * 1000)) / 1000;
          visible.forEach(video => {
            const expected = Math.min(time, video.duration);
            if (Math.abs(video.currentTime - expected) > .15) video.currentTime = expected;
            if (expected < video.duration && !video.ended) play(video);
          });
        } else visible.forEach(play);
      }
    });
    frame = requestAnimationFrame(tick);
  }
  reduced.addEventListener('change', () => {
    groups.forEach(group => {
      if (group.type === 'hero') pause(group);
      else reset(group);
      group.userPaused = reduced.matches;updateControl(group);
    });
  });
  document.addEventListener('visibilitychange', () => {
    groups.forEach(group => { group.lastFrame = 0;if(document.hidden) pause(group); });
  });
  frame = requestAnimationFrame(tick);
  addEventListener('pagehide', () => {cancelAnimationFrame(frame);groups.forEach(pause);});
})();
