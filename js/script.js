
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const overlay = document.querySelector('.menu-overlay');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      overlay && overlay.classList.toggle('is-open');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        overlay && overlay.classList.remove('is-open');
      });
    });
    overlay && overlay.addEventListener('click', () => {
      nav.classList.remove('is-open');
      overlay.classList.remove('is-open');
    });
  }

  // Reveal on scroll
  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => io.observe(el));
  }

  // Counters on view
  document.querySelectorAll('.counter').forEach(counter => {
    const target = Number(counter.dataset.target || 0);
    const run = () => {
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = `${target}+`;
          clearInterval(timer);
        } else {
          counter.textContent = `${current}`;
        }
      }, 25);
    };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counter.dataset.played) {
          counter.dataset.played = 'true';
          run();
          obs.unobserve(counter);
        }
      });
    }, { threshold: 0.6 });
    obs.observe(counter);
  });

  // Course filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#programGrid .program-card');
  const searchInput = document.getElementById('courseSearch');

  const applyFilters = () => {
    const active = document.querySelector('.filter-btn.active');
    const filter = active ? active.dataset.filter : 'all';
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    cards.forEach(card => {
      const category = card.dataset.category || '';
      const search = card.dataset.search || '';
      const matchFilter = filter === 'all' || category.includes(filter);
      const matchSearch = !query || search.includes(query);
      card.style.display = (matchFilter && matchSearch) ? '' : 'none';
    });
  };

  if (filterButtons.length && cards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
      });
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // Smart WhatsApp per course
  document.querySelectorAll('.program-card').forEach(card => {
    const title = card.querySelector('h3')?.textContent?.trim();
    const btn = card.querySelector('.wa-course');
    if (title && btn) {
      btn.href = `https://wa.me/522361138979?text=${encodeURIComponent('Hola, quiero información sobre el curso ' + title)}`;
    }
  });

  // Tabs in course detail
  const tabButtons = document.querySelectorAll('.tab-btn');
  if (tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.querySelector(`.tab-panel[data-panel="${tab}"]`)?.classList.add('active');
      });
    });
  }

  // FAQ
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.faq-item')?.classList.toggle('is-open');
    });
  });

  // Lightbox gallery
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const closeBtn = lightbox?.querySelector('.lightbox-close');
  document.querySelectorAll('.lightbox-image').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('is-open');
    });
  });
  closeBtn && closeBtn.addEventListener('click', () => lightbox.classList.remove('is-open'));
  lightbox && lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('is-open');
  });

  // Back to top
  const backToTop = document.querySelector('.back-to-top');
  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 500) backToTop.classList.add('is-visible');
    else backToTop.classList.remove('is-visible');
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop);
  backToTop && backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
