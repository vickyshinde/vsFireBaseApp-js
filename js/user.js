function displayUser () {
	var h2 = document.getElementById("printUser");
	var setUserName = document.cookie;
	var str = "Welcome " + setUserName ;
	//console.log(str)
	h2.innerHTML = str;
}
displayUser();