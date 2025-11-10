const stage   = document.getElementById('block-stage');
const cards   = [...stage.querySelectorAll('.header-elements.block')];
const icons   = [...document.getElementById('block-switcher').querySelectorAll('img')];

function syncPadding(){
  if(!cards.length) return;
  const w = cards[0].clientWidth;
  const side = Math.max(0, (stage.clientWidth - w) / 2);
  stage.style.paddingLeft = stage.style.paddingRight = side + 'px';
}

icons.forEach((img,i)=>{
  if(!img.dataset.src) img.dataset.src = img.getAttribute('src');
  if(!img.dataset.activeSrc) img.dataset.activeSrc = img.dataset.src;
  img.style.cursor = 'pointer';
  img.addEventListener('click', ()=> goTo(i, true));
});

let active = 0, timer = null;

function setSwitcher(i){
  icons.forEach((img,k)=>{
    const target = (k===i) ? (img.dataset.activeSrc || img.dataset.src) : img.dataset.src;
    if(img.getAttribute('src') !== target) img.setAttribute('src', target);
    img.classList.toggle('is-active', k===i);
  });
  active = i;
}

function goTo(i,smooth=false){
  if(!cards[i]) return;
  cards[i].scrollIntoView({ inline:'center', block:'nearest', behavior: smooth?'smooth':'auto' });
  setSwitcher(i);
}

stage.addEventListener('scroll', ()=>{
  clearTimeout(timer);
  timer = setTimeout(()=>{
    const center = stage.scrollLeft + stage.clientWidth/2;
    let j=0, best=1e9;
    cards.forEach((c,i)=>{
      const cx = c.offsetLeft + c.offsetWidth/2;
      const d  = Math.abs(cx - center);
      if(d < best){ best=d; j=i; }
    });
    setSwitcher(j);
  }, 80);
});

window.addEventListener('load',   ()=>{ syncPadding(); goTo(0,false); });
window.addEventListener('resize', ()=>{ syncPadding(); goTo(active,false); });
