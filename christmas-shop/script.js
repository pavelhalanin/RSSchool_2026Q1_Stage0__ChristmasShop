class ChristmasShop_Burger {
  static openOrCloseBurger() {
    try {
      const HEDER_BUTTON = document.getElementById("cs_header__button");
      if (!HEDER_BUTTON) {
        console.error("Не найден узел: #cs_header__button");
        alert(`Не найден узел: #cs_header__button`);
        return;
      }

      const NAV = document.getElementById("cs_header__nav");
      if (!NAV) {
        console.error("Не найден узел: #cs_header__nav");
        alert(`Не найден узел: #cs_header__nav`);
        return;
      }

      const IS_OPENED =
        HEDER_BUTTON.getAttribute("data-is-menu-open") == "true";

      const BODY = document.querySelector("body");

      if (IS_OPENED) {
        HEDER_BUTTON.setAttribute("data-is-menu-open", "false");
        BODY.classList.remove("cs_header__no_scroll_body");
      }

      if (!IS_OPENED) {
        HEDER_BUTTON.setAttribute("data-is-menu-open", "true");
        BODY.classList.add("cs_header__no_scroll_body");
      }
    } catch (exception) {
      console.error(exception);
    }
  }
}

class ChristmasShop_BestGifts {
  static async renderRandom() {
    const UL = document.getElementById("cs_main_best_section__random");
    if (!UL) {
      console.error(`Узел не найден #cs_main_best_section__random`);
      return;
    }
    try {
      console.log("Получаем данные по API");
      const RANDOM_ARRAY = await this.getRandom4();
      console.log("Получили данные по API");

      console.log("Вставляем данные в UL");
      UL.innerHTML = RANDOM_ARRAY.map((e) => {
        const IMAGE = {
          "For Harmony": "./assets/home-page/best-section/gift-for-harmony.png",
          "For Health": "./assets/home-page/best-section/gift-for-health.png",
          "For Work": "./assets/home-page/best-section/gift-for-work.png",
        }[`${e.category}`];

        const TEXT = [
          `Name: ${e.name}`,
          `Description: ${e.description}`,
          `Category: ${e.category}`,
          `Superpowers:`,
          ` - live: ${e.superpowers.live}`,
          ` - create: ${e.superpowers.create}`,
          ` - love: ${e.superpowers.love}`,
          ` - dream: ${e.superpowers.dream}`,
        ].join("\n");

        return /* html */ `
        <li data-status="${e.category}">
          <button onclick="alert(\`${TEXT}\`)">
            <span class="cs_array_gifts__image">
              <img src="${IMAGE}" alt="no img ${e.category}">
            </span>
            <span class="cs_array_gifts__text_block">
              <span class="cs_array_gifts__status typography--header-4">${e.category}</span>
              <span class="cs_array_gifts__name typography--header-3">${e.name}</span>
            </span>
          </button>
        </li>
      `;
      }).join("");
      console.log("Вставили в UL");
    } catch (exception) {
      UL.innerHTML = `${exception}`;
      return;
    }
  }

  static async getRandom4() {
    const ARRAY = await this.fetchGifts();
    return ARRAY.sort(() => Math.random() - 0.5).slice(0, 4);
  }

  static async fetchGifts() {
    const URL_ =
      "/pavelhalanin-JSFEPRESCHOOL2026Q1/christmas-shop/api/gifts.json";
    const RESPONSE = await fetch(URL_);
    const HTTP_STATUS = RESPONSE.status;
    if (HTTP_STATUS != 200) {
      const TEXT = await RESPONSE.text();
      throw new Error(`HTTP status ${HTTP_STATUS}\n${TEXT}`);
    }

    const DATA = await RESPONSE.json();
    return DATA;
  }
}
