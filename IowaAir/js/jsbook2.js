var sql=require('./sql');
function dq2t1(row){        //All 3 are the row mappers
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

function bookrender(req,res){
	 if(!req.session){
	 	res.redirect("/");
	 	return null;
	 }
    if(req.session.user.type == "G"){
        res.render("book",{user:req.session.user,toTrip:null,returnTrip:null,pass:null});
        return null
    }

    var f = parseArg(req.url);
    if (!f){
	 	res.redirect("/");
	 	return null;
    }
    var args = {};
    args.f = f;

    if(f.flightIDs1.length == 1){
        sql.getTrip1(f.flightIDs1[0],f.pass,req,res,errorhandler,successhandler1,args);
    }
    else if(f.flightIDs1.length == 2){
        sql.getTrip2(f.flightIDs1[0],f.flightIDs1[1],f.pass,req,res,errorhandler,successhandler1,args);
    }
    else if(f.flightIDs1.length == 3){
        sql.getTrip3(f.flightIDs1[0],f.flightIDs1[1],f.flightIDs1[2],f.pass,req,res,errorhandler,successhandler1,args);
    }
    else{
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end("Oops");
    }

}
function errorhandler(){
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end("Oops");
}

function parseArg(url){
    var i1 = url.search("flightids1=([0-9]+\\;)+")
    var i2 = url.search("class1=[a-zA-Z]+")
    var i3 = url.search("pass=[0-9]+")

    if(i1 == null || i2 == null || i3 == null){
        return null
    }

    var cnt=0
    var ii1=url.indexOf("&",i1+11)
    if(ii1==-1){
        ii1=url.length
        cnt+=1
    }

    var ii2=url.indexOf("&",i2+7)
    if(ii2==-1){
        ii2=url.length
        cnt+=1
    }

    var ii3=url.indexOf("&",i3+5)
    if(ii3==-1){
        ii3=url.length
        cnt+=1
    }
    var f = {}

    var flightids1 = url.substring(i1+11,ii1).split(";")
    f.flightIDs1 = flightids1.slice(0, -1);
    f.class1 = url.substring(i2+7,ii2);
    f.pass = parseInt(url.substring(i3+5,ii3))
    var i4 = url.search("flightids2=([0-9]+\\;)+")
    var i5 = url.search("class2=[a-zA-Z]+")
	 if (i4==-1 || i5==-1){
	 	f.flightIDs2=null
	 	f.class2=null
	 }
	 else{
	    var ii4=url.indexOf("&",i4+11)
	    if(ii4==-1){
	        ii4=url.length
	        cnt+=1
	    }

	    var ii5=url.indexOf("&",i5+7)
	    if(ii5==-1){
	        ii5=url.length
	        cnt+=1
	    }
	    var flightids2 = url.substring(i4+11,ii4).split(";")
	    f.flightIDs2 = flightid2.slice(0,-1);
	    f.class2 = url.substring(i5+7,ii5);
	 }
	if (cnt!=1){
		return null
	}
    return f;
}

function successhandler1(rows, req, res, args){
    if (args.f.flightIDs1.length == 1){
        args.toTrip = dq2t1(rows[0]);
    }
    else if (args.f.flightIDs1.length == 2){
        args.toTrip = dq2t2(rows[0]);
    }
    else if (args.f.flightIDs1.length == 3){
        args.toTrip = dq2t3(rows[0]);
    }
    else{
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end("Oops");
        return null;
    }
    if (args.f.class1=="ec"){
		args.toTrip.has_ec=true;
		args.toTrip.has_fc=false;
    }
    else if(args.f.class1=="fc"){
		args.toTrip.has_ec=false;
		args.toTrip.has_fc=true;
    }
    else{
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end("Oops");
        return null;
    }
    if(args.f.flightIDs2 != null) {
        if (args.f.flightIDs2.length == 1) {
            sql.getTrip1(args.f.flightIDs2[0], args.f.pass, req, res, errorhandler, successhandler2, args);
        }
        else if (args.f.flightIDs2.length == 2) {
            sql.getTrip2(f.flightIDs2[0], args.f.flightIDs2[1], args.f.pass, req, res, errorhandler, successhandler2, args);
        }
        else if (args.f.flightIDs2.length == 3) {
            sql.getTrip3(args.f.flightIDs2[0], args.f.flightIDs2[1], args.f.flightIDs2[2], args.f.pass, req, res, errorhandler, successhandler2, args);
        }
        else {
            res.writeHead(500, {'Content-Type': 'text/plain'});
        		res.end("Oops");
        }
    }
    else{
        res.render("book",{user:req.session.user,toTrip:args.toTrip,returnTrip:null,pass:args.f.pass})
    }
}

function successhandler2 (rows,req, res, args){
    if (args.f.flightIDs2.length == 1){
        args.returnTrip = dq2t1(rows[0]);
    }
    else if (args.f.flightIDs2.length == 2){
        args.returnTrip = dq2t2(rows[0]);
    }
    else if (args.f.flightIDs2.length == 3){
        args.returnTrip = dq2t3(rows[0]);
    }
    else{
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end("Oops");
    }
    if (args.f.class2=="ec"){
		args.toTrip.has_ec=true;
		args.toTrip.has_fc=false;
    }
    else if(args.f.class2=="fc"){
		args.returnTrip.has_ec=false;
		args.returnTrip.has_fc=true;
    }
    else{
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end("Oops");
        return null;
    }

    res.render("book",{user:req.session.user,toTrip:args.toTrip,returnTrip:args.returnTrip,pass:args.f.pass})

}


function bookit(req,res){
    if(!req.session||req.session.user.type == "G"){
	    res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.end("permission Denied");
    }

    var t = bookitparse(req.url);
    var args = {};

    sql.reserve(t.passengers,t.flightIDs,req,res,errh,succh,args);

}

function succh(rows,req,res,args){
    console.log("succh")
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("success");
}

function errh(err,req,res,args){
    console.log("errh")
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end("oops");
}

function bookitparse(url){
    var passengers;
    var returnable = {};
    var flightIDs;

    var i0 = url.search("pass=[0-9]+")
    if(i0==-1){
    	return null;
    }

    var ii0=url.indexOf("&",i0+5)
    if(ii0==-1){
        ii0=url.length
    }

    var pass = parseInt(url.substring(i0+5,ii0))

    for(var n = 1;n<=pass;n++){
        var person = {}
        var i1 = url.search("fname"+ n + "=[a-zA-Z]+")
        var i2 = url.search("lname"+ n + "=[a-zA-Z]+")
        var i3 = url.search("dob"+ n + "=[0-9]{4}-[0-9]{2}-[0-9]{2}")
        var i4 = url.search("gender"+ n + "=[a-zA-Z]+")
			if(i1==-1||i2==-1||i3==-1||i4==-1){
				return null
			}
        var ii1=url.indexOf("&",i1+7)
        if(ii1==-1){
            ii1=url.length
        }
        var ii2=url.indexOf("&",i2+7)
        if(ii2==-1){
            ii2=url.length
        }
        var ii3=url.indexOf("&",i3+5)
        if(ii3==-1){
            ii3=url.length
        }
        var ii4=url.indexOf("&",i4+8)
        if(ii4==-1){
            ii4=url.length
        }


        person.fname = url.substring(i1+7,ii1);
        person.lname = url.substring(i2+7,ii2);
        var dob=url.substring(i3+5,ii3).split("-");
        person.dob = new Date(parseInt(dob[0]),parseInt(dob[1])-1,parseInt(dob[2]));
        person.gender = url.substring(i4+8,ii4);

        passengers[n-1] = person;
    }
    returnable.passengers = passengers;

    var i5 = url.search("flightids1=([0-9]+\\;)+")
		if (i5==-1){
			return null
		}
    var ii5=url.indexOf("&",i5+11)
    if(ii5==-1){
        ii5=url.length
    }

    var flightids1 = url.substring(i5+11,ii5).split(";")
    var flightIDs1 = flightids1.slice(0, -1);

    var i6 = url.search("flightids2=([0-9]+\\;)+")

    var ii6=url.indexOf("&",i6+11)
    if(ii6==-1){
        ii6=url.length
    }

    var flightids2 = url.substring(i6+11,ii6).split(";")
    if(flightids2 != null){
        flightIDs2 = flightids2.slice(0,-1);
        flightIDs = flightIDs1.concat(flightIDs2);
    }
    else{
        flightIDs = flightIDs1;
    }
    returnable.flightids = flightIDs;
	return returnable
}


module.exports={
    bookrender:bookrender,
    bookit:bookit
}