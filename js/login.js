class UserAccount {
    constructor(id, username, password) {
        this.id = id
        this.username = username
        this.password = password
    }
}

function hookUpRegisterFunctionality() {
    const signupBtn = document.querySelector(".form-right.register .register-btn")
    signupBtn.onclick = function (evt) {
        evt.preventDefault()

        // localStorage.removeItem(LocalStorageKeys.USER_ACCOUNTS)
        const usernameValue = document.querySelector(".register .username-input").value
        const passwordValue = document.querySelector(".register .password-input").value

        // Lazily create entry for the USER_ACCOUNTS key in localStorage
        if (!localStorage.getItem(LocalStorageKeys.USER_ACCOUNTS)) {
            localStorage.setItem(LocalStorageKeys.USER_ACCOUNTS, JSON.stringify([]))
        }

        // Check if said username already exists - can't register with that name anymore
        const userAccounts = JSON.parse(localStorage.getItem(LocalStorageKeys.USER_ACCOUNTS))
        const accountsWithName = userAccounts.find(acc => {
            return acc.username.toLowerCase() === usernameValue.toLowerCase()
        })
        if (accountsWithName) {
            console.log("Account with the name ", usernameValue, " already exists")
            return
        }

        // Add the new user account
        const newUserID = userAccounts.length
        userAccounts.push(new UserAccount(newUserID, usernameValue, passwordValue))
        localStorage.setItem(LocalStorageKeys.USER_ACCOUNTS, JSON.stringify(userAccounts))
    }
}

function hookUpLoginFunctionality() {
    const loginBtn = document.querySelector(".form-right.login .login-btn")
    loginBtn.onclick = function (evt) {
        evt.preventDefault()

        const userAccounts = JSON.parse(localStorage.getItem(LocalStorageKeys.USER_ACCOUNTS))
        if (!userAccounts) {
            console.log("Account not found")
        }

        const usernameValue = document.querySelector(".login .username-input").value
        const passwordValue = document.querySelector(".login .password-input").value

        const accountWithName = userAccounts.find(acc => {
            return acc.username.toLowerCase() === usernameValue.toLowerCase()
        })
        if (!accountWithName) {
            console.log("User with name of '", usernameValue, "' not found")
            return
        }
        if (passwordValue != accountWithName.password) {
            console.log("Incorrect password for user: ", usernameValue, ". The password is: ", accountWithName.password)
            return
        }
        localStorage.setItem(LocalStorageKeys.LOGGED_IN_USER_ID, accountWithName.id)
        window.location.href = "carCatalogue.html"
    }
}

function linkClickHandler(elemToShow, elemToHide) {
    elemToShow.style.display = "flex"
    elemToHide.style.display = "none"
}

window.addEventListener('load', function () {
    // QUick way to clear the local storage key
    // this.localStorage.removeItem(LocalStorageKeys.USER_ACCOUNTS)

    const loginForm = this.document.querySelector(".form-right.login")
    const registerForm = this.document.querySelector(".form-right.register")
    loginForm.querySelector(".registration-link").onclick = function (evt) {
        evt.preventDefault()
        console.log("Registration link was clicked")
        linkClickHandler(registerForm, loginForm)
    }
    registerForm.querySelector(".login-link").onclick = function (evt) {
        evt.preventDefault()
        console.log("Login link was clicked")
        linkClickHandler(loginForm, registerForm)
    }

    hookUpRegisterFunctionality()
    hookUpLoginFunctionality()
})