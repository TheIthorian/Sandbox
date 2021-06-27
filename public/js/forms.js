
function validateForm(formId) {
    let form = document.getElementById(formId);
    
    // Validate inputs
    let inputList = form.getElementsByTagName("input"); 
    
    // Add event listener to the inputs so they are validated without submitting
    if (!form.dataset.checked) {
        for (input of inputList) {
            input.addEventListener("change", function(){
                validateForm(formId);
            });
            form.dataset.checked = true;
        }
    } 

    for (input of inputList) {

        input.value = input.value.trim();
        
        // Remove existing errors
        input.classList.remove("warning");
        for (element of input.parentNode.getElementsByTagName("span")) {
            if (element.classList.contains("error-message")) {
                element.remove();                
            }
        }

        

        // Required
        if (input.classList.contains("required") && input.value.length == 0) {
            displayValidationError(input, "Required");
        }
        
        // Regex
        else if (input.classList.contains("regex")) {
            let regex = new RegExp(input.dataset.validation);
            if (!regex.test(input.value)) {
                displayValidationError(input, input.dataset.message);
            }
        }

        // Special
        else if (input.classList.contains("special")) {
            let message = specialValidations[input.dataset.validation](input.value);
            if (message) {
                displayValidationError(input, message);
            }
        }
    }
}

function displayValidationError(element, message) {
    let messageElement = document.createElement("span");
    messageElement.classList.add("warning");
    messageElement.classList.add("error-message");
    messageElement.innerText = message;

    element.parentNode.appendChild(messageElement);
    element.classList.add("warning")
}

const specialValidations = {
    between10And100: function(value) {
        console.log(value);
        if (value > 100 || value < 10) {
            return "Age must be between 10 and 100.";
        };
    },

    validatePassword: function(value) {
        let messageList = [];
        console.log(value.length);
        if (value.length < 10) {
            messageList.push("Password must be more than 10 characters.");
        }

        let regex = /[\W]/i
        if (!regex.test(value)) {
            messageList.push("Password must contain at least one special character.");
        }

        let message = "";
        for (item of messageList) {
            message += `${item}\n`;
        }
        return message;
    }
}