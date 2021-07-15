export default class AutoUpdate {
  constructor(element) {
    this.element = element;
    this.autoUpdateUrl = element.dataset.autoUpdateUrl;
    this.autoUpdateInterval = element.dataset.autoUpdateInterval || 3000;
  }

  static start() {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-auto-update-url]').forEach((element) => {
        new this(element).start();
      });
    });
  }

  start() {
    this.getNewContent();
  }

  getNewContent = async () => {
    const { element, waitForInterval, getNewContent, autoUpdateUrl } = this;

    await waitForInterval();

    const response = await fetch(autoUpdateUrl, { credentials: 'same-origin' });
    const { newContent, enablePolling = true } = await response.json();

    element.innerHTML = newContent;

    if (enablePolling) {
      getNewContent();
    }
  }

  waitForInterval = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, this.autoUpdateInterval);
    })
  }
}