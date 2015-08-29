package;
import client.blocks.Header;
import client.FormValidator;
import client.Globals;
import client.pages.Home;
import haxe.Http;
import haxe.Timer;


import js.html.InputElement;

/**
 * ...
 * @author Michael Solomon
 */

@:expose
class Client
{		
	var URLReq:Http;
	var registerFormValid:FormValidator;
	
	static function main() {
		//new Client();
		new Globals();
		new Header();
		new Home().load("home", "Home");
	}
	
	public function new() {
	}	
	
	function initRegisterPage()
	{
		registerFormValid = new FormValidator("registerForm");
	}
	
	function checkRegistarFormValid():Bool {
		if (registerFormValid.checkValid()) {	
			URLReq = new Http("user/create"/*btn.attributes.getNamedItem("href").value*/);
			URLReq.onError("אירעה שגיאה בעת יצירת המשתמש");
			URLReq.addParameter("userName", cast(Globals.DOC.forms.namedItem("registerForm").getElementsByClassName("formValidatorUserName").item(0),InputElement).value);
			URLReq.addParameter("email", cast(Globals.DOC.forms.namedItem("registerForm").getElementsByClassName("formValidatorEmail").item(0),InputElement).value);
			URLReq.addParameter("password", cast(Globals.DOC.forms.namedItem("registerForm").getElementsByClassName("formValidatorPassword").item(0),InputElement).value);
			URLReq.onData = function (content)
			{
				trace(content);
			}
			URLReq.request(true);
		}
		return false;
	}
}