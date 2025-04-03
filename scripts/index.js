import "./data-handler.js";

window.addEventListener("load", () => {
  let menu = document.querySelector(".menu");
  let menuHandler = document.querySelector(".menu-handler");

  menuHandler.addEventListener("click", () => {
    menu.classList.toggle("menu_active");
    menuHandler.classList.toggle("menu-handler_active");
  });

  /**
   *
   * Run section, identify templates, create elements, append elements.
   * menu
   * about
   * work
   * education
   * skills
   * languages
   * projects
   * contact
   *
   */
});
