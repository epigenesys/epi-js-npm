import '../styles/table_reflow';

export default (function () {
  document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('table[class*="reflow"]').forEach((tableElement) => {
      tableElement.querySelectorAll('thead th').forEach((thElement, index) => {
        const labelText = thElement.getAttribute('data-label') || thElement.innerText;

        tableElement.querySelectorAll(`tbody tr td:nth-child(${index + 1})`).forEach((tdElement) => {
          if (!tdElement.hasAttribute('data-label')) {
            tdElement.setAttribute('data-label', labelText);
          }
        });
      });
    });
  });
})();