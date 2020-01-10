function menuToggle() {
    var element = document.getElementById("menuToggleMenu");
    element.classList.toggle("is-visible");
}

document.getElementById('menuToggle').addEventListener('click', menuToggle);


var tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 70
  });
  
  // Add children
  tl
  .add({
    targets: '.p-books .c-billboard .c-billboard__anime',
    backgroundColor: '#01CD7D',
    delay: anime.stagger(50)
  })

  tl
  .add({
    targets: '.p-work .c-billboard .c-billboard__anime',
    backgroundColor: '#B975FE',
    delay: anime.stagger(50)
  })

  tl
  .add({
    targets: '.p-home .c-billboard .c-billboard__anime',
    backgroundColor: '#EF483F',
    delay: anime.stagger(50)
  })

  tl
  .add({
    targets: '.p-about .c-billboard .c-billboard__anime',
    backgroundColor: '#00D1FF',
    delay: anime.stagger(50)
  })

  tl
  .add({
    targets: '.p-contact .c-billboard .c-billboard__anime',
    backgroundColor: '#FF8A00',
    delay: anime.stagger(50)
  })