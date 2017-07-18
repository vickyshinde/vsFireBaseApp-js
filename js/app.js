'use strict';

var vsFirebaseApp = new Firebase("https://blinding-fire-8571.firebaseio.com/web/data");

var userName;
var userEmail;
var userMobile;
var userPassword;
var userConfirmPassword;
var inputEmail;
var inputLoginPassword;

function validateForm() {   
    userName = window.document.registrationForm.inputName.value;
    userEmail = window.document.registrationForm.inputEmail.value;
    userMobile = window.document.registrationForm.inputMobile.value;
    userPassword = window.document.registrationForm.inputPassword.value;
    userConfirmPassword = window.document.registrationForm.inputConfirmPassword.value;

    if (userName == null || userName == "") {
        alert("Name must be filled out");
        return;
    }
    if (userEmail == null || userEmail == "" ) {
        alert("Email must be filled out");
        return;
    }
    if (userMobile == null || userMobile == "") {
        alert("Mobile must be filled out");
        return;
    }
    if (userPassword == null || userPassword == "") {
        alert("Password must be filled out");
        return;
    }
    if (userConfirmPassword == null || userConfirmPassword == "") {
        alert("Password must be filled out");
        return;
    }
    if(!(userPassword === userConfirmPassword)) {
      alert("Password does not metch");
      return;
    } 
    adduser();
};

function adduser() {
  userName = window.document.registrationForm.inputName.value;
  userEmail = window.document.registrationForm.inputEmail.value;
  userMobile = window.document.registrationForm.inputMobile.value;
  userPassword = window.document.registrationForm.inputPassword.value;
  userConfirmPassword = window.document.registrationForm.inputConfirmPassword.value;
  var user = {
     _id: new Date().toISOString(),
     name: userName,
     email: userEmail,
     mobile: userMobile,
     password: userPassword,
     confirmpassword: userConfirmPassword,
     completed: false
   };
   vsFirebaseApp.push(user, function callback(err, result) {
     if (!err) {
      clearFields();
       alert('The new user was successfully added!');
     }
   });
}

function clearFields(){
  window.document.registrationForm.inputName.value = "";
  window.document.registrationForm.inputEmail.value = "";
  window.document.registrationForm.inputMobile.value = "";
  window.document.registrationForm.inputPassword.value = "";
  window.document.registrationForm.inputConfirmPassword.value = "";
}

function validateUserForm() {
  inputEmail = window.document.loginForm.inputLoginName.value;
  inputLoginPassword =  window.document.loginForm.inputLoginPassword.value;
  if (inputEmail == null || inputEmail == "") {
      alert("User Name must be filled out");
      return;
  }
  if (inputLoginPassword == null || inputLoginPassword == "" ) {
      alert("Password must be filled out");
      return;
  }
};

function loginUser() {
  validateUserForm();
  inputEmail = window.document.loginForm.inputLoginName.value;
  inputLoginPassword =  window.document.loginForm.inputLoginPassword.value;
 
  var checkError = 0;
  vsFirebaseApp.on("child_added", function(snapshot) {
    var newPost = snapshot.val();
     snapshot.forEach(function(userDoc) {
       if((newPost.email == inputEmail || newPost.mobile == inputEmail) && newPost.password == inputLoginPassword) {
          checkError = 0;
          document.cookie = newPost.name;
          var setUserName = document.cookie;
          window.location = "http://localhost:8080/vsFirebaseApp/dashboard.html";
          //console.log(setUserName);
          // console.log('success');
          } else {
            checkError++;
          }              
     });
     if(checkError > 0){
      console.log('Please check use name and password');
     }
   });
};

vsFirebaseApp.on("child_added", function(snapshot) {
  var element = $("table tbody");
  var newPost = snapshot.val();
  console.log("Name: "+ newPost.name + " Email: " + newPost.email + " Mobile: " + newPost.mobile); 
  element.append("<tr><td>"+ newPost._id +"</td><td>"+ newPost.name +"</td><td>"+ newPost.email +"</td><td>"+ newPost.mobile +"</td></tr>")
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
}); 
