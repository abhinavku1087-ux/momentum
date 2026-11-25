const CACHE='momentum-v1.4';const FILES=['./','./index.html','./app.js','./appearance.js','./analytics.js','./insights.js','./recovery.js','./engine.js','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'}))))));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('momentum-')&&k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith(self.registration.scope))return;e.respondWith((async()=>{const c=await caches.open(CACHE);return await c.match(e.request)|| (e.request.mode==='navigate'?await c.match('./index.html'):null)||fetch(e.request)})())});
self.addEventListener('message',e=>{if(e.data==='activate')e.waitUntil(self.skipWaiting())});
