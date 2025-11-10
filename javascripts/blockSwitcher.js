// 容器与卡片
const stage = document.getElementById('block-stage');
const cards = [...stage.querySelectorAll('.header-elements.block')];

// 图标开关
const switcher = document.getElementById('block-switcher');
const icons = [...switcher.querySelectorAll('img')];

// 防拖拽导致页面被拉动
icons.forEach(img => {
  img.draggable = false;
  img.addEventListener('dragstart', e => e.preventDefault());
  img.addEventListener('mousedown', e => e.preventDefault());
});

// 同步左右留白（含 gap/2，保证首尾卡居中对称）
function syncPadding(){
  if(!cards.length) return;
  const cardW = cards[0].clientWidth;
  const gap = parseFloat(getComputedStyle(stage).gap) || 0;
  const side = Math.max(0, (stage.clientWidth - cardW) / 2 + gap / 2);
  stage.style.paddingLeft = stage.style.paddingRight = side + 'px';
}

// 只滚动 stage，避免带动页面
const maxScroll = () => stage.scrollWidth - stage.clientWidth;
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
function centerLeftOf(i){
  const el = cards[i];
  return clamp(el.offsetLeft + el.offsetWidth/2 - stage.clientWidth/2, 0, maxScroll());
}

function goTo(i, smooth=false){
  if(!cards[i]) return;
  stage.scrollTo({ left: centerLeftOf(i), behavior: smooth ? 'smooth' : 'auto' });
  setSwitcher(i);
}

// 图标点击与激活图
icons.forEach((img, i) => {
  if(!img.dataset.src) img.dataset.src = img.getAttribute('src');
  if(!img.dataset.activeSrc) img.dataset.activeSrc = img.dataset.src; // 先用同图
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => goTo(i, true), { passive: true });
});

let active = 0, timer = null;
function setSwitcher(i){
  icons.forEach((img, k) => {
    const target = (k === i) ? (img.dataset.activeSrc || img.dataset.src) : img.dataset.src;
    if (img.src !== target) img.src = target;
    img.classList.toggle('is-active', k === i);
  });
  active = i;
}

// 滚动结束后同步高亮
stage.addEventListener('scroll', () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const center = stage.scrollLeft + stage.clientWidth / 2;
    let best = 0, dist = Infinity;
    cards.forEach((c, i) => {
      const cx = c.offsetLeft + c.offsetWidth / 2;
      const d  = Math.abs(cx - center);
      if (d < dist) { dist = d; best = i; }
    });
    setSwitcher(best);
  }, 80);
}, { passive: true });

// 初始与自适应
window.addEventListener('load',   () => { syncPadding(); goTo(0, false); });
window.addEventListener('resize', () => { syncPadding(); goTo(active, false); });
