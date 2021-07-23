import { Modal } from 'bootstrap';
import { templateToElement, parseTemplate } from './utils';
import modalTemplate from './templates/confirm_modal_template.html';

export default class ConfirmModal {
  constructor(message, element) {
    this.message = message;
    this.element = element;
    this.confirmed = false;
  }

  static options = {
    commitButtonClass: 'btn btn-primary',
    commitButtonText: '<i class="fa fa-fw fa-check"></i> Yes',
    cancelButtonClass: 'btn btn-secondary',
    cancelButtonText: '<i class="fa fa-fw fa-times"></i> No'
  }

  static #instances = new Map();

  static confirm(message, element) {
    this.#instances.set(element, this.#instances.get(element) || new this(message, element));
    return this.#instances.get(element).confirm();
  }

  confirm() {
    if (this.confirmed) {
      this.confirmed = false;
      return true;
    } else {
      this.openConfirmModal();
      return false;
    }
  }

  commit() {
    const { element, modal } = this;
    this.confirmed = true;

    element.click();
    Modal.getOrCreateInstance(modal).hide();
  }

  openConfirmModal() {
    const { modal } = this;
    modal.addEventListener('hidden.bs.modal', () => modal.remove());
    modal.querySelector('[data-action="commit"]').addEventListener('click', (e) => this.commit());
    Modal.getOrCreateInstance(modal).show();
  }

  get modal() {
    if (!document.getElementById('confirmModal')) {
      document.body.append(templateToElement(parseTemplate(modalTemplate, { ...ConfirmModal.options, message: this.message })));
    }

    return document.getElementById('confirmModal');
  }
}