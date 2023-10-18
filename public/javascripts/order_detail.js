// For plus minus button
document.addEventListener("DOMContentLoaded", function () {
    const minusBtn = document.getElementById("minus-btn");
    const plusBtn = document.getElementById("plus-btn");
    const quantityInput = document.getElementById("quantity");

    // Event listener for minus button
    minusBtn.addEventListener("click", function () {
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
        }
    });

    // Event listener for plus button
    plusBtn.addEventListener("click", function () {
        let currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1;
    });
});

// for drop down Selection button

function updateButton(selectedItem) {
    document.querySelector('.btn.selection').innerText = selectedItem;
}

function enableDropdown() {
    document.querySelector('.btn.selection').disabled = false;
}

function disableDropdown() {
    document.querySelector('.btn.selection').disabled = true;
}

