
function verifyAndSubmit(){            //validate for required fields
   var org = document.getElementById("org").value;
   var destination = document.getElementById("dest").value;
   var departDate = document.getElementById("date").value;
   var arriveDate = document.getElementById("date2").value;
   var requiredFlag = false;
   var invalidDate = false;
   var portFlag=false;
   var depDate = new Date(departDate);
   var arrDate = new Date(arriveDate);
   var now=new Date(1970,0,1);
   now.setMilliseconds(Date.now());
   now=new Date(now.getFullYear(),now.getMonth(),now.getDate());
   console.log(now);
   console.log("Departure Date: " + depDate);
   console.log("Arrival Date: " + arrDate);
   document.getElementById('orglab').style.color = "black";
   document.getElementById('destlab').style.color = "black";
   document.getElementById('datelab').style.color = "black";
   document.getElementById('date2lab').style.color = "black";
   document.getElementById('missReq').style.display = "none";
   document.getElementById('dateErr').style.display = "none";
  document.getElementById('portErr').style.display ="none";
   if(!org){
       document.getElementById('orglab').style.color = "red";
       requiredFlag = true;
   }
   else if(!document.querySelector("#"+org)){
   	document.getElementById('orglab').style.color="red";
   	portFlag=true;
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
   if(!arriveDate){
       console.log("No arrival date");
   }
   else if(now>arrDate){
       document.getElementById('date2lab').style.color = "red";
       invalidDate = true;	
   }
   else if(depDate > arrDate){
       	invalidDate = true;
           document.getElementById('date2lab').style.color = "red";
   }
    
   if (requiredFlag||invalidDate||portFlag){
       if(requiredFlag){
       	document.getElementById('missReq').style.display ="block";
       }
       if(invalidDate){
           document.getElementById('dateErr').style.display = "block";
       }
       if(portFlag){
           document.getElementById('portErr').style.display = "block";
       }
   }
   else{
   	console.log("submit");
   	document.getElementById('quein').submit();
   }
}