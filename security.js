// script.js

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const openCartButton = document.getElementById('open-cart');
const modal = document.getElementById('cart-modal');
const closeButton = document.querySelector('.close');
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.getElementById('total-price');

// Cart state
let cart = [];

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const id = productElement.getAttribute('data-id');
        const name = productElement.getAttribute('data-name');
        const price = parseFloat(productElement.getAttribute('data-price'));
        const image = productElement.getAttribute('data-image');

        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, image, quantity: 1 });
        }

        updateCart();
    });
});

// Update cart display
function updateCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
                    <div class="cart-item-text">
                        <p><strong>${item.name}</strong></p>
                        <p>₱${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                </div>
                <button class="delete-item" data-index="${index}">✖</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-item');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            deleteCartItem(index);
        });
    });

    // Update total price with ₱ symbol
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPriceElement.textContent = `₱${totalPrice.toFixed(2)}`;
}

// Delete cart item
function deleteCartItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Show modal when "View Cart" button is clicked
openCartButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Close modal
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

