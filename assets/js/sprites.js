/* ==========================================================
   sprites.js - every piece of pixel art on the page.
   Each function returns a Pix grid; app.js scales it up.
   ========================================================== */
(function (global) {
  'use strict';
  var C = global.PXC;

  /* ---- HERO: a CRT monitor with a headphoned designer on screen ---- */
  function heroCRT() {
    var p = new global.Pix(96, 78);
    var sx = 11, sy = 9, sw = 74, sh = 38;

    /* --- monitor shell --- */
    p.rect(4, 2, 88, 56, C.grey);
    p.rect(4, 2, 88, 2, C.greyL);
    p.rect(4, 52, 88, 6, C.greyD);
    p.frame(4, 2, 88, 56, C.void);

    /* --- screen recess --- */
    p.rect(8, 6, 80, 44, C.void);
    p.rect(sx - 1, sy - 1, sw + 2, sh + 2, C.greyD);

    /* --- screen: night sky, dithered from violet down to black --- */
    p.rect(sx, sy, sw, sh, C.night);
    p.rect(sx, sy, sw, 8, C.panel2);
    p.dither(sx, sy + 8, sw, 4, C.panel2);

    var stars = [[6,3],[14,6],[22,2],[31,6],[44,3],[52,8],[61,2],[68,5],
                 [9,12],[27,11],[38,14],[57,13],[70,10],[19,16],[49,17],[33,19]];
    stars.forEach(function (s, i) {
      p.set(sx + s[0], sy + s[1], i % 3 === 0 ? C.cyan : C.paper);
    });

    /* moon */
    p.disc(sx + 60, sy + 8, 5, C.gold);
    p.rect(sx + 57, sy + 5, 2, 2, C.goldD);
    p.rect(sx + 62, sy + 10, 2, 2, C.goldD);
    p.rect(sx + 61, sy + 4, 1, 1, C.goldD);

    /* HUD, top-left of screen */
    p.rect(sx + 3, sy + 3, 3, 3, C.pink);
    p.rect(sx + 8, sy + 3, 14, 1, C.greyL);
    p.rect(sx + 8, sy + 5, 9, 1, C.grey);

    /* faint ground haze behind the figure */
    p.dither4(sx, sy + 28, sw, 4, C.panel);
    p.dither(sx, sy + 31, sw, 2, C.void);
    p.rect(sx, sy + 33, sw, 5, C.void);

    /* --- character bust --- */
    var cx = sx + 34;
    p.rect(cx - 12, sy + 31, 24, 7, C.violet);        /* shoulders */
    p.rect(cx - 12, sy + 31, 24, 1, '#b58cff');
    p.rect(cx - 3, sy + 30, 6, 4, C.panel2);          /* collar */
    p.rect(cx - 2, sy + 28, 4, 3, C.skinS);           /* neck */
    p.rect(cx - 7, sy + 16, 14, 13, C.skin);          /* head */
    p.rect(cx + 4, sy + 16, 3, 13, C.skinS);          /* cheek shading */
    p.rect(cx - 7, sy + 14, 14, 4, C.hair);           /* hair */
    p.rect(cx - 8, sy + 16, 1, 4, C.hair);
    p.rect(cx + 6, sy + 16, 1, 4, C.hair);
    p.rect(cx - 6, sy + 13, 11, 1, C.hair);           /* fringe crown */
    p.rect(cx - 5, sy + 21, 2, 2, C.void);            /* eyes */
    p.rect(cx + 1, sy + 21, 2, 2, C.void);
    p.rect(cx - 2, sy + 25, 4, 1, C.skinS);           /* mouth */

    /* headphones */
    p.rect(cx - 9, sy + 12, 19, 2, C.cyan);
    p.rect(cx - 10, sy + 13, 2, 5, C.cyan);
    p.rect(cx + 8, sy + 13, 2, 5, C.cyan);
    p.rect(cx - 11, sy + 18, 4, 7, C.cyanD);
    p.rect(cx - 10, sy + 19, 2, 5, C.cyan);
    p.rect(cx + 7, sy + 18, 4, 7, C.cyanD);
    p.rect(cx + 8, sy + 19, 2, 5, C.cyan);

    /* boom mic sweeping to the mouth */
    p.set(cx + 7, sy + 25, C.cyanD);
    p.set(cx + 6, sy + 26, C.cyanD);
    p.set(cx + 5, sy + 26, C.cyanD);
    p.rect(cx + 3, sy + 26, 2, 2, C.pink);

    /* --- control strip below the screen --- */
    p.rect(10, 51, 24, 5, C.void);
    p.dither4(12, 52, 20, 3, C.greyL);
    for (var v = 38; v <= 52; v += 4) p.rect(v, 51, 2, 5, C.void);
    p.rect(58, 52, 3, 3, C.lime);
    p.disc(72, 53, 3, C.void); p.rect(71, 52, 2, 2, C.greyL);
    p.disc(82, 53, 3, C.void); p.rect(81, 52, 2, 2, C.pink);

    /* --- stand --- */
    p.rect(38, 58, 20, 9, C.grey);
    p.rect(50, 58, 8, 9, C.greyD);
    p.frame(38, 58, 20, 9, C.void);
    p.rect(26, 67, 44, 7, C.grey);
    p.rect(26, 67, 44, 1, C.greyL);
    p.rect(26, 71, 44, 3, C.greyD);
    p.frame(26, 67, 44, 7, C.void);
    return p;
  }

  /* ---- CAPABILITY ICONS (16x16) ---- */
  function iconMic() {
    var p = new global.Pix(16, 16);
    p.rect(5, 2, 6, 7, C.pink);
    p.rect(6, 1, 4, 1, C.pink);
    p.rect(6, 9, 4, 1, C.pink);
    p.hline(6, 3, 4, C.pinkD);
    p.hline(6, 5, 4, C.pinkD);
    p.hline(6, 7, 4, C.pinkD);
    [[3,7],[3,8],[3,9],[4,10],[5,11]].forEach(function(a){p.set(a[0],a[1],C.cyan);});
    [[12,7],[12,8],[12,9],[11,10],[10,11]].forEach(function(a){p.set(a[0],a[1],C.cyan);});
    p.rect(7, 11, 2, 3, C.cyan);
    p.rect(4, 14, 8, 2, C.cyan);
    return p;
  }
  /* bg punches the thumb-hole so it matches the panel behind the icon */
  function iconPalette(bg) {
    var p = new global.Pix(16, 16);
    p.disc(8, 8, 7, C.gold);
    p.disc(11, 11, 2, bg || C.panel);
    p.rect(4, 4, 2, 2, C.pink);
    p.rect(8, 3, 2, 2, C.cyan);
    p.rect(11, 6, 2, 2, C.violet);
    p.rect(3, 8, 2, 2, C.lime);
    return p;
  }
  function iconFilm() {
    var p = new global.Pix(16, 16);
    p.rect(2, 2, 12, 12, C.cyan);
    p.rect(2, 2, 2, 12, C.cyanD);
    p.rect(12, 2, 2, 12, C.cyanD);
    for (var y = 3; y < 13; y += 3) { p.rect(2, y, 2, 2, C.void); p.rect(12, y, 2, 2, C.void); }
    p.rect(5, 4, 6, 8, C.void);
    p.rect(6, 5, 4, 6, C.paper);
    p.rect(7, 7, 2, 2, C.pink);
    return p;
  }
  function iconWeb() {
    var p = new global.Pix(16, 16);
    p.rect(1, 3, 14, 10, C.violet);
    p.rect(1, 3, 14, 3, '#7b4fe0');
    p.rect(3, 4, 1, 1, C.pink);
    p.rect(5, 4, 1, 1, C.gold);
    p.rect(7, 4, 1, 1, C.lime);
    p.rect(3, 8, 7, 1, C.paper);
    p.rect(3, 10, 10, 1, '#c9b6ff');
    p.rect(3, 12, 5, 1, '#c9b6ff');
    p.frame(1, 3, 14, 10, C.void);
    return p;
  }

  /* ---- LOGO MARK (16x16) ---- */
  function logoMark() {
    var p = new global.Pix(16, 16);
    p.frame(0, 0, 16, 16, C.pink);
    p.frame(1, 1, 14, 14, C.pinkD);
    p.rect(4, 3, 3, 10, C.paper);
    p.rect(4, 3, 8, 3, C.paper);
    p.rect(4, 7, 6, 3, C.cyan);
    return p;
  }

  /* ---- ABOUT: top-down desk flat-lay (72x48) ---- */
  function deskScene() {
    var p = new global.Pix(72, 48);
    p.rect(0, 0, 72, 48, C.panel2);
    p.dither4(0, 0, 72, 48, '#2c2750');

    /* laptop */
    p.rect(6, 6, 30, 24, C.greyD);
    p.rect(8, 8, 26, 16, C.void);
    p.rect(10, 10, 14, 1, C.pink);
    p.rect(10, 12, 20, 1, C.cyan);
    p.rect(10, 14, 11, 1, C.gold);
    p.rect(10, 16, 17, 1, C.greyL);
    p.rect(10, 18, 8, 1, C.lime);
    p.rect(8, 25, 26, 4, C.grey);
    p.dither(9, 26, 24, 2, C.greyD);

    /* tablet + stylus */
    p.rect(42, 5, 24, 18, C.greyD);
    p.rect(44, 7, 20, 14, C.night);
    p.disc(54, 14, 4, C.pink);
    p.ring(54, 14, 6, C.violet);
    for (var i = 0; i < 7; i++) p.rect(61 + i, 30 - i, 2, 2, C.gold);
    p.rect(59, 30, 2, 2, C.goldD);

    /* notebook */
    p.rect(4, 35, 24, 11, C.gold);
    p.rect(4, 35, 24, 2, C.goldD);
    p.rect(7, 39, 16, 1, C.goldD);
    p.rect(7, 41, 12, 1, C.goldD);
    p.rect(7, 43, 18, 1, C.goldD);

    /* headphones: headband arc plus two ear cups */
    for (var a = 200; a <= 340; a += 4) {
      var r = a * Math.PI / 180;
      p.set(44 + Math.round(Math.cos(r) * 8), 41 + Math.round(Math.sin(r) * 8), C.cyan);
      p.set(44 + Math.round(Math.cos(r) * 7), 41 + Math.round(Math.sin(r) * 7), C.cyanD);
    }
    p.rect(35, 39, 4, 7, C.cyan);
    p.rect(36, 40, 2, 5, C.cyanD);
    p.rect(49, 39, 4, 7, C.cyan);
    p.rect(50, 40, 2, 5, C.cyanD);

    /* mug seen from above */
    p.disc(63, 40, 5, C.pink);
    p.disc(63, 40, 3, C.pinkD);
    p.rect(68, 38, 3, 2, C.pink);
    p.rect(70, 39, 2, 3, C.pink);
    p.rect(68, 41, 3, 2, C.pink);
    return p;
  }

  /* ---- HERO BACKGROUND: deterministic starfield ---- */
  function stars(w, h, seed) {
    var p = new global.Pix(w, h);
    var s = seed || 7;
    function rnd() { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }
    var n = Math.floor(w * h / 240);
    for (var i = 0; i < n; i++) {
      var x = Math.floor(rnd() * w), y = Math.floor(rnd() * h), r = rnd();
      p.set(x, y, r > 0.93 ? C.cyan : r > 0.86 ? C.pink : C.line);
    }
    return p;
  }

  global.SPRITES = {
    heroCRT: heroCRT, iconMic: iconMic, iconPalette: iconPalette,
    iconFilm: iconFilm, iconWeb: iconWeb, logoMark: logoMark,
    deskScene: deskScene, stars: stars
  };
})(window);
