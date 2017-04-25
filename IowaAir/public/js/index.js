
function verifyAndSubmit(){            //validate for required fields
   var org = document.getElementById("org").value;
   var destination = document.getElementById("dest").value;
   var departDate = document.getElementById("date").value;
   var returnDate = document.getElementById("date2").value;
   var pass = parseInt(document.getElementById("pass").value);
   console.log(!departDate)
   console.log(!returnDate)
   var requiredFlag = false;
   var invalidDate = false;
   var portFlag=false;
   var portFlag2=false;
   var depdl=departDate.split("-")
   var depDate = new Date(parseInt(depdl[0]),parseInt(depdl[1])-1,parseInt(depdl[2]));
   var retdl=returnDate.split("-")
   var retDate = new Date(parseInt(retdl[0]),parseInt(retdl[1])-1,parseInt(retdl[2]));
   var nowt=new Date;
   var now=new Date(nowt.getFullYear(),nowt.getMonth(),nowt.getDate())
   console.log(now);
   console.log("Departure Date: " + depDate);
   console.log("Arrival Date: " + retDate);
   document.getElementById('orglab').style.color = "black";
   document.getElementById('destlab').style.color = "black";
   document.getElementById('datelab').style.color = "black";
   document.getElementById('date2lab').style.color = "black";
   document.getElementById('missReq').style.display = "none";
   document.getElementById('dateErr').style.display = "none";
   document.getElementById('portErr').style.display ="none";
   document.getElementById('portErr2').style.display ="none";
   if(!org){
       document.getElementById('orglab').style.color = "red";
       requiredFlag = true;
   }
   else if(!document.querySelector("#"+org)){
   	document.getElementById('orglab').style.color="red";
   	portFlag=true;
   }
   else if(org==destination){
   	document.getElementById('orglab').style.color="red";
    	document.getElementById('destlab').style.color = "red";
   	portFlag2=true;
   }
   if(!destination){
       document.getElementById('destlab').style.color = "red";
       requiredFlag = true;
   }
   else if(!document.querySelector("#"+destination)){
   	document.getElementById('destlab').style.color="red";
   	portFlag=true;
   }
   if(!departDate){
       document.getElementById('datelab').style.color = "red";
       requiredFlag = true;
   }
   else if(now>depDate){
       document.getElementById('datelab').style.color = "red";
       invalidDate = true;
   }
   if(!returnDate){
       console.log("No arrival date");
   }
   else if(now>retDate){
       document.getElementById('date2lab').style.color = "red";
       invalidDate = true;	
   }
   else if(depDate > retDate){
       	invalidDate = true;
         document.getElementById('date2lab').style.color = "red";
   }
    
   if (requiredFlag||invalidDate||portFlag||portFlag2){
       if(requiredFlag){
       	document.getElementById('missReq').style.display ="block";
       }
       if(invalidDate){
           document.getElementById('dateErr').style.display = "block";
       }
       if(portFlag){
           document.getElementById('portErr').style.display = "block";
       }
       if(portFlag2){
           document.getElementById('portErr2').style.display = "block";
       }
   }
   else{
   	console.log("submit");
   	cmd="/result?port1="+org+"&port2="+destination+"&date1="+departDate
   	if(returnDate){
   		cmd=cmd+"&date2="+returnDate
   	}
   	cmd=cmd+"&pass="+ pass;
   	window.location=cmd
   }
}
function verifyAndSubmit2(){            //validate for required fields
   //var org = document.getElementById("org").value;
   //var destination = document.getElementById("dest").value;
   var departDate = document.getElementById("dateb").value;
   var returnDate = document.getElementById("date2b").value;
   var pass = parseInt(document.getElementById("passb").value);
   console.log(!departDate)
   console.log(!returnDate)
   var requiredFlag = false;
   var invalidDate = false;
   var portFlag=false;
   //var portFlag2=false;
   var depdl=departDate.split("-")
   var depDate = new Date(parseInt(depdl[0]),parseInt(depdl[1])-1,parseInt(depdl[2]));
   var retdl=returnDate.split("-")
   var retDate = new Date(parseInt(retdl[0]),parseInt(retdl[1])-1,parseInt(retdl[2]));
   var nowt=new Date;
   var now=new Date(nowt.getFullYear(),nowt.getMonth(),nowt.getDate())
   console.log(now);
   console.log("Departure Date: " + depDate);
   console.log("Arrival Date: " + retDate);
   //document.getElementById('orglab').style.color = "black";
   //document.getElementById('destlab').style.color = "black";
   document.getElementById('datelabb').style.color = "black";
   document.getElementById('date2labb').style.color = "black";
   document.getElementById('missReqb').style.display = "none";
   document.getElementById('dateErrb').style.display = "none";
   document.getElementById('portErrb').style.display ="none";
   //document.getElementById('portErr2').style.display ="none";
   if(flights.length<2){
       document.getElementById('portErrb').style.color = "red";
       portFlag = true;
   }
   if(!departDate){
       document.getElementById('datelabb').style.color = "red";
       requiredFlag = true;
   }
   else if(now>depDate){
       document.getElementById('datelabb').style.color = "red";
       invalidDate = true;
   }
   if(!returnDate){
       console.log("No arrival date");
   }
   else if(now>retDate){
       document.getElementById('date2labb').style.color = "red";
       invalidDate = true;	
   }
   else if(depDate > retDate){
       	invalidDate = true;
         document.getElementById('date2labb').style.color = "red";
   }
    
   if (requiredFlag||invalidDate||portFlag){
       if(requiredFlag){
       	document.getElementById('missReqb').style.display ="block";
       }
       if(invalidDate){
           document.getElementById('dateErrb').style.display = "block";
       }
       if(portFlag){
           document.getElementById('portErrb').style.display = "block";
       }
   }
   else{
   	console.log("submit");
   	var portstr=""
   	for(i in flights){
   		portstr=portstr+flights[i]+";"
   	}
   	cmd="/mapResult?ports="+portstr+"&date1="+departDate
   	if(returnDate){
   		cmd=cmd+"&date2="+returnDate
   	}
   	cmd=cmd+"&pass="+ pass;
   	window.location=cmd
   }
}