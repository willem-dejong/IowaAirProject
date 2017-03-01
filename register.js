/**
 * Created by matt on 3/1/17.
 */
function validateForm(){
    var missingFlag = false;
    var emailFlag = false;

    document.getElementById('missingErr').style.display = 'none';
    document.getElementById('invalidEmail').style.display = 'none';
    document.getElementById('emailInUse').style.display = 'none';
    document.getElementById('fnamelab').style.color = 'black';
    document.getElementById('lnamelab').style.color = 'black';
    document.getElementById('emaillab').style.color = 'black';
    document.getElementById('phonelab').style.color = 'black';

    if(!(document.getElementById('fnamein').value)){
        document.getElementById('fnamelab').style.color = 'red';
        missingFlag = true;
    }
    if(!(document.getElementById('lnamein').value)){
        document.getElementById('lnamelab').style.color = 'red';
        missingFlag = true;
    }
    if(!(document.getElementById('emailin').value)){
        document.getElementById('emaillab').style.color = 'red';
        missingFlag = true;
    }
    else{
        var emailMatch = document.getElementById('emailin').value.match(/[A-Za-z0-9]+([.\-_][A-Za-z0-9]+)*@[A-Za-z0-9]+([.\-_][A-Za-z0-9]+)*\.[A-Za-z]+/g)
        console.log(emailMatch);
        if(emailMatch && document.getElementById('emailin').value != emailMatch[0]){
            console.log("incorrect");
            emailFlag = true;
            document.getElementById('emaillab').style.color = 'red';
        }
        else if(!emailMatch){
            console.log("incorrect");
            emailFlag = true;
            document.getElementById('emaillab').style.color = 'red';
        }
        else{
            console.log("correct");
        }

    }
    if(!(document.getElementById('phonein').value)){
        document.getElementById('phonelab').style.color = 'red';
        missingFlag = true;
    }
    //else{
    //    var phoneMatch = document.getElementById('phonein').value.match()     /////////////// CHECK IF PHONE IS VALID FORMAT ////////////
    //}

    if(missingFlag || emailFlag){
        if(missingFlag){
            document.getElementById('missingErr').style.display = 'block';
        }
        if(emailFlag){
            document.getElementById('invalidEmail').style.display = 'block';
        }
        console.log("return false");
        //return false;
    }
    else{
        console.log("return true");
        //return true;
    }

}