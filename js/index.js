const NAV_LINKS = {
    HOME: "",
}

function makeTestimonial(testimonialData) {
    const divNode = document.createElement("div")
    divNode.classList.add("carousel-item")

    const h1Node = document.createElement("h1")
    h1Node.innerHTML = testimonialData.reviewer
    divNode.appendChild(h1Node)

    const spanNode = document.createElement("span")
    spanNode.innerHTML = testimonialData.content
    divNode.appendChild(spanNode)

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
