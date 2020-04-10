// function menuToggle() {
//     var element = document.getElementById("menuToggleMenu");
//     element.classList.toggle("is-visible");
// }

// document.getElementById('menuToggleMenu').addEventListener('click', menuToggle);




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



// Email me modal
// Get the modal
var modal = document.getElementById("emailModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Copy email button
var copyBtn = document.getElementById("copyEmail");

// Send email button
var sendEmail = document.getElementById("sendEmail");

// Get the <span> element that closes the modal
var closeModal = document.getElementsByClassName("c-modal__close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  copyBtn.innerHTML = 'Copy email address';
}


copyBtn.onclick = function() {
    const el = document.createElement('textarea');
    el.value = 'contact@amrindersandhu.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    copyBtn.innerHTML = 'Copied to clipboard';
}

sendEmail.onclick = function() {
    modal.style.display = "none";
}


// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const filterWrapper = document.querySelector(".js-filtersWrapper");

const filterControls = filterWrapper.querySelectorAll(".js-filter");

const filterContentFavs = filterWrapper.querySelectorAll(".c-books_list_item--fav")

const filterContentAll = filterWrapper.querySelectorAll(".c-books_list_item--all")

const allFilters = filterWrapper.querySelector('.js-all-items');

const favFilters = filterWrapper.querySelector('.js-fav-items');

const parentListAll = filterWrapper.querySelector('.c-books_list--all');

const parentListFavs = filterWrapper.querySelector('.c-books_list--favs');

filterControls.forEach(element => {
    element.addEventListener("click", event => {
        let filterbyID = event.target.getAttribute("id");
        showItemsAll(filterbyID);
        showItemsFavs(filterbyID);
    });
    
});



function showItemsAll(filterbyID) {
    let paras = [...filterContentAll];
    console.log(paras);
    favFilters.classList.remove('is_active');
    allFilters.classList.remove('is_active');
    for (let para of Array.from(paras)) {
        para.remove();
    }
    for (let entry of Array.from(filterControls)) {
        entry.classList.remove('is_active');
        if(entry.getAttribute('id') == filterbyID) {
            entry.classList.add('is_active');
        }
    }
    for (let para of Array.from(paras)) {
        if(para.getAttribute("aria-labelledby") == (filterbyID)) {
            parentListAll.appendChild(para);
        }
    }
    parentListFavs.scrollIntoView({ behavior:"smooth" });
}


function showItemsFavs(filterbyID) {
    let paras = [...filterContentFavs];
    allFilters.classList.remove('is_active');
    favFilters.classList.remove('is_active');
    for (let para of Array.from(paras)) {
        para.remove();
    }
    for (let entry of Array.from(filterControls)) {
        entry.classList.remove('is_active');
        if(entry.getAttribute('id') == filterbyID) {
            entry.classList.add('is_active');
        }
    }
    for (let para of Array.from(paras)) {
        if(para.getAttribute("aria-labelledby") == (filterbyID)) {
            parentListFavs.appendChild(para);
        }
    }
    parentListFavs.scrollIntoView({ behavior:"smooth" });
}

allFilters.addEventListener("click", showAllItems);

function showAllItems() {
    for (let entry of Array.from(filterControls)) {
        entry.classList.remove('is_active');
    }
    let favs = [...filterContentFavs];
    for (let fav of Array.from(favs)) {
        parentListFavs.appendChild(fav);
    }
    let paras = [...filterContentAll];
    for (let para of Array.from(paras)) {
        parentListAll.appendChild(para);
    }
    favFilters.classList.remove('is_active');

    allFilters.classList.add('is_active');
}


favFilters.addEventListener("click", showFavItems);


function showFavItems() {
    for (let entry of Array.from(filterControls)) {
        entry.classList.remove('is_active');
    }
    let favs = [...filterContentFavs];
    for (let fav of Array.from(favs)) {
        parentListFavs.appendChild(fav);
    }
    let paras = [...filterContentAll];
    for (let para of Array.from(paras)) {
        para.remove();
    }
    allFilters.classList.remove('is_active');

    favFilters.classList.add('is_active');
}

