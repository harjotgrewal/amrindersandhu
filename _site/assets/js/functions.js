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
const filterWrapper = document.querySelector(".js-filtersWrapper");

const filterControls = filterWrapper.querySelectorAll(".js-filter");

const filterContent = filterWrapper.querySelectorAll(".c-books_list_item")

const allFilters = filterWrapper.querySelector('.js-all-items');

for(item of filterControls) {
    item.addEventListener("click", event => {
        let filterControl = event.target.getAttribute("id");

        for(item of filterContent) {
            item.setAttribute('hidden', 'hidden');
        }

        let filteredItems = filterWrapper.querySelectorAll(`[aria-labelledby="${filterControl}"]`);

        for(item of filteredItems) {
            item.removeAttribute("hidden");
        }
    });
};

allFilters.addEventListener("click", event => {
    for(item of filterContent) {
        item.removeAttribute("hidden");
    }
});
})();
