// A tiny custom dropdown so each language option can show a flag icon -
// native <option> elements can't contain images. Mimics <select>'s public
// surface closely enough for main.js: reads container.dataset.value and
// listens for a 'change' event dispatched on the container.
const LeadPredictorLanguageSelect = (function () {

  function chevronSvg() {
    return (
      '<svg viewBox="0 0 12 8" width="12" height="8" fill="none">' +
      '<path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>'
    );
  }

  function optionMarkup(language) {
    return (
      `<span class="flag-icon">${LeadPredictorI18n.flagSvg(language.flag)}</span>` +
      `<span class="custom-select-label">${language.label}</span>`
    );
  }

  function build(container, languages, initialCode) {
    container.classList.add('custom-select');
    container.innerHTML = '';
    container.dataset.value = initialCode;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'custom-select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    const list = document.createElement('ul');
    list.className = 'custom-select-list';
    list.setAttribute('role', 'listbox');
    list.hidden = true;

    function renderTrigger() {
      const current = languages.find((l) => l.code === container.dataset.value) || languages[0];
      trigger.innerHTML = `${optionMarkup(current)}<span class="custom-select-arrow">${chevronSvg()}</span>`;
    }

    function closeList() {
      list.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }

    function openList() {
      list.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    }

    languages.forEach((language) => {
      const option = document.createElement('li');
      option.className = 'custom-select-option';
      option.setAttribute('role', 'option');
      option.dataset.value = language.code;
      option.innerHTML = optionMarkup(language);
      option.addEventListener('click', () => {
        container.dataset.value = language.code;
        renderTrigger();
        list.querySelectorAll('.custom-select-option').forEach((el) => {
          el.setAttribute('aria-selected', String(el.dataset.value === language.code));
        });
        closeList();
        container.dispatchEvent(new Event('change'));
      });
      list.appendChild(option);
    });

    trigger.addEventListener('click', () => {
      if (list.hidden) openList();
      else closeList();
    });

    document.addEventListener('click', (event) => {
      if (!container.contains(event.target)) closeList();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !list.hidden) {
        closeList();
        trigger.focus();
      }
    });

    renderTrigger();
    list.querySelectorAll('.custom-select-option').forEach((el) => {
      el.setAttribute('aria-selected', String(el.dataset.value === initialCode));
    });

    container.append(trigger, list);
  }

  return { build };
})();
