document.getElementById('loadContentButton').addEventListener('click', async function () {
    const githubUsername = document.getElementById('githubUsername').value.trim();
    if (!githubUsername) {
        document.getElementById('message').textContent = 'لطفاً نام کاربری GitHub خود را وارد کنید.';
        return;
    }

    const customRepoName = document.getElementById('customRepoName').value.trim();
    const selectedRepoName = document.getElementById('repoName').value;
    const repoName = customRepoName || selectedRepoName; // استفاده از مقدار ورودی کاربر یا پیشفرض

    const customFilePath = document.getElementById('customFilePath').value.trim();
    const selectedFilePath = document.getElementById('filePath').value;
    const filePath = customFilePath || selectedFilePath; // استفاده از مقدار ورودی کاربر یا پیشفرض

    if (!repoName) {
        document.getElementById('message').textContent = 'لطفاً یک نام ریپوزیتوری معتبر وارد کنید.';
        return;
    }

    if (!filePath) {
        document.getElementById('message').textContent = 'لطفاً یک آدرس فایل معتبر وارد کنید.';
        return;
    }

    const token = document.getElementById('githubToken').value.trim();

    const apiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('خطا در دریافت فایل: ' + response.statusText);
        }

        const fileData = await response.json();
        const fileContent = decodeURIComponent(escape(atob(fileData.content))); // Decode base64

        document.getElementById('content').value = fileContent; // نمایش محتوای فایل در textarea
        document.getElementById('message').textContent = `${filePath} با موفقیت بارگذاری شد.`;
    } catch (error) {
        document.getElementById('message').textContent = `خطا: ` + error.message;
        console.error('Error:', error);
    }
});
