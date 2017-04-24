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
		path:[{lat:row.lat1,lng:row.lon1},{lat:row.lat2,lng:row.lon2}],
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
		path:[{lat:row.lat1,lng:row.lon1},{lat:row.lat2,lng:row.lon2},{lat:row.lat3,lng:row.lon3}],
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
		path:[{lat:row.lat1,lng:row.lon1},{lat:row.lat2,lng:row.lon2},{lat:row.lat3,lng:row.lon3},{lat:row.lat4,lng:row.lon4}],
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
module.exports={
	resultRender:resultRender
	}