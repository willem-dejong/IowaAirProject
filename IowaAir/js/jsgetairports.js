var sql=require("./sql");
function errHandler(err,req,res,args){
	//console.log(err)
   res.writeHead(500, {'Content-Type': 'text/plain'});
   res.end();
}
function successHandler(rows,req,res,args){
   na=  rowMapper(rows);
   //console.log('The solution is: ', na) ;
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end(na);
}
function rowMapper(rows){
    //console.log("rowMapper");
    //console.log(rows);
    var s="";
    for (var i in rows){
        //console.log(rows[i]['airport']);
        s=s+ rows[i]["portid"]+";"+ rows[i]['airport']+",";
    }
    s=s.substring(0,s.length-1);
    return s;
}
function getairports(req,res){
    //console.log("getairports");
    var args={};
    sql.getairports(req,res,errHandler,successHandler,args);
}
module.exports={getairports:getairports}