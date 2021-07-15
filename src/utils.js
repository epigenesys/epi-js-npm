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