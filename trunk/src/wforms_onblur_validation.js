// ------------------------------------------------------------------------------------------
// Form On-Blur Validation Behavior
// Runs the validation when the user leaves a field (onblur event)
// Requires the wForms validation behavior.
// ------------------------------------------------------------------------------------------
  
   if(wFORMS) {

		wFORMS.behaviors['onblur_validation'] = {
						
		   // ------------------------------------------------------------------------------------------
		   // evaluate: check if the behavior applies to the given node. Adds event handlers if appropriate
		   // ------------------------------------------------------------------------------------------
			evaluate: function(node) {				
				if (wFORMS.helpers.hasClassPrefix(node,wFORMS.classNamePrefix_validation) ||
				  	wFORMS.helpers.hasClass(node,wFORMS.className_required) || 
				  	(arguments.length > 1 && arguments[1]==true)) { /* this is used to force the evaluation to add the events to fields nested within a required section */				  	  
					switch(node.tagName.toUpperCase()) {
						case 'INPUT':
							switch(node.type) {
								case 'radio':
								case 'checkbox':
									wFORMS.helpers.addEvent(node,'click', wFORMS.behaviors['onblur_validation'].run);
									break;
								default:
									wFORMS.helpers.addEvent(node,'blur', wFORMS.behaviors['onblur_validation'].run);
									break;
							}
							break;
						case 'SELECT':
						case 'TEXTAREA':						
		                   	wFORMS.helpers.addEvent(node,'blur', wFORMS.behaviors['onblur_validation'].run);
							wFORMS.debug('onblur_validation/evaluate: '+ node.id,3);
							break;
						default:
							// Not a form field. Required rule is applied on an element containing several fields.
							for(var i=0;i<node.childNodes.length;i++) {								
								if(node.childNodes[i].nodeType==1)
									wFORMS.behaviors['onblur_validation'].evaluate(node.childNodes[i],true);
							}
							break;
					}
						
				   
               }
           },
		   // ------------------------------------------------------------------------------------------
           // init: executed once evaluate has been applied to all elements
		   // ------------------------------------------------------------------------------------------	   
		   init: function() {
		   },
		   
		   // ------------------------------------------------------------------------------------------
           // run: executed when the behavior is activated
		   // ------------------------------------------------------------------------------------------	   		   
           run: function(e) {
				var element  = wFORMS.helpers.getSourceElement(e);
				if(!element) element = e;
				wFORMS.debug('onblur_validation/run: ' + element.id , 5);	
				
				var nbErrors = 0;
				var deepValidation = true;
				while(element && element.nodeName!='FORM') {			
					nbErrors += wFORMS.behaviors['validation'].validateElement(element, false, deepValidation);
					element=element.parentNode; // need to check the ancestors node for 'required' elements
					deepValidation = false; // only the first time since we're going up.
           		}	
				
				
				// savethe value in a property if someone else needs it.
				wFORMS.behaviors['validation'].errorCount = nbErrors;
				
				if (nbErrors > 0) {					
					//if(wFORMS.showAlertOnError){ wFORMS.behaviors['validation'].showAlert(nbErrors); }
				}
				return true;
			},
		   
			// ------------------------------------------------------------------------------------------
			// remove: executed if the behavior should not be applied anymore
			// ------------------------------------------------------------------------------------------
			remove: function() {
			}
		   
   }
}
   
   