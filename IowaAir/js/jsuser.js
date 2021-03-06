var jspath=require("./jspath")
var mysql=require(jspath.modpath()+'mysql');
var jsuserBookings=require('./jsuserBookings');
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
	else if (req.session.user.type=="U"){
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
	else if (req.session.user.type=="U"){
		validateandcall(req,res,toCall,redirect)
	}
	else{
		redirect(req,res);	
	}
}
function validateandcall(req,res,toCall,handleUnAuth){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306",dateString:"date"});
 	conn.connect();
	var inn="SELECT idaccount,email,fname,lname,account_type,password from iowaair.account where email=? and password=? and account_type='U';"
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
function userBookingsRender(req,res){
	pagevalidate(req,res,jsuserBookings.userBookingsRender);
}
function cancel(req,res){
	cmdvalidate(req,res,jsuserBookings.cancel);
}
module.exports={
	userBookingsRender:userBookingsRender,
	cancel:cancel
};