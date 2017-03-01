
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