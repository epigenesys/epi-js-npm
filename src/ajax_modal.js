import { Modal } from 'bootstrap';
import { templateToElement } from './utils';
import modalTemplate from './templates/modal_template.html';

export default class AjaxModal {
  constructor(url) {
    this.url = url;
  }

  static start() {
    document.addEventListener('click', (event) => {
      const { target } = event;

      if (target && (target.getAttribute('data-toggle') === 'ajax-modal' || target.classList.contains('ajax-modal') )) {
        event.preventDefault();

        const ajaxModal = new this(target.getAttribute('href'));
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

  getOrCreateModalWindow() {;
    if (!document.getElementById('modalWindow')) {
      document.body.appendChild(templateToElement(modalTemplate));
    }

    return document.getElementById('modalWindow');
  }

  async getContent() {
    const response = await fetch(this.url, { credentials: 'same-origin' });
    const content = await response.text()
    return content;
  }
}