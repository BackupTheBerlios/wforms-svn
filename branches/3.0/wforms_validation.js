
if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms validation behavior
 * 
 */
wFORMS.behaviors.validation = {

	rules: {	
		isRequired	: { selector: ".required", 			  check: 'validateRequired'}, 
		isAlpha		: { selector: ".validate-alpha", 	  check: 'validateAlpha'},
		isAlphanum	: { selector: ".validate-alphanum",	  check: 'validateAlphanum'}, 
		isDate		: { selector: ".validate-date", 	  check: 'validateDate'}, 
		isTime		: { selector: ".validate-time", 	  check: 'validateTime'}, 
		isEmail		: { selector: ".validate-email", 	  check: 'validateEmail'}, 
		isInteger	: { selector: ".validate-integer", 	  check: 'validateInteger'}, 
		isFloat		: { selector: ".validate-float", 	  check: 'validateFloat'}, 
		isCustom	: { selector: ".validate-custom",	  check: 'validateCustom'}
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
		notification	: "%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided."  // %% will be replaced by the actual number of errors.
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
		// look for form tag in the ancestor nodes.
		if(f.form) 
			f=f.form;
		else {
			var _f = f;
			for(f = f.parentNode; f && f.tagName!="FORM" ;f = f.parentNode) continue;
			if(!f || f.tagName!="FORM") {
				// form tag not found, look for nested forms.
				f = _f.getElementsByTagName('form');				
			}
		}
	}
	if(!f.tagName && f.length>0) {
		var v = new Array();
		for(var i=0;i<f.length;i++) {
			var _v = new wFORMS.behaviors.validation.instance(f[i]); 	
			if(!f[i].addEventListener) base2.DOM.bind(f[i]);		
			f[i].addEventListener('submit', function(e){ return _v.run(e, this)} ,false);
			v.push(_v);	
		}
	} else {
		var v = new wFORMS.behaviors.validation.instance(f);
		if(!f.addEventListener) base2.DOM.bind(f);
		f.addEventListener('submit', function(e){ return v.run(e, this)} ,false);	
	}
		
	return v;	   
}
 
 
/**
 * Executes the behavior
 * @param {event} e 
 * @param {domElement} element
 */
wFORMS.behaviors.validation.instance.prototype.run = function(e, element) { 
 	var errorCount = 0;
 	this.elementsInError = {};
 	
 	for (var ruleName in this.behavior.rules) {
 		var rule = this.behavior.rules[ruleName];
   		var _self = this;
		
		if(!element.matchAll)
			base2.DOM.bind(element);
		
 		element.matchAll(rule.selector).forEach(function(element) { 
									
			// TODO: Check if the element is in a multi-page form
			
			// Do not validate elements that are switched off by the switch behavior
			if(_self.isSwitchedOff(element))
				return;			
			
			var	value = wFORMS.helpers.getFieldValue(element);	
			if(rule.check.call) {
				var passed = rule.check.call(_self, element, value);
			} else {
				var passed = _self[rule.check].call(_self, element, value);
			}				
 			if(!passed) { 
 				if(!element.id) element.id = wFORMS.helpers.randomId();
 				_self.elementsInError[element.id] = { id:element.id, rule: ruleName };
 				_self.removeErrorMessage(element); 
 				if(rule.fail) {
 					// custom fail method
 					rule.fail.call(_self, element, ruleName);
 				} else {
 					// default fail method
 					_self.fail.call(_self, element, ruleName);
 				} 					
 				errorCount ++;
 			} else {
 				// If no previous rule has found an error on that field,
 				// remove any error message from a previous validation run.
 				if(!_self.elementsInError[element.id])
 					_self.removeErrorMessage(element);
 				
 				if(rule.pass) {
	 				// runs custom pass method. 
	 				rule.pass.call(_self, element);
	 			} else {
	 				// default pass method
	 				_self.pass.call(_self, element);
	 			}	 			
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
	if(!element.hasClass) base2.DOM.bind(element);
	if(element.hasClass(this.behavior.styling.fieldError)) {
		element.removeClass(this.behavior.styling.fieldError);
		var errorMessage  = document.getElementById(element.id + "-E");
		if(errorMessage)  {				
			errorMessage.parentNode.removeChild(errorMessage); 
		}
	}
}

/**
 * Checks the element's 'visibility' (switch behavior)
 * @param {domElement} element 
 * @return	{boolean}	true if the element is not 'visible' (switched off), false otherwise.
 */
wFORMS.behaviors.validation.instance.prototype.isSwitchedOff = function(element) {
	var sb = wFORMS.getBehaviorInstance(this.target,'switch');
	if(sb) { 
		var parentElement = element;
		while(parentElement && parentElement.tagName!='BODY') {
			// TODO: Check what happens with elements with multiple ON and OFF switches	
			if(parentElement.className && 
			   parentElement.className.indexOf(sb.behavior.CSS_OFFSTATE_PREFIX)!=-1 &&
			   parentElement.className.indexOf(sb.behavior.CSS_ONSTATE_PREFIX)==-1
			   ) {
				// switched off. skip element.
				return true;
			}
			parentElement = parentElement.parentNode;
		}
	}	
	return false;
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
	if(element.nodeType != 1) return false;
	
	if(this.isSwitchedOff(element))
		return false;	
	
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
					return !this.isEmpty(wFORMS.helpers.getFieldValue(element));
			}
			break;
		case "SELECT":							
			return !this.isEmpty(wFORMS.helpers.getFieldValue(element));
			break;
		case "TEXTAREA":
			return !this.isEmpty(wFORMS.helpers.getFieldValue(element));
			break;
		default:
			for(var i=0; i<element.childNodes.length;i++) {
				if(this.validateOneRequired(element.childNodes[i])) return true;
			}
			break;
	} 	 
	return false 
}

/**
 * validateAlpha
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateAlpha = function(element, value) {
	var regexp = /^[a-zA-Z\s]+$/; // Add ' and - ?
	return this.isEmpty(value) || regexp.test(value);
}

/**
 * validateAlphanum
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateAlphanum = function(element, value) {
	var regexp = /^[\w\s]+$/;
	return this.isEmpty(value) || regexp.test(value);
}

/**
 * validateDate
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateDate = function(element, value) {
	var testDate = new Date(value);
	return this.isEmpty(value) || !isNaN(testDate);
}

/**
 * validateTime
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateTime = function(element, value) {
	/* not yet implemented */	
	return true;
}

/**
 * validateEmail
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateEmail = function(element, value) {
	var regexpEmail = /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
	return this.isEmpty(value) || regexpEmail.test(value);
}

/**
 * validateInteger
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateInteger = function(element, value) {
	var regexp = /^[+]?\d+$/;
	return this.isEmpty(value) || regexp.test(value);
}

/**
 * validateFloat
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateFloat = function(element, value) {
	return this.isEmpty(value) || !isNaN(parseFloat(value));
}

/**
 * validateCustom
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateCustom = function(element, value) {	
	var pattern = new RegExp("\/(.*)\/([gi]*)");
	var matches = element.className.match(pattern);
	//console.log(matches);
	if(matches && matches[0]) {										
		var validationPattern = new RegExp(matches[1],matches[2]);
		if(!value.match(validationPattern)) {
			return false									
		}
	}		
	return true;
}
