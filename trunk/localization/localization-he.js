// Localization for wForms - a javascript extension to web forms.
// Hebrew   - Aug 3rd 2006.
// Thanks to Yotam
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
//
// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-el.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "שדה זה הינו הכרחי"; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "הטקסט חייב להיות אותיות בלבד (א-ת). מספרים אינם מותרים"; // no numbers 
wFORMS.behaviors['validation'].errMsg_email        = "הכתובת שהוזנה אינה כתובת דואל חוקית"; // validate email 
wFORMS.behaviors['validation'].errMsg_integer      = "אנא הכנס מספר"; // integer 
wFORMS.behaviors['validation'].errMsg_float        = "אנא הכנס שבר"; // float 
wFORMS.behaviors['validation'].errMsg_password     = ""; // password
wFORMS.behaviors['validation'].errMsg_alphanum     = "אנא הכנס טקטס בלבד - מספרים או אותיות"; // alphanumeric
wFORMS.behaviors['validation'].errMsg_date         = "הנתונים שהוכנסו אינם חוקים"; // date
wFORMS.behaviors['validation'].errMsg_notification = "%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided."; // %% errors.

wf.arrMsg[0] = "הוסף תגובה נוספת"; // repeat row
wf.arrMsg[1] = "" // repeat row title 
wf.arrMsg[2] = "הסר"; // remove row
wf.arrMsg[3] = "" // remove row title
wf.arrMsg[4] = "דף הבא";
wf.arrMsg[5] = "דף קודם";


// Alpha-Numeric Input Validation: 
wFORMS.behaviors['validation'].isAlpha = function(s) {
	var reg = /^[\u0590–\u05FF]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wFORMS.behaviors['validation'].isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0590–\u05FF]+$/;
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
