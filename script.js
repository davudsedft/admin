document.getElementById('updateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const content = document.getElementById('content').value;
    const owner = 'davudsedft';
    const repo = 'admin';
    const path = 'textfile.txt';
    const token = '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';

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
            document.getElementById('message').textContent = 'خطایی رخ داده است.';
        }
    } catch (error) {
        document.getElementById('message').textContent = 'خطا: ' + error.message;
    }
});
