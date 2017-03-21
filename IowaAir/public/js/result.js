function createfboxes(url,twoway,second){
    var pi=url.indexOf("pass=");
    var urlf="/node/getFlights?";
    if(second){
            var urll="/node/getFlights?"+url.substring(pi,url.indexOf("&",pi))+"&fnum="+url.substring(url.indexOf("fnum=")+5,url.length)+"&";
            //console.log("Urll",urll);
            $.ajax({url:urll,success:function(result){
                    createcart(result);
            }});
            var i=url.indexOf("org=")+4;
            var ii=url.indexOf("&",i);
            var dest=url.substring(i,ii);
            i= url.indexOf("dest=")+5;
            ii=url.indexOf("&",i);
            var org=url.substring(i,ii);
            i= url.indexOf("date2=")+6;
            ii=url.indexOf("&",i);
            var date=url.substring(i,ii);
            i= url.indexOf("pass=")+5;
            ii=url.indexOf("&",i);
            var pass=url.substring(i,ii);
            urlf=urlf+"org="+org+"&dest="+dest+"&date="+date+"&pass="+pass;
            //console.log(urlf);
    }
    else{
            var i = url.indexOf("pass=");
            var ii=url.indexOf("&",i);
            urlf=urlf+url.substring(1,url.indexOf("&date2="))+"&"+url.substring(i,ii);
    }
    $.ajax({url:urlf,success:function(result){
            if (result==""){
                    var li=document.createElement("li");
                    li.setAttribute("class","resultitem");
                    li.appendChild(document.createTextNode("Sorry no Flights found. Please try different Search parameters."));
                    document.querySelector("#resultlist").appendChild(li);
            }
            else{
                createresultlist(url,twoway,second,result);
            }
    }});
}






function checkprevious(){
    var twoway=false;
    var second=false;
    var path="";
    if(window.location.pathname!=null){
        path=window.location.pathname;
    }
    var search="";
    if(window.location.search!=null){
        search= window.location.search;
    }
    url=window.location.hostname+path+search;
    //localhost/result.html?org=ORD&dest=CID&date=2017-07-12&date2=2017-07-12&pass=1&last=%27localhost/result.html%27&fnum=3rddw
    if((url.search("localhost/result\\.html\\?org=.+&dest=.+&date=[0-9]{4}\\-[0-9]{2}\\-[0-9]{2}&date2=([0-9]{4}\\-[0-9]{2}\\-[0-9]{2})?&pass=[0-9]+&last=(%27localhost%27|%27localhost/result.html%27&fnum=.+)")==-1)){
        //console.log("a")
        window.location="/"
    }
    if (url.search("date2=[0-9]{4}\\-[0-9]{2}\\-[0-9]{2}")>-1){
        twoway=true;
        if(url.search("last=%27localhost/result.html%27&fnum=.+")!=-1){
            second=true;
        }
    }
    else if(url.search("last=%27localhost/result.html%27")!=-1){
        //console.log("b")
        window.location="/"
    }
    return [twoway,second,url];
}

function resultsession(){
    var i =document.cookie.search("IOWAAIRSESSION=[A-Za-z0-9]+");
    if (i==-1){
        //console.log("c")
        window.location = "/";
    }
    else{
        ii= document.cookie.indexOf(";",i);
        if (ii==-1){
            ii=document.cookie.length;
        }
        var IAses="/node/autologin?cookie="+document.cookie.substring(i+15,ii);
        $.ajax({url:IAses, success: function(result){ //result if active session=> sessionid=XXXX;
            if(result)
            var ai=result.search("idaccount=[A-Za-z0-9]+");
            if (ai>-1){
                var ss=document.createTextNode("Welcome Back ");
                document.querySelector("#log").appendChild(ss);
                var aa=document.createElement("A");//account ##########Stuff to do here##########
                aa.setAttribute("href","fill me in");
                var iii= result.search("fname=")+6;
                var name=result.substring(iii,result.indexOf(";",iii));
                var ss2=document.createTextNode(name);
                aa.appendChild(ss2);
                document.querySelector("#log").appendChild(aa);
                document.querySelector("#log").appendChild(document.createTextNode("!/"));
                var aa2=document.createElement("A");//logout ##########Stuff to do here##########
                aa2.setAttribute("onclick","logout()");
                aa2.setAttribute("href","javascript:void(0)");
                aa2.appendChild(document.createTextNode("logout"));
                document.querySelector("#log").appendChild(aa2);
            }
            else{
                if(result=="s="){
                    window.location = "/";
                }
                loginreg()
            }
        }});
    }
}


//########################sortby functions#########################################
function stodate(s){ //expect "YYYY-MM-DD hh:mm:ss"
    //console.log(s);
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
    //console.log(vala,"\n",valb);
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
    //console.log(lst);
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
    //console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        arr[i].parentNode.appendChild(arr[i]);
    }

}




//##########################result box functions######################################
function createToFromBox(fromID,destID,FromNM,ToNM,DeptTime,ArriveTime,TotTime,ListedTimes){
    var tofrombox=document.createElement("DIV");                             //<div class="tofrombox">
        tofrombox.setAttribute("class","tofrombox");
        //tofrombox.appendChild(document.createElement("BR"));                 //  <br>
        var from_tofrom1=document.createElement("DIV");                      //  <div class="from tofromh1">
            from_tofrom1.setAttribute("class","from tofromh1");
            var b=document.createElement("B");                               //      <b>fromID</b>
                b.appendChild(document.createTextNode(fromID));              //  </div>
            from_tofrom1.appendChild(b);
        tofrombox.appendChild(from_tofrom1);
        var mid_tofrom1=document.createElement("DIV");                       //  <div class="mid tofromh1">
            mid_tofrom1.setAttribute("class","mid tofromh1");
                b=document.createElement("B");                               //      <b>to</b>
                b.appendChild(document.createTextNode("to"));                //  </div>
            mid_tofrom1.appendChild(b);
        tofrombox.appendChild(mid_tofrom1);
        var to_tofrom1=document.createElement("DIV");                        //  <div class="to tofromh1">
            to_tofrom1.setAttribute("class","to tofromh1");
                b=document.createElement("B");                               //      <b>to</b>
                b.appendChild(document.createTextNode(destID));              //  </div>
            to_tofrom1.appendChild(b);
        tofrombox.appendChild(to_tofrom1);
        var tofrom2a=document.createElement("div");                          //  <div class="tofromh2a">
            tofrom2a.setAttribute("class","tofromh2a");
            var dd=document.createElement("div");
                dd.appendChild(document.createTextNode("From: "+FromNM));   //      <div>From: FromNM</div>
            tofrom2a.appendChild(dd);
        tofrombox.appendChild(tofrom2a);
        var tofrom2b=document.createElement("div");                         //  <div class="tofromh2b">
            tofrom2b.setAttribute("class","tofromh2b");
                dd=document.createElement("div");
                dd.appendChild(document.createTextNode("To: "+ToNM));       //      <div>From: ToNM</div>
            tofrom2b.appendChild(dd);                                       //  </div>
        tofrombox.appendChild(tofrom2b);
        var from_tofrom3=document.createElement("div");
            from_tofrom3.setAttribute("class","from tofromh3");              //  <div class="from tofromh3">
                dd=document.createElement("div");
                dd.setAttribute("class","tofrom3");                         //      <div class="tofrom3">
                var spt=DeptTime.split(" ");
                var time1=spt[1];
                var ci=time1.indexOf(":")
                var hr1=parseInt(time1.substring(0,ci));
                var aop1="AM";
                if (hr1>=12){
                    aop1="PM";
                    if(hr1!=12){
                        hr1=hr1-12;
                    }
                }
                else if(hr1==0){hr1=12;}
                var dpttime=String(hr1)+":"+time1.substring(ci+1,time1.indexOf(":",ci+1))+" "+aop1;
                //console.log(dpttime);
                dd.appendChild(document.createTextNode(dpttime));          //          DeptTime
            from_tofrom3.appendChild(dd);
        tofrombox.appendChild(from_tofrom3);                                //      </div>
        var mid_tofrom3=document.createElement("div");
            mid_tofrom3.setAttribute("class","mid tofromh3");              //  <div class="from tofromh3">
                dd=document.createElement("div");
                dd.setAttribute("class","tofrom3");                         //      <div class="tofrom3">
                var span=document.createElement("span");                    //          <span class="dash" onclick="this.parentElement.parentElement.parentElement.querySelector('.flighttimes').style.display='block';">-</span>
                    span.setAttribute("class","dash");
                    span.setAttribute("onclick","this.parentElement.parentElement.parentElement.querySelector('.flighttimes').style.display='block';");
                    span.appendChild(document.createTextNode("-"));
                dd.appendChild(span);                                       //      </div>
            mid_tofrom3.appendChild(dd);                                    //  </div>
        tofrombox.appendChild(mid_tofrom3);
        var to_tofrom3=document.createElement("div");
            to_tofrom3.setAttribute("class","to tofromh3");                 //  <div class="from tofromh3">
                dd=document.createElement("div");
                dd.setAttribute("class","tofrom3");                         //      <div class="tofrom3">
                var spt=ArriveTime.split(" ");
                var time2=spt[1];
                var ci=time2.indexOf(":")
                var hr2=parseInt(time2.substring(0,ci));
                var aop2="AM";
                if (hr2>=12){
                    aop2="PM";
                    if(hr2!=12){
                        hr2=hr2-12;
                    }
                }
                else if(hr2==0){hr2=12;}
                var arvtime=String(hr2)+":"+time2.substring(ci+1,time2.indexOf(":",ci+1))+" "+aop2;
                //console.log(arvtime);
                dd.appendChild(document.createTextNode(arvtime));        //          ArriveTime
            to_tofrom3.appendChild(dd);
        tofrombox.appendChild(to_tofrom3);                                  //      </div>
        var tofrom4=document.createElement("div");
            tofrom4.setAttribute("class","tofromh4");                       //  <div class="tofromh4">
                dd=document.createElement("div");
                dd.appendChild(document.createTextNode(TotTime));           //      <div>TotTime</div>
            tofrom4.appendChild(dd);
        tofrombox.appendChild(tofrom4);                                     //  </div>
        var ftbox=document.createElement("div");
            ftbox.setAttribute("class","flighttimes");                      //  <div class="flighttimes">
                span=document.createElement("span");
                span.setAttribute("class","close");
                span.setAttribute("onclick","this.parentElement.style.display='none';");
                span.appendChild(document.createTextNode("X"));
            ftbox.appendChild(span);                                        //      <span class="close" onclick="this.parentElement.style.display='none';">&times</span>
            ftbox.appendChild(document.createElement("br"));                //      <br>
            lst=ListedTimes.split("\n");
            for(var i in lst){
                ftbox.appendChild(document.createTextNode(lst[i]));     //      ListedTimes
                ftbox.appendChild(document.createElement("br"));
            }
        tofrombox.appendChild(ftbox);                                       //  </div>
    return tofrombox;                                                       //</div>
}
function createflightsbox(NumStops,StopChain,PlaneDetails){
    var ftbox=document.createElement("div");
        ftbox.setAttribute("class","flights");                              //<div class="flights">
        ftbox.appendChild(document.createElement("BR"));                    //  <br>
        var nstops=document.createElement("div");
            nstops.setAttribute("class","numstops");                        //  <div class="numstops">
            var b=document.createElement("B");
                b.appendChild(document.createTextNode(NumStops+" Stops"));  //      <b>NumStops Stops</b>
            nstops.appendChild(b);
        ftbox.appendChild(nstops);                                          //  </div>
        var stops=document.createElement("div");
            stops.setAttribute("class","indstops");                         //  <div class="indstops">
            stops.appendChild(document.createTextNode(StopChain));          //      StopChain
            stops.appendChild(document.createElement("br"));                //      <br>
            lst=PlaneDetails.split("\n");
            for(var i in lst){
                stops.appendChild(document.createTextNode(lst[i]));         //      PlaneDetails
                stops.appendChild(document.createElement("br"));
            }
        ftbox.appendChild(stops);                                           //  </div>
    return ftbox;                                                           //<div>
}
function createbookitbox(Price,book){
    var bookit=document.createElement("div");
        bookit.setAttribute("class","bookit");                              //<div class="bookit">
        var price=document.createElement("div");
            price.setAttribute("class","price");                            //  <div class="price">
            var b=document.createElement("b");
                b.appendChild(document.createTextNode("$"+Price));              //      <b>Price</b>
            price.appendChild(b);
            if (book!=null){
                price.appendChild(document.createElement("br"));            //      <br>
                //console.log(book);
                var a=document.createElement("a");
                a.setAttribute("href",book);
                a.appendChild(document.createTextNode("Book"));              //      <a href="">Book</a>
                price.appendChild(a);
            }
            else{
                //console.log("ggg");
            }
        bookit.appendChild(price);                                          //  </div>
    return bookit;                                                          //</div>
}
function createresultitem(fromID,destID,FromNM,ToNM,DeptTime,ArriveTime,TotTime,ListedTimes,NumStops,StopChain,PlaneDetails,Price,book,lii){
    var li;
    if(lii){
       li=document.createElement("li");
    }
    else{
        li=document.createElement("div");
    }
    li.setAttribute("class","resultitem");
    li.setAttribute("dept-time",DeptTime);
    li.setAttribute("arrive-time",ArriveTime);
    li.setAttribute("price",parseInt(Price));
    li.setAttribute("nstops", parseInt(NumStops));
    var spto=TotTime.split(" ");
    var timeint=parseInt(spto[0])*100+parseInt(spto[2]);
    li.setAttribute("tottime",timeint);
    var tofrombox=createToFromBox(fromID,destID,FromNM,ToNM,DeptTime,ArriveTime,TotTime,ListedTimes);
    li.appendChild(tofrombox);
    var flights= createflightsbox(NumStops,StopChain,PlaneDetails);
    li.appendChild(flights);
    var bookit=createbookitbox(Price,book);
    li.appendChild(bookit);
    return  li;
}
function createresultlist(url,twoway,second,argstr){//expect 1 or more "fromID;destID;FromNM;ToNM;DeptTime;ArriveTime;TotTime;ListedTimes;NumStops;StopChain;PlaneDetails;Price;fnum;" separated by ","
    var lst=argstr.split(",");
    //console.log(lst);
    var ul=document.querySelector("#resultlist");
    for (var x in lst){
        var lst2=lst[x].split(";");
        //console.log(lst2);
        var fromID=lst2[0];
        var destID=lst2[1];
        var FromNM=lst2[2];
        var ToNM=lst2[3];
        var DeptTime=lst2[4];
        var ArriveTime=lst2[5];
        var TotTime=lst2[6];
        var ListedTimes=lst2[7];
        var NumStops=lst2[8];
        var StopChain=lst2[9];
        var PlaneDetails=lst2[10];
        var Price=lst2[11];
        var book="";
        if (twoway&&!second){
           book=url.substring(9,url.indexOf("last="))+"last='localhost/result.html'&fnum="+lst2[12];
           //console.log(book);
        }
        else if(twoway&&second){
           book="/book?last='localhost/result.html'&"+url.substring(url.indexOf("fnum="),url.length)+"&fnum2="+lst2[12];
        }
        else{
            book="/book?last='localhost/result.html'&&fnum="+lst2[12];
        }
        ul.appendChild(createresultitem(fromID,destID,FromNM,ToNM,DeptTime,ArriveTime,TotTime,ListedTimes,NumStops,StopChain,PlaneDetails,Price,book,true));
        sortby("price");
    }
}
function createcart(argstr){//expect only one "fromID;destID;FromNM;ToNM;DeptTime;ArriveTime;TotTime;ListedTimes;NumStops;StopChain;PlaneDetails;Price;fnum;"
    lst=argstr.split(";");
    //console.log(argstr);
    var fromID=lst[0];
    var destID=lst[1];
    var FromNM=lst[2];
    var ToNM=lst[3];
    var DeptTime=lst[4];
    var ArriveTime=lst[5];
    var TotTime=lst[6];
    var ListedTimes=lst[7];
    var NumStops=lst[8];
    var StopChain=lst[9];
    var PlaneDetails=lst[10];
    var Price=lst[11];
    var book=null;
    dd=document.querySelector("#twoway");
    dd.appendChild(createresultitem(fromID,destID,FromNM,ToNM,DeptTime,ArriveTime,TotTime,ListedTimes,NumStops,StopChain,PlaneDetails,Price,book,false));
}