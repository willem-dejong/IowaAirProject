//precond1: no req.session.user
//postcond: 500 status code with oops message

//precond2: req.session.user!="G" (user logged in already)
//postcond: 500 status code with oops message

//precond3: req.url missing email arg
//postcond: 500 status code with oops message

//precond4:  req.url missing password arg
//postcond: 500 status code with oops message

//precond5:  password is incorrect
//postcond: 404 status code with blank message

//precond6:  email doesn't exist in db
//postcond: 404 status code with blank message

//precond7:  account found but need to change pass
//postcond:  login string sent with force password change as true and not logged in (defined by the req.session.user variable)
//(must check to verify all data is collected properly)

//precond8:  account found but do not need to change pass
//postcond:  login string sent with force password change as false and logged in (defined by the req.session.user variable)
//(must check to verify all data is collected properly)

var fs=require('fs')
var testRes=require('./testRes');
var login=require('./jslogin').login;
var fd=fs.openSync('./test_login.txt','w');

//should be no redirects 
var bnosessh=false;
var bnosess=true;
var bnosessd=true;

function endnosess(s){
	if(bnosessh && s=="oops"){
		fs.writeSync(fd,"\t\tGOOD!!!\n");
		console.log("\t\tGOOD!!!");
	}
	else if(s!="oops"){
		fs.writeSync(fd,"\t\terr: wrong message passed to res.end(s)\n");
		console.log("\t\terr: wrong message passed to res.end(s)");
	}
	bnosess=false;
}
function headnosess(s,t){
	if(s=="500"){
		bnosessh=true;
	}
	else{
		fs.writeSync(fd,"\t\terr: wrong status code passed to res.writeHead(s,t)\n");
		console.log("\t\terr: wrong status code passed to res.writeHead(s)");
	}
}
function rdrnosess(s){
	fs.writeSync(fd,"\t\terr: should be no redirects, should be a writehead/end combo with 500 and oops respectivly\n");
	console.log("\t\terr: should be no redirects, should be a writehead/end combo with 500 and oops respectivly");
	bnosess=false;
}
function rendnosess(s,args){
	fs.writeSync(fd,"\t\terr: should be no renders, should be a writehead/end combo with 500 and oops respectivly\n");
	console.log("\t\terr: should be no renders, should be a writehead/end combo with 500 and oops respectivly");
	bnosess=false;
}
function waitnosess(){
	if(bnosess){
		setTimeout(waitnosess,200);
	}
	else{
		console.log("\tNo req.session.user end");
		fs.writeSync(fd,"\tNo req.session.user end\n");
		bnosessd=false;
	}
}
function test_login_nosess(){
	console.log("\tNo req.session.user start");
	fs.writeSync(fd,"\tNo req.session.user start\n");
	var req={url:"/loginvalidate?passw=awdw3eadssad3ads&email=test@test.com",session:{}};
	var res=new testRes.testRes(endnosess,headnosess,rdrnosess,rendnosess);
	login(req,res);
	setTimeout(waitnosess,200);
}

var bloggedinh=false;
var bloggedin=true;
var bloggedind=true;

function endloggedin(s){
	if(bloggedinh && s=="oops"){
		fs.writeSync(fd,"\t\tGOOD!!!\n");
		console.log("\t\tGOOD!!!");
	}
	else if(s!="oops"){
		fs.writeSync(fd,"\t\terr: wrong message passed to res.end(s)\n");
		console.log("\t\terr: wrong message passed to res.end(s)");
	}
	bloggedin=false;
}
function headloggedin(s,t){
	if(s=="500"){
		bloggedinh=true;
	}
	else{
		fs.writeSync(fd,"\t\terr: wrong status code passed to res.writeHead(s,t)\n");
		console.log("\t\terr: wrong status code passed to res.writeHead(s)");
	}
}
function rdrloggedin(s){
	fs.writeSync(fd,"\t\terr: should be no redirects, should be a writehead/end combo with 500 and oops respectivly\n");
	console.log("\t\terr: should be no redirects, should be a writehead/end combo with 500 and oops respectivly");
	bloggedin=false;
}
function rendloggedin(s,args){
	fs.writeSync(fd,"\t\terr: should be no renders, should be a writehead/end combo with 500 and oops respectivly\n");
	console.log("\t\terr: should be no renders, should be a writehead/end combo with 500 and oops respectivly");
	bloggedin=false;
}
function waitloggedin(){
	if(bloggedin){
		setTimeout(waitloggedin,200);
	}
	else{
		console.log("\tAlready logged in end");
		fs.writeSync(fd,"\tAlready logged in end\n");
		bloggedind=false;
	}
}
function test_login_loggedin(){
	if(bnosessd){
		setTimeout(test_login_loggedin,200);
	}
	else{
		console.log("\tAlready logged in start");
		fs.writeSync(fd,"\tAlready logged in start\n");
		req={url:"/loginvalidate?passw=awdw3eadssad3ads&email=test@test.com",session:{user:{fname:"test",lname:"test",email:"cswdejong@gmail.com",passw:"dsertrrsdr4t4sr4",type:"U"}}};
		res=new testRes.testRes(endloggedin,headloggedin,rdrloggedin,rendloggedin);
		login(req,res);
		setTimeout(waitloggedin,200);
	}
}

var bnoemailh=false;
var bnoemail=true;
var bnoemaild=true;

function endnoemail(s){
	if(bnoemailh && s=="oops"){
		fs.writeSync(fd,"\t\tGOOD!!!\n");
		console.log("\t\tGOOD!!!");
	}
	else if(s!="oops"){
		fs.writeSync(fd,"\t\terr: wrong message passed to res.end(s)\n");
		console.log("\t\terr: wrong message passed to res.end(s)");
	}
	bnoemail=false;
}
function headnoemail(s,t){
	if(s=="500"){
		bnoemailh=true;
	}
	else{
		fs.writeSync(fd,"\t\terr: wrong status code passed to res.writeHead(s,t)\n");
		console.log("\t\terr: wrong status code passed to res.writeHead(s)");
	}
}
function rdrnoemail(s){
	fs.writeSync(fd,"\t\terr: should be no redirects, should be a writehead/end combo with 500 and oops respectivly\n");
	console.log("\t\terr: should be no redirects, should be a writehead/end combo with 500 and oops respectivly");
	bnoemail=false;
}
function rendnoemail(s,args){
	fs.writeSync(fd,"\t\terr: should be no renders, should be a writehead/end combo with 500 and oops respectivly\n");
	console.log("\t\terr: should be no renders, should be a writehead/end combo with 500 and oops respectivly");
	bnoemail=false;
}
function waitnoemail(){
	if(bnoemail){
		setTimeout(waitnoemail,200);
	}
	else{
		console.log("\tNo email in url end");
		fs.writeSync(fd,"\tNo email in url end\n");
		bnoemaild=false;
	}
}
function test_login_noemail(){
	if(bloggedind){
		setTimeout(test_login_noemail,200);
	}
	else{
		console.log("\tNo email in url start");
		fs.writeSync(fd,"\tNo email in url start\n");
		req={url:"/loginvalidate?passw=awdw3eadssad3ads",session:{user:{fname:"",lname:"",email:"",passw:"",type:"G"}}};
		res=new testRes.testRes(endnoemail,headnoemail,rdrnoemail,rendnoemail);
		login(req,res);
		setTimeout(waitnoemail,200);
	}
}
var bnopassh=false;
var bnopass=true;
var bnopassd=true;

function endnopass(s){
	if(bnopassh && s=="oops"){
		fs.writeSync(fd,"\t\tGOOD!!!\n");
		console.log("\t\tGOOD!!!");
	}
	else if(s!="oops"){
		fs.writeSync(fd,"\t\terr: wrong message passed to res.end(s)\n");
		console.log("\t\terr: wrong message passed to res.end(s)");
	}
	bnopass=false;
}
function headnopass(s,t){
	if(s=="500"){
		bnopassh=true;
	}
	else{
		fs.writeSync(fd,"\t\terr: wrong status code passed to res.writeHead(s,t)\n");
		console.log("\t\terr: wrong status code passed to res.writeHead(s)");
	}
}
function rdrnopass(s){
	fs.writeSync(fd,"\t\terr: should be no redirects, should be a writehead/end combo with 500 and oops respectivly\n");
	console.log("\t\terr: should be no redirects, should be a writehead/end combo with 500 and oops respectivly");
	bnopass=false;
}
function rendnopass(s,args){
	fs.writeSync(fd,"\t\terr: should be no renders, should be a writehead/end combo with 500 and oops respectivly\n");
	console.log("\t\terr: should be no renders, should be a writehead/end combo with 500 and oops respectivly");
	bnopass=false;
}
function waitnopass(){
	if(bnopass){
		setTimeout(waitnopass,200);
	}
	else{
		console.log("\tNo pass in url end");
		fs.writeSync(fd,"\tNo pass in url end\n");
		bnopassd=false;
	}
}
function test_login_nopass(){
	if(bnoemaild){
		setTimeout(test_login_nopass,200);
	}
	else{
		console.log("\tNo pass in url start");
		fs.writeSync(fd,"\tNo pass in url start\n");
		req={url:"/loginvalidate?email=test@test.com",session:{user:{fname:"",lname:"",email:"",passw:"",type:"G"}}};
		res=new testRes.testRes(endnopass,headnopass,rdrnopass,rendnopass);
		login(req,res);
		setTimeout(waitnopass,200);
	}
}

var bincpassh=false;
var bincpass=true;
var bincpassd=true;

function checkreqnotlogged(){ 
	if(!req.session.user){
		fs.writeSync(fd,"\t\terr: req.session.user should exist at this point\n");
		console.log("\t\terr: req.session.user should exist at this point");
	 }
	 if(req.session.user!="G"){
		fs.writeSync(fd,"\t\terr: no one should be logged in at this point\n");
		console.log("\t\terr: no one should be logged in at this point");
	 }
}

function endincpass(s){
	if(bincpassh && s==null&&req.session.user&&req.session.user.type=="G"){
		fs.writeSync(fd,"\t\tGOOD!!!\n");
		console.log("\t\tGOOD!!!");
	}
	else{
		 checkreqnotlogged();
		 if(s!=null){
			fs.writeSync(fd,"\t\terr: wrong message passed to res.end(s)\n");
			console.log("\t\terr: wrong message passed to res.end(s)");
		}
	}
	bincpass=false;
}
function headincpass(s,t){
	if(s=="404"){
		bincpassh=true;
	}
	else{
		fs.writeSync(fd,"\t\terr: wrong status code passed to res.writeHead(s,t)\n");
		console.log("\t\terr: wrong status code passed to res.writeHead(s)");
	}
}
function rdrincpass(s){
	checkreqnotlogged();
	fs.writeSync(fd,"\t\terr: should be no redirects, should be a writehead/end combo with 404 and null respectivly\n");
	console.log("\t\terr: should be no redirects, should be a writehead/end combo with 404 and null respectivly");
	bincpass=false;
}
function rendincpass(s,args){
	checkreqnotlogged();
	fs.writeSync(fd,"\t\terr: should be no renders, should be a writehead/end combo with 404 and null respectivly\n");
	console.log("\t\terr: should be no renders, should be a writehead/end combo with 404 and null respectivly");
	bincpass=false;
}
function waitincpass(){
	if(bincpass){
		setTimeout(waitincpass,200);
	}
	else{
		console.log("\tIncorrect password end");
		fs.writeSync(fd,"\tIncorrect password end\n");
		bincpassd=false;
	}
}
function test_login_incpass(){
	if(bnopassd){
		setTimeout(test_login_incpass,200);
	}
	else{
		console.log("\tIncorrect password start");
		fs.writeSync(fd,"\tIncorrect password start\n");
		req={url:"/loginvalidate?email=cswdejong@gmail.com&passw=hfuier47fuk",session:{user:{fname:"",lname:"",email:"",passw:"",type:"G"}}};
		res=new testRes.testRes(endincpass,headincpass,rdrincpass,rendincpass);
		login(req,res);
		setTimeout(waitincpass,200);
	}
}

var bincemailh=false;
var bincemail=true;
var bincemaild=true;

function endincemail(s){
	if(bincemailh && s==null&&req.session.user&&req.session.user.type=="G"){
		fs.writeSync(fd,"\t\tGOOD!!!\n");
		console.log("\t\tGOOD!!!");
	}
	else{
		 checkreqnotlogged();
		 if(s!=null){
			fs.writeSync(fd,"\t\terr: wrong message passed to res.end(s)\n");
			console.log("\t\terr: wrong message passed to res.end(s)");
		}
	}
	bincemail=false;
}
function headincemail(s,t){
	if(s=="404"){
		bincemailh=true;
	}
	else{
		fs.writeSync(fd,"\t\terr: wrong status code passed to res.writeHead(s,t)\n");
		console.log("\t\terr: wrong status code passed to res.writeHead(s)");
	}
}
function rdrincemail(s){
	checkreqnotlogged();
	fs.writeSync(fd,"\t\terr: should be no redirects, should be a writehead/end combo with 404 and null respectivly\n");
	console.log("\t\terr: should be no redirects, should be a writehead/end combo with 404 and null respectivly");
	bincemail=false;
}
function rendincemail(s,args){
	checkreqnotlogged();
	fs.writeSync(fd,"\t\terr: should be no renders, should be a writehead/end combo with 404 and null respectivly\n");
	console.log("\t\terr: should be no renders, should be a writehead/end combo with 404 and null respectivly");
	bincemail=false;
}
function waitincemail(){
	if(bincemail){
		setTimeout(waitincemail,200);
	}
	else{
		console.log("\tIncorrect email end");
		fs.writeSync(fd,"\tIncorrect email end\n");
		bincemaild=false;
	}
}
function test_login_incemail(){
	if(bincpassd){
		setTimeout(test_login_incemail,200);
	}
	else{
		console.log("\tIncorrect email start");
		fs.writeSync(fd,"\tIncorrect email start\n");
		req={url:"/loginvalidate?email=cwdejng@gmil.co&passw=ceb177c70acef2f0f6ab4c93582127b2",session:{user:{fname:"",lname:"",email:"",passw:"",type:"G"}}};
		res=new testRes.testRes(endincemail,headincemail,rdrincemail,rendincemail);
		login(req,res);
		setTimeout(waitincemail,200);
	}
}

var bpasschngh=false;
var bpasschng=true;
var bpasschngd=true;

function checkArgString(s,force){
	var i=s.search("email=");
	var i2=s.search("fname=");
	var i3=s.search("lname=");
	var i4=s.search("accountid=[0-9A-Za-z]+;");
	var i5=s.search("type=[A-Z];");
	var i6=s.search("forcepw=");
	var i7=s.search("forcepw="+force);
	var b=true;
	if(i6!=-1&&i7==-1){
	 	fs.writeSync(fd,"\t\terr: incorrect value for forcepw\n");
		console.log("\t\terr: incorrect value for forcepw");
		b=false;
	}
	if (i==-1||i2==-1||i3==-1||i4==-1||i5==-1||i6==-1){
	 	fs.writeSync(fd,"\t\terr: an argument is missing from response "+String(i)+" "+String(i2)+" "+String(i3)+" "+String(i4)+" "+String(i5)+" "+String(i6)+"\n");
		console.log("\t\terr: an argument is missing from response "+String(i)+" "+String(i2)+" "+String(i3)+" "+String(i4)+" "+String(i5)+" "+String(i6));
		b=false;
	}
	return b;
}
function endpasschng(s){
	if(bpasschngh && checkArgString(s,"true;")&&req.session.user&&req.session.user.type=="G"){
		fs.writeSync(fd,"\t\tGOOD!!!\n");
		console.log("\t\tGOOD!!!");
	}
	else{
		 checkreqnotlogged();
		 if(s!=null){
			fs.writeSync(fd,"\t\terr: wrong message passed to res.end(s) "+s+"\n");
			console.log("\t\terr: wrong message passed to res.end(s) "+s);
		}
	}
	bpasschng=false;
}
function headpasschng(s,t){
	if(s=="200"){
		bpasschngh=true;
	}
	else{
		fs.writeSync(fd,"\t\terr: wrong status code passed to res.writeHead(s,t) "+s+"\n");
		console.log("\t\terr: wrong status code passed to res.writeHead(s) "+s);
	}
}
function rdrpasschng(s){
	checkreqnotlogged();
	fs.writeSync(fd,"\t\terr: should be no redirects, should be a writehead/end combo with 200 and response string respectivly\n");
	console.log("\t\terr: should be no redirects, should be a writehead/end combo with 200 and response string respectivly");
	bpasschng=false;
}
function rendpasschng(s,args){
	checkreqnotlogged();
	fs.writeSync(fd,"\t\terr: should be no renders, should be a writehead/end combo with 200 and response string respectivly\n");
	console.log("\t\terr: should be no renders, should be a writehead/end combo with 200 and response string respectivly");
	bpasschng=false;
}
function waitpasschng(){
	if(bpasschng){
		setTimeout(waitpasschng,200);
	}
	else{
		console.log("\tNeed to change pass end");
		fs.writeSync(fd,"\tNeed to change pass end\n");
		bpasschngd=false;
	}
}
function test_login_passchng(){
	if(bincemaild){
		setTimeout(test_login_passchng,200);
	}
	else{
		console.log("\tNeed to change pass start");
		fs.writeSync(fd,"\tNeed to change pass start\n");
		req={url:"/loginvalidate?email=thecrimsonbloodmoon@gmail.com&passw=59af13a86105b26373626f8cd7fe4686",session:{user:{fname:"",lname:"",email:"",passw:"",type:"G"}}};
		res=new testRes.testRes(endpasschng,headpasschng,rdrpasschng,rendpasschng);
		login(req,res);
		setTimeout(waitpasschng,200);
	}
}


var bnopasschngh=false;
var bnopasschng=true;
var bnopasschngd=true;

function checkreqlogged(){ 
	if(!req.session.user){
		fs.writeSync(fd,"\t\terr: req.session.user should exist at this point\n");
		console.log("\t\terr: req.session.user should exist at this point");
	 }
	 if(req.session.user=="G"){
		fs.writeSync(fd,"\t\terr: should be logged in at this point\n");
		console.log("\t\terr: should be logged in at this point");
	 }
}

function endnopasschng(s){
	if(bnopasschngh && checkArgString(s,"false;")&&req.session.user&&req.session.user.type!="G"){
		fs.writeSync(fd,"\t\tGOOD!!!\n");
		console.log("\t\tGOOD!!!");
	}
	else{
		 checkreqlogged();
		 if(s!=null){
			fs.writeSync(fd,"\t\terr: wrong message passed to res.end(s)\n");
			console.log("\t\terr: wrong message passed to res.end(s)");
		}
	}
	bnopasschng=false;
}
function headnopasschng(s,t){
	if(s=="200"){
		bnopasschngh=true;
	}
	else{
		fs.writeSync(fd,"\t\terr: wrong status code passed to res.writeHead(s,t)\n");
		console.log("\t\terr: wrong status code passed to res.writeHead(s)");
	}
}
function rdrnopasschng(s){
	checkreqlogged();
	fs.writeSync(fd,"\t\terr: should be no redirects, should be a writehead/end combo with 200 and response string respectivly\n");
	console.log("\t\terr: should be no redirects, should be a writehead/end combo with 200 and response string respectivly");
	bnopasschng=false;
}
function rendnopasschng(s,args){
	checkreqlogged();
	fs.writeSync(fd,"\t\terr: should be no renders, should be a writehead/end combo with 200 and response string respectivly\n");
	console.log("\t\terr: should be no renders, should be a writehead/end combo with 200 and response string respectivly");
	bnopasschng=false;
}
function waitnopasschng(){
	if(bnopasschng){
		setTimeout(waitnopasschng,200);
	}
	else{
		console.log("\tNo need to change pass end");
		fs.writeSync(fd,"\tNo need to change pass end\n");
		bnopasschngd=false;
	}
}
function test_login_nopasschng(){
	if(bpasschngd){
		setTimeout(test_login_nopasschng,200);
	}
	else{
		console.log("\tNo need to change pass start");
		fs.writeSync(fd,"\tNo need to change pass start\n");
		req={url:"/loginvalidate?email=cswdejong@gmail.com&passw=ceb177c70acef2f0f6ab4c93582127b2",session:{user:{fname:"",lname:"",email:"",passw:"",type:"G"}}};
		res=new testRes.testRes(endnopasschng,headnopasschng,rdrnopasschng,rendnopasschng);
		login(req,res);
		setTimeout(waitnopasschng,200);
	}
}
function wait(){
	if(bnopasschngd){
		setTimeout(wait,200);
	}
	else{
		console.log("test_login end");
		fs.writeSync(fd,"test_login end\n");
		fs.closeSync(fd);
	}
}
function test_login(){
	console.log("test_login start");
	fs.writeSync(fd,"test_login start\n");
	test_login_nosess();
	test_login_loggedin();
	test_login_noemail();
	test_login_nopass();
	test_login_incpass();
	test_login_incemail();
	test_login_passchng();
	test_login_nopasschng();
	setTimeout(wait,200);
}
module.exports={test_login:test_login};
test_login();