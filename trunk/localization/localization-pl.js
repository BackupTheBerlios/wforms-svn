// Polska lokalizacja dla wForms, biblioteki JavaScript dla formularzy elektronicznych
// wForms po polsku v2.0 - July 18th 2006
// Kuba Mielczarek (kuba@tenit.com.pl)
// Ten program jest na licencji CC-GNU LGPL(http://creativecommons.org/licenses/LGPL/2.1/)
// Aby uzyska wicej informacji odwied: http://formassembly.com/blog/how-to-localize-wforms/
// Przykad uycia: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-pl.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "Pole jest wymagane! "; // required
wFORMS.behaviors['validation'].errMsg_alpha        = "Warto musi zawiera tylko litery z zakresu (a-z, A-Z). Liczby s niedozwolone. "; 	// validate_alpha
wFORMS.behaviors['validation'].errMsg_email        = "To nie jest prawidowy adres email.";									// validate_email
wFORMS.behaviors['validation'].errMsg_integer      = "Prosz wprowadzi liczb cakowit.";															// validate_integer
wFORMS.behaviors['validation'].errMsg_float        = "Prosz wprowadzi liczb zmiennoprzecinkow (np. 1.9).";
wFORMS.behaviors['validation'].errMsg_password     = "Niebezpieczne haso. Haso powinno mie dugo od 4 do 12 znakw i by kombinacj DUYCH i maych liter.";	
wFORMS.behaviors['validation'].errMsg_alphanum     = "Warto musi zawiera tylko znaki alfanumeryczne [a-z 0-9].";
wFORMS.behaviors['validation'].errMsg_date         = "To nie jest prawidowa data.";
wFORMS.behaviors['validation'].errMsg_notification = "Ilo wykrytych bdw: %%. Formularz nie zosta przesany.\nSprawd wartoci ktre podae."; // %% will be replaced by the actual number of errors.
	
// Other Messages
wf.arrMsg = new Array();
wf.arrMsg[0] = "Dodaj wiersz"; 	// repeat link
wf.arrMsg[1] = "Powtarza poprzedzajce pole lub grup p." // title attribute on the repeat link 
wf.arrMsg[2] = "Usu"; 		// remove link
wf.arrMsg[3] = "Usuwa poprzedzajce pole lub grup p." // title attribute on the remove link
wf.arrMsg[4] = "Nastpna Strona";
wf.arrMsg[5] = "Poprzednia Strona";	
	
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

