// Localization for wForms - a javascript extension to web forms.
// Turkish v2.0 - July 18th 2006
// Thanks to Faruk Nisanci
//
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
//
// See http://formassembly.com/blog/how-to-localize-wforms/
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-tr.js" ></script>
// </head>
// Error messages. wf array may be overwritten in a separate js file for localization or customization purpose.

	wFORMS.behaviors['validation'].errMsg_required     = "Bu alan zorunludur. "; // required 
	wFORMS.behaviors['validation'].errMsg_alpha        = "Metin sadece alfabetik karakterleri (a-z, A-Z) kullanmalıdır. Rakamlar kullanılamaz. "; 	// validate_alpha
	wFORMS.behaviors['validation'].errMsg_email        = "Geçerli bir e-mail adresi olarak görünmüyor.";									// validate_email
	wFORMS.behaviors['validation'].errMsg_integer      = "Lütfen bir tamsayı giriniz.";															// validate_integer
	wFORMS.behaviors['validation'].errMsg_float        = "Lütfen bir sayı giriniz (Ör: 1.9).";
	wFORMS.behaviors['validation'].errMsg_password     = "Basit şifre. Şifreniz 4-12 karakter uzunluğunda olmalı ve büyük-küçük harf kombinasyonları içermelidir.";
	wFORMS.behaviors['validation'].errMsg_alphanum     = "Lütfen sadece alfanümerik karakterler kullanınız (a-z 0-9).";
	wFORMS.behaviors['validation'].errMsg_date         = "Geçerli bir tarih olarak görünmüyor.";
	wFORMS.behaviors['validation'].errMsg_notification = "%% hata bulundu. Formunuz henüz gönderilmedi.\nLütfen girdiğiniz bilgiyi kontrol ediniz.";
	
	// Other Messages
	wf.arrMsg[0] = "Bir satır ekle"; 	// repeat link
	wf.arrMsg[1] = "Önceki alanı veya alan grubunu tekrarlar." // title attribute on the repeat link 
	wf.arrMsg[2] = "Çıkar"; 		// remove link
	wf.arrMsg[3] = "Önceki alan veya alan grubunu çıkarır." // title attribute on the remove link
	wf.arrMsg[4] = "Sonraki Sayfa";
	wf.arrMsg[5] = "Önceki Sayfa";
	
	wf.isAlpha = function(s) {
		var reg = /^[\u0041-\u007A\u00C0-\u00FF\u0100–\u017F]+$/; // Add ' and - ?
		return this.isEmpty(s) || reg.test(s);
	}
	wf.isAlphaNum = function(s) {
		var illegalChars = /[^\u0030-\u0039\u0041-\u007A\u00C0-\u00FF\u0100–\u017F]/;
		return self.isEmpty(s) || !illegalChars.test(s);
	}
 

