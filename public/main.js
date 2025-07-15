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
// document.addEventListener('DOMContentLoaded', function () {
//     document.body.addEventListener('keydown', function (event) {
//         if (event.target.classList.contains('under-input') && event.key === 'Enter') {
//             event.preventDefault();

//             if (event.target.dataset.enterHandled) return;
//             event.target.dataset.enterHandled = "true";

//             if (event.target.value.trim() === '') return;

//             // Find the nearest div container that holds this input
//             let section = event.target.closest('.input-group');
//             if (!section) return; // Safety check

//             // Create new input element
//             let newInput = document.createElement('input');
//             newInput.type = 'text';
//             newInput.className = 'under-input forIncome';
//             newInput.placeholder = "Enter value";

//             // Create new button
//             let newButton = document.createElement('button');
//             newButton.textContent = 'add to remaining';
//             newButton.classList.add('forIncomeRemainBut');

//             // Create new checkbox
//             let newCheckBox = document.createElement('input');
//             newCheckBox.type = 'checkbox';
//             newCheckBox.classList.add('auto-check');

//             // Append new elements inside the correct section
//             let newDiv = document.createElement('div');
//             newDiv.appendChild(newInput);
//             newDiv.appendChild(newButton);
//             newDiv.appendChild(newCheckBox);
//             section.appendChild(newDiv); // Append to the section, not the entire input-group

//             newInput.focus();

//             setTimeout(() => delete event.target.dataset.enterHandled, 100);
//         }
//     });
// });




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

            // Determine button text based on the section type
            if (event.target.classList.contains('under-input-giving')) {
                newButton.textContent = 'add to Give-remaining';
                newButton.classList.add('forGivingRemainBut');
            } else {
                newButton.textContent = 'add to remaining';
                newButton.classList.add('forIncomeRemainBut');
            }

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



// For receiving values on another page
document.addEventListener('DOMContentLoaded', function () {
    const receiverInput = document.getElementById("receiver");

    // Function to update input value from localStorage
    function updateReceiver() {
        const content = localStorage.getItem('sharedInput') || "0";
        const numbers = content.match(/-?\d+(\.\d+)?/g); // Extract numbers
        receiverInput.value = numbers ? numbers.join(" ") : "0"; // Join numbers into a string
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






// For button click functionality for giving section
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('forGivingRemainBut')) {
            const inputBox = event.target.previousElementSibling;
            let value = parseFloat(inputBox.value) || 0;

            let currentTotal = parseFloat(localStorage.getItem('sharedGiving')) || 0;
            currentTotal += value;
            localStorage.setItem('sharedGiving', currentTotal);
            window.dispatchEvent(new Event('storage'));

            // Find the checkbox next to the clicked button and check it
            const checkBox = event.target.nextElementSibling;
            if (checkBox && checkBox.type === 'checkbox') {
                checkBox.checked = true;
            }
        }
    });
});



// For receiving values on another page giving section
document.addEventListener('DOMContentLoaded', function () {
    const givingReceiverInput = document.getElementById("givingReceiver");

    // Function to update input value from localStorage
    function updategivingReceiver() {
        const content = localStorage.getItem('sharedGiving') || "0";
        const numbers = content.match(/-?\d+(\.\d+)?/g); // Extract numbers
        givingReceiverInput.value = numbers ? numbers.join(" ") : "0"; // Join numbers into a string
    }

    // Load saved value when page loads
    updategivingReceiver();

    // Sync when storage changes (other page updates)
    window.addEventListener('storage', updategivingReceiver);

    // Save manually entered values
    givingReceiverInput.addEventListener("input", function () {
        localStorage.setItem('sharedGiving', givingReceiverInput.value);
        window.dispatchEvent(new Event('storage')); // Update across pages
    });
});






// For button click functionality for savings section
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('forSavingsRemainBut')) {
            const inputBox = event.target.previousElementSibling;
            let value = parseFloat(inputBox.value) || 0;

            let currentTotal = parseFloat(localStorage.getItem('sharedSavings')) || 0;
            currentTotal += value;
            localStorage.setItem('sharedSavings', currentTotal);
            window.dispatchEvent(new Event('storage'));

            // Find the checkbox next to the clicked button and check it
            const checkBox = event.target.nextElementSibling;
            if (checkBox && checkBox.type === 'checkbox') {
                checkBox.checked = true;
            }
        }
    });
});




// For receiving values on another page savings section
document.addEventListener('DOMContentLoaded', function () {
    const savingsReceiverInput = document.getElementById("savingsReceiver");

    // Function to update input value from localStorage
    function updatesavingsReceiver() {
        const content = localStorage.getItem('sharedSavings') || "0";
        const numbers = content.match(/-?\d+(\.\d+)?/g); // Extract numbers
        savingsReceiverInput.value = numbers ? numbers.join(" ") : "0"; // Join numbers into a string
    }

    // Load saved value when page loads
    updatesavingsReceiver();

    // Sync when storage changes (other page updates)
    window.addEventListener('storage', updatesavingsReceiver);

    // Save manually entered values
    savingsReceiverInput.addEventListener("input", function () {
        localStorage.setItem('sharedSavings', savingsReceiverInput.value);
        window.dispatchEvent(new Event('storage')); // Update across pages
    });
});






// For button click functionality for housing section
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('forHousingRemainBut')) {
            const inputBox = event.target.previousElementSibling;
            let value = parseFloat(inputBox.value) || 0;

            let currentTotal = parseFloat(localStorage.getItem('sharedHousing')) || 0;
            currentTotal += value;
            localStorage.setItem('sharedHousing', currentTotal);
            window.dispatchEvent(new Event('storage'));

            // Find the checkbox next to the clicked button and check it
            const checkBox = event.target.nextElementSibling;
            if (checkBox && checkBox.type === 'checkbox') {
                checkBox.checked = true;
            }
        }
    });
});




// For receiving values on another page housing section
document.addEventListener('DOMContentLoaded', function () {
    const housingReceiverInput = document.getElementById("housingReceiver");

    // Function to update input value from localStorage
    function updatehousingReceiver() {
        const content = localStorage.getItem('sharedHousing') || "0";
        const numbers = content.match(/-?\d+(\.\d+)?/g); // Extract numbers
        housingReceiverInput.value = numbers ? numbers.join(" ") : "0"; // Join numbers into a string
    }

    // Load saved value when page loads
    updatehousingReceiver();

    // Sync when storage changes (other page updates)
    window.addEventListener('storage', updatehousingReceiver);

    // Save manually entered values
    housingReceiverInput.addEventListener("input", function () {
        localStorage.setItem('sharedHousing', housingReceiverInput.value);
        window.dispatchEvent(new Event('storage')); // Update across pages
    });
});




// For button click functionality for transportation section
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('forTransportationRemainBut')) {
            const inputBox = event.target.previousElementSibling;
            let value = parseFloat(inputBox.value) || 0;

            let currentTotal = parseFloat(localStorage.getItem('sharedTransportation')) || 0;
            currentTotal += value;
            localStorage.setItem('sharedTransportation', currentTotal);
            window.dispatchEvent(new Event('storage'));

            // Find the checkbox next to the clicked button and check it
            const checkBox = event.target.nextElementSibling;
            if (checkBox && checkBox.type === 'checkbox') {
                checkBox.checked = true;
            }
        }
    });
});




// For receiving values on another page transportation section
document.addEventListener('DOMContentLoaded', function () {
    const transportationReceiverInput = document.getElementById("transportationReceiver");

    // Function to update input value from localStorage
    function updatetransportationReceiver() {
        const content = localStorage.getItem('sharedTransportation') || "0";
        const numbers = content.match(/-?\d+(\.\d+)?/g); // Extract numbers
        transportationReceiverInput.value = numbers ? numbers.join(" ") : "0"; // Join numbers into a string
    }

    // Load saved value when page loads
    updatetransportationReceiver();

    // Sync when storage changes (other page updates)
    window.addEventListener('storage', updatetransportationReceiver);

    // Save manually entered values
    transportationReceiverInput.addEventListener("input", function () {
        localStorage.setItem('sharedTransportation', transportationReceiverInput.value);
        window.dispatchEvent(new Event('storage')); // Update across pages
    });
});



// For button click functionality for food section
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('forFoodRemainBut')) {
            const inputBox = event.target.previousElementSibling;
            let value = parseFloat(inputBox.value) || 0;

            let currentTotal = parseFloat(localStorage.getItem('sharedFood')) || 0;
            currentTotal += value;
            localStorage.setItem('sharedFood', currentTotal);
            window.dispatchEvent(new Event('storage'));

            // Find the checkbox next to the clicked button and check it
            const checkBox = event.target.nextElementSibling;
            if (checkBox && checkBox.type === 'checkbox') {
                checkBox.checked = true;
            }
        }
    });
});




// For receiving values on another page food section
document.addEventListener('DOMContentLoaded', function () {
    const foodReceiverInput = document.getElementById("foodReceiver");

    // Function to update input value from localStorage
    function updatefoodReceiver() {
        const content = localStorage.getItem('sharedFood') || "0";
        const numbers = content.match(/-?\d+(\.\d+)?/g); // Extract numbers
        foodReceiverInput.value = numbers ? numbers.join(" ") : "0"; // Join numbers into a string
    }

    // Load saved value when page loads
    updatefoodReceiver();

    // Sync when storage changes (other page updates)
    window.addEventListener('storage', updatefoodReceiver);

    // Save manually entered values
    foodReceiverInput.addEventListener("input", function () {
        localStorage.setItem('sharedFood', foodReceiverInput.value);
        window.dispatchEvent(new Event('storage')); // Update across pages
    });
});




// For button click functionality for lifestyle section
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('forLifestyleRemainBut')) {
            const inputBox = event.target.previousElementSibling;
            let value = parseFloat(inputBox.value) || 0;

            let currentTotal = parseFloat(localStorage.getItem('sharedLifestyle')) || 0;
            currentTotal += value;
            localStorage.setItem('sharedLifestyle', currentTotal);
            window.dispatchEvent(new Event('storage'));

            // Find the checkbox next to the clicked button and check it
            const checkBox = event.target.nextElementSibling;
            if (checkBox && checkBox.type === 'checkbox') {
                checkBox.checked = true;
            }
        }
    });
});




// For receiving values on another page lifestyle section
document.addEventListener('DOMContentLoaded', function () {
    const lifestyleReceiverInput = document.getElementById("lifeStyleReceiver");

    // Function to update input value from localStorage
    function updatelifestyleReceiver() {
        const content = localStorage.getItem('sharedLifestyle') || "0";
        const numbers = content.match(/-?\d+(\.\d+)?/g); // Extract numbers
        lifestyleReceiverInput.value = numbers ? numbers.join(" ") : "0"; // Join numbers into a string
    }

    // Load saved value when page loads
    updatelifestyleReceiver();

    // Sync when storage changes (other page updates)
    window.addEventListener('storage', updatelifestyleReceiver);

    // Save manually entered values
    lifestyleReceiverInput.addEventListener("input", function () {
        localStorage.setItem('sharedLifestyle', lifestyleReceiverInput.value);
        window.dispatchEvent(new Event('storage')); // Update across pages
    });
});




// For button click functionality for insuranceBill section
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('forInsuranceBillsRemainBut')) { //*********** */
            const inputBox = event.target.previousElementSibling;
            let value = parseFloat(inputBox.value) || 0;

            let currentTotal = parseFloat(localStorage.getItem('sharedinsuranceBills')) || 0;
            currentTotal += value;
            localStorage.setItem('sharedinsuranceBills', currentTotal);
            window.dispatchEvent(new Event('storage'));

            // Find the checkbox next to the clicked button and check it
            const checkBox = event.target.nextElementSibling;
            if (checkBox && checkBox.type === 'checkbox') {
                checkBox.checked = true;
            }
        }
    });
});




// For receiving values on another page insuranceBill section
document.addEventListener('DOMContentLoaded', function () {
    const insuranceBillsReceiverInput = document.getElementById("insuranceBillsReceiver");

    // Function to update input value from localStorage
    function updateinsuranceBillsReceiver() {
        const content = localStorage.getItem('sharedinsuranceBills') || "0";
        const numbers = content.match(/-?\d+(\.\d+)?/g); // Extract numbers
        insuranceBillsReceiverInput.value = numbers ? numbers.join(" ") : "0"; // Join numbers into a string
    }

    // Load saved value when page loads
    updateinsuranceBillsReceiver();            //***************************** */

    // Sync when storage changes (other page updates)
    window.addEventListener('storage', updateinsuranceBillsReceiver);

    // Save manually entered values
    insuranceBillsReceiverInput.addEventListener("input", function () {
        localStorage.setItem('sharedinsuranceBills', insuranceBillsReceiverInput.value);
        window.dispatchEvent(new Event('storage')); // Update across pages
    });
});










// For button click functionality for Debt section
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('forDebtRemainBut')) {
            const inputBox = event.target.previousElementSibling;
            let value = parseFloat(inputBox.value) || 0;

            let currentTotal = parseFloat(localStorage.getItem('sharedDebt')) || 0;
            currentTotal += value;
            localStorage.setItem('sharedDebt', currentTotal);
            window.dispatchEvent(new Event('storage'));

            // Find the checkbox next to the clicked button and check it
            const checkBox = event.target.nextElementSibling;
            if (checkBox && checkBox.type === 'checkbox') {
                checkBox.checked = true;
            }
        }
    });
});




// For receiving values on another page debt section
document.addEventListener('DOMContentLoaded', function () {
    const debtReceiverInput = document.getElementById("debtReceiver");

    // Function to update input value from localStorage
    function updatedebtReceiver() {
        const content = localStorage.getItem('sharedDebt') || "0";
        const numbers = content.match(/-?\d+(\.\d+)?/g); // Extract numbers
        debtReceiverInput.value = numbers ? numbers.join(" ") : "0"; // Join numbers into a string
    }

    // Load saved value when page loads
    updatedebtReceiver();

    // Sync when storage changes (other page updates)
    window.addEventListener('storage', updatedebtReceiver);

    // Save manually entered values
    debtReceiverInput.addEventListener("input", function () {
        localStorage.setItem('sharedDebt', debtReceiverInput.value);
        window.dispatchEvent(new Event('storage')); // Update across pages
    });
});










// For button click functionality for extra section
document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('forExtraRemainBut')) {
            const inputBox = event.target.previousElementSibling;
            let value = parseFloat(inputBox.value) || 0;

            let currentTotal = parseFloat(localStorage.getItem('sharedExtra')) || 0;
            currentTotal += value;
            localStorage.setItem('sharedExtra', currentTotal);
            window.dispatchEvent(new Event('storage'));

            // Find the checkbox next to the clicked button and check it
            const checkBox = event.target.nextElementSibling;
            if (checkBox && checkBox.type === 'checkbox') {
                checkBox.checked = true;
            }
        }
    });
});




// For receiving values on another page extra section
document.addEventListener('DOMContentLoaded', function () {
    const extraReceiverInput = document.getElementById("extraReceiver");

    // Function to update input value from localStorage
    function updateextraReceiver() {
        const content = localStorage.getItem('sharedExtra') || "0";
        const numbers = content.match(/-?\d+(\.\d+)?/g); // Extract numbers
        extraReceiverInput.value = numbers ? numbers.join(" ") : "0"; // Join numbers into a string
    }

    // Load saved value when page loads
    updateextraReceiver();

    // Sync when storage changes (other page updates)
    window.addEventListener('storage', updateextraReceiver);

    // Save manually entered values
    extraReceiverInput.addEventListener("input", function () {
        localStorage.setItem('sharedExtra', extraReceiverInput.value);
        window.dispatchEvent(new Event('storage')); // Update across pages
    });
});
















//This helps store SOME content in the Income section of ejs
document.addEventListener("DOMContentLoaded", function () {
    const moneyInput = document.querySelectorAll(".moneyInput");

    // Load stored values
    moneyInput.forEach(input => {
        const savedValue = localStorage.getItem("money");
        if (savedValue) {
            input.value = savedValue;
        }

        // Save when changed
        input.addEventListener("input", function () {
            localStorage.setItem("money", input.value);
        });
    });
});






//This helps store SOME content in the giving section of ejs 
document.addEventListener("DOMContentLoaded", function () {
    const givingInputs = document.querySelectorAll(".givingInput");

    // Load stored values
    givingInputs.forEach(input => {
        const savedValue = localStorage.getItem("giving");
        if (savedValue) {
            input.value = savedValue;
        }

        // Save when changed
        input.addEventListener("input", function () {
            localStorage.setItem("giving", input.value);
        });
    });
});




//This helps store SOME content in the saving section of ejs
document.addEventListener("DOMContentLoaded", function () {
    const givingInputs = document.querySelectorAll(".savingsInput");

    // Load stored values
    givingInputs.forEach(input => {
        const savedValue = localStorage.getItem("savings");
        if (savedValue) {
            input.value = savedValue;
        }

        // Save when changed
        input.addEventListener("input", function () {
            localStorage.setItem("savings", input.value);
        });
    });
});







//This helps store SOME content in the housing section of ejs
document.addEventListener("DOMContentLoaded", function () {
    const givingInputs = document.querySelectorAll(".housingInput");

    // Load stored values
    givingInputs.forEach(input => {
        const savedValue = localStorage.getItem("housing");
        if (savedValue) {
            input.value = savedValue;
        }

        // Save when changed
        input.addEventListener("input", function () {
            localStorage.setItem("housing", input.value);
        });
    });
});


//This helps store SOME content in the transportation section of ejs
document.addEventListener("DOMContentLoaded", function () {
    const givingInputs = document.querySelectorAll(".transportationInput");

    // Load stored values
    givingInputs.forEach(input => {
        const savedValue = localStorage.getItem("transportation");
        if (savedValue) {
            input.value = savedValue;
        }

        // Save when changed
        input.addEventListener("input", function () {
            localStorage.setItem("transportation", input.value);
        });
    });
});



//This helps store SOME content in the food section of ejs
document.addEventListener("DOMContentLoaded", function () {
    const givingInputs = document.querySelectorAll(".foodInput");

    // Load stored values
    givingInputs.forEach(input => {
        const savedValue = localStorage.getItem("food");
        if (savedValue) {
            input.value = savedValue;
        }

        // Save when changed
        input.addEventListener("input", function () {
            localStorage.setItem("food", input.value);
        });
    });
});




//This helps store SOME content in the lifestyle section of ejs
document.addEventListener("DOMContentLoaded", function () {
    const givingInputs = document.querySelectorAll(".lifestyleInput");

    // Load stored values
    givingInputs.forEach(input => {
        const savedValue = localStorage.getItem("lifestyle");
        if (savedValue) {
            input.value = savedValue;
        }

        // Save when changed
        input.addEventListener("input", function () {
            localStorage.setItem("lifestyle", input.value);
        });
    });
});





//This helps store SOME content in the insuranceBill section of ejs
document.addEventListener("DOMContentLoaded", function () {
    const givingInputs = document.querySelectorAll(".insuranceBillInput");

    // Load stored values
    givingInputs.forEach(input => {
        const savedValue = localStorage.getItem("insuranceBill");
        if (savedValue) {
            input.value = savedValue;
        }

        // Save when changed
        input.addEventListener("input", function () {
            localStorage.setItem("insuranceBill", input.value);
        });
    });
});







//This helps store SOME content in the debt section of ejs
document.addEventListener("DOMContentLoaded", function () {
    const givingInputs = document.querySelectorAll(".debtInput");

    // Load stored values
    givingInputs.forEach(input => {
        const savedValue = localStorage.getItem("debt");
        if (savedValue) {
            input.value = savedValue;
        }

        // Save when changed
        input.addEventListener("input", function () {
            localStorage.setItem("debt", input.value);
        });
    });
});



//This helps store SOME content in the extra section of ejs
document.addEventListener("DOMContentLoaded", function () {
    const givingInputs = document.querySelectorAll(".extraInput");

    // Load stored values
    givingInputs.forEach(input => {
        const savedValue = localStorage.getItem("extra");
        if (savedValue) {
            input.value = savedValue;
        }

        // Save when changed
        input.addEventListener("input", function () {
            localStorage.setItem("extra", input.value);
        });
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













