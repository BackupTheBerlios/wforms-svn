
if (typeof(base2) == "undefined") {
	throw new Error("Base2 not found. wForms 3.0 depends on the base2 library.");
}
base2.DOM.bind(document);

if (typeof(wFORMS) == "undefined") {
	wFORMS = {};
}
wFORMS.NAME 	= "wFORMS";
wFORMS.VERSION 	= "3.0.alpha";
wFORMS.__repr__ = function () {
	return "[" + this.NAME + " " + this.VERSION + "]";
};
wFORMS.toString = function () {
	return this.__repr__();
};

wFORMS.behaviors = {};
wFORMS.helpers   = {}
wFORMS.instances = []; // keeps track of behavior instances

/**
 * Helper method.
 * @return {string} A randomly generated id (with very high probability of uniqueness). 
 */	
wFORMS.helpers.randomId = function () {
	var seed = (new Date()).getTime();
	seed = seed.toString().substr(6);
	for (var i=0; i<6;i++)
		seed += String.fromCharCode(48 + Math.floor((Math.random()*10)));
	return "id_" + seed;
}

/**
 * getFieldValue 
 * @param {domElement} element 
 * @returns {string} the value of the field. 
 */
wFORMS.helpers.getFieldValue = function(element) {
	switch(element.tagName) {
		case "INPUT":
			if(element.type=='checkbox')
				return element.checked?element.value:null;
			if(element.type=='radio')
				return element.checked?element.value:null;
			return element.value;
			break;
		case "SELECT":		
			if(element.selectedIndex==-1) {					
				return null; 
			} 
			if(element.getAttribute('multiple')) {
				var v=[];
				for(var i=0;i<element.options.length;i++) {
					if(element.options[i].selected) {
						v.push(element.options[i].value);
					}
				}
				return v;
			}											
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
 * Returns computed style from the element by style name
 * @param	{HTMLElement}	element
 * @param	{String}	styleName
 * @return	{String} or false
 */
wFORMS.helpers.getComputedStyle = function(element, styleName){
	if(document.defaultView && document.defaultView.getComputedStyle){
		return document.defaultView.getComputedStyle(element, "")[styleName];
	} else if(element.currentStyle){	
		return element.currentStyle[styleName];
	}
	return false;
}

/**
 * Returns left position of the element
 * @params	{HTMLElement}	elem	Source element 
 */
wFORMS.helpers.getLeft = function(elem){
	var pos = 0;
	while(elem.offsetParent) {
		if(wFORMS.helpers.getComputedStyle(elem, 'position') == 'relative'){
			return pos;
		}
		if(pos > 0 && wFORMS.helpers.getComputedStyle(elem, 'position') == 'absolute'){
			return pos;
		}
		pos += elem.offsetLeft;
		elem = elem.offsetParent;
	}
	return pos;
}

/**
 * Returns top position of the element
 * @params	{HTMLElement}	elem	Source element 
 */
wFORMS.helpers.getTop = function(elem){
	var pos = 0;
	while(elem.offsetParent) {
		if(wFORMS.helpers.getComputedStyle(elem, 'position') == 'relative'){
			return pos;
		}
		if(pos > 0 && wFORMS.helpers.getComputedStyle(elem, 'position') == 'absolute'){
			return pos;
		}
		pos += elem.offsetTop;
		elem = elem.offsetParent;
	}
	return pos;
}

/**
 * Activating an Alternate Stylesheet (thx to: http://www.howtocreate.co.uk/tutorials/index.php?tut=0&part=27)
 * Use this to activate a CSS Stylesheet that shouldn't be used if javascript is turned off.
 * The stylesheet rel attribute should be 'alternate stylesheet'. The title attribute MUST be set.
 */
wFORMS.helpers.activateStylesheet = function(sheetref) {
	if(document.getElementsByTagName) {
		var ss=document.getElementsByTagName('link');
	} else if (document.styleSheets) {
		var ss = document.styleSheets;
	}
	for(var i=0;ss[i];i++ ) {
		if(ss[i].href.indexOf(sheetref) != -1) {
			ss[i].disabled = true;
			ss[i].disabled = false;			
		}
	}
}

/**
 * Initialization routine. Automatically applies the behaviors to all web forms in the document.  
 */	
wFORMS.onLoadHandler = function() {
	document.matchAll("form").forEach(function(f){
		wFORMS.applyBehaviors(f);
	});	
}

/**
 * Initialization routine. Automatically applies all behaviors to the given element.
 * @param {domElement} A form element, or any of its children.
 * TODO: Kill existing instances before applying the behavior to the same element. 
 */	
wFORMS.applyBehaviors = function(f) {
	if(!f.matchAll)
		base2.DOM.bind(f);
		
// hack [don] {{{
// This hack is done due to switch reflects on the Targets state depends on triggers
// state. I.e. if checkbox is checked its target should be on state
// and inside the paging while applying it calls switch behavior (static method)
// to check if Page is on or Off. So if paging will be loaded before switch it would be
// initialized with possible fake values
	if(wFORMS.behaviors['switch']){
		var b = wFORMS.behaviors['switch'].applyTo(f);
		if(!wFORMS.instances['switch']) {
			wFORMS.instances['switch'] = [b];
		} else {
			wFORMS.removeBehavior(f, 'switch');
			wFORMS.instances['switch'].push(b);
		}
	}
// hack [don] }}}

	for(var behaviorName in wFORMS.behaviors) {
// hack [don] {{{
		if(behaviorName == 'switch'){
			continue;
		}
// hack [don] }}}
		var b = wFORMS.behaviors[behaviorName].applyTo(f);
		// behaviors may create several instances
		// if single instance returned, convert it to an array
		if(b && b.constructor.toString().indexOf("Array") == -1) {
			b=[b];			
		} 
		for(var i=0;b && i<b.length;i++) {
			if(!wFORMS.instances[behaviorName]) {
				wFORMS.instances[behaviorName] = [b[i]];
			} else {
				wFORMS.removeBehavior(f, behaviorName);
				wFORMS.instances[behaviorName].push(b[i]);
			}
		}
	}
}

wFORMS.removeBehavior = function(f, behaviorName) {
	
	return null;
	
	if(!wFORMS.instances[behaviorName]) 
		return null;

	for(var i=0; i < wFORMS.instances[behaviorName].length; i++) {
		if(wFORMS.instances[behaviorName][i].target==f) {
			
			// TODO: call a remove method for each behavior to cleanly remove any event handler
			wFORMS.instances[behaviorName][i] = null;
		}	
	}
	return null;
}

/**
 * Returns the behavior instance associated to the given form/behavior pair.
 * @param	{domElement}	a HTML element (often the form element itself)
 * @param	{string}		the name of the behavior 
 * @return	{object}		the instance of the behavior 
 * TODO: Returns an array if more than one instance for the given form
 */
wFORMS.getBehaviorInstance = function(f, behaviorName) {
	if(!wFORMS.instances[behaviorName]) 
		return null;

	for(var i=0; i < wFORMS.instances[behaviorName].length; i++) {
		if(wFORMS.instances[behaviorName][i].target==f) {
			return wFORMS.instances[behaviorName][i];
		}	
	}
	return null;
}

document.addEventListener('DOMContentLoaded',wFORMS.onLoadHandler,false);
// Attach JS only stylesheet.
wFORMS.helpers.activateStylesheet('wforms-jsonly.css');
