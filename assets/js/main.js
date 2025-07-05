// Language and hospital data loading, toggles, and UI logic
const LANGS = ['en', 'jp', 'ph'];
let currentLang = localStorage.getItem('lang') || 'en';

// Utility: fetch JSON
async function fetchJSON(path) {
  const res = await fetch(path);
  return res.json();
}

// Language switching
function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('font-bold', btn.dataset.lang === lang);
    btn.classList.toggle('bg-blue-50', btn.dataset.lang === lang);
    btn.classList.toggle('dark:bg-blue-800', btn.dataset.lang === lang);
    btn.classList.toggle('text-blue-700', btn.dataset.lang === lang);
  });
  // For phrasebook tabs
  document.querySelectorAll('.phrase-tab').forEach(btn => {
    btn.classList.toggle('font-bold', btn.dataset.lang === lang);
    btn.classList.toggle('bg-blue-50', btn.dataset.lang === lang);
    btn.classList.toggle('dark:bg-blue-800', btn.dataset.lang === lang);
    btn.classList.toggle('text-blue-700', btn.dataset.lang === lang);
  });
  loadPhrases();
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// Phrasebook tabs
function setupPhraseTabs() {
  document.querySelectorAll('.phrase-tab').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

// Load phrasebook
async function loadPhrases() {
  const path = `lang/phrases-${currentLang}.json`;
  const data = await fetchJSON(path);
  const phrasebook = document.getElementById('phrasebook');
  phrasebook.innerHTML = '';
  data.forEach(row => {
    const div = document.createElement('div');
    div.className = 'flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 shadow-sm card-hover transition';
    div.innerHTML = `<span>${row.icon || ''}</span><span class="font-semibold">${row.native}</span><span class="text-gray-500 dark:text-gray-300">${row.trans}</span>`;
    phrasebook.appendChild(div);
  });
}

// Accordion toggles for What To Do
function setupAccordion() {
  const container = document.getElementById('accordion-what-to-do');
  const sections = [
    { title: 'Before an Earthquake', content: 'Prepare an emergency kit, secure furniture, know evacuation routes.' },
    { title: 'During an Earthquake', content: 'Drop, cover, and hold on. Stay away from windows. Protect your head.' },
    { title: 'After an Earthquake', content: 'Check for injuries, follow official info, be ready for aftershocks.' }
  ];
  container.innerHTML = '';
  sections.forEach((sec, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'mb-2';
    const btn = document.createElement('button');
    btn.className = 'w-full flex justify-between items-center p-4 rounded-xl bg-white dark:bg-gray-900 shadow-sm font-semibold group transition';
    btn.innerHTML = `<span>${sec.title}</span><svg class="w-5 h-5 ml-2 text-gray-400 group-hover:text-blue-500 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`;
    const content = document.createElement('div');
    content.className = 'px-4 pb-4 hidden text-gray-700 dark:text-gray-200 transition-all duration-300';
    content.textContent = sec.content;
    btn.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');
      document.querySelectorAll('#accordion-what-to-do .transition-all').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('#accordion-what-to-do svg').forEach(svg => svg.style.transform = 'rotate(0deg)');
      if (!isOpen) {
        content.classList.remove('hidden');
        btn.querySelector('svg').style.transform = 'rotate(180deg)';
      }
    });
    wrapper.appendChild(btn);
    wrapper.appendChild(content);
    container.appendChild(wrapper);
  });
}

// Load hospitals
async function loadHospitals() {
  const data = await fetchJSON('data/hospitals.json');
  const tbody = document.getElementById('hospital-list');
  const search = document.getElementById('hospital-search');
  function render(list) {
    tbody.innerHTML = '';
    list.forEach(h => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td class="px-4 py-2">${h.name}</td><td class="px-4 py-2">${h.area}</td><td class="px-4 py-2">${h.open24h ? '✔️' : ''}</td><td class="px-4 py-2">${h.languages.join(', ')}</td>`;
      tbody.appendChild(tr);
    });
  }
  render(data);
  search.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    render(data.filter(h =>
      h.name.toLowerCase().includes(q) ||
      h.area.toLowerCase().includes(q) ||
      h.languages.join(',').toLowerCase().includes(q)
    ));
  });
}

// Disaster Kit Checklist
function loadKit() {
  const items = [
    'Water (3 days supply)',
    'Non-perishable food',
    'First aid kit',
    'Flashlight & batteries',
    'Portable radio',
    'Personal documents',
    'Cash',
    'Medications',
    'Warm clothing',
    'Mobile phone & charger',
    'Face masks',
    'Whistle',
    'Towel',
    'Toiletries',
    'Emergency blanket'
  ];
  const kit = document.getElementById('kit-list');
  kit.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 shadow-sm card-hover transition';
    div.innerHTML = `<input type="checkbox" class="accent-blue-600 rounded-full"> <span>${item}</span>`;
    kit.appendChild(div);
  });
}

// Dark mode toggle
function setupDarkMode() {
  const btn = document.getElementById('dark-toggle');
  const icon = document.getElementById('dark-toggle-icon');
  function setDark(dark) {
    if (dark) {
      document.documentElement.classList.add('dark');
      icon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      icon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }
  btn.addEventListener('click', () => {
    setDark(!document.documentElement.classList.contains('dark'));
  });
  // On load
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setDark(true);
  } else {
    setDark(false);
  }
}

// Smooth scroll for CTA
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// On page load
window.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
  setupPhraseTabs();
  setupAccordion();
  loadHospitals();
  loadKit();
  setupDarkMode();
  setupSmoothScroll();
}); 