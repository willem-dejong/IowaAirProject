//var flightq=require('./flightq');
var sql=require('./sql');
var jsindex=require('./jsindex');
var jsadmin=require('./jsadmin');
var jsregistration=require('./jsregistration');
var jscreateAccount=require('./jscreateAccount');
var jsaccount=require('./jsaccount');
var express=require("C:\\Program Files\\nodejs\\node_modules\\express");
var ejs=require("C:\\Program Files\\nodejs\\node_modules\\ejs");
var body=require("C:\\Program Files\\nodejs\\node_modules\\body-parser");
var session=require("C:\\Program Files\\nodejs\\node_modules\\express-session");
var localstrat=require("C:\\Program Files\\nodejs\\node_modules\\passport-local");
var passport=require("C:\\Program Files\\nodejs\\node_modules\\passport");
var cookie=require("C:\\Program Files\\nodejs\\node_modules\\cookie-parser");

var app=express();
app.set("view engine","ejs");
app.set("views","C:\\Users\\the Crimson Moon\\Desktop\\IowaAir\\views");
app.use(body.json());
app.use(body.urlencoded({extended:false}));
app.use(cookie());
app.use(session({resave:true,saveUninitialized:true,secret:"sashfdgsfgier"}));
app.use(express.static("C:\\Users\\the Crimson Moon\\Desktop\\IowaAir\\public"));
app.use("/getports",sql.getairports);
app.use("/changepass",sql.updatepass);
app.use("/loginvalidate",sql.checklogin);
app.use("/logout",function(req,res){
		console.log("logout");
		req.session.user={fname:"",lname:"",email:"",passw:"",type:"G"};
		res.redirect("/");
	});
app.use("/getSession",function(req,res){
	var u=req.session.user;
	result="fname="+u.fname+";lname="+u.lname+";email="+u.email+";type="+u.type+";"
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(result);
});
app.use("/account",jsaccount.accountRender);
app.use("/forgotpass",jscreateAccount.forgotPass)
app.use("/createuser",jscreateAccount.createUser);
app.use("/updateaccount",jscreateAccount.updateAccount);
app.use("/admin/addEmployee",jsadmin.addEmployeeRender);
app.use("/admin/createmanager",jsadmin.createManager);
app.use("/registration",jsregistration.registrationRender);
app.use("/", jsindex.indexRender);
app.listen(80,function(){
	});