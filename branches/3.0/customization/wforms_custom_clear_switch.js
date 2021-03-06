
if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
if (typeof(wFORMS.behaviors['switch']) == "undefined") {
	throw new Error("wFORMS switch behavior not found. This behavior depends on the wFORMS switch behavior.");
}

/**
 * Handler for the 'switchOff' event.
 */
new function(_) {

	// preserve any existing handler
	if(wFORMS.behaviors['switch'].onSwitchOff)
		var _onSwitchOff = wFORMS.behaviors['switch'].onSwitchOff;
		
	wFORMS.behaviors['switch'].onSwitchOff = function(element) {			
		// clear field values
		wFORMS.helpers.clearFieldValues(element);
		// run any other existing handler
		if (_onSwitchOff) _onSwitchOff(element);
	}
}();

/**
 * Helper method to clear field values (walking down the node tree recursively)
 * @param	DOMElement	the element clear
 */		
wFORMS.helpers.clearFieldValues = function(element) {
	if(!element) return;
	switch(element.tagName) {
		case "INPUT":
			if(element.type=='checkbox' || element.type=='radio') {
				if (element.checked) element.checked = false;
			} else //  if(element.type!='hidden') skip hidden fields?
				element.value = "";					
			break;
		case "SELECT":		
			if(element.selectedIndex!=-1) {					
				element.selectedIndex = -1;
			} 										
			for(var i=0;i<element.options.length;i++) {
				if(element.options[i].selected) {
					element.options[i].selected = false;
				}
			}
			break;
		case "TEXTAREA":
			element.value = "";
			break;
		default:
			for (var i=0, l=element.childNodes.length;i<l;i++) {
				if(element.childNodes[i].nodeType==1)
					wFORMS.helpers.clearFieldValues(element.childNodes[i]);
			} 
			break;
	}	
	if(element.form) {
		// If calculation behavior is set, run it to update dependant formulas
		var b = wFORMS.getBehaviorInstance(element.form,"calculation");
		if(b) {
			b.run(null,element);	
		}
	}		
}
