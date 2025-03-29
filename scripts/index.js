window.addEventListener("load", () => {
  let menu = document.querySelector(".menu");
  let menuHandler = menu.querySelector(".menu-handler");

  menuHandler.addEventListener("click", () => {
    menu.classList.toggle("menu_active");
  });
});
