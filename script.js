/**
 * FAZHAN P - PERRY WANG INSPIRED PORTFOLIO LOGIC
 * Handcrafted interactions: Floating segmented pill navigation,
 * subtle 3D card tilt & glare sheen, printable resume modal, and toast feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavPill();
  initModal();
  initCopy();
  initTiltMotion();
});

/* 1. Floating Segmented Pill Navigation & Scroll Spy */
function initNavPill() {
  const navBtns = document.querySelectorAll('.nav-toggle-btn');
  const sections = document.querySelectorAll('section[id], footer[id]');

  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  if (sections.length && navBtns.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navBtns.forEach(b => {
            if (b.getAttribute('href') === `#${id}`) {
              navBtns.forEach(btn => btn.classList.remove('active'));
              b.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 });

    sections.forEach(s => observer.observe(s));
  }
}

/* 2. Interactive Card 3D Depth & Glare Tilt */
function initTiltMotion() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltTargets = document.querySelectorAll('.container-hero-window, .project-card-outline');
  
  tiltTargets.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -2.2;
      const rotateY = ((x - centerX) / centerX) * 2.2;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* 3. Curriculum Vitae Modal & Print Engine */
function initModal() {
  const modal = document.getElementById('resume-modal');
  const navBtn = document.getElementById('nav-resume-btn');
  const heroBtn = document.getElementById('hero-resume-btn');
  const closeBtn = document.getElementById('close-resume-btn');
  const printBtn = document.getElementById('print-resume-btn');

  if (!modal) return;

  function open() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (navBtn) navBtn.addEventListener('click', (e) => { e.preventDefault(); open(); });
  if (heroBtn) heroBtn.addEventListener('click', (e) => { e.preventDefault(); open(); });
  if (closeBtn) closeBtn.addEventListener('click', close);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) close();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* 4. Copy Email & Quick Feedback */
function initCopy() {
  const copyEmail = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  if (copyEmail) {
    copyEmail.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = 'fazhanputh@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('✓ Copied email to clipboard');
      } catch (err) {
        showToast('✓ fazhanputh@gmail.com');
      }
    });
  }
}
