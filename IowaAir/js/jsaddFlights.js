var sql=require('./sql');
function porterr(err,req,res,args){
	console.log("porterr")
	res.writeHead(500, {'Content-Type': 'text/plain'});
	res.end("oops");	
}
function portsucc(rows,req,res,args){
	console.log("portsucc")
	args.ports=rows
	console.log({user:req.session.user,ports:args.ports,planes:args.models})
	res.render("addFlight",{user:req.session.user,ports:args.ports,planes:args.models})
}
function modelerr(err,req,res,args){
	console.log("modelerr")
	res.writeHead(500, {'Content-Type': 'text/plain'});
	res.end("oops");	
}
function modelsucc(rows,req,res,args){
	console.log("modelsucc")
	args.models=rows
	sql.getairports(req,res,porterr,portsucc,args)
}
function addFlightRender(req,res){
	args={}
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
function parseArg(url){
	//var i=url.search("flightid=[0-9]+")
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
	if(i2==-1||i3==-1||i4==-1||i5==-1||i6==-1||i7==-1||i8==-1||i9==-1||i10==-1||i11==-1||i12==-1||i13==-1||i14==-1||i15==-1){
		return null
	}
	var cnt=0
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
	var i17=url.search("inter=[0-9]+")
	if(i17!=-1){
		var ii17=url.indexOf("&",i17+6)
		if(ii17==-1){
			ii17=url.length
			cnt+=1
		}
		f.inter=parseInt(url.substring(i17+6,ii17))
	}
	else{
		f.inter=0
	}
	var i18=url.search("interType=[a-z]+")
	if(i18!=-1){
		var ii18=url.indexOf("&",i18+10)
		if(ii18==-1){
			ii18=url.length
			cnt+=1
		}
		f.interType=url.substring(i18+10,ii18)
	}
	else{
		f.interType=null
	}
	var i19=url.search("numTime=[0-9]+")
	if(i19!=-1){
		var ii19=url.indexOf("&",i19+8)
		if(ii19==-1){
			ii19=url.length
			cnt+=1
		}
		f.numTime=parseInt(url.substring(i19+8,ii19))
	}
	else{
		f.numTime=0
	}
	if(cnt>1){
		return null
	}
	return f
}
function addFlight(req,res){
	var f=parseArg(req.url)
	console.log(f)
	sql.addFlight(f.fnum,f.dept,f.arv,f.ecsa,f.ecsb,f.eccps,f.fcsa,f.fcsb,f.fccps,f.am,f.org,f.dest,f.g,f.inter,f.interType,f.numTime,req,res, errh,succh,{})
}
module.exports={
	addFlightRender:addFlightRender,
	addFlight:addFlight
}