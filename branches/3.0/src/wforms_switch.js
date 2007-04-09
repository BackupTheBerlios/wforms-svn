
if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms switch behavior.  
 * See: http://www.formassembly.com/wForms/v2.0/documentation/conditional-sections.php
 *  and http://www.formassembly.com/wForms/v2.0/documentation/examples/switch_validation.html 
 */
wFORMS.behaviors['switch']  = {
	instance: function(f) {
		this.behavior = wFORMS.behaviors['switch']; 
		this.target = f;
	}
 }

/**
 * Factory Method.
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 * @return {object} an instance of the behavior 
 */	
wFORMS.behaviors['switch'].applyTo = function(f) {
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
wFORMS.behaviors['switch'].instance.prototype.run = function(e, element) { }