(function (console, $hx_exports) { "use strict";
$hx_exports.client = $hx_exports.client || {};
$hx_exports.client.pages = $hx_exports.client.pages || {};
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var Client = $hx_exports.Client = function() {
};
$hxClasses["Client"] = Client;
Client.__name__ = true;
Client.main = function() {
	new client_Globals();
	new client_blocks_Header();
	new client_pages_Home().load("home","Home");
};
Client.prototype = {
	initRegisterPage: function() {
		this.registerFormValid = new client_FormValidator("registerForm");
	}
	,checkRegistarFormValid: function() {
		if(this.registerFormValid.checkValid()) {
			this.URLReq = new haxe_Http("user/create");
			this.URLReq.onError("אירעה שגיאה בעת יצירת המשתמש");
			this.URLReq.addParameter("userName",(js_Boot.__cast(client_Globals.DOC.forms.namedItem("registerForm").getElementsByClassName("formValidatorUserName").item(0) , HTMLInputElement)).value);
			this.URLReq.addParameter("email",(js_Boot.__cast(client_Globals.DOC.forms.namedItem("registerForm").getElementsByClassName("formValidatorEmail").item(0) , HTMLInputElement)).value);
			this.URLReq.addParameter("password",(js_Boot.__cast(client_Globals.DOC.forms.namedItem("registerForm").getElementsByClassName("formValidatorPassword").item(0) , HTMLInputElement)).value);
			this.URLReq.onData = function(content) {
				console.log(content);
			};
			this.URLReq.request(true);
		}
		return false;
	}
	,__class__: Client
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = true;
List.prototype = {
	push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = true;
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = true;
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var client_FormValidator = function(formId) {
	this.isValid = true;
	this.form = js_Boot.__cast(client_Globals.DOC.forms.namedItem(formId) , HTMLFormElement);
	this.emailFieldsArr = [];
	this.passFieldsArr = [];
	var _g = 0;
	var _g1 = this.form.getElementsByClassName("formValidatorEmail");
	while(_g < _g1.length) {
		var emailField = _g1[_g];
		++_g;
		this.emailFieldsArr.push({ field : js_Boot.__cast(emailField , HTMLInputElement), errorMsgElement : null, errorMsg : "כתובת המייל שגויה"});
	}
	var _g2 = 0;
	var _g11 = this.form.getElementsByClassName("formValidatorPassword");
	while(_g2 < _g11.length) {
		var passField = _g11[_g2];
		++_g2;
		this.passFieldsArr.push({ field : js_Boot.__cast(passField , HTMLInputElement), errorMsgElement : null, errorMsg : "על הסיסמא להיות בעלת חמישה תווים לפחות"});
	}
};
$hxClasses["client.FormValidator"] = client_FormValidator;
client_FormValidator.__name__ = true;
client_FormValidator.prototype = {
	checkValid: function() {
		var _g = 0;
		var _g1 = this.emailFieldsArr;
		while(_g < _g1.length) {
			var emailField = _g1[_g];
			++_g;
			var r = new EReg("[A-Z0-9._%-]+@[A-Z0-9.-]+.[A-Z][A-Z][A-Z]?","i");
			if(!r.match(emailField.field.value)) this.createErrorMsg(emailField); else this.cleanErrorMsg(emailField);
		}
		var _g2 = 0;
		var _g11 = this.passFieldsArr;
		while(_g2 < _g11.length) {
			var passField = _g11[_g2];
			++_g2;
			if(passField.field.value.length < 5) this.createErrorMsg(passField); else this.cleanErrorMsg(passField);
		}
		return this.isValid;
	}
	,cleanErrorMsg: function(field) {
		if(field.errorMsgElement != null) field.errorMsgElement.style.display = "none";
	}
	,createErrorMsg: function(field) {
		if(field.errorMsgElement == null) {
			field.errorMsgElement = client_Globals.DOC.createElement("p");
			field.errorMsgElement.className = "formValidatorErrorMsg";
			field.errorMsgElement.innerHTML = field.errorMsg;
			this.form.insertBefore(field.errorMsgElement,field.field.nextSibling);
		} else field.errorMsgElement.style.display = "block";
		this.isValid = false;
	}
	,__class__: client_FormValidator
};
var client_Globals = function() {
	this.setGlobals();
};
$hxClasses["client.Globals"] = client_Globals;
client_Globals.__name__ = true;
client_Globals.prototype = {
	setGlobals: function() {
		client_Globals.DOC = window.document;
		client_Globals.WIN = window;
	}
	,__class__: client_Globals
};
var client_blocks_Header = function() {
	var menu = client_Globals.DOC.getElementsByClassName("header")[0].getElementsByTagName("nav")[0].children;
	this.history = client_Globals.WIN.history;
	var _g = 0;
	while(_g < menu.length) {
		var btn = [menu[_g]];
		++_g;
		var title = [btn[0].getAttribute("title")];
		btn[0].onclick = (function(title,btn) {
			return function(event) {
				event.preventDefault();
				Type.createInstance(Type.resolveClass("client.pages." + title[0]),[]).load(btn[0].getAttribute("href"),btn[0].getAttribute("title"));
			};
		})(title,btn);
	}
};
$hxClasses["client.blocks.Header"] = client_blocks_Header;
client_blocks_Header.__name__ = true;
client_blocks_Header.prototype = {
	__class__: client_blocks_Header
};
var client_pages_PageBase = function() {
};
$hxClasses["client.pages.PageBase"] = client_pages_PageBase;
client_pages_PageBase.__name__ = true;
client_pages_PageBase.prototype = {
	load: function(url,title) {
		var _g = this;
		this.URLReq = new haxe_Http(url);
		this.URLReq.onError("Can't load " + this.URLReq.url);
		this.URLReq.onData = function(content) {
			_g.content = content;
			_g.setContent(content);
		};
		this.URLReq.request(false);
	}
	,setContent: function(content) {
		var c = client_Globals.DOC.getElementsByClassName("content");
		if(c == null) console.log("Unknown element: content");
		c.item(0).innerHTML = this.content;
	}
	,__class__: client_pages_PageBase
};
var client_pages_Home = function() {
	client_pages_PageBase.call(this);
};
$hxClasses["client.pages.Home"] = client_pages_Home;
client_pages_Home.__name__ = true;
client_pages_Home.__super__ = client_pages_PageBase;
client_pages_Home.prototype = $extend(client_pages_PageBase.prototype,{
	__class__: client_pages_Home
});
var client_pages_Login = $hx_exports.client.pages.Login = function() {
	client_pages_PageBase.call(this);
};
$hxClasses["client.pages.Login"] = client_pages_Login;
client_pages_Login.__name__ = true;
client_pages_Login.__super__ = client_pages_PageBase;
client_pages_Login.prototype = $extend(client_pages_PageBase.prototype,{
	loginFormPost: function() {
		if(this.loginFormValid.checkValid()) {
			this.URLReq = new haxe_Http("user/loginPost");
			this.URLReq.onError("אירעה שגיאה בעת ההתחברות");
			this.URLReq.addParameter("email",(js_Boot.__cast(client_Globals.DOC.forms.namedItem("loginForm").getElementsByClassName("formValidatorEmail").item(0) , HTMLInputElement)).value);
			this.URLReq.addParameter("password",(js_Boot.__cast(client_Globals.DOC.forms.namedItem("loginForm").getElementsByClassName("formValidatorPassword").item(0) , HTMLInputElement)).value);
			this.URLReq.onData = function(content) {
				console.log(content);
			};
			this.URLReq.request(true);
		}
		return false;
	}
	,setContent: function(content) {
		client_pages_PageBase.prototype.setContent.call(this,content);
		this.loginFormValid = new client_FormValidator("loginForm");
		console.log("here");
	}
	,__class__: client_pages_Login
});
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe_Http;
haxe_Http.__name__ = true;
haxe_Http.prototype = {
	addParameter: function(param,value) {
		this.params.push({ param : param, value : value});
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = true;
$hxClasses.Array = Array;
Array.__name__ = true;
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
js_Boot.__toStr = {}.toString;
Client.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);
