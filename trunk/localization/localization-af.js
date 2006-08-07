// Localization for wForms - a javascript extension to web forms.
// Afrikaans v2  - July 19th 2006.
// Thanks to Arno Esterhuizen
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
//
// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-af.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "Hierdie veld is verpligtend."; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "Die teks moet slegs alfabetiese karakters gebruik (a-z, A-Z). Syfers word nie toegelaat nie."; // no numbers 
wFORMS.behaviors['validation'].errMsg_email        = "Hierdie blyk nie 'n geldige eposadres te wees nie."; // validate email 
wFORMS.behaviors['validation'].errMsg_integer      = "Voer asseblief \'n heelgetal in."; // integer 
wFORMS.behaviors['validation'].errMsg_float        = "Voer asseblief \'n wisselpuntgetal in (bv 1.9)."; // float 
wFORMS.behaviors['validation'].errMsg_password     = "Onveilige wagwoord. Jou wagwoord behoort tussen 4 en 12 karakters lank te wees en \'n kombinasie van hoofletters en kleinletters wees."; // password
wFORMS.behaviors['validation'].errMsg_alphanum     = "Gebruik asseblief slegs alfa-numeriese karakters [a-z 0-9]"; // alphanumeric
wFORMS.behaviors['validation'].errMsg_date         = "Hierdie blyk nie \'n geldige datum te wees nie."; // date
wFORMS.behaviors['validation'].errMsg_notification = "%% foute opgespoor. Jou vorm is nognie ingestuur nie.\nGaan asseblief die inligting wat jy ingevoer het na."; // %% errors.

wf.arrMsg[0] = "Voeg nog \'n antwoord by"; // repeat row
wf.arrMsg[1] = "Sal hierdie vraag of afdeling herhaal." // repeat row title 
wf.arrMsg[2] = "Verwyder"; // remove row
wf.arrMsg[3] = "Sal hierdie vraag of afdeling verwyder." // remove row title
wf.arrMsg[4] = "Volgende Bladsy";
wf.arrMsg[5] = "Vorige Bladsy";


// Alpha-Numeric Input Validation: 
wFORMS.behaviors['validation'].isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u00C0-\u00FF\u0100–\u017F]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wFORMS.behaviors['validation'].isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u00C0-\u00FF\u0100–\u017F]+$/;
	return this.isEmpty(s) || reg.test(s);
}
// Unicode ranges (from http://www.unicode.org/) :
// \u0030-\u0039 : Numbers 0-9
// \u0041-\u007A : Basic Latin : For english, and ASCII only strings (ex: username, password, ..)
// \u00C0-\u00FF : Latin-1 : For Danish, Dutch, Faroese, Finnish, Flemish, German, Icelandic, Irish, Italian, Norwegian, Portuguese, Spanish, and Swedish.
// \u0100–\u017F : Latin Extended-A (to be used with Basic Latin and Latin-1) : Afrikaans, Basque, Breton, Catalan, Croatian, Czech, Esperanto, Estonian, French, Frisian, Greenlandic, Hungarian, Latin, Latvian, Lithuanian, Maltese, Polish, Provençal, Rhaeto-Romanic, Romanian, Romany, Sami, Slovak, Slovenian, Sorbian, Turkish, Welsh, and many others.
// \u0180–\u024F : Latin Extended-B (to be used with Basic Latin and Latin-1) : ?
// \u1E00–\u1EFF : Latin Extended Additional : Vietnamese ?
// \u0370-\u03FF : Greek
// \u0400-\u04FF : Cyrillic : Russian, etc..
// \u0590–\u05FF : Hebrew (and #FB1D - #FB4F ?)
// \u0600–\u06FF : Arabic
// \u0900–\u097F : Devanagari : Hindi, etc..
// \u4E00–\u9FFF : Han - common ideographs : Chinese, Japanese, and Korean languages.
// See http://www.unicode.org/charts/ for other languages

