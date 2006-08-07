// Norwegian Localization for wForms - a javascript extension to web forms.
// wForms Norwegian  v2.0 - July 18th 2006
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be loaded *AFTER* wforms.js 
// Exemple: 
// <head>...
// <script type="text/javascript" src="js/wforms.js" ></script>
// <script type="text/javascript" src="js/localization-francais.js" ></script>
// </head>


wFORMS.behaviors['validation'].errMsg_required     = "Dette feltet er obligatorisk."; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "Teksten m&Atilde;&yen; kun best&Atilde;&yen; av bokstaver (a-z, A-Z). Tall er ikke lov."; 	// validate_alpha
wFORMS.behaviors['validation'].errMsg_email        = "Dette ser ut som du ikke har lagt til en gyldig epostadresse.";									// validate_email
wFORMS.behaviors['validation'].errMsg_integer      = "Vennligst fyll ut.";															// validate_integer
wFORMS.behaviors['validation'].errMsg_float        = "Vennligst fyll inn f.eks 1.0";
wFORMS.behaviors['validation'].errMsg_password     = "";	
wFORMS.behaviors['validation'].errMsg_alphanum     = "Vennligst kun bruk sm&Atilde;&yen; bokstaver og tall";
wFORMS.behaviors['validation'].errMsg_date         = "Dette er ikke en gyldig dato";
wFORMS.behaviors['validation'].errMsg_notification = "%% feil ble oppdaget. Skjemaet har enda ikke blitt sendt.\nVennligst sjekk informasjonen du har angitt."; // %% will be replaced by the actual number of errors.
	
// Other Messages
wf.arrMsg = new Array();
wf.arrMsg[0] = "Legg til ekstra felt"; 	// repeat link
wf.arrMsg[1] = "" // title attribute on the repeat link 
wf.arrMsg[2] = "Fjern"; 		// remove link
wf.arrMsg[3] = "" // title attribute on the remove link
wf.arrMsg[4] = "Neste side";
wf.arrMsg[5] = "Forrige side";	
	
// Alpha-Numeric Input Validation: 
wf.isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u00C0-\u00FF]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wf.isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u00C0-\u00FF]+$/;
	return this.isEmpty(s) || reg.test(s);
}
// Unicode ranges (from http://www.unicode.org/) :
// \u0030-\u0039 : Numbers 0-9
// \u0041-\u007A : Basic Latin : For english, and ASCII only strings (ex: username, password, ..)
// \u00C0-\u00FF : Latin-1 : For Danish, Dutch, Faroese, Finnish, Flemish, German, Icelandic, Irish, Italian, Norwegian, Portuguese, Spanish, and Swedish.
// \u0100\u017F : Latin Extended-A (to be used with Basic Latin and Latin-1) : Afrikaans, Basque, Breton, Catalan, Croatian, Czech, Esperanto, Estonian, French, Frisian, Greenlandic, Hungarian, Latin, Latvian, Lithuanian, Maltese, Polish, Provenal, Rhaeto-Romanic, Romanian, Romany, Sami, Slovak, Slovenian, Sorbian, Turkish, Welsh, and many others.
// \u0180\u024F : Latin Extended-B (to be used with Basic Latin and Latin-1) : ?
// \u1E00\u1EFF : Latin Extended Additional : Vietnamese ?
// \u0370-\u03FF : Greek
// \u0400-\u04FF : Cyrillic : Russian, etc..
// \u0590\u05FF : Hebrew (and #FB1D - #FB4F ?)
// \u0600\u06FF : Arabic
// \u0900\u097F : Devanagari : Hindi, etc..
// \u4E00\u9FFF : Han - common ideographs : Chinese, Japanese, and Korean languages.
// See http://www.unicode.org/charts/ for other languages

