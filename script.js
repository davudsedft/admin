document.getElementById('textForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const text = document.getElementById('textInput').value;

    // SHA فایل موجود
    const sha = '8b137891791fe96927ad78e64b0aad7bded08bdc';
    
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
