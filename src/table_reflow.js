import '../styles/table_reflow';
import { default as getOrCreateInstance } from './element_map';

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

  static start() {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('table[class*="reflow"]').forEach((tableElement) => {
        getOrCreateInstance(this, tableElement).setReflowLabels();
      });
    });

    document.addEventListener('autoupdate.updated', (event) => {
      const { target } = event;
      if (target.matches('table[class*="reflow"]')) {
        getOrCreateInstance(this, target).setReflowLabels();
      }
    });
  }
}