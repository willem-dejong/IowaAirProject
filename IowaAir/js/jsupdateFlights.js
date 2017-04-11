var sql=require('./sql');
var sql=require('./sql');
function argParser(url){rewrite for flights
	argz={};
	var i=url.search("flightID=[A-Za-z0-9]+");
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
	i=url.search("Flight_num=");
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
	i=url.search("departure_time=[0-9]+");
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
	i=url.search("arrival_time=[0-9]+");
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
function successHandler(rows,req,res,args){rewrite for flights
	res.render("updatePlane",{user:req.session.user,planes:rows,err:false})
}
function errorHandler(err,req,res,args){rewrite for flights
	res.render("updatePlane",{user:req.session.user,planes:[],err:true})
}
function updatePlaneRender(req,res){rewrite for flights
	argz=argParser(req.url);
	if(!argz.search){
		res.render("updatePlane",{user:req.session.user,planes:[],err:false})
	}
	else{
		sql.getPlanes(argz.plane_id,argz.model,argz.ec_num_seats,argz.fc_num_seats,req,res,errorHandler,successHandler,argz);
	}
}
module.exports={rewrite for flights
	updatePlaneRender:updatePlaneRender
	}