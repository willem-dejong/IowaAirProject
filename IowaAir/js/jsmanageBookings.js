var sql=require('./sql');
function getUCTime(date){
	ndate=new Date(2017)
	ndate.setUTCFullYear(date.getFullYear())
	ndate.setUTCMonth(date.getMonth())
	ndate.setUTCDate(date.getDate())
	ndate.setUTCHours(date.getHours())
	ndate.setUTCMinutes(date.getMinutes())
	ndate.setUTCSeconds(date.getSeconds())
	console.log(date)
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
function succh3(rows,req,res,args){
	args.passenger=rows[0]
	sql.getTrip(rows[0].flightID,req,res,send400,succh4,args)
}
function succh4(rows,req,res,args){
	args.trip=dq2t1(rows[0])
	res.render("ticket",{trip:args.trip,passenger:args.passenger})
}
function ticketRender(req,res){
	args.resID=parseCArgs(req.url)
	if (args.resID){
		sql.getPassenger(args.resID,req,res,send400,succh3,args)
	}
	else{
		send400(null,req,res,{})
	}
}
module.exports={
	manageBookingsRender:manageBookingsRender,
	cancel:cancel,
	checkin:checkin,
	ticketRender:ticketRender
}
