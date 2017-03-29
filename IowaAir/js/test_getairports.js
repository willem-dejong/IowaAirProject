
var getairports=require('./jsgetairports').getairports;
var fs=require('fs')
var testRes=require('./testRes');
var fd=fs.openSync('./test_getairports.txt','w');
//var req=null;
//var res=null;
var bh=false;
var b=true;

function end(s){
	if(!s){
		fs.writeSync(fd,"\terr: somthing happened\n");
		console.log("\terr: somthing happened");
	}
	else{
		fs.writeSync(fd,"\t"+s+"\n");
		console.log("\t"+s);
	}
	b=false;
}
function head(s,t){
	if(s=="200"){
		bh=true;
	}
	else{
		fs.writeSync(fd,"\terr: wrong status code passed to res.writeHead(s,t)\n");
		console.log("\terr: wrong status code passed to res.writeHead(s)");
	}
}
function rdr(s){
	fs.writeSync(fd,"\terr: should be no redirects, should be a writehead/end combo with 200 and ports string respectivly\n");
	console.log("\terr: should be no redirects, should be a writehead/end combo with 200 and ports string respectivly");
	b=false;
}
function rend(s,args){
	fs.writeSync(fd,"\terr: should be no renders, should be a writehead/end combo with 200 and ports string respectivly\n");
	console.log("\terr: should be no renders, should be a writehead/end combo with 200 and ports string respectivly");
	b=false;
}
function wait(){
	if(b){
		setTimeout(wait,200);
	}
	else{
		console.log("test_getairports end");
		fs.writeSync(fd,"test_getairports end\n");
	}
}
function test_getairports(){
	console.log("test_getairports start");
	fs.writeSync(fd,"test_getairports start\n");
	var req={url:"/getports",session:{user:{fname:"",lname:"",email:"",passw:"",type:"G"}}};
	var res=new testRes.testRes(end,head,rdr,rend);
	getairports(req,res);
	var cnt=0;
	setTimeout(wait,2);
}
test_getairports();