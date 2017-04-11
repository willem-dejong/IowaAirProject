var mysql=require('C:\\Program Files\\nodejs\\node_modules\\mysql');
/*function todoubleA(rows){
    console.log("todoubleA");
    var na=[];
    for (var i in rows){
        var na2=[];
        for (var ii in rows[i]){
            //console.log(ii);
            na2.push(rows[i][ii]);
            //console.log(rows[i][ii]);
        }
        na.push(na2);
    }
    return na;
}*/
function p2s(rows){
    console.log("p2s");
    console.log(rows);
    var s="";
    for (var i in rows){
        //console.log(rows[i]['airport']);
        s=s+ rows[i]["portid"]+";"+ rows[i]['airport']+",";
    }
    s=s.substring(0,s.length-1);
    return s;
}
/*function p2s2(rows){
    console.log("p2s2");
    var lens=rows.length;
    console.log(lens);
    if (lens==0){return "";}
    var s="";
    for (var i in rows){
        lens=lens-1;
        var row=rows[i];
        console.log(row);
        var port1=row["port1"];
        while (port1.indexOf(",")!=-1){port1=port1.replace(",", " ");}
        var portl1=row["portl1"];
        while (portl1.indexOf(",")!=-1){portl1=portl1.replace(",", " ");}
        var port2=row["port2"];
        while (port2.indexOf(",")!=-1){port2=port2.replace(",", " ");}
        var portl2=row["portl2"];
        while (portl2.indexOf(",")!=-1){portl2=portl2.replace(",", " ");}
        var time1=row["departure_time"];
        //console.log("##########",time1,time1.getMonth(),time1.getDate())
        var time2=row["arrival_time"];
        //console.log("##########",String(time2),time2.getMonth(),time2.getDate())
        var tothr=Math.floor((time2-time1)/3600000);
        var totmin=Math.floor(((time2-time1)%3600000)/60000);
        //console.log(typeof time1);
        var yr1=time1.getFullYear();
        var mth1=time1.getMonth()+1;
        if(mth1<10){
            mth1="0"+String(mth1);
        }
        var dy1=time1.getDate();
        if(dy1<10){
            dy1="0"+String(dy1);
        }
        var hr1=time1.getHours();
        var hr1a=time1.getHours();
        if(hr1<10){
            hr1="0"+String(hr1);
        }
        var aop1="AM";
        if (hr1a>=12){
            aop1="PM";
            if(hr1a!=12){
                hr1a=hr1a-12;
            }
        }
        else if(hr1a==0){hr1a=12;}
        var min1=time1.getMinutes();
        if(min1<10){
            min1="0"+String(min1);
        }
        var yr2=time2.getFullYear();
        var mth2=time2.getMonth()+1;;
        if(mth2<10){
            mth2="0"+String(mth2);
        }
        var dy2=time2.getDate();
        if(dy2<10){
            dy2="0"+String(dy2);
        }
        var hr2=time2.getHours();
        var hr2a=time2.getHours();
        if(hr2<10){
            hr2="0"+String(hr2);
        }
        var aop2="AM";
        if (hr2a>=12){
            aop2="PM";
            if(hr2a!=12){
                hr2a=hr2a-12;
            }
        }
        else if(hr2a==0){hr2a=12;}
        var min2=time2.getMinutes();
        if(min2<10){
            min2="0"+String(min2);
        }
        s=s+row["origin_port"];
        s=s+";"+row["destined_port"];
        s=s+";"+port1+". "+portl1+";";
        s=s+port2+". "+portl2+";";
        s=s+String(yr1)+"-"+String(mth1)+"-"+String(dy1)+" "+String(hr1)+":"+String(min1)+":00;";
        s=s+String(yr2)+"-"+String(mth2)+"-"+String(dy2)+" "+String(hr2)+":"+String(min2)+":00;";
        s=s+String(tothr)+" hrs "+String(totmin)+" mins;";
        s=s+String(hr1a)+":"+String(min1)+" "+aop1+" - "+String(hr2a)+":"+String(min2)+" "+aop2+";0;";
        s=s+row["origin_port"]+"-"+ row["destined_port"]+";";
        s=s+row["Flight_num"]+"   "+row["model"]+";";
        s=s+row["cost"]+";";
        s=s+ row["Flight_num"]+";";
        s=s+row["Gate"]+";";
        console.log(lens);
        if(lens>0){
            s=s+","
        }
    }
    console.log(s);
    return s;
}*/
function getairports(req,res,errhandler,successhandler,args){
    console.log("sqlgetairports");
    var connection=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306",dateString:"date"});
    connection.connect();
    connection.query('SELECT * FROM iowaair.airports;', function (err, rows, fields) {
    	  connection.end();
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
/*function getFlight(res,pass,fnum){
    console.log("getFlight")
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="SELECT f.origin_port, f.destined_port, ap1.airport as port1,ap1.location portl1,ap2.airport as port2,ap2.location as portl2,f.departure_time,f.arrival_time,p.model,f.cost_per_seat*? as cost,f.Flight_num,f.Gate  FROM iowaair.flights as f, iowaair.airports as ap1,iowaair.airports as ap2,iowaair.planes as p where f.plane_id=p.plane_id and f.origin_port=ap1.portid and f.destined_port=ap2.portid and f.Flight_num=?;";
    var args=[parseInt(pass),fnum];
    //console.log(inn);
    conn.query(inn,args,function(err,rows,feilds){
        if(err){ 
        		console.log(err);
        }
        else{
            //console.log(rows);
            ss=p2s2(rows);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(ss);
        }
       conn.end();
    });
}*/
/*function checklogin(req,res){
	var i=req.url.search("email=[A-Za-z0-9]");
	var i2=req.url.search("passw=[a-z0-9]+");
	if (i==-1||i2==-1||!req.session.user||req.session.user.type!="G"){
		res.writeHead(500, {'Content-Type': 'text/plain'});
		res.end("oops");
	}
	else{
		i=i+6;
		i2=i2+6;
		var ii=req.url.indexOf("&",i);
		var ii2=req.url.indexOf("&",i2);
		if(ii==-1){
			ii=req.url.length;
		}
		if(ii2==-1){
			ii2=req.url.length;
		}
		var temail=req.url.substring(i,ii);
		var tpassw=req.url.substring(i2,ii2);
		console.log("checklogin");
		console.log(tpassw);
		getLogin(temail,tpassw,req,res,args);
	}
}*/
/*function getLogin(email,passw,req,res){
	 //console.log("getLogin");
	 //console.log(passw);
	 var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="SELECT idaccount,email,fname,lname,account_type,forcePass from iowaair.account where email=? and password=?;"
    var argz=[email,passw];
    conn.query(inn,argz,function(err,rows,feilds){
    	console.log(rows)
    	if (!rows||rows.length==0){
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.end();
    	}
    	else{
    		//console.log(rows);
    		var temp=p2s3(rows[0]);
    		if(!temp[1]){
				req.session.user={fname:rows[0].fname,lname:rows[0].lname,email:rows[0].email,passw:passw,type:rows[0].account_type};
    		}
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(temp[0]);
    	}
    	conn.end();
   });
}*/
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
function updateFlights(flights,errhandler,successhandler,args){//allows for one or more row updates but not as safe to do more than one row at a time.
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
}
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
function addFlights(flights,req,res,errhandler,successhandler,args){
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
}
//getLogin("cswdejong@gmail.com","f3c2f0a0c08e2f7a82c92ae64a836cf5");
//getFlights("ORD","CID","2017-7-12",2);
/*var connection=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
connection.connect();
connection.query('SELECT * FROM iowaair.flights;', function (err, rows, fields) {
    if (err) throw err;
    na=  todoubleA(rows);
    console.log('The solution is: ', na) ;
});

connection.end();*/
module.exports={
    getairports:getairports,
    //getNewSession:getNewSession,
    //getSession:getSession,
    //logout:logout,
    updatepass:updatepass,
    getLogin:getLogin,
    getFlights1:getFlights1,
    getFlights2:getFlights2,
    getFlights3:getFlights3,
    addPlane:addPlane,
    searchPlanes:searchPlanes,
    updatePlane:updatePlane
    //getFlight:getFlight
    };
