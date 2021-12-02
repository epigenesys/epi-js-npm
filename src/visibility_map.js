import { toggleVisibility } from './utils';
import { default as ElementMap } from './element_map';

export default class VisibilityMap {
  constructor(element) {
    this.element = element;
    this.scope = element.dataset.visibilityMapScope || document;
    this.action = element.dataset.visibilityMapAction || 'show';
    this.map = JSON.parse(element.dataset.visibilityMap);
  }

  static hiddenBy = new Map();

  static start() {
    document.addEventListener('change', (event) => {
      const { target } = event;

      if (target && target.hasAttribute('data-visibility-map')) {
        ElementMap.getOrCreateInstance(this, target).updateVisibility();
      }
    });

    document.addEventListener('visibility.hide', (event) => {
      event.target.querySelectorAll('input, select, textarea').forEach((element) => element.disabled = true);
    })

    document.addEventListener('visibility.show', (event) => {
      event.target.querySelectorAll('input, select, textarea').forEach((element) => element.disabled = false);
    })

    document.addEventListener('DOMContentLoaded', () => {
      let namesUpdated = new Set();

      document.querySelectorAll('[data-visibility-map], select[data-visibility-map]').forEach((element) => {
        const visibilityMap = ElementMap.getOrCreateInstance(this, element);
        const elementName = element.getAttribute('name');

        if (!(elementName && namesUpdated.has(elementName))) {
          visibilityMap.updateVisibility();
          namesUpdated.add(elementName);
        }
      });
    });
  }

  toggleElementVisibility = (targetElement, visibility) => {
    const { element } = this;
    const hiddenByForElement = VisibilityMap.hiddenBy.get(targetElement) || new Set();

    if (visibility) {
      hiddenByForElement.delete(element);
    } else {
      hiddenByForElement.add(element);
    }

    VisibilityMap.hiddenBy.set(targetElement, hiddenByForElement);

    if (visibility && (hiddenByForElement.size === 0 || !targetElement.dataset.visibleWhenAllConditionsMet)) {
      toggleVisibility(targetElement, true);
      targetElement.dispatchEvent(new Event('visibility.show', { bubbles: true }));
    } else {
      toggleVisibility(targetElement, false);
      targetElement.dispatchEvent(new Event('visibility.hide', { bubbles: true }));
    }
  }

  updateVisibility() {
    const { action, toggleElementVisibility } = this;
    const { inputsForValue, otherInputs } = this.getInputsForValues();

    const showingInputsForValue = action === 'show';

    inputsForValue.forEach((element) => {
      toggleElementVisibility(element, showingInputsForValue);
    });

    otherInputs.forEach((element) => {
      toggleElementVisibility(element, !showingInputsForValue);
    })
  }

  getInputsForValues = () => {
    const { selectedValues, scope, map, allFields } = this;
    const inputsForValue = [... new Set(selectedValues.map((selectedValue) => [...scope.querySelectorAll(map[selectedValue])]).flat())]
    const otherInputs = allFields.filter(element => inputsForValue.indexOf(element) < 0)

    return { inputsForValue, otherInputs };
  }

  get allFields() {
    return [...new Set(Object.values(this.map).map((selector) => [...this.scope.querySelectorAll(selector)]).flat())];
  }

  get selectedValues() {
    if (this.element.hasAttribute('name')) {
      const nameSelector = `[name="${this.element.getAttribute('name')}"]`;

      return [...document.querySelectorAll(`input${nameSelector}, select${nameSelector} option`)].
        filter((input) => input.selected || input.checked).
        map((input) => input.value);
    } else {
      return [this.element.value];
    }
  }
}