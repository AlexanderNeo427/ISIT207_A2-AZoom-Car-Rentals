const userID = localStorage.getItem(LocalStorageKeys.LOGGED_IN_USER_ID)
if (!userID || userID < 0) {
    window.location.href = "login.html"
}

function appendChild(parent, child) {
    parent.appendChild(child)
    return child
}

function makeCardHeader(rating, numRatings) {
    console.assert(typeof rating === "number")
    console.assert(typeof numRatings === "number")

    return `
        <div class="card-header">
            <div class="rating-container">
                <span class="star">★</span>
                <span class="">
                    <strong>${rating.toFixed(1)}</strong>
                </span>
                <span class="rating-count">(${numRatings})</span>
            </div>
            <img src="assets/svg/Heart.svg" alt="Heart Icon">
        </div> 
    `
}

function makeCardPicture(imgURL) {
    console.assert(typeof imgURL === "string", "Type of imgURL was found to be ", typeof imgURL)

    return `
        <div class="image-container">
            <img src="${imgURL}" alt="car-img">
        </div>
    `
}

function makeCardData(carMake, carModel, hourlyRate) {
    console.assert(typeof carMake === "string")
    console.assert(typeof carModel === "string")
    console.assert(typeof hourlyRate === "number")

    return `
        <div class="car-data">
            <div class="data-left">
               <span class="car-make">${carMake}</span>
               <span class="car-model"><strong>${carModel}</strong></span>
            </div>
            <div class="hourly-rate">
               <span><strong>$${hourlyRate}</strong> /hr</span>
            </div>
        </div>
    `
}

function makeCarStats(bodyStyle, batteryLife, passengerCapacity) {
    console.assert(typeof bodyStyle === "string")
    console.assert(typeof batteryLife === "number")
    console.assert(typeof passengerCapacity === "number")

    return `
        <div class="car-stats">
            <div class="car-stat body-style">
               <img src="assets/svg/Car.svg" alt="Car Icon">
               <span>${bodyStyle}</span>
            </div>
            <div class="car-stat battery-life">
               <img src="assets/svg/Battery.svg" alt="Battery Icon">
               <span>${batteryLife}hr</span>
            </div>
            <div class="car-stat passenger-capacity">
               <img src="assets/svg/Person.svg" alt="Person Icon">
               <span>${passengerCapacity}</span>
            </div>
        </div>
    `
}

function makeCard(carDatum) {
    const carCard = document.createElement("div")
    carCard.classList.add("car-card")

    carCard.innerHTML += makeCardHeader(
        Utils.randFloat(0, 5), 
        Utils.randInt(5, 500) 
    )
    carCard.innerHTML += makeCardPicture(carDatum.imageURL)
    carCard.innerHTML += makeCardData(
        carDatum.make, carDatum.model, carDatum.hourlyRate
    )
    carCard.innerHTML += '<span class="separator"></span>'
    carCard.innerHTML += makeCarStats(
        carDatum.bodyStyle, 
        carDatum.batteryLifeHours, 
        carDatum.seats
    )
    carCard.innerHTML += `
        <button class="rent-btn">
            Rent Car
            <span>▶</span>
        </button>
    `
    
    return carCard
}

// TODO
// - Toast warning(??) | Or maybe I can just trigger the default form validation UI
// - Pickup time cannot be before curren time (maybe atleast 1 hour from current time?)
// - Return time cannot be before pickup time (maybe atleast 1 hour from pickup time?)
function cardButtonClickHandler(evt, carDatum) {
    const formElem = document.querySelector(".pickup-return-details")
    if (!formElem.reportValidity()) {
        return
    }

    localStorage.setItem(LocalStorageKeys.RESERVED_CAR_ID, carDatum.id)

    const pickupDetails = formElem.querySelector(".pickup-details")
    localStorage.setItem(LocalStorageKeys.PICKUP_DETAILS, JSON.stringify({
        date: pickupDetails.querySelector("input[type='date']").value,
        time: pickupDetails.querySelector("input[type='time']").value,
        location: pickupDetails.querySelector("select").value, 
    }))

    const returnDetails = formElem.querySelector(".return-details")
    localStorage.setItem(LocalStorageKeys.RETURN_DETAILS, JSON.stringify({
        date: returnDetails.querySelector("input[type='date']").value,
        time: returnDetails.querySelector("input[type='time']").value,
        location: returnDetails.querySelector("select").value, 
    }))

    window.location.href = "carCheckout.html"
}

function isLoggedIn() {
    const userID = localStorage.getItem(LocalStorageKeys.LOGGED_IN_USER_ID)
    return userID && userID >= 0
}

window.addEventListener('load', function () {
 

    const carListings = document.getElementsByClassName("car-listings")[0]

    database.cars.forEach(carDatum => {
        const cardNode = makeCard(carDatum)
        cardNode.querySelector(".rent-btn").onclick = function(evt) {
            cardButtonClickHandler(evt, carDatum)
        } 
        carListings.appendChild(cardNode)
    });
})