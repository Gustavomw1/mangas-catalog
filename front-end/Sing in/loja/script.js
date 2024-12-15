document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search"); 
    const productNames = document.querySelectorAll(".product-name"); 
    const products = document.querySelectorAll(".product"); 

    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.toLowerCase().trim();

        products.forEach((product, index) => {
            const productName = productNames[index].textContent.toLowerCase();

            if (productName.includes(searchValue)) {
                product.style.display = "";
            } else {
                product.style.display = "none"; 
            }
        });
    });
});
