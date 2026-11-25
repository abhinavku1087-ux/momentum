const day = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const date = s => new Date(s+'T12:00:00');
const add = (s,n) => {let d=date(s);d.setDate(d.getDate()+n);return day(d)};
const week = s => add(s,-((date(s).getDay()+6)%7));
const diff = (a,b) => Math.round((Date.parse(a)-Date.parse(b))/86400000);
function isRest(h,s){return (h.rest||[]).includes(s)}
function scheduled(h,s){return !isRest(h,s) && s>=h.start && (h.mode==='daily'||h.mode==='weekly'||(h.mode==='days'&&h.days.includes(date(s).getDay()))||(h.mode==='interval'&&diff(s,h.start)%h.interval===0));}
function stats(h,t){let done=new Set(h.done.filter(s=>s>=h.start&&s<=t&&!isRest(h,s))),run=0,best=0; if(h.mode==='weekly'){for(let w=week(h.start);w<=week(t);w=add(w,7)){let n=[...done].filter(s=>week(s)===w).length;let target=Math.min(h.target,Array.from({length:7},(_,i)=>add(w,i)).filter(s=>s>=h.start&&!isRest(h,s)).length);if(target&&n>=target)run++;else if(target&&w!==week(t))run=0;best=Math.max(best,run);}}else{for(let s=h.start;s<=t;s=add(s,1)){if(!scheduled(h,s))continue;if(done.has(s))run++;else if(s!==t)run=0;best=Math.max(best,run);}}return {run,best,total:done.size};}
if(typeof module!=='undefined')module.exports={day,add,week,scheduled,stats};
