// Localization for wForms - a javascript extension to web forms.
// German v2.0 - July 18th 2006
// Thanks to Steffen Gransow
//
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
//
// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-german.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "Diese Eingabe ist Pflicht."; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "Geben Sie bitte nur Buchstaben (a-z, A-Z) ein. Zahlen sind nicht erlaubt."; // validate_alpha
wFORMS.behaviors['validation'].errMsg_email        = "Geben Sie bitte eine gltige Emailadresse ein."; //  validate_email
wFORMS.behaviors['validation'].errMsg_integer      = "Geben Sie bitte eine ganze Zahl ein."; //  validate_integer
wFORMS.behaviors['validation'].errMsg_float        = "Geben Sie bitte eine Zahl ein (z.B 1.9).";
wFORMS.behaviors['validation'].errMsg_password     = "Unsicheres Passwort. Ihr Passwort sollte zwischen 4 und 12 Zeichen lang sein und eine Kombination aus Gro- und Kleinbuchstaben enthalten.";
wFORMS.behaviors['validation'].errMsg_alphanum     = "Geben Sie bitte alphanumerische Zeichen ein (a-z, 0-9).";
wFORMS.behaviors['validation'].errMsg_date         = "Geben Sie bitte ein gltiges Datum ein.";
wFORMS.behaviors['validation'].errMsg_notification = "%% Fehler entdeckt. Das Formular wurde noch nicht abgeschickt.\nBitte prfen Sie ihre Eingaben."; // %% will be replaced by the actual number of errors.

wf.arrMsg[0] = "Zeile hinzufgen"; // repeat link
wf.arrMsg[1] = "Wiederholt das vorherige Feld oder die Gruppe von Feldern." // title attribute on the repeat link
wf.arrMsg[2] = "Entfernen"; // remove link
wf.arrMsg[3] = "Entfernen des vorstehenden Felds bzw. der vorstehenden Gruppe von Feldern." // title attribute on the remove link
wf.arrMsg[4] = "Nchste Seite";
wf.arrMsg[5] = "Vorherige Seite";

// Alpha-Numeric Input Validation: 
wf.isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u00C0-\u00FF\u0100-\u017F]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wf.isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u00C0-\u00FF\u0100-\u017F]+$/;
	return this.isEmpty(s) || reg.test(s);
}
// Unicode ranges (from http://www.unicode.org/) :
// \u0030-\u0039 : Numbers 0-9
// \u0041-\u007A : Basic Latin : For english, and ASCII only strings (ex: username, password, ..)
// \u00C0-\u00FF : Latin-1 : For Danish, Dutch, Faroese, Finnish, Flemish, German, Icelandic, Irish, Italian, Norwegian, Portuguese, Spanish, and Swedish.
// \u0100-\u017F : Latin Extended-A (to be used with Basic Latin and Latin-1) : Afrikaans, Basque, Breton, Catalan, Croatian, Czech, Esperanto, Estonian, French, Frisian, Greenlandic, Hungarian, Latin, Latvian, Lithuanian, Maltese, Polish, Provenal, Rhaeto-Romanic, Romanian, Romany, Sami, Slovak, Slovenian, Sorbian, Turkish, Welsh, and many others.
// \u0180-\u024F : Latin Extended-B (to be used with Basic Latin and Latin-1) : ?
// \u1E00-\u1EFF : Latin Extended Additional : Vietnamese ?
// \u0370-\u03FF : Greek
// \u0400-\u04FF : Cyrillic : Russian, etc..
// \u0590-\u05FF : Hebrew (and #FB1D - #FB4F ?)
// \u0600-\u06FF : Arabic
// \u0900-\u097F : Devanagari : Hindi, etc..
// \u4E00-\u9FFF : Han - common ideographs : Chinese, Japanese, and Korean languages.
// See http://www.unicode.org/charts/ for other languages
