////////////////////////////////////////////////////////////////////////////////
// wForms v2.0 - Italian localization file                                    //
// Author: Domenico Testa <domenico.testa@gmail.com>                          //
// This software is licensed under the CC-GNU LGPL 							  //
// <http://creativecommons.org/licenses/LGPL/2.1/> 							  //
// See http://www.formassembly.com/wForms and								  //
// http://www.formassembly.com/blog/how-to-localize-wforms/ for details		  //
////////////////////////////////////////////////////////////////////////////////

// Messaggi d'errore.
wf.arrErrorMsg = new Array();
wFORMS.behaviors['validation'].errMsg_required     = "Questo campo  richiesto. ";                      // required
wFORMS.behaviors['validation'].errMsg_alpha        = "Il testo deve contenere soltanto caratteri alfabetici. I numeri non sono ammessi. "; // validate_alpha
wFORMS.behaviors['validation'].errMsg_email        = "Questo non sembra essere un indirizzo email valido. ";   // validate_email
wFORMS.behaviors['validation'].errMsg_integer      = "Inserire un numero intero. ";                          // validate_integer
wFORMS.behaviors['validation'].errMsg_float        = "Inserire un numero reale (ad esempio 1,9). ";
wFORMS.behaviors['validation'].errMsg_password     = "Password poco sicura. Una password dovrebbe essere di lunghezza compresa tra i 4 e i 12 caratteri e dovrebbe essere composta da una combinazione di lettere minuscole e maiuscole. ";
wFORMS.behaviors['validation'].errMsg_alphanum     = "Il testo devo contenere solo caratteri alfanumerici [a-z 0-9]. ";
wFORMS.behaviors['validation'].errMsg_date         = "Questa non sembra essere una data valida. ";
wFORMS.behaviors['validation'].errMsg_notification = "Sono stati riscontrati %% errori. Il modulo non  stato ancora inviato.\nControllare le informazioni digitate."; // %% will be replaced by the actual number of errors.

// Altri Messaggi.
wf.arrMsg = new Array();
wf.arrMsg[0] = "Aggiungi una riga"; 	// repeat link
wf.arrMsg[1] = "Ripete il campo o il gruppo di campi precedenti."; // title attribute on the repeat link 
wf.arrMsg[2] = "Rimuovi"; 		// remove link
wf.arrMsg[3] = "Rimuove il campo o il gruppo di campi precedenti."; // title attribute on the remove link
wf.arrMsg[4] = "Prossima Pagina";
wf.arrMsg[5] = "Pagina Precedente";

/** Alphabetic chars string validation function */
wf.isAlpha = function(s) {
    var reg = /^[\u0041-\u007A\u00C0-\u00FF\u0100\u017F]+$/;
    return this.isEmpty(s) || reg.test(s);
}

/** Alphanumeric chars string validation function*/
wf.isAlpha = function(s) {
    var reg = /^[\u0030-\u0039\u0041-\u007A\u00C0-\u00FF\u0100\u017F]+$/;
    return this.isEmpty(s) || reg.test(s);
}
