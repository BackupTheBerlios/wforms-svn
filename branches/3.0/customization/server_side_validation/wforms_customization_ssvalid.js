/**
 * wForms Server-side Form Validation
 * by Pieter Portauw 
 * 
 */
if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
if (typeof(wFORMS.behaviors.validation) == "undefined") {
	throw new Error("wFORMS validation behavior not found. This customization depends on the validation behavior.");
}


wFORMS.behaviors.validation.rules.isServerSide = {
	selector: 	".validate-server-side",
	check:		"validateServerSide"
} 

wFORMS.behaviors.validation.instance.prototype.validateServerSide = function(element, value) {
	
	var url =element.className.split(" ");
	//get other field values
	var otherfield="";
	var otherfieldFlag = false;
	//Here you take the parameters for server-side validation if this depends from some fields
	if(url.length>2){
		for(var i=2;i<url.length;i++){
			if(url[i]!="errFld"){
			//create URL with other fields
			otherfield+="&"+document.getElementById(url[i]).name+"="+document.getElementById(url[i]).value;
			for(var j=0;j<wFORMS.errorArray.length; j++){
				if(document.getElementById(url[i]).name == wFORMS.errorArray[j].name){
					otherfieldFlag=true;
					}
				};
			}
		}
	}
	
	var newurl = url[1]+"&value="+element.value+otherfield; //concat value of the element test and other fiels
	// if (wFORMS.errorFlag == false){
	if(otherfieldFlag == false){
	
		var test = this.doServerSideValidation(newurl, element); //do serverside test with ajax
		var test =test.replace(/^\s+|\s+$/g,"");
		
		if(test != 'true'){
			if(otherfield!="")
			{
			// display only a top message error if there is multiple fields
			document.getElementById(wFORMS.behaviors['validation'].errorPlaceHolder).innerHTML += test+"<br />";
			// add error style to alll 
			for(var i=2;i<url.length;i++){
			this.addErrorMessage(document.getElementById(url[i]),"");
			}
			}else{
			// display error message
			this.addErrorMessage(element, test);
			}
			wFORMS.errorFlag = true;
			wFORMS.errorArray.push(element);
			nbErrors++;			
		}
	}
}	
	
//Here is the actual server-side validation done
wFORMS.behaviors.validation.instance.prototype.doServerSideValidation = function(url,element) {
	
	var totalResult = false;
	
	var alertContents = function() {
	   	if (http_request.readyState == 4) {
			if ((http_request.status == 200)) {
				totalResult = http_request.responseText;						
			} else {
				//Error server side / abort test
				throw new Error('There was a problem with the request.');				
			}
		}
	}
			
	var makeRequest = function(url) {
		var http_request = false;
		if (window.XMLHttpRequest) { // Mozilla, Safari,...
			http_request = new XMLHttpRequest();
			if (http_request.overrideMimeType) {
				http_request.overrideMimeType('text/html');
			}
		}
		else if (window.ActiveXObject) { // IE
			try {
				http_request = new ActiveXObject("Msxml2.XMLHTTP");
		 	} catch (e) {
				try {
			   		http_request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (!http_request) {
			throw new Error('Cannot create XMLHTTP instance');
		}
		http_request.onreadystatechange = alertContents;
	  	http_request.open('GET',url, false);//FALSE TO MAKE IT SYNCHRONOUS ELSE THE JAVASCRIPT WILL NOT WAIT FOR THE COMPLETION
	  	http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http_request.send(null);
	}
	
	makeRequest(url);
 	return totalResult;
} 
