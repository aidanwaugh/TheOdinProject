const contactPage = () => {
  const content = document.querySelector("#content");

  const tabLink = document.getElementById("contacts");
  tabLink.classList.add("active");

  const title = document.createElement("h1");
  title.textContent = "Cupcake Contact";
  content.appendChild(title);

  const contactMsg = document.createElement("div");

  contactMsg.innerHTML =
    "<p>Macaroon sweet jelly biscuit. Marzipan gummies gummi bears pastry. Bear claw icing biscuit marshmallow icing cupcake muffin. Topping tiramisu cake candy donut danish.</p>";
  contactMsg.style.maxWidth = "300px";
  contactMsg.style.margin = "0 auto";
  content.appendChild(contactMsg);
};

export default contactPage;
