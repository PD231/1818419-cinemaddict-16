//Функция взята из лайва https://up.htmlacademy.ru/ecmascript/16/module/1/live
import AbstractView from './view/abstract-view.js';

export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};


export const render = (container, element, place) => {
  const parent = container instanceof AbstractView ? container.element : container;
  const child = element instanceof AbstractView ? element.element : element;

  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;
    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};

export const replace = (oldComponent, newComponent) => {
  const oldElement = oldComponent instanceof AbstractView ? oldComponent.element : oldComponent;
  const parent = oldElement.parentElement;
  if (parent) {
    const newElement = newComponent instanceof AbstractView ? newComponent.element : newComponent;
    parent.replaceChild(newElement, oldElement);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};
