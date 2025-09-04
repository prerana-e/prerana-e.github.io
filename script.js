// Navigation toggle for mobile
const navToggle=document.querySelector('.nav-toggle');
const navLinks=document.querySelector('.nav-links');
if(navToggle){
  navToggle.addEventListener('click',()=>{
    const expanded=navToggle.getAttribute('aria-expanded')==='true';
    navToggle.setAttribute('aria-expanded',String(!expanded));
    navLinks.classList.toggle('open');
  });
  // Sidebar mini tag filters (delegate to existing filter buttons if present)
  document.querySelectorAll('.tag-mini').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const tag=btn.getAttribute('data-filter');
      const mainBtn=document.querySelector(`.blog-filters .seg-btn[data-filter="${tag}"]`);
      if(mainBtn){mainBtn.click();}
      // scroll to top of posts area
      const posts=document.getElementById('posts');
      if(posts){posts.scrollIntoView({behavior:'smooth',block:'start'});}
    });
  });
}

// Smooth scroll + highlight for Contact button
document.querySelectorAll('a[data-scroll][href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1);
    const target=document.getElementById(id);
    if(target){
      e.preventDefault();
      // Close mobile menu if open
      if(navLinks && navLinks.classList.contains('open')){
        navLinks.classList.remove('open');
        navToggle && navToggle.setAttribute('aria-expanded','false');
      }
      const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.classList.remove('highlight-pulse');
      if('scrollBehavior' in document.documentElement.style && !prefersReduced){
        target.scrollIntoView({behavior:'smooth', block:'start'});
        setTimeout(()=>target.classList.add('highlight-pulse'),450);
      } else {
        target.scrollIntoView();
        target.classList.add('highlight-pulse');
      }
      setTimeout(()=>target.classList.remove('highlight-pulse'),1800);
    }
  });
});

// Tilt effect (progressive enhancement) - reuses existing CSS transform hover
// Optional: remove if not needed.// Tiny interactions for the sky + UI
(function(){
  // Hero-only initial view: hide other sections until first interaction or 3s
  document.addEventListener('DOMContentLoaded',()=>{
    // Only apply hero-only experience if the page explicitly opts in via class
    if(!document.body.classList.contains('initial-hero-only')) return;
    // If deep-linked (hash present) skip condensed hero state
    if(location.hash && location.hash.length>1){
      document.body.classList.remove('initial-hero-only');
      return;
    }
    const exitHeroOnly=()=>{
      if(!document.body.classList.contains('initial-hero-only')) return;
      document.body.classList.add('initial-hero-only-transition');
      document.body.offsetWidth; // force reflow
      document.body.classList.remove('initial-hero-only');
      window.removeEventListener('scroll',exitHeroOnlyPassive);
      ['keydown'].forEach(evt=>window.removeEventListener(evt,exitHeroOnly));
      hint && hint.remove();
    };
    const exitHeroOnlyPassive=()=>exitHeroOnly();
    ['keydown'].forEach(evt=>window.addEventListener(evt,exitHeroOnly,{once:false,passive:true}));
    window.addEventListener('scroll',exitHeroOnlyPassive,{passive:true});
    let hint;
    setTimeout(()=>{
      if(!document.body.classList.contains('initial-hero-only')) return;
      hint=document.createElement('button');
      hint.type='button';
      hint.className='explore-hint';
      hint.innerHTML='<span>Move mouse or scroll ↓</span>';
      document.body.appendChild(hint);
      requestAnimationFrame(()=>hint.classList.add('show'));
      hint.addEventListener('click',exitHeroOnly);
    },3000);
    if(window.scrollY>10){
      exitHeroOnly();
    }
  });
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Parallax hover for tiles

    // Contact form validation + fake submit (static site)
    const form=document.getElementById('contactForm');
    if(form){
      form.addEventListener('submit',e=>{
        e.preventDefault();
        const status=document.getElementById('formStatus');
        status.textContent='';
        const fields=['name','email','message'];
        let ok=true;
        fields.forEach(id=>{
          const input=form.querySelector('#'+id);
          const group=input.closest('.field-group');
          group.classList.remove('invalid');
          const err=group.querySelector('.field-error');
          err.textContent='';
          if(!input.value.trim()){
            ok=false; group.classList.add('invalid'); err.textContent='Required'; return; }
          if(id==='email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value.trim())){ ok=false; group.classList.add('invalid'); err.textContent='Invalid'; }
        });
        if(!ok){ status.textContent='Please fix the highlighted fields.'; status.className='form-status error'; return; }
        const btn=form.querySelector('.submit-btn'); btn.classList.add('sending'); btn.textContent='Sending…';
        // Simulate async send
        setTimeout(()=>{
          btn.classList.remove('sending'); btn.textContent='Send';
          form.reset();
          status.textContent='Message ready in your email client (or simulated send).';
          status.className='form-status success';
        },900);
      });
    }

    // Theme toggle & persistence
    (function(){
      const prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
      const stored=localStorage.getItem('theme');
      if(stored==='dark' || (!stored && prefersDark)) document.body.classList.add('theme-dark');
      const btn=document.createElement('button');
      btn.className='theme-toggle theme-fab';
      const starCanvasId='starfield';
      function drawStars(){
        const dark=document.body.classList.contains('theme-dark');
        const canvas=document.getElementById(starCanvasId);
        if(!canvas) return;
        if(!dark){
          const ctx=canvas.getContext('2d');
          ctx && ctx.clearRect(0,0,canvas.width,canvas.height);
          return;
        }
        const dpr=window.devicePixelRatio||1;
        canvas.width=window.innerWidth*dpr;
        canvas.height=window.innerHeight*dpr;
        canvas.style.width=window.innerWidth+'px';
        canvas.style.height=window.innerHeight+'px';
        const ctx=canvas.getContext('2d');
        if(!ctx) return;
        ctx.scale(dpr,dpr);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        const starsCount=Math.min(260, Math.round((window.innerWidth*window.innerHeight)/5000));
        for(let i=0;i<starsCount;i++){
          const x=Math.random()*window.innerWidth;
            const y=Math.random()*window.innerHeight;
            const r=Math.random()*1.2 + 0.3;
            const alpha=Math.random()*0.8 + 0.2;
            ctx.beginPath();
            ctx.arc(x,y,r,0,Math.PI*2);
            ctx.fillStyle=`rgba(255,255,255,${alpha})`;
            ctx.fill();
        }
      }
      function sync(){
        const dark=document.body.classList.contains('theme-dark');
        btn.textContent= dark ? '☀️' : '🌙';
        btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        btn.setAttribute('title', btn.getAttribute('aria-label'));
        drawStars();
      }
      sync();
      btn.addEventListener('click',()=>{
        document.body.classList.toggle('theme-dark');
        localStorage.setItem('theme', document.body.classList.contains('theme-dark') ? 'dark':'light');
        sync();
      });
      document.body.appendChild(btn);
      window.addEventListener('resize',()=>{ if(document.body.classList.contains('theme-dark')) drawStars(); }, {passive:true});
      // Redraw on orientation change for mobile
      window.addEventListener('orientationchange',()=>{ setTimeout(drawStars,220); });
    })();

    // Shrink / elevate header on scroll + active link highlight
    (function(){
      const header=document.querySelector('.site-header');
      const sections=[...document.querySelectorAll('main section[id]')];
      const navAnchors=[...document.querySelectorAll('.nav a[href^="#"]')];
      const prog=document.querySelector('.scroll-progress span');
      let lastY=window.scrollY; let ticking=false; let lastHideToggle=0;
      function onScroll(){
        const y=window.scrollY;
        if(header){ if(y>24) header.classList.add('nav-scrolled'); else header.classList.remove('nav-scrolled'); }
        // Auto hide / show
        const now=performance.now();
        if(header && Math.abs(y-lastY)>6 && now-lastHideToggle>150){
          if(y>lastY && y>180){ header.classList.add('hide'); }
          else{ header.classList.remove('hide'); }
          lastHideToggle=now;
        }
        // Active link
        let currentId=null;
        for(const sec of sections){
          const r=sec.getBoundingClientRect();
          if(r.top <= 120 && r.bottom > 160){ currentId=sec.id; break; }
        }
        navAnchors.forEach(a=>{
          if(a.hash.slice(1)===currentId) a.classList.add('is-active'); else a.classList.remove('is-active');
        });
        // Progress
        if(prog){
          const docH=document.documentElement.scrollHeight - window.innerHeight;
          const pct = docH>0 ? (y / docH)*100 : 0;
            prog.style.width=pct.toFixed(2)+'%';
        }
        lastY=y;
      }
      window.addEventListener('scroll',()=>{
        if(!ticking){
          window.requestAnimationFrame(()=>{onScroll(); ticking=false;});
          ticking=true;
        }
      },{passive:true});
      onScroll();
    })();

    // Lazy-load images with blur-up
    function lazyLoad(){
      const imgs=[...document.querySelectorAll('img[data-src]')];
      if(!('IntersectionObserver' in window)){ imgs.forEach(i=>{i.src=i.dataset.src; i.classList.add('loaded');}); return; }
      const io=new IntersectionObserver((entries,observer)=>{
        entries.forEach(e=>{ if(e.isIntersecting){ const img=e.target; img.src=img.dataset.src; img.onload=()=>img.classList.add('loaded'); observer.unobserve(img);} });
      },{rootMargin:'100px'});
      imgs.forEach(img=>io.observe(img));
    }
    lazyLoad();
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

// Generic reveal observer (data-reveal)
(function(){
  const els=[...document.querySelectorAll('[data-reveal]')];
  if(!els.length) return;
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const t=e.target; const delayAttr=t.getAttribute('data-delay');
        if(delayAttr) t.style.setProperty('--delay', String(parseFloat(delayAttr)*1000));
        t.classList.add('in');
        io.unobserve(t);
      }
    });
  },{threshold:0.15, rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>io.observe(el));
})();

// Timeline collapsible behavior (enhanced: allow only one open)
(function(){
  const items=[...document.querySelectorAll('.ti-collapsible')];
  if(!items.length) return;
  items.forEach(det=>{
    const summary=det.querySelector('summary');
    if(summary){
      summary.setAttribute('tabindex','0');
      summary.setAttribute('role','button');
      summary.setAttribute('aria-expanded', String(det.open));
      summary.addEventListener('keydown',e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); summary.click(); } });
    }
    // Card-wide click (outside links/buttons) toggles
    det.addEventListener('click',e=>{
      const summaryEl=summary;
      if(!summaryEl) return;
      if(summaryEl.contains(e.target)) return; // native toggle
      if(e.target.closest('a,button')) return; // don't hijack interactive
      // Toggle manually
      det.open = !det.open;
      // Dispatch toggle event for consistency (not fired automatically when setting .open?)
      det.dispatchEvent(new Event('toggle'));
    });
    det.addEventListener('toggle',()=>{
      if(det.open){
        items.forEach(o=>{ if(o!==det) o.open=false; });
      }
      if(summary) summary.setAttribute('aria-expanded', String(det.open));
    });
  });
})();

// Timeline scroll progress spine
(function(){
  const tl=document.querySelector('.timeline');
  if(!tl) return;
  const items=[...tl.querySelectorAll('.timeline-item')];
  let activeIndex=-1;
  function update(){
    const rect=tl.getBoundingClientRect();
    const vh=window.innerHeight || document.documentElement.clientHeight;
    const total=rect.height; // total pixel height of list
    // Amount scrolled into the timeline viewport-wise
    const entered = Math.min(Math.max(vh - Math.max(rect.top,0), 0), total);
    const progress = total ? (entered / total) * 100 : 0; // percent
    tl.style.setProperty('--tl-progress', progress.toFixed(2));
    // Active node detection: closest item center to viewport center
    const centerY=vh/2;
    let bestIdx=-1; let bestDist=Infinity;
    items.forEach((it,i)=>{
      const r=it.getBoundingClientRect();
      const mid=r.top + r.height/2;
      const dist=Math.abs(mid-centerY);
      if(dist<bestDist){bestDist=dist;bestIdx=i;}
      // passed if item midpoint is above center
      if(mid < centerY - 10) it.classList.add('passed'); else it.classList.remove('passed');
    });
    if(bestIdx!==activeIndex){
      if(activeIndex>=0) items[activeIndex].classList.remove('active');
      activeIndex=bestIdx;
      if(activeIndex>=0) items[activeIndex].classList.add('active','passed');
    }
  }
  ['scroll','resize'].forEach(ev=>window.addEventListener(ev,()=>requestAnimationFrame(update),{passive:true}));
  update();
})();

// Blog enhancements: reading time + filtering
(function(){
  const blog=document.querySelector('.blog-page');
  if(!blog) return;
  // Reading time
  document.querySelectorAll('.post').forEach(post=>{
    const body=post.querySelector('.post-body');
    if(!body) return;
    const words=body.textContent.trim().split(/\s+/).length;
    const mins=Math.max(1,Math.round(words/200));
    const rt=post.querySelector('.reading-time');
    if(rt) rt.textContent=`${mins} min read`;
  });
  // Filtering
  const seg=document.querySelector('.blog-filters');
  const search=document.getElementById('blogSearch');
  if(seg){
    const btns=[...seg.querySelectorAll('[data-filter]')];
    const allBtn=seg.querySelector('[data-filter="all"]');
    const pagerEl=document.getElementById('blogPager');
    const posts=[...document.querySelectorAll('.post')].sort((a,b)=> new Date(b.dataset.date)-new Date(a.dataset.date));
    const pageSize=parseInt(document.getElementById('posts').dataset.pageSize||'5',10);
    let currentPage=1;
    function visibleFiltered(){
      const active=btns.filter(b=>b.classList.contains('active') && b!==allBtn).map(b=>b.dataset.filter);
      const q=(search?.value.trim().toLowerCase())||'';
      return posts.filter(p=>{
        const tags=p.dataset.tags.split(',');
        const text=(p.querySelector('h3').textContent+' '+(p.querySelector('.post-body')?.textContent||'')).toLowerCase();
        const tagOk=!active.length || active.every(t=>tags.includes(t));
        const qOk=!q || text.includes(q);
        return tagOk && qOk;
      });
    }
    function render(){
      const filtered=visibleFiltered();
      const totalPages=Math.max(1, Math.ceil(filtered.length / pageSize));
      if(currentPage>totalPages) currentPage=totalPages;
      posts.forEach(p=>p.style.display='none');
      filtered.slice((currentPage-1)*pageSize, currentPage*pageSize).forEach(p=>p.style.display='');
      if(pagerEl){
        pagerEl.innerHTML='';
        if(totalPages>1){
          const mkBtn=(label,page,disabled=false)=>{ const b=document.createElement('button'); b.textContent=label; if(disabled) b.disabled=true; if(page===currentPage && !disabled && typeof page==='number') b.classList.add('active'); b.addEventListener('click',()=>{ if(page!==currentPage && !disabled){ currentPage=page; render(); updateURL(); } }); return b; };
          pagerEl.appendChild(mkBtn('Prev', currentPage-1, currentPage===1));
          for(let i=1;i<=totalPages;i++){ if(i===1||i===totalPages||Math.abs(i-currentPage)<=2){ pagerEl.appendChild(mkBtn(String(i), i)); } else if(Math.abs(i-currentPage)===3){ const gap=document.createElement('button'); gap.textContent='…'; gap.disabled=true; pagerEl.appendChild(gap);} }
          pagerEl.appendChild(mkBtn('Next', currentPage+1, currentPage===totalPages));
        }
      }
    }
    function updateURL(){
      const params=new URLSearchParams(location.search);
      const active=btns.filter(b=>b.classList.contains('active') && b!==allBtn).map(b=>b.dataset.filter);
      const q=search?.value.trim();
      params.delete('tag'); active.forEach(t=>params.append('tag', t));
      if(q) params.set('q', q); else params.delete('q');
      if(currentPage>1) params.set('page', String(currentPage)); else params.delete('page');
      const newUrl=location.pathname + (params.toString()? ('?'+params.toString()):'');
      history.replaceState(null,'',newUrl);
    }
    function apply(){ currentPage=1; render(); updateURL(); }
    btns.forEach(btn=>btn.addEventListener('click',()=>{
      if(btn.dataset.filter==='all'){
        btns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
      } else {
        allBtn.classList.remove('active');
        btn.classList.toggle('active');
        if(!btns.some(b=>b.classList.contains('active') && b!==allBtn)) allBtn.classList.add('active');
      }
      apply();
    }));
    search?.addEventListener('input',()=>{ apply(); });
    // Init from URL
    const params=new URLSearchParams(location.search);
    const initTags=params.getAll('tag');
    const initQ=params.get('q');
    const initPage=parseInt(params.get('page')||'1',10);
    if(initQ && search){ search.value=initQ; }
    if(initTags.length){
      allBtn.classList.remove('active');
      initTags.forEach(t=>{ const b=seg.querySelector(`[data-filter="${t}"]`); if(b) b.classList.add('active'); });
      if(!btns.some(b=>b.classList.contains('active') && b!==allBtn)) allBtn.classList.add('active');
    }
    currentPage = initPage>0 ? initPage : 1;
    render();
  }
})();