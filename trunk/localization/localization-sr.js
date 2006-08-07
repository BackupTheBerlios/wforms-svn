// Localization for wForms - a javascript extension to web forms.
// Serbian  v2.0 - July 18th 2006
// Thanks to Bojan Zivanovic
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

wFORMS.behaviors['validation'].errMsg_required     = "Ovo polje je obavezno."; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "Ovaj tekst mora da koristi samo slova abecede (a-ž, A-Ž). Brojevi nisu dozvoljeni."; // validate_alpha
wFORMS.behaviors['validation'].errMsg_email        = "Ovo ne liči na pravilnu email adresu."; //  validate_email
wFORMS.behaviors['validation'].errMsg_integer      = "Molim vas unesite ceo broj."; //  validate_integer
wFORMS.behaviors['validation'].errMsg_float        = "Molim vas unesite decimalan broj (npr. 1.9).";
wFORMS.behaviors['validation'].errMsg_password     = "Nesigurna lozinka. Vaša lozinka treba da bude između 4 und 12 karaktera i da koristi kombinaciju malih i velikih slova.";
wFORMS.behaviors['validation'].errMsg_alphanum     = "Molim vas koristite samo slova abecede i brojeve (a-ž, 0-9).";
wFORMS.behaviors['validation'].errMsg_date         = "Ovo ne liči na pravilan datum.";
wFORMS.behaviors['validation'].errMsg_notification = "%% grešaka nađeno. Vaš formular još nije poslat.\n Molim vas proverite podatke koje ste uneli."; // %% will be replaced by the actual number of errors.

wf.arrMsg[0] = "Dodaj red"; // repeat link
wf.arrMsg[1] = "Ponavlja prethodno polje ili grupu polja." // title attribute on the repeat link
wf.arrMsg[2] = "Obriši"; // remove link
wf.arrMsg[3] = "Briše prethodno polje ili grupu polja." // title attribute on the remove link
wf.arrMsg[4] = "Sledeća strana";
wf.arrMsg[5] = "Prethodna strana";

// Alpha-Numeric Input Validation: 

wf.isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u0100-\u017F]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wf.isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u0100-\u017F]+$/;
	return this.isEmpty(s) || reg.test(s);
}
// Unicode ranges (from http://www.unicode.org/) :
// \u0030-\u0039 : Numbers 0-9
// \u0041-\u007A : Basic Latin : For english, and ASCII only strings (ex: username, password, ..)
// \u00C0-\u00FF : Latin-1 : For Danish, Dutch, Faroese, Finnish, Flemish, German, Icelandic, Irish, Italian, Norwegian, Portuguese, Spanish, and Swedish.
// \u0100-\u017F : Latin Extended-A (to be used with Basic Latin and Latin-1) : Afrikaans, Basque, Breton, Catalan, Croatian, Czech, Esperanto, Estonian, French, Frisian, Greenlandic, Hungarian, Latin, Latvian, Lithuanian, Maltese, Polish, Provençal, Rhaeto-Romanic, Romanian, Romany, Sami, Slovak, Slovenian, Sorbian, Turkish, Welsh, and many others.
// \u0180-\u024F : Latin Extended-B (to be used with Basic Latin and Latin-1) : ?
// \u1E00-\u1EFF : Latin Extended Additional : Vietnamese ?
// \u0370-\u03FF : Greek
// \u0400-\u04FF : Cyrillic : Russian, etc..
// \u0590-\u05FF : Hebrew (and #FB1D - #FB4F ?)
// \u0600-\u06FF : Arabic
// \u0900-\u097F : Devanagari : Hindi, etc..
// \u4E00-\u9FFF : Han - common ideographs : Chinese, Japanese, and Korean languages.
// See http://www.unicode.org/charts/ for other languages
