var flightIDs1=""
var flightIDs2=""
var class1=""
var class2=""
var twoway=false
function book(bl,cls,bookit){
	if(bookit){
		swaplists(bl,cls);
	}
	else{
		goToBook(bl,cls);
	}
}
function swaplists(bl,cls){
	twoway=true
	var toItem= bl.parentElement.parentElement.parentElement;
	if(cls){
		bl.parentElement.parentElement.removeChild(bl.parentElement.parentElement.querySelector(".pricefc"))
		bl.parentElement.removeChild(bl)
		class1="ec"
	}
	else{
		bl.parentElement.parentElement.removeChild(bl.parentElement.parentElement.querySelector(".priceec"))
		bl.parentElement.removeChild(bl)
		class1="fc"
	}
	flightIDs1=toItem.getAttribute("flightids")
	var rlist=toItem.parentElement
	rlist.removeChild(toItem)
	document.querySelector("#twoway").appendChild(toItem)
	rlist.parentElement.removeChild(rlist)
	var rrlist=document.querySelector("#resultlist_return");
	rrlist.id="resultlist"
	rrlist.style.display="block"
}
function goToBook(bl,cls){
	var toItem= bl.parentElement.parentElement.parentElement;
	url="http://localhost/book?"
	if(twoway){
		if(cls){
			class2="ec"
		}
		else{
			class2="fc"
		}
		flightIDs2=toItem.getAttribute("flightids")
		url=url+"flightids1="+flightIDs1+"&class1="+class1+"&flightids2="+flightIDs2+"&class2="+class2
	}
	else{
		if(cls){
			class1="ec"
		}
		else{
			class1="fc"
		}
		flightIDs1=toItem.getAttribute("flightids")
		url=url+"flightids1="+flightIDs1+"&class1="+class1
	}
	window.location=url
}
//########################sortby functions#########################################
function stodate(s){ //expect "YYYY-MM-DD hh:mm:ss"
    console.log(s);
    var lst=s.split(" ");
    //console.log(lst);
    var lst2=lst[0].split("-");
    //console.log(lst2);
    var lst3=lst[1].split(":");
    //console.log(lst3);
    //console.log(parseInt(lst2[0]),parseInt(lst2[1]),parseInt(lst2[2]),parseInt(lst3[0]),parseInt(lst3[1]));
    var date=new Date(parseInt(lst2[0]),parseInt(lst2[1]),parseInt(lst2[2]),parseInt(lst3[0]),parseInt(lst3[1]));
    //console.log(date);
    return date;
}
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
function ec_pricecomp(a,b){
    var vala=parseInt(a.getAttribute("ec_price"));
    var valb=parseInt(b.getAttribute("ec_price"));
    return vala>valb?1:valb>vala?-1:0;
}
function fc_pricecomp(a,b){
    var vala=parseInt(a.getAttribute("fc_price"));
    var valb=parseInt(b.getAttribute("fc_price"));
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
    else if(attr=="ec_price"){
        arr.sort(ec_pricecomp);
    }
    else if(attr=="fc_price"){
        arr.sort(fc_pricecomp);
    }
    //console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        arr[i].parentNode.appendChild(arr[i]);
    }
}