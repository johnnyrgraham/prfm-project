/* ============================================================
     LAUNCH DAY SWITCH — the ONLY edit needed to flip every
     "Join waitlist" button site-wide to its launch-day text.

     HOW TO USE:
       1. Change the line below from `false` to `true`.
       2. Save the file. Refresh the page. Done.

     This affects every button/link with class="waitlist-cta" —
     that's every purchase and signup button on the page (nav,
     hero, orange strip, all 7 programme rows, final CTA). Each
     one already has its launch-day text pre-written in its
     data-launch-text="..." attribute in the HTML, so nothing
     else needs to be touched.

     To go back to pre-launch/waitlist mode later, set it back
     to `false`.
     ============================================================ */
  const LAUNCH_MODE = false;

  if (LAUNCH_MODE) {
    document.querySelectorAll('.waitlist-cta').forEach(el => {
      if (el.dataset.launchText) el.textContent = el.dataset.launchText;
    });
  }

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // count-up stats (Coach Ben section)
  const counters = document.querySelectorAll('[data-target]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let cur = 0;
      const step = Math.max(1, Math.round(target / 20));
      const t = setInterval(() => {
        cur = Math.min(target, cur + step);
        el.textContent = cur >= target ? (target + suffix) : cur;
        if (cur >= target) clearInterval(t);
      }, 40);
      cio.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => cio.observe(el));