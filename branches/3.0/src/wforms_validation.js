
if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms validation behavior
 * @constructor
 */
wFORMS.behaviors.validation  = function() {
	
	var Rule = function(selector, check, fail, pass) {
		this.selector = selector;
		this.check = check;
		this.fail = fail;
		this.pass = pass;
	}

	this.rules = {	
	/* 	Rule Name				Selector 				Check function 			Fail function 	Pass function (optional) */
		isRequired	: new Rule(".required", 			this.validateRequired, 	this.fail), 
		isAlpha		: new Rule(".validate-alpha", 		this.validateAlpha, 	this.fail),
		isAlphanum	: new Rule(".validate-alphanum",	this.validateAlphanum,	this.fail), 
		isDate		: new Rule(".validate-date", 		this.validateDate, 		this.fail), 
		isTime		: new Rule(".validate-time", 		this.validateTime, 		this.fail), 
		isEmail		: new Rule(".validate-email", 		this.validateEmail, 	this.fail), 
		isInteger	: new Rule(".validate-integer", 	this.validateInteger, 	this.fail), 
		isFloat		: new Rule(".validate-float", 		this.validateFloat, 	this.fail), 
		isCustom	: new Rule(".validate-custom",		this.validateCustom, 	this.fail)
	}	
	
	this.styling = {
		fieldError	: "errFld",
		errorMessage: "errMsg"
	}
	
	this.messages = {
		isRequired 		: "This field is required. ",
		isAlpha 		: "The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed.",
		isEmail 		: "This does not appear to be a valid email address.",
		isInteger 		: "Please enter an integer.",
		isFloat 		: "Please enter a number (ex. 1.9).",
		isAlphanum 		: "Please use alpha-numeric characters only [a-z 0-9].",
		isDate 			: "This does not appear to be a valid date.",
		isCustom		: "Please enter a valid value.",
		notification	: "%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided.",  // %% will be replaced by the actual number of errors.
	}
}

/**
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself. 
 */	
wFORMS.behaviors.validation.prototype.applyTo = function(f) {
			
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
	this.target = f;
	var self = this;
	f.addEventListener('submit', function(e){ return self.run(e, this)} ,false);		   
}
 	
/**
 * Executes the behavior
 * @param {event} e 
 * @param {domElement} element
 */
wFORMS.behaviors.validation.prototype.run = function(e, element) { 
 		
 	var errorCount = 0;
 	for (var ruleName in this.rules) {
 		var rule = this.rules[ruleName];
 		var self = this;
 		element.matchAll(rule.selector).forEach(function(element) { 

 			// remove existing error message if any.
			self.removeErrorMessage(element);
											
 			if(!rule.check.call(self, element)) { 
 				rule.fail.call(self, element, ruleName);  
 				errorCount ++;
 			} else if(rule.pass) {
 				rule.pass.call(self, element);
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
wFORMS.behaviors.validation.prototype.fail = function(element, ruleName) {

	// set class to show that the field has an error
	element.addClass(this.styling.fieldError);
		
	// show error message.
	this.addErrorMessage(element, this.messages[ruleName]);			
},
	
/**
 * pass
 * @param {domElement} element 
 */	
wFORMS.behaviors.validation.prototype.pass = function(element) { /* no implementation needed */ }

/**
 * addErrorMessage
 * @param {domElement} element 
 * @param {string} error message 
 */
wFORMS.behaviors.validation.prototype.addErrorMessage = function(element, message) {
	
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
	p.addClass(this.styling.errorMessage);							
}

/**
 * removeErrorMessage
 * @param {domElement} element 
 */
wFORMS.behaviors.validation.prototype.removeErrorMessage = function(element) { 
	if(element.hasClass(this.styling.fieldError)) {
		element.removeClass(this.styling.fieldError);
		var errorMessage  = document.getElementById(element.id + "-E");
		if(errorMessage)  {				
			errorMessage.parentNode.removeChild(errorMessage); 
		}
	}
}

/**
 * Checks if the given string is empty (null or whitespace only)
 * @param {string} s 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.prototype.isEmpty = function(s) {				
	var regexpWhitespace = /^\s+$/;
	return  ((s == null) || (s.length == 0) || regexpWhitespace.test(s));
}

/**
 * validateRequired
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.prototype.validateRequired = function(element) {
	switch(element.tagName) {
		case "INPUT":
			var inputType = element.getAttribute("type");
			if(!inputType) inputType = 'text'; 
			switch(inputType.toLowerCase()) {
				case "checkbox":
					return element.checked; 
					break;
				case "radio":
					return element.checked; 
					break;
				default:
					return !this.isEmpty(element.value);
			}
			break;
		case "SELECT":							
			if(element.selectedIndex==-1) {					
				return false; // multiple select with no selection
			} else 												
				return !this.isEmpty(element.options[element.selectedIndex].value);
			break;
		case "TEXTAREA":
			return !this.isEmpty(element.value);
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
wFORMS.behaviors.validation.prototype.validateOneRequired = function(element) {
	/* not yet implemented */	
}

