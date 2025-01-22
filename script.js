document.getElementById('updateForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const githubUsername = document.getElementById('githubUsername').value.trim();
    if (!githubUsername) {
        document.getElementById('message').textContent = 'لطفاً نام کاربری GitHub خود را وارد کنید.';
        return;
    }

    const customRepoName = document.getElementById('customRepoName').value.trim();
    const selectedRepoName = document.getElementById('repoName').value;
    const repoName = customRepoName || selectedRepoName;

    const customFilePath = document.getElementById('customFilePath').value.trim();
    const selectedFilePath = document.getElementById('filePath').value;
    const filePath = customFilePath || selectedFilePath;

    if (!repoName || !filePath) {
        document.getElementById('message').textContent = 'لطفاً یک نام ریپوزیتوری و فایل معتبر وارد کنید.';
        return;
    }

    const token = document.getElementById('githubToken').value.trim();
    const content = document.getElementById('content').value.trim();

    if (!token) {
        document.getElementById('message').textContent = 'لطفاً توکن GitHub خود را وارد کنید.';
        return;
    }

    const apiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`;

    try {
        // ابتدا فایل را می‌خوانیم تا SHA آن را دریافت کنیم
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            document.getElementById('message').textContent = `خطا در دریافت فایل: ${errorData.message}`;
            return;
        }

        const fileData = await response.json();
        const sha = fileData.sha;

        const updatedContent = btoa(unescape(encodeURIComponent(content)));

        // ارسال درخواست PUT برای آپلود تغییرات به GitHub
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
                sha: sha
            })
        });

        if (updateResponse.ok) {
            document.getElementById('message').textContent = `${filePath} با موفقیت بروز شد!`;
            setTimeout(() => {
                window.location.href = window.location.href; // رفرش صفحه بعد از آپلود موفق
            }, 2000);
        } else {
            const errorData = await updateResponse.json();
            document.getElementById('message').textContent = `خطایی رخ داده است در ${filePath}: ${errorData.message}`;
        }
    } catch (error) {
        document.getElementById('message').textContent = `خطا: ${error.message}`;
        console.error('Error:', error);
    }
});

// دکمه نمایش محتوا
document.getElementById('loadContentButton').addEventListener('click', async function() {
    const githubUsername = document.getElementById('githubUsername').value.trim();
    const customRepoName = document.getElementById('customRepoName').value.trim();
    const selectedRepoName = document.getElementById('repoName').value;
    const repoName = customRepoName || selectedRepoName;

    const customFilePath = document.getElementById('customFilePath').value.trim();
    const selectedFilePath = document.getElementById('filePath').value;
    const filePath = customFilePath || selectedFilePath;

    const token = document.getElementById('githubToken').value.trim();

    if (!githubUsername || !repoName || !filePath || !token) {
        document.getElementById('message').textContent = 'لطفاً تمام فیلدهای مورد نیاز را پر کنید.';
        return;
    }

    const apiUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            document.getElementById('message').textContent = `خطا در دریافت فایل: ${errorData.message}`;
            return;
        }

        const fileData = await response.json();
        const decodedContent = decodeURIComponent(escape(atob(fileData.content)));

        document.getElementById('content').value = decodedContent;
        document.getElementById('message').textContent = 'محتوا با موفقیت بارگذاری شد!';
    } catch (error) {
        document.getElementById('message').textContent = `خطا: ${error.message}`;
        console.error('Error:', error);
    }
});
