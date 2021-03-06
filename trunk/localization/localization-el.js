﻿// Localization for wForms - a javascript extension to web forms.
// Greek   - Aug 3rd 2006.
// Thanks to BoB [the Mastor]
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
//
// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-el.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "Το πεδίο είναι υποχρεωτικό"; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "Το κείμενο μπορεί να περιέχει μόνο χαρακτήρες κειμένου (α-ω, Α-Ω). Δεν επιτρέπονται."; // no numbers 
wFORMS.behaviors['validation'].errMsg_email        = "Η διεύθυνση ηλεκτρονικού ταχυδρομείου δεν είναι έγκυρη."; // validate email 
wFORMS.behaviors['validation'].errMsg_integer      = "Παρακαλώ εισάγετε έναν αριθμό"; // integer 
wFORMS.behaviors['validation'].errMsg_float        = "Παρακαλώ εισάγετε δεκαδικό (πχ. 1.9)."; // float 
wFORMS.behaviors['validation'].errMsg_password     = ""; // password
wFORMS.behaviors['validation'].errMsg_alphanum     = "Το κείμενο μπορεί να περιέχει μόνο αριθμητικούς χαρακτήρες (α-ω, 0-9)."; // alphanumeric
wFORMS.behaviors['validation'].errMsg_date         = "Η ημερομηνία δεν είναι έγκυρη."; // date
wFORMS.behaviors['validation'].errMsg_notification = "%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided."; // %% errors.

wf.arrMsg[0] = "Προσθληκη κλόνου στοιχείου"; // repeat row
wf.arrMsg[1] = "" // repeat row title 
wf.arrMsg[2] = "Αφαίρεση"; // remove row
wf.arrMsg[3] = "" // remove row title
wf.arrMsg[4] = "Επόμενη σελίδα";
wf.arrMsg[5] = "Προηγούμενη σελίδα";


// Alpha-Numeric Input Validation: 
wFORMS.behaviors['validation'].isAlpha = function(s) {
	var reg = /^[\u0370-\u03FF]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wFORMS.behaviors['validation'].isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0370-\u03FF]+$/;
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
