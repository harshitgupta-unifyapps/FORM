document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('scoreForm');
  const messages = document.getElementById('messages');
  const result = document.getElementById('result');
  const resetBtn = document.getElementById('resetBtn');

  function showMessage(text, isError = true) {
    messages.textContent = text;
    messages.style.color = isError ? '#b00020' : '#0b78e3';
  }
  function clearUI() {
    messages.textContent = '';
  }

  resetBtn.addEventListener('click', function () {
    clearUI();
    result.innerHTML = '';
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    clearUI();
    const name = form.name.value.trim();
    const age = form.age.value.trim();
    const gender = form.gender.value
      ? form.gender.value
      : (function () {
          const radios = form.querySelectorAll('input[name="gender"]');
          for (const r of radios) if (r.checked) return r.value;
          return '';
        })();
    const country = form.country.value;
    const address = form.address.value.trim();
    const phone = form.telephone.value.trim();
    const email = form.email.value.trim();
    const techNodes = form.querySelectorAll('input[name="tech"]:checked');
    const techs = Array.from(techNodes).map((n) => n.value);
    // empty details check for all fields
    if (!name) {
      showMessage('Please enter your name.');
      return;
    }
    if (!age) {
      showMessage('Please enter your age.');
      return;
    }
    if (!gender) {
      showMessage('Please select your gender.');
      return;
    }
    if (!country) {
      showMessage('Please select a country.');
      return;
    }
    if (!techs.length) {
      showMessage('Please select at least one tech stack.');
      return;
    }
    if (!address) {
      showMessage('Please enter your address.');
      return;
    }
    if (!phone) {
      showMessage('Please enter your phone number.');
      return;
    }
    if (!email) {
      showMessage('Please enter an email .');
      return;
    }
    const ageNum = Number(age);
    //check for age(assumed starting age 5)
    if (!Number.isInteger(ageNum) || ageNum <= 4 || ageNum > 100) {
      showMessage(
        'Age must be a whole number between 4 and 100.(assumed starting age 5)',
      );
      return;
    }

    //check for phone
    const phone_Pattern = /^\+?[0-9\s\-]{7,15}$/;
    if (!phone_Pattern.test(phone)) {
      showMessage(
        'Telephone must contain only digits, spaces, hyphens and optionally a leading + (7-15 chars).',
      );
      return;
    }

    //check email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showMessage('Please enter a valid email address.');
      return;
    }

    //if every check passed
    showMessage('Form submitted successfully — Below is the summary of what u have submitted', false);

    const data = {
      Name: name,
      Age: ageNum,
      Gender: gender,
      Country: country,
      'Technological stack': techs.join(', '),
      Address: address,
      Telephone: phone,
      Email: email,
    };

    renderResultTable(data);
  });
});
