//var flightq=require('./flightq');
var sql=require('./sql');
var jsindex=require('./jsindex');
var jsadmin=require('./jsadmin');
var jsregistration=require('./jsregistration');
var jscreateAccount=require('./jscreateAccount');
var jsaccount=require('./jsaccount');
var express=require("/Users/matt/Desktop/IowaAirPackage/node_modules/express");
var ejs=require("/Users/matt/Desktop/IowaAirPackage/node_modules/ejs");
var body=require("/Users/matt/Desktop/IowaAirPackage/node_modules/body-parser");
var session=require("/Users/matt/Desktop/IowaAirPackage/node_modules/express-session");
var localstrat=require("/Users/matt/Desktop/IowaAirPackage/node_modules/passport-local");
var passport=require("/Users/matt/Desktop/IowaAirPackage/node_modules/passport");
var cookie=require("/Users/matt/Desktop/IowaAirPackage/node_modules/cookie-parser");

var app=express();
app.set("view engine","ejs");
app.set("views","/Users/matt/Desktop/IowaAir/views");
app.use(body.json());
app.use(body.urlencoded({extended:false}));
app.use(cookie());
app.use(session({resave:true,saveUninitialized:true,secret:"sashfdgsfgier"}));
app.use(express.static("/Users/matt/Desktop/IowaAir/public"));
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
app.use("/updateFlight",function(req,res){
    res.render("updateFlight",{user:req.session.user,ports:[{portid:"ORD",airport:"Chicago"},{portid:"CID",airport:"Cedar Rapids"}],flights:[	{flightID:"Test123",flight_num:"IA123",gate:"M1",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"},{flightID:"Test1234",flight_num:"IA123",gate:"M2",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"},{flightID:"Test123",flight_num:"IA123",gate:"M3",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"},{flightID:"Test123",flight_num:"IA123",gate:"M4",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"},{flightID:"Test123",flight_num:"IA123",gate:"M5",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"},{flightID:"Test123",flight_num:"IA123",gate:"M6",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"},{flightID:"Test123",flight_num:"IA123",gate:"M7",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"},{flightID:"Test123",flight_num:"IA123",gate:"M8",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"},{flightID:"Test123",flight_num:"IA123",gate:"M9",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"},{flightID:"Test123",flight_num:"IA123",gate:"M10",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"},{flightID:"Test123",flight_num:"IA123",gate:"M11",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"},{flightID:"Test123",flight_num:"IA123",gate:"M12",departure_time:new Date,arrival_time:new Date,ec_seats_available:3,ec_seats_booked:30,ec_cost_per_seat:350,fc_seats_available:4,fc_seats_booked:40,fc_cost_per_seat:450,plane_id:"IAplane",origin:"ORD",destined:"CID"}]})
})
app.use("/", jsindex.indexRender);
app.listen(80,function(){
	});