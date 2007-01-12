// wForms - a javascript extension to web forms.
// Copyright (c) 2005-2007 Cédric Savarese <pro@4213miles.com>
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>


wFORMS.helpers.addEvent(window,'load', enableResumeLater);
wFORMS.functionName_formValidation = "doPostBack";

function enableResumeLater() {
	document.getElementById('tfa_resumeLater').onclick = function(e) { document.getElementById('tfa_resumeLater').value=" ... "; };
}

function doPostBack(e) {
	
	if(!e) e = window.event;		
	var f = wFORMS.helpers.getSourceElement(e);
    var currentPageOnly = arguments.length>1 ? arguments[1]:false;
	
	if(document.getElementById('tfa_resumeLater').value == " ... ")  // save for later was clicked. (see above: enableResumeLater)
		return true;
	if(wf.formValidation(e, currentPageOnly)) { 					 // else call the default error management.
		return true;
	} else
		return wFORMS.helpers.preventEvent(e); 
}
