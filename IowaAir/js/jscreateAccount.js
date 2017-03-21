var nodeMailer =require('C:\\Program Files\\nodejs\\node_modules\\nodemailer');
var mysql=require('C:\\Program Files\\nodejs\\node_modules\\mysql');
var md5 =require('./md5');
//console.log(md5);
var mailer=nodeMailer.createTransport({service:'gmail',auth:{user:'iowaairsystem@gmail.com',pass:'IowaAir2017'}});
function generatePassAndHash(){
	var pass=md5.hex_md5(String(Math.random())).substring(0,8);
	return [pass,md5.hex_md5(pass)];
}
function mail(email,cnt,res){
	mailer.sendMail(email,function(err,info){
		if(err){
			console.log(err);
			if (cnt<5){
				setTimeout(mail(email,cnt+1), 20000);
				return null
			}
			else{
				console.log("email error");
	        	res.writeHead(200, {'Content-Type': 'text/plain'});
	        	res.end("email error");
				return null
			}
		}
		else{
			console.log('message %s sent: %s',info.messageId,info.response);
	     	res.writeHead(200, {'Content-Type': 'text/plain'});
	     	res.end("success");
			return null
	   }
	});
}
function emailPass(mode,emailadd,fname,pass,res){
	var text=""
	if(mode==0){
		text='Dear '+fname+',\n\tA request has been made to change your password. Please use the password below to login and reset your password.\n\nPassword: '+pass+'\n\nThanks, Iowa Air.';
		html='<div>Dear '+fname+',</div><br><div>\tA request has been made to change your password. Please use the password below to login and reset your password.</div><br><div>Password: <b>'+pass+'</b></div><br><br><div>Thanks, Iowa Air.</div>';
	}
	else if(mode==1){
		text='Dear '+fname+',\n\tThank you for creating an account. Please use the password below to login and reset your password.\n\nPassword: '+pass+'\n\nThanks, Iowa Air.';
		html='<div>Dear '+fname+',</div><br><div>\tThank you for creating an account. Please use the password below to login and reset your password.</div><br><div>Password: <b>'+pass+'</b></div><br><br><div>Thanks, Iowa Air.</div>';
	}
	var email={
		from:'"IowaAir" <iowaairsystem@gmail.com>',
		to:emailadd,
		subject:'temporary password',
		text:text,
		html:html
	}
	mail(email,0,res)
}
function validEmail(email){
	var emailMatch = email.match(/[A-Za-z0-9]+([.\-_][A-Za-z0-9]+)*@[A-Za-z0-9]+([.\-_][A-Za-z0-9]+)*\.[A-Za-z]+/g);
	if(emailMatch&&email==emailMatch[0])
		return true;
	else
		return false;
}
function validPhone(phone){
	var phoneMatch = phone.match(/(([0-9]\-)?[0-9]{3}\-)?[0-9]{3}\-[0-9]{4}/g);
	if(phoneMatch&&phone==phoneMatch[0])
		return true;
	else
		return false;
}
function validType(type){
	if(type=="A"||type=="M"||type=="U")
		return true;
	else
		return false;
}
function createUser(req,res){
	console.log("createUser");
	//console.log(req.url);
	var i=req.url.search("email=")+6;
	if (i==5)
		i=req.url.length;
	var ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var email=req.url.substring(i,ii);
	/*console.log(i);
	console.log(ii);
	console.log(email);*/
	i=req.url.search("fname=")+6;
	if (i==5)
		i=req.url.length;
	ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var fname=req.url.substring(i,ii);
	/*console.log(i);
	console.log(ii);
	console.log(fname);*/
	i=req.url.search("lname=")+6;
	if (i==5)
		i=req.url.length;
	ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var lname=req.url.substring(i,ii);
	/*console.log(i);
	console.log(ii);
	console.log(lname);*/
	i=req.url.search("phone=")+6;
	if (i==5)
		i=req.url.length;
	ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var phone=req.url.substring(i,ii);
	/*console.log(i);
	console.log(ii);
	console.log(phone);*/
	createAccount("U",fname,lname,email,phone,res);
}
function createManager(req,res){
	console.log("createManager");
	//console.log(req.url);
	var i=req.url.search("email=")+6;
	if (i==5)
		i=req.url.length;
	var ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var email=req.url.substring(i,ii);
	/*console.log(i);
	console.log(ii);
	console.log(email);*/
	i=req.url.search("fname=")+6;
	if (i==5)
		i=req.url.length;
	ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var fname=req.url.substring(i,ii);
	/*console.log(i);
	console.log(ii);
	console.log(fname);*/
	i=req.url.search("lname=")+6;
	if (i==5)
		i=req.url.length;
	ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var lname=req.url.substring(i,ii);
	/*console.log(i);
	console.log(ii);
	console.log(lname);*/
	i=req.url.search("phone=")+6;
	if (i==5)
		i=req.url.length;
	ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var phone=req.url.substring(i,ii);
	/*console.log(i);
	console.log(ii);
	console.log(phone);*/
	createAccount("M",fname,lname,email,phone,res);
}
function createAccount(account_type,fname,lname,email,phone,res){
	var b=false
	var s="multiErr;"
	if(!validEmail(email)){
		b=true;
		s=s+"invalid email;"
	}
	if(!validPhone(phone)){
		b=true;
		s=s+"invalid phone;"
	}
	if(!validType(account_type)){
		b=true;
		s=s+"invalid type;"
	}
	if(fname==""){
		b=true;
		s=s+"invalid fname;"
	}
	if(lname==""){
		b=true;
		s=s+"invalid lname;"
	}
	if(b){
     	res.writeHead(200, {'Content-Type': 'text/plain'});
     	res.end(s);
     	return null;
	}
	var passes=generatePassAndHash();
	var connection=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306",dateString:"date"});
   connection.connect();
 	var inn="INSERT INTO `iowaair`.`account` (`account_type`, `fname`, `lname`, `email`, `password`, `forcePass`, `phone`) values (?,?,?,?,?,1,?);";
 	var args=[account_type,fname,lname,email,passes[1],phone]
	connection.query(inn,args,function (err, rows, fields) {
		connection.end();
		if(err){
			console.log(err);
			if(err.code=="ER_DUP_ENTRY"){
		     	res.writeHead(200, {'Content-Type': 'text/plain'});
		     	res.end("email in use");
			}
			else{
	        	res.writeHead(200, {'Content-Type': 'text/plain'});
	        	res.end("insert error");
	      }
		}
		else{
			emailPass(1,email,fname,passes[0],res);
		}
	});
}
function updateAccount(req,res){
	console.log("updateAccount");
	if(!req.session.user||req.session.user.type=="G"){
   	res.writeHead(200, {'Content-Type': 'text/plain'});
   	res.end("no session");
	}
	//console.log(req.url);
	var i=req.url.search("email=")+6;
	if (i==5)
		i=req.url.length;
	var ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var email=req.url.substring(i,ii);
	/*console.log(i);
	console.log(ii);
	console.log(email);*/
	i=req.url.search("fname=")+6;
	if (i==5)
		i=req.url.length;
	ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var fname=req.url.substring(i,ii);
	/*console.log(i);
	console.log(ii);
	console.log(fname);*/
	i=req.url.search("lname=")+6;
	if (i==5)
		i=req.url.length;
	ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var lname=req.url.substring(i,ii);
	/*console.log(i);
	console.log(ii);
	console.log(lname);*/
	i=req.url.search("phone=")+6;
	if (i==5)
		i=req.url.length;
	ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var phone=req.url.substring(i,ii);
	i=req.url.search("passw=")+6;
	if (i==5)
		i=req.url.length;
	ii=req.url.indexOf("&",i);
	if(ii==-1)
		ii=req.url.length
	var passw=req.url.substring(i,ii);
	var b=false
	var s="multiErr;"
	if(!validEmail(email)){
		b=true;
		s=s+"invalid email;"
	}
	if(!validPhone(phone)){
		b=true;
		s=s+"invalid phone;"
	}
	/*if(!validType(account_type)){
		b=true;
		s=s+"invalid type;"
	}*/
	if(fname==""){
		b=true;
		s=s+"invalid fname;"
	}
	if(lname==""){
		b=true;
		s=s+"invalid lname;"
	}
	if(b){
     	res.writeHead(200, {'Content-Type': 'text/plain'});
     	res.end(s);
     	return null;
	}
	//var passes=generatePassAndHash();
	var connection=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306",dateString:"date"});
   connection.connect();
 	var inn="update `iowaair`.`account` set fname=?,lname=?,phone=? where email=? and password=?;";
 	var args=[fname,lname,phone,email,passw];
	connection.query(inn,args,function (err, rows, fields) {
		connection.end();
		if(err){
			console.log(err);
        	res.writeHead(200, {'Content-Type': 'text/plain'});
        	res.end("update error");
		}
		else if(rows.changedRows==0){
        	res.writeHead(200, {'Content-Type': 'text/plain'});
        	res.end("invalid password");
      }
      else{
        	res.writeHead(200, {'Content-Type': 'text/plain'});
        	res.end("success");
		}
	});
}
function forgotPass(req,res){
	console.log("forgotPass");
	console.log(req.url);
	var i=req.url.search("email=")+6;
	var ii=req.url.indexOf("&",i);
	if (ii==-1){
		ii=req.url.length;
	}
	var email=req.url.substring(i,ii);
	console.log(email);
	var connection=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306",dateString:"date"});
   connection.connect();
   var inn="select * from iowaair.account where email=?;";
	var args=[email];
	connection.query(inn,args,function (err, rows, fields) {
		if(err){
        	res.writeHead(200, {'Content-Type': 'text/plain'});
        	res.end("update error");
			connection.end();
			console.log(err);
		}
		else if(rows.length>0){
			var passes=generatePassAndHash();
			var inn2="update iowaair.account set password=?, forcePass=1 where email=?;";
	 		var args2=[passes[1],email]
			connection.query(inn2,args2,function (err2, rows2, fields) {
				connection.end();
				if(err2){
        			res.writeHead(200, {'Content-Type': 'text/plain'});
        			res.end("update error");
        			throw err2;
        		}
				else{
					emailPass(0,email,rows[0].fname,passes[0],res);
				}
			});
		}
		else{
        	res.writeHead(200, {'Content-Type': 'text/plain'});
        	res.end("email not in use");
			connection.end();
		}
	});  
	
}
//createAccount("U",'Willem',"DeJong",'iowaairsystem123@gmail.com','319-777-7777');
//forgotPass('thecrimsonbloodmoon@gmail.com');
module.exports={
	forgotPass:forgotPass,
	createUser:createUser,
	createManager:createManager,
	updateAccount:updateAccount
}