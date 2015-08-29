package client.blocks;

import client.pages.PageBase;
import js.html.HTMLCollection;
import js.html.History;
import client.Globals;
/*Pages*/
import client.pages.Home;
import client.pages.Login;
/**
 * ...
 * @author Michael Solomon
 */
class Header
{
	var history:History;
	
	public function new() 
	{
		var menu:HTMLCollection = Globals.DOC.getElementsByClassName("header")[0].getElementsByTagName("nav")[0].children;
		history = Globals.WIN.history;
/*		win.onpopstate = function(event) {
			if (event.state != null) {
				var c = Globals.DOC.getElementsByClassName("content");
				if( c == null )
					trace("Unknown element: 'content'");
				c.item(0).innerHTML =pages.get(event.state).content;
			}
		}*/
		for (btn in menu) {
			var title:String = btn.getAttribute("title");
			btn.onclick = function(event) {
				event.preventDefault();
				Type.createInstance(Type.resolveClass("client.pages." + title),[]).load(btn.getAttribute("href"), btn.getAttribute("title"));
			}
		}
	}	
}