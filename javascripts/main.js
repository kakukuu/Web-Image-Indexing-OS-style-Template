// main.js

/**
 * 主脚本文件，用于初始化页面的交互逻辑。
 * 
 * 功能：
 * 1. 绑定滚动事件，并通过节流函数优化性能。
 * 2. 初始化页面中 Info 图标的交互功能。
 */

// 确保文档结构已加载完成后执行脚本逻辑
document.addEventListener('DOMContentLoaded', function() {
  // 1. 绑定滚动事件
  /**
   * `throttle` 是一个工具函数，用于限制滚动事件触发的频率。
   * 它会确保 `handleScroll` 在 100 毫秒内最多执行一次，优化滚动时的性能。
   * 外部引用：
   * - `throttle` 函数：定义在 throttle.js 文件中。
   * - `handleScroll` 函数：定义在 scrollHandler.js 文件中。
   */
  const throttledScroll = throttle(handleScroll, 100); // 创建节流后的滚动事件处理器
  window.addEventListener('scroll', throttledScroll); // 绑定到窗口的 `scroll` 事件

  // 2. 初始化 Info 图标交互
  /**
   * `toggleInfoPanel` 是一个函数，用于处理页面中 Info 图标的点击交互。
   * 它会显示或隐藏相关的提示面板。
   * 外部引用：
   * - `toggleInfoPanel` 函数：需要在其他脚本文件中定义。
   */
  toggleInfoPanel(); // 初始化 Info 图标的交互功能
});
