package client.pages;
import haxe.Http;

/**
 * ...
 * @author Michael Solomon
 */
class PageBase
{
	var url:String;
	var title:String;
	var content:String;
	var URLReq:Http;
	public function new() {}
	
	public function load(url:String, title:String) {
		URLReq = new Http(url/*btn.attributes.getNamedItem("href").value*/);
		URLReq.onError("Can't load "+URLReq.url);
		URLReq.onData = function (content)
		{
			this.content = content;
			setContent(content);
		}
		URLReq.request(false);
	}
	
	function setContent(content) {
        var c = Globals.DOC.getElementsByClassName("content");
        if( c == null )
            trace("Unknown element: content");
        c.item(0).innerHTML = this.content;
		//history.pushState(page.url, pages.get(page.url).title, page.url);
    } 
}