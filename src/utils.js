export const toggleVisibility = (element, showing) => {
  if (showing) {
    if(element.classList.contains('d-none')) {
      element.classList.remove('d-none');
    }
    element.style.removeProperty('display');
  } else {
    element.style.display = 'none';
  }

  element.toggleAttribute('data-visible', showing);
}

export const parseTemplate = (template, map, fallback) => {
  return template.replace(/\$\{(.*?)(?!\$\{)\}/g, (match) =>
    match
      .slice(2, -1)
      .trim()
      .split(".")
      .reduce(
        (searchObject, key) => searchObject[key] || fallback || match,
        map
      )
  );
};


export const templateToElement = (templateText) => {
  const template = document.createElement('template');
  template.innerHTML = templateText.trim();
  return template.content.firstChild;
}