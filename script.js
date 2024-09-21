// Shopping cart functionality
let cart = [];
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.getElementsByClassName('close')[0];
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartCount = document.getElementById('cart-count');

function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    updateCartCount();
    updateCartModal();
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartModal() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItems.innerHTML += `
            <div>
                <span>${item.name} x ${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(productName) {
    const index = cart.findIndex(item => item.name === productName);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartCount();
        updateCartModal();
    }
}

cartIcon.onclick = function() {
    cartModal.style.display = 'block';
    updateCartModal();
}

closeBtn.onclick = function() {
    cartModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = 'none';
    }
}

checkoutBtn.onclick = function() {
    alert('Thank you for your purchase!');
    cart = [];
    updateCartCount();
    updateCartModal();
    cartModal.style.display = 'none';
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.product-card').forEach((card) => {
    observer.observe(card);
});