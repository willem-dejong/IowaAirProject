var jspath=require("./jspath")
var mysql=require(jspath.modpath()+'mysql');

function getmodels(req,res,errh,succh,args){
    console.log("getmodels");
    var connection=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306",dateString:"date"});
    connection.connect();
    connection.query('SELECT distinct model FROM iowaair.planes;', function (err, rows, fields) {
    	  connection.end();
        if (err){
        		errh(err,req,res,args);
        } 
        else{
        		succh(rows,req,res,args);
        }
    });
}
function getairports(req,res,errhandler,successhandler,args){
    console.log("getairports");
    var connection=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306",dateString:"date"});
    connection.connect();
    connection.query('SELECT * FROM iowaair.airports;', function (err, rows, fields) {
    	  connection.end();
			console.log(successhandler)
        if (err){
        		errhandler(err,req,res,args);
        } 
        else{
        		successhandler(rows,req,res,args);
        }
    });
}
function test(){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
 	conn.connect();
 	inn="call iowaair.new_procedure();"
 	argz=[new Date]
   conn.query(inn,argz,function(err,rows,fields){
   	  conn.end();
       if (err){
       		//errhandler(err,req,res,args);
       } 
       else{
       		//successhandler(rows,req,res,args);
       		console.log(rows)
       }
   });
	
}
//test()
function getFlights1(org,dest,date,pass,req,res,errhandler,successhandler,args){
    //console.log("getFlights")
    args.org=org;
    args.dest=dest;
    args.date=date;
    args.pass=pass;
    console.log("Args",org,dest,date,pass)
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="call iowaair.getFlights1(?,?,?,?);"
    //var inn="SELECT f.origin_port, f.destined_port, ap1.airport as port1,ap1.location portl1,ap2.airport as port2,ap2.location as portl2,f.departure_time,f.arrival_time,p.model,f.cost_per_seat*? as cost,f.Gate  FROM iowaair.flights as f, iowaair.airports as ap1,iowaair.airports as ap2,iowaair.planes as p where f.plane_id=p.plane_id and f.origin_port=ap1.portid and f.destined_port=ap2.portid and date(f.departure_time)= ? and f.origin_port=? and f.destined_port=? and f.seats_available>=?;";
    //console.log(inn)
    var argz=[pass,org,dest,date];
    //console.log(inn);
    conn.query(inn,argz,function(err,rows,feilds){
    	  conn.end();
        if (err){
        		errhandler(err,req,res,args);
        } 
        else{
        		successhandler(rows[0],req,res,args);
        		//console.log(rows)
        }
    });
}
//getFlights1("ORD","CID",new Date(2017,6,12,7,45),1)
function getFlights2(org,dest,date,pass,req,res,errhandler,successhandler,args){
    args.org=org;
    args.dest=dest;
    args.date=date;
    args.pass=pass;
    //console.log("getFlights")
    console.log("Args",org,dest,date,pass)
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="call iowaair.getFlights2(?,?,?,?);"
    //var inn="SELECT f.origin_port, f.destined_port, ap1.airport as port1,ap1.location portl1,ap2.airport as port2,ap2.location as portl2,f.departure_time,f.arrival_time,p.model,f.cost_per_seat*? as cost,f.Gate  FROM iowaair.flights as f, iowaair.airports as ap1,iowaair.airports as ap2,iowaair.planes as p where f.plane_id=p.plane_id and f.origin_port=ap1.portid and f.destined_port=ap2.portid and date(f.departure_time)= ? and f.origin_port=? and f.destined_port=? and f.seats_available>=?;";
    //console.log(inn)
    var argz=[pass,org,dest,date];
    //console.log(inn);
    conn.query(inn,argz,function(err,rows,feilds){
    	  conn.end();
        if (err){
        		errhandler(err,req,res,args);
        } 
        else{
        		successhandler(rows[0],req,res,args);
        		//console.log(rows)
        }
    });
}
function getFlights3(org,dest,date,pass,req,res,errhandler,successhandler,args){
    args.org=org;
    args.dest=dest;
    args.date=date;
    args.pass=pass;
    //console.log("getFlights")
    console.log("Args",org,dest,date,pass)
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="call iowaair.getFlights3(?,?,?,?);"
    //var inn="SELECT f.origin_port, f.destined_port, ap1.airport as port1,ap1.location portl1,ap2.airport as port2,ap2.location as portl2,f.departure_time,f.arrival_time,p.model,f.cost_per_seat*? as cost,f.Gate  FROM iowaair.flights as f, iowaair.airports as ap1,iowaair.airports as ap2,iowaair.planes as p where f.plane_id=p.plane_id and f.origin_port=ap1.portid and f.destined_port=ap2.portid and date(f.departure_time)= ? and f.origin_port=? and f.destined_port=? and f.seats_available>=?;";
    //console.log(inn)
    var argz=[pass,org,dest,date];
    //console.log(inn);
    conn.query(inn,argz,function(err,rows,feilds){
    	  conn.end();
        if (err){
        		errhandler(err,req,res,args);
        } 
        else{
        		successhandler(rows[0],req,res,args);
        		//console.log(rows)
        }
    });
}
function getMapFlights1(port1,port2,date,pass,req,res,errhandler,successhandler,args){
    //console.log("getFlights")
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="call iowaair.getMapFlights1(?,?,?,?);"
    var argz=[pass,port1,port2,date];
    conn.query(inn,argz,function(err,rows,feilds){
    	  conn.end();
        if (err){
        		errhandler(err,req,res,args);
        } 
        else{
        		successhandler(rows[0],req,res,args);
        		//console.log(rows)
        }
    });
}
function getMapFlights2(port1,port2,port3,date,pass,req,res,errhandler,successhandler,args){
    //console.log("getFlights")
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="call iowaair.getMapFlights2(?,?,?,?,?);"
    var argz=[pass,port1,port2,port3,date];
    conn.query(inn,argz,function(err,rows,feilds){
    	  conn.end();
        if (err){
        		errhandler(err,req,res,args);
        } 
        else{
        		successhandler(rows[0],req,res,args);
        		//console.log(rows)
        }
    });
}
function getMapFlights3(port1,port2,port3,port4,date,pass,req,res,errhandler,successhandler,args){
    //console.log("getFlights")
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="call iowaair.getMapFlights3(?,?,?,?,?,?);"
    var argz=[pass,port1,port2,port3,port4,date];
    conn.query(inn,argz,function(err,rows,feilds){
    	  conn.end();
        if (err){
        		errhandler(err,req,res,args);
        } 
        else{
        		successhandler(rows[0],req,res,args);
        		//console.log(rows)
        }
    });
}
function getTrip1(flightID,pass,req,res,errHandler,successHandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
   var inn="call iowaair.getTrip1(?,?);"
   var argz=[flightID,pass];
   conn.query(inn,argz,function(err,rows,feilds){
   	conn.end();
   	if (err){
   		errHandler(err,req,res,args);
   	}
   	else{
   		successHandler(rows[0],req,res,args);
		}
	});
}
function getTrip2(flightID1,flightID2,pass,req,res,errHandler,successHandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
   var inn="call iowaair.getTrip2(?,?,?);"
   var argz=[flightID1,flightID2,pass];
   conn.query(inn,argz,function(err,rows,feilds){
   	conn.end();
   	if (err){
   		errHandler(err,req,res,args);
   	}
   	else{
   		successHandler(rows[0],req,res,args);
		}
	});
}
function getTrip3(flightID1,flightID2,flightID3,pass,req,res,errHandler,successHandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
   var inn="call iowaair.getTrip3(?,?,?,?);"
   var argz=[flightID1,flightID2,flightID3,pass];
   conn.query(inn,argz,function(err,rows,feilds){
   	conn.end();
   	if (err){
   		errHandler(err,req,res,args);
   	}
   	else{
   		successHandler(rows[0],req,res,args);
		}
	});
}
/*function incbook(rows,argzs,req,res,successHandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
   conn.query("call iowaair.incbook(?,?,?);",argzs.pop(),function(err,rows2,feilds){
   	conn.end();
   	if (err){
   		console.log(err)
   	}
   	else{
   		if(argzs.length>0){
   			incbook(rows,argzs,req,res,successHandler,args)
   		}
   		else{
   			successHandler(rows,req,res,args);
   		}
		}
	});
}*/
function reserve(passengers,flightIDs,classes,req,res,errHandler,successHandler,args){
    console.log(passengers)
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
   inn="select "
   inns=[]
   argzs=[]
   var cnt=0;
   argz=[]
   for(var i in flightIDs){
   	for(var ii in passengers){
   		if(cnt>0){
   			inn=inn+", ";
   		}
   		cnt+=1//(select idaccount from iowaair.account where email=? and password=? limit 1)req.session.user.email,req.session.user.passw,
   		inn=inn+"iowaair.intoRes(f.a,?,?,?,?,f.b,?,?) as a"+String(cnt);
   		argz=argz.concat([passengers[ii].fname,passengers[ii].lname,passengers[ii].dob,passengers[ii].gender,flightIDs[i],classes[i]])
   	}
   	//inns.push("call iowaair.incbook(?,?,?);")
   	//argzs.push([flightIDs[i],passengers.length,classes[i]])
   }
   inn=inn+" from (select iowaair.intoTran(1) as a, idaccount as b from iowaair.account where email=? and password=? limit 1) as f;"
   argz=argz.concat([req.session.user.email,req.session.user.passw]);
	console.log(inn)
   //argz=argz.concat(argz2);
   conn.query(inn,argz,function(err,rows,feilds){
   	conn.end();
   	if (err){
   	console.log(err)
   		errHandler(err,req,res,args);
   	}
   	else{
   		successHandler(rows,req,res,args);
   		//incbook(rows,argzs,req,res,successHandler,args);
		}
	});
}
function getLogin(temail,topassw,req,res,errHandler,successHandler,args){
	//console.log("getLogin")
	args.temail=temail;
	args.topassw=topassw;
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
   var inn="SELECT * from iowaair.account where email=? and password=?;"
   var argz=[temail,topassw];
   conn.query(inn,argz,function(err,rows,feilds){
   	conn.end();
   	if (err){
   		errHandler(err,req,res,args);
   	}
   	else{
   		successHandler(rows,req,res,args);
		}
	});
	//console.log("getLogin end")
}
function updatepass(temail,topassw,tnpassw,req,res,errhandler,successhandler,args){
	args.temail=temail;
	args.topassw=topassw;
	args.tnpassw=tnpassw;
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	inn="update iowaair.account set password=?,forcePass=0 where email=? and password=?;"
	argz=[tnpassw,temail,topassw];
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows,req,res,args);
		}
	});
}
function updatePlane(pid,model,ecnum,fcnum,req,res,errhandler,successhandler,args){
	inn="UPDATE `iowaair`.`planes` SET `model`=?, ec_num_seats=?,fc_num_seats=? WHERE `plane_id`=?;"
	argz=[model,ecnum,fcnum,pid]
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows,req,res,args);
		}
	});
}
function searchPlanes(plane_id,model,ec_num_seats,fc_num_seats,req,res,errhandler,successhandler,args){
	inn="select * from iowaair.planes";
	argz=[]
	b=false;
	args.plane_id=plane_id;
	args.model=model;
	args.fcs=fc_num_seats;
	args.ecs=ec_num_seats;
	var where="";
	if (plane_id ||model||ec_num_seats||fc_num_seats){
		where=where+" where"
	}
	if (plane_id){
		argz.push(plane_id)
		if (b){
			where=where+" and";
		}
		where=where+" plane_id=?"
		b=true
	}
	if (model){
		argz.push(model)
		if (b){
			where=where+" and";
		}
		where=where+" model=?"
		b=true
	}
	if (ec_num_seats){
		argz.push(ec_num_seats)
		if (b){
			where=where+" and";
		}
		where=where+" ec_num_seats=?"
		b=true
	}
	if (fc_num_seats){
		argz.push(fc_num_seats)
		if (b){
			where=where+" and";
		}
		where=where+" fc_num_seats=?"
		b=true
	}
	if (b){
		inn=inn+where;
	}
	inn=inn+";";
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows,req,res,args);
		}
	});
}
function searchFligths(id,fnum,dep,arv,ecsa,ecsb,eccps,fcsa,fcsb,fccps,am,org,dest,g,req,res,errhandler,successhandler,args){
	inn="select f.*,p.model, f.flightID in (select ff.flightID from iowaair.flights as ff, iowaair.reservations as rr where rr.flightID=ff.flightID) as booked from iowaair.planes as p, iowaair.flights as f where f.plane_id=p.plane_id";
	argz=[]
	b=true;
	var where="";
	if (id){
		argz.push(id)
		if (b){
			where=where+" and";
		}
		where=where+" f.flightID=?"
		b=true
	}
	if (fnum){
		argz.push(fnum)
		if (b){
			where=where+" and";
		}
		where=where+" f.Flight_num=?"
		b=true
	}
	if (dep){
		argz.push(dep)
		if (b){
			where=where+" and";
		}
		where=where+" date(f.departure_time)=date(?)"
		b=true
	}
	if (arv){
		argz.push(arv)
		if (b){
			where=where+" and";
		}
		where=where+" date(f.arrival_time)=date(?)"
		b=true
	}
	if (ecsa||ecsa==0){
		argz.push(ecsa)
		if (b){
			where=where+" and";
		}
		where=where+" f.ec_seats_available=?"
		b=true
	}
	if (ecsb||ecsb==0){
		argz.push(ecsb)
		if (b){
			where=where+" and";
		}
		where=where+" f.ec_seats_booked=?"
		b=true
	}
	if (eccps||eccps==0){
		argz.push(eccps)
		if (b){
			where=where+" and";
		}
		where=where+" f.ec_cost_per_seat=?"
		b=true
	}
	if (fcsa||fcsa==0){
		argz.push(fcsa)
		if (b){
			where=where+" and";
		}
		where=where+" f.fc_seats_available=?"
		b=true
	}
	if (fcsb||fcsb==0){
		argz.push(fcsb)
		if (b){
			where=where+" and";
		}
		where=where+" f.fc_seats_booked=?"
		b=true
	}
	if (fccps||fccps==0){
		argz.push(fccps)
		if (b){
			where=where+" and";
		}
		where=where+" f.fc_cost_per_seat=?"
		b=true
	}
	if (am){
		argz.push(am)
		if (b){
			where=where+" and";
		}
		where=where+" p.model=?"
		b=true
	}
	if (org){
		argz.push(org)
		if (b){
			where=where+" and";
		}
		where=where+" f.origin_port=?"
		b=true
	}
	if (dest){
		argz.push(dest)
		if (b){
			where=where+" and";
		}
		where=where+" f.destined_port=?"
		b=true
	}
	if (g){
		argz.push(g)
		if (b){
			where=where+" and";
		}
		where=where+" f.Gate=?"
		b=true
	}
	if (b){
		inn=inn+where;
	}
	inn=inn+";";
	console.log(inn)
	console.log(argz)
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows,req,res,args);
		}
	});
}
/*function updateFlights(flights,errhandler,successhandler,args){//allows for one or more row updates but not as safe to do more than one row at a time.
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
   inn=""
   argz=[];
   for (i in flights){
		inn=inn+"update iowaair.flights set Flight_num=?,departure_time=?,arrival_time=?,origin_port=?,destined_port=?,plane_id=?,gate=?,ec_seats_available=?,ec_seats_booked=?,ec_cost_per_seat=?,fc_seats_available=?,fc_seats_booked=?,fc_cost_per_seat=? where flightID=?;\n"
		argz=argz.concat([flights[i].Flight_num,flights[i].departure_time,flights[i].arrival_time,flights[i].origin_port,flights[i].destined_port,flights[i].plane_id,flights[i].gate,flights[i].ec_seats_available,flights[i].ec_seats_booked,flights[i].ec_cost_per_seat,flights[i].fc_seats_available,flights[i].fc_seats_booked,flights[i].fc_cost_per_seat,flights[i].flightID])
	}
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows,req,res,args);
		}
	});
}*/
function addPlane(model,ecnum,fcnum,req,res,errhandler,successhandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	inn="insert into iowaair.planes(model,ec_num_seats,fc_num_seats) values(?,?,?);"
	argz=[model,ecnum,fcnum];
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows,req,res,args);
		}
	});
}
//updateFlights([{Flight_num:"3rddw",departure_time:new Date(),arrival_time:"2017-07-12 08:45:00",origin_port:"ORD",destined_port:"CID",plane_id:"d33sj",gate:null,ec_seats_available:100,ec_seats_booked:40,ec_cost_per_seat:500,fc_seats_available:25,fc_seats_booked:15,fc_cost_per_seat:1000,flightID:1}]);
/*function addFlights(flights,req,res,errhandler,successhandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	inn="insert into iowaair.flights (Flight_num,departure_time,arrival_time,origin_port,destined_port,plane_id,gate,ec_seats_available,ec_seats_booked,ec_cost_per_seat,fc_seats_available,fc_seats_booked,fc_cost_per_seat) values "
	var x=1
	inn=inn+"(?,?,?,?,?,?,?,?,?,?,?,?,?)"
	argz=flights[0]
	while (flights.length>x){
		argz=argz.concat(flights[x]);
		inn=inn+",(?,?,?,?,?,?,?,?,?,?,?,?,?)";
		x=x+1;
	}
	inn=inn+";";
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows,req,res,args);
		}
	});
}*/
//function getAvailPlane(d1,d2,model,req,res, errhandler,successhandler,args)
function addFlight(fnum,dep,arv,ecsa,ecsb,eccps,fcsa,fcsb,fccps,am,org,dest,g,inter,interType,numTime,req,res, errhandler,successhandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
	conn.connect();
	inn="call iowaair.addFlight(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
	argz=[fnum,dep,arv,ecsa,ecsb,eccps,fcsa,fcsb,fccps,am,org,dest,g,inter,interType,numTime];
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows,req,res,args);
		}
	});
}
function updateFlight(id,fnum,dep,arv,ecsa,ecsb,eccps,fcsa,fcsb,fccps,am,org,dest,g,req,res, errhandler,successhandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	inn="call iowaair.updateFlight(?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
	argz=[id,fnum,dep,arv,ecsa,ecsb,eccps,fcsa,fcsb,fccps,am,org,dest,g];
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows,req,res,args);
		}
	});
}
function getPassengers(id,req,res, errhandler,successhandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	inn="call iowaair.getPassengers(?);"
	argz=[id];
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows[0],req,res,args);
		}
	});
}
function getPassengers2(e,p,req,res, errhandler,successhandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	inn="call iowaair.getPassengers2(?,?);"
	argz=[e,p];
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows[0],req,res,args);
		}
	});
}
function getPassenger(id,req,res, errhandler,successhandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	inn="call iowaair.getPassenger(?);"
	argz=[id];
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows[0],req,res,args);
		}
	});
}
function cancel(id,req,res, errhandler,successhandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
   inn = "call iowaair.cancel(?);"
	argz=[id];
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows,req,res,args);
		}
	});
}
function cancel2(id,e,p,req,res, errhandler,successhandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	inn="call iowaair.cancel2(?,?,?);"
	argz=[id,e,p];
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows[0],req,res,args);
		}
	});
}
function checkin(id,bags,req,res, errhandler,successhandler,args){
	var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
   conn.connect();
	inn="call iowaair.checkin(?,?);"
	argz=[id,bags];
	conn.query(inn,argz,function(err,rows,feilds){
		conn.end();
    	if (err){
    		errhandler(err,req,res,args);
    	}
    	else{
    		successhandler(rows,req,res,args);
		}
	});
}
module.exports={
    getairports:getairports,
    getPassengers:getPassengers,
    getPassengers2:getPassengers2,
    getPassenger:getPassenger,
    cancel:cancel,
    cancel2:cancel2,
    checkin:checkin,
    updatepass:updatepass,
    getLogin:getLogin,
    getFlights1:getFlights1,
    getFlights2:getFlights2,
    getFlights3:getFlights3,
    getMapFlights1:getMapFlights1,
    getMapFlights2:getMapFlights2,
    getMapFlights3:getMapFlights3,
    getTrip1:getTrip1,
    getTrip2:getTrip2,
    getTrip3:getTrip3,
    addPlane:addPlane,
    addFlight:addFlight,
    searchPlanes:searchPlanes,
    searchFligths:searchFligths,
    updatePlane:updatePlane,
    updateFlight:updateFlight,
    getmodels:getmodels,
    reserve:reserve
    //getFlight:getFlight
    };
