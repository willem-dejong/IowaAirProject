var sql=require("./sql");
function errHandle1(err,req,res,args){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("err");
}
function successHandler1(rows,req,res,args){
	if(rows.length==0){
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end("invalid cred");
	}
 	else{
		args.row=rows[0];
 		sql.updatepass(args.temail,args.topassw,args.tnpassw,req,res,errhandler2,successhandler2,args)
	}
}
function errHandle2(err,req,res,args){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("false");
}
function successHandler2(rows,req,res,args){
	req.session.user={fname:args.row.fname,lname:args.row.lname,email:args.row.email,passw:args.tnpassw,type:args.row.account_type};
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("true");
}
function updatepass(req,res){
	var i=req.url.search("email=[A-Za-z0-9]");
	var i2=req.url.search("opassw=[a-z0-9]+");
	var i3=req.url.search("npassw=[a-z0-9]+");
	if (i==-1||i2==-1||i3==-1){
		res.writeHead(500, {'Content-Type': 'text/plain'});
		res.end();
	}
	else{
		i=i+6;
		i2=i2+7;
		i3=i3+7;
		var ii=req.url.indexOf("&",i);
		var ii2=req.url.indexOf("&",i2);
		var ii3=req.url.indexOf("&",i3);
		if(ii==-1){
			ii=req.url.length;
		}
		if(ii2==-1){
			ii2=req.url.length;
		}
		if(ii3==-1){
			ii3=req.url.length;
		}
		var temail=req.url.substring(i,ii);
		var topassw=req.url.substring(i2,ii2);
		var tnpassw=req.url.substring(i3,ii3);
		var args={temail:temail,topassw:topassw,tnpassw:tnpassw}
		sql.getLogin(temail,topassw,req,res,errHandle1,successHandler1,args);
	}
}
module.exports={updatepass:updatepass}