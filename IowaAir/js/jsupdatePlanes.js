var sql=require('./sql');
function argParser(url){
	argz={};
	var i=url.search("plane_id=[A-Za-z0-9]+");
	var ii=-1;
	var b=false;
	if (i!=-1){
		b=true;
		ii=url.indexOf("&",i+9);
		if(ii=-1){
			ii=url.length;
		}
		argz.plane_id=url.substring(i+9,ii);
	}
	else{
		argz.plane_id=null;
	}
	i=url.search("model=");
	ii=-1;
	if (i!=-1){
		b=true;
		ii=url.indexOf("&",i+6);
		if(ii=-1){
			ii=url.length;
		}
		argz.model=url.substring(i+6,ii);
	}
	else{
		argz.model=null;
	}
	i=url.search("ec_num_seats=[0-9]+");
	ii=-1;
	if (i!=-1){
		b=true;
		ii=url.indexOf("&",i+13);
		if(ii=-1){
			ii=url.length;
		}
		argz.ec_num_seats=parseInt(url.substring(i+13,ii));
	}
	else{
		argz.ec_num_seats=null;
	}
	i=url.search("fc_num_seats=[0-9]+");
	ii=-1;
	if (i!=-1){
		b=true;
		ii=url.indexOf("&",i+13);
		if(ii=-1){
			ii=url.length;
		}
		argz.fc_num_seats=parseInt(url.substring(i+13,ii));
	}
	else{
		argz.fc_num_seats=null;
	}
	argz.search=b;
	return argz;
}
function successHandler(rows,req,res,args){
	res.render("updatePlane",{user:req.session.user,planes:rows,err:false})
}
function errorHandler(err,req,res,args){
	res.render("updatePlane",{user:req.session.user,planes:[],err:true})
}
function updatePlaneRender(req,res){
	argz=argParser(req.url);
	if(!argz.search){
		res.render("updatePlane",{user:req.session.user,planes:[],err:false})
	}
	else{
		sql.getPlanes(argz.plane_id,argz.model,argz.ec_num_seats,argz.fc_num_seats,req,res,errorHandler,successHandler,argz);
	}
}
module.exports={
	updatePlaneRender:updatePlaneRender
	}