window.onload = init;

const LoginPage = {
    currentPageState: 'login',
    currentLocation: null
}

function onGeolocateSuccess(location) {
    LoginPage.currentLocation = location.coords;
    document.getElementById('submit-button').disabled = false;
}

function onGeolocateError(error) {
    let errorStr = '';
    // TODO: replace with DOM alerts
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorStr = "Please allow access to your location to continue. Click the icon in the left of your address bar to change the location permission."
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
    alert("Registration failed: " + errorStr);
}


function init() {
    let regBtn = document.getElementById('register');
    regBtn.addEventListener('click', function() {
        this.innerHTML = 'login';
        let form = document.getElementById('initial-login');
        let header = form.getElementsByTagName('h1')[0];
        let submitBtn = document.getElementById('submit-button');
        if (LoginPage.currentPageState = 'login') {
            header.innerHTML = 'Register';
            LoginPage.currentPageState = 'regn';
            submitBtn.disabled = true;
            submitBtn.value = 'Register';
            form.action = 'register';
            if (window.navigator && window.navigator.geolocation) {
                // TODO: DOM alert
                alert("We need your location to register you successfully. Click Allow when prompted.");
                navigator.geolocation.getCurrentPosition(onGeolocateSuccess, onGeolocateError);
            }
            for (let x of form.childNodes) {
                if (x.type != 'email' && x.type != 'password') {
                    form.removeChild(x);
                }
            }
            createField(form, 'Name', true)
            createField(form, 'PhoneNo', false);
            createField(form, 'Address', false);
            createField(form, 'Coordinates', false);
            document.getElementById('CoordinatesField').style.display = 'none';
            CoordinatesField.innerHTML = LoginPage.currentLocation;

        }
        else {
            this.innerHTML = 'register';
            header.innerHTML = 'Login';
            LoginPage.currentPageState = 'login';
            form.action = 'auth';
            for (let x of form.childNodes) {
                if (x.type != 'email' && x.type != 'password') {
                    form.removeChild(x);
                }
            }
        }
    });

    function createField(form, value, reqd) {
        let elem = document.createElement('input');
        elem.type = 'text';
        elem.id = value + 'Field';
        elem.name = value;
        elem.required = reqd;
        elem.placeholder = `your ${value}`
        let submitBtn = document.getElementById('submit-button');
        form.insertBefore(elem, submitBtn);
        return elem;
    }
}