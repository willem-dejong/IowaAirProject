function search(){
	url="/admin/updatePlanes?";
	var b=false
	var pid=document.getElementById("pidcrit").value
	if(pid){
		if(b){
			url=url+"&"
		}
		url=url+"pid="+pid
		b=true
	}
	var model=document.getElementById("modelcrit").value
    while(model.indexOf(" ")!=-1){
    	model=model.replace(" ","_");
    }
	if(model){
		if(b){
			url=url+"&"
		}
		url=url+"model="+model
		b=true
	}
	var ecnum=document.getElementById("ecnumcrit").value
	if(ecnum){
		if(b){
			url=url+"&"
		}
		url=url+"ecnum="+ecnum
		b=true
	}
	var fcnum=document.getElementById("fcnumcrit").value
	if(fcnum){
		if(b){
			url=url+"&"
		}
		url=url+"fcnum="+fcnum
		b=true
	}
	if(b){
		url=url+"&"
	}
	url=url+"search=true"
	window.location=url
}
function updateSingle(but){
    var row = but.parentElement.parentElement;
    updateRow(row);
    checkErrors();
}

function updateAll(but){
    var row;
    var i=1;
    var row=document.getElementById("r"+ String(i));
    while(row!=null){
	    updateRow(row);
	    i+=1
	    row = document.getElementById("r"+ String(i));
    }
    checkErrors();
}

function updateRow(row){
    console.log(row);
    var pid = row.querySelector(".pidEdit").value;
    var model = row.querySelector(".modelEdit").value;
    while(model.indexOf(" ")!=-1){
    	model=model.replace(" ","_");
    }
    var ecnum = row.querySelector(".ecnumEdit").value;
    var fcnum = row.querySelector(".fcnumEdit").value;

    console.log("pid: "+pid);
    console.log("model: "+model);
    console.log("ecnum: "+ecnum);
    console.log("fcnum: "+fcnum);
    
    document.getElementById("invalidInput").style.display = "none";
    
    if(pid == "" || model == "" || ecnum == "" || fcnum == "") {
        flag = true;
        row.bgColor = "#FF0000";
    }
    else{     
        row.bgColor = "transparent";
        var address = "/admin/updatePlane?pid="+pid+"&model="+model+"&ecnum="+ecnum+"&fcnum="+fcnum;
        console.log("Address: "+address);
        $.ajax({url:address,success:function(result){console.log(result)},error:function(error){console.log(error)}});
    }
}

function checkErrors(){
    var allErrors = document.getElementsByClassName("updateButton")
    var flag = false;
    for(var i = 0; i < allErrors.length;i++){
        if(allErrors[i].parentElement.parentElement.bgColor == "#FF0000"){
	        flag = true;
        }
    }
    var error = document.getElementById("invalidInput");
    if(flag){
        error.style.display = "block";
    }
    else{
        error.style.display = "none";
    }
    $('.success').fadeIn().delay(2000).fadeOut(1000);
}