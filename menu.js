// Henter burger-ikonet, navigationen og menuen fra HTML
const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");
const menu = document.querySelector(".menu");

// Lytter efter klik på burger-ikonet og kalder burgerClick-funktionen
burger.addEventListener("click", burgerClick);

function burgerClick() {
  // Toggler "active"-klassen på burger-menuen for at ændre udseende (fx fra ☰ til ❌)
  burger.classList.toggle("active");

  // Toggler "active"-klassen på navigationen for at vise/skjule menuen
  nav.classList.toggle("active");
}

// Lytter efter klik på menuen (fx et link), og kalder menuClick-funktionen
menu.addEventListener("click", menuClick);

function menuClick() {
  // Fjerner "active"-klassen fra burger-ikonet (så den vender tilbage til ☰)
  burger.classList.remove("active");

  // Fjerner "active"-klassen fra navigationen, så menuen lukkes
  nav.classList.remove("active");
}
