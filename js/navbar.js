'use strict'

function checkForLoginData() {
    const userID = localStorage.getItem(LocalStorageKeys.LOGGED_IN_USER_ID)
    if (!userID || userID < 0) {     
        return
    }

    const loginSignoutLink = document.querySelector(".header .login-signout-link")
    loginSignoutLink.textContent = "Sign out"
    loginSignoutLink.href = "index.html"
    loginSignoutLink.onclick = function() {
        localStorage.removeItem(LocalStorageKeys.LOGGED_IN_USER_ID)
    }

    const modalLoginSignoutLink = document.querySelector(".header-modal .login-signout-link")
    modalLoginSignoutLink.textContent = "Sign out"
    modalLoginSignoutLink.href = "index.html"
    modalLoginSignoutLink.onclick = function() {
        localStorage.removeItem(LocalStorageKeys.LOGGED_IN_USER_ID)
    }
}

window.addEventListener('load', function() {
    const burgerMenu = document.getElementsByClassName("burger-menu")[0]
    const closeBtn = document.querySelector(".header-modal .close-button")
    const headerModal = document.querySelector(".header-modal")
    const navElem = document.querySelector(".header-modal >nav")

    burgerMenu.onclick = function(evt) {
        evt.preventDefault()
        headerModal.style.pointerEvents = "all"
        headerModal.style.opacity = "1"
        navElem.style.transform = "translateY(0rem)"
        navElem.style.opacity = "1"
    }

    closeBtn.onclick = function(evt) {
        evt.preventDefault()
        headerModal.style.pointerEvents = "none"
        headerModal.style.opacity = "0"
        navElem.style.transform = "translateY(10rem)"
        navElem.style.opacity = "0"
    }    

    checkForLoginData()
})