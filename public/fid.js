/* ════════════════════════════════════════════════════════════════════
   FID & Co. — interactions
   ════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Year ─────────────────────────────────────────────── */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Nav scroll state + progress ──────────────────────── */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", y > 60);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ──────────────────────────────────────── */
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  var mmClose = document.getElementById("mmClose");
  function openMenu() { menu.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeMenu() { menu.classList.remove("open"); document.body.style.overflow = ""; }
  if (burger) burger.addEventListener("click", openMenu);
  if (mmClose) mmClose.addEventListener("click", closeMenu);
  if (menu) menu.querySelectorAll(".mm-link").forEach(function (a) { a.addEventListener("click", closeMenu); });

  /* ── Smooth anchor scroll (accounts for fixed nav) ────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      var top = t.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ── Marquee ──────────────────────────────────────────── */
  var marqueeItems = [
    { num: "", label: "Strategic Communications" },
    { num: "02", label: "Media Strategy" },
    { num: "03", label: "Digital & Influencer" },
    { num: "04", label: "Experiential Marketing" },
    { num: "05", label: "Brand Activations" }
  ];
  var mq = document.getElementById("marqueeTrack");
  if (mq) {
    var unit = marqueeItems.map(function (item) {
      var num = item.num ? '<span class="mq-no">' + item.num + '</span>' : '';
      return '<span class="marquee-item">' + num + '<span class="txt">' + item.label +
        '</span><span class="sep" aria-hidden="true"></span></span>';
    }).join("");
    // Duplicate enough to fill + loop seamlessly
    mq.innerHTML = unit + unit;
  }

  /* ── Services ─────────────────────────────────────────── */
  var services = [
    { num: "01", title: "Strategic Communications & PR" },
    { num: "02", title: "Media Management & Buying" },
    { num: "03", title: "Influencer, Creator & Talent" },
    { num: "04", title: "Digital Strategy & Social Media" },
    { num: "05", title: "Experiential Marketing & Events" }
  ];
  var sr = document.getElementById("expertiseList");
  if (sr) {
    sr.innerHTML = services.map(function (s) {
      return '<a href="#contact" class="expertise-item reveal">' +
        '<span class="expertise-left"><span class="idx">' + s.num + '</span>' +
        '<span class="expertise-name">' + s.title + '</span></span>' +
        '<svg class="row-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M7 17 17 7M9 7h8v8"/></svg></a>';
    }).join("");
  }

  /* ── Insights ─────────────────────────────────────────── */
  var articles = [
    { title: "The rise of creator-led marketing in Africa", date: "May 2026" },
    { title: "Why experiential marketing builds cultural relevance", date: "Apr 2026" },
    { title: "Entering African markets: why local insight matters", date: "Mar 2026" },
    { title: "AI, fashion and the future of content production in Africa", date: "Feb 2026" },
    { title: "Communicating at scale: lessons from national campaigns", date: "Jan 2026" },
    { title: "How hospitality brands build lifestyle relevance", date: "Dec 2025" }
  ];
  var ir = document.getElementById("insightsRows");
  if (ir) {
    ir.innerHTML = articles.map(function (a) {
      return '<a href="https://www.linkedin.com/company/fid-pr/" target="_blank" rel="noopener noreferrer" class="row reveal">' +
        '<span style="display:flex;align-items:baseline;gap:1.6rem;flex-wrap:wrap"><span class="row-date">' + a.date + '</span>' +
        '<span class="row-art-title">' + a.title + '</span></span>' +
        '<svg class="row-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 17 17 7M9 7h8v8"/></svg></a>';
    }).join("");
  }

  /* ── Platforms ────────────────────────────────────────── */
  var platforms = [
    { name: "The Tribe Vibe", tag: "Lifestyle · Music · Culture" },
    { name: "Suhba Series", tag: "Curated Conversations · Identity · Wellbeing" },
    { name: "The Capital Room", tag: "Leadership · Business · African Perspectives" }
  ];
  var pr = document.getElementById("platRows");
  if (pr) {
    pr.innerHTML = platforms.map(function (p) {
      return '<a href="#contact" class="plat-row reveal"><div><div class="plat-name">' + p.name + '</div>' +
        '<div class="plat-tag">' + p.tag + '</div></div>' +
        '<span class="plat-link">Partner <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>';
    }).join("");
  }

  /* ── Sectors ──────────────────────────────────────────── */
  var sectors = window.FID_SECTORS || [];
  var sg = document.getElementById("sectorGrid");
  if (sg) {
    sg.innerHTML = sectors.map(function (s, i) {
      return '<div class="sector reveal" data-i="' + i + '">' +
        '<span class="glyph">' + s.icon + '</span>' +
        '<span class="nm">' + s.name + '</span>' +
        '<span class="sector-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>' +
        '</div>';
    }).join("");

    // Floating image panel that follows the cursor & swaps per sector
    var sectorsSec = document.getElementById("sectors");
    var panel = document.createElement("div");
    panel.className = "sector-peek";
    panel.innerHTML = sectors.map(function (s, i) {
      return '<div class="sector-peek-img ph" data-i="' + i + '">' +
        '<img alt="" loading="lazy" src="' + s.src + '" ' +
        'onload="this.parentNode.classList.add(\'has-img\')" onerror="this.remove()" />' +
        '<div class="ph-frame"></div>' +
        '<span class="ph-label">' + s.name.toLowerCase() + '</span></div>';
    }).join("");
    if (sectorsSec) sectorsSec.appendChild(panel);

    var peekImgs = panel.querySelectorAll(".sector-peek-img");
    var finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    var px = 0, py = 0, tx = 0, ty = 0, peeking = false, praf = 0;
    function peekLoop() {
      px += (tx - px) * 0.14; py += (ty - py) * 0.14;
      panel.style.transform = "translate(" + px + "px," + py + "px)";
      if (peeking || Math.abs(tx - px) > 0.5 || Math.abs(ty - py) > 0.5) {
        praf = requestAnimationFrame(peekLoop);
      } else { praf = 0; }
    }
    function startPeek() { if (!praf) praf = requestAnimationFrame(peekLoop); }
    if (finePointer && sectorsSec) {
      sg.querySelectorAll(".sector").forEach(function (el) {
        var idx = parseInt(el.getAttribute("data-i"), 10);
        el.addEventListener("mouseenter", function () {
          peeking = true; panel.classList.add("show");
          peekImgs.forEach(function (im) { im.classList.toggle("active", parseInt(im.getAttribute("data-i"), 10) === idx); });
          startPeek();
        });
        el.addEventListener("mouseleave", function () {
          peeking = false; panel.classList.remove("show"); startPeek();
        });
        el.addEventListener("mousemove", function (e) {
          var r = sectorsSec.getBoundingClientRect();
          tx = e.clientX - r.left + 24; ty = e.clientY - r.top - 90;
          startPeek();
        });
      });
    }
  }

  /* ── Work / case studies (data shared via fid-data.js) ── */
  var projects = window.FID_PROJECTS || [];
  var wr = document.getElementById("workTrack");
  if (wr) {
    wr.innerHTML = projects.map(function (p, i) {
      var first = (p.images && p.images[0]) ? p.images[0] : { src: "", label: p.title.toLowerCase() };
      return '<a class="wcard reveal" href="/work?p=' + encodeURIComponent(p.slug) + '" data-i="' + i + '">' +
        '<div class="wcard-media"><div class="wph ph">' +
        '<img alt="" loading="lazy" src="' + first.src + '" ' +
        'onload="this.parentNode.classList.add(\'has-img\')" onerror="this.remove()" />' +
        '<div class="ph-frame"></div>' +
        '<span class="ph-label">' + first.label + '</span></div></div>' +
        '<div class="wcard-sector">' + p.sector + '</div>' +
        '<div class="wcard-title">' + p.client + '</div>' +
        '<div class="wcard-desc">' + p.title + '</div>' +
        '<div class="wcard-foot"><span>' + p.years + '</span> · <span>View case study</span>' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 17 17 7M9 7h8v8"/></svg></div></a>';
    }).join("");
  }

  /* ── Work carousel (drag + arrows) ────────────────────── */
  var track = document.getElementById("workTrack");
  var prevBtn = document.getElementById("workPrev");
  var nextBtn = document.getElementById("workNext");
  function cardStep() {
    var card = track && track.querySelector(".wcard");
    if (!card) return 360;
    var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "16") || 16;
    return card.getBoundingClientRect().width + gap;
  }
  function updateCarBtns() {
    if (!track || !prevBtn || !nextBtn) return;
    var max = track.scrollWidth - track.clientWidth - 2;
    prevBtn.disabled = track.scrollLeft <= 2;
    nextBtn.disabled = track.scrollLeft >= max;
  }
  if (track) {
    if (prevBtn) prevBtn.addEventListener("click", function () { track.scrollBy({ left: -cardStep(), behavior: "smooth" }); setTimeout(updateCarBtns, 380); });
    if (nextBtn) nextBtn.addEventListener("click", function () { track.scrollBy({ left: cardStep(), behavior: "smooth" }); setTimeout(updateCarBtns, 380); });
    track.addEventListener("scroll", updateCarBtns, { passive: true });
    setTimeout(updateCarBtns, 60);
    // Drag to scroll
    var down = false, startX = 0, startScroll = 0, moved = 0;
    track.addEventListener("pointerdown", function (e) {
      down = true; moved = 0; startX = e.clientX; startScroll = track.scrollLeft;
      track.classList.add("dragging");
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX; moved = Math.abs(dx);
      track.scrollLeft = startScroll - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!down) return;
      down = false; track.classList.remove("dragging"); updateCarBtns();
    });
    // Suppress click after a drag
    track.addEventListener("click", function (e) {
      if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
    }, true);
  }

  /* ── Modal ────────────────────────────────────────────── */
  var scrim = document.getElementById("modalScrim");
  var modalContent = document.getElementById("modalContent");
  var lastFocus = null;

  function openModal(i) {
    var p = projects[i];
    if (!p) return;
    lastFocus = document.activeElement;
    modalContent.innerHTML =
      '<button class="modal-close" id="modalClose"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg> Close</button>' +
      '<div class="modal-sector">' + p.sector + ' · ' + p.years + '</div>' +
      '<h2>' + p.client + '</h2>' +
      '<div class="modal-proj">' + p.title + '</div>' +
      '<div class="modal-ph ph"><div class="ph-frame"></div><span class="ph-label">campaign imagery — ' + p.title.toLowerCase() + '</span></div>' +
      '<p class="modal-desc">' + p.desc + '</p>' +
      '<div class="modal-grid"><div><h4>Scope of work</h4><ul class="modal-scope">' +
      p.scope.map(function (s) { return '<li>' + s + '</li>'; }).join("") +
      '</ul></div><div><h4>Impact</h4><p class="modal-impact">' + p.impact + '</p></div></div>';
    scrim.classList.add("open");
    document.body.style.overflow = "hidden";
    var c = document.getElementById("modalClose");
    if (c) { c.addEventListener("click", closeModal); c.focus(); }
  }
  function closeModal() {
    scrim.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  // Work cards now navigate to the React work detail page (/work?p=slug).
  // The legacy in-page modal is retained for reference but no longer bound.
  if (scrim) scrim.addEventListener("click", function (e) { if (e.target === scrim || e.target.classList.contains("modal-shell")) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && scrim.classList.contains("open")) closeModal(); });

  /* ── Scroll reveal ────────────────────────────────────── */
  function bindReveal() {
    var els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }
  bindReveal();

  /* ── Count-up stats ───────────────────────────────────── */
  var counted = false;
  function runCounts() {
    if (counted) return;
    counted = true;
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = 1600, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var statsEl = document.querySelector(".stats");
  if (statsEl && "IntersectionObserver" in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCounts(); sio.disconnect(); } });
    }, { threshold: 0.4 });
    sio.observe(statsEl);
  } else { runCounts(); }

  /* ── Philosophy line draw ─────────────────────────────── */
  var philoFill = document.getElementById("philoFill");
  var philoSec = document.getElementById("philosophy");
  if (philoFill && philoSec) {
    window.addEventListener("scroll", function () {
      var r = philoSec.getBoundingClientRect();
      var vh = window.innerHeight;
      var prog = (vh * 0.55 - r.top) / (r.height * 0.7);
      prog = Math.max(0, Math.min(1, prog));
      philoFill.style.transform = "scaleY(" + prog + ")";
    }, { passive: true });
  }

  /* ── Contact form ─────────────────────────────────────── */
  var form = document.getElementById("contactForm");
  var success = document.getElementById("formSuccess");
  var resetBtn = document.getElementById("resetForm");
  function setErr(field, on) { field.classList.toggle("invalid", on); }
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var fields = form.querySelectorAll(".field");
      fields.forEach(function (f) {
        var input = f.querySelector("input, select, textarea");
        if (!input) return;
        var name = input.getAttribute("name");
        var val = (input.value || "").trim();
        var bad = false;
        if (name === "name" && !val) bad = true;
        if (name === "email" && (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) bad = true;
        if (name === "service" && !val) bad = true;
        if (name === "message" && !val) bad = true;
        if (bad) ok = false;
        if (name !== "phone") setErr(f, bad);
      });
      if (!ok) return;
      form.style.display = "none";
      if (success) success.classList.add("show");
    });
    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        var f = input.closest(".field");
        if (f) setErr(f, false);
      });
    });
  }
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      form.reset();
      form.style.display = "";
      success.classList.remove("show");
    });
  }

  /* ── Live timestamp label removed (no video); keep screen labels static ── */
})();
