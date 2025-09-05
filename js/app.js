// Global variables
let cart = JSON.parse(localStorage.getItem("techHubCart")) || [];
let currentSlide = 0;
let filteredProducts = [];
let currentGalleryIndex = 0;
let currentProduct = null;

// 🖼️ REAL IMAGE SYSTEM - Easy Image Management
// Simply replace the URLs below with your actual product images
// For best results, use high-quality images (at least 400x400px)

// 📝 BLOG IMAGES - Replace with your actual blog images
const blogImages = {
  smartphones2024:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&crop=center",
  gamingLaptop:
    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=400&fit=crop&crop=center",
  techAccessories:
    "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop&crop=center",
};

const productImages = {
  // 📱 SMARTPHONES - Replace with real phone images
  iphone15: [
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&crop=entropy",
  ],
  galaxyS24: [
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop&crop=entropy",
  ],

  // 💻 LAPTOPS - Replace with real laptop images
  macbookPro: [
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=entropy",
  ],
  dellXPS: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=entropy",
  ],

  // 🎧 ACCESSORIES - Replace with real accessory images
  airpods: [
    "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop&crop=entropy",
  ],
  sonyHeadphones: [
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=entropy",
  ],

  // 🎮 GAMING - Replace with real gaming console images
  ps5: [
    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop&crop=entropy",
  ],
  xboxSeriesX: [
    "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&h=600&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&h=600&fit=crop&crop=entropy",
  ],
};

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Top 10 Smartphones of 2024",
    excerpt:
      "Discover the best smartphones that are revolutionizing the mobile industry this year with cutting-edge technology and innovative features.",
    author: "Tech Team",
    date: "Jan 15, 2024",
    image: blogImages.smartphones2024,
    content: `
                    <div class="prose max-w-none">
                        <img src="${blogImages.smartphones2024}" alt="Top Smartphones 2024" class="w-full h-64 object-cover rounded-lg mb-6">
                        
                        <p class="text-lg text-gray-600 mb-6">The smartphone industry continues to evolve at breakneck speed, with 2024 bringing us some of the most impressive devices we've ever seen. From revolutionary camera systems to groundbreaking processors, this year's flagship phones are pushing the boundaries of what's possible in mobile technology.</p>
                        
                        <h3 class="text-2xl font-bold mb-4">1. iPhone 15 Pro Max</h3>
                        <p class="mb-4">Apple's latest flagship continues to set the standard with its A17 Pro chip and titanium design. The new Action Button and USB-C port make this the most versatile iPhone yet.</p>
                        
                        <h3 class="text-2xl font-bold mb-4">2. Samsung Galaxy S24 Ultra</h3>
                        <p class="mb-4">Samsung's powerhouse combines the best of Android with S Pen functionality and an incredible 200MP camera system that captures stunning photos in any lighting condition.</p>
                        
                        <h3 class="text-2xl font-bold mb-4">3. Google Pixel 8 Pro</h3>
                        <p class="mb-4">Google's computational photography continues to impress, while the new Tensor G3 chip brings enhanced AI capabilities and improved battery life.</p>
                        
                        <h3 class="text-2xl font-bold mb-4">Key Features to Look For</h3>
                        <ul class="list-disc pl-6 mb-6">
                            <li>Advanced camera systems with AI enhancement</li>
                            <li>5G connectivity and Wi-Fi 6E support</li>
                            <li>Fast charging and wireless charging capabilities</li>
                            <li>High refresh rate displays (120Hz or higher)</li>
                            <li>Water and dust resistance (IP68 rating)</li>
                        </ul>
                        
                        <p class="text-lg">Whether you're a photography enthusiast, a mobile gamer, or a productivity-focused professional, 2024's smartphone lineup has something exceptional to offer. The competition between manufacturers has never been fiercer, which ultimately benefits consumers with better features and more competitive pricing.</p>
                    </div>
                `,
  },
  {
    id: 2,
    title: "Gaming Laptop Buying Guide",
    excerpt:
      "Everything you need to know before purchasing your next gaming laptop, from GPU selection to cooling systems.",
    author: "Gaming Expert",
    date: "Jan 12, 2024",
    image: blogImages.gamingLaptop,
    content: `
                    <div class="prose max-w-none">
                        <img src="${blogImages.gamingLaptop}" alt="Gaming Laptop Guide" class="w-full h-64 object-cover rounded-lg mb-6">
                        
                        <p class="text-lg text-gray-600 mb-6">Choosing the right gaming laptop can be overwhelming with so many options available. This comprehensive guide will help you make an informed decision based on your gaming needs, budget, and performance requirements.</p>
                        
                        <h3 class="text-2xl font-bold mb-4">Graphics Card (GPU) - The Heart of Gaming</h3>
                        <p class="mb-4">The GPU is the most critical component for gaming performance. Here's what to consider:</p>
                        <ul class="list-disc pl-6 mb-6">
                            <li><strong>RTX 4080/4090:</strong> Best for 4K gaming and ray tracing</li>
                            <li><strong>RTX 4070:</strong> Excellent for 1440p gaming</li>
                            <li><strong>RTX 4060:</strong> Great for 1080p gaming at high settings</li>
                        </ul>
                        
                        <h3 class="text-2xl font-bold mb-4">Processor (CPU) Considerations</h3>
                        <p class="mb-4">Modern games benefit from powerful CPUs, especially for streaming and multitasking:</p>
                        <ul class="list-disc pl-6 mb-6">
                            <li>Intel Core i7/i9 13th gen or AMD Ryzen 7/9 7000 series</li>
                            <li>Minimum 8 cores for future-proofing</li>
                            <li>High boost clocks for single-threaded performance</li>
                        </ul>
                        
                        <h3 class="text-2xl font-bold mb-4">Display Technology</h3>
                        <p class="mb-4">Your display directly impacts your gaming experience:</p>
                        <ul class="list-disc pl-6 mb-6">
                            <li><strong>Refresh Rate:</strong> 144Hz minimum, 240Hz+ for competitive gaming</li>
                            <li><strong>Response Time:</strong> 3ms or lower for smooth gameplay</li>
                            <li><strong>Panel Type:</strong> IPS for color accuracy, TN for speed</li>
                        </ul>
                        
                        <h3 class="text-2xl font-bold mb-4">Cooling and Thermal Management</h3>
                        <p class="mb-4">Proper cooling is essential for sustained performance and longevity. Look for laptops with robust cooling solutions and multiple heat pipes.</p>
                        
                        <p class="text-lg">Remember, the best gaming laptop is one that fits your specific needs and budget. Consider what games you play, where you'll use it, and how long you want it to remain relevant.</p>
                    </div>
                `,
  },
  {
    id: 3,
    title: "Best Tech Accessories 2024",
    excerpt:
      "Must-have accessories to enhance your tech experience and boost productivity in the modern digital workspace.",
    author: "Accessory Pro",
    date: "Jan 10, 2024",
    image: blogImages.techAccessories,
    content: `
                    <div class="prose max-w-none">
                        <img src="${blogImages.techAccessories}" alt="Tech Accessories 2024" class="w-full h-64 object-cover rounded-lg mb-6">
                        
                        <p class="text-lg text-gray-600 mb-6">The right accessories can transform your tech setup from good to exceptional. Whether you're working from home, gaming, or creating content, these carefully selected accessories will enhance your productivity and enjoyment.</p>
                        
                        <h3 class="text-2xl font-bold mb-4">Audio Excellence</h3>
                        <p class="mb-4">Quality audio equipment is essential for both work and entertainment:</p>
                        <ul class="list-disc pl-6 mb-6">
                            <li><strong>Sony WH-1000XM5:</strong> Industry-leading noise cancellation</li>
                            <li><strong>AirPods Pro 2:</strong> Seamless Apple ecosystem integration</li>
                            <li><strong>SteelSeries Arctis 7P:</strong> Premium gaming headset</li>
                        </ul>
                        
                        <h3 class="text-2xl font-bold mb-4">Productivity Boosters</h3>
                        <p class="mb-4">These accessories will supercharge your workflow:</p>
                        <ul class="list-disc pl-6 mb-6">
                            <li><strong>Mechanical Keyboards:</strong> Tactile feedback for faster typing</li>
                            <li><strong>Ergonomic Mouse:</strong> Reduce strain during long work sessions</li>
                            <li><strong>Monitor Arms:</strong> Perfect positioning for better posture</li>
                            <li><strong>USB-C Hubs:</strong> Expand connectivity for modern laptops</li>
                        </ul>
                        
                        <h3 class="text-2xl font-bold mb-4">Power and Charging Solutions</h3>
                        <p class="mb-4">Keep your devices powered throughout the day:</p>
                        <ul class="list-disc pl-6 mb-6">
                            <li>High-capacity power banks (20,000mAh+)</li>
                            <li>Fast wireless charging pads</li>
                            <li>Multi-port USB-C chargers</li>
                            <li>Cable management solutions</li>
                        </ul>
                        
                        <h3 class="text-2xl font-bold mb-4">Storage and Organization</h3>
                        <p class="mb-4">Keep your digital life organized and accessible:</p>
                        <ul class="list-disc pl-6 mb-6">
                            <li>External SSDs for fast file transfers</li>
                            <li>Cloud storage subscriptions</li>
                            <li>Cable organizers and desk accessories</li>
                        </ul>
                        
                        <p class="text-lg">Investing in quality accessories is investing in your daily experience with technology. Choose items that align with your workflow and lifestyle for the best results.</p>
                    </div>
                `,
  },
];

// Product data with real images
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 150000,
    image: productImages.iphone15[0],
    images: productImages.iphone15,
    category: "smartphones",
    description: "Latest iPhone with A17 Pro chip and titanium design",
    fullDescription:
      "The iPhone 15 Pro Max features the revolutionary A17 Pro chip, built on a 3-nanometer process for incredible performance and efficiency. With a stunning titanium design, advanced camera system, and all-day battery life, it's the ultimate iPhone experience.",
    specifications: [
      "A17 Pro chip with 6-core CPU",
      "6.7-inch Super Retina XDR display",
      "Pro camera system with 48MP main",
      "Up to 1TB storage",
      "5G connectivity",
    ],
    rating: 5,
    stock: "In Stock",
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    price: 180000,
    image: productImages.macbookPro[0],
    images: productImages.macbookPro,
    category: "laptops",
    description: "Powerful laptop with M3 chip for professionals",
    fullDescription:
      "The MacBook Pro with M3 chip delivers exceptional performance for demanding workflows. With its brilliant Liquid Retina XDR display, advanced thermal design, and all-day battery life, it's perfect for creative professionals.",
    specifications: [
      "Apple M3 chip with 8-core CPU",
      "14-inch Liquid Retina XDR display",
      "Up to 22 hours battery life",
      "16GB unified memory",
      "Three Thunderbolt 4 ports",
    ],
    rating: 5,
    stock: "In Stock",
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    price: 25000,
    image: productImages.airpods[0],
    images: productImages.airpods,
    category: "accessories",
    description: "Premium wireless earbuds with noise cancellation",
    fullDescription:
      "AirPods Pro 2nd generation feature the H2 chip for advanced audio performance, Adaptive Transparency, and personalized Spatial Audio. With up to 2x more Active Noise Cancellation, they deliver an unparalleled listening experience.",
    specifications: [
      "H2 chip for advanced audio",
      "Active Noise Cancellation",
      "Adaptive Transparency",
      "Up to 6 hours listening time",
      "MagSafe charging case",
    ],
    rating: 5,
    stock: "In Stock",
  },
  {
    id: 4,
    name: "PlayStation 5",
    price: 65000,
    image: productImages.ps5[0],
    images: productImages.ps5,
    category: "gaming",
    description: "Next-gen gaming console with 4K gaming",
    fullDescription:
      "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
    specifications: [
      "Custom AMD Zen 2 CPU",
      "Custom AMD RDNA 2 GPU",
      "16GB GDDR6 RAM",
      "825GB SSD storage",
      "4K gaming support",
    ],
    rating: 5,
    stock: "In Stock",
  },
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra",
    price: 140000,
    image: productImages.galaxyS24[0],
    images: productImages.galaxyS24,
    category: "smartphones",
    description: "Premium Android phone with S Pen",
    fullDescription:
      "The Galaxy S24 Ultra combines the power of Galaxy AI with the precision of the built-in S Pen. Featuring a 200MP camera, titanium build, and the most advanced Galaxy experience yet.",
    specifications: [
      "Snapdragon 8 Gen 3 processor",
      "6.8-inch Dynamic AMOLED 2X",
      "200MP main camera",
      "Built-in S Pen",
      "5000mAh battery",
    ],
    rating: 5,
    stock: "In Stock",
  },
  {
    id: 6,
    name: "Dell XPS 13",
    price: 120000,
    image: productImages.dellXPS[0],
    images: productImages.dellXPS,
    category: "laptops",
    description: "Ultra-portable laptop for productivity",
    fullDescription:
      "The Dell XPS 13 combines premium materials, exceptional build quality, and powerful performance in an ultra-portable design. Perfect for professionals who need performance on the go.",
    specifications: [
      "Intel Core i7 processor",
      "13.4-inch InfinityEdge display",
      "16GB LPDDR5 RAM",
      "512GB SSD storage",
      "Up to 12 hours battery",
    ],
    rating: 4,
    stock: "In Stock",
  },
  {
    id: 7,
    name: "Sony WH-1000XM5",
    price: 35000,
    image: productImages.sonyHeadphones[0],
    images: productImages.sonyHeadphones,
    category: "accessories",
    description: "Premium noise-canceling headphones",
    fullDescription:
      "Industry-leading noise cancellation with the new Integrated Processor V1 and dual noise sensor technology. Enjoy exceptional sound quality with 30-hour battery life and quick charge.",
    specifications: [
      "Industry-leading noise cancellation",
      "30-hour battery life",
      "Multipoint connection",
      "Speak-to-chat technology",
      "Premium comfort design",
    ],
    rating: 5,
    stock: "In Stock",
  },
  {
    id: 8,
    name: "Xbox Series X",
    price: 60000,
    image: productImages.xboxSeriesX[0],
    images: productImages.xboxSeriesX,
    category: "gaming",
    description: "Powerful gaming console with Game Pass",
    fullDescription:
      "The fastest, most powerful Xbox ever. Experience 4K gaming at up to 120 frames per second, advanced 3D spatial audio, and faster loading times. Includes Xbox Game Pass Ultimate.",
    specifications: [
      "Custom AMD Zen 2 CPU",
      "Custom AMD RDNA 2 GPU",
      "16GB GDDR6 RAM",
      "1TB NVMe SSD",
      "4K gaming at 120fps",
    ],
    rating: 5,
    stock: "In Stock",
  },
];

// Initialize the website
function init() {
  try {
    filteredProducts = [...products];
    renderProducts();
    renderCarousel();
    renderBlogPosts();
    updateCartUI();
    setupEventListeners();
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

// Setup event listeners
function setupEventListeners() {
  try {
    // Search functionality
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", searchProducts);
    }

    // Close modals when clicking outside
    document.addEventListener("click", function (event) {
      const cartModal = document.getElementById("cartModal");
      const mobileMenu = document.getElementById("mobileMenu");
      const productModal = document.getElementById("productModal");
      const blogModal = document.getElementById("blogModal");

      // Only close cart if clicking outside AND not on cart control buttons
      if (
        !event.target.closest("#cartModal") &&
        !event.target.closest('[onclick*="toggleCart"]') &&
        !event.target.closest('[onclick*="updateCartQuantity"]') &&
        !event.target.closest('[onclick*="removeFromCart"]') &&
        !event.target.closest('[onclick*="addToCart"]')
      ) {
        cartModal.classList.remove("active");
      }

      if (
        !event.target.closest("#mobileMenu") &&
        !event.target.closest('[onclick*="toggleMobileMenu"]')
      ) {
        mobileMenu.classList.remove("active");
      }

      if (event.target === productModal) {
        closeProductModal();
      }

      if (event.target === blogModal) {
        closeBlogModal();
      }
    });
  } catch (error) {
    console.error("Event listener setup error:", error);
  }
}

// Cart functions
window.addToCart = function (productId) {
  try {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("techHubCart", JSON.stringify(cart));
    updateCartUI();
    showAddedFeedback(productId);
  } catch (error) {
    console.error("Add to cart error:", error);
  }
};

function showAddedFeedback(productId) {
  try {
    const product = products.find((p) => p.id === productId);
    if (product) {
      showToast(
        "Added to Cart!",
        `${product.name} has been added to your cart`,
        "success"
      );
    }

    // Find all buttons for this product
    const buttons = document.querySelectorAll(
      `[onclick="addToCart(${productId})"]`
    );
    buttons.forEach((button) => {
      const originalText = button.textContent;
      const originalHTML = button.innerHTML;
      const originalClasses = button.className;

      // Show simple "Added!" text with green background
      button.innerHTML = "Added!";
      button.className = originalClasses.replace("gradient-bg", "bg-green-500");
      button.style.transform = "scale(1.05)";

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.className = originalClasses;
        button.style.transform = "scale(1)";
      }, 2000);
    });
  } catch (error) {
    console.error("Feedback animation error:", error);
  }
}

function showToast(title, message, type = "success") {
  try {
    const toastContainer = document.getElementById("toastContainer");
    if (!toastContainer) return;

    const toastId = "toast-" + Date.now();
    const toast = document.createElement("div");
    toast.id = toastId;
    toast.className = "toast";

    const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";

    toast.innerHTML = `
                    <div class="toast-content">
                        <div class="toast-icon">${icon}</div>
                        <div class="toast-text">
                            <div class="toast-title">${title}</div>
                            <div class="toast-message">${message}</div>
                        </div>
                        <button class="toast-close" onclick="hideToast('${toastId}')">✕</button>
                    </div>
                `;

    toastContainer.appendChild(toast);

    // Show toast with animation
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    // Auto hide after 2 seconds
    setTimeout(() => {
      hideToast(toastId);
    }, 2000);
  } catch (error) {
    console.error("Show toast error:", error);
  }
}

function hideToast(toastId) {
  try {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.classList.remove("show");
      toast.classList.add("hide");

      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    }
  } catch (error) {
    console.error("Hide toast error:", error);
  }
}

function updateCartQuantity(productId, change) {
  try {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        localStorage.setItem("techHubCart", JSON.stringify(cart));
        updateCartUI();
      }
    }
  } catch (error) {
    console.error("Update quantity error:", error);
  }
}

function removeFromCart(productId) {
  try {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("techHubCart", JSON.stringify(cart));
    updateCartUI();
  } catch (error) {
    console.error("Remove from cart error:", error);
  }
}

function updateCartUI() {
  try {
    const cartBadge = document.getElementById("cartBadge");
    const mobileCartCount = document.getElementById("mobileCartCount");
    const cartItems = document.getElementById("cartItems");
    const cartSummary = document.getElementById("cartSummary");

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update badges
    if (totalItems > 0) {
      cartBadge.textContent = totalItems;
      cartBadge.classList.remove("hidden");
      cartBadge.classList.add("cart-badge");
    } else {
      cartBadge.classList.add("hidden");
    }

    mobileCartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
      cartItems.innerHTML = `
                        <div class="text-center py-8">
                            <div class="text-6xl mb-4">🛒</div>
                            <h3 class="text-xl font-semibold mb-2">Your cart is empty</h3>
                            <p class="text-gray-600 mb-4">Add some products to get started!</p>
                            <button onclick="toggleCart(); document.getElementById('products').scrollIntoView({behavior: 'smooth'})" 
                                    class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                                Shop Now
                            </button>
                        </div>
                    `;
      cartSummary.innerHTML = "";
    } else {
      cartItems.innerHTML = cart
        .map(
          (item) => `
                        <div class="flex items-center space-x-3 p-4 border-b border-gray-200">
                            <img src="${item.image}" alt="${
            item.name
          }" class="cart-item-image rounded-lg flex-shrink-0"
                                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'56\\' height=\\'56\\' viewBox=\\'0 0 56 56\\'%3E%3Crect width=\\'56\\' height=\\'56\\' fill=\\'%23f3f4f6\\'/%3E%3Ctext x=\\'28\\' y=\\'32\\' text-anchor=\\'middle\\' fill=\\'%23666\\' font-size=\\'8\\'%3E📦%3C/text%3E%3C/svg%3E'">
                            <div class="flex-1 min-w-0">
                                <h4 class="font-semibold text-sm truncate">${
                                  item.name
                                }</h4>
                                <p class="text-purple-600 font-bold text-sm">৳${item.price.toLocaleString()}</p>
                            </div>
                            <div class="flex items-center space-x-2 flex-shrink-0">
                                <button onclick="updateCartQuantity(${
                                  item.id
                                }, -1)" 
                                        class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 text-sm font-semibold transition-colors">
                                    −
                                </button>
                                <span class="w-10 text-center text-sm font-semibold bg-gray-50 py-1 px-2 rounded-lg">${
                                  item.quantity
                                }</span>
                                <button onclick="updateCartQuantity(${
                                  item.id
                                }, 1)" 
                                        class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 text-sm font-semibold transition-colors">
                                    +
                                </button>
                                <button onclick="removeFromCart(${item.id})" 
                                        class="w-8 h-8 text-red-500 hover:text-red-700 rounded-full flex items-center justify-center hover:bg-red-50 transition-all duration-200 hover:scale-110"
                                        title="Remove item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="drop-shadow-sm">
                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    `
        )
        .join("");

      const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      cartSummary.innerHTML = `
                        <div class="space-y-6">
                            <!-- Delivery Options -->
                            <div>
                                <label class="block text-lg font-semibold mb-4 text-gray-800">🚚 Choose Delivery Option</label>
                                <div class="space-y-3">
                                    <label class="delivery-option-selected flex items-center p-4 border-2 border-purple-300 bg-purple-50 rounded-xl cursor-pointer transition-all">
                                        <input type="radio" name="delivery" value="60" checked onchange="updateCartSummary()" class="sr-only">
                                        <div class="flex-1 flex items-center justify-between">
                                            <div class="flex items-center space-x-3">
                                                <div class="radio-circle w-5 h-5 border-2 border-purple-600 rounded-full flex items-center justify-center">
                                                    <div class="radio-dot w-3 h-3 bg-purple-600 rounded-full"></div>
                                                </div>
                                                <div class="delivery-text">
                                                    <div class="font-semibold text-gray-800">Inside Dhaka</div>
                                                    <div class="text-sm text-gray-500">1-2 business days</div>
                                                </div>
                                            </div>
                                            <div class="font-bold text-purple-600">৳60</div>
                                        </div>
                                    </label>
                                    
                                    <label class="delivery-option flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 transition-all">
                                        <input type="radio" name="delivery" value="120" onchange="updateCartSummary()" class="sr-only">
                                        <div class="flex-1 flex items-center justify-between">
                                            <div class="flex items-center space-x-3">
                                                <div class="radio-circle w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                                                    <div class="radio-dot w-3 h-3 bg-gray-300 rounded-full hidden"></div>
                                                </div>
                                                <div class="delivery-text">
                                                    <div class="font-semibold text-gray-800">Outside Dhaka</div>
                                                    <div class="text-sm text-gray-500">3-5 business days</div>
                                                </div>
                                            </div>
                                            <div class="font-bold text-purple-600">৳120</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            
                            <!-- Order Summary -->
                            <div class="bg-gray-50 rounded-xl p-5 space-y-4">
                                <h3 class="font-bold text-gray-800 text-lg flex items-center">
                                    <span class="mr-2">📋</span>
                                    Order Summary
                                </h3>
                                
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center">
                                        <span class="text-gray-600">Subtotal (${cart.reduce(
                                          (sum, item) => sum + item.quantity,
                                          0
                                        )} items)</span>
                                        <span class="font-semibold">৳${subtotal.toLocaleString()}</span>
                                    </div>
                                    
                                    <div class="flex justify-between items-center">
                                        <span id="deliveryLabel" class="text-gray-600">Delivery (Inside Dhaka)</span>
                                        <span id="deliveryAmount" class="font-semibold">৳60</span>
                                    </div>
                                    
                                    <div class="border-t border-gray-300 pt-3">
                                        <div class="flex justify-between items-center">
                                            <span class="text-xl font-bold text-gray-800">Total Amount</span>
                                            <span id="totalAmount" class="text-2xl font-bold price-gradient">৳${(
                                              subtotal + 60
                                            ).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                                    <div class="flex items-center text-green-700 text-sm">
                                        <span class="mr-2">✅</span>
                                        <span>Free returns within 7 days • Official warranty included</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button onclick="proceedToWhatsApp()" 
                                    class="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-lg">
                                <span>💬</span>
                                <span>Confirm Order By WhatsApp</span>
                            </button>
                        </div>
                    `;
    }
  } catch (error) {
    console.error("Cart UI update error:", error);
  }
}

function updateCartSummary() {
  try {
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const totalAmount = document.getElementById("totalAmount");
    const deliveryLabel = document.getElementById("deliveryLabel");
    const deliveryAmount = document.getElementById("deliveryAmount");

    let selectedDelivery = 60; // default
    deliveryRadios.forEach((radio) => {
      if (radio.checked) {
        selectedDelivery = parseInt(radio.value);

        // Update radio button styles
        const allOptions = document.querySelectorAll(
          ".delivery-option, .delivery-option-selected"
        );
        allOptions.forEach((option) => {
          // Reset to unselected state
          option.className =
            "delivery-option flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 transition-all";
          const radioCircle = option.querySelector(".radio-circle");
          const radioDot = option.querySelector(".radio-dot");
          if (radioCircle && radioDot) {
            radioCircle.className =
              "radio-circle w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center";
            radioDot.className =
              "radio-dot w-3 h-3 bg-gray-300 rounded-full hidden";
          }
        });

        // Style selected option
        const selectedOption = radio.closest("label");
        if (selectedOption) {
          selectedOption.className =
            "delivery-option-selected flex items-center p-4 border-2 border-purple-300 bg-purple-50 rounded-xl cursor-pointer transition-all";
          const radioCircle = selectedOption.querySelector(".radio-circle");
          const radioDot = selectedOption.querySelector(".radio-dot");
          if (radioCircle && radioDot) {
            radioCircle.className =
              "radio-circle w-5 h-5 border-2 border-purple-600 rounded-full flex items-center justify-center";
            radioDot.className = "radio-dot w-3 h-3 bg-purple-600 rounded-full";
          }
        }
      }
    });

    if (totalAmount && deliveryLabel && deliveryAmount) {
      const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const total = subtotal + selectedDelivery;

      totalAmount.textContent = `৳${total.toLocaleString()}`;
      deliveryLabel.textContent =
        selectedDelivery === 60
          ? "Delivery (Inside Dhaka)"
          : "Delivery (Outside Dhaka)";
      deliveryAmount.textContent = `৳${selectedDelivery}`;
    }
  } catch (error) {
    console.error("Cart summary update error:", error);
  }
}

function proceedToWhatsApp() {
  try {
    if (cart.length === 0) {
      showToast(
        "Cart Empty",
        "Please add some products to your cart first!",
        "error"
      );
      return;
    }

    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    let deliveryCharge = 60;
    deliveryRadios.forEach((radio) => {
      if (radio.checked) {
        deliveryCharge = parseInt(radio.value);
      }
    });

    const deliveryText =
      deliveryCharge === 60 ? "Inside Dhaka" : "Outside Dhaka";

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total = subtotal + deliveryCharge;

    let message = `🛒 *New Order from TechHub*\n\n`;
    message += `📦 *Order Details:*\n`;

    cart.forEach((item) => {
      message += `• ${item.name}\n`;
      message += `  Quantity: ${item.quantity}\n`;
      message += `  Price: ৳${(
        item.price * item.quantity
      ).toLocaleString()}\n\n`;
    });

    message += `💰 *Order Summary:*\n`;
    message += `Subtotal: ৳${subtotal.toLocaleString()}\n`;
    message += `Delivery (${deliveryText}): ৳${deliveryCharge}\n`;
    message += `*Total: ৳${total.toLocaleString()}*\n\n`;
    message += `📱 *Customer Information:*\n`;
    message += `Please provide your:\n`;
    message += `• Full Name\n`;
    message += `• Complete Address\n`;
    message += `• Phone Number\n\n`;
    message += `Thank you for choosing TechHub! 🙏`;

    // Show confirmation toast
    showToast("Order Confirmed!", "Redirecting to WhatsApp...", "success");

    // Close cart modal
    const cartModal = document.getElementById("cartModal");
    cartModal.classList.remove("active");

    // 📞 IMPORTANT: Replace with your actual WhatsApp Business number
    // Format: Country code + phone number (no + sign, no spaces)
    // Examples:
    // Bangladesh: '8801234567890'
    // India: '919876543210'
    // USA: '15551234567'
    const whatsappNumber = "+8801993389857"; // ⚠️ CHANGE THIS TO YOUR NUMBER

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Immediate redirect to WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      // Clear cart after successful order
      cart = [];
      localStorage.setItem("techHubCart", JSON.stringify(cart));
      updateCartUI();
    }, 500);
  } catch (error) {
    console.error("WhatsApp order error:", error);
    showToast(
      "Order Error",
      "Error processing order. Please try again.",
      "error"
    );
  }
}

// UI toggle functions
function toggleCart() {
  try {
    const cartModal = document.getElementById("cartModal");
    cartModal.classList.toggle("active");
  } catch (error) {
    console.error("Toggle cart error:", error);
  }
}

function toggleMobileMenu() {
  try {
    const mobileMenu = document.getElementById("mobileMenu");
    mobileMenu.classList.toggle("active");
  } catch (error) {
    console.error("Toggle mobile menu error:", error);
  }
}

// Product functions
function renderProducts() {
  try {
    const productsGrid = document.getElementById("productsGrid");
    if (!productsGrid) return;

    productsGrid.innerHTML = filteredProducts
      .map(
        (product) => `
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift fade-in">
                        <div class="relative">
                            <img src="${product.image}" alt="${
          product.name
        }" class="product-image" 
                                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'200\\' height=\\'200\\' viewBox=\\'0 0 200 200\\'%3E%3Crect width=\\'200\\' height=\\'200\\' fill=\\'%23f3f4f6\\'/%3E%3Ctext x=\\'100\\' y=\\'100\\' text-anchor=\\'middle\\' fill=\\'%23666\\' font-size=\\'14\\'%3E${
                                   product.name
                                 }%3C/text%3E%3C/svg%3E'">
                            <div class="absolute top-3 right-3">
                                <span class="px-3 py-1 text-xs font-semibold rounded-full shadow-lg ${
                                  product.stock === "In Stock"
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                }">
                                    ${product.stock}
                                </span>
                            </div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2">${
                              product.name
                            }</h3>
                            <p class="text-gray-600 mb-3">${
                              product.description
                            }</p>
                            <div class="flex items-center mb-4">
                                <div class="flex text-yellow-400 text-sm">
                                    ${"★".repeat(product.rating)}${"☆".repeat(
          5 - product.rating
        )}
                                </div>
                                <span class="ml-2 text-xs text-gray-500">(${
                                  product.rating
                                }/5)</span>
                            </div>
                            <div class="flex items-center justify-between gap-2">
                                <span class="text-xl font-bold price-gradient">৳${product.price.toLocaleString()}</span>
                                <div class="flex space-x-2">
                                    <button onclick="openProductModal(${
                                      product.id
                                    })" class="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                                        View
                                    </button>
                                    <button onclick="addToCart(${product.id})" 
                                            class="gradient-bg text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
      )
      .join("");
  } catch (error) {
    console.error("Render products error:", error);
  }
}

function filterProducts(category) {
  try {
    if (category === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter(
        (product) => product.category === category
      );
    }

    renderProducts();
    updateFilterButtons(category);
  } catch (error) {
    console.error("Filter products error:", error);
  }
}

function updateFilterButtons(activeCategory) {
  try {
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((button) => {
      if (
        button.textContent.toLowerCase().includes(activeCategory) ||
        (activeCategory === "all" && button.textContent === "All")
      ) {
        button.classList.remove("bg-gray-200", "text-gray-700");
        button.classList.add("bg-purple-600", "text-white");
      } else {
        button.classList.remove("bg-purple-600", "text-white");
        button.classList.add("bg-gray-200", "text-gray-700");
      }
    });
  } catch (error) {
    console.error("Update filter buttons error:", error);
  }
}

function sortProducts() {
  try {
    const sortSelect = document.getElementById("sortSelect");
    const sortValue = sortSelect.value;

    switch (sortValue) {
      case "name":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }

    renderProducts();
  } catch (error) {
    console.error("Sort products error:", error);
  }
}

function filterByPrice() {
  try {
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const maxPrice = parseInt(priceRange.value);

    priceValue.textContent = `৳${maxPrice.toLocaleString()}`;

    filteredProducts = products.filter((product) => product.price <= maxPrice);
    renderProducts();
  } catch (error) {
    console.error("Filter by price error:", error);
  }
}

function searchProducts() {
  try {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm === "") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
      );
    }

    renderProducts();
  } catch (error) {
    console.error("Search products error:", error);
  }
}

// Carousel functions
function renderCarousel() {
  try {
    const carouselTrack = document.getElementById("carouselTrack");
    const carouselDots = document.getElementById("carouselDots");

    if (!carouselTrack || !carouselDots) return;

    const featuredProducts = products.slice(0, 4);

    carouselTrack.innerHTML = featuredProducts
      .map(
        (product) => `
                    <div class="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 h-96">
                            <div class="p-8 flex flex-col justify-center">
                                <h3 class="text-3xl font-bold mb-4">${
                                  product.name
                                }</h3>
                                <p class="text-gray-600 mb-6">${
                                  product.description
                                }</p>
                                <div class="flex items-center mb-6">
                                    <span class="text-3xl font-bold price-gradient">৳${product.price.toLocaleString()}</span>
                                    <div class="ml-4 flex text-yellow-400">
                                        ${"⭐".repeat(product.rating)}
                                    </div>
                                </div>
                                <button onclick="addToCart(${product.id})" 
                                        class="gradient-bg text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity w-fit">
                                    Add to Cart
                                </button>
                            </div>
                            <div class="flex items-center justify-center p-8">
                                <img src="${product.image}" alt="${
          product.name
        }" class="carousel-image"
                                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'300\\' viewBox=\\'0 0 300 300\\'%3E%3Crect width=\\'300\\' height=\\'300\\' fill=\\'%23f3f4f6\\'/%3E%3Ctext x=\\'150\\' y=\\'160\\' text-anchor=\\'middle\\' fill=\\'%23666\\' font-size=\\'16\\'%3E${
                                       product.name
                                     }%3C/text%3E%3C/svg%3E'">
                            </div>
                        </div>
                    </div>
                `
      )
      .join("");

    carouselDots.innerHTML = featuredProducts
      .map(
        (_, index) => `
                    <button onclick="goToSlide(${index})" 
                            class="w-3 h-3 rounded-full transition-colors ${
                              index === 0 ? "bg-purple-600" : "bg-gray-300"
                            }">
                    </button>
                `
      )
      .join("");
  } catch (error) {
    console.error("Render carousel error:", error);
  }
}

function nextSlide() {
  try {
    const totalSlides = 4;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  } catch (error) {
    console.error("Next slide error:", error);
  }
}

function prevSlide() {
  try {
    const totalSlides = 4;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  } catch (error) {
    console.error("Previous slide error:", error);
  }
}

function goToSlide(index) {
  try {
    currentSlide = index;
    updateCarousel();
  } catch (error) {
    console.error("Go to slide error:", error);
  }
}

function updateCarousel() {
  try {
    const carouselTrack = document.getElementById("carouselTrack");
    const dots = document.querySelectorAll("#carouselDots button");

    if (carouselTrack) {
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.remove("bg-gray-300");
        dot.classList.add("bg-purple-600");
      } else {
        dot.classList.remove("bg-purple-600");
        dot.classList.add("bg-gray-300");
      }
    });
  } catch (error) {
    console.error("Update carousel error:", error);
  }
}

// Contact form
function submitContactForm(event) {
  try {
    event.preventDefault();

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate form submission
    alert("Thank you for your message! We will get back to you soon.");
    document.getElementById("contactForm").reset();
  } catch (error) {
    console.error("Contact form error:", error);
    alert("Error submitting form. Please try again.");
  }
}

// Auto-advance carousel
setInterval(() => {
  try {
    nextSlide();
  } catch (error) {
    console.error("Auto-advance carousel error:", error);
  }
}, 5000);

// Product Modal Functions
function openProductModal(productId) {
  try {
    currentProduct = products.find((p) => p.id === productId);
    if (!currentProduct) return;

    currentGalleryIndex = 0;
    const modal = document.getElementById("productModal");

    // Populate gallery
    const galleryTrack = document.getElementById("galleryTrack");
    galleryTrack.innerHTML = currentProduct.images
      .map(
        (image) => `
                    <img src="${image}" alt="${currentProduct.name}" class="gallery-image"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'600\\' height=\\'400\\' viewBox=\\'0 0 600 400\\'%3E%3Crect width=\\'600\\' height=\\'400\\' fill=\\'%23f3f4f6\\'/%3E%3Ctext x=\\'300\\' y=\\'200\\' text-anchor=\\'middle\\' fill=\\'%23666\\' font-size=\\'20\\'%3E${currentProduct.name}%3C/text%3E%3C/svg%3E'">
                `
      )
      .join("");

    // Populate gallery dots
    const galleryDots = document.getElementById("galleryDots");
    galleryDots.innerHTML = currentProduct.images
      .map(
        (_, index) => `
                    <div class="gallery-dot ${
                      index === 0 ? "active" : ""
                    }" onclick="goToGalleryImage(${index})"></div>
                `
      )
      .join("");

    // Populate product info
    const modalProductInfo = document.getElementById("modalProductInfo");
    modalProductInfo.innerHTML = `
                    <div class="space-y-6">
                        <div>
                            <h1 class="text-3xl font-bold mb-2">${
                              currentProduct.name
                            }</h1>
                            <div class="flex items-center space-x-4 mb-4">
                                <div class="flex text-yellow-400 text-lg">
                                    ${"⭐".repeat(currentProduct.rating)}
                                </div>
                                <span class="text-gray-600">(${
                                  currentProduct.rating
                                }/5)</span>
                                <span class="px-3 py-1 text-sm font-semibold rounded-full ${
                                  currentProduct.stock === "In Stock"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }">
                                    ${currentProduct.stock}
                                </span>
                            </div>
                            <div class="text-4xl font-bold price-gradient mb-6">৳${currentProduct.price.toLocaleString()}</div>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold mb-3">Description</h3>
                            <p class="text-gray-600 leading-relaxed">${
                              currentProduct.fullDescription
                            }</p>
                        </div>

                        <div>
                            <h3 class="text-xl font-semibold mb-3">Key Specifications</h3>
                            <ul class="space-y-2">
                                ${currentProduct.specifications
                                  .map(
                                    (spec) => `
                                    <li class="flex items-center space-x-2">
                                        <span class="w-2 h-2 bg-purple-600 rounded-full"></span>
                                        <span class="text-gray-700">${spec}</span>
                                    </li>
                                `
                                  )
                                  .join("")}
                            </ul>
                        </div>

                        <div class="flex space-x-4 pt-6">
                            <button onclick="addToCart(${currentProduct.id})" 
                                    class="flex-1 gradient-bg text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                                Add to Cart
                            </button>
                            <button onclick="addToCart(${
                              currentProduct.id
                            }); proceedToWhatsApp()" 
                                    class="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                Buy Now
                            </button>
                        </div>

                        <div class="border-t pt-6">
                            <div class="grid grid-cols-3 gap-4 text-center">
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <div class="text-2xl mb-2">🚚</div>
                                    <div class="text-sm font-semibold">Free Delivery</div>
                                    <div class="text-xs text-gray-600">Inside Dhaka</div>
                                </div>
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <div class="text-2xl mb-2">🛡️</div>
                                    <div class="text-sm font-semibold">Warranty</div>
                                    <div class="text-xs text-gray-600">Official Warranty</div>
                                </div>
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <div class="text-2xl mb-2">💬</div>
                                    <div class="text-sm font-semibold">Support</div>
                                    <div class="text-xs text-gray-600">24/7 Available</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

    // Show modal
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.querySelector(".product-modal").classList.add("active");
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  } catch (error) {
    console.error("Open product modal error:", error);
  }
}

function closeProductModal() {
  try {
    const modal = document.getElementById("productModal");
    modal.querySelector(".product-modal").classList.remove("active");

    setTimeout(() => {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }, 300);
  } catch (error) {
    console.error("Close product modal error:", error);
  }
}

function nextGalleryImage() {
  try {
    if (!currentProduct) return;
    currentGalleryIndex =
      (currentGalleryIndex + 1) % currentProduct.images.length;
    updateGallery();
  } catch (error) {
    console.error("Next gallery image error:", error);
  }
}

function prevGalleryImage() {
  try {
    if (!currentProduct) return;
    currentGalleryIndex =
      (currentGalleryIndex - 1 + currentProduct.images.length) %
      currentProduct.images.length;
    updateGallery();
  } catch (error) {
    console.error("Previous gallery image error:", error);
  }
}

function goToGalleryImage(index) {
  try {
    currentGalleryIndex = index;
    updateGallery();
  } catch (error) {
    console.error("Go to gallery image error:", error);
  }
}

function updateGallery() {
  try {
    const galleryTrack = document.getElementById("galleryTrack");
    const dots = document.querySelectorAll(".gallery-dot");

    if (galleryTrack) {
      galleryTrack.style.transform = `translateX(-${
        currentGalleryIndex * 100
      }%)`;
    }

    dots.forEach((dot, index) => {
      if (index === currentGalleryIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  } catch (error) {
    console.error("Update gallery error:", error);
  }
}

// Blog Functions
function renderBlogPosts() {
  try {
    const blogGrid = document.getElementById("blogGrid");
    if (!blogGrid) return;

    blogGrid.innerHTML = blogPosts
      .map(
        (post) => `
                    <article class="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift blog-card">
                        <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover"
                             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'600\\' height=\\'400\\' viewBox=\\'0 0 600 400\\'%3E%3Crect width=\\'600\\' height=\\'400\\' fill=\\'%23f3f4f6\\'/%3E%3Ctext x=\\'300\\' y=\\'200\\' text-anchor=\\'middle\\' fill=\\'%23666\\' font-size=\\'20\\'%3E${post.title}%3C/text%3E%3C/svg%3E'">
                        <div class="p-6 blog-content">
                            <h3 class="text-xl font-semibold mb-2">${post.title}</h3>
                            <p class="text-gray-600 blog-excerpt">${post.excerpt}</p>
                            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <span>By ${post.author}</span>
                                <span>${post.date}</span>
                            </div>
                            <button onclick="openBlogModal(${post.id})" class="w-full bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                                Read More →
                            </button>
                        </div>
                    </article>
                `
      )
      .join("");
  } catch (error) {
    console.error("Render blog posts error:", error);
  }
}

function openBlogModal(postId) {
  try {
    const post = blogPosts.find((p) => p.id === postId);
    if (!post) return;

    const modal = document.getElementById("blogModal");
    const modalTitle = document.getElementById("blogModalTitle");
    const modalContent = document.getElementById("blogModalContent");

    modalTitle.textContent = post.title;
    modalContent.innerHTML = `
                    <div class="mb-6">
                        <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <span>By ${post.author}</span>
                            <span>${post.date}</span>
                        </div>
                    </div>
                    ${post.content}
                `;

    // Show modal
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.querySelector(".blog-modal").classList.add("active");
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  } catch (error) {
    console.error("Open blog modal error:", error);
  }
}

function closeBlogModal() {
  try {
    const modal = document.getElementById("blogModal");
    modal.querySelector(".blog-modal").classList.remove("active");

    setTimeout(() => {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }, 300);
  } catch (error) {
    console.error("Close blog modal error:", error);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

//block
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && (e.key === "u" || e.key === "U")) {
    e.preventDefault();
    alert("Source code is protected!");
  }
  if (e.key === "F12") {
    e.preventDefault();
    alert("Developer Tools disabled!");
  }
});

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  alert("Right click disabled!");
});
