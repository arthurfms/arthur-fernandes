import data from "./components/resume.json" with { type: "json" };

window.addEventListener("load", () => {

  const getLang = () => {
    let language = sessionStorage.getItem("language") ? sessionStorage.getItem("language") : "en";

    if (sessionStorage.getItem("language") == null) {
      const userLocale =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;
      
      language = userLocale;
      sessionStorage.setItem("language", language ? language.substring(0, 2) : "en");
    }

    document.querySelector("html").lang = language;
    return sessionStorage.getItem("language").substring(0, 2);
  }

  

  let language = getLang();

  let page = document.querySelector(".page");

  const handleSection = (section, lang) => {
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

  const generatePage = (lang) => {
    page.classList.add("page_loading");
    sessionStorage.setItem("language", lang);

    setTimeout(() => {
    let langItems = document.querySelectorAll(".languages-handler__item");

    langItems.forEach(item => {
      let itemLang = item.id.substring(item.id.length - 2);
      itemLang == lang ? item.classList.add("languages-handler__item_active") : item.classList.remove("languages-handler__item_active");
    });
     
    // Handle items
    handleSection(data.menu, lang);
    handleSection(data.about, lang);

    
      page.classList.remove("page_loading");
    }, 150);
    
  }

  generatePage(language);

  document.querySelectorAll(".languages-handler__item").forEach(langItem => {
    langItem.addEventListener("click", (evt) => {
      let lang = evt.target.id.substring(evt.target.id.length - 2);
      generatePage(lang);
    });
  });
});
