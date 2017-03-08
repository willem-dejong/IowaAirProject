var registerpage="/register";
var forgotpasspage="";
var accountManagepage="";
var fname="";
var lname="";
var accountType="";
var forcepw="";
var hpassw="";
var email="";
function getSession(){
	$.ajax({url:"/getSession",success:function(result){
		var i=result.indexOf("fname=")+6;
		var ii=result.indexOf(";",i);
		fname=result.substring(i,ii);
		i=result.indexOf("lname=")+6;
		ii=result.indexOf(";",i);
		lname=result.substring(i,ii);
		i=result.indexOf("type=")+5;
		ii=result.indexOf(";",i);
		accountType=result.substring(i,ii);
		i=result.indexOf("email=")+6;
		ii=result.indexOf(";",i);
		email=result.substring(i,ii);
		}});
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
    form.appendChild(ei);                                 //    <input type="text" id="email" name="email"/>
    form.appendChild(document.createElement("br"));       //    <br/>
        var pl=document.createElement("label");
        pl.setAttribute("for","passw");
        pl.setAttribute("id","passwl");
        pl.appendChild(document.createTextNode("Password"));
    form.appendChild(pl);                                 //    <label for="pass" id="passwl">Password</label>
    form.appendChild(document.createElement("br"));       //    <br/>
        var pi=document.createElement("input");
        pi.setAttribute("type","password");
        pi.setAttribute("id","passw");
        pi.setAttribute("name","passw");
    form.appendChild(pi);                                 //    <input type="password" id="pass" name="pass"/>
    form.appendChild(document.createElement("br"));       //    <br/>
    form.appendChild(document.createElement("br"));       //    <br/>
        var bb=document.createElement("input");
        bb.setAttribute("id","logit");
        bb.setAttribute("type","button");
        bb.setAttribute("value","login");
        bb.onclick=login;
    form.appendChild(bb);                               //      <input id="logit" type="button" value="login" onclick="login();"/>
    form.appendChild(document.createElement("br"));       //    <br/>
        var a1=document.createElement("a");
        a1.setAttribute("href",forgotpasspage);
        a1.appendChild(document.createTextNode("Forgot Password"));
        var a2=document.createElement("a");
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
    else if(p1.search(/[A-Z]/)==-1 ||p1.search(/[a-z]/)==-1 ||p1.search(/[0-9]/)==-1){
        document.querySelector("#err").textContent="Password must contain atleast 1 lowercase,uppercase and number.";
    }
    else{
	    var cmd="/changepass?email="+email+"&opassw="+hpassw+"&npassw="+hex_md5(p1.value);
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
	fname="";
	lname="";
	accountType="";
	forcepw="";
	hpassw="";
	email="";
	$.ajax({url:"/logout",success:function(result){
		window.location=window.location
	}})
	
}
function parselogresult(result){//result=>"email="+email+";fname="+first name+";lname="+last name+";type="+account type+";forcepw="+ force passchange+";"
		var i=result.indexOf("fname=")+6;
		var ii=result.indexOf(";",i);
		fname=result.substring(i,ii);
		i=result.indexOf("lname=")+6;
		ii=result.indexOf(";",i);
		lname=result.substring(i,ii);
		i=result.indexOf("type=")+5;
		ii=result.indexOf(";",i);
		accountType=result.substring(i,ii);
		i=result.indexOf("forcepw=")+8;
		ii=result.indexOf(";",i);
		forcepw=result.substring(i,ii);
		i=result.indexOf("email=")+6;
		ii=result.indexOf(";",i);
		email=result.substring(i,ii);
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