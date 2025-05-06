window.addEventListener("load", () => {
  // Send Form
  const sendForm = (inputs, form) => {
    let iframeForm =
      document.querySelector("#form-iframe").contentWindow.document.body;
    inputs.forEach((input) => {
      let inputValue = input.querySelector("input")
        ? input.querySelector("input").value
        : input.querySelector("textarea").value;
      switch (input.id) {
        case "name-input":
          iframeForm
            .querySelector("#iframe-name")
            .querySelector("input").value = inputValue;
          break;

        case "email-input":
          iframeForm
            .querySelector("#iframe-email")
            .querySelector("input").value = inputValue;
          break;

        case "message-input":
          iframeForm
            .querySelector("#iframe-message")
            .querySelector("textarea").value = inputValue;
          break;
      }
    });
    iframeForm.querySelector(".contact-form__button").click();
    setTimeout(() => {
      document.querySelector("#form-iframe").remove();
      let newIframe = document.createElement("iframe");
      newIframe.id = "form-iframe";
      newIframe.src = "./documents/iframe-form.html";
      form.append(newIframe);
      form
        .querySelector(".contact-form__popup")
        .classList.add("contact-form__popup_sent");
      setTimeout(() => {
        form
          .querySelector(".contact-form__popup")
          .classList.remove("contact-form__popup_sent");
      }, "3000");
      inputs.forEach((input) => {
        input.querySelector("input")
          ? (input.querySelector("input").value = "")
          : (input.querySelector("textarea").value = "");
      });
    }, "3000");
  };
  // Validate Form
  const formValidation = (form) => {
    let validInputs = 0;
    let formInputs = form.querySelectorAll(".contact-form__input");
    formInputs.forEach((input) => {
      let inputError = input.querySelector(".contact-form__error");
      let inputValue = input.querySelector("input")
        ? input.querySelector("input").value
        : input.querySelector("textarea").value;
      switch (input.id) {
        case "name-input":
          if (inputValue.length < 3) {
            inputError.textContent = `This field requires at least 3 characters.`;
            inputError.classList.remove("contact-form__error_hidden");
          } else {
            inputError.classList.add("contact-form__error_hidden");
            inputError.textContent = "";
            validInputs++;
          }
          break;

        case "email-input":
          if (
            !inputValue
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
          ) {
            inputError.textContent =
              "Please add an email, example: youremail@email.com";
            inputError.classList.remove("contact-form__error_hidden");
          } else {
            inputError.classList.add("contact-form__error_hidden");
            inputError.textContent = "";
            validInputs++;
          }
          break;

        case "message-input":
          if (inputValue.length < 10) {
            inputError.textContent =
              "This field requires at least 10 characters.";
            inputError.classList.remove("contact-form__error_hidden");
          } else {
            inputError.classList.add("contact-form__error_hidden");
            inputError.textContent = "";
            validInputs++;
          }
          break;
      }
    });
    validInputs == formInputs.length ? sendForm(formInputs, form) : "";
  };
  // Validate Inputs
  const inputValidation = (input) => {
    let isValid = false;
    let inputValue = input.querySelector("input")
      ? input.querySelector("input").value
      : input.querySelector("textarea").value;
    let inputError = input.querySelector(".contact-form__error");

    switch (input.id) {
      case "name-input":
        if (inputValue.length < 3) {
          inputError.textContent = `This field requires at least 3 characters.`;
          inputError.classList.remove("contact-form__error_hidden");
        } else {
          inputError.classList.add("contact-form__error_hidden");
          inputError.textContent = "";
          isValid = true;
        }
        break;

      case "email-input":
        if (
          !inputValue
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          inputError.textContent =
            "Please add an email, example: youremail@email.com";
          inputError.classList.remove("contact-form__error_hidden");
        } else {
          inputError.classList.add("contact-form__error_hidden");
          inputError.textContent = "";
          isValid = true;
        }
        break;

      case "message-input":
        if (inputValue.length < 10) {
          inputError.textContent =
            "This field requires at least 10 characters.";
          inputError.classList.remove("contact-form__error_hidden");
        } else {
          inputError.classList.add("contact-form__error_hidden");
          inputError.textContent = "";
          isValid = true;
        }
        break;
    }
  };

  const visibleForm = document.querySelector(".contact-form");
  let formInputs = visibleForm.querySelectorAll(".contact-form__input");
  let submitButton = visibleForm.querySelector(".contact-form__button");

  formInputs.forEach((inp) => {
    let inputField = inp.querySelector("input")
      ? inp.querySelector("input")
      : inp.querySelector("textarea");

    inputField.addEventListener("keyup", (evt) => {
      inputValidation(inp, visibleForm);
    });
  });

  submitButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    formValidation(visibleForm);
  });

  /*
  MISSING STEPS:
  - VALIDATE REAL FORM
  - IF NOT CORRECT:
      - ADD ERROR MESSAGES
      - BLOCK SENDING BUTTON VISUALLY
  - IF CORRECT:
      - ADD INPUTS INTO IFRAME FORM
      - CLICK ON SEND BUTTON ON IFRAME FORM
      - WAIT UNTIL IFRAME IS RELOAD AND CONFIRM SENDING
      - DELETE IFRAME AND ADD IT AGAIN 
  */
});
