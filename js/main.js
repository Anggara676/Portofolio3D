(function () {
"use strict";

const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const root = document.documentElement;

/* ---------- Isi teks dari CONFIG ---------- */
$$("[data-bind]").forEach(el => { if (CONFIG[el.dataset.bind] !== undefined) el.textContent = CONFIG[el.dataset.bind]; });
$("#tagline").textContent = CONFIG.tagline;
$("#footL").textContent = "© " + new Date().getFullYear() + " " + CONFIG.nama;
$("#mailAddr").textContent = CONFIG.email;

/* ---------- React Bits: SplitText ---------- */
function buildChars(container, text, step, offset) {
  let k = offset || 0;
  const words = text.split(" ");
  words.forEach((word, wi) => {
    const w = document.createElement("span");
    w.className = "w";
    Array.from(word).forEach(ch => {
      const s = document.createElement("span");
      s.className = container._cls || "ch";
      s.textContent = ch;
      s.style.setProperty("--d", k * step);
      s.style.animationDelay = k * step + "ms";
      k++;
      w.appendChild(s);
    });
    container.appendChild(w);
    if (wi < words.length - 1) container.appendChild(document.createTextNode(" "));
  });
  return k;
}
function splitText(el, text) {
  const lines = text.split("|");
  el.setAttribute("aria-label", lines.join(" "));
  el.textContent = "";
  let k = 0;
  lines.forEach(line => {
    const ln = document.createElement("span");
    ln.className = "line";
    ln.setAttribute("aria-hidden", "true");
    k = buildChars(ln, line, 32, k);
    el.appendChild(ln);
  });
}
splitText($("#welcomeTitle"), CONFIG.nama.toUpperCase());

/* Nama di Beranda */
(function () {
  const el = $("#heroName");
  el.setAttribute("aria-label", CONFIG.nama);
  const parts = CONFIG.nama.split(" ");
  parts.forEach((p, i) => {
    const s = document.createElement("span");
    s.style.display = "block";
    s.textContent = p;
    el.appendChild(s);
  });
})();

/* ---------- React Bits: RotatingText ---------- */
(function () {
  const el = $("#rot");
  const list = CONFIG.peran;
  let i = 0;
  function show(txt) {
    el.textContent = "";
    el._cls = "rc";
    buildChars(el, txt, 24, 0);
  }
  show(list[0]);
  if (rm || list.length < 2) return;
  setInterval(function () {
    el.classList.add("out");
    setTimeout(function () {
      el.classList.remove("out");
      i = (i + 1) % list.length;
      show(list[i]);
    }, 260);
  }, 2900);
})();

/* ---------- Render bagian dari data ---------- */
const ICON = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/>',
  code: '<path d="m8 8-5 4 5 4"/><path d="m16 8 5 4-5 4"/><path d="m14 4-4 16"/>',
  award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7 5-3 5 3-1.5-7"/>',
  git: '<circle cx="6" cy="5.5" r="2.2"/><circle cx="6" cy="18.5" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 7.7v8.6"/><path d="M18 11.2c0 3.2-2.6 4.3-6 4.3H8.2"/>',
  share: '<circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="m8.2 10.9 7.6-3.8M8.2 13.1l7.6 3.8"/>',
  out: '<path d="M7 17 17 7M8 7h9v9"/>',
  gh: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  li: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  ig: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  repo: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>'
};
const svg = (name, cls) => '<svg viewBox="0 0 24 24" aria-hidden="true"' + (cls ? ' class="' + cls + '"' : '') + '>' + ICON[name] + '</svg>';

const NAV = [
  { id: "beranda", label: "Beranda", icon: "home" },
  { id: "tentang", label: "Tentang", icon: "user" },
  { id: "skill", label: "Skill", icon: "code" },
  { id: "sertifikat", label: "Sertifikat", icon: "award" },
  { id: "github", label: "GitHub", icon: "git" },
  { id: "sosmed", label: "Sosmed", icon: "share" }
];
$("#dock").innerHTML = NAV.map((n, i) =>
  '<button class="dock-item" type="button" data-go="' + i + '" aria-label="' + n.label + '" title="' + n.label + '">' + svg(n.icon) + '<span class="lbl">' + n.label + '</span></button>'
).join("");

/* Foto: dipakai di kartu profil dan kartu identitas bergantung */
function applyPhoto(img, mono) {
  if (!CONFIG.foto) return;
  img.alt = "Foto " + CONFIG.nama;
  img.onload = function () { img.hidden = false; mono.hidden = true; };
  img.onerror = function () { img.hidden = true; mono.hidden = false; };
  img.src = CONFIG.foto;
}
/* Foto Tentang Saya: bisa berganti saat diklik */
(function () {
  const box = $("#photoBox"), stack = $("#photoStack"), mono = $("#photoMono"), dots = $("#photoDots"), hint = $("#photoHint");
  let list = Array.isArray(CONFIG.fotoTentang) ? CONFIG.fotoTentang.slice() : [];
  if (!list.length && CONFIG.foto) list = [CONFIG.foto];
  list = list.filter(Boolean);
  if (!list.length) return;
  Promise.all(list.map(src => new Promise(res => {
    const im = new Image(); im.decoding = "async";
    im.onload = () => res(im); im.onerror = () => res(null); im.src = src;
  }))).then(loaded => {
    const imgs = loaded.filter(Boolean);
    if (!imgs.length) return;
    imgs.forEach((im, i) => { im.alt = i === 0 ? "Foto " + CONFIG.nama : ""; stack.insertBefore(im, hint); });
    dots.innerHTML = imgs.map(() => "<i></i>").join("");
    stack.hidden = false; mono.hidden = true;
    let cur = 0;
    function show(i) {
      cur = (i + imgs.length) % imgs.length;
      imgs.forEach((im, k) => im.classList.toggle("on", k === cur));
      Array.from(dots.children).forEach((d, k) => d.classList.toggle("on", k === cur));
      box.setAttribute("aria-label", "Foto " + (cur + 1) + " dari " + imgs.length + ". Klik untuk ganti foto");
    }
    show(0);
    if (imgs.length < 2) { dots.hidden = true; return; }
    box.classList.add("multi");
    box.tabIndex = 0; box.setAttribute("role", "button");
    hint.hidden = false;
    function next() { hint.hidden = true; show(cur + 1); }
    box.addEventListener("click", next);
    box.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); next(); } });
  });
})();

$("#idMono").textContent = CONFIG.inisial;
applyPhoto($("#idImg"), $("#idMono"));
const L = CONFIG.lencana || {};
$("#idLevel").textContent = L.level || "";
$("#idLevel").hidden = !L.level;
$("#idTitle").textContent = L.judul || CONFIG.peranTunggal;
$("#idName").textContent = CONFIG.nama;
$("#idBottom").textContent = L.bawah || "PORTFOLIO";
$("#idRole").textContent = CONFIG.peranTunggal;
$("#strap").innerHTML = "<span>" + esc((CONFIG.nama + "  ·  ").toUpperCase().repeat(6)) + "</span>";

/* Ikon sosial di layar sambutan */
$("#welcomeSoc").innerHTML = CONFIG.sosmed.map(s => {
  const k = { github: "gh", linkedin: "li", instagram: "ig" }[s.nama.toLowerCase()];
  return '<a class="soc-ic" href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s.nama) + '" title="' + esc(s.nama) + '">' + (k ? svg(k) : esc(s.mono)) + "</a>";
}).join("");

$("#infoList").innerHTML = CONFIG.info.map(r => "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>").join("");
$("#bio").innerHTML = CONFIG.bio.map(p => "<p>" + esc(p) + "</p>").join("");

const nLang = CONFIG.skills.length, nCert = CONFIG.sertifikat.length, nRepo = CONFIG.github.repos.length;
$("#stats").innerHTML = [[nLang, "Bahasa dan teknologi"], [nCert, "Sertifikat"], [nRepo, "Proyek pilihan"]]
  .map(s => '<div class="stat"><b data-count="' + s[0] + '">' + s[0] + "</b><span>" + s[1] + "</span></div>").join("");

function levelLabel(v) { return v >= 85 ? "Mahir" : v >= 70 ? "Menengah" : "Berkembang"; }
$("#skillGrid").innerHTML = CONFIG.skills.map(s =>
  '<article class="card spot rv"><div class="skill-top"><span class="mono-tile">' + esc(s.mono) + '</span><div><h3>' + esc(s.nama) + "</h3><p>" + esc(s.ket) + '</p></div></div><div class="bar" style="--lv:' + s.level + '%"><i></i></div><div class="lvl"><span>' + levelLabel(s.level) + '</span><span class="mono">' + s.level + "%</span></div></article>"
).join("");
$("#ring").innerHTML = CONFIG.skills.map((s, i) =>
  '<div class="tile" style="--i:' + i + '"><b>' + esc(s.mono) + "</b><span>" + esc(s.nama) + "</span></div>"
).join("");
const tick = CONFIG.skills.map(s => '<span class="chip"><i></i>' + esc(s.nama) + "</span>").join("");
$("#tickerTrack").innerHTML = tick + tick;

$("#certGrid").innerHTML = CONFIG.sertifikat.map((c, i) =>
  '<div class="tilt rv"><article class="tilt-in cert"><div class="cert-top z1"><span class="cert-year">' + esc(c.tahun) + '</span><span class="seal z2">' + svg("check") + '</span></div>' +
  (c.gambar
    ? '<button type="button" class="cert-img z1" data-cert="' + i + '" aria-label="Perbesar sertifikat ' + esc(c.judul) + '"><img src="' + esc(c.gambar) + '" alt="Sertifikat ' + esc(c.judul) + '" loading="lazy"><span class="zoom">Perbesar</span></button>'
    : '<div class="cert-img empty z1"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10.5" r="1.5"/><path d="M21 16l-5-5-8 8"/></svg>Gambar sertifikat belum ditambahkan</div>') +
  '<div class="z1"><h3>' + esc(c.judul) + "</h3><p>" + esc(c.penerbit) + '</p></div><div class="cert-foot z1">' +
  c.topik.map(t => '<span class="tag-sm">' + esc(t) + "</span>").join("") +
  (c.url ? '<a class="tag-sm" href="' + esc(c.url) + '" target="_blank" rel="noopener noreferrer">Lihat kredensial</a>' : "") +
  "</div></article></div>"
).join("");

/* Pratinjau gambar sertifikat (lightbox) */
(function () {
  const lb = $("#lightbox"), img = $("#lbImg"), cap = $("#lbCap");
  function close() { lb.hidden = true; img.removeAttribute("src"); }
  $("#certGrid").addEventListener("click", e => {
    const b = e.target.closest("[data-cert]"); if (!b) return;
    const c = CONFIG.sertifikat[+b.dataset.cert];
    img.src = c.gambar; img.alt = "Sertifikat " + c.judul;
    cap.textContent = c.judul + " · " + c.penerbit + " · " + c.tahun;
    lb.hidden = false; $("#lbClose").focus();
  });
  lb.addEventListener("click", e => { if (e.target !== img) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !lb.hidden) close(); });
})();

const gh = CONFIG.github;
const ghUrl = "https://github.com/" + encodeURIComponent(gh.username);
const nLangRepo = new Set(gh.repos.map(r => r.bahasa)).size;
$("#ghCard").innerHTML =
  '<div class="avatar">' + esc(CONFIG.inisial) + "</div>" +
  "<h3>@" + esc(gh.username) + "</h3><p>" + esc(gh.deskripsi) + "</p>" +
  '<div class="gh-stats"><div><b data-count="' + nRepo + '">' + nRepo + "</b><span>Repo pilihan</span></div><div><b data-count=\"" + nLangRepo + '">' + nLangRepo + "</b><span>Bahasa</span></div></div>" +
  '<div><a class="btn btn-primary magnet" href="' + ghUrl + '" target="_blank" rel="noopener noreferrer">Buka profil GitHub ' + svg("out") + "</a></div>";

const LANG_DOT = { JavaScript: "#f0c94a", TypeScript: "#6aa6ff", Python: "#7bc47f", PHP: "#a99cff", Java: "#ff9a6b", "HTML & CSS": "#ff7aa8", SQL: "#5fd3e0", Bash: "#9ba7c2" };
$("#repoGrid").innerHTML = gh.repos.map(r =>
  '<a class="card spot repo rv" style="text-decoration:none" href="' + ghUrl + "/" + encodeURIComponent(r.nama) + '" target="_blank" rel="noopener noreferrer"><h3>' + svg("repo") + esc(r.nama) + "</h3><p>" + esc(r.desk) + '</p><div class="repo-foot"><span class="lang"><i style="--dot:' + (LANG_DOT[r.bahasa] || "var(--accent)") + '"></i>' + esc(r.bahasa) + "</span>" +
  r.topik.map(t => '<span class="tag-sm">' + esc(t) + "</span>").join("") + "</div></a>"
).join("");

$("#socGrid").innerHTML = CONFIG.sosmed.map(s =>
  '<div class="rv"><a class="card spot soc magnet" href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer"><span class="mono-tile">' + esc(s.mono) + "</span><div><strong>" + esc(s.nama) + "</strong><span>" + esc(s.handle) + "</span></div>" + svg("out") + "</a></div>"
).join("");

/* ---------- React Bits: Magnet ---------- */
const magnets = [];
function initMagnets() {
  if (rm) return;
  $$(".magnet").forEach(el => { if (magnets.indexOf(el) < 0) magnets.push(el); });
}
let magRaf = 0, magEvt = null;
document.addEventListener("pointermove", e => {
  if (e.pointerType === "touch" || rm) return;
  magEvt = e;
  if (magRaf) return;
  magRaf = requestAnimationFrame(function () {
    magRaf = 0;
    magnets.forEach(el => {
      if (!el.offsetParent && getComputedStyle(el).position !== "fixed") return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = magEvt.clientX - cx, dy = magEvt.clientY - cy;
      const pad = 70;
      if (Math.abs(dx) < r.width / 2 + pad && Math.abs(dy) < r.height / 2 + pad) {
        el.style.transform = "translate(" + (dx * 0.32).toFixed(1) + "px," + (dy * 0.32).toFixed(1) + "px)";
      } else if (el.style.transform) {
        el.style.transform = "";
      }
    });
  });
}, { passive: true });

/* ---------- React Bits: SpotlightCard ---------- */
function initSpot() {
  $$(".spot").forEach(c => {
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", (e.clientX - r.left) + "px");
      c.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });
}

/* ---------- React Bits: TiltedCard ---------- */
function initTilt() {
  $$(".tilt").forEach(el => {
    const inner = el.firstElementChild;
    el.addEventListener("pointermove", e => {
      if (e.pointerType === "touch" || rm) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      inner.style.transform = "rotateX(" + ((0.5 - py) * 20).toFixed(2) + "deg) rotateY(" + ((px - 0.5) * 22).toFixed(2) + "deg) scale(1.03)";
      inner.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
      inner.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
    });
    el.addEventListener("pointerleave", () => { inner.style.transform = ""; });
  });
}

/* ---------- React Bits: CountUp ---------- */
function countUp(el) {
  if (el._done) return;
  el._done = true;
  const to = +el.dataset.count;
  if (rm) { el.textContent = to; return; }
  const t0 = performance.now(), dur = 1500;
  (function step(t) {
    const p = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

/* ---------- React Bits: Dock (magnifikasi) ---------- */
(function () {
  const dock = $("#dock");
  const items = $$(".dock-item", dock);
  dock.addEventListener("pointermove", e => {
    if (e.pointerType === "touch" || rm) return;
    items.forEach(it => {
      const r = it.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      it.style.setProperty("--s", (1 + Math.max(0, 1 - d / 110) * 0.5).toFixed(3));
    });
  });
  dock.addEventListener("pointerleave", () => items.forEach(it => it.style.setProperty("--s", 1)));
})();

/* ---------- Cincin 3D skill (CSS 3D, bisa digeser) ---------- */
let orbitVisible = false;
(function () {
  const wrap = $("#orbit"), ring = $("#ring");
  const n = CONFIG.skills.length, tileW = 104, gap = 18;
  const r = Math.max(120, Math.round((tileW + gap) / (2 * Math.tan(Math.PI / n))));
  wrap.style.setProperty("--r", r + "px");
  wrap.style.setProperty("--step", (360 / n) + "deg");
  let rot = 0, vel = 0, base = rm ? 0 : 0.14, dragging = false, lastX = 0;
  vel = base;
  wrap.addEventListener("pointerdown", e => { dragging = true; lastX = e.clientX; try { wrap.setPointerCapture(e.pointerId); } catch (x) {} });
  wrap.addEventListener("pointermove", e => { if (!dragging) return; const dx = e.clientX - lastX; lastX = e.clientX; rot += dx * 0.4; vel = dx * 0.4; });
  const end = () => { dragging = false; };
  wrap.addEventListener("pointerup", end);
  wrap.addEventListener("pointercancel", end);
  new IntersectionObserver(es => { orbitVisible = es[0].isIntersecting; }, { threshold: 0.05 }).observe(wrap);
  (function frame() {
    if (orbitVisible) {
      if (!dragging) { rot += vel; vel += (base - vel) * 0.03; }
      ring.style.transform = "rotateX(-9deg) rotateY(" + rot.toFixed(2) + "deg)";
    }
    requestAnimationFrame(frame);
  })();
})();

/* ---------- Tema ---------- */
(function () {
  const btn = $("#themeBtn");
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const cur = () => root.getAttribute("data-theme") || (mq.matches ? "light" : "dark");
  function sync() { btn.classList.toggle("is-light", cur() === "light"); }
  try { const saved = localStorage.getItem("porto-tema"); if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved); } catch (e) {}
  btn.addEventListener("click", () => {
    const next = cur() === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("porto-tema", next); } catch (e) {}
    sync();
    if (sceneApi) sceneApi.colors();
  });
  mq.addEventListener("change", () => { sync(); if (sceneApi) sceneApi.colors(); });
  sync();
})();

/* ---------- Salin email ---------- */
(function () {
  const btn = $("#copyMail"), el = $("#mailAddr");
  btn.addEventListener("click", async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(CONFIG.email); ok = true; } catch (e) {}
    if (!ok) {
      try { const rg = document.createRange(); rg.selectNodeContents(el); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(rg); } catch (e) {}
    }
    btn.textContent = ok ? "Tersalin" : "Pilih lalu salin";
    setTimeout(() => { btn.textContent = "Salin"; }, 1900);
  });
})();

/* ---------- Scene 3D (Three.js) ---------- */
let sceneApi = null;
function initScene() {
  if (typeof THREE === "undefined") { root.classList.add("nogl"); return null; }
  const canvas = $("#scene");
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); }
  catch (e) { root.classList.add("nogl"); return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120);
  camera.position.set(0, 0, 9);
  const cA = new THREE.Color(), cB = new THREE.Color();

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.PointLight(0xffffff, 1.1); key.position.set(5, 6, 7); scene.add(key);
  const rim = new THREE.PointLight(0xffffff, 1.7); rim.position.set(-6, -4, 3); scene.add(rim);

  const hero = new THREE.Group(); scene.add(hero);
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.2, 0.36, 220, 32, 2, 3), new THREE.MeshStandardMaterial({ metalness: 0.6, roughness: 0.25 }));
  hero.add(knot);
  const cage = new THREE.Mesh(new THREE.IcosahedronGeometry(2.15, 1), new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.16 }));
  hero.add(cage);

  const geos = [new THREE.OctahedronGeometry(0.28), new THREE.IcosahedronGeometry(0.26, 0), new THREE.TorusGeometry(0.22, 0.08, 12, 24), new THREE.BoxGeometry(0.36, 0.36, 0.36), new THREE.TetrahedronGeometry(0.32)];
  const sats = geos.map((g, i) => {
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ metalness: 0.4, roughness: 0.35 }));
    hero.add(m);
    return { m: m, a: i * (Math.PI * 2 / geos.length), r: 2.7 + (i % 2) * 0.5, s: 0.28 + i * 0.05, y: (i % 3 - 1) * 0.55 };
  });

  const N = window.innerWidth < 700 ? 520 : 1000;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const rr = 7 + Math.random() * 16, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = rr * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = rr * Math.sin(ph) * Math.sin(th) * 0.6;
    pos[i * 3 + 2] = rr * Math.cos(ph) - 4;
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pm = new THREE.PointsMaterial({ size: 0.05, transparent: true, opacity: 0.75, sizeAttenuation: true, depthWrite: false });
  const pts = new THREE.Points(pg, pm);
  scene.add(pts);

  function tok(n) { return getComputedStyle(root).getPropertyValue(n).trim(); }
  function colors() {
    cA.set(tok("--scene-a") || "#6ff2d2");
    cB.set(tok("--scene-b") || "#ff9a6b");
    knot.material.color.copy(cA);
    knot.material.emissive.copy(cA).multiplyScalar(0.12);
    cage.material.color.copy(cB);
    sats.forEach((s, i) => s.m.material.color.copy(i % 2 ? cB : cA));
    pm.color.copy(cA);
    rim.color.copy(cB);
  }
  colors();

  let W = 0, H = 0, mobile = false;
  function resize() {
    W = window.innerWidth; H = window.innerHeight; mobile = W < 760;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  /* posisi objek per bagian: Beranda, Tentang, Skill, Sertifikat, GitHub, Sosmed */
  const DESK = [
    { x: 3.7, y: -0.5, z: -3.2, s: 0.95, r: 0 },
    { x: -2.9, y: 0.2, z: -1.2, s: 0.85, r: 1.3 },
    { x: 2.9, y: -0.2, z: -1.8, s: 0.8, r: 2.6 },
    { x: -2.9, y: 0, z: -2, s: 0.8, r: 3.9 },
    { x: 2.9, y: 0.2, z: -1.8, s: 0.85, r: 5.2 },
    { x: 0, y: 0.4, z: -2.8, s: 1.2, r: 6.5 }
  ];
  const MOB = [
    { x: 0.9, y: 1.9, z: -0.5, s: 0.62, r: 0 },
    { x: -0.9, y: 1.9, z: -2, s: 0.55, r: 1.3 },
    { x: 0.9, y: 1.9, z: -2.4, s: 0.55, r: 2.6 },
    { x: -0.9, y: 1.9, z: -2.4, s: 0.55, r: 3.9 },
    { x: 0.9, y: 1.9, z: -2.4, s: 0.55, r: 5.2 },
    { x: 0, y: 1.9, z: -2.8, s: 0.6, r: 6.5 }
  ];
  const WELC_D = { x: 2.4, y: 0.15, z: 0, s: 1.1, r: 0 };
  const WELC_M = { x: 0, y: 1.6, z: 0, s: 0.85, r: 0 };

  const cur = { x: 2.4, y: 0.15, z: 0, s: 1.1, r: 0 };
  let mode = "welcome", idx = 0, enterAt = -1, mx = 0, my = 0, last = performance.now();
  const speed = rm ? 0.15 : 1;
  window.addEventListener("pointermove", e => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = (e.clientY / window.innerHeight - 0.5) * 2; }, { passive: true });

  function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    const t = now / 1000;
    const set = mobile ? MOB : DESK;
    const tg = mode === "welcome" ? (mobile ? WELC_M : WELC_D) : set[Math.min(idx, set.length - 1)];
    const k = rm ? 1 : 0.06;
    cur.x += (tg.x - cur.x) * k; cur.y += (tg.y - cur.y) * k; cur.z += (tg.z - cur.z) * k; cur.s += (tg.s - cur.s) * k; cur.r += (tg.r - cur.r) * k;
    hero.position.set(cur.x, cur.y, cur.z);
    hero.scale.setScalar(cur.s);
    hero.rotation.y = cur.r;

    let warp = 0;
    if (enterAt >= 0) {
      const p = Math.min(1, (now - enterAt) / 1700);
      warp = Math.sin(p * Math.PI);
      if (p >= 1) enterAt = -1;
    }
    knot.rotation.x = t * 0.18 * speed;
    knot.rotation.y = t * 0.24 * speed + warp * 1.2;
    cage.rotation.y = -t * 0.08 * speed;
    cage.rotation.x = t * 0.05 * speed;
    sats.forEach(s => {
      s.a += dt * s.s * speed;
      s.m.position.set(Math.cos(s.a) * s.r, s.y + Math.sin(s.a * 1.7) * 0.2, Math.sin(s.a) * s.r);
      s.m.rotation.x += dt * 0.6 * speed; s.m.rotation.y += dt * 0.45 * speed;
    });
    pts.rotation.y = t * 0.012 * speed;

    const px = rm ? 0 : mx * (mobile ? 0.25 : 0.6), py = rm ? 0 : -my * (mobile ? 0.15 : 0.35);
    camera.position.x += (px - camera.position.x) * 0.04;
    camera.position.y += (py - camera.position.y) * 0.04;
    camera.position.z = 9 - warp * 3.4;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  return {
    colors: colors,
    setIndex: function (i) { idx = i; },
    enter: function () { mode = "app"; enterAt = performance.now(); }
  };
}
try { sceneApi = initScene(); } catch (e) { root.classList.add("nogl"); sceneApi = null; }

/* ---------- Navigasi & aktif bagian ---------- */
const secs = $$("main .sec");
const dockItems = $$(".dock-item");
function setActive(i) {
  dockItems.forEach((d, k) => { d.classList.toggle("active", k === i); if (k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
  if (sceneApi) sceneApi.setIndex(i);
}
function goTo(i) {
  const el = secs[i];
  if (el) el.scrollIntoView({ behavior: rm ? "auto" : "smooth", block: "start" });
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-go]");
  if (b) goTo(+b.dataset.go);
});
$("#brandBtn").addEventListener("click", () => goTo(0));

let navIO = null;
function startNavObserver() {
  if (!("IntersectionObserver" in window) || navIO) return;
  navIO = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) setActive(secs.indexOf(e.target)); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secs.forEach(s => navIO.observe(s));
}

/* ---------- Reveal saat scroll ---------- */
function showEl(el) {
  el.classList.add("in");
  $$("[data-count]", el).forEach(countUp);
  if (el.matches("[data-count]")) countUp(el);
}
function startReveals() {
  const els = $$(".rv");
  els.forEach(el => {
    const sib = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.setProperty("--rd", Math.min(sib, 6) * 70 + "ms");
  });
  if (!rm) $$("[data-count]").forEach(el => { el.textContent = "0"; });
  if (!("IntersectionObserver" in window) || rm) { els.forEach(showEl); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { showEl(e.target); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  els.forEach(el => io.observe(el));
  setTimeout(() => {
    els.forEach(el => {
      if (!el.classList.contains("in") && el.getBoundingClientRect().top < window.innerHeight * 1.1) showEl(el);
    });
  }, 3500);
}

/* ---------- Layar sambutan: grid titik & robot ---------- */
(function () {
  const wel = $("#welcome"), cv = $("#dots"), ctx = cv.getContext("2d"), robot = $("#robot");
  const GAP = 30;
  let w = 0, h = 0, dpr = 1, px = -9999, py = -9999, idle = true;
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (idle) { px = w * 0.62; py = h * 0.3; }
  }
  function draw(now) {
    ctx.clearRect(0, 0, w, h);
    const R = 190, t = rm ? 0 : now / 900;
    for (let x = GAP / 2; x < w; x += GAP) {
      for (let y = GAP / 2; y < h; y += GAP) {
        const d = Math.hypot(x - px, y - py);
        const near = d < R ? 1 - d / R : 0;
        const a = 0.1 + 0.07 * Math.sin(t + x * 0.021 + y * 0.034) + 0.85 * near * near;
        ctx.fillStyle = "rgba(" + (110 + 145 * near | 0) + "," + (190 + 65 * near | 0) + ",255," + Math.min(1, a).toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(x, y, 1.15 + 1.7 * near, 0, 6.2832); ctx.fill();
      }
    }
  }
  function frame(now) {
    if (wel.hidden) return;
    draw(now);
    if (!rm) requestAnimationFrame(frame);
  }
  window.addEventListener("resize", () => { size(); if (rm) draw(0); });
  window.addEventListener("pointermove", e => {
    if (wel.hidden) return;
    idle = false; px = e.clientX; py = e.clientY;
    robot.style.setProperty("--rx", ((e.clientX / w - 0.5) * 2).toFixed(3));
    robot.style.setProperty("--ry", ((e.clientY / h - 0.5) * 2).toFixed(3));
    if (rm) draw(0);
  }, { passive: true });
  size();
  requestAnimationFrame(frame);
})();

/* ---------- Kartu identitas bergantung (ayunan + tarik) ---------- */
(function () {
  const wrap = $("#badge"), pivot = $("#badgePivot"), card = $("#idCard");
  let ang = 0, vel = 0, drag = false, lastA = 0, lastT = 0, visible = true, last = performance.now();
  const K = 38, C = 2.6;
  function setAngle(a) {
    pivot.style.transform = "rotate(" + a.toFixed(2) + "deg)";
    card.style.setProperty("--sheen", (a * 4).toFixed(1));
  }
  function pointerAngle(e) {
    const r = wrap.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = Math.max(40, e.clientY - r.top);
    return Math.max(-38, Math.min(38, -Math.atan2(dx, dy) * 180 / Math.PI));
  }
  pivot.addEventListener("pointerdown", e => {
    drag = true; pivot.classList.add("drag");
    try { pivot.setPointerCapture(e.pointerId); } catch (x) {}
    lastA = ang = pointerAngle(e); lastT = performance.now(); vel = 0;
  });
  pivot.addEventListener("pointermove", e => {
    if (!drag) return;
    const now = performance.now(), a = pointerAngle(e);
    const dt = Math.max(1, now - lastT) / 1000;
    vel = (a - lastA) / dt; lastA = a; lastT = now; ang = a;
  });
  function release() { if (!drag) return; drag = false; pivot.classList.remove("drag"); vel = Math.max(-260, Math.min(260, vel)); }
  pivot.addEventListener("pointerup", release);
  pivot.addEventListener("pointercancel", release);
  if ("IntersectionObserver" in window) new IntersectionObserver(en => { visible = en[0].isIntersecting; }, { threshold: 0 }).observe(wrap);
  if (rm) { setAngle(0); return; }
  vel = 40; // ayunan awal kecil
  function loop(now) {
    const dt = Math.min(0.04, (now - last) / 1000); last = now;
    if (visible && !drag) {
      const sway = Math.sin(now / 1900) * 2.2; // angin pelan
      const acc = -K * (ang - sway * 0.25) - C * vel;
      vel += acc * dt; ang += vel * dt;
    }
    if (visible) setAngle(ang);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

/* ---------- Masuk portofolio ---------- */
const welcome = $("#welcome"), app = $("#app"), enterBtn = $("#enterBtn");
let entered = false;
enterBtn.addEventListener("click", () => {
  if (entered) return;
  entered = true;
  if (sceneApi) sceneApi.enter();
  welcome.classList.add("leaving");
  root.classList.add("js-in");
  app.hidden = false;
  window.scrollTo(0, 0);
  initSpot();
  initTilt();
  initMagnets();
  startReveals();
  startNavObserver();
  setActive(0);
  setTimeout(() => { welcome.hidden = true; }, rm ? 0 : 950);
});
magnets.push(enterBtn);
})();
