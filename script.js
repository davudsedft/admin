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
        
        // محاسبه تعداد خطوط و نمایش هشدار
        const lineCount = decodedContent.split('\n').length;
        alert(`تعداد خطوط موجود در فایل: ${lineCount}`);
    } catch (error) {
        document.getElementById('message').textContent = `خطا: ${error.message}`;
        console.error('Error:', error);
    }
});
