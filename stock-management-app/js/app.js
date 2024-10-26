// app.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Ambil nilai input username dan password
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Logika login sederhana (untuk contoh, ganti sesuai kebutuhan)
        if (username === "admin" && password === "admin123") {
            // Redirect ke halaman dashboard setelah login berhasil
            window.location.href = "index.html";
        } else {
            // Tampilkan pesan error jika login gagal
            loginMessage.textContent = "Invalid username or password.";
            loginMessage.style.color = "red";
        }
    });
});
// app.js

document.addEventListener("DOMContentLoaded", () => {
    const addProductForm = document.getElementById("addProductForm");
    const productTableBody = document.getElementById("productTableBody");

    // Fungsi untuk menambahkan produk ke localStorage
    function addProductToLocalStorage(product) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
    }

    // Fungsi untuk memuat produk dari localStorage dan menampilkannya
    function loadProducts() {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        productTableBody.innerHTML = ""; // Kosongkan tabel sebelum menambahkan produk
        products.forEach((product, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.stock}</td>
                    <td>${product.price}</td>
                    <td>
                        <button class="btn btn-sm btn-warning">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${index})">Delete</button>
                    </td>
                </tr>
            `;
            productTableBody.innerHTML += row;
        });
    }

    // Fungsi untuk menghapus produk dari localStorage
    window.deleteProduct = function(index) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    }

    // Event Listener untuk menambahkan produk
    if (addProductForm) {
        addProductForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Ambil nilai dari input form
            const productName = document.getElementById("productName").value;
            const productCategory = document.getElementById("productCategory").value;
            const productStock = document.getElementById("productStock").value;
            const productPrice = document.getElementById("productPrice").value;

            // Buat objek produk
            const newProduct = {
                name: productName,
                category: productCategory,
                stock: parseInt(productStock),
                price: parseFloat(productPrice),
            };

            // Tambahkan produk ke localStorage
            addProductToLocalStorage(newProduct);

            // Redirect ke halaman produk setelah menambahkan
            window.location.href = "products.html";
        });
    }

    // Panggil fungsi untuk memuat produk saat halaman products.html dibuka
    if (productTableBody) {
        loadProducts();
    }
});
