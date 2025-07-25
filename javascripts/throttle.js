// throttle.js

/**
 * 函数节流 (throttle) 工具函数。
 * 作用：限制函数的执行频率，在指定时间间隔内（`delay` 毫秒）只允许执行一次。
 * 
 * 使用场景：
 * 1. 滚动事件（如 `onscroll`）——限制触发频率以提高性能。
 * 2. 窗口大小调整事件（如 `onresize`）——避免频繁执行导致卡顿。
 * 3. 按钮点击等用户交互事件——防止意外的多次触发。
 * 
 * 参数：
 * - `func` (function)：需要被节流的函数。
 * - `delay` (number)：延迟时间，单位为毫秒。
 * 
 * 返回值：
 * - 一个被包装后的函数，在延迟时间内只会执行一次 `func`。
 */

function throttle(func, delay) {
  // `lastTime` 用来记录上一次执行函数的时间戳
  let lastTime = 0;

  // 返回一个新的函数，当被调用时，内部会检查是否可以执行 `func`
  return function() {
    // 获取当前时间戳
    const now = Date.now();

    // 检查当前时间与上一次执行时间的间隔是否大于或等于 `delay`
    if (now - lastTime >= delay) {
      // 如果满足条件，调用 `func` 并将当前上下文 (`this`) 和参数传递过去
      func.apply(this, arguments);

      // 更新 `lastTime` 为当前时间
      lastTime = now;
    }
  };
}
