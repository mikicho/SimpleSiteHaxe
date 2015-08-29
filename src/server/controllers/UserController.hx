package server.controllers;
import neko.Web;
import server.db.DBStructure;
import haxe.Resource;
import haxe.Template;
import neko.Lib;
import server.db.MySQLManager;
import haxe.crypto.Sha256;
/**
 * ...
 * @author Michael Solomon
 */
class UserController
{
	public function new() {}
	function doDefault(id:Int) {
		Lib.print("ברוכים הבאים");
	}
	
	function doRegister() {
		var registerTmpl:Template = new Template(Resource.getString("register_form_tmpl"));
		Lib.print(registerTmpl.execute(""));
	}
	function doCreate(args: {userName:String, email:String, password:String }) {//TODO typedef
		var u:Users = new Users();
		var cnx = (new MySQLManager()).cnx;
		u.userName = args.userName;
		u.email = args.email;
		u.password = Sha256.encode(args.password);
		u.registerDate = Date.now();
		u.insert();
		cnx.close();
		Lib.print("חשבונך נוצר בהצלחה!");
	}
	
	function doLogin() {
		var loginTmpl:Template = new Template(Resource.getString("login_form_tmpl"));
		Lib.print(loginTmpl.execute(""));
	}
	function doLoginPost(args: { email:String, password:String } ) {
		var cnx = (new MySQLManager()).cnx;
		var u = Users.manager.select($userName == args.email);
		if (u != null) {
			if (u.password == Sha256.encode(args.password)) {
				//doDefault();
			}else {
				Lib.print("סיסמתך שגויה");	
			}
		}else {
			Lib.print("אמייל שגוי");
		}
		cnx.close();
	}
}