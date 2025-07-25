// favicon.js

/**
 * 动态设置网页 Favicon 的脚本。
 * 
 * 功能：
 * 1. 删除页面中现有的 favicon 标签。
 * 2. 动态创建并添加新的 favicon。
 * 
 * 什么是 Favicon？
 * - Favicon 是网页标签上显示的小图标，通常是网站的标志或图标。
 * - 常见格式包括 `.ico`、`.png` 和 `.svg`。
 * 
 * 外部引用：
 * - `assets/images/icon.svg` 和 `assets/images/icon.png` 是存储 favicon 图标的文件路径，
 *   需要确保这些文件存在。
 */

(function () {
    // 设置 Favicon 的函数
    function setFavicon(icons) {
        /**
         * 删除现有的 favicon：
         * - 查找所有带有 `rel="icon"` 属性的 `<link>` 标签。
         * - 使用 `forEach` 遍历并从文档中移除它们。
         */
        document.querySelectorAll('link[rel="icon"]').forEach(icon => icon.remove());

        /**
         * 动态添加新的 favicon：
         * - 遍历 `icons` 数组，为每个图标创建一个 `<link>` 元素。
         * - 设置 `rel`、`href`、`type` 和 `sizes` 属性。
         * - 将新的 `<link>` 标签添加到页面的 `<head>` 部分。
         */
        icons.forEach(({ href, type, sizes }) => {
            const link = document.createElement('link'); // 创建新的 `<link>` 元素
            link.rel = 'icon'; // 设置链接关系为 "icon"
            link.href = href; // 设置图标文件路径
            link.type = type; // 设置图标文件类型 (如 `image/svg+xml` 或 `image/png`)
            if (sizes) link.sizes = sizes; // 如果提供了尺寸信息，设置 `sizes` 属性
            document.head.appendChild(link); // 将 `<link>` 元素添加到文档的 `<head>` 部分
        });
    }

    // 初始化设置 Favicon
    /**
     * 调用 `setFavicon` 函数，传入图标数组。
     * 每个图标对象包含以下属性：
     * - `href`：图标文件的路径。
     * - `type`：图标文件的 MIME 类型。
     * - `sizes` (可选)：图标尺寸（如 "64x64" 表示 64 像素宽和高的正方形图标）。
     */
    setFavicon([
        { href: 'assets/images/icon.svg', type: 'image/svg+xml' }, // 矢量格式图标
        { href: 'assets/images/icon.png', type: 'image/png', sizes: '64x64' } // 位图格式图标，尺寸 64x64
    ]);

})();
