* ==========================================================
   Eventra — application logic (vanilla JS, no dependencies)
   Sections:
   1. Utilities & storage      6. Registration form + validation
   2. Icons & generated art    7. Detail / Register / Tickets views
   3. Cards & browser panel    8. Modal, toast, confetti, .ics
   4. Countdown                9. Router
   5. Visual effects          10. Boot
   ========================================================== */
(function () {
  "use strict";
 
  /* ---------- 1. Utilities & storage ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const EVENTS = window.EVENTS;
  const CATEGORIES = window.CATEGORIES;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
 
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
 
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem("eventra:" + key); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem("eventra:" + key, JSON.stringify(value)); return true; }
      catch (e) { return false; }
    }
  };
 
  let tickets = store.get("tickets", []);
  let favs = new Set(store.get("favs", []));
  const saveTickets = () => store.set("tickets", tickets);
  const saveFavs = () => store.set("favs", Array.from(favs));
 
  const fmtDate = (iso, opts) => new Intl.DateTimeFormat("en-IN", opts || { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));
  const fmtTime = (iso) => new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(iso));
  const money = (n) => (n === 0 ? "Free" : "₹" + n.toLocaleString("en-IN"));
  const isEnded = (e) => new Date(e.end).getTime() < Date.now();
  const byId = (id) => EVENTS.find((e) => e.id === id);
 
  /* Deterministic "already booked" baseline so progress bars look realistic. */
  const hash = (str) => { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  const baseline = (e) => Math.floor(e.seats * (0.22 + (hash(e.id) % 55) / 100));
  const bookedByUser = (id) => tickets.filter((t) => t.eventId === id).reduce((n, t) => n + t.qty, 0);
  const seatsLeft = (e) => Math.max(0, e.seats - baseline(e) - bookedByUser(e.id));
  const percentFull = (e) => Math.min(100, Math.round(((e.seats - seatsLeft(e)) / e.seats) * 100));
 
  const upcoming = () => EVENTS.filter((e) => !isEnded(e)).sort((a, b) => new Date(a.date) - new Date(b.date));
 
  /* ---------- 2. Icons & generated art ---------- */
  const ICON = {
    cal: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    pin: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    heart: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    search: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a2 2 0 0 0 0 6v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a2 2 0 0 1 0-6V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z"/><path d="M13 5v2M13 17v2M13 11v2"/></svg>',
    none: '<svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M8 11h6"/></svg>'
  };
 
  /* Procedural cover art — Indian motifs per category, tinted by the event palette. */
  let artSeq = 0;
  function art(e) {
    const [c1, c2] = e.palette;
    const id = "g" + hash(e.id) + "_" + (artSeq++);
    const r = (n, i) => (hash(e.id + n + i) % 1000) / 1000;
    let m = "";
    const petals = (cx, cy, n, rx, ry, op) => Array.from({ length: n }, (_, i) => `<ellipse cx="${cx}" cy="${cy - ry}" rx="${rx}" ry="${ry}" fill="#fff" opacity="${op}" transform="rotate(${(360 / n) * i} ${cx} ${cy})"/>`).join("");
    const diya = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 0q14 18 28 0z" fill="#fff" opacity=".9"/><path d="M0-4q-7-10 0-20 7 10 0 20z" fill="#fff3b0"/></g>`;
    switch (e.category) {
      case "Festival":
        m += petals(290, 100, 16, 9, 54, .16) + petals(290, 100, 8, 7, 34, .28) + '<circle cx="290" cy="100" r="9" fill="#fff" opacity=".85"/>';
        for (let i = 0; i < 7; i++) m += diya(40 + i * 52, 172, .8);
        break;
      case "Dance":
        m += petals(280, 120, 12, 14, 70, .17) + petals(280, 120, 8, 11, 46, .26);
        m += '<path d="M60 170C90 90 130 60 175 62c-30 18-48 50-52 108z" fill="#fff" opacity=".25"/><circle cx="175" cy="52" r="12" fill="#fff" opacity=".8"/>';
        break;
      case "Music":
        for (let i = 0; i < 5; i++) m += `<line x1="0" y1="${60 + i * 22}" x2="400" y2="${60 + i * 22}" stroke="#fff" stroke-opacity=".3"/>`;
        m += '<path d="M70 190C60 120 90 70 160 40" fill="none" stroke="#fff" stroke-width="5" stroke-opacity=".7" stroke-linecap="round"/><ellipse cx="85" cy="150" rx="40" ry="26" fill="#fff" opacity=".35"/><circle cx="310" cy="70" r="28" fill="#fff" opacity=".45"/>';
        break;
      case "Workshop":
        for (let y = 0; y < 6; y++) for (let x = 0; x < 11; x++) m += `<circle cx="${40 + x * 32}" cy="${28 + y * 28}" r="3" fill="#fff" opacity=".7"/>`;
        m += '<path d="M72 56 200 28 328 56 200 84z M72 112 200 84 328 112 200 140z" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>';
        break;
      case "Heritage Walk":
        m += '<circle cx="320" cy="62" r="30" fill="#fff" opacity=".45"/>';
        m += '<path d="M120 200V120c0-14 14-20 14-34 0-16 10-26 10-40 0-8 6-16 14-22 8 6 14 14 14 22 0 14 10 24 10 40 0 14 14 20 14 34v80z" fill="#fff" opacity=".35"/><path d="M60 200v-50h50v50zM208 200v-50h50v50z" fill="#fff" opacity=".22"/><path d="M0 200h400" stroke="#fff" stroke-opacity=".5"/>';
        break;
      case "Craft & Food":
        for (let y = 0; y < 5; y++) for (let x = 0; x < 10; x++) m += `<path d="M${30 + x * 40} ${20 + y * 40 - 14}l14 14-14 14-14-14z" fill="#fff" opacity="${0.12 + ((x + y) % 3) * 0.12}"/>`;
        m += petals(300, 110, 10, 8, 38, .3) + '<circle cx="300" cy="110" r="7" fill="#fff" opacity=".8"/>';
        break;
      default: /* Literature */
        for (let i = 0; i < 6; i++) m += `<rect x="60" y="${34 + i * 26}" width="${220 - (i % 3) * 30}" height="6" rx="3" fill="#fff" opacity=".45"/>`;
        m += '<circle cx="320" cy="90" r="40" fill="#fff" opacity=".25"/><circle cx="320" cy="90" r="22" fill="#fff" opacity=".45"/>';
    }
    return `<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(e.category)} event artwork">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${id}s" cx=".2" cy=".1" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
      <rect width="400" height="200" fill="url(#${id})"/><rect width="400" height="200" fill="url(#${id}s)"/>${m}</svg>`;
  }
 
  /* Decorative mandala & lotus (inline SVG) */
  function mandalaSVG() {
    let g = "";
    [[88, 10, 30, 1.4], [70, 8, 24, 1.2], [52, 6, 18, 1.1], [34, 5, 12, 1]].forEach(([ry, rx, n, sw], k) => {
      for (let i = 0; i < n; i++) g += `<ellipse cx="100" cy="${100 - ry / 1.6}" rx="${rx}" ry="${ry / 1.6}" transform="rotate(${(360 / n) * i + k * 4} 100 100)" fill="none" stroke="currentColor" stroke-width="${sw * 0.5}"/>`;
    });
    return g + '<circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" stroke-width=".8"/><circle cx="100" cy="100" r="10" fill="currentColor"/>';
  }
  function lotusSVG() {
    return Array.from({ length: 8 }, (_, i) => `<ellipse cx="24" cy="12" rx="5" ry="11" transform="rotate(${i * 45} 24 24)" fill="currentColor" opacity="${i % 2 ? .45 : .8}"/>`).join("") + '<circle cx="24" cy="24" r="4" fill="currentColor"/>';
  }
 
  const barcode = (seed) => {
    let x = 0, bars = "";
    const h = hash(seed);
    for (let i = 0; i < 34; i++) { const w = 1 + ((h >> (i % 24)) + i) % 3; if (i % 2 === 0) bars += `<rect x="${x}" y="0" width="${w}" height="40" fill="#111"/>`; x += w + 0.4; }
    return `<svg class="qr" viewBox="0 0 ${x.toFixed(0)} 40" preserveAspectRatio="none" aria-hidden="true">${bars}</svg>`;
  };
 
  /* ---------- 3. Cards & browser panel ---------- */
  function cardHTML(e, i = 0) {
    const left = seatsLeft(e);
    const d = new Date(e.date);
    const low = left > 0 && left <= Math.max(10, e.seats * 0.1);
    const seatText = left === 0 ? "Sold out" : low ? `Only ${left} left` : `${left} seats left`;
    return `
    <article class="card glass tilt reveal" style="--d:${Math.min(i, 8) * 60}ms" data-id="${e.id}">
      <div class="art">
        ${art(e)}
        <div class="art-badges">
          <span class="chip">${esc(e.category)}</span>
          <button class="fav-btn" aria-pressed="${favs.has(e.id)}" aria-label="Save ${esc(e.title)} to favourites" data-fav="${e.id}">${ICON.heart}</button>
        </div>
        <div class="date-tag"><b>${d.getDate()}</b><small>${fmtDate(e.date, { month: "short" })}</small></div>
      </div>
      <div class="card-body">
        <h3><a href="#/event/${e.id}">${esc(e.title)}</a></h3>
        <div class="meta"><span>${ICON.clock}${fmtTime(e.date)}</span><span>${ICON.pin}${esc(e.venue)}</span><span class="region-tag">${esc(e.region)}</span></div>
        <p>${esc(e.short)}</p>
        <div class="card-foot">
          <div><div class="price">${money(e.price)}</div><div class="seats ${low || left === 0 ? "low" : ""}">${seatText}</div></div>
          <a class="btn btn-primary btn-sm" href="#/event/${e.id}" aria-label="View details for ${esc(e.title)}">Details ${ICON.arrow}</a>
        </div>
      </div>
    </article>`;
  }
 
  /* Reusable search / filter / sort panel. Each instance keeps its own state. */
  function createBrowser(container, { pageSize = 6, showAllLink = false } = {}) {
    const state = { q: "", cat: "All", sort: "soon", free: false, limit: pageSize };
    container.innerHTML = `
      <div class="toolbar glass">
        <div class="toolbar-row">
          <div class="search">${ICON.search}
            <input type="search" placeholder="Search events, regions, tags…" aria-label="Search events" data-q autocomplete="off" />
            <button class="clear" type="button" aria-label="Clear search" data-clear hidden>${ICON.x}</button>
          </div>
          <select aria-label="Sort events" data-sort>
            <option value="soon">Soonest first</option>
            <option value="popular">Most popular</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="az">A – Z</option>
          </select>
          <label class="toggle"><input type="checkbox" data-free /> Free only</label>
        </div>
        <div class="filters" role="group" aria-label="Filter by category">
          ${CATEGORIES.map((c) => `<button class="filter-chip" type="button" data-cat="${c}" aria-pressed="${c === "All"}">${c}</button>`).join("")}
        </div>
      </div>
      <p class="result-count" aria-live="polite" data-count></p>
      <div class="cards" data-grid></div>
      <div class="load-more" data-more></div>`;
 
    const grid = $("[data-grid]", container), countEl = $("[data-count]", container), more = $("[data-more]", container);
    const qInput = $("[data-q]", container), clearBtn = $("[data-clear]", container);
 
    function matches(e) {
      if (state.cat !== "All" && e.category !== state.cat) return false;
      if (state.free && e.price !== 0) return false;
      if (!state.q) return true;
      const hay = [e.title, e.category, e.region, e.venue, e.city, e.short, e.significance, e.tags.join(" "), fmtDate(e.date, { month: "long" })].join(" ").toLowerCase();
      return state.q.toLowerCase().split(/\s+/).every((w) => hay.includes(w));
    }
    const sorters = {
      soon: (a, b) => new Date(a.date) - new Date(b.date),
      popular: (a, b) => percentFull(b) - percentFull(a),
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      az: (a, b) => a.title.localeCompare(b.title)
    };
 
    function render() {
      const list = upcoming().filter(matches).sort(sorters[state.sort]);
      const shown = list.slice(0, state.limit);
      countEl.textContent = `${list.length} event${list.length === 1 ? "" : "s"} found` + (state.q ? ` for “${state.q}”` : "") + (state.cat !== "All" ? ` in ${state.cat}` : "");
      if (!list.length) {
        grid.innerHTML = `<div class="empty glass" style="grid-column:1/-1">${ICON.none}<h3>No events match your search</h3><p>Try a different keyword or clear the filters.</p><button class="btn btn-primary" data-reset>Reset filters</button></div>`;
      } else {
        grid.innerHTML = shown.map(cardHTML).join("");
      }
      more.innerHTML = "";
      if (list.length > shown.length) {
        more.innerHTML = `<button class="btn btn-glass" data-load>Load more (${list.length - shown.length})</button>`;
      } else if (showAllLink && list.length) {
        more.innerHTML = `<a class="btn btn-glass" href="#/events">View full calendar ${ICON.arrow}</a>`;
      }
      bindFx(container);
      observeReveals(container);
    }
 
    let t;
    qInput.addEventListener("input", () => {
      clearBtn.hidden = !qInput.value;
      clearTimeout(t);
      t = setTimeout(() => { state.q = qInput.value.trim(); state.limit = pageSize; render(); }, 160);
    });
    clearBtn.addEventListener("click", () => { qInput.value = ""; clearBtn.hidden = true; state.q = ""; render(); qInput.focus(); });
    $("[data-sort]", container).addEventListener("change", (ev) => { state.sort = ev.target.value; render(); });
    $("[data-free]", container).addEventListener("change", (ev) => { state.free = ev.target.checked; state.limit = pageSize; render(); });
    container.addEventListener("click", (ev) => {
      const chip = ev.target.closest("[data-cat]");
      if (chip) {
        state.cat = chip.dataset.cat; state.limit = pageSize;
        $$("[data-cat]", container).forEach((b) => b.setAttribute("aria-pressed", String(b === chip)));
        render();
      }
      if (ev.target.closest("[data-load]")) { state.limit += pageSize; render(); }
      if (ev.target.closest("[data-reset]")) {
        Object.assign(state, { q: "", cat: "All", free: false, sort: "soon", limit: pageSize });
        qInput.value = ""; clearBtn.hidden = true; $("[data-free]", container).checked = false; $("[data-sort]", container).value = "soon";
        $$("[data-cat]", container).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.cat === "All")));
        render();
      }
    });
    render();
    return { render };
  }
 
  /* Favourites (event delegation, works on every card in the app) */
  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-fav]");
    if (!btn) return;
    ev.preventDefault();
    const id = btn.dataset.fav;
    favs.has(id) ? favs.delete(id) : favs.add(id);
    saveFavs();
    $$(`[data-fav="${id}"]`).forEach((b) => b.setAttribute("aria-pressed", String(favs.has(id))));
    toast(favs.has(id) ? "Saved to favourites" : "Removed from favourites", "♥");
  });
 
  /* ---------- 4. Countdown ---------- */
  function countdownHTML(iso) {
    return `<div class="countdown" data-cd="${iso}" role="timer" aria-label="Time until event starts">
      ${["d", "h", "m", "s"].map((u, i) => `<div class="cd-box"><b data-u="${u}">00</b><small>${["Days", "Hours", "Mins", "Secs"][i]}</small></div>`).join("")}</div>`;
  }
  function tickCountdowns() {
    $$("[data-cd]").forEach((el) => {
      const diff = new Date(el.dataset.cd) - Date.now();
      if (diff <= 0) {
        el.outerHTML = `<div class="cd-ended">🎉 This event has started</div>`;
        return;
      }
      const v = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
      for (const k in v) { const n = $(`[data-u="${k}"]`, el); const s = String(v[k]).padStart(2, "0"); if (n.textContent !== s) n.textContent = s; }
    });
  }
 
  /* ---------- 5. Visual effects ---------- */
  function bindFx(root = document) {
    if (!finePointer || reduceMotion) return;
    $$(".tilt", root).forEach((el) => {
      if (el._fx) return; el._fx = true;
      el.addEventListener("pointermove", (ev) => {
        const r = el.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5, y = (ev.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateY(-4px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
    $$(".magnetic", root).forEach((el) => {
      if (el._mg) return; el._mg = true;
      el.addEventListener("pointermove", (ev) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${((ev.clientX - r.left - r.width / 2) * 0.18).toFixed(1)}px, ${((ev.clientY - r.top - r.height / 2) * 0.28).toFixed(1)}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }
 
  /* Glass specular highlight + page-wide cursor glow */
  const glow = $("#cursorGlow");
  document.addEventListener("pointermove", (ev) => {
    if (!finePointer) return;
    const g = ev.target.closest && ev.target.closest(".glass");
    if (g) { const r = g.getBoundingClientRect(); g.style.setProperty("--mx", ev.clientX - r.left + "px"); g.style.setProperty("--my", ev.clientY - r.top + "px"); }
    if (glow) { glow.style.opacity = 1; glow.style.transform = `translate(${ev.clientX - 260}px, ${ev.clientY - 260}px)`; }
  }, { passive: true });
 
  let io;
  function observeReveals(root = document) {
    const els = $$(".reveal:not(.in)", root);
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    io = io || new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
  }
 
  function countUp(el, to) {
    if (reduceMotion) { el.textContent = to.toLocaleString("en-IN"); return; }
    const start = performance.now(), dur = 1400;
    const step = (t) => { const p = Math.min(1, (t - start) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN"); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
 
  function typeLoop() {
    const el = $("#typed");
    const words = ["heritage", "festivals", "classical dance", "craft & colour", "tradition"];
    if (reduceMotion) return;
    let w = 0, c = 0, del = false;
    (function tick() {
      const word = words[w];
      el.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
      if (del && c === 0) { del = false; w = (w + 1) % words.length; }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 45 : 95);
    })();
  }
 
  /* ---------- 6. Registration form + validation ---------- */
  const validators = {
    name(v) {
      v = v.trim();
      if (!v) return "Please enter your full name.";
      if (v.length < 3) return "Name must be at least 3 characters.";
      if (!/^[A-Za-z][A-Za-z .'-]{2,59}$/.test(v)) return "Use letters, spaces, . ' or - only (max 60).";
      return "";
    },
    email(v) {
      v = v.trim();
      if (!v) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email, e.g. name@example.com.";
      return "";
    },
    phone(v) {
      const n = v.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
      if (!v.trim()) return "Please enter your phone number.";
      if (!/^[6-9]\d{9}$/.test(n)) return "Enter a valid 10-digit mobile number (starts with 6–9).";
      return "";
    },
    event(v) {
      if (!v) return "Please select an event.";
      const e = byId(v);
      if (!e) return "That event does not exist.";
      if (isEnded(e)) return "This event has already ended.";
      if (seatsLeft(e) === 0) return "Sorry, this event is sold out.";
      return "";
    },
    college(v) { return v.length > 80 ? "Keep this under 80 characters." : ""; },
    terms(checked) { return checked ? "" : "Please accept the terms to continue."; }
  };
 
  function buildForm({ eventId = "", locked = false, compact = false } = {}) {
    const form = document.createElement("form");
    form.noValidate = true;
    form.setAttribute("aria-label", "Event registration form");
    const options = upcoming().map((e) => {
      const full = seatsLeft(e) === 0;
      return `<option value="${e.id}" ${full ? "disabled" : ""} ${e.id === eventId ? "selected" : ""}>${esc(e.title)} — ${fmtDate(e.date, { day: "numeric", month: "short" })}${full ? " (sold out)" : ""}</option>`;
    }).join("");
 
    form.innerHTML = `
      <div class="form-grid">
        <div class="field full" data-field="event">
          <label for="f-event-${compact ? "c" : "p"}">Event <span class="req">*</span></label>
          <select id="f-event-${compact ? "c" : "p"}" name="event" ${locked ? "disabled" : ""} required>
            <option value="">Select an event…</option>${options}
          </select>
          <span class="msg" role="alert"></span>
        </div>
        <div class="field full" data-field="name">
          <label for="f-name-${compact ? "c" : "p"}">Full name <span class="req">*</span></label>
          <input id="f-name-${compact ? "c" : "p"}" name="name" type="text" autocomplete="name" placeholder="e.g. Ananya Sharma" maxlength="60" required />
          <span class="msg" role="alert"></span>
        </div>
        <div class="field ${compact ? "full" : ""}" data-field="email">
          <label for="f-email-${compact ? "c" : "p"}">Email address <span class="req">*</span></label>
          <input id="f-email-${compact ? "c" : "p"}" name="email" type="email" autocomplete="email" inputmode="email" placeholder="you@example.com" required />
          <span class="msg" role="alert"></span>
        </div>
        <div class="field ${compact ? "full" : ""}" data-field="phone">
          <label for="f-phone-${compact ? "c" : "p"}">Phone number <span class="req">*</span></label>
          <input id="f-phone-${compact ? "c" : "p"}" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="98765 43210" maxlength="16" required />
          <span class="msg" role="alert"></span>
        </div>
        <div class="field full" data-field="college">
          <label for="f-college-${compact ? "c" : "p"}">College / organisation <small class="muted">(optional)</small></label>
          <input id="f-college-${compact ? "c" : "p"}" name="college" type="text" autocomplete="organization" placeholder="e.g. your college or city" />
          <span class="msg" role="alert"></span>
        </div>
        <div class="field full">
          <label id="lbl-qty-${compact ? "c" : "p"}">Number of tickets</label>
          <div class="stepper" role="group" aria-labelledby="lbl-qty-${compact ? "c" : "p"}">
            <button type="button" data-step="-1" aria-label="Decrease tickets">−</button>
            <output name="qty" aria-live="polite">1</output>
            <button type="button" data-step="1" aria-label="Increase tickets">+</button>
          </div>
          <span class="msg" data-qty-msg>Maximum 5 tickets per registration.</span>
        </div>
        <div class="full summary" aria-live="polite"><span class="muted">Total</span><strong data-total>—</strong></div>
        <div class="field full" data-field="terms">
          <label class="check"><input type="checkbox" name="terms" /> <span>I agree to the event terms and to receive a confirmation email.</span></label>
          <span class="msg" role="alert"></span>
        </div>
        <div class="full"><button class="btn btn-primary" type="submit" style="width:100%">Confirm registration ${ICON.arrow}</button></div>
      </div>`;
 
    const qtyOut = $("output", form);
    const getQty = () => parseInt(qtyOut.textContent, 10);
    const ev = () => byId(form.elements.event.value || eventId);
    const maxQty = () => { const e = ev(); return e ? Math.max(1, Math.min(5, seatsLeft(e))) : 5; };
 
    function updateTotal() {
      const e = ev();
      $("[data-total]", form).textContent = e ? (e.price === 0 ? "Free" : `${money(e.price * getQty())}  (${getQty()} × ${money(e.price)})`) : "—";
    }
 
    function setState(name, msg, ok) {
      const f = $(`[data-field="${name}"]`, form);
      if (!f) return;
      f.classList.toggle("invalid", !!msg);
      f.classList.toggle("valid", !msg && !!ok);
      const m = $(".msg", f);
      m.textContent = msg || (ok ? "Looks good ✓" : "");
      const input = $("input, select", f);
      if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
    }
 
    function check(name) {
      const field = form.elements[name];
      const value = name === "terms" ? field.checked : name === "event" ? (field.value || eventId) : field.value;
      let msg = validators[name](value);
      if (!msg && name === "email") {
        const e = ev();
        if (e && tickets.some((t) => t.eventId === e.id && t.email.toLowerCase() === value.trim().toLowerCase())) msg = "This email is already registered for this event.";
      }
      setState(name, msg, name !== "college" && name !== "terms" ? value !== "" : false);
      return msg;
    }
 
    ["name", "email", "phone", "college"].forEach((n) => {
      form.elements[n].addEventListener("blur", () => check(n));
      form.elements[n].addEventListener("input", () => { if ($(`[data-field="${n}"]`, form).classList.contains("invalid")) check(n); });
    });
    form.elements.event.addEventListener("change", () => {
      check("event");
      if (getQty() > maxQty()) qtyOut.textContent = maxQty();
      if (form.elements.email.value) check("email");
      updateTotal();
    });
    form.elements.terms.addEventListener("change", () => check("terms"));
 
    form.addEventListener("click", (e) => {
      const b = e.target.closest("[data-step]");
      if (!b) return;
      const next = getQty() + parseInt(b.dataset.step, 10);
      const max = maxQty();
      if (next < 1) return;
      if (next > max) { $("[data-qty-msg]", form).textContent = `Only ${max} ticket${max > 1 ? "s" : ""} available per registration.`; return; }
      qtyOut.textContent = next;
      $("[data-qty-msg]", form).textContent = "Maximum 5 tickets per registration.";
      updateTotal();
    });
 
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = ["event", "name", "email", "phone", "college", "terms"];
      const errors = fields.filter((n) => check(n));
      if (errors.length) {
        const first = $(`[data-field="${errors[0]}"]`, form);
        first.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        const input = $("input, select", first); if (input) input.focus({ preventScroll: true });
        toast(`Please fix ${errors.length} field${errors.length > 1 ? "s" : ""} and try again`, "⚠");
        return;
      }
      const btn = $("button[type=submit]", form);
      btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Processing…';
      setTimeout(() => {
        const e2 = ev();
        const qty = getQty();
        const phoneDigits = form.elements.phone.value.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
        const ticket = {
          id: "EVT-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
          eventId: e2.id,
          name: form.elements.name.value.trim().replace(/\s+/g, " "),
          email: form.elements.email.value.trim(),
          phone: "+91 " + phoneDigits.slice(0, 5) + " " + phoneDigits.slice(5),
          college: form.elements.college.value.trim(),
          qty, total: e2.price * qty, createdAt: new Date().toISOString()
        };
        tickets.push(ticket);
        if (!saveTickets()) toast("Storage unavailable — ticket will not persist after refresh", "⚠");
        updateBadge();
        showConfirmation(ticket);
        route(); /* refresh seat counts on whatever page is showing */
      }, 900);
    });
 
    updateTotal();
    return form;
  }
 
  /* ---------- 7. Views ---------- */
  /* ----- Heritage building blocks (used on Home and Heritage pages) ----- */
  const H = window.HERITAGE;
  function factsHTML() {
    return H.facts.map((f) => `<div class="glass fact tilt reveal"><strong data-count="${f.n}">0</strong><b>${esc(f.l)}</b><span>${esc(f.s)}</span></div>`).join("");
  }
  function calHTML() {
    return H.calendar.map((c) => `<article class="glass cal-item tilt"><span class="cal-date">${esc(c.d)}</span><span class="cal-year">${esc(c.y)}</span><h4>${esc(c.t)}</h4><p>${esc(c.n)}</p>${c.ev ? `<a href="#/event/${c.ev}">See matching event →</a>` : ""}</article>`).join("");
  }
  function runCounters(root) {
    $$("[data-count]", root).forEach((el) => {
      if (el._done) return;
      const go = () => { el._done = true; countUp(el, +el.dataset.count); };
      if ("IntersectionObserver" in window && !reduceMotion) {
        const o = new IntersectionObserver((en) => { if (en[0].isIntersecting) { go(); o.disconnect(); } }, { threshold: 0.4 });
        o.observe(el);
      } else go();
    });
  }
  function createTabs(container, idp) {
    container.innerHTML = `<div class="tabs glass"><div class="tablist" role="tablist" aria-label="Heritage themes">${H.tabs.map((t, i) => `<button class="tab" role="tab" id="${idp}-tab-${t.id}" aria-selected="${i === 0}" aria-controls="${idp}-panel" tabindex="${i === 0 ? 0 : -1}" data-tab="${t.id}">${esc(t.name)}</button>`).join("")}</div><div class="tabpanel" role="tabpanel" id="${idp}-panel" tabindex="0"></div></div>`;
    const panel = $(".tabpanel", container);
    function show(id) {
      const t = H.tabs.find((x) => x.id === id);
      $$(".tab", container).forEach((b) => { const on = b.dataset.tab === id; b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; });
      panel.setAttribute("aria-labelledby", `${idp}-tab-${id}`);
      panel.innerHTML = `<h3>${esc(t.title)}</h3><p>${esc(t.intro)}</p><ul class="bullets">${t.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul><div class="didyou"><b>Did you know?</b> ${esc(t.fact)}</div>`;
      panel.style.animation = "none"; void panel.offsetWidth; panel.style.animation = "";
    }
    container.addEventListener("click", (ev) => { const b = ev.target.closest("[data-tab]"); if (b) show(b.dataset.tab); });
    container.addEventListener("keydown", (ev) => {
      const tabs = $$(".tab", container); const i = tabs.indexOf(document.activeElement);
      if (i < 0 || !["ArrowRight", "ArrowLeft", "Home", "End"].includes(ev.key)) return;
      ev.preventDefault();
      const n = ev.key === "Home" ? 0 : ev.key === "End" ? tabs.length - 1 : (i + (ev.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      tabs[n].focus(); show(tabs[n].dataset.tab);
    });
    show(H.tabs[0].id);
  }
 
  function renderHome() {
    const list = upcoming();
    const next = list[0];
    const hn = $("#heroNext");
    hn.innerHTML = next ? `
      <div class="art">${art(next)}</div>
      <span class="eyebrow">Next up</span>
      <h3>${esc(next.title)}</h3>
      <div class="meta"><span>${ICON.cal}${fmtDate(next.date)}</span><span>${ICON.pin}${esc(next.venue)}</span></div>
      ${countdownHTML(next.date)}
      <a class="btn btn-primary" style="width:100%" href="#/event/${next.id}">Register now ${ICON.arrow}</a>` : `<p>No upcoming events.</p>`;
 
    const totalSeats = list.reduce((n, e) => n + e.seats, 0);
    $("#heroStats").innerHTML = `
      <div class="stat glass"><strong data-count="${list.length}">0</strong><span>Live events</span></div>
      <div class="stat glass"><strong data-count="${CATEGORIES.length - 1}">0</strong><span>Categories</span></div>
      <div class="stat glass"><strong data-count="${totalSeats}">0</strong><span>Total seats</span></div>`;
 
    $("#heroMandala").innerHTML = mandalaSVG();
    $("#divLotus").innerHTML = lotusSVG();
    $("#homeFacts").innerHTML = factsHTML();
    $("#homeCal").innerHTML = calHTML();
    const tabsBox = $("#homeTabs"); if (!tabsBox._init) { tabsBox._init = true; createTabs(tabsBox, "home"); }
 
    const names = EVENTS.map((e) => e.title);
    $("#marquee").innerHTML = [...names, ...names].map((n) => `<span>${esc(n)}</span>`).join("");
 
    $("#featuredGrid").innerHTML = list.filter((e) => e.featured).slice(0, 4).map(cardHTML).join("");
 
    const panel = $("#browsePanel");
    if (!panel._init) { panel._init = true; createBrowser(panel, { pageSize: 6, showAllLink: true }); }
    runCounters($("#view-home"));
    bindFx($("#view-home")); observeReveals($("#view-home"));
    tickCountdowns();
  }
 
  function renderHeritage() {
    $("#heritageMandala").innerHTML = mandalaSVG();
    $("#hFacts").innerHTML = factsHTML();
    $("#hWhy").innerHTML = H.why.map(([t, p], i) => `<article class="glass why-card tilt reveal"><span class="num">0${i + 1}</span><h3>${esc(t)}</h3><p>${esc(p)}</p></article>`).join("");
    const box = $("#hTabs"); if (!box._init) { box._init = true; createTabs(box, "her"); }
    $("#hWH").innerHTML = H.worldHeritage.map(([n, y, p]) => `<div class="glass wh"><span class="yr">${y}</span><b>${esc(n)}</b><small>${esc(p)}</small></div>`).join("");
    $("#hICH").innerHTML = H.ich.map(([n, y]) => `<div class="glass ich"><span class="yr">${y}</span><b>${esc(n)}</b></div>`).join("");
    $("#hCal").innerHTML = calHTML();
    $("#hEtq").innerHTML = H.etiquette.map(([t, d]) => `<div class="glass etq-item"><h4>${esc(t)}</h4><p>${esc(d)}</p></div>`).join("");
    $("#hPreserve").innerHTML = H.preserve.map((p) => `<li class="glass">${esc(p)}</li>`).join("");
    const v = $("#view-heritage");
    runCounters(v); bindFx(v); observeReveals(v);
  }
 
  function renderEventsPage() {
    const panel = $("#eventsPagePanel");
    panel.innerHTML = "";
    createBrowser(panel, { pageSize: 9 });
  }
 
  function renderDetail(id) {
    const root = $("#detailRoot");
    const e = byId(id);
    if (!e) {
      root.innerHTML = `<div class="empty glass">${ICON.none}<h3>Event not found</h3><p>The event you are looking for does not exist or was removed.</p><a class="btn btn-primary" href="#/events">Browse events</a></div>`;
      return;
    }
    const left = seatsLeft(e), ended = isEnded(e);
    const mine = tickets.filter((t) => t.eventId === e.id);
    root.innerHTML = `
      <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a> / <a href="#/events">Events</a> / <span>${esc(e.title)}</span></nav>
      <div class="detail">
        <div>
          <div class="detail-hero glass"><div class="art">${art(e)}
            <div class="art-badges"><span class="chip">${esc(e.category)}</span><button class="fav-btn" aria-pressed="${favs.has(e.id)}" aria-label="Save to favourites" data-fav="${e.id}">${ICON.heart}</button></div></div></div>
          <article class="detail-main glass" style="margin-top:24px">
            <span class="eyebrow">${esc(e.category)} · ${esc(e.region)}</span>
            <h1>${esc(e.title)}</h1>
            <p class="lead">${esc(e.short)}</p>
            <div class="info-grid">
              <div class="info"><small>Date</small><b>${fmtDate(e.date)}</b></div>
              <div class="info"><small>Time</small><b>${fmtTime(e.date)} – ${fmtTime(e.end)}</b></div>
              <div class="info"><small>Venue</small><b>${esc(e.venue)}, ${esc(e.city)}</b></div>
              <div class="info"><small>Price</small><b>${money(e.price)}</b></div>
            </div>
            <h3>About this event</h3>
            <div class="prose">${e.about.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
            <h3>Cultural significance</h3>
            <div class="sig">${esc(e.significance)}</div>
            <h3>Highlights</h3>
            <ul class="bullets">${e.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
            <h3>Agenda</h3>
            <ul class="timeline">${e.agenda.map(([t, d]) => `<li><time>${esc(t)}</time>${esc(d)}</li>`).join("")}</ul>
            <h3>What to expect</h3>
            <div class="two-col">
              <div class="mini-card"><h4>On the day</h4><ul class="prose">${e.expect.map((x) => `<p style="margin-bottom:6px">• ${esc(x)}</p>`).join("")}</ul></div>
              <div class="mini-card"><h4>Dress code</h4><p>${esc(e.dress)}</p><h4 style="margin-top:14px">Bring</h4><p>${e.bring.map(esc).join(" · ")}</p></div>
            </div>
            <h3>Speakers &amp; guests</h3>
            <div class="speakers">${e.speakers.map((s) => { const nm = s.split(" — ")[0]; const ini = nm.replace(/^(Pt\.|Dr\.|Smt\.|Shri|Prof\.|Guru|Vidushi|Ustad|Chef|Yogacharya|Vaidya|Master|Kalaimamani|Band|Ensemble)\s+/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase(); return `<div class="speaker"><span class="avatar" style="--a:${e.palette[0]}">${esc(ini)}</span>${esc(s)}</div>`; }).join("")}</div>
            <h3>Frequently asked questions</h3>
            <div class="detail-faq">${e.faq.concat(window.COMMON_FAQ).map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
            <h3>Tags</h3>
            <div class="tags">${e.tags.map((t) => `<span class="tag">#${esc(t)}</span>`).join("")}</div>
            <p class="muted" style="margin-top:22px;font-size:.84rem">Sample event inspired by real traditions; organisers and artists are fictional.</p>
          </article>
        </div>
        <aside class="side" aria-label="Registration">
          <div class="glass form-card">
            <h3>${ended ? "Event ended" : "Starts in"}</h3>
            ${ended ? `<div class="cd-ended">This event has finished.</div>` : countdownHTML(e.date)}
            <div class="progress" role="progressbar" aria-valuenow="${percentFull(e)}" aria-valuemin="0" aria-valuemax="100" aria-label="Seats filled"><i data-w="${percentFull(e)}"></i></div>
            <p class="seats ${left <= 10 ? "low" : ""}">${left === 0 ? "Sold out" : `${left} of ${e.seats} seats left`}</p>
            <div class="actions" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
              <button class="btn btn-glass btn-sm" data-cal="${e.id}">${ICON.cal} Add to calendar</button>
              <button class="btn btn-glass btn-sm" data-share>Share link</button>
            </div>
          </div>
          <div class="glass form-card" id="detailForm">
            <h3>Register for this event</h3>
            <p class="muted" style="margin-bottom:18px;font-size:.92rem">${mine.length ? `You already have ${mine.length} registration${mine.length > 1 ? "s" : ""} for this event.` : "Fill in your details to reserve your seat."}</p>
          </div>
        </aside>
      </div>
      <section class="related"><h2>You might also like</h2><div class="cards" id="relatedGrid"></div></section>`;
 
    const holder = $("#detailForm", root);
    if (ended || left === 0) holder.insertAdjacentHTML("beforeend", `<div class="empty" style="padding:20px 0"><p>${ended ? "Registration is closed." : "All seats have been taken."}</p><a class="btn btn-glass" href="#/events">Browse other events</a></div>`);
    else holder.appendChild(buildForm({ eventId: e.id, locked: true, compact: true }));
 
    const rel = upcoming().filter((x) => x.id !== e.id).sort((a, b) => (b.category === e.category) - (a.category === e.category)).slice(0, 3);
    $("#relatedGrid", root).innerHTML = rel.map(cardHTML).join("");
 
    $("[data-cal]", root).addEventListener("click", () => downloadICS(e));
    $("[data-share]", root).addEventListener("click", async () => {
      const url = location.href;
      try {
        if (navigator.share) await navigator.share({ title: e.title, url });
        else { await navigator.clipboard.writeText(url); toast("Link copied to clipboard", "🔗"); }
      } catch (_) { /* user cancelled */ }
    });
    bindFx(root); observeReveals(root); tickCountdowns();
    requestAnimationFrame(() => $$("[data-w]", root).forEach((b) => (b.style.width = b.dataset.w + "%")));
  }
 
  function renderRegister(id) {
    const root = $("#registerRoot");
    root.innerHTML = "";
    root.appendChild(buildForm({ eventId: id || "" }));
  }
 
  function renderTickets() {
    const root = $("#ticketsRoot");
    if (!tickets.length) {
      root.innerHTML = `<div class="empty glass">${ICON.ticket}<h3>No tickets yet</h3><p>When you register for an event, your ticket will appear here.</p><a class="btn btn-primary" href="#/events">Find an event</a></div>`;
      return;
    }
    const sorted = [...tickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    root.innerHTML = `<div class="ticket-list">${sorted.map((t) => {
      const e = byId(t.eventId); if (!e) return "";
      return `<article class="ticket glass tilt reveal" data-ticket="${t.id}">
        <div class="ticket-top"><div class="mini-art art">${art(e)}</div>
          <div><span class="chip" style="background:var(--input-bg);color:var(--text-dim)">${esc(e.category)}</span><h3><a href="#/event/${e.id}">${esc(e.title)}</a></h3>
          <div class="meta"><span>${ICON.cal}${fmtDate(e.date, { day: "numeric", month: "short", year: "numeric" })}</span><span>${ICON.clock}${fmtTime(e.date)}</span></div></div></div>
        <div class="ticket-tear"></div>
        <div class="ticket-bot">
          <dl><div><dt>Attendee</dt><dd>${esc(t.name)}</dd></div><div><dt>Tickets</dt><dd>${t.qty} · ${money(t.total)}</dd></div>
          <div><dt>Email</dt><dd>${esc(t.email)}</dd></div><div><dt>Phone</dt><dd>${esc(t.phone)}</dd></div></dl>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><div><dt style="font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;color:var(--text-faint)">Ticket ID</dt><span class="code">${esc(t.id)}</span></div>${barcode(t.id)}</div>
          <div class="ticket-actions"><button class="btn btn-glass btn-sm" data-ics="${e.id}">${ICON.cal} Calendar</button><button class="btn btn-glass btn-sm" data-print>Print</button><button class="btn btn-danger btn-sm" data-cancel="${t.id}">Cancel</button></div>
        </div></article>`;
    }).join("")}</div>`;
    bindFx(root); observeReveals(root);
  }
 
  document.addEventListener("click", (ev) => {
    const cancel = ev.target.closest("[data-cancel]");
    if (cancel) {
      const t = tickets.find((x) => x.id === cancel.dataset.cancel);
      if (t && confirm(`Cancel ticket ${t.id}? Your seat will be released.`)) {
        tickets = tickets.filter((x) => x.id !== t.id); saveTickets(); updateBadge(); renderTickets(); toast("Registration cancelled", "✓");
      }
    }
    const ics = ev.target.closest("[data-ics]");
    if (ics) downloadICS(byId(ics.dataset.ics));
    if (ev.target.closest("[data-print]")) window.print();
  });
 
  /* ---------- 8. Modal, toast, confetti, .ics ---------- */
  const modal = $("#modal"), modalCard = $("#modalCard");
  let lastFocus = null;
  function openModal(html) {
    lastFocus = document.activeElement;
    modalCard.innerHTML = html;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const f = $("button, a", modalCard); f && f.focus();
  }
  function closeModal() { modal.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus && lastFocus.focus(); }
  modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
    if (e.key === "Tab" && !modal.hidden) { /* simple focus trap */
      const f = $$("button, a, [tabindex]", modalCard); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
 
  function showConfirmation(t) {
    const e = byId(t.eventId);
    openModal(`
      <svg class="check-anim" viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="30"/><path d="M28 43l10 10 19-21"/></svg>
      <h2 id="modalTitle">You're registered! 🎉</h2>
      <p class="muted">A confirmation has been saved to <b>My Tickets</b>. See you there, ${esc(t.name.split(" ")[0])}!</p>
      <div class="confirm-box">
        <div><span>Event</span><span>${esc(e.title)}</span></div>
        <div><span>When</span><span>${fmtDate(e.date)} · ${fmtTime(e.date)}</span></div>
        <div><span>Where</span><span>${esc(e.venue)}</span></div>
        <div><span>Tickets</span><span>${t.qty} · ${money(t.total)}</span></div>
        <div><span>Email</span><span>${esc(t.email)}</span></div>
        <div><span>Ticket ID</span><span class="code">${esc(t.id)}</span></div>
      </div>
      <div class="modal-actions">
        <a class="btn btn-primary" href="#/tickets" data-close>View my tickets</a>
        <button class="btn btn-glass" data-ics-modal>${ICON.cal} Add to calendar</button>
      </div>`);
    $("[data-ics-modal]", modalCard).addEventListener("click", () => downloadICS(e));
    confetti();
  }
 
  function toast(msg, icon = "✓") {
    const box = $("#toasts");
    const el = document.createElement("div");
    el.className = "toast glass"; el.innerHTML = `<span aria-hidden="true">${icon}</span><span>${esc(msg)}</span>`;
    box.appendChild(el);
    setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 320); }, 2800);
  }
 
  function confetti() {
    if (reduceMotion) return;
    const c = $("#confetti"), ctx = c.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.scale(dpr, dpr);
    const colors = ["#e8590c", "#f59e0b", "#c2255c", "#0b7a75", "#facc15", "#fff"];
    const ps = Array.from({ length: 150 }, () => ({
      x: innerWidth / 2, y: innerHeight * 0.45, vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 16 - 4,
      s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: colors[(Math.random() * colors.length) | 0]
    }));
    let frames = 0;
    (function draw() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ps.forEach((p) => { p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - frames / 170); ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s / 1.6); ctx.restore(); });
      if (++frames < 180) requestAnimationFrame(draw); else ctx.clearRect(0, 0, innerWidth, innerHeight);
    })();
  }
 
  function downloadICS(e) {
    const f = (iso) => { const d = new Date(iso); const p = (n) => String(n).padStart(2, "0"); return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`; };
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Eventra//EN", "BEGIN:VEVENT", `UID:${e.id}@eventra`, `DTSTAMP:${f(new Date().toISOString())}`,
      `DTSTART:${f(e.date)}`, `DTEND:${f(e.end)}`, `SUMMARY:${e.title}`, `LOCATION:${e.venue}, ${e.city}`, `DESCRIPTION:${e.short}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = e.id + ".ics"; document.body.appendChild(a); a.click(); a.remove();
    toast("Calendar file downloaded", "📅");
  }
 
  /* ---------- 9. Router ---------- */
  function updateBadge() {
    const b = $("#ticketBadge"); const n = tickets.reduce((s, t) => s + t.qty, 0);
    b.textContent = n; b.hidden = n === 0;
  }
 
  function route() {
    const parts = (location.hash.replace(/^#\/?/, "") || "").split("/");
    const name = parts[0] || "home";
    const arg = parts[1];
    const map = { home: "home", events: "events", event: "event", register: "register", tickets: "tickets", heritage: "heritage" };
    const view = map[name] || "home";
    const prev = $$(".view").find((v) => !v.hidden);
    const target = $(`#view-${view}`);
 
    $$(".view").forEach((v) => (v.hidden = v !== target));
    if (prev !== target) { target.style.animation = "none"; void target.offsetWidth; target.style.animation = ""; }
 
    $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.dataset.route === (view === "event" ? "events" : view)));
    $("#navLinks").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false");
 
    const titles = { home: "Eventra — Celebrate Indian Heritage, Festivals & Culture", heritage: "Why Indian Heritage Matters — Eventra", events: "All Events — Eventra", register: "Register — Eventra", tickets: "My Tickets — Eventra" };
    document.title = view === "event" ? ((byId(arg) || {}).title || "Event") + " — Eventra" : titles[view];
 
    if (view === "home") renderHome();
    if (view === "heritage") renderHeritage();
    if (view === "events") { if (prev !== target) renderEventsPage(); }
    if (view === "event") renderDetail(arg);
    if (view === "register") { if (prev !== target || arg) renderRegister(arg); }
    if (view === "tickets") renderTickets();
 
    if (prev !== target) { window.scrollTo({ top: 0, behavior: "auto" }); $("#main").focus({ preventScroll: true }); }
    observeReveals(target);
  }
 
  /* ---------- 10. Boot ---------- */
  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    store.set("theme", t);
    try { localStorage.setItem("eventra:theme", t); } catch (e) {}
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = t === "dark" ? "#1a0d17" : "#fff8e1";
  }
  $("#themeToggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(next); toast(next === "dark" ? "Dark mode on" : "Light mode on", next === "dark" ? "🌙" : "☀️");
  });
  $("#menuBtn").addEventListener("click", (e) => {
    const open = $("#navLinks").classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".nav")) { $("#navLinks").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false"); } });
 
  window.addEventListener("scroll", () => {
    const h = document.documentElement; const p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    $("#scrollProgress").style.transform = `scaleX(${p})`;
  }, { passive: true });
 
  window.addEventListener("hashchange", route);
  window.addEventListener("storage", (e) => { if (e.key === "eventra:tickets") { tickets = store.get("tickets", []); updateBadge(); route(); } });
  $("#year").textContent = new Date().getFullYear();
  updateBadge(); typeLoop(); bindFx(); route();
  setInterval(tickCountdowns, 1000);
})();