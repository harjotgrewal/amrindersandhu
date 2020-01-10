function menuToggle() {
    var element = document.getElementById("menuToggleMenu");
    element.classList.toggle("is-visible");
}

document.getElementById('menuToggle').addEventListener('click', menuToggle);