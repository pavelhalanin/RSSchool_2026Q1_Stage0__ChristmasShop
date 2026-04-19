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

        return /* html */ `
        <li data-status="${e.category}">
          <button onclick="ChristmasShop_GiftModal.openModal_byIdGift('${e.id}')">
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

class ChristmasShop_Gifts {
  static async renderRandom() {
    const UL = document.getElementById("cs_gifts__gifts_random");
    if (!UL) {
      console.error(`Узел не найден #cs_gifts__gifts_random`);
      return;
    }
    try {
      console.log("Получаем данные по API");
      const RANDOM_ARRAY = await this.getRandom();
      console.log("Получили данные по API");

      console.log("Вставляем данные в UL");
      UL.innerHTML = RANDOM_ARRAY.map((e) => {
        const IMAGE = {
          "For Harmony":
            "./../assets/home-page/best-section/gift-for-harmony.png",
          "For Health":
            "./../assets/home-page/best-section/gift-for-health.png",
          "For Work": "./../assets/home-page/best-section/gift-for-work.png",
        }[`${e.category}`];

        return /* html */ `
        <li data-status="${e.category}">
          <button onclick="ChristmasShop_GiftModal.openModal_byIdGift('${e.id}')">
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

  static async getRandom() {
    const ARRAY = await this.fetchGifts();
    return ARRAY.sort(() => Math.random() - 0.5);
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

class ChristmasShop_GiftModal {
  static id_modal = "cs_gift_modal__wrapper";
  static snowflake = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1959 9.88162L11.6482 9.56542L13.1158 9.17219L12.8732 8.26704L10.5005 8.90278L9.38146 8.25667C9.39689 8.17336 9.40538 8.08765 9.40538 7.99997C9.40538 7.91229 9.39692 7.82655 9.38146 7.74327L10.5005 7.09716L12.8732 7.7329L13.1158 6.82775L11.6482 6.43452L12.1959 6.11831L14.546 5.97725L14.8921 4.02063L13.0246 3.34203L11.7274 5.30677L11.1797 5.62297L11.5729 4.15545L10.6678 3.91293L10.032 6.28561L8.91226 6.93211C8.78247 6.82103 8.63242 6.73313 8.4683 6.67494V5.3828L10.2052 3.64586L9.5426 2.98325L8.46827 4.05755V3.42515L9.51792 1.32584L7.99976 0L6.48157 1.3259L7.53122 3.42521V4.05761L6.45689 2.98332L5.79429 3.64592L7.53119 5.38286V6.675C7.36708 6.73319 7.21702 6.82109 7.08724 6.93217L5.96746 6.28568L5.33171 3.91299L4.42656 4.15551L4.81979 5.62304L4.27213 5.30684L2.9749 3.34209L1.10742 4.02069L1.45349 5.97731L3.80362 6.11838L4.35128 6.43458L2.88375 6.82781L3.1263 7.73296L5.49898 7.09722L6.61807 7.74333C6.60264 7.82664 6.59414 7.91235 6.59414 8.00003C6.59414 8.08771 6.60261 8.17345 6.61807 8.25673L5.49898 8.90285L3.1263 8.2671L2.88375 9.17226L4.35128 9.56548L3.80362 9.88169L1.45349 10.0227L1.10742 11.9793L2.97493 12.6579L4.27216 10.6932L4.81985 10.377L4.42662 11.8445L5.33177 12.087L5.96752 9.71435L7.0873 9.06786C7.21708 9.17894 7.36714 9.26684 7.53125 9.32503V10.6172L5.79435 12.3541L6.45696 13.0167L7.53129 11.9424V12.5748L6.48163 14.6741L7.99983 16L9.51802 14.6741L8.46837 12.5748V11.9424L9.5427 13.0167L10.2053 12.3541L8.4684 10.6172V9.32503C8.63251 9.26684 8.78257 9.17894 8.91235 9.06786L10.0321 9.71435L10.6679 12.087L11.573 11.8445L11.1798 10.377L11.7275 10.6932L13.0247 12.6579L14.8922 11.9793L14.5462 10.0227L12.1959 9.88162Z" fill="#FF4646"/>
</svg>`;

  static async openModal_byIdGift(id_gift) {
    try {
      document.querySelectorAll(`#${this.id_modal}`).forEach((e) => {
        e.remove();
      });

      const DATA = await this.fetchGift_byIdGift(id_gift);

      const MODAL_WRAPPER = document.createElement("div");
      MODAL_WRAPPER.setAttribute("id", `${this.id_modal}`);
      MODAL_WRAPPER.innerHTML = /* html */ `
        <div class="cs_gift_modal__modal" data-category="${DATA.category}">
          <div class="cs_gift_modal__close_button_container">
            <button onclick="ChristmasShop_GiftModal.closeModal()"></button>
          </div>
          <div class="cs_gift_modal__image_container"></div>
          <div class="cs_gift_modal__description_container">
            <div class="cs_gift_modal__description_text_container">
              <div class="typography--header-4 cs_gift_modal__category_header">${DATA.category}</div>
              <div class="typography--header-3">${DATA.name}</div>
              <div class="typography--paragraph">${DATA.description}</div>
            </div>
            <div class="cs_gift_modal__charachteristics">
              <div class="typography--header-4">ADDS SUPERPOWERS TO:</div>
              <ul>
                ${Object.keys(DATA.superpowers)
                  .map((KEY) => {
                    const VALUE = DATA.superpowers[KEY];

                    let REPEAT_NUMBER = 0;
                    switch (VALUE) {
                      case "+100":
                        REPEAT_NUMBER = 1;
                        break;

                      case "+200":
                        REPEAT_NUMBER = 2;
                        break;

                      case "+300":
                        REPEAT_NUMBER = 3;
                        break;

                      case "+400":
                        REPEAT_NUMBER = 4;
                        break;

                      case "+500":
                        REPEAT_NUMBER = 5;
                        break;

                      default:
                        REPEAT_NUMBER = 0;
                        break;
                    }

                    return `
                    <li>
                      <div class="typography--paragraph cs_gift_modal__charachteristics_name">${KEY}</div>
                      <div class="typography--paragraph cs_gift_modal__charachteristics_number">${VALUE}</div>
                      <div class="cs_gift_modal__charachteristics_showflakes">${`${this.snowflake}`.repeat(REPEAT_NUMBER)}</div>
                    </li>
                  `;
                  })
                  .join("")}
              </ul>
            </div>
          </div>
        </div>
      `;

      MODAL_WRAPPER.addEventListener("click", function (event) {
        if (
          event.target === MODAL_WRAPPER ||
          event.target.closest(".cs_gift_modal__modal") === null
        ) {
          ChristmasShop_GiftModal.closeModal();
        }
      });

      document.body.appendChild(MODAL_WRAPPER);
      document.querySelector("body").classList.add("cs_header__no_scroll_body");
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  static closeModal() {
    try {
      console.log(`${new Date().toISOString()} Модалка закрыта`);
      document.querySelectorAll(`#${this.id_modal}`).forEach((e) => {
        e.remove();
      });
      document
        .querySelector("body")
        .classList.remove("cs_header__no_scroll_body");
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  static async fetchGift_byIdGift(id_gift) {
    const URL_ = `/pavelhalanin-JSFEPRESCHOOL2026Q1/christmas-shop/api/gifts/${id_gift}.json`;
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

class ChristmasShop_GiftCategories {
  static setFilter_byCategoryAndButtonNode(category, button_node) {
    try {
      const NAV_FILTER = document.getElementById(
        "cs_gifts_page_gifts_section__nav",
      );

      const GIFTS = document.getElementById("cs_gifts__gifts_random");

      if (!NAV_FILTER) {
        console.error("Не найден узел: #cs_gifts_page_gifts_section__nav");
        return;
      }

      if (!GIFTS) {
        console.error("Не найден узел: #cs_gifts__gifts_random");
        return;
      }

      if (!button_node) {
        console.error("Не найден узел: button_node");
        return;
      }

      NAV_FILTER.querySelectorAll("button").forEach((button) => {
        button.removeAttribute("data-is-active");
      });

      button_node.setAttribute("data-is-active", "1");

      if (category == "") {
        GIFTS.querySelectorAll("li").forEach((li) => {
          li.style.display = "block";
        });
        return;
      }

      GIFTS.querySelectorAll("li").forEach((li) => {
        const CATEGORY = li.getAttribute("data-status");
        li.style.display = CATEGORY == category ? "block" : "none";
      });
    } catch (exception) {
      console.error(exception);
    }
  }
}

class ChristmasShop_Timer {
  static id_node_days = "cs_timer__days";
  static id_node_hours = "cs_timer__hours";
  static id_node_minutes = "cs_timer__minutes";
  static id_node_seconds = "cs_timer__seconds";

  static main() {
    setInterval(() => {
      ChristmasShop_Timer.updateTimer();
    }, 1000);
  }

  static updateTimer() {
    const DAYS_NODE = document.getElementById(this.id_node_days);
    const HOURS_NODE = document.getElementById(this.id_node_hours);
    const MINUTES_NODE = document.getElementById(this.id_node_minutes);
    const SECONDS_NODE = document.getElementById(this.id_node_seconds);

    if (!DAYS_NODE) {
      console.error(`Не найден узел: #${this.id_node_days}`);
      return;
    }

    if (!HOURS_NODE) {
      console.error(`Не найден узел: #${this.id_node_hours}`);
      return;
    }

    if (!MINUTES_NODE) {
      console.error(`Не найден узел: #${this.id_node_minutes}`);
      return;
    }

    if (!SECONDS_NODE) {
      console.error(`Не найден узел: #${this.id_node_seconds}`);
      return;
    }

    const DATA = this.getTimeUntilNewYearUTC0();
    DAYS_NODE.innerHTML = DATA.days;
    HOURS_NODE.innerHTML = DATA.hours;
    MINUTES_NODE.innerHTML = DATA.minutes;
    SECONDS_NODE.innerHTML = DATA.seconds;
  }

  static getTimeUntilNewYearUTC0() {
    const NOW = new Date();

    const D_NOW = {
      YYYY: NOW.getUTCFullYear(),
      MM: NOW.getUTCMonth(),
      DD: NOW.getUTCDate(),
      HH: NOW.getUTCHours(),
      MI: NOW.getUTCMinutes(),
      SS: NOW.getUTCSeconds(),
    };

    const UTC_TIMESTAMP_NOW = Date.UTC(
      D_NOW.YYYY,
      D_NOW.MM,
      D_NOW.DD,
      D_NOW.HH,
      D_NOW.MI,
      D_NOW.SS,
    );

    const D_NEW_YEAR = {
      YYYY: NOW.getUTCFullYear() + 1,
      MM: 0,
      DD: 1,
      HH: 0,
      MI: 0,
      SS: 0,
    };

    const UTC_TIMESTAMP_NEW_YEAR = Date.UTC(
      D_NEW_YEAR.YYYY,
      D_NEW_YEAR.MM,
      D_NEW_YEAR.DD,
      D_NEW_YEAR.HH,
      D_NEW_YEAR.MI,
      D_NEW_YEAR.SS,
    );

    const diff = UTC_TIMESTAMP_NEW_YEAR - UTC_TIMESTAMP_NOW;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }
}

class ChristmasShop_Scroll {
  static scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  static main() {
    console.log("main()");
    window.addEventListener(
      "scroll",
      ChristmasShop_Scroll.showOrHideScrollButton,
    );
    window.addEventListener(
      "resize",
      ChristmasShop_Scroll.showOrHideScrollButton,
    );
  }

  static showOrHideScrollButton(event) {
    const BUTTON = document.getElementById("cs_scroll_button");

    if (!BUTTON) {
      console.error("Не найден узел: #cs_scroll_button");
      return;
    }

    if (window.innerWidth > 768) {
      console.log(
        "Скрываю кнопку скрола, так как window.innerWidth = ",
        window.innerWidth,
        " > 768",
      );
      BUTTON.classList.add("cs_scroll_button--hidden");
      return;
    }

    if (document.documentElement.scrollTop > 300) {
      console.log(
        "Показываю кнопку скрола, так прокрутили больше 300 пикселей: document.documentElement.scrollTop = ",
        document.documentElement.scrollTop,
        " > 300",
      );
      BUTTON.classList.remove("cs_scroll_button--hidden");
      return;
    }

    console.log("Скрываю кнопку скрола");
    BUTTON.classList.add("cs_scroll_button--hidden");
  }
}

class ChristmasShop_Slider {
  static id_left_button = "cs_main_slider__left_button";
  static id_right_button = "cs_main_slider__right_button";
  static id_long_slider_block = "cs_main_slider__long_slider_block";

  static main() {
    window.addEventListener("resize", ChristmasShop_Slider.resetSlider);
  }

  static resetSlider(event) {
    const LONG_SLIDER_BLOCK = document.getElementById(
      ChristmasShop_Slider.id_long_slider_block,
    );
    if (!LONG_SLIDER_BLOCK) {
      console.error(
        `Узел не найден: #${ChristmasShop_Slider.id_long_slider_block}`,
      );
      return;
    }

    LONG_SLIDER_BLOCK.setAttribute("data-step", `0`);
    ChristmasShop_Slider.left_or_right("left");
  }

  static left_or_right(type) {
    const LONG_SLIDER_BLOCK = document.getElementById(
      this.id_long_slider_block,
    );
    const BUTTON_LEFT = document.getElementById(this.id_left_button);
    const BUTTON_RIGHT = document.getElementById(this.id_right_button);

    if (!LONG_SLIDER_BLOCK) {
      console.error(`Узел не найден: #${this.id_long_slider_block}`);
      return;
    }

    if (!BUTTON_LEFT) {
      console.error(`Узел не найден: #${this.id_left_button}`);
      return;
    }

    if (!BUTTON_RIGHT) {
      console.error(`Узел не найден: #${this.id_right_button}`);
      return;
    }

    let step = Number(LONG_SLIDER_BLOCK.getAttribute("data-step"));
    if (type == "right") {
      step += 1;
    } else {
      step -= 1;
    }

    if (step <= 0) {
      step = 0;
    }

    const MAX_STEP = window.innerWidth > 768 ? 3 : 6;
    const WINDOW_WIDTH = window.innerWidth;

    const LONG_BLOCK_WIDTH = LONG_SLIDER_BLOCK.clientWidth;
    console.log(
      `translateX(calc(-${LONG_BLOCK_WIDTH}px / ${MAX_STEP} * ${step} - ${WINDOW_WIDTH}px))`,
    );
    const PIXEL_RESULT = (-LONG_BLOCK_WIDTH / MAX_STEP) * step + WINDOW_WIDTH;
    console.log(PIXEL_RESULT);
    if (PIXEL_RESULT > 0) {
      LONG_SLIDER_BLOCK.style.transform = `translateX(0)`;
    } else {
      console.log(`translateX(${PIXEL_RESULT}px)`);
      LONG_SLIDER_BLOCK.style.transform = `translateX(${PIXEL_RESULT}px)`;
    }
    LONG_SLIDER_BLOCK.setAttribute("data-log-width", `${LONG_BLOCK_WIDTH}`);

    if (step >= MAX_STEP) {
      BUTTON_RIGHT.setAttribute("disabled", "");
      BUTTON_LEFT.removeAttribute("disabled");
      LONG_SLIDER_BLOCK.setAttribute("data-step", `${MAX_STEP}`);
      return;
    }

    if (step <= 0) {
      BUTTON_RIGHT.removeAttribute("disabled");
      BUTTON_LEFT.setAttribute("disabled", "");
      LONG_SLIDER_BLOCK.setAttribute("data-step", "0");
      return;
    }

    BUTTON_RIGHT.removeAttribute("disabled");
    BUTTON_LEFT.removeAttribute("disabled");
    LONG_SLIDER_BLOCK.setAttribute("data-step", `${step}`);
  }
}
