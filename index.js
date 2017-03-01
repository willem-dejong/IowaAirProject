
function populateports(){
    $.ajax({url: "/node/getports", success: function(result){
        console.log(result);
        var lst=result.split(",");
        for (var i in lst){
            var lst2=lst[i].split(";");
            console.log()
            var opt=document.createElement("OPTION");
            opt.setAttribute("value",lst2[0]);
            opt.appendChild(document.createTextNode(lst2[1]));
            document.querySelector("#lports").appendChild(opt);

        }
    }});
}
function verifyAndSubmit(){            //validate for required fields
   var org = document.getElementById("org").value;
   var destination = document.getElementById("dest").value;
   var departDate = document.getElementById("date").value;
   var arriveDate = document.getElementById("date2").value;
   var requiredFlag = false;
   var invalidDate = false;
   var depDate = new Date(departDate);
   var arrDate = new Date(arriveDate);
   console.log("Departure Date: " + depDate);
   console.log("Arrival Date: " + arrDate);
   document.getElementById('orglab').style.color = "black";
   document.getElementById('destlab').style.color = "black";
   document.getElementById('datelab').style.color = "black";
   document.getElementById('date2lab').style.color = "black";
   document.getElementById('missReq').style.display = "none";
   document.getElementById('dateErr').style.display = "none";
   if(!org){
       document.getElementById('orglab').style.color = "red";
       requiredFlag = true;
   }
   if(!destination){
       document.getElementById('destlab').style.color = "red";
       requiredFlag = true;
   }
   if(!departDate){
       document.getElementById('datelab').style.color = "red";
       requiredFlag = true;
   }
   if(!arriveDate){
       console.log("No arrival date");
   }
   else if(depDate > arrDate){
       	invalidDate = true;
           document.getElementById('arrive').style.color = "red";
    }
   if (requiredFlag||invalidDate){
       if(requiredFlag){
       	document.getElementById('missReq').style.display ="block";
       }
       if(invalidDate){
           document.getElementById('dateErr').style.display = "block";
       }
   }
   else{
   	console.log("submit");
   	document.getElementById('quein').submit();
   }
}