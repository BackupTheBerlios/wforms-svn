wFORMS.NAME="wForms";
wFORMS.VERSION="2.01beta";
wFORMS.__repr__=function(){
return "["+this.NAME+" "+this.VERSION+"]";
};
wFORMS.toString=function(){
return this.__repr__();
};
function wHELPERS(){
}
wHELPERS.prototype.addEvent=function(_1,_2,fn){
if(!_1){
return;
}
if(_1.attachEvent){
_1["e"+_2+fn]=fn;
_1[_2+fn]=function(){
_1["e"+_2+fn](window.event);
};
_1.attachEvent("on"+_2,_1[_2+fn]);
}else{
if(_1.addEventListener){
_1.addEventListener(_2,fn,false);
}else{
var _4=_1["on"+_2];
if(_4){
_1["on"+_2]=function(e){
_4(e);
fn(e);
};
}else{
_1["on"+_2]=fn;
}
}
}
};
wHELPERS.prototype.removeEvent=function(_6,_7,fn){
if(_6.detachEvent){
if(_6[_7+fn]){
_6.detachEvent("on"+_7,_6[_7+fn]);
_6[_7+fn]=null;
}
}else{
if(_6.removeEventListener){
_6.removeEventListener(_7,fn,false);
}else{
_6["on"+_7]=null;
}
}
};
wHELPERS.prototype.getSourceElement=function(e){
if(!e){
e=window.event;
}
if(e.target){
var _a=e.target;
}else{
var _a=e.srcElement;
}
if(!_a){
return null;
}
if(_a.nodeType==3){
_a=_a.parentNode;
}
if(_a.tagName.toUpperCase()=="LABEL"&&e.type=="click"){
if(_a.getAttribute("for")){
_a=document.getElementById(_a.getAttribute("for"));
}
}
return _a;
};
wHELPERS.prototype.preventEvent=function(e){
if(!e){
e=window.event;
}
if(e.preventDefault){
e.preventDefault();
}else{
e.returnValue=false;
}
return false;
};
wHELPERS.prototype.stopPropagation=function(e){
if(!e){
var e=window.event;
}
e.cancelBubble=true;
if(e.stopPropagation){
e.stopPropagation();
}
};
wHELPERS.prototype.randomId=function(){
var _d=(new Date()).getTime();
_d=_d.toString().substr(6);
for(var i=0;i<6;i++){
_d+=String.fromCharCode(48+Math.floor((Math.random()*10)));
}
return "id-"+_d;
};
wHELPERS.prototype.activateStylesheet=function(_f){
if(document.getElementsByTagName){
var ss=document.getElementsByTagName("link");
}else{
if(document.styleSheets){
var ss=document.styleSheets;
}
}
for(var i=0;ss[i];i++){
if(ss[i].href.indexOf(_f)!=-1){
ss[i].disabled=true;
ss[i].disabled=false;
}
}
};
wHELPERS.prototype.hasClass=function(_12,_13){
if(_12&&_12.className){
if((" "+_12.className+" ").indexOf(" "+_13+" ")!=-1){
return true;
}
}
return false;
};
wHELPERS.prototype.hasClassPrefix=function(_14,_15){
if(_14&&_14.className){
if((" "+_14.className).indexOf(" "+_15)!=-1){
return true;
}
}
return false;
};
wHELPERS.prototype.getTop=function(obj){
var cur=0;
if(obj.offsetParent){
while(obj.offsetParent){
if((new wHELPERS()).getComputedStyle(obj,"position")=="relative"){
return cur;
}
cur+=obj.offsetTop;
obj=obj.offsetParent;
}
}
return cur;
};
wHELPERS.prototype.getLeft=function(obj){
var cur=0;
if(obj.offsetParent){
while(obj.offsetParent){
if((new wHELPERS()).getComputedStyle(obj,"position")=="relative"){
return cur;
}
cur+=obj.offsetLeft;
obj=obj.offsetParent;
}
}
return cur;
};
wHELPERS.prototype.getComputedStyle=function(_1a,_1b){
if(window.getComputedStyle){
return window.getComputedStyle(_1a,"").getPropertyValue(_1b);
}else{
if(_1a.currentStyle){
return _1a.currentStyle[_1b];
}
}
return false;
};
var wHelpers=wHELPERS;
if(!Array.prototype.push){
Array.prototype.push=function(){
for(var i=0;i<arguments.length;++i){
this[this.length]=arguments[i];
}
return this.length;
};
}
var Fat={make_hex:function(r,g,b){
r=r.toString(16);
if(r.length==1){
r="0"+r;
}
g=g.toString(16);
if(g.length==1){
g="0"+g;
}
b=b.toString(16);
if(b.length==1){
b="0"+b;
}
return "#"+r+g+b;
},fade_element:function(id,fps,_22,_23,to){
if(!fps){
fps=30;
}
if(!_22){
_22=3000;
}
if(!_23||_23=="#"){
_23="#FFFF33";
}
if(!to){
to=this.get_bgcolor(id);
}
var _25=Math.round(fps*(_22/1000));
var _26=_22/_25;
var _27=_26;
var _28=0;
if(_23.length<7){
_23+=_23.substr(1,3);
}
if(to.length<7){
to+=to.substr(1,3);
}
var rf=parseInt(_23.substr(1,2),16);
var gf=parseInt(_23.substr(3,2),16);
var bf=parseInt(_23.substr(5,2),16);
var rt=parseInt(to.substr(1,2),16);
var gt=parseInt(to.substr(3,2),16);
var bt=parseInt(to.substr(5,2),16);
var r,g,b,h;
while(_28<_25){
r=Math.floor(rf*((_25-_28)/_25)+rt*(_28/_25));
g=Math.floor(gf*((_25-_28)/_25)+gt*(_28/_25));
b=Math.floor(bf*((_25-_28)/_25)+bt*(_28/_25));
h=this.make_hex(r,g,b);
setTimeout("Fat.set_bgcolor('"+id+"','"+h+"')",_27);
_28++;
_27=_26*_28;
}
setTimeout("Fat.set_bgcolor('"+id+"','"+to+"')",_27);
},set_bgcolor:function(id,c){
var o=document.getElementById(id);
if(o){
o.style.backgroundColor=c;
}
},get_bgcolor:function(id){
var o=document.getElementById(id);
while(o){
var c;
if(window.getComputedStyle){
c=window.getComputedStyle(o,null).getPropertyValue("background-color");
}
if(o.currentStyle){
c=o.currentStyle.backgroundColor;
}
if((c!=""&&c!="transparent")||o.tagName=="BODY"){
break;
}
o=o.parentNode;
}
if(c==undefined||c==""||c=="transparent"){
c="#FFFFFF";
}
var rgb=c.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);
if(rgb){
c=this.make_hex(parseInt(rgb[1]),parseInt(rgb[2]),parseInt(rgb[3]));
}
return c;
}};
if(wHELPERS){
var wFORMS={debugLevel:0,helpers:new wHELPERS(),behaviors:{},onLoadComplete:new Array(),processedForm:null,onLoadHandler:function(){
for(var _37 in wFORMS.behaviors){
wFORMS.debug("wForms/loaded behavior: "+_37);
}
for(var i=0;i<document.forms.length;i++){
wFORMS.debug("wForms/initialize: "+(document.forms[i].name||document.forms[i].id));
wFORMS.processedForm=document.forms[i];
wFORMS.addBehaviors(document.forms[i]);
}
},addBehaviors:function(_39){
if(!_39){
return;
}
var _3a=arguments[1]?arguments[1]:true;
if(!_39.nodeType){
_39=document.getElementById(_39);
}
if(!_39||_39.nodeType!=1){
return;
}
_3a=(arguments.length>1)?arguments[1]:true;
wFORMS._addBehaviors(_39,_3a);
},_addBehaviors:function(_3b,_3c){
if(_3b.getAttribute("rel")=="no-behavior"){
return false;
}
if(_3b.nodeType==1){
wFORMS.debug(_3b.tagName+" "+_3b.id);
for(var _3d in wFORMS.behaviors){
wFORMS.behaviors[_3d].evaluate(_3b);
}
if(_3c){
for(var i=_3b.childNodes.length-1,cn=_3b.childNodes;i>=0;i--){
if(cn[i].nodeType==1){
wFORMS._addBehaviors(cn[i],_3c);
}
}
}
if(_3b.tagName.toUpperCase()=="FORM"){
for(var i=0;i<wFORMS.onLoadComplete.length;i++){
wFORMS.onLoadComplete[i]();
}
if(wFORMS.onLoadComplete.length>0){
wFORMS.onLoadComplete=new Array();
}
}
}
},hasBehavior:function(_3f){
if(wFORMS.behaviors[_3f]){
return true;
}
return false;
},debug:function(txt){
msgLevel=arguments[1]||10;
if(wFORMS.debugLevel>0&&msgLevel>=wFORMS.debugLevel){
if(!wFORMS.debugOutput){
wFORMS.initDebug();
}
if(wFORMS.debugOutput){
wFORMS.debugOutput.innerHTML+="<br />"+txt;
}
}
},initDebug:function(){
var _41=document.getElementById("debugOutput");
if(!_41){
_41=document.createElement("div");
_41.id="debugOutput";
_41.style.position="absolute";
_41.style.right="10px";
_41.style.top="10px";
_41.style.zIndex="300";
_41.style.fontSize="x-small";
_41.style.fontFamily="courier";
_41.style.backgroundColor="#DDD";
_41.style.padding="5px";
if(document.body){
wFORMS.debugOutput=document.body.appendChild(_41);
}
}
if(wFORMS.debugOutput){
wFORMS.debugOutput.ondblclick=function(){
this.innerHTML="";
};
}
}};
wFORMS.utilities=wFORMS.helpers;
var wf=wFORMS;
wf.utilities.getSrcElement=wFORMS.helpers.getSourceElement;
wf.utilities.XBrowserPreventEventDefault=wFORMS.helpers.preventEvent;
wFORMS.helpers.activateStylesheet("wforms-jsonly.css");
wFORMS.helpers.addEvent(window,"load",wFORMS.onLoadHandler);
}
if(wFORMS){
wFORMS.idSuffix_fieldHint="-H";
wFORMS.className_inactiveFieldHint="field-hint-inactive";
wFORMS.className_activeFieldHint="field-hint";
wFORMS.behaviors["hint"]={name:"hint",evaluate:function(_42){
if(_42.id){
if(_42.id.indexOf(wFORMS.idSuffix_fieldHint)>0){
var id=_42.id.replace(wFORMS.idSuffix_fieldHint,"");
var _44=document.getElementById(id)||wFORMS.processedForm[id];
}
if(_44){
switch(_44.tagName.toUpperCase()){
case "SELECT":
case "TEXTAREA":
case "INPUT":
wFORMS.helpers.addEvent(_44,"focus",wFORMS.behaviors["hint"].run);
wFORMS.helpers.addEvent(_44,"blur",wFORMS.behaviors["hint"].remove);
break;
default:
wFORMS.helpers.addEvent(_44,"mouseover",wFORMS.behaviors["hint"].run);
wFORMS.helpers.addEvent(_44,"mouseout",wFORMS.behaviors["hint"].remove);
break;
}
}
}
},run:function(e){
var _46=wFORMS.helpers.getSourceElement(e);
var _47=document.getElementById(_46.id+wFORMS.idSuffix_fieldHint);
if(!_47){
_47=document.getElementById(_46.name+wFORMS.idSuffix_fieldHint);
}
if(_47){
_47.className=_47.className.replace(wFORMS.className_inactiveFieldHint,wFORMS.className_activeFieldHint);
_47.style.top=(wFORMS.helpers.getTop(_46)+_46.offsetHeight).toString()+"px";
if(_46.tagName.toUpperCase()=="SELECT"){
_47.style.left=(wFORMS.helpers.getLeft(_46)+(_46.offsetWidth-8)).toString()+"px";
}else{
_47.style.left=(wFORMS.helpers.getLeft(_46)).toString()+"px";
}
}
},remove:function(e){
var _49=wFORMS.helpers.getSourceElement(e);
var _4a=document.getElementById(_49.id+wFORMS.idSuffix_fieldHint);
if(!_4a){
_4a=document.getElementById(_49.name+wFORMS.idSuffix_fieldHint);
}
if(_4a){
_4a.className=_4a.className.replace(wFORMS.className_activeFieldHint,wFORMS.className_inactiveFieldHint);
}
}};
}
if(wFORMS){
wFORMS.className_paging="wfPage";
wFORMS.className_pagingCurrent="wfCurrentPage";
wFORMS.className_pagingButtons="wfPageButton";
wFORMS.className_hideSubmit="wfHideSubmit";
wFORMS.idPrefix_pageIndex="wfPgIndex-";
wFORMS.runValidationOnPageNext=true;
if(!wFORMS.arrMsg){
wFORMS.arrMsg=new Array();
}
wFORMS.arrMsg[4]="Next Page";
wFORMS.arrMsg[5]="Previous Page";
wFORMS.behaviors["paging"]={onPageChange:null,evaluate:function(_4b){
if(wFORMS.helpers.hasClass(_4b,wFORMS.className_paging)){
var _4c=wFORMS.behaviors["paging"].getPageIndex(_4b);
if(_4c>1){
var _4d=document.createElement("input");
_4d.setAttribute("value",wFORMS.arrMsg[5]);
_4d.setAttribute("type","button");
_4d.className=wFORMS.className_pagingButtons;
_4b.appendChild(_4d);
wFORMS.helpers.addEvent(_4d,"click",wFORMS.behaviors["paging"].pagingPrevious);
}else{
_4b.className+=" "+wFORMS.className_pagingCurrent;
var _4e=wFORMS.behaviors["paging"].getFormElement(_4b);
wFORMS.behaviors["paging"].hideSubmitButton(_4e);
wFORMS.helpers.addEvent(_4e,"submit",function(e){
var _50=wFORMS.helpers.getSourceElement(e);
if(_50.type&&_50.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
});
wFORMS.preventSubmissionOnEnter=true;
}
if(document.getElementById(wFORMS.idPrefix_pageIndex+(_4c+1).toString())){
var _4d=document.createElement("input");
_4d.setAttribute("value",wFORMS.arrMsg[4]);
_4d.setAttribute("type","button");
_4d.className=wFORMS.className_pagingButtons;
_4b.appendChild(_4d);
wFORMS.helpers.addEvent(_4d,"click",wFORMS.behaviors["paging"].pagingNext);
}
}
},pagingNext:function(e){
var _52=wFORMS.helpers.getSourceElement(e);
if(!_52){
_52=e;
}
var _53=_52.parentNode;
var _54=wFORMS.behaviors["paging"].getPageIndex(_53)+1;
var _55=document.getElementById(wFORMS.idPrefix_pageIndex+_54.toString());
if(_55){
if(!wFORMS.hasBehavior("validation")||(wFORMS.hasBehavior("validation")&&!wFORMS.runValidationOnPageNext)||(wFORMS.hasBehavior("validation")&&wFORMS.runValidationOnPageNext&&wFORMS.functionName_formValidation(e))){
_53.className=_53.className.replace(wFORMS.className_pagingCurrent,"");
_55.className+=" "+wFORMS.className_pagingCurrent;
if(wFORMS.behaviors["paging"].isLastPage(_54)){
var _56=wFORMS.behaviors["paging"].getFormElement(_55);
wFORMS.behaviors["paging"].showSubmitButton(_56);
}
}
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_55);
}
}
},pagingPrevious:function(e){
var _58=wFORMS.helpers.getSourceElement(e);
if(!_58){
_58=e;
}
var _59=_58.parentNode;
var _5a=wFORMS.behaviors["paging"].getPageIndex(_59)-1;
var _5b=document.getElementById(wFORMS.idPrefix_pageIndex+_5a.toString());
if(_5b){
_59.className=_59.className.replace(wFORMS.className_pagingCurrent,"");
_5b.className+=" "+wFORMS.className_pagingCurrent;
var _5c=wFORMS.behaviors["paging"].getFormElement(_5b);
wFORMS.behaviors["paging"].hideSubmitButton(_5c);
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_5b);
}
}
},showSubmitButton:function(_5d){
var _5e=_5d.getElementsByTagName("input");
for(var i=0;i<_5e.length;i++){
if(_5e[i].type&&_5e[i].type.toLowerCase()=="submit"){
_5e[i].className=_5e[i].className.replace(wFORMS.className_hideSubmit,"");
}
}
},hideSubmitButton:function(_60){
var _61=_60.getElementsByTagName("input");
for(var i=0;i<_61.length;i++){
if(_61[i].type&&_61[i].type.toLowerCase()=="submit"&&!wFORMS.helpers.hasClass(_61[i],wFORMS.className_hideSubmit)){
_61[i].className+=" "+wFORMS.className_hideSubmit;
}
}
},isLastPage:function(_63){
_63++;
var _64=document.getElementById(wFORMS.idPrefix_pageIndex+_63.toString());
if(!_64){
return true;
}
return false;
},gotoPage:function(_65){
if(isNaN(_65)){
var _66=document.getElementById(_65);
}else{
var _66=document.getElementById(wFORMS.idPrefix_pageIndex+_65.toString());
}
if(!_66){
return false;
}
var _67=wFORMS.behaviors["paging"].getFormElement(_66);
var _68=_67.getElementsByTagName("*");
for(var i=0;i<_68.length;i++){
if(wFORMS.helpers.hasClass(_68[i],wFORMS.className_pagingCurrent)){
_68[i].className=_68[i].className.replace(wFORMS.className_pagingCurrent,"");
break;
}
}
if(wFORMS.behaviors["paging"].isLastPage(_65)){
wFORMS.behaviors["paging"].showSubmitButton(_67);
}else{
wFORMS.behaviors["paging"].hideSubmitButton(_67);
}
_66.className+=" "+wFORMS.className_pagingCurrent;
},getFormElement:function(_6a){
var _6b=_6a.parentNode;
while(_6b&&_6b.tagName.toUpperCase()!="FORM"){
_6b=_6b.parentNode;
}
return _6b;
},getPageIndex:function(_6c){
if(_6c&&_6c.id){
return parseInt(_6c.id.replace(/[\D]*/,""));
}else{
return null;
}
}};
}
if(wFORMS){
wFORMS.className_repeat="repeat";
wFORMS.className_delete="removeable";
wFORMS.className_duplicateLink="duplicateLink";
wFORMS.className_removeLink="removeLink";
wFORMS.className_preserveRadioName="preserveRadioName";
wFORMS.idSuffix_repeatCounter="-RC";
wFORMS.idSuffix_duplicateLink="-wfDL";
wFORMS.preserveRadioName=false;
wFORMS.limitSwitchScope=true;
if(!wFORMS.arrMsg){
wFORMS.arrMsg=new Array();
}
wFORMS.arrMsg[0]="Add another response";
wFORMS.arrMsg[1]="Will duplicate this question or section.";
wFORMS.arrMsg[2]="Remove";
wFORMS.arrMsg[3]="Will remove this question or section.";
wFORMS.behaviors["repeat"]={evaluate:function(_6d){
if(wFORMS.helpers.hasClass(_6d,wFORMS.className_repeat)){
var _6e;
if(_6d.id){
_6e=document.getElementById(_6d.id+wFORMS.idSuffix_duplicateLink);
}
if(!_6e){
_6e=document.createElement("a");
var _6f=document.createElement("span");
var _70=document.createTextNode(wFORMS.arrMsg[0]);
_6e.setAttribute("href","#");
_6e.className=wFORMS.className_duplicateLink;
_6e.setAttribute("title",wFORMS.arrMsg[1]);
if(_6d.tagName.toUpperCase()=="TR"){
var n=_6d.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_6e);
}
}else{
_6d.appendChild(_6e);
}
_6f.appendChild(_70);
_6e.appendChild(_6f);
}
var _72=document.getElementById(_6d.id+wFORMS.idSuffix_repeatCounter);
if(!_72){
if(document.all&&!window.opera){
var _73=_6d.id+wFORMS.idSuffix_repeatCounter;
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
_72=document.createElement("INPUT NAME=\""+_73+"\"");
}else{
_72=document.createElement("<INPUT NAME=\""+_73+"\"></INPUT>");
}
_72.type="hidden";
_72.id=_73;
_72.value="1";
}else{
_72=document.createElement("INPUT");
_72.setAttribute("type","hidden");
_72.setAttribute("value","1");
_72.setAttribute("name",_6d.id+wFORMS.idSuffix_repeatCounter);
_72.setAttribute("id",_6d.id+wFORMS.idSuffix_repeatCounter);
}
var _74=_6d.parentNode;
while(_74&&_74.tagName.toUpperCase()!="FORM"){
_74=_74.parentNode;
}
_74.appendChild(_72);
}
wFORMS.helpers.addEvent(_6e,"click",wFORMS.behaviors["repeat"].duplicateFieldGroup);
}
if(wFORMS.helpers.hasClass(_6d,wFORMS.className_delete)){
var _75=document.createElement("a");
var _6f=document.createElement("span");
var _70=document.createTextNode(wFORMS.arrMsg[2]);
_75.setAttribute("href","#");
_75.className=wFORMS.className_removeLink;
_75.setAttribute("title",wFORMS.arrMsg[3]);
if(_6d.tagName.toUpperCase()=="TR"){
var n=_6d.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_75);
}
}else{
_6d.appendChild(_75);
}
_6f.appendChild(_70);
_75.appendChild(_6f);
wFORMS.helpers.addEvent(_75,"click",wFORMS.behaviors["repeat"].removeFieldGroup);
}
},duplicateFieldGroup:function(e){
var _77=wFORMS.helpers.getSourceElement(e);
if(!_77){
_77=e;
}
var _78=wFORMS.helpers.hasClass(_77,wFORMS.className_preserveRadioName)?true:wFORMS.preserveRadioName;
var _77=_77.parentNode;
while(_77&&!wFORMS.helpers.hasClass(_77,wFORMS.className_repeat)){
_77=_77.parentNode;
}
if(_77){
counterField=document.getElementById(_77.id+wFORMS.idSuffix_repeatCounter);
if(!counterField){
return;
}
var _79=parseInt(counterField.value)+1;
var _7a="-"+_79.toString();
var _7b=wFORMS.behaviors["repeat"].replicateTree(_77,null,_7a,_78);
var _7c=_77.nextSibling;
while(_7c&&(_7c.nodeType==3||wFORMS.helpers.hasClass(_7c,wFORMS.className_delete))){
_7c=_7c.nextSibling;
}
_77.parentNode.insertBefore(_7b,_7c);
_7b.className=_77.className.replace(wFORMS.className_repeat,wFORMS.className_delete);
document.getElementById(_77.id+wFORMS.idSuffix_repeatCounter).value=_79;
wFORMS.addBehaviors(_7b);
}
return wFORMS.helpers.preventEvent(e);
},removeFieldGroup:function(e){
var _7e=wFORMS.helpers.getSourceElement(e);
if(!_7e){
_7e=e;
}
var _7e=_7e.parentNode;
while(_7e&&!wFORMS.helpers.hasClass(_7e,wFORMS.className_delete)){
_7e=_7e.parentNode;
}
_7e.parentNode.removeChild(_7e);
return wFORMS.helpers.preventEvent(e);
},removeRepeatCountSuffix:function(str){
return str.replace(/-\d$/,"");
},replicateTree:function(_80,_81,_82,_83){
if(_80.nodeType==3){
if(_80.parentNode.tagName.toUpperCase()!="TEXTAREA"){
var _84=document.createTextNode(_80.data);
}
}else{
if(_80.nodeType==1){
if(wFORMS.helpers.hasClass(_80,wFORMS.className_duplicateLink)||wFORMS.helpers.hasClass(_80,wFORMS.className_removeLink)){
return null;
}
if(wFORMS.helpers.hasClass(_80,wFORMS.className_delete)){
return null;
}
if(wFORMS.helpers.hasClass(_80,wFORMS.className_repeat)&&_81!=null){
_82=_82.replace("-","__");
}
if(!document.all||window.opera){
var _84=document.createElement(_80.tagName);
}else{
var _85=_80.tagName;
if(_80.name){
if(_80.tagName.toUpperCase()=="INPUT"&&_80.type.toLowerCase()=="radio"&&_83){
_85+=" NAME='"+_80.name+"' ";
}else{
_85+=" NAME='"+wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_80.name)+_82+"' ";
}
}
if(_80.type){
_85+=" TYPE='"+_80.type+"' ";
}
if(_80.selected){
_85+=" SELECTED='SELECTED' ";
}
if(_80.checked){
_85+=" CHECKED='CHECKED' ";
}
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
var _84=document.createElement(_85);
}else{
var _84=document.createElement("<"+_85+"></"+_80.tagName+">");
}
try{
_84.type=_80.type;
}
catch(e){
}
}
for(var i=0;i<_80.attributes.length;i++){
var _87=_80.attributes[i];
if(_87.specified||_87.nodeName.toLowerCase()=="value"){
if(_87.nodeName.toLowerCase()=="id"||_87.nodeName.toLowerCase()=="name"||_87.nodeName.toLowerCase()=="for"){
if(wFORMS.hasBehavior("hint")&&_87.nodeValue.indexOf(wFORMS.idSuffix_fieldHint)!=-1){
var _88=_87.nodeValue;
_88=wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_88.substr(0,_88.indexOf(wFORMS.idSuffix_fieldHint)))+_82+wFORMS.idSuffix_fieldHint;
}else{
if(_80.tagName.toUpperCase()=="INPUT"&&_80.getAttribute("type",false).toLowerCase()=="radio"&&_87.nodeName.toLowerCase()=="name"&&_83){
var _88=_87.nodeValue;
}else{
var _88=_87.nodeValue+_82;
}
}
}else{
if(_87.nodeName.toLowerCase()=="value"&&_80.tagName.toUpperCase()=="INPUT"&&(_80.type.toLowerCase()=="text"||_80.type.toLowerCase()=="password"||_80.type.toLowerCase()=="file")){
var _88="";
}else{
if(_87.nodeName.toLowerCase()=="rel"&&_87.nodeValue.indexOf("wfHandled")!=-1){
var _88=_87.nodeValue.replace("wfHandled","");
}else{
var _88=_87.nodeValue;
}
}
}
switch(_87.nodeName.toLowerCase()){
case "class":
_84.className=_88;
break;
case "style":
if(_80.style&&_80.style.cssText){
_84.style.cssText=_80.style.cssText;
}
break;
case "onclick":
_84.onclick=_80.onclick;
break;
case "onchange":
_84.onchange=_80.onchange;
break;
case "onsubmit":
_84.onsubmit=_80.onsubmit;
break;
case "onmouseover":
_84.onmouseover=_80.onmouseover;
break;
case "onmouseout":
_84.onmouseout=_80.onmouseout;
break;
case "onmousedown":
_84.onmousedown=_80.onmousedown;
break;
case "onmouseup":
_84.onmouseup=_80.onmouseup;
break;
case "ondblclick":
_84.ondblclick=_80.ondblclick;
break;
case "onkeydown":
_84.onkeydown=_80.onkeydown;
break;
case "onkeyup":
_84.onkeyup=_80.onkeyup;
break;
case "onblur":
_84.onblur=_80.onblur;
break;
case "onfocus":
_84.onfocus=_80.onfocus;
break;
default:
_84.setAttribute(_87.name,_88,0);
}
}
}
}
}
if(_81&&_84){
_81.appendChild(_84);
}
for(var i=0;i<_80.childNodes.length;i++){
wFORMS.behaviors["repeat"].replicateTree(_80.childNodes[i],_84,_82,_83);
}
return _84;
}};
}
if(wFORMS){
wFORMS.classNamePrefix_switch="switch";
wFORMS.className_switchIsOn="swtchIsOn";
wFORMS.className_switchIsOff="swtchIsOff";
wFORMS.classNamePrefix_offState="offstate";
wFORMS.classNamePrefix_onState="onstate";
wFORMS.switchScopeRootTag="";
wFORMS.switchTriggers={};
wFORMS.switchTargets={};
wFORMS.behaviors["switch"]={evaluate:function(_89){
if(wFORMS.helpers.hasClassPrefix(_89,wFORMS.classNamePrefix_switch)){
if(!_89.id){
_89.id=wFORMS.helpers.randomId();
}
var _8a=wFORMS.behaviors["switch"].getSwitchNames(_89);
for(var i=0;i<_8a.length;i++){
if(!wFORMS.switchTriggers[_8a[i]]){
wFORMS.switchTriggers[_8a[i]]=new Array();
}
if(!wFORMS.switchTriggers[_8a[i]][_89.id]){
wFORMS.switchTriggers[_8a[i]].push(_89.id);
}
}
switch(_89.tagName.toUpperCase()){
case "OPTION":
var _8c=_89.parentNode;
while(_8c&&_8c.tagName.toUpperCase()!="SELECT"){
var _8c=_8c.parentNode;
}
if(!_8c){
alert("Error: invalid markup in SELECT field ?");
return false;
}
if(!_8c.id){
_8c.id=wFORMS.helpers.randomId();
}
if(!_8c.getAttribute("rel")||_8c.getAttribute("rel").indexOf("wfHandled")==-1){
_8c.setAttribute("rel",(_8c.getAttribute("rel")||"")+" wfHandled");
wFORMS.helpers.addEvent(_8c,"change",wFORMS.behaviors["switch"].run);
}
break;
case "INPUT":
if(_89.type&&_89.type.toLowerCase()=="radio"){
var _8d=_89.form;
for(var j=0;j<_8d[_89.name].length;j++){
var _8f=_8d[_89.name][j];
if(_8f.type.toLowerCase()=="radio"){
if(!_8f.getAttribute("rel")||_8f.getAttribute("rel").indexOf("wfHandled")==-1){
wFORMS.helpers.addEvent(_8f,"click",wFORMS.behaviors["switch"].run);
_8f.setAttribute("rel",(_8f.getAttribute("rel")||"")+" wfHandled");
}
}
}
}else{
wFORMS.helpers.addEvent(_89,"click",wFORMS.behaviors["switch"].run);
}
break;
default:
wFORMS.helpers.addEvent(_89,"click",wFORMS.behaviors["switch"].run);
break;
}
}
if(wFORMS.helpers.hasClassPrefix(_89,wFORMS.classNamePrefix_offState)||wFORMS.helpers.hasClassPrefix(_89,wFORMS.classNamePrefix_onState)){
if(!_89.id){
_89.id=wFORMS.helpers.randomId();
}
var _8a=wFORMS.behaviors["switch"].getSwitchNames(_89);
for(var i=0;i<_8a.length;i++){
if(!wFORMS.switchTargets[_8a[i]]){
wFORMS.switchTargets[_8a[i]]=new Array();
}
if(!wFORMS.switchTargets[_8a[i]][_89.id]){
wFORMS.switchTargets[_8a[i]].push(_89.id);
}
}
}
if(_89.tagName&&_89.tagName.toUpperCase()=="FORM"){
wFORMS.onLoadComplete.push(wFORMS.behaviors["switch"].init);
}
},init:function(){
for(var _90 in wFORMS.switchTriggers){
for(var i=0;i<wFORMS.switchTriggers[_90].length;i++){
var _92=document.getElementById(wFORMS.switchTriggers[_90][i]);
if(wFORMS.behaviors["switch"].isTriggerOn(_92,_90)){
if(_92.tagName.toUpperCase()=="OPTION"){
var _92=_92.parentNode;
while(_92&&_92.tagName.toUpperCase()!="SELECT"){
var _92=_92.parentNode;
}
}
wFORMS.behaviors["switch"].run(_92);
}
}
}
},run:function(e){
var _94=wFORMS.helpers.getSourceElement(e);
if(!_94){
_94=e;
}
var _95=new Array();
var _96=new Array();
switch(_94.tagName.toUpperCase()){
case "SELECT":
for(var i=0;i<_94.options.length;i++){
if(i==_94.selectedIndex){
_95=_95.concat(wFORMS.behaviors["switch"].getSwitchNames(_94.options[i]));
}else{
_96=_96.concat(wFORMS.behaviors["switch"].getSwitchNames(_94.options[i]));
}
}
break;
case "INPUT":
if(_94.type.toLowerCase()=="radio"){
for(var i=0;i<_94.form[_94.name].length;i++){
var _98=_94.form[_94.name][i];
if(_98.checked){
_95=_95.concat(wFORMS.behaviors["switch"].getSwitchNames(_98));
}else{
_96=_96.concat(wFORMS.behaviors["switch"].getSwitchNames(_98));
}
}
}else{
if(_94.checked||wFORMS.helpers.hasClass(_94,wFORMS.className_switchIsOn)){
_95=_95.concat(wFORMS.behaviors["switch"].getSwitchNames(_94));
}else{
_96=_96.concat(wFORMS.behaviors["switch"].getSwitchNames(_94));
}
}
break;
default:
break;
}
for(var i=0;i<_96.length;i++){
var _99=wFORMS.behaviors["switch"].getElementsBySwitchName(_96[i]);
for(var j=0;j<_99.length;j++){
var _9b=wFORMS.switchTriggers[_96[i]];
var _9c=true;
for(var k=0;k<_9b.length;k++){
var _9e=document.getElementById(_9b[k]);
if(wFORMS.behaviors["switch"].isTriggerOn(_9e,_96[i])){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_9e,_99[j])){
_9c=false;
}
}
}
if(_9c){
wFORMS.behaviors["switch"].switchState(_99[j],wFORMS.classNamePrefix_onState,wFORMS.classNamePrefix_offState);
}
}
}
for(var i=0;i<_95.length;i++){
var _99=wFORMS.behaviors["switch"].getElementsBySwitchName(_95[i]);
for(var j=0;j<_99.length;j++){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_94,_99[j])){
wFORMS.behaviors["switch"].switchState(_99[j],wFORMS.classNamePrefix_offState,wFORMS.classNamePrefix_onState);
}
}
}
},clear:function(e){
wFORMS.switchTriggers={};
wFORMS.switchTargets={};
},getSwitchNames:function(_a0){
var _a1=new Array();
var _a2=_a0.className.split(" ");
for(var i=0;i<_a2.length;i++){
if(_a2[i].indexOf(wFORMS.classNamePrefix_switch)==0){
_a1.push(_a2[i].substr(wFORMS.classNamePrefix_switch.length+1));
}
if(_a2[i].indexOf(wFORMS.classNamePrefix_onState)==0){
_a1.push(_a2[i].substr(wFORMS.classNamePrefix_onState.length+1));
}else{
if(_a2[i].indexOf(wFORMS.classNamePrefix_offState)==0){
_a1.push(_a2[i].substr(wFORMS.classNamePrefix_offState.length+1));
}
}
}
return _a1;
},switchState:function(_a4,_a5,_a6){
if(!_a4||_a4.nodeType!=1){
return;
}
if(_a4.className){
_a4.className=_a4.className.replace(_a5,_a6);
}
if(wFORMS.helpers.hasClass(_a4,wFORMS.className_switchIsOff)){
_a4.className=_a4.className.replace(wFORMS.className_switchIsOff,wFORMS.className_switchIsOn);
}else{
if(wFORMS.helpers.hasClass(_a4,wFORMS.className_switchIsOn)){
_a4.className=_a4.className.replace(wFORMS.className_switchIsOn,wFORMS.className_switchIsOff);
}
}
},getElementsBySwitchName:function(_a7){
var _a8=new Array();
if(wFORMS.switchTargets[_a7]){
for(var i=0;i<wFORMS.switchTargets[_a7].length;i++){
var _aa=document.getElementById(wFORMS.switchTargets[_a7][i]);
if(_aa){
_a8.push(_aa);
}
}
}
return _a8;
},isTriggerOn:function(_ab,_ac){
if(!_ab){
return false;
}
if(_ab.tagName.toUpperCase()=="OPTION"){
var _ad=_ab.parentNode;
while(_ad&&_ad.tagName.toUpperCase()!="SELECT"){
var _ad=_ad.parentNode;
}
if(!_ad){
return false;
}
if(_ad.selectedIndex==-1){
return false;
}
if(wFORMS.helpers.hasClass(_ad.options[_ad.selectedIndex],wFORMS.classNamePrefix_switch+"-"+_ac)){
return true;
}
}else{
if(_ab.checked||wFORMS.helpers.hasClass(_ab,wFORMS.className_switchIsOn)){
return true;
}
}
return false;
},isWithinSwitchScope:function(_ae,_af){
if(wFORMS.hasBehavior("repeat")&&wFORMS.limitSwitchScope==true){
var _b0=_ae;
while(_b0&&_b0.tagName&&_b0.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_b0,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_b0,wFORMS.className_delete)){
_b0=_b0.parentNode;
}
if(wFORMS.helpers.hasClass(_b0,wFORMS.className_repeat)||wFORMS.helpers.hasClass(_b0,wFORMS.className_delete)){
var _b1=_af;
while(_b1&&_b1.tagName&&_b1.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_b1,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_b1,wFORMS.className_delete)){
_b1=_b1.parentNode;
}
if(_b0==_b1){
return true;
}else{
return false;
}
}else{
return true;
}
}else{
return true;
}
}};
}
if(wFORMS){
wFORMS.preventSubmissionOnEnter=false;
wFORMS.showAlertOnError=true;
wFORMS.className_required="required";
wFORMS.className_validationError_msg="errMsg";
wFORMS.className_validationError_fld="errFld";
wFORMS.classNamePrefix_validation="validate";
wFORMS.idSuffix_fieldError="-E";
wFORMS.arrErrorMsg=new Array();
wFORMS.arrErrorMsg[0]="This field is required. ";
wFORMS.arrErrorMsg[1]="The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed. ";
wFORMS.arrErrorMsg[2]="This does not appear to be a valid email address.";
wFORMS.arrErrorMsg[3]="Please enter an integer.";
wFORMS.arrErrorMsg[4]="Please enter a float (ex. 1.9).";
wFORMS.arrErrorMsg[5]="Unsafe password. Your password should be between 4 and 12 characters long and use a combinaison of upper-case and lower-case letters.";
wFORMS.arrErrorMsg[6]="Please use alpha-numeric characters only [a-z 0-9].";
wFORMS.arrErrorMsg[7]="This does not appear to be a valid date.";
wFORMS.arrErrorMsg[8]="%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided.";
wFORMS.behaviors["validation"]={evaluate:function(_b2){
if(_b2.tagName.toUpperCase()=="FORM"){
if(wFORMS.functionName_formValidation.toString()==wFORMS.functionName_formValidation){
wFORMS.functionName_formValidation=eval(wFORMS.functionName_formValidation);
}
wFORMS.helpers.addEvent(_b2,"submit",wFORMS.functionName_formValidation);
}
},init:function(){
},run:function(e){
var _b4=wFORMS.helpers.getSourceElement(e);
if(!_b4){
_b4=e;
}
if(wFORMS.preventSubmissionOnEnter){
if(_b4.type&&_b4.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
}
while(_b4&&_b4.tagName.toUpperCase()!="FORM"){
_b4=_b4.parentNode;
}
var _b5=wFORMS.behaviors["validation"].validateElement(_b4,true);
if(_b5>0){
if(wFORMS.showAlertOnError){
wFORMS.behaviors["validation"].showAlert(_b5);
}
return wFORMS.helpers.preventEvent(e);
}
return true;
},remove:function(){
},validateElement:function(_b6){
var _b7=wFORMS.behaviors["validation"];
if(wFORMS.hasBehavior("switch")&&wFORMS.helpers.hasClassPrefix(_b6,wFORMS.classNamePrefix_offState)){
return 0;
}
if(wFORMS.hasBehavior("paging")&&wFORMS.helpers.hasClass(_b6,wFORMS.className_paging)&&!wFORMS.helpers.hasClass(_b6,wFORMS.className_pagingCurrent)){
return 0;
}
var _b8=0;
if(!_b7.checkRequired(_b6)){
_b7.showError(_b6,wFORMS.arrErrorMsg[0]);
_b8++;
}else{
if(wFORMS.helpers.hasClassPrefix(_b6,wFORMS.classNamePrefix_validation)){
var _b9=_b6.className.split(" ");
for(j=0;j<_b9.length;j++){
switch(_b9[j]){
case "validate-alpha":
if(!_b7.isAlpha(_b6.value)){
_b7.showError(_b6,wFORMS.arrErrorMsg[1]);
_b8++;
}
break;
case "validate-alphanum":
if(!_b7.isAlphaNum(_b6.value)){
_b7.showError(_b6,wFORMS.arrErrorMsg[6]);
_b8++;
}
break;
case "validate-date":
if(!_b7.isDate(_b6.value)){
_b7.showError(_b6,wFORMS.arrErrorMsg[7]);
_b8++;
}
break;
case "validate-time":
break;
case "validate-email":
if(!_b7.isEmail(_b6.value)){
_b7.showError(_b6,wFORMS.arrErrorMsg[2]);
_b8++;
}
break;
case "validate-integer":
if(!_b7.isInteger(_b6.value)){
_b7.showError(_b6,wFORMS.arrErrorMsg[3]);
_b8++;
}
break;
case "validate-float":
if(!_b7.isFloat(_b6.value)){
_b7.showError(_b6,wFORMS.arrErrorMsg[4]);
_b8++;
}
break;
case "validate-strongpassword":
if(!_b7.isPassword(_b6.value)){
_b7.showError(_b6,wFORMS.arrErrorMsg[5]);
_b8++;
}
break;
}
}
}
}
if(_b8==0){
var _ba=new RegExp(wFORMS.className_validationError_fld,"gi");
_b6.className=_b6.className.replace(_ba,"");
var _bb=document.getElementById(_b6.id+wFORMS.idSuffix_fieldError);
if(_bb){
_bb.parentNode.removeChild(_bb);
}
}
var _bc=arguments[1]?arguments[1]:true;
if(_bc){
for(var i=0;i<_b6.childNodes.length;i++){
if(_b6.childNodes[i].nodeType==1){
_b8+=_b7.validateElement(_b6.childNodes[i],_bc);
}
}
}
return _b8;
},checkRequired:function(_be){
if(wFORMS.helpers.hasClass(_be,wFORMS.className_required)){
var _bf=wFORMS.behaviors["validation"];
switch(_be.tagName.toUpperCase()){
case "INPUT":
switch(_be.getAttribute("type").toLowerCase()){
case "checkbox":
return _be.checked;
break;
case "radio":
return _be.checked;
break;
default:
return !_bf.isEmpty(_be.value);
}
break;
case "SELECT":
return !_bf.isEmpty(_be.options[_be.selectedIndex].value);
break;
case "TEXTAREA":
return !_bf.isEmpty(_be.value);
break;
default:
return _bf.checkOneRequired(_be);
break;
}
}
return true;
},checkOneRequired:function(_c0){
var _c1=false;
if(_c0.nodeType!=1){
return false;
}
if(_c0.tagName.toUpperCase()=="INPUT"){
switch(_c0.type.toLowerCase()){
case "checkbox":
_c1=_c0.checked;
break;
case "radio":
_c1=_c0.checked;
break;
default:
_c1=_c0.value;
}
}else{
_c1=_c0.value;
}
if(_c1&&!wFORMS.behaviors["validation"].isEmpty(_c1)){
return true;
}
for(var i=0;i<_c0.childNodes.length;i++){
if(wFORMS.behaviors["validation"].checkOneRequired(_c0.childNodes[i])){
return true;
}
}
return false;
},isEmpty:function(s){
var _c4=/^\s+$/;
return ((s==null)||(s.length==0)||_c4.test(s));
},isAlpha:function(s){
var _c6=/^[a-zA-Z]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_c6.test(s);
},isAlphaNum:function(s){
var _c8=/\W/;
return wFORMS.behaviors["validation"].isEmpty(s)||!_c8.test(s);
},isDate:function(s){
var _ca=new Date(s);
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(_ca);
},isEmail:function(s){
var _cc=/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_cc.test(s);
},isInteger:function(s){
var _ce=/^[+]?\d+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_ce.test(s);
},isFloat:function(s){
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(parseFloat(s));
},isPassword:function(s){
return wFORMS.behaviors["validation"].isEmpty(s);
},showError:function(_d1,_d2){
if(_d1.className.indexOf(wFORMS.className_validationError_fld)!=-1){
return;
}
if(!_d1.id){
_d1.id=wFORMS.helpers.randomId();
}
_d1.className+=" "+wFORMS.className_validationError_fld;
var _d3=document.createTextNode(" "+_d2);
var fe=document.getElementById(_d1.id+wFORMS.idSuffix_fieldError);
if(!fe){
fe=document.createElement("div");
fe.setAttribute("id",_d1.id+wFORMS.idSuffix_fieldError);
var fl=document.getElementById(_d1.id+wFORMS.idSuffix_fieldLabel);
if(fl){
fl.parentNode.insertBefore(fe,fl.nextSibling);
}else{
_d1.parentNode.insertBefore(fe,_d1.nextSibling);
}
}
fe.appendChild(_d3);
fe.className+=" "+wFORMS.className_validationError_msg;
},showAlert:function(_d6){
alert(wFORMS.arrErrorMsg[8].replace("%%",_d6));
}};
wFORMS.functionName_formValidation=wFORMS.behaviors["validation"].run;
wFORMS.formValidation=wFORMS.behaviors["validation"].run;
}
if(wFORMS){
wFORMS.classNamePrefix_sync="sync";
wFORMS.classNamePrefix_target="target";
wFORMS.className_syncIsOn="sncIsOn";
wFORMS.className_syncIsOff="sncIsOff";
wFORMS.syncScopeRootTag="";
wFORMS.syncTriggers={};
wFORMS.syncTargets={};
wFORMS.behaviors["sync"]={evaluate:function(_d7){
if(wFORMS.helpers.hasClassPrefix(_d7,wFORMS.classNamePrefix_sync)){
if(!_d7.id){
_d7.id=wFORMS.helpers.randomId();
}
var _d8=wFORMS.behaviors["sync"].getSyncNames(_d7);
for(var i=0;i<_d8.length;i++){
if(!wFORMS.syncTriggers[_d8[i]]){
wFORMS.syncTriggers[_d8[i]]=new Array();
}
if(!wFORMS.syncTriggers[_d8[i]][_d7.id]){
wFORMS.syncTriggers[_d8[i]].push(_d7.id);
}
}
switch(_d7.tagName.toUpperCase()){
case "OPTION":
var _da=_d7.parentNode;
while(_da&&_da.tagName.toUpperCase()!="SELECT"){
var _da=_da.parentNode;
}
if(!_da){
alert("Error: invalid markup in SELECT field ?");
return false;
}
if(!_da.id){
_da.id=wFORMS.helpers.randomId();
}
if(!_da.getAttribute("rel")||_da.getAttribute("rel").indexOf("wfHandled")==-1){
_da.setAttribute("rel",(_da.getAttribute("rel")||"")+" wfHandled");
wFORMS.helpers.addEvent(_da,"change",wFORMS.behaviors["sync"].run);
}
break;
case "INPUT":
if(_d7.type&&_d7.type.toLowerCase()=="radio"){
var _db=_d7.form;
for(var j=0;j<_db[_d7.name].length;j++){
var _dd=_db[_d7.name][j];
if(_dd.type.toLowerCase()=="radio"){
if(!_dd.getAttribute("rel")||_dd.getAttribute("rel").indexOf("wfHandled")==-1){
wFORMS.helpers.addEvent(_dd,"click",wFORMS.behaviors["sync"].run);
_dd.setAttribute("rel",(_dd.getAttribute("rel")||"")+" wfHandled");
}
}
}
}else{
if(_d7.type&&_d7.type.toLowerCase()=="text"){
wFORMS.helpers.addEvent(_d7,"keyup",wFORMS.behaviors["sync"].run);
}else{
wFORMS.helpers.addEvent(_d7,"click",wFORMS.behaviors["sync"].run);
}
}
break;
case "TEXTAREA":
wFORMS.helpers.addEvent(_d7,"keyup",wFORMS.behaviors["sync"].run);
break;
default:
wFORMS.helpers.addEvent(_d7,"click",wFORMS.behaviors["sync"].run);
break;
}
}
if(wFORMS.helpers.hasClassPrefix(_d7,wFORMS.classNamePrefix_target)){
if(!_d7.id){
_d7.id=wFORMS.helpers.randomId();
}
var _d8=wFORMS.behaviors["sync"].getSyncNames(_d7);
for(var i=0;i<_d8.length;i++){
if(!wFORMS.syncTargets[_d8[i]]){
wFORMS.syncTargets[_d8[i]]=new Array();
}
wFORMS.syncTargets[_d8[i]].push(_d7.id);
}
}
if(_d7.tagName&&_d7.tagName.toUpperCase()=="FORM"){
wFORMS.onLoadComplete.push(wFORMS.behaviors["sync"].init);
}
},init:function(){
for(var _de in wFORMS.syncTriggers){
for(var i=0;i<wFORMS.syncTriggers[_de].length;i++){
var _e0=document.getElementById(wFORMS.syncTriggers[_de][i]);
if(wFORMS.behaviors["sync"].isTriggerOn(_e0,_de)){
if(_e0.tagName.toUpperCase()=="OPTION"){
var _e0=_e0.parentNode;
while(_e0&&_e0.tagName.toUpperCase()!="SELECT"){
var _e0=_e0.parentNode;
}
}
wFORMS.behaviors["sync"].run(_e0);
}
}
}
},run:function(e){
var _e2=wFORMS.helpers.getSourceElement(e);
if(!_e2){
_e2=e;
}
var _e3=new Array();
switch(_e2.tagName.toUpperCase()){
case "SELECT":
for(var i=0;i<_e2.options.length;i++){
_e3=_e3.concat(wFORMS.behaviors["sync"].getSyncNames(_e2.options[i]));
}
break;
case "INPUT":
if(_e2.type.toLowerCase()=="radio"){
for(var i=0;i<_e2.form[_e2.name].length;i++){
var _e5=_e2.form[_e2.name][i];
_e3=_e3.concat(wFORMS.behaviors["sync"].getSyncNames(_e5));
}
}else{
_e3=_e3.concat(wFORMS.behaviors["sync"].getSyncNames(_e2));
}
break;
default:
break;
}
for(var i=0;i<_e3.length;i++){
var _e6=wFORMS.behaviors["sync"].getTargetsBySyncName(_e3[i]);
for(var j=0;j<_e6.length;j++){
if(wFORMS.behaviors["sync"].isWithinSyncScope(_e2,_e6[j])){
wFORMS.behaviors["sync"].sync(_e2,_e6[j],_e3[i]);
}
}
}
},remove:function(e){
var _e9=wFORMS.helpers.getSourceElement(e);
},getSyncNames:function(_ea){
var _eb=new Array();
var _ec=_ea.className.split(" ");
for(var i=0;i<_ec.length;i++){
if(_ec[i].indexOf(wFORMS.classNamePrefix_sync)==0){
_eb.push(_ec[i].substr(wFORMS.classNamePrefix_sync.length+1));
}
if(_ec[i].indexOf(wFORMS.classNamePrefix_target)==0){
_eb.push(_ec[i].substr(wFORMS.classNamePrefix_target.length+1));
}
}
return _eb;
},sync:function(_ee,_ef,_f0){
if(!_ee||_ee.nodeType!=1){
return;
}
if(!_ef||_ef.nodeType!=1){
return;
}
var _f1,state;
switch(_ee.tagName.toUpperCase()){
case "SELECT":
_f1=_ee.options[_ee.selectedIndex].value;
state=wFORMS.helpers.hasClass(_ee.options[_ee.selectedIndex],wFORMS.classNamePrefix_sync+"-"+_f0);
break;
case "INPUT":
_f1=_ee.value;
if(_ee.type.toLowerCase()=="radio"||_ee.type.toLowerCase()=="checkbox"){
state=_ee.checked;
}else{
state=(_f1.lenght>0);
}
break;
default:
_f1=_ee.innerHTML;
state=(_f1.lenght>0);
break;
}
switch(_ef.tagName.toUpperCase()){
case "OPTION":
wFORMS.behaviors["sync"].syncState(_ef,state);
break;
case "INPUT":
if(_ef.type.toLowerCase()=="radio"||_ef.type.toLowerCase()=="checkbox"){
wFORMS.behaviors["sync"].syncState(_ef,state);
}else{
wFORMS.behaviors["sync"].syncValue(_ef,_f1);
}
break;
default:
wFORMS.behaviors["sync"].syncValue(_ef,_f1);
break;
}
if(wFORMS.helpers.hasClass(_ef,wFORMS.className_syncIsOff)){
element.className=_ef.className.replace(wFORMS.className_syncIsOff,wFORMS.className_syncIsOn);
}else{
if(wFORMS.helpers.hasClass(_ef,wFORMS.className_syncIsOn)){
element.className=_ef.className.replace(wFORMS.className_syncIsOn,wFORMS.className_syncIsOff);
}
}
},syncState:function(_f2,_f3){
if(_f2.tagName.toUpperCase()=="OPTION"){
_f2.selected=_f3;
}else{
_f2.checked=_f3;
}
},syncValue:function(_f4,_f5){
if(_f4.tagName.toUpperCase()=="INPUT"){
_f4.value=_f5;
}else{
_f4.innerHTML=_f5;
}
},getTargetsBySyncName:function(_f6){
var _f7=new Array();
if(wFORMS.syncTargets[_f6]){
for(var i=0;i<wFORMS.syncTargets[_f6].length;i++){
var _f9=document.getElementById(wFORMS.syncTargets[_f6][i]);
if(_f9){
_f7.push(_f9);
}
}
}
return _f7;
},isTriggerOn:function(_fa,_fb){
if(!_fa){
return false;
}
if(_fa.tagName.toUpperCase()=="OPTION"){
var _fc=_fa.parentNode;
while(_fc&&_fc.tagName.toUpperCase()!="SELECT"){
var _fc=_fc.parentNode;
}
if(!_fc){
return false;
}
if(_fc.selectedIndex==-1){
return false;
}
if(wFORMS.helpers.hasClass(_fc.options[_fc.selectedIndex],wFORMS.classNamePrefix_sync+"-"+_fb)){
return true;
}
}else{
if(_fa.checked||wFORMS.helpers.hasClass(_fa,wFORMS.className_syncIsOn)){
return true;
}
}
return false;
},isWithinSyncScope:function(_fd,_fe){
if(wFORMS.hasBehavior("repeat")&&wFORMS.limitSyncScope==true){
var _ff=_fd;
while(_ff&&_ff.tagName&&_ff.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_ff,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_ff,wFORMS.className_delete)){
_ff=_ff.parentNode;
}
if(wFORMS.helpers.hasClass(_ff,wFORMS.className_repeat)||wFORMS.helpers.hasClass(_ff,wFORMS.className_delete)){
var _100=_fe;
while(_100&&_100.tagName&&_100.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_100,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_100,wFORMS.className_delete)){
_100=_100.parentNode;
}
if(_ff==_100){
return true;
}else{
return false;
}
}else{
return true;
}
}else{
return true;
}
}};
}

