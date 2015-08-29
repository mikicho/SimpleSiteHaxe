package client;

/**
 * ...
 * @author Michael Solomon
 */
class Globals
{
	public static var DOC:js.html.HTMLDocument;
	public static var WIN:js.html.Window;
	
	public function new() { setGlobals(); }
	function setGlobals() {
		DOC = js.Browser.document;
		WIN = js.Browser.window;
	}
}