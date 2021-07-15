import { toggleVisibility, templateToElement } from './utils';
import trNoRecordTemplate from './templates/tr_no_record_template.html';

export default class TableFilter {
  constructor(element) {
    this.element = element;
    this.target = document.querySelector(element.dataset.tableFilterTarget);
    this.noRecordMessage = element.dataset.noRecordMessage || 'No records found'
  }

  static #instances = new Map();

  static start() {
    const initAndStore = (element) => {
      this.#instances.set(element, this.#instances.get(element) || new this(element));
      return this.#instances.get(element);
    }

    document.addEventListener('keyup', (event) => {
      const { target } = event;

      if (target && target.hasAttribute('data-table-filter-target')) {
        initAndStore(target).filter();
      }
    });
  }

  filter = () => {
    const { element, target, allRows, noRecordRow } = this;

    const keyword = (element.value || '').trim().toLowerCase();

    let rowsToShow = allRows;

    if (keyword !== '') {
      rowsToShow = rowsToShow.filter((row) => {
        let cloneRow = row.cloneNode(true);
        cloneRow.querySelectorAll('.btn').forEach((element) => element.remove());
        const rowText = cloneRow.innerText.toLowerCase();

        return rowText.indexOf(keyword) > -1;
      });
    }

    allRows.forEach((row) => {
      toggleVisibility(row, rowsToShow.indexOf(row) > -1);
    });

    if (rowsToShow.length > 0) {
      noRecordRow.remove();
    } else {
      target.querySelector('tbody').appendChild(noRecordRow);
    }
  }

  get allRows() {
    return [...this.target.querySelectorAll('tbody tr:not(.tr-no-record)')];
  }

  get noRecordRow() {
    const row = this.target.querySelector('.tr-no-record') || templateToElement(trNoRecordTemplate);
    row.querySelector('td').innerHTML = this.noRecordMessage

    return row;
  }
}