// Localization for wForms - a javascript extension to web forms.
// Czech v2.0 - July 18th 2006
// Thanks to Martin Jon
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
//
// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-cz.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "Toto pole je povinn."; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "V textu nejsou povoleny cslice."; // no numbers 
wFORMS.behaviors['validation'].errMsg_email        = "Toto nen sprvn e-mailov adresa."; // validate email 
wFORMS.behaviors['validation'].errMsg_integer      = "Zadejte cslo."; // integer 
wFORMS.behaviors['validation'].errMsg_float        = "VZadejte desetin cslo."; // float 
wFORMS.behaviors['validation'].errMsg_password     = ""; // password
wFORMS.behaviors['validation'].errMsg_alphanum     = "Pouijte pouze psmena (A-Z) a csla (0-9)."; // alphanumeric
wFORMS.behaviors['validation'].errMsg_date         = "Zadejte sprvn datum."; // date
wFORMS.behaviors['validation'].errMsg_notification = "%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided."; // %% errors.

wf.arrMsg[0] = "Add another response"; // repeat row
wf.arrMsg[1] = "" // repeat row title 
wf.arrMsg[2] = "Remove"; // remove row
wf.arrMsg[3] = "" // remove row title
wf.arrMsg[4] = "Next Page";
wf.arrMsg[5] = "Previous Page";


// Alpha-Numeric Input Validation: 
wf.isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u00C0-\u00FF\u0100\u017F]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wf.isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u00C0-\u00FF\u0100\u017F]+$/;
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

