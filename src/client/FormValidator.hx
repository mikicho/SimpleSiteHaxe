package client;
import js.html.InputElement;
import js.html.FormElement;
import js.html.ParagraphElement;
import js.html.Element;
import client.Globals;

/**
 * ...
 * @author Michael Solomon
 */
typedef FieldFormValidator = {
	var field:InputElement;
	var errorMsgElement:ParagraphElement;
	var errorMsg:String;
}

class FormValidator
{
	var emailFieldsArr:Array<FieldFormValidator>;
	var passFieldsArr:Array<FieldFormValidator>;
	
	var form:FormElement;
	
	public var isValid:Bool = true;
	
	public function new(formId:String)
	{
		form = cast(Globals.DOC.forms.namedItem(formId), FormElement);
		emailFieldsArr = new Array<FieldFormValidator>();
		passFieldsArr = new Array<FieldFormValidator>();
		
		for (emailField in form.getElementsByClassName("formValidatorEmail")) 
		{
			emailFieldsArr.push({ field:cast(emailField, InputElement), errorMsgElement:null, errorMsg:"כתובת המייל שגויה" });
		}
		
		for (passField in form.getElementsByClassName("formValidatorPassword")) 
		{	
			passFieldsArr.push({field:cast(passField, InputElement), errorMsgElement:null, errorMsg:"על הסיסמא להיות בעלת חמישה תווים לפחות"});
		}
	}
	
	public function checkValid():Bool {//TODO: Create a class for each validation
			for (emailField in emailFieldsArr) {
				var r = ~/[A-Z0-9._%-]+@[A-Z0-9.-]+.[A-Z][A-Z][A-Z]?/i;
				if (!r.match(emailField.field.value)) {//check with the elders
					createErrorMsg(emailField);
				}else {
					cleanErrorMsg(emailField);
				}
			}		
			for (passField in passFieldsArr) {
				if (passField.field.value.length < 5) {
					createErrorMsg(passField);
				}else {
					cleanErrorMsg(passField);
				}
			}
		return isValid;
	}
	function cleanErrorMsg(field:FieldFormValidator) 
	{
		if(field.errorMsgElement!=null){
			field.errorMsgElement.style.display = "none";
		}
	}
	
	function createErrorMsg(field:FieldFormValidator) {
		if(field.errorMsgElement==null){
			field.errorMsgElement = Globals.DOC.createParagraphElement();
			field.errorMsgElement.className = "formValidatorErrorMsg";
			field.errorMsgElement.innerHTML = field.errorMsg;
			form.insertBefore(field.errorMsgElement, field.field.nextSibling);
		}else {
			field.errorMsgElement.style.display = "block";
		}
		isValid = false;
	}
}