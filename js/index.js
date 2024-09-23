const NAV_LINKS = {
    HOME: "",
}

window.onload = function () {
    console.log("setupAuth()")

    const usernameInput = document.getElementsByClassName("username-input")[0]
    const passwordInput = document.getElementsByClassName("password-input")[0]
    const loginBtn = document.getElementsByClassName("login-btn")[0]

    loginBtn.onclick = function () {
        let outputMsg = "Login button clicked, sign in with following params\n"
        outputMsg += "Username: " + usernameInput.value + "\n"
        outputMsg += "Password: " + passwordInput.value + "\n"
        window.alert(outputMsg)

        window.location.href = "./pages/home.html"
    }
}
