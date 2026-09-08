/* ==========================================================
   case.js - renders a single case-study page.
   The page shell sets window.PROJECT_ID and window.BASE.
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
  var BASE = window.BASE || '';
  var url  = function (p) { return BASE + p; };

  var project, study, idx;

  /* how many gallery columns each aspect ratio wants */
  function galSpan(ratio) {
    if (ratio === '1/1' || ratio === '4/3') return 'c4 t4 m12';
    return 'c6 t8 m12';
  }

  window.buildCase = function () {
    var id = window.PROJECT_ID;
    idx = window.PROJECTS.findIndex(function (p) { return p.id === id; });
    if (idx < 0) return;
    project = window.PROJECTS[idx];
    study   = window.CASES[id] || {};

    document.title = project.title + ' - Felix Mari Tolero';

    /* ---- header ---- */
    var head = $('#casehead');
    if (head) {
      head.innerHTML =
        '<span class="case__client">' + esc(project.client) + '</span>' +
        '<h1 class="display">' + esc(project.title) + '</h1>' +
        '<p class="case__lead">' + esc(study.summary || project.desc) + '</p>';
    }

    /* ---- meta ---- */
    var meta = $('#casemeta');
    if (meta) {
      var rows = [
        ['Year',       study.year || ''],
        ['Role',       study.role || ''],
        ['Discipline', study.discipline || ''],
        ['Tools',      (study.tools || []).join(', ')]
      ];
      meta.innerHTML = rows.map(function (r) {
        return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>';
      }).join('');
    }

    /* ---- brief / approach / output ---- */
    var body = $('#casebody');
    if (body) {
      body.innerHTML = (study.sections || []).map(function (s) {
        return '<div class="crow crow--text rv">' +
          '<h2>' + esc(s.h) + '</h2>' +
          '<p>' + esc(s.p) + '</p>' +
        '</div>';
      }).join('');
    }

    /* ---- the output ---- */
    var gal = $('#gallery');
    if (gal) {
      var span = galSpan(project.ratio);
      gal.innerHTML = project.items.map(function (it, n) {
        return '<div class="' + span + ' rv">' +
          '<button class="gitem' + (project.tall ? ' gitem--tall' : '') + '" data-n="' + n + '" ' +
                  'aria-label="Enlarge: ' + esc(it.cap) + '">' +
            '<figure>' +
              '<img src="' + url(it.src) + '" alt="' + esc(it.cap) + '" loading="lazy" decoding="async">' +
              '<figcaption>' + esc(it.cap) +
                (it.href ? '<span class="gitem__link">Watch on YouTube &nearr;</span>' : '') +
              '</figcaption>' +
            '</figure>' +
          '</button>' +
        '</div>';
      }).join('');
      $$('.gitem', gal).forEach(function (b) {
        b.addEventListener('click', function () { openLB(+b.dataset.n); });
      });
    }

    /* ---- next project ---- */
    var next = window.PROJECTS[(idx + 1) % window.PROJECTS.length];
    var nx = $('#nextup');
    if (nx) {
      nx.innerHTML =
        '<a href="' + next.id + '.html" style="display:flex;justify-content:space-between;' +
        'align-items:baseline;gap:20px;flex-wrap:wrap;width:100%">' +
          '<span class="label">Next project</span>' +
          '<span class="nextup__t">' + esc(next.title) + ' &rarr;</span>' +
        '</a>';
    }

    initLB();
  };

  /* ---------- lightbox for the gallery ---------- */
  var cur = 0, open = false, lastFocus = null;

  function openLB(n) {
    cur = n; open = true; lastFocus = document.activeElement;
    $('#lb').dataset.open = 'true';
    document.body.style.overflow = 'hidden';
    render();
    $('#lbx').focus();
  }
  function closeLB() {
    open = false;
    $('#lb').dataset.open = 'false';
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function step(d) {
    cur = (cur + d + project.items.length) % project.items.length;
    render();
  }
  function render() {
    var it = project.items[cur];
    $('#lbclient').textContent = project.client;
    $('#lbtitle').textContent  = project.title;
    $('#lbpos').textContent    = (cur + 1) + ' / ' + project.items.length;
    $('#lbcap').textContent    = it.cap;
    var stage = $('.lb__stage');
    stage.classList.toggle('lb__stage--scroll', !!project.tall);
    if (project.tall) stage.scrollTop = 0;
    var img = $('#lbimg');
    img.src = url(it.src);
    img.alt = it.cap;
    $('#lblinks').innerHTML = it.href
      ? '<a href="' + it.href + '" target="_blank" rel="noopener noreferrer">Watch on YouTube &nearr;</a>'
      : '';
  }
  function initLB() {
    if (!$('#lb')) return;
    $('#lbx').addEventListener('click', closeLB);
    $('#lbprev').addEventListener('click', function () { step(-1); });
    $('#lbnext').addEventListener('click', function () { step(1); });
    $('#lb').addEventListener('click', function (e) { if (e.target.id === 'lb') closeLB(); });
    document.addEventListener('keydown', function (e) {
      if (!open) return;
      if (e.key === 'Escape')     closeLB();
      if (e.key === 'ArrowLeft')  step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }
})();
