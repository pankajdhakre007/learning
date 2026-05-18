function renderTechIssuePage(pageData) {
  const root = document.getElementById('root');
  if (!root) {
    return;
  }

  let html = `
    <div class="hero">
      <p class="hero-eyebrow">${pageData.hero.eyebrow}</p>
      <h1>${pageData.hero.title}</h1>
      <p>${pageData.hero.description}</p>
    </div>

    <div class="section">
      <p class="section-label">Common synonyms</p>
      <div class="pill-grid">
        ${pageData.synonyms.map(s => `<span class="pill">${s}</span>`).join('')}
      </div>
    </div>

    <div class="section">
      <p class="section-label">How interviewers phrase this</p>
      <div class="q-list">
        ${pageData.questions.map(q => `<div class="q-item">${q}</div>`).join('')}
      </div>
    </div>

    <div class="section">
      <p class="section-label">Layer-by-layer breakdown</p>
      <div class="layer-tabs">
        ${pageData.layers.map((l, i) => `<button class="tab-btn ${i === 0 ? 'active' : ''}" onclick="showLayer(${i})">${l.name}</button>`).join('')}
      </div>

      ${pageData.layers.map((layer, idx) => `
        <div class="layer-card ${idx === 0 ? 'visible' : ''}" id="layer-${idx}">
          <p class="layer-title">${layer.title}</p>
          <p class="layer-desc">${layer.description}</p>
          <div class="layer-grid">
            <div class="sub-card">
              <p class="sub-label">Observable symptoms</p>
              <ul class="sub-list">
                ${layer.symptoms.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
            <div class="sub-card">
              <p class="sub-label">Root causes</p>
              <ul class="sub-list">
                ${layer.causes.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
            <div class="sub-card">
              <p class="sub-label">System effects</p>
              <ul class="sub-list">
                ${layer.effects.map(e => `<li>${e}</li>`).join('')}
              </ul>
            </div>
            <div class="sub-card">
              <p class="sub-label">Mitigations</p>
              <ul class="sub-list">
                ${layer.mitigations.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="metrics-row">
            <span class="metrics-label">Key metrics</span>
            ${layer.metrics.map(m => `<span class="metric-pill">${m}</span>`).join('')}
          </div>
          <div class="tradeoff-box">
            <p class="tradeoff-label">Tradeoffs</p>
            <ul class="tradeoff-list">
              ${layer.tradeoffs.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="section">
      <p class="section-label">Universal distributed systems pattern</p>
      <div class="compare-wrap">
        <table class="compare-table">
          <thead>
            <tr>
              <th>Technology</th>
              <th>Equivalent problem</th>
            </tr>
          </thead>
          <tbody>
            ${pageData.comparisons.map(c => `<tr><td>${c.tech}</td><td>${c.problem}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="insight">
      <p>${pageData.insight}</p>
    </div>
  `;

  root.innerHTML = html;
}

function showLayer(idx) {
  document.querySelectorAll('.layer-card').forEach((c, i) => {
    c.classList.toggle('visible', i === idx);
  });
  document.querySelectorAll('.tab-btn').forEach((b, i) => {
    b.classList.toggle('active', i === idx);
  });
}
