console.log("single.js loaded");

// 1. Fang id fra URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// 2. Lav base-URL til API
const url = `https://kea-alt-del.dk/t7/api/products/${id}`;

// 3. Fang container i HTML
const detailContainer = document.querySelector(".produkt-detalje-container");

// 4. Hent data for produktet
fetch(url)
  .then((res) => res.json())
  .then((product) => showProduct(product));
function showProduct(product) {
  console.log("produkt:", product);

  // beregn ny pris hvis der er rabat
  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount ? Math.round(product.price - (product.price * product.discount) / 100) : product.price;

  detailContainer.innerHTML = `
              <a href="javascript:history.back()" class="back-link">← Gå tilbage</a>
    <article class="produkt-detalje">
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" 
           alt="${product.productdisplayname}">
      <h2>${product.productdisplayname}</h2>
      <p>Brand: ${product.brandname}</p>

      <p class="pris">
        ${
          hasDiscount
            ? `<span class="førpris">${product.price} DKK</span> 
             <span class="nupris">${discountedPrice} DKK</span> 
             <span class="rabat">-${product.discount}%</span>`
            : `${product.price} DKK`
        }
      </p>

      <p>Produkt ID: ${product.id}</p>
      <p>${product.description || "Ingen beskrivelse tilgængelig."}</p>
    </article>
  `;
}
