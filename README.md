# SudsyGlow Website

A beautiful, responsive e-commerce website for Japanese artisan soaps and shampoos.

## 🌸 Project Structure

```
sudsyglow-website/
├── index.html          # Main HTML file (all pages)
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # JavaScript functionality
├── images/             # Product & brand images (add yours)
├── assets/             # Favicon, fonts, etc.
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: VS Code with Live Server (Recommended for Development)

1. **Open in VS Code:**
   ```bash
   cd sudsyglow-website
   code .
   ```

2. **Install Live Server extension** (if not installed):
   - Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac)
   - Search for "Live Server"
   - Install the extension by Ritwick Dey

3. **Run the site:**
   - Right-click `index.html`
   - Select "Open with Live Server"
   - Site opens at `http://127.0.0.1:5500`

### Option 2: Simple HTTP Server (Python)

```bash
cd sudsyglow-website
python -m http.server 8000
# Open http://localhost:8000
```

### Option 3: Node.js HTTP Server

```bash
npx http-server
# Open http://localhost:8080
```

---

## 💳 E-Commerce & Checkout Options

Since you already have sudsyglow.com, here are your options for handling payments:

### Option A: Stripe Payment Links (Easiest - No Code Required)

**Best for:** Getting started quickly, small product catalog

**Setup:**
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Go to Dashboard → Products → Create Product
3. Add each product (name, price, image)
4. Click "Create Payment Link" for each product
5. Replace the "Quick Add" buttons with direct links to Stripe

**Pros:**
- No backend needed
- Hosted checkout (secure, trusted)
- Works immediately
- Mobile-friendly

**Cons:**
- Limited customization
- Customers leave your site to pay

**Cost:** 2.9% + 30¢ per transaction

---

### Option B: Stripe Checkout Sessions (More Control)

**Best for:** Custom checkout experience, dynamic cart

**Setup:**
1. Create Stripe account
2. Set up a simple backend (Node.js, Python, etc.)
3. Create checkout sessions via API
4. Redirect customers to Stripe-hosted checkout

**Example Backend (Node.js):**
```javascript
// server.js
const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_KEY');
const app = express();

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body.items,
    mode: 'payment',
    success_url: 'https://sudsyglow.com/success',
    cancel_url: 'https://sudsyglow.com/cart',
  });
  res.json({ url: session.url });
});

app.listen(3000);
```

**Cost:** 2.9% + 30¢ per transaction

---

### Option C: Shopify (Full E-Commerce Platform)

**Best for:** Serious e-commerce, inventory management, shipping

**Setup:**
1. Sign up at [shopify.com](https://shopify.com)
2. Connect your domain (sudsyglow.com)
3. Import your design or use Shopify themes
4. Add products, set up shipping, taxes

**Pros:**
- Complete e-commerce solution
- Inventory management
- Shipping integrations
- Built-in analytics
- Mobile app for management

**Cons:**
- Monthly fee ($29-$299/month)
- Less design freedom (unless custom theme)

---

### Option D: WooCommerce (WordPress)

**Best for:** Full control, self-hosted

**Setup:**
1. Set up WordPress hosting
2. Install WooCommerce plugin
3. Convert your design to WordPress theme
4. Connect Stripe/PayPal

**Pros:**
- Full control
- Lots of plugins
- One-time cost (hosting only)

**Cons:**
- Requires maintenance
- Need to handle security
- More technical setup

---

## 🎯 My Recommendation

**For Starting Out:** Go with **Stripe Payment Links** (Option A)
- Takes 30 minutes to set up
- No code changes needed
- Start selling today

**When Ready to Scale:** Move to **Shopify** (Option C) or **Stripe Checkout** (Option B)
- Better inventory management
- More professional checkout
- Analytics and reporting

---

## 🌐 Hosting Options

Since this is a static site (no backend), you can host for free:

### GitHub Pages (Free)
```bash
# Create repo called "sudsyglow-website"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Atravos/sudsyglow-website.git
git push -u origin main

# Enable GitHub Pages in repo settings
# Connect custom domain: sudsyglow.com
```

### Netlify (Free)
1. Connect your GitHub repo
2. Auto-deploys on every push
3. Add custom domain in settings

### Vercel (Free)
1. Import from GitHub
2. Automatic deployments
3. Custom domain support

---

## 📝 Next Steps

1. [ ] Add product images to `/images/`
2. [ ] Set up Stripe account
3. [ ] Create Payment Links for each product
4. [ ] Update checkout button to redirect to Stripe
5. [ ] Deploy to GitHub Pages/Netlify
6. [ ] Connect sudsyglow.com domain
7. [ ] Set up Google Analytics
8. [ ] Add real testimonials
9. [ ] Create social media accounts

---

## 🔧 Customization

### Adding Product Images
Replace the CSS-only bottle graphics with real images:

```html
<!-- In product-card -->
<div class="product-image">
    <img src="images/sakura-shampoo.jpg" alt="Sakura Blossom Shampoo">
</div>
```

### Updating Products
Edit the product cards in `index.html` with your actual products, prices, and descriptions.

### Changing Colors
Edit the CSS variables in `css/styles.css`:

```css
:root {
    --sage: #8B9B7E;        /* Primary accent */
    --cream: #FDFBF7;       /* Background */
    --charcoal: #2C2C2C;    /* Text */
    /* ... */
}
```

---

## 📞 Support

Need help? Feel free to reach out!

---

*Handcrafted with 💚 for SudsyGlow*
