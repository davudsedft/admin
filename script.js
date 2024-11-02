
document.getElementById('updateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

     const content = document.getElementById('content').value;
    const owner = 'davudsedft';
    const repo = 'admin';
    const path = 'textfile.txt';
    const token = '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';

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
        // مرحله 1: حذف فایل
        const getFileResponse = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        const fileData = await getFileResponse.json();

        const deleteResponse = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Deleting file via web form',
                sha: fileData.sha
            })
        });

        if (!deleteResponse.ok) {
            const errorData = await deleteResponse.json();
            document.getElementById('message').textContent = 'خطا در حذف فایل: ' + errorData.message;
            return;
        }

        // مرحله 2: ایجاد فایل جدید
        const updatedContent = btoa(unescape(encodeURIComponent(content))); // تبدیل متن به Base64

        const createResponse = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Creating new file via web form',
                content: updatedContent
            })
        });

        if (createResponse.ok) {
            document.getElementById('message').textContent = 'فایل با موفقیت بروز شد!';
        } else {
            const errorData = await createResponse.json();
            document.getElementById('message').textContent = 'خطایی رخ داده است: ' + errorData.message;
        }
    } catch (error) {
        document.getElementById('message').textContent = 'خطا: ' + error.message;
    }
});






