import homePage from "./home";
import menuPage from "./menu";
import contactPage from "./contacts";

(function () {
  const content = document.querySelector("#content");

  homePage();

  function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
  }

  function clearPage() {
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
  }

  function loadPage(tab) {
    const navLinks = Array.from(document.querySelectorAll("li"));

    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // if (tab.textContent === "Home") {
    //     homePage();
    // } else if (tab.textContent === "Menu") {
    //     menuPage();
    // } else if (tab.textContent === "Contacts") {
    //     contactPage();
    // }
    tab.textContent === "Contacts" ? contactPage() : tab.textContent === "Menu" ? menuPage() : homePage();
  }

  const nav = document.querySelector("nav");
  nav.addEventListener("click", (e) => {
    const target = getEventTarget(e);

    if (target.textContent === "Home" || target.textContent === "Menu" || target.textContent === "Contacts") {
      clearPage();
      loadPage(target);
    }
  });
})();
