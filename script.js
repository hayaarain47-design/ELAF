/* =========================
   ELAF - JAVASCRIPT
========================= */


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});


/* =========================
   SEARCH
========================= */

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchBtn.addEventListener("click", () => {

    searchPanel.classList.toggle("active");

    if (searchPanel.classList.contains("active")) {
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    }

});


closeSearch.addEventListener("click", () => {
    searchPanel.classList.remove("active");
});


const products = [
    "Noor Georgette Abaya",
    "Meher Korean Abaya",
    "Ayla Flowing Abaya",
    "Raya Modest Abaya",
    "Sahar Korean Abaya",
    "Haya Signature Abaya"
];


searchInput.addEventListener("input", () => {

    const query = searchInput.value.toLowerCase().trim();

    searchResults.innerHTML = "";

    if (!query) {
        return;
    }

    const matches = products.filter(product =>
        product.toLowerCase().includes(query)
    );

    if (matches.length === 0) {

        searchResults.innerHTML =
            "<p>No ELAF products found.</p>";

        return;
    }

    matches.forEach(product => {

        const item = document.createElement("div");

        item.className = "search-result-item";

        item.textContent = product;

        item.addEventListener("click", () => {

            searchPanel.classList.remove("active");

            const productCards =
                document.querySelectorAll(".product-card");

            productCards.forEach(card => {

                if (card.dataset.name === product) {

                    card.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            });

        });

        searchResults.appendChild(item);

    });

});


/* =========================
   PRODUCT FILTERS
========================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const productCards =
    document.querySelectorAll(".product-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        productCards.forEach(card => {

            const categories =
                card.dataset.category.split(" ");

            if (
                filter === "all" ||
                categories.includes(filter)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* =========================
   WISHLIST
========================= */

document.querySelectorAll(".wishlist").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        if (button.classList.contains("active")) {

            showToast("Added to wishlist");

        } else {

            showToast("Removed from wishlist");

        }

    });

});


/* =========================
   SHOPPING BAG
========================= */

let bag = [];


const bagBtn = document.getElementById("bagBtn");
const bagSidebar = document.getElementById("bagSidebar");
const bagOverlay = document.getElementById("bagOverlay");
const closeBag = document.getElementById("closeBag");

const bagItems = document.getElementById("bagItems");
const bagCount = document.getElementById("bagCount");
const bagTotal = document.getElementById("bagTotal");


function openBag() {

    bagSidebar.classList.add("active");
    bagOverlay.classList.add("active");

}


function closeBagSidebar() {

    bagSidebar.classList.remove("active");
    bagOverlay.classList.remove("active");

}


bagBtn.addEventListener("click", openBag);

closeBag.addEventListener("click", closeBagSidebar);

bagOverlay.addEventListener("click", closeBagSidebar);


/* =========================
   ADD TO BAG
========================= */

document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.product;
        const price = Number(button.dataset.price);

        const existing =
            bag.find(item => item.name === name);

        if (existing) {

            existing.quantity++;

        } else {

            bag.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateBag();

        showToast(`${name} added to bag`);

    });

});


/* =========================
   UPDATE BAG
========================= */

function updateBag() {

    bagItems.innerHTML = "";

    if (bag.length === 0) {

        bagItems.innerHTML = `
            <div class="empty-bag">

                <span>○</span>

                <h3>Your bag is empty</h3>

                <p>
                    Discover something beautiful from ELAF.
                </p>

            </div>
        `;

        bagCount.textContent = "0";

        bagTotal.textContent = "PKR 0";

        return;
    }


    let total = 0;
    let count = 0;


    bag.forEach((item, index) => {

        total += item.price * item.quantity;

        count += item.quantity;


        const bagItem =
            document.createElement("div");

        bagItem.className = "bag-item";


        bagItem.innerHTML = `

            <img
                class="bag-item-image"
                src="https://s.alicdn.com/%40sc04/kf/H305b2df6aee34366a69d737ce1c2b973k/HANO-Wholesale-Dubai-Solid-Color-Simple-Modest-Musulman-Islamic-Clothing-Black-Abaya-Muslim-Dresses-for-Women-Abaya.jpg"
                alt="${item.name}"
            >

            <div>

                <h4>${item.name}</h4>

                <p>
                    PKR ${item.price.toLocaleString()}
                    × ${item.quantity}
                </p>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >
                REMOVE
            </button>

        `;


        bagItems.appendChild(bagItem);

    });


    bagCount.textContent = count;

    bagTotal.textContent =
        `PKR ${total.toLocaleString()}`;


    document.querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

                bag.splice(index, 1);

                updateBag();

            });

        });

}


/* =========================
   CHECKOUT
========================= */

const checkoutBtn =
    document.getElementById("checkoutBtn");


checkoutBtn.addEventListener("click", () => {

    if (bag.length === 0) {

        showToast("Your bag is empty");

        return;

    }

    showToast(
        "Checkout will be available soon."
    );

});


/* =========================
   NEWSLETTER
========================= */

const newsletterForm =
    document.getElementById("newsletterForm");


newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email =
        document.getElementById("emailInput").value.trim();

    if (!email) {
        return;
    }

    showToast(
        "Welcome to the ELAF circle."
    );

    newsletterForm.reset();

});


/* =========================
   TOAST
========================= */

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================
   NAVBAR SCROLL
========================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================
   IMAGE FALLBACK
========================= */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.background = "#d9cabc";

        img.style.objectFit = "cover";

    });

});


/* =========================
   INITIAL BAG
========================= */

updateBag();
