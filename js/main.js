// ЗЕРНО - скрипты сайта

// 1. Мобильное меню
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.textContent = open ? 'Закрыть' : 'Меню';
  });
}

// 2. Фильтр каталога по способу заваривания (страница katalog.html)
const filterBtns = document.querySelectorAll('.filter button');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    const f = btn.dataset.filter;
    document.querySelectorAll('.cards .card[data-type]').forEach(card => {
      card.hidden = f !== 'all' && !card.dataset.type.split(' ').includes(f);
    });
  });
});

// Цели Top.Mail.Ru / MyTracker (счетчик 3800585)
function tmrGoal(goal) {
  var _tmr = window._tmr || (window._tmr = []);
  _tmr.push({ id: "3800585", type: "reachGoal", goal: goal });
}

// 3. Кнопка «Заказать» в каталоге подставляет товар в форму заказа
document.querySelectorAll('[data-product]').forEach(a => {
  a.addEventListener('click', () => {
    tmrGoal('order_click'); // Цель 1: клик «Заказать» в каталоге
    try { sessionStorage.setItem('zerno-product', a.dataset.product); } catch (e) {}
  });
});
const productSelect = document.querySelector('#product');
if (productSelect) {
  let saved = null;
  try { saved = sessionStorage.getItem('zerno-product'); } catch (e) {}
  if (saved) productSelect.value = saved;
}

// 4. Форма заказа (страница kontakty.html).
// GitHub Pages не принимает данные форм, поэтому заказ не отправляется, а показывается подтверждение.
const form = document.querySelector('#order');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    tmrGoal('order_submit'); // Цель 2: отправка формы заказа
    const name = form.querySelector('#name').value.trim();
    const ok = document.querySelector('.form-ok');
    ok.textContent = `${name || 'Спасибо'}, заказ принят. Мы позвоним, чтобы подтвердить доставку.`;
    ok.style.display = 'block';
    form.reset();
  });
}

// 5. Год в подвале
document.querySelectorAll('.year').forEach(el => { el.textContent = new Date().getFullYear(); });
