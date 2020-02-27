function menuToggle() {
    var element = document.getElementById("menuToggleMenu");
    element.classList.toggle("is-visible");
}

document.getElementById('menuToggleMenu').addEventListener('click', menuToggle);




// var svgText = anime({
//   targets: '.c-name path',
//   loop: false,
//   direction: 'forwards',
//   strokeDashoffset: [anime.setDashoffset, 0],
//   easing: 'easeInExpo',
//   duration: 500,
//   delay: (el, i) => { return i * 100 }
// });





// var tl = anime.timeline({
//     easing: 'easeOutExpo',
//     duration: 70
//   });
  
//   // Add children
//   tl
//   .add({
//     targets: '.p-books .c-billboard .c-billboard__anime',
//     backgroundColor: '#01CD7D',
//     delay: anime.stagger(50)
//   })

//   tl
//   .add({
//     targets: '.p-work .c-billboard .c-billboard__anime',
//     backgroundColor: '#B975FE',
//     delay: anime.stagger(50)
//   })

//   tl
//   .add({
//     targets: '.p-home .c-billboard .c-billboard__anime',
//     backgroundColor: '#EF483F',
//     delay: anime.stagger(50)
//   })

//   tl
//   .add({
//     targets: '.p-about .c-billboard .c-billboard__anime',
//     backgroundColor: '#00D1FF',
//     delay: anime.stagger(50)
//   })

//   tl
//   .add({
//     targets: '.p-contact .c-billboard .c-billboard__anime',
//     backgroundColor: '#FF8A00',
//     delay: anime.stagger(50)
//   })

(function() {
const tabsWrapper = document.querySelector(".js-tabs");

const tabControls = tabsWrapper.querySelectorAll("button[role=tab]");

const tabAreas = tabsWrapper.querySelectorAll("section[role=tabpanel]")

const allTabs = tabsWrapper.querySelector('button[class=js-all-tabs]');

for(item of tabControls) {
    item.addEventListener("click", event => {
        let tabControl = event.target.getAttribute("aria-controls");

        for(item of tabAreas) {
            item.classList.remove('is-active');
            item.classList.add('is-hidden');
        }

        let tabArea = document.getElementById(tabControl);

        tabArea.classList.remove('is-hidden');

        tabArea.classList.add('is-active');
    });
};

allTabs.addEventListener("click", event => {
    for(item of tabAreas) {
        item.classList.add('is-active');
        item.classList.remove('is-hidden');
    }
});
})();
