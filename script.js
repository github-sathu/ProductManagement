let products = [];
let isUpdate = false;
let updateId = null;

window.onload = function () {
  fetchAllProducts();
};

document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let id = document.getElementById("id").value.trim();
  let name = document.getElementById("name").value.trim();
  let quantity = document.getElementById("quantity").value.trim();
  let stock = document.getElementById("stock").value;

  if (!id || !name || !quantity || !stock) {
    showMessage("All fields are required.", "error");
    return;
  }

  const product = {
    productId: parseInt(id),
    name: name,
    quantity: parseInt(quantity),
    stock: stock
  };

  if (isUpdate) {
    // UPDATE
    fetch(`http://localhost:8016/product`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(() => {
        showMessage("✅ Product updated!", "success");
        this.reset();
        toggleUpdateButton(false);
        fetchAllProducts();
      })
      .catch(err => {
        console.error(err);
        showMessage("❌ Update failed.", "error");
      });
  } else {
    // CREATE
    fetch("http://localhost:8016/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(() => {
        showMessage("✅ Product saved!", "success");
        this.reset();
        fetchAllProducts();
      })
      .catch(err => {
        console.error(err);
        showMessage("❌ Save failed.", "error");
      });
  }
});

// Load all products
function fetchAllProducts() {
  fetch("http://localhost:8016/product")
    .then(res => res.json())
    .then(data => {
      products = data;
      renderTable();
    })
    .catch(err => {
      console.error(err);
      showMessage("❌ Failed to load data.", "error");
    });
}

// Render product table
function renderTable() {
  const tbody = document.querySelector("#productlist tbody");
  tbody.innerHTML = "";

  products.forEach(product => {
    const row = `<tr>
      <td>${product.productId}</td>
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>${product.stock}</td>
      <td class="action-btns">
        <button onclick="editProduct(${product.productId})">Edit</button>
        <button onclick="deleteProduct(${product.productId})">Delete</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Edit product
function editProduct(id) {
  const product = products.find(p => p.productId === id);
  if (!product) return;

  document.getElementById("id").value = product.productId;
  document.getElementById("name").value = product.name;
  document.getElementById("quantity").value = product.quantity;
  document.getElementById("stock").value = product.stock;

  toggleUpdateButton(true);
  isUpdate = true;
  updateId = id;
}

// Delete product
function deleteStudent(index) {
    students.splice(index, 1);
    renderTable();
    showMessage("🗑️ Student deleted successfully!", "success");
}
// Show update button or not
function toggleUpdateButton(show) {
  document.getElementById("updateBtn").style.display = show ? "inline-block" : "none";
}

// Show message
function showMessage(msg, type) {
  const msgDiv = document.getElementById("message");
  msgDiv.textContent = msg;
  msgDiv.className = type;

  setTimeout(() => {
    msgDiv.textContent = "";
    msgDiv.className = "";
  }, 3000);
}
