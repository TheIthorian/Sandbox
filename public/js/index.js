window.onload = function () {
    
    // Add copy code function
    for (const element of document.getElementsByClassName("code-copy")) {
        element.addEventListener("click", function () {
            let text = this.parentNode.nextElementSibling.childNodes[0].innerText;
            console.log(text);

            let temporaryInputElement = document.createElement("input");
            temporaryInputElement.type = "text";
            temporaryInputElement.value = text;
        
            document.body.appendChild(temporaryInputElement);
        
            temporaryInputElement.select();
            temporaryInputElement.setSelectionRange(0, 99999); 
            document.execCommand("Copy");
        
            document.body.removeChild(temporaryInputElement);
        });
    }

    // Add local storage for checkboxes
    for (const checkbox of document.getElementsByClassName("color-lock")) {
        checkbox.addEventListener("click", function () {

            let id = this.previousElementSibling.id;

            newColorLockState = [];
            if (localStorage.getItem("colorLockState")) {newColorLockState = JSON.parse(localStorage.getItem("colorLockState"));}

            if (checkbox.checked) {
                newColorLockState.push(id);
                localStorage.setItem("colorLockState", JSON.stringify(newColorLockState));

            } else {
                newColorLockState = newColorLockState.filter(function(value, index, arr){
                    return value != id;
                })
                localStorage.setItem("colorLockState", JSON.stringify(newColorLockState));
            }
        });
    }
    
    
}