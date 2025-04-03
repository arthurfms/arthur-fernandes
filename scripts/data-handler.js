import data from "./components/resume.json" with { type: "json" };

window.addEventListener("load", () => {
  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language;
  let lang = userLocale ? userLocale.substring(0, 2) : "en";
  
  let page = document.querySelector(".page");


  /**
   * Change approach to add the content information and not to add new elements
   */


  const handleSection = (section) => {
    if ( section.title ) {
      page.querySelector(`#${section.title.placeholder}`).textContent = section.title.content[lang] ? section.title.content[lang] : section.title.content;
    }
    if ( section.image ) {
      console.log(section.image);
      page.querySelector(`#${section.image.placeholder}`).alt = section.image.alt[lang] ? section.image.alt[lang] : section.image.alt;
    }
    if ( section.items ) {
      section.items.forEach(item => {
        page.querySelector(`#${item.placeholder}`).textContent = item.content[lang] ? item.content[lang] : item.content;
      });
    }
  }

  // Handle menu items
  handleSection(data.menu);
  handleSection(data.profile);




});
