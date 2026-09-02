/* =========================
   ELAF - JAVASCRIPT
========================= */


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });

});


/* =========================
   SEARCH
========================= */

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {

    searchPanel.classList.add("active");

    setTimeout(() => {
        searchInput.focus();
    }, 200);

});

closeSearch.addEventListener("click", () => {
    searchPanel.classList.remove("active");
});


searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productText =
            product.innerText.toLowerCase();

        if (
            searchValue === "" ||
            productText.includes(searchValue)
        ) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });

});


/* =========================
   PRODUCT FILTER
========================= */

const filterButtons =
    document.querySelectorAll(".filter");

const products =
    document.querySelectorAll(".product-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selected =
            button.dataset.filter;

        products.forEach(product => {

            const category =
                product.dataset.category;

            if (
                selected === "all" ||
                category.includes(selected)
            ) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });

    });

});


/* =========================
   WISHLIST
========================= */

document.querySelectorAll(".wishlist").forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent.trim() === "♡") {
            button.textContent = "♥";
        } else {
            button.textContent = "♡";
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

const bagItems =
    document.getElementById("bagItems");

const bagCount =
    document.getElementById("bagCount");

const bagTotal =
    document.getElementById("bagTotal");


/* OPEN BAG */

bagBtn.addEventListener("click", () => {

    bagSidebar.classList.add("active");
    bagOverlay.classList.add("active");

});


/* CLOSE BAG */

closeBag.addEventListener("click", closeBagPanel);

bagOverlay.addEventListener("click", closeBagPanel);


function closeBagPanel() {

    bagSidebar.classList.remove("active");
    bagOverlay.classList.remove("active");

}


/* ADD PRODUCT */

document.querySelectorAll(".quick-add").forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.dataset.name;

        const price =
            Number(button.dataset.price);

        bag.push({
            name: name,
            price: price
        });

        updateBag();

        showToast(`${name} added to your bag.`);

    });

});


/* UPDATE BAG */

function updateBag() {

    bagItems.innerHTML = "";

    if (bag.length === 0) {

        bagItems.innerHTML = `
            <p class="empty-bag">
                Your bag is currently empty.
            </p>
        `;

    } else {

        bag.forEach((item, index) => {

            const itemElement =
                document.createElement("div");

            itemElement.className = "bag-item";

            itemElement.innerHTML = `

                <div>
                    <h4>${item.name}</h4>
                    <p>PKR ${item.price.toLocaleString()}</p>
                </div>

                <button
                    class="remove-item"
                    data-index="${index}">
                    Remove
                </button>

            `;

            bagItems.appendChild(itemElement);

        });

    }


    const total =
        bag.reduce(
            (sum, item) => sum + item.price,
            0
        );


    bagCount.textContent = bag.length;

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
   TOAST
========================= */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================
   CHECKOUT
========================= */

document
    .getElementById("checkoutBtn")
    .addEventListener("click", () => {

        if (bag.length === 0) {

            showToast("Your bag is empty.");

            return;

        }

        showToast(
            "Checkout will be available soon."
        );

    });


/* =========================
   NEWSLETTER
========================= */

document
    .getElementById("newsletterForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const email =
            document.getElementById("newsletterEmail");

        if (email.value.trim() !== "") {

            showToast(
                "Welcome to the ELAF world."
            );

            email.value = "";

        }

    });


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 30) {

        navbar.style.boxShadow =
            "0 5px 25px rgba(33,28,24,0.08)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


/* =========================
   IMAGE FALLBACK
========================= */

document.querySelectorAll("img").forEach(img => {

    img.addEventListener("error", () => {

        img.style.background = "#d8c7b3";

    });

});


/* =========================
   INITIAL BAG
========================= */

updateBag();
