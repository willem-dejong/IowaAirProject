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
    var planeID = row.querySelector(".planeIDEdit").value;
    var dDate = row.querySelector(".dDateEdit").value;
    var dTime = row.querySelector(".dTimeEdit").value;
    var dLoc = row.querySelector(".dLocEdit").value;
    var aDate = row.querySelector(".aDateEdit").value;
    var aTime = row.querySelector(".aTimeEdit").value;
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
    console.log("PlaneID: "+planeID);
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
    
    if(flightID == "" || flightNum == "" || gate == "" || planeID == "" || dDate == "" || dTime == "" || dLoc == "" || aDate == "" || aTime == "" || aLoc == "" || ECAvail == "" || ECBooked == "" || ECCost == "" || FCAvail == "" || FCBooked == "" || FCCost == ""){
        flag = true;
        row.bgColor = "#FF0000";
    }
    else{     
        row.bgColor = "transparent";
        var address = "/admin/updateFlight?flightID="+flightID+"&flightNum="+flightNum+"&gate="+gate+"&planeID="+planeID+"&dDate="+dDate+"&dTime="+dTime+"&dLoc="+dLoc+"&aDate="+aDate+"&aTime="+aTime+"&aLoc="+aLoc+"&ECAvail="+ECAvail+"&ECBooked="+ECBooked+"&ECCost="+ECCost+"&FCAvail="+FCAvail+"&FCBooked="+FCBooked+"&FCCost="+FCCost;
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
    }
    else{
        error.style.display = "none";
    }
    $('.success').fadeIn().delay(2000).fadeOut(1000);
}
