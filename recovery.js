function recovery(h,now=Date.now()){
 const start=h.recoveryStart, events=[...new Set(h.setbacks||[])].filter(x=>x>=start&&x<=now).sort((a,b)=>a-b);let last=start,best=0;const elapsed=(a,b)=>Math.max(0,b-a-(h.rest||[]).reduce((n,s)=>{let d=new Date(s+"T00:00:00"),e=new Date(d);e.setDate(e.getDate()+1);return n+Math.max(0,Math.min(b,+e)-Math.max(a,+d))},0));
 for(const x of events){best=Math.max(best,elapsed(last,x));last=x}const current=elapsed(last,now);return {current,best:Math.max(best,current),count:events.length,last};
}
function duration(ms){let m=Math.floor(ms/60000);return `${Math.floor(m/1440)}d ${Math.floor(m%1440/60)}h ${m%60}m`}
function recoveryPanel(h){let z=recovery(h),p=el('div',undefined,'recovery-panel');p.append(el('small','TIME SINCE LAST SETBACK'),el('h2',duration(z.current)),el('p',`Personal best: ${duration(z.best)} · Setbacks: ${z.count}`,'muted'));if(!h.archived&&!isRest(h,today())){p.append(button('Log setback',()=>{if(confirm('Record a setback now? Your previous progress will be kept.'))update(h.id,x=>({...x,setbacks:[...x.setbacks,Date.now()]}))}),button('Undo last setback',()=>{if(h.setbacks.length&&confirm('Remove the most recent setback?'))update(h.id,x=>({...x,setbacks:x.setbacks.slice(0,-1)}))}));}return p}
if(typeof module!=='undefined')module.exports={recovery,duration};
