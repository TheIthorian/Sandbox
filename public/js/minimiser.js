window.addEventListener("load", function(){
    // Add minimiser for headers
    for (const element of document.getElementsByTagName("h1")) {
        element.addEventListener("click", minimiseContentWithSave);
    }

    // Add minimiser for code
    for (const element of document.getElementsByClassName("code-title")) {
        element.addEventListener("click", minimiseCode);
    }

    // Add minimiser for titles of graphs and images
    for (const element of document.getElementsByClassName("title")) {
        element.addEventListener("click", minimiseContentWithSave);
    }
});



function minimiseCode(event) {
    let title = event.target;
    let element = title.parentNode;
    let code = element.nextElementSibling;
    let hidden = code.classList.contains("hidden");
    hidden ? code.classList.remove("hidden") : code.classList.add("hidden");
    hidden ? title.classList.remove("hidden") : title.classList.add("hidden");

    // Remember the state
    let openCodeState = [];
    if (localStorage.getItem("openCodeState")) {openCodeState = JSON.parse(localStorage.getItem("openCodeState"));}
    console.log("Currently stored: ", openCodeState);

    if(hidden) {
        openCodeState.push(code.id);
        localStorage.setItem("openCodeState", JSON.stringify(openCodeState));
    }
    else {
        let new_openCodeState = openCodeState.filter(function(value, index, arr){
            return value != code.id;
        })

        localStorage.setItem("openCodeState", JSON.stringify(new_openCodeState));
    }
    console.log("New LocalStorage: ", localStorage.getItem("openCodeState"));
}

function minimiseContent(element) {
    let hidden = element.classList.contains("hidden");
    console.log(element);

    if (hidden) {
        element.classList.remove("hidden");
        let next = element.nextElementSibling;
        while (next) {
            next.style.display = null;
            next = next.nextElementSibling;
        }                  
    }
    else {
        element.classList.add("hidden");
        let next = element.nextElementSibling;
        while (next) {
            next.style.display = 'none';
            next = next.nextElementSibling;
        }
    } 
}

function minimiseSibling(element) {
    let hidden = element.classList.contains("hidden");
    console.log(element);

    if (hidden) {
        element.classList.remove("hidden");
        let next = element.nextElementSibling;
        next.style.display = null;              
    }
    else {
        element.classList.add("hidden");
        let next = element.nextElementSibling;
        next.style.display = 'none';
    } 
}

function minimiseContentWithSave(event) {
    console.log(event);
    let element = event.target;
    let hidden = element.classList.contains("hidden");
    console.log(element);

    // Remember the state
    let openContentState = [];
    if (localStorage.getItem("openContentState")) {openContentState = JSON.parse(localStorage.getItem("openContentState"));}
    console.log("Currently stored: ", openContentState);


    if (hidden) {
        element.classList.remove("hidden");
        let next = element.nextElementSibling;
        while (next) {
            next.style.display = null;
            next = next.nextElementSibling;
        }  

        let new_openContentState = openContentState.filter(function(value, index, arr){
            return value != element.parentNode.id;
        });
        localStorage.setItem("openContentState", JSON.stringify(new_openContentState));
        
    }
    else {
        element.classList.add("hidden");
        let next = element.nextElementSibling;
        while (next) {
            next.style.display = 'none';
            next = next.nextElementSibling;
        }
        openContentState.push(element.parentNode.id);
        console.log("Newly stored: ", openContentState);
        localStorage.setItem("openContentState", JSON.stringify(openContentState));

    } 
    console.log("New LocalStorage: ", localStorage.getItem("openContentState"));
}


function minimiseSiblingWithSave(event) {
    console.log(event);
    let element = event.target;
    let hidden = element.classList.contains("hidden");
    console.log(element);

    // Remember the state
    let openContentState = [];
    if (localStorage.getItem("openContentSiblingState")) {openContentState = JSON.parse(localStorage.getItem("openContentSiblingState"));}
    //console.log("Currently stored: ", openContentState);


    if (hidden) {
        element.classList.remove("hidden");
        let next = element.nextElementSibling;
        next.style.display = null;

        let new_openContentState = openContentState.filter(function(value, index, arr){
            return value != element.parentNode.id;
        });
        localStorage.setItem("openContentSiblingState", JSON.stringify(new_openContentState));
        
    }
    else {
        element.classList.add("hidden");
        let next = element.nextElementSibling;
        next.style.display = 'none';

        openContentState.push(element.parentNode.id);
        console.log("Newly stored: ", openContentState);
        localStorage.setItem("openContentSiblingState", JSON.stringify(openContentState));

    } 
    console.log("New LocalStorage: ", localStorage.getItem("openContentSiblingState"));
}