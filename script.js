document.querySelectorAll('.updateForm').forEach(form => {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const token = form.querySelector('input[type="text"]').value;
        const content = form.querySelector('textarea').value;
        const owner = 'davudsedft';
        const repo = 'newpurnet'; // نام ریپوزیتوری عمومی
        const path = form.getAttribute('data-file'); // دریافت نام فایل از ویژگی داده فرم

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
                    message: `Updating ${path} via web form`,
                    content: updatedContent,
                    sha: fileData.sha
                })
            });

            if (updateResponse.ok) {
                document.getElementById('message').textContent = `${path} با موفقیت بروز شد!`;
                // ریدایرکت به صفحه اصلی بعد از 2 ثانیه
                setTimeout(() => {
                    window.location.href = window.location.href; // ریدایرکت به همان صفحه برای تازه کردن
                }, 2000);
            } else {
                const errorData = await updateResponse.json();
                document.getElementById('message').textContent = `خطایی رخ داده است در ${path}: ` + errorData.message;
            }
        } catch (error) {
            document.getElementById('message').textContent = `خطا در ${path}: ` + error.message;
        }
    });
});
