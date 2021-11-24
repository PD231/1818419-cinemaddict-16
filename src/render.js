//Функция взята из лайва https://up.htmlacademy.ru/ecmascript/16/module/1/live

const renderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export {renderPosition, renderTemplate};

