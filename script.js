 // Initialize Firebase
 const firebaseConfig = {
    apiKey: "AIzaSyDCqGNacs46Vsw5etX8SRrYT1XQrV4piy0",
    authDomain: "numetry-project-a02a1.firebaseapp.com",
    projectId: "numetry-project-a02a1",
    storageBucket: "numetry-project-a02a1.appspot.com",
    messagingSenderId: "539629110974",
    appId: "1:539629110974:web:1126d3533de2d0866840ef",
    measurementId: "G-0Q5S9VQJ6V"
  };
firebase.initializeApp(firebaseConfig);

let recaptchaVerifier;
document.addEventListener("DOMContentLoaded", function() {
    // Initialize reCAPTCHA verifier
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': function(response) {
            console.log('reCAPTCHA resolved');
        }
    });

    // Render reCAPTCHA
    recaptchaVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
    }).catch(function(error) {
        console.error("reCAPTCHA rendering failed: ", error);
    });
});

// Function to send OTP
function phoneAuth() {
    var phoneNumber = document.getElementById('number').value;

    firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
            document.getElementById('sender').style.display = 'none';
            document.getElementById('verifier').style.display = 'block';
        }).catch(function (error) {
            console.error("Error sending SMS: ", error);
        });
}

// Function to verify OTP
function codeVerify() {
    var code = document.getElementById('verificationcode').value;
    confirmationResult.confirm(code)
        .then(function (result) {
            var user = result.user;
            document.getElementById('verification-result').innerText = "Number verified";
            document.getElementById('verification-result').style.color = 'green';
            document.getElementById('verification-result').style.display = 'block';
        }).catch(function (error) {
            document.getElementById('verification-result').innerText = "Incorrect OTP";
            document.getElementById('verification-result').style.color = 'red';
            document.getElementById('verification-result').style.display = 'block';
            console.error("Error verifying OTP: ", error);
        });
}