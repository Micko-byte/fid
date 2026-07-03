/* ════════════════════════════════════════════════════════════════════
   FID & Co. — Case study page logic
   Reads ?p=<slug>, renders a premium case study with animated text
   and an auto-advancing photo slideshow.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var projects = window.FID_PROJECTS || [];
  var main = document.getElementById("csMain");
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Nav scroll state + progress ──────────────────────── */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", y > 40);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* Split text into word-mask spans for the reveal animation */
  function splitWords(text) {
    return text.split(/\s+/).map(function (w) {
      return '<span class="word"><span>' + esc(w) + '</span></span>';
    }).join(" ");
  }

  /* ── Resolve project from query ───────────────────────── */
  var params = new URLSearchParams(window.location.search);
  var slug = params.get("p");
  var idx = projects.findIndex(function (p) { return p.slug === slug; });
  if (idx < 0 && slug != null && /^\d+$/.test(slug)) idx = parseInt(slug, 10); // tolerate index
  var p = projects[idx];

  if (!p) {
    main.innerHTML =
      '<div class="cs-404">' +
      '<span class="eyebrow" style="color:var(--signal)">Case study not found</span>' +
      '<h1>This case study has moved</h1>' +
      '<p>We couldn\'t find the project you were looking for. Browse the full portfolio instead.</p>' +
      '<a href="FID & Co - Home.html#work" class="btn btn-light"><span>View all work</span></a>' +
      '</div>';
    document.title = "Case study not found — FID & Co.";
    return;
  }

  document.title = p.client + " — FID & Co.";

  var next = projects[(idx + 1) % projects.length];
  var images = p.images && p.images.length ? p.images : [{ src: "", label: p.title.toLowerCase() }];

  /* ── Build markup ─────────────────────────────────────── */
  var slidesHtml = images.map(function (im, i) {
    return '<div class="cs-slide ph' + (i === 0 ? " active" : "") + '" data-i="' + i + '">' +
      '<img alt="" src="' + im.src + '" ' +
      'onload="this.parentNode.classList.add(\'has-img\')" onerror="this.remove()" />' +
      '<span class="ph-label">' + esc(im.label) + '</span></div>';
  }).join("");

  var dotsHtml = images.map(function (im, i) {
    return '<button class="cs-dot' + (i === 0 ? " active" : "") + '" data-i="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
  }).join("");

  var scopeHtml = p.scope.map(function (s, i) {
    return '<li><span class="n">' + ("0" + (i + 1)).slice(-2) + '</span><span>' + esc(s) + '</span></li>';
  }).join("");

  main.innerHTML =
    '<section class="cs-hero" data-screen-label="Case Hero">' +
      '<div class="cs-hero-watermark" aria-hidden="true">' + esc(p.title.split(" ")[0]) + '</div>' +
      '<div class="wrap cs-hero-inner">' +
        '<nav class="cs-breadcrumb fade-up">' +
          '<a href="FID & Co - Home.html">Home</a><span class="sep">/</span>' +
          '<a href="FID & Co - Home.html#work">Work</a><span class="sep">/</span>' +
          '<span class="cur">' + esc(p.sector) + '</span>' +
        '</nav>' +
        '<div class="cs-sector fade-up">' + esc(p.sector) + ' · ' + esc(p.years) + '</div>' +
        '<h1 class="cs-title lines">' + splitWords(p.client) + '</h1>' +
        '<p class="cs-client fade-up">' + esc(p.title) + '</p>' +
        (p.tagline ? '<p class="cs-tagline fade-up">' + esc(p.tagline) + '</p>' : '') +
        '<div class="cs-meta fade-up">' +
          '<div><div class="k">Client</div><div class="v">' + esc(p.client.split("—")[0].trim()) + '</div></div>' +
          '<div><div class="k">Sector</div><div class="v">' + esc(p.sector.split("&")[0].trim()) + '</div></div>' +
          '<div><div class="k">Year</div><div class="v">' + esc(p.years) + '</div></div>' +
        '</div>' +
      '</div>' +
      '<div class="wrap">' +
        '<div class="cs-show" data-screen-label="Slideshow">' +
          '<div class="cs-stage" id="csStage">' + slidesHtml +
            '<div class="cs-stage-frame" aria-hidden="true"></div>' +
          '</div>' +
          '<div class="cs-show-bar">' +
            '<div class="cs-caption"><span class="cs-counter"><span class="cur">01</span> <span class="tot">/ ' + ("0" + images.length).slice(-2) + '</span></span>' +
              '<span class="cs-caption-text">' + esc(images[0].label) + '</span></div>' +
            '<div class="cs-show-controls">' +
              '<div class="cs-dots" id="csDots">' + dotsHtml + '</div>' +
              '<div class="cs-arrows">' +
                '<button class="cs-arrow" id="csPrev" aria-label="Previous slide"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 18l-6-6 6-6"/></svg></button>' +
                '<button class="cs-arrow" id="csNext" aria-label="Next slide"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 6l6 6-6 6"/></svg></button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="cs-section">' +
      '<div class="wrap">' +
        '<div class="cs-overview">' +
          '<div class="lead-k reveal">The brief</div>' +
          '<p class="lead reveal" data-d="1">' + esc(p.desc) + '</p>' +
        '</div>' +
        '<hr class="cs-rule" />' +
        '<div class="cs-detail">' +
          '<div class="reveal"><h3>Scope of work</h3><ul class="cs-scope">' + scopeHtml + '</ul></div>' +
          '<div class="reveal" data-d="1"><div class="cs-impact"><div class="impact-k">The impact</div><p>' + esc(p.impact) + '</p></div></div>' +
        '</div>' +
        '<div class="cs-next">' +
          '<a class="cs-next-link" href="case-study.html?p=' + encodeURIComponent(next.slug) + '">' +
            '<div><div class="cs-next-k">Next case study</div>' +
              '<div class="cs-next-title">' + esc(next.client) + '</div></div>' +
            '<span class="cs-next-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' +
          '</a>' +
        '</div>' +
      '</div>' +
    '</section>';

  /* ── Hero text reveal (on load) ───────────────────────── */
  requestAnimationFrame(function () {
    setTimeout(function () {
      var lines = main.querySelector(".lines");
      if (lines) {
        var words = lines.querySelectorAll(".word > span");
        words.forEach(function (w, i) { w.style.transitionDelay = (0.04 * i + 0.1) + "s"; });
        lines.classList.add("in");
      }
      var ups = main.querySelectorAll(".cs-hero .fade-up");
      ups.forEach(function (el, i) { setTimeout(function () { el.classList.add("in"); }, 120 + i * 90); });
    }, 60);
  });

  /* ── Scroll reveal for body ───────────────────────────── */
  (function () {
    var els = main.querySelectorAll(".cs-section .reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ── Slideshow ────────────────────────────────────────── */
  var stage = document.getElementById("csStage");
  var dotsWrap = document.getElementById("csDots");
  var prev = document.getElementById("csPrev");
  var nextBtn = document.getElementById("csNext");
  var slides = stage ? stage.querySelectorAll(".cs-slide") : [];
  var dots = dotsWrap ? dotsWrap.querySelectorAll(".cs-dot") : [];
  var counterCur = main.querySelector(".cs-counter .cur");
  var captionText = main.querySelector(".cs-caption-text");
  var cur = 0, timer = null;
  var DUR = 5000;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.style.setProperty("--cs-dur", (DUR / 1000) + "s");

  function go(n, manual) {
    if (!slides.length) return;
    n = (n + slides.length) % slides.length;
    slides[cur].classList.remove("active");
    cur = n;
    slides[cur].classList.add("active");
    // dots: mark earlier ones seen, restart active one's progress bar
    dots.forEach(function (d, i) {
      d.classList.remove("active");
      d.classList.toggle("seen", i < cur);
    });
    var activeDot = dots[cur];
    if (activeDot) {
      activeDot.classList.remove("seen");
      void activeDot.offsetWidth; // reflow to restart CSS keyframe
      activeDot.classList.add("active");
    }
    if (counterCur) counterCur.textContent = ("0" + (cur + 1)).slice(-2);
    if (captionText) captionText.textContent = images[cur].label;
    schedule();
  }
  function schedule() {
    stop();
    if (!reduced && slides.length > 1) timer = setTimeout(function () { go(cur + 1); }, DUR);
  }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } }
  function restart() { schedule(); }

  // kick off auto-advance
  schedule();

  if (prev) prev.addEventListener("click", function () { go(cur - 1, true); });
  if (nextBtn) nextBtn.addEventListener("click", function () { go(cur + 1, true); });
  dots.forEach(function (d) {
    d.addEventListener("click", function () { go(parseInt(d.getAttribute("data-i"), 10), true); });
  });

  // pause on hover of the stage
  if (stage) {
    stage.addEventListener("mouseenter", stop);
    stage.addEventListener("mouseleave", function () { restart(); });
  }

  // keyboard nav
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") go(cur + 1, true);
    else if (e.key === "ArrowLeft") go(cur - 1, true);
  });

  // pause when tab hidden
  document.addEventListener("visibilitychange", function () { document.hidden ? stop() : restart(); });

  // swipe on touch
  if (stage) {
    var sx = 0, sActive = false;
    stage.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sActive = true; stop(); }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (!sActive) return; sActive = false;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1), true);
      else restart();
    }, { passive: true });
  }
})();
