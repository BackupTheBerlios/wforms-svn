
if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms hint behavior. Show/highlight an HTML element when the associated input gets the focus.
 */
wFORMS.behaviors.hint  = { 
	
	/**
	 * Inactive CSS class for the element
     * @final
	 */
	CSS_INACTIVE : 'field-hint-inactive',

	/**
	 * Active CSS class for the element
     * @final
	 */
	CSS_ACTIVE : 'field-hint',

	/**
	 * Selector expression for the hint elements
     * @final
     * @see	http://www.w3.org/TR/css3-selectors/
	 */
	HINT_SELECTOR : '*[id$="-H"]',

	/**
	 * Creates new instance of the behavior
     * @constructor
	 */
	instance : function(f) {
		this.behavior = wFORMS.behaviors.hint; 
		this.target = f;
	},
}

/**
 * Factory Method.
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 * @return {object} an instance of the behavior 
 */	
wFORMS.behaviors.hint.applyTo = function(f) {
	var b = new wFORMS.behaviors.hint.instance(f);

	// Selects all hints elements using predefined selector and attaches
	// event listeners to related HTML elements for each hint
	f.matchAll(wFORMS.behaviors.hint.HINT_SELECTOR).forEach(
		function(elem){
			// ID attribute is not checked here because of selector already contains it
			// if selector is changed, ID check should also exists
			// if(!elem.id) { return ; }
			var e = b.getElementByHintId(elem.id);
			if(e){
				if(e.tagName.match(/(select)|(input)|(textarea)/i)){
					e.addEventListener('focus', function(event) { b.run(event, e)}, false);
					e.addEventListener('blur', function(event) { b.run(event, e)}, false);
				}else{
					e.addEventListener('mouseover', function(event) { b.run(event, e)}, false);
					e.addEventListener('mouseout', function(event) { b.run(event, e)}, false);
				}
			}
		}
	);

	return b;
}

/**
 * Executes the behavior
 * @param {event} event
 * @param {domElement} elem
 */
wFORMS.behaviors.hint.instance.prototype.run = function(event, element) { 
	var hint = this.getHintElement(element);
	if(event.type == 'focus' || event.type == 'mouseover'){
		hint.removeClass(wFORMS.behaviors.hint.CSS_INACTIVE)
		hint.addClass(wFORMS.behaviors.hint.CSS_ACTIVE);
		this.setup(hint, element);
	}else{
		hint.addClass(wFORMS.behaviors.hint.CSS_INACTIVE)
		hint.removeClass(wFORMS.behaviors.hint.CSS_ACTIVE);
	}
}


/**
 * Returns HTMLElement related to specified hint ID
 * @returns	{HTMLElement}
 */
wFORMS.behaviors.hint.instance.prototype.getElementByHintId = function(hintId){
	var e = document.matchSingle(hintId.replace(/^(.*)-H$/, "#$1"));
	// Workaround because of by w3c specification matchSingle should return null
	// in case element was not found. However library returns '' in this case
	return e && e != '' ? e : null;
}

/**
 * Returns HTMLElement Hint element associated with element event catched from
 * @returns	{HTMLElement}
 */
wFORMS.behaviors.hint.instance.prototype.getHintElement = function(element){
	var e = document.matchSingle('#' + element.id + '-H');
	return e && e != '' ? e : null;
}


/**
 * Setups hint position on the screen depend on the element
 * @param	{HTMLElement}	hint	Hint HTML element
 * @param   {HTMLElement}	source	HTML element with focus.
 */
wFORMS.behaviors.hint.instance.prototype.setup = function(hint, source){
	
	hint.style.left = ((source.tagName == 'SELECT' ? 
		 + source.offsetWidth : 0) + wFORMS.helpers.getLeft(source)) + "px";
	hint.style.top  = (wFORMS.helpers.getTop(source) + source.offsetHeight) + "px";	
}