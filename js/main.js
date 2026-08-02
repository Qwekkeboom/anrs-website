/* ANRS — minimal JS: mobile nav toggle + active link state */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var list = document.querySelector(".nav-list");
  if (!toggle || !list) return;

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
})();
