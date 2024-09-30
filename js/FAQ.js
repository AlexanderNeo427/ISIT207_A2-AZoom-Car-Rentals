window.onload = function () {
    const allDropdownObjects = document.getElementsByClassName("dropdown-object")
    console.log("Dropdowns: ", allDropdownObjects)
    for (let dropdownObject of allDropdownObjects) {
        dropdownObject.onclick = function () {
            console.log("Dropdown object was clicked")
            dropdownObject.classList.toggle("dropdown-content")
            console.log("Dropdown content was toggled")
        }
    }
}