var sql=require('./sql');
function succh1(rows,req,res,args){
	console.log(rows)
	res.render("userBook",{user:req.session.user,passengers:rows})
}
function errh1(err,req,res,args){
	res.render("userBook",{user:req.session.user,passengers:[]})
}
function userBookingsRender(req,res){
	sql.getPassengers2(req.session.user.email,req.session.user.passw,req,res,errh1,succh1,{})
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
		sql.cancel2(resID,req.session.user.email,req.session.user.passw,req,res,send400,succh2,{})
	}
	else{
		send400(null,req,res,{})
	}
}
module.exports={
	userBookingsRender:userBookingsRender,
	cancel:cancel
}