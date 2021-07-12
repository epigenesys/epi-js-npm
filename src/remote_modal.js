import { Modal } from 'bootstrap';
import modalTemplate from './modal_template.html';

export default class RemoteModal {
  constructor(element) {
    this.element = element;
  }

  static start() {
    document.addEventListener('click', (event) => {
      if (event.target && event.target.getAttribute('data-toggle') === 'remote-modal') {
        event.preventDefault();

        const remoteModal = new this(event.target);
        remoteModal.openRemoteModal();
      }
    });
  }

  async openRemoteModal() {
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
      let template = document.createElement('template');
      template.innerHTML = modalTemplate.trim();
      document.body.appendChild(template.content.firstChild);
    }

    return document.getElementById('modalWindow');
  }

  async getContent() {
    const response = await fetch(this.element.getAttribute('href'));
    const content = await response.text()
    return content;
  }
}