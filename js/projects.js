const DXProjects = (() => {
  const CAT_LABEL = { websites: "website", applications: "application", bots: "bot", opensource: "open source" };

  function card(p) {
    const initial = p.name.charAt(0).toUpperCase();
    const stack = p.stack.map(s => `<span>${s}</span>`).join("");
    const liveCls = p.status.toLowerCase() === "live" ? " live" : "";
    return `<article class="project-card reveal" data-cat="${p.cat}">
      <div class="proj-thumb">
        <span class="proj-initial">${initial}</span>
        <span class="proj-status${liveCls}">${p.status}</span>
      </div>
      <div class="proj-body">
        <span class="proj-cat">${CAT_LABEL[p.cat] || p.cat}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="proj-stack">${stack}</div>
        <div class="proj-actions">
          <a class="btn btn-primary" href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>
          <a class="btn" href="${p.source}" target="_blank" rel="noopener">Source Code</a>
        </div>
      </div>
    </article>`;
  }

  function render() {
    const g = document.getElementById("projectsGrid");
    g.innerHTML = SITE.projects.map(card).join("");
  }

  function initFilter() {
    const bar = document.getElementById("filterBar");
    bar.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      bar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      document.querySelectorAll(".project-card").forEach(c => {
        c.classList.toggle("hidden", cat !== "all" && c.dataset.cat !== cat);
      });
    });
  }

  function renderGitHub() {
    const statsBox = document.getElementById("ghStats");
    const grid = document.getElementById("reposGrid");
    fetch("https://api.github.com/users/dikadev-hub")
      .then(r => { if (!r.ok) throw new Error("rate limited"); return r.json(); })
      .then(u => {
        statsBox.innerHTML = `
          <div class="gh-stat"><b>${u.public_repos ?? "—"}</b><span>Repositories</span></div>
          <div class="gh-stat"><b>${u.followers ?? "—"}</b><span>Followers</span></div>
          <div class="gh-stat"><b>${new Date(u.created_at).getFullYear() || "—"}</b><span>Sejak</span></div>`;
        return fetch("https://api.github.com/users/dikadev-hub/repos?sort=updated&per_page=6");
      })
      .then(r => { if (!r.ok) throw new Error("rate limited"); return r.json(); })
      .then(repos => {
        if (!Array.isArray(repos) || !repos.length) throw new Error("empty");
        grid.innerHTML = repos.map(r => `
          <a class="repo-card" href="${r.html_url}" target="_blank" rel="noopener">
            <div class="repo-name">
              <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/></svg>
              ${r.name}
            </div>
            <div class="repo-desc">${(r.description || "Tanpa deskripsi.").slice(0, 140)}</div>
            <div class="repo-meta">
              ${r.language ? `<span><span class="dot-lang" style="width:11px;height:11px;border-radius:50%;background:#4d7cff;display:inline-block"></span> ${r.language}</span>` : ""}
              <span><svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg> ${r.stargazers_count}</span>
              <span><svg viewBox="0 0 16 16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.75h-.5A2.25 2.25 0 0 1 3.5 6.5v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm3-8.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/></svg> ${r.forks_count}</span>
            </div>
          </a>`).join("");
      })
      .catch(() => {
        statsBox.innerHTML = `<div class="gh-stat"><b>—</b><span>Repositories</span></div><div class="gh-stat"><b>—</b><span>Followers</span></div>`;
        grid.innerHTML = `<div class="gh-fallback">
          <b style="color:var(--txt)">GitHub API sedang tidak tersedia</b><br>
          Kunjungi langsung profil dan repository di
          <a href="https://github.com/dikadev-hub" target="_blank" rel="noopener" style="color:var(--blue2);font-weight:700">github.com/dikadev-hub</a>
        </div>`;
      });
  }

  function init() {
    render();
    initFilter();
    renderGitHub();
  }

  return { init };
})();
document.addEventListener("DOMContentLoaded", DXProjects.init);
