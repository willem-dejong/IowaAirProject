var flightq=require('./flightq');
var sql=require('./sql');
var express=require("C:\\Program Files\\nodejs\\node_modules\\express");
var ejs=require("C:\\Program Files\\nodejs\\node_modules\\ejs");
var body=require("C:\\Program Files\\nodejs\\node_modules\\body-parser");
var session=require("C:\\Program Files\\nodejs\\node_modules\\express-session");
var localstrat=require("C:\\Program Files\\nodejs\\node_modules\\passport-local");
var passport=require("C:\\Program Files\\nodejs\\node_modules\\passport");
var cookie=require("C:\\Program Files\\nodejs\\node_modules\\cookie-parser");

function getURL(req){
	return req.url;
}
	
function getports(req,res){
	console.log("getports");
	sql.getairports(res);
}
function getFlights(req,res){
	console.log("getFlights");
	flightq.flights(req,res,req.url.substring(13));
}
function changepass(req,res){
	//console.log("getnewsession");
	sql.updatepass(req,res);
}
function loginvalidate(req,res){
	sql.checklogin(req,res);
}
var app=express();
app.set("view engine","ejs");
app.set("views","C:\\Users\\the Crimson Moon\\Desktop\\IowaAir\\views");
app.use(body.json());
app.use(body.urlencoded({extended:false}));
app.use(cookie());
app.use(session({resave:true,saveUninitialized:true,secret:"sashfdgsfgier"}));
app.use(express.static("C:\\Users\\the Crimson Moon\\Desktop\\IowaAir\\public"));
app.use("/getports",getports);
app.use("/changepass",changepass);
app.use("/loginvalidate",loginvalidate);
app.use("/logout",function(req,res){
		req.session.user={fname:"",lname:"",email:"",passw:"",type:"G"};
	});
app.use("/getSession",function(req,res){
		var u=req.session.user;
		result="fname="+u.fname+";lname="+u.lname+";email="+u.email+";type="+u.type+";"
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end(result);
	});
app.use("/", function(req,res){
	if(!req.session.user){
		req.session.user={fname:"",lname:"",email:"",passw:"",type:"G"};
	}
	console.log(req.session);
	//console.log(req);
	res.render("index",{user:req.session.user});
});
app.listen(80,function(){
	});