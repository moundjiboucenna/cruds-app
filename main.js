// Main Variables
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchByTitle = document.getElementById("search-title");
let searchByCategory = document.getElementById("search-category");
let btnDelete = document.getElementById("delete-all");
let tbody = document.getElementById("tbody");
let mood = "create";
let temp;

// Calculate Total
function calculateTotal() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = "#080";
    } else {
        total.innerHTML = "";
        total.style.background = "#8f0000";
    }
}

// Create Product
let products;
if (localStorage.product != null) {
    products = JSON.parse(localStorage.product);
} else {
    products = [];
}

submit.onclick = function () {
    let product = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    if (
        title.value != "" &&
        price.value != "" &&
        category.value != "" &&
        count.value <= 100
    ) {
        if (mood == "create") {
            if (product.count > 1) {
                for (let i = 0; i < product.count; i++) {
                    products.push(product);
                }
            } else {
                products.push(product);
            }
        } else {
            products[temp] = product;
            count.style.display = "block";
            mood = "create";
            submit.innerHTML = "Create";
        }
        clearInputs();
    }
    localStorage.setItem("product", JSON.stringify(products));
    showProducts();
};

// Clear Inputs After Create A Product
function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    total.style.background = "#8f0000";
    count.value = "";
    category.value = "";
}

// Show Products
function showProducts() {
    let table = "";
    for (let i = 0; i < products.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
            <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
    tbody.innerHTML = table;
    if (products.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteProducts()">Delete All (${products.length})</button>`;
    } else {
        btnDelete.innerHTML = "";
    }
}
showProducts();

// Delete Product
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.product = JSON.stringify(products);
    showProducts();
}

// Delete All Products
function deleteProducts() {
    products.splice(0);
    localStorage.clear();
    showProducts();
}

// Update Products
function updateProduct(index) {
    title.value = products[index].title;
    price.value = products[index].price;
    taxes.value = products[index].taxes;
    ads.value = products[index].ads;
    discount.value = products[index].discount;
    calculateTotal();
    count.style.display = "none";
    category.value = products[index].category;
    submit.innerHTML = "Update";
    mood = "update";
    temp = index;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

// Search
let searchMood = "title";
function getSearchMood(id) {
    if (id == "search-title") {
        searchMood = "title";
    } else {
        searchMood = "category";
    }
    search.focus();
    search.placeholder = document.getElementById(id).innerHTML;
    search.value = "";
    showProducts();
}

function searchProduct(value) {
    let table = "";
    for (let i = 0; i < products.length; i++) {
        if (searchMood == "title") {
            if (products[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                    </tr>
                `;
            }
        } else {
            if (products[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                    </tr>
                `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}