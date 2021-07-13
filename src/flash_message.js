import { Alert } from 'bootstrap';
import flashMessageTemplate from './templates/flash_message_template.html';

export default class FlashMessage {

  static template = flashMessageTemplate;

  static addMessage(message, options = {}) {
    const { type = 'alert-primary', container = '.flash-messages', timeout = 6000 } = options;

    const containerElement = document.querySelector(container);

    let template = document.createElement('template');
    template.innerHTML = this.template.trim();

    const flashMessage = template.content.firstChild;

    flashMessage.querySelector('.flash-message-content').innerHTML = message;
    flashMessage.classList.add(type);

    containerElement.appendChild(flashMessage);

    setTimeout(() => {
      Alert.getOrCreateInstance(flashMessage).close();
    }, timeout);
  }
}