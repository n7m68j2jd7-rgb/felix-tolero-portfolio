/* ==========================================================
   app.js - home page: builds the sections, draws the pixel
   art, runs the 12-column overlay and the contact form.
   ========================================================== */
(function () {
  'use strict';
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
    });
  };

  /* ---------- pixel art ---------- */
  function paint(cv, pix, scale) {
    if (!cv) return;
    var src = pix.toCanvas(scale);
    cv.width = src.width; cv.height = src.height;
    var g = cv.getContext('2d');
    g.imageSmoothingEnabled = false;
    g.drawImage(src, 0, 0);
  }
  function drawArt() {
    paint($('#navmark'), SPRITES.logoMark(), 2);
    var crt = $('#herocrt');
    if (crt) { paint(crt, SPRITES.heroCRT(), 8); crt.style.width = '100%'; crt.style.height = 'auto'; }
    var desk = $('#deskart');
    if (desk) { paint(desk, SPRITES.deskScene(), 8); desk.style.width = '100%'; desk.style.height = 'auto'; }
    var sky = $('#herostars');
    if (sky) {
      var host = sky.parentElement;
      paint(sky, SPRITES.stars(Math.ceil(host.offsetWidth / 4), Math.ceil(host.offsetHeight / 4), 7), 4);
      sky.style.width = '100%'; sky.style.height = '100%';
    }
  }

  /* ---------- marquees ---------- */
  function buildTicker() {
    var t = $('#ticker'); if (!t) return;
    var once = window.TICKER.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('');
    t.innerHTML = once + once;
  }
  /* only the companies that appear in the experience list */
  function buildCompanies() {
    var t = $('#companies'); if (!t) return;
    var once = window.COMPANIES.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('');
    t.innerHTML = once + once;
  }

  /* ---------- work index: rows that link to a case study ---------- */
  function buildWorkList() {
    var host = $('#worklist'); if (!host) return;
    host.innerHTML = window.PROJECTS.map(function (p) {
      var c = window.CASES[p.id] || {};
      return '' +
      '<a class="wrow rv" href="work/' + p.id + '.html">' +
        '<span class="wrow__n">' + p.idx + '</span>' +
        '<span class="wrow__main">' +
          '<span class="wrow__title">' + esc(p.title) + '</span>' +
          '<span class="wrow__sum">' + esc(c.summary || p.desc) + '</span>' +
        '</span>' +
        '<span class="wrow__meta">' + esc(p.client) + '</span>' +
        '<span class="wrow__count">' + p.items.length + ' items</span>' +
        '<span class="wrow__go">View case study <i>&rarr;</i></span>' +
        '<img class="wrow__peek' + (p.peek === '16/9' ? ' wrow__peek--wide' : '') + '" src="' + p.cover + '" alt="" loading="lazy" aria-hidden="true">' +
      '</a>';
    }).join('');
  }

  /* ---------- capabilities ---------- */
  function buildCaps() {
    var host = $('#caplist'); if (!host) return;
    host.innerHTML = window.CAPABILITIES.map(function (c) {
      return '<div class="crow rv">' +
        '<canvas class="crow__icon" data-icon="' + c.icon + '" aria-hidden="true"></canvas>' +
        '<h3 class="crow__title">' + esc(c.title) + '</h3>' +
        '<p class="crow__body">' + esc(c.body) + '</p>' +
      '</div>';
    }).join('');
    $$('.crow__icon', host).forEach(function (cv) {
      var fn = SPRITES[cv.dataset.icon];
      if (fn) paint(cv, fn('#12101f'), 4);
    });
  }

  /* ---------- experience: roles still running show green ---------- */
  function buildTimeline() {
    var host = $('#timeline'); if (!host) return;
    host.innerHTML = window.EXPERIENCE.map(function (e) {
      var live = /present/i.test(e.date);
      var chips = '';
      if (live) chips += ' <span class="tag tag--live">Active</span>';
      if (e.type) chips += ' <span class="tag">' + esc(e.type) + '</span>';
      return '<li data-active="' + (live ? 'true' : 'false') + '">' +
        '<div class="tl__role">' + esc(e.role) + chips + '</div>' +
        '<div class="tl__org">' + esc(e.org) + '</div>' +
        '<div class="tl__date">' + esc(e.date) + '</div>' +
        '<div class="tl__desc">' + esc(e.desc) + '</div>' +
      '</li>';
    }).join('');
  }

  /* ==========================================================
     CONTACT FORM + EMAIL RATE LIMIT

     The site is static, so the form composes the message and
     hands it to the visitor's own mail app. Every send goes
     through limitEmailSending() first - one gate that either
     grants the request and records it, or refuses it with a
     reason. Change the numbers in EMAIL_LIMIT to retune.
     ========================================================== */
  var MAILTO = 'felixmaritolero@gmail.com';

  var EMAIL_LIMIT = {
    key:     'ftolero.sends',  /* where the send log lives */
    gapMs:   90 * 1000,        /* minimum spacing between two messages */
    perDay:  5,                /* ceiling per rolling 24 hours */
    windowMs: 24 * 60 * 60 * 1000
  };

  function readLog() {
    try {
      var raw = localStorage.getItem(EMAIL_LIMIT.key);
      var arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      var cut = Date.now() - EMAIL_LIMIT.windowMs;
      return arr.filter(function (t) { return typeof t === 'number' && t > cut; });
    } catch (e) { return []; }
  }
  function writeLog(arr) {
    try { localStorage.setItem(EMAIL_LIMIT.key, JSON.stringify(arr)); } catch (e) {}
  }

  /* ----------------------------------------------------------
     limitEmailSending() - the rate limiter, one call per request.
     Grants and consumes a slot, or refuses and explains why.
       -> { allowed:true,  remaining:<n> }
       -> { allowed:false, reason:'<message for the visitor>' }
     ---------------------------------------------------------- */
  function limitEmailSending() {
    var now = Date.now();
    var log = readLog();

    /* ceiling for the rolling window */
    if (log.length >= EMAIL_LIMIT.perDay) {
      var oldest = Math.min.apply(null, log);
      var hrs = Math.max(1, Math.ceil((oldest + EMAIL_LIMIT.windowMs - now) / (60 * 60 * 1000)));
      return { allowed: false, reason:
        'That is ' + EMAIL_LIMIT.perDay + ' messages in 24 hours, which is the limit. ' +
        'Try again in about ' + hrs + ' hour' + (hrs === 1 ? '' : 's') +
        ', or email ' + MAILTO + ' directly.' };
    }

    /* spacing between consecutive messages */
    var last = log.length ? Math.max.apply(null, log) : 0;
    if (now - last < EMAIL_LIMIT.gapMs) {
      var secs = Math.ceil((EMAIL_LIMIT.gapMs - (now - last)) / 1000);
      return { allowed: false, reason:
        'Just sent one. Please wait ' + secs + ' second' + (secs === 1 ? '' : 's') +
        ' before sending another.' };
    }

    log.push(now);
    writeLog(log);
    return { allowed: true, remaining: EMAIL_LIMIT.perDay - log.length };
  }

  function say(text, tone) {
    var m = $('#formmsg'); if (!m) return;
    m.textContent = text;
    m.dataset.tone = tone || 'ok';
    m.dataset.on = 'true';
  }

  function initForm() {
    var f = $('#form'); if (!f) return;

    f.addEventListener('submit', function (e) {
      e.preventDefault();

      /* honeypot: only a bot fills this, so stop without saying why */
      if (f.website && f.website.value.trim() !== '') {
        say('Thanks - your message has been queued.', 'ok');
        return;
      }
      if (!f.checkValidity()) { f.reportValidity(); return; }

      var gate = limitEmailSending();
      if (!gate.allowed) { say(gate.reason, 'warn'); return; }

      var d = new FormData(f);
      var subject = 'Project inquiry - ' + d.get('service');
      var body = 'Name: ' + d.get('name') + '\n'
               + 'Email: ' + d.get('email') + '\n'
               + 'Service: ' + d.get('service') + '\n\n'
               + d.get('message');

      window.location.href = 'mailto:' + MAILTO
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      say('Almost there - your email app should now be open with the message ready. '
        + 'Hit send and I will reply within 24-48 hours.', 'ok');
    });
  }
  /* ---------- 12-column grid overlay ----------
     No button in the UI - this is a design aid, toggled with the
     G key. Remove the .gridlines markup to drop it entirely.
     -------------------------------------------- */
  function initGrid() {
    var on = false;
    var lines = $('#gridlines'), tag = $('#gridtag');
    if (!lines) return;
    function label() {
      if (!tag) return;
      var w = window.innerWidth;
      var cols = w < 640 ? 4 : w < 1024 ? 8 : 12;
      var gut  = w < 640 ? 16 : w < 1024 ? 20 : 24;
      tag.textContent = cols + ' columns / ' + gut + 'px gutter / ' + w + 'px';
    }
    function set(v) {
      on = v;
      lines.dataset.on = v ? 'true' : 'false';
      if (v) label();
    }
    window.addEventListener('resize', function () { if (on) label(); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'g' && e.key !== 'G') return;
      var t = e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
      set(!on);
    });
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    var els = $$('.rv');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.dataset.in = 'true'; }); return;
    }
    var io = new IntersectionObserver(function (rows) {
      rows.forEach(function (r) {
        if (r.isIntersecting) { r.target.dataset.in = 'true'; io.unobserve(r.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- mobile nav ---------- */
  function initNav() {
    var btn = $('#navtoggle'), links = $('#navlinks');
    if (!btn || !links) return;
    btn.addEventListener('click', function () {
      var open = links.dataset.open === 'true';
      links.dataset.open = open ? 'false' : 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });
    $$('a', links).forEach(function (a) {
      a.addEventListener('click', function () {
        links.dataset.open = 'false';
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    buildTicker();
    buildCompanies();
    buildWorkList();
    buildCaps();
    buildTimeline();
    drawArt();
    initGrid();
    initNav();
    initForm();
    if (window.CASE_PAGE && window.buildCase) window.buildCase();
    initReveal();
    var c = $('#copy');
    if (c) c.textContent = '© ' + new Date().getFullYear() + ' Felix Mari Tolero';
    var t;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(drawArt, 200); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawArt);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
