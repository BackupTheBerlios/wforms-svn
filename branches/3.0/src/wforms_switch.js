
if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms switch behavior.  
 * See: http://www.formassembly.com/wForms/v2.0/documentation/conditional-sections.php
 *  and http://www.formassembly.com/wForms/v2.0/documentation/examples/switch_validation.html 
 * @constructor
 */
wFORMS.behaviors['switch']  = function() { }

/**
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 */	
wFORMS.behaviors['switch'].prototype.applyTo = function(f) {
	// Use f.matchAll to find elements to which the behavior must be applied.
	// Add the event listener to trigger this.run()
}

/**
 * Executes the behavior
 * @param {event} e 
 * @param {domElement} element
 */
wFORMS.behaviors['switch'].prototype.run = function(e, element) { }