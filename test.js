function createtofrombox(req,from,to,deptime,arivtime,tottime,flighttimes){
  console.log("createtofrombox");
    return "<div class='tofrombox'><br/><div class='from tofromh1'><b>"+String(from)+"</b></div><div class='mid tofromh1'><b>to</b></div><div class='to tofromh1'><b>"+String(to)+"</b></div><div class='from tofromh2'><div class='tofrom2'>"+String(deptime)+"</div></div><div class='mid tofromh2'><div class='tofrom2'><span  class='dash' onclick=\"this.parentElement.parentElement.parentElement.querySelector('.flighttimes').style.display='block';\">-</span></div></div><div class='to tofromh2'><div class='tofrom2'>"+String(arivtime)+"</div></div><div class='tofromh3'><div class=''>"+String(tottime)+"</div></div><div class='flighttimes'><span class='close' onclick=\"this.parentElement.style.display=\'none\';\">&times</span><br/>"+String(flighttimes)+"</div></div>";
}
function createflights(req,stops,fpath,planes){
  console.log("createflights");
    return "<div class='flights'><br/><div class='numstops'><b>"+String(stops)+" stops</b></div><div class='indstops'>"+String(fpath)+"<br/>"+String(planes)+"</div></div>";
}
function createbookit(req,price){
  console.log("createbookit");
    //figure out booklink from req? will need to create link based off session.
    var booklink=""
    return "<div class='bookit'><div class='price'><b>$"+String(price)+"</b><br/><a href='"+String(booklink)+"'>Book</a></div></div>";
}
function createresultitem(req,from,to,deptime,arivtime,tottime,flighttimes,stops,fpath,planes,price){
    console.log("createresultitem");
    return "<li class='resultitem'>"+createtofrombox(req,from,to,deptime,arivtime,tottime,flighttimes)+createflights(req,stops,fpath,planes)+createbookit(req,price)+"</li>";
}
function createresultlist(req,ticklist){
    console.log("createresultlist");
    s="<ul id='resultlist'>";
    for (var tick in ticklist){
        s=s+createresultitem(req,ticklist[tick][0],ticklist[tick][1],ticklist[tick][2],ticklist[tick][3],ticklist[tick][4],ticklist[tick][5],ticklist[tick][6],ticklist[tick][7],ticklist[tick][8],ticklist[tick][9]);
        }
    s=s+"</ul>" ;
    return s;
}
function createresulthtml(req,ticklist){
    console.log("createresulthtml");
    s="<!DOCTYPE HTML><html><head><title>IowaAir</title><link rel='stylesheet' href='/css/homestyle.css' type='text/css'></head><body><div id='hdr'><div id='home' ><a id='homel' href='localhost'><img id='logo' src='/img/lolo.png' ></img>Home</a></div><div id='log'><a href='#$#login$#$'>login</a>/<a href='#$#reg$#$'>register</a></div></div><div id='main'><br/><br/><div id='result'><div id='resulthdr'><div id='restext'>Results</div><div id='order'><label for='orderby'>Order By</label><select name='orderby' id='orderby' onchange=''><option value='price'>Price</option><option value='stops'>Num. of stops</option><option value='flight time'>Flight time</option><option value='depart time'>depart time</option><option value='arrive time'>arrival time</option></select></div></div>";
    s+= createresultlist(req,ticklist);
    s+="</div></div></body></html>";
    return s;
}
function getFlights(origin,destination,date,pass){
    //modify to query database and calc price
    return [["CID","ORD","4:00 pm","5:00 pm","46","5:00-6:00\n6:30-7:30","1","CID-CHI-ORD","dgfsdgdg\ndsfsdfdssd","1000.00"],["CID","ORD","4:00 pm","5:00 pm","46","5:00-6:00\n6:30-7:30","1","CID-CHI-ORD","dgfsdgdg\ndsfsdfdssd","1000.00"]]

}
function flightsOneWay(req,res,args){
    res.writeHead(200, {'Content-Type': 'text/html'});
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
    console.log(oi,oii,di,dii,dai,daii,pi,pii);
    var s=createresulthtml(req,getFlights(args.substring(oi,oii),args.substring(di,dii),args.substring(dai,daii),args.substring(pi,pii)));
    res.end(s);
}
function flights(req,res,args){
    console.log("flights")  ;
    var s="";
    if  (args.search("date2=[0-9\-]+")>=0){

    }
    else if (args.search("org=[a-z0-9\-]+")>=0&&args.search("dest=[a-z0-9\-]+")>=0&&args.search("date=[0-9\-]+")>=0&&args.search("pass=[0-9]+")>=0){
        flightsOneWay(req,res,args);
    }
}
function switchURL(req,res,url){
    console.log("switchURL");
    if (url.substring(0,10)=="//flights?"){
       flights(req,res,url.substring(10));
    }
    else{
        //change this to a 404 err
         console.log('plplpl');
    }
}
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
  var sss=req.url;
  console.log(sss);
  switchURL(req,res,sss)
  //if (sss.search('//flights')>=0){
	//sss= createresulthtml(req,[["CID","ORD","4:00 pm","5:00 pm","46","5:00-6:00\n6:30-7:30","1","CID-CHI-ORD","dgfsdgdg\ndsfsdfdssd","1000.00"],["CID","ORD","4:00 pm","5:00 pm","46","5:00-6:00\n6:30-7:30","1","CID-CHI-ORD","dgfsdgdg\ndsfsdfdssd","1000.00"]]);
//}
//else{
	//console.log('plplpl');
//}
//console.log(sss);
  //res.end(sss);

}).listen(8000, '127.0.0.1');