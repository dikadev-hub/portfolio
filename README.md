# dika x dev — portfolio

website portofolio personal developer. dark premium, modern minimalism, subtle glassmorphism.

**created & developed by: dika x dev**

## fitur

- hero dengan terminal interaktif animasi typing
- about + statistik (mudah diedit lewat config)
- tech stack per kategori dengan logo teknologi asli (simple icons)
- featured projects dengan kategori filter (websites, applications, bots, open source)
- services + tombol konsultasi langsung ke whatsapp
- experience timeline
- integrasi github live api (repos, stars, forks) dengan fallback rapi
- contact form dengan validasi + kirim via whatsapp
- scroll reveal, active navbar indicator, smooth scrolling, mobile navigation
- loader transition ringan, respect prefers-reduced-motion
- seo + open graph metadata lengkap

## struktur

```
portfolio/
├── index.html
├── assets/
│   ├── images/og.jpg
│   ├── icons/logo.jpg
│   └── fonts/
├── css/
│   └── style.css
├── js/
│   ├── config.js      SEMUA data: identitas, kontak, stats, projects, timeline
│   ├── main.js        render hero, stats, skills, services, timeline, contact, CV
│   ├── projects.js    render projects, filter, github api integration
│   └── interactions.js terminal, navbar, reveal, form validation
└── README.md
```

## cara menjalankan

```
cd portfolio
npx serve .
```

atau pakai node:

```
npm install -g serve
serve -l 3120 .
```

buka `http://localhost:3120`.

## edit konten

semua data ada di satu file: `js/config.js`

- ganti nama, role, tagline, deskripsi
- ganti link kontak (github, telegram, whatsapp, email)
- ganti angka statistik (projects, techs, years, opensource)
- tambah/hapus project (nama, deskripsi, kategori, stack, status, demo, source)
- edit timeline journey

tanpa perlu menyentuh html sama sekali.

## teknologi

vanilla html/css/js tanpa framework build. font plus jakarta sans + jetbrains mono (google fonts). ikon svg inline. logo tech via simple icons cdn. github data via rest api publik.

## license

mit — bebas pakai & modifikasi. dilarang menjual ulang.
