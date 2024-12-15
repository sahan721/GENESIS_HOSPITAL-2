// Defining Variables
let cart = [];
const cartTable = document.getElementById("cart-table");
const totalPriceElem = document.getElementById("total-price");
const buyNowButton = document.getElementById("buyNow");
const clearCartButton = document.getElementById("clearCart");  // Get the "Clear Cart" button

//Define Event Listeners
buyNowButton.addEventListener("click", onBuyNowClick);
clearCartButton.addEventListener("click", clearCart);  // Add event listener for the "Clear Cart" button

// Introducing an intentional error:
const missingElement = document.getElementById("non-existent-element");
missingElement.addEventListener("click", function() {
    alert("This will never fire!");
});

//Define Functions

// Function to handle quantity updates
function updateQuantity(inputElement) {
    const productElement = inputElement.parentElement; // Get the parent product element
    const title = productElement.querySelector('.title').innerText;
    const price = parseFloat(productElement.querySelector('.price').innerText.replace('$', ''));
    const quantity = parseInt(inputElement.value);

    const existingItem = cart.find((cartItem) => cartItem.title === title);
    if (existingItem) {
        existingItem.quantity = quantity;
    } else {
        cart.push({ title, price, quantity });
    }

    // Remove item if quantity is 0
    if (quantity === 0) {
        cart = cart.filter((cartItem) => cartItem.title !== title);
    }

    renderCart();
}

// Function to render the cart table
function renderCart() {
    cartTable.innerHTML = "";  // Clear the table
    let total = 0;

    // Loop through the cart items and create rows
    cart.forEach((cartItem) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${cartItem.title}</td>
            <td>${cartItem.quantity}</td>
            <td><button onclick="removeFromCart('${cartItem.title}')">Remove</button></td>
        `;
        cartTable.appendChild(row);
        total += cartItem.quantity * cartItem.price;
    });

    totalPriceElem.textContent = total.toFixed(2);  // Update total price display
}

// Function to remove an item from the cart
function removeFromCart(title) {
    cart = cart.filter((cartItem) => cartItem.title !== title);
    renderCart();
}

// Function to save the cart as a favourite order
function saveToFavourites() {
    localStorage.setItem("favouriteOrder", JSON.stringify(cart));
    alert("Order saved as favourite!");
}

// Function to apply the favourite order from localStorage
function applyFavourites() {
    const favouriteOrder = JSON.parse(localStorage.getItem("favouriteOrder") || "[]");
    cart = favouriteOrder;
    renderCart();
}

// Function to handle the Buy Now button click
function onBuyNowClick() {
    console.log("Cart data being saved to localStorage:", cart);  // Debug log
    localStorage.setItem("orderCart", JSON.stringify(cart));  // Save cart data
    window.location.href = "Payments.html";  // Redirect to Payments page
}

// Function to clear the cart (clear the cart array and re-render the table)
function clearCart() {
    cart = [];  // Empty the cart array
    renderCart();  // Re-render the cart table to reflect the empty cart
}
