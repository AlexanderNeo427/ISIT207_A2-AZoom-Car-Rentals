'use strict'

function initializeTimer() {
    let timeLeftSeconds = 15
    const timerElem = document.querySelector(".order-confirmation-body .countdown-timer")
    timerElem.textContent = timeLeftSeconds

    const decrementTimer = function () {
        timeLeftSeconds -= 1
        timerElem.textContent = timeLeftSeconds
        if (timeLeftSeconds <= 0) {
            window.location.href = "index.html"
        }
        setTimeout(decrementTimer, 1000)
    }
    decrementTimer()
}

window.addEventListener('load', function () {
    document.querySelector(".order-confirmation-body .ID-value").textContent = '#' + Utils.generateRandomString(10)
    initializeTimer()
})