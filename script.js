document.addEventListener('DOMContentLoaded', () => {
  const EMAIL = 'pavanittamalla5@gmail.com';
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const progress = document.getElementById('progress');
  const toTop = document.getElementById('toTop');
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); menuBtn.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false);
  }));

  // Scroll effects
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    header.classList.toggle('scrolled', y > 20);
    toTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Reveal on scroll
  const revealer = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealer.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealer.observe(el));

  // Active nav link
  const links = [...nav.querySelectorAll('a')];
  const spy = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

  // Typing effect
  const typed = document.getElementById('typed');
  const roles = ['Python Full Stack Developer', 'Frontend Enthusiast', 'Lifelong Learner'];
  let r = 0, c = roles[0].length, deleting = true;
  const tick = () => {
    const word = roles[r];
    c += deleting ? -1 : 1;
    typed.textContent = word.slice(0, c);
    let wait = deleting ? 45 : 90;
    if (!deleting && c === word.length) { deleting = true; wait = 2200; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; wait = 400; }
    setTimeout(tick, wait);
  };
  setTimeout(tick, 2500);

  // 3D tilt on project preview
  const tilt = document.querySelector('.tilt');
  const visual = document.querySelector('.project-visual');
  if (tilt && visual && matchMedia('(hover:hover)').matches) {
    visual.addEventListener('mousemove', e => {
      const b = visual.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
      tilt.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
    });
    visual.addEventListener('mouseleave', () => { tilt.style.transform = ''; });
  }

  // Copy email
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(EMAIL); copyBtn.textContent = '✓ Email copied'; }
    catch { copyBtn.textContent = EMAIL; }
    setTimeout(() => { copyBtn.textContent = 'Copy email address'; }, 2500);
  });

  // Contact form -> mailto draft
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.target);
    const subject = d.get('subject') || 'Portfolio inquiry';
    const body = `Hi Pavan,\n\n${d.get('message')}\n\nFrom: ${d.get('name')}\nEmail: ${d.get('email')}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.getElementById('formNote').textContent = 'Your email app should open with the message ready to send.';
  });
});
