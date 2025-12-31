/**
 * SudsyGlow - Japanese Artisan Soaps & Shampoos
 * Main JavaScript
 */

// ==========================================
// Cart State & Management
// ==========================================
let cart = [];

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cartCount').textContent = count;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <p>Your cart is empty</p>
                <button class="btn btn-secondary" onclick="toggleCart(); showPage('shop');">Browse Products</button>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        let html = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price * item.qty;
            html += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <div class="cart-item-bottle"></div>
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-variant">250ml</p>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="updateCartItem(${index}, -1)">−</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateCartItem(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div class="cart-item-price">
                        <p class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</p>
                        <button class="cart-item-remove" onclick="removeCartItem(${index})">Remove</button>
                    </div>
                </div>
            `;
        });
        cartItems.innerHTML = html;
        document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
        cartFooter.style.display = 'block';
    }
    updateCartCount();
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCartDisplay();
    toggleCart(true);
}

function updateCartItem(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCartDisplay();
}

function removeCartItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function toggleCart(forceOpen = false) {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    if (forceOpen || !sidebar.classList.contains('open')) {
        overlay.classList.add('open');
        sidebar.classList.add('open');
    } else {
        overlay.classList.remove('open');
        sidebar.classList.remove('open');
    }
}

// ==========================================
// Page Navigation
// ==========================================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// ==========================================
// Product Interactions
// ==========================================
function updateQty(change) {
    const input = document.getElementById('productQty');
    let value = parseInt(input.value) + change;
    if (value < 1) value = 1;
    input.value = value;
}

// ==========================================
// FAQ & Accordion
// ==========================================
function toggleFaq(element) {
    element.parentElement.classList.toggle('open');
}

function toggleAccordion(element) {
    element.parentElement.classList.toggle('open');
}

// ==========================================
// Event Listeners
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Option values
    document.querySelectorAll('.option-value').forEach(opt => {
        opt.addEventListener('click', () => {
            opt.parentElement.querySelectorAll('.option-value').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });

    // Product thumbs
    document.querySelectorAll('.product-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            document.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing!');
            this.reset();
        });
    }

    // Contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

// ==========================================
// Stripe Checkout Integration (Ready for implementation)
// ==========================================

/**
 * STRIPE CHECKOUT INTEGRATION
 * 
 * Option 1: Stripe Payment Links (Simplest - No backend needed)
 * - Create products in Stripe Dashboard
 * - Generate Payment Links for each product
 * - Replace checkout button with direct links
 * 
 * Option 2: Stripe Checkout Sessions (Requires backend)
 * - More customizable
 * - Better for dynamic pricing/products
 * - Requires a server (Node.js, etc.)
 * 
 * Example implementation for Option 2:
 */

async function proceedToCheckout() {
    // If using Stripe Payment Links (Option 1):
    // window.location.href = 'YOUR_STRIPE_PAYMENT_LINK';
    
    // If using Stripe Checkout Sessions (Option 2):
    // This requires a backend endpoint
    /*
    try {
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: cart.map(item => ({
                    name: item.name,
                    price: item.price * 100, // Stripe uses cents
                    quantity: item.qty
                }))
            })
        });
        
        const { url } = await response.json();
        window.location.href = url;
    } catch (error) {
        console.error('Checkout error:', error);
        alert('Unable to process checkout. Please try again.');
    }
    */
    
    // Placeholder for now
    alert('Checkout functionality will be connected to Stripe. Cart total: ' + document.getElementById('cartTotal').textContent);
}

// Update checkout button to use this function
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.cart-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
});
