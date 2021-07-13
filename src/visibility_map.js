export default class VisibilityMap {
  constructor(element) {
    this.element = element;
    this.scope = element.dataset.visibilityMapScope || document;
    this.action = element.dataset.visibilityMapAction || 'show';
    this.map = JSON.parse(element.dataset.visibilityMap);

    this.allFields = [...new Set(Object.values(this.map).map((selector) => [...this.scope.querySelectorAll(selector)]).flat())];
  }

  static #instances = new Map();

  static start() {
    const initAndStore = (element) => {
      this.#instances.set(element, this.#instances.get(element) || new this(element));
      this.#instances.get(element).updateVisibility();
    }

    document.addEventListener('change', (event) => {
      const { target } = event;

      if (target && target.hasAttribute('data-visibility-map')) {
        initAndStore(target);
      }
    });

    document.addEventListener('visibility.hide', (event) => {
      event.target.querySelectorAll('input, select, textarea').forEach((element) => element.disabled = true);
    })

    document.addEventListener('visibility.show', (event) => {
      event.target.querySelectorAll('input, select, textarea').forEach((element) => element.disabled = false);
    })

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-visibility-map]:checked, select[data-visibility-map]').forEach((element) => {
        initAndStore(element);
      });
    });
  }

  updateVisibility() {
    const { action } = this;
    const { inputsForValue, otherInputs } = this.getInputsForValues();

    const showingInputsForValue = action === 'show';

    inputsForValue.forEach((element) => {
      element.classList.toggle('d-none', !showingInputsForValue);
      element.dispatchEvent(new Event(`visibility.${showingInputsForValue ? 'show' : 'hide'}`, { bubbles: true }));
    });

    otherInputs.forEach((element) => {
      element.classList.toggle('d-none', showingInputsForValue);
      element.dispatchEvent(new Event(`visibility.${showingInputsForValue ? 'hide' : 'show'}`, { bubbles: true }));
    })
  }

  getInputsForValues = () => {
    const { selectedValues, scope, map, allFields } = this;
    const inputsForValue = [... new Set(selectedValues.map((selectedValue) => [...scope.querySelectorAll(map[selectedValue])]).flat())]
    const otherInputs = allFields.filter(element => inputsForValue.indexOf(element) < 0)

    return { inputsForValue, otherInputs };
  }

  get selectedValues() {
    const nameSelector = `[name="${this.element.getAttribute('name')}"]`;

    return [... document.querySelectorAll(`input${nameSelector}, select${nameSelector} option`)].
      filter((input) => input.selected || input.checked).
      map((input) => input.value);
  }
}