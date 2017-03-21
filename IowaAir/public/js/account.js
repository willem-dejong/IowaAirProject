function change(){
	 document.querySelector("#invalidcred").style.display='none';
	 document.querySelector("#genErr").style.display='none';
	 document.querySelector("#opasswlab").style.color='black';
	 document.querySelector("#npasswlab").style.color='black';
	 document.querySelector("#ncpasswlab").style.color='black';
  	 document.querySelector("#PassMissMatch").textContent="";
    var p0=document.querySelector("#opasswin");
    var p1=document.querySelector("#npasswin");
    var p2=document.querySelector("#ncpasswin");
    console.log(p0.value);
    console.log(p1.value);
    console.log(p2.value);
    var b=false;
    if (p1.value!=p2.value){
        document.querySelector("#PassMissMatch").textContent="Passwords did not match";
		  document.querySelector("#npasswlab").style.color='red';
		  document.querySelector("#ncpasswlab").style.color='red';
		  b=true;
    }
    if(p1.value.length<8){
        document.querySelector("#PassMissMatch").textContent="Password too short";
		  document.querySelector("#npasswlab").style.color='red';
		  document.querySelector("#ncpasswlab").style.color='red';
		  b=true;
    }
    else if(p1.value.length>16){
        document.querySelector("#PassMissMatch").textContent="password too long";
		  document.querySelector("#npasswlab").style.color='red';
		  document.querySelector("#ncpasswlab").style.color='red';
		  b=true;
    }
    if(p1.value.search(/[A-Z]/)==-1 ||p1.value.search(/[a-z]/)==-1 ||p1.value.search(/[0-9]/)==-1){
        document.querySelector("#PassMissMatch").textContent="Password must contain atleast 1 lowercase,uppercase and number.";
		  document.querySelector("#npasswlab").style.color='red';
		  document.querySelector("#ncpasswlab").style.color='red';
		  b=true;
    }
    console.log(b)
    if(!b){
	    var cmd="/changepass?email="+vemail+"&opassw="+hex_md5(p0.value)+"&npassw="+hex_md5(p1.value);
	    $.ajax({url:cmd,success:function(result){
	    	if(result=="true"){
	    		window.location=window.location;
	    	}
			else if(result=="invalid cred"){
				document.querySelector("#invalidcred").style.display='block';
				document.querySelector("#opasswlab").style.color='red';
			}
			else{
				document.querySelector("#genErr2").style.display='block';
			}
    	}});
    }
}
function enable(){
	document.querySelector("#fnamein").disabled=false
	document.querySelector("#lnamein").disabled=false
		/*document.querySelector("#emailin").disabled=false*/
	document.querySelector("#phonein").disabled=false
	document.querySelector("#passwdiv").style.display="block";
	document.querySelector("#regbut").value="submit";
	document.querySelector("#regbut").onclick=update;
}
function update(){
	if (validateForm()){
		var cmd = "/updateaccount?fname="+document.getElementById('fnamein').value+"&lname="+document.getElementById('lnamein').value+"&email="+document.getElementById('emailin').value+"&phone="+document.getElementById('phonein').value+"&passw="+hex_md5(document.getElementById("passwin").value);
		$.ajax({url:cmd,success:function(result){
			resultSwitch(result)
		}});
	}
}
function redirect(){
	window.location="/";
}
function resultSwitch(result){
	if(result=="success"){
		window.location=window.location
	}
	else if("invalid password"){
		document.getElementById('invalidPassw').style.display = 'block';
    document.getElementById('passwlab').style.color = 'red';
	}
	else if(result=="update error"){
		document.querySelector("#genErr").style.display='block';
	}
	else if(result.search("multi;")!=-1){
		if (result.indexOf("invalid email;")==-1){
    		document.getElementById('invalidEmail').style.display = 'block';
    		document.getElementById('emaillab').style.color = 'red';
		}
		if (result.indexOf("invalid phone;")==-1){
			document.getElementById('invalidPhone').style.display = 'block';
    		document.getElementById('phonelab').style.color = 'red';
		}
		if (result.indexOf("invalid fname;")==-1){
			document.getElementById('missingErr').style.display = 'block';
    		document.getElementById('fnamelab').style.color = 'red';
		}
		if (result.indexOf("invalid lname;")==-1){
			document.getElementById('missingErr').style.display = 'block';
    		document.getElementById('lnamelab').style.color = 'red';
		}
	}
	else{
		document.querySelector("#genErr").style.display='block';
	}
}
function validateForm(){
    var missingFlag = false;
    var emailFlag = false;
	 var phoneFlag=false;
	 var passFlag=false;
    document.getElementById('missingErr').style.display = 'none';
    document.getElementById('invalidEmail').style.display = 'none';
    document.getElementById('invalidPhone').style.display = 'none';
    document.getElementById('invalidPassw').style.display = 'none';
    document.getElementById('emailInUse').style.display = 'none';
    document.getElementById('genErr').style.display = 'none';
    
    document.getElementById('fnamelab').style.color = 'black';
    document.getElementById('lnamelab').style.color = 'black';
    document.getElementById('emaillab').style.color = 'black';
    document.getElementById('phonelab').style.color = 'black';
    document.getElementById('passwlab').style.color = 'black';

    if(!(document.getElementById('fnamein').value)){
        document.getElementById('fnamelab').style.color = 'red';
        missingFlag = true;
    }
    if(!(document.getElementById('lnamein').value)){
        document.getElementById('lnamelab').style.color = 'red';
        missingFlag = true;
    }
    if(!(document.getElementById('emailin').value)){
        document.getElementById('emaillab').style.color = 'red';
        missingFlag = true;
    }
    else{
        var emailMatch = document.getElementById('emailin').value.match(/[A-Za-z0-9]+([.\-_][A-Za-z0-9]+)*@[A-Za-z0-9]+([.\-_][A-Za-z0-9]+)*\.[A-Za-z]+/g)
        console.log(emailMatch);
        if(emailMatch && document.getElementById('emailin').value != emailMatch[0]){
            emailFlag = true;
            document.getElementById('emaillab').style.color = 'red';
        }
        else if(!emailMatch){
            emailFlag = true;
            document.getElementById('emaillab').style.color = 'red';
        }

    }
    if(!(document.getElementById('phonein').value)){
        document.getElementById('phonelab').style.color = 'red';
        missingFlag = true;
    }
    else{
        var phoneMatch = document.getElementById('phonein').value.match(/(([0-9]\-)?[0-9]{3}\-)?[0-9]{3}\-[0-9]{4}/g);     /////////////// CHECK IF PHONE IS VALID FORMAT ////////////
        console.log(phoneMatch);
        if(phoneMatch&&document.getElementById('phonein').value!=phoneMatch[0]){
        		document.getElementById('phonelab').style.color = 'red';
        		phoneFlag=true;
        }
        else if(!phoneMatch){
            document.getElementById('phonelab').style.color = 'red';
        		phoneFlag=true;
        }
    }
	 if(!document.getElementById('passwin').value){
        document.getElementById('passwlab').style.color = 'red';
        missingFlag = true;
        passFlag=true;
	 	
	 }
    if(missingFlag || emailFlag||phoneFlag||passFlag){
        if(missingFlag){
            document.getElementById('missingErr').style.display = 'block';
        }
        if(emailFlag){
            document.getElementById('invalidEmail').style.display = 'block';
        }
        if(phoneFlag){
    			document.getElementById('invalidPhone').style.display = 'block';
        }
        if(passFlag){
    			document.getElementById('invalidPassw').style.display = 'block';
        }
        //console.log("return false");
        return false;
    }
    else{
        //console.log("return true");
        return true;
    }

}