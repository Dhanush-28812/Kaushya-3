(function(){
var $=function(s){return document.querySelector(s)},NS='http://www.w3.org/2000/svg';
$('#yr').textContent=new Date().getFullYear();
addEventListener('scroll',function(){var h=document.documentElement;$('#progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});
function el(p,t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e}
function hex(cx,cy,r){var p=[];for(var i=0;i<6;i++){var a=Math.PI/3*i+Math.PI/6;p.push((cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1))}return p.join(' ')}

// machine artwork
var A=$('#art-aakar'),r=30,w=r*Math.sqrt(3);
for(var row=0;row<4;row++)for(var c=0;c<4;c++)el(A,'polygon',{points:hex(48+c*w+(row%2?w/2:0),45+row*r*1.5,r-3),fill:(row+c)%3?'#e8e4ef':'#f1d98a',stroke:'#4a1f48','stroke-width':2});
var N=$('#art-nivara');
for(var j=0;j<4;j++)for(var i=0;i<7;i++){var x=20+i*42,y=30+j*50,up=(i+j)%2;el(N,'polygon',{points:up?x+','+(y+44)+' '+(x+42)+','+(y+44)+' '+(x+21)+','+y:x+','+y+' '+(x+42)+','+y+' '+(x+21)+','+(y+44),fill:up?'#2c6a45':'#e8e4ef',stroke:'#2c6a45','stroke-width':1.5})}
var V=$('#art-vidura');
el(V,'path',{d:'M110 20h100l-30 50h-40z',fill:'#2c6a45'});
el(V,'ellipse',{cx:160,cy:95,rx:14,ry:19,fill:'#f7f3e6',stroke:'#e0b24a','stroke-width':3});
[130,165,200].forEach(function(y){el(V,'rect',{x:60,y:y-14,width:34,height:22,rx:5,fill:'#4a1f48'});el(V,'line',{x1:94,y1:y-3,x2:140,y2:y-3,stroke:'#e0b24a','stroke-dasharray':'4 4'})});
el(V,'rect',{x:140,y:205,width:80,height:14,rx:3,fill:'#5a5266'});
el(V,'rect',{x:236,y:110,width:56,height:34,rx:6,fill:'#1d1624'});
var t=el(V,'text',{x:264,y:132,'font-size':13,'text-anchor':'middle',fill:'#fff'});t.textContent='ESP32';

// silk journey
var S=[
['Egg','A female moth lays several hundred eggs. Farmers use disease-free layings, because healthy eggs lead to healthy worms.',0],
['Larva rearing','The young worms eat only mulberry leaves. They moult four times and pass through five instars, growing about 3 to 4 weeks.',0],
['Spinning and mounting','A mature worm stops eating and looks for a spot to spin. Farmers move it onto a chandrika, where it spins one continuous filament over 2 to 3 days.',1,'Aakar'],
['Harvesting','Once the cocoons are finished, they are picked out of the chandrika. This labour-heavy job is the one Nivara targets.',1,'Nivara'],
['Sorting and grading','Double, stained, thin or misshapen cocoons are removed so the reeled silk is even in quality.',1,'Vidura'],
['Stifling and reeling','Heat kills the pupa so the moth cannot pierce the cocoon. The filaments are then unwound and twisted into raw silk.',0]];
function icon(k){var s=document.createElementNS(NS,'svg');s.setAttribute('viewBox','0 0 100 100');s.setAttribute('aria-hidden','true');var g='#e0b24a',p='#4a1f48';
if(k==0)[[35,55],[55,45],[62,65],[42,72]].forEach(function(q){el(s,'ellipse',{cx:q[0],cy:q[1],rx:8,ry:10,fill:'#f7f3e6',stroke:p,'stroke-width':3})});
if(k==1)for(var i=0;i<6;i++)el(s,'circle',{cx:20+i*12,cy:55+Math.sin(i)*8,r:9,fill:i?'#9fd6a8':'#2c6a45',stroke:p,'stroke-width':2});
if(k==2||k==3||k==4){el(s,'ellipse',{cx:50,cy:50,rx:22,ry:32,fill:'#f7f3e6',stroke:g,'stroke-width':4});if(k==2)el(s,'path',{d:'M30 35q20-12 40 0M28 52q22-14 44 0M30 68q20-12 40 0',fill:'none',stroke:p,'stroke-width':2});if(k==3)el(s,'path',{d:'M15 85h70',stroke:p,'stroke-width':5});if(k==4){el(s,'circle',{cx:50,cy:50,r:6,fill:'#8a3b3b'})}}
if(k==5)for(var j=0;j<5;j++)el(s,'path',{d:'M15 '+(25+j*12)+'q35 -14 70 0',fill:'none',stroke:g,'stroke-width':4});
return s}
var st=$('#stages'),sp=$('#stagePanel'),btns=[];
function pick(i){btns.forEach(function(b,k){b.setAttribute('aria-selected',k==i)});var d=S[i];sp.innerHTML='';sp.appendChild(icon(i));var x=document.createElement('div');x.innerHTML=(d[2]?'<span class="tag">Team Kaushya: '+d[3]+'</span>':'')+'<h3>'+d[0]+'</h3><p>'+d[1]+'</p>';sp.appendChild(x)}
S.forEach(function(d,i){var b=document.createElement('button');b.setAttribute('role','tab');b.className=d[2]?'ours':'';b.innerHTML='<i></i>'+d[0];b.onclick=function(){pick(i)};st.appendChild(b);btns.push(b)});
pick(2);

// how it works
var steps=[['Mount with Aakar','The farmer places the folding honeycomb chandrika on its ridged frame. Worms spin in the familiar hexagonal cells, aiming for cocoons of even size and shape.'],['Harvest with Nivara','The chandrika stays still. A matching-triangle panel presses it down, a scraper plate pushes across, and cocoons fall into a collection tray.'],['Sort with Vidura','A hopper and air-lock gate release one cocoon at a time. Three colour sensors and a load cell read it, and the ESP32 sends it to the good or bad bin.']];
var tabs=document.querySelectorAll('.tabs button');
function show(i){tabs.forEach(function(b,k){b.setAttribute('aria-selected',k==i)});$('#panel').innerHTML='<b>'+steps[i][0]+'</b><p>'+steps[i][1]+'</p>'}
tabs.forEach(function(b){b.onclick=function(){show(+b.dataset.step)}});show(0);

// sorter simulation (illustrative values only)
var good=0,bad=0,busy=false,co=$('#cocoon');
$('#drop').onclick=function(){
  if(busy)return;busy=true;
  var wt=1.0+Math.random()*1.4,base=200+Math.random()*50,sens=[0,1,2].map(function(){return base+(Math.random()-.5)*(Math.random()<.3?70:20)});
  var spread=Math.max.apply(null,sens)-Math.min.apply(null,sens),why=[];
  if(wt<1.5)why.push('too light');if(spread>=25)why.push('stained or uneven colour');
  var ok=!why.length;
  co.className='cocoon go';setTimeout(function(){co.classList.add(ok?'l':'r')},50);
  $('#verdict').textContent='Reading…';
  setTimeout(function(){
    ok?good++:bad++;$('#nGood').textContent=good;$('#nBad').textContent=bad;
    $('#verdict').textContent=ok?'Good cocoon':'Bad cocoon: '+why.join(', ');
    $('#reads').innerHTML='<li>Weight: '+wt.toFixed(2)+' g (needs 1.50 g or more)</li><li>Colour sensors: '+sens.map(function(s){return s.toFixed(0)}).join(', ')+'</li><li>Colour spread: '+spread.toFixed(0)+' (needs under 25)</li>';
    setTimeout(function(){co.className='cocoon';busy=false},700)},1300)};

// labour calculator
function calc(){var f=+$('#farmers').value,y=+$('#years').value;$('#oF').textContent=f;$('#oY').textContent=y;$('#total').textContent='₹'+(f*y*30000).toLocaleString('en-IN')}
$('#farmers').oninput=calc;$('#years').oninput=calc;calc();
})();
