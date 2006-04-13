
// ------------------------------------------------------------------------------------------
// Field Hint / Tooltip Behavior
// ------------------------------------------------------------------------------------------
  
if(wFORMS) {

       // Component properties 
       wFORMS.idSuffix_fieldHint           = "-H";                     // a hint id is the associated field id (or name) plus this suffix
       wFORMS.className_inactiveFieldHint  = "field-hint-inactive";    // visual effect depends on CSS stylesheet
       wFORMS.className_activeFieldHint    = "field-hint";             // visual effect depends on CSS stylesheet
       
       
       wFORMS.behaviors['hint'] = {
           name: 'hint', 
           
		   // evaluate: check if the behavior applies to the given node. Adds event handlers if appropriate
           evaluate: function(node) {
               if(node.id || node.name) {
				   
                   // try with the id first
                   var fieldHint = document.getElementById(node.id   + wFORMS.idSuffix_fieldHint);
                   if(!fieldHint)
                       // try again with the name
                       fieldHint = document.getElementById(node.name + wFORMS.idSuffix_fieldHint); 
                   if(fieldHint) {
					  // wFORMS.debug('hint/evaluate: '+ (node.id || node.name));
					   switch(node.tagName.toUpperCase()) {
						   case 'SELECT': 
						   case 'TEXTAREA':						   
						   case 'INPUT':
		                       	wFORMS.helpers.addEvent(node,'focus',wFORMS.behaviors['hint'].run);
    		                   	wFORMS.helpers.addEvent(node,'blur' ,wFORMS.behaviors['hint'].remove);
							   	break;
						   default:
						  	 	wFORMS.helpers.addEvent(node,'mouseover',wFORMS.behaviors['hint'].run);
								wFORMS.helpers.addEvent(node,'mouseout' ,wFORMS.behaviors['hint'].remove);
						  		break;
					   }
                   } 
               }
           },
		   
           // run: executed when the behavior is activated
           run: function(e) {
               var element   = wFORMS.helpers.getSourceElement(e);
               var fieldHint = document.getElementById(element.id   + wFORMS.idSuffix_fieldHint);
               if(!fieldHint) // try again with the element's name attribute
                   fieldHint = document.getElementById(element.name + wFORMS.idSuffix_fieldHint);
               if(fieldHint) {
                   fieldHint.className = fieldHint.className.replace(wFORMS.className_inactiveFieldHint,
                                                                     wFORMS.className_activeFieldHint);
				   // Field Hint Absolute Positionning
				   fieldHint.style.top  =  (wFORMS.helpers.getTop(element)+ element.offsetHeight).toString() + "px";
				   if(element.tagName.toUpperCase() == 'SELECT') 
					   fieldHint.style.left =  (wFORMS.helpers.getLeft(element) + (element.offsetWidth- 8)).toString() + "px";
				   else 
					   fieldHint.style.left =  (wFORMS.helpers.getLeft(element)).toString() + "px"; /* + element.offsetWidth */
//				   wFORMS.debug('hint/run: ' + (element.id || element.name) , 5);				   
			   }
           },
		   
           // remove: executed if the behavior should not be applied anymore
           remove: function(e) {
               var element   = wFORMS.helpers.getSourceElement(e);
               var fieldHint = document.getElementById(element.id   + wFORMS.idSuffix_fieldHint);
               if(!fieldHint) // try again with the element's name attribute
                   fieldHint = document.getElementById(element.name + wFORMS.idSuffix_fieldHint);
               if(fieldHint)
                   fieldHint.className = fieldHint.className.replace(wFORMS.className_activeFieldHint,
                                                                     wFORMS.className_inactiveFieldHint);
//			   wFORMS.debug('hint/remove: ' + (element.id || element.name) , 5);				   
           }
       }
   }