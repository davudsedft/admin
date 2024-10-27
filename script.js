document.getElementById('textForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const text = document.getElementById('textInput').value;

    // SHA فایل موجود
    const sha = '8b137891791fe96927ad78e64b0aad7bded08bdc';
    
    const response = await fetch('https://raw.githubusercontent.com/davudsedft/admin/refs/heads/main/textfile.txt', {
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
