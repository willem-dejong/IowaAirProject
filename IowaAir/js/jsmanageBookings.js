var sql=require('./sql');
var jspath=require("./jspath")
//passengers:[passenger{resid:int,fname:String,lname:String,dob:Date(),gender:String(1 char),flightID:int,Flight_num:String,Gate:String,model:String,departure_time:Date(),origin_port:String,arrival_time:Data(),destined_port:String,seatnum:String,bags:int},...]
function parseRArgs(url){
	var i=url.search("transtid=[0-9]+")
	if(i==-1){
		return null
	}
	else{
		var ii=url.indexOf("&",i)
		if (ii==-1){
			ii=url.length
		}
		return parseInt(url.substring(i+9,ii))
	}
}
function errh1(err,req,res,args){
	res.render("manageBook",{user:req.session.user,passengers:[]})
}
function succh1(rows,req,res,args){
	console.log(rows)
	res.render("manageBook",{user:req.session.user,passengers:rows})
}
function manageBookingsRender(req,res){
	transID=parseRArgs(req.url)
	if(transID){
		sql.getPassengers(transID,req,res,errh1,succh1,{})
	}
	else{
		res.render("manageBook",{user:req.session.user,passengers:[]})
	}
}
function send400(err,req,res,args){
	console.log(err)
	res.writeHead(400, {'Content-Type': 'text/plain'});
	res.end("invalid arguments");	
}
function succh2(rows,req,res,args){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("success");	
}
function parseCArgs(url){
	var i=url.search("resid=[0-9]+")
	if(i==-1){
		return null
	}
	else{
		var ii=url.indexOf("&",i)
		if (ii==-1){
			ii=url.length
		}
		return parseInt(url.substring(i+6,ii))
	}
}
function cancel(req,res){
	resID=parseCArgs(req.url)
	if(resID){
		sql.cancel(resID,req,res,send400,succh2,{})
	}
	else{
		send400(null,req,res,{})
	}
}
function parseChArgs(url){
	var i=url.search("resid=[0-9]+")
	var i2=url.search("bags=[0-9]+")
	if(i==-1||i2==-1){
		return null
	}
	else{
		var ii=url.indexOf("&",i)
		if (ii==-1){
			ii=url.length
		}
		var ii2=url.indexOf("&",i2)
		if (ii2==-1){
			ii2=url.length
		}
		return {resID:parseInt(url.substring(i+6,ii)),bags:parseInt(url.substring(i2+5,ii2))}
	}
}
function checkin(req,res){
	args=parseChArgs(req.url)
	if(args){
		sql.checkin(args.resID,args.bags,req,res,send400,succh2,args)
	}
	else{
		send400(null,req,res,{})
	}
}
module.exports={
	manageBookingsRender:manageBookingsRender,
	cancel:cancel,
	checkin:checkin
}
