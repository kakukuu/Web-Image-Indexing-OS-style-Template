// copyCommitList.js

/**
 * 从 GitHub 仓库获取提交记录并复制到剪贴板的脚本。
 * 
 * 功能：
 * 1. 点击按钮后，使用 GitHub API 获取指定仓库的提交记录。
 * 2. 提取每个提交的详细信息（日期、提交消息、修改文件）。
 * 3. 将提交信息格式化后复制到剪贴板。
 * 4. 如果操作失败，向用户提供错误提示。
 */

document.addEventListener("DOMContentLoaded", function () {
    // 获取页面中 ID 为 "copyButton" 的按钮元素
    const copyButton = document.getElementById("copyButton");

    // 检查按钮是否存在
    if (copyButton) {
        // 为按钮绑定点击事件
        copyButton.addEventListener("click", function () {
            // 配置 GitHub API 的相关信息
            const username = "kakukuu"; // GitHub 用户名
            const repo = "Web-Indexing-OS-style-Template"; // 仓库名称
            // const key = ""; // 如果需要身份验证，请取消注释并提供有效的 GitHub Token

            const commitCount = 100; // 要获取的提交记录数量
            const apiUrl = `https://api.github.com/repos/${username}/${repo}/commits`; // GitHub 提交 API 地址

            // 调用 GitHub API 获取提交记录
            fetch(apiUrl
                /*, {
                headers: {
                    Authorization: `Bearer ${key}` // 使用身份验证（如果需要）
                }
            } */)
                .then(response => {
                    // 检查 API 响应状态
                    if (response.status === 403) {
                        throw new Error("API 限制已达到，请稍后再试");
                    }
                    if (!response.ok) {
                        throw new Error(`GitHub API 请求失败：状态码 ${response.status}`);
                    }
                    return response.json(); // 将响应解析为 JSON
                })
                .then(commits => {
                    // 获取每个提交的详细信息
                    const commitDetailsPromises = commits.slice(0, commitCount).map(commit => {
                        const commitUrl = commit.url; // 每个提交的详情 URL

                        // 调用 GitHub API 获取提交的详细信息
                        return fetch(commitUrl
                            /*, {
                            headers: {
                                Authorization: `Bearer ${key}` // 使用身份验证（如果需要）
                            }
                        } */)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`提交详情请求失败：状态码 ${response.status}`);
                                }
                                return response.json();
                            })
                            .then(commitDetails => {
                                // 提取提交信息
                                const commitMessage = commitDetails.commit.message; // 提交消息
                                const commitDate = new Date(commitDetails.commit.author.date).toLocaleDateString(); // 提交日期
                                const changedFiles = commitDetails.files?.length
                                    ? commitDetails.files.map(file => `⌈${file.filename.split('/').pop()}⌋`).join("; ") // 提取修改的文件名
                                    : "No files changed"; // 如果没有修改文件

                                return `${commitDate} - ${commitMessage}: ${changedFiles}`; // 格式化提交信息
                            });
                    });

                    return Promise.all(commitDetailsPromises); // 等待所有提交的详细信息
                })
                .then(commitStrings => {
                    // 拼接所有提交信息为一个字符串
                    const output = commitStrings.join("\n");

                    // 将字符串复制到剪贴板
                    navigator.clipboard.writeText(output).then(() => {
                        alert("提交记录已复制到剪切板！");
                    }).catch(err => {
                        console.error("复制失败:", err);
                        alert("复制失败，请检查剪切板权限！");
                    });
                })
                .catch(error => {
                    // 捕获所有错误并显示用户友好的提示
                    console.error("错误：", error.message);
                    alert(`操作失败：${error.message}`);
                });
        });
    } else {
        // 如果未找到按钮，打印错误信息
        console.error("未找到复制按钮");
    }
});
