// Localization for wForms - a javascript extension to web forms.
// Spanish v2.0 - July 18th 2006
// Thanks to Pablo Daz (http://www.onetune.com) and Jorge Mesa
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>

// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-spanish.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "Campo obligatorio. "; /// required 
wFORMS.behaviors['validation'].errMsg_alpha        = "Slo se admiten letras (a-z A-Z). No se permiten nmeros. "; // no numbers 
wFORMS.behaviors['validation'].errMsg_email        = "No es una direccin de correo vlida."; // validate email 
wFORMS.behaviors['validation'].errMsg_integer      = "Introduzca un valor numrico."; // integer 
wFORMS.behaviors['validation'].errMsg_float        = "Introduzca un valor decimal (ej: 1.9) ."; // float 
wFORMS.behaviors['validation'].errMsg_password     = "Contrasea insegura. Se admite una combinacin de maysculas y minsculas de entre 4 y 12 caracteres. "; // password
wFORMS.behaviors['validation'].errMsg_alphanum     = "nicamente caracteres alfanumricos (a-z 0-9). "; // alphanumeric
wFORMS.behaviors['validation'].errMsg_date         = "La fecha no es correcta"; // date
wFORMS.behaviors['validation'].errMsg_notification = "Se ha(n) encontrado %% error(es). El formulario no se ha enviado.\nVerifique los datos introducidos."; // %% errors.

wf.arrMsg[0] = "Aadir una fila"; // repeat row
wf.arrMsg[1] = "Repite el campo o grupo anterior." // repeat row title 
wf.arrMsg[2] = "Eliminar"; // remove row
wf.arrMsg[3] = "Borra el campo o grupo anterior." // remove row title
wf.arrMsg[4] = "Pgina siguiente";
wf.arrMsg[5] = "Pgina anterior";

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
