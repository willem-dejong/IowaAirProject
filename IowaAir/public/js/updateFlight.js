function search(){
    url="/admin/updateFlights?";
    var b=false
    var flightID=document.getElementById("flightID").value
    if(flightID){
        if(b){
            url=url+"&"
        }
        url=url+"flightid="+flightID
        b=true
    }
    var flightNum=document.getElementById("flightNum").value
    if(flightNum){
        if(b){
            url=url+"&"
        }
        url=url+"flight_num="+flightNum
        b=true
    }
    var gate=document.getElementById("gate").value
    if(gate){
        if(b){
            url=url+"&"
        }
        url=url+"gate="+gate
        b=true
    }
    var model=document.getElementById("model").value
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
    var dDate=document.getElementById("dDate").value
    if(dDate){
        if(b){
            url=url+"&"
        }
        url=url+"deptd="+dDate
        b=true
    }
    /*var dTime=document.getElementById("dTime").value
    if(dTime){
        if(b){
            url=url+"&"
        }
        url=url+"deptt="+dTime
        b=true
    }*/
    var dLoc=document.getElementById("dLoc").value
    if(dLoc){
        if(b){
            url=url+"&"
        }
        url=url+"org="+dLoc
        b=true
    }
    var aDate=document.getElementById("aDate").value
    if(aDate){
        if(b){
            url=url+"&"
        }
        url=url+"arvd="+aDate
        b=true
    }
    /*var aTime=document.getElementById("aTime").value
    if(aTime){
        if(b){
            url=url+"&"
        }
        url=url+"arvt="+aTime
        b=true
    }*/
    var aLoc=document.getElementById("aLoc").value
    if(aLoc){
        if(b){
            url=url+"&"
        }
        url=url+"dest="+aLoc
        b=true
    }
    var ECAvail=document.getElementById("ECAvail").value
    if(ECAvail){
        if(b){
            url=url+"&"
        }
        url=url+"ecsa="+ECAvail
        b=true
    }
    var ECBooked=document.getElementById("ECBooked").value
    if(ECBooked){
        if(b){
            url=url+"&"
        }
        url=url+"ecsb="+ECBooked
        b=true
    }
    var ECCost=document.getElementById("ECCost").value
    if(ECCost){
        if(b){
            url=url+"&"
        }
        url=url+"eccps="+ECCost
        b=true
    }
    var FCAvail=document.getElementById("FCAvail").value
    if(FCAvail){
        if(b){
            url=url+"&"
        }
        url=url+"fcsa="+FCAvail
        b=true
    }
    var FCBooked=document.getElementById("FCBooked").value
    if(FCBooked){
        if(b){
            url=url+"&"
        }
        url=url+"fcsb="+FCBooked
        b=true
    }
    var FCCost=document.getElementById("FCCost").value
    if(FCCost){
        if(b){
            url=url+"&"
        }
        url=url+"fccps="+FCCost
        b=true
    }
    if(b){
        url=url+"&"
    }
    url=url+"search=true"
    window.location=url
    console.log(url);
}


function updateSingle(but){
    var row = but.parentElement.parentElement;
    updateRow(row);
    checkErrors();
}

function updateAll(but){
    var table = but.parentElement.parentElement.firstElementChild.firstElementChild
    var row;
    for(var i = 1;i < table.firstElementChild.childElementCount - 1; i++){
	    row = document.getElementById("r"+ String(i));
	    updateRow(row);
    }
    checkErrors();
}

function updateRow(row){
    console.log(row);
    var flightID = row.querySelector(".flightIDEdit").value;
    var flightNum = row.querySelector(".flightNumEdit").value;
    var gate = row.querySelector(".gateEdit").value;

    var model = row.querySelector(".modelEdit").value;
    while(model.indexOf(" ")!=-1){
        model=model.replace(" ","_");
    }
    
    
    var dDate = row.querySelector(".dDateEdit").value;
    var m=dDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g)
    if (!m||m[0]!=dDate){
   	dDate=""
    }
    var dTime = row.querySelector(".dTimeEdit").value;
    var m=dTime.match(/[0-2][0-9]:[0-5][0-9]/g)
    if (!m||m[0]!=dTime){
   	dTime=""
    }
    var dLoc = row.querySelector(".dLocEdit").value;
    var aDate = row.querySelector(".aDateEdit").value;
    m=aDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g)
    if (!m||m[0]!=aDate){
   	aDate=""
    }
    var aTime = row.querySelector(".aTimeEdit").value;
    var m=aTime.match(/[0-2][0-9]:[0-5][0-9]/g)
    if (!m||m[0]!=aTime){
   	aTime=""
    }
    var aLoc = row.querySelector(".aLocEdit").value;
    var ECAvail = row.querySelector(".ECAvailEdit").value;
    var ECBooked = row.querySelector(".ECBookedEdit").value;
    var ECCost = row.querySelector(".ECCostEdit").value;
    var FCAvail = row.querySelector(".FCAvailEdit").value;
    var FCBooked = row.querySelector(".FCBookedEdit").value;
    var FCCost = row.querySelector(".FCCostEdit").value;
    
    console.log("FlightID: "+flightID);
    console.log("FlightNum: "+flightNum);
    console.log("Gate: "+gate);
    console.log("Model: "+model);
    console.log("dDate: "+dDate);
    console.log("dTime: "+dTime);
    console.log("dLoc: "+dLoc);
    console.log("aDate: "+aDate);
    console.log("aTime: "+aTime);
    console.log("aLoc: "+aLoc);
    console.log("ECAvail: "+ECAvail);
    console.log("ECBooked: "+ECBooked);
    console.log("ECCost: "+ECCost);
    console.log("FCAvail: "+FCAvail);
    console.log("FCBooked: "+FCBooked);
    console.log("FCCost: "+FCCost);
    
    document.getElementById("invalidInput").style.display = "none";

    
    if(flightID == "" || flightNum == "" || model == "" || dDate == "" || dTime == "" || dLoc == "" || aDate == "" || aTime == "" || aLoc == "" || ECAvail == "" || ECBooked == "" || ECCost == "" || FCAvail == "" || FCBooked == "" || FCCost == ""){
    	console.log("hihih")
        //flag = true;
        row.bgColor = "#FF0000";
        
    }
    else if(dLoc == aLoc){
        console.log("fgfgfg")
        //flag = true;
        row.bgColor = "#FF0000";
    }
    else if(!document.querySelector("#"+model)||!document.querySelector("#"+dLoc)||!document.querySelector("#"+aLoc)){
        row.bgColor = "#FF0000";
    }
    else{     
        row.bgColor = "green";
        setTimeout(function(){row.bgColor = "transparent"},3000);
        var address = "/admin/updateFlight?flightid="+flightID+"&flight_num="+flightNum
        if(gate){
        		address+="&gate="+gate
        }
        address+="&model="+model+"&deptd="+dDate+"&deptt="+dTime+"&org="+dLoc+"&arvd="+aDate+"&arvt="+aTime+"&dest="+aLoc+"&ecsa="+ECAvail+"&ecsb="+ECBooked+"&eccps="+ECCost+"&fcsa="+FCAvail+"&fcsb="+FCBooked+"&fccps="+FCCost;
        $.ajax({url:address,success:function(response){
            row.bgColor = "green";
            setTimeout(function(){row.bgColor = "transparent"},5000);
            $('.success').fadeIn().delay(2000).fadeOut(1000);
            },error:function(response){row.bgColor = "red"}
        });
        console.log("Address: "+address);
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
        setTimeout(function(){error.style.display = "none"},10000);
    }
    /*else{
        error.style.display = "none";
    }*/
    //$('.success').fadeIn().delay(2000).fadeOut(1000);
}

