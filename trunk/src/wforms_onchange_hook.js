// ------------------------------------------------------------------------------------------
// Form On-Change Hook Behavior
// Attach an onchange event handler to all form inputs.
// Whenever a form field is modified, the function defined by the onchange property is called
// The list of modified fields is available in the the changeFields property.
//
// Can be used to show an 'apply' button or automatically save changes.
// ------------------------------------------------------------------------------------------
  
   if(wFORMS) {

	   wFORMS.behaviors['onchange_hook'] = {
		   	
		   changedFields: null, /* changed fields (array of elements) */
		   onchange: null, /* function to be called whenever a form field is changed */
		   
						
		   // ------------------------------------------------------------------------------------------
		   // evaluate: check if the behavior applies to the given node. Adds event handlers if appropriate
		   // ------------------------------------------------------------------------------------------
			evaluate: function(node) {
				switch(node.tagName.toUpperCase()) {
					case 'INPUT':
					case 'SELECT':
					case 'TEXTAREA':						
						wFORMS.helpers.addEvent(node,'change', wFORMS.behaviors['onchange_hook'].run);
						break;
				}						
           },
		   // ------------------------------------------------------------------------------------------
           // run: executed when the behavior is activated
		   // ------------------------------------------------------------------------------------------	   		   
           run: function(e) {
				var element  = wFORMS.helpers.getSourceElement(e);
				if(!element) element = e;
				wFORMS.debug('onchange_hook/run: ' + element.id , 5);	
				var wb = wFORMS.behaviors['onchange_hook'];
				// keep a list of modified elements
				if(!wb.changedFields) 
					wb.changedFields = new Array();
				l=wb.changedFields.length;
				for(var i=l-1; i>=0 && wb.changedFields[i]!=element;i--);
				if(i<0) {
					wb.changedFields[l] = element;
				}
				if(wb.onchange) 
					return wb.onchange();
				return true;
			},
			// ------------------------------------------------------------------------------------------
			// remove: executed if the behavior should not be applied anymore
			// ------------------------------------------------------------------------------------------
			remove: function() {
				wFORMS.behaviors['onchange_hook'].changedFields = null;
			},		
   }
}
   
   