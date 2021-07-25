export default class ElementMap {
  static instances = new Map();

  static getOrCreateInstance = (klass, element, config = null) => {
    if (!this.instances.has(klass)) {
      this.instances.set(klass, new Map());
    }

    const instancesForKlass = this.instances.get(klass);

    if (!instancesForKlass.has(element)) {
      instancesForKlass.set(element, new klass(element, config))
    }

    return instancesForKlass.get(element);
  }
}