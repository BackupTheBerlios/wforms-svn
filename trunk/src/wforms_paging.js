// ------------------------------------------------------------------------------------------
// Form Paging Behavior
// ------------------------------------------------------------------------------------------
  
// Change Log:
// v2.0.1 - March 22nd 2006 - Added onPageChange event and gotoPage method.

   if(wFORMS) {
		// Component properties 
		wFORMS.className_paging				= "wfPage";
		wFORMS.className_pagingCurrent		= "wfCurrentPage";
		wFORMS.className_pagingButtons		= "wfPageButton";
		wFORMS.className_hideSubmit			= "wfHideSubmit";
		wFORMS.idPrefix_pageIndex			= "wfPgIndex-";
		wFORMS.runValidationOnPageNext   	= true;
		
		if(!wFORMS.arrMsg) wFORMS.arrMsg 	= new Array();
		wFORMS.arrMsg[4] 					= "Next Page";      //arrMsg[4] for backward compatibility
		wFORMS.arrMsg[5] 					= "Previous Page";	//arrMsg[5] for backward compatibility


		wFORMS.behaviors['paging'] = {

			idSuffix_buttonsPlaceholder: "-buttons",
			className_pageNextButton: wFORMS.className_pagingButtons + " wfPageNextButton",
			className_pagePreviousButton: wFORMS.className_pagingButtons + " wfPagePreviousButton",			
			
			onPageChange : null, /* Function to run when the page is changed */

			// ------------------------------------------------------------------------------------------
			// evaluate: check if the behavior applies to the given node. Adds event handlers if appropriate
			// ------------------------------------------------------------------------------------------
			evaluate: function(node) {
				if (wFORMS.helpers.hasClass(node,wFORMS.className_paging)) {
					
					var currentPageIndex = wFORMS.behaviors['paging'].getPageIndex(node);
					if(currentPageIndex > 1) {
						// add previous page button	
						var placeholder = this.getButtonPlaceholder(node);
						var button = placeholder.insertBefore(this.createPreviousPageButton(),placeholder.firstChild);						
						wFORMS.helpers.addEvent(button,'click',wFORMS.behaviors['paging'].pagingPrevious);									
					} else {
						// set current page class
						node.className += ' ' + wFORMS.className_pagingCurrent;
						
						// get the corresponding form element
						var form = wFORMS.behaviors['paging'].getFormElement(node);	
							
						// hide submit button until the last page of the form is reached
						wFORMS.behaviors['paging'].hideSubmitButton(form);
												
						// prevent submission of form with enter key.
						wFORMS.helpers.addEvent(form,'submit', function(e) { var element = wFORMS.helpers.getSourceElement(e);
																			 if(element.type && element.type.toLowerCase()=='text') 
																				return wFORMS.preventEvent(e); } );
						wFORMS.preventSubmissionOnEnter = true; // for input validation behavior
						
					}
					if(document.getElementById(wFORMS.idPrefix_pageIndex+(currentPageIndex+1).toString())) {
						// add next page button	
						var placeholder = this.getButtonPlaceholder(node);
						var button = placeholder.appendChild(this.createNextPageButton());
						wFORMS.helpers.addEvent(button,'click',wFORMS.behaviors['paging'].pagingNext);	
					}
				}
			  
			},
			getButtonPlaceholder: function(page) {
				var p = document.getElementById(page.id+this.idSuffix_buttonsPlaceholder);
				if(!p) {
					return page;
				}				
				return p; 
			},
			createNextPageButton: function() {						
				var button = document.createElement("input"); 
				button.setAttribute('value',wFORMS.arrMsg[4]);	
				button.setAttribute('type',"button");	
				button.className = this.className_pageNextButton;
				return button;
			},
			createPreviousPageButton: function() {
				// add previous page button			
				var button = document.createElement("input"); 
				button.setAttribute('value',wFORMS.arrMsg[5]);	
				button.setAttribute('type',"button");	
				button.className = this.className_pagePreviousButton;
				return button;
			},
						
			// ------------------------------------------------------------------------------------------
			// pagingNext
			// ------------------------------------------------------------------------------------------
			pagingNext: function(e) {
				var element  = wFORMS.helpers.getSourceElement(e);
				if(!element) element = e
				
				var pageElement     = wFORMS.behaviors['paging'].getPageElement(element);
				var pageIndex       = wFORMS.behaviors['paging'].getPageIndex(pageElement) + 1;
				var nextPageElement = document.getElementById(wFORMS.idPrefix_pageIndex+pageIndex.toString());
				
				if(nextPageElement) {
					if(!wFORMS.hasBehavior('validation') ||
					   (wFORMS.hasBehavior('validation') && !wFORMS.runValidationOnPageNext) || 
					   (wFORMS.hasBehavior('validation') &&  wFORMS.runValidationOnPageNext && wFORMS.functionName_formValidation(e, true))) {
						pageElement.className      = pageElement.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
						nextPageElement.className += ' ' + wFORMS.className_pagingCurrent;

						// show submit button if the last page of the form is reached
						if(wFORMS.behaviors['paging'].isLastPage(pageIndex)) {
							var form = wFORMS.behaviors['paging'].getFormElement(nextPageElement);
							wFORMS.behaviors['paging'].showSubmitButton(form);
						}
					}

					// trigger onPageChange event						
					if(wFORMS.behaviors['paging'].onPageChange) {
						wFORMS.behaviors['paging'].onPageChange(nextPageElement);
					}
				}
			},
			
			// ------------------------------------------------------------------------------------------
			// pagingPrevious
			// ------------------------------------------------------------------------------------------				
			pagingPrevious: function(e) {
				var element  = wFORMS.helpers.getSourceElement(e);
				if(!element) element = e
 
				var pageElement         = wFORMS.behaviors['paging'].getPageElement(element);
				var pageIndex           = wFORMS.behaviors['paging'].getPageIndex(pageElement) - 1;
				var previousPageElement = document.getElementById(wFORMS.idPrefix_pageIndex+pageIndex.toString());

				if(previousPageElement) {
					pageElement.className          = pageElement.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
					previousPageElement.className += ' ' + wFORMS.className_pagingCurrent;										
															
					// hide submit button 
					var form = wFORMS.behaviors['paging'].getFormElement(previousPageElement);					
					wFORMS.behaviors['paging'].hideSubmitButton(form);
					
					// trigger onPageChange event
					if(wFORMS.behaviors['paging'].onPageChange) {
						wFORMS.behaviors['paging'].onPageChange(previousPageElement);
					}
				}
			},
			// ------------------------------------------------------------------------------------------
			// show/hide submit button
			// ------------------------------------------------------------------------------------------								
			showSubmitButton: function(form) {
				var buttons = form.getElementsByTagName('input');
				for (var i=0;i<buttons.length;i++) {
					if(buttons[i].type && buttons[i].type.toLowerCase() == 'submit') {
						buttons[i].className = buttons[i].className.replace(wFORMS.className_hideSubmit,"");
					}
				}
			},
			hideSubmitButton: function(form) {
				var buttons = form.getElementsByTagName('input');
				for (var i=0;i<buttons.length;i++) {
					if(buttons[i].type && buttons[i].type.toLowerCase() == 'submit' 
				       && !wFORMS.helpers.hasClass(buttons[i],wFORMS.className_hideSubmit) ) {
						buttons[i].className += ' ' + wFORMS.className_hideSubmit; 
					}
				}
			},
			
			// ------------------------------------------------------------------------------------------
			// isLastPage
			// ------------------------------------------------------------------------------------------					
			isLastPage: function(pageIndex) {
				if(isNaN(pageIndex)) {
					pageIndex = parseInt(pageIndex.replace(/[\D]*/,""));
				}
				pageIndex++;
				var furtherPageElement = document.getElementById(wFORMS.idPrefix_pageIndex+pageIndex.toString());			
				if(!furtherPageElement) 
					return true;
				return false;
			},
			// ------------------------------------------------------------------------------------------
			// gotoPage
			// ------------------------------------------------------------------------------------------				
			gotoPage: function(pageIndex) { 
				
				if(isNaN(pageIndex)) {
					var pageElement = document.getElementById(pageIndex);					
				} else {
					var pageElement = document.getElementById(wFORMS.idPrefix_pageIndex+pageIndex.toString());
				}				
				if(!pageElement) return false;
				
				// get the corresponding form element
				var form = wFORMS.behaviors['paging'].getFormElement(pageElement);
				
				// hide current page
				var allElements = form.getElementsByTagName("*");
				for(var i=0; i< allElements.length; i++) {
					var n =  allElements[i];
					if(wFORMS.helpers.hasClass(allElements[i],wFORMS.className_pagingCurrent)) {	
						n.className = n.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");	
						break;
					}
				}
				//show/hide submit button as necessary
				
				if(wFORMS.behaviors['paging'].isLastPage(pageIndex)) 
					wFORMS.behaviors['paging'].showSubmitButton(form);
				else { 
					wFORMS.behaviors['paging'].hideSubmitButton(form);
				}
				// Show the page
				pageElement.className += ' ' + wFORMS.className_pagingCurrent;
				
				// TO-DO: trigger onPageChange event ?
			},
			// ------------------------------------------------------------------------------------------
			// getFormElement
			// ------------------------------------------------------------------------------------------							
			getFormElement: function(element) {
				var form = element.parentNode;
				while(form && form.tagName.toUpperCase() != "FORM")
					form = form.parentNode;
				return form;
			},
			// ------------------------------------------------------------------------------------------
			// getPageElement
			// ------------------------------------------------------------------------------------------							
			getPageElement: function(element) {
				var n = element.parentNode;
				while(n && (!n.className || !wFORMS.helpers.hasClass(n,wFORMS.className_paging)))
					n = n.parentNode;
				return n;
			},
			// ------------------------------------------------------------------------------------------
			// getPageIndex
			// ------------------------------------------------------------------------------------------									
			getPageIndex: function(element) {
				if(element && element.id) 
					return parseInt(element.id.replace(/[\D]*/,""));
				else
					return null;
			}
       } // End wFORMS.behaviors['paging']
   }
   
   
   