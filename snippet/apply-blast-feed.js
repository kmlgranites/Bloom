/**
 * <apply-blast-feed> — Bloom "apply blast" live feed animation
 * ------------------------------------------------------------
 * Dependency-free custom element. No React, no icon font, no build step.
 *
 *   <script src="apply-blast-feed.js"></script>
 *   <apply-blast-feed></apply-blast-feed>
 *
 * Attributes (all optional):
 *   interval   seconds per card, split across its steps  (default 5.5)
 *   cta        CTA pill background colour               (default #18D1D1)
 *   jobs       JSON array to replace the default feed
 *
 * Each job: { title, company, domain, location, level, fit, match, logoBg, logoChar }
 *   `domain`  is used to fetch the real company logo.
 *   `logoBg` + `logoChar` render as the fallback tile if the logo can't load.
 *
 * Swap the logo source in LOGO_URL below if you have your own CDN or
 * employer logo URLs coming from your job data.
 */
(function () {
  'use strict';

  const LOGO_URL = (domain) =>
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  const DEFAULT_JOBS = [
    { title: 'Senior Software Engineer',    company: 'Meta',    domain: 'meta.com',    location: 'New York City',  level: 'Senior', fit: 'Very Good Fit', match: 96, logoBg: '#0668E1', logoChar: 'M' },
    { title: 'Backend Engineer, Payments',  company: 'Stripe',  domain: 'stripe.com',  location: 'Remote, US',     level: 'Senior', fit: 'Great Fit',     match: 94, logoBg: '#635BFF', logoChar: 'S' },
    { title: 'Frontend Engineer',           company: 'Linear',  domain: 'linear.app',  location: 'San Francisco',  level: 'Mid',    fit: 'Very Good Fit', match: 91, logoBg: '#5E6AD2', logoChar: 'L' },
    { title: 'Full Stack Engineer',         company: 'Notion',  domain: 'notion.so',   location: 'Toronto, CA',    level: 'Mid',    fit: 'Good Fit',      match: 88, logoBg: '#0D0D0F', logoChar: 'N' },
    { title: 'Software Engineer, Platform', company: 'Airbnb',  domain: 'airbnb.com',  location: 'Seattle, WA',    level: 'Senior', fit: 'Great Fit',     match: 92, logoBg: '#FF5A5F', logoChar: 'A' },
  ];

  const TICKS = [
    'Preparing your application',
    'Filling personal information',
    'Answering application questions',
    'Submitting application',
  ];

  const ICON = {
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>',
    pin:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    user:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    check:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    cursor:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1M5.1 8 2.2 7.2M13.9 3.1 12 5M5 12l-1.9 1.9"/></svg>',
  };

  const CSS = `
    /* width:100% + flex:none so the host can't collapse when it sits in a
       flex/grid parent with align-items:center */
    :host{
      display:block; font-family:inherit;
      width:100%; max-width:var(--abf-max, 430px);
      flex:none; align-self:center;
    }
    *{ box-sizing:border-box; margin:0; padding:0; }
    .stage{ position:relative; width:100%; height:250px; }
    .card-wrap{
      position:absolute; left:0; right:0; top:28px;
      will-change:transform,opacity;
      transition:transform 1.15s cubic-bezier(.32,.04,.24,1),
                 opacity   1s   cubic-bezier(.4,0,.3,1),
                 filter    1s   ease;
    }
    .card{
      position:relative; background:#fff; border:1px solid #E6E7F5; border-radius:20px;
      box-shadow:0 18px 40px rgba(0,0,0,.22); padding:20px 22px;
    }
    .ring{
      position:absolute; top:20px; right:22px; width:48px; height:48px; border-radius:50%;
      display:flex; align-items:center; justify-content:center;
    }
    .ring i{
      width:38px; height:38px; border-radius:50%; background:#fff;
      display:flex; align-items:center; justify-content:center;
      font-size:14px; font-weight:700; color:#00824D; font-style:normal;
    }
    .head{ display:flex; align-items:flex-start; gap:14px; margin-bottom:14px; }
    .logo{
      width:52px; height:52px; border-radius:14px; flex-shrink:0; overflow:hidden;
      display:flex; align-items:center; justify-content:center;
      color:#fff; font-size:22px; font-weight:700;
      background-size:cover; background-position:center; background-repeat:no-repeat;
    }
    .title{ font-size:19px; font-weight:700; color:#0D0D0F; line-height:1.25; margin-bottom:8px; padding-right:56px; }
    .badges{ display:flex; gap:8px; flex-wrap:wrap; }
    .badge{ background:#E3F7EC; color:#00824D; border-radius:9999px; padding:4px 11px; font-size:12px; font-weight:700; white-space:nowrap; }
    .meta{ display:flex; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:16px; font-size:13px; font-weight:600; color:#4A5464; }
    .meta span{ display:inline-flex; align-items:center; gap:6px; white-space:nowrap; }
    .meta svg{ width:15px; height:15px; color:#7A8694; flex-shrink:0; }
    .cta{
      width:100%; height:52px; display:flex; align-items:center; justify-content:center; gap:9px;
      border-radius:9999px; padding:14px 16px; font-size:15px; font-weight:700;
      white-space:nowrap; overflow:hidden;
    }
    .cta{ position:relative; transition:background .35s ease, color .35s ease; }
    .cta .fill{
      position:absolute; left:0; top:0; bottom:0; width:0;
      background:rgba(255,255,255,.34); pointer-events:none;
      transition:width .55s cubic-bezier(.4,0,.2,1);
    }
    .cta .tick, .cta svg{ position:relative; z-index:1; }
    .cta svg{ width:15px; height:15px; flex-shrink:0; animation:abfPulse 1.1s ease-in-out infinite; }
    .card.done .cta .fill{ opacity:0; }
    .card.done .cta svg{ animation:none; }
    .badge-done{
      position:absolute; top:-13px; left:22px; z-index:4;
      display:none; align-items:center; gap:6px;
      background:#00824D; color:#fff; border-radius:9999px; padding:6px 14px;
      font-size:12.5px; font-weight:700; white-space:nowrap;
      box-shadow:0 6px 16px rgba(0,130,77,.32);
    }
    .badge-done svg{ width:13px; height:13px; }
    .card.done .badge-done{ display:flex; animation:abfPop .3s ease; }
    @keyframes abfPop{ from{opacity:0;transform:scale(.8);} to{opacity:1;transform:scale(1);} }
    @keyframes abfPulse{ 0%,100%{opacity:1;transform:translateY(0);} 50%{opacity:.45;transform:translateY(-2px);} }
    @media (prefers-reduced-motion:reduce){
      .card-wrap{ transition:none; }
      .cta svg{ animation:none; }
      .cta .fill{ transition:none; }
    }
  `;

  class ApplyBlastFeed extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;

      this.jobs = this._parseJobs();
      this.idx = 0;
      this.step = 0;

      const root = this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = CSS;
      const stage = document.createElement('div');
      stage.className = 'stage';
      root.append(style, stage);
      this.stage = stage;

      this._render();
      this._start();
    }

    disconnectedCallback() {
      clearInterval(this._tick);
    }

    _parseJobs() {
      const raw = this.getAttribute('jobs');
      if (!raw) return DEFAULT_JOBS;
      try { const j = JSON.parse(raw); return Array.isArray(j) && j.length ? j : DEFAULT_JOBS; }
      catch (e) { return DEFAULT_JOBS; }
    }

    /* one clock: the front card walks its steps, shows Submitted, then rotates out */
    _start() {
      const total  = Math.max(3, parseFloat(this.getAttribute('interval')) || 5.5);
      const stepMs = (total * 1000) / (TICKS.length + 1);
      this._tick = setInterval(() => {
        this.step++;
        if (this.step > TICKS.length) {
          this.step = 0;
          this.idx = (this.idx + 1) % this.jobs.length;
          this._position();
        }
        this._labels();
      }, stepMs);
    }

    /* build one persistent node per job so cards TRAVEL between positions */
    _render() {
      const cta = this.getAttribute('cta') || '#18D1D1';
      this._cta = cta; this._ctaInk = this._ink(cta);
      this.nodes = this.jobs.map((job) => {
        const wrap = document.createElement('div');
        wrap.className = 'card-wrap';
        wrap.innerHTML = `
          <div class="card">
            <div class="badge-done">${ICON.check}Submitted</div>
            <div class="ring" style="background:conic-gradient(#00B16B ${job.match}%, #E3F7EC 0)"><i>${job.match}</i></div>
            <div class="head">
              <div class="logo" style="background-color:${job.logoBg}">${job.logoChar || ''}</div>
              <div style="flex:1;min-width:0">
                <div class="title">${job.title}</div>
                <div class="badges"><span class="badge">Posted Today</span><span class="badge">${job.fit}</span></div>
              </div>
            </div>
            <div class="meta">
              <span>${ICON.building}${job.company}</span>
              <span>${ICON.pin}${job.location}</span>
              <span>${ICON.user}${job.level}</span>
            </div>
            <div class="cta">
              <span class="fill"></span><span class="tick"></span><span class="ico">${ICON.cursor}</span>
            </div>
          </div>`;
        // real logo on top of the coloured fallback tile (background = no broken-image icon)
        if (job.domain) {
          const tile = wrap.querySelector('.logo');
          const probe = new Image();
          probe.onload = () => { tile.style.backgroundImage = `url("${LOGO_URL(job.domain)}")`; tile.textContent = ''; };
          probe.src = LOGO_URL(job.domain);
        }
        this.stage.appendChild(wrap);
        return wrap;
      });
      this._position();
      this._labels();
    }

    _position() {
      const n = this.jobs.length;
      this.nodes.forEach((el, i) => {
        const rel = ((i - this.idx) % n + n) % n;
        let y, s, o, z, b, delay = 0;
        if (rel === 0)          { y =   0; s = 1;    o = 1;   z = 3; b = 'none'; }
        else if (rel === 1)     { y =  34; s = 0.94; o = 0.5; z = 2; b = 'blur(0.4px)'; delay = 130; }
        else if (rel === n - 1) { y = -80; s = 0.90; o = 0;   z = 1; b = 'blur(1.5px)'; }
        else                    { y =  62; s = 0.90; o = 0;   z = 0; b = 'blur(1.5px)'; }
        el.style.transitionDelay = delay + 'ms';
        el.style.transform = `translateY(${y}px) scale(${s})`;
        el.style.opacity = o;
        el.style.zIndex = z;
        el.style.filter = b;
        el.style.pointerEvents = rel === 0 ? 'auto' : 'none';
      });
    }

    _labels() {
      const n = this.jobs.length;
      const nT = TICKS.length;
      this.nodes.forEach((el, i) => {
        const rel   = ((i - this.idx) % n + n) % n;
        const front = rel === 0;
        const done  = front && this.step >= nT;
        const card  = el.querySelector('.card');
        card.classList.toggle('done', done);
        el.querySelector('.tick').textContent =
          done ? 'Application submitted' : TICKS[front ? Math.min(this.step, nT - 1) : 0];
        el.querySelector('.fill').style.width =
          front ? Math.min(Math.round(((this.step + 1) / nT) * 100), 100) + '%' : '0%';
        el.querySelector('.ico').innerHTML = done ? ICON.check : ICON.cursor;
        const pill = el.querySelector('.cta');
        pill.style.background = done ? '#00824D' : this._cta;
        pill.style.color      = done ? '#FFFFFF' : this._ctaInk;
      });
    }

    /* dark ink on light CTAs, white on dark — keeps the label legible on any colour */
    _ink(hex) {
      const h = hex.replace('#', '');
      const lin = [0, 2, 4].map((i) => {
        const v = parseInt(h.slice(i, i + 2), 16) / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      const lum = 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
      return lum > 0.35 ? '#022F36' : '#FFFFFF';
    }
  }

  if (!customElements.get('apply-blast-feed')) {
    customElements.define('apply-blast-feed', ApplyBlastFeed);
  }
})();
