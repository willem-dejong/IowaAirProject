var flightq=require('./flightq');
var sql=require('./sql');
function updatelastpage(lastpagearg){
    var i=lastpagearg.search("updatelastpage=")+15;
    url=lastpagearg.substring(0,lastpagearg.length);
    sql.updatelastpage(url);
}
function switchURL(req,res,url){
    console.log("switchURL");
    if (url.substring(0,10)=="//flights?"){
       flightq.flights(req,res,url.substring(10));
    }
    else if(url=="//getports"){
        sql.getairports(res);
    }
    else if(url=="//getnewsession"){
        sql.getNewSession(res);
    }
    else if(url.search("//autologin\\?cookie=[A-Za-z0-9]+")>-1){
        var cook= url.substring(19,url.length);
        sql.getSession(res,cook);
        if(url.search("updatelastpage=.+"))
    }
    else if(url.search("//logout\\?cookie=[A-Za-z0-9]+")>-1){
        var cook= url.substring(16,url.length);
        sql.logout(res,cook);
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end();
        console.log('404');
    }
}
var http = require('http');
http.createServer(function (req, res) {
    var sss=req.url;
    console.log(sss);
    switchURL(req,res,sss);
    //if (sss.search('//flights')>=0){
    //sss= createresulthtml(req,[["CID","ORD","4:00 pm","5:00 pm","46","5:00-6:00\n6:30-7:30","1","CID-CHI-ORD","dgfsdgdg\ndsfsdfdssd","1000.00"],["CID","ORD","4:00 pm","5:00 pm","46","5:00-6:00\n6:30-7:30","1","CID-CHI-ORD","dgfsdgdg\ndsfsdfdssd","1000.00"]]);
//}
//else{
    //console.log('plplpl');
//}
//console.log(sss);
    //res.end(sss);

}).listen(8000, '127.0.0.1');