function renderTechIssuePage(pageData) {
  const root = document.getElementById('root');
  if (!root) {
    return;
  }

  const renderList = items => items.map(item => `<li>${item}</li>`).join('');

  root.innerHTML = `
    <section class="section">
      <p class="heading">${pageData.header.eyebrow}</p>
      <h1 class="title">${pageData.header.title}</h1>
      <p class="subtitle">${pageData.header.description}</p>
    </section>

    <section class="section pt-0">
      <p class="heading">Common synonyms</p>
      <div class="tags">
        ${pageData.synonyms.map(s => `<span class="tag is-light">${s}</span>`).join('')}
      </div>
    </section>

    <section class="section pt-0">
      <p class="heading">How interviewers phrase this</p>
      <div class="content">
        ${pageData.questions.map(q => `<blockquote>${q}</blockquote>`).join('')}
      </div>
    </section>

    <section class="section pt-0">
      <p class="heading">Layer-by-layer breakdown</p>
      <div class="buttons has-addons is-flex-wrap-wrap">
        ${pageData.layers.map((layer, index) => `<button class="button is-small ${index === 0 ? 'is-selected' : ''}" data-layer-button type="button" onclick="showLayer(${index})">${layer.name}</button>`).join('')}
      </div>

      ${pageData.layers.map((layer, index) => `
        <div class="box ${index === 0 ? '' : 'is-hidden'}" id="layer-${index}">
          <h2 class="title is-4">${layer.title}</h2>
          <p class="subtitle is-6">${layer.description}</p>

          <div class="columns is-multiline">
            <div class="column is-half">
              <article class="message is-info">
                <div class="message-header"><p>Observable symptoms</p></div>
                <div class="message-body"><div class="content"><ul>${renderList(layer.symptoms)}</ul></div></div>
              </article>
            </div>
            <div class="column is-half">
              <article class="message is-info">
                <div class="message-header"><p>Root causes</p></div>
                <div class="message-body"><div class="content"><ul>${renderList(layer.causes)}</ul></div></div>
              </article>
            </div>
            <div class="column is-half">
              <article class="message is-info">
                <div class="message-header"><p>System effects</p></div>
                <div class="message-body"><div class="content"><ul>${renderList(layer.effects)}</ul></div></div>
              </article>
            </div>
            <div class="column is-half">
              <article class="message is-info">
                <div class="message-header"><p>Mitigations</p></div>
                <div class="message-body"><div class="content"><ul>${renderList(layer.mitigations)}</ul></div></div>
              </article>
            </div>
          </div>

          <p class="heading">Key metrics</p>
          <div class="tags">
            ${layer.metrics.map(metric => `<span class="tag is-primary is-light">${metric}</span>`).join('')}
          </div>

          <article class="message is-warning">
            <div class="message-header"><p>Tradeoffs</p></div>
            <div class="message-body"><div class="content"><ul>${renderList(layer.tradeoffs)}</ul></div></div>
          </article>
        </div>
      `).join('')}
    </section>

    <section class="section pt-0">
      <p class="heading">Universal distributed systems pattern</p>
      <div class="table-container">
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Technology</th>
              <th>Equivalent problem</th>
            </tr>
          </thead>
          <tbody>
            ${pageData.comparisons.map(comparison => `<tr><td><strong>${comparison.tech}</strong></td><td>${comparison.problem}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <section class="section pt-0">
      <article class="message is-info">
        <div class="message-body">${pageData.insight}</div>
      </article>
    </section>
  `;
}

function showLayer(index) {
  document.querySelectorAll('[id^="layer-"]').forEach((section, sectionIndex) => {
    section.classList.toggle('is-hidden', sectionIndex !== index);
  });

  document.querySelectorAll('[data-layer-button]').forEach((button, buttonIndex) => {
    button.classList.toggle('is-selected', buttonIndex === index);
  });
}
