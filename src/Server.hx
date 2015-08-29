package;

import haxe.Resource;
import haxe.Template;
import haxe.web.Dispatch;
import haxe.web.Request;
import server.controllers.Controller;
import server.db.MySQLManager;
import server.db.DBStructure;

/**
 * ...
 * @author Michael Solomon
 */
class Server 
{
	static function main() 
	{
		new Server();
	}
	function new() {
		var cnx = (new MySQLManager()).cnx;
		sys.db.Manager.initialize();
		createTablesIfNotExists();
		cnx.close();
		Dispatch.run(Request.getURI(), neko.Web.getParams(), new Controller());
	}
	
	function createTablesIfNotExists() 
	{
		if ( !sys.db.TableCreate.exists(Users.manager) )
		{
			sys.db.TableCreate.create(Users.manager);
		}
		
		if ( !sys.db.TableCreate.exists(Questions.manager) )
		{
			sys.db.TableCreate.create(Questions.manager);
		}
		
		if ( !sys.db.TableCreate.exists(Answers.manager) )
		{
			sys.db.TableCreate.create(Answers.manager);
		}
	}
}