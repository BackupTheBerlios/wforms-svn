// Localization for wForms - a javascript extension to web forms.
// Danish  v2.0 - Sept. 14th 2006
// Thanks to Troels Knak-Nielsen
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

wFORMS.behaviors['validation'].errMsg_required     = "Dette felt er påkrævet."; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "Teksten må kun indeholde bogstaver (a-z, A-Z). Numre er ikke tilladt."; // validate_alpha
wFORMS.behaviors['validation'].errMsg_email        = "Dette lader ikke til at være en gyldig email adresse."; //  validate_email
wFORMS.behaviors['validation'].errMsg_integer      = "Venligst tast et heltal."; //  validate_integer
wFORMS.behaviors['validation'].errMsg_float        = "Venligst tast et tal. Anvend punktum som kommaseparator. (F.eks. 1.9)";
wFORMS.behaviors['validation'].errMsg_password     = "";
wFORMS.behaviors['validation'].errMsg_alphanum     = "Brug venligst kun bogstaver eller tal (a-z, 0-9).";
wFORMS.behaviors['validation'].errMsg_date         = "Dette lader ikke til at være en gyldig dato. (F.eks. 2006-12-24 for 24. dec 2006)";
//wFORMS.behaviors['validation'].errMsg_notification = ""; // %% will be replaced by the actual number of errors.

wf.arrMsg[0] = "Tilføj endnu et svar"; // repeat link
wf.arrMsg[1] = "" // title attribute on the repeat link
wf.arrMsg[2] = "Fjern"; // remove link
wf.arrMsg[3] = "" // title attribute on the remove link
wf.arrMsg[4] = "Næste side";
wf.arrMsg[5] = "Forrige side";


wf.isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u00C0-\u00FF\u0100-\u017F]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wf.isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u00C0-\u00FF\u0100-\u017F]+$/;
	return this.isEmpty(s) || reg.test(s);
}