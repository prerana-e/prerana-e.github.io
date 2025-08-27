// Tiny interactions for the sky + UI
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Parallax hover for tiles
  const tiles = document.querySelectorAll('.tilt');
  tiles.forEach(tile => {
    tile.addEventListener('mousemove', (e)=>{
      const r = tile.getBoundingClientRect();
      const x = e.clientX - r.left; const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -6;
      const ry = ((x / r.width) - 0.5) * 6;
      tile.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    tile.addEventListener('mouseleave', ()=> tile.style.transform = '');
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    for(const ent of entries){
      if(ent.isIntersecting){
        ent.target.classList.add('reveal');
        observer.unobserve(ent.target);
      }
    }
  },{threshold:0.08});
  document.querySelectorAll('.card,.tile').forEach(el=>observer.observe(el));
})();