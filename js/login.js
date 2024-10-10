function linkClickHandler(elemToShow, elemToHide) {
    elemToShow.style.display = "flex"
    elemToHide.style.display = "none"
}

window.addEventListener('load', function() {
    const loginForm = this.document.querySelector(".form-right.login")
    const registerForm = this.document.querySelector(".form-right.register")
    loginForm.querySelector(".registration-link").onclick = function(evt) {
        evt.preventDefault()
        console.log("Registration link was clicked")
        linkClickHandler(registerForm, loginForm)
    }
    registerForm.querySelector(".login-link").onclick = function(evt) {
        evt.preventDefault()
        console.log("Login link was clicked")
        linkClickHandler(loginForm, registerForm)
    }

})