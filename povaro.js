document.getElementById('updateForm2').addEventListener('submit2', async function(event) {
    event.preventDefault();

    const token = document.getElementById('githubToken').value;
    const content = document.getElementById('content2').value;
    const owner = 'davudsedft';
    const repo = 'purvpn'; // نام ریپوزیتوری عمومی
    const path = 'link/t.test'; // مسیر فایل تکست

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        const fileData = await response.json();

        const updatedContent = btoa(unescape(encodeURIComponent(content2))); // تبدیل متن به Base64

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
            document.getElementById('message2').textContent = 'فایل با موفقیت بروز شد!';
        } else {
            const errorData = await updateResponse.json();
            document.getElementById('message2').textContent = 'خطایی رخ داده است: ' + errorData.message;
        }
    } catch (error) {
        document.getElementById('message2').textContent = 'خطا: ' + error.message;
    }
});
