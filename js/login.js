class UserAccount {
    constructor(id, username, password) {
        this.id = id
        this.username = username
        this.password = password
    }
}

const TOAST_SUCCESS = 0
const TOAST_ERROR = 1

const STATUS_LENGTH = 0
const STATUS_LOWERCASE = 1
const STATUS_UPPERCASE = 2
const STATUS_NOSPACE = 3
const STATUS_HASDIGIT = 4

function getPasswordValidationStatus(password) {
    const status = {}
    status[STATUS_LENGTH] = /.{8,16}/.test(password)
    status[STATUS_LOWERCASE] = /(?=.*[a-z])/.test(password) 
    status[STATUS_UPPERCASE] = /(?=.*[A-Z])/.test(password) 
    status[STATUS_NOSPACE] = /(?!.* )/.test(password)
    status[STATUS_HASDIGIT] = /(?=.*[0-9])/.test(password)
    return status
}

function pushToast(toastMessage, toastType, animTimeSeconds = 4) {
    const toastContainer = document.querySelector(".toast-container")
    
    const toastElem = document.createElement('div')
    const svgPath = toastType === TOAST_SUCCESS ? "assets/svg/Success.svg" : "assets/svg/Error.svg" 
    toastElem.classList.add('toast')
    toastElem.innerHTML = `
        <img src="${svgPath}" alt="">
        <span>${toastMessage}</span>`

    const afterElement = document.createElement('div');
    afterElement.style.content = "''";
    afterElement.style.position = 'absolute';
    afterElement.style.left = '0';
    afterElement.style.bottom = '0';
    afterElement.style.width = '100%';
    afterElement.style.height = '4px';
    afterElement.style.backgroundColor = toastType === TOAST_SUCCESS ? '#2ec27e' : 'red';
    afterElement.style.animation = `progress_bar ${animTimeSeconds}s linear forwards`;

    toastElem.appendChild(afterElement)
    setTimeout(() => toastElem.remove(), animTimeSeconds * 1000)

    toastContainer.appendChild(toastElem) 
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
            pushToast("Username is taken", TOAST_ERROR)
            return
        }

        if (!/.{5}/.test(usernameValue)) {
            pushToast("Username must have at least 5 characters", TOAST_ERROR, 3)
            return
        }

        // Check if the password meets security constraints
        const passwordStatus = getPasswordValidationStatus(passwordValue)
        if (!passwordStatus[STATUS_LENGTH]) {
            pushToast("Password must have 8-16 characters", TOAST_ERROR)
            return
        }
        if (!passwordStatus[STATUS_NOSPACE]) {
            pushToast("Password must have no spaces", TOAST_ERROR)
            return
        }
        if (!passwordStatus[STATUS_HASDIGIT]) {
            pushToast("Password must have at least 1 digit", TOAST_ERROR)
            return
        }
        if (!passwordStatus[STATUS_LOWERCASE]) {
            pushToast("Password must have a lowercase character", TOAST_ERROR)
            return
        }
        if (!passwordStatus[STATUS_UPPERCASE]) {
            pushToast("Password must have an uppercase character", TOAST_ERROR)
            return
        }
        
        // Check passwords match
        const confirmedPasswordValue = document.querySelector(".register .confirm-password-input").value
        console.log("Password: ", passwordValue)
        console.log("Confirmed PWD: ", confirmedPasswordValue)
        if (passwordValue !== confirmedPasswordValue) {
            pushToast("Passwords do not match", TOAST_ERROR)
            return
        } 

        // Add the new user account
        const newUserID = userAccounts.length
        userAccounts.push(new UserAccount(newUserID, usernameValue, passwordValue))
        localStorage.setItem(LocalStorageKeys.USER_ACCOUNTS, JSON.stringify(userAccounts))

        pushToast('Successfully registered account', TOAST_SUCCESS, 5)
    }
}

function hookUpLoginFunctionality() {
    const loginBtn = document.querySelector(".form-right.login .login-btn")
    loginBtn.onclick = function (evt) {
        evt.preventDefault()

        const userAccounts = JSON.parse(localStorage.getItem(LocalStorageKeys.USER_ACCOUNTS))
        if (!userAccounts) {
            // console.log("Account not found")
            pushToast("Account not found", TOAST_ERROR, 2)
        }

        const usernameValue = document.querySelector(".login .username-input").value
        const passwordValue = document.querySelector(".login .password-input").value

        const accountWithName = userAccounts.find(acc => {
            return acc.username.toLowerCase() === usernameValue.toLowerCase()
        })
        if (!accountWithName) {
            pushToast("Account not found", TOAST_ERROR, 3)
            return
        }
        if (passwordValue != accountWithName.password) {
            pushToast("Incorrect password", TOAST_ERROR, 3)
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
        // console.log("Registration link was clicked")
        linkClickHandler(registerForm, loginForm)
    }
    registerForm.querySelector(".login-link").onclick = function (evt) {
        evt.preventDefault()
        // console.log("Login link was clicked")
        linkClickHandler(loginForm, registerForm)
    }

    hookUpRegisterFunctionality()
    hookUpLoginFunctionality()
})