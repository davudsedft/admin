// ذخیره توکن و نمایش فرم بروزرسانی
document.getElementById('setTokenForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const token = document.getElementById('githubToken').value;
    localStorage.setItem('githubToken', token);

    document.getElementById('setTokenForm').style.display = 'none';
    document.getElementById('updateForm').style.display = 'block';
});

// بروزرسانی فایل در گیت‌هاب
document.getElementById('updateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const content = document.getElementById('content').value;
    const owner = 'davudsedft';
    const repo = 'admin';
    const path = 'textfile.txt';
    const token = localStorage.getItem('githubToken');

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

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
                message: 'Updating file via web form',
                content: updatedContent,
                sha: fileData.sha
            })
        });

        if (updateResponse.ok) {
            document.getElementById('message').textContent = 'فایل با موفقیت بروز شد!';
        } else {
            const errorData = await updateResponse.json();
            document.getElementById('message').textContent = 'خطایی رخ داده است: ' + errorData.message;
        }
    } catch (error) {
        document.getElementById('message').textContent = 'خطا: ' + error.message;
    }
});
