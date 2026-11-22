/* ShroomaDex avatar art: hand-built ink-and-wash SVG layers on one 512x512 canvas */
const AVK='#36261a';
const avP=(d,c,w,ns)=>`<path d="${d}" fill="${c}"/>${ns?'':`<path d="${d}" fill="url(#avs)"/>`}<path d="${d}" fill="none" stroke="${AVK}" stroke-width="${w||5}" stroke-linejoin="round" stroke-linecap="round"/>`;
const avE=(x,y,rx,ry,c,w,ns)=>avP(`M${x-rx} ${y}a${rx} ${ry} 0 1 0 ${2*rx} 0a${rx} ${ry} 0 1 0 ${-2*rx} 0z`,c,w,ns);
const avL=(d,w,c,o)=>`<path d="${d}" fill="none" stroke="${c||AVK}" stroke-width="${w||3.5}" stroke-linecap="round" stroke-linejoin="round"${o?` opacity="${o}"`:''}/>`;
const avF=(d,c,o)=>`<path d="${d}" fill="${c}"${o?` opacity="${o}"`:''}/>`;
const AVSKIN=['#f2d5b8','#dcab84','#ad7752','#73503a'],AVCAP=['#a8402a','#c98f2a','#7a4a2a','#e6dcc0','#6f7d4a'],AVHAIR=['#2e2420','#6b4423','#b0562c','#a9a39a'];
const AVDEF={torso:'#76845a',sleeve:'#76845a',legs:'#6b5236',shoes:'#4a3524'};
function avDefs(){return `<defs><linearGradient id="avs" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffaf0" stop-opacity=".32"/><stop offset=".42" stop-color="#fffaf0" stop-opacity="0"/><stop offset=".6" stop-color="#36261a" stop-opacity="0"/><stop offset="1" stop-color="#36261a" stop-opacity=".34"/></linearGradient>
<filter id="avp" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="4.5" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2" seed="9" result="g"/><feColorMatrix in="g" values="0 0 0 0 .32 0 0 0 0 .22 0 0 0 0 .12 0 0 0 -.9 .52" result="g2"/><feComposite in="g2" in2="d" operator="in" result="g3"/><feBlend in="g3" in2="d" mode="multiply"/></filter>
<clipPath id="avt"><path d="M210 302Q256 290 302 302L316 388Q256 400 196 388Z"/></clipPath></defs>`}
/* ---------- body ---------- */
const AVT='M210 302Q256 290 302 302L316 388Q256 400 196 388Z';
function avLegs(o,boots){const c=o.legs||AVDEF.legs;let s=avP('M232 380L231 442L253 442L254 380Z',c,4.5)+avP('M258 380L259 442L281 442L280 380Z',c,4.5);
if(!boots)s+=avE(241,445,18,9,o.shoes||AVDEF.shoes,4.5)+avE(271,445,18,9,o.shoes||AVDEF.shoes,4.5);return s}
function avArms(sl,skin){return avP('M216 306Q184 318 174 362L196 370Q204 340 224 328Z',sl,4.5)+avP('M296 306Q328 316 344 342L324 356Q312 334 290 326Z',sl,4.5)}
const avHands=skin=>avE(185,370,13,13,skin,4.5)+avE(334,352,13,13,skin,4.5);
/* ---------- faces ---------- */
function avFace(fx,fy,f,nose){const m=nose?7:0,K=AVK,eye=(x,y,r)=>`<ellipse cx="${x}" cy="${y}" rx="${r||5.5}" ry="${(r||5.5)*1.3}" fill="${K}"/><circle cx="${x+1.8}" cy="${y-3}" r="${(r||5.5)*.36}" fill="#fff8ea"/>`;
let s=`<ellipse cx="${fx-32}" cy="${fy+12}" rx="10" ry="6" fill="#d06a52" opacity=".38"/><ellipse cx="${fx+32}" cy="${fy+12}" rx="10" ry="6" fill="#d06a52" opacity=".38"/>`;
const arc=(x,y,up)=>avL(`M${x-8} ${y}Q${x} ${y+(up?-10:8)} ${x+8} ${y}`,4.5);
if(f==='smile')s+=eye(fx-22,fy-4)+eye(fx+22,fy-4)+avL(`M${fx-12} ${fy+19+m}Q${fx} ${fy+30+m} ${fx+12} ${fy+19+m}`,4.5);
if(f==='grin')s+=arc(fx-22,fy-1,1)+arc(fx+22,fy-1,1)+avP(`M${fx-14} ${fy+17+m}Q${fx} ${fy+20+m} ${fx+14} ${fy+17+m}Q${fx+11} ${fy+35+m} ${fx} ${fy+35+m}Q${fx-11} ${fy+35+m} ${fx-14} ${fy+17+m}Z`,'#7a2e22',3.5,1)+avF(`M${fx-6} ${fy+31+m}Q${fx} ${fy+25+m} ${fx+6} ${fy+31+m}Q${fx} ${fy+35+m} ${fx-6} ${fy+31+m}Z`,'#c46a5a');
if(f==='sleepy')s+=arc(fx-22,fy-3,0)+arc(fx+22,fy-3,0)+`<ellipse cx="${fx}" cy="${fy+24+m}" rx="4.5" ry="3.5" fill="#7a2e22" stroke="${K}" stroke-width="3"/><text x="${fx+46}" y="${fy-38}" font-family="Georgia,serif" font-style="italic" font-size="22" fill="${K}">z</text><text x="${fx+60}" y="${fy-56}" font-family="Georgia,serif" font-style="italic" font-size="15" fill="${K}">z</text>`;
if(f==='wonder')s+=eye(fx-23,fy-5,8)+eye(fx+23,fy-5,8)+`<ellipse cx="${fx}" cy="${fy+25+m}" rx="6" ry="8" fill="#7a2e22" stroke="${K}" stroke-width="3.5"/>`;
if(f==='bold')s+=eye(fx-22,fy-3)+eye(fx+22,fy-3)+avL(`M${fx-33} ${fy-19}L${fx-13} ${fy-13}M${fx+33} ${fy-19}L${fx+13} ${fy-13}`,5)+avL(`M${fx-11} ${fy+22+m}Q${fx} ${fy+18+m} ${fx+11} ${fy+22+m}`,4.5);
if(f==='wink')s+=eye(fx-22,fy-4)+arc(fx+22,fy-1,1)+avL(`M${fx-11} ${fy+20+m}Q${fx+2} ${fy+29+m} ${fx+14} ${fy+17+m}`,4.5);
if(nose)s+=avE(fx,fy+8,10,8.5,'#d98268',3.5);return s}
/* ---------- heads ---------- */
function avForager(c){const sk=AVSKIN[c.skin||0],hr=AVHAIR[c.hair||0];let s=avP('M201 232Q178 214 184 250Q189 266 205 260Z',sk,4.5)+avP('M311 232Q334 214 328 250Q323 266 307 260Z',sk,4.5);
s+=avE(256,236,60,60,sk,5)+avP('M197 236Q196 174 256 172Q316 174 315 236Q306 206 280 200Q266 214 246 202Q222 210 210 222Q204 228 197 236Z',hr,4.5);
s+=avFace(256,240,c.face||'smile',1);
if(c.beard==1)s+=avP('M206 262Q212 302 256 308Q300 302 306 262Q296 282 282 278Q270 292 256 290Q242 292 230 278Q216 282 206 262Z',hr,4.5)+avL('M240 296l2 8M256 296v9M272 296l-2 8',2.5,'#000',.35);
if(c.beard==2)s+=avP('M206 262Q204 322 256 348Q308 322 306 262Q296 282 282 278Q270 292 256 290Q242 292 230 278Q216 282 206 262Z',hr,4.5)+avL('M236 300q4 18 12 32M256 298v38M276 300q-4 18-12 32',2.5,'#000',.35);
return s}
const AVCAPD={dome:'M164 216C164 150 205 118 256 118C307 118 348 150 348 216Q256 236 164 216Z',cone:'M180 216C192 176 226 116 250 100Q256 92 262 100C286 116 320 176 332 216Q256 234 180 216Z',wavy:'M156 198Q174 172 206 172Q232 184 256 182Q280 184 306 172Q338 172 356 198Q348 214 328 212Q300 230 256 228Q212 230 184 212Q164 214 156 198Z',bun:'M156 218C152 172 196 140 256 140C316 140 360 172 356 218Q256 240 156 218Z'};
const AVHAT={dome:[256,128,1.05],cone:[256,118,.82],wavy:[256,152,1.1],bun:[256,148,1.1]};
function avSprite(c){const sk=AVSKIN[c.skin||0],cc=AVCAP[c.capc||0],sh=c.cap||'dome';let s=avE(256,258,52,50,sk,5)+avFace(256,264,c.face||'smile',0);
const ud=sh==='wavy'?'M186 212Q256 252 326 212Q256 226 186 212Z':'M172 216Q256 250 340 216Q256 230 172 216Z';
s+=avP(ud,sh==='bun'?'#d8c27a':'#ead9bd',4);
if(sh==='bun')s+=`<g fill="${AVK}" opacity=".45">${[200,220,240,256,272,292,312].map((x,i)=>`<circle cx="${x}" cy="${226+(i%2)*4}" r="2"/>`).join('')}</g>`;
else s+=avL(sh==='wavy'?'M206 220l12 14M232 224l6 14M256 226v14M280 224l-6 14M306 220l-12 14':'M198 224l6 6M222 228l3 7M246 230l1 7M268 230l-1 7M292 228l-3 7M314 224l-6 6',2.5,AVK,.6);
s+=avP(AVCAPD[sh],cc,5);
if(c.spots){const P={dome:[[212,160,10],[256,138,8],[300,164,11],[236,190,7],[282,194,8],[190,196,6],[324,198,6]],cone:[[244,140,7],[268,128,5],[224,180,8],[288,178,8],[256,196,6]],wavy:[[200,186,7],[240,192,6],[286,190,7],[322,188,5]],bun:[[206,176,10],[256,160,9],[304,178,10],[230,204,7],[286,206,7],[180,206,6],[330,206,6]]}[sh];
s+=P.map(([x,y,r])=>avP(`M${x-r} ${y}q${r*.2} ${-r*1.1} ${r} ${-r}q${r*1.1} ${r*.1} ${r} ${r}q${-r*.3} ${r*.9} ${-r} ${r*.9}q${-r*.9} 0 ${-r} ${-r*.9}z`,'#f4ecdc',2.5,1)).join('')}
if(sh==='wavy')s+=avL('M214 186Q256 200 298 186',3,AVK,.45);
return s}
/* ---------- items ---------- */
const avG=(x,y,sc,inner)=>`<g transform="translate(${x} ${y}) scale(${sc})">${inner}</g>`;
const AVART={
beanie:()=>avP('M-62 30Q-64-28 0-32Q64-28 62 30Z','#9b3b28',5)+avE(0,-36,15,14,'#e8dcc0',4.5)+avP('M-67 18Q0 6 67 18L67 44Q0 32-67 44Z','#86331f',5)+avL('M-52 18v24M-36 14v24M-20 12v24M-4 11v24M12 11v24M28 13v24M44 15v24M58 17v24',2.5,AVK,.55),
souwester:()=>avP('M-46 26Q-50-28 0-30Q50-28 46 26Z','#d6a334',5)+avL('M0-30Q-6 0 0 24M-24-22Q-26 2-20 24M24-22Q26 2 20 24',2.5,AVK,.5)+avP('M-92 30Q-60 12 0 14Q60 12 92 30Q100 48 72 48Q0 36-72 48Q-100 48-92 30Z','#d6a334',5),
chantcap:()=>avP('M-74 20Q-62-6-32-10Q0 4 32-10Q62-6 74 20Q62 34 42 30Q20 44 0 40Q-20 44-42 30Q-62 34-74 20Z','#e2a03a',5)+avL('M-46 8Q0 20 46 8',3,AVK,.45)+avL('M-50 30l8 12M-24 38l4 12M0 40v12M24 38l-4 12M50 30l-8 12',2.5,AVK,.55),
slicker:o=>avP('M206 300Q256 288 306 300L326 414Q256 426 186 414Z','#d6a334',5)+avL('M256 298L256 420',3.5)+avL('M224 300L256 324L288 300',4)+`<g fill="#5b4329">${[338,362,388].map(y=>`<rect x="247" y="${y}" width="18" height="6" rx="3"/>`).join('')}</g>`+avL('M210 376h22M280 376h22',3,AVK,.6),
sweater:o=>avP(AVT,'#e4d8bc',5)+`<g clip-path="url(#avt)"><rect x="190" y="318" width="132" height="24" fill="#7b4a2e"/>${avL('M196 330'+[...Array(13)].map((_,i)=>`L${206+i*10} ${i%2?324:336}`).join(''),3,'#e4d8bc')}${avL('M196 378H320M196 384H320',2.5,AVK,.35)}</g>`+avL('M234 296Q256 310 278 296',4),
overalls:o=>avP(AVT,'#a2483a',5)+`<g clip-path="url(#avt)" stroke-width="3" opacity=".5">${[214,232,250,268,286,304].map(x=>`<path d="M${x} 290V400" stroke="#4a1e14"/>`).join('')}${[310,328,346,364,382].map(y=>`<path d="M190 ${y}H320" stroke="#e6c7a6"/>`).join('')}</g>`+avL('M228 322L216 302M284 322L296 302',10,AVK)+avL('M228 322L216 302M284 322L296 302',5,'#5a6b7c')+avP('M224 322L288 322L294 392Q256 402 218 392Z','#5a6b7c',4.5)+avP('M240 340h32v20h-32z','#5a6b7c',3)+`<circle cx="230" cy="327" r="4.5" fill="#c9a443" stroke="${AVK}" stroke-width="2"/><circle cx="282" cy="327" r="4.5" fill="#c9a443" stroke="${AVK}" stroke-width="2"/>`,
xtratuf:()=>[226,256].map(x=>avP(`M${x} 398L${x+29} 398L${x+30} 442L${x-1} 442Z`,'#6b4a2c',4.5)+avP(`M${x-2} 395L${x+31} 395L${x+31} 408L${x-2} 408Z`,'#c9a46c',4)+avE(x+15,446,21,10,'#6b4a2c',4.5)+avL(`M${x-5} 450Q${x+15} 459 ${x+35} 450`,4,'#c9a46c')).join(''),
stick:()=>avL('M332 196L344 452',17)+avL('M332 196L344 452',10,'#8a6440')+avL('M334 230l-9-8M340 330l9-6M342 400l-8 4',4)+avE(332,192,10,9,'#7a5634',4),
knife:()=>avP('M330 338L328 286Q336 272 346 284Q340 290 340 338Z','#c4c1b4',4)+avL('M334 300L334 334',2,'#fff',.6)+avP('M326 338h16v38h-16z','#8a5a34',4)+avP('M324 376h20v16h-20z','#c9a46c',3.5)+avL('M328 380v10M334 380v10M340 380v10',2,AVK,.6),
lens:()=>avL('M334 352L352 316',13)+avL('M334 352L352 316',7,'#8a5a34')+`<circle cx="362" cy="294" r="23" fill="#c9dbd6" opacity=".75"/>`+`<circle cx="362" cy="294" r="23" fill="none" stroke="${AVK}" stroke-width="12"/><circle cx="362" cy="294" r="23" fill="none" stroke="#c09a42" stroke-width="6"/>`+avL('M350 284q5-8 14-9',3,'#fff',.8),
journal:()=>`<g transform="rotate(10 344 326)">${avP('M318 296h50v62h-50z','#f0e4c8',4)+avP('M314 292h50v62h-50z','#6e3b24',4.5)+avP('M346 292h7v62h-7z','#c9a443',3)+avL('M322 304h18M322 312h14',2.5,'#e6cfa0',.8)}</g>`,
basket:()=>avB('#c69a5e','#8a6438','#b88a52',0),
gbasket:()=>avB('#d9b24a','#8a6418','#efd27a',1),
badge:()=>`<g transform="translate(222 342)">${avE(0,0,15,15,'#8e1717',4)+avE(0,0,10,10,'#f4ecdc',2.5,1)+avP('M-7 1Q-7-7 0-7Q7-7 7 1Z','#f4ecdc',2.2,1)+avL('M0 1v6',2.5)+`<path d="M-4 15l-3 10 7-4 7 4-3-10" fill="#c9a443" stroke="${AVK}" stroke-width="2"/>`}</g>`,
raven:()=>avP('M84 410L54 436L68 442L96 420Z','#2c2a2e',4.5)+avP('M80 404Q80 364 118 360Q134 342 152 346Q170 352 166 372Q162 410 136 426Q104 438 80 404Z','#2c2a2e',5)+avP('M160 352L190 362L162 370Z','#3c3a40',4)+avL('M98 388Q118 374 140 384',3,'#7d88a0',.8)+avL('M114 428L112 450M128 428L130 450M104 451h16M122 451h16',4)+`<circle cx="154" cy="358" r="3.5" fill="#fff8ea"/>`,
slug:()=>avP('M56 448Q60 420 104 414Q150 408 172 420Q190 430 186 448Z','#d8b23c',5)+avE(146,424,24,9,'#e8c860',3,1)+[[90,434,7,4],[118,426,5,3],[140,440,6,3.5],[72,442,4,3]].map(([x,y,a,b])=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${AVK}" opacity=".75"/>`).join('')+avL('M178 424L186 398M184 428L200 406',4)+`<circle cx="186" cy="396" r="4" fill="${AVK}"/><circle cx="201" cy="404" r="4" fill="${AVK}"/>`+avL('M170 436q6 4 12 0',3),
chicken:()=>avP('M82 404Q62 374 78 360Q86 380 96 388Z','#4a3424',4)+avP('M78 412Q78 372 120 372Q150 360 156 384Q160 430 118 442Q84 444 78 412Z','#a9552e',5)+avE(148,368,17,17,'#a9552e',4.5)+avP('M138 354Q140 340 148 348Q152 336 158 348Q166 342 164 356Z','#b8302a',3.5)+avP('M164 364L180 370L164 376Z','#d9a032',3.5)+avP('M160 378Q164 392 156 392Q152 384 160 378Z','#b8302a',3)+avL('M96 404Q116 420 136 404',3.5,AVK,.6)+avL('M110 440L108 452M126 440L128 452M100 452h14M122 452h14',4,'#c98a2a')+`<circle cx="152" cy="364" r="3" fill="${AVK}"/>`,
};
function avB(c1,c2,c3,g){const x=334,y=352;return avL(`M${x-34} ${y+34}Q${x-34} ${y-12} ${x} ${y-10}Q${x+34} ${y-12} ${x+34} ${y+34}`,11)+avL(`M${x-34} ${y+34}Q${x-34} ${y-12} ${x} ${y-10}Q${x+34} ${y-12} ${x+34} ${y+34}`,5,c3)
+avP(`M${x-24} ${y+34}Q${x-22} ${y+10} ${x-8} ${y+12}Q${x+2} ${y+16} ${x} ${y+34}Z`,'#a8402a',3.5)+avP(`M${x+2} ${y+34}Q${x+4} ${y+14} ${x+14} ${y+14}Q${x+30} ${y+14} ${x+28} ${y+34}Z`,'#e2a03a',3.5)
+avP(`M${x-44} ${y+32}L${x+44} ${y+32}L${x+34} ${y+88}Q${x} ${y+94} ${x-34} ${y+88}Z`,c1,5)+avL(`M${x-40} ${y+48}H${x+40}M${x-38} ${y+62}H${x+38}M${x-36} ${y+76}H${x+36}`,2.5,c2,.9)+avL([-30,-18,-6,6,18,30].map(d=>`M${x+d} ${y+34}L${x+d*.8} ${y+88}`).join(''),2.5,c2,.7)+avP(`M${x-46} ${y+28}h92v9h-92z`,c3,4)
+(g?`<g fill="#fff6d0" stroke="${AVK}" stroke-width="1.5">${[[x-30,y+56],[x+24,y+72],[x+40,y+20]].map(([a,b])=>`<path d="M${a} ${b-8}l2.5 5.5 5.5 2.5-5.5 2.5-2.5 5.5-2.5-5.5-5.5-2.5 5.5-2.5z"/>`).join('')}</g>`+avE(x,y+62,6,6,'#2f6a5a',2.5,1):'')}
/* ---------- backgrounds ---------- */
const spruce=(x,y,h,c)=>{const w=h*.36;let d=`M${x} ${y-h}`;for(let i=1;i<=5;i++){const yy=y-h+h*i/5.4;d+=`L${x+w*i/5} ${yy}L${x+w*i/9} ${yy-h*.04}`}d+=`L${x+w*.12} ${y-h*.06}L${x+w*.12} ${y}L${x-w*.12} ${y}L${x-w*.12} ${y-h*.06}`;for(let i=5;i>=1;i--){const yy=y-h+h*i/5.4;d+=`L${x-w*i/9} ${yy-h*.04}L${x-w*i/5} ${yy}`}return `<path d="${d}Z" fill="${c}"/>`};
const shorePine=(x,y,h)=>{const t=`M${x} ${y}q${-h*.08} ${-h*.3} ${h*.04} ${-h*.5}q${h*.1} ${-h*.2} ${-h*.03} ${-h*.46}M${x+h*.03} ${y-h*.55}q${h*.16} ${-h*.06} ${h*.26} ${-h*.2}M${x+h*.01} ${y-h*.72}q${-h*.14} ${-h*.04} ${-h*.24} ${-h*.14}`;
const tuft=(cx,cy,r)=>`<path d="M${cx-r} ${cy}q${r*.3} ${-r*.7} ${r} ${-r*.55}q${r*.7} ${-r*.2} ${r} ${r*.45}q${-r*.5} ${r*.3} ${-r} ${r*.2}q${-r*.6} ${r*.1} ${-r} ${-r*.1}z" fill="#4c6542"/>`;
return `<path d="${t}" stroke="#4e3e2a" stroke-width="${Math.max(3,h/22)}" fill="none" stroke-linecap="round"/>${tuft(x+h*.01,y-h*.96,h*.2)}${tuft(x+h*.3,y-h*.76,h*.16)}${tuft(x-h*.25,y-h*.86,h*.15)}${tuft(x+h*.06,y-h*.56,h*.13)}`};
const AVBG={
forest:()=>`<rect width="512" height="512" fill="#dfe2cc"/><rect y="300" width="512" height="212" fill="#9c9a66"/>${[[40,330,200],[130,320,170],[380,326,190],[470,330,210],[210,318,140],[300,316,150]].map(([x,y,h])=>spruce(x,y,h,'#a3ae90')).join('')}${[[20,360,300],[96,350,250],[420,356,280],[500,362,320]].map(([x,y,h])=>spruce(x,y,h,'#5f7552')).join('')}${[[-10,420,380],[520,430,400]].map(([x,y,h])=>spruce(x,y,h,'#3f5236')).join('')}<ellipse cx="160" cy="470" rx="140" ry="24" fill="#7a8a4c" opacity=".7"/><ellipse cx="390" cy="476" rx="150" ry="22" fill="#7a8a4c" opacity=".6"/>`,
muskeg:()=>`<rect width="512" height="512" fill="#e4e2cf"/><path d="M0 300Q90 244 190 272Q300 236 400 262Q460 250 512 276V512H0Z" fill="#a8b09a"/><rect y="318" width="512" height="194" fill="#bfb06c"/><ellipse cx="110" cy="372" rx="70" ry="12" fill="#93aaa8"/><ellipse cx="420" cy="398" rx="78" ry="13" fill="#93aaa8"/><ellipse cx="300" cy="350" rx="40" ry="7" fill="#93aaa8"/>${[[70,330,90],[440,336,110],[180,322,60],[360,322,56]].map(([x,y,h])=>shorePine(x,y,h)).join('')}<g fill="#fbf6ea">${[[40,420],[90,452],[150,430],[380,440],[460,470],[200,480],[340,476],[480,420]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5"/>`).join('')}</g><g fill="#a3402a" opacity=".6">${[[60,470],[420,458],[300,494]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.5"/>`).join('')}</g>`,
beach:()=>`<rect width="512" height="512" fill="#dcdcd2"/><path d="M0 250Q80 196 170 226Q260 180 350 220Q430 196 512 230V262H0Z" fill="#aab3b0"/><rect y="258" width="512" height="80" fill="#8fa6a4"/>${avL('M60 282h60M200 298h80M360 286h70M120 316h50',2.5,'#f4f0e4',.6)}<path d="M0 330Q256 318 512 334V512H0Z" fill="#cbbb92"/>${[[70,420,26,12],[150,470,18,9],[400,440,30,13],[460,490,16,8],[330,480,12,6]].map(([x,y,a,b])=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="#8e8a80"/>`).join('')}${avL('M90 380q30 8 50-2q20-8 40 4M330 392q30-8 60 4',4,'#6b5a2a',.7)}${[[10,340,250],[54,346,200]].map(([x,y,h])=>spruce(x,y,h,'#4c6342')).join('')}${spruce(500,344,260,'#4c6342')}`,
trail:()=>`<rect width="512" height="512" fill="#cfd4c4"/>${[[30,330,260],[110,320,200],[400,322,220],[480,330,280]].map(([x,y,h])=>spruce(x,y,h,'#77886a')).join('')}<rect y="320" width="512" height="192" fill="#7e8a58"/><path d="M226 320L286 320L392 512L120 512Z" fill="#9a8060"/>${[...Array(14)].map((_,i)=>{const y=322+Math.pow(i/13,1.6)*188,k=(y-320)/192;return avL(`M${226-106*k} ${y}H${286+106*k}`,1.5+2*k,'#4a3524',.55)}).join('')}${avL('M226 320L120 512M286 320L392 512',3,'#4a3524',.6)}${[[40,470],[460,460],[80,410]].map(([x,y])=>`<path d="M${x} ${y}q-20-30-46-34M${x} ${y}q-4-36 6-56M${x} ${y}q20-30 46-30" stroke="#4f6a44" stroke-width="7" fill="none" stroke-linecap="round"/>`).join('')}<g stroke="#f4f6f0" stroke-width="2" opacity=".55" stroke-linecap="round">${[...Array(46)].map((_,i)=>{const x=(i*97)%512,y=(i*61)%440;return `<path d="M${x} ${y}l-6 18"/>`}).join('')}</g><ellipse cx="256" cy="470" rx="60" ry="8" fill="#a9b8b8" opacity=".7"/>`,
};
/* ---------- compose ---------- */
function avRender(c,o){o=o||{};const eq=c.eq||{},out=eq.outfit,boots=eq.boots==='xtratuf',sk=AVSKIN[c.skin||0];
const OF={slicker:{sleeve:'#d6a334'},sweater:{sleeve:'#e4d8bc'},overalls:{sleeve:'#a2483a',legs:'#5a6b7c'}}[out]||{};const D=Object.assign({},AVDEF,OF);
let s='';if(eq.bg&&AVBG[eq.bg]&&!o.nobg)s+=AVBG[eq.bg]();
s+=`<ellipse cx="256" cy="452" rx="96" ry="12" fill="${AVK}" opacity=".2"/>`;
if(eq.pal&&AVART[eq.pal])s+=`<ellipse cx="${eq.pal==='slug'?122:116}" cy="452" rx="62" ry="8" fill="${AVK}" opacity=".16"/>`;
s+=avLegs(D,boots)+(boots?AVART.xtratuf():'');
s+=out?AVART[out]():avP(AVT,D.torso,5)+avL('M234 296Q256 310 278 296',4);
s+=avArms(D.sleeve,sk);
if(eq.hand&&AVART[eq.hand])s+=AVART[eq.hand]();
s+=avHands(sk);
s+=c.base==='sprite'?avSprite(c):avForager(c);
if(eq.hat&&AVART[eq.hat]){const a=c.base==='sprite'?AVHAT[c.cap||'dome']:[256,178,1];s+=avG(a[0],a[1],a[2],AVART[eq.hat]())}
if(eq.badge&&AVART[eq.badge])s+=AVART[eq.badge]();
if(eq.pal&&AVART[eq.pal])s+=AVART[eq.pal]();
const vb=o.crop||'0 0 512 512';
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${o.size||512}" height="${o.size||512}">${avDefs()}<g filter="url(#avp)">${s}</g></svg>`}
const avURL=(c,o)=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(avRender(c,o));
/* ---------- avatar shop + UI (lazy-loaded) ---------- */
const AVI=[
{id:'beanie',n:'Knit beanie',s:'hat',p:40},
{id:'souwester',n:'Sou’wester rain hat',s:'hat',p:90},
{id:'chantcap',n:'Tiny chanterelle cap',s:'hat',p:150},
{id:'overalls',n:'Overalls & flannel',s:'outfit',p:70},
{id:'sweater',n:'Wool sweater',s:'outfit',p:90},
{id:'slicker',n:'Rain slicker',s:'outfit',p:120},
{id:'xtratuf',n:'XtraTufs',d:'The brown Ketchikan sneakers',s:'boots',p:150},
{id:'stick',n:'Walking stick',s:'hand',p:20},
{id:'basket',n:'Foraging basket',s:'hand',p:30},
{id:'journal',n:'Field journal',s:'hand',p:40},
{id:'knife',n:'Mushroom knife',d:'With a cleaning brush',s:'hand',p:50},
{id:'lens',n:'Hand lens',s:'hand',p:60},
{id:'slug',n:'Banana slug',s:'pal',p:100},
{id:'chicken',n:'Chicken',s:'pal',p:180},
{id:'raven',n:'Raven',s:'pal',p:300},
{id:'forest',n:'Spruce forest',s:'bg',p:50},
{id:'muskeg',n:'Muskeg',s:'bg',p:60},
{id:'trail',n:'Rainy trail',s:'bg',p:70},
{id:'beach',n:'Beach fringe',s:'bg',p:80},
{id:'badge',n:'Death Cap Detective badge',s:'badge',ach:'deathcap'},
{id:'gbasket',n:'Gilded basket',s:'hand',ach:'dall'}];
const AVIX=Object.fromEntries(AVI.map(i=>[i.id,i]));
const AVTABS=[['look','Look'],['hat','Hats'],['outfit','Outfits'],['boots','Boots'],['hand','In hand'],['pal','Companions'],['bg','Scenes'],['badge','Badges']];
const AVBASE={sprite:'Mushroom sprite',forager:'Forager'};
const AVFACES=[['smile','Smile'],['grin','Grin'],['wink','Wink'],['wonder','Wonder'],['bold','Bold'],['sleepy','Sleepy']];
const AVCROP='40 52 432 432',avThumbCrop=c=>c.base==='sprite'?'146 84 220 220':'160 128 192 192';
const SPI='<svg class="spi" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><circle cx="4.5" cy="9" r="2"/><circle cx="19" cy="7.5" r="2.2"/><circle cx="18.5" cy="17" r="1.7"/><circle cx="7" cy="18.5" r="1.9"/><circle cx="11.5" cy="3.6" r="1.4"/></svg>';
let avTab='look';
function avState(){const A=avGet();A.base=A.base||'sprite';A.own=A.own||[];A.eq=A.eq||{};A.face=A.face||'smile';if(A.cap==null)A.cap='dome';if(A.capc==null)A.capc=0;if(A.spots==null)A.spots=1;if(A.skin==null)A.skin=0;if(A.hair==null)A.hair=1;if(A.beard==null)A.beard=0;return A}
const avLocked=i=>i.ach&&!(st.ach&&st.ach[i.ach]);
function avOwns(A,i){return i.ach?!avLocked(i):A.own.includes(i.id)}
function avThumb(){const b=$('#avb');if(!b)return;const A=avState();b.hidden=false;b.querySelector('img').src=avURL(A,{crop:avThumbCrop(A),size:96});b.title=(A.name||'Your avatar')+' (Journal)'}
function avSave(A){avPut(A);avThumb()}
function avPreview(A,ov){const c=JSON.parse(JSON.stringify(A));if(ov)c.eq[ov.s]=ov.id;return avURL(c,{crop:AVCROP,size:432})}
function avDraw(){const box=$('#avpage');if(!box)return;const A=avState(),bal=spores();
const tabs=`<div class="avtabs" role="tablist">${AVTABS.map(([k,n])=>`<button class="avt ${avTab===k?'on':''}" role="tab" aria-selected="${avTab===k}" data-t="${k}">${n}</button>`).join('')}</div>`;
let body='';
if(avTab==='look'){const opt=(k,v,lab,sw)=>`<button class="avo ${A[k]===v?'on':''}" data-k="${k}" data-v="${v}" aria-pressed="${A[k]===v}">${sw?`<i style="background:${sw}"></i>`:''}${lab}</button>`;
body=`<h3 class="jh">Character</h3><div class="avopts big">${['sprite','forager'].map(b=>`<button class="avo ch ${A.base===b?'on':''}" data-k="base" data-v="${b}" aria-pressed="${A.base===b}"><img alt="" src="${avURL(Object.assign({},A,{base:b,eq:{}}),{crop:avThumbCrop({base:b}),size:96})}">${AVBASE[b]}</button>`).join('')}</div>
<h3 class="jh">${A.base==='sprite'?'Stem tone':'Skin tone'}</h3><div class="avopts">${AVSKIN.map((c,i)=>opt('skin',i,'',c)).join('')}</div>
<h3 class="jh">Face</h3><div class="avopts">${AVFACES.map(([v,n])=>opt('face',v,n)).join('')}</div>`+
(A.base==='sprite'?`<h3 class="jh">Cap shape</h3><div class="avopts">${[['dome','Dome'],['cone','Cone'],['wavy','Wavy'],['bun','Bun']].map(([v,n])=>opt('cap',v,n)).join('')}</div><h3 class="jh">Cap color</h3><div class="avopts">${AVCAP.map((c,i)=>opt('capc',i,'',c)).join('')}</div><h3 class="jh">Spots</h3><div class="avopts">${opt('spots',1,'Spots')}${opt('spots',0,'Plain')}</div>`
:`<h3 class="jh">Hair &amp; beard color</h3><div class="avopts">${AVHAIR.map((c,i)=>opt('hair',i,'',c)).join('')}</div><h3 class="jh">Beard</h3><div class="avopts">${opt('beard',0,'None')}${opt('beard',1,'Short')}${opt('beard',2,'Long')}</div>`);
body+='<p class="mute">Looks are free. Everything works on both characters.</p>'}
else{const L=AVI.filter(i=>i.s===avTab);body=`<div class="avshop">${L.map(i=>{const own=avOwns(A,i),on=A.eq[i.s]===i.id,lk=avLocked(i);return `<button class="avi ${on?'on':''} ${lk?'lk':''}" data-i="${i.id}" aria-pressed="${on}"><img alt="" loading="lazy" src="${avPreview(A,i)}"><b>${esc(i.n)}</b><small>${lk?'🔒 Earn the “'+esc(ACHX[i.ach].n)+'” stamp':on?'Equipped ✓ · tap to take off':own?'Owned · tap to wear':`${SPI} ${i.p} spores`}</small></button>`}).join('')}</div>`}
box.innerHTML=`<h2>${esc(A.name||'Your avatar')}</h2><p class="mute">${AVBASE[A.base]} · ${rankOf(lvl())}</p>
<div class="avstage"><img id="avbig" alt="${esc(A.name||'Your avatar')}, ${AVBASE[A.base]}" src="${avPreview(A)}"></div>
<p class="spb">${SPI} <b id="spbal">${bal}</b> spore${bal===1?'':'s'} to spend</p><p class="mute sm">You earn 1 spore for every XP. Spending spores never changes your XP, level or rank.</p>
${tabs}<div class="avbody">${body}</div><div class="brow"><button class="btn alt" id="avren">Rename</button></div>`;
box.querySelectorAll('.avt').forEach(b=>b.onclick=()=>{avTab=b.dataset.t;avDraw()});
box.querySelectorAll('.avo').forEach(b=>b.onclick=()=>{const A=avState(),k=b.dataset.k,v=b.dataset.v;A[k]=k==='base'||k==='face'||k==='cap'?v:+v;avSave(A);avDraw()});
box.querySelectorAll('.avi').forEach(b=>b.onclick=()=>avItem(b.dataset.i));
$('#avren').onclick=()=>avName(true)}
function avItem(id){const A=avState(),i=AVIX[id];if(avLocked(i)){toast('Earn the “'+ACHX[i.ach].n+'” stamp to unlock the '+i.n+'.');return}
if(avOwns(A,i)){if(A.eq[i.s]===i.id){delete A.eq[i.s];toast(i.n+' taken off')}else{A.eq[i.s]=i.id;toast(i.n+' equipped')}avSave(A);avDraw();return}avBuy(i)}
function avBuy(i){const A=avState(),bal=spores(),ok=bal>=i.p;
$('#ovl').innerHTML=`<div class="ov"><div class="card avbuy"><h2>${esc(i.n)}</h2><div class="avstage sm"><img alt="" src="${avPreview(A,i)}"></div>${i.d?`<p class="mute">${esc(i.d)}</p>`:''}
<p>Price: ${SPI} <b>${i.p}</b> spores</p><p class="mute">${ok?`You have ${bal}. After buying: ${bal-i.p}.`:`You have ${bal}. You need ${i.p-bal} more. Every XP you earn adds a spore.`}</p>
<div class="brow"><button class="btn" id="avok" ${ok?'':'disabled'}>Buy</button><button class="btn alt" id="avcx">${ok?'Cancel':'Close'}</button></div></div></div>`;
$('#avcx').onclick=close;$('#avok').onclick=()=>{const A=avState();if(spores()<i.p||A.own.includes(i.id))return close();A.own.push(i.id);A.spent=(A.spent||0)+i.p;A.eq[i.s]=i.id;avSave(A);close();avDraw();toast('Bought '+i.n+' for '+i.p+' spores. It’s on!')}}
function avName(re){const A=avState();let base=A.base;
const pick=()=>`<div class="avopts big">${['sprite','forager'].map(b=>`<button class="avo ch ${base===b?'on':''}" data-b="${b}" aria-pressed="${base===b}"><img alt="" src="${avURL(Object.assign({},A,{base:b,eq:{}}),{crop:AVCROP,size:200})}">${AVBASE[b]}</button>`).join('')}</div>`;
$('#ovl').innerHTML=`<div class="ov"><div class="card"><h2>${re?'Rename your avatar':'Meet your field companion'}</h2>${re?'':'<p class="mute">Pick a character and give them a name. You can change both later on the Journal tab.</p>'}<div id="avpick">${re?'':pick()}</div>
<label class="avnm">Name <input id="avin" maxlength="24" autocomplete="off" value="${esc(A.name||'')}" placeholder="e.g. Morel Mae"></label>
<div class="brow"><button class="btn" id="avgo">${re?'Save':'Start'}</button><button class="btn alt" id="avlt">${re?'Cancel':'Later'}</button></div></div></div>`;
const wire=()=>document.querySelectorAll('#avpick .avo').forEach(b=>b.onclick=()=>{base=b.dataset.b;$('#avpick').innerHTML=pick();wire()});wire();
$('#avlt').onclick=()=>{if(!re)try{sessionStorage.setItem('ff-av-later','1')}catch(e){}close()};
$('#avgo').onclick=()=>{const n=$('#avin').value.trim().replace(/\s+/g,' ');if(!n){toast('Type a name first.');$('#avin').focus();return}const A=avState();A.name=n;A.base=base;avSave(A);close();if($('#avpage'))avDraw();toast(re?'Renamed to '+n:'Welcome, '+n+'! Dress them up on the Journal tab.')}}
function avAsk(n){const A=avGet();if(A.name)return;try{if(sessionStorage.getItem('ff-av-later'))return}catch(e){}
if($('#ovl').innerHTML.trim()||document.querySelector('.stpop')){if((n||0)<40)setTimeout(()=>avAsk((n||0)+1),3000);return}avName(false)}
function avBoot(){if(avGet().earned==null)sporeSync();avThumb();const b=$('#avb');if(b)b.onclick=()=>{tab('a');setTimeout(()=>{const p=$('#avpage');if(p)p.scrollIntoView({block:'start'})},60)};if($('#avpage'))avDraw();setTimeout(avAsk,1200)}
avBoot();
