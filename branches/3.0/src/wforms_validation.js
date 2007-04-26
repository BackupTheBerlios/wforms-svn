
if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms validation behavior
 * 
 */
wFORMS.behaviors.validation = {

	rules: {	
		isRequired	: { selector: ".required", 			check: 'validateRequired'}, 
		isAlpha		: { selector: ".validate-alpha", 	check: 'validateAlpha'},
		isAlphanum	: { selector: ".validate-alphanum",	check: 'validateAlphanum'}, 
		isDate		: { selector: ".validate-date", 	check: 'validateDate'}, 
		isTime		: { selector: ".validate-time", 	check: 'validateTime'}, 
		isEmail		: { selector: ".validate-email", 	check: 'validateEmail'}, 
		isInteger	: { selector: ".validate-integer", 	check: 'validateInteger'}, 
		isFloat		: { selector: ".validate-float", 	check: 'validateFloat'}, 
		isCustom	: { selector: ".validate-custom",	check: 'validateCustom'}
	},	
	
	styling: {
		fieldError	: "errFld",
		errorMessage: "errMsg"
	},
	
	messages: {
		isRequired 		: "This field is required. ",
		isAlpha 		: "The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed.",
		isEmail 		: "This does not appear to be a valid email address.",
		isInteger 		: "Please enter an integer.",
		isFloat 		: "Please enter a number (ex. 1.9).",
		isAlphanum 		: "Please use alpha-numeric characters only [a-z 0-9].",
		isDate 			: "This does not appear to be a valid date.",
		isCustom		: "Please enter a valid value.",
		notification	: "%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided.",  // %% will be replaced by the actual number of errors.
	},
	
	instance: function(f) {
		this.behavior = wFORMS.behaviors.validation; 
		this.target = f;
	}
}

/**
 * Factory Method
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 * @return {object} an instance of the behavior 
 */	
wFORMS.behaviors.validation.applyTo = function(f) {
		
	if(!f || !f.tagName) {
		throw new Error("Can't apply behavior to " + f);
	}
	if(f.tagName!="FORM") {
		if(f.form) 
			f=f.form;
		else {
			for(f = f.parentNode; f && f.tagName!="FORM" ;f = f.parentNode) continue;
			if(!f || f.tagName!="FORM") {
				throw new Error("Can't apply behavior to " + f);
			}
		}
	}
	
	var v = new wFORMS.behaviors.validation.instance(f);
	f.addEventListener('submit', function(e){ return v.run(e, this)} ,false);	
	return v;	   
}
 
 
/**
 * Executes the behavior
 * @param {event} e 
 * @param {domElement} element
 */
wFORMS.behaviors.validation.instance.prototype.run = function(e, element) { 
 	var errorCount = 0;
 	for (var ruleName in this.behavior.rules) {
 		var rule = this.behavior.rules[ruleName];
   		var self = this;
 		
 		element.matchAll(rule.selector).forEach(function(element) { 
			console.log(element);
			e.preventDefault?e.preventDefault():e.returnValue = false;
		 	return false;
		 		
		
 			// remove existing error message if any.
			self.removeErrorMessage(element);
			var	value = self.getFieldValue(element);	
			if(rule.check.call) {
				var passed = rule.check.call(self, element, value);
			} else {
				var passed = self[rule.check].call(self, element, value);
			}				
 			if(!passed) { 
 				if(rule.fail) {
 					// custom fail method
 					rule.fail.call(self, element, ruleName);
 				} else {
 					// default fail method
 					self.fail.call(self, element, ruleName);
 				} 					
 				errorCount ++;
 			} else if(rule.pass) {
 				// runs custom pass method. 
 				rule.pass.call(self, element);
 			} else {
 				// default pass method
 				self.pass.call(self, element);
 			}	 			
 		});
 	}
 	if(errorCount > 0) {
		e.preventDefault?e.preventDefault():e.returnValue = false;
 		return false;
 	}
 	return true; 
}
/**
 * fail
 * @param {domElement} element 
 */
wFORMS.behaviors.validation.instance.prototype.fail = function(element, ruleName) { 

	// set class to show that the field has an error
	element.addClass(this.behavior.styling.fieldError);
	// show error message.
	this.addErrorMessage(element, this.behavior.messages[ruleName]);			
},
	
/**
 * pass
 * @param {domElement} element 
 */	
wFORMS.behaviors.validation.instance.prototype.pass = function(element) { /* no implementation needed */ }

/**
 * addErrorMessage
 * @param {domElement} element 
 * @param {string} error message 
 */
wFORMS.behaviors.validation.instance.prototype.addErrorMessage = function(element, message) {
	
	// we'll need an id here.
	if (!element.id) element.id = wFORMS.helpers.randomId(); 
	
	// Prepare error message
	var txtNode = document.createTextNode(" " + message);
	
	// Find error message placeholder.
	var p = document.getElementById(element.id + "-E");
	if(!p) { // create placeholder.
		p = document.createElement("div"); 
		p.setAttribute('id', element.id + "-E");			
		p = element.parentNode.insertBefore(p,element.nextSibling);
	}
	// Finish the error message.
	p.appendChild(txtNode);
	base2.DOM.bind(p);  
	p.addClass(this.behavior.styling.errorMessage);							
}

/**
 * removeErrorMessage
 * @param {domElement} element 
 */
wFORMS.behaviors.validation.instance.prototype.removeErrorMessage = function(element) { 
	if(element.hasClass(this.behavior.styling.fieldError)) {
		element.removeClass(this.behavior.styling.fieldError);
		var errorMessage  = document.getElementById(element.id + "-E");
		if(errorMessage)  {				
			errorMessage.parentNode.removeChild(errorMessage); 
		}
	}
}

/**
 * getFieldValue 
 * @param {domElement} element 
 * @returns {string} the value of the field. 
 */
wFORMS.behaviors.validation.instance.prototype.getFieldValue = function(element) {
	switch(element.tagName) {
		case "INPUT":
			return element.value;
			break;
		case "SELECT":							
			if(element.selectedIndex==-1) {					
				return null; 
			} else 												
				return element.options[element.selectedIndex].value;
			break;
		case "TEXTAREA":
			// TODO: fix this
			return element.value;
			break;
		default:
			return null; 
			break;
	} 	 
}
/**
 * Checks if the given string is empty (null or whitespace only)
 * @param {string} s 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.isEmpty = function(s) {				
	var regexpWhitespace = /^\s+$/;
	return  ((s == null) || (s.length == 0) || regexpWhitespace.test(s));
}

/**
 * validateRequired
 * @param {domElement} element 
 * @param {string} element's value (if available) 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateRequired = function(element, value) {
	switch(element.tagName) {
		case "INPUT":
			var inputType = element.getAttribute("type");
			if(!inputType) inputType = 'text'; 
			switch(inputType.toLowerCase()) {
				case "checkbox":
				case "radio":
					return element.checked; 
					break;
				default:
					return !this.isEmpty(value);
			}
			break;
		case "SELECT":							
			return !this.isEmpty(value);
			break;
		case "TEXTAREA":
			return !this.isEmpty(value);
			break;
		default:
			return this.validateOneRequired(element);
			break;
	} 	 
	return false 
};

/**
 * validateOneRequired
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateOneRequired = function(element) {
	/* not yet implemented */	
}

