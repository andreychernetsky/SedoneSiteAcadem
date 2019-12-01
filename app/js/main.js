
/*(()=> {
const burger = () => {
  const navBtn = document.getElementById('navMenu');
  navBtn.style.display === 'none' ? navBtn.style.display = 'block' : navBtn.style.display = 'none';
};
document.getElementById('btn').addEventListener('click', burger);
})();*/
// (()=> {
// const burger = () => {
//   const navBtn = document.getElementById('navMenu');
//   navBtn.style.display === 'none' ? navBtn.style.display = 'block' : navBtn.style.display = 'none';
// };
// document.getElementById('btn').addEventListener('click', burger);
// })();

// вариант второй


(()=> {
  const menuOpen = document.querySelector(".main-header__menu-button");
  const menuMobile = document.querySelector(".main-menu");
  const menuClose = menuMobile.querySelector(".main-menu__cross-button");

  menuMobile.classList.remove("mobyle-js");

  menuOpen.addEventListener("click", (event)=> {
    event.preventDefault();
    menuMobile.classList.add("main-menu__modal-content-show");
  });

  menuClose.addEventListener("click", (event)=> {
    event.preventDefault();
    menuMobile.classList.remove("main-menu__modal-content-show");
  });

  window.addEventListener("keydown", (event)=> {
    if (event.keyCode === 27) {
      if (menuMobile.classList.contains("main-menu__modal-content-show")) {
        menuMobile.classList.remove("main-menu__modal-content-show");
      }
    }
  });
})();
