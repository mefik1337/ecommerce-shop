const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const headerNavigation = document.querySelector('.header__navigation');
const header = document.querySelector('.header');
const order = document.querySelector('.order');
const handleClick = () => {
  hamburger.classList.toggle('hamburger--active');
  nav.classList.toggle('nav--active');
};

const stickyNavigation = () => {
  if (!order) {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      headerNavigation.classList.add('header__navigation--active');
      header.style.paddingTop = `${headerNavigation.offsetHeight - 20}px`;
    } else {
      header.style.paddingTop = 0;
      headerNavigation.classList.remove('header__navigation--active');
    }
  }
};

window.addEventListener('scroll', stickyNavigation);
hamburger.addEventListener('click', handleClick);
