<!DOCTYPE html>
<html>
<head>
    <title>Test Upload</title>
</head>
<body>
<form action="/" method="POST" enctype="multipart/form-data">
    @csrf
    <input type="file" name="image" required>
    <button type="submit">Uploader</button>
</form>
</body>
</html>
