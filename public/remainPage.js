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
    restoreIncomeInputs(); // <-- Add this line
});







//adds up totals in input-boxe
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

   // Save income section
if (event.target.id === 'receiver' || event.target.id === 'cashReceiver') {
    const receiver = document.getElementById('receiver').value;
    const cashReceiver = document.getElementById('cashReceiver').value;

    localStorage.setItem('incomeData', JSON.stringify({
        receiver,
        cashReceiver
    }));

    updateTotalIncome(); // optional, if you want these to affect total
}


    updateTotalIncome(); // recalculate grand total
}



);

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



}

 function restoreIncomeInputs() {
    const saved = localStorage.getItem('incomeData');
    if (saved) {
        const { receiver, cashReceiver } = JSON.parse(saved);
        document.getElementById('receiver').value = receiver || '';
        document.getElementById('cashReceiver').value = cashReceiver || '';
    }
 }






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