var fs=require('fs')
var testRes=require('./testRes');
var jsregistration=require('./jsregistration');
var fd=fs.openSync('./test_registrationRender.txt','w');
var bnosess=true
var bsess=true
function endnosess(s){
	fs.writeSync(fd,"\t\terr: should have redirected but did res.end(s)\n");
	console.log("\t\terr: should have redirected but did res.end(s)");
	bnosess=false;
	//fs.writeSync(fd,s);
}
function headnosess(s,t){
}
function rdrnosess(s){
	if(s=="/"){
		fs.writeSync(fd,"\t\tGOOD!!!\n");
		console.log("\t\tGOOD!!!");
	}
	else{
		fs.writeSync(fd,"\t\terr: redirected to wrong place\n");
		console.log("\t\terr: redirected to wrong place");
	}
	bnosess=false;
}
function rendnosess(s,args){
	fs.writeSync(fd,"\t\terr: should have redirected but rendered instead\n");
	console.log("\t\terr: should have redirected but rendered instead");
	bnosess=false;
}
function test_registrationRender_nosess(){
	console.log("\tNo req.session.user start");
	fs.writeSync(fd,"\tNo req.session.user start\n");
	var req={url:"/registration",session:{}};
	var res=new testRes.testRes(endnosess,headnosess,rdrnosess,rendnosess);
	jsregistration.registrationRender(req,res);
	var cnt=0;
	while(bnosess){
		if(cnt%1000==0)
			console.log("\t\t.");
		cnt=cnt+1;
	}
	fs.writeSync(fd,"\tNo req.session.user end\n");
	console.log("\tNo req.session.user end");
	
}
function endsess(s){
	fs.writeSync(fd,"\t\terr: should have rendered but did res.end(s)\n");
	console.log("\t\terr: should have rendered but did res.end(s)");
	bsess=false;
	//fs.writeSync(fd,s);
}
function headsess(s,t){
}
function rdrsess(s){
	fs.writeSync(fd,"\t\terr: should have rendered but did res.redirect(s)\n");
	console.log("\t\terr: should have rendered but did res.redirect(s)");
	bsess=false;
}
function rendsess(s,args){
	fs.writeSync(fd,"\t\tGOOD!!!\n");
	console.log("\t\tGOOD!!!");
	bsess=false;
}
function test_registrationRender_sess(){
	console.log("\tYes req.session.user start");
	fs.writeSync(fd,"\tYes req.session.user start\n");
	var req={url:"/registration",session:{user:"filler"}};
	var res=new testRes.testRes(endsess,headsess,rdrsess,rendsess);
	jsregistration.registrationRender(req,res);
	var cnt=0;
	while(bsess){
		if(cnt%1000==0)
			console.log("\t\t.");
		cnt=cnt+1;
	}
	fs.writeSync(fd,"\tYes req.session.user end\n");
	console.log("\tYes req.session.user end");
	
}
function test_registrationRender(){
	console.log("test_registrationRender start");
	fs.writeSync(fd,"test_registrationRender start\n");
	test_registrationRender_nosess();
	test_registrationRender_sess();
	console.log("test_registrationRender end");
	fs.writeSync(fd,"test_registrationRender end\n");
	fs.closeSync(fd);
}
module.exports={test_registrationRender:test_registrationRender};
//test_registrationRender();