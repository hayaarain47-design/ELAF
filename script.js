/* =========================================================
   ELAF - COMPLETE ECOMMERCE DEMO
   ========================================================= */


/* ================= GLOBAL DATA ================= */

let bag = JSON.parse(localStorage.getItem("elafBag")) || [];

let currentProduct = null;

let currentQuantity = 1;


/* ================= ELEMENTS ================= */

const navbar = document.getElementById("navbar");

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.querySelector(".nav-links");

const searchBtn = document.getElementById("searchBtn");

const searchPanel = document.getElementById("searchPanel");

const closeSearch = document.getElementById("closeSearch");

const searchInput = document.getElementById("searchInput");

const bagBtn = document.getElementById("bagBtn");

const bagSidebar = document.getElementById("bagSidebar");

const bagOverlay = document.getElementById("bagOverlay");

const closeBag = document.getElementById("closeBag");

const customizeModal = document.getElementById("customizeModal");

const closeCustomize = document.getElementById("closeCustomize");

const checkoutModal = document.getElementById("checkoutModal");

const closeCheckout = document.getElementById("closeCheckout");

const confirmationModal =
    document.getElementById("confirmationModal");

const toast = document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* ================= FORMAT PRICE ================= */

function formatPrice(number) {

    return "PKR " + Number(number).toLocaleString("en-PK");

}


/* ================= TOAST ================= */

function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* ================= NAVBAR ================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* ================= MOBILE MENU ================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


/* ================= SEARCH ================= */

searchBtn.addEventListener("click", () => {

    searchPanel.classList.add("active");

    searchInput.focus();

});


closeSearch.addEventListener("click", () => {

    searchPanel.classList.remove("active");

    searchInput.value = "";

    showAllProducts();

});


searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        const category =
            product.dataset.category.toLowerCase();

        if (
            name.includes(searchValue) ||
            category.includes(searchValue)
        ) {

            product.classList.remove("hidden-card");

        } else {

            product.classList.add("hidden-card");

        }

    });

});


function showAllProducts() {

    document.querySelectorAll(".product-card")
        .forEach(product => {

            product.classList.remove("hidden-card");

        });

}


/* ================= PRODUCT FILTER ================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter = button.dataset.filter;

        const products =
            document.querySelectorAll("#abayaGrid .product-card");

        products.forEach(product => {

            const category =
                product.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                product.classList.remove("hidden-card");

            } else {

                product.classList.add("hidden-card");

            }

        });

    });

});


/* ================= CUSTOMIZATION ================= */

const customizeButtons =
    document.querySelectorAll(".customize-btn");


customizeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product =
            button.closest(".product-card");

        openCustomization(product);

    });

});


function openCustomization(product) {

    currentProduct = {

        name: product.dataset.name,

        price: Number(product.dataset.price),

        type: product.dataset.type,

        image: product.dataset.image

    };

    currentQuantity = 1;

    document.getElementById("quantityValue")
        .textContent = currentQuantity;


    document.getElementById("customizeName")
        .textContent = currentProduct.name;


    document.getElementById("customizeType")
        .textContent =
        currentProduct.type === "abaya"
            ? "ELAF ABAYA"
            : "ELAF HIJAB";


    document.getElementById("customizeImage")
        .src = currentProduct.image;


    document.getElementById("customizeBasePrice")
        .textContent =
        formatPrice(currentProduct.price);


    if (currentProduct.type === "abaya") {

        document
            .getElementById("abayaOptions")
            .classList.remove("hidden");

        document
            .getElementById("hijabOptions")
            .classList.add("hidden");

    } else {

        document
            .getElementById("abayaOptions")
            .classList.add("hidden");

        document
            .getElementById("hijabOptions")
            .classList.remove("hidden");

    }


    updateCustomizationTotal();

    customizeModal.classList.add("active");

    document.body.classList.add("modal-open");

}


/* ================= CUSTOMIZATION PRICE ================= */

const optionInputs = [

    document.getElementById("abayaFabric"),

    document.getElementById("abayaLength"),

    document.getElementById("hijabFabric"),

    document.getElementById("hijabLength")

];


optionInputs.forEach(input => {

    input.addEventListener("change", () => {

        updateCustomizationTotal();

    });

});


function updateCustomizationTotal() {

    if (!currentProduct) return;


    let extra = 0;


    if (currentProduct.type === "abaya") {

        extra += Number(
            document.getElementById("abayaFabric").value
        );

        extra += Number(
            document.getElementById("abayaLength").value
        );

    } else {

        extra += Number(
            document.getElementById("hijabFabric").value
        );

        extra += Number(
            document.getElementById("hijabLength").value
        );

    }


    const unitPrice =
        currentProduct.price + extra;


    const total =
        unitPrice * currentQuantity;


    document.getElementById("customTotal")
        .textContent = formatPrice(total);

}


/* ================= QUANTITY ================= */

document.getElementById("qtyMinus")
    .addEventListener("click", () => {

        if (currentQuantity > 1) {

            currentQuantity--;

            document.getElementById("quantityValue")
                .textContent = currentQuantity;

            updateCustomizationTotal();

        }

    });


document.getElementById("qtyPlus")
    .addEventListener("click", () => {

        if (currentQuantity < 10) {

            currentQuantity++;

            document.getElementById("quantityValue")
                .textContent = currentQuantity;

            updateCustomizationTotal();

        }

    });


/* ================= ADD CUSTOMIZED PRODUCT ================= */

document
    .getElementById("addCustomizedProduct")
    .addEventListener("click", () => {


        if (!currentProduct) return;


        let options = {};

        let extra = 0;


        if (currentProduct.type === "abaya") {

            const color =
                document.getElementById("abayaColor").value;

            const fabricSelect =
                document.getElementById("abayaFabric");

            const lengthSelect =
                document.getElementById("abayaLength");

            const size =
                document.getElementById("abayaSize").value;


            const fabric =
                fabricSelect.options[
                    fabricSelect.selectedIndex
                ].text.split(" — ")[0];


            const length =
                lengthSelect.options[
                    lengthSelect.selectedIndex
                ].text.split(" — ")[0];


            extra =
                Number(fabricSelect.value) +
                Number(lengthSelect.value);


            options = {

                color: color,

                fabric: fabric,

                length: length,

                size: size

            };

        } else {


            const color =
                document.getElementById("hijabColor").value;

            const fabricSelect =
                document.getElementById("hijabFabric");

            const lengthSelect =
                document.getElementById("hijabLength");


            const fabric =
                fabricSelect.options[
                    fabricSelect.selectedIndex
                ].text.split(" — ")[0];


            const length =
                lengthSelect.options[
                    lengthSelect.selectedIndex
                ].text.split(" — ")[0];


            extra =
                Number(fabricSelect.value) +
                Number(lengthSelect.value);


            options = {

                color: color,

                fabric: fabric,

                length: length

            };

        }


        const unitPrice =
            currentProduct.price + extra;


        const item = {

            id: Date.now(),

            name: currentProduct.name,

            type: currentProduct.type,

            image: currentProduct.image,

            basePrice: currentProduct.price,

            unitPrice: unitPrice,

            quantity: currentQuantity,

            options: options

        };


        bag.push(item);

        saveBag();

        updateBag();


        customizeModal.classList.remove("active");

        document.body.classList.remove("modal-open");


        showToast(
            currentProduct.name + " added to your bag"
        );


        currentProduct = null;

    });


/* ================= CLOSE CUSTOMIZATION ================= */

closeCustomize.addEventListener("click", () => {

    customizeModal.classList.remove("active");

    document.body.classList.remove("modal-open");

});


customizeModal.addEventListener("click", event => {

    if (event.target === customizeModal) {

        customizeModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }

});


/* ================= BAG ================= */

function saveBag() {

    localStorage.setItem(
        "elafBag",
        JSON.stringify(bag)
    );

}


function getBagSubtotal() {

    return bag.reduce((total, item) => {

        return total +
            (item.unitPrice * item.quantity);

    }, 0);

}


function updateBagCount() {

    const count =
        bag.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    document.getElementById("bagCount")
        .textContent = count;

}


function updateBag() {

    updateBagCount();


    const bagItems =
        document.getElementById("bagItems");


    if (bag.length === 0) {

        bagItems.innerHTML = `

            <div class="empty-bag">

                <div class="empty-icon">○</div>

                <h3>Your bag is empty</h3>

                <p>
                    Choose an abaya or hijab to begin.
                </p>

            </div>

        `;

    } else {

        bagItems.innerHTML = bag.map(item => `

            <div class="bag-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <div class="bag-item-top">

                        <div>

                            <h4>${item.name}</h4>

                            <p>
                                Colour: ${item.options.color}
                            </p>

                            <p>
                                Fabric: ${item.options.fabric}
                            </p>

                            <p>
                                Length: ${item.options.length}
                            </p>

                            ${
                                item.options.size
                                ? `
                                    <p>
                                        Size: ${item.options.size}
                                    </p>
                                  `
                                : ""
                            }

                        </div>

                        <button
                            class="remove-item"
                            onclick="removeItem(${item.id})"
                        >
                            ×
                        </button>

                    </div>


                    <p>
                        ${formatPrice(item.unitPrice)}
                        each
                    </p>


                    <div class="bag-qty">

                        <button
                            onclick="changeBagQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeBagQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>

        `).join("");

    }


    document.getElementById("bagSubtotal")
        .textContent =
        formatPrice(getBagSubtotal());

}


/* ================= CHANGE BAG QUANTITY ================= */

function changeBagQuantity(id, change) {

    const item =
        bag.find(item => item.id === id);

    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        bag =
            bag.filter(item => item.id !== id);

    }


    if (item.quantity > 10) {

        item.quantity = 10;

    }


    saveBag();

    updateBag();

    updateCheckoutSummary();

}


/* ================= REMOVE ITEM ================= */

function removeItem(id) {

    bag =
        bag.filter(item => item.id !== id);

    saveBag();

    updateBag();

    updateCheckoutSummary();

    showToast("Item removed from bag");

}


/* ================= OPEN BAG ================= */

bagBtn.addEventListener("click", () => {

    bagSidebar.classList.add("active");

    bagOverlay.classList.add("active");

});


closeBag.addEventListener("click", closeBagSidebar);

bagOverlay.addEventListener("click", closeBagSidebar);


function closeBagSidebar() {

    bagSidebar.classList.remove("active");

    bagOverlay.classList.remove("active");

}


/* ================= CHECKOUT ================= */

document
    .getElementById("checkoutBtn")
    .addEventListener("click", () => {


        if (bag.length === 0) {

            showToast("Your bag is empty");

            return;

        }


        updateCheckoutSummary();

        closeBagSidebar();

        checkoutModal.classList.add("active");

        document.body.classList.add("modal-open");

    });


/* ================= CHECKOUT SUMMARY ================= */

function updateCheckoutSummary() {

    const checkoutItems =
        document.getElementById("checkoutItems");


    if (!checkoutItems) return;


    checkoutItems.innerHTML =
        bag.map(item => `

            <div class="checkout-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

                <div>

                    <h4>${item.name}</h4>

                    <p>
                        ${item.options.color} •
                        ${item.options.fabric}
                    </p>

                    <p>
                        Length: ${item.options.length}
                    </p>

                    ${
                        item.options.size
                        ? `
                            <p>
                                Size: ${item.options.size}
                            </p>
                          `
                        : ""
                    }

                    <p>
                        Quantity: ${item.quantity}
                    </p>

                    <strong>
                        ${formatPrice(
                            item.unitPrice *
                            item.quantity
                        )}
                    </strong>

                </div>

            </div>

        `).join("");


    const subtotal =
        getBagSubtotal();


    const selectedDelivery =
        document.querySelector(
            'input[name="delivery"]:checked'
        );


    const delivery =
        selectedDelivery
            ? Number(selectedDelivery.value)
            : 250;


    document.getElementById("checkoutSubtotal")
        .textContent =
        formatPrice(subtotal);


    document.getElementById("checkoutDelivery")
        .textContent =
        formatPrice(delivery);


    document.getElementById("checkoutTotal")
        .textContent =
        formatPrice(subtotal + delivery);

}


/* ================= DELIVERY CHANGE ================= */

document
    .querySelectorAll('input[name="delivery"]')
    .forEach(radio => {

        radio.addEventListener("change", () => {

            updateCheckoutSummary();

        });

    });


/* ================= CLOSE CHECKOUT ================= */

closeCheckout.addEventListener("click", () => {

    checkoutModal.classList.remove("active");

    document.body.classList.remove("modal-open");

});


checkoutModal.addEventListener("click", event => {

    if (event.target === checkoutModal) {

        checkoutModal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }

});


/* ================= PLACE ORDER ================= */

document
    .getElementById("checkoutForm")
    .addEventListener("submit", event => {

        event.preventDefault();


        if (bag.length === 0) {

            showToast("Your bag is empty");

            return;

        }


        const name =
            document.getElementById("customerName")
                .value.trim();


        const phone =
            document.getElementById("customerPhone")
                .value.trim();


        const address =
            document.getElementById("customerAddress")
                .value.trim();


        const city =
            document.getElementById("customerCity")
                .value.trim();


        const selectedDelivery =
            document.querySelector(
                'input[name="delivery"]:checked'
            );


        const selectedPayment =
            document.querySelector(
                'input[name="payment"]:checked'
            );


        const deliveryName =
            selectedDelivery.dataset.name;


        const deliveryCharge =
            Number(selectedDelivery.value);


        const paymentMethod =
            selectedPayment.value;


        const subtotal =
            getBagSubtotal();


        const grandTotal =
            subtotal + deliveryCharge;


        const orderNumber =
            generateOrderNumber();


        document.getElementById("orderNumber")
            .textContent = orderNumber;


        document.getElementById("confirmName")
            .textContent = name;


        document.getElementById("confirmCity")
            .textContent = city;


        document.getElementById("confirmDelivery")
            .textContent =
            deliveryName;


        document.getElementById("confirmPayment")
            .textContent =
            paymentMethod;


        document.getElementById("confirmTotal")
            .textContent =
            formatPrice(grandTotal);


        checkoutModal.classList.remove("active");


        confirmationModal.classList.add("active");


        document.body.classList.add("modal-open");


        bag = [];

        saveBag();

        updateBag();

        document
            .getElementById("checkoutForm")
            .reset();


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        console.log("ELAF DEMO ORDER", {

            orderNumber,

            customer: {
                name,
                phone,
                address,
                city
            },

            delivery: deliveryName,

            deliveryCharge,

            payment: paymentMethod,

            products: bag,

            total: grandTotal

        });

    });


/* ================= ORDER NUMBER ================= */

function generateOrderNumber() {

    const random =
        Math.floor(
            1000 + Math.random() * 9000
        );

    const year =
        new Date().getFullYear();

    return `ELAF-${year}-${random}`;

}


/* ================= CONTINUE SHOPPING ================= */

document
    .getElementById("continueShopping")
    .addEventListener("click", () => {

        confirmationModal.classList.remove("active");

        document.body.classList.remove("modal-open");

        window.location.href = "#home";

    });


/* ================= NEWSLETTER ================= */

document
    .getElementById("newsletterForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const email =
            document.getElementById("newsletterEmail")
                .value.trim();

        if (!email) return;

        showToast(
            "Thank you for joining the ELAF Journal"
        );

        document
            .getElementById("newsletterForm")
            .reset();

    });


/* ================= IMAGE FALLBACK ================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener("error", () => {

            image.style.background = "#ddd1c4";

            image.style.minHeight = "200px";

        });

    });


/* ================= INITIAL LOAD ================= */

updateBag();

