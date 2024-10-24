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
        starField.onRender()
        startTime = currentTime
        window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
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

function setupFAQ() {
    const faqState = {}
    document.querySelectorAll(".FAQ-section .dropdown").forEach((dropdown, index) => {
        const header = dropdown.querySelector("h2")
        const content = dropdown.querySelector("p")

        const closedHeight_px = parseFloat(getComputedStyle(header).height) 
        const openHeight_px = closedHeight_px + parseFloat(getComputedStyle(content).height)

        dropdown.style.height = `${closedHeight_px}px`
        faqState[index] = false
        dropdown.onclick = function() {
            faqState[index] = !faqState[index]

            dropdown.style.height = faqState[index] ? 
            `${openHeight_px}px` : `${closedHeight_px}px`

            // dropdown.style.color = faqState[index] ? 
            // 'var(--primary-950)' : 'var(--primary-50)'
            //
            // dropdown.style.background = faqState[index] ? 
            // 'var(--primary-50)' : 'none'
        }
    })
}

function setupIntersectionObservers() {

    // ---- WHY AZOOM ----
    const reasonsContainer = document.querySelector(".reasons-container")
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return
            }
            const ANIM_DELAY = 0.6

            const whyAZoomHeader = document.querySelector(".why-azoom>h2")
            whyAZoomHeader.classList.add("fade-up")
            whyAZoomHeader.style.animationDelay = "0s"

            reasonsContainer.querySelectorAll(".reason").forEach((reason, index) => {
                reason.classList.add("fade-up")
                reason.style.animationDelay = String((index + 1) * ANIM_DELAY) + "s" 
            })
        })
    }, { threshold: 0.333 }).observe(reasonsContainer)
    // ----- OUR MISSION -----
    const missionSect = document.querySelector(".mission-section")
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return
            }
            const MISSION_ANIM_DELAY = 0.5
            
            const background = missionSect.querySelector(".mission-section-bg")
            background.classList.add("mission-opacity-fade-in")
            background.style.animationDelay = MISSION_ANIM_DELAY + "s"
        })
    }, { threshold: 0.25 }).observe(missionSect)

    const missionSectH2 = document.querySelector(".mission-section h2")
    const missionSectP = document.querySelector(".mission-section p")
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return
            }
            const ANIM_DURATION = 0.8
            missionSectH2.classList.add("fade-from-left", "fade-in-opacity")
            missionSectH2.style.animationDelay = ANIM_DURATION + "s"
            missionSectH2.style.animationDuration = ANIM_DURATION + "s"

            missionSectP.classList.add("fade-from-left", "fade-from-opacity")
            missionSectP.style.animationDelay = ANIM_DURATION + "s"
            missionSectP.style.animationDuration = (ANIM_DURATION * 1.2) + "s"
        })
    }, { threshold: 0.8 }).observe(missionSectP)

    // ----- GETTING STARTED -----
    const getStartedSect = document.querySelector(".get-started-section") 
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return
            }
            const ANIM_DELAY = 0.6

            const getStartedHeader = getStartedSect.querySelector("h2")
            getStartedHeader.classList.add("fade-up")

            getStartedSect.querySelectorAll(".instruction").forEach((instruction, index) => {
                instruction.classList.add("fade-up")
                instruction.style.animationDelay = String((index + 1) * ANIM_DELAY) + "s"
            })
        })
    }, { threshold: 0.333 }).observe(getStartedSect)

    // ----- TESTIMONIALS -----
    const testimonialSect = document.querySelector(".testimonials")
    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return
            }
            const FADE_IN_DURATION = 0.8
            testimonialSect.classList.add("fade-in-opacity")
            testimonialSect.style.animationDuration = FADE_IN_DURATION + "s"

            setTimeout(() => {
                const ANIM_DURATION = 1.2
                const headerText = testimonialSect.querySelector(".testimonials-text")
                headerText.classList.add("fade-from-left")
                headerText.style.animationDuration = ANIM_DURATION + "s"

                const buttons = testimonialSect.querySelector(".testimonials-buttons")
                buttons.classList.add("fade-from-right")
                buttons.style.animationDelay = (ANIM_DURATION * (3 / 5)) + "s"
                buttons.style.animationDuration = ANIM_DURATION + "s"
            }, FADE_IN_DURATION * 1000)
        })
    }, { threshold: 0.3 }).observe(testimonialSect)

    const fadeIntersectObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return
            }
            entry.target.classList.add("fade-in-opacity")
            entry.target.style.animationDuration = "0.8s"
        }) 
    }, { threshold: 0.5 })
    fadeIntersectObserver.observe(document.querySelector(".locations-section"))
    fadeIntersectObserver.observe(document.querySelector(".FAQ-section"))
    fadeIntersectObserver.observe(document.querySelector("footer"))
}

window.addEventListener('load', function () {
    setupFAQ()
    window.addEventListener('resize', () => setupFAQ())

    setupTestimonialCarousel()
    initializeStarfieldCanvas()

    setupIntersectionObservers()
    // setTimeout(setupIntersectionObservers, 1000)
    // document.querySelectorAll(".reason").forEach((reason, index) => {
    //     reason.classList.add(".fade-up")
    //     // reason.style.animationName = 'fade-up-anim'
    //     reason.style.animationDelay = String(index * 0.5) + "s" 
    // })
})
