class testRes{
	constructor(compFunc,headFunc,redirFunc,rendFunc){
		this.end=compFunc;
		this.writeHead=headFunc;
		this.redirect=redirFunc;
		this.render=rendFunc;
	}
}
module.exports={testRes:testRes};
