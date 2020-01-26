function toggleNavbar(id) {
    var x = document.getElementById(id);
    x.classList.toggle("hidden");
}

var myNav = document.getElementById('example-navbar');
window.onscroll = function () { 
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