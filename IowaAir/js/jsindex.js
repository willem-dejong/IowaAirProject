var jspath=require("./jspath")
var mysql=require(jspath.modpath()+'mysql');
function indexRender(req,res){
	if(!req.session.user){
		req.session.user={fname:"",lname:"",email:"",passw:"",type:"G"};
	}
	console.log(req.session.user)
    var connection=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306",dateString:"date"});
    connection.connect();
    connection.query('SELECT * FROM iowaair.airports;', function (err, rows, fields) {
        if (err){
        		console.log(err);
        		connection.end();
        		return null;
        	}
        else if (req.session.user.type!="G"){
        		var inn="SELECT idaccount,email,fname,lname,account_type,password from iowaair.account where email=? and password=?;"
    			var args=[req.session.user.email,req.session.user.passw];
    			connection.query(inn,args,function(err,rows2,feilds){
        			if (err) {
    					connection.end();
    					console.log(err);
    					return null;
    				}
        			else if (rows2.length!=0){
        				var row=rows2[0];
        				req.session.user={fname:row.fname,lname:row.lname,email:row.email,passw:row.password,type:row.account_type};
        			}
        			else{
						req.session.user={fname:"",lname:"",email:"",passw:"",type:"G"};	
        			}
					res.render("index",{user:req.session.user,ports:rows});
    				connection.end();
    			});
        }
        else{
				res.render("index",{user:req.session.user,ports:rows});
        		connection.end();
        		return null;
		  }
    });
	//console.log(req.session);
	//console.log(req);
}
module.exports={indexRender:indexRender};