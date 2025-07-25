// commitList.js

/**
 * 从 GitHub 仓库获取最近的提交记录并展示在页面中。
 * 
 * 功能：
 * 1. 调用 GitHub API 获取提交记录。
 * 2. 对于每条提交，获取详细信息（提交消息、日期、修改文件）。
 * 3. 将提交信息以列表形式显示在 HTML 页面上。
 */

// GitHub 用户名和仓库名称
const username = "kakukuu"; // GitHub 用户名
const repo = "Web-Indexing-OS-style-Template"; // 仓库名称
// const key = ""; // 如果需要身份验证，请取消注释并提供有效的 GitHub Token

const commitCount = 2; // 要获取的提交记录数量

// GitHub API 获取提交记录的 URL
const apiUrl = `https://api.github.com/repos/${username}/${repo}/commits`;

// 调用 GitHub API 获取提交记录
fetch(apiUrl)
    .then(response => {
        // 检查响应是否成功
        if (!response.ok) {
            throw new Error(`GitHub API 请求失败：状态码 ${response.status}`);
        }
        return response.json(); // 解析响应为 JSON
    })
    .then(commits => {
        const commitList = document.getElementById("commit-list"); // 获取页面中展示提交记录的元素
        commitList.innerHTML = ""; // 清空加载中的占位内容

        // 在所有项前添加一个列表项
        const headerItem = document.createElement("li");
        headerItem.textContent = "……";
        commitList.appendChild(headerItem);

        // 获取最近 n 条提交记录
        commits.slice(0, commitCount).forEach(commit => {
            const commitUrl = commit.url; // 每条提交的详情 URL

            // 获取提交详情
            fetch(commitUrl)
                .then(response => response.json())
                .then(commitDetails => {
                    const listItem = document.createElement("li"); // 创建列表项

                    // 提取提交信息
                    const commitMessage = commitDetails.commit.message; // 提交消息
                    const commitDate = new Date(commitDetails.commit.author.date).toLocaleDateString(); // 提交日期

                    // 提取改动的文件
                    const changedFiles = commitDetails.files?.length
                        ? commitDetails.files.map(file => `⌈${file.filename.split('/').pop()}⌋`).join("; ") // 提取文件名
                        : "No files changed"; // 如果没有改动文件

                    // 构建列表项内容
                    listItem.innerHTML = `
                        <p>${commitDate} - ${commitMessage}: ${changedFiles}</p>`;
                    commitList.appendChild(listItem); // 将列表项添加到提交记录列表中
                })
                .catch(error => {
                    // 处理获取提交详情时的错误
                    console.error("获取提交详情出错：", error);
                    commitList.innerHTML += `<li>Failed to load commit details: ${commit.url}</li>`;
                });
        });
    })
    .catch(error => {
        // 处理获取提交记录时的错误
        console.error("错误：", error);
        document.getElementById("commit-list").textContent = "No updates available"; // 显示错误信息
    });
