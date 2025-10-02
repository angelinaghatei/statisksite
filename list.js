console.log("loaded");

const productContainer = document.querySelector(".produktliste.side-container");

const category = new URLSearchParams(window.location.search).get("category");
const baseUrl = "https://kea-alt-del.dk/t7/api/products?limit=32";
const url = category ? `${baseUrl}?category=${encodeURIComponent(category)}` : `${baseUrl}/`;

getData(url);

function getData(url) {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json();
    })
    .then((data) => showProducts(data))
    .catch((err) => console.error("Fetch error:", err));
}

function showProducts(products) {
  console.log("side-container", products);
  productContainer.innerHTML = ""; // ryd op

  products.forEach((product) => {
    const soldOutClass = product.soldout === 1 ? "udsolgt" : "";

    // beregn ny pris, hvis der er rabat
    let priceHTML = "";
    if (product.discount > 0) {
      const newPrice = Math.round(product.price * (1 - product.discount / 100));
      priceHTML = `
      <article class="pris">
        <p><span class="nupris">${newPrice} DKK</span> <span class="førpris">${product.price} DKK</span><span class="rabat">- ${product.discount}%</span></p>
      </article>
    `;
    } else {
      priceHTML = `<p class="pris">${product.price} DKK</p>`;
    }

    productContainer.innerHTML += `
    <article class="produktkort ${soldOutClass}">
      <a href="produkt.html?id=${product.id}">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
      </a>
      <h2>${product.productdisplayname}</h2>
        <article class="wrapper">
      <p class="brand">Mærke: ${product.brandname}</p>
      <p class="kategori">${product.articletype} : ${product.category}</p>
       ${priceHTML}
      ${product.soldout === 1 ? `<div class="sold_out"><p>Out of stock</p></div>` : ""}
      <p class="sellingfast>Selling fast!</p>
    </article>
      </article>
  `;
  });
}
