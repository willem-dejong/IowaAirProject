var jspath=require("./jspath")
var mysql=require(jspath.modpath()+'mysql');
var jscreateAccount=require('./jscreateAccount');
var jsupdatePlanes=require('./jsupdatePlanes');
var jsupdateFlights=require('./jsupdateFlights');
var jsaddPlanes=require('./jsaddPlanes');
var jsaddFlights=require('./jsaddFlights');
function forbidden(req,res){
	req.session.user={fname:"",lname:"",email:"",passw:"",type:"G"};
	res.writeHead(401, {'Content-Type': 'text/plain'});
	res.end("you do not have permission to use this.");	
}
function redirect(req,res){
	req.session.user={fname:"",lname:"",email:"",passw:"",type:"G"};
	res.redirect("/");	
}
function cmdvalidate(req,res,toCall){
	if (!req.session.user){
   	forbidden(req,res);
	}
	else if (req.session.user.type=="A"){
		validateandcall(req,res,toCall,forbidden)
	}
	else{
   	forbidden(req,res);
	}
}
function pagevalidate(req,res,toCall){
	if (!req.session.user){
		redirect(req,res);	
	}
	else if (req.session.user.type=="A"){
		validateandcall(req,res,toCall,redirect)
	}
	else{
		redirect(req,res);	
	}
}
function validateandcall(req,res,toCall,handleUnAuth){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306",dateString:"date"});
 	conn.connect();
	var inn="SELECT idaccount,email,fname,lname,account_type,password from iowaair.account where email=? and password=? and account_type='A';"
	var args=[req.session.user.email,req.session.user.passw];
	conn.query(inn,args,function(err,rows,feilds){
		conn.end();
		if (err){
			console.log(err);
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end("error");	
		} 
		else if (rows.length!=0){
			var row=rows[0];
			req.session.user={fname:row.fname,lname:row.lname,email:row.email,passw:row.password,type:row.account_type};
			toCall(req,res);
		}
		else{
			handleUnAuth(req,res)	
		}
	});
}
function aER(req,res){
	res.render("addEmployee",{user:req.session.user});
}
function addEmployeeRender(req,res){
	pagevalidate(req,res,aER);
}
function createManager(req,res){
	cmdvalidate(req,res,jscreateAccount.createManager);
}
function updatePlaneRender(req,res){
	pagevalidate(req,res,jsupdatePlanes.updatePlaneRender);
}
function updatePlane(req,res){
	cmdvalidate(req,res,jsupdatePlanes.updatePlane);
}
function addPlaneRender(req,res){
	pagevalidate(req,res,jsaddPlanes.addPlaneRender);
}
function addPlane(req,res){
	cmdvalidate(req,res,jsaddPlanes.addPlane);
}
function updateFlightRender(req,res){
	pagevalidate(req,res,jsupdateFlights.updateFlightRender);
}
function updateFlight(req,res){
	cmdvalidate(req,res,jsupdateFlights.updateFlight);
}
function addFlightRender(req,res){
	pagevalidate(req,res,jsaddFlights.addFlightRender);
}
function addFlight(req,res){
	cmdvalidate(req,res,jsaddFlights.addFlight);
}
module.exports={
	addEmployeeRender:addEmployeeRender,
	createManager:createManager,
	updatePlaneRender:updatePlaneRender,
	addPlaneRender:addPlaneRender,
	addPlane:addPlane,
	updatePlane:updatePlane,
	updateFlightRender:updateFlightRender,
	updateFlight:updateFlight,
	addFlightRender:addFlightRender,
	addFlight:addFlight
};