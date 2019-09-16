(()=> {
  const burger = () => {
    const navBtn = document.getElementById('navMenu');
    navBtn.style.display === 'none' ? navBtn.style.display = 'block' : navBtn.style.display = 'none';
  };
  document.getElementById('btn').addEventListener('click', burger);
})();