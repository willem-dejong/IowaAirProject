var jspath=require("./jspath")
var mysql=require(jspath.modpath()+'mysql');
function accountRender(req,res){
	if(!req.session.user){
		res.redirect("/");
	}
	else if (req.session.user.type!="G"){
		console.log(req.session.user)
	 	var connection=mysql.createConnection({user:"admin",password:"IowaAir2017",port:"3306",dateString:"date"});
	 	connection.connect();
      var inn="SELECT * from iowaair.account where email=? and password=?;"
		var args=[req.session.user.email,req.session.user.passw];
		connection.query(inn,args,function(err,rows,feilds){
			if (err) {
			req.session.user={fname:"",lname:"",email:"",passw:"",type:"G"};
			res.redirect("/");
			connection.end();
			console.log(err);
			}
			else if (rows.length!=0){
    			//another mysql q for bookings
				var row=rows[0];
				req.session.user={fname:row.fname,lname:row.lname,email:row.email,passw:row.password,type:row.account_type};
				res.render("account",{user:req.session.user,phone:row.phone});
				connection.end();
			}
   		else{
				req.session.user={fname:"",lname:"",email:"",passw:"",type:"G"};
				res.redirect("/");
				connection.end();
   		}
		});
 	}
 	else{
			req.session.user={fname:"",lname:"",email:"",passw:"",type:"G"};
			res.redirect("/");
	}
}
module.exports={accountRender:accountRender};