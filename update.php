<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $content = $_POST['content'];
    $owner = 'davudsedft';
    $repo = 'admin';
    $path = 'textfile.txt';
    $token = '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'; // توکن درستت رو اینجا وارد کن

    $apiUrl = "https://api.github.com/repos/$owner/$repo/contents/$path";

    // ابتدا گرفتن اطلاعات فایل برای بدست آوردن SHA
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: token ' . $token,
        'User-Agent: PHP'
    ]);

    $response = curl_exec($ch);
    $fileData = json_decode($response, true);

    if (isset($fileData['sha'])) {
        $sha = $fileData['sha'];

        // بروزرسانی فایل
        $updatedContent = base64_encode($content);
        $data = json_encode([
            'message' => 'Updating file via PHP script',
            'content' => $updatedContent,
            'sha' => $sha
        ]);

        curl_setopt($ch, CURLOPT_URL, $apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: token ' . $token,
            'User-Agent: PHP',
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

        $updateResponse = curl_exec($ch);
        $updateData = json_decode($updateResponse, true);

        if (isset($updateData['content'])) {
            echo "فایل با موفقیت بروز شد!";
        } else {
            echo "خطا در بروز رسانی فایل: " . $updateData['message'];
        }
    } else {
        echo "خطا در دریافت اطلاعات فایل: " . $fileData['message'];
    }

    curl_close($ch);
} else {
    echo "درخواست نامعتبر.";
}
?>
