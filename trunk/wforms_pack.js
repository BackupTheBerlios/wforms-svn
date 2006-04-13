wForms.NAME="wForms";
wForms.VERSION="2.01.beta";
wForms.__repr__=function(){
return "["+this.NAME+" "+this.VERSION+"]";
};
wForms.toString=function(){
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
_6.detachEvent("on"+_7,_6[_7+fn]);
_6[_7+fn]=null;
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
var wFORMS={debugLevel:0,helpers:new wHELPERS(),behaviors:{},onLoadComplete:new Array(),onLoadHandler:function(){
for(var _37 in wFORMS.behaviors){
wFORMS.debug("wForms/loaded behavior: "+_37);
}
for(var i=0;i<document.forms.length;i++){
wFORMS.debug("wForms/initialize: "+(document.forms[i].name||document.forms[i].id));
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
if(_39.nodeType==1){
for(var _3b in wFORMS.behaviors){
wFORMS.behaviors[_3b].evaluate(_39);
}
if(_3a){
for(var i=_39.childNodes.length-1;i>=0;i--){
wFORMS.addBehaviors(_39.childNodes[i]);
}
}
if(_39.tagName.toUpperCase()=="FORM"){
wFORMS.debug("wForms/processed: "+_39.id);
for(var i=0;i<wFORMS.onLoadComplete.length;i++){
wFORMS.onLoadComplete[i]();
}
if(wFORMS.onLoadComplete.length>0){
wFORMS.onLoadComplete=new Array();
}
}
}
},hasBehavior:function(_3d){
if(wFORMS.behaviors[_3d]){
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
var _3f=document.getElementById("debugOutput");
if(!_3f){
_3f=document.createElement("div");
_3f.id="debugOutput";
_3f.style.position="absolute";
_3f.style.right="10px";
_3f.style.top="10px";
_3f.style.zIndex="300";
_3f.style.fontSize="x-small";
_3f.style.fontFamily="courier";
_3f.style.backgroundColor="#DDD";
_3f.style.padding="5px";
if(document.body){
wFORMS.debugOutput=document.body.appendChild(_3f);
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
wFORMS.behaviors["hint"]={name:"hint",evaluate:function(_40){
if(_40.id||_40.name){
var _41=document.getElementById(_40.id+wFORMS.idSuffix_fieldHint);
if(!_41){
_41=document.getElementById(_40.name+wFORMS.idSuffix_fieldHint);
}
if(_41){
switch(_40.tagName.toUpperCase()){
case "SELECT":
case "TEXTAREA":
case "INPUT":
wFORMS.helpers.addEvent(_40,"focus",wFORMS.behaviors["hint"].run);
wFORMS.helpers.addEvent(_40,"blur",wFORMS.behaviors["hint"].remove);
break;
default:
wFORMS.helpers.addEvent(_40,"mouseover",wFORMS.behaviors["hint"].run);
wFORMS.helpers.addEvent(_40,"mouseout",wFORMS.behaviors["hint"].remove);
break;
}
}
}
},run:function(e){
var _43=wFORMS.helpers.getSourceElement(e);
var _44=document.getElementById(_43.id+wFORMS.idSuffix_fieldHint);
if(!_44){
_44=document.getElementById(_43.name+wFORMS.idSuffix_fieldHint);
}
if(_44){
_44.className=_44.className.replace(wFORMS.className_inactiveFieldHint,wFORMS.className_activeFieldHint);
_44.style.top=(wFORMS.helpers.getTop(_43)+_43.offsetHeight).toString()+"px";
if(_43.tagName.toUpperCase()=="SELECT"){
_44.style.left=(wFORMS.helpers.getLeft(_43)+(_43.offsetWidth-8)).toString()+"px";
}else{
_44.style.left=(wFORMS.helpers.getLeft(_43)).toString()+"px";
}
}
},remove:function(e){
var _46=wFORMS.helpers.getSourceElement(e);
var _47=document.getElementById(_46.id+wFORMS.idSuffix_fieldHint);
if(!_47){
_47=document.getElementById(_46.name+wFORMS.idSuffix_fieldHint);
}
if(_47){
_47.className=_47.className.replace(wFORMS.className_activeFieldHint,wFORMS.className_inactiveFieldHint);
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
wFORMS.behaviors["paging"]={onPageChange:null,evaluate:function(_48){
if(wFORMS.helpers.hasClass(_48,wFORMS.className_paging)){
var _49=wFORMS.behaviors["paging"].getPageIndex(_48);
if(_49>1){
var _4a=document.createElement("input");
_4a.setAttribute("value",wFORMS.arrMsg[5]);
_4a.setAttribute("type","button");
_4a.className=wFORMS.className_pagingButtons;
_48.appendChild(_4a);
wFORMS.helpers.addEvent(_4a,"click",wFORMS.behaviors["paging"].pagingPrevious);
}else{
_48.className+=" "+wFORMS.className_pagingCurrent;
var _4b=wFORMS.behaviors["paging"].getFormElement(_48);
wFORMS.behaviors["paging"].hideSubmitButton(_4b);
wFORMS.helpers.addEvent(_4b,"submit",function(e){
var _4d=wFORMS.helpers.getSourceElement(e);
if(_4d.type&&_4d.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
});
wFORMS.preventSubmissionOnEnter=true;
}
if(document.getElementById(wFORMS.idPrefix_pageIndex+(_49+1).toString())){
var _4a=document.createElement("input");
_4a.setAttribute("value",wFORMS.arrMsg[4]);
_4a.setAttribute("type","button");
_4a.className=wFORMS.className_pagingButtons;
_48.appendChild(_4a);
wFORMS.helpers.addEvent(_4a,"click",wFORMS.behaviors["paging"].pagingNext);
}
}
},pagingNext:function(e){
var _4f=wFORMS.helpers.getSourceElement(e);
if(!_4f){
_4f=e;
}
var _50=_4f.parentNode;
var _51=wFORMS.behaviors["paging"].getPageIndex(_50)+1;
var _52=document.getElementById(wFORMS.idPrefix_pageIndex+_51.toString());
if(_52){
if(!wFORMS.hasBehavior("validation")||(wFORMS.hasBehavior("validation")&&!wFORMS.runValidationOnPageNext)||(wFORMS.hasBehavior("validation")&&wFORMS.runValidationOnPageNext&&wFORMS.functionName_formValidation(e))){
_50.className=_50.className.replace(wFORMS.className_pagingCurrent,"");
_52.className+=" "+wFORMS.className_pagingCurrent;
if(wFORMS.behaviors["paging"].isLastPage(_51)){
var _53=wFORMS.behaviors["paging"].getFormElement(_52);
wFORMS.behaviors["paging"].showSubmitButton(_53);
}
}
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_52);
}
}
},pagingPrevious:function(e){
var _55=wFORMS.helpers.getSourceElement(e);
if(!_55){
_55=e;
}
var _56=_55.parentNode;
var _57=wFORMS.behaviors["paging"].getPageIndex(_56)-1;
var _58=document.getElementById(wFORMS.idPrefix_pageIndex+_57.toString());
if(_58){
_56.className=_56.className.replace(wFORMS.className_pagingCurrent,"");
_58.className+=" "+wFORMS.className_pagingCurrent;
var _59=wFORMS.behaviors["paging"].getFormElement(_58);
wFORMS.behaviors["paging"].hideSubmitButton(_59);
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_58);
}
}
},showSubmitButton:function(_5a){
var _5b=_5a.getElementsByTagName("input");
for(var i=0;i<_5b.length;i++){
if(_5b[i].type&&_5b[i].type.toLowerCase()=="submit"){
_5b[i].className=_5b[i].className.replace(wFORMS.className_hideSubmit,"");
}
}
},hideSubmitButton:function(_5d){
var _5e=_5d.getElementsByTagName("input");
for(var i=0;i<_5e.length;i++){
if(_5e[i].type&&_5e[i].type.toLowerCase()=="submit"&&!wFORMS.helpers.hasClass(_5e[i],wFORMS.className_hideSubmit)){
_5e[i].className+=" "+wFORMS.className_hideSubmit;
}
}
},isLastPage:function(_60){
_60++;
var _61=document.getElementById(wFORMS.idPrefix_pageIndex+_60.toString());
if(!_61){
return true;
}
return false;
},gotoPage:function(_62){
if(isNaN(_62)){
var _63=document.getElementById(_62);
}else{
var _63=document.getElementById(wFORMS.idPrefix_pageIndex+_62.toString());
}
if(!_63){
return false;
}
var _64=wFORMS.behaviors["paging"].getFormElement(_63);
var _65=_64.getElementsByTagName("*");
for(var i=0;i<_65.length;i++){
if(wFORMS.helpers.hasClass(_65[i],wFORMS.className_pagingCurrent)){
_65[i].className=_65[i].className.replace(wFORMS.className_pagingCurrent,"");
break;
}
}
if(wFORMS.behaviors["paging"].isLastPage(_62)){
wFORMS.behaviors["paging"].showSubmitButton(_64);
}else{
wFORMS.behaviors["paging"].hideSubmitButton(_64);
}
_63.className+=" "+wFORMS.className_pagingCurrent;
},getFormElement:function(_67){
var _68=_67.parentNode;
while(_68&&_68.tagName.toUpperCase()!="FORM"){
_68=_68.parentNode;
}
return _68;
},getPageIndex:function(_69){
if(_69&&_69.id){
return parseInt(_69.id.replace(/[\D]*/,""));
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
wFORMS.behaviors["repeat"]={evaluate:function(_6a){
if(wFORMS.helpers.hasClass(_6a,wFORMS.className_repeat)){
var _6b;
if(_6a.id){
_6b=document.getElementById(_6a.id+wFORMS.idSuffix_duplicateLink);
}
if(!_6b){
_6b=document.createElement("a");
var _6c=document.createElement("span");
var _6d=document.createTextNode(wFORMS.arrMsg[0]);
_6b.setAttribute("href","#");
_6b.className=wFORMS.className_duplicateLink;
_6b.setAttribute("title",wFORMS.arrMsg[1]);
if(_6a.tagName.toUpperCase()=="TR"){
var n=_6a.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_6b);
}
}else{
_6a.appendChild(_6b);
}
_6c.appendChild(_6d);
_6b.appendChild(_6c);
}
var _6f=document.getElementById(_6a.id+wFORMS.idSuffix_repeatCounter);
if(!_6f){
if(document.all&&!window.opera){
var _70=_6a.id+wFORMS.idSuffix_repeatCounter;
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
_6f=document.createElement("INPUT NAME=\""+_70+"\"");
}else{
_6f=document.createElement("<INPUT NAME=\""+_70+"\"></INPUT>");
}
_6f.type="hidden";
_6f.id=_70;
_6f.value="1";
}else{
_6f=document.createElement("INPUT");
_6f.setAttribute("type","hidden");
_6f.setAttribute("value","1");
_6f.setAttribute("name",_6a.id+wFORMS.idSuffix_repeatCounter);
_6f.setAttribute("id",_6a.id+wFORMS.idSuffix_repeatCounter);
}
var _71=_6a.parentNode;
while(_71&&_71.tagName.toUpperCase()!="FORM"){
_71=_71.parentNode;
}
_71.appendChild(_6f);
}
wFORMS.helpers.addEvent(_6b,"click",wFORMS.behaviors["repeat"].duplicateFieldGroup);
}
if(wFORMS.helpers.hasClass(_6a,wFORMS.className_delete)){
var _72=document.createElement("a");
var _6c=document.createElement("span");
var _6d=document.createTextNode(wFORMS.arrMsg[2]);
_72.setAttribute("href","#");
_72.className=wFORMS.className_removeLink;
_72.setAttribute("title",wFORMS.arrMsg[3]);
if(_6a.tagName.toUpperCase()=="TR"){
var n=_6a.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_72);
}
}else{
_6a.appendChild(_72);
}
_6c.appendChild(_6d);
_72.appendChild(_6c);
wFORMS.helpers.addEvent(_72,"click",wFORMS.behaviors["repeat"].removeFieldGroup);
}
},duplicateFieldGroup:function(e){
var _74=wFORMS.helpers.getSourceElement(e);
if(!_74){
_74=e;
}
var _75=wFORMS.helpers.hasClass(_74,wFORMS.className_preserveRadioName)?true:wFORMS.preserveRadioName;
var _74=_74.parentNode;
while(_74&&!wFORMS.helpers.hasClass(_74,wFORMS.className_repeat)){
_74=_74.parentNode;
}
if(_74){
counterField=document.getElementById(_74.id+wFORMS.idSuffix_repeatCounter);
if(!counterField){
return;
}
var _76=parseInt(counterField.value)+1;
var _77="-"+_76.toString();
var _78=wFORMS.behaviors["repeat"].replicateTree(_74,null,_77,_75);
var _79=_74.nextSibling;
while(_79&&(_79.nodeType==3||wFORMS.helpers.hasClass(_79,wFORMS.className_delete))){
_79=_79.nextSibling;
}
_74.parentNode.insertBefore(_78,_79);
_78.className=_74.className.replace(wFORMS.className_repeat,wFORMS.className_delete);
document.getElementById(_74.id+wFORMS.idSuffix_repeatCounter).value=_76;
wFORMS.addBehaviors(_78);
}
return wFORMS.helpers.preventEvent(e);
},removeFieldGroup:function(e){
var _7b=wFORMS.helpers.getSourceElement(e);
if(!_7b){
_7b=e;
}
var _7b=_7b.parentNode;
while(_7b&&!wFORMS.helpers.hasClass(_7b,wFORMS.className_delete)){
_7b=_7b.parentNode;
}
_7b.parentNode.removeChild(_7b);
return wFORMS.helpers.preventEvent(e);
},removeRepeatCountSuffix:function(str){
return str.replace(/-\d$/,"");
},replicateTree:function(_7d,_7e,_7f,_80){
if(_7d.nodeType==3){
if(_7d.parentNode.tagName.toUpperCase()!="TEXTAREA"){
var _81=document.createTextNode(_7d.data);
}
}else{
if(_7d.nodeType==1){
if(wFORMS.helpers.hasClass(_7d,wFORMS.className_duplicateLink)||wFORMS.helpers.hasClass(_7d,wFORMS.className_removeLink)){
return null;
}
if(wFORMS.helpers.hasClass(_7d,wFORMS.className_delete)){
return null;
}
if(wFORMS.helpers.hasClass(_7d,wFORMS.className_repeat)&&_7e!=null){
_7f=_7f.replace("-","__");
}
if(!document.all||window.opera){
var _81=document.createElement(_7d.tagName);
}else{
var _82=_7d.tagName;
if(_7d.name){
if(_7d.tagName.toUpperCase()=="INPUT"&&_7d.type.toLowerCase()=="radio"&&_80){
_82+=" NAME='"+_7d.name+"' ";
}else{
_82+=" NAME='"+wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_7d.name)+_7f+"' ";
}
}
if(_7d.type){
_82+=" TYPE='"+_7d.type+"' ";
}
if(_7d.selected){
_82+=" SELECTED='SELECTED' ";
}
if(_7d.checked){
_82+=" CHECKED='CHECKED' ";
}
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
var _81=document.createElement(_82);
}else{
var _81=document.createElement("<"+_82+"></"+_7d.tagName+">");
}
try{
_81.type=_7d.type;
}
catch(e){
}
}
for(var i=0;i<_7d.attributes.length;i++){
var _84=_7d.attributes[i];
if(_84.specified||_84.nodeName.toLowerCase()=="value"){
if(_84.nodeName.toLowerCase()=="id"||_84.nodeName.toLowerCase()=="name"||_84.nodeName.toLowerCase()=="for"){
if(wFORMS.hasBehavior("hint")&&_84.nodeValue.indexOf(wFORMS.idSuffix_fieldHint)!=-1){
var _85=_84.nodeValue;
_85=wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_85.substr(0,_85.indexOf(wFORMS.idSuffix_fieldHint)))+_7f+wFORMS.idSuffix_fieldHint;
}else{
if(_7d.tagName.toUpperCase()=="INPUT"&&_7d.getAttribute("type",false).toLowerCase()=="radio"&&_84.nodeName.toLowerCase()=="name"&&_80){
var _85=_84.nodeValue;
}else{
var _85=_84.nodeValue+_7f;
}
}
}else{
if(_84.nodeName.toLowerCase()=="value"&&_7d.tagName.toUpperCase()=="INPUT"&&(_7d.type.toLowerCase()=="text"||_7d.type.toLowerCase()=="password"||_7d.type.toLowerCase()=="file")){
var _85="";
}else{
if(_84.nodeName.toLowerCase()=="rel"&&_84.nodeValue.indexOf("wfHandled")!=-1){
var _85=_84.nodeValue.replace("wfHandled","");
}else{
var _85=_84.nodeValue;
}
}
}
switch(_84.nodeName.toLowerCase()){
case "class":
_81.className=_85;
break;
case "style":
if(_7d.style&&_7d.style.cssText){
_81.style.cssText=_7d.style.cssText;
}
break;
case "onclick":
_81.onclick=_7d.onclick;
break;
case "onchange":
_81.onchange=_7d.onchange;
break;
case "onsubmit":
_81.onsubmit=_7d.onsubmit;
break;
case "onmouseover":
_81.onmouseover=_7d.onmouseover;
break;
case "onmouseout":
_81.onmouseout=_7d.onmouseout;
break;
case "onmousedown":
_81.onmousedown=_7d.onmousedown;
break;
case "onmouseup":
_81.onmouseup=_7d.onmouseup;
break;
case "ondblclick":
_81.ondblclick=_7d.ondblclick;
break;
case "onkeydown":
_81.onkeydown=_7d.onkeydown;
break;
case "onkeyup":
_81.onkeyup=_7d.onkeyup;
break;
case "onblur":
_81.onblur=_7d.onblur;
break;
case "onfocus":
_81.onfocus=_7d.onfocus;
break;
default:
_81.setAttribute(_84.name,_85,0);
}
}
}
}
}
if(_7e&&_81){
_7e.appendChild(_81);
}
for(var i=0;i<_7d.childNodes.length;i++){
wFORMS.behaviors["repeat"].replicateTree(_7d.childNodes[i],_81,_7f,_80);
}
return _81;
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
wFORMS.behaviors["switch"]={evaluate:function(_86){
if(wFORMS.helpers.hasClassPrefix(_86,wFORMS.classNamePrefix_switch)){
if(!_86.id){
_86.id=wFORMS.helpers.randomId();
}
var _87=wFORMS.behaviors["switch"].getSwitchNames(_86);
for(var i=0;i<_87.length;i++){
if(!wFORMS.switchTriggers[_87[i]]){
wFORMS.switchTriggers[_87[i]]=new Array();
}
wFORMS.switchTriggers[_87[i]].push(_86.id);
}
switch(_86.tagName.toUpperCase()){
case "OPTION":
var _89=_86.parentNode;
while(_89&&_89.tagName.toUpperCase()!="SELECT"){
var _89=_89.parentNode;
}
if(!_89){
alert("Error: invalid markup in SELECT field ?");
return false;
}
if(!_89.id){
_89.id=wFORMS.helpers.randomId();
}
if(!_89.getAttribute("rel")||_89.getAttribute("rel").indexOf("wfHandled")==-1){
_89.setAttribute("rel",(_89.getAttribute("rel")||"")+" wfHandled");
wFORMS.helpers.addEvent(_89,"change",wFORMS.behaviors["switch"].run);
}
break;
case "INPUT":
if(_86.type&&_86.type.toLowerCase()=="radio"){
var _8a=_86.form;
for(var j=0;j<_8a[_86.name].length;j++){
var _8c=_8a[_86.name][j];
if(_8c.type.toLowerCase()=="radio"){
if(!_8c.getAttribute("rel")||_8c.getAttribute("rel").indexOf("wfHandled")==-1){
wFORMS.helpers.addEvent(_8c,"click",wFORMS.behaviors["switch"].run);
_8c.setAttribute("rel",(_8c.getAttribute("rel")||"")+" wfHandled");
}
}
}
}else{
wFORMS.helpers.addEvent(_86,"click",wFORMS.behaviors["switch"].run);
}
break;
default:
wFORMS.helpers.addEvent(_86,"click",wFORMS.behaviors["switch"].run);
break;
}
}
if(wFORMS.helpers.hasClassPrefix(_86,wFORMS.classNamePrefix_offState)||wFORMS.helpers.hasClassPrefix(_86,wFORMS.classNamePrefix_onState)){
if(!_86.id){
_86.id=wFORMS.helpers.randomId();
}
var _87=wFORMS.behaviors["switch"].getSwitchNames(_86);
for(var i=0;i<_87.length;i++){
if(!wFORMS.switchTargets[_87[i]]){
wFORMS.switchTargets[_87[i]]=new Array();
}
wFORMS.switchTargets[_87[i]].push(_86.id);
}
}
if(_86.tagName&&_86.tagName.toUpperCase()=="FORM"){
wFORMS.onLoadComplete.push(wFORMS.behaviors["switch"].init);
}
},init:function(){
for(var _8d in wFORMS.switchTriggers){
for(var i=0;i<wFORMS.switchTriggers[_8d].length;i++){
var _8f=document.getElementById(wFORMS.switchTriggers[_8d][i]);
if(wFORMS.behaviors["switch"].isTriggerOn(_8f,_8d)){
if(_8f.tagName.toUpperCase()=="OPTION"){
var _8f=_8f.parentNode;
while(_8f&&_8f.tagName.toUpperCase()!="SELECT"){
var _8f=_8f.parentNode;
}
}
wFORMS.behaviors["switch"].run(_8f);
}
}
}
},run:function(e){
var _91=wFORMS.helpers.getSourceElement(e);
if(!_91){
_91=e;
}
var _92=new Array();
var _93=new Array();
switch(_91.tagName.toUpperCase()){
case "SELECT":
for(var i=0;i<_91.options.length;i++){
if(i==_91.selectedIndex){
_92=_92.concat(wFORMS.behaviors["switch"].getSwitchNames(_91.options[i]));
}else{
_93=_93.concat(wFORMS.behaviors["switch"].getSwitchNames(_91.options[i]));
}
}
break;
case "INPUT":
if(_91.type.toLowerCase()=="radio"){
for(var i=0;i<_91.form[_91.name].length;i++){
var _95=_91.form[_91.name][i];
if(_95.checked){
_92=_92.concat(wFORMS.behaviors["switch"].getSwitchNames(_95));
}else{
_93=_93.concat(wFORMS.behaviors["switch"].getSwitchNames(_95));
}
}
}else{
if(_91.checked||wFORMS.helpers.hasClass(_91,wFORMS.className_switchIsOn)){
_92=_92.concat(wFORMS.behaviors["switch"].getSwitchNames(_91));
}else{
_93=_93.concat(wFORMS.behaviors["switch"].getSwitchNames(_91));
}
}
break;
default:
break;
}
for(var i=0;i<_93.length;i++){
var _96=wFORMS.behaviors["switch"].getElementsBySwitchName(_93[i]);
for(var j=0;j<_96.length;j++){
var _98=wFORMS.switchTriggers[_93[i]];
var _99=true;
for(var k=0;k<_98.length;k++){
var _9b=document.getElementById(_98[k]);
if(wFORMS.behaviors["switch"].isTriggerOn(_9b,_93[i])){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_9b,_96[j])){
_99=false;
}
}
}
if(_99){
wFORMS.behaviors["switch"].switchState(_96[j],wFORMS.classNamePrefix_onState,wFORMS.classNamePrefix_offState);
}
}
}
for(var i=0;i<_92.length;i++){
var _96=wFORMS.behaviors["switch"].getElementsBySwitchName(_92[i]);
for(var j=0;j<_96.length;j++){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_91,_96[j])){
wFORMS.behaviors["switch"].switchState(_96[j],wFORMS.classNamePrefix_offState,wFORMS.classNamePrefix_onState);
}
}
}
},remove:function(e){
var _9d=wFORMS.helpers.getSourceElement(e);
},getSwitchNames:function(_9e){
var _9f=new Array();
var _a0=_9e.className.split(" ");
for(var i=0;i<_a0.length;i++){
if(_a0[i].indexOf(wFORMS.classNamePrefix_switch)==0){
_9f.push(_a0[i].substr(wFORMS.classNamePrefix_switch.length+1));
}
if(_a0[i].indexOf(wFORMS.classNamePrefix_onState)==0){
_9f.push(_a0[i].substr(wFORMS.classNamePrefix_onState.length+1));
}else{
if(_a0[i].indexOf(wFORMS.classNamePrefix_offState)==0){
_9f.push(_a0[i].substr(wFORMS.classNamePrefix_offState.length+1));
}
}
}
return _9f;
},switchState:function(_a2,_a3,_a4){
if(!_a2||_a2.nodeType!=1){
return;
}
if(_a2.className){
_a2.className=_a2.className.replace(_a3,_a4);
}
if(wFORMS.helpers.hasClass(_a2,wFORMS.className_switchIsOff)){
_a2.className=_a2.className.replace(wFORMS.className_switchIsOff,wFORMS.className_switchIsOn);
}else{
if(wFORMS.helpers.hasClass(_a2,wFORMS.className_switchIsOn)){
_a2.className=_a2.className.replace(wFORMS.className_switchIsOn,wFORMS.className_switchIsOff);
}
}
},getElementsBySwitchName:function(_a5){
var _a6=new Array();
if(wFORMS.switchTargets[_a5]){
for(var i=0;i<wFORMS.switchTargets[_a5].length;i++){
var _a8=document.getElementById(wFORMS.switchTargets[_a5][i]);
if(_a8){
_a6.push(_a8);
}
}
}
return _a6;
},isTriggerOn:function(_a9,_aa){
if(!_a9){
return false;
}
if(_a9.tagName.toUpperCase()=="OPTION"){
var _ab=_a9.parentNode;
while(_ab&&_ab.tagName.toUpperCase()!="SELECT"){
var _ab=_ab.parentNode;
}
if(!_ab){
return false;
}
if(_ab.selectedIndex==-1){
return false;
}
if(wFORMS.helpers.hasClass(_ab.options[_ab.selectedIndex],wFORMS.classNamePrefix_switch+"-"+_aa)){
return true;
}
}else{
if(_a9.checked||wFORMS.helpers.hasClass(_a9,wFORMS.className_switchIsOn)){
return true;
}
}
return false;
},isWithinSwitchScope:function(_ac,_ad){
if(wFORMS.hasBehavior("repeat")&&wFORMS.limitSwitchScope==true){
var _ae=_ac;
while(_ae&&_ae.tagName&&_ae.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_ae,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_ae,wFORMS.className_delete)){
_ae=_ae.parentNode;
}
if(wFORMS.helpers.hasClass(_ae,wFORMS.className_repeat)||wFORMS.helpers.hasClass(_ae,wFORMS.className_delete)){
var _af=_ad;
while(_af&&_af.tagName&&_af.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_af,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_af,wFORMS.className_delete)){
_af=_af.parentNode;
}
if(_ae==_af){
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
wFORMS.behaviors["validation"]={evaluate:function(_b0){
if(_b0.tagName.toUpperCase()=="FORM"){
if(wFORMS.functionName_formValidation.toString()==wFORMS.functionName_formValidation){
wFORMS.functionName_formValidation=eval(wFORMS.functionName_formValidation);
}
wFORMS.helpers.addEvent(_b0,"submit",wFORMS.functionName_formValidation);
}
},init:function(){
},run:function(e){
var _b2=wFORMS.helpers.getSourceElement(e);
if(!_b2){
_b2=e;
}
if(wFORMS.preventSubmissionOnEnter){
if(_b2.type&&_b2.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
}
while(_b2&&_b2.tagName.toUpperCase()!="FORM"){
_b2=_b2.parentNode;
}
var _b3=wFORMS.behaviors["validation"].validateElement(_b2,true);
if(_b3>0){
if(wFORMS.showAlertOnError){
wFORMS.behaviors["validation"].showAlert(_b3);
}
return wFORMS.helpers.preventEvent(e);
}
return true;
},remove:function(){
},validateElement:function(_b4){
var _b5=wFORMS.behaviors["validation"];
if(wFORMS.hasBehavior("switch")&&wFORMS.helpers.hasClassPrefix(_b4,wFORMS.classNamePrefix_offState)){
return 0;
}
if(wFORMS.hasBehavior("paging")&&wFORMS.helpers.hasClass(_b4,wFORMS.className_paging)&&!wFORMS.helpers.hasClass(_b4,wFORMS.className_pagingCurrent)){
return 0;
}
var _b6=0;
if(!_b5.checkRequired(_b4)){
_b5.showError(_b4,wFORMS.arrErrorMsg[0]);
_b6++;
}else{
if(wFORMS.helpers.hasClassPrefix(_b4,wFORMS.classNamePrefix_validation)){
var _b7=_b4.className.split(" ");
for(j=0;j<_b7.length;j++){
switch(_b7[j]){
case "validate-alpha":
if(!_b5.isAlpha(_b4.value)){
_b5.showError(_b4,wFORMS.arrErrorMsg[1]);
_b6++;
}
break;
case "validate-alphanum":
if(!_b5.isAlphaNum(_b4.value)){
_b5.showError(_b4,wFORMS.arrErrorMsg[6]);
_b6++;
}
break;
case "validate-date":
if(!_b5.isDate(_b4.value)){
_b5.showError(_b4,wFORMS.arrErrorMsg[7]);
_b6++;
}
break;
case "validate-time":
break;
case "validate-email":
if(!_b5.isEmail(_b4.value)){
_b5.showError(_b4,wFORMS.arrErrorMsg[2]);
_b6++;
}
break;
case "validate-integer":
if(!_b5.isInteger(_b4.value)){
_b5.showError(_b4,wFORMS.arrErrorMsg[3]);
_b6++;
}
break;
case "validate-float":
if(!_b5.isFloat(_b4.value)){
_b5.showError(_b4,wFORMS.arrErrorMsg[4]);
_b6++;
}
break;
case "validate-strongpassword":
if(!_b5.isPassword(_b4.value)){
_b5.showError(_b4,wFORMS.arrErrorMsg[5]);
_b6++;
}
break;
}
}
}
}
if(_b6==0){
var _b8=new RegExp(wFORMS.className_validationError_fld,"gi");
_b4.className=_b4.className.replace(_b8,"");
var _b9=document.getElementById(_b4.id+wFORMS.idSuffix_fieldError);
if(_b9){
_b9.parentNode.removeChild(_b9);
}
}
var _ba=arguments[1]?arguments[1]:true;
if(_ba){
for(var i=0;i<_b4.childNodes.length;i++){
if(_b4.childNodes[i].nodeType==1){
_b6+=_b5.validateElement(_b4.childNodes[i],_ba);
}
}
}
return _b6;
},checkRequired:function(_bc){
if(wFORMS.helpers.hasClass(_bc,wFORMS.className_required)){
var _bd=wFORMS.behaviors["validation"];
switch(_bc.tagName.toUpperCase()){
case "INPUT":
switch(_bc.getAttribute("type").toLowerCase()){
case "checkbox":
return _bc.checked;
break;
case "radio":
return _bc.checked;
break;
default:
return !_bd.isEmpty(_bc.value);
}
break;
case "SELECT":
return !_bd.isEmpty(_bc.options[_bc.selectedIndex].value);
break;
case "TEXTAREA":
return !_bd.isEmpty(_bc.value);
break;
default:
return _bd.checkOneRequired(_bc);
break;
}
}
return true;
},checkOneRequired:function(_be){
var _bf=false;
if(_be.nodeType!=1){
return false;
}
if(_be.tagName.toUpperCase()=="INPUT"){
switch(_be.type.toLowerCase()){
case "checkbox":
_bf=_be.checked;
break;
case "radio":
_bf=_be.checked;
break;
default:
_bf=_be.value;
}
}else{
_bf=_be.value;
}
if(_bf&&!wFORMS.behaviors["validation"].isEmpty(_bf)){
return true;
}
for(var i=0;i<_be.childNodes.length;i++){
if(wFORMS.behaviors["validation"].checkOneRequired(_be.childNodes[i])){
return true;
}
}
return false;
},isEmpty:function(s){
var _c2=/^\s+$/;
return ((s==null)||(s.length==0)||_c2.test(s));
},isAlpha:function(s){
var _c4=/^[a-zA-Z]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_c4.test(s);
},isAlphaNum:function(s){
var _c6=/\W/;
return wFORMS.behaviors["validation"].isEmpty(s)||!_c6.test(s);
},isDate:function(s){
var _c8=new Date(s);
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(_c8);
},isEmail:function(s){
var _ca=/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_ca.test(s);
},isInteger:function(s){
var _cc=/^[+]?\d+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_cc.test(s);
},isFloat:function(s){
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(parseFloat(s));
},isPassword:function(s){
return wFORMS.behaviors["validation"].isEmpty(s);
},showError:function(_cf,_d0){
if(_cf.className.indexOf(wFORMS.className_validationError_fld)!=-1){
return;
}
if(!_cf.id){
_cf.id=wFORMS.helpers.randomId();
}
_cf.className+=" "+wFORMS.className_validationError_fld;
var _d1=document.createTextNode(" "+_d0);
var fe=document.getElementById(_cf.id+wFORMS.idSuffix_fieldError);
if(!fe){
fe=document.createElement("div");
fe.setAttribute("id",_cf.id+wFORMS.idSuffix_fieldError);
var fl=document.getElementById(_cf.id+wFORMS.idSuffix_fieldLabel);
if(fl){
fl.parentNode.insertBefore(fe,fl.nextSibling);
}else{
_cf.parentNode.insertBefore(fe,_cf.nextSibling);
}
}
fe.appendChild(_d1);
fe.className+=" "+wFORMS.className_validationError_msg;
},showAlert:function(_d4){
alert(wFORMS.arrErrorMsg[8].replace("%%",_d4));
}};
wFORMS.functionName_formValidation=wFORMS.behaviors["validation"].run;
wFORMS.formValidation=wFORMS.behaviors["validation"].run;
}

