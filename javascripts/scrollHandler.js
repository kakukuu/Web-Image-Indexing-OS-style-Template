// scrollHandler.js

/**
 * 处理滚动事件，动态调整页面元素的样式。
 * 此函数需要在页面加载时绑定到 `window.onscroll` 事件。
 * 外部引用：
 * 1. `document.querySelector` 选择页面上的特定 HTML 元素。
 * 2. 样式类 `.header`、`.header-title`、`.main-content` 在 CSS 文件中定义。
 */

let scrollTicking = false;

function handleScroll() {
  // 获取当前页面的垂直滚动距离（推荐使用 pageYOffset）
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // 只选择 page-header-content 中的 header-title
  const headerTitlePage = document.querySelector('.page-header-content .header-title');
  const headerTitleIndex = document.querySelector('.index-header-content .header-title');

  // 根据窗口宽度设置最大和最小字体大小
  let maxFontSize;
  let minFontSize;
  if (window.innerWidth < 480) { 
    // 小屏幕时：最大取 10% 的窗口尺寸，最小字体为 20px
    maxFontSize = Math.round(Math.min(window.innerWidth * 0.1, window.innerHeight * 0.1));
    minFontSize = 20;
  } else if (window.innerWidth < 768) {
    // 中屏时：最大取 5% 的窗口尺寸，最小字体为 22px
    maxFontSize = Math.round(Math.min(window.innerWidth * 0.05, window.innerHeight * 0.05));
    minFontSize = 22;
  } else {
    // 大屏时：最大取 5% 的窗口尺寸，最小字体为 24px
    maxFontSize = Math.round(Math.min(window.innerWidth * 0.05, window.innerHeight * 0.05));
    minFontSize = 24;
  }

  // 根据滚动距离计算新的字体大小，保证不会低于 minFontSize
  const newFontSize = Math.max(minFontSize, maxFontSize - scrollTop);
  const newFontSizeSlow = Math.max(minFontSize, maxFontSize - scrollTop / 30);

  // 将计算后的字体大小应用到对应的标题元素上
  if (headerTitlePage) {
    headerTitlePage.style.fontSize = newFontSize + 'px';
  }
  if (headerTitleIndex) {
    headerTitleIndex.style.fontSize = newFontSizeSlow + 'px';
  }
}

function onScroll() {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}

window.addEventListener('scroll', onScroll);
