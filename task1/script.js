const btn = document.querySelector('.j-btn-test');
const one = document.querySelector('.btn_icon_one');
const two = document.querySelector('.btn_icon_two');

btn.addEventListener('click', () => {
  one.classList.toggle("remove");
  two.classList.toggle("remove");
});