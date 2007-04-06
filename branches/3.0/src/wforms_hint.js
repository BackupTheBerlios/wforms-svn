
if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms hint behavior. Show/highlight an HTML element when the associated input gets the focus.
 * @constructor
 */
wFORMS.behaviors.hint  = function() { }

/**
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 */	
wFORMS.behaviors.hint.prototype.applyTo = function(f) {
	// Use f.matchAll to find elements to which the behavior must be applied.
	// Add the event listener to trigger this.run()
}

/**
 * Executes the behavior
 * @param {event} e 
 * @param {domElement} element
 */
wFORMS.behaviors.hint.prototype.run = function(e, element) { }