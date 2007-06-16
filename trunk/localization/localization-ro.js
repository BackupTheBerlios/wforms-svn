// Localization for wForms - a javascript extension to web forms.
// Romanian v1.00  - April 19th 2007.
// Thanks to Eduard Irimia
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
//
// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-ro.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required = "Completarea acestui camp este obligatorie."; // required
wFORMS.behaviors['validation'].errMsg_alpha  = "Textul introdus trebuie sa contina doar caractere alfabetice (literele alfabetului: a-z, A-Z). Numerele nu sunt permise."; // no numbers 
wFORMS.behaviors['validation'].errMsg_email = "Nu ati introdus o adresa de email valida."; // validate email 
wFORMS.behaviors['validation'].errMsg_integer = "Va rugam sa introduceti un numar intreg."; // integer 
wFORMS.behaviors['validation'].errMsg_float = "Va rugam sa introduceti un numar real (ex. 1,93)."; // float 
wFORMS.behaviors['validation'].errMsg_password = ""; // password
wFORMS.behaviors['validation'].errMsg_alphanum = "Va rugam sa introduceti numai caractere alfa-numerice (litere de la \"a\" la \"z\" si cifre de la 1 la 9)." // alphanumeric
wFORMS.behaviors['validation'].errMsg_date = "Nu ati introdus data intr-un format corect."; // date
wFORMS.behaviors['validation'].errMsg_notification = "Au fost depistate erori la completarea formularului. Datele completate nu au fost procesate. Va rugam sa corectati sau sa completati informatia furnizata ."; // %% errors.

wf.arrMsg[0] = "Adauga alta varianta de raspuns"; // repeat row
wf.arrMsg[1] = "Sterge" // repeat row title 
wf.arrMsg[2] = "Pagina urmatoare" // remove row
wf.arrMsg[3] = "Pagina anterioara" // remove row title
wf.arrMsg[4] = "";
wf.arrMsg[5] = "";


// Alpha-Numeric Input Validation: 
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

wFORMS.behaviors['validation'].isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u00C0-\u00FF\u0100\u017F]+$/; 
	return this.isEmpty(s) || reg.test(s);
}


wFORMS.behaviors['validation'].isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u00C0-\u00FF\u0100\u017F]+$/;
	return this.isEmpty(s) || reg.test(s);
}