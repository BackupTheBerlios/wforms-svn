
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
	 * Suffix of the ID for the hint element
     * @final
	 */
	HINT_SUFFIX : '-H',

	/**
	 * Creates new instance of the behavior
     * @constructor
	 */
	instance : function(f) {
		this.behavior = wFORMS.behaviors.hint; 
		this.target = f;
	}
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
				if(!e.addEventListener) base2.DOM.bind(e);
				if(e.tagName.match(/(select)|(input)|(textarea)/i)){		
					if(e.attachEvent) {
						// Weird behavior in IE when using Base2 addEventListener implementation
						// all focus/blur events on each instance of a repeated input are triggered. 
						// with attachEvent, only the hints on the master and the copy are triggered
						// .. maybe a side-effect of using cloneNode in repeat behavior.  
						e.attachEvent('onfocus', function() { b.run(window.event, e)});
						e.attachEvent('onblur',  function() { b.run(window.event, e)});
					} else {
						e.addEventListener('focus', function(event) { b.run(event, e)}, false);
						e.addEventListener('blur', function(event) { b.run(event, e)}, false);
					}			
				} else {
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
	if(!hint) return;
	if(event.type == 'focus' || event.type == 'mouseover'){
		hint.removeClass(wFORMS.behaviors.hint.CSS_INACTIVE)
		hint.addClass(wFORMS.behaviors.hint.CSS_ACTIVE);
		this.setup(hint, element);
	} else{
		hint.addClass(wFORMS.behaviors.hint.CSS_INACTIVE);
		hint.removeClass(wFORMS.behaviors.hint.CSS_ACTIVE);
	}
}


/**
 * Returns HTMLElement related to specified hint ID
 * @returns	{HTMLElement}
 */
wFORMS.behaviors.hint.instance.prototype.getElementByHintId = function(hintId){
	var id = hintId.substr(0, hintId.length - wFORMS.behaviors.hint.HINT_SUFFIX.length);
	var e = document.getElementById(id);
	return e;
}

/**
 * Returns HTMLElement Hint element associated with element event catched from
 * @returns	{HTMLElement}
 */
wFORMS.behaviors.hint.instance.prototype.getHintElement = function(element){
	var e = document.getElementById(element.id + this.behavior.HINT_SUFFIX);
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

/**
 * Returns if ID is of the HINT element. Used by repeat behavior to correctly 
 * update hint ID
 * @param	{DOMString}	id
 * @return	boolean
 */
wFORMS.behaviors.hint.isHintId = function(id){
	return id.match(new RegExp(wFORMS.behaviors.hint.HINT_SUFFIX + '$')) != null;
}
