


function wHELPERS() {};

// addEvent adapated from http://ejohn.org/projects/flexible-javascript-events/
// and  Andy Smith's (http://weblogs.asp.net/asmith/archive/2003/10/06/30744.aspx)
wHELPERS.prototype.addEvent = function(obj, type, fn) {
	if(!obj) { return; }
	
	if (obj.attachEvent) {
		obj['e'+type+fn] = fn;
		obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
		obj.attachEvent( 'on'+type, obj[type+fn] );
	} else if(obj.addEventListener) {			
		obj.addEventListener( type,fn, false );
	} else {
		var originalHandler = obj["on" + type]; 
		if (originalHandler) { 
		  obj["on" + type] = function(e){originalHandler(e);fn(e);}; 
		} else { 
		  obj["on" + type] = fn; 
		} 
	}
}

wHELPERS.prototype.removeEvent = function(obj, type, fn) {
	if (obj.detachEvent) {
		obj.detachEvent( 'on'+type, obj[type+fn] );
		obj[type+fn] = null;
	} else if(obj.removeEventListener)
		obj.removeEventListener( type, fn, false );
	else {
		obj["on" + type] = null;
	}
}

// Returns the event's source element 
wHELPERS.prototype.getSourceElement = function(e) {	
	if(!e) e = window.event;	
	if(e.target)
		var srcE = e.target;
	else
		var srcE = e.srcElement;
	if(!srcE) return null;
	if(srcE.nodeType == 3) srcE = srcE.parentNode; // safari weirdness		
	if(srcE.tagName.toUpperCase()=='LABEL' && e.type=='click') { 
		// when clicking a label, firefox fires the input onclick event
		// but the label remains the source of the event. In Opera and IE 
		// the source of the event is the input element. Which is the 
		// expected behavior, I suppose.		
		if(srcE.getAttribute('for')) {
			srcE = document.getElementById(srcE.getAttribute('for'));
		}
	}
	return srcE;
}

// Cancel the default execution of an event.
wHELPERS.prototype.preventEvent = function(e) {
	if (!e) e = window.event;
	if (e.preventDefault) e.preventDefault();
	else e.returnValue = false;
	return false;
}

// Cancel the propagation of the event
wHELPERS.prototype.stopPropagation = function(e) {
	if (!e) var e = window.event;
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
}

// Generates a random ID
wHELPERS.prototype.randomId = function () {
	var seed = (new Date()).getTime();
	seed = seed.toString().substr(6);
	for (var i=0; i<6;i++)
		seed += String.fromCharCode(48 + Math.floor((Math.random()*10)));
	return "id-" + seed;
}

// Activating an Alternate Stylesheet (thx to: http://www.howtocreate.co.uk/tutorials/index.php?tut=0&part=27)
// Use this to activate a CSS Stylesheet that shouldn't be used if javascript is turned off.
// The stylesheet rel attribute should be 'alternate stylesheet'. The title attribute MUST be set.
wHELPERS.prototype.activateStylesheet = function(sheetref) {
	if(document.getElementsByTagName) {
		var ss=document.getElementsByTagName('link');
	} else if (document.styleSheets) {
		var ss = document.styleSheets;
	}
	for(var i=0;ss[i];i++ ) {
		if(ss[i].href.indexOf(sheetref) != -1) {
			ss[i].disabled = true;
			ss[i].disabled = false;			
		}
	}
}

// hasClass
wHELPERS.prototype.hasClass = function(element,className) {
	if(element && element.className) {
		if((' ' + element.className + ' ').indexOf(' ' + className +' ') != -1) {
			return true;
		}
	}
	return false;
}
wHELPERS.prototype.hasClassPrefix = function(element,className) {
	if(element && element.className) {
		if((' ' + element.className).indexOf(' ' + className) != -1) {
			return true;
		}
	}
	return false;
}



// getTop / getLeft  
// Returns pixel coordinates from the top-left window corner.
wHELPERS.prototype.getTop = function(obj) {
	var cur = 0;
	if(obj.offsetParent) {		
		while(obj.offsetParent) {
			if((new wHELPERS()).getComputedStyle(obj,'position') == 'relative' ) {
				// relatively postioned element
				return cur;
			}
			cur+=obj.offsetTop;
			obj = obj.offsetParent;
		}
	}
	return cur;
}
wHELPERS.prototype.getLeft = function(obj) {
	var cur = 0;
	if(obj.offsetParent) {		
		while(obj.offsetParent) {
			if((new wHELPERS()).getComputedStyle(obj,'position') == 'relative' ) {
				// relatively postioned element
				return cur;
			}
			cur+=obj.offsetLeft;
			obj = obj.offsetParent;
		}
	}
	return cur;
}

wHELPERS.prototype.getComputedStyle = function(element, styleName) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(element,"").getPropertyValue(styleName);
	} else if(element.currentStyle) {	
		return element.currentStyle[styleName];
	}
	return false;
}
// backward compatibility
	var wHelpers = wHELPERS;   


   /* 
	* MISC FUNCTIONS 
   /* ------------------------------------------------------------------------------------------ */

// Push implementation for IE5/mac
if (!Array.prototype.push) { 
	Array.prototype.push = function() { 
		for (var i = 0; i < arguments.length; ++i) { 
			this[this.length] = arguments[i]; 
		} 
		return this.length; 
	}; 
}

// @name      The Fade Anything Technique
// @namespace http://www.axentric.com/aside/fat/
// @version   1.0-RC1
// @author    Adam Michela
var Fat = {
	make_hex : function (r,g,b) 
	{
		r = r.toString(16); if (r.length == 1) r = '0' + r;
		g = g.toString(16); if (g.length == 1) g = '0' + g;
		b = b.toString(16); if (b.length == 1) b = '0' + b;
		return "#" + r + g + b;
	},
	fade_element : function (id, fps, duration, from, to) 
	{
		if (!fps) fps = 30;
		if (!duration) duration = 3000;
		if (!from || from=="#") from = "#FFFF33";
		if (!to) to = this.get_bgcolor(id);
		
		var frames = Math.round(fps * (duration / 1000));
		var interval = duration / frames;
		var delay = interval;
		var frame = 0;
		
		if (from.length < 7) from += from.substr(1,3);
		if (to.length < 7) to += to.substr(1,3);
		
		var rf = parseInt(from.substr(1,2),16);
		var gf = parseInt(from.substr(3,2),16);
		var bf = parseInt(from.substr(5,2),16);
		var rt = parseInt(to.substr(1,2),16);
		var gt = parseInt(to.substr(3,2),16);
		var bt = parseInt(to.substr(5,2),16);
		
		var r,g,b,h;
		while (frame < frames)
		{
			r = Math.floor(rf * ((frames-frame)/frames) + rt * (frame/frames));
			g = Math.floor(gf * ((frames-frame)/frames) + gt * (frame/frames));
			b = Math.floor(bf * ((frames-frame)/frames) + bt * (frame/frames));
			h = this.make_hex(r,g,b);
		
			setTimeout("Fat.set_bgcolor('"+id+"','"+h+"')", delay);

			frame++;
			delay = interval * frame; 
		}
		setTimeout("Fat.set_bgcolor('"+id+"','"+to+"')", delay);
	},
	set_bgcolor : function (id, c)
	{
		var o = document.getElementById(id);
		if(o)
			o.style.backgroundColor = c;
	},
	get_bgcolor : function (id)
	{
		var o = document.getElementById(id);
		while(o)
		{
			var c;
			if (window.getComputedStyle) c = window.getComputedStyle(o,null).getPropertyValue("background-color");
			if (o.currentStyle) c = o.currentStyle.backgroundColor;
			if ((c != "" && c != "transparent") || o.tagName == "BODY") { break; }
			o = o.parentNode;
		}
		if (c == undefined || c == "" || c == "transparent") c = "#FFFFFF";
			var rgb = c.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);
			if (rgb) c = this.make_hex(parseInt(rgb[1]),parseInt(rgb[2]),parseInt(rgb[3]));
			return c;
		}
	}

  if(wHELPERS) {
	  var wFORMS = { 
	  
	  debugLevel     : 0, /* 0: Inactive, 1+: Debug Level */
	  
	  helpers        : new wHELPERS(),     
	  behaviors      : {},
	  onLoadComplete : new Array(),  /* stack of functions to call once all behaviors have been applied */
	  
	  onLoadHandler  : function() {
		  for(var behaviorName in  wFORMS.behaviors) {
			   wFORMS.debug('wForms/loaded behavior: ' + behaviorName);
		  }
		 
		  for (var i=0;i<document.forms.length;i++) {
			  wFORMS.debug('wForms/initialize: '+ (document.forms[i].name || document.forms[i].id) );
			  wFORMS.addBehaviors(document.forms[i]);
		  }
	  },
	  
	  addBehaviors : function (node) {
		 if(!node) return;
		 
		 var deep = arguments[1]?arguments[1]:true;
		 if(!node.nodeType) {
			 // argument is not a node. probably an id string. 
			 // (typeof not used for IE5/mac compatibility)
			 node = document.getElementById(node);
		 }
		
		 // Process element nodes only
		 if(node.nodeType == 1) { 
			  wFORMS.debug(node.tagName + ' ' + node.id);
			  for(var behaviorName in wFORMS.behaviors) {
				  wFORMS.behaviors[behaviorName].evaluate(node);
			  }
			  if(deep) {
			  	  var l=node.childNodes.length;
				  for (var i=0; i<l; i++) {
					 wFORMS.addBehaviors(node.childNodes[i]);
				  }
			  }
			  
			  if(node.tagName.toUpperCase() == 'FORM') {
				  wFORMS.debug('wForms/processed: ' + node.id);
				  // run the init stack
				  for (var i=0;i<wFORMS.onLoadComplete.length;i++) {
					  wFORMS.onLoadComplete[i]();
				  }
				  // empty the stack					  
				  if(wFORMS.onLoadComplete.length > 0) {
					  wFORMS.onLoadComplete = new Array();
				  }
			  }
		  }
	  },
	  
	  hasBehavior: function(behaviorName) {
		  if(wFORMS.behaviors[behaviorName]) return true;
		  return false;
	  },
	  
	  /* 
	   * DEBUG FUNCTIONS 
	   * ------------------------------------------------------------------------------------------ */
	  debug : function(txt) { 
		msgLevel = arguments[1] || 10; 	// 1 = least importance, X = most important
		
		if(wFORMS.debugLevel > 0 && msgLevel >= wFORMS.debugLevel) {
			if(!wFORMS.debugOutput)
				wFORMS.initDebug();
			if(wFORMS.debugOutput)
				wFORMS.debugOutput.innerHTML += "<br />" + txt;
		}
	  },
	  
	  initDebug : function() {
		var output = document.getElementById('debugOutput');
		if(!output) {
			output = document.createElement('div');
			output.id = 'debugOutput';
			output.style.position   = 'absolute';
			output.style.right      = '10px';
			output.style.top        = '10px';
			output.style.zIndex     = '300';
			output.style.fontSize   = 'x-small';
			output.style.fontFamily = 'courier';
			output.style.backgroundColor = '#DDD';
			output.style.padding    = '5px';
			if(document.body) // if page fully loaded
				wFORMS.debugOutput = document.body.appendChild(output);
		}
		if(wFORMS.debugOutput)
			wFORMS.debugOutput.ondblclick = function() { this.innerHTML = '' };
	}
  };
 
 
wFORMS.NAME     = "wForms";
wFORMS.VERSION  = "2.01.beta";
wFORMS.__repr__ = function () {
	return "[" + this.NAME + " " + this.VERSION + "]";
};
wFORMS.toString = function () {
	return this.__repr__();
};
 
  // For backward compatibility
  wFORMS.utilities = wFORMS.helpers;
  var wf           = wFORMS; 
  wf.utilities.getSrcElement				= wFORMS.helpers.getSourceElement;
  wf.utilities.XBrowserPreventEventDefault	= wFORMS.helpers.preventEvent;
  
  // Initializations:
  
  // Attach JS only stylesheet.
  wFORMS.helpers.activateStylesheet('wforms-jsonly.css');
  // Parse document and apply wForms behavior
  wFORMS.helpers.addEvent(window,'load',wFORMS.onLoadHandler);
  } 
