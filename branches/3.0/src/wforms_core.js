
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
 */	
wFORMS.applyBehaviors = function(f) {
	for(var behaviorName in wFORMS.behaviors) {
		var b = wFORMS.behaviors[behaviorName].applyTo(f);
	}
}

document.addEventListener('DOMContentLoaded',wFORMS.onLoadHandler,false);
