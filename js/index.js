const NAV_LINKS = {
    HOME: "",
}

/*
containerNode 
    contentNode 
    starContainer
        filledStar, filledStar, emptyStar
    name
    title
 */
function makeTestimonial(testimonialDatum) {
    const containerNode = document.createElement("div")
    containerNode.classList.add("carousel-item")

    const contentNode = document.createElement("span")
    contentNode.classList.add("content")
    contentNode.innerHTML = "\"" + testimonialDatum.content + "\""
    containerNode.appendChild(contentNode)

    const NUM_STARS = 5
    const numFilledStars = Math.min(testimonialDatum.rating, NUM_STARS)
    const numEmptyStars = NUM_STARS - numFilledStars

    const starContainer = document.createElement("div")
    starContainer.classList.add("star-container")
    containerNode.appendChild(starContainer)
    for (let i = 0; i < numFilledStars; i++) {
        const filledStar = document.createElement("div") 
        filledStar.innerHTML = "★"
        starContainer.appendChild(filledStar)
    }
    for (let i = 0; i < numEmptyStars; i++) {
        const emptyStar = document.createElement("div") 
        emptyStar.innerHTML = "☆"
        starContainer.appendChild(emptyStar)
    }

    const nameNode = document.createElement("span")
    nameNode.classList.add("name")
    nameNode.innerHTML = testimonialDatum.reviewer
    containerNode.appendChild(nameNode)

    const titleNode = document.createElement("span")
    titleNode.classList.add("title")
    titleNode.innerHTML = testimonialDatum.title
    containerNode.appendChild(titleNode)

    return containerNode 
}


window.addEventListener('load', function () {
    const testimonialCarousel = document.getElementsByClassName("testimonials-carousel")[0]
    database.testimonials.forEach(testimonialData => {
        testimonialCarousel.appendChild(
            makeTestimonial(testimonialData)
        )
    })

    const leftBtn = this.document.querySelectorAll(".testimonials-buttons")[0]
    const rightBtn = this.document.querySelectorAll(".testimonials-buttons")[1]

    const cardWidth = testimonialCarousel.querySelector(".carousel-item").offsetWidth
    console.log("Card width: ", cardWidth)

    leftBtn.onclick = function(e) {
        console.log("START leftbtn click")
        e.preventDefault()
        testimonialCarousel.scrollLeft += cardWidth
        console.log("END leftbtn click")
    }
    rightBtn.onclick = function(e) {
        console.log("END rightbtn click")
        testimonialCarousel.scrollLeft -= cardWidth
        console.log("END rightbtn click")
    }
    // const initialOffset = (carouselWidth * 0.5) - (cardWidth * 0.5)
    // testimonialCarousel.style.transform = `translateX(${initialOffset}px)`
    // console.log("END Testimonial bootstrapper")

    // let cardNo = 0

})
