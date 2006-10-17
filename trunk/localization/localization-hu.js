// Localization for wForms - a javascript extension to web forms.
// Magyar (Hungarian)  v2.0 - Oct. 17th 2006
// Thanks to Zoltan Varady and Nyirfalvi Gyul
//
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
//
// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-hu.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "Ezt a mezőt kötelező kitölteni!"; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "Itt csak betűk használhatóak (a-tól z-ig), számok nem."; // validate_alpha
wFORMS.behaviors['validation'].errMsg_email        = "Ez nem tűnik érvényes email-címnek."; //  validate_email
wFORMS.behaviors['validation'].errMsg_integer      = "Kérem adjon meg egy egész számot."; //  validate_integer
wFORMS.behaviors['validation'].errMsg_float        = "Kérem adjon meg egy valós számot (pl. 1.9)";
wFORMS.behaviors['validation'].errMsg_password     = "";
wFORMS.behaviors['validation'].errMsg_alphanum     = "Kérem csak alfa-numerikus (csak betűket és számokat tartalmazó)karaktereket adjon meg.";
wFORMS.behaviors['validation'].errMsg_date         = "Ez nem tűnik értelmes dátumnak.";
wFORMS.behaviors['validation'].errMsg_notification = "%% hibát találtam. Az űrlapot még nem nyújtotta be.\nKérem ellenőrizze a megadott értékeket."; // %% will be replaced by the actual number of errors.

wf.arrMsg[0] = "Még egy elem hozzáadása"; // repeat link
wf.arrMsg[1] = "" // title attribute on the repeat link
wf.arrMsg[2] = "Eltávolítás"; // remove link
wf.arrMsg[3] = "" // title attribute on the remove link
wf.arrMsg[4] = "Következő lap";
wf.arrMsg[5] = "Előző lap";


wf.isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u00C0-\u00FF\u0100-\u017F]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wf.isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u00C0-\u00FF\u0100-\u017F]+$/;
	return this.isEmpty(s) || reg.test(s);
}