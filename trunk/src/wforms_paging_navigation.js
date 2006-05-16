// ------------------------------------------------------------------------------------------
// Form Paging Behavior
// ------------------------------------------------------------------------------------------
// Adapted from Nedjo Rogers


 if(wFORMS && wFORMS.hasBehavior('paging')) {

 	wFORMS.behaviors['paging_navigation'] = {
		
		className_pagingNavigation   : "wfPagingNavigation",
		className_pagingNavigationCurrent : "wfPagingCurrent",
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
 				wFORMS.debug('top navigation found:'+node.id);
 				// function to be called when all behaviors for this form have been applied
				wFORMS.onLoadComplete.push(this.init); 
 			}
 			if (wFORMS.helpers.hasClass(node,wFORMS.className_paging)) {
 				if(node.getAttribute("title")) {
 					this.pagingNavigation.push(node);
 				}
 			}
 			
		},
 		
	   	// ------------------------------------------------------------------------------------------
       	// init: executed once evaluate has been applied to all elements
	   	// ------------------------------------------------------------------------------------------	   
	   	init: function() {
	   		var wb = wFORMS.behaviors['paging_navigation'];
	   		
	   		if(wb.usePagingNavigation) {
	   			wFORMS.debug('creating top navigation');
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
	 			var lk = this.createNavigationLink(title);
	 			lk.id   = "nav__" + page.id;
	 			lk.onclick = function() { wFORMS.behaviors['paging'].gotoPage(this.id.substr(this.id.indexOf('__')+2)); return false; };	 			
	 			li.appendChild(lk);
				li.appendChild(this.createNavigationSubtitle(subtitle));
				li.className = this.classNamePrefix_navigationLi + '-' + i.toString();
 				if(i==0) {
 					li.className += ' wfFirst ' + wb.className_pagingNavigationCurrent;
 				}
 				ul.appendChild(li);
 			}
 			this.navigationRoot.appendChild(ul);
 		},
 		
 		createNavigationLink: function(title) {
 			var a  = document.createElement("a");
	 		a.appendChild(document.createTextNode(title)); 
	 		a.href = "#"; 	
			return a;	
 		},
 		
 		createNavigationSubtitle : function(subtitle) {
 			return document.createTextNode(subtitle);
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
		