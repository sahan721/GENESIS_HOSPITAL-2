// Defining Variables
const summaryTableBody = document.querySelector("#summary-table tbody");
const paymentForm = document.getElementById("payment-form");

// Define Event Listeners
document.addEventListener("DOMContentLoaded", initializeOrderSummary);
paymentForm.addEventListener("submit", handlePaymentFormSubmission);

// Function to populate the Order Summary table
function populateOrderSummary() {
    // Retrieve cart data from localStorage
    const cart = JSON.parse(localStorage.getItem("orderCart") || "[]");
    console.log("Cart data retrieved from localStorage:", cart); // Debug log

    let total = 0;

    // Clear existing rows in the table
    summaryTableBody.innerHTML = "";

    if (cart.length === 0) {
        // Display a message if the cart is empty
        const emptyRow = document.createElement("tr");
        emptyRow.innerHTML = `
            <td colspan="4" style="text-align: center;"><strong>No items selected</strong></td>
        `;
        summaryTableBody.appendChild(emptyRow);
        return; // Exit function as there are no items to process
    }

    // Add each item in the cart to the table
    cart.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${item.quantity}</td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;
        summaryTableBody.appendChild(row);
        total += item.price * item.quantity;
    });

    // Add a row for the total price
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td colspan="3"><strong>Total</strong></td>
        <td><strong>${total.toFixed(2)}</strong></td>
    `;
    summaryTableBody.appendChild(totalRow);
}

// Function to remove an item from the cart
function removeFromCart(index) {
    // Retrieve the cart data from localStorage
    let cart = JSON.parse(localStorage.getItem("orderCart") || "[]");

    // Remove the item from the cart based on the index
    cart.splice(index, 1);

    // Save the updated cart back to localStorage
    localStorage.setItem("orderCart", JSON.stringify(cart));

    // Re-render the order summary
    populateOrderSummary();
}

// Function to initialize the Order Summary table
function initializeOrderSummary() {
    console.log("DOM fully loaded. Initializing Order Summary...");
    populateOrderSummary();
}

// Function to handle payment form submission
function handlePaymentFormSubmission(event) {
    event.preventDefault();

    // Collect form data
    const name = document.querySelector('input[placeholder="Name"]').value.trim();
    const address = document.querySelector('input[placeholder="Address"]').value.trim();
    const contactNumber = document.querySelector('input[placeholder="Contact Number"]').value.trim();
    const email = document.querySelector('input[placeholder="Email"]').value.trim();
    const CVV = document.querySelector('input[placeholder="CVV"]').value.trim();
    const expMonth = document.querySelector('input[placeholder="Exp Month"]').value.trim();
    const expYear = document.querySelector('input[placeholder="Exp Year"]').value.trim();

    // Validate form inputs
    if (name && address && contactNumber) {
        // Calculate delivery date (5 days from now)
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);

        // Show confirmation message
        alert(`Thank you for your purchase, ${name}!\n\nYour order will be delivered by ${deliveryDate.toDateString()}.`);

        // Clear cart data after successful purchase
        localStorage.removeItem("orderCart");
        paymentForm.reset(); // Reset the form
    } else {
        alert("Please fill in all required fields!");
    }
}
