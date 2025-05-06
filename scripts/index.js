import "./data-handler.js";
import "./components/form.js";

window.addEventListener("load", () => {
  let today = new Date();
  let yearContainer = document.querySelector(".footer__year");
  yearContainer.textContent = today.getFullYear();

  let menu = document.querySelector(".menu");
  let menuHandler = document.querySelector(".menu-handler");

  menuHandler.addEventListener("click", () => {
    menu.classList.toggle("menu_active");
    menuHandler.classList.toggle("menu-handler_active");
  });
});
