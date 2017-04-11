function getRow(but) {
    var row = but.parentElement.parentElement;
    addFlight(row);
}

function addFlight(row){

    console.log(row);

    var flightID = row.querySelector(".flightIDSearch").value;
    var flightNum = row.querySelector(".flightNumSearch").value;
    var gate = row.querySelector(".gateSearch").value;
    var planeID = row.querySelector(".planeIDSearch").value;
    var dDate = row.querySelector(".dDateSearch").value;
    var dTime = row.querySelector(".dTimeSearch").value;
    var dLoc = row.querySelector(".dLocSearch").value;
    var aDate = row.querySelector(".aDateSearch").value;
    var aTime = row.querySelector(".aTimeSearch").value;
    var aLoc = row.querySelector(".aLocSearch").value;
    var ECAvail = row.querySelector(".ECAvailSearch").value;
    var ECBooked = row.querySelector(".ECBookedSearch").value;
    var ECCost = row.querySelector(".ECCostSearch").value;
    var FCAvail = row.querySelector(".FCAvailSearch").value;
    var FCBooked = row.querySelector(".FCBookedSearch").value;
    var FCCost = row.querySelector(".FCCostSearch").value;

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

    var error = document.getElementById("invalidInput");
    error.style.display = "none";

    if(flightID == "" || flightNum == "" || gate == "" || planeID == "" || dDate == "" || dTime == "" || dLoc == "" || aDate == "" || aTime == "" || aLoc == "" || ECAvail == "" || ECBooked == "" || ECCost == "" || FCAvail == "" || FCBooked == "" || FCCost == ""){

        row.bgColor = "#FF0000";
        error.style.display = "block";
        setTimeout(function(){error.style.display = "none"},10000);

    }
    else if(dLoc == aLoc){
        row.bgColor = "#FF0000";
        error.style.display = "block";
        setTimeout(function(){error.style.display = "none"},10000);
    }
    else{
        row.bgColor = "green";
        setTimeout(function(){row.bgColor = "transparent"},3000);
        $('.success').fadeIn().delay(2000).fadeOut(1000);
        var address = "/admin/addFlight?flightID="+flightID+"&flightNum="+flightNum+"&gate="+gate+"&planeID="+planeID+"&dDate="+dDate+"&dTime="+dTime+"&dLoc="+dLoc+"&aDate="+aDate+"&aTime="+aTime+"&aLoc="+aLoc+"&ECAvail="+ECAvail+"&ECBooked="+ECBooked+"&ECCost="+ECCost+"&FCAvail="+FCAvail+"&FCBooked="+FCBooked+"&FCCost="+FCCost;
        //$.ajax({url:address,success:successHandler(row),error:errorHandler(row)});
        console.log("Address: "+address);
    }
}
