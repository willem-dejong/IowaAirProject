function addSingle(but){
    var row = but.parentElement.parentElement;
    //checkErrors();
    addRow(row);
}
function addRow(row){
    console.log(row);
    var model = row.querySelector("#modelCrit").value;
    while(model.indexOf(" ")!=-1){
    	model=model.replace(" ","_");
    }
    var ecnum = row.querySelector("#ecnumCrit").value;
    var fcnum = row.querySelector("#fcnumCrit").value;

    console.log("model: "+model);
    console.log("ecnum: "+ecnum);
    console.log("fcnum: "+fcnum);
    
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
        		$('.success').fadeIn().delay(2000).fadeOut(1000);
    		},error:function(error){
    			document.getElementById("invalidInput").style.display = "block";
    		}});
    }
}