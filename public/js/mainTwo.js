function validate(){
	var email = document.loginForm.emailID.value;
	var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
		document.getElementById('emailError')
		.innerHTML = "Enter a valid email address.";
	} else{
		document.getElementById('emailError')
		.innerHTML = ""; 
	}
}

function pwdvalidate(){
	var pwd = document.loginForm.memPass.value;
	if (pwd.length < 8){
		document.getElementById('passError')
		.innerHTML = "Password should be greater than 8 characters.";
	} else{
		document.getElementById('passError')
		.innerHTML = "";
	}
	var regex = /[0-9!_.]+/
	if(!regex.test(pwd)){
		document.getElementById('passError1')
		.innerHTML = "Password should contain a special character and a number.";
	} else{
		document.getElementById('passError1')
		.innerHTML = "";
	}

}