// Localization for wForms - a javascript extension to web forms.
// Portugus do Brasil (pt_BR) v2.0 - July 18th 2006
// Thanks to:
// Daniel Serodio (http://livejournal.com/users/dserodio),
// Vicente Russo Neto (http://www.thedarkpirate.com || http://www.guiavest.com.br) and
// Douglas Nordfeldt

// This software is licensed under the CC-GNU LGPL
//
// Veja http://formassembly.com/blog/how-to-localize-wforms/
// Deve ser includo *DEPOIS* de wforms.js
// Exemplo:
// <head>...
// <script type="text/javascript" src="js/wforms.js" ></script>
// <script type="text/javascript" src="js/localization-francais.js" ></script>
// </head>

wFORMS.behaviors['validation'].errMsg_required     = "Este campo é obrigatório."; // requerido
wFORMS.behaviors['validation'].errMsg_alpha        = "O texto deve usar apenas caráteres alfabéticos (a-z, A-Z). Números no so permitidos."; // or you can use: "O texto deve usar sá lettras.", validate_alpha
wFORMS.behaviors['validation'].errMsg_email        =  "Este não é um endereço do email válido."; // validate_email
wFORMS.behaviors['validation'].errMsg_integer        =  "Por favor entre um número inteiro."; // validate_integer
wFORMS.behaviors['validation'].errMsg_float        =  "Por favor entre um número decimal (ex. 1.9)."; // validate_float
wFORMS.behaviors['validation'].errMsg_password        =  "Senha insegura. Sua senha deve ter entre 4 e 12 caracteres e usar uma combinao de letras maisculas e minsculas."; // senha - no implementado

wFORMS.behaviors['validation'].errMsg_alphanum        =  "Somente alfanuméricos";
wFORMS.behaviors['validation'].errMsg_date        =  "Data inválida";
wFORMS.behaviors['validation'].errMsg_notification        =  "%% erro(s) detectados. Seu formulário ainda no foi submetido.\nPor favor, verifique o(s) dado(s) informado(s)."; // %% ser substitudo pelo número atual de erros.

wf.arrMsg[0] = "Adicionar mais dados"; // repetir link
wf.arrMsg[1] = "Repetir o campo ou o grupo antecedente." // título em repetir link
wf.arrMsg[2] = "Remover"; // removers link
wf.arrMsg[3] = "Remover o campo ou o grupo antecedente."; // título em remover link
wf.arrMsg[4] = "Próxima Página";
wf.arrMsg[5] = "Página Anterior";

// Alfa-Numriocos para validao de campo de entrada:
wFORMS.behaviors['validation'].isAlpha = function(s) { 
   var reg = /^[\u0041-\u007A\u00C0-\u00FF\s]+$/; 
   return this.isEmpty(s) || reg.test(s); 
} 

wFORMS.behaviors['validation'].isAlphaNum = function(s) { 
   var reg = /^[\u0030-\u0039\u0041-\u007A\u00C0-\u00FF\s]+$/; 
   return this.isEmpty(s) || reg.test(s); 
}
// limites do UNICODE (veja http://www.unicode.org/) :
// \u0030-\u0039 : Números 0-9
// \u0041-\u007A : Latim Bsico : Para Inglés, e somente strings em ASCII (ex: login, senha, ..)
// \u00C0-\u00FF : Latim-1 : Para Dinamarqus, Holandés, Faroese (Norte da Alemanha), Finlands, Flamengo (Bélgica), Alemo, Islands, Irlands, Italiano, Noruegus, Portugus , Espanhol, e Sueco.
// \u0100\u017F : Latim Extendido-A (para ser usado com o Latim Bsico e Latim-1) : Africano , Basco, Breto, Catalo, Croata, Tcheco, Esperanto, Estoniano, Francés, Friso, Húngaro, Latim, Leto, lituano, Malts , Polons, Provenal, Romeno, Cigano, Esloveno, Turco, Gals, e muitos outros.
// \u0180\u024F : Latim Extendido-B (para ser usado com o Latim Bsico e Latim-1) : ?
// \u1E00\u1EFF : Latim Adicional Extendido : Vietnamita ?
// \u0370-\u03FF : Grego
// \u0400-\u04FF : Cirlico : Russo, etc..
// \u0590\u05FF : Hebraico (e #FB1D - #FB4F ?)
// \u0600\u06FF : rabe
// \u0900\u097F : Devanagario : Hindu, etc..
// \u4E00\u9FFF : Han - ideogramas comuns: Chins, Japans, e idiomas Koreaos.
// veja http://www.unicode.org/charts/ para outras linguagens 

