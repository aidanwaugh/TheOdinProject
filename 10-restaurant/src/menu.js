const menuPage = function () {
  const content = document.querySelector("#content");

  const tabLink = document.getElementById("menu");
  tabLink.classList.add("active");

  const title = document.createElement("h1");
  title.textContent = "Cupcake Menu";
  content.appendChild(title);

  const menu = document.createElement("div");

  const menuItems = ["main", "sides", "drinks"];

  for (let i = 0; i < menuItems.length; i++) {
    const itemDiv = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = menuItems[i];
    itemDiv.classList.add("itemDiv");
    itemDiv.classList.add(menuItems[i]);
    itemDiv.appendChild(title);
    menu.appendChild(itemDiv);
  }

  content.appendChild(menu);
};

export default menuPage;
