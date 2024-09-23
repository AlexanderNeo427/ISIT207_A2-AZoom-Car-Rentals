window.onload = function () {
    console.log("displayCarListings()")

    const carData = ["Black Supercar", "Blue BMW", "Yellow Vintage", "Purple Maserati"]
    const carListingsElem = document.getElementsByClassName("car-listings")[0]
    carData.forEach(cd => {
        const listing = document.createElement("li")
        listing.innerHTML = cd
        carListingsElem.appendChild(listing)
    })
}