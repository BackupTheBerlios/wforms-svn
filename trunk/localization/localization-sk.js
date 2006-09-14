// Localization for wForms - a javascript extension to web forms.
// Slovak  v2.0 - Sept. 14th 2006
// Thanks to Roman Baranovic
//
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
//
// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-sw.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "Toto pole je povinné."; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "V tomto poli používajte len písmená (a-z,A-Z). Čisla nie sú povolené."; // validate_alpha
wFORMS.behaviors['validation'].errMsg_email        = "Nezadali ste platnú mailovú adresu."; //  validate_email
wFORMS.behaviors['validation'].errMsg_integer      = "Zadajte číslo."; //  validate_integer
wFORMS.behaviors['validation'].errMsg_float        = "Zadajte desatinné číslo (napríklad 1.9).";
wFORMS.behaviors['validation'].errMsg_password     = "";
wFORMS.behaviors['validation'].errMsg_alphanum     = "V tomto poli používajte len písmená a čísla (a-z 0-9).";
wFORMS.behaviors['validation'].errMsg_date         = "Toto nie je platný dátum.";
//wFORMS.behaviors['validation'].errMsg_notification = ""; // %% will be replaced by the actual number of errors.

wf.arrMsg[0] = "Pridajte ďalšiu sekciu formuláru"; // repeat link
wf.arrMsg[1] = "" // title attribute on the repeat link
wf.arrMsg[2] = "Odstrániť"; // remove link
wf.arrMsg[3] = "" // title attribute on the remove link
wf.arrMsg[4] = "Nasledujúca strana";
wf.arrMsg[5] = "Predchádzajúca strana";


wf.isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u00C0-\u00FF\u0100-\u017F]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wf.isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u00C0-\u00FF\u0100-\u017F]+$/;
	return this.isEmpty(s) || reg.test(s);
}