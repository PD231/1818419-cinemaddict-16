export const siteMainElement = document.querySelector('.main');

export const closePopup = () => {
  const popup = document.querySelector('.film-details');
  siteMainElement.removeChild(popup);
};
