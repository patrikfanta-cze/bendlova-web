document.getElementById('rok').textContent = new Date().getFullYear();

// Formulář ocenění: v náhledu se neodesílá, napojení (Web3Forms / Apps Script) doplníme
const form = document.getElementById('form-oceneni');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = form.querySelector('.form__msg');
    if (form.web.value) return;
    if (!form.checkValidity()) {
      msg.textContent = 'Vyplňte prosím typ, obec, jméno, telefon a potvrďte zpracování údajů.';
      msg.className = 'form__msg form__msg--err';
      form.querySelector(':invalid').focus();
      return;
    }
    msg.textContent = 'Toto je náhled webu, formulář se zatím neodesílá. Zavolejte prosím na 724 521 956.';
    msg.className = 'form__msg form__msg--ok';
  });
}

// Video v sekci O mně: při omezení animací zastavit na prvním snímku
const video = document.querySelector('.about__photo video');
if (video && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  video.removeAttribute('autoplay');
  video.pause();
}
