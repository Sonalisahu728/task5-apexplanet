const products = [
    {
        id: 1,
        name: "Matte Lipstick - Ruby Red",
        price: 499,
        originalPrice: 699,
        image: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:494/1134271/w3WElewaSN-1134271_1.jpg",
        rating: 4.5,
        category: "lipstick"
    },
    {
        id: 2,
        name: "Hydrating Face Moisturizer",
        price: 649,
        originalPrice: 899,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.2,
        category: "skincare"
    },
    {
        id: 3,
        name: "12 Color Eyeshadow Palette",
        price: 799,
        originalPrice: 999,
        image: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1130440/-pSzs6pc2-1130440-1.jpg",
        rating: 4.7,
        category: "eyeshadow"
    },
    {
        id: 4,
        name: "Nail Polish Set - Summer Colors",
        price: 349,
        originalPrice: 499,
        image: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/resize-w:1080/Tira_Combos/Insight_Cosmetics/TIRA002808/Insight_Cosmetics_Purely_Pastel_Set/974148_Combo_11-1.jpg",
        rating: 4.3,
        category: "nails"
    },
    {
        id: 5,
        name: "Professional Makeup Brushes",
        price: 1299,
        originalPrice: 1599,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        category: "brushes"
    },
    {
        id: 6,
        name: "BB Cream with SPF 30",
        price: 599,
        originalPrice: 799,
        image: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/1111567/abeDAs6lXq-8901030807343_1.jpg",
        rating: 4.4,
        category: "foundation"
    },
    {
        id: 7,
        name: "Vitamin C Serum",
        price: 899,
        originalPrice: 1199,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        category: "skincare"
    },
    {
        id: 8,
        name: "Matte Liquid Lipstick - Nude",
        price: 449,
        originalPrice: 649,
        image: "https://mrucha.com/cdn/shop/files/Artboard1.jpg?v=1750497984&width=450",
        rating: 4.5,
        category: "lipstick"
    }
];

let cart = [];
let cartCount = 0;

document.addEventListener('DOMContentLoaded', function () {
    renderProducts();
    setupEventListeners();
    initializeLazyLoading();
});

function renderProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    const container1 = document.getElementById('container1');
    const specialOffersContainer = document.getElementById('special-offers');

    featuredProductsContainer.innerHTML = '';
    container1.innerHTML = '';
    specialOffersContainer.innerHTML = '';


    products.slice(0, 4).forEach(product => {
        featuredProductsContainer.appendChild(createProductCard(product));
    });


    products.slice(0, 4).forEach(product => {
        container1.appendChild(createProductCard(product));
    });


    products.filter(product => {
        const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
        return discount > 25;
    }).slice(0, 4).forEach(product => {
        specialOffersContainer.appendChild(createProductCard(product));
    });
}

function createProductCard(product) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    card.innerHTML = `
        <img data-src="${product.image}" alt="${product.name}" class="product-image lazy-load">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                ${generateStarRating(product.rating)}
                <span>(${product.rating})</span>
            </div>
            <div class="product-price">
                ₹${product.price}
                <span class="original-price">₹${product.originalPrice}</span>
                <span class="discount">${discount}% off</span>
            </div>
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                <button class="wishlist"><i class="bi bi-heart"></i></button>
            </div>
        </div>
    `;
    return card;
}

function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="bi bi-star-fill"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="bi bi-star-half"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="bi bi-star"></i>';
    }
    return stars;
}

function setupEventListeners() {
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }

        if (e.target.classList.contains('wishlist') || e.target.closest('.wishlist')) {
            toggleWishlist(e);
        }
    });

    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeNewsletter(email);
        });
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        cartCount++;
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function toggleWishlist(event) {
    const wishlistButton = event.target.classList.contains('wishlist') ?
        event.target : event.target.closest('.wishlist');

    if (wishlistButton) {
        wishlistButton.classList.toggle('active');
        if (wishlistButton.classList.contains('active')) {
            wishlistButton.innerHTML = '<i class="bi bi-heart-fill" style="color: #e83e8c;"></i>';
            showNotification('Added to wishlist!');
        } else {
            wishlistButton.innerHTML = '<i class="bi bi-heart"></i>';
        }
    }
}


function performSearch(query) {
    const featuredProductsContainer = document.getElementById('featured-products');
    featuredProductsContainer.innerHTML = '';

    if (query.trim() === '') {
        renderProducts();
        return;
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            featuredProductsContainer.appendChild(createProductCard(product));
        });
        initializeLazyLoading();
        showNotification(`Found ${filteredProducts.length} product(s) for "${query}"`);
    } else {
        featuredProductsContainer.innerHTML = `<p style="padding:10px;">No products found for "${query}"</p>`;
        showNotification(`No products found for "${query}"`);
    }
}

function subscribeNewsletter(email) {
    console.log('Subscribed email:', email);
    showNotification('Thank you for subscribing to our newsletter!');
    document.querySelector('.newsletter-form input').value = '';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color, #007bff);
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: fadeIn 0.3s ease-in;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.classList.add('loaded');
        });
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
