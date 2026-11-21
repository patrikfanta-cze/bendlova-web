document.getElementById('rok').textContent = new Date().getFullYear();

// Formulář ocenění: zprávy přijímá server správce webu (Formuláře, formulare.patrikfanta.cz) a pošle je e-mailem.
const FORMULAR_URL = 'https://formulare.patrikfanta.cz/f/bendlova';
const form = document.getElementById('form-oceneni');
if (form) {
  const nacteno = Date.now();
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = form.querySelector('.form__msg');
    const tlacitko = form.querySelector('button[type="submit"]');
    if (!form.checkValidity()) {
      msg.textContent = 'Vyplňte prosím typ, obec, jméno, telefon a potvrďte zpracování údajů.';
      msg.className = 'form__msg form__msg--err';
      form.querySelector(':invalid').focus();
      return;
    }
    const data = {
      'Typ nemovitosti': form.typ.value, 'Obec nebo ulice': form.obec.value, 'Jméno': form.jmeno.value,
      'Telefon': form.telefon.value, 'Poznámka': form.poznamka.value,
      _hp: form.web.value, _t: nacteno, _stranka: location.href
    };
    tlacitko.disabled = true;
    msg.textContent = 'Odesílám…'; msg.className = 'form__msg';
    try {
      const res = await fetch(FORMULAR_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const odp = await res.json().catch(() => ({}));
      if (!res.ok || !odp.ok) throw new Error(odp.chyba || 'chyba');
      form.reset();
      msg.textContent = 'Děkuji, poptávka dorazila. Do druhého dne se vám ozvu.';
      msg.className = 'form__msg form__msg--ok';
    } catch (err) {
      msg.textContent = (err.message && err.message !== 'chyba' && err.message !== 'Failed to fetch' ? err.message + ' ' : 'Odeslání se nepovedlo. ') + 'Zavolejte prosím na 724 521 956.';
      msg.className = 'form__msg form__msg--err';
    } finally { tlacitko.disabled = false; }
  });
}

// Video v sekci O mně: při omezení animací zastavit na prvním snímku
document.querySelectorAll('.about__photo video, .polaroid video').forEach((video) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay');
    video.pause();
  }
});

