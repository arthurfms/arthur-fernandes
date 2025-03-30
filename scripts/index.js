window.addEventListener("load", () => {
  let menu = document.querySelector(".menu");
  let menuHandler = document.querySelector(".menu-handler");

  menuHandler.addEventListener("click", () => {
    menu.classList.toggle("menu_active");
    menuHandler.classList.toggle("menu-handler_active");
  });
});
