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
if(wHELPERS){
var wFORMS={debugLevel:0,helpers:new wHELPERS(),behaviors:{},onLoadComplete:new Array(),processedForm:null,onLoadHandler:function(){
for(var _1f in wFORMS.behaviors){
wFORMS.debug("wForms/loaded behavior: "+_1f);
}
for(var i=0;i<document.forms.length;i++){
wFORMS.debug("wForms/initialize: "+(document.forms[i].name||document.forms[i].id));
wFORMS.addBehaviors(document.forms[i]);
}
},addBehaviors:function(_21){
if(!_21){
return;
}
if(!_21.nodeType){
_21=document.getElementById(_21);
}
if(!_21||_21.nodeType!=1){
return;
}
deep=(arguments.length>1)?arguments[1]:true;
wFORMS._addBehaviors(_21,deep);
},_addBehaviors:function(_22,_23){
if(_22.getAttribute("rel")=="no-behavior"){
return false;
}
if(_22.nodeType==1){
if(_22.tagName.toUpperCase()=="FORM"){
wFORMS.processedForm=_22;
}
for(var _24 in wFORMS.behaviors){
wFORMS.behaviors[_24].evaluate(_22);
}
if(_23){
for(var i=0,l=_22.childNodes.length,cn=_22.childNodes;i<l;i++){
if(cn[i].nodeType==1){
wFORMS._addBehaviors(cn[i],_23);
}
}
}
if(_22.tagName.toUpperCase()=="FORM"){
for(var i=0;i<wFORMS.onLoadComplete.length;i++){
wFORMS.onLoadComplete[i]();
}
if(wFORMS.onLoadComplete.length>0){
wFORMS.onLoadComplete=new Array();
}
}
}
},hasBehavior:function(_26){
if(wFORMS.behaviors[_26]){
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
var _28=document.getElementById("debugOutput");
if(!_28){
_28=document.createElement("div");
_28.id="debugOutput";
_28.style.position="absolute";
_28.style.right="10px";
_28.style.top="10px";
_28.style.zIndex="300";
_28.style.fontSize="x-small";
_28.style.fontFamily="courier";
_28.style.backgroundColor="#DDD";
_28.style.padding="5px";
if(document.body){
wFORMS.debugOutput=document.body.appendChild(_28);
}
}
if(wFORMS.debugOutput){
wFORMS.debugOutput.ondblclick=function(){
this.innerHTML="";
};
}
}};
wFORMS.NAME="wForms";
wFORMS.VERSION="2.0";
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
wFORMS.behaviors["hint"]={name:"hint",evaluate:function(_29){
if(_29.id){
if(_29.id.indexOf(wFORMS.idSuffix_fieldHint)>0){
var id=_29.id.replace(wFORMS.idSuffix_fieldHint,"");
var _2b=document.getElementById(id)||wFORMS.processedForm[id];
}
if(_2b){
if(_2b.length>0&&_2b[0].type=="radio"){
var _2c=_2b;
l=_2b.length;
}else{
var _2c=new Array(_2b);
l=1;
}
for(var i=0;i<l;i++){
_2b=_2c[i];
wFORMS.debug("hint/evaluate: "+(_29.id||_29.name));
switch(_2b.tagName.toUpperCase()){
case "SELECT":
case "TEXTAREA":
case "INPUT":
wFORMS.helpers.addEvent(_2b,"focus",wFORMS.behaviors["hint"].run);
wFORMS.helpers.addEvent(_2b,"blur",wFORMS.behaviors["hint"].remove);
break;
default:
wFORMS.helpers.addEvent(_2b,"mouseover",wFORMS.behaviors["hint"].run);
wFORMS.helpers.addEvent(_2b,"mouseout",wFORMS.behaviors["hint"].remove);
break;
}
}
}
}
},run:function(e){
var _2f=wFORMS.helpers.getSourceElement(e);
var _30=document.getElementById(_2f.id+wFORMS.idSuffix_fieldHint);
if(!_30){
_30=document.getElementById(_2f.name+wFORMS.idSuffix_fieldHint);
}
if(_30){
_30.className=_30.className.replace(wFORMS.className_inactiveFieldHint,wFORMS.className_activeFieldHint);
_30.style.top=(wFORMS.helpers.getTop(_2f)+_2f.offsetHeight).toString()+"px";
if(_2f.tagName.toUpperCase()=="SELECT"){
_30.style.left=(wFORMS.helpers.getLeft(_2f)+(_2f.offsetWidth-8)).toString()+"px";
}else{
_30.style.left=(wFORMS.helpers.getLeft(_2f)).toString()+"px";
}
}
},remove:function(e){
var _32=wFORMS.helpers.getSourceElement(e);
var _33=document.getElementById(_32.id+wFORMS.idSuffix_fieldHint);
if(!_33){
_33=document.getElementById(_32.name+wFORMS.idSuffix_fieldHint);
}
if(_33){
_33.className=_33.className.replace(wFORMS.className_activeFieldHint,wFORMS.className_inactiveFieldHint);
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
wFORMS.behaviors["paging"]={idSuffix_buttonsPlaceholder:"-buttons",className_pageNextButton:wFORMS.className_pagingButtons+" wfPageNextButton",className_pagePreviousButton:wFORMS.className_pagingButtons+" wfPagePreviousButton",behaviorInUse:false,allowNestedPages:false,onPageChange:null,evaluate:function(_34){
if(wFORMS.helpers.hasClass(_34,wFORMS.className_paging)){
if(!wFORMS.behaviors["paging"].allowNestedPages&&wFORMS.behaviors["paging"].getPageElement(_34)){
_34.className=_34.className.replace(wFORMS.className_paging,"");
return;
}
wFORMS.behaviors["paging"].behaviorInUse=true;
var _35=wFORMS.behaviors["paging"].getPageIndex(_34);
if(_35>1){
var _36=this.getButtonPlaceholder(_34);
var _37=_36.insertBefore(this.createPreviousPageButton(),_36.firstChild);
wFORMS.helpers.addEvent(_37,"click",wFORMS.behaviors["paging"].pagingPrevious);
}else{
_34.className+=" "+wFORMS.className_pagingCurrent;
var _38=wFORMS.behaviors["paging"].getFormElement(_34);
wFORMS.helpers.addEvent(_38,"submit",function(e){
var _3a=wFORMS.helpers.getSourceElement(e);
if(_3a.type&&_3a.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
});
wFORMS.preventSubmissionOnEnter=true;
}
if(document.getElementById(wFORMS.idPrefix_pageIndex+(_35+1).toString())){
var _36=this.getButtonPlaceholder(_34);
var _37=_36.appendChild(this.createNextPageButton());
wFORMS.helpers.addEvent(_37,"click",wFORMS.behaviors["paging"].pagingNext);
if(_35==1){
wFORMS.behaviors["paging"].hideSubmitButton(_38);
}
}
}
},getButtonPlaceholder:function(_3b){
var p=document.getElementById(_3b.id+this.idSuffix_buttonsPlaceholder);
if(!p){
var _3d=document.createElement("div");
_3d=_3b.appendChild(_3d);
_3d.className="actions";
_3d.id=_3b.id+this.idSuffix_buttonsPlaceholder;
return _3d;
}
return p;
},createNextPageButton:function(){
var _3e=document.createElement("input");
_3e.setAttribute("value",wFORMS.arrMsg[4]);
_3e.setAttribute("type","button");
_3e.className=this.className_pageNextButton;
return _3e;
},createPreviousPageButton:function(){
var _3f=document.createElement("input");
_3f.setAttribute("value",wFORMS.arrMsg[5]);
_3f.setAttribute("type","button");
_3f.className=this.className_pagePreviousButton;
return _3f;
},pagingNext:function(e){
var _41=wFORMS.helpers.getSourceElement(e);
if(!_41){
_41=e;
}
var _42=wFORMS.behaviors["paging"].getPageElement(_41);
var _43=wFORMS.behaviors["paging"].getPageIndex(_42)+1;
var _44=document.getElementById(wFORMS.idPrefix_pageIndex+_43.toString());
if(_44){
if(!wFORMS.hasBehavior("validation")||(wFORMS.hasBehavior("validation")&&!wFORMS.runValidationOnPageNext)||(wFORMS.hasBehavior("validation")&&wFORMS.runValidationOnPageNext&&wFORMS.functionName_formValidation(e,true))){
_42.className=_42.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
_44.className+=" "+wFORMS.className_pagingCurrent;
if(wFORMS.behaviors["paging"].isLastPage(_43)){
var _45=wFORMS.behaviors["paging"].getFormElement(_44);
wFORMS.behaviors["paging"].showSubmitButton(_45);
}
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_44);
}
window.scroll(0,0);
}
}
},pagingPrevious:function(e){
var _47=wFORMS.helpers.getSourceElement(e);
if(!_47){
_47=e;
}
var _48=wFORMS.behaviors["paging"].getPageElement(_47);
var _49=wFORMS.behaviors["paging"].getPageIndex(_48)-1;
var _4a=document.getElementById(wFORMS.idPrefix_pageIndex+_49.toString());
if(_4a){
_48.className=_48.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
_4a.className+=" "+wFORMS.className_pagingCurrent;
var _4b=wFORMS.behaviors["paging"].getFormElement(_4a);
wFORMS.behaviors["paging"].hideSubmitButton(_4b);
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_4a);
}
window.scroll(0,0);
}
},showSubmitButton:function(_4c){
var _4d=_4c.getElementsByTagName("input");
for(var i=0;i<_4d.length;i++){
if(_4d[i].type&&_4d[i].type.toLowerCase()=="submit"){
_4d[i].className=_4d[i].className.replace(wFORMS.className_hideSubmit,"");
}
}
},hideSubmitButton:function(_4f){
var _50=_4f.getElementsByTagName("input");
for(var i=0;i<_50.length;i++){
if(_50[i].type&&_50[i].type.toLowerCase()=="submit"&&!wFORMS.helpers.hasClass(_50[i],wFORMS.className_hideSubmit)){
_50[i].className+=" "+wFORMS.className_hideSubmit;
}
}
},isLastPage:function(_52){
if(isNaN(_52)){
_52=parseInt(_52.replace(/[\D]*/,""));
}
_52++;
var _53=document.getElementById(wFORMS.idPrefix_pageIndex+_52.toString());
if(!_53){
return true;
}
return false;
},gotoPage:function(_54){
if(isNaN(_54)){
var _55=document.getElementById(_54);
}else{
var _55=document.getElementById(wFORMS.idPrefix_pageIndex+_54.toString());
}
if(!_55){
return false;
}
var _56=wFORMS.behaviors["paging"].getFormElement(_55);
var _57=_56.getElementsByTagName("*");
for(var i=0;i<_57.length;i++){
var n=_57[i];
if(wFORMS.helpers.hasClass(_57[i],wFORMS.className_pagingCurrent)){
n.className=n.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
break;
}
}
if(wFORMS.behaviors["paging"].isLastPage(_54)){
wFORMS.behaviors["paging"].showSubmitButton(_56);
}else{
wFORMS.behaviors["paging"].hideSubmitButton(_56);
}
_55.className+=" "+wFORMS.className_pagingCurrent;
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_55);
}
},getFormElement:function(_5a){
var _5b=_5a.parentNode;
while(_5b&&_5b.tagName!="FORM"){
_5b=_5b.parentNode;
}
return _5b;
},getPageElement:function(_5c){
var n=_5c.parentNode;
while(n&&n.tagName!="FORM"&&(!n.className||!wFORMS.helpers.hasClass(n,wFORMS.className_paging))){
n=n.parentNode;
}
if(n&&wFORMS.helpers.hasClass(n,wFORMS.className_paging)){
return n;
}else{
return null;
}
},getPageIndex:function(_5e){
if(_5e&&_5e.id){
return parseInt(_5e.id.replace(/[\D]*/,""));
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
wFORMS.behaviors["repeat"]={onRepeat:null,onRemove:null,allowRepeat:null,evaluate:function(_5f){
if(wFORMS.helpers.hasClass(_5f,wFORMS.className_repeat)){
if(!_5f.id){
_5f.id=wFORMS.helpers.randomId();
}
var _60=document.getElementById(_5f.id+wFORMS.idSuffix_duplicateLink);
if(!_60){
_60=wFORMS.behaviors["repeat"].createRepeatLink(_5f.id);
if(_5f.tagName.toUpperCase()=="TR"){
var n=_5f.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_60);
}
}else{
_5f.appendChild(_60);
}
}
var _62=document.getElementById(_5f.id+wFORMS.idSuffix_repeatCounter);
if(!_62){
if(document.all&&!window.opera){
var _63=_5f.id+wFORMS.idSuffix_repeatCounter;
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
_62=document.createElement("INPUT NAME=\""+_63+"\"");
}else{
_62=document.createElement("<INPUT NAME=\""+_63+"\"></INPUT>");
}
_62.type="hidden";
_62.id=_63;
_62.value="1";
}else{
_62=document.createElement("INPUT");
_62.setAttribute("type","hidden");
_62.setAttribute("value","1");
_62.setAttribute("name",_5f.id+wFORMS.idSuffix_repeatCounter);
_62.setAttribute("id",_5f.id+wFORMS.idSuffix_repeatCounter);
}
var _64=_5f.parentNode;
while(_64&&_64.tagName.toUpperCase()!="FORM"){
_64=_64.parentNode;
}
_64.appendChild(_62);
}
wFORMS.helpers.addEvent(_60,"click",wFORMS.behaviors["repeat"].duplicateFieldGroup);
}
if(wFORMS.helpers.hasClass(_5f,wFORMS.className_delete)){
var _65=wFORMS.behaviors["repeat"].createRemoveLink();
if(_5f.tagName.toUpperCase()=="TR"){
var n=_5f.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_65);
}
}else{
_5f.appendChild(_65);
}
}
},createRepeatLink:function(id){
var _67=document.createElement("a");
var _68=document.createElement("span");
var _69=document.createTextNode(wFORMS.arrMsg[0]);
_67.id=id+wFORMS.idSuffix_duplicateLink;
_67.setAttribute("href","#");
_67.className=wFORMS.className_duplicateLink;
_67.setAttribute("title",wFORMS.arrMsg[1]);
_68.appendChild(_69);
_67.appendChild(_68);
return _67;
},createRemoveLink:function(){
var _6a=document.createElement("a");
var _6b=document.createElement("span");
var _6c=document.createTextNode(wFORMS.arrMsg[2]);
_6a.setAttribute("href","#");
_6a.className=wFORMS.className_removeLink;
_6a.setAttribute("title",wFORMS.arrMsg[3]);
_6b.appendChild(_6c);
_6a.appendChild(_6b);
wFORMS.helpers.addEvent(_6a,"click",wFORMS.behaviors["repeat"].removeFieldGroup);
return _6a;
},duplicateFieldGroup:function(e){
var _6e=wFORMS.helpers.getSourceElement(e);
if(!_6e){
_6e=e;
}
var _6f=wFORMS.helpers.hasClass(_6e,wFORMS.className_preserveRadioName)?true:wFORMS.preserveRadioName;
while(_6e&&!wFORMS.helpers.hasClass(_6e,wFORMS.className_duplicateLink)){
_6e=_6e.parentNode;
}
var _70=_6e.id.replace(wFORMS.idSuffix_duplicateLink,"");
var _6e=document.getElementById(_70);
if(_6e){
var _71=wFORMS.behaviors["repeat"];
if(_71.allowRepeat){
if(!_71.allowRepeat(_6e)){
return false;
}
}
counterField=document.getElementById(_6e.id+wFORMS.idSuffix_repeatCounter);
if(!counterField){
return;
}
var _72=parseInt(counterField.value)+1;
var _73="-"+_72.toString();
var _74=_71.replicateTree(_6e,null,_73,_6f);
var _75=_6e.nextSibling;
while(_75&&(_75.nodeType==3||wFORMS.helpers.hasClass(_75,wFORMS.className_delete))){
_75=_75.nextSibling;
}
_6e.parentNode.insertBefore(_74,_75);
_74.className=_6e.className.replace(wFORMS.className_repeat,wFORMS.className_delete);
document.getElementById(_6e.id+wFORMS.idSuffix_repeatCounter).value=_72;
wFORMS.addBehaviors(_74);
if(_71.onRepeat){
_71.onRepeat(_6e,_74);
}
}
return wFORMS.helpers.preventEvent(e);
},removeFieldGroup:function(e){
var _77=wFORMS.helpers.getSourceElement(e);
if(!_77){
_77=e;
}
var _77=_77.parentNode;
while(_77&&!wFORMS.helpers.hasClass(_77,wFORMS.className_delete)){
_77=_77.parentNode;
}
_77.parentNode.removeChild(_77);
if(wFORMS.behaviors["repeat"].onRemove){
wFORMS.behaviors["repeat"].onRemove(_77);
}
return wFORMS.helpers.preventEvent(e);
},removeRepeatCountSuffix:function(str){
return str.replace(/-\d+$/,"");
},replicateTree:function(_79,_7a,_7b,_7c){
if(_79.nodeType==3){
if(_79.parentNode.tagName.toUpperCase()!="TEXTAREA"){
var _7d=document.createTextNode(_79.data);
}
}else{
if(_79.nodeType==1){
if(wFORMS.helpers.hasClass(_79,wFORMS.className_duplicateLink)||wFORMS.helpers.hasClass(_79,wFORMS.className_removeLink)){
return null;
}
if(wFORMS.helpers.hasClass(_79,wFORMS.className_delete)){
return null;
}
if(wFORMS.helpers.hasClass(_79,wFORMS.className_repeat)&&_7a!=null){
_7b=_7b.replace("-","__");
}
if(!document.all||window.opera){
var _7d=document.createElement(_79.tagName);
}else{
var _7e=_79.tagName;
if(_79.name){
if(_79.tagName.toUpperCase()=="INPUT"&&_79.type.toLowerCase()=="radio"&&_7c){
_7e+=" NAME='"+_79.name+"' ";
}else{
_7e+=" NAME='"+wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_79.name)+_7b+"' ";
}
}
if(_79.type){
_7e+=" TYPE='"+_79.type+"' ";
}
if(_79.selected){
_7e+=" SELECTED='SELECTED' ";
}
if(_79.checked){
_7e+=" CHECKED='CHECKED' ";
}
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
var _7d=document.createElement(_7e);
}else{
var _7d=document.createElement("<"+_7e+"></"+_79.tagName+">");
}
try{
_7d.type=_79.type;
}
catch(e){
}
}
for(var i=0;i<_79.attributes.length;i++){
var _80=_79.attributes[i];
if(_80.specified||_80.nodeName.toLowerCase()=="value"){
if(_80.nodeName.toLowerCase()=="id"||_80.nodeName.toLowerCase()=="name"||_80.nodeName.toLowerCase()=="for"){
if(wFORMS.hasBehavior("hint")&&_80.nodeValue.indexOf(wFORMS.idSuffix_fieldHint)!=-1){
var _81=_80.nodeValue;
_81=wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_81.substr(0,_81.indexOf(wFORMS.idSuffix_fieldHint)))+_7b+wFORMS.idSuffix_fieldHint;
}else{
if(_79.tagName.toUpperCase()=="INPUT"&&_79.getAttribute("type",false).toLowerCase()=="radio"&&_80.nodeName.toLowerCase()=="name"&&_7c){
var _81=_80.nodeValue;
}else{
var _81=_80.nodeValue+_7b;
}
}
}else{
if(_80.nodeName.toLowerCase()=="value"&&_79.tagName.toUpperCase()=="INPUT"&&(_79.type.toLowerCase()=="text"||_79.type.toLowerCase()=="password"||_79.type.toLowerCase()=="hidden"||_79.type.toLowerCase()=="file")){
var _81="";
}else{
if(_80.nodeName.toLowerCase()=="rel"&&_80.nodeValue.indexOf("wfHandled")!=-1){
var _81=_80.nodeValue.replace("wfHandled","");
}else{
var _81=_80.nodeValue;
}
}
}
switch(_80.nodeName.toLowerCase()){
case "class":
_7d.className=_81;
break;
case "style":
if(_79.style&&_79.style.cssText){
_7d.style.cssText=_79.style.cssText;
}
break;
case "onclick":
_7d.onclick=_79.onclick;
break;
case "onchange":
_7d.onchange=_79.onchange;
break;
case "onsubmit":
_7d.onsubmit=_79.onsubmit;
break;
case "onmouseover":
_7d.onmouseover=_79.onmouseover;
break;
case "onmouseout":
_7d.onmouseout=_79.onmouseout;
break;
case "onmousedown":
_7d.onmousedown=_79.onmousedown;
break;
case "onmouseup":
_7d.onmouseup=_79.onmouseup;
break;
case "ondblclick":
_7d.ondblclick=_79.ondblclick;
break;
case "onkeydown":
_7d.onkeydown=_79.onkeydown;
break;
case "onkeyup":
_7d.onkeyup=_79.onkeyup;
break;
case "onblur":
_7d.onblur=_79.onblur;
break;
case "onfocus":
_7d.onfocus=_79.onfocus;
break;
default:
_7d.setAttribute(_80.name,_81,0);
}
}
}
}
}
if(_7a&&_7d){
_7a.appendChild(_7d);
}
for(var i=0;i<_79.childNodes.length;i++){
wFORMS.behaviors["repeat"].replicateTree(_79.childNodes[i],_7d,_7b,_7c);
}
return _7d;
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
wFORMS.behaviors["switch"]={evaluate:function(_82){
if(wFORMS.helpers.hasClassPrefix(_82,wFORMS.classNamePrefix_switch)){
if(!_82.id){
_82.id=wFORMS.helpers.randomId();
}
var _83=wFORMS.behaviors["switch"].getSwitchNames(_82);
for(var i=0;i<_83.length;i++){
if(!wFORMS.switchTriggers[_83[i]]){
wFORMS.switchTriggers[_83[i]]=new Array();
}
if(!wFORMS.switchTriggers[_83[i]][_82.id]){
wFORMS.switchTriggers[_83[i]].push(_82.id);
}
}
switch(_82.tagName.toUpperCase()){
case "OPTION":
var _85=_82.parentNode;
while(_85&&_85.tagName.toUpperCase()!="SELECT"){
var _85=_85.parentNode;
}
if(!_85){
alert("Error: invalid markup in SELECT field ?");
return false;
}
if(!_85.id){
_85.id=wFORMS.helpers.randomId();
}
if(!_85.getAttribute("rel")||_85.getAttribute("rel").indexOf("wfHandled")==-1){
_85.setAttribute("rel",(_85.getAttribute("rel")||"")+" wfHandled");
wFORMS.helpers.addEvent(_85,"change",wFORMS.behaviors["switch"].run);
}
break;
case "INPUT":
if(_82.type&&_82.type.toLowerCase()=="radio"){
var _86=_82.form;
for(var j=0;j<_86[_82.name].length;j++){
var _88=_86[_82.name][j];
if(_88.type.toLowerCase()=="radio"){
if(!_88.getAttribute("rel")||_88.getAttribute("rel").indexOf("wfHandled")==-1){
wFORMS.helpers.addEvent(_88,"click",wFORMS.behaviors["switch"].run);
_88.setAttribute("rel",(_88.getAttribute("rel")||"")+" wfHandled");
}
}
}
}else{
wFORMS.helpers.addEvent(_82,"click",wFORMS.behaviors["switch"].run);
}
break;
default:
wFORMS.helpers.addEvent(_82,"click",wFORMS.behaviors["switch"].run);
break;
}
}
if(wFORMS.helpers.hasClassPrefix(_82,wFORMS.classNamePrefix_offState)||wFORMS.helpers.hasClassPrefix(_82,wFORMS.classNamePrefix_onState)){
if(!_82.id){
_82.id=wFORMS.helpers.randomId();
}
var _83=wFORMS.behaviors["switch"].getSwitchNames(_82);
for(var i=0;i<_83.length;i++){
if(!wFORMS.switchTargets[_83[i]]){
wFORMS.switchTargets[_83[i]]=new Array();
}
if(!wFORMS.switchTargets[_83[i]][_82.id]){
wFORMS.switchTargets[_83[i]].push(_82.id);
}
}
}
if(_82.tagName&&_82.tagName.toUpperCase()=="FORM"){
wFORMS.onLoadComplete.push(wFORMS.behaviors["switch"].init);
}
},init:function(){
for(var _89 in wFORMS.switchTriggers){
for(var i=0;i<wFORMS.switchTriggers[_89].length;i++){
var _8b=document.getElementById(wFORMS.switchTriggers[_89][i]);
if(wFORMS.behaviors["switch"].isTriggerOn(_8b,_89)){
if(_8b.tagName.toUpperCase()=="OPTION"){
var _8b=_8b.parentNode;
while(_8b&&_8b.tagName.toUpperCase()!="SELECT"){
var _8b=_8b.parentNode;
}
}
wFORMS.behaviors["switch"].run(_8b);
}
}
}
},run:function(e){
var _8d=wFORMS.helpers.getSourceElement(e);
if(!_8d){
_8d=e;
}
var _8e=new Array();
var _8f=new Array();
switch(_8d.tagName.toUpperCase()){
case "SELECT":
for(var i=0;i<_8d.options.length;i++){
if(i==_8d.selectedIndex){
_8e=_8e.concat(wFORMS.behaviors["switch"].getSwitchNames(_8d.options[i]));
}else{
_8f=_8f.concat(wFORMS.behaviors["switch"].getSwitchNames(_8d.options[i]));
}
}
break;
case "INPUT":
if(_8d.type.toLowerCase()=="radio"){
for(var i=0;i<_8d.form[_8d.name].length;i++){
var _91=_8d.form[_8d.name][i];
if(_91.checked){
_8e=_8e.concat(wFORMS.behaviors["switch"].getSwitchNames(_91));
}else{
_8f=_8f.concat(wFORMS.behaviors["switch"].getSwitchNames(_91));
}
}
}else{
if(_8d.checked||wFORMS.helpers.hasClass(_8d,wFORMS.className_switchIsOn)){
_8e=_8e.concat(wFORMS.behaviors["switch"].getSwitchNames(_8d));
}else{
_8f=_8f.concat(wFORMS.behaviors["switch"].getSwitchNames(_8d));
}
}
break;
default:
break;
}
for(var i=0;i<_8f.length;i++){
var _92=wFORMS.behaviors["switch"].getElementsBySwitchName(_8f[i]);
for(var j=0;j<_92.length;j++){
var _94=wFORMS.switchTriggers[_8f[i]];
var _95=true;
for(var k=0;k<_94.length;k++){
var _97=document.getElementById(_94[k]);
if(wFORMS.behaviors["switch"].isTriggerOn(_97,_8f[i])){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_97,_92[j])){
_95=false;
}
}
}
if(_95){
wFORMS.behaviors["switch"].switchState(_92[j],wFORMS.classNamePrefix_onState,wFORMS.classNamePrefix_offState);
}
}
}
for(var i=0;i<_8e.length;i++){
var _92=wFORMS.behaviors["switch"].getElementsBySwitchName(_8e[i]);
for(var j=0;j<_92.length;j++){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_8d,_92[j])){
wFORMS.behaviors["switch"].switchState(_92[j],wFORMS.classNamePrefix_offState,wFORMS.classNamePrefix_onState);
}
}
}
},clear:function(e){
wFORMS.switchTriggers={};
wFORMS.switchTargets={};
},getSwitchNames:function(_99){
var _9a=new Array();
var _9b=_99.className.split(" ");
for(var i=0;i<_9b.length;i++){
if(_9b[i].indexOf(wFORMS.classNamePrefix_switch)==0){
_9a.push(_9b[i].substr(wFORMS.classNamePrefix_switch.length+1));
}
if(_9b[i].indexOf(wFORMS.classNamePrefix_onState)==0){
_9a.push(_9b[i].substr(wFORMS.classNamePrefix_onState.length+1));
}else{
if(_9b[i].indexOf(wFORMS.classNamePrefix_offState)==0){
_9a.push(_9b[i].substr(wFORMS.classNamePrefix_offState.length+1));
}
}
}
return _9a;
},switchState:function(_9d,_9e,_9f){
if(!_9d||_9d.nodeType!=1){
return;
}
if(_9d.className){
_9d.className=_9d.className.replace(_9e,_9f);
}
if(wFORMS.helpers.hasClass(_9d,wFORMS.className_switchIsOff)){
_9d.className=_9d.className.replace(wFORMS.className_switchIsOff,wFORMS.className_switchIsOn);
}else{
if(wFORMS.helpers.hasClass(_9d,wFORMS.className_switchIsOn)){
_9d.className=_9d.className.replace(wFORMS.className_switchIsOn,wFORMS.className_switchIsOff);
}
}
},getElementsBySwitchName:function(_a0){
var _a1=new Array();
if(wFORMS.switchTargets[_a0]){
for(var i=0;i<wFORMS.switchTargets[_a0].length;i++){
var _a3=document.getElementById(wFORMS.switchTargets[_a0][i]);
if(_a3){
_a1.push(_a3);
}
}
}
return _a1;
},isTriggerOn:function(_a4,_a5){
if(!_a4){
return false;
}
if(_a4.tagName.toUpperCase()=="OPTION"){
var _a6=_a4.parentNode;
while(_a6&&_a6.tagName.toUpperCase()!="SELECT"){
var _a6=_a6.parentNode;
}
if(!_a6){
return false;
}
if(_a6.selectedIndex==-1){
return false;
}
if(wFORMS.helpers.hasClass(_a6.options[_a6.selectedIndex],wFORMS.classNamePrefix_switch+"-"+_a5)){
return true;
}
}else{
if(_a4.checked||wFORMS.helpers.hasClass(_a4,wFORMS.className_switchIsOn)){
return true;
}
}
return false;
},isWithinSwitchScope:function(_a7,_a8){
if(wFORMS.hasBehavior("repeat")&&wFORMS.limitSwitchScope==true){
var _a9=_a7;
while(_a9&&_a9.tagName&&_a9.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_a9,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_a9,wFORMS.className_delete)){
_a9=_a9.parentNode;
}
if(wFORMS.helpers.hasClass(_a9,wFORMS.className_repeat)||wFORMS.helpers.hasClass(_a9,wFORMS.className_delete)){
var _aa=_a8;
while(_aa&&_aa.tagName&&_aa.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_aa,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_aa,wFORMS.className_delete)){
_aa=_aa.parentNode;
}
if(_a9==_aa){
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
wFORMS.behaviors["validation"]={errMsg_required:"This field is required. ",errMsg_alpha:"The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed.",errMsg_email:"This does not appear to be a valid email address.",errMsg_integer:"Please enter an integer.",errMsg_float:"Please enter a number (ex. 1.9).",errMsg_password:"Unsafe password. Your password should be between 4 and 12 characters long and use a combinaison of upper-case and lower-case letters.",errMsg_alphanum:"Please use alpha-numeric characters only [a-z 0-9].",errMsg_date:"This does not appear to be a valid date.",errMsg_notification:"%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided.",errMsg_custom:"Please enter a valid value.",className_allRequired:"allrequired",jumpToErrorOnPage:null,currentPageIndex:-1,submitSwitchedOffFields:false,switchedOffFields:[],evaluate:function(_ab){
if(_ab.tagName.toUpperCase()=="FORM"){
if(wFORMS.functionName_formValidation.toString()==wFORMS.functionName_formValidation){
wFORMS.functionName_formValidation=eval(wFORMS.functionName_formValidation);
}
wFORMS.helpers.addEvent(_ab,"submit",wFORMS.functionName_formValidation);
}
},init:function(){
},run:function(e){
var _ad=wFORMS.helpers.getSourceElement(e);
if(!_ad){
_ad=e;
}
var _ae=arguments[1]?arguments[1]:(wFORMS.hasBehavior("paging")&&wFORMS.behaviors["paging"].behaviorInUse);
wFORMS.behaviors["validation"].jumpToErrorOnPage=null;
if(wFORMS.preventSubmissionOnEnter){
if(_ad.type&&_ad.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
}
while(_ad&&_ad.tagName.toUpperCase()!="FORM"){
_ad=_ad.parentNode;
}
var _af=wFORMS.behaviors["validation"].validateElement(_ad,_ae,true);
wFORMS.behaviors["validation"].errorCount=_af;
if(_af>0){
if(wFORMS.behaviors["validation"].jumpToErrorOnPage){
wFORMS.behaviors["paging"].gotoPage(wFORMS.behaviors["validation"].jumpToErrorOnPage);
}
if(wFORMS.showAlertOnError){
wFORMS.behaviors["validation"].showAlert(_af);
}
return wFORMS.helpers.preventEvent(e);
}
if(!wFORMS.behaviors["validation"].submitSwitchedOffFields){
for(var i=0;i<wFORMS.behaviors["validation"].switchedOffFields.length;i++){
var _ad=wFORMS.behaviors["validation"].switchedOffFields[i];
while(_ad.childNodes[0]){
_ad.removeChild(_ad.childNodes[0]);
}
}
}
return true;
},remove:function(){
},validateElement:function(_b1){
var _b2=arguments.length>2?arguments[2]:true;
var _b3=arguments[1]?arguments[1]:false;
var _b4=wFORMS.behaviors["validation"];
if(wFORMS.hasBehavior("switch")&&wFORMS.helpers.hasClassPrefix(_b1,wFORMS.classNamePrefix_offState)){
if(!_b4.submitSwitchedOffFields){
_b4.switchedOffFields.push(_b1);
}
return 0;
}
if(wFORMS.hasBehavior("paging")&&wFORMS.helpers.hasClass(_b1,wFORMS.className_paging)){
if(!wFORMS.helpers.hasClass(_b1,wFORMS.className_pagingCurrent)&&_b3){
return 0;
}
_b4.currentPageIndex=wFORMS.behaviors["paging"].getPageIndex(_b1);
}
var _b5=0;
if(!_b4.checkRequired(_b1)){
_b4.showError(_b1,_b4.errMsg_required);
_b5++;
}else{
if(wFORMS.helpers.hasClassPrefix(_b1,wFORMS.classNamePrefix_validation)){
var _b6=_b1.className.split(" ");
for(j=0;j<_b6.length;j++){
switch(_b6[j]){
case "validate-alpha":
if(!_b4.isAlpha(_b1.value)){
_b4.showError(_b1,_b4.errMsg_alpha);
_b5++;
}
break;
case "validate-alphanum":
if(!_b4.isAlphaNum(_b1.value)){
_b4.showError(_b1,_b4.errMsg_alphanum);
_b5++;
}
break;
case "validate-date":
if(!_b4.isDate(_b1.value)){
_b4.showError(_b1,_b4.errMsg_date);
_b5++;
}
break;
case "validate-time":
break;
case "validate-email":
if(!_b4.isEmail(_b1.value)){
_b4.showError(_b1,_b4.errMsg_email);
_b5++;
}
break;
case "validate-integer":
if(!_b4.isInteger(_b1.value)){
_b4.showError(_b1,_b4.errMsg_integer);
_b5++;
}
break;
case "validate-float":
if(!_b4.isFloat(_b1.value)){
_b4.showError(_b1,_b4.errMsg_float);
_b5++;
}
break;
case "validate-strongpassword":
if(!_b4.isPassword(_b1.value)){
_b4.showError(_b1,_b4.errMsg_password);
_b5++;
}
break;
case "validate-custom":
var _b7=new RegExp("/([^/]*)/([gi]*)");
var _b8=_b1.className.match(_b7);
if(_b8[0]){
var _b9=new RegExp(_b8[1],_b8[2]);
if(!_b1.value.match(_b9)){
_b4.showError(_b1,_b4.errMsg_custom);
_b5++;
}
}
break;
}
}
}
}
if(_b5==0){
_b4.removeErrorMessage(_b1);
}else{
if(_b4.currentPageIndex>0&&!_b4.jumpToErrorOnPage){
_b4.jumpToErrorOnPage=_b4.currentPageIndex;
}
}
if(_b2){
for(var i=0;i<_b1.childNodes.length;i++){
if(_b1.childNodes[i].nodeType==1){
_b5+=_b4.validateElement(_b1.childNodes[i],_b3,_b2);
}
}
}
return _b5;
},checkRequired:function(_bb){
var _bc=wFORMS.behaviors["validation"];
if(wFORMS.helpers.hasClass(_bb,wFORMS.className_required)){
switch(_bb.tagName.toUpperCase()){
case "INPUT":
var _bd=_bb.getAttribute("type");
if(!_bd){
_bd="text";
}
switch(_bd.toLowerCase()){
case "checkbox":
return _bb.checked;
break;
case "radio":
return _bb.checked;
break;
default:
return !_bc.isEmpty(_bb.value);
}
break;
case "SELECT":
if(_bb.selectedIndex==-1){
return false;
}else{
return !_bc.isEmpty(_bb.options[_bb.selectedIndex].value);
}
break;
case "TEXTAREA":
return !_bc.isEmpty(_bb.value);
break;
default:
return _bc.checkOneRequired(_bb);
break;
}
}else{
if(wFORMS.helpers.hasClass(_bb,_bc.className_allRequired)){
return _bc.checkAllRequired(_bb);
}
}
return true;
},checkOneRequired:function(_be){
if(_be.nodeType!=1){
return false;
}
var _bf=_be.tagName.toUpperCase();
var _c0=wFORMS.behaviors["validation"];
if(_bf=="INPUT"||_bf=="SELECT"||_bf=="TEXTAREA"){
var _c1=_c0.getFieldValue(_be);
if(!_c0.isEmpty(_c1)){
return true;
}
}
for(var i=0;i<_be.childNodes.length;i++){
if(_c0.checkOneRequired(_be.childNodes[i])){
return true;
}
}
return false;
},checkAllRequired:function(_c3){
if(_c3.nodeType!=1){
return true;
}
var _c4=_c3.tagName.toUpperCase();
var _c5=wFORMS.behaviors["validation"];
if(_c4=="INPUT"||_c4=="SELECT"||_c4=="TEXTAREA"){
var _c6=_c5.getFieldValue(_c3);
if(_c5.isEmpty(_c6)){
return false;
}
}
for(var i=0;i<_c3.childNodes.length;i++){
if(!_c5.checkAllRequired(_c3.childNodes[i])){
return false;
}
}
return true;
},getFieldValue:function(_c8){
var _c9=null;
if(_c8&&_c8.tagName){
if(_c8.tagName.toUpperCase()=="INPUT"){
var _ca=_c8.getAttribute("type");
if(!_ca){
_ca="text";
}
switch(_ca.toLowerCase()){
case "checkbox":
_c9=_c8.checked?_c8.value:null;
break;
case "radio":
var _cb=_c8.form[_c8.name];
for(var i=0;i<_cb.length;i++){
if(_cb[i].checked){
if(!_c9){
_c9=new Array();
}
_c9[_c9.length]=_cb[i].value;
}
}
break;
default:
_c9=_c8.value;
}
}else{
if(_c8.tagName.toUpperCase()=="SELECT"){
if(_c8.selectedIndex!=-1){
_c9=_c8.options[_c8.selectedIndex].value;
}else{
_c9=null;
}
}else{
if(_c8.tagName.toUpperCase()=="TEXTAREA"){
_c9=_c8.value;
}
}
}
}
return _c9;
},isEmpty:function(s){
var _ce=/^\s+$/;
return ((s==null)||(s.length==0)||_ce.test(s));
},isAlpha:function(s){
var _d0=/^[a-zA-Z\s]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_d0.test(s);
},isAlphaNum:function(s){
var _d2=/^[\w\s]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_d2.test(s);
},isDate:function(s){
var _d4=new Date(s);
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(_d4);
},isEmail:function(s){
var _d6=/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_d6.test(s);
},isInteger:function(s){
var _d8=/^[+]?\d+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_d8.test(s);
},isFloat:function(s){
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(parseFloat(s));
},isPassword:function(s){
return wFORMS.behaviors["validation"].isEmpty(s);
},showError:function(_db,_dc){
wFORMS.behaviors["validation"].removeErrorMessage(_db);
if(!_db.id){
_db.id=wFORMS.helpers.randomId();
}
_db.className+=" "+wFORMS.className_validationError_fld;
var _dd=document.createTextNode(" "+_dc);
var fe=document.getElementById(_db.id+wFORMS.idSuffix_fieldError);
if(!fe){
fe=document.createElement("div");
fe.setAttribute("id",_db.id+wFORMS.idSuffix_fieldError);
var fl=document.getElementById(_db.id+wFORMS.idSuffix_fieldLabel);
if(fl){
fl.parentNode.insertBefore(fe,fl.nextSibling);
}else{
_db.parentNode.insertBefore(fe,_db.nextSibling);
}
}
fe.appendChild(_dd);
fe.className+=" "+wFORMS.className_validationError_msg;
},showAlert:function(_e0){
alert(wFORMS.behaviors["validation"].errMsg_notification.replace("%%",_e0));
},removeErrorMessage:function(_e1){
if(wFORMS.helpers.hasClass(_e1,wFORMS.className_validationError_fld)){
var _e2=new RegExp(wFORMS.className_validationError_fld,"gi");
_e1.className=_e1.className.replace(_e2,"");
var _e3=document.getElementById(_e1.id+wFORMS.idSuffix_fieldError);
if(_e3){
_e3.innerHTML="";
}
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

