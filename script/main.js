import { nav, cards } from "./constant.js";

const navBlock = document.querySelector(".nav-block ul");
const navBlockMob = document.querySelector(".burger-block ul");
const body = document.querySelector("body");
const cardsBlock = document.querySelector(".cards-block");
const cardsBlockMob = document.querySelector(".cards-block-mob");
const buttonsBlock = document.querySelector(".buttons-block");
const buttonsBlockMob = document.querySelector(".buttons-block-mob");
const cardPopup = document.querySelector(".card-popup");
const cardAddPopup = document.querySelector(".add-card-popup");
const formBlock = document.querySelector(".add-card-popup_body form");
const burgerBlock = document.querySelector(".burger-block");
const burgerButton = document.querySelector(".burger-button");
const closeBurgerBlock = document.querySelector(".burger-block_close");

const cardsView = 9;
const cardsViewMob = 5;
let currentPage = 1;
let currentPageMob = 1;

navBlock.innerHTML = nav
  .map((item) => {
    return `
    <li>
    <button>${item.name}</button>
    </li>
    `;
  })
  .join("");

navBlockMob.innerHTML = nav
  .map((item) => {
    return `
    <li>
    <button>${item.name}</button>
    </li>
    `;
  })
  .join("");

const buttonsAddCardPopup = navBlock.querySelectorAll("button");

buttonsAddCardPopup.forEach((button) => {
  button.addEventListener("click", () => {
    cardAddPopup.classList.add("open");
    cardAddPopup.classList.remove("close");
    body.style.overflow = "hidden";
  });
});

const buttonsAddCardPopupMob = navBlockMob.querySelectorAll("button");

buttonsAddCardPopupMob.forEach((button) => {
  button.addEventListener("click", () => {
    cardAddPopup.classList.add("open");
    cardAddPopup.classList.remove("close");
    body.style.overflow = "hidden";
    burgerBlock.classList.remove("open");
  });
});

const renderCards = (page) => {
  cardsBlock.innerHTML = `
      <div class="col-1"></div>
      <div class="col-2"></div>
      <div class="col-3"></div>
    `;

  const start = (page - 1) * cardsView;
  const end = start + cardsView;
  const pageItems = cards.slice(start, end);

  pageItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cat-card");
    div.innerHTML = `
        <img src="${item.img}" alt="cat image">
        <div class="card-content">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <button data-id-card="${item.id}">${item.button}</button>
        </div>
        `;
    if ([0, 3, 6].includes(index)) {
      cardsBlock.querySelector(".col-1").appendChild(div);
    }
    if ([1, 4, 7].includes(index)) {
      cardsBlock.querySelector(".col-2").appendChild(div);
    }
    if ([2, 5, 8].includes(index)) {
      cardsBlock.querySelector(".col-3").appendChild(div);
    }
  });

  const buttons = document.querySelectorAll(".cards-block button");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const cardView = cards.find((card) => card.id == e.target.dataset.idCard);
      cardPopup.classList.add("open");
      cardPopup.classList.remove("close");
      cardPopup.querySelector(".card-popup_title").innerHTML = cardView.title;
      cardPopup.querySelector(".card-popup_body").innerHTML = `
                <img src="${cardView.img}" alt="image cat">
                <p>${cardView.text}<p>
            `;
      body.style.overflow = "hidden";
    });
  });
};

const renderButtons = () => {
  buttonsBlock.innerHTML = "";
  const totalPages = Math.ceil(cards.length / cardsView);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      currentPage = i;
      renderCards(currentPage);
      renderButtons();
    });
    buttonsBlock.appendChild(btn);
  }
};

const renderCardsMob = (page) => {
  cardsBlockMob.innerHTML = ``;

  const start = (page - 1) * cardsViewMob;
  const end = start + cardsViewMob;
  const pageItems = cards.slice(start, end);

  pageItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cat-card");
    div.innerHTML = `
        <img src="${item.img}" alt="cat image">
        <div class="card-content">
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <button data-id-card="${item.id}">${item.button}</button>
        </div>
        `;
    cardsBlockMob.appendChild(div);
  });

  const buttons = document.querySelectorAll(".cards-block-mob button");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const cardView = cards.find((card) => card.id == e.target.dataset.idCard);
      cardPopup.classList.add("open");
      cardPopup.classList.remove("close");
      cardPopup.querySelector(".card-popup_title").innerHTML = cardView.title;
      cardPopup.querySelector(".card-popup_body").innerHTML = `
                <img src="${cardView.img}" alt="image cat">
                <p>${cardView.text}<p>
            `;
      body.style.overflow = "hidden";
    });
  });
};

const renderButtonsMob = () => {
  buttonsBlockMob.innerHTML = "";
  const totalPages = Math.ceil(cards.length / cardsViewMob);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPageMob) btn.classList.add("active");
    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      currentPageMob = i;
      renderCardsMob(currentPageMob);
      renderButtonsMob();
    });
    buttonsBlockMob.appendChild(btn);
  }
};

renderCards(currentPage);
renderButtons();
renderCardsMob(currentPageMob);
renderButtonsMob();

cardPopup.querySelector(".card-popup_close").addEventListener("click", () => {
  cardPopup.classList.remove("open");
  cardPopup.classList.add("close");
  body.style.overflow = "";
});

window.onclick = function (event) {
  if (event.target == cardPopup) {
    cardPopup.classList.remove("open");
    cardPopup.classList.add("close");
    body.style.overflow = "";
  }
  if (event.target == cardAddPopup) {
    cardAddPopup.classList.remove("open");
    cardAddPopup.classList.add("close");
    body.style.overflow = "";
  }
};

cardAddPopup
  .querySelector(".add-card-popup_close")
  .addEventListener("click", () => {
    cardAddPopup.classList.remove("open");
    cardAddPopup.classList.add("close");
    body.style.overflow = "";
  });

formBlock.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = formBlock.querySelectorAll("input");
  const createNewCard = {
    id: Math.floor(Math.random() * 100000) + 1,
    button: "Смотреть",
  };

  inputs.forEach((item) => {
    if (item.id == "titleCard") {
      createNewCard.title = item.value;
    }
    if (item.id == "textCard") {
      createNewCard.text = item.value;
    }
    if (item.id == "imageUpload") {
      createNewCard.img = URL.createObjectURL(item.files[0]);
    }
  });
  cards.push(createNewCard);
  cardAddPopup.classList.remove("open");
  cardAddPopup.classList.add("close");
  body.style.overflow = "";
  renderCards(currentPage);
  renderButtons();
  renderCardsMob(currentPageMob);
  renderButtonsMob();

  inputs.forEach((item) => {
    item.value = "";
  });
});

burgerButton.addEventListener("click", () => {
  burgerBlock.classList.add("open");
});
closeBurgerBlock.addEventListener("click", () => {
  burgerBlock.classList.remove("open");
});
