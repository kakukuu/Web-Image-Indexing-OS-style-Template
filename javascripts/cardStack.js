document.addEventListener('DOMContentLoaded', () => {
  const stacks = document.querySelectorAll('.stack');

  // 辅助函数：根据 stack 内容实际高度设置 align-content
  function adjustStackAlignContent(stack) {
    const stackHeight = stack.scrollHeight; // 使用实际内容高度
    if (stackHeight > window.innerHeight) { // 当内容高度超出视口高度
      stack.style.alignContent = 'flex-start';
    } else {
      stack.style.alignContent = 'center';
    }
  }

  // 在窗口尺寸变化时，检查所有已展开的堆，调用辅助函数调整对齐方式
  window.addEventListener('resize', () => {
    stacks.forEach(stack => {
      if (stack.classList.contains('active')) {
        adjustStackAlignContent(stack);
      }
    });
  });

  stacks.forEach(stack => {
    const cards = stack.querySelectorAll('.cell.subcell a');
    let expanded = false;

    // 记录 stack 原本所在的位置（父节点 + 下一个兄弟节点）
    const originalParent = stack.parentNode;
    const originalNextSibling = stack.nextSibling;

    function expandCards() {
      if (expanded) return;
      expanded = true;

      // 禁止 body 滚动 + 开启背景模糊
      document.body.classList.add('no-scroll', 'stack-blur');

      // 激活时把 stack 移到 body，脱离 grid / 外层 overflow / transform 影响
      document.body.appendChild(stack);

      stack.classList.add('active');

      // 激活后立即根据内容高度调整对齐
      adjustStackAlignContent(stack);
    }

    function collapseCards() {
      if (!expanded) return;
      expanded = false;

      stack.classList.remove('active');
      // 恢复滚动 + 关闭背景模糊
      document.body.classList.remove('no-scroll', 'stack-blur');

      // 收起时把 stack 放回原来的 grid 位置
      if (originalNextSibling && originalNextSibling.parentNode === originalParent) {
        originalParent.insertBefore(stack, originalNextSibling);
      } else {
        originalParent.appendChild(stack);
      }

      // 可按需恢复 align-content，避免影响 grid 内布局
      stack.style.alignContent = '';
    }

    stack.addEventListener('click', (e) => {
      if (!expanded) {
        e.preventDefault(); // 防止 a 标签跳转
        expandCards();
      } else {
        // 点击空白区域关闭
        collapseCards();
      }
    });

    cards.forEach(link => {
      link.addEventListener('click', (e) => {
        if (!expanded) {
          e.preventDefault(); // 阻止未展开状态下 a 直接跳转
          expandCards();
        } else {
          e.stopPropagation(); // 阻止展开状态下触发 stack 收起
          // 展开状态下点击链接，如果要真的跳转，可以在这里放行：
          // 例如：window.location.href = link.href;
        }
      });
    });
  });
});
