import { Modal } from 'bootstrap';
import { templateToElement, parseTemplate } from './utils';
import modalTemplate from './templates/modal_template.html';
import errorMessageTemplate from './templates/modal_error_template.html';

export default class AjaxModal {
  constructor(url) {
    this.url = url;
  }

  static options = {
    errorModalTitle: 'Please try again',
    errorModalText: 'Something went wrong when loading the content. Please refresh the page and try again.',
    errorModalDismissButtonClass: 'btn btn-secondary',
    errorModalDismissButtonText: '<i class="fa fa-fw fa-check"></i> Ok'
  }

  static start() {
    document.addEventListener('click', (event) => {
      const path = event.composedPath();
      const element = path.find((element) => element.matches ? element.matches('.ajax-modal, [data-toggle="ajax-modal"]') : false);

      if (element) {
        event.preventDefault();

        const ajaxModal = new this(element.getAttribute('data-url') || element.getAttribute('href'));
        ajaxModal.openAjaxModal();
      }
    });
  }

  async openAjaxModal() {
    const content = await this.getContent();
    let modalWindow = this.getOrCreateModalWindow();

    modalWindow.innerHTML = content;

    const modalTitle = modalWindow.querySelector('.modal-title');
    if (modalTitle) {
      modalTitle.setAttribute('id', 'modalWindowTitle');
    }

    modalWindow.addEventListener('hidden.bs.modal', () => modalWindow.remove() );

    Modal.getOrCreateInstance(modalWindow).show();
  }

  getOrCreateModalWindow() {
    if (!document.getElementById('modalWindow')) {
      document.body.appendChild(templateToElement(modalTemplate));
    }

    return document.getElementById('modalWindow');
  }

  async getContent() {
    const response = await fetch(this.url, { credentials: 'same-origin' });
    if (response.ok) {
      const content = await response.text()
      return content;
    } else {
      return parseTemplate(errorMessageTemplate, AjaxModal.options);
    }
  }
}