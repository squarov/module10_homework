const btn = document.querySelector('.j-btn-test');
const info = document.querySelector('.info');

btn.addEventListener('click', () => {
  let windowsSizes = window.innerWidth + 'px в ширину и ' + window.innerHeight + 'px в высоту';
  alert(windowsSizes);
});