function addFlight(){
	var row=document.querySelector("#r0");

    //var flightID = row.querySelector(".flightIDSearch").value;
    var flightNum = row.querySelector(".flightNumSearch").value;
    var gate = row.querySelector(".gateSearch").value;
    var model = row.querySelector(".planeIDSearch").value;
    while (model.indexOf(" ")!=-1){
    	model=model.replace(" ","_")
    }
    var dDate = row.querySelector(".dDateSearch").value;
    var dTime = row.querySelector(".dTimeSearch").value;
    var dd=dDate.split("-")
    var dt=dTime.split(":")
    var dept=new Date(parseInt(dd[0]),parseInt(dd[1])-1,parseInt(dd[2]),parseInt(dt[0]),parseInt(dt[1]))
    var dLoc = row.querySelector(".dLocSearch").value;
    var aDate = row.querySelector(".aDateSearch").value;
    var aTime = row.querySelector(".aTimeSearch").value;
    var ad=aDate.split("-")
    var at=aTime.split(":")
    var arv=new Date(parseInt(ad[0]),parseInt(ad[1])-1,parseInt(ad[2]),parseInt(at[0]),parseInt(at[1]))
    var aLoc = row.querySelector(".aLocSearch").value;
    var ECAvail = row.querySelector(".ECAvailSearch").value;
    var ECBooked = row.querySelector(".ECBookedSearch").value;
    var ECCost = row.querySelector(".ECCostSearch").value;
    var FCAvail = row.querySelector(".FCAvailSearch").value;
    var FCBooked = row.querySelector(".FCBookedSearch").value;
    var FCCost = row.querySelector(".FCCostSearch").value;
    var inter = parseInt(document.querySelector("#interval").value);
    var interType = document.querySelector("#interval_type").value;
    var numTime = parseInt(document.querySelector("#numtime").value);

    //console.log("FlightID: "+flightID);
    console.log("FlightNum: "+flightNum);
    console.log("Gate: "+gate);
    console.log("model: "+model);
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

    if(/*flightID == "" ||*/ dept>=arv||flightNum == "" || model == "" || dDate == "" || dTime == "" || dLoc == "" || aDate == "" || aTime == "" || aLoc == "" || ECAvail == "" || ECBooked == "" || ECCost == "" || FCAvail == "" || FCBooked == "" || FCCost == ""){

        row.bgColor = "#FF0000";
        error.style.display = "block";
        setTimeout(function(){error.style.display = "none"},10000);

    }
    else if(dLoc == aLoc||!document.querySelector("#"+dLoc)||!document.querySelector("#"+aLoc)||!document.querySelector("#"+model)){
        row.bgColor = "#FF0000";
        error.style.display = "block";
        setTimeout(function(){error.style.display = "none"},10000);
    }
    else if(inter<0||!document.querySelector("#"+interType)||numTime<0){
        document.querySelector("#rep").bgColor = "#FF0000";
        error.style.display = "block";
        setTimeout(function(){error.style.display = "none"},10000);
    }
    else{
        
        var address = "/admin/insertFlight?"+/*flightID="+flightID+"&*/"flight_num="+flightNum+"&gate="+gate+"&model="+model+"&deptd="+dDate+"&deptt="+dTime+"&org="+dLoc+"&arvd="+aDate+"&arvt="+aTime+"&dest="+aLoc+"&ecsa="+ECAvail+"&ecsb="+ECBooked+"&eccps="+ECCost+"&fcsa="+FCAvail+"&fcsb="+FCBooked+"&fccps="+FCCost;
        if(inter&&numTime){
        	address+="&inter="+String(inter)+"&interType="+interType+"&numTime="+String(numTime)
        }
        console.log("Address: "+address);
        $.ajax({url:address,success:function(resp){
        		row.bgColor = "green";
        		setTimeout(function(){row.bgColor = "transparent"},3000);
        		$('.success').fadeIn().delay(2000).fadeOut(1000);
        },error:function(resp){
	        row.bgColor = "#FF0000";
	        document.querySelector("#rep").bgColor = "#FF0000";
	        error.style.display = "block";
	        setTimeout(function(){error.style.display = "none"},10000);
        }});
    }
}