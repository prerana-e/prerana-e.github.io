import { projects } from '/data/projects.js';
import { blogPosts } from '/data/blogPosts.js';
import { setYear } from './utils.js';
setYear();

const highlightProjects = projects.filter(p=>p.highlight).slice(0,4);
const highlightPosts = blogPosts.slice(0,3);

function renderProjects(){
  const grid=document.getElementById('project-highlight-grid');
  highlightProjects.forEach(p=>{
    const a=document.createElement('a');
    a.href=p.url || `/projects/${p.slug}.html`;
    a.className='card';
    a.innerHTML=`<h3>${p.title}</h3><p>${p.summary}</p><div class="tag-list">${p.skills.slice(0,4).map(s=>`<span class=tag>${s}</span>`).join('')}</div>`;
    grid.appendChild(a);
  });
}

function renderPosts(){
  const list=document.getElementById('blog-highlight-list');
  highlightPosts.forEach(p=>{
    const a=document.createElement('a');
    a.href=p.url || `/blog/posts/${p.slug}.html`;
    a.className='post-item';
    a.innerHTML=`<h3>${p.title}</h3><p class=meta>${new Date(p.date).toLocaleDateString()} • ${p.tags.slice(0,3).join(', ')}</p><p>${p.summary}</p>`;
    list.appendChild(a);
  });
}

function renderSkills(){
  const ul=document.getElementById('top-skills');
  const freq={};
  projects.forEach(p=>p.skills.forEach(s=>freq[s]=(freq[s]||0)+1));
  const top=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,8).map(e=>e[0]);
  top.forEach(s=>{const li=document.createElement('li');li.textContent=s;ul.appendChild(li);});
}

renderProjects();
renderPosts();
renderSkills();
