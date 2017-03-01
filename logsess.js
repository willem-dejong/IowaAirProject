var registerpage="";
var forgotpasspage="";
var accountManagepage="";
var fname="";
var lname="";
var accountID="";
var accountType="";
var forcepw="";
var hpassw=""
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
    else{
    //sendchange***************************************************************************
    }

}
function logout(){
	
}
function createcusthdr(){
	var log=document.createElement("div");
	log.setAttribute("id","log");
	log.appendChild(document.createTextNode("Welcome back "));
		var aa=document.createElement("a");
		aa.setAttribute("href",accountManagepage);
		aa.appendChild(document.createTextNode(fname));
	log.appendChild(aa);
	log.appendChild(document.createTextNode("!  "));
		var aa2=document.createElement("a");
		aa2.setAttribute("href","javascript:void(0)");
		aa2.onclick=logout;
		aa2.appendChild(document.createTextNode("logout"));
	log.appendChild(aa2);
	document.querySelector("#hdr").appendChild(log);
	
}
function createmanhdr(){
	
}
function createadminhdr(){
	
}
function createUserhdr(){
	if(accountType=="A"){
		createadminhdr();
	}
	else if(accountType=="M"){
		createmanhdr();
	}
	else{
		createcusthdr();
	}
	
}
function sendsessionlogin(){
	var i=document.cookie.search("IOWAAIRSESSION=[0-9]+");
	if(i==-1){
		//error****************************************************************
	}
	else{
		var ii=document.cookie.indexOf(";",i+15);
		if(ii==-1){
			ii=document.cookie.length;
		}
		var cmd="/node/updateSL?ID="+accountID+"&passw="+hpassw+"&sessID="+document.cookie.substring(i,ii);
		$.ajax({url:cmd,success:function(result){
			if(result=="Success"){
				document.cookie="IOWAAIRLOGIN="+accountID+";path=/";
				document.cookie="IOWAAIRPASSW="+hpassw+";path=/";
				document.querySelector("#hdr").removeChild(document.querySelector("#log"));
				createUserhdr();
			}
			else{
			//error***********************************************************************
			}
		}});
	}
	
}
function parselogresult(result){//result=>"fname="+first name+";lname="+last name+";type="+account type+";accountid="+account_id+";forcepw="+ force passchange+";"
		var i=result.indexOf("fname=")+6;
		var ii=result.indexOf(";",i);
		fname=result.substring(i,ii);
		i=result.indexOf("lname=")+6;
		ii=result.indexOf(";",i);
		lname=result.substring(i,ii);
		i=result.indexOf("type=")+5;
		ii=result.indexOf(";",i);
		accountType=result.substring(i,ii);
		i=result.indexOf("accountid=")+10;
		ii=result.indexOf(";",i);
		accountID=result.substring(i,ii);
		i=result.indexOf("forcepw=")+8;
		ii=result.indexOf(";",i);
		forcepw=result.substring(i,ii);
}
function logverified(result){
	if(result=="Failed"){
		document.querySelector("#err").textContent="Invalid Login";		
	}
	else{
		parselogresult();
		if(forcepw=="True"){
			forcechange();	
		}
		else{
		//sendsessionlogin******************************************************************************************************************	
		}
	}
}
function login(){
	var email=document.querySelector("#email").value;
	//check email with regex
	hpassw=hex_md5(document.querySelector("#passw").value);
	var cmd="/node/validatelogin?email="+email+"&passw="+hpassw;
	//sends "/node/validatelogin?email="+email+"&passw="+hpassw;
	//returns either "Failed" or "fname="+first name+";lname="+last name+";type="+account type+";accountid="+account_id+";forcepw="+ force passchange+";"
	$.ajax({url:cmd,success:logverified});
}
function removeloginbox(){
    document.querySelector("#loginlink").onclick=createloginbox;
    document.querySelector("body").removeChild(document.querySelector("#login"));
}
function newsession(){
    $.ajax({url:"/node/getnewsession", success: function(result){
        document.cookie=result;
        document.cookie="IOWAAIRLOGIN=";
        document.cookie="IOWAAIRPASSW=";
        console.log(result);
        console.log(document.cookie);
        loginreg();
    }});
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
function autolog(result){
	if
}
function homesession(){
    var i =document.cookie.search("IOWAAIRSESSION=[A-Za-z0-9]+");
    var i2=document.cookie.search("IOWAAIRLOGIN=[A-Za-z0-9]+");
    var i3=document.cookie.search("IOWAAIRPASSW=[a-z0-9]+");
    
    if (i==-1){
       newsession();
    }
    else if(i2==-1 || i3==-1){
    	var ii=document.cookie.search(";",i);
    	if(ii==-1){
    		ii=document.cookie.length;
    	}
    	var cmd="/node/checksession?sessionid="+document.cookie.substring(i,ii);
    	$.ajax({url:cmd,success:function(result){
    		if (result.indexOf("status=success")!=-1){
    			loginreg()
    		}
    		else{
    			newsession();
    		}
    	}});
    }
    else{
    	var ii=document.cookie.search(";",i);
    	if(ii==-1){
    		ii=document.cookie.length;
    	}
    	var ii2=document.cookie.search(";",i2);
    	if(ii2==-1){
    		ii2=document.cookie.length;
    	}
    	var ii3=document.cookie.search(";",i3);
    	if(ii3==-1){
    		ii3=document.cookie.length;
    	}
    	var cmd="/node/checksession?sessionid="+document.cookie.substring(i,ii)+"&accountid="+document.cookie.substring(i2,ii2)+"&passw="+document.cookie.substring(i3,ii3);
    	$.ajax({url:cmd,success:function(result){
    		if (result.indexOf("log=True")!=-1){
    			parselogresult(result);
    			createUserhdr();
    		}
    		else{
    			newsession();
    		}
    	}});
    }
}