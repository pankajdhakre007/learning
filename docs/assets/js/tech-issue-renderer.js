function renderTechIssuePage(pageData) {
  const root = document.getElementById('root');
  if (!root) {
    return;
  }

  let html = `
    <div class="panel panel--accent doc-hero">
      <p class="label-mono label-mono--accent">${pageData.hero.eyebrow}</p>
      <h1>${pageData.hero.title}</h1>
      <p>${pageData.hero.description}</p>
    </div>

    <div class="section">
      <p class="label-mono">Common synonyms</p>
      <div class="chip-grid">
        ${pageData.synonyms.map(s => `<span class="chip chip--hover">${s}</span>`).join('')}
      </div>
    </div>

    <div class="section">
      <p class="label-mono">How interviewers phrase this</p>
      <div class="quote-list">
        ${pageData.questions.map(q => `<div class="quote-item">${q}</div>`).join('')}
      </div>
    </div>

    <div class="section">
      <p class="label-mono">Layer-by-layer breakdown</p>
      <div class="tab-strip">
        ${pageData.layers.map((l, i) => `<button class="tab ${i === 0 ? 'is-active' : ''}" onclick="showLayer(${i})">${l.name}</button>`).join('')}
      </div>

      ${pageData.layers.map((layer, idx) => `
        <div class="panel tab-panel ${idx === 0 ? 'is-active' : ''}" id="layer-${idx}">
          <p class="tab-panel-title">${layer.title}</p>
          <p class="tab-panel-desc">${layer.description}</p>
          <div class="duo-grid">
            <div class="panel panel--soft">
              <p class="label-mono label-mono--xs">Observable symptoms</p>
              <ul class="feature-list">
                ${layer.symptoms.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
            <div class="panel panel--soft">
              <p class="label-mono label-mono--xs">Root causes</p>
              <ul class="feature-list">
                ${layer.causes.map(c => `<li>${c}</li>`).join('')}
              </ul>
            </div>
            <div class="panel panel--soft">
              <p class="label-mono label-mono--xs">System effects</p>
              <ul class="feature-list">
                ${layer.effects.map(e => `<li>${e}</li>`).join('')}
              </ul>
            </div>
            <div class="panel panel--soft">
              <p class="label-mono label-mono--xs">Mitigations</p>
              <ul class="feature-list">
                ${layer.mitigations.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="metrics-row">
            <span class="label-mono label-mono--inline">Key metrics</span>
            ${layer.metrics.map(m => `<span class="chip chip--primary">${m}</span>`).join('')}
          </div>
          <div class="panel panel--warn">
            <p class="label-mono label-mono--warn">Tradeoffs</p>
            <ul class="feature-list feature-list--warn">
              ${layer.tradeoffs.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="section">
      <p class="label-mono">Universal distributed systems pattern</p>
      <div class="panel panel--flush">
        <table class="data-table data-table--mono-head">
          <thead>
            <tr>
              <th>Technology</th>
              <th>Equivalent problem</th>
            </tr>
          </thead>
          <tbody>
            ${pageData.comparisons.map(c => `<tr><td class="text-strong">${c.tech}</td><td class="text-primary">${c.problem}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="panel panel--quote">
      <p>${pageData.insight}</p>
    </div>
  `;

  root.innerHTML = html;
}

function showLayer(idx) {
  document.querySelectorAll('.tab-panel').forEach((c, i) => {
    c.classList.toggle('is-active', i === idx);
  });
  document.querySelectorAll('.tab').forEach((b, i) => {
    b.classList.toggle('is-active', i === idx);
  });
}
