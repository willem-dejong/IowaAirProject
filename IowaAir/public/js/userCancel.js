function cancelRes(but){

    var row = but.parentElement.parentElement;
    console.log(row);

    var resID = row.querySelector(".residEdit").value;
    console.log(resID);

    if(resID == ""){
        row.bgColor = "#FF0000";
    }
    else{
        setTimeout(function(){row.bgColor = "transparent"},3000);
        var address = "/userCancel?resid="+resID;

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