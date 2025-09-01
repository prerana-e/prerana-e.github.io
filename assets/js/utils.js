export function unique(array){return [...new Set(array)];}
export function create(tag, cls){const el=document.createElement(tag); if(cls) el.className=cls; return el;}
export function setYear(){const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();}
setYear();
