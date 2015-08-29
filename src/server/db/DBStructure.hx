package server.db;
import sys.db.Types;
import sys.db.Types;
/**
 * ...
 * @author Michael Solomon
 */

@:id(id)
class Users extends sys.db.Object {
	public var id:SId; //INT(32) AUTO INCREMENT
	public var userName:SString<32>; //VARCHAR(K)
	public var email:SString<255>; //VARCHAR(K)
	public var password:SString<64>; //VARCHAR(K) //sha256
	public var registerDate:SDate; //DATE
}

@:id(id)
class Questions extends sys.db.Object {
	public var id:SId; //INT(32) AUTO INCREMENT
	public var user_id:SInt; //INT(32)
	public var answer_id:SInt; //INT(32)
	public var question:SString<500>; //VARCHAR(K)
	public var questionDate:SDateTime; //DATETIME
}

@:id(id)
class Answers extends sys.db.Object {
	public var id:SId; //INT(32) AUTO INCREMENT
	public var user_id:SInt; //INT(32)
	public var answer:SString<500>; //VARCHAR(K)
	public var answersDate:SDateTime; //DATETIME
}