// Localization for wForms - a javascript extension to web forms.
// Swedish  v2.0 - July 18th 2006
// Thanks to Pär Axelsson
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

wFORMS.behaviors['validation'].errMsg_required     = "Fältet måste fyllas i."; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "Texten får endast innehålla bokstäver (a-z, A-Z). Siffror är inte tillåtna."; // validate_alpha
wFORMS.behaviors['validation'].errMsg_email        = "Detta ser inte ut som en giltig e-postadress."; //  validate_email
wFORMS.behaviors['validation'].errMsg_integer      = "Ange ett tal."; //  validate_integer
wFORMS.behaviors['validation'].errMsg_float        = "Ange ett decimaltal (t ex 1.9).";
wFORMS.behaviors['validation'].errMsg_password     = "";
wFORMS.behaviors['validation'].errMsg_alphanum     = "Endast alfanumeriska tecken tillåts (a-z 0-9).";
wFORMS.behaviors['validation'].errMsg_date         = "Detta ser inte ut som ett giltigt datum.";
wFORMS.behaviors['validation'].errMsg_notification = "%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided."; // %% will be replaced by the actual number of errors.

wf.arrMsg[0] = "Lägg till ett svar"; // repeat link
wf.arrMsg[1] = "" // title attribute on the repeat link
wf.arrMsg[2] = "Ta bort"; // remove link
wf.arrMsg[3] = "" // title attribute on the remove link
wf.arrMsg[4] = "Nästa sida";
wf.arrMsg[5] = "Förra sidan";


wf.isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u00C0-\u00FF]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wf.isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u0100-\u017F]+$/;
	return this.isEmpty(s) || reg.test(s);
}