document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const module = e.target.getAttribute('data-module');
    loadModule(module);
  });
});

function loadModule(moduleName) {
  fetch(`modules/${moduleName}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
      loadModuleScript(moduleName);
    });
}

function loadModuleScript(moduleName) {
  const script = document.createElement('script');
  script.src = `js/${moduleName}.js`;
  document.body.appendChild(script);
}

// Load trang chủ mặc định khi mở website
loadModule('home');