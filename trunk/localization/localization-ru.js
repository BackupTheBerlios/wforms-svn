// wForms v2.0 - July 18th 2006 - Russian localization file                                   //
// Author: Peter A. Shevtsov <peter@shevtsov.fanstvo.com>                     //
// This software is licensed under the CC-GNU LGPL 							  //
// <http://creativecommons.org/licenses/LGPL/2.1/> 							  //
// See http://www.formassembly.com/wForms and								  //
// http://www.formassembly.com/blog/how-to-localize-wforms/ for details		  //

// Сообщения об ощибках
wFORMS.behaviors['validation'].errMsg_required     = "Это поле обязательно для заполнения. "; 
wFORMS.behaviors['validation'].errMsg_alpha        = "В этом поле должны находиться только буквы (а-я, А-Я). Цифры не допустимы. ";
wFORMS.behaviors['validation'].errMsg_email        = "Неправильный формат адреса.";                                  
wFORMS.behaviors['validation'].errMsg_integer      = "Пожалуйста введите целое число.";                                                          
wFORMS.behaviors['validation'].errMsg_float        = "Пожалуйста введите дробное число (например, 1.9).";
wFORMS.behaviors['validation'].errMsg_password     = "Небезопасный пароль. Ваш пароль должен быть от 4 до 12 знаков и состоять из комбинации заглывных и строчных букв.";
wFORMS.behaviors['validation'].errMsg_alphanum     = "Пожалуйста используйте только цифро-буквенные символы [а-я 0-9].";
wFORMS.behaviors['validation'].errMsg_date         = "Неправильный формат даты.";
wFORMS.behaviors['validation'].errMsg_notification = "Данные формы не были отправлены.\nПожалуйста проверьте введённую информацию.\n(Ошибок: %%) "; 

// Прочие сообщения
wf.arrMsg = new Array();
wf.arrMsg[0] = "Добавить ряд";
wf.arrMsg[1] = "Повторить предыдущее поле или группу полей.";
wf.arrMsg[2] = "Удалить";
wf.arrMsg[3] = "Удалить предыдущее поле или группу полей.";
wf.arrMsg[4] = "Следующая страница";
wf.arrMsg[5] = "Предыдущая страница";

wf.isAlpha = function(s) {
    var reg = /^[\u0400-\u04FF]+$/;
    return this.isEmpty(s) || reg.test(s);
}   

wf.isAlphaNum = function(s) {
    var reg = /^[\u0030-\u0039\u0400-\u04FF]+$/;
    return this.isEmpty(s) || reg.test(s);
} 