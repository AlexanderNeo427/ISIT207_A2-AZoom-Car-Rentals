const NAV_LINKS = {
    HOME: "",
}

function makeTestimonial(testimonialData) {
    const containerNode = document.createElement("div")
    containerNode.classList.add("carousel-item")

    const contentNode = document.createElement("span")
    contentNode.innerHTML = testimonialData.reviewer
    containerNode.appendChild(contentNode)

    const NUM_STARS = 5
    const filledStars = Math.min(testimonialData.rating, NUM_STARS)
    const emptyStars = NUM_STARS - filledStars

    const starContainer = document.createElement("div")
    

    const nameNode = document.createElement("h3")
    nameNode.innerHTML = testimonialData.content
    containerNode.appendChild(nameNode)

    return divNode
}

window.onload = function () {
    // const data = allTestimonialData; 
    // console.log("Data: ", allTestimonialData)

    const testimonialCarousel = document.getElementsByClassName("testimonial-carousel")[0]
    allTestimonialData.forEach(testimonialData => {
        testimonialCarousel.appendChild(
            makeTestimonial(testimonialData)
        )
    })
    console.log("End of the main function!")
}
