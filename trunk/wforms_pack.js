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
wHELPERS.prototype.hasIdPrefix=function(_16,_17){
if(_16&&_16.id){
if(_16.id.indexOf(_17)!=-1){
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
wHELPERS.prototype.getComputedStyle=function(_1c,_1d){
if(window.getComputedStyle){
return window.getComputedStyle(_1c,"").getPropertyValue(_1d);
}else{
if(_1c.currentStyle){
return _1c.currentStyle[_1d];
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
},fade_element:function(id,fps,_24,_25,to){
if(!fps){
fps=30;
}
if(!_24){
_24=3000;
}
if(!_25||_25=="#"){
_25="#FFFF33";
}
if(!to){
to=this.get_bgcolor(id);
}
var _27=Math.round(fps*(_24/1000));
var _28=_24/_27;
var _29=_28;
var _2a=0;
if(_25.length<7){
_25+=_25.substr(1,3);
}
if(to.length<7){
to+=to.substr(1,3);
}
var rf=parseInt(_25.substr(1,2),16);
var gf=parseInt(_25.substr(3,2),16);
var bf=parseInt(_25.substr(5,2),16);
var rt=parseInt(to.substr(1,2),16);
var gt=parseInt(to.substr(3,2),16);
var bt=parseInt(to.substr(5,2),16);
var r,g,b,h;
while(_2a<_27){
r=Math.floor(rf*((_27-_2a)/_27)+rt*(_2a/_27));
g=Math.floor(gf*((_27-_2a)/_27)+gt*(_2a/_27));
b=Math.floor(bf*((_27-_2a)/_27)+bt*(_2a/_27));
h=this.make_hex(r,g,b);
setTimeout("Fat.set_bgcolor('"+id+"','"+h+"')",_29);
_2a++;
_29=_28*_2a;
}
setTimeout("Fat.set_bgcolor('"+id+"','"+to+"')",_29);
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
for(var _39 in wFORMS.behaviors){
wFORMS.debug("wForms/loaded behavior: "+_39);
}
for(var i=0;i<document.forms.length;i++){
wFORMS.debug("wForms/initialize: "+(document.forms[i].name||document.forms[i].id));
wFORMS.processedForm=document.forms[i];
wFORMS.addBehaviors(document.forms[i]);
}
},addBehaviors:function(_3b){
if(!_3b){
return;
}
var _3c=arguments[1]?arguments[1]:true;
if(!_3b.nodeType){
_3b=document.getElementById(_3b);
}
if(!_3b||_3b.nodeType!=1){
return;
}
_3c=(arguments.length>1)?arguments[1]:true;
wFORMS._addBehaviors(_3b,_3c);
},_addBehaviors:function(_3d,_3e){
if(_3d.getAttribute("rel")=="no-behavior"){
return false;
}
if(_3d.nodeType==1){
for(var _3f in wFORMS.behaviors){
wFORMS.behaviors[_3f].evaluate(_3d);
}
if(_3e){
for(var i=0,l=_3d.childNodes.length,cn=_3d.childNodes;i<l;i++){
if(cn[i].nodeType==1){
wFORMS._addBehaviors(cn[i],_3e);
}
}
}
if(_3d.tagName.toUpperCase()=="FORM"){
for(var i=0;i<wFORMS.onLoadComplete.length;i++){
wFORMS.onLoadComplete[i]();
}
if(wFORMS.onLoadComplete.length>0){
wFORMS.onLoadComplete=new Array();
}
}
}
},hasBehavior:function(_41){
if(wFORMS.behaviors[_41]){
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
var _43=document.getElementById("debugOutput");
if(!_43){
_43=document.createElement("div");
_43.id="debugOutput";
_43.style.position="absolute";
_43.style.right="10px";
_43.style.top="10px";
_43.style.zIndex="300";
_43.style.fontSize="x-small";
_43.style.fontFamily="courier";
_43.style.backgroundColor="#DDD";
_43.style.padding="5px";
if(document.body){
wFORMS.debugOutput=document.body.appendChild(_43);
}
}
if(wFORMS.debugOutput){
wFORMS.debugOutput.ondblclick=function(){
this.innerHTML="";
};
}
}};
wFORMS.NAME="wForms";
wFORMS.VERSION="2.01beta";
wFORMS.__repr__=function(){
return "["+this.NAME+" "+this.VERSION+"]";
};
wFORMS.toString=function(){
return this.__repr__();
};
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
wFORMS.behaviors["hint"]={name:"hint",evaluate:function(_44){
if(_44.id){
if(_44.id.indexOf(wFORMS.idSuffix_fieldHint)>0){
var id=_44.id.replace(wFORMS.idSuffix_fieldHint,"");
var _46=document.getElementById(id)||wFORMS.processedForm[id];
}
if(_46){
if(_46.length>0&&_46[0].type=="radio"){
var _47=_46;
l=_46.length;
}else{
var _47=new Array(_46);
l=1;
}
for(var i=0;i<l;i++){
_46=_47[i];
wFORMS.debug("hint/evaluate: "+(_44.id||_44.name));
switch(_46.tagName.toUpperCase()){
case "SELECT":
case "TEXTAREA":
case "INPUT":
wFORMS.helpers.addEvent(_46,"focus",wFORMS.behaviors["hint"].run);
wFORMS.helpers.addEvent(_46,"blur",wFORMS.behaviors["hint"].remove);
break;
default:
wFORMS.helpers.addEvent(_46,"mouseover",wFORMS.behaviors["hint"].run);
wFORMS.helpers.addEvent(_46,"mouseout",wFORMS.behaviors["hint"].remove);
break;
}
}
}
}
},run:function(e){
var _4a=wFORMS.helpers.getSourceElement(e);
var _4b=document.getElementById(_4a.id+wFORMS.idSuffix_fieldHint);
if(!_4b){
_4b=document.getElementById(_4a.name+wFORMS.idSuffix_fieldHint);
}
if(_4b){
_4b.className=_4b.className.replace(wFORMS.className_inactiveFieldHint,wFORMS.className_activeFieldHint);
_4b.style.top=(wFORMS.helpers.getTop(_4a)+_4a.offsetHeight).toString()+"px";
if(_4a.tagName.toUpperCase()=="SELECT"){
_4b.style.left=(wFORMS.helpers.getLeft(_4a)+(_4a.offsetWidth-8)).toString()+"px";
}else{
_4b.style.left=(wFORMS.helpers.getLeft(_4a)).toString()+"px";
}
}
},remove:function(e){
var _4d=wFORMS.helpers.getSourceElement(e);
var _4e=document.getElementById(_4d.id+wFORMS.idSuffix_fieldHint);
if(!_4e){
_4e=document.getElementById(_4d.name+wFORMS.idSuffix_fieldHint);
}
if(_4e){
_4e.className=_4e.className.replace(wFORMS.className_activeFieldHint,wFORMS.className_inactiveFieldHint);
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
wFORMS.behaviors["paging"]={idSuffix_buttonsPlaceholder:"-buttons",className_pageNextButton:wFORMS.className_pagingButtons+" wfPageNextButton",className_pagePreviousButton:wFORMS.className_pagingButtons+" wfPagePreviousButton",behaviorInUse:false,onPageChange:null,evaluate:function(_4f){
if(wFORMS.helpers.hasClass(_4f,wFORMS.className_paging)){
wFORMS.behaviors["paging"].behaviorInUse=true;
var _50=wFORMS.behaviors["paging"].getPageIndex(_4f);
if(_50>1){
var _51=this.getButtonPlaceholder(_4f);
var _52=_51.insertBefore(this.createPreviousPageButton(),_51.firstChild);
wFORMS.helpers.addEvent(_52,"click",wFORMS.behaviors["paging"].pagingPrevious);
}else{
_4f.className+=" "+wFORMS.className_pagingCurrent;
var _53=wFORMS.behaviors["paging"].getFormElement(_4f);
wFORMS.behaviors["paging"].hideSubmitButton(_53);
wFORMS.helpers.addEvent(_53,"submit",function(e){
var _55=wFORMS.helpers.getSourceElement(e);
if(_55.type&&_55.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
});
wFORMS.preventSubmissionOnEnter=true;
}
if(document.getElementById(wFORMS.idPrefix_pageIndex+(_50+1).toString())){
var _51=this.getButtonPlaceholder(_4f);
var _52=_51.appendChild(this.createNextPageButton());
wFORMS.helpers.addEvent(_52,"click",wFORMS.behaviors["paging"].pagingNext);
}
}
},getButtonPlaceholder:function(_56){
var p=document.getElementById(_56.id+this.idSuffix_buttonsPlaceholder);
if(!p){
var _58=document.createElement("div");
_58=_56.appendChild(_58);
_58.className="actions";
_58.id=_56.id+this.idSuffix_buttonsPlaceholder;
return _58;
}
return p;
},createNextPageButton:function(){
var _59=document.createElement("input");
_59.setAttribute("value",wFORMS.arrMsg[4]);
_59.setAttribute("type","button");
_59.className=this.className_pageNextButton;
return _59;
},createPreviousPageButton:function(){
var _5a=document.createElement("input");
_5a.setAttribute("value",wFORMS.arrMsg[5]);
_5a.setAttribute("type","button");
_5a.className=this.className_pagePreviousButton;
return _5a;
},pagingNext:function(e){
var _5c=wFORMS.helpers.getSourceElement(e);
if(!_5c){
_5c=e;
}
var _5d=wFORMS.behaviors["paging"].getPageElement(_5c);
var _5e=wFORMS.behaviors["paging"].getPageIndex(_5d)+1;
var _5f=document.getElementById(wFORMS.idPrefix_pageIndex+_5e.toString());
if(_5f){
if(!wFORMS.hasBehavior("validation")||(wFORMS.hasBehavior("validation")&&!wFORMS.runValidationOnPageNext)||(wFORMS.hasBehavior("validation")&&wFORMS.runValidationOnPageNext&&wFORMS.functionName_formValidation(e,true))){
_5d.className=_5d.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
_5f.className+=" "+wFORMS.className_pagingCurrent;
if(wFORMS.behaviors["paging"].isLastPage(_5e)){
var _60=wFORMS.behaviors["paging"].getFormElement(_5f);
wFORMS.behaviors["paging"].showSubmitButton(_60);
}
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_5f);
}
}
}
},pagingPrevious:function(e){
var _62=wFORMS.helpers.getSourceElement(e);
if(!_62){
_62=e;
}
var _63=wFORMS.behaviors["paging"].getPageElement(_62);
var _64=wFORMS.behaviors["paging"].getPageIndex(_63)-1;
var _65=document.getElementById(wFORMS.idPrefix_pageIndex+_64.toString());
if(_65){
_63.className=_63.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
_65.className+=" "+wFORMS.className_pagingCurrent;
var _66=wFORMS.behaviors["paging"].getFormElement(_65);
wFORMS.behaviors["paging"].hideSubmitButton(_66);
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_65);
}
}
},showSubmitButton:function(_67){
var _68=_67.getElementsByTagName("input");
for(var i=0;i<_68.length;i++){
if(_68[i].type&&_68[i].type.toLowerCase()=="submit"){
_68[i].className=_68[i].className.replace(wFORMS.className_hideSubmit,"");
}
}
},hideSubmitButton:function(_6a){
var _6b=_6a.getElementsByTagName("input");
for(var i=0;i<_6b.length;i++){
if(_6b[i].type&&_6b[i].type.toLowerCase()=="submit"&&!wFORMS.helpers.hasClass(_6b[i],wFORMS.className_hideSubmit)){
_6b[i].className+=" "+wFORMS.className_hideSubmit;
}
}
},isLastPage:function(_6d){
if(isNaN(_6d)){
_6d=parseInt(_6d.replace(/[\D]*/,""));
}
_6d++;
var _6e=document.getElementById(wFORMS.idPrefix_pageIndex+_6d.toString());
if(!_6e){
return true;
}
return false;
},gotoPage:function(_6f){
if(isNaN(_6f)){
var _70=document.getElementById(_6f);
}else{
var _70=document.getElementById(wFORMS.idPrefix_pageIndex+_6f.toString());
}
if(!_70){
return false;
}
var _71=wFORMS.behaviors["paging"].getFormElement(_70);
var _72=_71.getElementsByTagName("*");
for(var i=0;i<_72.length;i++){
var n=_72[i];
if(wFORMS.helpers.hasClass(_72[i],wFORMS.className_pagingCurrent)){
n.className=n.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
break;
}
}
if(wFORMS.behaviors["paging"].isLastPage(_6f)){
wFORMS.behaviors["paging"].showSubmitButton(_71);
}else{
wFORMS.behaviors["paging"].hideSubmitButton(_71);
}
_70.className+=" "+wFORMS.className_pagingCurrent;
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_70);
}
},getFormElement:function(_75){
var _76=_75.parentNode;
while(_76&&_76.tagName.toUpperCase()!="FORM"){
_76=_76.parentNode;
}
return _76;
},getPageElement:function(_77){
var n=_77.parentNode;
while(n&&(!n.className||!wFORMS.helpers.hasClass(n,wFORMS.className_paging))){
n=n.parentNode;
}
return n;
},getPageIndex:function(_79){
if(_79&&_79.id){
return parseInt(_79.id.replace(/[\D]*/,""));
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
wFORMS.behaviors["repeat"]={evaluate:function(_7a){
if(wFORMS.helpers.hasClass(_7a,wFORMS.className_repeat)){
var _7b;
if(_7a.id){
_7b=document.getElementById(_7a.id+wFORMS.idSuffix_duplicateLink);
}
if(!_7b){
_7b=document.createElement("a");
var _7c=document.createElement("span");
var _7d=document.createTextNode(wFORMS.arrMsg[0]);
_7b.setAttribute("href","#");
_7b.className=wFORMS.className_duplicateLink;
_7b.setAttribute("title",wFORMS.arrMsg[1]);
if(_7a.tagName.toUpperCase()=="TR"){
var n=_7a.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_7b);
}
}else{
_7a.appendChild(_7b);
}
_7c.appendChild(_7d);
_7b.appendChild(_7c);
}
var _7f=document.getElementById(_7a.id+wFORMS.idSuffix_repeatCounter);
if(!_7f){
if(document.all&&!window.opera){
var _80=_7a.id+wFORMS.idSuffix_repeatCounter;
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
_7f=document.createElement("INPUT NAME=\""+_80+"\"");
}else{
_7f=document.createElement("<INPUT NAME=\""+_80+"\"></INPUT>");
}
_7f.type="hidden";
_7f.id=_80;
_7f.value="1";
}else{
_7f=document.createElement("INPUT");
_7f.setAttribute("type","hidden");
_7f.setAttribute("value","1");
_7f.setAttribute("name",_7a.id+wFORMS.idSuffix_repeatCounter);
_7f.setAttribute("id",_7a.id+wFORMS.idSuffix_repeatCounter);
}
var _81=_7a.parentNode;
while(_81&&_81.tagName.toUpperCase()!="FORM"){
_81=_81.parentNode;
}
_81.appendChild(_7f);
}
wFORMS.helpers.addEvent(_7b,"click",wFORMS.behaviors["repeat"].duplicateFieldGroup);
}
if(wFORMS.helpers.hasClass(_7a,wFORMS.className_delete)){
var _82=document.createElement("a");
var _7c=document.createElement("span");
var _7d=document.createTextNode(wFORMS.arrMsg[2]);
_82.setAttribute("href","#");
_82.className=wFORMS.className_removeLink;
_82.setAttribute("title",wFORMS.arrMsg[3]);
if(_7a.tagName.toUpperCase()=="TR"){
var n=_7a.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_82);
}
}else{
_7a.appendChild(_82);
}
_7c.appendChild(_7d);
_82.appendChild(_7c);
wFORMS.helpers.addEvent(_82,"click",wFORMS.behaviors["repeat"].removeFieldGroup);
}
},duplicateFieldGroup:function(e){
var _84=wFORMS.helpers.getSourceElement(e);
if(!_84){
_84=e;
}
var _85=wFORMS.helpers.hasClass(_84,wFORMS.className_preserveRadioName)?true:wFORMS.preserveRadioName;
var _84=_84.parentNode;
while(_84&&!wFORMS.helpers.hasClass(_84,wFORMS.className_repeat)){
_84=_84.parentNode;
}
if(_84){
counterField=document.getElementById(_84.id+wFORMS.idSuffix_repeatCounter);
if(!counterField){
return;
}
var _86=parseInt(counterField.value)+1;
var _87="-"+_86.toString();
var _88=wFORMS.behaviors["repeat"].replicateTree(_84,null,_87,_85);
var _89=_84.nextSibling;
while(_89&&(_89.nodeType==3||wFORMS.helpers.hasClass(_89,wFORMS.className_delete))){
_89=_89.nextSibling;
}
_84.parentNode.insertBefore(_88,_89);
_88.className=_84.className.replace(wFORMS.className_repeat,wFORMS.className_delete);
document.getElementById(_84.id+wFORMS.idSuffix_repeatCounter).value=_86;
wFORMS.addBehaviors(_88);
}
return wFORMS.helpers.preventEvent(e);
},removeFieldGroup:function(e){
var _8b=wFORMS.helpers.getSourceElement(e);
if(!_8b){
_8b=e;
}
var _8b=_8b.parentNode;
while(_8b&&!wFORMS.helpers.hasClass(_8b,wFORMS.className_delete)){
_8b=_8b.parentNode;
}
_8b.parentNode.removeChild(_8b);
return wFORMS.helpers.preventEvent(e);
},removeRepeatCountSuffix:function(str){
return str.replace(/-\d$/,"");
},replicateTree:function(_8d,_8e,_8f,_90){
if(_8d.nodeType==3){
if(_8d.parentNode.tagName.toUpperCase()!="TEXTAREA"){
var _91=document.createTextNode(_8d.data);
}
}else{
if(_8d.nodeType==1){
if(wFORMS.helpers.hasClass(_8d,wFORMS.className_duplicateLink)||wFORMS.helpers.hasClass(_8d,wFORMS.className_removeLink)){
return null;
}
if(wFORMS.helpers.hasClass(_8d,wFORMS.className_delete)){
return null;
}
if(wFORMS.helpers.hasClass(_8d,wFORMS.className_repeat)&&_8e!=null){
_8f=_8f.replace("-","__");
}
if(!document.all||window.opera){
var _91=document.createElement(_8d.tagName);
}else{
var _92=_8d.tagName;
if(_8d.name){
if(_8d.tagName.toUpperCase()=="INPUT"&&_8d.type.toLowerCase()=="radio"&&_90){
_92+=" NAME='"+_8d.name+"' ";
}else{
_92+=" NAME='"+wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_8d.name)+_8f+"' ";
}
}
if(_8d.type){
_92+=" TYPE='"+_8d.type+"' ";
}
if(_8d.selected){
_92+=" SELECTED='SELECTED' ";
}
if(_8d.checked){
_92+=" CHECKED='CHECKED' ";
}
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
var _91=document.createElement(_92);
}else{
var _91=document.createElement("<"+_92+"></"+_8d.tagName+">");
}
try{
_91.type=_8d.type;
}
catch(e){
}
}
for(var i=0;i<_8d.attributes.length;i++){
var _94=_8d.attributes[i];
if(_94.specified||_94.nodeName.toLowerCase()=="value"){
if(_94.nodeName.toLowerCase()=="id"||_94.nodeName.toLowerCase()=="name"||_94.nodeName.toLowerCase()=="for"){
if(wFORMS.hasBehavior("hint")&&_94.nodeValue.indexOf(wFORMS.idSuffix_fieldHint)!=-1){
var _95=_94.nodeValue;
_95=wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_95.substr(0,_95.indexOf(wFORMS.idSuffix_fieldHint)))+_8f+wFORMS.idSuffix_fieldHint;
}else{
if(_8d.tagName.toUpperCase()=="INPUT"&&_8d.getAttribute("type",false).toLowerCase()=="radio"&&_94.nodeName.toLowerCase()=="name"&&_90){
var _95=_94.nodeValue;
}else{
var _95=_94.nodeValue+_8f;
}
}
}else{
if(_94.nodeName.toLowerCase()=="value"&&_8d.tagName.toUpperCase()=="INPUT"&&(_8d.type.toLowerCase()=="text"||_8d.type.toLowerCase()=="password"||_8d.type.toLowerCase()=="file")){
var _95="";
}else{
if(_94.nodeName.toLowerCase()=="rel"&&_94.nodeValue.indexOf("wfHandled")!=-1){
var _95=_94.nodeValue.replace("wfHandled","");
}else{
var _95=_94.nodeValue;
}
}
}
switch(_94.nodeName.toLowerCase()){
case "class":
_91.className=_95;
break;
case "style":
if(_8d.style&&_8d.style.cssText){
_91.style.cssText=_8d.style.cssText;
}
break;
case "onclick":
_91.onclick=_8d.onclick;
break;
case "onchange":
_91.onchange=_8d.onchange;
break;
case "onsubmit":
_91.onsubmit=_8d.onsubmit;
break;
case "onmouseover":
_91.onmouseover=_8d.onmouseover;
break;
case "onmouseout":
_91.onmouseout=_8d.onmouseout;
break;
case "onmousedown":
_91.onmousedown=_8d.onmousedown;
break;
case "onmouseup":
_91.onmouseup=_8d.onmouseup;
break;
case "ondblclick":
_91.ondblclick=_8d.ondblclick;
break;
case "onkeydown":
_91.onkeydown=_8d.onkeydown;
break;
case "onkeyup":
_91.onkeyup=_8d.onkeyup;
break;
case "onblur":
_91.onblur=_8d.onblur;
break;
case "onfocus":
_91.onfocus=_8d.onfocus;
break;
default:
_91.setAttribute(_94.name,_95,0);
}
}
}
}
}
if(_8e&&_91){
_8e.appendChild(_91);
}
for(var i=0;i<_8d.childNodes.length;i++){
wFORMS.behaviors["repeat"].replicateTree(_8d.childNodes[i],_91,_8f,_90);
}
return _91;
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
wFORMS.behaviors["switch"]={evaluate:function(_96){
if(wFORMS.helpers.hasClassPrefix(_96,wFORMS.classNamePrefix_switch)){
if(!_96.id){
_96.id=wFORMS.helpers.randomId();
}
var _97=wFORMS.behaviors["switch"].getSwitchNames(_96);
for(var i=0;i<_97.length;i++){
if(!wFORMS.switchTriggers[_97[i]]){
wFORMS.switchTriggers[_97[i]]=new Array();
}
if(!wFORMS.switchTriggers[_97[i]][_96.id]){
wFORMS.switchTriggers[_97[i]].push(_96.id);
}
}
switch(_96.tagName.toUpperCase()){
case "OPTION":
var _99=_96.parentNode;
while(_99&&_99.tagName.toUpperCase()!="SELECT"){
var _99=_99.parentNode;
}
if(!_99){
alert("Error: invalid markup in SELECT field ?");
return false;
}
if(!_99.id){
_99.id=wFORMS.helpers.randomId();
}
if(!_99.getAttribute("rel")||_99.getAttribute("rel").indexOf("wfHandled")==-1){
_99.setAttribute("rel",(_99.getAttribute("rel")||"")+" wfHandled");
wFORMS.helpers.addEvent(_99,"change",wFORMS.behaviors["switch"].run);
}
break;
case "INPUT":
if(_96.type&&_96.type.toLowerCase()=="radio"){
var _9a=_96.form;
for(var j=0;j<_9a[_96.name].length;j++){
var _9c=_9a[_96.name][j];
if(_9c.type.toLowerCase()=="radio"){
if(!_9c.getAttribute("rel")||_9c.getAttribute("rel").indexOf("wfHandled")==-1){
wFORMS.helpers.addEvent(_9c,"click",wFORMS.behaviors["switch"].run);
_9c.setAttribute("rel",(_9c.getAttribute("rel")||"")+" wfHandled");
}
}
}
}else{
wFORMS.helpers.addEvent(_96,"click",wFORMS.behaviors["switch"].run);
}
break;
default:
wFORMS.helpers.addEvent(_96,"click",wFORMS.behaviors["switch"].run);
break;
}
}
if(wFORMS.helpers.hasClassPrefix(_96,wFORMS.classNamePrefix_offState)||wFORMS.helpers.hasClassPrefix(_96,wFORMS.classNamePrefix_onState)){
if(!_96.id){
_96.id=wFORMS.helpers.randomId();
}
var _97=wFORMS.behaviors["switch"].getSwitchNames(_96);
for(var i=0;i<_97.length;i++){
if(!wFORMS.switchTargets[_97[i]]){
wFORMS.switchTargets[_97[i]]=new Array();
}
if(!wFORMS.switchTargets[_97[i]][_96.id]){
wFORMS.switchTargets[_97[i]].push(_96.id);
}
}
}
if(_96.tagName&&_96.tagName.toUpperCase()=="FORM"){
wFORMS.onLoadComplete.push(wFORMS.behaviors["switch"].init);
}
},init:function(){
for(var _9d in wFORMS.switchTriggers){
for(var i=0;i<wFORMS.switchTriggers[_9d].length;i++){
var _9f=document.getElementById(wFORMS.switchTriggers[_9d][i]);
if(wFORMS.behaviors["switch"].isTriggerOn(_9f,_9d)){
if(_9f.tagName.toUpperCase()=="OPTION"){
var _9f=_9f.parentNode;
while(_9f&&_9f.tagName.toUpperCase()!="SELECT"){
var _9f=_9f.parentNode;
}
}
wFORMS.behaviors["switch"].run(_9f);
}
}
}
},run:function(e){
var _a1=wFORMS.helpers.getSourceElement(e);
if(!_a1){
_a1=e;
}
var _a2=new Array();
var _a3=new Array();
switch(_a1.tagName.toUpperCase()){
case "SELECT":
for(var i=0;i<_a1.options.length;i++){
if(i==_a1.selectedIndex){
_a2=_a2.concat(wFORMS.behaviors["switch"].getSwitchNames(_a1.options[i]));
}else{
_a3=_a3.concat(wFORMS.behaviors["switch"].getSwitchNames(_a1.options[i]));
}
}
break;
case "INPUT":
if(_a1.type.toLowerCase()=="radio"){
for(var i=0;i<_a1.form[_a1.name].length;i++){
var _a5=_a1.form[_a1.name][i];
if(_a5.checked){
_a2=_a2.concat(wFORMS.behaviors["switch"].getSwitchNames(_a5));
}else{
_a3=_a3.concat(wFORMS.behaviors["switch"].getSwitchNames(_a5));
}
}
}else{
if(_a1.checked||wFORMS.helpers.hasClass(_a1,wFORMS.className_switchIsOn)){
_a2=_a2.concat(wFORMS.behaviors["switch"].getSwitchNames(_a1));
}else{
_a3=_a3.concat(wFORMS.behaviors["switch"].getSwitchNames(_a1));
}
}
break;
default:
break;
}
for(var i=0;i<_a3.length;i++){
var _a6=wFORMS.behaviors["switch"].getElementsBySwitchName(_a3[i]);
for(var j=0;j<_a6.length;j++){
var _a8=wFORMS.switchTriggers[_a3[i]];
var _a9=true;
for(var k=0;k<_a8.length;k++){
var _ab=document.getElementById(_a8[k]);
if(wFORMS.behaviors["switch"].isTriggerOn(_ab,_a3[i])){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_ab,_a6[j])){
_a9=false;
}
}
}
if(_a9){
wFORMS.behaviors["switch"].switchState(_a6[j],wFORMS.classNamePrefix_onState,wFORMS.classNamePrefix_offState);
}
}
}
for(var i=0;i<_a2.length;i++){
var _a6=wFORMS.behaviors["switch"].getElementsBySwitchName(_a2[i]);
for(var j=0;j<_a6.length;j++){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_a1,_a6[j])){
wFORMS.behaviors["switch"].switchState(_a6[j],wFORMS.classNamePrefix_offState,wFORMS.classNamePrefix_onState);
}
}
}
},clear:function(e){
wFORMS.switchTriggers={};
wFORMS.switchTargets={};
},getSwitchNames:function(_ad){
var _ae=new Array();
var _af=_ad.className.split(" ");
for(var i=0;i<_af.length;i++){
if(_af[i].indexOf(wFORMS.classNamePrefix_switch)==0){
_ae.push(_af[i].substr(wFORMS.classNamePrefix_switch.length+1));
}
if(_af[i].indexOf(wFORMS.classNamePrefix_onState)==0){
_ae.push(_af[i].substr(wFORMS.classNamePrefix_onState.length+1));
}else{
if(_af[i].indexOf(wFORMS.classNamePrefix_offState)==0){
_ae.push(_af[i].substr(wFORMS.classNamePrefix_offState.length+1));
}
}
}
return _ae;
},switchState:function(_b1,_b2,_b3){
if(!_b1||_b1.nodeType!=1){
return;
}
if(_b1.className){
_b1.className=_b1.className.replace(_b2,_b3);
}
if(wFORMS.helpers.hasClass(_b1,wFORMS.className_switchIsOff)){
_b1.className=_b1.className.replace(wFORMS.className_switchIsOff,wFORMS.className_switchIsOn);
}else{
if(wFORMS.helpers.hasClass(_b1,wFORMS.className_switchIsOn)){
_b1.className=_b1.className.replace(wFORMS.className_switchIsOn,wFORMS.className_switchIsOff);
}
}
},getElementsBySwitchName:function(_b4){
var _b5=new Array();
if(wFORMS.switchTargets[_b4]){
for(var i=0;i<wFORMS.switchTargets[_b4].length;i++){
var _b7=document.getElementById(wFORMS.switchTargets[_b4][i]);
if(_b7){
_b5.push(_b7);
}
}
}
return _b5;
},isTriggerOn:function(_b8,_b9){
if(!_b8){
return false;
}
if(_b8.tagName.toUpperCase()=="OPTION"){
var _ba=_b8.parentNode;
while(_ba&&_ba.tagName.toUpperCase()!="SELECT"){
var _ba=_ba.parentNode;
}
if(!_ba){
return false;
}
if(_ba.selectedIndex==-1){
return false;
}
if(wFORMS.helpers.hasClass(_ba.options[_ba.selectedIndex],wFORMS.classNamePrefix_switch+"-"+_b9)){
return true;
}
}else{
if(_b8.checked||wFORMS.helpers.hasClass(_b8,wFORMS.className_switchIsOn)){
return true;
}
}
return false;
},isWithinSwitchScope:function(_bb,_bc){
if(wFORMS.hasBehavior("repeat")&&wFORMS.limitSwitchScope==true){
var _bd=_bb;
while(_bd&&_bd.tagName&&_bd.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_bd,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_bd,wFORMS.className_delete)){
_bd=_bd.parentNode;
}
if(wFORMS.helpers.hasClass(_bd,wFORMS.className_repeat)||wFORMS.helpers.hasClass(_bd,wFORMS.className_delete)){
var _be=_bc;
while(_be&&_be.tagName&&_be.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_be,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_be,wFORMS.className_delete)){
_be=_be.parentNode;
}
if(_bd==_be){
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
wFORMS.behaviors["validation"]={errMsg_required:"This field is required. ",errMsg_alpha:"The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed.",errMsg_email:"This does not appear to be a valid email address.",errMsg_integer:"Please enter an integer.",errMsg_float:"Please enter a number (ex. 1.9).",errMsg_password:"Unsafe password. Your password should be between 4 and 12 characters long and use a combinaison of upper-case and lower-case letters.",errMsg_alphanum:"Please use alpha-numeric characters only [a-z 0-9].",errMsg_date:"This does not appear to be a valid date.",errMsg_notification:"%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided.",errMsg_custom:"Please enter a valid value.",jumpToErrorOnPage:null,currentPageIndex:-1,evaluate:function(_bf){
if(_bf.tagName.toUpperCase()=="FORM"){
if(wFORMS.functionName_formValidation.toString()==wFORMS.functionName_formValidation){
wFORMS.functionName_formValidation=eval(wFORMS.functionName_formValidation);
}
wFORMS.helpers.addEvent(_bf,"submit",wFORMS.functionName_formValidation);
}
},init:function(){
},run:function(e){
var _c1=wFORMS.helpers.getSourceElement(e);
if(!_c1){
_c1=e;
}
var _c2=arguments[1]?arguments[1]:(wFORMS.hasBehavior("paging")&&wFORMS.behaviors["paging"].behaviorInUse);
wFORMS.behaviors["validation"].jumpToErrorOnPage=null;
if(wFORMS.preventSubmissionOnEnter){
if(_c1.type&&_c1.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
}
while(_c1&&_c1.tagName.toUpperCase()!="FORM"){
_c1=_c1.parentNode;
}
var _c3=wFORMS.behaviors["validation"].validateElement(_c1,_c2,true);
wFORMS.behaviors["validation"].errorCount=_c3;
if(_c3>0){
if(wFORMS.behaviors["validation"].jumpToErrorOnPage){
wFORMS.behaviors["paging"].gotoPage(wFORMS.behaviors["validation"].jumpToErrorOnPage);
}
if(wFORMS.showAlertOnError){
wFORMS.behaviors["validation"].showAlert(_c3);
}
return wFORMS.helpers.preventEvent(e);
}
return true;
},remove:function(){
},validateElement:function(_c4){
var _c5=arguments[2]?arguments[2]:true;
var _c6=arguments[1]?arguments[1]:false;
var _c7=wFORMS.behaviors["validation"];
if(wFORMS.hasBehavior("switch")&&wFORMS.helpers.hasClassPrefix(_c4,wFORMS.classNamePrefix_offState)){
return 0;
}
if(wFORMS.hasBehavior("paging")&&wFORMS.helpers.hasClass(_c4,wFORMS.className_paging)){
if(!wFORMS.helpers.hasClass(_c4,wFORMS.className_pagingCurrent)&&_c6){
return 0;
}
_c7.currentPageIndex=wFORMS.behaviors["paging"].getPageIndex(_c4);
}
var _c8=0;
if(!_c7.checkRequired(_c4)){
_c7.showError(_c4,_c7.errMsg_required);
_c8++;
}else{
if(wFORMS.helpers.hasClassPrefix(_c4,wFORMS.classNamePrefix_validation)){
var _c9=_c4.className.split(" ");
for(j=0;j<_c9.length;j++){
switch(_c9[j]){
case "validate-alpha":
if(!_c7.isAlpha(_c4.value)){
_c7.showError(_c4,_c7.errMsg_alpha);
_c8++;
}
break;
case "validate-alphanum":
if(!_c7.isAlphaNum(_c4.value)){
_c7.showError(_c4,_c7.errMsg_alphanum);
_c8++;
}
break;
case "validate-date":
if(!_c7.isDate(_c4.value)){
_c7.showError(_c4,_c7.errMsg_date);
_c8++;
}
break;
case "validate-time":
break;
case "validate-email":
if(!_c7.isEmail(_c4.value)){
_c7.showError(_c4,_c7.errMsg_email);
_c8++;
}
break;
case "validate-integer":
if(!_c7.isInteger(_c4.value)){
_c7.showError(_c4,_c7.errMsg_integer);
_c8++;
}
break;
case "validate-float":
if(!_c7.isFloat(_c4.value)){
_c7.showError(_c4,_c7.errMsg_float);
_c8++;
}
break;
case "validate-strongpassword":
if(!_c7.isPassword(_c4.value)){
_c7.showError(_c4,_c7.errMsg_password);
_c8++;
}
break;
case "validate-custom":
var _ca=new RegExp("/([^/]*)/([gi]*)");
var _cb=_c4.className.match(_ca);
if(_cb[0]){
var _cc=new RegExp(_cb[1],_cb[2]);
if(!_c4.value.match(_cc)){
_c7.showError(_c4,_c7.errMsg_custom);
_c8++;
}
}
break;
}
}
}
}
if(_c8==0){
_c7.removeErrorMessage(_c4);
}else{
if(_c7.currentPageIndex>0&&!_c7.jumpToErrorOnPage){
_c7.jumpToErrorOnPage=_c7.currentPageIndex;
}
}
if(_c5){
for(var i=0;i<_c4.childNodes.length;i++){
if(_c4.childNodes[i].nodeType==1){
_c8+=_c7.validateElement(_c4.childNodes[i],_c6,_c5);
}
}
}
return _c8;
},checkRequired:function(_ce){
if(wFORMS.helpers.hasClass(_ce,wFORMS.className_required)){
var _cf=wFORMS.behaviors["validation"];
switch(_ce.tagName.toUpperCase()){
case "INPUT":
var _d0=_ce.getAttribute("type");
if(!_d0){
_d0="text";
}
switch(_d0.toLowerCase()){
case "checkbox":
return _ce.checked;
break;
case "radio":
return _ce.checked;
break;
default:
return !_cf.isEmpty(_ce.value);
}
break;
case "SELECT":
return !_cf.isEmpty(_ce.options[_ce.selectedIndex].value);
break;
case "TEXTAREA":
return !_cf.isEmpty(_ce.value);
break;
default:
return _cf.checkOneRequired(_ce);
break;
}
}
return true;
},checkOneRequired:function(_d1){
var _d2=false;
if(_d1.nodeType!=1){
return false;
}
if(_d1.tagName.toUpperCase()=="INPUT"){
var _d3=_d1.getAttribute("type");
if(!_d3){
_d3="text";
}
switch(_d3.toLowerCase()){
case "checkbox":
_d2=_d1.checked;
break;
case "radio":
_d2=_d1.checked;
break;
default:
_d2=_d1.value;
}
}else{
if(_d1.tagName.toUpperCase()=="SELECT"){
_d2=_d1.options[_d1.selectedIndex].value;
}else{
if(_d1.tagName.toUpperCase()=="TEXTAREA"){
_d2=_d1.value;
}
}
}
if(_d2&&!wFORMS.behaviors["validation"].isEmpty(_d2)){
return true;
}
for(var i=0;i<_d1.childNodes.length;i++){
if(wFORMS.behaviors["validation"].checkOneRequired(_d1.childNodes[i])){
return true;
}
}
return false;
},isEmpty:function(s){
var _d6=/^\s+$/;
return ((s==null)||(s.length==0)||_d6.test(s));
},isAlpha:function(s){
var _d8=/^[a-zA-Z\s]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_d8.test(s);
},isAlphaNum:function(s){
var _da=/^[\w\s]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_da.test(s);
},isDate:function(s){
var _dc=new Date(s);
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(_dc);
},isEmail:function(s){
var _de=/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_de.test(s);
},isInteger:function(s){
var _e0=/^[+]?\d+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_e0.test(s);
},isFloat:function(s){
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(parseFloat(s));
},isPassword:function(s){
return wFORMS.behaviors["validation"].isEmpty(s);
},showError:function(_e3,_e4){
if(wFORMS.helpers.hasClass(_e3,wFORMS.className_validationError_fld)){
wFORMS.behaviors["validation"].removeErrorMessage(_e3);
}
if(!_e3.id){
_e3.id=wFORMS.helpers.randomId();
}
_e3.className+=" "+wFORMS.className_validationError_fld;
var _e5=document.createTextNode(" "+_e4);
var fe=document.getElementById(_e3.id+wFORMS.idSuffix_fieldError);
if(!fe){
fe=document.createElement("div");
fe.setAttribute("id",_e3.id+wFORMS.idSuffix_fieldError);
var fl=document.getElementById(_e3.id+wFORMS.idSuffix_fieldLabel);
if(fl){
fl.parentNode.insertBefore(fe,fl.nextSibling);
}else{
_e3.parentNode.insertBefore(fe,_e3.nextSibling);
}
}
fe.appendChild(_e5);
fe.className+=" "+wFORMS.className_validationError_msg;
},showAlert:function(_e8){
alert(wFORMS.behaviors["validation"].errMsg_notification.replace("%%",_e8));
},removeErrorMessage:function(_e9){
var _ea=new RegExp(wFORMS.className_validationError_fld,"gi");
_e9.className=_e9.className.replace(_ea,"");
var _eb=document.getElementById(_e9.id+wFORMS.idSuffix_fieldError);
if(_eb){
_eb.parentNode.removeChild(_eb);
}
}};
wFORMS.functionName_formValidation=wFORMS.behaviors["validation"].run;
wFORMS.formValidation=wFORMS.behaviors["validation"].run;
wFORMS.arrErrorMsg=new Array();
wFORMS.arrErrorMsg[0]=wFORMS.behaviors["validation"].errMsg_required;
wFORMS.arrErrorMsg[1]=wFORMS.behaviors["validation"].errMsg_alpha;
wFORMS.arrErrorMsg[2]=wFORMS.behaviors["validation"].errMsg_email;
wFORMS.arrErrorMsg[3]=wFORMS.behaviors["validation"].errMsg_integer;
wFORMS.arrErrorMsg[4]=wFORMS.behaviors["validation"].errMsg_float;
wFORMS.arrErrorMsg[5]=wFORMS.behaviors["validation"].errMsg_password;
wFORMS.arrErrorMsg[6]=wFORMS.behaviors["validation"].errMsg_alphanum;
wFORMS.arrErrorMsg[7]=wFORMS.behaviors["validation"].errMsg_date;
wFORMS.arrErrorMsg[8]=wFORMS.behaviors["validation"].errMsg_notification;
}
if(wFORMS){
wFORMS.classNamePrefix_sync="sync";
wFORMS.classNamePrefix_target="target";
wFORMS.className_syncIsOn="sncIsOn";
wFORMS.className_syncIsOff="sncIsOff";
wFORMS.syncScopeRootTag="";
wFORMS.syncTriggers={};
wFORMS.syncTargets={};
wFORMS.behaviors["sync"]={evaluate:function(_ec){
if(wFORMS.helpers.hasClassPrefix(_ec,wFORMS.classNamePrefix_sync)){
if(!_ec.id){
_ec.id=wFORMS.helpers.randomId();
}
var _ed=wFORMS.behaviors["sync"].getSyncNames(_ec);
for(var i=0;i<_ed.length;i++){
if(!wFORMS.syncTriggers[_ed[i]]){
wFORMS.syncTriggers[_ed[i]]=new Array();
}
if(!wFORMS.syncTriggers[_ed[i]][_ec.id]){
wFORMS.syncTriggers[_ed[i]].push(_ec.id);
}
}
switch(_ec.tagName.toUpperCase()){
case "OPTION":
var _ef=_ec.parentNode;
while(_ef&&_ef.tagName.toUpperCase()!="SELECT"){
var _ef=_ef.parentNode;
}
if(!_ef){
alert("Error: invalid markup in SELECT field ?");
return false;
}
if(!_ef.id){
_ef.id=wFORMS.helpers.randomId();
}
if(!_ef.getAttribute("rel")||_ef.getAttribute("rel").indexOf("wfHandled")==-1){
_ef.setAttribute("rel",(_ef.getAttribute("rel")||"")+" wfHandled");
wFORMS.helpers.addEvent(_ef,"change",wFORMS.behaviors["sync"].run);
}
break;
case "INPUT":
if(_ec.type&&_ec.type.toLowerCase()=="radio"){
var _f0=_ec.form;
for(var j=0;j<_f0[_ec.name].length;j++){
var _f2=_f0[_ec.name][j];
if(_f2.type.toLowerCase()=="radio"){
if(!_f2.getAttribute("rel")||_f2.getAttribute("rel").indexOf("wfHandled")==-1){
wFORMS.helpers.addEvent(_f2,"click",wFORMS.behaviors["sync"].run);
_f2.setAttribute("rel",(_f2.getAttribute("rel")||"")+" wfHandled");
}
}
}
}else{
if(_ec.type&&_ec.type.toLowerCase()=="text"){
wFORMS.helpers.addEvent(_ec,"keyup",wFORMS.behaviors["sync"].run);
}else{
wFORMS.helpers.addEvent(_ec,"click",wFORMS.behaviors["sync"].run);
}
}
break;
case "TEXTAREA":
wFORMS.helpers.addEvent(_ec,"keyup",wFORMS.behaviors["sync"].run);
break;
default:
wFORMS.helpers.addEvent(_ec,"click",wFORMS.behaviors["sync"].run);
break;
}
}
if(wFORMS.helpers.hasClassPrefix(_ec,wFORMS.classNamePrefix_target)){
if(!_ec.id){
_ec.id=wFORMS.helpers.randomId();
}
var _ed=wFORMS.behaviors["sync"].getSyncNames(_ec);
for(var i=0;i<_ed.length;i++){
if(!wFORMS.syncTargets[_ed[i]]){
wFORMS.syncTargets[_ed[i]]=new Array();
}
wFORMS.syncTargets[_ed[i]].push(_ec.id);
}
}
if(_ec.tagName&&_ec.tagName.toUpperCase()=="FORM"){
wFORMS.onLoadComplete.push(wFORMS.behaviors["sync"].init);
}
},init:function(){
for(var _f3 in wFORMS.syncTriggers){
for(var i=0;i<wFORMS.syncTriggers[_f3].length;i++){
var _f5=document.getElementById(wFORMS.syncTriggers[_f3][i]);
if(wFORMS.behaviors["sync"].isTriggerOn(_f5,_f3)){
if(_f5.tagName.toUpperCase()=="OPTION"){
var _f5=_f5.parentNode;
while(_f5&&_f5.tagName.toUpperCase()!="SELECT"){
var _f5=_f5.parentNode;
}
}
wFORMS.behaviors["sync"].run(_f5);
}
}
}
},run:function(e){
var _f7=wFORMS.helpers.getSourceElement(e);
if(!_f7){
_f7=e;
}
var _f8=new Array();
switch(_f7.tagName.toUpperCase()){
case "SELECT":
for(var i=0;i<_f7.options.length;i++){
_f8=_f8.concat(wFORMS.behaviors["sync"].getSyncNames(_f7.options[i]));
}
break;
case "INPUT":
if(_f7.type.toLowerCase()=="radio"){
for(var i=0;i<_f7.form[_f7.name].length;i++){
var _fa=_f7.form[_f7.name][i];
_f8=_f8.concat(wFORMS.behaviors["sync"].getSyncNames(_fa));
}
}else{
_f8=_f8.concat(wFORMS.behaviors["sync"].getSyncNames(_f7));
}
break;
default:
break;
}
for(var i=0;i<_f8.length;i++){
var _fb=wFORMS.behaviors["sync"].getTargetsBySyncName(_f8[i]);
for(var j=0;j<_fb.length;j++){
if(wFORMS.behaviors["sync"].isWithinSyncScope(_f7,_fb[j])){
wFORMS.behaviors["sync"].sync(_f7,_fb[j],_f8[i]);
}
}
}
},remove:function(e){
var _fe=wFORMS.helpers.getSourceElement(e);
},getSyncNames:function(_ff){
var _100=new Array();
var _101=_ff.className.split(" ");
for(var i=0;i<_101.length;i++){
if(_101[i].indexOf(wFORMS.classNamePrefix_sync)==0){
_100.push(_101[i].substr(wFORMS.classNamePrefix_sync.length+1));
}
if(_101[i].indexOf(wFORMS.classNamePrefix_target)==0){
_100.push(_101[i].substr(wFORMS.classNamePrefix_target.length+1));
}
}
return _100;
},sync:function(_103,_104,_105){
if(!_103||_103.nodeType!=1){
return;
}
if(!_104||_104.nodeType!=1){
return;
}
var _106,state;
switch(_103.tagName.toUpperCase()){
case "SELECT":
_106=_103.options[_103.selectedIndex].value;
state=wFORMS.helpers.hasClass(_103.options[_103.selectedIndex],wFORMS.classNamePrefix_sync+"-"+_105);
break;
case "INPUT":
_106=_103.value;
if(_103.type.toLowerCase()=="radio"||_103.type.toLowerCase()=="checkbox"){
state=_103.checked;
}else{
state=(_106.lenght>0);
}
break;
default:
_106=_103.innerHTML;
state=(_106.lenght>0);
break;
}
switch(_104.tagName.toUpperCase()){
case "OPTION":
wFORMS.behaviors["sync"].syncState(_104,state);
break;
case "INPUT":
if(_104.type.toLowerCase()=="radio"||_104.type.toLowerCase()=="checkbox"){
wFORMS.behaviors["sync"].syncState(_104,state);
}else{
wFORMS.behaviors["sync"].syncValue(_104,_106);
}
break;
default:
wFORMS.behaviors["sync"].syncValue(_104,_106);
break;
}
if(wFORMS.helpers.hasClass(_104,wFORMS.className_syncIsOff)){
element.className=_104.className.replace(wFORMS.className_syncIsOff,wFORMS.className_syncIsOn);
}else{
if(wFORMS.helpers.hasClass(_104,wFORMS.className_syncIsOn)){
element.className=_104.className.replace(wFORMS.className_syncIsOn,wFORMS.className_syncIsOff);
}
}
},syncState:function(_107,_108){
if(_107.tagName.toUpperCase()=="OPTION"){
_107.selected=_108;
}else{
_107.checked=_108;
}
},syncValue:function(_109,_10a){
if(_109.tagName.toUpperCase()=="INPUT"){
_109.value=_10a;
}else{
_109.innerHTML=_10a;
}
},getTargetsBySyncName:function(_10b){
var _10c=new Array();
if(wFORMS.syncTargets[_10b]){
for(var i=0;i<wFORMS.syncTargets[_10b].length;i++){
var _10e=document.getElementById(wFORMS.syncTargets[_10b][i]);
if(_10e){
_10c.push(_10e);
}
}
}
return _10c;
},isTriggerOn:function(_10f,_110){
if(!_10f){
return false;
}
if(_10f.tagName.toUpperCase()=="OPTION"){
var _111=_10f.parentNode;
while(_111&&_111.tagName.toUpperCase()!="SELECT"){
var _111=_111.parentNode;
}
if(!_111){
return false;
}
if(_111.selectedIndex==-1){
return false;
}
if(wFORMS.helpers.hasClass(_111.options[_111.selectedIndex],wFORMS.classNamePrefix_sync+"-"+_110)){
return true;
}
}else{
if(_10f.checked||wFORMS.helpers.hasClass(_10f,wFORMS.className_syncIsOn)){
return true;
}
}
return false;
},isWithinSyncScope:function(_112,_113){
if(wFORMS.hasBehavior("repeat")&&wFORMS.limitSyncScope==true){
var _114=_112;
while(_114&&_114.tagName&&_114.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_114,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_114,wFORMS.className_delete)){
_114=_114.parentNode;
}
if(wFORMS.helpers.hasClass(_114,wFORMS.className_repeat)||wFORMS.helpers.hasClass(_114,wFORMS.className_delete)){
var _115=_113;
while(_115&&_115.tagName&&_115.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_115,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_115,wFORMS.className_delete)){
_115=_115.parentNode;
}
if(_114==_115){
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

