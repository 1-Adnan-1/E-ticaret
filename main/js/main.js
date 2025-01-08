const categoriesButton = document.getElementById("categories-button");
const closeButton = document.getElementById("close-button");
// Popup'ı açma
const loginBtn = document.getElementById("loginBtn");
const loginPopup = document.getElementById("loginPopup");
const closeBtn = document.getElementById("closeBtn");
const cancelBtn = document.getElementById("cancelBtn");
const loginForm = document.getElementById("loginForm");

// "Giriş Yap" butonuna tıklandığında popup'ı göster
loginBtn.addEventListener("click", () => {
  loginPopup.style.display = "flex";
});

// Kapatma butonuna tıklandığında popup'ı gizle
closeBtn.addEventListener("click", () => {
  loginPopup.style.display = "none";
});

// İptal butonuna tıklandığında popup'ı gizle ve formu sıfırla
cancelBtn.addEventListener("click", () => {
  loginPopup.style.display = "none";
  loginForm.reset(); // Formu sıfırlar
});

// Popup dışında bir yere tıklanırsa popup'ı kapat
window.addEventListener("click", (event) => {
  if (event.target === loginPopup) {
    loginPopup.style.display = "none";
    loginForm.reset(); // Formu sıfırlar
  }
});
document.getElementById("logo").addEventListener("click", function () {
  location.reload(); // Sayfayı yeniden yükler
});

// Kategorilerde seçili durumu ayarlama
const kategoriLinks = document.querySelectorAll(".kategori a");

kategoriLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Tüm kategorilerden "selected" sınıfını kaldır
    kategoriLinks.forEach((link) => link.classList.remove("selected"));

    // Tıklanan kategoriye "selected" sınıfını ekle
    this.classList.add("selected");
  });
});

// Alışveriş  için aktif sınıfı eklemek
const links = document.querySelectorAll(".alışveriş a");
links.forEach((link) => {
  link.addEventListener("click", function (e) {
    // Her bağlantıyı "active" sınıfından temizle
    links.forEach((l) => l.classList.remove("active"));
    // Tıklanan bağlantıya "active" sınıfı ekle
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    this.classList.add("active");
  });
});

// Butonlar için aktif sınıfı eklemek
const buttons = document.querySelectorAll(".butonlar h3");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // Tüm butonlardan "active" sınıfını kaldır
    buttons.forEach((b) => b.classList.remove("active"));
    // Tıklanan butona "active" sınıfı ekle
    this.classList.add("active");
  });
});

//!
// Favorilere ekleme fonksiyonu
function addToFavorites(productId) {
  const product = allProducts.find((prod) => prod.id === parseInt(productId));

  // Eğer ürün zaten favorilerde yoksa ekleyelim
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.find((fav) => fav.id === product.id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Favorilere ekle
  }
}
// Ürünleri saklayacak değişken
let allProducts = [];

// API'den ürünleri çekme
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((products) => {
    allProducts = products;
    displayAllProducts(); // Tüm ürünleri başta göster

    // Ürünler üzerinden döngü kurarak HTML'e ekleme
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      // Ürün verisini HTML'e ekleme
      productDiv.innerHTML = `
        <img src="${product.image}" alt="">
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="description">${product.description}</p>
          <div class="rating">
            ${getStars(product.rating.rate)}
            <span class="rating-value">(${product.rating.rate})</span>
          </div>
          <p class="price">$${product.price}</p>
           <span class="favorite-icon">
           <i class="bi bi-heart-fill"></i>
          </span>
          <button class="add-to-cart" data-id="${
            product.id
          }">Sepete Ekle</button>
        </div>
      `;

      document.getElementById("product-list").appendChild(productDiv);

      // Favori ikonu için tıklama işlemi
      const favoriteIcons = document.querySelectorAll(".favorite-icon i");
      favoriteIcons.forEach((icon) => {
        icon.addEventListener("click", (e) => {
          const productId = e.target.dataset.id;
          addToFavorites(productId); // Ürünü favorilere ekle
        });
      });
    });
  })

  .catch((error) => console.error("API Error:", error));

// Yıldızları göstermek için fonksiyon
function getStars(rating) {
  const fullStars = Math.floor(rating); // Tam yıldız sayısı
  const emptyStars = 5 - fullStars; // Boş yıldız sayısı
  let stars = "";

  // Tam yıldızları ekle
  for (let i = 0; i < fullStars; i++) {
    stars += `<span class="star filled">&#9733;</span>`; // Dolu yıldız
  }

  // Boş yıldızları ekle
  for (let i = 0; i < emptyStars; i++) {
    stars += `<span class="star">&#9733;</span>`; // Boş yıldız
  }

  return stars;
}

// Tüm ürünleri gösterme fonksiyonu
function displayAllProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  allProducts.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    // Ürünler üzerinden döngü kurarak HTML'e ekleme
    productDiv.innerHTML = `
      <img src="${product.image}" alt="">
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="description">${product.description}</p>
        <div class="rating">
          ${getStars(product.rating.rate)}
          <span class="rating-value">(${product.rating.rate})</span>
        </div>
        <p class="price">$${product.price}</p>
         <span class="favorite-icon">
      <i class="bi bi-heart-fill"></i>
    </span>
        <button class="add-to-cart" data-id="${product.id}">Sepete Ekle</button>
      </div>
    `;
    document.getElementById("product-list").appendChild(productDiv);

    // Favori ikonu için tıklama işlemi
    const favoriteIcons = document.querySelectorAll(".favorite-icon i");
    favoriteIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const productId = e.target.dataset.id;
        addToFavorites(productId); // Ürünü favorilere ekle
      });
    });
    productList.appendChild(productDiv);
  });
}

// Rastgele 4 ürün seçme fonksiyonu
function getRandomProducts(count = 4) {
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random()); // Ürünleri karıştır
  return shuffled.slice(0, count); // İlk 'count' kadarını seç, varsayılan 4
}

// Sepete En Çok Eklenen Ürünler butonuna tıklama işlemi
document.getElementById("most-added").addEventListener("click", () => {
  const randomProducts = getRandomProducts();
  displayRandomProducts(randomProducts); // Rastgele ürünleri ekranda göster
});

// En Çok Öne Çıkanlar butonuna tıklama işlemi
document.getElementById("most-featured").addEventListener("click", () => {
  const randomProducts = getRandomProducts();
  displayRandomProducts(randomProducts); // Rastgele ürünleri ekranda göster
});

// Flaş Ürünler butonuna tıklama işlemi
document.getElementById("flash-products").addEventListener("click", () => {
  const randomProducts = getRandomProducts();
  displayRandomProducts(randomProducts); // Rastgele ürünleri ekranda göster
});

// Rastgele ürünleri ekranda gösterme fonksiyonu
function displayRandomProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Önceki ürünleri temizle

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${product.image}" alt="">
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="description">${product.description}</p>
        <div class="rating">
          ${getStars(product.rating.rate)}
          <span class="rating-value">(${product.rating.rate})</span>
        </div>
        <p class="price">$${product.price}</p>
         <span class="favorite-icon">
      <i class="bi bi-heart-fill"></i>
    </span>
        <button class="add-to-cart" data-id="${product.id}">Sepete Ekle</button>
      </div>
    `;
    document.getElementById("product-list").appendChild(productDiv);

    // Favori ikonu için tıklama işlemi
    const favoriteIcons = document.querySelectorAll(".favorite-icon i");
    favoriteIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const productId = e.target.dataset.id;
        addToFavorites(productId); // Ürünü favorilere ekle
      });
    });
    productList.appendChild(productDiv);
  });
}

// Arama inputu ve butonu
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Arama işlevini tetikleyen fonksiyon
function searchProducts() {
  const query = searchInput.value.toLowerCase(); // Kullanıcının arama sorgusunu al
  const filteredProducts = allProducts.filter((product) => {
    // Ürün adları ve açıklamaları üzerinde arama yap
    return (
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  // Filtrelenen ürünleri ekrana
  displayFilteredProducts(filteredProducts);

  // Arama sonuçları geldikten sonra inputu temizle
  searchInput.value = "";
}

// Arama inputu üzerinde Enter tuşuna basıldığında arama işlemini yap
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchProducts();
  }
});

// Arama butonuna tıklanıldığında arama işlemini yap
searchButton.addEventListener("click", searchProducts);

// Filtrelenen ürünleri ekranda gösterme fonksiyonu
function displayFilteredProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Önceki ürünleri temizle

  // Filtrelenen her ürün için HTML oluştur
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${product.image}" alt="">
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="description">${product.description}</p>
        <div class="rating">
          ${getStars(product.rating.rate)}
          <span class="rating-value">(${product.rating.rate})</span>
        </div>
        <p class="price">$${product.price}</p>
         <span class="favorite-icon">
      <i class="bi bi-heart-fill"></i>
    </span>
        <button class="add-to-cart" data-id="${product.id}">Sepete Ekle</button>
      </div>
    `;
    document.getElementById("product-list").appendChild(productDiv);

    // Favori ikonu için tıklama işlemi
    const favoriteIcons = document.querySelectorAll(".favorite-icon i");
    favoriteIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const productId = e.target.dataset.id;
        addToFavorites(productId); // Ürünü favorilere ekle
      });
    });
    productList.appendChild(productDiv);
  });
}

// Kategorilere tıklanıldığında random ürün göster
kategoriLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // Tüm kategorilerden "selected" sınıfını kaldır
    kategoriLinks.forEach((link) => link.classList.remove("selected"));

    // Tıklanan kategoriye "selected" sınıfını ekle
    this.classList.add("selected");

    // Rastgele ürünleri al ve göster
    const randomProducts = getRandomProducts();
    displayRandomProducts(randomProducts); // Rastgele ürünleri ekranda göster
  });
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

// Show/Hide Button Based on Scroll Position
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.add("hidden");
  }
});

// Scroll to Top on Click
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
