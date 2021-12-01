
window.addEventListener("load", function(){
    // Sets ripple for buttons in buttons.js
    let allButtons = document.getElementsByTagName("button");
    for (button of allButtons) {
        if (button.classList.contains("primary") || button.classList.contains("secondary")) {
            button.addEventListener("click", createRipple);
        }
    }
});


function createRipple(e) {
    let button = e.currentTarget;
    
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.pageX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${e.pageY - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple"); 

    let ripple = document.getElementsByClassName("ripple")[0];

    if (ripple) {
        console.log("Removed")
        ripple.remove();
    }

    button.appendChild(circle);
}