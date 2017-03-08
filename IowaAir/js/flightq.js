var sql=require('./sql');
function flightsParse1(res,args){
    //console.log("flightsParse1");
    var oi=args.search("org=")+4;
    var oii=args.indexOf("&",oi) ;
    var di= args.search("dest=")+5;
    var dii=args.indexOf("&",di) ;
    var dai=args.search("date=")+5;
    var daii=args.indexOf("&",dai);
    var pi=args.search("pass=")+5;
    var pii=args.indexOf("&",pi) ;
    if (oii==-1){
            oii=args.length;
    }
    if (dii==-1){
                dii=args.length;
    }
    if (daii==-1){
                daii=args.length;
    }
    if (pii==-1){
                pii=args.length;
    }
    //console.log(oi,oii,di,dii,dai,daii,pi,pii);
    var org=args.substring(oi,oii);
    while (org.indexOf("+")>-1){
        org=org.replace("+"," ");
    }
    var dest=args.substring(di,dii);
    while (dest.indexOf("+")>-1){
        dest=dest.replace("+"," ");
    }
    var date=args.substring(dai,daii);
    var pass=args.substring(pi,pii);
    //console.log(org,dest,date,pass);
    sql.getFlights(res,org,dest,date,pass)
}
function flightsParse2(res,arg){
    console.log("flightsParse2");
    console.log(arg)
    var i=arg.indexOf("fnum=")+5;
    if (i==4){
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end();
    }
    var ii= arg.indexOf("&",i);
    var iii=arg.indexOf("pass=")+5;
    if (iii==4){
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end();
    }
    var iv=arg.indexOf("&",i);
    if(ii==-1){
        ii=arg.length;
    }
    if(iv==-1){
        iv=arg.length;
    }
    var fnum=arg.substring(i,ii);
    var pass=arg.substring(iii,iv);
    //var prevtime= arg.substring(v,vi);
    //var date= arg.substring(vii,viii);
    sql.getFlight(res,pass,fnum);
}
function flights(req,res,args){
    console.log("flights");
    var i=args.search("fnum=");
     if (i>-1){
         flightsParse2(res,args);
     }
     else{
        flightsParse1(res,args) ;
     }
}

module.exports={
       flights:flights
       };