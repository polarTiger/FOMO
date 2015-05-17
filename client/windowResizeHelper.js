function handleResize(){
  document.body.style.height='100vh';
}

function handleScroll(){
  document.body.style.backgroundRepeat = "repeat-y";
}

window.addEventListener("resize", handleResize);
window.addEventListener("scroll", handleScroll);