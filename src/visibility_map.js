export default class VisibilityMap {
  constructor(element) {
    this.element = element;
    this.scope = element.dataset.visibilityMapScope || document;
    this.action = element.dataset.visibilityMapAction || 'show';
    this.map = JSON.parse(element.dataset.visibilityMap);

    this.allFields = Object.values(this.map).map((selector) => [...this.scope.querySelectorAll(selector)]).flat()
  }

  static start() {
    this.instances = new Map();

    const initAndStore = (element) => {
      this.instances.set(element, this.instances.get(element) || new VisibilityMap(element));
      this.instances.get(element).updateVisibility();
    }

    document.addEventListener('change', (event) => {
      const { target } = event;

      if (target && target.hasAttribute('data-visibility-map')) {
        initAndStore(target);
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('[data-visibility-map]:checked, select[data-visibility-map]').forEach((element) => {
        initAndStore(element);
      });
    });
  }

  updateVisibility() {
    const { action, getInputsForValues } = this;

    let toShow, toHide;

    if (action === 'show') {
      [toShow, toHide] = getInputsForValues();
    } else {
      [toHide, toShow] = getInputsForValues();
    }

    toShow.forEach((element) => {
      if (element.classList.contains('d-none')) {
        element.classList.remove('d-none');
        element.dispatchEvent(new Event('visibility:show'));
      }
    });

    toHide.forEach((element) => {
      if (!element.classList.contains('d-none')) {
        element.classList.add('d-none');
        element.dispatchEvent(new Event('visibility:hide'));
      }
    })
  }

  getInputsForValues = () => {
    const { selectedValues, scope, map, allFields } = this;
    const inputsForValue = selectedValues.map((selectedValue) => [...scope.querySelectorAll(map[selectedValue])]).flat()
    const otherInputs = allFields.filter(element => inputsForValue.indexOf(element) < 0)

    return [inputsForValue, otherInputs];
  }

  get selectedValues() {
    return Array.from(document.querySelectorAll(`input[name="${this.element.getAttribute('name')}"]`)).
      filter((input) => input.selected || input.checked).
      map((input) => input.value);
  }
}