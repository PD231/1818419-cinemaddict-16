export const siteMainElement = document.querySelector('.main');

export const closePopap = () => {
  const popap = document.querySelector('.film-details');
  siteMainElement.removeChild(popap);
};
