
window.addEventListener("load", function(){
    // select inputs
    let selectOptions = document.getElementsByClassName("select-option");
    for (option of selectOptions) {       
        option.addEventListener("click", function(event) {
            let optionElement = event.target;

            // single select
            if (!optionElement.parentNode.classList.contains("multiselect")) {
                for (otherOption of optionElement.parentNode.children) {
                    console.log(otherOption);
                    otherOption.classList.remove("selected");
                }
            }
            
            optionElement.classList.toggle("selected");
        });
    }


    
	let blockList = document.getElementsByClassName("color-block small");
	console.log(blockList);
	let l = blockList.length;
	for (block of blockList) {
		block.innerText = window.getComputedStyle(block).getPropertyValue("background-color");
	}
	
	
	
    setDefaultColors("header-color-picker", "--header-background-dark", "headerColor");
    setDefaultColors("background-color-picker", "--body-background-dark", "backgroundColor");
    setDefaultColors("background-color2-picker", "--body-background-dark2", "backgroundColor2");
    setDefaultColors("highlight-color-picker", "--highlight", "highlightColor");
    setDefaultColors("text-color-picker", "--text-light", "textColor");


    // Set color locks
    for (const checkbox of document.getElementsByClassName("color-lock")) {
        let checkId = checkbox.previousElementSibling.id;
        console.log(checkId, localStorage.getItem("colorLockState"));

        if (localStorage.getItem("colorLockState")) {
            for (const id of JSON.parse(localStorage.getItem("colorLockState"))){
                if (checkId == id) {
                    checkbox.checked = true;
                    break;
                }
            }
        }
    }

    // Set the saved values. Use defaults if this fails
    if (localStorage.getItem("coolers-link")) {
        document.getElementById("coolers-link").value = localStorage.getItem("coolers-link");
    }

    try {
        // Set state of code boxes
        if (localStorage.getItem("openCodeState")) {
            for (const id of JSON.parse(localStorage.getItem("openCodeState"))) {
                //console.log(id);
                let element = document.getElementById(id);
                element.classList.remove("hidden");
            }
        }
        // Set state of content boxes
        if (localStorage.getItem("openContentState")) {
            for (const id of JSON.parse(localStorage.getItem("openContentState"))) {
                //let element = document.getElementById(id).getElementsByTagName("h1")[0];
                let element = document.getElementById(id).firstElementChild;
                console.log(element);
                minimiseContent(element);
            }
        }

    } catch(err)  {console.log(err); localStorage.clear(); location.reload();}
});



function setDefaultColors(id, cssColor, storageName) {
    let picker = document.getElementById(id);
    let storedColor = localStorage.getItem(storageName);
    if (storedColor) {
        picker.value = storedColor
        document.documentElement.style.setProperty(cssColor, storedColor); 
    }            
}

function changeColor(element, optionalColor) {
    let currentColor;
    if (typeof optionalColor === 'undefined') { currentColor = element.value; }
    else { currentColor = optionalColor; }

    console.log(currentColor);
    console.log(element.previousElementSibling.innerText);
    console.log(element.id);

    element.previousElementSibling.innerText = '(' + currentColor + ')';
    element.parentNode.style.backgroundColor = currentColor;

    if (element.id == 'header-color-picker') {
        console.log(currentColor)
        document.documentElement.style.setProperty('--header-background-dark', currentColor);
        localStorage.setItem("headerColor", currentColor);
    }
    if (element.id == 'background-color-picker') {
        document.documentElement.style.setProperty('--body-background-dark', currentColor);
        localStorage.setItem("backgroundColor", currentColor);
    }
    if (element.id == 'background-color2-picker') {
        document.documentElement.style.setProperty('--body-background-dark2', currentColor);
        localStorage.setItem("backgroundColor2", currentColor);
    }
    if (element.id == 'highlight-color-picker') { 
        document.documentElement.style.setProperty('--highlight', currentColor); 
        localStorage.setItem("highlightColor", currentColor);
    }
    if (element.id == 'text-color-picker') { 
        document.documentElement.style.setProperty('--text-light', currentColor); 
        localStorage.setItem("textColor", currentColor);
    }
}

function randomiseColors() {
    let idList = [
        "header-color-picker",
        "background-color-picker" ,
        "background-color2-picker",
        "highlight-color-picker",
        "text-color-picker"
    ];

    for (const id of idList) {
        let color = Math.floor(Math.random()*16777215).toString(16);
        let element = document.getElementById(id);
        if (!element.nextElementSibling.checked){
            changeColor(element, "#" + color);
        } 
    }
    
}

function useCoolersLink() {
    let link = document.getElementById("coolers-link").value;
    localStorage.setItem("coolers-link", link);

    link = link.split("/").pop().toUpperCase();

    colorList = link.split("-");

    newColorList = [];
    let regex = /^[A-Z0-9]{6}$/;
    for (const color of colorList) {
        // Check format
        if (regex.test(color)) {
            newColorList.push("#" + color);
        } else {return;}
    }

    let idList = [
        "header-color-picker",
        "background-color-picker" ,
        "background-color2-picker",
        "highlight-color-picker",
        "text-color-picker"
    ];

    for (let i = 0; i < Math.min(idList.length, newColorList.length); i++) {
        let color = newColorList[i];
        let element = document.getElementById(idList[i]);
        if (!element.nextElementSibling.checked){
            changeColor(element, color);
        }
        
    }

}

function resetColors() {
    localStorage.removeItem("headerColor");
    localStorage.removeItem("backgroundColor");
    localStorage.removeItem("backgroundColor2");
    localStorage.removeItem("highlightColor");
    localStorage.removeItem("textColor");
    location.reload();
}