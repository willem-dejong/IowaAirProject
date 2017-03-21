var registerpage="/registration";
//var forgotpasspage="";
var accountManagepage="";
var vfname="";
var vlname="";
var accountType="";
var forcepw="";
var hpassw="";
var vemail="";
function keydownLogin(event){
	if(event.keyCode==13){
		login();
	}
}
function keydownForgot(event){
	if(event.keyCode==13){
		requestChange();
	}
}
function keydownChange(event){
	if(event.keyCode==13){
		changePass();
	}
}
function getSession(){
	$.ajax({url:"/getSession",success:function(result){
		var i=result.indexOf("fname=")+6;
		var ii=result.indexOf(";",i);
		vfname=result.substring(i,ii);
		i=result.indexOf("lname=")+6;
		ii=result.indexOf(";",i);
		vlname=result.substring(i,ii);
		i=result.indexOf("type=")+5;
		ii=result.indexOf(";",i);
		accountType=result.substring(i,ii);
		i=result.indexOf("email=")+6;
		ii=result.indexOf(";",i);
		vemail=result.substring(i,ii);
		}});
}
function changeToForgotPass(){
	document.querySelector("#login").removeChild(document.querySelector("#passwl"));
	document.querySelector("#login").removeChild(document.querySelector("#passw"));
	document.querySelector("#login").removeChild(document.querySelector(".br"));
	document.querySelector("#login").removeChild(document.querySelector(".br"));
	document.querySelector("#login").removeChild(document.querySelector("#forgotpasslink"));
	document.querySelector("#login").removeChild(document.querySelector("#reglink"));
   document.querySelector("#login").removeChild(document.querySelector("#login").childNodes[document.querySelector("#login").childNodes.length-1]);
   document.querySelector("#login").appendChild(document.createElement("br"));
   document.querySelector("#logit").setAttribute("value","request change");
   document.querySelector("#logit").style.width="70%";
   document.querySelector("#logit").style.left="15%";
   document.querySelector("#logit").onclick=requestChange;
   document.querySelector("#email").onkeydown=keydownForgot;
}
function requestChange(){
	document.querySelector("#err").textContent=""
	if (!document.querySelector("#email").value){
		document.querySelector("#err").textContent="-Enter email used for account."
	}
	else{
		var cmd="/forgotpass?email="+document.querySelector("#email").value;
		$.ajax({url:cmd,success:function(result){
			console.log(result);
			if (result=="success"){
				document.querySelector("#login").removeChild(document.querySelector("#login").querySelector("br"));
				document.querySelector("#login").removeChild(document.querySelector("#login").querySelector("br"));
				document.querySelector("#login").removeChild(document.querySelector("#login").querySelector("br"));
				document.querySelector("#login").removeChild(document.querySelector("#login").querySelector("br"));
				document.querySelector("#login").removeChild(document.querySelector("#login").querySelector("br"));
				document.querySelector("#login").removeChild(document.querySelector("#login").querySelector("br"));
				document.querySelector("#login").removeChild(document.querySelector("#emaill"));
				document.querySelector("#login").removeChild(document.querySelector("#email"));
				document.querySelector("#login").removeChild(document.querySelector("#logit"));
				document.querySelector("#login").appendChild(document.createElement("br"));
				document.querySelector("#err").textContent="An email with a temporary pass has been sent. You will be required to change it upon logging in.";
				document.querySelector("#err").style.color="black";
				document.querySelector("#login").appendChild(document.querySelector("#err"));
			}
			else if(result=="email not in use"){
				document.querySelector("#err").textContent="-no account with that email in our database."
			}
			else{
				document.querySelector("#err").textContent="-Error try again. If persists contact support.";
			}
		}});
	}
	
}
function createloginbox(){
    document.querySelector("#loginlink").onclick=null;
    var form=document.createElement("form");
    form.setAttribute("id","login");                        //<form id="login">
        var xx=document.createElement("span");
        xx.setAttribute("id","closel");
        xx.onclick=removeloginbox;
        xx.appendChild(document.createTextNode("X"));
    form.appendChild(xx);                                   //  <span id="close" onclick="removeloginbox();">&times</span>
    form.appendChild(document.createElement("br"));         //  <br/>
        var div=document.createElement("div");
        div.setAttribute("id","err");
    form.appendChild(div);
        var el=document.createElement("label");
        el.setAttribute("for","email");
        el.setAttribute("id","emaill");
        el.appendChild(document.createTextNode("Email"));
    form.appendChild(el);                                 //    <label for="email" id="emaill">Email</label>
    form.appendChild(document.createElement("br"));       //    <br/>
        var ei=document.createElement("input");
        ei.setAttribute("type","text");
        ei.setAttribute("id","email");
        ei.setAttribute("name","email");
   	  ei.onkeydown=keydownLogin;
    form.appendChild(ei);                                 //    <input type="text" id="email" name="email"/>
    form.appendChild(document.createElement("br"));       //    <br/>
        var pl=document.createElement("label");
        pl.setAttribute("for","passw");
        pl.setAttribute("id","passwl");
        pl.appendChild(document.createTextNode("Password"));
    form.appendChild(pl);                   					 //    <label for="pass" id="passwl">Password</label>
    var br1=document.createElement("br");
    	  br1.setAttribute("class","br");          
    form.appendChild(br1);       								 //    <br/>
        var pi=document.createElement("input");
        pi.setAttribute("type","password");
        pi.setAttribute("id","passw");
        pi.setAttribute("name","passw");
   	  pi.onkeydown=keydownLogin;
    form.appendChild(pi);                                 //    <input type="password" id="pass" name="pass"/>
    var br2=document.createElement("br");
    	  br2.setAttribute("class","br");          
    form.appendChild(br2);       								 //    <br/>
    form.appendChild(document.createElement("br"));       //    <br/>
        var bb=document.createElement("input");
        bb.setAttribute("id","logit");
        bb.setAttribute("type","button");
        bb.setAttribute("value","login");
        bb.onclick=login;
    form.appendChild(bb);                               //      <input id="logit" type="button" value="login" onclick="login();"/>
    form.appendChild(document.createElement("br"));       //    <br/>
        var a1=document.createElement("a");
        a1.setAttribute("href","javascript:void(0)");
        a1.onclick=changeToForgotPass;
        a1.setAttribute("id","forgotpasslink");
        a1.appendChild(document.createTextNode("Forgot Password"));
        var a2=document.createElement("a");
        a2.setAttribute("id","reglink");
        a2.setAttribute("href",registerpage);
        a2.appendChild(document.createTextNode("Register"));
    form.appendChild(a1);                                //     <a href="">Forgot Password</a>
    form.appendChild(document.createTextNode("/"));      //     /
    form.appendChild(a2);                                //     <a href="">Register</a>
    document.querySelector("body").appendChild(form);   //   </form>
}
function forcechange(){
    var form=  document.querySelector("#login");
    while(form.hasChildNodes()){
        form.removeChild(form.lastChild);
    }
        var xx=document.createElement("span");
        xx.setAttribute("id","closel");
        xx.onclick=removeloginbox;
        xx.appendChild(document.createTextNode("X"));
    form.appendChild(xx);                                   //  <span id="close" onclick="removeloginbox();">&times</span>
    form.appendChild(document.createElement("br"));         //  <br/>
    	  var diva=document.createElement("div");
    	  diva.appendChild(document.createTextNode("Please change your password to login."));
    form.appendChild(diva);                                 //  <div>Please change your password to login</div>
    //form.appendChild(document.createElement("br"));        	//	 <br/>
        var div=document.createElement("div");
        div.setAttribute("id","err");
    form.appendChild(div);
        var el=document.createElement("label");
        el.setAttribute("for","email");
        el.setAttribute("id","passw1l");
        el.appendChild(document.createTextNode("Password"));
    form.appendChild(el);                                 //    <label for="email" id="emaill">Email</label>
    form.appendChild(document.createElement("br"));       //    <br/>
        var ei=document.createElement("input");
        ei.setAttribute("type","password");
        ei.setAttribute("id","passw1");
        ei.setAttribute("name","passw1");
   	  ei.onkeydown=keydownChange;
    form.appendChild(ei);                                 //    <input type="text" id="email" name="email"/>
    form.appendChild(document.createElement("br"));       //    <br/>
        var pl=document.createElement("label");
        pl.setAttribute("for","passw2");
        pl.setAttribute("id","passw2l");
        pl.appendChild(document.createTextNode("Confirm Password"));
    form.appendChild(pl);                                 //    <label for="pass" id="passwl">Password</label>
    form.appendChild(document.createElement("br"));       //    <br/>
        var pi=document.createElement("input");
        pi.setAttribute("type","password");
        pi.setAttribute("id","passw2");
        pi.setAttribute("name","passw2");
   	  pi.onkeydown=keydownChange;
    form.appendChild(pi);                                 //    <input type="password" id="pass" name="pass"/>
    form.appendChild(document.createElement("br"));       //    <br/>
    form.appendChild(document.createElement("br"));       //    <br/>
        var bb=document.createElement("input");
        bb.setAttribute("id","changit");
        bb.setAttribute("type","button");
        bb.setAttribute("value","submit");
        bb.onclick=changePass;/////************************************************************************
    form.appendChild(bb);                               //      <input id="logit" type="button" value="login" onclick="login();"/>
    form.appendChild(document.createElement("br"));       //    <br/>

}
function changePass(){
    var p1=document.querySelector("#passw1");
    var p2=document.querySelector("#passw2");
    if (p1.value!=p2.value){
        document.querySelector("#err").textContent="Passwords did not match";
    }
    else if(p1.value.length<8){
        document.querySelector("#err").textContent="Password too short";
    }
    else if(p1.value.length>16){
        document.querySelector("#err").textContent="password too long";
    }
    else if(p1.value.search(/[A-Z]/)==-1 ||p1.value.search(/[a-z]/)==-1 ||p1.value.search(/[0-9]/)==-1){
        document.querySelector("#err").textContent="Password must contain atleast 1 lowercase,uppercase and number.";
    }
    else{
	    var cmd="/changepass?email="+vemail+"&opassw="+hpassw+"&npassw="+hex_md5(p1.value);
	    $.ajax({url:cmd,success:function(result){
	    	if(result=="true"){
				forcepw="";
	    		window.location=window.location;
	    	}
			else{
				document.querySelector("#err").textContent="error please reload page and try again";
			}
    	}});
    }
}
function logout(){
	vfname="";
	vlname="";
	accountType="";
	forcepw="";
	hpassw="";
	vemail="";
	$.ajax({url:"/logout",success:function(result){
		window.location=window.location
	}})
	
}
function parselogresult(result){//result=>"email="+email+";fname="+first name+";lname="+last name+";type="+account type+";forcepw="+ force passchange+";"
		var i=result.indexOf("fname=")+6;
		var ii=result.indexOf(";",i);
		vfname=result.substring(i,ii);
		i=result.indexOf("lname=")+6;
		ii=result.indexOf(";",i);
		vlname=result.substring(i,ii);
		i=result.indexOf("type=")+5;
		ii=result.indexOf(";",i);
		accountType=result.substring(i,ii);
		i=result.indexOf("forcepw=")+8;
		ii=result.indexOf(";",i);
		forcepw=result.substring(i,ii);
		i=result.indexOf("email=")+6;
		ii=result.indexOf(";",i);
		vemail=result.substring(i,ii);
}
function loginvalidated(result){
	console.log(result);
	if(result=="Failed"){
		document.querySelector("#err").textContent="Invalid Login";		
	}
	else{
		parselogresult(result);
		if(forcepw=="true"){
			forcechange();	
		}
		else{
			window.location=window.location;	
		}
	}
}
function login(){
	var temail=document.querySelector("#email").value;
	//check email with regex
	hpassw=hex_md5(document.querySelector("#passw").value);
	var cmd="/loginvalidate?email="+temail+"&passw="+hpassw;
	//sends "/validatelogin?email="+email+"&passw="+hpassw;
	//returns either "Failed" or "email="+email+";fname="+first name+";lname="+last name+";type="+account type+";forcepw="+ force passchange+";"
	$.ajax({url:cmd,success:loginvalidated,error:function(err){document.querySelector("#err").textContent="Invalid Login";}});
}
function removeloginbox(){
    document.querySelector("#loginlink").onclick=createloginbox;
    document.querySelector("body").removeChild(document.querySelector("#login"));
}
function loginreg(){
	 var log=document.createElement("div");
	 log.setAttribute("id","log");
    var aa=document.createElement("A");//login  ##########Stuff to do here##########
    aa.setAttribute("href","javascript:void(0)");
    aa.setAttribute("id","loginlink")
    aa.onclick= createloginbox;
    aa.appendChild(document.createTextNode("login"));
    log.appendChild(aa);
    log.appendChild(document.createTextNode("/"));
    var aa2=document.createElement("A");//registar  ##########Stuff to do here##########
    aa2.setAttribute("href",registerpage);
    aa2.appendChild(document.createTextNode("register"));
    log.appendChild(aa2);
    document.querySelector("#hdr").appendChild(log);
}
function removewelcome(){
    var list = document.querySelector("#log");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}
function showTools(event0){
	document.querySelector("#tools").style.display="block";
	window.onclick = function(event) {
	  	if (!event.target.matches('#tools')&&!event.target.matches('#toolbit')){
		document.querySelector("#tools").style.display="none";
		window.onclick=null;
	  }
	}
}