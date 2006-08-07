// Localization for wForms - a javascript extension to web forms.
// Japanese v1.0  - March 27th 2006.
// Thanks to cat-walk
// This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
//
// See http://formassembly.com/wForms/
//
// This must be included *AFTER* wforms.js 
// Example: 
// <head>...
// <script type="text/javascript" src="wforms.js" ></script>
// <script type="text/javascript" src="localization-jp.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     =  "This field is required"; 	// required
wFORMS.behaviors['validation'].errMsg_alpha        = "アルファベットのみ(a-z,A-Z)を使わなければいけません。数字は使えません。"; 	// validate_alpha
wFORMS.behaviors['validation'].errMsg_email        = "このemailアドレスは正しくありません。"; 	// validate_email
wFORMS.behaviors['validation'].errMsg_integer      = "数字を入力してください。";															// validate_integer
wFORMS.behaviors['validation'].errMsg_float        = "Please enter a float (ex. 1.9).";			// validate_float
wFORMS.behaviors['validation'].errMsg_password     =  "";
wFORMS.behaviors['validation'].errMsg_alphanum     = "英数字のみを使用してください(a-z,0-9)。"; // validate_alphanum
wFORMS.behaviors['validation'].errMsg_date         = "This does not appear to be a valid date.";
wFORMS.behaviors['validation'].errMsg_notification = "%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided."; 	// %% will be replaced by the actual number of errors.
	
	// Other Messages

wf.arrMsg[0] = "他のレスを追加する"; 	// repeat link
wf.arrMsg[1] = "." 	// title attribute on the repeat link 
wf.arrMsg[2] = "削除"; 	// remove link
wf.arrMsg[3] = "." 	// title attribute on the remove link
wf.arrMsg[4] = "次のページ";
wf.arrMsg[5] = "前のページ";	


wf.isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u4E00-\u9FFF]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wf.isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u4E00-\u9FFF]+$/;
	return this.isEmpty(s) || reg.test(s);
}