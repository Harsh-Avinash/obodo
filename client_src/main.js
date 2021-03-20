window.onload = init;

const LoginPage = {
    currentPageState: 'login',
    currentLocation: null
}

function onGeolocateSuccess(location) {
    LoginPage.currentLocation = location.coords;
}

function onGeolocateError(error) {
    let errorStr = '';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorStr = "Please allow access to your location to continue. Reload the page to see the dialog again."
            break;
        case error.POSITION_UNAVAILABLE:
            errorStr = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            errorStr = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            errorStr = "An unknown error occurred."
            break;
    }
    alert(errorStr);
    window.location.reload();
}


function init() {
    let regBtn = document.getElementById('register');
    regBtn.addEventListener('click', function() {
        let form = document.getElementById('login-form');
        let header = form.getElementsByTagName('h1')[0];
        let submitBtn = document.getElementById('submit-button');
        if (LoginPage.currentPageState = 'login') {
            header.innerHTML = 'Register';
            LoginPage.currentPageState = 'regn';
            submitBtn.disabled = true;
            if (window.navigator && window.navigator.geolocation) {
                alert("We need your location to register you successfully. Click Allow when prompted.");
                navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError);
            }
        }
        else {
            header.innerHTML = 'Login';
            LoginPage.currentPageState = 'login';

            for (let x of form.childNodes) {
                if (x.type != 'email' && x.type != 'password') {
                    form.removeChild(x);
                }
            }
        }
    });

    function createField() {
        let elem = document.createElement('input');
        elem.type = 'text';
    }
}