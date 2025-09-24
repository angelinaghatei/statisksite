const produkter = [
  {
    id: 1,
    navn: "Trænings T-shirt",
    pris: "349 kr,-",
    beskrivelse: "",
    billede: "img/ttshirt.webp",
  },
  {
    id: 2,
    navn: "Trænings Top",
    pris: "379 kr,-",
    beskrivelse: "",
    billede: "img/træningstop.webp",
  },
  {
    id: 3,
    navn: "Trænings sæt",
    pris: "559 kr,-",
    beskrivelse: "",
    billede: "img/træningstøj.webp",
  },
  {
    id: 4,
    navn: "Trænings Bukser",
    pris: "429 kr,-",
    beskrivelse: "",
    billede: "img/træningsbukser.webp",
  },
  {
    id: 5,
    navn: "Tank top",
    pris: "479 kr,-",
    beskrivelse: "",
    billede: "img/tanktop.webp",
  },
  {
    id: 6,
    navn: "Trænings t-shirt",
    pris: "329 kr,-",
    beskrivelse: "",
    billede: "img/tshirt.webp",
  },
  {
    id: 7,
    navn: "Trænings Bukser",
    pris: "649 kr,-",
    beskrivelse: "",
    billede: "img/bukser.webp",
  },
  {
    id: 8,
    navn: "Trænings shorts",
    pris: "399 kr,-",
    beskrivelse: "",
    billede: "img/shorts.webp",
  },
  {
    id: 9,
    navn: "Trænings sko",
    pris: "699 kr,-",
    beskrivelse: "",
    billede: "img/hvidsko.webp",
  },
  {
    id: 10,
    navn: "Fodbold støvler",
    pris: "899 kr,-",
    beskrivelse: "",
    billede: "img/rødsko.webp",
  },
  {
    id: 11,
    navn: "Fodbold støvler",
    pris: "899 kr,-",
    beskrivelse: "",
    billede: "img/sko.webp",
  },
  {
    id: 12,
    navn: "Fodbold støvler",
    pris: "899 kr,-",
    beskrivelse: "",
    billede: "img/træningssko.webp",
  },
];

// Finder produkt-id fra URL’en
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// Finder produkt i listen
const produkt = produkter.find((p) => p.id === id);

// Viser produktet
const container = document.getElementById("produkt");

if (produkt) {
  container.innerHTML = `
   
    <h1 class="overskrift">Produkt</h1>
     <article class="produkt-detalje">
      <h2>${produkt.navn}</h2>
      <img src="${produkt.billede}" alt="${produkt.navn}">
      <p class="pris">${produkt.pris}</p>
      <p>${produkt.beskrivelse}</p>
      <button>Læg i kurv</button>
    </article>
  `;
} else {
  container.innerHTML = `<p>Produktet blev ikke fundet.</p>`;
}
