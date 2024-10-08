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
//         span: updown-arrow 
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

    const spanNode = appendChild(
        dropdownHeader, document.createElement("span")
    )
    spanNode.classList.add("updown-arrow")
    spanNode.innerHTML = "🢃"

    const paragraphNode = appendChild(
        dropdownObject, document.createElement("p")
    )
    paragraphNode.classList.add("dropdown-content")
    paragraphNode.innerHTML = faqDatum.answer
    
    return dropdownObject
}

window.addEventListener('load', function () {
    const MAX_HEIGHT = "45rem"

    console.log("START of the FAQ main function()")
    const dropdownContainerNode = document.getElementsByClassName("all-dropdowns")[0]
    database.frequentlyAskedQuestions.forEach(faqDatum => {
        const newDropdownElem = appendChild(
            dropdownContainerNode,
            makeDropdownObject(faqDatum)
        )
        newDropdownElem.style.maxHeight = ""
        const arrowNode = newDropdownElem.getElementsByClassName("updown-arrow")[0]
        const dropdownState = new DropdownState(faqDatum.id)

        // Register click handler
        newDropdownElem.onclick = function() {
            dropdownState.isOpen = !dropdownState.isOpen     
            newDropdownElem.style.maxHeight = dropdownState.isOpen ? MAX_HEIGHT : "" 
            arrowNode.innerHTML = dropdownState.isOpen ? "🢁" : "🢃"
            console.log(dropdownState.id, " ", dropdownState.isOpen)
        }
    })

    console.log("END of the FAQ Main function()")
})