var mysql=require('C:\\Program Files\\nodejs\\node_modules\\mysql');
function todoubleA(rows){
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
}
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
function p2s2(rows){
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
}
function p2s3(rows,req,res,passw){
	row=rows[0];
	//"email="+email+";fname="+first name+";lname="+last name+";type="+account type+";accountid="+account_id+";forcepw="+ force passchange+";"
	s="email="+row.email+";accountid="+String(row.idaccount)+";fname="+row.fname+";lname="+row.lname+";type="+row.account_type+";forcepw=";
	if(row.forcePass){
		s=s+"true;";
	}	
	else{
		req.session.user={fname:row.fname,lname:row.lname,email:row.email,passw:passw,type:row.account_type};
		s=s+"false;";
	}
	console.log(s);
	return s;
}
function getairports(res){
    console.log("getairports");
    var connection=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306",dateString:"date"});
    connection.connect();
    connection.query('SELECT * FROM iowaair.airports;', function (err, rows, fields) {
        if (err) throw err;
        //console.log(rows);
        na=  p2s(rows);
        console.log('The solution is: ', na) ;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(na);
    });
    connection.end();
}
/*function getNewSession(res){
    console.log("getNewSession")
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    //console.log("getNewSession")
    conn.connect();
    //console.log("getNewSession")
    conn.query("select max(idsession) as max from iowaair.session;",function(err,rows,feilds){
        if (err) throw err;
        //console.log("getNewSession")
        max=rows[0]['max'];
        if (max==null){
            max=0;
        }
        else{
            max=max+1;
        }
        console.log(max);
        var ins="insert into iowaair.session (idsession,lastpage,date) values("+String(max)+",\"localhost\",CURDATE());";
        console.log("insert") ;
        conn.query(ins,function(err,rows,feilds){
            if (err){
                console.log("error");
                conn.end();
                //haven't tested this but ment for concurency, like when the insert fails try again, but worried about the recursive nature have no way currently to test(don't have a system for that)
                getNewSession(res);
            }
            else{
                console.log("success");
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end("IOWAAIRSESSION="+String(max)+";path=/");
                conn.end();
            }
        });
        console.log("end") ;
    });
}*/
/*function logout(res,cook){
    console.log("logout")
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="update iowaair.session set idaccount=NULL where idsession="+String(cook)+";";
    console.log(inn);
    conn.query(inn,function(err,rows,feilds){
        if(err){
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end("failure");
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end("sucsess");
        }
    });
}*/
function getFlights(res,org,dest,date,pass){
    //console.log("getFlights")
    console.log("Args",org,dest,date,pass)
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="SELECT f.origin_port, f.destined_port, ap1.airport as port1,ap1.location portl1,ap2.airport as port2,ap2.location as portl2,f.departure_time,f.arrival_time,p.model,f.cost_per_seat*? as cost,f.Flight_num,f.Gate  FROM iowaair.flights as f, iowaair.airports as ap1,iowaair.airports as ap2,iowaair.planes as p where f.plane_id=p.plane_id and f.origin_port=ap1.portid and f.destined_port=ap2.portid and date(f.departure_time)= ? and f.origin_port=? and f.destined_port=? and f.seats_available>=?;";
    //console.log(inn)
    var args=[parseInt(pass),date,org,dest,parseInt(pass)];
    //console.log(inn);
    conn.query(inn,args,function(err,rows,feilds){
        if(err){ throw err;
        }
        else{
            //console.log(rows);
            ss=p2s2(rows);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(ss);
        }
        conn.end();
    });
}
function getFlights2(res,org,dest,date,pass){
    console.log("getFlights")
    /*var lst=prevtime.split(":");
    var hr=parseInt(lst[0]);
    if (lst[2]=="PM"){
        hr=hr+12;
    }
    if (hr==12 &&lst[2]=="AM"){
        hr="00";
    }
    var ptime=String(hr)+":"+lst[1]+":00";
    console.log(ptime)
    var pdatetime=date+" "+ptime;*/
    console.log("Args",org,dest,date,pass)
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="SELECT f.origin_port, f.destined_port, ap1.airport as port1,ap1.location portl1,ap2.airport as port2,ap2.location as portl2,f.departure_time,f.arrival_time,p.model,f.cost_per_seat*? as cost,f.Flight_num,f.Gate  FROM iowaair.flights as f, iowaair.airports as ap1,iowaair.airports as ap2,iowaair.planes as p where f.plane_id=p.plane_id and f.origin_port=ap1.portid and f.destined_port=ap2.portid and date(f.departure_time)= ? and f.origin_port=? and f.destined_port=? and f.seats_available>=?;";
    console.log(inn)
    var args=[parseInt(pass),date,org,dest,parseInt(pass)];
    //console.log(inn);
    conn.query(inn,args,function(err,rows,feilds){
        if(err){ throw err;
        }
        else{
            console.log(rows);
            ss=p2s2(rows);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(ss);
        }
        conn.end();
    }); //SELECT f.origin_port, f.destined_port, ap1.airport as port1,ap1.location portl1,ap2.airport as port2,ap2.location as portl2,f.departure_time,f.arrival_time,p.model,f.cost_per_seat*? as cost,f.Flight_num,f.Gate  FROM iowaair.flights as f, iowaair.airports as ap1,iowaair.airports as ap2,iowaair.planes as p where f.plane_id=p.plane_id and f.origin_port=ap1.portid and f.destined_port=ap2.portid and f.Flight_num=?;
}
function getFlight(res,pass,fnum){
    console.log("getFlight")
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="SELECT f.origin_port, f.destined_port, ap1.airport as port1,ap1.location portl1,ap2.airport as port2,ap2.location as portl2,f.departure_time,f.arrival_time,p.model,f.cost_per_seat*? as cost,f.Flight_num,f.Gate  FROM iowaair.flights as f, iowaair.airports as ap1,iowaair.airports as ap2,iowaair.planes as p where f.plane_id=p.plane_id and f.origin_port=ap1.portid and f.destined_port=ap2.portid and f.Flight_num=?;";
    var args=[parseInt(pass),fnum];
    //console.log(inn);
    conn.query(inn,args,function(err,rows,feilds){
        if(err){ throw err;
        }
        else{
            //console.log(rows);
            ss=p2s2(rows);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(ss);
        }
       conn.end();
    });
}
function checklogin(req,res){
	var i=req.url.search("email=[A-Za-z0-9]");
	var i2=req.url.search("passw=[a-z0-9]+");
	if (i==-1||i2==-1){
		res.writeHead(500, {'Content-Type': 'text/plain'});
		res.end();
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
		getLogin(temail,tpassw,req,res);
	}
}
function getLogin(email,passw,req,res){
	 var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="SELECT idaccount,email,fname,lname,account_type,forcePass from iowaair.account where email=? and password=?;"
    var args=[email,passw];
    conn.query(inn,args,function(err,rows,feilds){
    	if (rows.length==0){
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.end();
    	}
    	else{
    		console.log(rows);
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(p2s3(rows,req,passw));
    	}
    	conn.end();
   });
}
function updatepass(req,res){
	var i=req.url.search("email=[A-Za-z0-9]");
	var i2=req.url.search("opassw=[a-z0-9]+");
	var i3=req.url.search("npassw=[a-z0-9]+");
	if (i==-1||i2==-1||i3==-1){
		res.writeHead(500, {'Content-Type': 'text/plain'});
		res.end();
	}
	else{
		i=i+6;
		i2=i2+7;
		i3=i3+7;
		var ii=req.url.indexOf("&",i);
		var ii2=req.url.indexOf("&",i2);
		var ii3=req.url.indexOf("&",i3);
		if(ii==-1){
			ii=req.url.length;
		}
		if(ii2==-1){
			ii2=req.url.length;
		}
		if(ii3==-1){
			ii3=req.url.length;
		}
		var temail=req.url.substring(i,ii);
		var topassw=req.url.substring(i2,ii2);
		var tnpassw=req.url.substring(i3,ii3);
		var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
	    conn.connect();
	    var inn="SELECT * from iowaair.account where email=? and password=?;"
	    var args=[temail,topassw];
	    conn.query(inn,args,function(err,rows,feilds){
	    	if (err||rows.length==0){
					res.writeHead(200, {'Content-Type': 'text/plain'});
					res.end("false");
	    	}
	    	else{
	    		var row=rows[0];
	    		inn="update iowaair.account set password=?,forcePass=0 where email=? and password=?;"
	    		args=[tnpassw,temail,topassw];
	    		conn.query(inn,args,function(err,rows2,feilds){
			    	if (err){
						res.writeHead(200, {'Content-Type': 'text/plain'});
						res.end("false");
			    	}
			    	else{
						req.session.user={fname:row.fname,lname:row.lname,email:row.email,passw:tnpassw,type:row.account_type};
						res.writeHead(200, {'Content-Type': 'text/plain'});
						res.end("true");
					}
				});
			}
		});
	}
		
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
    checklogin:checklogin,
    getFlights:getFlights,
    getFlight:getFlight
    };
