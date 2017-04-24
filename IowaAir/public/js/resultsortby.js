function depttimecomp(a,b){
    var vala=stodate(a.getAttribute("dept-time"));
    var valb=stodate(b.getAttribute("dept-time"));
    console.log(vala,"\n",valb);
    return vala>valb?1:valb>vala?-1:0;
}
function arvtimecomp(a,b){
    var vala=stodate(a.getAttribute("arrive-time"));
    var valb=stodate(b.getAttribute("arrive-time"));
    return vala>valb?1:valb>vala?-1:0;
}
function pricecomp(a,b){
    var vala=parseInt(a.getAttribute("price"));
    var valb=parseInt(b.getAttribute("price"));
    return vala>valb?1:valb>vala?-1:0;
}
function nstopscomp(a,b){
    var vala=parseInt(a.getAttribute("nstops"));
    var valb=parseInt(b.getAttribute("nstops"));
    return vala>valb?1:valb>vala?-1:0;
}
function ftcomp(a,b){
    var vala=parseInt(a.getAttribute("tottime"));
    var valb=parseInt(b.getAttribute("tottime"));
    return vala>valb?1:valb>vala?-1:0;
}
function sortby(attr){
    lst=document.querySelector("#resultlist").querySelectorAll(".resultitem");
    console.log(lst);
    var arr=[];
    for(var i=0;i < lst.length;i++){arr.push(lst[i]);}
    if(attr=="dept-time"){
        arr.sort(depttimecomp);
    }
    else if(attr=="arrive-time"){
        arr.sort(arvtimecomp);
    }
    else if(attr=="nstops"){
        arr.sort(nstopscomp);
    }
    else if(attr=="tottime"){
        arr.sort(ftcomp);
    }
    else if(attr=="price"){
        arr.sort(pricecomp);
    }
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        arr[i].parentNode.appendChild(arr[i]);
    }

}