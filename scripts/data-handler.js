import data from "./components/resume.json" with { type: "json" };

window.addEventListener("load", () => {
  const getLang = () => {
    let language = sessionStorage.getItem("language") ? sessionStorage.getItem("language") : "en-US";
    if (sessionStorage.getItem("language") == null) {
      const userLocale =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;
      
      language = userLocale;
      sessionStorage.setItem("language", language ? language.substring(0, 2) : language);
    }

    document.querySelector("html").lang = language;
    return sessionStorage.getItem("language").substring(0, 2);
  }
  

  let lang = getLang();

  let page = document.querySelector(".page");

  const handleSection = (section) => {
    if ( section.title ) {
      page.querySelector(`#${section.title.placeholder}`).textContent = section.title.content[lang] ? section.title.content[lang] : section.title.content;
    }
    if ( section.image ) {
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
  handleSection(data.about);




});
