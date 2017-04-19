function searchID(){
    url="/manager/reservationManagement?";
    var b=false
    var transID=document.getElementById("searchBox").value
    if(transID){
        if(b){
            url=url+"&"
        }
        url=url+"transtid="+transID
        b=true
    }
    window.location=url
    console.log(url);
}

function checkIn(but){

    var row = but.parentElement.parentElement;

    var resID = row.querySelector(".residEdit").value;
    var bags = row.querySelector(".bagsEdit").value;

    document.getElementById("invalidInput").style.display = "none";
    document.getElementById("invalidServerInput").style.display = "none";

    if(resID == "" || bags == ""){
        row.bgColor = "#FF0000";
    }
    else{
        row.bgColor = "green";
        setTimeout(function(){row.bgColor = "transparent"},3000);
        var address = "/manager/checkin?resid="+resID+"&bags="+bags;

        $.ajax({url:address,success:function(response){
            window.location = window.location;
        },error:function(response){
            row.bgColor = "red";
            document.getElementById("invalidServerInput").style.display = "block";
        }
        });
        console.log("Address: "+address);
    }

    checkErrors();
}

function cancelRes(but){

    var row = but.parentElement.parentElement;
    console.log(row);

    var resID = row.querySelector(".residEdit").value;
    console.log(resID);

    if(resID == ""){
        row.bgColor = "#FF0000";
    }
    else{
        row.bgColor = "green";
        setTimeout(function(){row.bgColor = "transparent"},3000);
        var address = "/manager/cancel?resid="+resID;

        $.ajax({url:address,success:function(response){
            console.log(response)
            //window.location = window.location;
            but.parentElement.parentElement.parentElement.removeChild(but.parentElement.parentElement);
        },error:function(response){
            row.bgColor = "red"
            document.getElementById("invalidServerInput").style.display = "block";
        }
        });
        console.log("Address: "+address);
    }

}

function checkErrors(){
    var allErrors = document.getElementsByClassName("cancelButton")
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
}