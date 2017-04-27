//var flightq=require('./flightq');
//var sql=require('./sql');
var jspath=require("./jspath")
var jsgetairports=require('./jsgetairports');
var jsupdatepass=require('./jsupdatepass');
var jsindex=require('./jsindex');
var jslogin=require('./jslogin');
var jsadmin=require('./jsadmin');
var jsmanager=require('./jsmanager');
var jsregistration=require('./jsregistration');
var jscreateAccount=require('./jscreateAccount');
var jsaccount=require('./jsaccount');
var jsresult=require('./jsresult');
var jsbook=require('./jsbook');
var express=require(jspath.modpath()+"express");
var ejs=require(jspath.modpath()+"ejs");
var body=require(jspath.modpath()+"body-parser");
var session=require(jspath.modpath()+"express-session");
var localstrat=require(jspath.modpath()+"passport-local");
var passport=require(jspath.modpath()+"passport");
var cookie=require(jspath.modpath()+"cookie-parser");

var app=express();
app.set("view engine","ejs");
app.set("views",jspath.IApath()+"views");
app.use(body.json());
app.use(body.urlencoded({extended:false}));
app.use(cookie());
app.use(session({resave:true,saveUninitialized:true,secret:"sashfdgsfgier"}));
app.use(express.static(jspath.IApath()+"public"));
app.use("/getports",jsgetairports.getairports);
app.use("/changepass",jsupdatepass.updatepass);
app.use("/loginvalidate",jslogin.login);
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
app.use("/admin/addPlane",jsadmin.addPlaneRender);
app.use("/admin/insertPlane",jsadmin.addPlane);
app.use("/admin/updatePlanes",jsadmin.updatePlaneRender);
app.use("/admin/updatePlane",jsadmin.updatePlane);
app.use("/admin/updateFlights",jsadmin.updateFlightRender);
app.use("/admin/updateFlight",jsadmin.updateFlight);
app.use("/admin/addFlight",jsadmin.addFlightRender);//function(req,res){res.render("addFlight",{user:req.session.user,ports:[{portid:"ORG",airport:"fgdsgdsgs"},{portid:"DFF",airport:"fgdsgdsgs"}],planes:[{model:"ORG fsd"},{model:"DFF fdg"}]})});
app.use("/admin/insertFlight",jsadmin.addFlight);
app.use("/manager/manageBookings",jsmanager.manageBookingsRender);
app.use("/manageBookings",jsuser.userBookingsRender);
app.use("/manager/cancel",jsmanager.cancel);
app.use("/manager/checkin",jsmanager.checkin);
app.use("/manager/ticket",jsmanager.ticketRender);
app.use("/registration",jsregistration.registrationRender);
app.use("/book",jsbook.bookrender);
app.use("/bookit",jsbook.bookit);
app.use("/ThankYou",function(req,res){
	if(!req.session||!req.session.user){
		res.redirect("/")
	}
	else{
		res.render("Thank",{user:req.session.user})
	}
});
app.use("/result",jsresult.resultRender);
app.use("/mapResult",jsresult.mapResultRender);
app.use("/", jsindex.indexRender);
app.listen('80',function(){
	});