const DXInteractions = (() => {
  const TERM_LINES = [
    ["dika@dev:~$", "whoami"],
    ["", "dika — full stack developer"],
    ["dika@dev:~$", "ls ./projects"],
    ["", "neochat/  greenaction/  freescript/  nokospedia/  lubymarket/"],
    ["dika@dev:~$", "status --services"],
    ["", "all systems <b>operational</b> · uptime 99.9%"],
    ["dika@dev:~$", "contact --open"],
    ["", "ready for new projects → <b>let's build something.</b>"]
  ];

  let reduced = false;

  function runTerminal() {
    const body = document.getElementById("termBody");
    body.innerHTML = "";
    let i = 0;
    const step = () => {
      if (i >= TERM_LINES.length) {
        const caret = document.createElement("div");
        caret.className = "term-line";
        caret.innerHTML = '<span class="term-prompt">dika@dev:~$</span><span class="term-caret"></span>';
        body.appendChild(caret);
        return;
      }
      const [prompt, out] = TERM_LINES[i];
      const line = document.createElement("div");
      line.className = "term-line";
      line.style.animationDelay = "0s";
      line.innerHTML = prompt
        ? `<span class="term-prompt">${prompt}</span><span class="term-out">${out}</span>`
        : `<span class="term-prompt"></span><span class="term-out">${out}</span>`;
      body.appendChild(line);
      i++;
      setTimeout(step, reduced ? 30 : 520);
    };
    step();
  }

  function navbar() {
    const nav = document.getElementById("topnav");
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const burger = document.getElementById("btnBurger");
    const menu = document.getElementById("mobileMenu");
    burger.addEventListener("click", () => menu.classList.toggle("open"));
    menu.addEventListener("click", e => { if (e.target.closest("a")) menu.classList.remove("open"); });
    document.addEventListener("click", e => {
      if (!menu.contains(e.target) && !burger.contains(e.target)) menu.classList.remove("open");
    });
  }

  function activeSection() {
    const links = document.querySelectorAll("#navLinks a");
    const sections = [...links].map(a => document.getElementById(a.dataset.sec)).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.toggle("active", l.dataset.sec === entry.target.id));
        }
      });
    }, { rootMargin: "-38% 0px -55% 0px" });
    sections.forEach(s => obs.observe(s));
  }

  function reveal() {
    const items = document.querySelectorAll(".reveal");
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(i => i.classList.add("in"));
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(i => obs.observe(i));
  }

  function contactForm() {
    const form = document.getElementById("contactForm");
    const note = document.getElementById("formNote");
    const send = document.getElementById("cfSend");
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("cfName");
      const email = document.getElementById("cfEmail");
      const subject = document.getElementById("cfSubject");
      const msg = document.getElementById("cfMsg");
      let ok = true;
      [[name, v => v.trim().length > 1], [email, v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)], [subject, v => v.trim().length > 1], [msg, v => v.trim().length > 5]].forEach(([input, test]) => {
        const group = input.closest(".fgroup");
        const valid = test(input.value);
        group.classList.toggle("err", !valid);
        if (!valid) ok = false;
      });
      note.className = "form-note show " + (ok ? "ok" : "bad");
      if (!ok) {
        note.textContent = "Periksa kembali form kamu — beberapa field belum valid.";
        return;
      }
      const text = `Halo Dika, saya ${name.value.trim()}.\n\n${subject.value.trim()}\n\n${msg.value.trim()}\n\nEmail saya: ${email.value.trim()}`;
      note.textContent = "Form valid! Membuka WhatsApp untuk mengirim pesan kamu…";
      window.open("https://wa.me/628981546983?text=" + encodeURIComponent(text), "_blank", "noopener");
      send.textContent = "Terkirim via WhatsApp ✓";
      setTimeout(() => { send.innerHTML = document.querySelector("#cfSend").innerHTML; send.textContent = "Send Message"; }, 2600);
      form.reset();
    });
  }

  function init() {
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    runTerminal();
    navbar();
    activeSection();
    reveal();
    contactForm();
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 250));
    setTimeout(() => loader.classList.add("hide"), 2200);
  }

  return { init };
})();
document.addEventListener("DOMContentLoaded", DXInteractions.init);
