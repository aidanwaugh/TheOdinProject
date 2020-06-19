const homePage = () => {
  const content = document.querySelector("#content");

  const tabLink = document.getElementById("home");
  tabLink.classList.add("active");

  const title = document.createElement("h1");
  title.textContent = "Cupcake Restaurant";
  content.appendChild(title);

  const description = document.createElement("p");
  description.textContent =
    "Cupcake ipsum dolor sit amet macaroon soufflé. Carrot cake halvah soufflé dragée carrot cake icing danish carrot cake sweet. Jelly-o tootsie roll donut oat cake pudding. Ice cream bear claw brownie tootsie roll donut chupa chups sesame snaps";
  // description.classList.add('description');
  content.appendChild(description);
};

export default homePage;
