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
},run:function(e){
var _48=wFORMS.helpers.getSourceElement(e);
var _49=document.getElementById(_48.id+wFORMS.idSuffix_fieldHint);
if(!_49){
_49=document.getElementById(_48.name+wFORMS.idSuffix_fieldHint);
}
if(_49){
_49.className=_49.className.replace(wFORMS.className_inactiveFieldHint,wFORMS.className_activeFieldHint);
_49.style.top=(wFORMS.helpers.getTop(_48)+_48.offsetHeight).toString()+"px";
if(_48.tagName.toUpperCase()=="SELECT"){
_49.style.left=(wFORMS.helpers.getLeft(_48)+(_48.offsetWidth-8)).toString()+"px";
}else{
_49.style.left=(wFORMS.helpers.getLeft(_48)).toString()+"px";
}
}
},remove:function(e){
var _4b=wFORMS.helpers.getSourceElement(e);
var _4c=document.getElementById(_4b.id+wFORMS.idSuffix_fieldHint);
if(!_4c){
_4c=document.getElementById(_4b.name+wFORMS.idSuffix_fieldHint);
}
if(_4c){
_4c.className=_4c.className.replace(wFORMS.className_activeFieldHint,wFORMS.className_inactiveFieldHint);
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
wFORMS.behaviors["paging"]={idSuffix_buttonsPlaceholder:"-buttons",className_pageNextButton:wFORMS.className_pagingButtons+" wfPageNextButton",className_pagePreviousButton:wFORMS.className_pagingButtons+" wfPagePreviousButton",onPageChange:null,evaluate:function(_4d){
if(wFORMS.helpers.hasClass(_4d,wFORMS.className_paging)){
var _4e=wFORMS.behaviors["paging"].getPageIndex(_4d);
if(_4e>1){
var _4f=this.getButtonPlaceholder(_4d);
var _50=_4f.insertBefore(this.createPreviousPageButton(),_4f.firstChild);
wFORMS.helpers.addEvent(_50,"click",wFORMS.behaviors["paging"].pagingPrevious);
}else{
_4d.className+=" "+wFORMS.className_pagingCurrent;
var _51=wFORMS.behaviors["paging"].getFormElement(_4d);
wFORMS.behaviors["paging"].hideSubmitButton(_51);
wFORMS.helpers.addEvent(_51,"submit",function(e){
var _53=wFORMS.helpers.getSourceElement(e);
if(_53.type&&_53.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
});
wFORMS.preventSubmissionOnEnter=true;
}
if(document.getElementById(wFORMS.idPrefix_pageIndex+(_4e+1).toString())){
var _4f=this.getButtonPlaceholder(_4d);
var _50=_4f.appendChild(this.createNextPageButton());
wFORMS.helpers.addEvent(_50,"click",wFORMS.behaviors["paging"].pagingNext);
}
}
},getButtonPlaceholder:function(_54){
var p=document.getElementById(_54.id+this.idSuffix_buttonsPlaceholder);
if(!p){
return _54;
}
return p;
},createNextPageButton:function(){
var _56=document.createElement("input");
_56.setAttribute("value",wFORMS.arrMsg[4]);
_56.setAttribute("type","button");
_56.className=this.className_pageNextButton;
return _56;
},createPreviousPageButton:function(){
var _57=document.createElement("input");
_57.setAttribute("value",wFORMS.arrMsg[5]);
_57.setAttribute("type","button");
_57.className=this.className_pagePreviousButton;
return _57;
},pagingNext:function(e){
var _59=wFORMS.helpers.getSourceElement(e);
if(!_59){
_59=e;
}
var _5a=wFORMS.behaviors["paging"].getPageElement(_59);
var _5b=wFORMS.behaviors["paging"].getPageIndex(_5a)+1;
var _5c=document.getElementById(wFORMS.idPrefix_pageIndex+_5b.toString());
if(_5c){
if(!wFORMS.hasBehavior("validation")||(wFORMS.hasBehavior("validation")&&!wFORMS.runValidationOnPageNext)||(wFORMS.hasBehavior("validation")&&wFORMS.runValidationOnPageNext&&wFORMS.functionName_formValidation(e,true))){
_5a.className=_5a.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
_5c.className+=" "+wFORMS.className_pagingCurrent;
if(wFORMS.behaviors["paging"].isLastPage(_5b)){
var _5d=wFORMS.behaviors["paging"].getFormElement(_5c);
wFORMS.behaviors["paging"].showSubmitButton(_5d);
}
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_5c);
}
}
}
},pagingPrevious:function(e){
var _5f=wFORMS.helpers.getSourceElement(e);
if(!_5f){
_5f=e;
}
var _60=wFORMS.behaviors["paging"].getPageElement(_5f);
var _61=wFORMS.behaviors["paging"].getPageIndex(_60)-1;
var _62=document.getElementById(wFORMS.idPrefix_pageIndex+_61.toString());
if(_62){
_60.className=_60.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
_62.className+=" "+wFORMS.className_pagingCurrent;
var _63=wFORMS.behaviors["paging"].getFormElement(_62);
wFORMS.behaviors["paging"].hideSubmitButton(_63);
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_62);
}
}
},showSubmitButton:function(_64){
var _65=_64.getElementsByTagName("input");
for(var i=0;i<_65.length;i++){
if(_65[i].type&&_65[i].type.toLowerCase()=="submit"){
_65[i].className=_65[i].className.replace(wFORMS.className_hideSubmit,"");
}
}
},hideSubmitButton:function(_67){
var _68=_67.getElementsByTagName("input");
for(var i=0;i<_68.length;i++){
if(_68[i].type&&_68[i].type.toLowerCase()=="submit"&&!wFORMS.helpers.hasClass(_68[i],wFORMS.className_hideSubmit)){
_68[i].className+=" "+wFORMS.className_hideSubmit;
}
}
},isLastPage:function(_6a){
if(isNaN(_6a)){
_6a=parseInt(_6a.replace(/[\D]*/,""));
}
_6a++;
var _6b=document.getElementById(wFORMS.idPrefix_pageIndex+_6a.toString());
if(!_6b){
return true;
}
return false;
},gotoPage:function(_6c){
if(isNaN(_6c)){
var _6d=document.getElementById(_6c);
}else{
var _6d=document.getElementById(wFORMS.idPrefix_pageIndex+_6c.toString());
}
if(!_6d){
return false;
}
var _6e=wFORMS.behaviors["paging"].getFormElement(_6d);
var _6f=_6e.getElementsByTagName("*");
for(var i=0;i<_6f.length;i++){
var n=_6f[i];
if(wFORMS.helpers.hasClass(_6f[i],wFORMS.className_pagingCurrent)){
n.className=n.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
break;
}
}
if(wFORMS.behaviors["paging"].isLastPage(_6c)){
wFORMS.behaviors["paging"].showSubmitButton(_6e);
}else{
wFORMS.behaviors["paging"].hideSubmitButton(_6e);
}
_6d.className+=" "+wFORMS.className_pagingCurrent;
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_6d);
}
},getFormElement:function(_72){
var _73=_72.parentNode;
while(_73&&_73.tagName.toUpperCase()!="FORM"){
_73=_73.parentNode;
}
return _73;
},getPageElement:function(_74){
var n=_74.parentNode;
while(n&&(!n.className||!wFORMS.helpers.hasClass(n,wFORMS.className_paging))){
n=n.parentNode;
}
return n;
},getPageIndex:function(_76){
if(_76&&_76.id){
return parseInt(_76.id.replace(/[\D]*/,""));
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
wFORMS.behaviors["repeat"]={evaluate:function(_77){
if(wFORMS.helpers.hasClass(_77,wFORMS.className_repeat)){
var _78;
if(_77.id){
_78=document.getElementById(_77.id+wFORMS.idSuffix_duplicateLink);
}
if(!_78){
_78=document.createElement("a");
var _79=document.createElement("span");
var _7a=document.createTextNode(wFORMS.arrMsg[0]);
_78.setAttribute("href","#");
_78.className=wFORMS.className_duplicateLink;
_78.setAttribute("title",wFORMS.arrMsg[1]);
if(_77.tagName.toUpperCase()=="TR"){
var n=_77.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_78);
}
}else{
_77.appendChild(_78);
}
_79.appendChild(_7a);
_78.appendChild(_79);
}
var _7c=document.getElementById(_77.id+wFORMS.idSuffix_repeatCounter);
if(!_7c){
if(document.all&&!window.opera){
var _7d=_77.id+wFORMS.idSuffix_repeatCounter;
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
_7c=document.createElement("INPUT NAME=\""+_7d+"\"");
}else{
_7c=document.createElement("<INPUT NAME=\""+_7d+"\"></INPUT>");
}
_7c.type="hidden";
_7c.id=_7d;
_7c.value="1";
}else{
_7c=document.createElement("INPUT");
_7c.setAttribute("type","hidden");
_7c.setAttribute("value","1");
_7c.setAttribute("name",_77.id+wFORMS.idSuffix_repeatCounter);
_7c.setAttribute("id",_77.id+wFORMS.idSuffix_repeatCounter);
}
var _7e=_77.parentNode;
while(_7e&&_7e.tagName.toUpperCase()!="FORM"){
_7e=_7e.parentNode;
}
_7e.appendChild(_7c);
}
wFORMS.helpers.addEvent(_78,"click",wFORMS.behaviors["repeat"].duplicateFieldGroup);
}
if(wFORMS.helpers.hasClass(_77,wFORMS.className_delete)){
var _7f=document.createElement("a");
var _79=document.createElement("span");
var _7a=document.createTextNode(wFORMS.arrMsg[2]);
_7f.setAttribute("href","#");
_7f.className=wFORMS.className_removeLink;
_7f.setAttribute("title",wFORMS.arrMsg[3]);
if(_77.tagName.toUpperCase()=="TR"){
var n=_77.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_7f);
}
}else{
_77.appendChild(_7f);
}
_79.appendChild(_7a);
_7f.appendChild(_79);
wFORMS.helpers.addEvent(_7f,"click",wFORMS.behaviors["repeat"].removeFieldGroup);
}
},duplicateFieldGroup:function(e){
var _81=wFORMS.helpers.getSourceElement(e);
if(!_81){
_81=e;
}
var _82=wFORMS.helpers.hasClass(_81,wFORMS.className_preserveRadioName)?true:wFORMS.preserveRadioName;
var _81=_81.parentNode;
while(_81&&!wFORMS.helpers.hasClass(_81,wFORMS.className_repeat)){
_81=_81.parentNode;
}
if(_81){
counterField=document.getElementById(_81.id+wFORMS.idSuffix_repeatCounter);
if(!counterField){
return;
}
var _83=parseInt(counterField.value)+1;
var _84="-"+_83.toString();
var _85=wFORMS.behaviors["repeat"].replicateTree(_81,null,_84,_82);
var _86=_81.nextSibling;
while(_86&&(_86.nodeType==3||wFORMS.helpers.hasClass(_86,wFORMS.className_delete))){
_86=_86.nextSibling;
}
_81.parentNode.insertBefore(_85,_86);
_85.className=_81.className.replace(wFORMS.className_repeat,wFORMS.className_delete);
document.getElementById(_81.id+wFORMS.idSuffix_repeatCounter).value=_83;
wFORMS.addBehaviors(_85);
}
return wFORMS.helpers.preventEvent(e);
},removeFieldGroup:function(e){
var _88=wFORMS.helpers.getSourceElement(e);
if(!_88){
_88=e;
}
var _88=_88.parentNode;
while(_88&&!wFORMS.helpers.hasClass(_88,wFORMS.className_delete)){
_88=_88.parentNode;
}
_88.parentNode.removeChild(_88);
return wFORMS.helpers.preventEvent(e);
},removeRepeatCountSuffix:function(str){
return str.replace(/-\d$/,"");
},replicateTree:function(_8a,_8b,_8c,_8d){
if(_8a.nodeType==3){
if(_8a.parentNode.tagName.toUpperCase()!="TEXTAREA"){
var _8e=document.createTextNode(_8a.data);
}
}else{
if(_8a.nodeType==1){
if(wFORMS.helpers.hasClass(_8a,wFORMS.className_duplicateLink)||wFORMS.helpers.hasClass(_8a,wFORMS.className_removeLink)){
return null;
}
if(wFORMS.helpers.hasClass(_8a,wFORMS.className_delete)){
return null;
}
if(wFORMS.helpers.hasClass(_8a,wFORMS.className_repeat)&&_8b!=null){
_8c=_8c.replace("-","__");
}
if(!document.all||window.opera){
var _8e=document.createElement(_8a.tagName);
}else{
var _8f=_8a.tagName;
if(_8a.name){
if(_8a.tagName.toUpperCase()=="INPUT"&&_8a.type.toLowerCase()=="radio"&&_8d){
_8f+=" NAME='"+_8a.name+"' ";
}else{
_8f+=" NAME='"+wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_8a.name)+_8c+"' ";
}
}
if(_8a.type){
_8f+=" TYPE='"+_8a.type+"' ";
}
if(_8a.selected){
_8f+=" SELECTED='SELECTED' ";
}
if(_8a.checked){
_8f+=" CHECKED='CHECKED' ";
}
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
var _8e=document.createElement(_8f);
}else{
var _8e=document.createElement("<"+_8f+"></"+_8a.tagName+">");
}
try{
_8e.type=_8a.type;
}
catch(e){
}
}
for(var i=0;i<_8a.attributes.length;i++){
var _91=_8a.attributes[i];
if(_91.specified||_91.nodeName.toLowerCase()=="value"){
if(_91.nodeName.toLowerCase()=="id"||_91.nodeName.toLowerCase()=="name"||_91.nodeName.toLowerCase()=="for"){
if(wFORMS.hasBehavior("hint")&&_91.nodeValue.indexOf(wFORMS.idSuffix_fieldHint)!=-1){
var _92=_91.nodeValue;
_92=wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_92.substr(0,_92.indexOf(wFORMS.idSuffix_fieldHint)))+_8c+wFORMS.idSuffix_fieldHint;
}else{
if(_8a.tagName.toUpperCase()=="INPUT"&&_8a.getAttribute("type",false).toLowerCase()=="radio"&&_91.nodeName.toLowerCase()=="name"&&_8d){
var _92=_91.nodeValue;
}else{
var _92=_91.nodeValue+_8c;
}
}
}else{
if(_91.nodeName.toLowerCase()=="value"&&_8a.tagName.toUpperCase()=="INPUT"&&(_8a.type.toLowerCase()=="text"||_8a.type.toLowerCase()=="password"||_8a.type.toLowerCase()=="file")){
var _92="";
}else{
if(_91.nodeName.toLowerCase()=="rel"&&_91.nodeValue.indexOf("wfHandled")!=-1){
var _92=_91.nodeValue.replace("wfHandled","");
}else{
var _92=_91.nodeValue;
}
}
}
switch(_91.nodeName.toLowerCase()){
case "class":
_8e.className=_92;
break;
case "style":
if(_8a.style&&_8a.style.cssText){
_8e.style.cssText=_8a.style.cssText;
}
break;
case "onclick":
_8e.onclick=_8a.onclick;
break;
case "onchange":
_8e.onchange=_8a.onchange;
break;
case "onsubmit":
_8e.onsubmit=_8a.onsubmit;
break;
case "onmouseover":
_8e.onmouseover=_8a.onmouseover;
break;
case "onmouseout":
_8e.onmouseout=_8a.onmouseout;
break;
case "onmousedown":
_8e.onmousedown=_8a.onmousedown;
break;
case "onmouseup":
_8e.onmouseup=_8a.onmouseup;
break;
case "ondblclick":
_8e.ondblclick=_8a.ondblclick;
break;
case "onkeydown":
_8e.onkeydown=_8a.onkeydown;
break;
case "onkeyup":
_8e.onkeyup=_8a.onkeyup;
break;
case "onblur":
_8e.onblur=_8a.onblur;
break;
case "onfocus":
_8e.onfocus=_8a.onfocus;
break;
default:
_8e.setAttribute(_91.name,_92,0);
}
}
}
}
}
if(_8b&&_8e){
_8b.appendChild(_8e);
}
for(var i=0;i<_8a.childNodes.length;i++){
wFORMS.behaviors["repeat"].replicateTree(_8a.childNodes[i],_8e,_8c,_8d);
}
return _8e;
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
wFORMS.behaviors["switch"]={evaluate:function(_93){
if(wFORMS.helpers.hasClassPrefix(_93,wFORMS.classNamePrefix_switch)){
if(!_93.id){
_93.id=wFORMS.helpers.randomId();
}
var _94=wFORMS.behaviors["switch"].getSwitchNames(_93);
for(var i=0;i<_94.length;i++){
if(!wFORMS.switchTriggers[_94[i]]){
wFORMS.switchTriggers[_94[i]]=new Array();
}
if(!wFORMS.switchTriggers[_94[i]][_93.id]){
wFORMS.switchTriggers[_94[i]].push(_93.id);
}
}
switch(_93.tagName.toUpperCase()){
case "OPTION":
var _96=_93.parentNode;
while(_96&&_96.tagName.toUpperCase()!="SELECT"){
var _96=_96.parentNode;
}
if(!_96){
alert("Error: invalid markup in SELECT field ?");
return false;
}
if(!_96.id){
_96.id=wFORMS.helpers.randomId();
}
if(!_96.getAttribute("rel")||_96.getAttribute("rel").indexOf("wfHandled")==-1){
_96.setAttribute("rel",(_96.getAttribute("rel")||"")+" wfHandled");
wFORMS.helpers.addEvent(_96,"change",wFORMS.behaviors["switch"].run);
}
break;
case "INPUT":
if(_93.type&&_93.type.toLowerCase()=="radio"){
var _97=_93.form;
for(var j=0;j<_97[_93.name].length;j++){
var _99=_97[_93.name][j];
if(_99.type.toLowerCase()=="radio"){
if(!_99.getAttribute("rel")||_99.getAttribute("rel").indexOf("wfHandled")==-1){
wFORMS.helpers.addEvent(_99,"click",wFORMS.behaviors["switch"].run);
_99.setAttribute("rel",(_99.getAttribute("rel")||"")+" wfHandled");
}
}
}
}else{
wFORMS.helpers.addEvent(_93,"click",wFORMS.behaviors["switch"].run);
}
break;
default:
wFORMS.helpers.addEvent(_93,"click",wFORMS.behaviors["switch"].run);
break;
}
}
if(wFORMS.helpers.hasClassPrefix(_93,wFORMS.classNamePrefix_offState)||wFORMS.helpers.hasClassPrefix(_93,wFORMS.classNamePrefix_onState)){
if(!_93.id){
_93.id=wFORMS.helpers.randomId();
}
var _94=wFORMS.behaviors["switch"].getSwitchNames(_93);
for(var i=0;i<_94.length;i++){
if(!wFORMS.switchTargets[_94[i]]){
wFORMS.switchTargets[_94[i]]=new Array();
}
if(!wFORMS.switchTargets[_94[i]][_93.id]){
wFORMS.switchTargets[_94[i]].push(_93.id);
}
}
}
if(_93.tagName&&_93.tagName.toUpperCase()=="FORM"){
wFORMS.onLoadComplete.push(wFORMS.behaviors["switch"].init);
}
},init:function(){
for(var _9a in wFORMS.switchTriggers){
for(var i=0;i<wFORMS.switchTriggers[_9a].length;i++){
var _9c=document.getElementById(wFORMS.switchTriggers[_9a][i]);
if(wFORMS.behaviors["switch"].isTriggerOn(_9c,_9a)){
if(_9c.tagName.toUpperCase()=="OPTION"){
var _9c=_9c.parentNode;
while(_9c&&_9c.tagName.toUpperCase()!="SELECT"){
var _9c=_9c.parentNode;
}
}
wFORMS.behaviors["switch"].run(_9c);
}
}
}
},run:function(e){
var _9e=wFORMS.helpers.getSourceElement(e);
if(!_9e){
_9e=e;
}
var _9f=new Array();
var _a0=new Array();
switch(_9e.tagName.toUpperCase()){
case "SELECT":
for(var i=0;i<_9e.options.length;i++){
if(i==_9e.selectedIndex){
_9f=_9f.concat(wFORMS.behaviors["switch"].getSwitchNames(_9e.options[i]));
}else{
_a0=_a0.concat(wFORMS.behaviors["switch"].getSwitchNames(_9e.options[i]));
}
}
break;
case "INPUT":
if(_9e.type.toLowerCase()=="radio"){
for(var i=0;i<_9e.form[_9e.name].length;i++){
var _a2=_9e.form[_9e.name][i];
if(_a2.checked){
_9f=_9f.concat(wFORMS.behaviors["switch"].getSwitchNames(_a2));
}else{
_a0=_a0.concat(wFORMS.behaviors["switch"].getSwitchNames(_a2));
}
}
}else{
if(_9e.checked||wFORMS.helpers.hasClass(_9e,wFORMS.className_switchIsOn)){
_9f=_9f.concat(wFORMS.behaviors["switch"].getSwitchNames(_9e));
}else{
_a0=_a0.concat(wFORMS.behaviors["switch"].getSwitchNames(_9e));
}
}
break;
default:
break;
}
for(var i=0;i<_a0.length;i++){
var _a3=wFORMS.behaviors["switch"].getElementsBySwitchName(_a0[i]);
for(var j=0;j<_a3.length;j++){
var _a5=wFORMS.switchTriggers[_a0[i]];
var _a6=true;
for(var k=0;k<_a5.length;k++){
var _a8=document.getElementById(_a5[k]);
if(wFORMS.behaviors["switch"].isTriggerOn(_a8,_a0[i])){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_a8,_a3[j])){
_a6=false;
}
}
}
if(_a6){
wFORMS.behaviors["switch"].switchState(_a3[j],wFORMS.classNamePrefix_onState,wFORMS.classNamePrefix_offState);
}
}
}
for(var i=0;i<_9f.length;i++){
var _a3=wFORMS.behaviors["switch"].getElementsBySwitchName(_9f[i]);
for(var j=0;j<_a3.length;j++){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_9e,_a3[j])){
wFORMS.behaviors["switch"].switchState(_a3[j],wFORMS.classNamePrefix_offState,wFORMS.classNamePrefix_onState);
}
}
}
},clear:function(e){
wFORMS.switchTriggers={};
wFORMS.switchTargets={};
},getSwitchNames:function(_aa){
var _ab=new Array();
var _ac=_aa.className.split(" ");
for(var i=0;i<_ac.length;i++){
if(_ac[i].indexOf(wFORMS.classNamePrefix_switch)==0){
_ab.push(_ac[i].substr(wFORMS.classNamePrefix_switch.length+1));
}
if(_ac[i].indexOf(wFORMS.classNamePrefix_onState)==0){
_ab.push(_ac[i].substr(wFORMS.classNamePrefix_onState.length+1));
}else{
if(_ac[i].indexOf(wFORMS.classNamePrefix_offState)==0){
_ab.push(_ac[i].substr(wFORMS.classNamePrefix_offState.length+1));
}
}
}
return _ab;
},switchState:function(_ae,_af,_b0){
if(!_ae||_ae.nodeType!=1){
return;
}
if(_ae.className){
_ae.className=_ae.className.replace(_af,_b0);
}
if(wFORMS.helpers.hasClass(_ae,wFORMS.className_switchIsOff)){
_ae.className=_ae.className.replace(wFORMS.className_switchIsOff,wFORMS.className_switchIsOn);
}else{
if(wFORMS.helpers.hasClass(_ae,wFORMS.className_switchIsOn)){
_ae.className=_ae.className.replace(wFORMS.className_switchIsOn,wFORMS.className_switchIsOff);
}
}
},getElementsBySwitchName:function(_b1){
var _b2=new Array();
if(wFORMS.switchTargets[_b1]){
for(var i=0;i<wFORMS.switchTargets[_b1].length;i++){
var _b4=document.getElementById(wFORMS.switchTargets[_b1][i]);
if(_b4){
_b2.push(_b4);
}
}
}
return _b2;
},isTriggerOn:function(_b5,_b6){
if(!_b5){
return false;
}
if(_b5.tagName.toUpperCase()=="OPTION"){
var _b7=_b5.parentNode;
while(_b7&&_b7.tagName.toUpperCase()!="SELECT"){
var _b7=_b7.parentNode;
}
if(!_b7){
return false;
}
if(_b7.selectedIndex==-1){
return false;
}
if(wFORMS.helpers.hasClass(_b7.options[_b7.selectedIndex],wFORMS.classNamePrefix_switch+"-"+_b6)){
return true;
}
}else{
if(_b5.checked||wFORMS.helpers.hasClass(_b5,wFORMS.className_switchIsOn)){
return true;
}
}
return false;
},isWithinSwitchScope:function(_b8,_b9){
if(wFORMS.hasBehavior("repeat")&&wFORMS.limitSwitchScope==true){
var _ba=_b8;
while(_ba&&_ba.tagName&&_ba.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_ba,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_ba,wFORMS.className_delete)){
_ba=_ba.parentNode;
}
if(wFORMS.helpers.hasClass(_ba,wFORMS.className_repeat)||wFORMS.helpers.hasClass(_ba,wFORMS.className_delete)){
var _bb=_b9;
while(_bb&&_bb.tagName&&_bb.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_bb,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_bb,wFORMS.className_delete)){
_bb=_bb.parentNode;
}
if(_ba==_bb){
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
wFORMS.behaviors["validation"]={errMsg_required:"This field is required. ",errMsg_alpha:"The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed.",errMsg_email:"This does not appear to be a valid email address.",errMsg_integer:"Please enter an integer.",errMsg_float:"Please enter a number (ex. 1.9).",errMsg_password:"Unsafe password. Your password should be between 4 and 12 characters long and use a combinaison of upper-case and lower-case letters.",errMsg_alphanum:"Please use alpha-numeric characters only [a-z 0-9].",errMsg_date:"This does not appear to be a valid date.",errMsg_notification:"%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided.",errMsg_custom:"Please enter a valid value.",jumpToErrorOnPage:null,currentPageIndex:-1,evaluate:function(_bc){
if(_bc.tagName.toUpperCase()=="FORM"){
if(wFORMS.functionName_formValidation.toString()==wFORMS.functionName_formValidation){
wFORMS.functionName_formValidation=eval(wFORMS.functionName_formValidation);
}
wFORMS.helpers.addEvent(_bc,"submit",wFORMS.functionName_formValidation);
}
},init:function(){
},run:function(e){
var _be=wFORMS.helpers.getSourceElement(e);
if(!_be){
_be=e;
}
var _bf=arguments[1]?arguments[1]:false;
wFORMS.behaviors["validation"].jumpToErrorOnPage=null;
if(wFORMS.preventSubmissionOnEnter){
if(_be.type&&_be.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
}
while(_be&&_be.tagName.toUpperCase()!="FORM"){
_be=_be.parentNode;
}
var _c0=wFORMS.behaviors["validation"].validateElement(_be,_bf,true);
wFORMS.behaviors["validation"].errorCount=_c0;
if(_c0>0){
if(wFORMS.behaviors["validation"].jumpToErrorOnPage){
wFORMS.behaviors["paging"].gotoPage(wFORMS.behaviors["validation"].jumpToErrorOnPage);
}
if(wFORMS.showAlertOnError){
wFORMS.behaviors["validation"].showAlert(_c0);
}
return wFORMS.helpers.preventEvent(e);
}
return true;
},remove:function(){
},validateElement:function(_c1){
var _c2=arguments[2]?arguments[2]:true;
var _c3=arguments[1]?arguments[1]:false;
var _c4=wFORMS.behaviors["validation"];
if(wFORMS.hasBehavior("switch")&&wFORMS.helpers.hasClassPrefix(_c1,wFORMS.classNamePrefix_offState)){
return 0;
}
if(wFORMS.hasBehavior("paging")&&wFORMS.helpers.hasClass(_c1,wFORMS.className_paging)){
if(!wFORMS.helpers.hasClass(_c1,wFORMS.className_pagingCurrent)&&_c3){
return 0;
}
_c4.currentPageIndex=wFORMS.behaviors["paging"].getPageIndex(_c1);
}
var _c5=0;
if(!_c4.checkRequired(_c1)){
_c4.showError(_c1,_c4.errMsg_required);
_c5++;
}else{
if(wFORMS.helpers.hasClassPrefix(_c1,wFORMS.classNamePrefix_validation)){
var _c6=_c1.className.split(" ");
for(j=0;j<_c6.length;j++){
switch(_c6[j]){
case "validate-alpha":
if(!_c4.isAlpha(_c1.value)){
_c4.showError(_c1,_c4.errMsg_alpha);
_c5++;
}
break;
case "validate-alphanum":
if(!_c4.isAlphaNum(_c1.value)){
_c4.showError(_c1,_c4.errMsg_alphanum);
_c5++;
}
break;
case "validate-date":
if(!_c4.isDate(_c1.value)){
_c4.showError(_c1,_c4.errMsg_date);
_c5++;
}
break;
case "validate-time":
break;
case "validate-email":
if(!_c4.isEmail(_c1.value)){
_c4.showError(_c1,_c4.errMsg_email);
_c5++;
}
break;
case "validate-integer":
if(!_c4.isInteger(_c1.value)){
_c4.showError(_c1,_c4.errMsg_integer);
_c5++;
}
break;
case "validate-float":
if(!_c4.isFloat(_c1.value)){
_c4.showError(_c1,_c4.errMsg_float);
_c5++;
}
break;
case "validate-strongpassword":
if(!_c4.isPassword(_c1.value)){
_c4.showError(_c1,_c4.errMsg_password);
_c5++;
}
break;
case "validate-custom":
var _c7=new RegExp("/([^/]*)/([gi]*)");
var _c8=_c1.className.match(_c7);
if(_c8[0]){
var _c9=new RegExp(_c8[1],_c8[2]);
if(!_c1.value.match(_c9)){
_c4.showError(_c1,_c4.errMsg_custom);
_c5++;
}
}
break;
}
}
}
}
if(_c5==0){
_c4.removeErrorMessage(_c1);
}else{
if(_c4.currentPageIndex>0&&!_c4.jumpToErrorOnPage){
_c4.jumpToErrorOnPage=_c4.currentPageIndex;
}
}
if(_c2){
for(var i=0;i<_c1.childNodes.length;i++){
if(_c1.childNodes[i].nodeType==1){
_c5+=_c4.validateElement(_c1.childNodes[i],_c3,_c2);
}
}
}
return _c5;
},checkRequired:function(_cb){
if(wFORMS.helpers.hasClass(_cb,wFORMS.className_required)){
var _cc=wFORMS.behaviors["validation"];
switch(_cb.tagName.toUpperCase()){
case "INPUT":
var _cd=_cb.getAttribute("type");
if(!_cd){
_cd="text";
}
switch(_cd.toLowerCase()){
case "checkbox":
return _cb.checked;
break;
case "radio":
return _cb.checked;
break;
default:
return !_cc.isEmpty(_cb.value);
}
break;
case "SELECT":
return !_cc.isEmpty(_cb.options[_cb.selectedIndex].value);
break;
case "TEXTAREA":
return !_cc.isEmpty(_cb.value);
break;
default:
return _cc.checkOneRequired(_cb);
break;
}
}
return true;
},checkOneRequired:function(_ce){
var _cf=false;
if(_ce.nodeType!=1){
return false;
}
if(_ce.tagName.toUpperCase()=="INPUT"){
var _d0=_ce.getAttribute("type");
if(!_d0){
_d0="text";
}
switch(_d0.toLowerCase()){
case "checkbox":
_cf=_ce.checked;
break;
case "radio":
_cf=_ce.checked;
break;
default:
_cf=_ce.value;
}
}else{
if(_ce.tagName.toUpperCase()=="SELECT"){
_cf=_ce.options[_ce.selectedIndex].value;
}else{
if(_ce.tagName.toUpperCase()=="TEXTAREA"){
_cf=_ce.value;
}
}
}
if(_cf&&!wFORMS.behaviors["validation"].isEmpty(_cf)){
return true;
}
for(var i=0;i<_ce.childNodes.length;i++){
if(wFORMS.behaviors["validation"].checkOneRequired(_ce.childNodes[i])){
return true;
}
}
return false;
},isEmpty:function(s){
var _d3=/^\s+$/;
return ((s==null)||(s.length==0)||_d3.test(s));
},isAlpha:function(s){
var _d5=/^[a-zA-Z\s]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_d5.test(s);
},isAlphaNum:function(s){
var _d7=/^[\w\s]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_d7.test(s);
},isDate:function(s){
var _d9=new Date(s);
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(_d9);
},isEmail:function(s){
var _db=/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_db.test(s);
},isInteger:function(s){
var _dd=/^[+]?\d+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_dd.test(s);
},isFloat:function(s){
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(parseFloat(s));
},isPassword:function(s){
return wFORMS.behaviors["validation"].isEmpty(s);
},showError:function(_e0,_e1){
if(wFORMS.helpers.hasClass(_e0,wFORMS.className_validationError_fld)){
wFORMS.behaviors["validation"].removeErrorMessage(_e0);
}
if(!_e0.id){
_e0.id=wFORMS.helpers.randomId();
}
_e0.className+=" "+wFORMS.className_validationError_fld;
var _e2=document.createTextNode(" "+_e1);
var fe=document.getElementById(_e0.id+wFORMS.idSuffix_fieldError);
if(!fe){
fe=document.createElement("div");
fe.setAttribute("id",_e0.id+wFORMS.idSuffix_fieldError);
var fl=document.getElementById(_e0.id+wFORMS.idSuffix_fieldLabel);
if(fl){
fl.parentNode.insertBefore(fe,fl.nextSibling);
}else{
_e0.parentNode.insertBefore(fe,_e0.nextSibling);
}
}
fe.appendChild(_e2);
fe.className+=" "+wFORMS.className_validationError_msg;
},showAlert:function(_e5){
alert(wFORMS.behaviors["validation"].errMsg_notification.replace("%%",_e5));
},removeErrorMessage:function(_e6){
var _e7=new RegExp(wFORMS.className_validationError_fld,"gi");
_e6.className=_e6.className.replace(_e7,"");
var _e8=document.getElementById(_e6.id+wFORMS.idSuffix_fieldError);
if(_e8){
_e8.parentNode.removeChild(_e8);
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
wFORMS.behaviors["sync"]={evaluate:function(_e9){
if(wFORMS.helpers.hasClassPrefix(_e9,wFORMS.classNamePrefix_sync)){
if(!_e9.id){
_e9.id=wFORMS.helpers.randomId();
}
var _ea=wFORMS.behaviors["sync"].getSyncNames(_e9);
for(var i=0;i<_ea.length;i++){
if(!wFORMS.syncTriggers[_ea[i]]){
wFORMS.syncTriggers[_ea[i]]=new Array();
}
if(!wFORMS.syncTriggers[_ea[i]][_e9.id]){
wFORMS.syncTriggers[_ea[i]].push(_e9.id);
}
}
switch(_e9.tagName.toUpperCase()){
case "OPTION":
var _ec=_e9.parentNode;
while(_ec&&_ec.tagName.toUpperCase()!="SELECT"){
var _ec=_ec.parentNode;
}
if(!_ec){
alert("Error: invalid markup in SELECT field ?");
return false;
}
if(!_ec.id){
_ec.id=wFORMS.helpers.randomId();
}
if(!_ec.getAttribute("rel")||_ec.getAttribute("rel").indexOf("wfHandled")==-1){
_ec.setAttribute("rel",(_ec.getAttribute("rel")||"")+" wfHandled");
wFORMS.helpers.addEvent(_ec,"change",wFORMS.behaviors["sync"].run);
}
break;
case "INPUT":
if(_e9.type&&_e9.type.toLowerCase()=="radio"){
var _ed=_e9.form;
for(var j=0;j<_ed[_e9.name].length;j++){
var _ef=_ed[_e9.name][j];
if(_ef.type.toLowerCase()=="radio"){
if(!_ef.getAttribute("rel")||_ef.getAttribute("rel").indexOf("wfHandled")==-1){
wFORMS.helpers.addEvent(_ef,"click",wFORMS.behaviors["sync"].run);
_ef.setAttribute("rel",(_ef.getAttribute("rel")||"")+" wfHandled");
}
}
}
}else{
if(_e9.type&&_e9.type.toLowerCase()=="text"){
wFORMS.helpers.addEvent(_e9,"keyup",wFORMS.behaviors["sync"].run);
}else{
wFORMS.helpers.addEvent(_e9,"click",wFORMS.behaviors["sync"].run);
}
}
break;
case "TEXTAREA":
wFORMS.helpers.addEvent(_e9,"keyup",wFORMS.behaviors["sync"].run);
break;
default:
wFORMS.helpers.addEvent(_e9,"click",wFORMS.behaviors["sync"].run);
break;
}
}
if(wFORMS.helpers.hasClassPrefix(_e9,wFORMS.classNamePrefix_target)){
if(!_e9.id){
_e9.id=wFORMS.helpers.randomId();
}
var _ea=wFORMS.behaviors["sync"].getSyncNames(_e9);
for(var i=0;i<_ea.length;i++){
if(!wFORMS.syncTargets[_ea[i]]){
wFORMS.syncTargets[_ea[i]]=new Array();
}
wFORMS.syncTargets[_ea[i]].push(_e9.id);
}
}
if(_e9.tagName&&_e9.tagName.toUpperCase()=="FORM"){
wFORMS.onLoadComplete.push(wFORMS.behaviors["sync"].init);
}
},init:function(){
for(var _f0 in wFORMS.syncTriggers){
for(var i=0;i<wFORMS.syncTriggers[_f0].length;i++){
var _f2=document.getElementById(wFORMS.syncTriggers[_f0][i]);
if(wFORMS.behaviors["sync"].isTriggerOn(_f2,_f0)){
if(_f2.tagName.toUpperCase()=="OPTION"){
var _f2=_f2.parentNode;
while(_f2&&_f2.tagName.toUpperCase()!="SELECT"){
var _f2=_f2.parentNode;
}
}
wFORMS.behaviors["sync"].run(_f2);
}
}
}
},run:function(e){
var _f4=wFORMS.helpers.getSourceElement(e);
if(!_f4){
_f4=e;
}
var _f5=new Array();
switch(_f4.tagName.toUpperCase()){
case "SELECT":
for(var i=0;i<_f4.options.length;i++){
_f5=_f5.concat(wFORMS.behaviors["sync"].getSyncNames(_f4.options[i]));
}
break;
case "INPUT":
if(_f4.type.toLowerCase()=="radio"){
for(var i=0;i<_f4.form[_f4.name].length;i++){
var _f7=_f4.form[_f4.name][i];
_f5=_f5.concat(wFORMS.behaviors["sync"].getSyncNames(_f7));
}
}else{
_f5=_f5.concat(wFORMS.behaviors["sync"].getSyncNames(_f4));
}
break;
default:
break;
}
for(var i=0;i<_f5.length;i++){
var _f8=wFORMS.behaviors["sync"].getTargetsBySyncName(_f5[i]);
for(var j=0;j<_f8.length;j++){
if(wFORMS.behaviors["sync"].isWithinSyncScope(_f4,_f8[j])){
wFORMS.behaviors["sync"].sync(_f4,_f8[j],_f5[i]);
}
}
}
},remove:function(e){
var _fb=wFORMS.helpers.getSourceElement(e);
},getSyncNames:function(_fc){
var _fd=new Array();
var _fe=_fc.className.split(" ");
for(var i=0;i<_fe.length;i++){
if(_fe[i].indexOf(wFORMS.classNamePrefix_sync)==0){
_fd.push(_fe[i].substr(wFORMS.classNamePrefix_sync.length+1));
}
if(_fe[i].indexOf(wFORMS.classNamePrefix_target)==0){
_fd.push(_fe[i].substr(wFORMS.classNamePrefix_target.length+1));
}
}
return _fd;
},sync:function(_100,_101,_102){
if(!_100||_100.nodeType!=1){
return;
}
if(!_101||_101.nodeType!=1){
return;
}
var _103,state;
switch(_100.tagName.toUpperCase()){
case "SELECT":
_103=_100.options[_100.selectedIndex].value;
state=wFORMS.helpers.hasClass(_100.options[_100.selectedIndex],wFORMS.classNamePrefix_sync+"-"+_102);
break;
case "INPUT":
_103=_100.value;
if(_100.type.toLowerCase()=="radio"||_100.type.toLowerCase()=="checkbox"){
state=_100.checked;
}else{
state=(_103.lenght>0);
}
break;
default:
_103=_100.innerHTML;
state=(_103.lenght>0);
break;
}
switch(_101.tagName.toUpperCase()){
case "OPTION":
wFORMS.behaviors["sync"].syncState(_101,state);
break;
case "INPUT":
if(_101.type.toLowerCase()=="radio"||_101.type.toLowerCase()=="checkbox"){
wFORMS.behaviors["sync"].syncState(_101,state);
}else{
wFORMS.behaviors["sync"].syncValue(_101,_103);
}
break;
default:
wFORMS.behaviors["sync"].syncValue(_101,_103);
break;
}
if(wFORMS.helpers.hasClass(_101,wFORMS.className_syncIsOff)){
element.className=_101.className.replace(wFORMS.className_syncIsOff,wFORMS.className_syncIsOn);
}else{
if(wFORMS.helpers.hasClass(_101,wFORMS.className_syncIsOn)){
element.className=_101.className.replace(wFORMS.className_syncIsOn,wFORMS.className_syncIsOff);
}
}
},syncState:function(_104,_105){
if(_104.tagName.toUpperCase()=="OPTION"){
_104.selected=_105;
}else{
_104.checked=_105;
}
},syncValue:function(_106,_107){
if(_106.tagName.toUpperCase()=="INPUT"){
_106.value=_107;
}else{
_106.innerHTML=_107;
}
},getTargetsBySyncName:function(_108){
var _109=new Array();
if(wFORMS.syncTargets[_108]){
for(var i=0;i<wFORMS.syncTargets[_108].length;i++){
var _10b=document.getElementById(wFORMS.syncTargets[_108][i]);
if(_10b){
_109.push(_10b);
}
}
}
return _109;
},isTriggerOn:function(_10c,_10d){
if(!_10c){
return false;
}
if(_10c.tagName.toUpperCase()=="OPTION"){
var _10e=_10c.parentNode;
while(_10e&&_10e.tagName.toUpperCase()!="SELECT"){
var _10e=_10e.parentNode;
}
if(!_10e){
return false;
}
if(_10e.selectedIndex==-1){
return false;
}
if(wFORMS.helpers.hasClass(_10e.options[_10e.selectedIndex],wFORMS.classNamePrefix_sync+"-"+_10d)){
return true;
}
}else{
if(_10c.checked||wFORMS.helpers.hasClass(_10c,wFORMS.className_syncIsOn)){
return true;
}
}
return false;
},isWithinSyncScope:function(_10f,_110){
if(wFORMS.hasBehavior("repeat")&&wFORMS.limitSyncScope==true){
var _111=_10f;
while(_111&&_111.tagName&&_111.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_111,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_111,wFORMS.className_delete)){
_111=_111.parentNode;
}
if(wFORMS.helpers.hasClass(_111,wFORMS.className_repeat)||wFORMS.helpers.hasClass(_111,wFORMS.className_delete)){
var _112=_110;
while(_112&&_112.tagName&&_112.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_112,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_112,wFORMS.className_delete)){
_112=_112.parentNode;
}
if(_111==_112){
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

