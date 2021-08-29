/**
 * PHP Email Form Validation - v3.1
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function () {
  "use strict";

  let forms = document.querySelectorAll(".php-email-form");

  forms.forEach(function (e) {
    e.addEventListener("submit", function (event) {
      event.preventDefault();

      let thisForm = this;
      let formData = new FormData(thisForm);

      thisForm.querySelector(".loading").classList.add("d-block");
      thisForm.querySelector(".error-message").classList.remove("d-block");
      thisForm.querySelector(".sent-message").classList.remove("d-block");

      const contactForm = new FormData(document.getElementById("form"));

      let data = [];
      for (const [key, value] of contactForm) {
        data.push({
          text: key,
          value: value,
        });
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Cookie", "i18next=en");

      var raw = JSON.stringify({
        toEmail: "mohammed.althamash@gmail.com",
        data: data,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://node-emailer.herokuapp.com/contact", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          thisForm.querySelector(".loading").classList.remove("d-block");
          thisForm.querySelector(".sent-message").classList.add("d-block");
        })
        .catch((error) => {
          displayError(thisForm, "Failed to submit, Please try again");
          console.error("Error:", error);
        });
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector(".loading").classList.remove("d-block");
    thisForm.querySelector(".error-message").innerHTML = error;
    thisForm.querySelector(".error-message").classList.add("d-block");
  }
})();
