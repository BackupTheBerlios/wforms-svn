
if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms repeat behavior. 
 * See: http://www.formassembly.com/wForms/v2.0/documentation/examples/repeat.html
 */
wFORMS.behaviors.repeat = {
	
	instance: function(f) {
		this.behavior = wFORMS.behaviors.repeat; 
		this.target = f;
	}
}

/**
 * Factory Method.
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 * @return {object} an instance of the behavior 
 */	
wFORMS.behaviors.repeat.applyTo = function(f) {
	// Use f.matchAll to find elements to which the behavior must be applied.
	// create a new instance of the behavior:
	// var b = new wFORMS.behaviors.hint.instance(f);
	// use addEventListener to trigger b.run()
	// return b
}

/**
 * Executes the behavior
 * @param {event} e 
 * @param {domElement} element
 */
wFORMS.behaviors.repeat.instance.prototype.run = function(e, element) { }