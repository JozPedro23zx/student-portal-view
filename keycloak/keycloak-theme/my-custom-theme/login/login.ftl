<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="${url.resourcesPath}/css/style.css">
</head>
<body>
    <div class="login-page">
        <div class="login-box">
            <h1>Login</h1>
            <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                <input type="text" id="username" name="username" placeholder="User" autofocus="true" autocomplete="off">
                <input type="password" id="password" name="password" placeholder="Password">
                <input type="submit" name="login" id="kc-login" value="Login">
            </form>
        </div>
    </div>
</body>
</html>
