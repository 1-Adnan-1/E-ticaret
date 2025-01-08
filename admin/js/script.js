// Yeni kategori formunu göster
function showCategoryForm() {
  document.getElementById("category-form").style.display = "block";
}

// Yeni kategori formunu gizle
function hideCategoryForm() {
  document.getElementById("category-form").style.display = "none";
}

// Kategori ekleme işlemi
function addCategory() {
  const name = document.getElementById("category-name").value;
  const description = document.getElementById("category-description").value;

  if (name && description) {
    const categoryList = document.getElementById("category-list");

    // Yeni kategori satırı
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${description}</td>
        <td>
          <button class="btn-edit-category">Düzenle</button>
          <button class="btn-delete-category" onclick="deleteCategory(this)">Sil</button>
        </td>
      `;

    categoryList.appendChild(newRow);

    // Formu temizle ve gizle
    document.getElementById("category-name").value = "";
    document.getElementById("category-description").value = "";
    hideCategoryForm();
  } else {
    alert("Lütfen kategori adı ve açıklamasını girin.");
  }
}

// Kategoriyi silme
function deleteCategory(button) {
  const row = button.closest("tr");
  row.remove();
}
