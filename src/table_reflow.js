import '../styles/table_reflow';

export default class TableReflow {
  constructor(tableElement) {
    this.tableElement = tableElement;
  }

  setReflowLabels() {
    const { tableElement } = this;

    tableElement.querySelectorAll('thead th').forEach((thElement, index) => {
      const labelText = thElement.hasAttribute('data-label') ? thElement.getAttribute('data-label') : thElement.innerText;

      tableElement.querySelectorAll(`tbody tr td:nth-child(${index + 1})`).forEach((tdElement) => {
        if (!tdElement.hasAttribute('data-label')) {
          tdElement.setAttribute('data-label', labelText);
        }
      });
    });
  }

  static #instances = new Map();

  static start() {
    const initAndStore = (element) => {
      this.#instances.set(element, this.#instances.get(element) || new this(element));
      return this.#instances.get(element);
    }

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('table[class*="reflow"]').forEach((tableElement) => {
        initAndStore(tableElement).setReflowLabels();
      });
    });

    document.addEventListener('autoupdate.updated', (event) => {
      const { target } = event;
      if (target.matches('table[class*="reflow"]')) {
        initAndStore(target).setReflowLabels();
      }
    });
  }
}