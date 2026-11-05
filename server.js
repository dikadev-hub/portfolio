const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3120;
const ROOT = __dirname;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".pdf": "application/pdf"
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let filePath = path.join(ROOT, urlPath === "/" ? "index.html" : urlPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    return res.end("Forbidden");
  }

  fs.stat(filePath, (err, stat) => {
    if (err || stat.isDirectory()) {
      if (err && !path.extname(filePath)) filePath = path.join(ROOT, "index.html");
      else {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        return res.end("<!DOCTYPE html><html><head><meta charset='utf-8'><title>404</title></head><body style='font-family:system-ui;background:#0a0a0b;color:#f4f4f5;display:flex;align-items:center;justify-content:center;height:100vh;margin:0'><div style='text-align:center'><h1 style='font-size:4rem;margin:0'>404</h1><p style='color:#9d9da8'>Halaman tidak ditemukan.</p><a href='/' style='color:#7a9dff;font-weight:700'>Kembali ke home</a></div></body></html>");
      }
    }
    fs.readFile(filePath, (e, data) => {
      if (e) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Internal server error");
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": TYPES[ext] || "application/octet-stream",
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=86400"
      });
      res.end(data);
    });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("[PORTFOLIO] dika x dev berjalan di http://0.0.0.0:" + PORT);
});
