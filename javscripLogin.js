//TODO : Its a Completed Code
function formvalid() {
  var vaildpass = document.getElementById("pass").value;
  if (vaildpass.length <= 8 || vaildpass.length >= 20) {
    document.getElementById("vaild-pass").innerHTML = "Minimum 8 characters";
    return false;
  } else {
    document.getElementById("vaild-pass").innerHTML = "";
  }
}


function show() {
  var x = document.getElementById("pass");
  if (x.type === "password") {
    x.type = "text";
    document.getElementById("showimg").src =
      "https://static.thenounproject.com/png/777494-200.png";
  } else {
    x.type = "password";
    document.getElementById("showimg").src =
      "https://cdn2.iconfinder.com/data/icons/basic-ui-interface-v-2/32/hide-512.png";
  }
}



// Get form's DOM object
var f = document.querySelector('#signup');
f.addEventListener('submit', (e) => {
  // Stop submitting form by itself
  e.preventDefault();

  // Try sign-in with AJAX
  fetch('/signin', {
    method: 'POST',
    body: new FormData(e.target),
    credentials: 'include',
  })
    .then((res) => {
      if (res.status == 200) {
        return Promise.resolve();
      } else {
        return Promise.reject('Sign-in failed');
      }
    })
    .then((profile) => {
      // Instantiate PasswordCredential with the form
      if (window.PasswordCredential) {
        var c = new PasswordCredential(e.target);
        return navigator.credentials.store(c);
      } else {
        return Promise.resolve(profile);
      }
    })
    .then((profile) => {
      // Successful sign-in
      if (profile) {
        updateUI(profile);
      }
    })
    .catch((error) => {
      // Sign-in failed
      showError('Sign-in Failed');
    });
});