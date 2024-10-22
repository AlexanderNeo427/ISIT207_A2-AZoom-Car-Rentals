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

    const inspectBtnIMG = cardTop.querySelector(".inspect-btn >img")
    const rotation = cardState.isOpen ? 270 : 90
    inspectBtnIMG.style.transform = `rotateZ(${rotation}deg)`
}

function setupInspectionCardFunctions(allInspectionCards) {
    const stateData = {}

    allInspectionCards.forEach(inspectionCard => {
        const orderID = inspectionCard.querySelector(".inspection-details >h2").textContent

        const REM_PX = parseFloat(getComputedStyle(document.documentElement).fontSize)
        const YPAD_REM = 3

        const cardHeight_px = parseFloat(getComputedStyle(inspectionCard).height)
        const inspectForm = inspectionCard.querySelector(".inspection-form")
        const formHeight_px = parseFloat(getComputedStyle(inspectForm).height)

        const inspectFormContainer = inspectionCard.querySelector(".inspection-form-container")
        const formContainerTargetHeight = formHeight_px + (YPAD_REM * REM_PX)
        inspectFormContainer.style.height = String(formContainerTargetHeight) + "px"

        stateData[orderID] = new InspectionCardState(
            String(cardHeight_px) + "px",
            String(cardHeight_px + formContainerTargetHeight) + "px"
        )

        inspectionCard.querySelector(".inspect-btn").onclick = function () {
            allInspectionCards.forEach(otherCard => {
                const otherOrderID = otherCard.querySelector(".inspection-details >h2").textContent
                const isCurrentSelected = (orderID === otherOrderID)
                if (isCurrentSelected) {
                    setCardIsOpen(otherCard, !stateData[otherOrderID].isOpen, stateData[otherOrderID])
                }
                else {
                    setCardIsOpen(otherCard, isCurrentSelected, stateData[otherOrderID])
                }
            })
        }

        inspectionCard.querySelector(".complete-inspection-btn").onclick = function() {
            let fadeTimeSeconds = 2
            const currTransitions = getComputedStyle(inspectionCard).transition
            const heightTransition = currTransitions.split(",")
                                    .map(transition => transition.split(" "))
                                    .find(transition => transition[0] === 'height')
            if (heightTransition) {
                fadeTimeSeconds = parseFloat(heightTransition[1]) * 2.2
            }

            const newTrans = `${currTransitions}, opacity ${fadeTimeSeconds}s`
            inspectionCard.style.transition = newTrans
            inspectionCard.style.opacity = "0"
            setCardIsOpen(inspectionCard, false, stateData[orderID])
            setTimeout(() => inspectionCard.remove(), fadeTimeSeconds * 1000)
        }
    })
}

window.addEventListener('load', function () {
    setupInspectionCardFunctions(
        document.querySelectorAll(".inspection-card")
    )
})