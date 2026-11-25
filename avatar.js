/* ShroomDex avatar v22: one item at a time, each painted onto the character (av/v/{character}-{item}.webp, lazy-loaded) */
const AVV=22,AVD='av/';
/* head = [centerX, centerY, width] in the character's 512x512 art, used for the header thumbnail */
const AVCH={
gnome:{n:'Gnome forager',d:'Toadstool cap, chanterelle haul',head:[252,176,150],has:['toadhat','basket']},
snail:{n:'Snail rider',d:'A gnome on a very patient snail',head:[192,118,120],has:['tealhat']},
hen:{n:'Hen',d:'Brought her basket and two chicks',head:[340,110,120],has:['basket']},
frog:{n:'Frog',d:'Toadstool cap and a little satchel',head:[248,164,170],has:['satchel']},
fox:{n:'Fox',d:'Cozy sweater, mushroom basket',head:[226,120,170],has:['basket']}};
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
const AVSLOTS=['hat','back','neck','face','bag','hold'];/* v21 slots, used only to pick which item stays on when moving to one-at-a-time */
const AVTABS=[['look','Character'],['hat','Hats'],['wear','Wear'],['carry','Carry']];
const AVTABSL={hat:['hat'],wear:['face','neck','back'],carry:['bag','hold']};
const SPI='<svg class="spi" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><circle cx="4.5" cy="9" r="2"/><circle cx="19" cy="7.5" r="2.2"/><circle cx="18.5" cy="17" r="1.7"/><circle cx="7" cy="18.5" r="1.9"/><circle cx="11.5" cy="3.6" r="1.4"/></svg>';
const avSrc=k=>AVD+k+'.webp';
const avChk=c=>c in AVCH?c:'gnome';
/* the painting for a character wearing one item; items already in the base art (and "none") use the base painting */
function avVar(ch,id){ch=avChk(ch);return !id||!AVIX[id]||AVCH[ch].has.includes(id)?avSrc(ch):AVD+'v/'+ch+'-'+id+'.webp'}
const avWorn=A=>{const i=AVIX[A.wear];return i&&!avLocked(i)?i.id:null};
const CX=-26,CY=74,CS=.84;
function avScene(A,o){o=o||{};const ch=AVCH[avChk(A.ch)];let s='';
if(!o.nohouse)s+=`<image href="${avSrc('house')}" x="168" y="-8" width="368" height="368"/>`;
s+=`<image class="avch" href="${avVar(A.ch,avWorn(A))}" x="${CX}" y="${CY}" width="${512*CS}" height="${512*CS}"/>`;
let vb='0 0 512 512';if(o.head){const h=ch.head,x=CX+h[0]*CS,y=CY+h[1]*CS,w=h[2]*CS*1.15;vb=`${(x-w/2).toFixed(0)} ${(y-w/2).toFixed(0)} ${w.toFixed(0)} ${w.toFixed(0)}`}
const it=AVIX[avWorn(A)];
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(A.name||'Your avatar')}, ${esc(ch.n)}${it?' with '+esc(it.n.toLowerCase()):''}">${s}</svg>`}
(function(){if(document.getElementById('avcss'))return;const c=document.createElement('style');c.id='avcss';c.textContent=`.avb svg,.avstage svg,.avo.ch svg{width:100%;height:100%;display:block}.avstage{background:var(--noise),radial-gradient(80% 70% at 60% 40%,#f8f0dc,var(--paper2))}.avo.ch{width:31%;min-width:96px;max-width:132px}.avo.ch img{object-fit:contain;padding:2px;box-sizing:border-box}.avopts.big{gap:8px}.avi img{object-fit:contain;padding:10px;box-sizing:border-box}.avi.none img{opacity:.55}.avstage.sm{max-width:220px}.avwear{margin:6px 0 0;text-align:center}`;document.head.appendChild(c)})();
/* ---------- state + migration (v17 ink avatars -> v21 layers -> v22 one item) ---------- */
const AVOLDP={beanie:40,souwester:90,chantcap:150,overalls:70,sweater:90,slicker:120,xtratuf:150,stick:20,basket:30,journal:40,knife:50,lens:60,slug:100,chicken:180,raven:300,forest:50,muskeg:60,trail:70,beach:80};
const AVMAP={beanie:'tealhat',souwester:'tealhat',chantcap:'toadhat',sweater:'scarf',slicker:'cloak',stick:'stick',basket:'basket',journal:'journal',knife:'knife',lens:'specs',badge:'lantern',gbasket:'goldhat'};
function avMigrate(A){if(A.v===AVV)return A;
if(A.v!==21){const own=[],old=A.own||[];let ref=0;
old.forEach(id=>{const n=AVMAP[id];if(n&&AVIX[n]&&!AVIX[n].ach&&!own.includes(n))own.push(n);else if(AVIX[id]&&!AVIX[id].ach&&!own.includes(id)&&!AVOLDP[id])own.push(id);else ref+=AVOLDP[id]||0});
const eq={};Object.values(A.eq||{}).forEach(id=>{const n=AVMAP[id]||id,i=AVIX[n];if(i&&(own.includes(n)||(i.ach&&!avLocked(i))))eq[i.s]=n});
if(old.length||A.eq){A.legacy={own:old,eq:A.eq,base:A.base}}
A.own=own;A.eq=eq;if(ref){A.spent=Math.max(0,(A.spent||0)-ref);A.refund=ref}
['base','skin','cap','capc','spots','face','hair','beard'].forEach(k=>delete A[k])}
/* v21 -> v22: keep everything owned, wear just one item (hat first, then cloak, scarf, specs, bag, held item) */
const eq=A.eq||{};A.wear=null;for(const s of AVSLOTS){const i=AVIX[eq[s]];if(i&&(i.ach?!avLocked(i):(A.own||[]).includes(i.id))){A.wear=i.id;break}}
if(Object.keys(eq).length)A.eq21=eq;delete A.eq;A.ch=avChk(A.ch);A.v=AVV;return A}
let avTab='look';
function avState(){const A=avGet(),v=A.v;avMigrate(A);A.own=A.own||[];if(v!==AVV&&(A.name||A.own.length||A.refund||A.eq21))avPut(A);return A}
const avLocked=i=>i.ach&&!(st.ach&&st.ach[i.ach]);
function avOwns(A,i){return i.ach?!avLocked(i):A.own.includes(i.id)}
function avThumb(){const b=$('#avb');if(!b)return;const A=avState();b.hidden=false;b.innerHTML=avScene(A,{head:1,nohouse:1});b.title=(A.name||'Your avatar')+' (Journal)'}
function avSave(A){avPut(A);avThumb()}
const avIn=(A,i)=>AVCH[avChk(A.ch)].has.includes(i.id)?'Already part of the '+AVCH[avChk(A.ch)].n.toLowerCase()+'’s painting':'Painted onto the '+AVCH[avChk(A.ch)].n.toLowerCase();
function avDraw(){const box=$('#avpage');if(!box)return;const A=avState(),bal=spores(),ch=AVCH[A.ch],w=AVIX[avWorn(A)];
const tabs=`<div class="avtabs" role="tablist">${AVTABS.map(([k,n])=>`<button class="avt ${avTab===k?'on':''}" role="tab" aria-selected="${avTab===k}" data-t="${k}">${n}</button>`).join('')}</div>`;
let body='';
if(avTab==='look'){body=`<div class="avopts big">${AVCHK.map(k=>`<button class="avo ch ${A.ch===k?'on':''}" data-c="${k}" aria-pressed="${A.ch===k}"><img alt="" src="${avSrc(k)}">${AVCH[k].n}</button>`).join('')}</div><p class="mute">Characters are free. Wear one item at a time; it’s painted right onto whichever character you pick.</p>`}
else{const L=AVI.filter(i=>AVTABSL[avTab].includes(i.s));body=`<div class="avshop"><button class="avi none ${w?'':'on'}" data-i="" aria-pressed="${!w}"><img alt="" src="${avSrc(A.ch)}"><b>None</b><small>${w?'Tap to take off the '+esc(w.n.toLowerCase()):'Wearing nothing extra ✓'}</small></button>${L.map(i=>{const own=avOwns(A,i),on=avWorn(A)===i.id,lk=avLocked(i);return `<button class="avi ${on?'on':''} ${lk?'lk':''}" data-i="${i.id}" aria-pressed="${on}"><img alt="" loading="lazy" src="${avSrc(i.id)}"><b>${esc(i.n)}</b><small>${lk?'🔒 Earn the “'+esc(ACHX[i.ach].n)+'” stamp':on?'Wearing ✓ · tap to take off':own?'Owned · tap to wear':`${SPI} ${i.p} spores`}</small></button>`}).join('')}</div>`}
box.innerHTML=`<h2>${esc(A.name||'Your avatar')}</h2><p class="mute">${ch.n} · ${rankOf(lvl())}</p>
<div class="avstage" id="avbig">${avScene(A)}</div><p class="mute sm avwear">${w?'Wearing: '+esc(w.n):'Wearing: nothing extra'}</p>
<p class="spb">${SPI} <b id="spbal">${bal}</b> spore${bal===1?'':'s'} to spend</p><p class="mute sm">You earn 1 spore for every XP. Spending spores never changes your XP, level or rank.</p>
${tabs}<div class="avbody">${body}</div><div class="brow">${w?'<button class="btn alt" id="avoff">Take off</button>':''}<button class="btn alt" id="avren">Rename</button></div>`;
box.querySelectorAll('.avt').forEach(b=>b.onclick=()=>{avTab=b.dataset.t;avDraw()});
box.querySelectorAll('.avo.ch').forEach(b=>b.onclick=()=>{const A=avState();A.ch=b.dataset.c;avSave(A);avDraw()});
box.querySelectorAll('.avi').forEach(b=>b.onclick=()=>avItem(b.dataset.i));
if($('#avoff'))$('#avoff').onclick=()=>avItem('');
$('#avren').onclick=()=>avName(true);
if(A.refund){const r=A.refund;delete A.refund;avPut(A);setTimeout(()=>toast('New painted wardrobe! '+r+' spores refunded for items that didn’t carry over.'),400)}}
function avItem(id){const A=avState();if(!id){const w=AVIX[avWorn(A)];A.wear=null;avSave(A);avDraw();if(w)toast(w.n+' taken off');return}
const i=AVIX[id];if(avLocked(i)){toast('Earn the “'+ACHX[i.ach].n+'” stamp to unlock the '+i.n+'.');return}
if(avOwns(A,i)){if(avWorn(A)===i.id){A.wear=null;toast(i.n+' taken off')}else{A.wear=i.id;toast(i.n+' on')}avSave(A);avDraw();return}avBuy(i)}
function avBuy(i){const A=avState(),bal=spores(),ok=bal>=i.p;
$('#ovl').innerHTML=`<div class="ov"><div class="card avbuy"><h2>${esc(i.n)}</h2><div class="avstage sm">${avScene(Object.assign({},A,{wear:i.id}))}</div>${i.d?`<p class="mute">${esc(i.d)}</p>`:''}<p class="mute sm">${avIn(A,i)}. Wearing it swaps out whatever you have on now.</p>
<p>Price: ${SPI} <b>${i.p}</b> spores</p><p class="mute">${ok?`You have ${bal}. After buying: ${bal-i.p}.`:`You have ${bal}. You need ${i.p-bal} more. Every XP you earn adds a spore.`}</p>
<div class="brow"><button class="btn" id="avok" ${ok?'':'disabled'}>Buy</button><button class="btn alt" id="avcx">${ok?'Cancel':'Close'}</button></div></div></div>`;
$('#avcx').onclick=close;$('#avok').onclick=()=>{const A=avState();if(spores()<i.p||A.own.includes(i.id))return close();A.own.push(i.id);A.spent=(A.spent||0)+i.p;A.wear=i.id;avSave(A);close();avDraw();toast('Bought '+i.n+' for '+i.p+' spores. It’s on!')}}
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
