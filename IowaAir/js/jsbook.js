var sql=require('./sql');
var jspath=require("./jspath")
var ejs=require(jspath.modpath()+"ejs");
var nodeMailer =require(jspath.modpath()+'nodemailer');
var mailer=nodeMailer.createTransport({service:'gmail',auth:{user:'iowaairsystem@gmail.com',pass:'IowaAir2017'}});
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

function bookrender(req,res){
	 if(!req.session||!req.session.user){
	 	res.redirect("/");
	 	return null;
	 }
    if(req.session.user.type == "G"){
    		//console.log("res.render('book',{user:req.session.user,toTrip:null,returnTrip:null,pass:null});")
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
        res.end("Oops 1");
    }

}
function errorhandler(){
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end("Oops 2");
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
	    f.flightIDs2 = flightids2.slice(0,-1);
	    f.class2 = url.substring(i5+7,ii5);
	 }
	if (cnt!=1){
		return null
	}
    return f;
}

function successhandler1(rows, req, res, args){
	console.log(rows)
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
        res.end("Oops 3");
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
        res.end("Oops 4");
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
        		res.end("Oops 5");
        }
    }
    else{
        res.render('book',{user:req.session.user,toTrip:args.toTrip,returnTrip:null,pass:args.f.pass})
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
        res.end("Oops 6");
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
        res.end("Oops 7");
        return null;
    }

    res.render('book',{user:req.session.user,toTrip:args.toTrip,returnTrip:args.returnTrip,pass:args.f.pass})

}


function bookit(req,res){
    if(!req.session.user||req.session.user.type == "G"){
	    res.writeHead(403, {'Content-Type': 'text/plain'});
	    res.end("permission Denied");
    }

    var t = bookitparse(req.url);
    if(!t){
	    res.writeHead(400, {'Content-Type': 'text/plain'});
	    res.end("invalid args");
    }
    var args = {};
	 args.t=t;
    sql.reserve(t.passengers,t.flightids,t.classes,req,res,errh,succh,args);

}

function succh(rows,req,res,args){
    console.log("succh")
    console.log(rows)
    args.transID=rows[0].a1
    sendEmail(req,res,args)
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("success");
}

function errh(err,req,res,args){
    console.log("errh")
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end("oops 8");
}

function bookitparse(url){
    var passengers=[];
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
        var i1 = url.search("fname"+ n + "=[a-zA-Z]+")+parseInt(Math.log10(n))
        var i2 = url.search("lname" + n + "=[a-zA-Z]+") + parseInt(Math.log10(n))
        var i3 = url.search("dob" + n + "=[0-9]{4}-[0-9]{2}-[0-9]{2}") + parseInt(Math.log10(n))
        var i4 = url.search("gender" + n + "=[a-zA-Z]+") + parseInt(Math.log10(n))
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

        passengers.push(person)
    }
    returnable.passengers = passengers;

    var i5 = url.search("flightids1=([0-9]+\\;)+")
    var i7 = url.search("class1=[a-zA-Z]+")
		if (i5==-1||i7==-1){
			return null
		}
    var ii5=url.indexOf("&",i5+11)
    if(ii5==-1){
        ii5=url.length
    }
    var ii7=url.indexOf("&",i7+7)
    if(ii7==-1){
        ii7=url.length
    }
	 var classs=url.substring(i7+7,ii7)
	 returnable.classes=[]
    var flightids1 = url.substring(i5+11,ii5).split(";")
    var flightIDs1 = flightids1.slice(0, -1);
	 for(var iiiii in flightIDs1){
	 	returnable.classes.push(classs)
	 }

    var i6 = url.search("flightids2=([0-9]+\\;)+")
    var i8 = url.search("class2=[a-zA-Z]+")
	 if(i6!=-1&&i8!=-1)
	 {
	    var ii6=url.indexOf("&",i6+11)
	    if(ii6==-1){
	        ii6=url.length
	    }
	    var ii8=url.indexOf("&",i8+7)
	    if(ii8==-1){
	        ii8=url.length
	    }
	 	classs=url.substring(i8+7,ii8)
	    var flightids2 = url.substring(i6+11,ii6).split(";")
       flightIDs2 = flightids2.slice(0,-1);
		 for(var iiiii in flightIDs2){
		 	returnable.classes.push(classs)
		 }
       flightIDs = flightIDs1.concat(flightIDs2);
    }
    else{
        flightIDs = flightIDs1;
    }
    returnable.flightids = flightIDs;
	return returnable
}
//console.log(bookitparse("http://localhost/bookit?pass=2&fname1=bob&lname1=dear&dob1=1990-01-01&gender1=M&fname2=bob&lname2=dear&dob2=1990-01-01&gender2=M&flightids1=2;1;&class1=ec"))
function makeEmail(transID,pass,trips,email,fname){
	text='please view in an html supported email veiwer';
	var data={pass:pass,name:fname,trips:trips,transID:transID}
	html=ejs.render("<body><div style=\"color:red;\">make sure to expand any hidden details</div><br/><div> Dear <%=name%>,</div><br/><div> Your Transaction number is <%=transID%>, Save this and bring it with you to the airport, as it will be needed during the check-in process.</div><br><div>You booked <%=pass%> flights for each of the following</div><br><ul id=\"resultlist\" style=\"position: relative;list-style: none;padding:0px;\"><%for(var iz in trips){%><%var trip=trips[iz]%><%var ec_price=trip.tot_ec_price%><%if(!trip.has_ec){%><%ec_price=Number.MAX_SAFE_INTEGER%><%}%><%var fc_price=trip.tot_fc_price%><%if(!trip.has_fc){%><%fc_price=Number.MAX_SAFE_INTEGER%><%}%><li class=\"resultitem\" style=\"margin-top:10px;position:relative;width:100%;border: solid;background-color:rgba(255,255,255,0.75);\" flightids=<%=trip.flightIDs%> dept-time=\"<%=trip.flights[0].depart_time.getFullYear()%>-<%=trip.flights[0].depart_time.getMonth()%>-<%=trip.flights[0].depart_time.getDate()%> <%=trip.flights[0].depart_time.getHours()%>:<%=trip.flights[0].depart_time.getMinutes()%>:<%=trip.flights[0].depart_time.getSeconds()%>\" arrive-time=\"<%=trip.flights[trip.flights.length-1].arrive_time.getFullYear()%>-<%=trip.flights[trip.flights.length-1].arrive_time.getMonth()%>-<%=trip.flights[trip.flights.length-1].arrive_time.getDate()%> <%=trip.flights[trip.flights.length-1].arrive_time.getHours()%>:<%=trip.flights[trip.flights.length-1].arrive_time.getMinutes()%>:<%=trip.flights[trip.flights.length-1].arrive_time.getSeconds()%>\" ec_price=<%=ec_price%> fc_price=<%=fc_price%> nstops=<%=trip.num_stops%>  tottime=<%=trip.tot_time%> ><div class=\"tofrombox\" style=\"position: relative;width:100%;margin-left:0%;text-align: center;display: inline-block;\"><br><div class=\"from tofromh1\" style=\"position:relative;width:39%;font-size: 150%;margin-top:0px;display: inline-block;\"><b><%=trip.flights[0].origin_portID%> to <%=trip.flights[trip.flights.length-1].destined_portID%></b></div><br><br><div class=\"tofromh2\" style=\"position:relative;font-size: 110%;text-align:center;\"><div>From: <%=trip.flights[0].origin_port_name%> </div></div><br><%var n=0%><%while(n<trip.flights.length-1){%><div class=\"tofromh2\" style=\"position:relative;font-size: 110%;text-align:left;\"><div>Stop: <%=trip.flights[n].destined_port_name%></div></div><%n=n+1%><br><%}%><div class=\"tofromh2\" style=\"position:relative;font-size: 110%;text-align:center;\"><div>To: <%=trip.flights[trip.flights.length-1].destined_port_name%></div></div><br><div id=\"timeRange\" ><div class=\"from tofromh3\" style=\"position:relative;width:39%;font-size: 110%;display: inline-block;vertical-align:middle;\"><div class=\"tofrom3\"><%=trip.flights[0].depart_time%></div></div><div class=\"mid tofromh3\" style=\"position:relative;font-size: 110%;display: inline-block;vertical-align:middle;\"><div class=\"tofrom3\"><span class=\"dash\">-</span></div></div><div class=\"to tofromh3\" style=\"position:relative;width:39%;font-size: 110%;display: inline-block;vertical-align:middle;\"><div class=\"tofrom3\"><%=trip.flights[trip.flights.length-1].arrive_time%></div></div></div><br><div class=\"tofromh4\" style=\"position:relative;width:100%;font-size: 110%;\"><%var totl=trip.tot_time.split(\":\")%><%var toth=parseInt(totl[0])%><%var totm=parseInt(totl[1])%><%var totstr=String(toth)+\" Hours \"+String(totm)+\" Minutes\"%><div><%=totstr%></div></div><div class=\"flights\"><br><div class=\"indstops\"><%=trip.flights[0].origin_portID%><%for (ii in trip.flights){%>&rArr; <%=trip.flights[ii].destined_portID%><%}%><br><%for(ii in trip.flights){%>Flight <%=parseInt(ii)+1%>: <%=trip.flights[ii].Flight_num%><br>Plane <%=parseInt(ii)+1%>: <%=trip.flights[ii].PlaneDetails%><br>Gate <%=parseInt(ii)+1%>: <%if(trip.flights[ii].gate){%><%=trip.flights[ii].gate%><%}else{%>T/A<%}%><%}%></div></div><div class=\"bookit\" style=\"position: absolute;height: 100%;width:100%;text-align:center;display: inline-block;\"><div class=\"price priceec\" style=\"position:relative;width:100%;font-size:150%;\"><%if (trip.has_ec){%><br><b>econemy</b><br>$<%=trip.tot_ec_price%><br> <%}%></div><div class=\"price pricefc\" style=\"position:relative;width:100%;font-size:150%;\"><%if (trip.has_fc){%> <br><b>first class</b><br>$<%=trip.tot_fc_price%><br><%}%></div></div> </li><br><br><%}%></ul><br></div><br><br><div>Thanks, Iowa Air.</div></body>",data);
	console.log(html)
	var emailm={
		from:'"IowaAir" <iowaairsystem@gmail.com>',
		to:email,
		subject:'thank you for booking',
		text:text,
		html:html
	}
	mailer.sendMail(emailm);
}
function sendEmail(req,res,args){
	args.trips=[];
	sql.getTrip1(args.t.flightids[0], args.t.passengers.length, req, res, function(err,req,res,args){console.log("%$GTG$F%$GGB%$G%VRH$%G$%G$G%$%G$")}, esucc, args);
}
function esucc(rows,req,res,args){
	var trip=dq2t1(rows[0])
	
    if (args.t.classes[args.trips.length]=="ec"){
		trip.has_ec=true;
		trip.has_fc=false;
    }
    else if(args.t.classes[args.trips.length]=="fc"){
		trip.has_ec=false;
		trip.has_fc=true;
    }
	args.trips=args.trips.concat([trip])
	if(args.t.flightids.length!=args.trips.length){
		sql.getTrip1(args.t.flightids[args.trips.length], args.t.passengers.length, req, res, function(err,req,res,args){console.log("%$GTG$F%$GGB%$G%VRH$%G$%G$G%$%G$")}, esucc, args);
	}
	else{
		makeEmail(args.transID,args.t.passengers.length,args.trips,req.session.user.email,req.session.user.fname+" "+req.session.user.lname);
	}
}
module.exports={
    bookrender:bookrender,
    bookit:bookit
}