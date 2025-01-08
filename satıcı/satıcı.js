// Sipariş Yönetimi Script
document.addEventListener("DOMContentLoaded", () => {
  const siparisEkleBtn = document.querySelector(".modern-btn");
  const siparisAdiInput = document.getElementById("siparisAdi");
  const siparisMiktarInput = document.getElementById("siparisMiktar");
  const siparisFiyatInput = document.getElementById("siparisFiyat");
  const siparisTablosu = document.querySelector(".modern-table tbody");

  // Sipariş Ekleme Fonksiyonu
  siparisEkleBtn.addEventListener("click", () => {
    const siparisAdi = siparisAdiInput.value.trim();
    const siparisMiktar = siparisMiktarInput.value.trim();
    const siparisFiyat = siparisFiyatInput.value.trim();

    // Form Kontrolü
    if (!siparisAdi || !siparisMiktar || !siparisFiyat) {
      alert("Lütfen tüm alanları doldurunuz!");
      return;
    }

    // Yeni Satır Oluştur
    const yeniSatir = document.createElement("tr");
    yeniSatir.innerHTML = `
        <td>${siparisAdi}</td>
        <td>${siparisMiktar}</td>
        <td>${siparisFiyat} TL</td>
        <td><span class="status preparing">Hazırlanıyor</span></td>
        <td>
          <button class="modern-action-btn update">Güncelle</button>
          <button class="modern-action-btn delete">Sil</button>
        </td>
      `;

    // Tabloya Eklemek
    siparisTablosu.appendChild(yeniSatir);

    // Form Temizleme
    siparisAdiInput.value = "";
    siparisMiktarInput.value = "";
    siparisFiyatInput.value = "";

    // Yeni Satır İşlevselliği Eklemek
    satirIslevselligiEkle(yeniSatir);
  });

  // Satır İşlevsellik Fonksiyonu
  const satirIslevselligiEkle = (satir) => {
    const guncelleBtn = satir.querySelector(".update");
    const silBtn = satir.querySelector(".delete");

    // Güncelleme İşlevselliği
    guncelleBtn.addEventListener("click", () => {
      const mevcutAdi = satir.children[0].textContent;
      const mevcutMiktar = satir.children[1].textContent;
      const mevcutFiyat = satir.children[2].textContent.replace(" TL", "");

      // Inputlara Mevcut Değerleri Atamak
      siparisAdiInput.value = mevcutAdi;
      siparisMiktarInput.value = mevcutMiktar;
      siparisFiyatInput.value = mevcutFiyat;

      // Tablodan Sil
      satir.remove();
    });

    // Silme İşlevselliği
    silBtn.addEventListener("click", () => {
      if (confirm("Bu siparişi silmek istediğinizden emin misiniz?")) {
        satir.remove();
      }
    });
  };

  // Mevcut Satırlara İşlevsellik Eklemek
  document
    .querySelectorAll(".modern-table tbody tr")
    .forEach(satirIslevselligiEkle);
});

// ! Finans
document.addEventListener("DOMContentLoaded", () => {
  const transactionNameInput = document.getElementById("transactionName");
  const transactionAmountInput = document.getElementById("transactionAmount");
  const transactionTypeSelect = document.getElementById("transactionType");
  const totalIncomeElem = document.getElementById("totalIncome");
  const totalExpenseElem = document.getElementById("totalExpense");
  const netProfitElem = document.getElementById("netProfit");
  const transactionTableBody = document.querySelector(".modern-table tbody");
  let totalIncome = 0;
  let totalExpense = 0;

  // İşlem Ekleme Fonksiyonu
  document.querySelector(".modern-btn").addEventListener("click", () => {
    const transactionName = transactionNameInput.value.trim();
    const transactionAmount = parseFloat(transactionAmountInput.value.trim());
    const transactionType = transactionTypeSelect.value;

    if (!transactionName || isNaN(transactionAmount)) {
      alert("Lütfen tüm alanları doğru doldurunuz!");
      return;
    }

    // İşlem Türüne Göre Toplamları Güncelle
    if (transactionType === "income") {
      totalIncome += transactionAmount;
    } else if (transactionType === "expense") {
      totalExpense += transactionAmount;
    }

    // Finans Durumunu Güncelle
    updateFinanceSummary();

    // Yeni Satır Oluştur
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${transactionName}</td>
      <td>${transactionAmount.toFixed(2)} TL</td>
      <td>${transactionType === "income" ? "Gelir" : "Gider"}</td>
      <td>
        <button class="delete-btn">Sil</button>
      </td>
    `;
    transactionTableBody.appendChild(newRow);

    // Silme İşlevini Eklemek
    const deleteBtn = newRow.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      // İşlem Türüne Göre Toplamları Azalt
      if (transactionType === "income") {
        totalIncome -= transactionAmount;
      } else if (transactionType === "expense") {
        totalExpense -= transactionAmount;
      }

      // Satırı Sil ve Finans Durumunu Güncelle
      newRow.remove();
      updateFinanceSummary();
    });

    // Formu Temizle
    transactionNameInput.value = "";
    transactionAmountInput.value = "";
  });

  // Finans Durumunu Güncelleme Fonksiyonu
  function updateFinanceSummary() {
    totalIncomeElem.textContent = `₺${totalIncome.toFixed(2)}`;
    totalExpenseElem.textContent = `₺${totalExpense.toFixed(2)}`;
    netProfitElem.textContent = `₺${(totalIncome - totalExpense).toFixed(2)}`;
  }
});
