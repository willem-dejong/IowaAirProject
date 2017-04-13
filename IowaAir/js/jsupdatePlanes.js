var sql=require('./sql');
function argParser(url){
	argz={};
	var i=url.search("pid=[A-Za-z0-9]+");
	var ii=-1;
	var b=false;
	if (i!=-1){
		b=true;
		ii=url.indexOf("&",i+4);
		if(ii==-1){
			ii=url.length;
		}
		argz.plane_id=url.substring(i+4,ii);
	}
	else{
		argz.plane_id="";
	}
	i=url.search("model=");
	ii=-1;
	if (i!=-1){
		b=true;
		ii=url.indexOf("&",i+6);
		if(ii==-1){
			ii=url.length;
		}
		argz.model=url.substring(i+6,ii);
	}
	else{
		argz.model="";
	}
	while(argz.model.indexOf("_")!=-1){
		argz.model=argz.model.replace("_"," ")
	}
	console.log(argz.model)
	i=url.search("ecnum=[0-9]+");
	ii=-1;
	if (i!=-1){
		b=true;
		ii=url.indexOf("&",i+6);
		if(ii==-1){
			ii=url.length;
		}
		argz.ec_num_seats=parseInt(url.substring(i+6,ii));
	}
	else{
		argz.ec_num_seats="";
	}
	i=url.search("fcnum=[0-9]+");
	ii=-1;
	if (i!=-1){
		b=true;
		ii=url.indexOf("&",i+6);
		if(ii==-1){
			ii=url.length;
		}
		argz.fc_num_seats=parseInt(url.substring(i+6,ii));
	}
	else{
		argz.fc_num_seats="";
	}
	i=url.search("search=[a-z]+")
	ii=-1
	if (i!=-1){
		b=true;
	}
	argz.search=b;
	return argz;
}
function successHandler(rows,req,res,args){
	console.log(rows);
	res.render("updatePlane",{user:req.session.user,splane:args.splane,planes:rows,err:false})
}
function errorHandler(err,req,res,args){
	res.render("updatePlane",{user:req.session.user,splane:argz.splane,planes:[],err:true})
}
function updatePlaneRender(req,res){
	var argz={};
	argz.splane=argParser(req.url);
	console.log(argz)
	if(!argz.splane.search){
		res.render("updatePlane",{user:req.session.user,splane:argz.splane,planes:[],err:false})
	}
	else{
		sql.searchPlanes(argz.splane.plane_id,argz.splane.model,argz.splane.ec_num_seats,argz.splane.fc_num_seats,req,res,errorHandler,successHandler,argz);
	}
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
function updatePlane(req,res){
	var i=req.url.search("pid=[0-9]+")
	var i2=req.url.search("model=[A-Za-z0-9 \-()\.\#\"\;\:\,]+")
	var i3=req.url.search("ecnum=[0-9]+")
	var i4=req.url.search("fcnum=[0-9]+")
	if(i==-1||i2==-1||i3==-1||i4==-1){
		send400(null,req,res,null);
	}
	i+=4;
	i2+=6;
	i3+=6;
	i4+=6;
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
	var ii4=req.url.indexOf("&",i4)
	if(ii4==-1){
		ii4=req.url.length
	}
	var pid=req.url.substring(i,ii);
	var model=req.url.substring(i2,ii2);
	while(model.indexOf("_")!=-1){
		model=model.replace("_"," ")
	}
	var ecnum=req.url.substring(i3,ii3);
	var fcnum=req.url.substring(i4,ii4);
	sql.updatePlane(pid,model,ecnum,fcnum,req,res,send500,successhandler,{})
}
module.exports={
	updatePlaneRender:updatePlaneRender,
	updatePlane:updatePlane
	}