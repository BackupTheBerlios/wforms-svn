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
wFORMS.behaviors["paging"]={idSuffix_buttonsPlaceholder:"-buttons",className_pageNextButton:wFORMS.className_pagingButtons+" wfPageNextButton",className_pagePreviousButton:wFORMS.className_pagingButtons+" wfPagePreviousButton",behaviorInUse:false,onPageChange:null,evaluate:function(_34){
if(wFORMS.helpers.hasClass(_34,wFORMS.className_paging)){
wFORMS.behaviors["paging"].behaviorInUse=true;
var _35=wFORMS.behaviors["paging"].getPageIndex(_34);
if(_35>1){
var _36=this.getButtonPlaceholder(_34);
var _37=_36.insertBefore(this.createPreviousPageButton(),_36.firstChild);
wFORMS.helpers.addEvent(_37,"click",wFORMS.behaviors["paging"].pagingPrevious);
}else{
_34.className+=" "+wFORMS.className_pagingCurrent;
var _38=wFORMS.behaviors["paging"].getFormElement(_34);
wFORMS.behaviors["paging"].hideSubmitButton(_38);
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
while(_5b&&_5b.tagName.toUpperCase()!="FORM"){
_5b=_5b.parentNode;
}
return _5b;
},getPageElement:function(_5c){
var n=_5c.parentNode;
while(n&&(!n.className||!wFORMS.helpers.hasClass(n,wFORMS.className_paging))){
n=n.parentNode;
}
return n;
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
_60=document.createElement("a");
var _61=document.createElement("span");
var _62=document.createTextNode(wFORMS.arrMsg[0]);
_60.setAttribute("href","#");
_60.className=wFORMS.className_duplicateLink;
_60.setAttribute("title",wFORMS.arrMsg[1]);
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
_61.appendChild(_62);
_60.appendChild(_61);
}
var _64=document.getElementById(_5f.id+wFORMS.idSuffix_repeatCounter);
if(!_64){
if(document.all&&!window.opera){
var _65=_5f.id+wFORMS.idSuffix_repeatCounter;
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
_64=document.createElement("INPUT NAME=\""+_65+"\"");
}else{
_64=document.createElement("<INPUT NAME=\""+_65+"\"></INPUT>");
}
_64.type="hidden";
_64.id=_65;
_64.value="1";
}else{
_64=document.createElement("INPUT");
_64.setAttribute("type","hidden");
_64.setAttribute("value","1");
_64.setAttribute("name",_5f.id+wFORMS.idSuffix_repeatCounter);
_64.setAttribute("id",_5f.id+wFORMS.idSuffix_repeatCounter);
}
var _66=_5f.parentNode;
while(_66&&_66.tagName.toUpperCase()!="FORM"){
_66=_66.parentNode;
}
_66.appendChild(_64);
}
wFORMS.helpers.addEvent(_60,"click",wFORMS.behaviors["repeat"].duplicateFieldGroup);
}
if(wFORMS.helpers.hasClass(_5f,wFORMS.className_delete)){
var _67=document.createElement("a");
var _61=document.createElement("span");
var _62=document.createTextNode(wFORMS.arrMsg[2]);
_67.setAttribute("href","#");
_67.className=wFORMS.className_removeLink;
_67.setAttribute("title",wFORMS.arrMsg[3]);
if(_5f.tagName.toUpperCase()=="TR"){
var n=_5f.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_67);
}
}else{
_5f.appendChild(_67);
}
_61.appendChild(_62);
_67.appendChild(_61);
wFORMS.helpers.addEvent(_67,"click",wFORMS.behaviors["repeat"].removeFieldGroup);
}
},duplicateFieldGroup:function(e){
var _69=wFORMS.helpers.getSourceElement(e);
if(!_69){
_69=e;
}
var _6a=wFORMS.helpers.hasClass(_69,wFORMS.className_preserveRadioName)?true:wFORMS.preserveRadioName;
var _69=_69.parentNode;
while(_69&&!wFORMS.helpers.hasClass(_69,wFORMS.className_repeat)){
_69=_69.parentNode;
}
if(_69){
var _6b=wFORMS.behaviors["repeat"];
if(_6b.allowRepeat){
if(!_6b.allowRepeat(_69)){
return false;
}
}
counterField=document.getElementById(_69.id+wFORMS.idSuffix_repeatCounter);
if(!counterField){
return;
}
var _6c=parseInt(counterField.value)+1;
var _6d="-"+_6c.toString();
var _6e=_6b.replicateTree(_69,null,_6d,_6a);
var _6f=_69.nextSibling;
while(_6f&&(_6f.nodeType==3||wFORMS.helpers.hasClass(_6f,wFORMS.className_delete))){
_6f=_6f.nextSibling;
}
_69.parentNode.insertBefore(_6e,_6f);
_6e.className=_69.className.replace(wFORMS.className_repeat,wFORMS.className_delete);
document.getElementById(_69.id+wFORMS.idSuffix_repeatCounter).value=_6c;
wFORMS.addBehaviors(_6e);
if(_6b.onRepeat){
_6b.onRepeat(_69,_6e);
}
}
return wFORMS.helpers.preventEvent(e);
},removeFieldGroup:function(e){
var _71=wFORMS.helpers.getSourceElement(e);
if(!_71){
_71=e;
}
var _71=_71.parentNode;
while(_71&&!wFORMS.helpers.hasClass(_71,wFORMS.className_delete)){
_71=_71.parentNode;
}
_71.parentNode.removeChild(_71);
if(wFORMS.behaviors["repeat"].onRemove){
wFORMS.behaviors["repeat"].onRemove(_71);
}
return wFORMS.helpers.preventEvent(e);
},removeRepeatCountSuffix:function(str){
return str.replace(/-\d+$/,"");
},replicateTree:function(_73,_74,_75,_76){
if(_73.nodeType==3){
if(_73.parentNode.tagName.toUpperCase()!="TEXTAREA"){
var _77=document.createTextNode(_73.data);
}
}else{
if(_73.nodeType==1){
if(wFORMS.helpers.hasClass(_73,wFORMS.className_duplicateLink)||wFORMS.helpers.hasClass(_73,wFORMS.className_removeLink)){
return null;
}
if(wFORMS.helpers.hasClass(_73,wFORMS.className_delete)){
return null;
}
if(wFORMS.helpers.hasClass(_73,wFORMS.className_repeat)&&_74!=null){
_75=_75.replace("-","__");
}
if(!document.all||window.opera){
var _77=document.createElement(_73.tagName);
}else{
var _78=_73.tagName;
if(_73.name){
if(_73.tagName.toUpperCase()=="INPUT"&&_73.type.toLowerCase()=="radio"&&_76){
_78+=" NAME='"+_73.name+"' ";
}else{
_78+=" NAME='"+wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_73.name)+_75+"' ";
}
}
if(_73.type){
_78+=" TYPE='"+_73.type+"' ";
}
if(_73.selected){
_78+=" SELECTED='SELECTED' ";
}
if(_73.checked){
_78+=" CHECKED='CHECKED' ";
}
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
var _77=document.createElement(_78);
}else{
var _77=document.createElement("<"+_78+"></"+_73.tagName+">");
}
try{
_77.type=_73.type;
}
catch(e){
}
}
for(var i=0;i<_73.attributes.length;i++){
var _7a=_73.attributes[i];
if(_7a.specified||_7a.nodeName.toLowerCase()=="value"){
if(_7a.nodeName.toLowerCase()=="id"||_7a.nodeName.toLowerCase()=="name"||_7a.nodeName.toLowerCase()=="for"){
if(wFORMS.hasBehavior("hint")&&_7a.nodeValue.indexOf(wFORMS.idSuffix_fieldHint)!=-1){
var _7b=_7a.nodeValue;
_7b=wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_7b.substr(0,_7b.indexOf(wFORMS.idSuffix_fieldHint)))+_75+wFORMS.idSuffix_fieldHint;
}else{
if(_73.tagName.toUpperCase()=="INPUT"&&_73.getAttribute("type",false).toLowerCase()=="radio"&&_7a.nodeName.toLowerCase()=="name"&&_76){
var _7b=_7a.nodeValue;
}else{
var _7b=_7a.nodeValue+_75;
}
}
}else{
if(_7a.nodeName.toLowerCase()=="value"&&_73.tagName.toUpperCase()=="INPUT"&&(_73.type.toLowerCase()=="text"||_73.type.toLowerCase()=="password"||_73.type.toLowerCase()=="hidden"||_73.type.toLowerCase()=="file")){
var _7b="";
}else{
if(_7a.nodeName.toLowerCase()=="rel"&&_7a.nodeValue.indexOf("wfHandled")!=-1){
var _7b=_7a.nodeValue.replace("wfHandled","");
}else{
var _7b=_7a.nodeValue;
}
}
}
switch(_7a.nodeName.toLowerCase()){
case "class":
_77.className=_7b;
break;
case "style":
if(_73.style&&_73.style.cssText){
_77.style.cssText=_73.style.cssText;
}
break;
case "onclick":
_77.onclick=_73.onclick;
break;
case "onchange":
_77.onchange=_73.onchange;
break;
case "onsubmit":
_77.onsubmit=_73.onsubmit;
break;
case "onmouseover":
_77.onmouseover=_73.onmouseover;
break;
case "onmouseout":
_77.onmouseout=_73.onmouseout;
break;
case "onmousedown":
_77.onmousedown=_73.onmousedown;
break;
case "onmouseup":
_77.onmouseup=_73.onmouseup;
break;
case "ondblclick":
_77.ondblclick=_73.ondblclick;
break;
case "onkeydown":
_77.onkeydown=_73.onkeydown;
break;
case "onkeyup":
_77.onkeyup=_73.onkeyup;
break;
case "onblur":
_77.onblur=_73.onblur;
break;
case "onfocus":
_77.onfocus=_73.onfocus;
break;
default:
_77.setAttribute(_7a.name,_7b,0);
}
}
}
}
}
if(_74&&_77){
_74.appendChild(_77);
}
for(var i=0;i<_73.childNodes.length;i++){
wFORMS.behaviors["repeat"].replicateTree(_73.childNodes[i],_77,_75,_76);
}
return _77;
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
wFORMS.behaviors["switch"]={evaluate:function(_7c){
if(wFORMS.helpers.hasClassPrefix(_7c,wFORMS.classNamePrefix_switch)){
if(!_7c.id){
_7c.id=wFORMS.helpers.randomId();
}
var _7d=wFORMS.behaviors["switch"].getSwitchNames(_7c);
for(var i=0;i<_7d.length;i++){
if(!wFORMS.switchTriggers[_7d[i]]){
wFORMS.switchTriggers[_7d[i]]=new Array();
}
if(!wFORMS.switchTriggers[_7d[i]][_7c.id]){
wFORMS.switchTriggers[_7d[i]].push(_7c.id);
}
}
switch(_7c.tagName.toUpperCase()){
case "OPTION":
var _7f=_7c.parentNode;
while(_7f&&_7f.tagName.toUpperCase()!="SELECT"){
var _7f=_7f.parentNode;
}
if(!_7f){
alert("Error: invalid markup in SELECT field ?");
return false;
}
if(!_7f.id){
_7f.id=wFORMS.helpers.randomId();
}
if(!_7f.getAttribute("rel")||_7f.getAttribute("rel").indexOf("wfHandled")==-1){
_7f.setAttribute("rel",(_7f.getAttribute("rel")||"")+" wfHandled");
wFORMS.helpers.addEvent(_7f,"change",wFORMS.behaviors["switch"].run);
}
break;
case "INPUT":
if(_7c.type&&_7c.type.toLowerCase()=="radio"){
var _80=_7c.form;
for(var j=0;j<_80[_7c.name].length;j++){
var _82=_80[_7c.name][j];
if(_82.type.toLowerCase()=="radio"){
if(!_82.getAttribute("rel")||_82.getAttribute("rel").indexOf("wfHandled")==-1){
wFORMS.helpers.addEvent(_82,"click",wFORMS.behaviors["switch"].run);
_82.setAttribute("rel",(_82.getAttribute("rel")||"")+" wfHandled");
}
}
}
}else{
wFORMS.helpers.addEvent(_7c,"click",wFORMS.behaviors["switch"].run);
}
break;
default:
wFORMS.helpers.addEvent(_7c,"click",wFORMS.behaviors["switch"].run);
break;
}
}
if(wFORMS.helpers.hasClassPrefix(_7c,wFORMS.classNamePrefix_offState)||wFORMS.helpers.hasClassPrefix(_7c,wFORMS.classNamePrefix_onState)){
if(!_7c.id){
_7c.id=wFORMS.helpers.randomId();
}
var _7d=wFORMS.behaviors["switch"].getSwitchNames(_7c);
for(var i=0;i<_7d.length;i++){
if(!wFORMS.switchTargets[_7d[i]]){
wFORMS.switchTargets[_7d[i]]=new Array();
}
if(!wFORMS.switchTargets[_7d[i]][_7c.id]){
wFORMS.switchTargets[_7d[i]].push(_7c.id);
}
}
}
if(_7c.tagName&&_7c.tagName.toUpperCase()=="FORM"){
wFORMS.onLoadComplete.push(wFORMS.behaviors["switch"].init);
}
},init:function(){
for(var _83 in wFORMS.switchTriggers){
for(var i=0;i<wFORMS.switchTriggers[_83].length;i++){
var _85=document.getElementById(wFORMS.switchTriggers[_83][i]);
if(wFORMS.behaviors["switch"].isTriggerOn(_85,_83)){
if(_85.tagName.toUpperCase()=="OPTION"){
var _85=_85.parentNode;
while(_85&&_85.tagName.toUpperCase()!="SELECT"){
var _85=_85.parentNode;
}
}
wFORMS.behaviors["switch"].run(_85);
}
}
}
},run:function(e){
var _87=wFORMS.helpers.getSourceElement(e);
if(!_87){
_87=e;
}
var _88=new Array();
var _89=new Array();
switch(_87.tagName.toUpperCase()){
case "SELECT":
for(var i=0;i<_87.options.length;i++){
if(i==_87.selectedIndex){
_88=_88.concat(wFORMS.behaviors["switch"].getSwitchNames(_87.options[i]));
}else{
_89=_89.concat(wFORMS.behaviors["switch"].getSwitchNames(_87.options[i]));
}
}
break;
case "INPUT":
if(_87.type.toLowerCase()=="radio"){
for(var i=0;i<_87.form[_87.name].length;i++){
var _8b=_87.form[_87.name][i];
if(_8b.checked){
_88=_88.concat(wFORMS.behaviors["switch"].getSwitchNames(_8b));
}else{
_89=_89.concat(wFORMS.behaviors["switch"].getSwitchNames(_8b));
}
}
}else{
if(_87.checked||wFORMS.helpers.hasClass(_87,wFORMS.className_switchIsOn)){
_88=_88.concat(wFORMS.behaviors["switch"].getSwitchNames(_87));
}else{
_89=_89.concat(wFORMS.behaviors["switch"].getSwitchNames(_87));
}
}
break;
default:
break;
}
for(var i=0;i<_89.length;i++){
var _8c=wFORMS.behaviors["switch"].getElementsBySwitchName(_89[i]);
for(var j=0;j<_8c.length;j++){
var _8e=wFORMS.switchTriggers[_89[i]];
var _8f=true;
for(var k=0;k<_8e.length;k++){
var _91=document.getElementById(_8e[k]);
if(wFORMS.behaviors["switch"].isTriggerOn(_91,_89[i])){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_91,_8c[j])){
_8f=false;
}
}
}
if(_8f){
wFORMS.behaviors["switch"].switchState(_8c[j],wFORMS.classNamePrefix_onState,wFORMS.classNamePrefix_offState);
}
}
}
for(var i=0;i<_88.length;i++){
var _8c=wFORMS.behaviors["switch"].getElementsBySwitchName(_88[i]);
for(var j=0;j<_8c.length;j++){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_87,_8c[j])){
wFORMS.behaviors["switch"].switchState(_8c[j],wFORMS.classNamePrefix_offState,wFORMS.classNamePrefix_onState);
}
}
}
},clear:function(e){
wFORMS.switchTriggers={};
wFORMS.switchTargets={};
},getSwitchNames:function(_93){
var _94=new Array();
var _95=_93.className.split(" ");
for(var i=0;i<_95.length;i++){
if(_95[i].indexOf(wFORMS.classNamePrefix_switch)==0){
_94.push(_95[i].substr(wFORMS.classNamePrefix_switch.length+1));
}
if(_95[i].indexOf(wFORMS.classNamePrefix_onState)==0){
_94.push(_95[i].substr(wFORMS.classNamePrefix_onState.length+1));
}else{
if(_95[i].indexOf(wFORMS.classNamePrefix_offState)==0){
_94.push(_95[i].substr(wFORMS.classNamePrefix_offState.length+1));
}
}
}
return _94;
},switchState:function(_97,_98,_99){
if(!_97||_97.nodeType!=1){
return;
}
if(_97.className){
_97.className=_97.className.replace(_98,_99);
}
if(wFORMS.helpers.hasClass(_97,wFORMS.className_switchIsOff)){
_97.className=_97.className.replace(wFORMS.className_switchIsOff,wFORMS.className_switchIsOn);
}else{
if(wFORMS.helpers.hasClass(_97,wFORMS.className_switchIsOn)){
_97.className=_97.className.replace(wFORMS.className_switchIsOn,wFORMS.className_switchIsOff);
}
}
},getElementsBySwitchName:function(_9a){
var _9b=new Array();
if(wFORMS.switchTargets[_9a]){
for(var i=0;i<wFORMS.switchTargets[_9a].length;i++){
var _9d=document.getElementById(wFORMS.switchTargets[_9a][i]);
if(_9d){
_9b.push(_9d);
}
}
}
return _9b;
},isTriggerOn:function(_9e,_9f){
if(!_9e){
return false;
}
if(_9e.tagName.toUpperCase()=="OPTION"){
var _a0=_9e.parentNode;
while(_a0&&_a0.tagName.toUpperCase()!="SELECT"){
var _a0=_a0.parentNode;
}
if(!_a0){
return false;
}
if(_a0.selectedIndex==-1){
return false;
}
if(wFORMS.helpers.hasClass(_a0.options[_a0.selectedIndex],wFORMS.classNamePrefix_switch+"-"+_9f)){
return true;
}
}else{
if(_9e.checked||wFORMS.helpers.hasClass(_9e,wFORMS.className_switchIsOn)){
return true;
}
}
return false;
},isWithinSwitchScope:function(_a1,_a2){
if(wFORMS.hasBehavior("repeat")&&wFORMS.limitSwitchScope==true){
var _a3=_a1;
while(_a3&&_a3.tagName&&_a3.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_a3,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_a3,wFORMS.className_delete)){
_a3=_a3.parentNode;
}
if(wFORMS.helpers.hasClass(_a3,wFORMS.className_repeat)||wFORMS.helpers.hasClass(_a3,wFORMS.className_delete)){
var _a4=_a2;
while(_a4&&_a4.tagName&&_a4.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_a4,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_a4,wFORMS.className_delete)){
_a4=_a4.parentNode;
}
if(_a3==_a4){
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
wFORMS.behaviors["validation"]={errMsg_required:"This field is required. ",errMsg_alpha:"The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed.",errMsg_email:"This does not appear to be a valid email address.",errMsg_integer:"Please enter an integer.",errMsg_float:"Please enter a number (ex. 1.9).",errMsg_password:"Unsafe password. Your password should be between 4 and 12 characters long and use a combinaison of upper-case and lower-case letters.",errMsg_alphanum:"Please use alpha-numeric characters only [a-z 0-9].",errMsg_date:"This does not appear to be a valid date.",errMsg_notification:"%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided.",errMsg_custom:"Please enter a valid value.",className_allRequired:"allrequired",jumpToErrorOnPage:null,currentPageIndex:-1,evaluate:function(_a5){
if(_a5.tagName.toUpperCase()=="FORM"){
if(wFORMS.functionName_formValidation.toString()==wFORMS.functionName_formValidation){
wFORMS.functionName_formValidation=eval(wFORMS.functionName_formValidation);
}
wFORMS.helpers.addEvent(_a5,"submit",wFORMS.functionName_formValidation);
}
},init:function(){
},run:function(e){
var _a7=wFORMS.helpers.getSourceElement(e);
if(!_a7){
_a7=e;
}
var _a8=arguments[1]?arguments[1]:(wFORMS.hasBehavior("paging")&&wFORMS.behaviors["paging"].behaviorInUse);
wFORMS.behaviors["validation"].jumpToErrorOnPage=null;
if(wFORMS.preventSubmissionOnEnter){
if(_a7.type&&_a7.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
}
while(_a7&&_a7.tagName.toUpperCase()!="FORM"){
_a7=_a7.parentNode;
}
var _a9=wFORMS.behaviors["validation"].validateElement(_a7,_a8,true);
wFORMS.behaviors["validation"].errorCount=_a9;
if(_a9>0){
if(wFORMS.behaviors["validation"].jumpToErrorOnPage){
wFORMS.behaviors["paging"].gotoPage(wFORMS.behaviors["validation"].jumpToErrorOnPage);
}
if(wFORMS.showAlertOnError){
wFORMS.behaviors["validation"].showAlert(_a9);
}
return wFORMS.helpers.preventEvent(e);
}
return true;
},remove:function(){
},validateElement:function(_aa){
var _ab=arguments.length>2?arguments[2]:true;
var _ac=arguments[1]?arguments[1]:false;
var _ad=wFORMS.behaviors["validation"];
if(wFORMS.hasBehavior("switch")&&wFORMS.helpers.hasClassPrefix(_aa,wFORMS.classNamePrefix_offState)){
return 0;
}
if(wFORMS.hasBehavior("paging")&&wFORMS.helpers.hasClass(_aa,wFORMS.className_paging)){
if(!wFORMS.helpers.hasClass(_aa,wFORMS.className_pagingCurrent)&&_ac){
return 0;
}
_ad.currentPageIndex=wFORMS.behaviors["paging"].getPageIndex(_aa);
}
var _ae=0;
if(!_ad.checkRequired(_aa)){
_ad.showError(_aa,_ad.errMsg_required);
_ae++;
}else{
if(wFORMS.helpers.hasClassPrefix(_aa,wFORMS.classNamePrefix_validation)){
var _af=_aa.className.split(" ");
for(j=0;j<_af.length;j++){
switch(_af[j]){
case "validate-alpha":
if(!_ad.isAlpha(_aa.value)){
_ad.showError(_aa,_ad.errMsg_alpha);
_ae++;
}
break;
case "validate-alphanum":
if(!_ad.isAlphaNum(_aa.value)){
_ad.showError(_aa,_ad.errMsg_alphanum);
_ae++;
}
break;
case "validate-date":
if(!_ad.isDate(_aa.value)){
_ad.showError(_aa,_ad.errMsg_date);
_ae++;
}
break;
case "validate-time":
break;
case "validate-email":
if(!_ad.isEmail(_aa.value)){
_ad.showError(_aa,_ad.errMsg_email);
_ae++;
}
break;
case "validate-integer":
if(!_ad.isInteger(_aa.value)){
_ad.showError(_aa,_ad.errMsg_integer);
_ae++;
}
break;
case "validate-float":
if(!_ad.isFloat(_aa.value)){
_ad.showError(_aa,_ad.errMsg_float);
_ae++;
}
break;
case "validate-strongpassword":
if(!_ad.isPassword(_aa.value)){
_ad.showError(_aa,_ad.errMsg_password);
_ae++;
}
break;
case "validate-custom":
var _b0=new RegExp("/([^/]*)/([gi]*)");
var _b1=_aa.className.match(_b0);
if(_b1[0]){
var _b2=new RegExp(_b1[1],_b1[2]);
if(!_aa.value.match(_b2)){
_ad.showError(_aa,_ad.errMsg_custom);
_ae++;
}
}
break;
}
}
}
}
if(_ae==0){
_ad.removeErrorMessage(_aa);
}else{
if(_ad.currentPageIndex>0&&!_ad.jumpToErrorOnPage){
_ad.jumpToErrorOnPage=_ad.currentPageIndex;
}
}
if(_ab){
for(var i=0;i<_aa.childNodes.length;i++){
if(_aa.childNodes[i].nodeType==1){
_ae+=_ad.validateElement(_aa.childNodes[i],_ac,_ab);
}
}
}
return _ae;
},checkRequired:function(_b4){
var _b5=wFORMS.behaviors["validation"];
if(wFORMS.helpers.hasClass(_b4,wFORMS.className_required)){
switch(_b4.tagName.toUpperCase()){
case "INPUT":
var _b6=_b4.getAttribute("type");
if(!_b6){
_b6="text";
}
switch(_b6.toLowerCase()){
case "checkbox":
return _b4.checked;
break;
case "radio":
return _b4.checked;
break;
default:
return !_b5.isEmpty(_b4.value);
}
break;
case "SELECT":
if(_b4.selectedIndex==-1){
return false;
}else{
return !_b5.isEmpty(_b4.options[_b4.selectedIndex].value);
}
break;
case "TEXTAREA":
return !_b5.isEmpty(_b4.value);
break;
default:
return _b5.checkOneRequired(_b4);
break;
}
}else{
if(wFORMS.helpers.hasClass(_b4,_b5.className_allRequired)){
return _b5.checkAllRequired(_b4);
}
}
return true;
},checkOneRequired:function(_b7){
if(_b7.nodeType!=1){
return false;
}
var _b8=_b7.tagName.toUpperCase();
var _b9=wFORMS.behaviors["validation"];
if(_b8=="INPUT"||_b8=="SELECT"||_b8=="TEXTAREA"){
var _ba=_b9.getFieldValue(_b7);
if(!_b9.isEmpty(_ba)){
return true;
}
}
for(var i=0;i<_b7.childNodes.length;i++){
if(_b9.checkOneRequired(_b7.childNodes[i])){
return true;
}
}
return false;
},checkAllRequired:function(_bc){
if(_bc.nodeType!=1){
return true;
}
var _bd=_bc.tagName.toUpperCase();
var _be=wFORMS.behaviors["validation"];
if(_bd=="INPUT"||_bd=="SELECT"||_bd=="TEXTAREA"){
var _bf=_be.getFieldValue(_bc);
if(_be.isEmpty(_bf)){
return false;
}
}
for(var i=0;i<_bc.childNodes.length;i++){
if(!_be.checkAllRequired(_bc.childNodes[i])){
return false;
}
}
return true;
},getFieldValue:function(_c1){
var _c2=null;
if(_c1&&_c1.tagName){
if(_c1.tagName.toUpperCase()=="INPUT"){
var _c3=_c1.getAttribute("type");
if(!_c3){
_c3="text";
}
switch(_c3.toLowerCase()){
case "checkbox":
_c2=_c1.checked?_c1.value:null;
break;
case "radio":
var _c4=_c1.form[_c1.name];
for(var i=0;i<_c4.length;i++){
if(_c4[i].checked){
if(!_c2){
_c2=new Array();
}
_c2[_c2.length]=_c4[i].value;
}
}
break;
default:
_c2=_c1.value;
}
}else{
if(_c1.tagName.toUpperCase()=="SELECT"){
if(_c1.selectedIndex!=-1){
_c2=_c1.options[_c1.selectedIndex].value;
}else{
_c2=null;
}
}else{
if(_c1.tagName.toUpperCase()=="TEXTAREA"){
_c2=_c1.value;
}
}
}
}
return _c2;
},isEmpty:function(s){
var _c7=/^\s+$/;
return ((s==null)||(s.length==0)||_c7.test(s));
},isAlpha:function(s){
var _c9=/^[a-zA-Z\s]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_c9.test(s);
},isAlphaNum:function(s){
var _cb=/^[\w\s]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_cb.test(s);
},isDate:function(s){
var _cd=new Date(s);
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(_cd);
},isEmail:function(s){
var _cf=/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_cf.test(s);
},isInteger:function(s){
var _d1=/^[+]?\d+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_d1.test(s);
},isFloat:function(s){
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(parseFloat(s));
},isPassword:function(s){
return wFORMS.behaviors["validation"].isEmpty(s);
},showError:function(_d4,_d5){
wFORMS.behaviors["validation"].removeErrorMessage(_d4);
if(!_d4.id){
_d4.id=wFORMS.helpers.randomId();
}
_d4.className+=" "+wFORMS.className_validationError_fld;
var _d6=document.createTextNode(" "+_d5);
var fe=document.getElementById(_d4.id+wFORMS.idSuffix_fieldError);
if(!fe){
fe=document.createElement("div");
fe.setAttribute("id",_d4.id+wFORMS.idSuffix_fieldError);
var fl=document.getElementById(_d4.id+wFORMS.idSuffix_fieldLabel);
if(fl){
fl.parentNode.insertBefore(fe,fl.nextSibling);
}else{
_d4.parentNode.insertBefore(fe,_d4.nextSibling);
}
}
fe.appendChild(_d6);
fe.className+=" "+wFORMS.className_validationError_msg;
},showAlert:function(_d9){
alert(wFORMS.behaviors["validation"].errMsg_notification.replace("%%",_d9));
},removeErrorMessage:function(_da){
if(wFORMS.helpers.hasClass(_da,wFORMS.className_validationError_fld)){
var _db=new RegExp(wFORMS.className_validationError_fld,"gi");
_da.className=_da.className.replace(_db,"");
var _dc=document.getElementById(_da.id+wFORMS.idSuffix_fieldError);
if(_dc){
_dc.innerHTML="";
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

