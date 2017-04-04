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
    var pid = row.querySelector(".pidEdit").value;
    var model = row.querySelector(".modelEdit").value;
    var ecnum = row.querySelector(".ecnumEdit").value;
    var fjcnum = row.querySelector(".fjcnumEdit").value;

    console.log("pid: "+pid);
    console.log("model: "+model);
    console.log("ecnum: "+ecnum);
    console.log("fjcnum: "+fjcnum);
    
    document.getElementById("invalidInput").style.display = "none";
    
    if(pid == "" || model == "" || ecnum == "" || fjcnum == "") {
        flag = true;
        row.bgColor = "#FF0000";
    }
    else{     
        row.bgColor = "transparent";
        var address = "/admin/updatePlane?pid="+pid+"&model="+model+"&ecnum="+ecnum+"&fjcnum="+fjcnum;
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