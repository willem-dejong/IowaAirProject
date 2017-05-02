var sql=require("./sql");
function getUCTime(date){
	ndate=new Date(2017)
	ndate.setUTCFullYear(date.getFullYear())
	ndate.setUTCMonth(date.getMonth())
	ndate.setUTCDate(date.getDate())
	ndate.setUTCHours(date.getHours())
	ndate.setUTCMinutes(date.getMinutes())
	ndate.setUTCSeconds(date.getSeconds())
	console.log(ndate)
	//return ndate
	return date
}
function dq2t1(row){
	trip={
		flights:[{
			Flight_num:row.Flight_num1,
			gate:row.gate1,
			origin_portID:row.opID1,
			destined_portID:row.dpID1,
			origin_port_name:row.porta1,
			destined_port_name:row.portb1,
			depart_time:getUCTime(row.depTime1),
			arrive_time:getUCTime(row.arrTime1),
			fc_price:row.fc_price1,
			ec_price:row.ec_price1,
			PlaneDetails:row.model1
		}],
		path:[{pid:row.opID1,lat:row.lat1,lng:row.lon1},{pid:row.dpID1,lat:row.lat2,lng:row.lon2}],
		flightIDs:String(row.flightID1)+";",
		num_stops:row.num_stops,
    	tot_time:row.tot_time,
    	tot_ec_price:row.tot_ec_price,
    	tot_fc_price:row.tot_fc_price,
    	has_ec:row.has_ec,
	   has_fc:row.has_fc
	}
	console.log(trip)
	return trip	
}
function dq2t2(row){
	trip={
		flights:[{
			Flight_num:row.Flight_num1,
			gate:row.gate1,
			origin_portID:row.opID1,
			destined_portID:row.dpID1,
			origin_port_name:row.porta1,
			destined_port_name:row.portb1,
			depart_time:getUCTime(row.depTime1),
			arrive_time:getUCTime(row.arrTime1),
			fc_price:row.fc_price1,
			ec_price:row.ec_price1,
			PlaneDetails:row.model1
		},{
			Flight_num:row.Flight_num2,
			gate:row.gate2,
			origin_portID:row.opID2,
			destined_portID:row.dpID2,
			origin_port_name:row.porta2,
			destined_port_name:row.portb2,
			depart_time:getUCTime(row.depTime2),
			arrive_time:getUCTime(row.arrTime2),
			fc_price:row.fc_price2,
			ec_price:row.ec_price2,
			PlaneDetails:row.model2
		}],
		path:[{pid:row.opID1,lat:row.lat1,lng:row.lon1},{pid:row.opID2,lat:row.lat2,lng:row.lon2},{pid:row.dpID2,lat:row.lat3,lng:row.lon3}],
		flightIDs:String(row.flightID1)+";"+String(row.flightID2)+";",
		num_stops:row.num_stops,
    	tot_time:row.tot_time,
    	tot_ec_price:row.tot_ec_price,
    	tot_fc_price:row.tot_fc_price,
    	has_ec:row.has_ec,
	   has_fc:row.has_fc
	}
	console.log(trip)
	return trip	
}
function dq2t3(row){
	trip={
		flights:[{
			Flight_num:row.Flight_num1,
			gate:row.gate1,
			origin_portID:row.opID1,
			destined_portID:row.dpID1,
			origin_port_name:row.porta1,
			destined_port_name:row.portb1,
			depart_time:getUCTime(row.depTime1),
			arrive_time:getUCTime(row.arrTime1),
			fc_price:row.fc_price1,
			ec_price:row.ec_price1,
			PlaneDetails:row.model1
		},{
			Flight_num:row.Flight_num2,
			gate:row.gate2,
			origin_portID:row.opID2,
			destined_portID:row.dpID2,
			origin_port_name:row.porta2,
			destined_port_name:row.portb2,
			depart_time:getUCTime(row.depTime2),
			arrive_time:getUCTime(row.arrTime2),
			fc_price:row.fc_price2,
			ec_price:row.ec_price2,
			PlaneDetails:row.model2
		},{
			Flight_num:row.Flight_num3,
			gate:row.gate3,
			origin_portID:row.opID3,
			destined_portID:row.dpID3,
			origin_port_name:row.porta3,
			destined_port_name:row.portb3,
			depart_time:getUCTime(row.depTime3),
			arrive_time:getUCTime(row.arrTime3),
			fc_price:row.fc_price3,
			ec_price:row.ec_price3,
			PlaneDetails:row.model3
		}],
		path:[{pid:row.opID1,lat:row.lat1,lng:row.lon1},{pid:row.opID2,lat:row.lat2,lng:row.lon2},{pid:row.opID3,lat:row.lat3,lng:row.lon3},{pid:row.dpID3,lat:row.lat4,lng:row.lon4}],
		flightIDs:String(row.flightID1)+";"+String(row.flightID2)+";"+String(row.flightID3)+";",
		num_stops:row.num_stops,
    	tot_time:row.tot_time,
    	tot_ec_price:row.tot_ec_price,
    	tot_fc_price:row.tot_fc_price,
    	has_ec:row.has_ec,
	   has_fc:row.has_fc
	}
	console.log(trip)
	return trip	
}
function errHandler(err,req,res,args){
	console.log(err)
	res.redirect("/")	
}
function successHandler_to1(rows,req,res,args){
	if(args.to){
		args.toTrips=[]
		for(i in rows){
			args.toTrips.push(dq2t1(rows[i]))
		}
	}
	else{
		args.fromTrips=[]
		for(i in rows){
			args.fromTrips.push(dq2t1(rows[i]))
		}
	}
	sql.getFlights2(args.org,args.dest,args.date,args.pass,req,res,errHandler,successHandler_to2,args);
	
}
function successHandler_to2(rows,req,res,args){
	if(args.to){
		for(i in rows){
			args.toTrips.push(dq2t2(rows[i]))
		}
	}
	else{
		for(i in rows){
			args.fromTrips.push(dq2t2(rows[i]))
		}
	}
	sql.getFlights3(args.org,args.dest,args.date,args.pass,req,res,errHandler,successHandler_to3,args);
}
function successHandler_to3(rows,req,res,args){
	if(args.to){
		for(i in rows){
			args.toTrips.push(dq2t3(rows[i]))
		}
		if(args.twoway){
			args.to=false;
			sql.getFlights1(args.dest,args.org,args.date2,args.pass,req,res,errHandler,successHandler_to1,args);
			return null
		}
		else{
			args.fromTrips=[]
		}
	}
	else{
		for(i in rows){
			args.fromTrips.push(dq2t3(rows[i]))
		}
	}
	res.render("result",{user:req.session.user,pass:args.pass,twoway:args.twoway,toTrips:args.toTrips,fromTrips:args.fromTrips})
}
function resultRender(req,res){
	if(!req.session.user){
		res.redirect("/");
		return null
	}
	var i=req.url.search("port1=[A-Z0-9a-z]+")
	var i2=req.url.search("port2=[A-Z0-9a-z]+")
	var i3=req.url.search("date1=[0-9]{4}-[0-9]{2}-[0-9]{2}")
	var i4=req.url.search("date2=[0-9]{4}-[0-9]{2}-[0-9]{2}")
	var i5=req.url.search("pass=[0-9]+")
	if(i==-1||i2==-1||i3==-1||i5==-1){
		res.writeHead(400, {'Content-Type': 'text/plain'});
		res.end("invalid arguments");
		return null
	}
	i=i+6
	i2=i2+6
	i3=i3+6
	i5=i5+5
	var ii=req.url.indexOf("&",i)
	if(ii==-1){
		ii=req.url.length
	}
	var port1=req.url.substring(i,ii)
	var ii2=req.url.indexOf("&",i2)
	if(ii2==-1){
		ii2=req.url.length
	}
	var port2=req.url.substring(i2,ii2)
	var ii3=req.url.indexOf("&",i3)
	if(ii3==-1){
		ii3=req.url.length
	}
	var date=req.url.substring(i3,ii3)
	console.log(date)
	date=date.split("-")
	date=new Date(parseInt(date[0]),parseInt(date[1])-1,parseInt(date[2]))
	date=getUCTime(date)
	var ii5=req.url.indexOf("&",i5)
	if(ii5==-1){
		ii5=req.url.length
	}
	var pass=req.url.substring(i5,ii5)
	var twoway=false
	var date2=null
	var ii4=-1
	if(i4!=-1){
		twoway=true
		var ii4=req.url.indexOf("&",i4)
		if(ii4==-1){
			ii4=req.url.length
		}
		i4=i4+6
		date2=req.url.substring(i4,ii4)
		date2=date2.split("-")
		date2=new Date(parseInt(date2[0]),parseInt(date2[1])-1,parseInt(date2[2]))
		date2=getUCTime(date2)
	}
	console.log(date)
	args={to:true,org:port1,dest:port2,date:date,date2:date2,pass:pass,twoway:twoway}
	sql.getFlights1(port1,port2,date,pass,req,res,errHandler,successHandler_to1,args);
}

function parseMapArgs(url){
	var i=url.search("ports=[A-Za-z0-9]+\\;([A-Za-z0-9]+\\;)+")
	var i2=url.search("date1=[0-9]{4}-[0-9]{2}-[0-9]{2}")
	var i3=url.search("date2=[0-9]{4}-[0-9]{2}-[0-9]{2}")
	var i4=url.search("pass=[0-9]+")
	if(i==-1||i2==-1||i4==-1){
		return null
	}
	var cnt=0;
	var ii=url.indexOf("&",i)
	if(ii==-1){
		ii=url.length
		cnt+=1
	}
	var ii2=url.indexOf("&",i2)
	if(ii2==-1){
		ii2=url.length
		cnt+=1
	}
	var ii4=url.indexOf("&",i4)
	if(ii4==-1){
		ii4=url.length
		cnt+=1
	}
	if(i3!=-1){
		var ii3=url.indexOf("&",i3)
		if(ii3==-1){
			ii3=url.length
			cnt+=1
		}
	}
	if(cnt>1){
		return null
	}
	var ports=url.substring(i+6,ii).split(";").slice(0, -1)
	var date1=url.substring(i2+6,ii2)
	date1=date1.split("-")
	date1=new Date(parseInt(date1[0]),parseInt(date1[1])-1,parseInt(date1[2]))
	var date2=null
	if(i3!=-1){
		var date2=url.substring(i3+6,ii3)
		date2=date2.split("-")
		date2=new Date(parseInt(date2[0]),parseInt(date2[1])-1,parseInt(date2[2]))
	}
	var pass=parseInt(url.substring(i4+5,ii4))
	return {ports:ports,date1:date1,date2:date2,pass:pass}
}
function succh1(rows,req,res,args){
    args.toTrips = []
        console.log(rows)
		for(i in rows){
			if(args.ports.length==2){
				args.toTrips.push(dq2t1(rows[i]))
			}
			else if(args.ports.length==3){
				args.toTrips.push(dq2t2(rows[i]))
			}
			else if(args.ports.length==4){
				args.toTrips.push(dq2t3(rows[i]))
			}
        }
        console.log(args)
		if(args.date2){
			if(args.ports.length==2){
				sql.getMapFlights1(args.ports[1],args.ports[0],args.date2,args.pass,req,res,errHandler,succh2,args)
			}
			else if(args.ports.length==3){
				sql.getMapFlights2(args.ports[2],args.ports[1],args.ports[0],args.date2,args.pass,req,res,errHandler,succh2,args)
			}
			else if(args.ports.length==4){
				sql.getMapFlights3(args.ports[3],args.ports[2],args.ports[1],args.ports[0],args.date2,args.pass,req,res,errHandler,succh2,args)
			}
		}
		else{
			res.render("result",{user:req.session.user,pass:args.pass,twoway:false,toTrips:args.toTrips,fromTrips:[]})
		}
}
function succh2(rows,req,res,args){
		args.fromTrips=[]
		for(i in rows){
			if(args.ports.length==2){
				args.fromTrips.push(dq2t1(rows[i]))
			}
			else if(args.ports.length==3){
				args.fromTrips.push(dq2t2(rows[i]))
			}
			else if(args.ports.length==4){
				args.fromTrips.push(dq2t3(rows[i]))
			}
		}
		res.render("result",{user:req.session.user,pass:args.pass,twoway:true,toTrips:args.toTrips,fromTrips:args.fromTrips})
}
function mapResultRender(req,res){
	if(!req.session||!req.session.user){
		res.redirect("/");
		return null
	}
	args=parseMapArgs(req.url)
	console.log(args)
	if(!args){
		res.writeHead(400, {'Content-Type': 'text/plain'});
		res.end("invalid arguments");
	}
	else{
		if(args.ports.length==2){
			sql.getMapFlights1(args.ports[0],args.ports[1],args.date1,args.pass,req,res,errHandler,succh1,args)
		}
		else if(args.ports.length==3){
			sql.getMapFlights2(args.ports[0],args.ports[1],args.ports[2],args.date1,args.pass,req,res,errHandler,succh1,args)
		}
		else if(args.ports.length==4){
			sql.getMapFlights3(args.ports[0],args.ports[1],args.ports[2],args.ports[3],args.date1,args.pass,req,res,errHandler,succh1,args)
		}
		else{
			res.writeHead(400, {'Content-Type': 'text/plain'});
			res.end("invalid arguments");
		}
	}
}
module.exports={
	resultRender:resultRender,
	mapResultRender:mapResultRender
	}