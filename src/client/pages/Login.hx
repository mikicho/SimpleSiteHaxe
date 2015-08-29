package client.pages;
import haxe.Http;
import js.html.InputElement;
/**
 * ...
 * @author Michael Solomon

 */
@:expose
class Login extends PageBase
{
	var loginFormValid:FormValidator;
	
	public function new() {super();}
	
	function loginFormPost():Bool {
		if (loginFormValid.checkValid()) {
			URLReq = new Http("user/loginPost"/*btn.attributes.getNamedItem("href").value*/);
			URLReq.onError("אירעה שגיאה בעת ההתחברות");
			URLReq.addParameter("email", cast(Globals.DOC.forms.namedItem("loginForm").getElementsByClassName("formValidatorEmail").item(0),InputElement).value);
			URLReq.addParameter("password", cast(Globals.DOC.forms.namedItem("loginForm").getElementsByClassName("formValidatorPassword").item(0),InputElement).value);
			URLReq.onData = function (content)
			{
				trace(content);
			}
			URLReq.request(true);
		}
		return false;
	}
	
	override function setContent(content) {
		super.setContent(content);
		loginFormValid = new FormValidator("loginForm");
		trace("here");
	}
}