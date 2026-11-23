/* ShroomaDex avatar v21: painted characters + accessories layered over the mushroom house */
const AVV=21,AVD='av/';
/* characters: anchors are [centerX, centerY, width, rotateDeg] in the character's own 512x512 art; 0 = show the item on the display spot instead */
const AVCH={
gnome:{n:'Gnome forager',d:'Toadstool cap, chanterelle haul',head:[252,176,150],own:'hat',
 a:{hat:0,specs:[258,180,100,0],scarf:0,cloak:[214,318,300,0],satchel:[132,352,118,-6],basket:0,stick:[112,300,190,-14],lantern:[92,394,92,0],knife:0,journal:0}},
snail:{n:'Snail rider',d:'A gnome on a very patient snail',head:[192,118,120],own:'hat',
 a:{hat:0,specs:[195,112,46,0],scarf:[192,168,58,0],cloak:0,satchel:[300,300,104,0],basket:[268,212,84,0],stick:[248,176,120,-28],lantern:[454,382,84,0],knife:0,journal:0}},
hen:{n:'Hen',d:'Brought her basket and two chicks',head:[340,110,120],own:'basket',
 a:{hat:[346,52,92,14],specs:0,scarf:[316,196,78,12],cloak:0,satchel:0,basket:0,stick:0,lantern:0,knife:0,journal:0}},
frog:{n:'Frog',d:'Toadstool cap and a little satchel',head:[248,164,170],own:'hat',
 a:{hat:0,specs:[248,156,150,0],scarf:[250,268,120,0],cloak:[248,296,300,0],satchel:0,basket:[392,362,120,0],stick:[412,300,170,-32],lantern:[392,352,100,0],knife:0,journal:0}},
fox:{n:'Fox',d:'Cozy sweater, mushroom basket',head:[226,120,170],own:'basket',
 a:{hat:[228,34,120,-4],specs:[229,124,92,0],scarf:[226,252,110,0],cloak:[230,300,300,0],satchel:[132,320,120,-6],basket:0,stick:[110,300,190,-14],lantern:[100,384,92,0],knife:0,journal:0}}};
const AVCHK=Object.keys(AVCH);
const AVI=[
{id:'stick',n:'Walking stick',s:'hold',p:20},
{id:'basket',n:'Chanterelle basket',s:'bag',p:30},
{id:'journal',n:'Field journal',s:'hold',p:40},
{id:'knife',n:'Mushroom knife',s:'hold',p:50},
{id:'specs',n:'Round spectacles',s:'face',p:60},
{id:'scarf',n:'Mint knit scarf',s:'neck',p:90},
{id:'satchel',n:'Leather satchel',s:'bag',p:120},
{id:'tealhat',n:'Teal gnome hat',s:'hat',p:150},
{id:'toadhat',n:'Red toadstool hat',s:'hat',p:200},
{id:'cloak',n:'Green hooded cloak',s:'back',p:300},
{id:'lantern',n:'Brass lantern',d:'For the Death Cap Detective',s:'hold',ach:'deathcap'},
{id:'goldhat',n:'Gold gnome hat',d:'For the Keeper of the Dex',s:'hat',ach:'dall'}];
const AVIX=Object.fromEntries(AVI.map(i=>[i.id,i]));
const AVSLOTS=['back','bag','hold','neck','face','hat'];/* draw order: back behind the character, the rest on top */
const AVTABS=[['look','Character'],['hat','Hats'],['wear','Wear'],['carry','Carry']];
const AVTABSL={hat:['hat'],wear:['face','neck','back'],carry:['bag','hold']};
const AVDISP=[[446,438,70],[376,458,64],[488,372,56],[312,474,58],[42,470,60]];/* display spots in scene coords */
const SPI='<svg class="spi" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><circle cx="4.5" cy="9" r="2"/><circle cx="19" cy="7.5" r="2.2"/><circle cx="18.5" cy="17" r="1.7"/><circle cx="7" cy="18.5" r="1.9"/><circle cx="11.5" cy="3.6" r="1.4"/></svg>';
const AVSZ={toadhat:[252,256],tealhat:[204,256],goldhat:[209,256],basket:[256,229],satchel:[256,218],stick:[196,251],lantern:[149,256],specs:[256,124],scarf:[247,251],cloak:[256,236],knife:[199,249],journal:[219,256]};
const avSrc=k=>AVD+k+'.webp';
function avImg(k,cx,cy,w,r){const z=AVSZ[k]||[256,256],h=w*z[1]/z[0];return `<image href="${avSrc(k)}" x="${(cx-w/2).toFixed(1)}" y="${(cy-h/2).toFixed(1)}" width="${w}" height="${h.toFixed(1)}"${r?` transform="rotate(${r} ${cx} ${cy})"`:''}/>`}
/* character placed in scene at (CX,CY) with scale CS */
const CX=-26,CY=74,CS=.84;
function avScene(A,o){o=o||{};const ch=AVCH[A.ch]||AVCH.gnome,eq=A.eq||{},back=[],front=[],disp=[];
for(const s of AVSLOTS){const id=eq[s];if(!id||!AVIX[id]||avLocked(AVIX[id]))continue;const an=id in ch.a?ch.a[id]:ch.a[s];(an?(s==='back'?back:front):disp).push([id,an])}
const L=([id,an])=>avImg(id,an[0],an[1],an[2],an[3]);
let s='';if(!o.nohouse)s+=`<image href="${avSrc('house')}" x="168" y="-8" width="368" height="368"/>`;
let c=`<g transform="translate(${CX} ${CY}) scale(${CS})">${back.map(L).join('')}<image href="${avSrc(A.ch in AVCH?A.ch:'gnome')}" x="0" y="0" width="512" height="512"/>${front.map(L).join('')}</g>`;
s+=c+disp.map(([id],i)=>{const d=AVDISP[i%AVDISP.length];return `<ellipse cx="${d[0]}" cy="${d[1]+d[2]*.42}" rx="${d[2]*.42}" ry="7" fill="#36261a" opacity=".16"/>`+avImg(id,d[0],d[1],d[2],0)}).join('');
let vb=o.vb||'0 0 512 512';if(o.head){const h=ch.head,x=CX+h[0]*CS,y=CY+h[1]*CS,w=h[2]*CS;vb=`${(x-w/2).toFixed(0)} ${(y-w/2).toFixed(0)} ${w.toFixed(0)} ${w.toFixed(0)}`}
return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(A.name||'Your avatar')}, ${esc(ch.n)}">${s}</svg>`}
(function(){if(document.getElementById('avcss'))return;const c=document.createElement('style');c.id='avcss';c.textContent=`.avb svg,.avstage svg,.avo.ch svg{width:100%;height:100%;display:block}.avstage{background:var(--noise),radial-gradient(80% 70% at 60% 40%,#f8f0dc,var(--paper2))}.avo.ch{width:31%;min-width:96px;max-width:132px}.avo.ch img{object-fit:contain;padding:2px;box-sizing:border-box}.avopts.big{gap:8px}.avi img{object-fit:contain;padding:10px;box-sizing:border-box}.avi .wh{font-style:italic}.avstage.sm{max-width:220px}`;document.head.appendChild(c)})();
/* ---------- state + migration from the v17 ink avatars ---------- */
const AVOLDP={beanie:40,souwester:90,chantcap:150,overalls:70,sweater:90,slicker:120,xtratuf:150,stick:20,basket:30,journal:40,knife:50,lens:60,slug:100,chicken:180,raven:300,forest:50,muskeg:60,trail:70,beach:80};
const AVMAP={beanie:'tealhat',souwester:'tealhat',chantcap:'toadhat',sweater:'scarf',slicker:'cloak',stick:'stick',basket:'basket',journal:'journal',knife:'knife',lens:'specs',badge:'lantern',gbasket:'goldhat'};
function avMigrate(A){if(A.v===AVV)return A;const own=[],old=A.own||[];let ref=0;
old.forEach(id=>{const n=AVMAP[id];if(n&&AVIX[n]&&!AVIX[n].ach&&!own.includes(n))own.push(n);else if(AVIX[id]&&!AVIX[id].ach&&!own.includes(id)&&!AVOLDP[id])own.push(id);else ref+=AVOLDP[id]||0});
const eq={};Object.values(A.eq||{}).forEach(id=>{const n=AVMAP[id]||id,i=AVIX[n];if(i&&(own.includes(n)||(i.ach&&!avLocked(i))))eq[i.s]=n});
if(old.length||A.eq){A.legacy={own:old,eq:A.eq,base:A.base}}
A.own=own;A.eq=eq;A.ch=AVCH[A.ch]?A.ch:'gnome';if(ref){A.spent=Math.max(0,(A.spent||0)-ref);A.refund=ref}
['base','skin','cap','capc','spots','face','hair','beard'].forEach(k=>delete A[k]);A.v=AVV;return A}
let avTab='look';
function avState(){const A=avGet(),v=A.v;avMigrate(A);A.own=A.own||[];A.eq=A.eq||{};if(v!==AVV&&(A.name||A.own.length||A.refund))avPut(A);return A}
const avLocked=i=>i.ach&&!(st.ach&&st.ach[i.ach]);
function avOwns(A,i){return i.ach?!avLocked(i):A.own.includes(i.id)}
function avThumb(){const b=$('#avb');if(!b)return;const A=avState();b.hidden=false;b.innerHTML=avScene(A,{head:1,nohouse:1});b.title=(A.name||'Your avatar')+' (Journal)'}
function avSave(A){avPut(A);avThumb()}
function avWith(A,ov){const c=JSON.parse(JSON.stringify(A));if(ov){if(ov.ch)c.ch=ov.ch;if(ov.id)c.eq[ov.s]=ov.id}return c}
const avWhere=(A,i)=>(AVCH[A.ch]||AVCH.gnome).a[i.id]?'Worn':'Shown beside';
function avDraw(){const box=$('#avpage');if(!box)return;const A=avState(),bal=spores(),ch=AVCH[A.ch];
const tabs=`<div class="avtabs" role="tablist">${AVTABS.map(([k,n])=>`<button class="avt ${avTab===k?'on':''}" role="tab" aria-selected="${avTab===k}" data-t="${k}">${n}</button>`).join('')}</div>`;
let body='';
if(avTab==='look'){body=`<div class="avopts big">${AVCHK.map(k=>`<button class="avo ch ${A.ch===k?'on':''}" data-c="${k}" aria-pressed="${A.ch===k}"><img alt="" src="${avSrc(k)}">${AVCH[k].n}</button>`).join('')}</div><p class="mute">Characters are free. Accessories move with you; anything that doesn’t fit a character sits on display beside them.</p>`}
else{const L=AVI.filter(i=>AVTABSL[avTab].includes(i.s));body=`<div class="avshop">${L.map(i=>{const own=avOwns(A,i),on=A.eq[i.s]===i.id,lk=avLocked(i);return `<button class="avi ${on?'on':''} ${lk?'lk':''}" data-i="${i.id}" aria-pressed="${on}"><img alt="" loading="lazy" src="${avSrc(i.id)}"><b>${esc(i.n)}</b><small>${lk?'🔒 Earn the “'+esc(ACHX[i.ach].n)+'” stamp':on?'Equipped ✓ · tap to take off':own?'Owned · tap to wear':`${SPI} ${i.p} spores`}</small><small class="wh">${avWhere(A,i)} on the ${esc(ch.n.toLowerCase())}</small></button>`}).join('')}</div>`}
box.innerHTML=`<h2>${esc(A.name||'Your avatar')}</h2><p class="mute">${ch.n} · ${rankOf(lvl())}</p>
<div class="avstage" id="avbig">${avScene(A)}</div>
<p class="spb">${SPI} <b id="spbal">${bal}</b> spore${bal===1?'':'s'} to spend</p><p class="mute sm">You earn 1 spore for every XP. Spending spores never changes your XP, level or rank.</p>
${tabs}<div class="avbody">${body}</div><div class="brow"><button class="btn alt" id="avren">Rename</button></div>`;
box.querySelectorAll('.avt').forEach(b=>b.onclick=()=>{avTab=b.dataset.t;avDraw()});
box.querySelectorAll('.avo.ch').forEach(b=>b.onclick=()=>{const A=avState();A.ch=b.dataset.c;avSave(A);avDraw()});
box.querySelectorAll('.avi').forEach(b=>b.onclick=()=>avItem(b.dataset.i));
$('#avren').onclick=()=>avName(true);
if(A.refund){const r=A.refund;delete A.refund;avPut(A);setTimeout(()=>toast('New painted wardrobe! '+r+' spores refunded for items that didn’t carry over.'),400)}}
function avItem(id){const A=avState(),i=AVIX[id];if(avLocked(i)){toast('Earn the “'+ACHX[i.ach].n+'” stamp to unlock the '+i.n+'.');return}
if(avOwns(A,i)){if(A.eq[i.s]===i.id){delete A.eq[i.s];toast(i.n+' taken off')}else{A.eq[i.s]=i.id;toast(i.n+' equipped')}avSave(A);avDraw();return}avBuy(i)}
function avBuy(i){const A=avState(),bal=spores(),ok=bal>=i.p;
$('#ovl').innerHTML=`<div class="ov"><div class="card avbuy"><h2>${esc(i.n)}</h2><div class="avstage sm">${avScene(avWith(A,i))}</div>${i.d?`<p class="mute">${esc(i.d)}</p>`:''}<p class="mute sm">${avWhere(A,i)} on the ${esc(AVCH[A.ch].n.toLowerCase())}.</p>
<p>Price: ${SPI} <b>${i.p}</b> spores</p><p class="mute">${ok?`You have ${bal}. After buying: ${bal-i.p}.`:`You have ${bal}. You need ${i.p-bal} more. Every XP you earn adds a spore.`}</p>
<div class="brow"><button class="btn" id="avok" ${ok?'':'disabled'}>Buy</button><button class="btn alt" id="avcx">${ok?'Cancel':'Close'}</button></div></div></div>`;
$('#avcx').onclick=close;$('#avok').onclick=()=>{const A=avState();if(spores()<i.p||A.own.includes(i.id))return close();A.own.push(i.id);A.spent=(A.spent||0)+i.p;A.eq[i.s]=i.id;avSave(A);close();avDraw();toast('Bought '+i.n+' for '+i.p+' spores. It’s on!')}}
function avName(re){const A=avState();let c=A.ch||'gnome';
const pick=()=>`<div class="avopts big">${AVCHK.map(k=>`<button class="avo ch ${c===k?'on':''}" data-b="${k}" aria-pressed="${c===k}"><img alt="" src="${avSrc(k)}">${AVCH[k].n}</button>`).join('')}</div>`;
$('#ovl').innerHTML=`<div class="ov"><div class="card"><h2>${re?'Rename your avatar':'Meet your field companion'}</h2>${re?'':'<p class="mute">Pick a character and give them a name. You can change both later on the Journal tab.</p>'}<div id="avpick">${re?'':pick()}</div>
<label class="avnm">Name <input id="avin" maxlength="24" autocomplete="off" value="${esc(A.name||'')}" placeholder="e.g. Morel Mae"></label>
<div class="brow"><button class="btn" id="avgo">${re?'Save':'Start'}</button><button class="btn alt" id="avlt">${re?'Cancel':'Later'}</button></div></div></div>`;
const wire=()=>document.querySelectorAll('#avpick .avo').forEach(b=>b.onclick=()=>{c=b.dataset.b;$('#avpick').innerHTML=pick();wire()});wire();
$('#avlt').onclick=()=>{if(!re)try{sessionStorage.setItem('ff-av-later','1')}catch(e){}close()};
$('#avgo').onclick=()=>{const n=$('#avin').value.trim().replace(/\s+/g,' ');if(!n){toast('Type a name first.');$('#avin').focus();return}const A=avState();A.name=n;A.ch=c;avSave(A);close();if($('#avpage'))avDraw();toast(re?'Renamed to '+n:'Welcome, '+n+'! Dress them up on the Journal tab.')}}
function avAsk(n){const A=avGet();if(A.name)return;try{if(sessionStorage.getItem('ff-av-later'))return}catch(e){}
if($('#ovl').innerHTML.trim()||document.querySelector('.stpop')){if((n||0)<40)setTimeout(()=>avAsk((n||0)+1),3000);return}avName(false)}
function avBoot(){if(avGet().earned==null)sporeSync();avThumb();const b=$('#avb');if(b)b.onclick=()=>{tab('a');setTimeout(()=>{const p=$('#avpage');if(p)p.scrollIntoView({block:'start'})},60)};if($('#avpage'))avDraw();setTimeout(avAsk,1200)}
avBoot();
