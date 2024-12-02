window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


const cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
    const checkoutCart = document.getElementById('checkout-cart');
    checkoutCart.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <p id="cart-item-title"><strong>${item.name}</strong></p>
                <p>₱${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
        `;
        checkoutCart.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    const totalPriceElement = document.getElementById('checkout-total');
    totalPriceElement.textContent = `Total: ₱${totalPrice.toFixed(2)}`;
}

displayCart();