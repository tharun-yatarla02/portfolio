(function () {
  "use strict";

  var root = document.documentElement;
  var themeSwitch = document.getElementById("themeSwitch");
  var STORAGE_KEY = "try-portfolio-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeSwitch) {
      var isLight = theme === "light";
      themeSwitch.setAttribute("aria-pressed", String(isLight));
      themeSwitch.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
    }
  }

  function getInitialTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* localStorage unavailable — fall back silently */
    }
    if (saved === "light" || saved === "dark") return saved;

    // Dark is the site's default look; only switch on an explicit
    // user choice (saved above), not on OS-level preference.
    return "dark";
  }

  applyTheme(getInitialTheme());

  if (themeSwitch) {
    themeSwitch.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* ignore storage failures (private mode, etc.) */
      }
    });
  }

  // ---------- Mobile nav ----------
  var burger = document.getElementById("navBurger");
  var nav = document.querySelector(".site-nav");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
