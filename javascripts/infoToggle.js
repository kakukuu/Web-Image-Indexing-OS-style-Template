// infoToggle.js


function toggleInfoPanel() {
    const infoIcon = document.getElementById('infoIcon');
    const infoPanel = document.getElementById('infoPanel');
    const header = document.querySelector('.header');
    const headerSignature = document.querySelector('.subheader.signature'); // 选择签名元素(仅对index生效)
    const lightIcon = new Image();
    lightIcon.src = 'assets/images/info-icon-light.svg';
    const darkIcon = new Image();
    darkIcon.src = 'assets/images/info-icon-dark.svg';
    let isClickable = true; // 用于防止连续点击


    infoIcon.addEventListener('click', function() {
        if (!isClickable) return; // 如果不可点击则直接返回
        isClickable = false; // 设置为不可点击
        // 1 秒后恢复可点击状态
        setTimeout(() => {
            isClickable = true;
        }, 600);

        if (infoPanel.classList.contains('open')) {
            // 关闭面板
            infoPanel.classList.remove('open');
            setTimeout(() => {
                header.classList.remove('expanded');
            }, 550); // 600ms 延迟
            infoIcon.src = lightIcon.src;
            headerSignature.classList.remove('open'); // 隐藏签名 (仅对index生效)
        } else {
            // 打开面板
            infoPanel.classList.add('open');
            header.classList.add('expanded'); // 增加 header 高度（仅对page生效）
            infoIcon.src = darkIcon.src;
            headerSignature.classList.add('open'); // 显示签名 (仅对index生效)
        }

        
    });
}
