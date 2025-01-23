




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
    const content2 = getJalaliDateString();

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
        const updatedContent2 = btoa(unescape(encodeURIComponent(content2)));


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

        if(repoName == "dozz"){
            const filePath2 = "message.txt";

            const apiUrl2 = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${filePath2}`;



            const response = await fetch(apiUrl2, {
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
            const updateResponse = await fetch(apiUrl2, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Updating ${filePath2} via web form`,
                    content: updatedContent2,
                    sha: sha
                })
            });







        }
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
   

           document.getElementById('number').textContent = lineCount;
    } catch (error) {
        document.getElementById('message').textContent = `خطا: ${error.message}`;
        console.error('Error:', error);
    }
});















function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let jy, jm, jd;
    if (gy > 1600) {
        jy = 979;
        gy -= 1600;
    } else {
        jy = 0;
        gy -= 621;
    }
    const gy2 = (gm > 2) ? (gy + 1) : gy;
    let days = (365 * gy) + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) - 80 + gd + g_d_m.slice(0, gm).reduce((a, b) => a + b, 0);
    jy += 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
        jy += Math.floor((days - 1) / 365);
        days = (days - 1) % 365;
    }
    jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return [jy, jm, jd];
}

function getJalaliDateString() {
    const now = new Date();
    const gy = now.getFullYear();
    const gm = now.getMonth() + 1;
    const gd = now.getDate();
    const [jy, jm, jd] = gregorianToJalali(gy, gm, gd);

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `آخرین آپدیت مخازن  در تاریخ ${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')} - ${hours}:${minutes}:${seconds}.`;
}


