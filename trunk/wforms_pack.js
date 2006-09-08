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
wFORMS.processedForm=document.forms[i];
wFORMS.addBehaviors(document.forms[i]);
}
},addBehaviors:function(_21){
if(!_21){
return;
}
var _22=arguments[1]?arguments[1]:true;
if(!_21.nodeType){
_21=document.getElementById(_21);
}
if(!_21||_21.nodeType!=1){
return;
}
_22=(arguments.length>1)?arguments[1]:true;
wFORMS._addBehaviors(_21,_22);
},_addBehaviors:function(_23,_24){
if(_23.getAttribute("rel")=="no-behavior"){
return false;
}
if(_23.nodeType==1){
for(var _25 in wFORMS.behaviors){
wFORMS.behaviors[_25].evaluate(_23);
}
if(_24){
for(var i=0,l=_23.childNodes.length,cn=_23.childNodes;i<l;i++){
if(cn[i].nodeType==1){
wFORMS._addBehaviors(cn[i],_24);
}
}
}
if(_23.tagName.toUpperCase()=="FORM"){
for(var i=0;i<wFORMS.onLoadComplete.length;i++){
wFORMS.onLoadComplete[i]();
}
if(wFORMS.onLoadComplete.length>0){
wFORMS.onLoadComplete=new Array();
}
}
}
},hasBehavior:function(_27){
if(wFORMS.behaviors[_27]){
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
var _29=document.getElementById("debugOutput");
if(!_29){
_29=document.createElement("div");
_29.id="debugOutput";
_29.style.position="absolute";
_29.style.right="10px";
_29.style.top="10px";
_29.style.zIndex="300";
_29.style.fontSize="x-small";
_29.style.fontFamily="courier";
_29.style.backgroundColor="#DDD";
_29.style.padding="5px";
if(document.body){
wFORMS.debugOutput=document.body.appendChild(_29);
}
}
if(wFORMS.debugOutput){
wFORMS.debugOutput.ondblclick=function(){
this.innerHTML="";
};
}
}};
wFORMS.NAME="wForms";
wFORMS.VERSION="2.1";
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
wFORMS.behaviors["hint"]={name:"hint",evaluate:function(_2a){
if(_2a.id){
if(_2a.id.indexOf(wFORMS.idSuffix_fieldHint)>0){
var id=_2a.id.replace(wFORMS.idSuffix_fieldHint,"");
var _2c=document.getElementById(id)||wFORMS.processedForm[id];
}
if(_2c){
if(_2c.length>0&&_2c[0].type=="radio"){
var _2d=_2c;
l=_2c.length;
}else{
var _2d=new Array(_2c);
l=1;
}
for(var i=0;i<l;i++){
_2c=_2d[i];
wFORMS.debug("hint/evaluate: "+(_2a.id||_2a.name));
switch(_2c.tagName.toUpperCase()){
case "SELECT":
case "TEXTAREA":
case "INPUT":
wFORMS.helpers.addEvent(_2c,"focus",wFORMS.behaviors["hint"].run);
wFORMS.helpers.addEvent(_2c,"blur",wFORMS.behaviors["hint"].remove);
break;
default:
wFORMS.helpers.addEvent(_2c,"mouseover",wFORMS.behaviors["hint"].run);
wFORMS.helpers.addEvent(_2c,"mouseout",wFORMS.behaviors["hint"].remove);
break;
}
}
}
}
},run:function(e){
var _30=wFORMS.helpers.getSourceElement(e);
var _31=document.getElementById(_30.id+wFORMS.idSuffix_fieldHint);
if(!_31){
_31=document.getElementById(_30.name+wFORMS.idSuffix_fieldHint);
}
if(_31){
_31.className=_31.className.replace(wFORMS.className_inactiveFieldHint,wFORMS.className_activeFieldHint);
_31.style.top=(wFORMS.helpers.getTop(_30)+_30.offsetHeight).toString()+"px";
if(_30.tagName.toUpperCase()=="SELECT"){
_31.style.left=(wFORMS.helpers.getLeft(_30)+(_30.offsetWidth-8)).toString()+"px";
}else{
_31.style.left=(wFORMS.helpers.getLeft(_30)).toString()+"px";
}
}
},remove:function(e){
var _33=wFORMS.helpers.getSourceElement(e);
var _34=document.getElementById(_33.id+wFORMS.idSuffix_fieldHint);
if(!_34){
_34=document.getElementById(_33.name+wFORMS.idSuffix_fieldHint);
}
if(_34){
_34.className=_34.className.replace(wFORMS.className_activeFieldHint,wFORMS.className_inactiveFieldHint);
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
wFORMS.behaviors["paging"]={idSuffix_buttonsPlaceholder:"-buttons",className_pageNextButton:wFORMS.className_pagingButtons+" wfPageNextButton",className_pagePreviousButton:wFORMS.className_pagingButtons+" wfPagePreviousButton",behaviorInUse:false,onPageChange:null,evaluate:function(_35){
if(wFORMS.helpers.hasClass(_35,wFORMS.className_paging)){
wFORMS.behaviors["paging"].behaviorInUse=true;
var _36=wFORMS.behaviors["paging"].getPageIndex(_35);
if(_36>1){
var _37=this.getButtonPlaceholder(_35);
var _38=_37.insertBefore(this.createPreviousPageButton(),_37.firstChild);
wFORMS.helpers.addEvent(_38,"click",wFORMS.behaviors["paging"].pagingPrevious);
}else{
_35.className+=" "+wFORMS.className_pagingCurrent;
var _39=wFORMS.behaviors["paging"].getFormElement(_35);
wFORMS.behaviors["paging"].hideSubmitButton(_39);
wFORMS.helpers.addEvent(_39,"submit",function(e){
var _3b=wFORMS.helpers.getSourceElement(e);
if(_3b.type&&_3b.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
});
wFORMS.preventSubmissionOnEnter=true;
}
if(document.getElementById(wFORMS.idPrefix_pageIndex+(_36+1).toString())){
var _37=this.getButtonPlaceholder(_35);
var _38=_37.appendChild(this.createNextPageButton());
wFORMS.helpers.addEvent(_38,"click",wFORMS.behaviors["paging"].pagingNext);
}
}
},getButtonPlaceholder:function(_3c){
var p=document.getElementById(_3c.id+this.idSuffix_buttonsPlaceholder);
if(!p){
var _3e=document.createElement("div");
_3e=_3c.appendChild(_3e);
_3e.className="actions";
_3e.id=_3c.id+this.idSuffix_buttonsPlaceholder;
return _3e;
}
return p;
},createNextPageButton:function(){
var _3f=document.createElement("input");
_3f.setAttribute("value",wFORMS.arrMsg[4]);
_3f.setAttribute("type","button");
_3f.className=this.className_pageNextButton;
return _3f;
},createPreviousPageButton:function(){
var _40=document.createElement("input");
_40.setAttribute("value",wFORMS.arrMsg[5]);
_40.setAttribute("type","button");
_40.className=this.className_pagePreviousButton;
return _40;
},pagingNext:function(e){
var _42=wFORMS.helpers.getSourceElement(e);
if(!_42){
_42=e;
}
var _43=wFORMS.behaviors["paging"].getPageElement(_42);
var _44=wFORMS.behaviors["paging"].getPageIndex(_43)+1;
var _45=document.getElementById(wFORMS.idPrefix_pageIndex+_44.toString());
if(_45){
if(!wFORMS.hasBehavior("validation")||(wFORMS.hasBehavior("validation")&&!wFORMS.runValidationOnPageNext)||(wFORMS.hasBehavior("validation")&&wFORMS.runValidationOnPageNext&&wFORMS.functionName_formValidation(e,true))){
_43.className=_43.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
_45.className+=" "+wFORMS.className_pagingCurrent;
if(wFORMS.behaviors["paging"].isLastPage(_44)){
var _46=wFORMS.behaviors["paging"].getFormElement(_45);
wFORMS.behaviors["paging"].showSubmitButton(_46);
}
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_45);
}
}
}
},pagingPrevious:function(e){
var _48=wFORMS.helpers.getSourceElement(e);
if(!_48){
_48=e;
}
var _49=wFORMS.behaviors["paging"].getPageElement(_48);
var _4a=wFORMS.behaviors["paging"].getPageIndex(_49)-1;
var _4b=document.getElementById(wFORMS.idPrefix_pageIndex+_4a.toString());
if(_4b){
_49.className=_49.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
_4b.className+=" "+wFORMS.className_pagingCurrent;
var _4c=wFORMS.behaviors["paging"].getFormElement(_4b);
wFORMS.behaviors["paging"].hideSubmitButton(_4c);
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_4b);
}
}
},showSubmitButton:function(_4d){
var _4e=_4d.getElementsByTagName("input");
for(var i=0;i<_4e.length;i++){
if(_4e[i].type&&_4e[i].type.toLowerCase()=="submit"){
_4e[i].className=_4e[i].className.replace(wFORMS.className_hideSubmit,"");
}
}
},hideSubmitButton:function(_50){
var _51=_50.getElementsByTagName("input");
for(var i=0;i<_51.length;i++){
if(_51[i].type&&_51[i].type.toLowerCase()=="submit"&&!wFORMS.helpers.hasClass(_51[i],wFORMS.className_hideSubmit)){
_51[i].className+=" "+wFORMS.className_hideSubmit;
}
}
},isLastPage:function(_53){
if(isNaN(_53)){
_53=parseInt(_53.replace(/[\D]*/,""));
}
_53++;
var _54=document.getElementById(wFORMS.idPrefix_pageIndex+_53.toString());
if(!_54){
return true;
}
return false;
},gotoPage:function(_55){
if(isNaN(_55)){
var _56=document.getElementById(_55);
}else{
var _56=document.getElementById(wFORMS.idPrefix_pageIndex+_55.toString());
}
if(!_56){
return false;
}
var _57=wFORMS.behaviors["paging"].getFormElement(_56);
var _58=_57.getElementsByTagName("*");
for(var i=0;i<_58.length;i++){
var n=_58[i];
if(wFORMS.helpers.hasClass(_58[i],wFORMS.className_pagingCurrent)){
n.className=n.className.replace(new RegExp(wFORMS.className_pagingCurrent,"g"),"");
break;
}
}
if(wFORMS.behaviors["paging"].isLastPage(_55)){
wFORMS.behaviors["paging"].showSubmitButton(_57);
}else{
wFORMS.behaviors["paging"].hideSubmitButton(_57);
}
_56.className+=" "+wFORMS.className_pagingCurrent;
if(wFORMS.behaviors["paging"].onPageChange){
wFORMS.behaviors["paging"].onPageChange(_56);
}
},getFormElement:function(_5b){
var _5c=_5b.parentNode;
while(_5c&&_5c.tagName.toUpperCase()!="FORM"){
_5c=_5c.parentNode;
}
return _5c;
},getPageElement:function(_5d){
var n=_5d.parentNode;
while(n&&(!n.className||!wFORMS.helpers.hasClass(n,wFORMS.className_paging))){
n=n.parentNode;
}
return n;
},getPageIndex:function(_5f){
if(_5f&&_5f.id){
return parseInt(_5f.id.replace(/[\D]*/,""));
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
wFORMS.behaviors["repeat"]={onRepeat:null,onRemove:null,allowRepeat:null,evaluate:function(_60){
if(wFORMS.helpers.hasClass(_60,wFORMS.className_repeat)){
if(!_60.id){
_60.id=wFORMS.helpers.randomId();
}
var _61=document.getElementById(_60.id+wFORMS.idSuffix_duplicateLink);
if(!_61){
_61=document.createElement("a");
var _62=document.createElement("span");
var _63=document.createTextNode(wFORMS.arrMsg[0]);
_61.setAttribute("href","#");
_61.className=wFORMS.className_duplicateLink;
_61.setAttribute("title",wFORMS.arrMsg[1]);
if(_60.tagName.toUpperCase()=="TR"){
var n=_60.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_61);
}
}else{
_60.appendChild(_61);
}
_62.appendChild(_63);
_61.appendChild(_62);
}
var _65=document.getElementById(_60.id+wFORMS.idSuffix_repeatCounter);
if(!_65){
if(document.all&&!window.opera){
var _66=_60.id+wFORMS.idSuffix_repeatCounter;
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
_65=document.createElement("INPUT NAME=\""+_66+"\"");
}else{
_65=document.createElement("<INPUT NAME=\""+_66+"\"></INPUT>");
}
_65.type="hidden";
_65.id=_66;
_65.value="1";
}else{
_65=document.createElement("INPUT");
_65.setAttribute("type","hidden");
_65.setAttribute("value","1");
_65.setAttribute("name",_60.id+wFORMS.idSuffix_repeatCounter);
_65.setAttribute("id",_60.id+wFORMS.idSuffix_repeatCounter);
}
var _67=_60.parentNode;
while(_67&&_67.tagName.toUpperCase()!="FORM"){
_67=_67.parentNode;
}
_67.appendChild(_65);
}
wFORMS.helpers.addEvent(_61,"click",wFORMS.behaviors["repeat"].duplicateFieldGroup);
}
if(wFORMS.helpers.hasClass(_60,wFORMS.className_delete)){
var _68=document.createElement("a");
var _62=document.createElement("span");
var _63=document.createTextNode(wFORMS.arrMsg[2]);
_68.setAttribute("href","#");
_68.className=wFORMS.className_removeLink;
_68.setAttribute("title",wFORMS.arrMsg[3]);
if(_60.tagName.toUpperCase()=="TR"){
var n=_60.lastChild;
while(n&&n.nodeType!=1){
n=n.previousSibling;
}
if(n&&n.nodeType==1){
n.appendChild(_68);
}
}else{
_60.appendChild(_68);
}
_62.appendChild(_63);
_68.appendChild(_62);
wFORMS.helpers.addEvent(_68,"click",wFORMS.behaviors["repeat"].removeFieldGroup);
}
},duplicateFieldGroup:function(e){
var _6a=wFORMS.helpers.getSourceElement(e);
if(!_6a){
_6a=e;
}
var _6b=wFORMS.helpers.hasClass(_6a,wFORMS.className_preserveRadioName)?true:wFORMS.preserveRadioName;
var _6a=_6a.parentNode;
while(_6a&&!wFORMS.helpers.hasClass(_6a,wFORMS.className_repeat)){
_6a=_6a.parentNode;
}
if(_6a){
var _6c=wFORMS.behaviors["repeat"];
if(_6c.allowRepeat){
if(!_6c.allowRepeat(_6a)){
return false;
}
}
counterField=document.getElementById(_6a.id+wFORMS.idSuffix_repeatCounter);
if(!counterField){
return;
}
var _6d=parseInt(counterField.value)+1;
var _6e="-"+_6d.toString();
var _6f=_6c.replicateTree(_6a,null,_6e,_6b);
var _70=_6a.nextSibling;
while(_70&&(_70.nodeType==3||wFORMS.helpers.hasClass(_70,wFORMS.className_delete))){
_70=_70.nextSibling;
}
_6a.parentNode.insertBefore(_6f,_70);
_6f.className=_6a.className.replace(wFORMS.className_repeat,wFORMS.className_delete);
document.getElementById(_6a.id+wFORMS.idSuffix_repeatCounter).value=_6d;
wFORMS.addBehaviors(_6f);
if(_6c.onRepeat){
_6c.onRepeat(_6a,_6f);
}
}
return wFORMS.helpers.preventEvent(e);
},removeFieldGroup:function(e){
var _72=wFORMS.helpers.getSourceElement(e);
if(!_72){
_72=e;
}
var _72=_72.parentNode;
while(_72&&!wFORMS.helpers.hasClass(_72,wFORMS.className_delete)){
_72=_72.parentNode;
}
_72.parentNode.removeChild(_72);
if(wFORMS.behaviors["repeat"].onRemove){
wFORMS.behaviors["repeat"].onRemove(_72);
}
return wFORMS.helpers.preventEvent(e);
},removeRepeatCountSuffix:function(str){
return str.replace(/-\d$/,"");
},replicateTree:function(_74,_75,_76,_77){
if(_74.nodeType==3){
if(_74.parentNode.tagName.toUpperCase()!="TEXTAREA"){
var _78=document.createTextNode(_74.data);
}
}else{
if(_74.nodeType==1){
if(wFORMS.helpers.hasClass(_74,wFORMS.className_duplicateLink)||wFORMS.helpers.hasClass(_74,wFORMS.className_removeLink)){
return null;
}
if(wFORMS.helpers.hasClass(_74,wFORMS.className_delete)){
return null;
}
if(wFORMS.helpers.hasClass(_74,wFORMS.className_repeat)&&_75!=null){
_76=_76.replace("-","__");
}
if(!document.all||window.opera){
var _78=document.createElement(_74.tagName);
}else{
var _79=_74.tagName;
if(_74.name){
if(_74.tagName.toUpperCase()=="INPUT"&&_74.type.toLowerCase()=="radio"&&_77){
_79+=" NAME='"+_74.name+"' ";
}else{
_79+=" NAME='"+wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_74.name)+_76+"' ";
}
}
if(_74.type){
_79+=" TYPE='"+_74.type+"' ";
}
if(_74.selected){
_79+=" SELECTED='SELECTED' ";
}
if(_74.checked){
_79+=" CHECKED='CHECKED' ";
}
if(navigator.appVersion.indexOf("MSIE")!=-1&&navigator.appVersion.indexOf("Windows")==-1){
var _78=document.createElement(_79);
}else{
var _78=document.createElement("<"+_79+"></"+_74.tagName+">");
}
try{
_78.type=_74.type;
}
catch(e){
}
}
for(var i=0;i<_74.attributes.length;i++){
var _7b=_74.attributes[i];
if(_7b.specified||_7b.nodeName.toLowerCase()=="value"){
if(_7b.nodeName.toLowerCase()=="id"||_7b.nodeName.toLowerCase()=="name"||_7b.nodeName.toLowerCase()=="for"){
if(wFORMS.hasBehavior("hint")&&_7b.nodeValue.indexOf(wFORMS.idSuffix_fieldHint)!=-1){
var _7c=_7b.nodeValue;
_7c=wFORMS.behaviors["repeat"].removeRepeatCountSuffix(_7c.substr(0,_7c.indexOf(wFORMS.idSuffix_fieldHint)))+_76+wFORMS.idSuffix_fieldHint;
}else{
if(_74.tagName.toUpperCase()=="INPUT"&&_74.getAttribute("type",false).toLowerCase()=="radio"&&_7b.nodeName.toLowerCase()=="name"&&_77){
var _7c=_7b.nodeValue;
}else{
var _7c=_7b.nodeValue+_76;
}
}
}else{
if(_7b.nodeName.toLowerCase()=="value"&&_74.tagName.toUpperCase()=="INPUT"&&(_74.type.toLowerCase()=="text"||_74.type.toLowerCase()=="password"||_74.type.toLowerCase()=="hidden"||_74.type.toLowerCase()=="file")){
var _7c="";
}else{
if(_7b.nodeName.toLowerCase()=="rel"&&_7b.nodeValue.indexOf("wfHandled")!=-1){
var _7c=_7b.nodeValue.replace("wfHandled","");
}else{
var _7c=_7b.nodeValue;
}
}
}
switch(_7b.nodeName.toLowerCase()){
case "class":
_78.className=_7c;
break;
case "style":
if(_74.style&&_74.style.cssText){
_78.style.cssText=_74.style.cssText;
}
break;
case "onclick":
_78.onclick=_74.onclick;
break;
case "onchange":
_78.onchange=_74.onchange;
break;
case "onsubmit":
_78.onsubmit=_74.onsubmit;
break;
case "onmouseover":
_78.onmouseover=_74.onmouseover;
break;
case "onmouseout":
_78.onmouseout=_74.onmouseout;
break;
case "onmousedown":
_78.onmousedown=_74.onmousedown;
break;
case "onmouseup":
_78.onmouseup=_74.onmouseup;
break;
case "ondblclick":
_78.ondblclick=_74.ondblclick;
break;
case "onkeydown":
_78.onkeydown=_74.onkeydown;
break;
case "onkeyup":
_78.onkeyup=_74.onkeyup;
break;
case "onblur":
_78.onblur=_74.onblur;
break;
case "onfocus":
_78.onfocus=_74.onfocus;
break;
default:
_78.setAttribute(_7b.name,_7c,0);
}
}
}
}
}
if(_75&&_78){
_75.appendChild(_78);
}
for(var i=0;i<_74.childNodes.length;i++){
wFORMS.behaviors["repeat"].replicateTree(_74.childNodes[i],_78,_76,_77);
}
return _78;
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
wFORMS.behaviors["switch"]={evaluate:function(_7d){
if(wFORMS.helpers.hasClassPrefix(_7d,wFORMS.classNamePrefix_switch)){
if(!_7d.id){
_7d.id=wFORMS.helpers.randomId();
}
var _7e=wFORMS.behaviors["switch"].getSwitchNames(_7d);
for(var i=0;i<_7e.length;i++){
if(!wFORMS.switchTriggers[_7e[i]]){
wFORMS.switchTriggers[_7e[i]]=new Array();
}
if(!wFORMS.switchTriggers[_7e[i]][_7d.id]){
wFORMS.switchTriggers[_7e[i]].push(_7d.id);
}
}
switch(_7d.tagName.toUpperCase()){
case "OPTION":
var _80=_7d.parentNode;
while(_80&&_80.tagName.toUpperCase()!="SELECT"){
var _80=_80.parentNode;
}
if(!_80){
alert("Error: invalid markup in SELECT field ?");
return false;
}
if(!_80.id){
_80.id=wFORMS.helpers.randomId();
}
if(!_80.getAttribute("rel")||_80.getAttribute("rel").indexOf("wfHandled")==-1){
_80.setAttribute("rel",(_80.getAttribute("rel")||"")+" wfHandled");
wFORMS.helpers.addEvent(_80,"change",wFORMS.behaviors["switch"].run);
}
break;
case "INPUT":
if(_7d.type&&_7d.type.toLowerCase()=="radio"){
var _81=_7d.form;
for(var j=0;j<_81[_7d.name].length;j++){
var _83=_81[_7d.name][j];
if(_83.type.toLowerCase()=="radio"){
if(!_83.getAttribute("rel")||_83.getAttribute("rel").indexOf("wfHandled")==-1){
wFORMS.helpers.addEvent(_83,"click",wFORMS.behaviors["switch"].run);
_83.setAttribute("rel",(_83.getAttribute("rel")||"")+" wfHandled");
}
}
}
}else{
wFORMS.helpers.addEvent(_7d,"click",wFORMS.behaviors["switch"].run);
}
break;
default:
wFORMS.helpers.addEvent(_7d,"click",wFORMS.behaviors["switch"].run);
break;
}
}
if(wFORMS.helpers.hasClassPrefix(_7d,wFORMS.classNamePrefix_offState)||wFORMS.helpers.hasClassPrefix(_7d,wFORMS.classNamePrefix_onState)){
if(!_7d.id){
_7d.id=wFORMS.helpers.randomId();
}
var _7e=wFORMS.behaviors["switch"].getSwitchNames(_7d);
for(var i=0;i<_7e.length;i++){
if(!wFORMS.switchTargets[_7e[i]]){
wFORMS.switchTargets[_7e[i]]=new Array();
}
if(!wFORMS.switchTargets[_7e[i]][_7d.id]){
wFORMS.switchTargets[_7e[i]].push(_7d.id);
}
}
}
if(_7d.tagName&&_7d.tagName.toUpperCase()=="FORM"){
wFORMS.onLoadComplete.push(wFORMS.behaviors["switch"].init);
}
},init:function(){
for(var _84 in wFORMS.switchTriggers){
for(var i=0;i<wFORMS.switchTriggers[_84].length;i++){
var _86=document.getElementById(wFORMS.switchTriggers[_84][i]);
if(wFORMS.behaviors["switch"].isTriggerOn(_86,_84)){
if(_86.tagName.toUpperCase()=="OPTION"){
var _86=_86.parentNode;
while(_86&&_86.tagName.toUpperCase()!="SELECT"){
var _86=_86.parentNode;
}
}
wFORMS.behaviors["switch"].run(_86);
}
}
}
},run:function(e){
var _88=wFORMS.helpers.getSourceElement(e);
if(!_88){
_88=e;
}
var _89=new Array();
var _8a=new Array();
switch(_88.tagName.toUpperCase()){
case "SELECT":
for(var i=0;i<_88.options.length;i++){
if(i==_88.selectedIndex){
_89=_89.concat(wFORMS.behaviors["switch"].getSwitchNames(_88.options[i]));
}else{
_8a=_8a.concat(wFORMS.behaviors["switch"].getSwitchNames(_88.options[i]));
}
}
break;
case "INPUT":
if(_88.type.toLowerCase()=="radio"){
for(var i=0;i<_88.form[_88.name].length;i++){
var _8c=_88.form[_88.name][i];
if(_8c.checked){
_89=_89.concat(wFORMS.behaviors["switch"].getSwitchNames(_8c));
}else{
_8a=_8a.concat(wFORMS.behaviors["switch"].getSwitchNames(_8c));
}
}
}else{
if(_88.checked||wFORMS.helpers.hasClass(_88,wFORMS.className_switchIsOn)){
_89=_89.concat(wFORMS.behaviors["switch"].getSwitchNames(_88));
}else{
_8a=_8a.concat(wFORMS.behaviors["switch"].getSwitchNames(_88));
}
}
break;
default:
break;
}
for(var i=0;i<_8a.length;i++){
var _8d=wFORMS.behaviors["switch"].getElementsBySwitchName(_8a[i]);
for(var j=0;j<_8d.length;j++){
var _8f=wFORMS.switchTriggers[_8a[i]];
var _90=true;
for(var k=0;k<_8f.length;k++){
var _92=document.getElementById(_8f[k]);
if(wFORMS.behaviors["switch"].isTriggerOn(_92,_8a[i])){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_92,_8d[j])){
_90=false;
}
}
}
if(_90){
wFORMS.behaviors["switch"].switchState(_8d[j],wFORMS.classNamePrefix_onState,wFORMS.classNamePrefix_offState);
}
}
}
for(var i=0;i<_89.length;i++){
var _8d=wFORMS.behaviors["switch"].getElementsBySwitchName(_89[i]);
for(var j=0;j<_8d.length;j++){
if(wFORMS.behaviors["switch"].isWithinSwitchScope(_88,_8d[j])){
wFORMS.behaviors["switch"].switchState(_8d[j],wFORMS.classNamePrefix_offState,wFORMS.classNamePrefix_onState);
}
}
}
},clear:function(e){
wFORMS.switchTriggers={};
wFORMS.switchTargets={};
},getSwitchNames:function(_94){
var _95=new Array();
var _96=_94.className.split(" ");
for(var i=0;i<_96.length;i++){
if(_96[i].indexOf(wFORMS.classNamePrefix_switch)==0){
_95.push(_96[i].substr(wFORMS.classNamePrefix_switch.length+1));
}
if(_96[i].indexOf(wFORMS.classNamePrefix_onState)==0){
_95.push(_96[i].substr(wFORMS.classNamePrefix_onState.length+1));
}else{
if(_96[i].indexOf(wFORMS.classNamePrefix_offState)==0){
_95.push(_96[i].substr(wFORMS.classNamePrefix_offState.length+1));
}
}
}
return _95;
},switchState:function(_98,_99,_9a){
if(!_98||_98.nodeType!=1){
return;
}
if(_98.className){
_98.className=_98.className.replace(_99,_9a);
}
if(wFORMS.helpers.hasClass(_98,wFORMS.className_switchIsOff)){
_98.className=_98.className.replace(wFORMS.className_switchIsOff,wFORMS.className_switchIsOn);
}else{
if(wFORMS.helpers.hasClass(_98,wFORMS.className_switchIsOn)){
_98.className=_98.className.replace(wFORMS.className_switchIsOn,wFORMS.className_switchIsOff);
}
}
},getElementsBySwitchName:function(_9b){
var _9c=new Array();
if(wFORMS.switchTargets[_9b]){
for(var i=0;i<wFORMS.switchTargets[_9b].length;i++){
var _9e=document.getElementById(wFORMS.switchTargets[_9b][i]);
if(_9e){
_9c.push(_9e);
}
}
}
return _9c;
},isTriggerOn:function(_9f,_a0){
if(!_9f){
return false;
}
if(_9f.tagName.toUpperCase()=="OPTION"){
var _a1=_9f.parentNode;
while(_a1&&_a1.tagName.toUpperCase()!="SELECT"){
var _a1=_a1.parentNode;
}
if(!_a1){
return false;
}
if(_a1.selectedIndex==-1){
return false;
}
if(wFORMS.helpers.hasClass(_a1.options[_a1.selectedIndex],wFORMS.classNamePrefix_switch+"-"+_a0)){
return true;
}
}else{
if(_9f.checked||wFORMS.helpers.hasClass(_9f,wFORMS.className_switchIsOn)){
return true;
}
}
return false;
},isWithinSwitchScope:function(_a2,_a3){
if(wFORMS.hasBehavior("repeat")&&wFORMS.limitSwitchScope==true){
var _a4=_a2;
while(_a4&&_a4.tagName&&_a4.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_a4,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_a4,wFORMS.className_delete)){
_a4=_a4.parentNode;
}
if(wFORMS.helpers.hasClass(_a4,wFORMS.className_repeat)||wFORMS.helpers.hasClass(_a4,wFORMS.className_delete)){
var _a5=_a3;
while(_a5&&_a5.tagName&&_a5.tagName.toUpperCase()!="FORM"&&!wFORMS.helpers.hasClass(_a5,wFORMS.className_repeat)&&!wFORMS.helpers.hasClass(_a5,wFORMS.className_delete)){
_a5=_a5.parentNode;
}
if(_a4==_a5){
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
wFORMS.behaviors["validation"]={errMsg_required:"This field is required. ",errMsg_alpha:"The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed.",errMsg_email:"This does not appear to be a valid email address.",errMsg_integer:"Please enter an integer.",errMsg_float:"Please enter a number (ex. 1.9).",errMsg_password:"Unsafe password. Your password should be between 4 and 12 characters long and use a combinaison of upper-case and lower-case letters.",errMsg_alphanum:"Please use alpha-numeric characters only [a-z 0-9].",errMsg_date:"This does not appear to be a valid date.",errMsg_notification:"%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided.",errMsg_custom:"Please enter a valid value.",className_allRequired:"allrequired",jumpToErrorOnPage:null,currentPageIndex:-1,evaluate:function(_a6){
if(_a6.tagName.toUpperCase()=="FORM"){
if(wFORMS.functionName_formValidation.toString()==wFORMS.functionName_formValidation){
wFORMS.functionName_formValidation=eval(wFORMS.functionName_formValidation);
}
wFORMS.helpers.addEvent(_a6,"submit",wFORMS.functionName_formValidation);
}
},init:function(){
},run:function(e){
var _a8=wFORMS.helpers.getSourceElement(e);
if(!_a8){
_a8=e;
}
var _a9=arguments[1]?arguments[1]:(wFORMS.hasBehavior("paging")&&wFORMS.behaviors["paging"].behaviorInUse);
wFORMS.behaviors["validation"].jumpToErrorOnPage=null;
if(wFORMS.preventSubmissionOnEnter){
if(_a8.type&&_a8.type.toLowerCase()=="text"){
return wFORMS.preventEvent(e);
}
}
while(_a8&&_a8.tagName.toUpperCase()!="FORM"){
_a8=_a8.parentNode;
}
var _aa=wFORMS.behaviors["validation"].validateElement(_a8,_a9,true);
wFORMS.behaviors["validation"].errorCount=_aa;
if(_aa>0){
if(wFORMS.behaviors["validation"].jumpToErrorOnPage){
wFORMS.behaviors["paging"].gotoPage(wFORMS.behaviors["validation"].jumpToErrorOnPage);
}
if(wFORMS.showAlertOnError){
wFORMS.behaviors["validation"].showAlert(_aa);
}
return wFORMS.helpers.preventEvent(e);
}
return true;
},remove:function(){
},validateElement:function(_ab){
var _ac=arguments[2]?arguments[2]:true;
var _ad=arguments[1]?arguments[1]:false;
var _ae=wFORMS.behaviors["validation"];
if(wFORMS.hasBehavior("switch")&&wFORMS.helpers.hasClassPrefix(_ab,wFORMS.classNamePrefix_offState)){
return 0;
}
if(wFORMS.hasBehavior("paging")&&wFORMS.helpers.hasClass(_ab,wFORMS.className_paging)){
if(!wFORMS.helpers.hasClass(_ab,wFORMS.className_pagingCurrent)&&_ad){
return 0;
}
_ae.currentPageIndex=wFORMS.behaviors["paging"].getPageIndex(_ab);
}
var _af=0;
if(!_ae.checkRequired(_ab)){
_ae.showError(_ab,_ae.errMsg_required);
_af++;
}else{
if(wFORMS.helpers.hasClassPrefix(_ab,wFORMS.classNamePrefix_validation)){
var _b0=_ab.className.split(" ");
for(j=0;j<_b0.length;j++){
switch(_b0[j]){
case "validate-alpha":
if(!_ae.isAlpha(_ab.value)){
_ae.showError(_ab,_ae.errMsg_alpha);
_af++;
}
break;
case "validate-alphanum":
if(!_ae.isAlphaNum(_ab.value)){
_ae.showError(_ab,_ae.errMsg_alphanum);
_af++;
}
break;
case "validate-date":
if(!_ae.isDate(_ab.value)){
_ae.showError(_ab,_ae.errMsg_date);
_af++;
}
break;
case "validate-time":
break;
case "validate-email":
if(!_ae.isEmail(_ab.value)){
_ae.showError(_ab,_ae.errMsg_email);
_af++;
}
break;
case "validate-integer":
if(!_ae.isInteger(_ab.value)){
_ae.showError(_ab,_ae.errMsg_integer);
_af++;
}
break;
case "validate-float":
if(!_ae.isFloat(_ab.value)){
_ae.showError(_ab,_ae.errMsg_float);
_af++;
}
break;
case "validate-strongpassword":
if(!_ae.isPassword(_ab.value)){
_ae.showError(_ab,_ae.errMsg_password);
_af++;
}
break;
case "validate-custom":
var _b1=new RegExp("/([^/]*)/([gi]*)");
var _b2=_ab.className.match(_b1);
if(_b2[0]){
var _b3=new RegExp(_b2[1],_b2[2]);
if(!_ab.value.match(_b3)){
_ae.showError(_ab,_ae.errMsg_custom);
_af++;
}
}
break;
}
}
}
}
if(_af==0){
_ae.removeErrorMessage(_ab);
}else{
if(_ae.currentPageIndex>0&&!_ae.jumpToErrorOnPage){
_ae.jumpToErrorOnPage=_ae.currentPageIndex;
}
}
if(_ac){
for(var i=0;i<_ab.childNodes.length;i++){
if(_ab.childNodes[i].nodeType==1){
_af+=_ae.validateElement(_ab.childNodes[i],_ad,_ac);
}
}
}
return _af;
},checkRequired:function(_b5){
var _b6=wFORMS.behaviors["validation"];
if(wFORMS.helpers.hasClass(_b5,wFORMS.className_required)){
switch(_b5.tagName.toUpperCase()){
case "INPUT":
var _b7=_b5.getAttribute("type");
if(!_b7){
_b7="text";
}
switch(_b7.toLowerCase()){
case "checkbox":
return _b5.checked;
break;
case "radio":
return _b5.checked;
break;
default:
return !_b6.isEmpty(_b5.value);
}
break;
case "SELECT":
return !_b6.isEmpty(_b5.options[_b5.selectedIndex].value);
break;
case "TEXTAREA":
return !_b6.isEmpty(_b5.value);
break;
default:
return _b6.checkOneRequired(_b5);
break;
}
}else{
if(wFORMS.helpers.hasClass(_b5,_b6.className_allRequired)){
return _b6.checkAllRequired(_b5);
}
}
return true;
},checkOneRequired:function(_b8){
if(_b8.nodeType!=1){
return false;
}
var _b9=_b8.tagName.toUpperCase();
var _ba=wFORMS.behaviors["validation"];
if(_b9=="INPUT"||_b9=="SELECT"||_b9=="TEXTAREA"){
var _bb=_ba.getFieldValue(_b8);
if(!_ba.isEmpty(_bb)){
return true;
}
}
for(var i=0;i<_b8.childNodes.length;i++){
if(_ba.checkOneRequired(_b8.childNodes[i])){
return true;
}
}
return false;
},checkAllRequired:function(_bd){
if(_bd.nodeType!=1){
return true;
}
var _be=_bd.tagName.toUpperCase();
var _bf=wFORMS.behaviors["validation"];
if(_be=="INPUT"||_be=="SELECT"||_be=="TEXTAREA"){
var _c0=_bf.getFieldValue(_bd);
if(_bf.isEmpty(_c0)){
return false;
}
}
for(var i=0;i<_bd.childNodes.length;i++){
if(!_bf.checkAllRequired(_bd.childNodes[i])){
return false;
}
}
return true;
},getFieldValue:function(_c2){
var _c3=null;
if(_c2&&_c2.tagName){
if(_c2.tagName.toUpperCase()=="INPUT"){
var _c4=_c2.getAttribute("type");
if(!_c4){
_c4="text";
}
switch(_c4.toLowerCase()){
case "checkbox":
_c3=_c2.checked?_c2.value:null;
break;
case "radio":
var _c5=_c2.form[_c2.name];
for(var i=0;i<_c5.length;i++){
if(_c5[i].checked){
_c3=_c5[i].value;
}
}
break;
default:
_c3=_c2.value;
}
}else{
if(_c2.tagName.toUpperCase()=="SELECT"){
_c3=_c2.options[_c2.selectedIndex].value;
}else{
if(_c2.tagName.toUpperCase()=="TEXTAREA"){
_c3=_c2.value;
}
}
}
}
return _c3;
},isEmpty:function(s){
var _c8=/^\s+$/;
return ((s==null)||(s.length==0)||_c8.test(s));
},isAlpha:function(s){
var _ca=/^[a-zA-Z\s]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_ca.test(s);
},isAlphaNum:function(s){
var _cc=/^[\w\s]+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_cc.test(s);
},isDate:function(s){
var _ce=new Date(s);
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(_ce);
},isEmail:function(s){
var _d0=/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_d0.test(s);
},isInteger:function(s){
var _d2=/^[+]?\d+$/;
return wFORMS.behaviors["validation"].isEmpty(s)||_d2.test(s);
},isFloat:function(s){
return wFORMS.behaviors["validation"].isEmpty(s)||!isNaN(parseFloat(s));
},isPassword:function(s){
return wFORMS.behaviors["validation"].isEmpty(s);
},showError:function(_d5,_d6){
if(wFORMS.helpers.hasClass(_d5,wFORMS.className_validationError_fld)){
wFORMS.behaviors["validation"].removeErrorMessage(_d5);
}
if(!_d5.id){
_d5.id=wFORMS.helpers.randomId();
}
_d5.className+=" "+wFORMS.className_validationError_fld;
var _d7=document.createTextNode(" "+_d6);
var fe=document.getElementById(_d5.id+wFORMS.idSuffix_fieldError);
if(!fe){
fe=document.createElement("div");
fe.setAttribute("id",_d5.id+wFORMS.idSuffix_fieldError);
var fl=document.getElementById(_d5.id+wFORMS.idSuffix_fieldLabel);
if(fl){
fl.parentNode.insertBefore(fe,fl.nextSibling);
}else{
_d5.parentNode.insertBefore(fe,_d5.nextSibling);
}
}
fe.appendChild(_d7);
fe.className+=" "+wFORMS.className_validationError_msg;
},showAlert:function(_da){
alert(wFORMS.behaviors["validation"].errMsg_notification.replace("%%",_da));
},removeErrorMessage:function(_db){
var _dc=new RegExp(wFORMS.className_validationError_fld,"gi");
_db.className=_db.className.replace(_dc,"");
var _dd=document.getElementById(_db.id+wFORMS.idSuffix_fieldError);
if(_dd){
_dd.innerHTML="";
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

