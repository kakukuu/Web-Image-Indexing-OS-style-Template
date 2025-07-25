// copySVG.js

/**
 * 动态复制页面中所有 SVG 元素代码的脚本。
 * 
 * 功能：
 * 1. 在页面加载完成后，绑定复制按钮的点击事件。
 * 2. 当点击按钮时，获取页面中所有的 SVG 元素，将其 HTML 代码复制到剪贴板。
 * 3. 如果复制成功，弹出提示；如果失败，显示错误信息。
 */

document.addEventListener("DOMContentLoaded", function () {
    // 获取页面中 ID 为 "copyButton" 的按钮元素
    const copyButton = document.getElementById("copyButton");

    // 检查按钮是否存在
    if (copyButton) {
        /**
         * 为复制按钮绑定点击事件：
         * - 点击后，查找页面中所有的 `<svg>` 元素。
         * - 将它们的 HTML 代码提取并拼接成一个字符串。
         * - 使用剪贴板 API 将拼接的字符串复制到剪贴板。
         */
        copyButton.addEventListener("click", function() {
            // 查找页面中所有的 SVG 元素
            const svgElements = document.querySelectorAll("svg"); // 获取所有 `<svg>` 元素
            let svgHTML = ""; // 初始化一个空字符串用于存储 SVG 代码

            // 遍历所有 SVG 元素，提取它们的 HTML 代码并拼接
            svgElements.forEach(function(svgElement) {
                svgHTML += svgElement.outerHTML + "\n"; // `outerHTML` 获取元素的完整 HTML
            });

            // 使用剪贴板 API 将 SVG 代码复制到剪贴板
            navigator.clipboard.writeText(svgHTML).then(() => {
                // 如果复制成功，弹出成功提示
                alert("所有 SVG 代码已复制");
            }).catch((err) => {
                // 如果复制失败，打印错误信息到控制台
                console.error("复制失败:", err);
            });
        });
    } else {
        // 如果未找到复制按钮，打印错误信息
        console.error("未找到复制按钮");
    }
});
