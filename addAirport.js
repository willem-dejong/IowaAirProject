function addSingle(but){
    var row = but.parentElement.parentElement;
    //checkErrors();
    addRow(row);
}


function addRow(row){
    console.log(row);
    
    var portid = row.querySelector("#portidcrit").value;
    var airport = row.querySelector("#airportcrit").value;
    var location = row.querySelector("#locationcrit").value;
    var lat = row.querySelector("#latcrit").value;
    var long = row.querySelector("#longcrit").value;

    console.log("portid: "+portid);
    console.log("airport: "+airport);
    console.log("location: "+location);
    console.log("lat: "+lat);
    console.log("long: "+long);
    
    document.getElementById("invalidInput").style.display = "none";
    
    if(portid == "" || airport == "" || location == ""|| lat == ""|| long == ""||portid.length!=3{
    		document.getElementById("invalidInput").style.display = "block";
        //flag = true;
        row.bgColor = "#FF0000";
    }
    else{     
        row.bgColor = "transparent";
        var address = "/admin/addAirport?portid="+portid+"&airport="+airport+"&location="+location+"&lat="+lat+"&long="+long;//+"&reoccurrence="+reoccurrence;
        console.log("Address: "+address);
        $.ajax({url:address,success:function(result){

            //console.log(result)
            $('.success').fadeIn().delay(2000).fadeOut(1000);
        },error:function(error){console.log(error)}});
    }
}