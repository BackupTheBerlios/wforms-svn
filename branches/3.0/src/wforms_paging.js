
if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms paging behavior. 
 * @constructor
 */
wFORMS.behaviors.paging  = function() { }

/**
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 */	
wFORMS.behaviors.paging.prototype.applyTo = function(f) {
	// Use f.matchAll to find elements to which the behavior must be applied.
	// Add the event listener to trigger this.run()
}

/**
 * Executes the behavior
 * @param {event} e 
 * @param {domElement} element
 */
wFORMS.behaviors.paging.prototype.run = function(e, element) { }