'use strict'

class InspectionCardGenerator {
    static makePenaltyEntry_HTML() {
        const inputID = Utils.generateRandomString(8)

        const htmlTemplate = `
        <li class="penalty-entry">
            <select class="damage-selector" name="" id="" required>
                <option value=""></option>
                <option value="">Tire Puncture</option>
                <option value="">Scratches</option>
                <option value="">Dents</option>
                <option value="">Glass crack</option>
            </select>
            <div class="cost-input">
                <img src="assets/svg/Money.svg" alt="">
                <input 
                    type="number" placeholder="cost" step="any" min="1" 
                    pattern="^\d+(\.\d{1,2})?$" title="Please enter a valid amount" required
                >
            </div>
            <label class="img-input-label" for="${inputID}">
                <img src="assets/svg/Upload.svg" alt="">
                <span>Upload image...</span>
            </label>
            <input id="${inputID}" class="img-input" type="file" accept="image/*" hidden>
            <button class="delete-entry-btn">x</button>
        </li>`

        const tmpContainer = document.createElement('div')
        tmpContainer.innerHTML = htmlTemplate
        return tmpContainer.firstElementChild
    }

    static makeInspectionCard_HTML(imgURL, orderID, carMakeModel, returnDateText, locationText) {
        const htmlTemplate = `
            <div class="inspection-card">
                <div class="inspection-card-top">
                    <div class="inspection-details-container">
                        <img src="${imgURL}" alt="">
                        <div class="inspection-details">
                            <h2>${orderID}</h2>
                            <h3>${carMakeModel}</h3>
                            <span><strong>Return Date: </strong>${returnDateText}</span>
                            <span><strong>Location: </strong>${locationText}</span>
                        </div>
                    </div>
                    <button class="inspect-btn">
                        <img src="assets/svg/Arrow-right.svg" alt="">
                    </button>
                </div>
                <div class="inspection-form-container">
                    <form class="inspection-form">
                        <div class="add-entry-btn-container">
                            <button class="add-entry-btn">+ Add Penalty</button>
                        </div>
                        <ul class="penalties"></ul>
                        <div class="penalty-input"> 
                            <button class="clear-inspection-btn">
                                <img src="assets/svg/Tick.svg" alt="">
                            </button>
                        </div>
                    </form>
                </div>
            </div> 
        `
        const tmpContainer = document.createElement('div')
        tmpContainer.innerHTML = htmlTemplate
        return tmpContainer.firstElementChild 
    }
}

class InspectionCardState {
    constructor(closedHeightStr, openHeightStr) {
        this.isActive = true
        this.isOpen = false
        this.closedHeightStr = closedHeightStr
        this.openHeightStr = openHeightStr
    }
}

function setCardIsOpen(inspectionCard, openIntent, cardState) {
    if (!cardState.isActive) {
        return
    }
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

function fadeAndRemoveInspectionCard(inspectionCard, orderID, stateData) {
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
    stateData[orderID].isActive = false

    setTimeout(() => {
        const HEIGHT_TRANS_TIME = 0.5
        inspectionCard.style.transition = `all ${HEIGHT_TRANS_TIME}s`

        inspectionCard.style.height = "0px"
        inspectionCard.style.margin = "0px"
        setTimeout(() => inspectionCard.remove(), HEIGHT_TRANS_TIME * 1000)
    }, fadeTimeSeconds * 1000)
}

function setupInspectionCardFunctionality(inspectionCard, stateData) {
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

    // INSPECT BUTTON
    inspectionCard.querySelector(".inspect-btn").onclick = function () {
        document.querySelectorAll(".inspection-card").forEach(otherCard => {
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

    // ADD ENTRY BUTTON
    inspectionCard.querySelector(".add-entry-btn").onclick = function (evt) {
        evt.preventDefault()


        inspectionCard.querySelector(".penalties").appendChild(
            InspectionCardGenerator.makePenaltyEntry_HTML()
        )

        // PENALTY ENTRIES
        inspectionCard.querySelectorAll(".penalty-entry").forEach(penaltyEntry => {
            penaltyEntry.querySelectorAll(".img-input").forEach(imgInput => {
                imgInput.addEventListener('change', evt => {
                    const fileName = evt.target.files[0].name
                    penaltyEntry.querySelector(".img-input-label >span").textContent = fileName
                }) 
            })
            penaltyEntry.querySelector(".delete-entry-btn").onclick = function (evt) {
                evt.preventDefault()
                penaltyEntry.remove()
            }
        })
    }

    // CLEAR INSPECTION BUTTON
    inspectionCard.querySelector(".clear-inspection-btn").onclick = function (evt) {
        evt.preventDefault()

        const form = inspectionCard.querySelector(".inspection-form")
        if (!form.reportValidity()) {
            return
        }

        const costInputs = Array.from(inspectionCard.querySelectorAll(".cost-input input"))
        const totalAmount = costInputs.reduce((sum, costInput) => sum + parseFloat(costInput.value), 0)

        const modal = document.querySelector(".confirmation-modal-container")
        modal.style.display = "block"

        modal.querySelector(".modal-bottom p").textContent = `
            By confirming this action, you will authorize a charge of $${totalAmount.toFixed(2)} to the customer's account.
            Are you certain you want to apply this charge?
        `
        modal.querySelector(".modal-buttons .cancel").onclick = function () {
            modal.style.display = "none"
        }
        modal.querySelector(".modal-buttons .confirm").onclick = function () {
            modal.style.display = "none"
            fadeAndRemoveInspectionCard(inspectionCard, orderID, stateData)
        }
    }
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

        // INSPECT BUTTON
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

        // ADD ENTRY BUTTON
        inspectionCard.querySelector(".add-entry-btn").onclick = function (evt) {
            evt.preventDefault()
            inspectionCard.querySelector(".penalties").appendChild(
                InspectionCardGenerator.makePenaltyEntry_HTML()
            )

            // PENALTY ENTRIES
            inspectionCard.querySelectorAll(".penalty-entry").forEach(penaltyEntry => {
                penaltyEntry.querySelector(".delete-entry-btn").onclick = function (evt) {
                    evt.preventDefault()
                    penaltyEntry.remove()
                }
            })
        }

        // CLEAR INSPECTION BUTTON
        inspectionCard.querySelector(".clear-inspection-btn").onclick = function (evt) {
            evt.preventDefault()

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
            stateData[orderID].isActive = false

            setTimeout(() => {
                const HEIGHT_TRANS_TIME = 0.5
                inspectionCard.style.transition = `all ${HEIGHT_TRANS_TIME}s`

                inspectionCard.style.height = "0px"
                inspectionCard.style.margin = "0px"
                setTimeout(() => inspectionCard.remove(), HEIGHT_TRANS_TIME * 1000)
            }, fadeTimeSeconds * 1000)
        }
    })
}

function generateInspectionCard(stateData) {
    const cardsPendingInspectionNode = document.querySelector(".cars-pending-inspection")
    const carDatum = database.cars[Utils.randInt(0, database.cars.length - 1)]
    const randomDate = Utils.getRandomDate(new Date(2015, 0, 1), new Date())

    const inspectionCard = InspectionCardGenerator.makeInspectionCard_HTML(
        carDatum.imageURL,
        "#" + Utils.generateRandomString(10),
        carDatum.make + " " + carDatum.model,
        customDateTimeFormat(randomDate),
        "Hougang Rivercourt",
    )
    cardsPendingInspectionNode.appendChild(inspectionCard)

    setupInspectionCardFunctionality(inspectionCard, stateData)
}

window.addEventListener('load', function () {
    const stateData = {}
    for (let i = 0; i < 5; i++) {
        generateInspectionCard(stateData)
    }
})