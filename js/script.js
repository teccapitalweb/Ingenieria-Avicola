
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#programGrid .program-card');
  if (filterButtons.length && cards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        cards.forEach(card => {
          const category = card.dataset.category || '';
          const show = filter === 'all' || category.includes(filter);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }
});


/* contador animado */

document.querySelectorAll('.counter').forEach(counter => {

const update = () => {

const target = +counter.getAttribute('data-target');
const count = +counter.innerText;

const inc = target / 80;

if(count < target){
counter.innerText = Math.ceil(count + inc);
setTimeout(update,30);
}else{
counter.innerText = target + '+';
}

};

update();

});
