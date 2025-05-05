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

  const handleTimelineSection = (section, lang) => {
    if ( section.title ) {
      page.querySelector(`#${section.title.placeholder}`).textContent = section.title.content[lang] ? section.title.content[lang] : section.title.content;
    }
    if ( section.subtitle ) {
      page.querySelector(`#${section.subtitle.placeholder}`).textContent = section.subtitle.content[lang] ? section.subtitle.content[lang] : section.subtitle.content;
    }
    if ( section.items ) {
      section.items.forEach(item => {
        if ( item.title ) {
          page.querySelector(`#${item.title.placeholder}`).textContent = item.title.content[lang] ? item.title.content[lang] : item.title.content;
        }
        if ( item.subtitle ) {
          page.querySelector(`#${item.subtitle.placeholder}`).textContent = item.subtitle.content[lang] ? item.subtitle.content[lang] : item.subtitle.content;
        }
        if ( item.description ) {
          let cont = page.querySelector(`#${item.description.placeholder}`);
          cont.innerHTML = "";
          let descContent = item.description.content[lang] ? item.description.content[lang] : item.description.content;
          descContent.forEach((par) => {
            let tempPar = document.createElement("p");
            tempPar.classList.add("timeline-item__description-item");
            tempPar.textContent = par;
            cont.append(tempPar);
          });
          
        }
      });
    }
  }

  const handleCardListSection = (section, lang) => {
    if ( section.title ) {
      page.querySelector(`#${section.title.placeholder}`).textContent = section.title.content[lang] ? section.title.content[lang] : section.title.content;
    }
    if ( section.subtitle ) {
      page.querySelector(`#${section.subtitle.placeholder}`).textContent = section.subtitle.content[lang] ? section.subtitle.content[lang] : section.subtitle.content;
    }
    if ( section.items ) {
      section.items.forEach(item => {
        if ( item.title ) {
          page.querySelector(`#${item.title.placeholder}`).textContent = item.title.content[lang] ? item.title.content[lang] : item.title.content;
        }
        if ( item.subtitle ) {
          page.querySelector(`#${item.subtitle.placeholder}`).textContent = item.subtitle.content[lang] ? item.subtitle.content[lang] : item.subtitle.content;
        }
        if ( item.detail ) {
          page.querySelector(`#${item.detail.placeholder}`).textContent = item.detail.content[lang] ? item.detail.content[lang] : item.detail.content;
        }
        if ( item.description ) {
          page.querySelector(`#${item.description.placeholder}`).textContent = item.description.content[lang] ? item.description.content[lang] : item.description.content;
        }
        if ( item.skill ) {
          let itemsCont = document.querySelector(`#${section.itemsPlaceholder}`);
          let newItem = document.createElement("div");
          newItem.classList.add("list-item");
          let skill = item.skill.content ? item.skill.content[lang] : item.skill;
          let perc = item.level ? item.level : 100;

          newItem.innerHTML = `
            <p class="list-item__title">${skill}</p>
            <span class="list-item__line">
            <span class="list-item__line_perc" style="width: ${perc}%"></span>
            </span>          
          `;
          itemsCont.append(newItem);
        }
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
    handleTimelineSection(data.work, lang);
    handleCardListSection(data.education, lang);
    handleCardListSection(data.skills, lang);

    
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
