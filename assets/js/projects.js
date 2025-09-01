import { projects } from '/data/projects.js';
import { unique, setYear } from './utils.js';
setYear();

const state={filter:null};
const grid=document.getElementById('projects-grid');
const filtersEl=document.getElementById('project-filters');

function apply(){
  grid.innerHTML='';
  projects.filter(p=>!state.filter||p.skills.includes(state.filter)).forEach(p=>{
    const a=document.createElement('a');
    a.href=p.url || `/projects/${p.slug}.html`;
    a.className='card';
    a.innerHTML=`<h3>${p.title}</h3><p>${p.summary}</p><div class="tag-list">${p.skills.slice(0,5).map(s=>`<span class=tag>${s}</span>`).join('')}</div>`;
    grid.appendChild(a);
  });
}

function renderFilters(){
  const skills=unique(projects.flatMap(p=>p.skills)).sort();
  const allBtn=document.createElement('button'); allBtn.textContent='All'; allBtn.setAttribute('aria-pressed',!state.filter); allBtn.onclick=()=>{state.filter=null; updatePressed(); apply();}; filtersEl.appendChild(allBtn);
  skills.forEach(s=>{const btn=document.createElement('button'); btn.textContent=s; btn.setAttribute('aria-pressed',state.filter===s); btn.onclick=()=>{state.filter=state.filter===s?null:s; updatePressed(); apply();}; filtersEl.appendChild(btn);});
}
function updatePressed(){[...filtersEl.querySelectorAll('button')].forEach(b=>{const val=b.textContent; if(val==='All'){b.setAttribute('aria-pressed',!state.filter);} else {b.setAttribute('aria-pressed',state.filter===val);}});}

renderFilters();
apply();
