'use strict'

class InspectionCardState {
    constructor(closedHeightStr, openHeightStr) {
        this.isOpen = false
        this.closedHeightStr = closedHeightStr 
        this.openHeightStr = openHeightStr
    }
}

function setCardIsOpen(inspectionCard, openIntent, cardState) {
    cardState.isOpen = openIntent

    inspectionCard.style.height = 
    cardState.isOpen ? 
    cardState.openHeightStr : 
    cardState.closedHeightStr 

    const cardTop = inspectionCard.querySelector(".inspection-card-top")
    if (cardState.isOpen) {
        cardTop.classList.add("highlight")
    }
    else {
        cardTop.classList.remove("highlight")
    }
}

function setupInspectionCardFunctions(allInspectionCards) {
    const stateData = {}

    allInspectionCards.forEach(inspectionCard => {
        const orderID = inspectionCard.querySelector(".inspection-details >h2").textContent

        const cardHeight_px = parseFloat(getComputedStyle(inspectionCard).height)
        const inspectionForm = inspectionCard.querySelector(".inspection-form")
        const formHeight_px = parseFloat(getComputedStyle(inspectionForm).height)

        stateData[orderID] = new InspectionCardState(
            String(cardHeight_px) + "px", 
            String(cardHeight_px + formHeight_px) + "px"
        ) 
        
        inspectionCard.querySelector(".inspect-btn").onclick = function() {
            allInspectionCards.forEach(otherCard => {
                const otherOrderID = otherCard.querySelector(".inspection-details >h2").textContent
                const openIntent = (orderID === otherOrderID)
                setCardIsOpen(otherCard, openIntent, stateData[otherOrderID])
            })
        } 
    })
}

window.addEventListener('load', function() {

    setupInspectionCardFunctions(
        document.querySelectorAll(".inspection-card")
    )
})