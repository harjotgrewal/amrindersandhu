


// TOP SCROLL BAR
window.addEventListener('scroll', myScrollFunc);

function myScrollFunc() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";  
}







// Email me modal
// Get the modal
var body = document.body;

var modal = document.getElementById("emailModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Copy email button
var copyBtn = document.getElementById("copyEmail");

// Copy button text
var btnText = document.getElementById('btnCopy');

// Send email button
var sendEmail = document.getElementById("composeMail");

// Get the <span> element that closes the modal
var closeModal = document.getElementsByClassName("c-modal__close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.classList.add('is-visible');
  body.classList.add('is-fixed');
  btnText.innerHTML = 'Copy my email address';
}


copyBtn.onclick = function() {
    const el = document.createElement('textarea');
    el.value = 'contact@amrindersandhu.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    btnText.innerHTML = 'Copied email to clipboard';
    btnText.style.color = "green";

    setTimeout(function(){ 
        modal.classList.remove('is-visible');
        body.classList.remove('is-fixed');
        btnText.style.setProperty('color', 'inherit');
     }, 1000);
}

sendEmail.onclick = function() {
    modal.classList.remove('is-visible');
    body.classList.remove('is-fixed');
}


// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
    modal.classList.remove('is-visible');
    body.classList.remove('is-fixed');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove('is-visible');
    body.classList.remove('is-fixed');
  }
}


// Back to top
const topButton = document.getElementById('js-back-to-top');
const sectionNavAppear = document.querySelector('#js-page_nav');
topButton.onclick = function() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
}


function scrollEvent(element) {
    let scrollTop = window.pageYOffset;
    if(scrollTop > 1500) {
        element.classList.add('is-visible');       
    }
    else if(scrollTop < 1500) {
        element.classList.remove('is-visible');
    }
}

function scrollNavEvent(element) {
    let scrollTop = window.pageYOffset;
    if(scrollTop > 1100) {
        element.classList.add('is-visible');       
    }

    if((window.innerHeight + scrollTop + 300) >= document.body.offsetHeight) {
        element.classList.remove('is-visible');        
    }

    else if(scrollTop < 1100) {
        element.classList.remove('is-visible');
    }    
}


window.addEventListener('scroll', function() {
    scrollEvent(topButton);
    scrollNavEvent(sectionNavAppear);
})



// Library 
const filterWrapper = document.querySelector(".js-filtersWrapper");

const filterControls = document.querySelectorAll(".js-filter");

const filterContentFavs = document.querySelectorAll(".c-books_list_item--fav")

const filterContentAll = document.querySelectorAll(".c-books_list_item--all")

const allFilters = document.querySelector('.js-all-items');

const favFilters = document.querySelector('.js-fav-items');

const parentListAll = document.querySelector('.c-books_list--all');

const parentListFavs = document.querySelector('.c-books_list--favs');


if (filterControls) {
    filterControls.forEach(element => {
        element.addEventListener("click", event => {
            let filterbyID = event.target.getAttribute("id");
            showItemsAll(filterbyID);
            showItemsFavs(filterbyID);
        });        
    });
}



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

if (allFilters) {
    allFilters.addEventListener("click", showAllItems);
}

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


if (favFilters) {
    favFilters.addEventListener("click", showFavItems);
}


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



// Adding active class to page navigation
let pageNav = document.getElementById('js-page_nav');

if (pageNav) {
    pageNav.addEventListener(onclick, addActive);
}

function addActive() {
    this.classList.add('is-active');
}


// ADD ACTIVE CLASS TO SECTION NAVIGATION
let sectionNavList = document.querySelectorAll('#js-page_nav a');

function sectionNav() {             
    sectionNavList.forEach(function(navItem) {
        navItem.classList.remove('is-active');
    })
}

sectionNavList.forEach(function(navItem) {        
    navItem.addEventListener('click', function() {
        sectionNav();
        navItem.classList.add('is-active');
    });
});