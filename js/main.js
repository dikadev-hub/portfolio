const DXP = (() => {
  const SOCIAL_ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.38 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.27 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.94 0A12 12 0 1 0 24 12 12 12 0 0 0 11.94 0zm5.85 7.1l-1.97 9.3c-.15.66-.54.82-1.09.51l-3-2.21-1.45 1.4a.51.51 0 0 1-.44.14l.5-3.26 5.94-5.37c.26-.23-.06-.36-.4-.13l-7.35 4.63-3.17-1c-.69-.22-.7-.69.14-1.02l12.4-4.78c.58-.22 1.08.13.89 1.02z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9 9 0 0 1-1.66-2.07c-.17-.3-.02-.47.13-.62.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 1 1 8.38 4.63zM12.05.5A11.5 11.5 0 0 0 1.8 16.9L.5 23.5l6.75-1.77a11.47 11.47 0 0 0 4.8 1.06h.01a11.5 11.5 0 0 0 0-23z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
  };

  const SERVICES = [
    { name: "Website Development", desc: "Website company profile, platform, atau produk digital yang cepat, aman, dan scalable.", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
    { name: "Landing Page Development", desc: "Landing page high-conversion dengan desain custom, animasi halus, dan performa optimal.", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>' },
    { name: "Backend & API Development", desc: "REST API, database design, authentication, dan server architecture yang solid.", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>' },
    { name: "WhatsApp Bot Development", desc: "Bot WhatsApp untuk otomatisasi bisnis: order, notifikasi, customer service, dan integrasi API.", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>' },
    { name: "Telegram Bot Development", desc: "Bot Telegram: dashboard inline, payment gateway, sistem ticketing, dan automation tools.", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/></svg>' },
    { name: "Custom Website & Application", desc: "Aplikasi web custom sesuai kebutuhan bisnis — dari konsep, desain, sampai deployment.", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
    { name: "VPS & Server Setup", desc: "Setup VPS, deployment, reverse proxy, SSL, monitoring, dan server hardening.", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"/><circle cx="12" cy="12" r="3"/></svg>' }
  ];

  const SKILLS = [
    {
      cat: "Frontend",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
      items: [{ n: "HTML", cdn: "html5" }, { n: "CSS", cdn: "css3" }, { n: "JavaScript", cdn: "javascript" }, { n: "Flutter / Dart", cdn: "flutter" }]
    },
    {
      cat: "Backend",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
      items: [{ n: "Node.js", cdn: "nodedotjs" }, { n: "REST API", cdn: "json" }, { n: "Express.js", cdn: "express" }]
    },
    {
      cat: "Programming",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      items: [{ n: "JavaScript", cdn: "javascript" }, { n: "Dart", cdn: "dart" }, { n: "Rust", cdn: "rust", note: "exploring" }]
    },
    {
      cat: "Tools & Infrastructure",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
      items: [{ n: "Git", cdn: "git" }, { n: "GitHub", cdn: "github" }, { n: "Linux", cdn: "linux" }, { n: "Docker", cdn: "docker" }, { n: "Termux", cdn: "android" }, { n: "VPS Management", cdn: "nginx" }]
    }
  ];

  const cdn = (slug) => `https://cdn.simpleicons.org/${slug}/9d9da8`;

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function renderHero() {
    document.getElementById("heroLead").textContent = SITE.heroText;
    const s = SITE.contact;
    const socials = document.getElementById("heroSocials");
    [["github", s.github, "GitHub"], ["telegram", s.telegram, "Telegram"], ["whatsapp", s.whatsapp, "WhatsApp"], ["mail", "mailto:" + s.email, "Email"]].forEach(([k, href, label]) => {
      const a = el(`<a href="${href}" target="_blank" rel="noopener" aria-label="${label}" title="${label}">${SOCIAL_ICONS[k]}</a>`);
      socials.appendChild(a);
    });
  }

  function renderStats() {
    const g = document.getElementById("statsGrid");
    const map = [["projects", "Projects Built"], ["techs", "Technologies Used"], ["years", "Years Learning"], ["opensource", "Open Source Contributions"]];
    map.forEach(([k, lbl]) => {
      g.appendChild(el(`<div class="stat-box"><div class="num">${SITE.stats[k]}</div><div class="lbl">${lbl}</div></div>`));
    });
  }

  function renderSkills() {
    const w = document.getElementById("skillsWrap");
    SKILLS.forEach(cat => {
      const chip = cat.items.map(i => `<span class="skill-chip"><img src="${cdn(i.cdn)}" alt="${i.n}" loading="lazy" onerror="this.style.display='none'">${i.n}${i.note ? `<small>· ${i.note}</small>` : ""}</span>`).join("");
      w.appendChild(el(`<div class="skill-cat reveal"><div class="skill-cat-head"><div class="ic">${cat.icon}</div><h3>${cat.cat}</h3></div><div class="skill-row">${chip}</div></div>`));
    });
  }

  function renderServices() {
    const g = document.getElementById("servicesGrid");
    SERVICES.forEach(s => {
      g.appendChild(el(`<div class="service-item reveal"><div class="ic">${s.icon}</div><h3>${s.name}</h3><p>${s.desc}</p><a class="btn" href="${SITE.contact.whatsapp}" target="_blank" rel="noopener">Konsultasi Gratis →</a></div>`));
    });
  }

  function renderTimeline() {
    const w = document.getElementById("timelineWrap");
    SITE.timeline.forEach(t => {
      w.appendChild(el(`<div class="tl-item reveal"><div class="tl-year">${t.year}</div><h3>${t.title}</h3><p>${t.desc}</p></div>`));
    });
  }

  function renderContact() {
    const l = document.getElementById("contactList");
    const s = SITE.contact;
    const items = [
      ["ic-git", SOCIAL_ICONS.github, "GitHub", s.github, s.github],
      ["ic-tg", SOCIAL_ICONS.telegram, "Telegram", s.telegram, s.telegram],
      ["ic-wa", SOCIAL_ICONS.whatsapp, "WhatsApp", s.whatsapp, s.whatsapp],
      ["ic-mail", SOCIAL_ICONS.mail, "Email", "mailto:" + s.email, s.email]
    ];
    items.forEach(([cls, icon, lbl, href, val]) => {
      l.appendChild(el(`<a class="contact-item reveal" href="${href}" target="_blank" rel="noopener"><div class="ic ${cls}">${icon}</div><div><div class="lbl">${lbl}</div><div class="val">${val.replace("https://", "").replace("mailto:", "")}</div></div></a>`));
    });
  }

  function downloadCV() {
    const cv = `DIKA X DEV\nFull Stack Developer — Independent Developer & Digital Creator\nBuilding Digital Experiences.\n\nKONTAK\nGitHub   : ${SITE.contact.github}\nTelegram : ${SITE.contact.telegram}\nWhatsApp : ${SITE.contact.whatsapp}\nEmail    : ${SITE.contact.email}\n\nFOKUS\nWebsite Development, Bot Development, Backend Development,\nUI/UX, dan Software Development.\n\nTECH STACK\nFrontend : HTML, CSS, JavaScript, Flutter / Dart\nBackend  : Node.js, REST API, Express.js\nTools    : Git, GitHub, Linux, Docker, Termux, VPS Management\n\nPROJECTS\n${SITE.projects.map(p => `- ${p.name} — ${p.desc}`).join("\n")}\n\nDokumen CV ini di-generate otomatis dari website portofolio Dika X Dev.\n`;
    const blob = new Blob([cv], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Dika-X-Dev-CV.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function init() {
    renderHero();
    renderStats();
    renderSkills();
    renderServices();
    renderTimeline();
    renderContact();
    document.getElementById("yearNow").textContent = new Date().getFullYear();
  }

  return { init, downloadCV, SOCIAL_ICONS, SERVICES };
})();
window.DXP = DXP;
document.addEventListener("DOMContentLoaded", DXP.init);
