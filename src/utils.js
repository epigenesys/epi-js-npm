export const toggleVisibility = (element, showing) => {
  if (showing) {
    if(element.classList.contains('d-none')) {
      element.classList.remove('d-none');
    }
    element.style.removeProperty('display');
  } else {
    element.style.display = 'none';
  }
}

export const templateToElement = (templateText) => {
  let template = document.createElement('template');
  template.innerHTML = templateText.trim();
  return template.content.firstChild;
}