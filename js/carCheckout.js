function setBookingDetails(carDatum) {
    const pickupDetails = JSON.parse(localStorage.getItem(LocalStorageKeys.PICKUP_DETAILS))
    const pickupDatetime = new Date(`${pickupDetails.date} ${pickupDetails.time}`)

    const returnDetails = JSON.parse(localStorage.getItem(LocalStorageKeys.RETURN_DETAILS))
    const returnDatetime = new Date(`${returnDetails.date} ${returnDetails.time}`)

    document.querySelector(".car-img").src = carDatum.imageURL
    document.querySelector(".car-make-model").innerHTML = carDatum.make + " " + carDatum.model

    const diffSeconds = (returnDatetime.getTime() - pickupDatetime.getTime()) / 1000
    const rentDuration =
        diffSeconds < SECONDS_PER_DAY ?
            `${Math.floor(diffSeconds / (60 * 60))} rental hour(s)` :
            `${Math.floor(diffSeconds / SECONDS_PER_DAY)} rental days`
    document.querySelector(".rent-duration").innerHTML = rentDuration

    const detailNode = this.document.querySelector(".pickup-return-details")

    const pickupDetailNode = detailNode.querySelector(".pickup")
    pickupDetailNode.querySelector(".pickup-return-location").innerHTML = pickupDetails.location
    pickupDetailNode.querySelector(".pickup-return-date").innerHTML = customDateTimeFormat(pickupDatetime)

    const returnDetailNode = detailNode.querySelector(".return")
    returnDetailNode.querySelector(".pickup-return-location").innerHTML = returnDetails.location
    returnDetailNode.querySelector(".pickup-return-date").innerHTML = customDateTimeFormat(returnDatetime)

    const bookingOverview = this.document.querySelector(".booking-overview")

    const hoursRented = diffSeconds / (60 * 60)
    const rentalFee = hoursRented * carDatum.hourlyRate
    const rentalFeeNode = bookingOverview.querySelector(".rental-cost")
    rentalFeeNode.innerHTML = `SGD ${rentalFee.toFixed(2)}`

    const addonCost = Utils.randFloat(10, 100)
    console.log(addonCost)
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
    checkoutButtons.forEach(btn => {
        btn.onclick = function() {
            window.location.href = "orderConfirmation.html"
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

    setBookingDetails(carDatum)
    wireCheckoutFunctionality()
})