function renderResultTable(data) {
   const result = document.getElementById('result');
  result.innerHTML = '';
  const heading = document.createElement('h2');
  heading.textContent = 'Submitted Data';
  result.appendChild(heading);
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  for (const key of Object.keys(data)) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = key;
    const td = document.createElement('td');
    if (key === 'Address') {
      td.innerHTML = escapeHtml(data[key]).replace(/\n/g, '<br>');
    } else {
      td.textContent = data[key];
    }

    tr.appendChild(th);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  result.appendChild(table);
}
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[m];
  });
}
