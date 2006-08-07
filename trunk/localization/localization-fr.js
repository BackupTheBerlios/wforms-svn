// French Localization for wForms - a javascript extension to web forms.
// wForms French v0.98 - May 09 2005.
// Copyright (c) 2005 Cdric Savarese <pro@4213miles.com>
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>

// See http://formassembly.com/blog/how-to-localize-wforms/
// The fichier doit tre inclu *aprs* wforms.js 
// Exemple: 
// <head>...
// <script type="text/javascript" src="js/wforms.js" ></script>
// <script type="text/javascript" src="js/localization-francais.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "Champs requis"; /// "This field is required. "; 
wFORMS.behaviors['validation'].errMsg_alpha        = "Caractères alphabétiques uniquement (a-z)"; // The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed. "; 	
wFORMS.behaviors['validation'].errMsg_email        = "Adresse email invalide"; //This does not appear to be a valid email address."						
wFORMS.behaviors['validation'].errMsg_integer      = "Entrez un nombre entier"; // Please enter an integer."															
wFORMS.behaviors['validation'].errMsg_float        = "Entrez un nombre"; // Please enter a float (ex. 1.9) ."
wFORMS.behaviors['validation'].errMsg_password     = ""; // password - not implemented
wFORMS.behaviors['validation'].errMsg_alphanum     = "Caractères alpha-numeriques uniquement (a-z 0-9)"; // alpha-numeric only
wFORMS.behaviors['validation'].errMsg_date         = "Date invalide"; // invalid date
wFORMS.behaviors['validation'].errMsg_notification = "Il y a %% erreur(s). Votre formulaire n'a pas été envoyé.\nVérifiez les informations saisies."; // %% will be replaced by the actual number of errors.

wf.arrMsg[0] = "Ajouter"; 	// repeat link
wf.arrMsg[1] = "." // title attribute on the repeat link 
wf.arrMsg[2] = "Supprimer"; 		// remove link
wf.arrMsg[3] = "" // title attribute on the remove link
wf.arrMsg[4] = "Page suivante";
wf.arrMsg[5] = "Page précédente";

// Alpha-Numeric Input Validation: 

wFORMS.behaviors['validation'].isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u00C0-\u00FF\u0100\u017F]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wFORMS.behaviors['validation'].isAlphaNum = function(s) {
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
