document.getElementById('textForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const text = document.getElementById('textInput').value;
    const response = await fetch('https://api.github.com/repos/davudsedft/admin/contents/textfile.txt', {
        method: 'PUT',
        headers: {
            'Authorization': 'token YOUR_GITHUB_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Updating text file',
            content: btoa(text),
            sha: 'SHA_OF_EXISTING_FILE' // نیاز داری SHA فایل موجود رو بدست بیاری و اینجا قرار بدی
        })
    });

    if (response.ok) {
        document.getElementById('response').innerText = 'Text saved successfully!';
    } else {
        document.getElementById('response').innerText = 'Failed to save text.';
    }
});
