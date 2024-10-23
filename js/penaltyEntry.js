'use strict'

class InspectionCardGenerator {
    static makePenaltyEntry_HTML() {
        const htmlTemplate = `
        <li class="penalty-entry">
            <select class="damage-selector" name="" id="">
                <option value=""></option>
                <option value="">Tire Puncture</option>
                <option value="">Scratches</option>
                <option value="">Dents</option>
                <option value="">Glass crack</option>
            </select>
            <div class="cost-input">
                <img src="assets/svg/Money.svg" alt="">
                <input type="number" placeholder="">
            </div>
            <label class="img-input-label" for="img-input">
                <img src="assets/svg/Upload.svg" alt="">
                <span>Upload image</span>
            </label>
            <input class="img-input" type="file" accept="image/*" hidden>
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
                        <button class="add-entry-btn">+ Add Entry</button>
                    </div>
                    <ul class="penalties"></ul>
                    <div class="penalty-input">
                        <span><strong>TOTAL: </strong></span>
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

