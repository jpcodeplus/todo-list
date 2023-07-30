// =====================================

window.onload = function() {
  console.log('Page loaded');
  const preloader = document.getElementById('preloader');
  setTimeout(function() {
    preloader.style.opacity = "0";
    setTimeout(function() {
      preloader.style.display = "none";
    }, 1000);
  }, 1000);
}