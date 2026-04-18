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
