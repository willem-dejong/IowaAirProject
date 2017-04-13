var sql=require('./sql');
function ferr(err,req,res,args){
	console.log("ferr")
	res.writeHead(500, {'Content-Type': 'text/plain'});
	res.end("oops");	
}
function fsucc(rows,req,res,args){
	console.log("fsucc")
	console.log({user:req.session.user,sflight:args.sflight,ports:args.ports,planes:args.models,flights:rows})
	res.render("updateFlight",{user:req.session.user,sflight:args.sflight,ports:args.ports,planes:args.models,flights:rows})
}
function porterr(err,req,res,args){
	console.log("porterr")
	res.writeHead(500, {'Content-Type': 'text/plain'});
	res.end("oops");	
}
function portsucc(rows,req,res,args){
	console.log("portsucc")
	args.ports=rows
	if(args.sflight){
		sql.searchFligths(args.sflight.flightID,args.sflight.Flight_num,args.sflight.departure_time,args.sflight.arrival_time,args.sflight.ec_seats_available,args.sflight.ec_seats_booked,args.sflight.ec_cost_per_seat,args.sflight.fc_seats_available,args.sflight.fc_seats_booked,args.sflight.fc_cost_per_seat,args.sflight.model,args.sflight.origin_port,args.sflight.destined_port,args.sflight.gate,req,res,ferr,fsucc,args)
	}
	else{
		res.render("updateFlight",{user:req.session.user,sflight:{},ports:args.ports,planes:args.models,flights:[]})
	}
	
}

function modelerr(err,req,res,args){
	console.log("modelerr")
	res.writeHead(500, {'Content-Type': 'text/plain'});
	res.end("oops");	
}
function modelsucc(rows,req,res,args){
	console.log("modelsucc")
	args.models=rows
	console.log(portsucc)
	sql.getairports(req,res,porterr,portsucc,args)
}
function parseArg(url){
	var i0=url.search("search=[a-zA-Z]+");
	if (i0==-1){
		return null
	}
	else{
		var sflight={}
		var cnt=0
		var i=url.search("flightid=[0-9]+")
		if(i==-1){
			sflight.flightID=null
		}
		else{
			var ii=url.indexOf("&",i+9)
			if(ii==-1){
				ii=url.length
				cnt+=1
			}
			sflight.flightID=parseInt(url.substring(i+9,ii))
		}
		var i2=url.search("flight_num=[a-zA-Z0-9]+")
		if(i2==-1){
			sflight.Flight_num=null
		}
		else{
			var ii2=url.indexOf("&",i2+11)
			if(ii2==-1){
				ii2=url.length
				cnt+=1
			}
			sflight.Flight_num=url.substring(i2+11,ii2)
		}
		var i3=url.search("deptd=[0-9]{4}-[0-9]{2}-[0-9]{2}")
		//var i4=url.search("deptt=[0-9]{2}:[0-9]{2}")
		if(i3==-1){
			sflight.departure_time=null
		}
		else{
			var ii3=url.indexOf("&",i3+6)
			//var ii4=url.indexOf("&",i4+6)
			if(ii3==-1){
				ii3=url.length
				cnt+=1
			}
			//if(ii4==-1){
				//ii4=url.length
				//cnt+=1
			//}
			var deptd=url.substring(i3+6,ii3)
			deptd=deptd.split("-")
			//var deptt=url.substring(i4+6,ii4)
			//deptt=deptt.split(":")
			sflight.departure_time=new Date(parseInt(deptd[0]),parseInt(deptd[1])-1,parseInt(deptd[2]))//,parseInt(deptt[0]),parseInt(deptt[1]))
		}
		var i5=url.search("arvd=[0-9]{4}-[0-9]{2}-[0-9]{2}")	
		//var i6=url.search("arvt=[0-9]{2}:[0-9]{2}")
		if(i5==-1){
			sflight.arrival_time=null
		}
		else{
			var ii5=url.indexOf("&",i5+5)
			//var ii6=url.indexOf("&",i6+5)
			if(ii5==-1){
				ii5=url.length
				cnt+=1
			}
			//if(ii6==-1){
				//ii6=url.length
				//cnt+=1
			//}
			var arvd=url.substring(i5+5,ii5)
			arvd=arvd.split("-")
			//var arvt=url.substring(i6+5,ii6)
			//arvt=arvt.split(":")
			sflight.arrival_time=new Date(parseInt(arvd[0]),parseInt(arvd[1])-1,parseInt(arvd[2]))//,parseInt(arvt[0]),parseInt(arvt[1]))
		}
		var i7=url.search("ecsa=[0-9]+")
		if(i7==-1){
			sflight.ec_seats_available=null
		}
		else{
			var ii7=url.indexOf("&",i7+5)
			if(ii7==-1){
				ii7=url.length
				cnt+=1
			}
			sflight.ec_seats_available=parseInt(url.substring(i7+5,ii7))
		}
		var i8=url.search("ecsb=[0-9]+")
		if(i8==-1){
			sflight.ec_seats_booked=null
		}
		else{
			var ii8=url.indexOf("&",i8+5)
			if(ii8==-1){
				ii8=url.length
				cnt+=1
			}
			sflight.ec_seats_booked=parseInt(url.substring(i8+5,ii8))
		}
		var i9=url.search("eccps=[0-9]+(\\.[0-9]+)?")
		if(i9==-1){
			sflight.ec_cost_per_seat=null
		}
		else{
			var ii9=url.indexOf("&",i9+6)
			if(ii9==-1){
				ii9=url.length
				cnt+=1
			}
			sflight.ec_cost_per_seat=parseFloat(url.substring(i9+6,ii9))
		}
		var i10=url.search("fcsa=[0-9]+")
		if(i10==-1){
			sflight.fc_seats_available=null
		}
		else{
			var ii10=url.indexOf("&",i10+5)
			if(ii10==-1){
				ii10=url.length
				cnt+=1
			}
			sflight.fc_seats_available=parseInt(url.substring(i10+5,ii10))
		}
		var i11=url.search("fcsb=[0-9]+")
		if(i11==-1){
			sflight.fc_seats_booked=null
		}
		else{
			var ii11=url.indexOf("&",i11+5)
			if(ii11==-1){
				ii11=url.length
				cnt+=1
			}
			sflight.fc_seats_booked=parseInt(url.substring(i11+5,ii11))
		}
		var i12=url.search("fccps=[0-9]+(\\.[0-9]+)?")
		if(i12==-1){
			sflight.fc_cost_per_seat=null
		}
		else{
			var ii12=url.indexOf("&",i12+6)
			if(ii12==-1){
				ii12=url.length
				cnt+=1
			}
			sflight.fc_cost_per_seat=parseFloat(url.substring(i12+6,ii12))
		}
		var i13=url.search("org=[a-zA-Z]+")
		if(i13==-1){
			sflight.origin_port=null
		}
		else{
			var ii13=url.indexOf("&",i13+4)
			if(ii13==-1){
				ii13=url.length
				cnt+=1
			}
			sflight.origin_port=url.substring(i13+4,ii13)
		}
		var i14=url.search("dest=[a-zA-Z]+")
		if(i14==-1){
			sflight.destined_port=null
		}
		else{
			var ii14=url.indexOf("&",i14+5)
			if(ii14==-1){
				ii14=url.length
				cnt+=1
			}
			sflight.destined_port=url.substring(i14+5,ii14)
		}
		var i15=url.search("gate=[a-zA-Z0-9]+")
		console.log(i15)
		if(i15==-1){
			sflight.gate=null
		}
		else{
			var ii15=url.indexOf("&",i15+5)
			if(ii15==-1){
				ii15=url.length
				cnt+=1
			}
			sflight.gate=url.substring(i15+5,ii15)
		}
		var i16=url.search("model=[A-Za-z_0-9]+")
		if(i16==-1){
			sflight.model=null
		}
		else{
			var ii16=url.indexOf("&",i16+6)
			if(ii16==-1){
				ii15=url.length
				cnt+=1
			}
			sflight.model=url.substring(i16+6,ii16)
			while(sflight.model.indexOf("_")!=-1){
				sflight.model=sflight.model.replace("_"," ");
			}
		}
		if (cnt>1){
			return null
		}
		return sflight
	}
}
function updateFlightRender(req,res){
	args={}
	args.sflight=parseArg(req.url)
	sql.getmodels(req,res,modelerr,modelsucc,args)
	
}


function errh(err,req,res,args){
	console.log("errh")
	res.writeHead(500, {'Content-Type': 'text/plain'});
	res.end("oops");	
	
}
function succh(rows,req,res,args){
	console.log("succh")
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("success");	
	
}
function parseArg2(url){
	var i=url.search("flightid=[0-9]+")
	var i2=url.search("flight_num=[a-zA-Z0-9]+")
	var i3=url.search("model=[a-zA-Z0-9_]+")
	var i4=url.search("deptd=[0-9]{4}-[0-9]{2}-[0-9]{2}")
	var i5=url.search("deptt=[0-9]{2}:[0-9]{2}")
	var i6=url.search("org=[a-zA-Z0-9]+")
	var i7=url.search("arvd=[0-9]{4}-[0-9]{2}-[0-9]{2}")
	var i8=url.search("arvt=[0-9]{2}:[0-9]{2}")
	var i9=url.search("dest=[a-zA-Z0-9]+")
	var i10=url.search("ecsa=[0-9]+")
	var i11=url.search("ecsb=[0-9]+")
	var i12=url.search("eccps=[0-9]+(\\.[0-9]+)?")
	var i13=url.search("fcsa=[0-9]+")
	var i14=url.search("fcsb=[0-9]+")
	var i15=url.search("fccps=[0-9]+(\\.[0-9]+)?")
	if(i==-1||i2==-1||i3==-1||i4==-1||i5==-1||i6==-1||i7==-1||i8==-1||i9==-1||i10==-1||i11==-1||i12==-1||i13==-1||i14==-1||i15==-1){
		return null
	}
	var cnt=0
	var ii=url.indexOf("&",i+9)
	if(ii==-1){
		ii=url.length
		cnt+=1
	}
	var ii2=url.indexOf("&",i2+11)
	if(ii2==-1){
		ii2=url.length
		cnt+=1
	}
	var ii3=url.indexOf("&",i3+6)
	if(ii3==-1){
		ii3=url.length
		cnt+=1
	}
	var ii4=url.indexOf("&",i4+6)
	if(ii4==-1){
		ii4=url.length
		cnt+=1
	}
	var ii5=url.indexOf("&",i5+6)
	if(ii5==-1){
		ii5=url.length
		cnt+=1
	}
	var ii6=url.indexOf("&",i6+4)
	if(ii6==-1){
		ii6=url.length
		cnt+=1
	}
	var ii7=url.indexOf("&",i7+5)
	if(ii7==-1){
		ii7=url.length
		cnt+=1
	}
	var ii8=url.indexOf("&",i8+5)
	if(ii8==-1){
		ii8=url.length
		cnt+=1
	}
	var ii9=url.indexOf("&",i9+5)
	if(ii9==-1){
		ii9=url.length
		cnt+=1
	}
	var ii10=url.indexOf("&",i10+5)
	if(ii10==-1){
		ii10=url.length
		cnt+=1
	}
	var ii11=url.indexOf("&",i11+5)
	if(ii11==-1){
		ii11=url.length
		cnt+=1
	}
	var ii12=url.indexOf("&",i12+6)
	if(ii12==-1){
		ii12=url.length
		cnt+=1
	}
	var ii13=url.indexOf("&",i13+5)
	if(ii13==-1){
		ii13=url.length
		cnt+=1
	}
	var ii14=url.indexOf("&",i14+5)
	if(ii14==-1){
		ii14=url.length
		cnt+=1
	}
	var ii15=url.indexOf("&",i15+6)
	if(ii15==-1){
		ii15=url.length
		cnt+=1
	}
	var f={}
	f.id=parseInt(url.substring(i+9,ii))
	f.fnum=url.substring(i2+11,ii2)
	f.am=url.substring(i3+6,ii3)
	while(f.am.indexOf("_")!=-1){
		f.am=f.am.replace("_"," ")
	}
	var dd=url.substring(i4+6,ii4).split("-")
	var dt=url.substring(i5+6,ii5).split(":")
	f.dept=new Date(parseInt(dd[0]),parseInt(dd[1])-1,parseInt(dd[2]),parseInt(dt[0]),parseInt(dt[1]))
	f.org=url.substring(i6+4,ii6)
	var ad=url.substring(i7+5,ii7).split("-")
	var at=url.substring(i8+5,ii8).split(":")
	f.arv=new Date(parseInt(ad[0]),parseInt(ad[1])-1,parseInt(ad[2]),parseInt(at[0]),parseInt(at[1]))
	f.dest=url.substring(i9+5,ii9)
	f.ecsa=parseInt(url.substring(i10+5,ii10))
	f.ecsb=parseInt(url.substring(i11+5,ii11))
	f.eccps=parseFloat(url.substring(i12+6,ii12))
	f.fcsa=parseInt(url.substring(i13+5,ii13))
	f.fcsb=parseInt(url.substring(i14+5,ii14))
	f.fccps=parseFloat(url.substring(i15+6,ii15))
	var i16=url.search("gate=[a-zA-Z0-9 ]+")
	if(i16!=-1){
		var ii16=url.indexOf("&",i16+5)
		if(ii16==-1){
			ii16=url.length
			cnt+=1
		}
		f.g=url.substring(i16+5,ii16)
	}
	else{
		f.g=null
	}
	if(cnt>1){
		return null
	}
	return f
}
function updateFlight(req,res){
	var f=parseArg2(req.url)
	console.log(f)
	sql.updateFlight(f.id,f.fnum,f.dept,f.arv,f.ecsa,f.ecsb,f.eccps,f.fcsa,f.fcsb,f.fccps,f.am,f.org,f.dest,f.g,req,res, errh,succh,{})
}
module.exports={
	updateFlightRender:updateFlightRender,
	updateFlight:updateFlight
	}