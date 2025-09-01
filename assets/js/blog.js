import { blogPosts } from '/data/blogPosts.js';
import { unique, setYear } from './utils.js';
setYear();

const list=document.getElementById('posts-list');
const filtersEl=document.getElementById('blog-filters');
const state={tag:null};

function apply(){
  list.innerHTML='';
  blogPosts.filter(p=>!state.tag||p.tags.includes(state.tag)).forEach(p=>{
    const a=document.createElement('a');
    a.href=p.url || `/blog/posts/${p.slug}.html`;
    a.className='post-item';
    a.innerHTML=`<h3>${p.title}</h3><p class=meta>${new Date(p.date).toLocaleDateString()} • ${p.tags.join(', ')}</p><p>${p.summary}</p>`;
    list.appendChild(a);
  });
}
function renderFilters(){
  const tags=unique(blogPosts.flatMap(p=>p.tags)).sort();
  const allBtn=document.createElement('button'); allBtn.textContent='All'; allBtn.setAttribute('aria-pressed',!state.tag); allBtn.onclick=()=>{state.tag=null; updatePressed(); apply();}; filtersEl.appendChild(allBtn);
  tags.forEach(t=>{const btn=document.createElement('button'); btn.textContent=t; btn.setAttribute('aria-pressed',state.tag===t); btn.onclick=()=>{state.tag=state.tag===t?null:t; updatePressed(); apply();}; filtersEl.appendChild(btn);});
}
function updatePressed(){[...filtersEl.querySelectorAll('button')].forEach(b=>{const val=b.textContent; if(val==='All'){b.setAttribute('aria-pressed',!state.tag);} else {b.setAttribute('aria-pressed',state.tag===val);}});}

renderFilters();
apply();
