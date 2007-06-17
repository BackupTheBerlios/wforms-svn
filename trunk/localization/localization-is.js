// Localization for wForms - a javascript extension to web forms.
// Icelandic - June 2007
// Thanks to Hafsteinn M. Másson
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
//
// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-is.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "Nauðsynlegt er að fylla út þennan reit."; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "Texti má aðeins innihalda stafi (a-z, A-Z). Tölustafir eru ekki leyfðir."; // no numbers 
wFORMS.behaviors['validation'].errMsg_email        = "Netfang er ekki rétt slegið inn."; // validate email 
wFORMS.behaviors['validation'].errMsg_integer      = "Ritaðu inn heiltölu."; // integer 
wFORMS.behaviors['validation'].errMsg_float        = "Ritaðu inn flot (t.d. 1.9)."; // float 
wFORMS.behaviors['validation'].errMsg_password     = ""; // password
wFORMS.behaviors['validation'].errMsg_alphanum     = "Aðeins má nota hefðbundna stafi eða tölustafi (a-z, 0-9)."; // alphanumeric
wFORMS.behaviors['validation'].errMsg_date         = "Dagsetning ekki rétt slegið inn."; // date
wFORMS.behaviors['validation'].errMsg_notification = "%% villur fundust. Eyðublaðið hefur ekki enn verið sent. Gakktu úr skugga um að allar upplýsingar séu rétt slegnar inn."; // %% errors.

wf.arrMsg[0] = "Bæta við svari"; // repeat row
wf.arrMsg[1] = "" // repeat row title 
wf.arrMsg[2] = "Fjarlægja"; // remove row
wf.arrMsg[3] = "" // remove row title
wf.arrMsg[4] = "Næsta síða";
wf.arrMsg[5] = "Fyrri síða";


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

