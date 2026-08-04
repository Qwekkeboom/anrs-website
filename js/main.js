/* ANRS — minimal JS: mobile nav toggle + theme switch */
(function () {
  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var list = document.querySelector(".nav-list");
  if (toggle && list) {
    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu when a link is clicked (mobile)
    list.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        list.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var root = document.documentElement;
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("anrs-theme", next); } catch (e) {}
      updateThemeColor(next);
    });
  }

  // Keep theme in sync across tabs (e.g. NL -> EN navigation)
  window.addEventListener("storage", function (e) {
    if (e.key === "anrs-theme" && e.newValue) {
      document.documentElement.setAttribute("data-theme", e.newValue);
      updateThemeColor(e.newValue);
    }
  });

  function updateThemeColor(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    meta.setAttribute("content", theme === "dark" ? "#123a4d" : "#e63916");
  }

  // Sync theme-color meta with whatever was applied in <head>
  updateThemeColor(document.documentElement.getAttribute("data-theme"));
})();
