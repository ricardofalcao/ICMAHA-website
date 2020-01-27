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

var myForm = document.getElementById('registration-form');
myForm.onsubmit = function(event) {
    event.preventDefault();

    var formSubmitButton = document.getElementById('submit-button');
    var formSubmitText = document.getElementById('submit-text');

    formSubmitButton.classList.remove('submit-idle');
    formSubmitButton.classList.add('submit-processing');

    // collect the form data while iterating over the inputs
    var data = {};
    for (var i = 0, ii = myForm.length; i < ii; ++i) {
        var input = myForm[i];

        if (input.name) {
            data[input.name] = input.value;
            input.setAttribute("disabled", "");
        }
    }

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(myForm.method, myForm.action, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.onreadystatechange = function() {
        formSubmitButton.classList.remove('submit-processing');

        if (xhr.readyState == XMLHttpRequest.DONE) {
            if(xhr.status == 200) {
                formSubmitButton.classList.add('submit-success');
                formSubmitText.innerHTML = `Success!`;
            } else {
                formSubmitButton.classList.add('submit-error');
                formSubmitText.innerHTML = `An error occurred`;
            }
        }
    }

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));
}

console.log(document.documentElement.scrollTop);
fadeNavbar();