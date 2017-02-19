var mysql=require('C:\\Program Files\\nodejs\\node_modules\\mysql');
function todoubleA(rows){
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
    var s="";
    for (var i in rows){
        //console.log(rows[i]['airport']);
        s=s+ rows[i]['airport']+",";
    }
    s=s.substring(0,s.length-1);
    return s;
}
function getairports(res){
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
function getSession(res,cook){
    //console.log("getSession");
    var conn=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306"});
    conn.connect();
    var inn="select * from iowaair.session where idsession=\""+cook+"\";";
    conn.query(inn,function(err,rows,feilds){
        if (err) throw err;
        //console.log(rows);
        s=""
        for (var i in rows[0]){
            //console.log("\n");
            //console.log(i);
            //console.log(typeof i);
            //console.log(String(rows[0][i]));
            //console.log(typeof rows[0][i]);
            var ss="";
            if (rows[0][i]!=null){
                ss=i+"="
                //console.log(rows[0][i].constructor==Date);
                if(rows[0][i].constructor==Date){
                   // console.log(rows[0][i].getDate());
                    ss=ss+String(rows[0][i].getFullYear())+"-"+String(rows[0][i].getMonth())+"-"+String(rows[0][i].getDate());
                }
                else{
                    ss=ss+String(rows[0][i]);
                }
                ss=ss+";";
            }
            //console.log(ss);
            s=s+ss;
            //console.log(s);
        }
        if(s.search("idaccount=")>-1){
            var ii=s.search("idaccount=")+10;
            var iii=s.indexOf(";",ii);
            var inn="select \""+s+"\" as s,fname,account_type from iowaair.account where idaccount="+s.substring(ii,iii)+";";
            conn.query(inn,function(err,rows,feilds){
                if (err) throw err;
                row=rows[0];
                var sss=""
                for (var i in row){
                      sss=sss+i+"="+row[i]+";"
                }
                console.log(sss);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(sss);
            });
        }
        else{
            console.log(s);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end("s="+s);
        }
    });
}
function getNewSession(res){
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
}
function logout(res,cook){
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
}

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
    getNewSession:getNewSession,
    getSession:getSession,
    logout:logout
    };
