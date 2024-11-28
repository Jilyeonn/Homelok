

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
    cartItemsContainer.innerHTML = ''; // Clear previous content

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
                        <p>₱${item.price.toFixed(2)} x <span class="item-quantity">${item.quantity}</span></p>
                        <div class="quantity-controls">
                            <button class="decrement-qty" data-index="${index}">-</button>
                            <button class="increment-qty" data-index="${index}">+</button>
                        </div>
                    </div>
                </div>
                <button class="delete-item" data-index="${index}">✖</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        totalPriceElement.textContent = `₱${totalPrice.toFixed(2)}`;

        // Add the checkout button
        const checkoutButton = document.createElement('button');
        checkoutButton.classList.add('checkout-btn');
        checkoutButton.textContent = 'Proceed to Checkout';
        checkoutButton.addEventListener('click', handleCheckout);
        cartItemsContainer.appendChild(checkoutButton);
    }

    // Update total price
   

    // Attach event listeners for increment/decrement and delete buttons
    attachEventListeners();
}

function attachEventListeners() {
    // Delete buttons
    document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.getAttribute('data-index');
            deleteCartItem(index);
        });
    });

    // Increment buttons
    document.querySelectorAll('.increment-qty').forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.getAttribute('data-index');
            cart[index].quantity++;
            updateCart();
        });
    });

    // Decrement buttons
    document.querySelectorAll('.decrement-qty').forEach(button => {
        button.addEventListener('click', event => {
            const index = event.target.getAttribute('data-index');
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                deleteCartItem(index);
            }
            updateCart();
        });
    });
}

function handleCheckout() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    window.location.href = 'checkout.html'; // Redirect to checkout page
}





openCartButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});


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

