// Ürünleri saklayacak değişken
let allProducts = [];

// Modal elementlerini seçme
const modal = document.getElementById("product-modal");
const closeBtn = document.querySelector(".close-btn");
const addProductBtn = document.getElementById("add-product-btn");
const productForm = document.getElementById("product-form");
const searchInput = document.getElementById("search-input"); // Arama inputu

// Modal'ı açma
addProductBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// Modal'ı kapatma
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Form gönderildiğinde yeni ürün ekleme
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const image = document.getElementById("product-image").value;
  const title = document.getElementById("product-title").value;
  const price = document.getElementById("product-price").value;

  if (image && title && price) {
    addNewProduct(image, title, parseFloat(price).toFixed(2));
    modal.style.display = "none";
    productForm.reset();
  } else {
    alert("Lütfen tüm alanları doldurun!");
  }
});

// Arama işlevi
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  displayProducts(filteredProducts);
});

// API'den ürünleri çekme
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((products) => {
    allProducts = products;
    displayProducts(allProducts); // Tüm ürünleri başta göster
  })
  .catch((error) => console.error("API Error:", error));

// Tüm ürünleri gösterme fonksiyonu
function displayProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productDiv = createProductElement(product);
    productList.appendChild(productDiv);
  });
}

// Yeni ürün ekleme
function addNewProduct(image, title, price) {
  const newProduct = {
    id: allProducts.length + 1,
    image,
    title,
    price,
  };

  allProducts.unshift(newProduct);
  displayProducts(allProducts);
}

// Ürün HTML elementini oluşturma
function createProductElement(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  productDiv.innerHTML = `
    <img src="${product.image}" alt="Product Image">
    <div class="product-info">
      <h3 class="product-title">${product.title}</h3>
      <p class="price">$${product.price}</p>
    <div>
     <button class="edit-btn" data-id="${product.id}">Düzenle</button>
      <button class="delete-btn" data-id="${product.id}">Sil</button>
     </div>
    </div>
  `;

  // Silme işlemi
  const deleteBtn = productDiv.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteProduct(product.id);
  });

  // Düzenleme işlemi
  const editBtn = productDiv.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    editProduct(product.id);
  });

  return productDiv;
}

// Ürünü silme fonksiyonu
function deleteProduct(productId) {
  allProducts = allProducts.filter((product) => product.id !== productId);
  displayProducts(allProducts);
}

// Ürünü düzenleme fonksiyonu
function editProduct(productId) {
  const product = allProducts.find((p) => p.id === productId);

  if (product) {
    const newTitle = prompt("Yeni başlık girin:", product.title);
    const newPrice = prompt("Yeni fiyat girin:", product.price);

    if (newTitle !== null && newPrice !== null) {
      product.title = newTitle;
      product.price = parseFloat(newPrice).toFixed(2);

      displayProducts(allProducts); // Listeyi güncelle
    } else {
      alert("Düzenleme işlemi iptal edildi.");
    }
  }
}
