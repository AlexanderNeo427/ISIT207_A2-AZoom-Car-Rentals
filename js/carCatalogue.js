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
            <img src="../assets/svg/Heart.svg" alt="Heart Icon">
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
               <img src="../assets/svg/Car.svg" alt="Car Icon">
               <span>${bodyStyle}</span>
            </div>
            <div class="car-stat battery-life">
               <img src="../assets/svg/Battery.svg" alt="Battery Icon">
               <span>${batteryLife}hr</span>
            </div>
            <div class="car-stat passenger-capacity">
               <img src="../assets/svg/Person.svg" alt="Person Icon">
               <span>${passengerCapacity}</span>
            </div>
        </div>
    `
}

function makeCard(carDatum) {
    const carCard = document.createElement("div")
    carCard.classList.add("car-card")

    carCard.innerHTML += makeCardHeader(
        utils.randFloat(0, 5), 
        utils.randInt(5, 500) 
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
    return carCard
}

window.addEventListener('load', function () {
    console.log("START of the carCatalogue.js")

    const carListings = document.getElementsByClassName("car-listings")[0]
    database.cars.forEach(carDatum => {
        const cardNode = makeCard(carDatum)
        cardNode.onclick = function() {
            localStorage.setItem(LocalStorageKeys.RESERVED_CAR_ID, carDatum.id)
            location.href = "carCheckout.html"
        }
        carListings.appendChild(cardNode)
    });

    console.log("END of the carCatalogue.js")
})