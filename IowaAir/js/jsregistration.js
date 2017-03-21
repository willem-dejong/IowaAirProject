function registrationRender(req,res){
	if(!req.session.user){
		res.redirect("/");
	}
	else{
		res.render("registration",{user:req.session.user});
	}
}
module.exports={registrationRender:registrationRender};