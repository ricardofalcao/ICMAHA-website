function toggleNavbar(id) {
    var x = document.getElementById(id);
    x.classList.toggle("hidden");
}

function showDropdown(id) {
    var x = document.getElementById(id);
    x.classList.remove("hidden");
}

function hideDropdown(id) {
    var x = document.getElementById(id);
    x.classList.add("hidden");
}

function fadeNavbar() { 
    "use strict";
    if (document.documentElement.scrollTop >= 200 ) {
        myNav.classList.add("lg:bg-gray-800");
        myNav.classList.remove("lg:bg-transparent");
    } 
    else {
        myNav.classList.add("lg:bg-transparent");
        myNav.classList.remove("lg:bg-gray-800");
    }
};

var myNav = document.getElementById('example-navbar');
window.onscroll = fadeNavbar;
window.onhashchange = fadeNavbar;

fadeNavbar();