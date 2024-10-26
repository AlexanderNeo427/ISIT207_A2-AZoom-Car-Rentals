'use strict'

function setBookingDetails(carDatum) {
    const pickupDetails = JSON.parse(localStorage.getItem(LocalStorageKeys.PICKUP_DETAILS))
    const pickupDatetime = new Date(`${pickupDetails.date} ${pickupDetails.time}`)

    const returnDetails = JSON.parse(localStorage.getItem(LocalStorageKeys.RETURN_DETAILS))
    const returnDatetime = new Date(`${returnDetails.date} ${returnDetails.time}`)

    document.querySelector(".car-img").src = carDatum.imageURL
    document.querySelector(".car-make-model").innerHTML = carDatum.make + " " + carDatum.model

    // const diffSeconds = (returnDatetime.getTime() - pickupDatetime.getTime()) / 1000
    // const rentDuration =
    //     diffSeconds < SECONDS_PER_DAY ?
    //         `${Math.floor(diffSeconds / (60 * 60))} rental hour(s)` :
    //         `${Math.floor(diffSeconds / SECONDS_PER_DAY)} rental days`
    const diffSeconds = (returnDatetime.getTime() - pickupDatetime.getTime()) / 1000
    const diffDays = returnDatetime.getDate() - pickupDatetime.getDate()
    let rentDuration = -427
    if (diffDays <= 1) {
        const diffHours = Math.floor(diffSeconds / SECONDS_PER_HOUR)
        rentDuration = `${diffHours} rental hour` + (diffHours > 1 ? 's' : '')
    }
    else {
        rentDuration = `${diffDays} rental day` + (diffDays > 1 ? 's' : '')
    }

    document.querySelector(".rent-duration").innerHTML = rentDuration

    const detailNode = document.querySelector(".pickup-return-details")

    const pickupDetailNode = detailNode.querySelector(".pickup")
    pickupDetailNode.querySelector(".pickup-return-location").innerHTML = pickupDetails.location
    pickupDetailNode.querySelector(".pickup-return-date").innerHTML = customDateTimeFormat(pickupDatetime)

    const returnDetailNode = detailNode.querySelector(".return")
    returnDetailNode.querySelector(".pickup-return-location").innerHTML = returnDetails.location
    returnDetailNode.querySelector(".pickup-return-date").innerHTML = customDateTimeFormat(returnDatetime)

    const bookingOverview = document.querySelector(".booking-overview")

    const hoursRented = diffSeconds / (60 * 60)
    const rentalFee = hoursRented * carDatum.hourlyRate
    const rentalFeeNode = bookingOverview.querySelector(".rental-cost")
    rentalFeeNode.innerHTML = `SGD ${rentalFee.toFixed(2)}`

    const addonCost = Utils.randFloat(10, 100)
    bookingOverview.querySelector(".addon-cost").innerHTML = `SGD ${addonCost.toFixed(2)}`

    const insuranceCost = Utils.randFloat(10, 100)
    bookingOverview.querySelector(".insurance-cost").innerHTML = `SGD ${insuranceCost.toFixed(2)}`

    bookingOverview.querySelector(".cost-final").innerHTML = `SGD ${(rentalFee + addonCost + insuranceCost).toFixed(2)}`
}

function wireCheckoutFunctionality() {
    const checkoutButtons = [
        document.querySelector(".car-checkout-body .confirmation-btn-small"),
        document.querySelector(".car-checkout-body .confirmation-btn-large")
    ]
    const inputForms = Array.from(document.querySelectorAll("form"))
    checkoutButtons.forEach(btn => {
        btn.onclick = function() {
            for (let i = 0; i < inputForms.length; i++) {
                if (!inputForms[i].reportValidity()) {
                    return
                }
            } 
            window.location.href = "orderConfirmation.html"
        }
    })
}

function setupInputConstraints() {

    // FIRST NAME/LAST NAME INPUT VALIDATION
    document.querySelector("#firstname-input").addEventListener('keydown', evt => {
        const isAlphabet = (/^[A-Za-z]+$/).test(evt.key)
        if (!isAlphabet && evt.key !== 'Backspace' && evt.key !== 'Delete') {
            evt.preventDefault()
        }
    })
    document.querySelector("#lastname-input").addEventListener('keydown', evt => {
        const isAlphabet = (/^[A-Za-z]+$/).test(evt.key)
        if (!isAlphabet && evt.key !== 'Backspace' && evt.key !== 'Delete') {
            evt.preventDefault()
        }
    })

    // CREDIT CARD VALIDATION
    const creditCardInput = document.querySelector("#credit-card-input")
    creditCardInput.addEventListener('keydown', evt => {
        if (isNaN(evt.key)  && evt.key !== 'Backspace' && evt.key !== 'Delete') {
            evt.preventDefault()
            return
        }
    })
    creditCardInput.addEventListener('input', evt => {
        let cardNumber = evt.target.value.replace(/-/g, ''); 
        cardNumber = cardNumber.match(/.{1,4}/g)?.join('-') ?? ''; 
        evt.target.value = cardNumber;

        const cardRegexes = {
            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            mastercard: /^5[1-5][0-9]{14}$/,
            amex: /^3[47][0-9]{13}$/,
        };
        const trimmedCardNumber = Array.from(evt.target.value)
                                        .filter(chr => chr !== "-").join('')
        document.querySelectorAll(".payment-info-cards img").forEach(cardImg => {
            const cardType = cardImg.dataset.cardType
            const cardRegex = cardRegexes[cardType] 
            if (cardRegex && cardRegex.test(trimmedCardNumber)) {
                cardImg.style.opacity = '100%'
            }
            else {
                cardImg.style.opacity = '50%'
            }
        })
    })

    // CREDIT CARD NAME VALIDATION
    document.querySelector("#cardholder-name-input").addEventListener('keydown', evt => {
        const isAlphabet = (/^[A-Za-z]+$/).test(evt.key)
        if (!isAlphabet && evt.key !== 'Backspace' && evt.key !== 'Delete') {
            evt.preventDefault()
        }
    })

    // EXPIRATION DATE VALIDATION 
    document.querySelector("#expiration-date-input").addEventListener('input', evt => {
        let expirationDate = evt.target.value.replace(/\//g, '');
        if (expirationDate.length > 2) {
            expirationDate = `${expirationDate.slice(0, 2)}/${expirationDate.slice(2)}`;
        }
        evt.target.value = expirationDate;
    })

    // CVV VALIDATION
    document.querySelector("#cvv-input").addEventListener('keydown', evt => {
        if (isNaN(evt.key) && evt.key !== 'Backspace' && evt.key !== 'Delete') {
            evt.preventDefault()
            return
        }
    })

    document.querySelector("#phone-no-input").addEventListener('keydown', evt => {
        if (isNaN(evt.key) && evt.key !== 'Backspace' && evt.key !== 'Delete') {
            evt.preventDefault()
            return
        }
    })
}

window.addEventListener('load', function () {
    const carID = localStorage.getItem(LocalStorageKeys.RESERVED_CAR_ID)
    if (!carID || carID < 0) {
        console.error("No valid key for ", LocalStorageKeys.RESERVED_CAR_ID, " found in localStorage")
        return
    }
    const carDatum = database.cars.find(car => car.id === Number(carID))
    if (!carDatum) {
        console.error("No car with ID of ", carID)
        return
    }

    setupInputConstraints()
    setBookingDetails(carDatum)
    wireCheckoutFunctionality()
})