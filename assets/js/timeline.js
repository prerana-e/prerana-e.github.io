import { timeline } from '/data/timeline.js';
import { setYear } from './utils.js';
setYear();

const track=document.getElementById('timelineTrack');

timeline.forEach(ev=>{
  const div=document.createElement('div');
  div.className='timeline-event';
  div.innerHTML=`<span class=meta>${ev.date}</span><h3>${ev.title}</h3><p>${ev.summary}</p>`;
  track.appendChild(div);
});

function updateActive(){
  const rect=track.getBoundingClientRect();
  const center=rect.left + rect.width/2;
  let closest=null; let min=Infinity;
  track.querySelectorAll('.timeline-event').forEach(el=>{
    const r=el.getBoundingClientRect();
    const c=r.left + r.width/2;
    const d=Math.abs(c-center);
    if(d<min){min=d;closest=el;}
  });
  track.querySelectorAll('.timeline-event').forEach(el=>el.classList.toggle('active',el===closest));
}

let ticking=false;
function onScroll(){ if(!ticking){ requestAnimationFrame(()=>{ updateActive(); ticking=false; }); ticking=true; } }
const wrapper=document.getElementById('timelineWrapper');
wrapper.addEventListener('scroll',onScroll);
window.addEventListener('resize',updateActive);

// Drag-to-scroll enhancement
let isDown=false,startX,scrollLeft;
wrapper.addEventListener('pointerdown',e=>{isDown=true;wrapper.classList.add('dragging');startX=e.pageX-wrapper.offsetLeft;scrollLeft=wrapper.scrollLeft;wrapper.setPointerCapture(e.pointerId);});
wrapper.addEventListener('pointerleave',()=>{isDown=false;wrapper.classList.remove('dragging');});
wrapper.addEventListener('pointerup',e=>{isDown=false;wrapper.classList.remove('dragging');wrapper.releasePointerCapture(e.pointerId);});
wrapper.addEventListener('pointermove',e=>{if(!isDown) return; e.preventDefault(); const x=e.pageX-wrapper.offsetLeft; const walk=(x-startX)*1.25; wrapper.scrollLeft=scrollLeft-walk;});

updateActive();
