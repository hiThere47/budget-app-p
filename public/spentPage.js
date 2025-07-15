//Helps with getting sums in respective input boxes
// document.addEventListener('input', function (event) {
//     if (event.target.classList.contains('under-input')) {
//         const inputGroup = event.target.closest('.input-group');
//         const underInputs = inputGroup.querySelectorAll('.under-input');
//         const inlineInput = inputGroup.querySelector('.inline-input');

//         let sum = 0;
//         underInputs.forEach(input => {
//             const numbers = input.value.match(/-?\d+(\.\d+)?/g);
//             if (numbers) {
//                 sum += numbers.reduce((acc, num) => acc + parseFloat(num), 0);
//             }
//         });

//         inlineInput.value = sum;
//     }

//     if (event.target.tagName === 'INPUT') {
//         const input = event.target;
//         input.style.width = input.scrollWidth + 'px';
//     }
// });




//For button click functionality in the Income section
// document.addEventListener('DOMContentLoaded', function () {
//     document.body.addEventListener('click', function (event) {
//         if (event.target.classList.contains('forIncomeRemainBut')) {
//             const inputBox = event.target.previousElementSibling;
//             let value = parseFloat(inputBox.value) || 0;

//             let currentTotal = parseFloat(localStorage.getItem('sharedInput')) || 0;
//             currentTotal -= value;
//             localStorage.setItem('sharedInput', currentTotal);
//             window.dispatchEvent(new Event('storage'));

            // Find the checkbox next to the clicked button and check it
//             const checkBox = event.target.nextElementSibling;
//             if (checkBox && checkBox.type === 'checkbox') {
//                 checkBox.checked = true;
//             }
//         }
//     });
// });



// document.addEventListener('keydown', function (event) {
//     if (
//         event.target.classList.contains('under-input') &&
//         event.key === 'Enter'
//     ) {
//         const inputGroup = event.target.closest('.input-group');

        // Only allow adding new inputs if this input group is for "Giving"
        // const isGivingGroup = inputGroup.querySelector('h3')?.textContent.toLowerCase().includes('giving');

        // if (isGivingGroup) {
        //     event.preventDefault();

        //     const currentInput = event.target;
        //     const newInput = document.createElement('input');
        //     newInput.type = 'text';
        //     newInput.className = currentInput.className; // replicate same classes
        //     newInput.placeholder = currentInput.placeholder || '';

            // Insert and focus
//             currentInput.parentNode.insertBefore(newInput, currentInput.nextSibling);
//             newInput.focus();
//         }
//     }
// });























// For receiving values on remaining page from Income section
// document.addEventListener('DOMContentLoaded', function () {
//     const receiverInput = document.getElementById("receiver");

//     // Function to update input value from localStorage
//     function updateReceiver() {
//         const content = localStorage.getItem('sharedInput') || "0";
//         const numbers = content.match(/-?\d+(\.\d+)?/g); // Extract numbers
//         receiverInput.value = numbers ? numbers.join(" ") : "0"; // Join numbers into a string
//     }

//     // Load saved value when page loads
//     updateReceiver();

//     // Sync when storage changes (other page updates)
//     window.addEventListener('storage', updateReceiver);

//     // Save manually entered values
//     receiverInput.addEventListener("input", function () {
//         localStorage.setItem('sharedInput', receiverInput.value);
//         window.dispatchEvent(new Event('storage')); // Update across pages
//     });
// });





// *************************************************************************************************************8


document.addEventListener('input', function (event) {
    // Resize input dynamically
    if (event.target.tagName === 'INPUT') {
        const input = event.target;
        input.style.width = input.scrollWidth + 'px';
    }

    // Handle .under-input calculations
    if (event.target.classList.contains('under-input')) {
        const inputGroup = event.target.closest('.input-group');
        const section = inputGroup.dataset.section;
        const underInputs = inputGroup.querySelectorAll('.under-input');
        const sectionTotal = inputGroup.querySelector('.inline-input.section-total');

        let sum = 0;
        underInputs.forEach(input => {
            const numbers = input.value.match(/-?\d+(\.\d+)?/g);
            if (numbers) {
                sum += numbers.reduce((acc, num) => acc + parseFloat(num), 0);
            }
        });

        // Update section total
        sectionTotal.value = sum;

        // Save section data
        saveSection(section, underInputs);

        // Recalculate full total
        updateTotalIncome();
    }
});

// Save all .under-inputs in a section to localStorage
function saveSection(sectionName, inputs) {
    const values = Array.from(inputs).map(input => input.value);
    localStorage.setItem(`section-${sectionName}`, JSON.stringify(values));
}

// Recalculate grand total from all .section-total inputs
function updateTotalIncome() {
    let total = 0;
    document.querySelectorAll('.section-total').forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    const totalIncomeInput = document.querySelector('.total-income');
    totalIncomeInput.value = total;
    localStorage.setItem('sharedInput', total); // optional
}


//Restores Section Inputs on load
function restoreSections() {
    const groups = document.querySelectorAll('.input-group[data-section]');

    groups.forEach(group => {
        const section = group.dataset.section;
        const saved = localStorage.getItem(`section-${section}`);
        const container = group.querySelector('.under-input')?.parentNode || group;
        const totalInput = group.querySelector('.section-total');

        if (saved) {
            const values = JSON.parse(saved);

            // Remove current inputs if any
            group.querySelectorAll('.under-input').forEach(input => input.remove());

            // Create and append new inputs
            values.forEach(val => {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'under-input';
                input.value = val;
                container.appendChild(input);
            });
        }
    });

    // Recalculate all section totals manually
    groups.forEach(group => {
        const underInputs = group.querySelectorAll('.under-input');
        const sectionTotal = group.querySelector('.section-total');
        let sum = 0;

        underInputs.forEach(input => {
            const numbers = input.value.match(/-?\d+(\.\d+)?/g);
            if (numbers) {
                sum += numbers.reduce((acc, num) => acc + parseFloat(num), 0);
            }
        });

        sectionTotal.value = sum;
    });

    updateTotalIncome(); // recalculate grand total
}


//Creates new input boxes on 'Enter' in each section for every under-input
document.addEventListener('keydown', function (event) {
    if (
        event.target.classList.contains('under-input') &&
        event.key === 'Enter'
    ) {
        const inputGroup = event.target.closest('.input-group');
        const allowedSections = ['giving', 'savings', 'housing', 'transportation', 'food', 'lifestyle', 'insurance-bills', 'debt', 'extra']; // add more as needed
        const sectionName = inputGroup.dataset.section;
        const isAllowedGroup = allowedSections.includes(sectionName);


        if (isAllowedGroup) {
            event.preventDefault();

            const currentInput = event.target;
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.className = currentInput.className;
            newInput.placeholder = currentInput.placeholder || '';
            currentInput.parentNode.insertBefore(newInput, currentInput.nextSibling);
            newInput.focus();
        }
    }
});


// On load
document.addEventListener('DOMContentLoaded', function () {
    restoreSections();
});







//this is for the button that clears all data for the page not just one specefic section
document.getElementById('reset-all').addEventListener('click', function () {
    const confirmReset = confirm('Are you sure you want to clear all data?');
    if (confirmReset) {
        localStorage.clear();
        location.reload();
    }
});






//this help clear section values in a specefic section
document.querySelectorAll('.reset-section').forEach(button => {
    button.addEventListener('click', function () {
        const group = button.closest('.input-group');
        const section = group.dataset.section;

        const confirmSectionReset = confirm(`Clear data for ${section}?`);
        if (!confirmSectionReset) return;

        // Clear saved data from localStorage
        localStorage.removeItem(`section-${section}`);

        // Remove under-input fields
        group.querySelectorAll('.under-input').forEach(input => input.remove());

        // Clear total for the section
        const totalInput = group.querySelector('.section-total');
        if (totalInput) totalInput.value = '';

        updateTotalIncome(); // Refresh the overall total
    });
});





// // Restore section inputs on load
// function restoreSections() {
//     document.querySelectorAll('.input-group[data-section]').forEach(group => {
//         const section = group.dataset.section;
//         const saved = localStorage.getItem(`section-${section}`);
//         const container = group;
//         const totalInput = group.querySelector('.section-total');

//         if (saved) {
//             const values = JSON.parse(saved);
//             const inputContainer = group.querySelectorAll('.under-input')[0].parentNode;

//             // Remove all current under-inputs
//             group.querySelectorAll('.under-input').forEach(input => input.remove());

//             // Recreate inputs from saved values
//             values.forEach(val => {
//                 const input = document.createElement('input');
//                 input.type = 'text';
//                 input.className = 'under-input';
//                 input.value = val;
//                 inputContainer.appendChild(input);
//             });

//             // Trigger input manually to update totals
//             inputContainer.querySelectorAll('.under-input').forEach(input => {
//                 input.dispatchEvent(new Event('input'));
//             });
//         }
//     });

//     updateTotalIncome(); // recalc overall
// }
































// document.addEventListener('input', function (event) {
//     // Resize input dynamically
//     if (event.target.tagName === 'INPUT') {
//         const input = event.target;
//         input.style.width = input.scrollWidth + 'px';
//     }

//     // Handle .under-input calculations
//     if (event.target.classList.contains('under-input')) {
//         const inputGroup = event.target.closest('.input-group');
//         const section = inputGroup.dataset.section;
//         const underInputs = inputGroup.querySelectorAll('.under-input');
//         const sectionTotal = inputGroup.querySelector('.inline-input.section-total');

//         let sum = 0;
//         underInputs.forEach(input => {
//             const numbers = input.value.match(/-?\d+(\.\d+)?/g);
//             if (numbers) {
//                 sum += numbers.reduce((acc, num) => acc + parseFloat(num), 0);
//             }
//         });

//         // Update section total
//         sectionTotal.value = sum;

//         // Save section data
//         saveSection(section, underInputs);

//         // Recalculate full total
//         updateTotalIncome();
//     }
// });

// // Save all .under-inputs in a section to localStorage
// function saveSection(sectionName, inputs) {
//     const values = Array.from(inputs).map(input => input.value);
//     localStorage.setItem(`section-${sectionName}`, JSON.stringify(values));
// }

// // Recalculate grand total from all .section-total inputs
// function updateTotalIncome() {
//     let total = 0;
//     document.querySelectorAll('.section-total').forEach(input => {
//         total += parseFloat(input.value) || 0;
//     });
//     const totalIncomeInput = document.querySelector('.total-income');
//     totalIncomeInput.value = total;
//     localStorage.setItem('sharedInput', total); // optional
// }

// function restoreSections() {
//     document.querySelectorAll('.input-group[data-section]').forEach(group => {
//         const section = group.dataset.section;
//         const saved = localStorage.getItem(`section-${section}`);
//         const totalInput = group.querySelector('.section-total');

//         if (saved) {
//             const values = JSON.parse(saved);

//             // Remove old inputs
//             group.querySelectorAll('.under-input').forEach(input => input.remove());

//             // Recreate inputs
//             values.forEach(val => {
//                 const input = document.createElement('input');
//                 input.type = 'text';
//                 input.className = 'under-input';
//                 input.value = val;
//                 totalInput.parentNode.appendChild(input);
//             });

//             // Manually trigger the sum logic
//             let sum = 0;
//             const underInputs = group.querySelectorAll('.under-input');
//             underInputs.forEach(input => {
//                 const numbers = input.value.match(/-?\d+(\.\d+)?/g);
//                 if (numbers) {
//                     sum += numbers.reduce((acc, num) => acc + parseFloat(num), 0);
//                 }
//             });

//             // Set the section total value
//             totalInput.value = sum;
//         }
//     });

//     // Update grand total
//     updateTotalIncome();
// }


// // Add input when pressing Enter (For All sections)
// document.addEventListener('keydown', function (event) {
//     if (
//         event.target.classList.contains('under-input') &&
//         event.key === 'Enter'
//     ) {
//         const inputGroup = event.target.closest('.input-group');
//         const allowedSections = ['giving', 'savings',]; // add more as needed
//         const sectionName = inputGroup.dataset.section;
//         const isAllowedGroup = allowedSections.includes(sectionName);


//         if (isAllowedGroup) {
//             event.preventDefault();

//             const currentInput = event.target;
//             const newInput = document.createElement('input');
//             newInput.type = 'text';
//             newInput.className = currentInput.className;
//             newInput.placeholder = currentInput.placeholder || '';
//             currentInput.parentNode.insertBefore(newInput, currentInput.nextSibling);
//             newInput.focus();
//         }
//     }
// });

// // On load
// document.addEventListener('DOMContentLoaded', function () {
//     restoreSections();
// });















