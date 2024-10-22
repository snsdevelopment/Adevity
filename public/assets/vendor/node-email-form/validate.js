(function () {
  const forms = document.querySelectorAll('.node-email-form');

  // Directly define the reCAPTCHA site key here since there's only one form
  const recaptchaSiteKey = '6LetzmgqAAAAADLaoX1lVkRuF9HGX48OyVsLChQr'; // Use your site key directly

  forms.forEach((e) => {
    e.addEventListener('submit', function (event) {
      event.preventDefault();

      const thisForm = this;

      const action = thisForm.getAttribute('action');
      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      const formData = new FormData(thisForm); // Collect form data

      // Handle reCAPTCHA
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.enterprise.ready(() => {
          grecaptcha.enterprise.execute(recaptchaSiteKey, { action: 'submit' })
            .then((token) => {
              console.log('Generated token:', token);

              // Add the token directly to FormData
              formData.set('g-recaptcha-response', token);
              console.log('FormData with token:', Object.fromEntries(formData.entries()));

              // Now submit the form
              php_email_form_submit(thisForm, action, formData);
            })
            .catch((error) => {
              displayError(thisForm, error);
            });
        });
      } else {
        displayError(thisForm, 'The reCaptcha javascript API url is not loaded!');
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error(`${response.status} ${response.statusText} ${response.url}`);
      })
      .then((data) => {
        thisForm.querySelector('.loading').classList.remove('d-block');
        if (data.trim() === 'OK') {
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        } else {
          throw new Error(data || `Form submission failed and no error message returned from: ${action}`);
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }
}());
