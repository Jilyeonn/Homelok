//Snake Game

    const modal1 = document.getElementById('gameModal');
  const btn = document.getElementById('openModal');
  const scoreElement = document.getElementById("score");
  const span = document.querySelector('.close1');
  
  btn.onclick = () => {
    modal1.style.display = 'block';
    resetGame();
    gameLoop();
  };
  span.onclick = () => modal1.style.display = 'none';
  window.onclick = event => { if (event.target == modal1) modal1.style.display = 'none'; };
  
  
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  let snake = [{ x: 200, y: 200 }];
  let direction = "RIGHT";
  let dx = 10, dy = 0;
  let food = { x: Math.floor(Math.random() * 40) * 10, y: Math.floor(Math.random() * 40) * 10 };

  const tileSize = 10; 
  function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
      ctx.fillRect(segment.x, segment.y, 10, 10);
    });
  }
  
  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
      food = getRandomFoodPosition();
    } else {
      snake.pop();
    }
  }

  function resetGame() {
    snake = [{ x: 200, y: 200 }];
    dx = 10;
    dy = 0;
    food = getRandomFoodPosition();
    gameRunning = true;
  }

  function getRandomFoodPosition() {
    return {
      x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
      y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
    };
  }
  function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
  }
  
  function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT_KEY = 37, RIGHT_KEY = 39, UP_KEY = 38, DOWN_KEY = 40;
    if (keyPressed === LEFT_KEY && dx === 0) { dx = -10; dy = 0; }
    if (keyPressed === RIGHT_KEY && dx === 0) { dx = 10; dy = 0; }
    if (keyPressed === UP_KEY && dy === 0) { dx = 0; dy = -10; }
    if (keyPressed === DOWN_KEY && dy === 0) { dx = 0; dy = 10; }
  }
  
  document.addEventListener('keydown', changeDirection);
  
  function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
   function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
      return true;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  }

  function gameLoop() {
    if (modal1.style.display === 'none') return;

    setTimeout(() => {
      clearCanvas();
      drawFood();
      moveSnake();
      drawSnake();

      if (checkCollision()) {
        alert('Game Over. Exit to play again');
        resetGame();
      } else {
        gameLoop();
      }
    }, 200);
  }
  
  btn.addEventListener('click', gameLoop);

  //SNAKE GAME END

  

//ADD TO CART POP UP

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const openCartButton = document.getElementById('open-cart');
const modal = document.getElementById('cart-modal');
const closeButton = document.querySelector('.close');
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.getElementById('total-price');

// Cart state
let cart = [];

// Add to cart functionality
function attachAddToCartListeners() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          const name = button.getAttribute('data-name');
          const price = parseFloat(button.getAttribute('data-price'));
          const image = button.getAttribute('data-image');

          const existingItem = cart.find(item => item.id === id);
          if (existingItem) {
              existingItem.quantity += 1;
          } else {
              cart.push({ id, name, price, image, quantity: 1 });
          }

          updateCart();  // Update the cart modal content
      });
  });
}

// Update cart display
function updateCart() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalPriceElement = document.getElementById('total-price');

  cartItemsContainer.innerHTML = ''; // Clear previous content

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    totalPriceElement.textContent = '₱0.00'; // Reset total price to zero
} else {
    cart.forEach((item, index) => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
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
            </div>
        `;
    });


      const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPriceElement.textContent = `₱${totalPrice.toFixed(2)}`;
  }

      // Add the checkout button
      const checkoutButton = document.createElement('button');
      checkoutButton.classList.add('checkout-btn');
      checkoutButton.textContent = 'Proceed to Checkout';
      checkoutButton.addEventListener('click', handleCheckout);
      cartItemsContainer.appendChild(checkoutButton);

  attachCartEventListeners(); // Reattach listeners
}

function attachCartEventListeners() {
  // Delete item event
  const deleteButtons = document.querySelectorAll('.delete-item');
  deleteButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          cart.splice(index, 1); // Remove item from cart
          updateCart();
      });
  });

  // Increment quantity event
  const incrementButtons = document.querySelectorAll('.increment-qty');
  incrementButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          cart[index].quantity += 1;
          updateCart();
      });
  });

  // Decrement quantity event
  const decrementButtons = document.querySelectorAll('.decrement-qty');
  decrementButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          if (cart[index].quantity > 1) {
              cart[index].quantity -= 1;
          } else {
              cart.splice(index, 1); // Remove item if quantity is 1
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

