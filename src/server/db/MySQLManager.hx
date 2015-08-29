package server.db;
import sys.db.Mysql;
import sys.db.Connection;
/**
 * ...
 * @author Michael Solomon
 */
class MySQLManager
{
	public var cnx(get, null):Connection;
	public function new() 
	{
		cnx = Mysql.connect({ 
            host : "localhost", 
            port : null, 
            user : "root", 
            pass : "1", 
            socket : null, 
            database : "mic_faq"
        });
		sys.db.Manager.cnx = cnx;
	}
	
	function get_cnx():Connection 
	{
		return cnx;
	}
	
}