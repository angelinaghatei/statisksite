console.log("forside.js loaded");

const categoryContainer = document.querySelector(".kategori-container");

const categoryUrls = {
  Accessories: "https://kea-alt-del.dk/t7/api/products?subcategory=Accessories",
  Backpacks: "https://kea-alt-del.dk/t7/api/products?articletype=Backpacks",
  Tshirts: "https://kea-alt-del.dk/t7/api/products?category=Apparel",
  Footwear: "https://kea-alt-del.dk/t7/api/products?category=Footwear",
  Nike: "https://kea-alt-del.dk/t7/api/products?brandname=Nike",
  Puma: "https://kea-alt-del.dk/t7/api/products?brandname=Puma",
};
console.log("forside.js loaded");

// Indsæt kategorier i kategori-container
Object.keys(categoryUrls).forEach((cat) => {
  categoryContainer.innerHTML += `
    <article class="kategori-style">
      <h2>${cat}</h2>
    </article>
  `;
});

// Klik-event på hver kategori
document.querySelectorAll(".kategori-style").forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelectorAll(".kategori-style").forEach((c) => c.classList.remove("active"));
    el.classList.add("active");

    const categoryName = el.querySelector("h2").textContent.trim();
    console.log("Henter data for:", categoryName);
    getData(categoryUrls[categoryName]);
  });
});

// Hent og vis produkter
function getData(url) {
  console.log("Fetcher fra:", url);
  fetch(url)
    .then((res) => res.json())
    .then((products) => {
      const list = document.querySelector("#product_list_container");
      list.innerHTML = "";
      products.forEach((p) => {
        // Rabatlogik – samme som på produktliste
        let priceHTML = `<p class="pris">${p.price} DKK</p>`;
        if (p.discount && p.discount > 0) {
          const newPrice = Math.round(p.price - (p.price * p.discount) / 100);
          priceHTML = `
      
           <article class="wrapper">
            <p class="pris">
              <span class="nupris">${newPrice} DKK</span>
              <span class="førpris">${p.price} DKK</span>
              <span class="rabat">-${p.discount}%</span>
            </p>
              </article>
        
          `;
        }

        list.innerHTML += `
          <article class="produktkort ${p.soldout === 1 ? "udsolgt" : ""}">

            <a href="produkt.html?id=${p.id}">
              <img src="https://kea-alt-del.dk/t7/images/webp/640/${p.id}.webp" 
                   alt="${p.productdisplayname}">
            </a>
             
            <h2>${p.productdisplayname}</h2>
               <article class="wrapper">
            <p class="brand">Mærke: ${p.brandname}</p>
            ${priceHTML}
            ${p.soldout === 1 ? `<div class="sold_out"><p>Out of stock</p></div>` : ""}
              <p class="sellingfast">Selling fast!</p>
            </article>
               </article>
        `;
      });
    })
    .catch((err) => console.error("Fejl i fetch:", err));
}
