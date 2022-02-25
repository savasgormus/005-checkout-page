const taxRate = 0.18;
const shippingPrice = 15.00;


window.addEventListener("load", () => {
    localStorage.setItem("taxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice);
    sessionStorage.setItem("taxRate", taxRate);
    sessionStorage.setItem("shippingPrice", shippingPrice);
}); 

// capturing yöntemi

let productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click",(e) => {
    let quantityP = e.target.parentElement.parentElement.querySelector("#product-quantity");
    // console.log(quantityP);
    // console.log(e.target)

// --- Minus Button---
    if( e.target.classList.contains("fa-minus") || 
        e.target == quantityP.parentElement.firstElementChild) 
        {
            if (quantityP.innerText > 1) {
                quantityP.innerText--;
                calculateProductTotal(quantityP)
            } else {
                if (confirm("Are you sure you want to delete this product?")) {
                    quantityP.parentElement.parentElement.parentElement.remove();
                }
            }
            // console.log("minus");

//--- Plus Button ---
    } else if (e.target.classList.contains("fa-plus")
        || e.target == quantityP.parentElement.lastElementChild)
        {
            quantityP.innerText++;
            calculateProductTotal(quantityP);
            // console.log("plus");
            
//--- Remove Button ---           
        } else if (e.target.className == "remove-product") {
            if (confirm("Are you sure you want to delete this product?")) {
            quantityP.parentElement.parentElement.parentElement.remove();
            calculateProductTotal();
        }
    }
});


// --- Calculate Cart and Product Total ---

const calculateProductTotal = (quantityP) => {
    let productPrice = 
        quantityP.parentElement.parentElement.querySelector("strong");
    let productTotalPriceDiv =
        quantityP.parentElement.parentElement.querySelector(".product-line-price");

    productTotalPriceDiv.innerText =
        (quantityP.innerText * productPrice.innerText).toFixed(2);
        
    calculateCartTotal();
};

const calculateCartTotal = () => {
    let productTotalPriceDivs = document.querySelectorAll(".product-line-price");
    let subtotal = 0;

    productTotalPriceDivs.forEach((eachproduct) => {
        subtotal += parseFloat(eachproduct.innerText);
    }); 

    let taxPrice = subtotal * localStorage.getItem("taxRate");
    let shipping = 
        subtotal > 0 ? parseFloat(localStorage.getItem("shippingPrice")) : 0;
    let cartTotal = subtotal + taxPrice + shippingPrice;

    document.querySelector("#cart-subtotal p:nth-child(2)").innerText =
    subtotal.toFixed(2);
    document.querySelector("#cart-tax p:nth-child(2)").innerText =
    taxPrice.toFixed(2);
    document.querySelector("#cart-shipping p:nth-child(2)").innerText =
    shipping.toFixed(2);
    document.querySelector("#cart-total").lastElementChild.innerText =
    cartTotal.toFixed(2);
}