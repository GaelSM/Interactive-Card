const values = {
  name: false,
  card__number: false,
  mm: false,
  yy: false,
  cvc: false,
};

const emptyImput = {
  name: "Jane Appleseed",
  card__number: "0000 0000 0000 0000",
  mm: "00",
  yy: "00",
  cvc: "000",
};

const regExp = {
  name: /^([A-ZÁÉÍÓÚ]{1}[a-záéíóú]{1,})(\s?([A-ZÁÉÍÓÚ]{1}[a-záéíóú]{2,})){2,4}\S$/,
  card__number: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
  mm: /^\d{2}$/,
  yy: /^\d{2}$/,
  cvc: /^\d{3}$/,
};

const inputsForm = document.querySelectorAll("input");

validateInput = (input) => {
  document.querySelector(`#reflected__${input.id}`).textContent = input.value;

  const messageError = input
    .closest(".input__container")
    .querySelector(".message__error");

  if (!regExp[input.id].test(input.value)) {
    if (input.value == "") {
      document.querySelector(`#reflected__${input.id}`).textContent =
        emptyImput[input.id];
      messageError.textContent = "Can´t be blank";
      messageError.classList.add("show");
      input.classList.add("input__error");
      values[input.id] = false;
      return;
    } else {
      messageError.textContent = "Wrong Format";
      messageError.classList.add("show");
      input.classList.add("input__error");
      values[input.id] = false;
      return;
    }
  }

  messageError.classList.remove("show");
  input.classList.remove("input__error");
  values[input.id] = true;
};

inputsForm.forEach((input) => {
  input.addEventListener("keyup", (e) => validateInput(e.target));
  input.addEventListener("blur", (e) => validateInput(e.target));
});

document.querySelector("button").addEventListener("click", () => {
  if (
    values.name &&
    values.card__number &&
    values.mm &&
    values.yy &&
    values.cvc
  ) {
    document.querySelector(".form").classList.add("hide");
    document.querySelector(".complete").classList.add("show");
    document
      .querySelector("#complete__button")
      .addEventListener("click", () => location.reload());
  }
});
