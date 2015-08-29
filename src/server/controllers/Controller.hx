package server.controllers;
import haxe.Resource;
import haxe.Template;
import haxe.web.Dispatch;
import haxe.web.Request;
import neko.Lib;

/**
 * ...
 * @author Michael Solomon
 */
class Controller
{
	public static var baseTmpl:Template;
	public function new() {}
	
	function doHome() {
		var indexTmpl:Template = new Template(Resource.getString("index_tmpl"));	
		Lib.print(indexTmpl.execute(""));
	}
	function doUser(d:Dispatch) {
		d.dispatch(new UserController());
	}
	
	function doAsk() {
		Lib.print("ask");
	}
	
	function doDefault() {
		baseTmpl = new Template(Resource.getString("base_tmpl"));
		Lib.print(baseTmpl.execute( { content:"" } ));
	}
}