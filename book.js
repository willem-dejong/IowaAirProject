function book(but){
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

	while(pass!=null){
	    console.log(pass);
	    //var fname = pass.querySelector(".fnamein").value;
	    //eval("var fname" + i + "=pass.querySelector(".fnamein").value;");
	    fnames[i] = pass.querySelector(".fnamein").value;
	    lnames[i] = pass.querySelector(".lnamein").value;
	    dobs[i] = pass.querySelector(".dobin").value;
	    phones[i] = pass.querySelector(".phonein").value;
	    genders[i] = pass.querySelector(".genderin").value;

	    console.log("fname"+i+":"+fnames[i]);
	    console.log("lname"+i+":"+lnames[i]);
	    console.log("dob"+i+":"+dobs[i]);
	    console.log("phone"+i+":"+phones[i]);
	    console.log("gender"+i+":"+genders[i]);

	    address = address+"&fname"+i+"="+fnames[i]+"&lname"+i+"="+lnames[i]+"&dob"+i+"="+dobs[i]+"&phone"+i+"="+phones[i]+"&gender"+i+"="+genders[i];

	    i+=1
	    pass = document.getElementById("pass"+ String(i));
    }

    var toid = document.getElementById("resultlist").getAttribute("to");
    var returnid = document.getElementById("resultlist").getAttribute("to");

    address = address+"&flightids1="+toid;

    //check if there is a return flight
    if(returnid != null){
    	address = address+"&flightids2="+returnid;
    }

    var toclass = document.getElementById("resultlist").getAttribute("class1");
    var returnclass = document.getElementById("resultlist").getAttribute("class2");

    address = address+"&class1="+toclass;

    if(returnclass != null){
    	address = address+"&class2="+returnclass;
    }


    $.ajax({url:address,success:function(result){console.log(result)},error:function(error){console.log(error)}});
}

//After book button is selected first time, all fields are checked for errors
function confirmation(but){
	var error = document.getElementById("invalidInput");
	var confirm = document.getElementById("confirm");

	var i=1;
	var pass=document.getElementById("pass"+ String(i));;

	var fname;
	var lname;
	var dob;
	var phone;
	var gender;

	var flag = false;
	
	while(pass!=null){
		fname = pass.querySelector(".fnamein").value;
	    lname = pass.querySelector(".lnamein").value;
	    dob = pass.querySelector(".dobin").value;
	    phone = pass.querySelector(".phonein").value;
	    gender = pass.querySelector(".genderin").value;

		if(fname == "" || lname == "" || dob == "" || phone == "" || gender == "") {
	    	//check date of birth
	       	flag = true;
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
    }

}

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
}