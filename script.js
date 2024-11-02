document.getElementById('updateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const repoName = document.getElementById('repoName').value;
    const filePath = document.getElementById('filePath').value;
    const token = document.getElementById('githubToken').value;
    const content = document.getElementById('content').value;
    const owner = 'davudsedft';

    const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        const fileData = await response.json();

        const updatedContent = btoa(unescape(encodeURIComponent(content))); // تبدیل متن به Base64

        const updateResponse = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Updating ${filePath} via web form`,
                content: updatedContent,
                sha: fileData.sha
            })
        });

        if (updateResponse.ok) {
            document.getElementById('message').textContent = `${filePath} با موفقیت بروز شد!`;
            // ریدایرکت به صفحه اصلی بعد از 2 ثانیه
            setTimeout(() => {
                window.location.href = window.location.href; // ریدایرکت به همان صفحه برای تازه کردن
            }, 2000);
        } else {
            const errorData = await updateResponse.json();
            document.getElementById('message').textContent = `خطایی رخ داده است در ${filePath}: ` + errorData.message;
        }
    } catch (error) {
        document.getElementById('message').textContent = `خطا در ${filePath}: ` + error.message;
    }
});
