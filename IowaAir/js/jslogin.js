var sql=require("./sql");
function rowMapper(row){
	//console.log("rowMapper");
	var b=false;
	//"email="+email+";fname="+first name+";lname="+last name+";type="+account type+";accountid="+account_id+";forcepw="+ force passchange+";"
	s="email="+row.email+";accountid="+String(row.idaccount)+";fname="+row.fname+";lname="+row.lname+";type="+row.account_type+";forcepw=";
	if(row.forcePass){
		s=s+"true;";
		b=true
	}	
	else{
		s=s+"false;";
		b=false
	}
	return [s,b];
}
function errHandler(err,req,res,args){
	//console.log("errHandler")
	console.log(err);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("err");
}
function successhandler(rows,req,res,args){
	//console.log("successhandler")
	if (!rows||rows.length==0){
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end();
 	}
 	else{
 		//console.log(rows);
 		var temp=rowMapper(rows[0]);
 		if(!temp[1]){
			req.session.user={fname:rows[0].fname,lname:rows[0].lname,email:rows[0].email,passw:args.topassw,type:rows[0].account_type};
 		}
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end(temp[0]);
 	}
}
function login(req,res){
	//console.log("login")
	var i=req.url.search("email=[A-Za-z0-9]");
	var i2=req.url.search("passw=[a-z0-9]+");
	if (i==-1||i2==-1||!req.session.user||req.session.user.type!="G"){
		res.writeHead(500, {'Content-Type': 'text/plain'});
		res.end("oops");
	}
	else{
		i=i+6;
		i2=i2+6;
		var ii=req.url.indexOf("&",i);
		var ii2=req.url.indexOf("&",i2);
		if(ii==-1){
			ii=req.url.length;
		}
		if(ii2==-1){
			ii2=req.url.length;
		}
		var temail=req.url.substring(i,ii);
		var topassw=req.url.substring(i2,ii2);
		//console.log(temail);
		//console.log(topassw);
		var args={temail:temail,topassw:topassw}
		sql.getLogin(temail,topassw,req,res,errHandler,successhandler,args);
	}
}
//sql.getLogin("cswdejong@gmail.com","hfuier47fuk",req,res,errHandler,successhandler,args);
module.exports={login:login}