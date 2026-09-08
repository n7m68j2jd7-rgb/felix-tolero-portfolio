/* ==========================================================
   pixel.js - a tiny pixel-art drawing engine
   Everything on the site that looks hand-pixelled is drawn
   here on an integer grid, then blown up with nearest-neighbour
   scaling so every "pixel" stays a hard square.
   ========================================================== */
(function (global) {
  'use strict';

  var C = {
    void:'#0b0a14', night:'#12101f', panel:'#1b1830', panel2:'#252142',
    line:'#3b3566', paper:'#f4efe4', muted:'#a29cc9',
    pink:'#ff4f9a', pinkD:'#c1246b', cyan:'#46e0d2', cyanD:'#1f9c92',
    gold:'#ffc44f', goldD:'#c1892a', lime:'#a6e34d', violet:'#9b6dff',
    skin:'#e8b48c', skinS:'#c2865f', hair:'#20182c',
    grey:'#5b5482', greyD:'#332e56', greyL:'#8f88c2', white:'#ffffff'
  };

  function Pix(w, h) {
    this.w = w; this.h = h;
    this.d = new Array(w * h).fill(null);
  }
  Pix.prototype.set = function (x, y, c) {
    x |= 0; y |= 0;
    if (!c || x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    this.d[y * this.w + x] = c;
  };
  Pix.prototype.rect = function (x, y, w, h, c) {
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) this.set(x + i, y + j, c);
    return this;
  };
  Pix.prototype.frame = function (x, y, w, h, c) {
    this.rect(x, y, w, 1, c); this.rect(x, y + h - 1, w, 1, c);
    this.rect(x, y, 1, h, c); this.rect(x + w - 1, y, 1, h, c);
    return this;
  };
  Pix.prototype.hline = function (x, y, len, c) { return this.rect(x, y, len, 1, c); };
  Pix.prototype.vline = function (x, y, len, c) { return this.rect(x, y, 1, len, c); };
  /* filled circle, drawn on the grid so the edge stays chunky */
  Pix.prototype.disc = function (cx, cy, r, c) {
    for (var y = -r; y <= r; y++) for (var x = -r; x <= r; x++) {
      if (x * x + y * y <= r * r + r * 0.4) this.set(cx + x, cy + y, c);
    }
    return this;
  };
  Pix.prototype.ring = function (cx, cy, r, c) {
    for (var a = 0; a < 360; a += 3) {
      var rad = a * Math.PI / 180;
      this.set(cx + Math.round(Math.cos(rad) * r), cy + Math.round(Math.sin(rad) * r), c);
    }
    return this;
  };
  /* 50% checkerboard dither - the classic way to fake a gradient */
  Pix.prototype.dither = function (x, y, w, h, c, phase) {
    phase = phase || 0;
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) {
      if (((i + j + phase) & 1) === 0) this.set(x + i, y + j, c);
    }
    return this;
  };
  /* 25% dither - lighter texture */
  Pix.prototype.dither4 = function (x, y, w, h, c) {
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) {
      if ((i & 1) === 0 && (j & 1) === 0) this.set(x + i, y + j, c);
    }
    return this;
  };
  Pix.prototype.blit = function (other, ox, oy) {
    for (var y = 0; y < other.h; y++) for (var x = 0; x < other.w; x++) {
      var c = other.d[y * other.w + x];
      if (c) this.set(ox + x, oy + y, c);
    }
    return this;
  };
  Pix.prototype.toCanvas = function (scale) {
    scale = scale || 1;
    var cv = document.createElement('canvas');
    cv.width = this.w * scale; cv.height = this.h * scale;
    var g = cv.getContext('2d');
    g.imageSmoothingEnabled = false;
    for (var y = 0; y < this.h; y++) for (var x = 0; x < this.w; x++) {
      var c = this.d[y * this.w + x];
      if (!c) continue;
      g.fillStyle = c;
      g.fillRect(x * scale, y * scale, scale, scale);
    }
    return cv;
  };

  global.Pix = Pix;
  global.PXC = C;
})(window);
