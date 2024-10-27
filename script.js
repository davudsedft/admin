document.getElementById('textForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const text = document.getElementById('textInput').value;
    const sha = '8b137891791fe96927ad78e64b0aad7bded08bdc';

    try {
        const response = await fetch('https://api.github.com/repos/davudsedft/admin/contents/textfile.txt', {
            method: 'PUT', // مطمئن شو که متد درخواست به درستی تعریف شده
            headers: {
                'Authorization': 'token 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', // اضافه کردن 'token ' قبل از توکن
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Updating text file',
                content: btoa(unescape(encodeURIComponent(text))), // اصلاح تبدیل به Base64
                sha: sha
            })
        });

        if (response.ok) {
            document.getElementById('response').innerText = 'Text saved successfully!';
        } else {
            document.getElementById('response').innerText = 'Failed to save text.';
            console.error(`Failed to save text: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Request failed', error);
        document.getElementById('response').innerText = 'Failed to save text due to network error.';
    }
});
