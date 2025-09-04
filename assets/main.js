
/* Main enhancements for Bao Quang Optic homepage
   - Hero auto slide (Banner homepage)
   - Producing section slider + per-product countdown
   - Global smooth scroll (in CSS)
   - Non-destructive: scoped to data-framer-name selectors
*/
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Utilities ---------- */
  const pad2 = n => String(n).padStart(2, '0');

  /* ---------- HERO AUTO SLIDE (Banner homepage) ---------- */
  (function initHero(){
    const hero = document.querySelector('[data-framer-name="Banner homepage"]');
    if (!hero) return;
    const ul = hero.querySelector('ul');
    if (!ul) return;
    ul.classList.add('ez-hero-slides');

    const slides = Array.from(ul.querySelectorAll('li'));
    if (slides.length <= 1) return;

    let index = 0;
    let paused = false;

    function width(){ return hero.getBoundingClientRect().width; }
    function render(){ ul.style.transform = `translateX(-${index * width()}px)`; }

    setInterval(() => {
      if (paused) return;
      index = (index + 1) % slides.length;
      render();
    }, 5000);

    hero.addEventListener('mouseenter', () => { paused = true; });
    hero.addEventListener('mouseleave', () => { paused = false; });
    window.addEventListener('resize', render);
  })();

  /* ---------- PRODUCING SECTION: slider + countdown ---------- */
  const prodSection = document.querySelector('[data-framer-name="Sản phẩm đang sản xuất"]');
  if (prodSection) {
    const ul = (() => {
      const list = prodSection.querySelector('ul');
      if (list && list.querySelector('li [data-framer-name^="Product_"]')) return list;
      const all = prodSection.querySelectorAll('ul');
      for (const u of all) if (u.querySelector('li [data-framer-name^="Product_"]')) return u;
      return null;
    })();
    if (ul) {
      // make slide track
      ul.classList.add('ez-slides');

      // add nav buttons if not present
      function makeBtn(cls, dir){
        const b = document.createElement('button');
        b.className = `ez-slider-btn ${cls}`;
        b.setAttribute('aria-label', dir < 0 ? 'Previous' : 'Next');
        b.innerHTML = dir < 0
          ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>';
        return b;
      }
      const prevBtn = makeBtn('ez-prev', -1);
      const nextBtn = makeBtn('ez-next', +1);
      prodSection.appendChild(prevBtn);
      prodSection.appendChild(nextBtn);

      // slider logic
      let offset = 0;
      function viewportW(){ return prodSection.getBoundingClientRect().width; }
      function trackW(){ return ul.scrollWidth; }
      function step(){
        const first = ul.querySelector('li > div[data-framer-name^="Product_"]');
        if (!first) return 0;
        const gap = parseFloat(getComputedStyle(ul).gap || '24') || 24;
        const w = first.getBoundingClientRect().width;
        return Math.round(w + gap);
      }
      function maxOffset(){ return Math.max(0, trackW() - viewportW()); }
      function render(){ ul.style.transform = `translateX(-${offset}px)`; }
      function go(dir){ offset = Math.min(maxOffset(), Math.max(0, offset + dir*step())); render(); }

      prevBtn.addEventListener('click', () => go(-1));
      nextBtn.addEventListener('click', () => go(1));
      window.addEventListener('resize', () => { if (offset > maxOffset()) offset = maxOffset(); render(); });

      // countdown per product
      function initCountdown(host, deadlineStr){
        const target = deadlineStr ? new Date(deadlineStr) : new Date(Date.now() + 14*24*60*60*1000);
        const wrap = document.createElement('span'); wrap.className = 'ezcd-wrap';
        const parts = ['dd','hh','mm','ss'].map(() => {
          const p = document.createElement('span'); p.className = 'ezcd-part'; p.textContent = '00'; wrap.appendChild(p); return p;
        });
        const cd = document.createElement('div'); cd.className = 'ez-countdown'; cd.appendChild(wrap);
        const titleBlock = host.querySelector('[data-framer-name="Frame 1000004114"]');
        if (titleBlock) titleBlock.insertAdjacentElement('afterend', cd); else host.appendChild(cd);

        function tick(){
          let diff = target - new Date(); if (diff < 0) diff = 0;
          const d = Math.floor(diff / 86400000);
          const h = Math.floor((diff % 86400000) / 3600000);
          const m = Math.floor((diff % 3600000) / 60000);
          const s = Math.floor((diff % 60000) / 1000);
          parts[0].textContent = pad2(d);
          parts[1].textContent = pad2(h);
          parts[2].textContent = pad2(m);
          parts[3].textContent = pad2(s);
        }
        tick(); setInterval(tick, 1000);
      }

      const cards = prodSection.querySelectorAll('li > div[data-framer-name^="Product_"]');
      cards.forEach(card => {
        if (card.dataset.ezCountdown === '1') return;
        card.dataset.ezCountdown = '1';
        const dl = card.dataset.deadline || prodSection.dataset.deadlineAll || null;
        initCountdown(card, dl);
      });
    }
  }
});
