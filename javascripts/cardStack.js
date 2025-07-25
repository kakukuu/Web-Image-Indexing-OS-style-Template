document.addEventListener('DOMContentLoaded', () => {
  const stacks = document.querySelectorAll('.stack');

  // 辅助函数：根据stack内容实际高度设置align-content
  function adjustStackAlignContent(stack) {
    if (stackheight > window.innerHeight) { // 当stack内容高度超出浏览器视口高度
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
    const cards = stack.querySelectorAll('.card.lecture.subcard a');
    let expanded = false;

    function expandCards() {
      if (expanded) return;
      expanded = true;
      document.body.classList.add('no-scroll');
      stack.classList.add('active');
    }

    function collapseCards() {
      if (!expanded) return;
      expanded = false;
      stack.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }

    stack.addEventListener('click', (e) => {
      if (!expanded) {
        e.preventDefault(); // 防止 a 标签跳转
        expandCards();
        setTimeout(() => {
          adjustStackAlignContent(stack);
        }, 200); // 延迟100 毫秒执行
      } else {
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
        }
      });
    });
  });
});
