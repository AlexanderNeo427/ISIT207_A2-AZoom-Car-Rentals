'use strict'

class InspectionCardState {
    constructor(closedHeightStr, openHeightStr) {
        this.isOpen = false
        this.closedHeightStr = closedHeightStr 
        this.openHeightStr = openHeightStr
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
        
        const dropdownBtn = inspectionCard.querySelector(".inspect-btn")
        dropdownBtn.onclick = function() {
            stateData[orderID].isOpen = !stateData[orderID].isOpen

            inspectionCard.style.height = stateData[orderID].isOpen ? 
            stateData[orderID].openHeightStr : stateData[orderID].closedHeightStr
        } 
    })
}

window.addEventListener('load', function() {

    setupInspectionCardFunctions(
        document.querySelectorAll(".inspection-card")
    )
})