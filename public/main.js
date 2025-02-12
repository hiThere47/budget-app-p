//Helps with getting sums in respective input boxes
document.addEventListener('input', function (event) {
    if (event.target.classList.contains('under-input')) {
        const inputGroup = event.target.closest('.input-group');
        const underInputs = inputGroup.querySelectorAll('.under-input');
        const inlineInput = inputGroup.querySelector('.inline-input');

        let sum = 0;
        underInputs.forEach(input => {
            const numbers = input.value.match(/-?\d+(\.\d+)?/g);
            if (numbers) {
                sum += numbers.reduce((acc, num) => acc + parseFloat(num), 0);
            }
        });

        inlineInput.value = sum;
    }

    if (event.target.tagName === 'INPUT') {
        const input = event.target;
        input.style.width = input.scrollWidth + 'px';
    }
});

//Helps with creating new input boxes, buttons, and checkboxes
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('keydown', function (event) {
        if (event.target.classList.contains('under-input') && event.key === 'Enter') {
            event.preventDefault();

            if (event.target.dataset.enterHandled) return;
            event.target.dataset.enterHandled = "true";

            if (event.target.value.trim() === '') return;

            // Find the nearest div container that holds this input
            let section = event.target.closest('.input-group');
            if (!section) return; // Safety check

            // Create new input element
            let newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.className = 'under-input forIncome';
            newInput.placeholder = "Enter value";

            // Create new button
            let newButton = document.createElement('button');
            newButton.textContent = 'add to remaining';
            newButton.classList.add('forIncomeRemainBut');

            // Create new checkbox
            let newCheckBox = document.createElement('input');
            newCheckBox.type = 'checkbox';
            newCheckBox.classList.add('auto-check');

            // Append new elements inside the correct section
            let newDiv = document.createElement('div');
            newDiv.appendChild(newInput);
            newDiv.appendChild(newButton);
            newDiv.appendChild(newCheckBox);
            section.appendChild(newDiv); // Append to the section, not the entire input-group

            newInput.focus();

            setTimeout(() => delete event.target.dataset.enterHandled, 100);
        }
    });
});


// For button click functionality
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('forIncomeRemainBut')) {
            const inputBox = event.target.previousElementSibling;
            let value = parseFloat(inputBox.value) || 0;

            let currentTotal = parseFloat(localStorage.getItem('sharedInput')) || 0;
            currentTotal += value;
            localStorage.setItem('sharedInput', currentTotal);
            window.dispatchEvent(new Event('storage'));

            // Find the checkbox next to the clicked button and check it
            const checkBox = event.target.nextElementSibling;
            if (checkBox && checkBox.type === 'checkbox') {
                checkBox.checked = true;
            }
        }
    });
});

// For receiving values on another page
document.addEventListener('DOMContentLoaded', function () {
    const receiverInput = document.getElementById("receiver");

    // Function to update input value from localStorage
    function updateReceiver() {
        const content = localStorage.getItem('sharedInput') || "0";
        receiverInput.value = content;
    }

    // Load saved value when page loads
    updateReceiver();

    // Sync when storage changes (other page updates)
    window.addEventListener('storage', updateReceiver);

    // Save manually entered values
    receiverInput.addEventListener("input", function () {
        localStorage.setItem('sharedInput', receiverInput.value);
        window.dispatchEvent(new Event('storage')); // Update across pages
    });
});



//for cash receiver on remainingPage
document.addEventListener("DOMContentLoaded", function () {
    const cashReceiverInput = document.getElementById("cashReceiver");

    // Retrieve stored values (if available)
    cashReceiverInput.value = localStorage.getItem("cashReceiver") || "";

    // Save changes when user types
    cashReceiverInput.addEventListener("input", function () {
        localStorage.setItem("cashReceiver", cashReceiverInput.value);
    });
});








// document.addEventListener("DOMContentLoaded", function () {
//     function saveValues() {
//         const inputs = document.querySelectorAll(".givingInput, .under-input-giving");
//         const values = [];
//         inputs.forEach(input => values.push(input.value));
//         localStorage.setItem("givingInputs", JSON.stringify(values));
//     }

//     function loadValues() {
//         const savedValues = JSON.parse(localStorage.getItem("givingInputs")) || [];
//         const inputs = document.querySelectorAll(".givingInput, .under-input-giving");
//         inputs.forEach((input, index) => {
//             if (savedValues[index]) {
//                 input.value = savedValues[index];
//             }
//         });
//     }

//     document.body.addEventListener("input", function (event) {
//         if (event.target.classList.contains("givingInput") || event.target.classList.contains("under-input-giving")) {
//             saveValues();
//         }
//     });

//     loadValues();
// });









// document.addEventListener("DOMContentLoaded", function () {
//     const givingInputs = document.querySelectorAll(".givingInput");

//     // Load stored values
//     givingInputs.forEach(input => {
//         const savedValue = localStorage.getItem("giving");
//         if (savedValue) {
//             input.value = savedValue;
//         }

//         // Save when changed
//         input.addEventListener("input", function () {
//             localStorage.setItem("giving", input.value);
//         });
//     });
// });






// document.addEventListener("DOMContentLoaded", function () {
//     document.querySelectorAll("input[type='checkbox']").forEach((checkbox, index) => {
//         let storedValue = localStorage.getItem(`checkbox-${index}`);
//         if (storedValue === "true") {
//             checkbox.checked = true;
//         }

//         checkbox.addEventListener("change", function () {
//             localStorage.setItem(`checkbox-${index}`, checkbox.checked);
//         });
//     });
// });



























//********BELOW IS CODE THAT WORKS WELL TOO */


// document.addEventListener('DOMContentLoaded', function () {
//     // Load stored values when page loads
//     loadIncomeData();
//     loadSharedInput();
//     loadCashReceiver();

//     // Handle input sum updates
//     document.body.addEventListener('input', function (event) {
//         if (event.target.classList.contains('under-input')) {
//             updateInlineSum(event.target);
//         }

//         if (event.target.tagName === 'INPUT') {
//             event.target.style.width = (event.target.value.length + 1) + 'ch'; // Adjust width dynamically
//         }
//     });

//     // Add new input field on "Enter"
//     document.body.addEventListener("keydown", function (event) {
//         if (event.target.classList.contains('under-input') && event.key === 'Enter') {
//             event.preventDefault();
//             createNewInputField(event.target);
//         }
//     });

//     // Handle button clicks for updating remaining balance
//     document.body.addEventListener('click', function (event) {
//         if (event.target.classList.contains('forIncomeRemainBut')) {
//             updateSharedInput(event.target);
//         }
//     });

//     // Synchronize input across pages
//     window.addEventListener('storage', loadSharedInput);
//     document.getElementById("receiver")?.addEventListener("input", saveSharedInput);
//     document.getElementById("cashReceiver")?.addEventListener("input", saveCashReceiver);
// });

// // Function to update sum in inline input
// function updateInlineSum(inputElement) {
//     const inputGroup = inputElement.closest('.input-group');
//     const underInputs = inputGroup.querySelectorAll('.under-input');
//     const inlineInput = inputGroup.querySelector('.inline-input');

//     let sum = 0;
//     underInputs.forEach(input => {
//         const numbers = input.value.match(/-?\d+(\.\d+)?/g);
//         if (numbers) {
//             sum += numbers.map(Number).reduce((acc, num) => acc + num, 0);
//         }
//     });

//     inlineInput.value = sum;
// }

// // Function to create a new input field dynamically
// function createNewInputField(target) {
//     if (target.value.trim() === '') return;

//     let section = target.closest('.input-group');
//     if (!section) return;

//     let newDiv = document.createElement('div');

//     let newInput = document.createElement('input');
//     newInput.type = 'text';
//     newInput.className = 'under-input forIncome';
//     newInput.placeholder = "Enter value";

//     let newButton = document.createElement('button');
//     newButton.textContent = 'add to remaining';
//     newButton.classList.add('forIncomeRemainBut');

//     let newCheckBox = document.createElement('input');
//     newCheckBox.type = 'checkbox';
//     newCheckBox.classList.add('auto-check');

//     newDiv.append(newInput, newButton, newCheckBox);
//     section.appendChild(newDiv);
//     newInput.focus();
// }

// // Function to update shared input value
// function updateSharedInput(buttonElement) {
//     const inputBox = buttonElement.previousElementSibling;
//     let value = parseFloat(inputBox.value) || 0;

//     let currentTotal = parseFloat(localStorage.getItem('sharedInput')) || 0;
//     localStorage.setItem('sharedInput', currentTotal + value);
//     window.dispatchEvent(new Event('storage'));

//     const checkBox = buttonElement.nextElementSibling;
//     if (checkBox?.type === 'checkbox') {
//         checkBox.checked = true;
//     }
// }

// // Function to load shared input value on page load
// function loadSharedInput() {
//     const receiverInput = document.getElementById("receiver");
//     if (receiverInput) {
//         receiverInput.value = localStorage.getItem('sharedInput') || "0";
//     }
// }

// // Function to save shared input when manually edited
// function saveSharedInput() {
//     const receiverInput = document.getElementById("receiver");
//     localStorage.setItem('sharedInput', receiverInput.value);
//     window.dispatchEvent(new Event('storage'));
// }

// // Function to load cash receiver value
// function loadCashReceiver() {
//     const cashReceiverInput = document.getElementById("cashReceiver");
//     if (cashReceiverInput) {
//         cashReceiverInput.value = localStorage.getItem("cashReceiver") || "";
//     }
// }

// // Function to save cash receiver input
// function saveCashReceiver() {
//     const cashReceiverInput = document.getElementById("cashReceiver");
//     localStorage.setItem("cashReceiver", cashReceiverInput.value);
// }

// // Function to save income inputs to localStorage
// function saveIncomeData() {
//     const incomeInputs = document.querySelectorAll(".income input");
//     const incomeValues = Array.from(incomeInputs).map(input => input.value);
//     localStorage.setItem("incomeData", JSON.stringify(incomeValues));
// }

// // Function to load income data from localStorage
// function loadIncomeData() {
//     const incomeContainer = document.querySelector(".income");
//     const incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];

//     incomeData.forEach(value => {
//         const input = document.createElement("input");
//         input.type = "text";
//         input.value = value;
//         input.addEventListener("input", saveIncomeData);
//         incomeContainer.appendChild(input);
//     });
// }













