function sendaddemployee(){
	var cmd = "/addemployee?fname="+document.getElementById('fnamein').value+"&lname="+document.getElementById('lnamein').value+"&email="+document.getElementById('emailin').value;
	
	$.ajax({url:cmd,success:function(result){

		if(result=="success"){
			document.queryselector("#registration").removeChild(document.queryselector("#missingErr"));
			document.queryselector("#registration").removeChild(document.queryselector("#invalidEmail"));
			document.queryselector("#registration").removeChild(document.queryselector("#emailInUse"));
			document.queryselector("#registration").removeChild(document.queryselector("#regForm"));

			var form = document.createElement("form");
			form.appendChild(div);
				var label = document.createElement("label");
				label.appendChild(document.createTextNode("Employee Added Successfully!"));
		}

		else if(result=="email in use"){
			document.querySelector("#emailinuse").style.display="block";
		}
	}
}