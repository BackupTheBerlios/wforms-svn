// ------------------------------------------------------------------------------------------
// Form Paging Behavior
// ------------------------------------------------------------------------------------------
// Adapted from Nedjo Rogers
// NOT FULLY IMPLEMENTED YET.


 if(wFORMS && wFORMS.hasBehavior('paging')) {

 	wFORMS.behaviors['paging_navigation'] = {
		
		className_pagingNavigation   : "wfPagingNavigation",
		classNamePrefix_navigationLi : "wfPagingItem",
		usePagingNavigation : false,
		pagingNavigation 	: [],
		
		// ------------------------------------------------------------------------------------------
		// evaluate: check if the behavior applies to the given node. Adds event handlers if appropriate
		// ------------------------------------------------------------------------------------------
 		evaluate: function(node) { 			
 			if (wFORMS.helpers.hasClass(node,this.className_pagingNavigation)) {
 				this.usePagingNavigation = true;
 				this.currentNavigationIndex = 1; 
 				this.navigationRoot = node;				 				
 			}
 			if (wFORMS.helpers.hasClass(node,wFORMS.className_paging)) {
 				if(node.getAttribute("title")) {
 					this.pagingNavigation.push(node);
 				}
 			}
 			if(node.tagName && node.tagName.toUpperCase()=='FORM') {
				// function to be called when all behaviors for this form have been applied
				wFORMS.onLoadComplete.push(this.init); 
			}
		},
 		
	   	// ------------------------------------------------------------------------------------------
       	// init: executed once evaluate has been applied to all elements
	   	// ------------------------------------------------------------------------------------------	   
	   	init: function() {
	   		var wb = wFORMS.behaviors['paging_navigation'];
	   		if(wb.usePagingNavigation) {
		   		wb.createNavigation();
		   		wb._onPageChange = wFORMS.behaviors['paging'].onPageChange;
		   		
	   			wFORMS.behaviors['paging'].onPageChange = function(previousPageElement) {
					// TO-DO: change classnames on navigation					
					
					// call saved onPageChange function
					if(wb._onPageChange) { 		
		   				wb._onPageChange(previousPageElement);
		   			}
	   			}
		   		
		   	}
 		},
 		
 		createNavigation: function() {
 			var wb = wFORMS.behaviors['paging_navigation'];
 			var ul = document.createElement("ul");

 			for(var i=0; i < this.pagingNavigation.length; i++) {
 				var page  = this.pagingNavigation[i];
 				var title = this.getPageTitle(page);
 				var subtitle = this.getPageSubtitle(page);
	 			var li = document.createElement("li"); 
	 			var a  = document.createElement("a");
	 			a.appendChild(document.createTextNode(title)); 
	 			a.href = "#"; 			
 				wFORMS.helpers.addEvent(a,'click', function() { wFORMS.behaviors['paging'].gotoPage(page.id); } );
				li.appendChild(a);
				li.appendChild(document.createTextNode(subtitle));
				li.className = this.classNamePrefix_navigationLi + '-' + i.toString();
 				if(i==0) {
 					li.className += ' ' + wFORMS.className_pagingCurrent;
 				}
 				ul.appendChild(li);
 			}
 			this.navigationRoot.appendChild(ul);
 		},
 		
 		getPageTitle: function(n) {
 			var title = n.getAttribute("title");
 			if(title)
	 			return title.split(' | ')[0];
	 		return "Page "; // + page Index
 		},
 		
 		getPageSubtitle: function(n) {
 			var subtitle = n.getAttribute("title");
 			if(subtitle)
 				return " " + subtitle.split(' | ')[1];
 			return "";
 		}
 	}
 }
		