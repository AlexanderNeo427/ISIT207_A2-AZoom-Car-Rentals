'use strict'

function initializeStarfieldCanvas() {
    const starField = new Starfield("FAQ-canvas")
    starField.onInit()

    let startTime = -427
    function tick(currentTime) {
        if (startTime < 0) {
            startTime = currentTime
        }
        starField.onTick(currentTime - startTime)
        startTime = currentTime
        window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
}

function registerIntersectionObservers() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        })
    })
    // observer.observe(document.querySelector(""))
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

    const imgNode = document.createElement("img")
    imgNode.src = testimonialDatum.imageURL
    containerNode.appendChild(imgNode)

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

function calcFinalOffset_px(currentCardIndex, carouselWidth_px, cardWidth_px, gapBetweenCards_px) {
    return (carouselWidth_px * 0.5) - (cardWidth_px * currentCardIndex) - (cardWidth_px * 0.5) - (gapBetweenCards_px * currentCardIndex) 
}

function setupTestimonialCarousel() {
    const testimonialCarousel = document.getElementsByClassName("testimonials-carousel")[0]
    // const shuffledTestimonials = Utils.durstenfeldShuffle(database.testimonials)
    database.testimonials.forEach(testimonialData => {
        testimonialCarousel.appendChild(
            makeTestimonial(testimonialData)
        )
    })

    const leftBtn = document.querySelector(".testimonials-buttons .left")
    const rightBtn = document.querySelector(".testimonials-buttons .right")

    const carouselWidth_px = parseFloat(getComputedStyle(testimonialCarousel).width)
    const cardWidth_px = parseFloat(getComputedStyle(testimonialCarousel.firstElementChild).width)
    const gapBetweenCards_px = parseFloat(getComputedStyle(testimonialCarousel).gap)

    let currentCard = 0
    const finalOffset_px = calcFinalOffset_px(
        currentCard, carouselWidth_px, cardWidth_px, gapBetweenCards_px
    )
    testimonialCarousel.style.translate = `${finalOffset_px}px`

    rightBtn.onclick = function() {
        currentCard = Math.min(testimonialCarousel.childElementCount - 1, currentCard + 1)
        const finalOffset_px = calcFinalOffset_px(
            currentCard, carouselWidth_px, cardWidth_px, gapBetweenCards_px
        )
        testimonialCarousel.style.translate = `${finalOffset_px}px`
    }
    leftBtn.onclick = function() {
        currentCard = Math.max(0, currentCard - 1)
        const finalOffset_px = calcFinalOffset_px(
            currentCard, carouselWidth_px, cardWidth_px, gapBetweenCards_px
        )
        testimonialCarousel.style.translate = `${finalOffset_px}px`
    }
}

window.addEventListener('load', function () {
    setupTestimonialCarousel()    
    // const cardWidth = testimonialCarousel.querySelector(".carousel-item").offsetWidth
    // console.log("Card width: ", cardWidth)

    // leftBtn.onclick = function (e) {
    //     e.preventDefault()
    //     console.log("START leftbtn click")
    //     testimonialCarousel.scrollLeft += cardWidth
    //     console.log("END leftbtn click")
    // }
    // rightBtn.onclick = function (e) {
    //     e.preventDefault()
    //     console.log("END rightbtn click")
    //     testimonialCarousel.scrollLeft -= cardWidth
    //     console.log("END rightbtn click")
    // }
    // const initialOffset = (carouselWidth * 0.5) - (cardWidth * 0.5)
    // testimonialCarousel.style.transform = `translateX(${initialOffset}px)`
    // console.log("END Testimonial bootstrapper")
    // let cardNo = 0

    initializeStarfieldCanvas()
})
