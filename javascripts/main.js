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
  // 2. 初始化 Info 图标交互
  /**
   * `toggleInfoPanel` 是一个函数，用于处理页面中 Info 图标的点击交互。
   * 它会显示或隐藏相关的提示面板。
   * 外部引用：
   * - `toggleInfoPanel` 函数：需要在其他脚本文件中定义。
   */
  toggleInfoPanel(); // 初始化 Info 图标的交互功能
});
