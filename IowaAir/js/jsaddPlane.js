var sql =require('./sql');
function addPlaneRender(req,res){
	res.render("addPlane",{user:req.session.user})
}

function send400(err,req,res,args){
	res.writeHead(400, {'Content-Type': 'text/plain'});
	res.end("invalid arguments");	
}
function send500(err,req,res,args){
	res.writeHead(500, {'Content-Type': 'text/plain'});
	res.end("invalid arguments");	
}
function successhandler(row,req,res,args){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("success");	
}
function addPlane(req,res){
	var i=req.url.search("model=[A-Za-z0-9 \-()\.\#\"\;\:\,]+")
	var i2=req.url.search("ecnum=[0-9]+")
	var i3=req.url.search("fcnum=[0-9]+")
	if(i==-1||i2==-1||i3==-1){
		send400(null,req,res,null);
	}
	i+=6;
	i2+=6;
	i3+=6;
	var ii=req.url.indexOf("&",i)
	if(ii==-1){
		ii=req.url.length
	}
	var ii2=req.url.indexOf("&",i2)
	if(ii2==-1){
		ii2=req.url.length
	}
	var ii3=req.url.indexOf("&",i3)
	if(ii3==-1){
		ii3=req.url.length
	}
	var model=req.url.substring(i,ii);
	var ecnum=req.url.substring(i2,ii2);
	var fcnum=req.url.substring(i3,ii3);
	sql.addPlane(model,ecnum,fcnum,req,res,send500,successhandler,{});
}
module.exports={
	addPlaneRender:addPlaneRender,
	addPlane:addPlane
}