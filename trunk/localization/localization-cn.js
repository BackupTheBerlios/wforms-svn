wFORMS.behaviors['validation'].errMsg_required     = "必填栏位. "; // required
wFORMS.behaviors['validation'].errMsg_alpha     = "文字必需是英文字母(a-z, A-Z). 数字是不允许的. "; 	// validate_alpha
wFORMS.behaviors['validation'].errMsg_email     = "这是不正确的email位址.";									// validate_email
wFORMS.behaviors['validation'].errMsg_integer     = "请输入整数.";															// validate_integer
wFORMS.behaviors['validation'].errMsg_float     = "请输入浮点数(例如. 1.9).";
wFORMS.behaviors['validation'].errMsg_password     = "不安全的密码. 您的密码必须是4到12个字母, 大写或小写的字元组合.";
wFORMS.behaviors['validation'].errMsg_alphanum     = "只使用字母或数字[a-z 0-9].";
wFORMS.behaviors['validation'].errMsg_date     = "请是不正确的日期.";
wFORMS.behaviors['validation'].errMsg_notification     = "%% 错误被侦测到. 您的表单无法送出.\n请检查您所提供的资料."; // %% will be replaced by the actual number of errors.
	
	// Other Messages

wf.arrMsg[0] = "新增一列"; 	// repeat link
wf.arrMsg[1] = "重覆上一个栏位或栏位群组." // title attribute on the repeat link 
wf.arrMsg[2] = "移除"; 		// remove link
wf.arrMsg[3] = "移除上一个栏位或栏位群组." // title attribute on the remove link
wf.arrMsg[4] = "下一页";
wf.arrMsg[5] = "上一页";	


wf.isAlpha = function(s) {
	var reg = /^[\u0041-\u007A\u0100-\u017F]+$/; 
	return this.isEmpty(s) || reg.test(s);
}

wf.isAlphaNum = function(s) {
	var reg = /^[\u0030-\u0039\u0041-\u007A\u0100-\u017F]+$/;
	return this.isEmpty(s) || reg.test(s);
}