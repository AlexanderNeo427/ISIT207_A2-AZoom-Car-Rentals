// id - The id of the FAQ database entry
class DropdownState {
    constructor(id) {
        this.id = id 
        this.isOpen = false
    }
}

function appendChild(parent, child) {
    parent.appendChild(child)
    return child
}

// div: dropdown-object
//     div: dropdown-header
//         h3
//         button
//     p: dropdown-content
function makeDropdownObject(faqDatum) {
    const dropdownObject = document.createElement("div")
    dropdownObject.classList.add("dropdown-object")

    const dropdownHeader = appendChild(
        dropdownObject, document.createElement("div")
    )
    dropdownHeader.classList.add("dropdown-header")

    const h3Node = appendChild(
        dropdownHeader, document.createElement("h3")
    )
    h3Node.innerHTML = faqDatum.question

    const buttonNode = appendChild(
        dropdownHeader, document.createElement("button")
    )
    buttonNode.innerHTML = "Toggle"

    const paragraphNode = appendChild(
        dropdownObject, document.createElement("p")
    )
    paragraphNode.classList.add("dropdown-content")
    paragraphNode.innerHTML = faqDatum.answer
    
    return dropdownObject
}

window.onload = function () {
    console.log("START of the FAQ main function()")
    const dropdownContainerNode = document.getElementsByClassName("all-dropdowns")[0]
    console.log("FAQ Data: ", database.frequentlyAskedQuestions)

    database.frequentlyAskedQuestions.forEach(faqDatum => {
        const newDropdownElem = appendChild(
            dropdownContainerNode,
            makeDropdownObject(faqDatum)
        )
        const dropdownState = new DropdownState(faqDatum.id)

        // Register click handler
        newDropdownElem.onclick = function() {
            dropdownState.isOpen = !dropdownState.isOpen     
            newDropdownElem.style.maxHeight = dropdownState.isOpen ? "" : "40rem" 
        }
    })

    console.log("END of the FAQ Main function()")
}