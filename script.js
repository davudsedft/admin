document.getElementById('textForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const text = document.getElementById('textInput').value;

    // تابع برای بدست آوردن SHA فایل موجود
    async function getFileSHA() {
        const response = await fetch('https://api.github.com/repos/davudsedft/admin/contents/textfile.txt', {
            method: 'GET',
            headers: {
                'Authorization': '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'
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.sha;
        } else {
            throw new Error('Failed to retrieve SHA');
        }
    }

    let sha;
    try {
        sha = await getFileSHA();
    } catch (error) {
        console.error(error);
        document.getElementById('response').innerText = 'Failed to retrieve SHA.';
        return;
    }
    
    const response = await fetch('https://api.github.com/repos/davudsedft/admin/contents/textfile.txt', {
        method: 'PUT',
        headers: {
            'Authorization': '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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Updating text file',
            content: btoa(text),
            sha: sha
        })
    });

    if (response.ok) {
        document.getElementById('response').innerText = 'Text saved successfully!';
    } else {
        document.getElementById('response').innerText = 'Failed to save text.';
    }
});
