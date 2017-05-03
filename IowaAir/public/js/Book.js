function book(but) {
    var error = document.getElementById("invalidInput");
	var confirm = document.getElementById("confirmDiv");
	var book = document.getElementById("bookDiv")

	error.style.display = "none";
	var ccnum=document.getElementById("ccnum");
	var csnum=document.getElementById("csnum");
	var cedate=document.getElementById("cedate");
	var cfname=document.getElementById("cfname");
	var clname=document.getElementById("clname");
	var caddress=document.getElementById("caddress");
	var flag = false;
	if(ccnum.value == ""||!ccnum.value.match(/[a-zA-Z0-9]{10}/g)){
		document.getElementById("labccnum").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labccnum").style.color="black";
	}
	if(csnum.value == ""){
		document.getElementById("labcsnum").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labcsnum").style.color="black";
	}
	if(cedate.value == ""||!cedate.value.match(/[0-1]?[0-9]\/[0-9]{2}/g)){
		document.getElementById("labcedate").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labcedate").style.color="black";
	} 
	if(cfname.value == ""){
		document.getElementById("labcfname").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labcfname").style.color="black";
	} 
	if(clname.value == ""){
		document.getElementById("labclname").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labclname").style.color="black";
	} 
	if(caddress.value == ""){
		document.getElementById("labcaddress").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labcaddress").style.color="black";
	} 
	
	var i=1;
	var pass=document.getElementById("pass"+ String(i));;
	

	var fname;
	var lname;
	var dob;
	var phone;
	var gender;


	var date;
	var newDate;
	
	while(pass!=null){
		fname = pass.querySelector("#fnamein").value;
	    lname = pass.querySelector("#lnamein").value;
	    dob = pass.querySelector("#dobin").value;
	    phone = pass.querySelector("#phonein").value;
	    gender = pass.querySelector("#genderin").value;

	    if(dob.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g)[0]!=dob){
	    	pass.querySelector("#labdobin").style.color="red";
	    	flag = true;
	    }
	    else{
	    	pass.querySelector("#labdobin").style.color="black";
	    }

		if(fname == "" || lname == "" || dob == "" || phone == "" ||!phone.match(/(([0-9]+\-)?[0-9]{3}\-)?[0-9]{3}\-[0-9]{4}/g)|| gender == "") {
	    	//check date of birth
	    	if(fname==""){
	    		pass.querySelector("#labfnamein").style.color="red";
	    	}
	    	else{
	    		pass.querySelector("#labfnamein").style.color="black";
	    	}
	    	if(lname==""){
	    		pass.querySelector("#lablnamein").style.color="red";
	    	}
	    	else{
	    		pass.querySelector("#lablnamein").style.color="black";
	    	}
	    	if(dob==""){
	    		pass.querySelector("#labdobin").style.color="red";
	    	}
	    	else{
	    		pass.querySelector("#labdobin").style.color="black";
	    	}
	    	if(phone==""||!phone.match(/(([0-9]+\-)?[0-9]{3}\-)?[0-9]{3}\-[0-9]{4}/g)){
	    		pass.querySelector("#labphonein").style.color="red";
	    	}
	    	else{
	    		pass.querySelector("#labphonein").style.color="black";
	    	}
	    	if(gender=""){
	    		pass.querySelector("#labgenderin").style.color="red";
	    	}
	    	else{
	    		pass.querySelector("#labgenderin").style.color="black";
	    	}
	      flag = true;
	    }
	    else{
	    		pass.querySelector("#labfnamein").style.color="black";
	    		pass.querySelector("#lablnamein").style.color="black";
	    		pass.querySelector("#labdobin").style.color="black";
	    		pass.querySelector("#labphonein").style.color="black";
	    		pass.querySelector("#labgenderin").style.color="black";
	    }
	    i += 1;
	    pass = document.getElementById("pass"+ String(i));
	}

	if(flag) {
    	//check date of birth
    	confirm.style.display = "none";
    	book.style.display = "block";
    	var error = document.getElementById("invalidInput");
      error.style.display = "block";
    }
    else{
		var pass;
		var i=1;
		var pass=document.getElementById("pass"+ String(i));

		var fnames = [];
		var lnames = [];
		var dobs = [];
		var phones = [];
		var genders = [];

		//*************************************************************
		var n = document.getElementById("resultlist").getAttribute("passnum");

		var address = "/bookit?pass="+n;

		//var date;
		//var newDate;

		while(pass!=null){
		    console.log(pass);
		    //var fname = pass.querySelector(".fnamein").value;
		    //eval("var fname" + i + "=pass.querySelector(".fnamein").value;");
		    fnames[i] = pass.querySelector("#fnamein").value;
		    lnames[i] = pass.querySelector("#lnamein").value;
		    phones[i] = pass.querySelector("#phonein").value;
		    genders[i] = pass.querySelector("#genderin").value;
		    dobs[i] = pass.querySelector("#dobin").value;

		    //date = dobs[i].split("-");
		    //newDate = new Date(parseInt(date[0]),parseInt(date[1])-1,parseInt(date[2]));



		    console.log("fname"+i+":"+fnames[i]);
		    console.log("lname"+i+":"+lnames[i]);
		    console.log("dob"+i+":"+dobs[i]);
		    //console.log("dob"+i+":"+newDate);
		    console.log("phone"+i+":"+phones[i]);
		    console.log("gender"+i+":"+genders[i]);

		    address = address+"&fname"+i+"="+fnames[i]+"&lname"+i+"="+lnames[i]+"&dob"+i+"="+dobs[i]+"&phone"+i+"="+phones[i]+"&gender"+i+"="+genders[i];
		    //address = address+"&fname"+i+"="+fnames[i]+"&lname"+i+"="+lnames[i]+"&dob"+i+"="+newDate+"&phone"+i+"="+phones[i]+"&gender"+i+"="+genders[i];

		    i+=1
		    pass = document.getElementById("pass"+ String(i));
	    }

	    var toid = document.getElementById("resultlist").getAttribute("to");
	    var returnid = document.getElementById("resultlist").getAttribute("return");

	    address = address+"&flightids1="+toid;

	    //check if there is a return flight
	    if(returnid != "null"){
	    	address = address+"&flightids2="+returnid;
	    }

	    var toclass = document.getElementById("resultlist").getAttribute("class1");
	    var returnclass = document.getElementById("resultlist").getAttribute("class2");

	    address = address+"&class1="+toclass;

	    if(returnclass != "null"){
	    	address = address+"&class2="+returnclass;
	    }

	    console.log(address);

	    $.ajax({url:address,success:function(result){
	    	window.location="/ThankYou"
	    },error:function(error){
		    console.log(error)
	    	confirm.style.display = "none";
	    	book.style.display = "block";
	      error.style.display = "block";
      }});
	 }
}
//After book button is selected first time, all fields are checked for errors
function confirmBook(but){
    var error = document.getElementById("invalidInput");
	var confirm = document.getElementById("confirmDiv");
	var book = document.getElementById("bookDiv")

	error.style.display = "none";
	var ccnum=document.getElementById("ccnum");
	var csnum=document.getElementById("csnum");
	var cedate=document.getElementById("cedate");
	var cfname=document.getElementById("cfname");
	var clname=document.getElementById("clname");
	var caddress=document.getElementById("caddress");
	var flag = false;
	if(ccnum.value == ""||!ccnum.value.match(/[a-zA-Z0-9]{10}/g)){
		document.getElementById("labccnum").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labccnum").style.color="black";
	}
	if(csnum.value == ""){
		document.getElementById("labcsnum").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labcsnum").style.color="black";
	}
	if(cedate.value == ""||!cedate.value.match(/[0-1]?[0-9]\/[0-9]{2}/g)){
		document.getElementById("labcedate").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labcedate").style.color="black";
	} 
	if(cfname.value == ""){
		document.getElementById("labcfname").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labcfname").style.color="black";
	} 
	if(clname.value == ""){
		document.getElementById("labclname").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labclname").style.color="black";
	} 
	if(caddress.value == ""){
		document.getElementById("labcaddress").style.color="red";
		flag=true;
	}
	else{
		document.getElementById("labcaddress").style.color="black";
	} 
	
	var i=1;
	var pass=document.getElementById("pass"+ String(i));;
	

	var fname;
	var lname;
	var dob;
	var phone;
	var gender;


	var date;
	var newDate;
	
	while(pass!=null){
		fname = pass.querySelector("#fnamein").value;
	    lname = pass.querySelector("#lnamein").value;
	    dob = pass.querySelector("#dobin").value;
	    phone = pass.querySelector("#phonein").value;
	    gender = pass.querySelector("#genderin").value;

	    if(dob.search("[0-9]{4}-[0-9]{2}-[0-9]{2}") == -1){
	    	pass.querySelector("#labdobin").style.color="red";
	    	flag = true;
	    }
	    else{
	    	pass.querySelector("#labdobin").style.color="black";
	    }

		if(fname == "" || lname == "" || dob == "" || phone == "" ||!phone.match(/(([0-9]+\-)?[0-9]{3}\-)?[0-9]{3}\-[0-9]{4}/g)|| gender == "") {
	    	//check date of birth
	    	if(fname==""){
	    		pass.querySelector("#labfnamein").style.color="red";
	    	}
	    	else{
	    		pass.querySelector("#labfnamein").style.color="black";
	    	}
	    	if(lname==""){
	    		pass.querySelector("#lablnamein").style.color="red";
	    	}
	    	else{
	    		pass.querySelector("#lablnamein").style.color="black";
	    	}
	    	if(dob==""){
	    		pass.querySelector("#labdobin").style.color="red";
	    	}
	    	else{
	    		pass.querySelector("#labdobin").style.color="black";
	    	}
	    	if(phone==""||!phone.match(/(([0-9]+\-)?[0-9]{3}\-)?[0-9]{3}\-[0-9]{4}/g)){
	    		pass.querySelector("#labphonein").style.color="red";
	    	}
	    	else{
	    		pass.querySelector("#labphonein").style.color="black";
	    	}
	    	if(gender=""){
	    		pass.querySelector("#labgenderin").style.color="red";
	    	}
	    	else{
	    		pass.querySelector("#labgenderin").style.color="black";
	    	}
	      flag = true;
	    }
	    else{
	    		pass.querySelector("#labfnamein").style.color="black";
	    		pass.querySelector("#lablnamein").style.color="black";
	    		pass.querySelector("#labdobin").style.color="black";
	    		pass.querySelector("#labphonein").style.color="black";
	    		pass.querySelector("#labgenderin").style.color="black";
	    }
	    i += 1;
	    pass = document.getElementById("pass"+ String(i));
	}

	if(flag) {
    	//check date of birth
       	error.style.display = "block";
    }
    else{
    	confirm.style.display = "block";
    	book.style.display = "none";
    }

}
/*
function bookAll(but){
    var pass;
    var i=1;
    var row=document.getElementById("pass"+ String(i));
    while(row!=null){
	    bookPass(pass);
	    i+=1
	    row = document.getElementById("pass"+ String(i));
    }
    checkErrors();
}

function bookPass(pass){
    console.log(pass);
    var fname = pass.querySelector(".fnamein").value;
    var lname = pass.querySelector(".lnamein").value;
    var dob = pass.querySelector(".dobin").value;
    var phone = pass.querySelector(".phonein").value;
    var gender = pass.querySelector(".genderin").value;

    console.log("fname: "+fname);
    console.log("lname: "+lname);
    console.log("dob: "+dob);
    console.log("phone: "+phone);
    console.log("gender: "+gender);
    
    document.getElementById("invalidInput").style.display = "none";
    
    if(fname == "" || lname == "" || dob == "" || phone == "" || gender == "") {
    	//check date of birth
        flag = true;
        row.bgColor = "#FF0000";
    }
    else{     
        row.bgColor = "transparent";
        var address = "/book?fname="+fname+"&lname="+lname+"&dob="+dob+"&phone="+phone+"&gender="+gender;
        console.log("Address: "+address);
        $.ajax({url:address,success:function(result){console.log(result)},error:function(error){console.log(error)}});
    }
}

function checkErrors(){
    var allErrors = document.getElementsByClassName("bookbutton")
    var flag = false;
    for(var i = 0; i < allErrors.length;i++){
        if(allErrors[i].parentElement.parentElement.bgColor == "#FF0000"){
	        flag = true;
        }
    }
    var error = document.getElementById("invalidInput");
    if(flag){
        error.style.display = "block";
    }
    else{
        error.style.display = "none";
    }
    $('.success').fadeIn().delay(2000).fadeOut(1000);
}*/