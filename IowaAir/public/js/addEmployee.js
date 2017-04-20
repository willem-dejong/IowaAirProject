function register(){
	if (validateForm()){
		var email=document.getElementById('emailin').value;
		var cmd = "/admin/createmanager?fname="+document.getElementById('fnamein').value+"&lname="+document.getElementById('lnamein').value+"&email="+email+"&phone="+document.getElementById('phonein').value;
		$.ajax({url:cmd,success:function(result){
			console.log(result);
			resultSwitch(result,email);
		},error:function(err){
			window.location=window.location;
		}});
	}
}
function redirect(){
	window.location=window.location;
}
function resultSwitch(result,email){
	if(result=="success"){
		document.querySelector("#registration").removeChild(document.querySelector("#regform"));
		var div1=document.createElement("div");
		div1.style="font-size:70px;text-align:center;";
		div1.appendChild(document.createTextNode("Success!"));
		div1.appendChild(document.createElement("br"));
		div1.appendChild(document.createTextNode("See email for temporary password."));
		document.querySelector("#registration").appendChild(div1);
		var div2=document.createElement("div");
		div2.style="text-align:center";
		div2.appendChild(document.createTextNode("If not automatically redirected after 30 sec "));
		var aa=document.createElement("a");
		aa.setAttribute("href","/admin/addEmployee");
		aa.appendChild(document.createTextNode("click here."));
		div2.appendChild(aa);
		document.querySelector("#registration").appendChild(document.createElement("br"));
		document.querySelector("#registration").appendChild(div2);
		setTimeout(redirect,3000);
	}
	else if(result=="email in use"){
		document.querySelector("#emailInUse").style.display='block';
		document.querySelector("#emaillab").style.color="red";
	}
	else if(result=="insert error"){
		document.querySelector("#genErr").style.display='block';
	}
	else if(result=="email error"){document.querySelector("#registration").removeChild(document.querySelector("#regform"));
		var div1=document.createElement("div");
		div1.style="font-size:70px;text-align:center;";
		div1.appendChild(document.createTextNode("NOTICE!"));
		document.querySelector("#registration").appendChild(div1);
		document.querySelector("#registration").appendChild(document.createElement("br"));
		var div2=document.createElement("div");
		div2.style="text-align:center;font-size:50px;";
		div2.appendChild(document.createTextNode("Account Created, but email failed to send. Please use the "));
		var aa=document.createElement("a");
		aa.setAttribute("href","javascript:void(0)");
		aa.onclick=function(){
			createloginbox();
			changeToForgotPass();
			document.querySelector("#email").value=email;
		};
		aa.appendChild(document.createTextNode("forgot password"));
		div2.appendChild(aa);
		div2.appendChild(document.createTextNode(" functionality or contact support."));
		document.querySelector("#registration").appendChild(div2);
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
    document.getElementById('missingErr').style.display = 'none';
    document.getElementById('invalidEmail').style.display = 'none';
    document.getElementById('invalidPhone').style.display = 'none';
    document.getElementById('emailInUse').style.display = 'none';
    document.getElementById('genErr').style.display = 'none';
    
    document.getElementById('fnamelab').style.color = 'black';
    document.getElementById('lnamelab').style.color = 'black';
    document.getElementById('emaillab').style.color = 'black';
    document.getElementById('phonelab').style.color = 'black';

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
        var phoneMatch = document.getElementById('phonein').value.match(/(([0-9]+\-)?[0-9]{3}\-)?[0-9]{3}\-[0-9]{4}/g);     /////////////// CHECK IF PHONE IS VALID FORMAT ////////////
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

    if(missingFlag || emailFlag||phoneFlag){
        if(missingFlag){
            document.getElementById('missingErr').style.display = 'block';
        }
        if(emailFlag){
            document.getElementById('invalidEmail').style.display = 'block';
        }
        if(phoneFlag){
    			document.getElementById('invalidPhone').style.display = 'block';
        }
        //console.log("return false");
        return false;
    }
    else{
        //console.log("return true");
        return true;
    }

}