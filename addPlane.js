function addSingle(but){
    var row = but.parentElement.parentElement;
    //checkErrors();
    addRow(row);
}

/*
function updateAll(but){
    var table = but.parentElement.parentElement.firstElementChild.firstElementChild
    var row;
    for(var i = 1;i < table.firstElementChild.childElementCount - 1; i++){
	    row = document.getElementById("r"+ String(i));
	    updateRow(row);
    }
    checkErrors();
}*/

function addRow(row){
    console.log(row);
    var model = row.querySelector("#modelCrit").value;
    while(model.indexOf(" ")!=-1){
    	model=model.replace(" ","_");
    }
    var ecnum = row.querySelector("#ecnumCrit").value;
    var fcnum = row.querySelector("#fcnumCrit").value;
    //var reoccurrence = row.querySelector(".reoccurrenceCrit").value;

    console.log("model: "+model);
    console.log("ecnum: "+ecnum);
    console.log("fcnum: "+fcnum);
    //console.log("reoccurrence: "+reoccurrence);
    
    document.getElementById("invalidInput").style.display = "none";
    
    if(model == "" || ecnum == "" || fcnum == ""||parseInt(ecnum)<0||parseInt(fcnum)<0){
    		document.getElementById("invalidInput").style.display = "block";
        //flag = true;
        row.bgColor = "#FF0000";
    }
    else{     
        row.bgColor = "transparent";
        var address = "/admin/insertPlane?model="+model+"&ecnum="+ecnum+"&fcnum="+fcnum;//+"&reoccurrence="+reoccurrence;
        console.log("Address: "+address);
        $.ajax({url:address,success:function(result){

            //console.log(result)
            $('.success').fadeIn().delay(2000).fadeOut(1000);
        },error:function(error){console.log(error)}});
    }
}

/*function checkErrors(){
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
}*/