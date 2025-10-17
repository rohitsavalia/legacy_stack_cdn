// JavaScript Document
function rAjaxCall(scriptofAjax,getParam,targetDiv,returnToFn)
{
		var xmlHttpReq = false;
		var self = this;
		// Mozilla/Safari
		if (window.XMLHttpRequest) {self.xmlHttpReq = new XMLHttpRequest();}
		// IE
		else if (window.ActiveXObject) {self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");}
		self.xmlHttpReq.open('GET', (scriptofAjax+getParam), true);
		self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		self.xmlHttpReq.onreadystatechange = function() {
		   if (self.xmlHttpReq.readyState == 4) 
		   {
			   	responseText = self.xmlHttpReq.responseText;
			   	if(returnToFn=='no')
				{
					updatePage(targetDiv,responseText);
				}else{
					eval(returnToFn + '("' + responseText + '")' );
				}
		   }
		};
		self.xmlHttpReq.send(null);
}
function updatePage(targetDiv,rt)
{
	document.getElementById(targetDiv).innerHTML = rt;
}
function trim(inputString) {
   // Removes leading and trailing spaces from the passed string. Also removes
   // consecutive spaces and replaces it with one space. If something besides
   // a string is passed in (null, custom object, etc.) then return the input.
   if (typeof inputString != "string") { return inputString; }
   var retValue = inputString;
   var ch = retValue.substring(0, 1);
   while (ch == " ") { // Check for spaces at the beginning of the string
      retValue = retValue.substring(1, retValue.length);
      ch = retValue.substring(0, 1);
   }
   ch = retValue.substring(retValue.length-1, retValue.length);
   while (ch == " ") { // Check for spaces at the end of the string
      retValue = retValue.substring(0, retValue.length-1);
      ch = retValue.substring(retValue.length-1, retValue.length);
   }
   while (retValue.indexOf(" ") != -1) { // Note that there are two spaces in the string - look for multiple spaces within the string
      retValue = retValue.substring(0, retValue.indexOf(" ")) + retValue.substring(retValue.indexOf(" ")+1, retValue.length); // Again, there are two spaces in each of the strings
   }
   return retValue; // Return the trimmed string back to the user
}
function chkNull(Obj,Msg)
{

	if (trim(Obj.value)=="")
		{
			alert(Msg);
			Obj.focus();
			return false;
		}
	else
		{
		return true;
		}
}
function isPositiveDecimal(Obj,Msg)
{
	if(isNaN(Obj.value) || Obj.value < 0)
	{
		alert(Msg);
		Obj.focus();
		return false;
	}else{	return true;	}
}
function regIsNumber(Obj,Msg)
{
	/////////allowing only positive integer and float value	
	////RegExp("^[-]?[0-9]+[\.]?[0-9]+$");	//this will allow negative and positive integer and float value
	var reg = new RegExp("^[0-9.]+$");
    if( reg.test( parseFloat(Obj.value)) == false){	alert(Msg);	Obj.focus();	return false;	}else{	return true	}
}
function regIsInteger(Obj,Msg)
{
	/////////allowing only positive integer value
	////RegExp("^([0-9])+$");	//this will allow negative and positive integer value
	var reg = new RegExp("^([0-9])+$");
    if( reg.test( parseFloat(Obj.value)) == false){	alert(Msg);	Obj.focus();	return false;	}else{	return true	}
}
function getEle(id)
{
	return document.getElementById( trim(id) );
}
function eS(selObj)
{
	var select = selObj;
	//select.size = select.options.length;
	select.size = 5;
}
function cS(selObj)
{
	var select = selObj;
	select.size = 1;
}
function printRep(printAreaId){
		window.print();
//		win = window.open();
//		self.focus();
//		win.document.open();
//		win.document.write('<'+'html'+'><'+'head'+'><'+'style'+'>');
//		win.document.write('body, td { font-family: Verdana; font-size: 10pt;}');
//		win.document.write('<'+'/'+'style'+'><'+'/'+'head'+'><'+'body'+'>');
//		win.document.write(document.getElementById(printAreaId).innerHTML);
//		win.document.write('<'+'/'+'body'+'><'+'/'+'html'+'>');
//		win.document.close();
//		win.print();
//		win.close();
	}
function rFillSelModel()
{
	var modelList = '';
	var destSel = getEle('_smodel');
	for(i=0;	i<destSel.length;	i++){
		modelList = modelList + destSel.options[i].value.toString() + ',';  
	}
	getEle('_selModels').value=modelList;
}
function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
function expandDetail(holderNum)
{
	jq('#detailHolder' + holderNum).toggle();
}
function toggEle(el) {

	if(jq('#'+el).css('display') == 'block')
	{
		jq('#'+el).css('display','none');
	}else{
		jq('#'+el).css('display','block');
	}
}
function var_dump(obj, inAlert) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }
 
    if(inAlert){alert(out);}
    else
    {
         var pre = document.createElement('pre');
         pre.innerHTML = out;
         document.body.appendChild(pre)
    }
}
var tag=null;
function loadUrlInDialog(url, title, size='size-normal', type='type-default', closable=true){
    //https://nakupanda.github.io/bootstrap3-dialog/
	
	/*allowed size : size-small, size-normal, size-wide, size-large*/
	/*allowed type : type-default, type-info, type-success, type-warning, type-danger*/

	/*
	$.ajax({
	    type:"POST",
	    url: url,
	    data:"id="+id ,
	    success: function(html){
		var oMessageModal = $('#messageModal');
		messageModal.find('.modal-body').html('<p class="text-danger">'+html+'</p>');
		messageModal.modal('show');
	    }
	});
	*/
	
	/*
	$('#messageModal .modal-body').load(url,function(result){
		messageModal.find('.modal-title').text(title);
		oMessageModal.modal({show:true});
	});
	*/
	
    BootstrapDialog.show({
        title: title,
        id: 'popUpDialog',
        size: size,
        type: type,
        closable: closable,
        message: $('#messageModal .modal-body').load(url),
    });
    
}
function bindMenu()
{
	jq('div[class^="menu-button-holder"]').mouseover(function()
	{
		jq("#menu-holder-"+this.id).show();
	}).mouseout(function()
	{
		jq("#menu-holder-"+this.id).hide();
	});
}
function alertByInputOnLength(objId,maxLength)
{	
	if (!maxLength) 
	  maxLength = 15;

	if ($('#'+objId).val().length == maxLength)
	{
		$('#'+objId).removeClass('alertByInputRed').addClass('alertByInputGreen');
	}else if ($('#'+objId).val().length > maxLength){
		$('#'+objId).removeClass('alertByInputGreen').addClass('alertByInputRed');
	}
	else
		$('#'+objId).removeClass('alertByInputGreen').removeClass('alertByInputRed');
}
function setDate(datePickerFromId, datePickerToId, dateFrom, dateTo)
{
	jq('#'+datePickerFromId).val(dateFrom);
	jq('#'+datePickerToId).val(dateTo);
	//jq('#dateselector').datepicker("setDate", new Date(2008,9,03) );
}
/*------------------------------TOP MENU JS---------------------------------*/
$(document).ready(function(){

    var $menu = jq('.menu_container');

    jq('#selOpt .toggler').on('click', function(){

        var selOpt = jq(this).parent();

        if (!selOpt.hasClass('opened')){
            selOpt.animate({left: '0px'}, 500).addClass('opened');
        }
        else {
            selOpt.animate({left: '-250px'}, 500).removeClass('opened');
        }

    });

    if ( jq(window).outerWidth() < 1670 ) {
        jq('#selOpt').delay(1000).animate({left:'-250px'}, 500).removeClass('opened');
    }

    jq('#selOpt input.option').on('change', function(e){
        var _this = jq(this);
        var cls = _this.data('class');
        if (_this.prop('checked')) {
            $menu.addClass(cls);
        }
        else {
            $menu.removeClass(cls);
        }
    });

});

if(typeof Object.create!=="function"){
	Object.create=function(o){
	function F(){
	};
	F.prototype=o;
	return new F();
	};
	}
	var ua={toString:function(){
	return navigator.userAgent;
	},test:function(s){
	return this.toString().toLowerCase().indexOf(s.toLowerCase())>-1;
	}};
	ua.version=(ua.toString().toLowerCase().match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1];
	ua.webkit=ua.test("webkit");
	ua.gecko=ua.test("gecko")&&!ua.webkit;
	ua.opera=ua.test("opera");
	ua.ie=ua.test("msie")&&!ua.opera;
	ua.ie6=ua.ie&&document.compatMode&&typeof document.documentElement.style.maxHeight==="undefined";
	ua.ie7=ua.ie&&document.documentElement&&typeof document.documentElement.style.maxHeight!=="undefined"&&typeof XDomainRequest==="undefined";
	ua.ie8=ua.ie&&typeof XDomainRequest!=="undefined";
	var domReady=function(){
	var _1=[];
	var _2=function(){
	if(!arguments.callee.done){
	arguments.callee.done=true;
	for(var i=0;i<_1.length;i++){
	_1[i]();
	}
	}
	};
	if(document.addEventListener){
	document.addEventListener("DOMContentLoaded",_2,false);
	}
	if(ua.ie){
	(function(){
	try{
	document.documentElement.doScroll("left");
	}
	catch(e){
	setTimeout(arguments.callee,50);
	return;
	}
	_2();
	})();
	document.onreadystatechange=function(){
	if(document.readyState==="complete"){
	document.onreadystatechange=null;
	_2();
	}
	};
	}
	if(ua.webkit&&document.readyState){
	(function(){
	if(document.readyState!=="loading"){
	_2();
	}else{
	setTimeout(arguments.callee,10);
	}
	})();
	}
	window.onload=_2;
	return function(fn){
	if(typeof fn==="function"){
	_1[_1.length]=fn;
	}
	return fn;
	};
	}();
	var cssHelper=function(){
	var _3={BLOCKS:/[^\s{][^{]*\{(?:[^{}]*\{[^{}]*\}[^{}]*|[^{}]*)*\}/g,BLOCKS_INSIDE:/[^\s{][^{]*\{[^{}]*\}/g,DECLARATIONS:/[a-zA-Z\-]+[^;]*:[^;]+;/g,RELATIVE_URLS:/url\(['"]?([^\/\)'"][^:\)'"]+)['"]?\)/g,REDUNDANT_COMPONENTS:/(?:\/\*([^*\\\\]|\*(?!\/))+\*\/|@import[^;]+;)/g,REDUNDANT_WHITESPACE:/\s*(,|:|;|\{|\})\s*/g,MORE_WHITESPACE:/\s{2,}/g,FINAL_SEMICOLONS:/;\}/g,NOT_WHITESPACE:/\S+/g};
	var _4,_5=false;
	var _6=[];
	var _7=function(fn){
	if(typeof fn==="function"){
	_6[_6.length]=fn;
	}
	};
	var _8=function(){
	for(var i=0;i<_6.length;i++){
	_6[i](_4);
	}
	};
	var _9={};
	var _a=function(n,v){
	if(_9[n]){
	var _b=_9[n].listeners;
	if(_b){
	for(var i=0;i<_b.length;i++){
	_b[i](v);
	}
	}
	}
	};
	var _c=function(_d,_e,_f){
	if(ua.ie&&!window.XMLHttpRequest){
	window.XMLHttpRequest=function(){
	return new ActiveXObject("Microsoft.XMLHTTP");
	};
	}
	if(!XMLHttpRequest){
	return "";
	}
	var r=new XMLHttpRequest();
	try{
	r.open("get",_d,true);
	r.setRequestHeader("X_REQUESTED_WITH","XMLHttpRequest");
	}
	catch(e){
	_f();
	return;
	}
	var _10=false;
	setTimeout(function(){
	_10=true;
	},5000);
	document.documentElement.style.cursor="progress";
	r.onreadystatechange=function(){
	if(r.readyState===4&&!_10){
	if(!r.status&&location.protocol==="file:"||(r.status>=200&&r.status<300)||r.status===304||navigator.userAgent.indexOf("Safari")>-1&&typeof r.status==="undefined"){
	_e(r.responseText);
	}else{
	_f();
	}
	document.documentElement.style.cursor="";
	r=null;
	}
	};
	r.send("");
	};
	var _11=function(_12){
	_12=_12.replace(_3.REDUNDANT_COMPONENTS,"");
	_12=_12.replace(_3.REDUNDANT_WHITESPACE,"$1");
	_12=_12.replace(_3.MORE_WHITESPACE," ");
	_12=_12.replace(_3.FINAL_SEMICOLONS,"}");
	return _12;
	};
	var _13={mediaQueryList:function(s){
	var o={};
	var idx=s.indexOf("{");
	var lt=s.substring(0,idx);
	s=s.substring(idx+1,s.length-1);
	var mqs=[],rs=[];
	var qts=lt.toLowerCase().substring(7).split(",");
	for(var i=0;i<qts.length;i++){
	mqs[mqs.length]=_13.mediaQuery(qts[i],o);
	}
	var rts=s.match(_3.BLOCKS_INSIDE);
	if(rts!==null){
	for(i=0;i<rts.length;i++){
	rs[rs.length]=_13.rule(rts[i],o);
	}
	}
	o.getMediaQueries=function(){
	return mqs;
	};
	o.getRules=function(){
	return rs;
	};
	o.getListText=function(){
	return lt;
	};
	o.getCssText=function(){
	return s;
	};
	return o;
	},mediaQuery:function(s,mql){
	s=s||"";
	var not=false,_14;
	var exp=[];
	var _15=true;
	var _16=s.match(_3.NOT_WHITESPACE);
	for(var i=0;i<_16.length;i++){
	var _17=_16[i];
	if(!_14&&(_17==="not"||_17==="only")){
	if(_17==="not"){
	not=true;
	}
	}else{
	if(!_14){
	_14=_17;
	}else{
	if(_17.charAt(0)==="("){
	var _18=_17.substring(1,_17.length-1).split(":");
	exp[exp.length]={mediaFeature:_18[0],value:_18[1]||null};
	}
	}
	}
	}
	return {getList:function(){
	return mql||null;
	},getValid:function(){
	return _15;
	},getNot:function(){
	return not;
	},getMediaType:function(){
	return _14;
	},getExpressions:function(){
	return exp;
	}};
	},rule:function(s,mql){
	var o={};
	var idx=s.indexOf("{");
	var st=s.substring(0,idx);
	var ss=st.split(",");
	var ds=[];
	var dts=s.substring(idx+1,s.length-1).split(";");
	for(var i=0;i<dts.length;i++){
	ds[ds.length]=_13.declaration(dts[i],o);
	}
	o.getMediaQueryList=function(){
	return mql||null;
	};
	o.getSelectors=function(){
	return ss;
	};
	o.getSelectorText=function(){
	return st;
	};
	o.getDeclarations=function(){
	return ds;
	};
	o.getPropertyValue=function(n){
	for(var i=0;i<ds.length;i++){
	if(ds[i].getProperty()===n){
	return ds[i].getValue();
	}
	}
	return null;
	};
	return o;
	},declaration:function(s,r){
	var idx=s.indexOf(":");
	var p=s.substring(0,idx);
	var v=s.substring(idx+1);
	return {getRule:function(){
	return r||null;
	},getProperty:function(){
	return p;
	},getValue:function(){
	return v;
	}};
	}};
	var _19=function(el){
	if(typeof el.cssHelperText!=="string"){
	return;
	}
	var o={mediaQueryLists:[],rules:[],selectors:{},declarations:[],properties:{}};
	var _1a=o.mediaQueryLists;
	var ors=o.rules;
	var _1b=el.cssHelperText.match(_3.BLOCKS);
	if(_1b!==null){
	for(var i=0;i<_1b.length;i++){
	if(_1b[i].substring(0,7)==="@media "){
	_1a[_1a.length]=_13.mediaQueryList(_1b[i]);
	ors=o.rules=ors.concat(_1a[_1a.length-1].getRules());
	}else{
	ors[ors.length]=_13.rule(_1b[i]);
	}
	}
	}
	var oss=o.selectors;
	var _1c=function(r){
	var ss=r.getSelectors();
	for(var i=0;i<ss.length;i++){
	var n=ss[i];
	if(!oss[n]){
	oss[n]=[];
	}
	oss[n][oss[n].length]=r;
	}
	};
	for(i=0;i<ors.length;i++){
	_1c(ors[i]);
	}
	var ods=o.declarations;
	for(i=0;i<ors.length;i++){
	ods=o.declarations=ods.concat(ors[i].getDeclarations());
	}
	var ops=o.properties;
	for(i=0;i<ods.length;i++){
	var n=ods[i].getProperty();
	if(!ops[n]){
	ops[n]=[];
	}
	ops[n][ops[n].length]=ods[i];
	}
	el.cssHelperParsed=o;
	_4[_4.length]=el;
	return o;
	};
	var _1d=function(el,s){
	el.cssHelperText=_11(s||el.innerHTML);
	return _19(el);
	};
	var _1e=function(){
	_5=true;
	_4=[];
	var _1f=[];
	var _20=function(){
	for(var i=0;i<_1f.length;i++){
	_19(_1f[i]);
	}
	var _21=document.getElementsByTagName("style");
	for(i=0;i<_21.length;i++){
	_1d(_21[i]);
	}
	_5=false;
	_8();
	};
	var _22=document.getElementsByTagName("link");
	for(var i=0;i<_22.length;i++){
	var _23=_22[i];
	if(_23.getAttribute("rel").indexOf("style")>-1&&_23.href&&_23.href.length!==0&&!_23.disabled){
	_1f[_1f.length]=_23;
	}
	}
	if(_1f.length>0){
	var c=0;
	var _24=function(){
	c++;
	if(c===_1f.length){
	_20();
	}
	};
	var _25=function(_26){
	var _27=_26.href;
	_c(_27,function(_28){
	_28=_11(_28).replace(_3.RELATIVE_URLS,"url("+_27.substring(0,_27.lastIndexOf("/"))+"/$1)");
	_26.cssHelperText=_28;
	_24();
	},_24);
	};
	for(i=0;i<_1f.length;i++){
	_25(_1f[i]);
	}
	}else{
	_20();
	}
	};
	var _29={mediaQueryLists:"array",rules:"array",selectors:"object",declarations:"array",properties:"object"};
	var _2a={mediaQueryLists:null,rules:null,selectors:null,declarations:null,properties:null};
	var _2b=function(_2c,v){
	if(_2a[_2c]!==null){
	if(_29[_2c]==="array"){
	return (_2a[_2c]=_2a[_2c].concat(v));
	}else{
	var c=_2a[_2c];
	for(var n in v){
	if(v.hasOwnProperty(n)){
	if(!c[n]){
	c[n]=v[n];
	}else{
	c[n]=c[n].concat(v[n]);
	}
	}
	}
	return c;
	}
	}
	};
	var _2d=function(_2e){
	_2a[_2e]=(_29[_2e]==="array")?[]:{};
	for(var i=0;i<_4.length;i++){
	_2b(_2e,_4[i].cssHelperParsed[_2e]);
	}
	return _2a[_2e];
	};
	domReady(function(){
	var els=document.body.getElementsByTagName("*");
	for(var i=0;i<els.length;i++){
	els[i].checkedByCssHelper=true;
	}
	if(document.implementation.hasFeature("MutationEvents","2.0")||window.MutationEvent){
	document.body.addEventListener("DOMNodeInserted",function(e){
	var el=e.target;
	if(el.nodeType===1){
	_a("DOMElementInserted",el);
	el.checkedByCssHelper=true;
	}
	},false);
	}else{
	setInterval(function(){
	var els=document.body.getElementsByTagName("*");
	for(var i=0;i<els.length;i++){
	if(!els[i].checkedByCssHelper){
	_a("DOMElementInserted",els[i]);
	els[i].checkedByCssHelper=true;
	}
	}
	},1000);
	}
	});
	var _2f=function(d){
	if(typeof window.innerWidth!="undefined"){
	return window["inner"+d];
	}else{
	if(typeof document.documentElement!="undefined"&&typeof document.documentElement.clientWidth!="undefined"&&document.documentElement.clientWidth!=0){
	return document.documentElement["client"+d];
	}
	}
	};
	return {addStyle:function(s,_30){
	var el=document.createElement("style");
	el.setAttribute("type","text/css");
	document.getElementsByTagName("head")[0].appendChild(el);
	if(el.styleSheet){
	el.styleSheet.cssText=s;
	}else{
	el.appendChild(document.createTextNode(s));
	}
	el.addedWithCssHelper=true;
	if(typeof _30==="undefined"||_30===true){
	cssHelper.parsed(function(_31){
	var o=_1d(el,s);
	for(var n in o){
	if(o.hasOwnProperty(n)){
	_2b(n,o[n]);
	}
	}
	_a("newStyleParsed",el);
	});
	}else{
	el.parsingDisallowed=true;
	}
	return el;
	},removeStyle:function(el){
	return el.parentNode.removeChild(el);
	},parsed:function(fn){
	if(_5){
	_7(fn);
	}else{
	if(typeof _4!=="undefined"){
	if(typeof fn==="function"){
	fn(_4);
	}
	}else{
	_7(fn);
	_1e();
	}
	}
	},mediaQueryLists:function(fn){
	cssHelper.parsed(function(_32){
	fn(_2a.mediaQueryLists||_2d("mediaQueryLists"));
	});
	},rules:function(fn){
	cssHelper.parsed(function(_33){
	fn(_2a.rules||_2d("rules"));
	});
	},selectors:function(fn){
	cssHelper.parsed(function(_34){
	fn(_2a.selectors||_2d("selectors"));
	});
	},declarations:function(fn){
	cssHelper.parsed(function(_35){
	fn(_2a.declarations||_2d("declarations"));
	});
	},properties:function(fn){
	cssHelper.parsed(function(_36){
	fn(_2a.properties||_2d("properties"));
	});
	},broadcast:_a,addListener:function(n,fn){
	if(typeof fn==="function"){
	if(!_9[n]){
	_9[n]={listeners:[]};
	}
	_9[n].listeners[_9[n].listeners.length]=fn;
	}
	},removeListener:function(n,fn){
	if(typeof fn==="function"&&_9[n]){
	var ls=_9[n].listeners;
	for(var i=0;i<ls.length;i++){
	if(ls[i]===fn){
	ls.splice(i,1);
	i-=1;
	}
	}
	}
	},getViewportWidth:function(){
	return _2f("Width");
	},getViewportHeight:function(){
	return _2f("Height");
	}};
	}();
	domReady(function enableCssMediaQueries(){
	var _37;
	var _38={LENGTH_UNIT:/[0-9]+(em|ex|px|in|cm|mm|pt|pc)$/,RESOLUTION_UNIT:/[0-9]+(dpi|dpcm)$/,ASPECT_RATIO:/^[0-9]+\/[0-9]+$/,ABSOLUTE_VALUE:/^[0-9]*(\.[0-9]+)*$/};
	var _39=[];
	var _3a=function(){
	var id="css3-mediaqueries-test";
	var el=document.createElement("div");
	el.id=id;
	var _3b=cssHelper.addStyle("@media all and (width) { #"+id+" { width: 1px !important; } }",false);
	document.body.appendChild(el);
	var ret=el.offsetWidth===1;
	_3b.parentNode.removeChild(_3b);
	el.parentNode.removeChild(el);
	_3a=function(){
	return ret;
	};
	return ret;
	};
	var _3c=function(){
	_37=document.createElement("div");
	_37.style.cssText="position:absolute;top:-9999em;left:-9999em;"+"margin:0;border:none;padding:0;width:1em;font-size:1em;";
	document.body.appendChild(_37);
	if(_37.offsetWidth!==16){
	_37.style.fontSize=16/_37.offsetWidth+"em";
	}
	_37.style.width="";
	};
	var _3d=function(_3e){
	_37.style.width=_3e;
	var _3f=_37.offsetWidth;
	_37.style.width="";
	return _3f;
	};
	var _40=function(_41,_42){
	var l=_41.length;
	var min=(_41.substring(0,4)==="min-");
	var max=(!min&&_41.substring(0,4)==="max-");
	if(_42!==null){
	var _43;
	var _44;
	if(_38.LENGTH_UNIT.exec(_42)){
	_43="length";
	_44=_3d(_42);
	}else{
	if(_38.RESOLUTION_UNIT.exec(_42)){
	_43="resolution";
	_44=parseInt(_42,10);
	var _45=_42.substring((_44+"").length);
	}else{
	if(_38.ASPECT_RATIO.exec(_42)){
	_43="aspect-ratio";
	_44=_42.split("/");
	}else{
	if(_38.ABSOLUTE_VALUE){
	_43="absolute";
	_44=_42;
	}else{
	_43="unknown";
	}
	}
	}
	}
	}
	var _46,_47;
	if("device-width"===_41.substring(l-12,l)){
	_46=screen.width;
	if(_42!==null){
	if(_43==="length"){
	return ((min&&_46>=_44)||(max&&_46<_44)||(!min&&!max&&_46===_44));
	}else{
	return false;
	}
	}else{
	return _46>0;
	}
	}else{
	if("device-height"===_41.substring(l-13,l)){
	_47=screen.height;
	if(_42!==null){
	if(_43==="length"){
	return ((min&&_47>=_44)||(max&&_47<_44)||(!min&&!max&&_47===_44));
	}else{
	return false;
	}
	}else{
	return _47>0;
	}
	}else{
	if("width"===_41.substring(l-5,l)){
	_46=document.documentElement.clientWidth||document.body.clientWidth;
	if(_42!==null){
	if(_43==="length"){
	return ((min&&_46>=_44)||(max&&_46<_44)||(!min&&!max&&_46===_44));
	}else{
	return false;
	}
	}else{
	return _46>0;
	}
	}else{
	if("height"===_41.substring(l-6,l)){
	_47=document.documentElement.clientHeight||document.body.clientHeight;
	if(_42!==null){
	if(_43==="length"){
	return ((min&&_47>=_44)||(max&&_47<_44)||(!min&&!max&&_47===_44));
	}else{
	return false;
	}
	}else{
	return _47>0;
	}
	}else{
	if("device-aspect-ratio"===_41.substring(l-19,l)){
	return _43==="aspect-ratio"&&screen.width*_44[1]===screen.height*_44[0];
	}else{
	if("color-index"===_41.substring(l-11,l)){
	var _48=Math.pow(2,screen.colorDepth);
	if(_42!==null){
	if(_43==="absolute"){
	return ((min&&_48>=_44)||(max&&_48<_44)||(!min&&!max&&_48===_44));
	}else{
	return false;
	}
	}else{
	return _48>0;
	}
	}else{
	if("color"===_41.substring(l-5,l)){
	var _49=screen.colorDepth;
	if(_42!==null){
	if(_43==="absolute"){
	return ((min&&_49>=_44)||(max&&_49<_44)||(!min&&!max&&_49===_44));
	}else{
	return false;
	}
	}else{
	return _49>0;
	}
	}else{
	if("resolution"===_41.substring(l-10,l)){
	var res;
	if(_45==="dpcm"){
	res=_3d("1cm");
	}else{
	res=_3d("1in");
	}
	if(_42!==null){
	if(_43==="resolution"){
	return ((min&&res>=_44)||(max&&res<_44)||(!min&&!max&&res===_44));
	}else{
	return false;
	}
	}else{
	return res>0;
	}
	}else{
	return false;
	}
	}
	}
	}
	}
	}
	}
	}
	};
	var _4a=function(mq){
	var _4b=mq.getValid();
	var _4c=mq.getExpressions();
	var l=_4c.length;
	if(l>0){
	for(var i=0;i<l&&_4b;i++){
	_4b=_40(_4c[i].mediaFeature,_4c[i].value);
	}
	var not=mq.getNot();
	return (_4b&&!not||not&&!_4b);
	}
	};
	var _4d=function(mql){
	var mqs=mql.getMediaQueries();
	var t={};
	for(var i=0;i<mqs.length;i++){
	if(_4a(mqs[i])){
	t[mqs[i].getMediaType()]=true;
	}
	}
	var s=[],c=0;
	for(var n in t){
	if(t.hasOwnProperty(n)){
	if(c>0){
	s[c++]=",";
	}
	s[c++]=n;
	}
	}
	if(s.length>0){
	_39[_39.length]=cssHelper.addStyle("@media "+s.join("")+"{"+mql.getCssText()+"}",false);
	}
	};
	var _4e=function(_4f){
	for(var i=0;i<_4f.length;i++){
	_4d(_4f[i]);
	}
	if(ua.ie){
	document.documentElement.style.display="block";
	setTimeout(function(){
	document.documentElement.style.display="";
	},0);
	setTimeout(function(){
	cssHelper.broadcast("cssMediaQueriesTested");
	},100);
	}else{
	cssHelper.broadcast("cssMediaQueriesTested");
	}
	};
	var _50=function(){
	for(var i=0;i<_39.length;i++){
	cssHelper.removeStyle(_39[i]);
	}
	_39=[];
	cssHelper.mediaQueryLists(_4e);
	};
	var _51=0;
	var _52=function(){
	var _53=cssHelper.getViewportWidth();
	var _54=cssHelper.getViewportHeight();
	if(ua.ie){
	var el=document.createElement("div");
	el.style.position="absolute";
	el.style.top="-9999em";
	el.style.overflow="scroll";
	document.body.appendChild(el);
	_51=el.offsetWidth-el.clientWidth;
	document.body.removeChild(el);
	}
	var _55;
	var _56=function(){
	var vpw=cssHelper.getViewportWidth();
	var vph=cssHelper.getViewportHeight();
	if(Math.abs(vpw-_53)>_51||Math.abs(vph-_54)>_51){
	_53=vpw;
	_54=vph;
	clearTimeout(_55);
	_55=setTimeout(function(){
	if(!_3a()){
	_50();
	}else{
	cssHelper.broadcast("cssMediaQueriesTested");
	}
	},500);
	}
	};
	window.onresize=function(){
	var x=window.onresize||function(){
	};
	return function(){
	x();
	_56();
	};
	}();
	};
	var _57=document.documentElement;
	_57.style.marginLeft="-32767px";
	setTimeout(function(){
	_57.style.marginTop="";
	},20000);
	return function(){
	if(!_3a()){
	cssHelper.addListener("newStyleParsed",function(el){
	_4e(el.cssHelperParsed.mediaQueryLists);
	});
	cssHelper.addListener("cssMediaQueriesTested",function(){
	if(ua.ie){
	_57.style.width="1px";
	}
	setTimeout(function(){
	_57.style.width="";
	_57.style.marginLeft="";
	},0);
	cssHelper.removeListener("cssMediaQueriesTested",arguments.callee);
	});
	_3c();
	_50();
	}else{
	_57.style.marginLeft="";
	}
	_52();
	};
	}());
	try{
	document.execCommand("BackgroundImageCache",false,true);
	}
	catch(e){
	}


/*hoe.js*/
var _0xa3fc=["\x63\x6C\x69\x63\x6B","\x74\x68\x65\x6D\x65\x2D\x62\x67","\x68\x6F\x65\x2D\x74\x68\x65\x6D\x65\x62\x67\x2D\x74\x79\x70\x65","\x61\x74\x74\x72","\x62\x6F\x64\x79","\x6F\x6E","\x23\x74\x68\x65\x6D\x65\x2D\x63\x6F\x6C\x6F\x72\x20\x3E\x20\x61\x2E\x74\x68\x65\x6D\x65\x2D\x62\x67","\x63\x68\x61\x6E\x67\x65","\x76\x61\x6C","\x62\x6F\x78\x2D\x6C\x61\x79\x6F\x75\x74","\x74\x68\x65\x6D\x65\x2D\x6C\x61\x79\x6F\x75\x74","\x77\x69\x64\x65\x2D\x6C\x61\x79\x6F\x75\x74","\x23\x74\x68\x65\x6D\x65\x2D\x6C\x61\x79\x6F\x75\x74","\x68\x6F\x65\x2D\x6E\x61\x76\x69\x67\x61\x74\x69\x6F\x6E\x2D\x74\x79\x70\x65","\x76\x65\x72\x74\x69\x63\x61\x6C","\x76\x65\x72\x74\x69\x63\x61\x6C\x2D\x63\x6F\x6D\x70\x61\x63\x74","\x6C\x65\x6E\x67\x74\x68","\x6C\x69\x2E\x68\x6F\x65\x2D\x68\x61\x73\x2D\x6D\x65\x6E\x75","\x70\x61\x72\x65\x6E\x74","\x61\x63\x74\x69\x76\x65","\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73","\x6C\x69\x2E\x61\x63\x74\x69\x76\x65","\x66\x69\x6E\x64","\x2E\x70\x61\x6E\x65\x6C\x2D\x6C\x69\x73\x74","\x70\x61\x72\x65\x6E\x74\x73","\x61\x64\x64\x43\x6C\x61\x73\x73","\x2E\x70\x61\x6E\x65\x6C\x2D\x6C\x69\x73\x74\x20\x6C\x69\x20\x3E\x20\x61","\x72\x69\x67\x68\x74\x73\x69\x64\x65","\x68\x6F\x65\x2D\x6E\x61\x76\x2D\x70\x6C\x61\x63\x65\x6D\x65\x6E\x74","\x72\x69\x67\x68\x74","\x63\x6F\x6D\x70\x61\x63\x74\x2D\x68\x6D\x65\x6E\x75","\x23\x68\x6F\x65\x61\x70\x70\x2D\x77\x72\x61\x70\x70\x65\x72","\x6C\x65\x66\x74","\x23\x6E\x61\x76\x69\x67\x61\x74\x69\x6F\x6E\x2D\x73\x69\x64\x65","\x68\x6F\x72\x69\x7A\x6F\x6E\x74\x61\x6C","\x68\x6F\x65\x2D\x6D\x69\x6E\x69\x6D\x69\x7A\x65\x64\x2D\x6C\x70\x61\x6E\x65\x6C","\x23\x68\x6F\x65\x2D\x68\x65\x61\x64\x65\x72\x2C\x20\x23\x68\x6F\x65\x61\x70\x70\x2D\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72","\x68\x6F\x65\x2D\x63\x6F\x6C\x6F\x72\x2D\x74\x79\x70\x65","\x6C\x6F\x67\x6F\x2D\x62\x67\x37","\x23\x68\x6F\x65\x2D\x68\x65\x61\x64\x65\x72","\x68\x6F\x72\x69\x7A\x6F\x6E\x74\x61\x6C\x2D\x63\x6F\x6D\x70\x61\x63\x74","\x23\x6E\x61\x76\x69\x67\x61\x74\x69\x6F\x6E\x2D\x74\x79\x70\x65","\x23\x68\x6F\x65\x2D\x68\x65\x61\x64\x65\x72\x20\x3E\x20\x2E\x68\x6F\x65\x2D\x72\x69\x67\x68\x74\x2D\x68\x65\x61\x64\x65\x72","\x23\x74\x68\x65\x6D\x65\x2D\x63\x6F\x6C\x6F\x72\x20\x3E\x20\x61\x2E\x68\x65\x61\x64\x65\x72\x2D\x62\x67","\x23\x68\x6F\x65\x61\x70\x70\x2D\x63\x6F\x6E\x74\x61\x69\x6E\x65\x72","\x23\x74\x68\x65\x6D\x65\x2D\x63\x6F\x6C\x6F\x72\x20\x3E\x20\x61\x2E\x6C\x70\x61\x6E\x65\x6C\x2D\x62\x67","\x23\x74\x68\x65\x6D\x65\x2D\x63\x6F\x6C\x6F\x72\x20\x3E\x20\x61\x2E\x6C\x6F\x67\x6F\x2D\x62\x67","\x68\x65\x69\x67\x68\x74","\x69\x6E\x6E\x65\x72\x48\x65\x69\x67\x68\x74","\x23\x66\x6F\x6F\x74\x65\x72","\x6D\x69\x6E\x2D\x68\x65\x69\x67\x68\x74","\x63\x73\x73","\x23\x6D\x61\x69\x6E\x2D\x63\x6F\x6E\x74\x65\x6E\x74\x20","\x2E\x69\x6E\x6E\x65\x72\x2D\x6C\x65\x66\x74\x2D\x70\x61\x6E\x65\x6C\x20","\x72\x65\x73\x69\x7A\x65","\x66\x69\x78\x65\x64","\x68\x6F\x65\x2D\x70\x6F\x73\x69\x74\x69\x6F\x6E\x2D\x74\x79\x70\x65","\x23\x68\x6F\x65\x2D\x6C\x65\x66\x74\x2D\x70\x61\x6E\x65\x6C\x2C\x2E\x68\x6F\x65\x2D\x6C\x65\x66\x74\x2D\x68\x65\x61\x64\x65\x72","\x61\x62\x73\x6F\x6C\x75\x74\x65","\x23\x73\x69\x64\x65\x62\x61\x72\x2D\x70\x6F\x73\x69\x74\x69\x6F\x6E","\x6F\x76\x65\x72\x6C\x61\x79","\x68\x6F\x65\x2D\x6C\x70\x61\x6E\x65\x6C\x2D\x65\x66\x66\x65\x63\x74","\x70\x75\x73\x68","\x73\x68\x72\x69\x6E\x6B","\x23\x6C\x65\x66\x74\x70\x61\x6E\x65\x6C\x2D\x65\x66\x66\x65\x63\x74","\x6F\x70\x65\x6E","\x74\x6F\x67\x67\x6C\x65\x43\x6C\x61\x73\x73","\x23\x73\x74\x79\x6C\x65\x53\x65\x6C\x65\x63\x74\x6F\x72","\x2E\x73\x65\x6C\x65\x63\x74\x6F\x72\x2D\x74\x6F\x67\x67\x6C\x65\x20\x3E\x20\x61","\x2E\x68\x6F\x65\x2D\x6D\x69\x6E\x69\x6D\x69\x7A\x65\x64\x2D\x6C\x70\x61\x6E\x65\x6C","\x63\x6C\x6F\x73\x65\x73\x74","\x66\x61\x73\x74","\x73\x6C\x69\x64\x65\x55\x70","\x75\x6C\x3A\x76\x69\x73\x69\x62\x6C\x65","\x75\x6C","\x2E\x68\x6F\x65\x2D\x68\x61\x73\x2D\x6D\x65\x6E\x75","\x6F\x70\x65\x6E\x65\x64","\x2E\x6F\x70\x65\x6E\x65\x64","\x3E\x2E\x68\x6F\x65\x2D\x73\x75\x62\x2D\x6D\x65\x6E\x75","\x3A\x68\x69\x64\x64\x65\x6E","\x69\x73","\x73\x6C\x69\x64\x65\x44\x6F\x77\x6E","\x2E\x68\x6F\x65\x2D\x68\x61\x73\x2D\x6D\x65\x6E\x75\x20\x3E\x20\x61","\x68\x6F\x65\x2D\x64\x65\x76\x69\x63\x65\x2D\x74\x79\x70\x65","\x70\x68\x6F\x6E\x65","\x68\x6F\x65\x2D\x68\x69\x64\x65\x2D\x6C\x70\x61\x6E\x65\x6C","\x68\x61\x73\x43\x6C\x61\x73\x73","\x2E\x68\x6F\x65\x2D\x73\x69\x64\x65\x62\x61\x72\x2D\x74\x6F\x67\x67\x6C\x65\x20\x61","\x69\x6E\x6E\x65\x72\x57\x69\x64\x74\x68","\x74\x61\x62\x6C\x65\x74","\x64\x69\x73\x61\x62\x6C\x65\x64","\x6C\x69\x2E\x74\x68\x65\x6D\x65\x2D\x6F\x70\x74\x69\x6F\x6E\x20\x73\x65\x6C\x65\x63\x74","\x64\x65\x73\x6B\x74\x6F\x70","\x61\x70\x70\x69\x6E\x69\x74","\x72\x65\x61\x64\x79"];$(document)[_0xa3fc[94]](function(){HoeDatapp={appinit:function(){HoeDatapp.HandleSidebartoggle();HoeDatapp.Handlelpanel();HoeDatapp.Handlelpanelmenu();HoeDatapp.Handlethemeoption();HoeDatapp.Handlesidebareffect();HoeDatapp.Handlesidebarposition();HoeDatapp.Handlecontentheight();HoeDatapp.Handlethemecolor();HoeDatapp.Handlenavigationtype();HoeDatapp.Handlesidebarside();HoeDatapp.Handleactivestatemenu();HoeDatapp.Handlethemelayout();HoeDatapp.Handlethemebackground();},Handlethemebackground:function(){function _0x8220x1(){$(_0xa3fc[6])[_0xa3fc[5]](_0xa3fc[0],function(){$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[1],$(this)[_0xa3fc[3]](_0xa3fc[2]))})}_0x8220x1();},Handlethemelayout:function(){$(_0xa3fc[12])[_0xa3fc[5]](_0xa3fc[7],function(){if($(this)[_0xa3fc[8]]()==_0xa3fc[9]){$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[10],_0xa3fc[9])}else {$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[10],_0xa3fc[11])}})},Handleactivestatemenu:function(){$(_0xa3fc[26])[_0xa3fc[5]](_0xa3fc[0],function(){if($(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13])==_0xa3fc[14]||$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13])==_0xa3fc[15]){if($(this)[_0xa3fc[18]](_0xa3fc[17])[_0xa3fc[16]]===0){$(this)[_0xa3fc[24]](_0xa3fc[23])[_0xa3fc[22]](_0xa3fc[21])[_0xa3fc[20]](_0xa3fc[19]);$(this)[_0xa3fc[18]]()[_0xa3fc[25]](_0xa3fc[19]);}}})},Handlesidebarside:function(){$(_0xa3fc[33])[_0xa3fc[5]](_0xa3fc[7],function(){if($(this)[_0xa3fc[8]]()==_0xa3fc[27]){$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[28],_0xa3fc[29]);$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13],_0xa3fc[14]);$(_0xa3fc[31])[_0xa3fc[20]](_0xa3fc[30]);}else {$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[28],_0xa3fc[32]);$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13],_0xa3fc[14]);$(_0xa3fc[31])[_0xa3fc[20]](_0xa3fc[30]);}})},Handlenavigationtype:function(){$(_0xa3fc[41])[_0xa3fc[5]](_0xa3fc[7],function(){if($(this)[_0xa3fc[8]]()==_0xa3fc[34]){$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13],_0xa3fc[34]);$(_0xa3fc[31])[_0xa3fc[20]](_0xa3fc[30]);$(_0xa3fc[36])[_0xa3fc[20]](_0xa3fc[35]);$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[28],_0xa3fc[32]);$(_0xa3fc[39])[_0xa3fc[3]](_0xa3fc[37],_0xa3fc[38]);}else {if($(this)[_0xa3fc[8]]()==_0xa3fc[40]){$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13],_0xa3fc[34]);$(_0xa3fc[31])[_0xa3fc[25]](_0xa3fc[30]);$(_0xa3fc[36])[_0xa3fc[20]](_0xa3fc[35]);$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[28],_0xa3fc[32]);$(_0xa3fc[39])[_0xa3fc[3]](_0xa3fc[37],_0xa3fc[38]);}else {if($(this)[_0xa3fc[8]]()==_0xa3fc[15]){$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13],_0xa3fc[15]);$(_0xa3fc[31])[_0xa3fc[20]](_0xa3fc[30]);$(_0xa3fc[36])[_0xa3fc[25]](_0xa3fc[35]);$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[28],_0xa3fc[32]);}else {$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13],_0xa3fc[14]);$(_0xa3fc[31])[_0xa3fc[20]](_0xa3fc[30]);$(_0xa3fc[36])[_0xa3fc[20]](_0xa3fc[35]);$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[28],_0xa3fc[32]);}}}})},Handlethemecolor:function(){function _0x8220x2(){$(_0xa3fc[43])[_0xa3fc[5]](_0xa3fc[0],function(){$(_0xa3fc[42])[_0xa3fc[3]](_0xa3fc[37],$(this)[_0xa3fc[3]](_0xa3fc[37]))})}function _0x8220x3(){$(_0xa3fc[45])[_0xa3fc[5]](_0xa3fc[0],function(){$(_0xa3fc[44])[_0xa3fc[3]](_0xa3fc[37],$(this)[_0xa3fc[3]](_0xa3fc[37]))})}function _0x8220x4(){$(_0xa3fc[46])[_0xa3fc[5]](_0xa3fc[0],function(){$(_0xa3fc[39])[_0xa3fc[3]](_0xa3fc[37],$(this)[_0xa3fc[3]](_0xa3fc[37]))})}_0x8220x2();_0x8220x3();_0x8220x4();},Handlecontentheight:function(){function _0x8220x5(){var _0x8220x6=$(window)[_0xa3fc[47]]();var _0x8220x7=$(_0xa3fc[39])[_0xa3fc[48]]();var _0x8220x8=$(_0xa3fc[49])[_0xa3fc[48]]();var _0x8220x9=_0x8220x6-_0x8220x7-_0x8220x8-2;var _0x8220xa=_0x8220x6-_0x8220x7-2;$(_0xa3fc[52])[_0xa3fc[51]](_0xa3fc[50],_0x8220x9);$(_0xa3fc[53])[_0xa3fc[51]](_0xa3fc[47],_0x8220xa);}_0x8220x5();$(window)[_0xa3fc[54]](function(){_0x8220x5()});},Handlesidebarposition:function(){$(_0xa3fc[59])[_0xa3fc[5]](_0xa3fc[7],function(){if($(this)[_0xa3fc[8]]()==_0xa3fc[55]){$(_0xa3fc[57])[_0xa3fc[3]](_0xa3fc[56],_0xa3fc[55])}else {$(_0xa3fc[57])[_0xa3fc[3]](_0xa3fc[56],_0xa3fc[58])}})},Handlesidebareffect:function(){$(_0xa3fc[64])[_0xa3fc[5]](_0xa3fc[7],function(){if($(this)[_0xa3fc[8]]()==_0xa3fc[60]){$(_0xa3fc[36])[_0xa3fc[3]](_0xa3fc[61],_0xa3fc[60])}else {if($(this)[_0xa3fc[8]]()==_0xa3fc[62]){$(_0xa3fc[36])[_0xa3fc[3]](_0xa3fc[61],_0xa3fc[62])}else {$(_0xa3fc[36])[_0xa3fc[3]](_0xa3fc[61],_0xa3fc[63])}}})},Handlethemeoption:function(){$(_0xa3fc[68])[_0xa3fc[5]](_0xa3fc[0],function(){$(_0xa3fc[67])[_0xa3fc[66]](_0xa3fc[65])})},Handlelpanelmenu:function(){$(_0xa3fc[82])[_0xa3fc[5]](_0xa3fc[0],function(){var _0x8220xb=$(this)[_0xa3fc[70]](_0xa3fc[69])[_0xa3fc[16]];if(_0x8220xb===0){$(this)[_0xa3fc[18]](_0xa3fc[75])[_0xa3fc[18]](_0xa3fc[74])[_0xa3fc[22]](_0xa3fc[73])[_0xa3fc[72]](_0xa3fc[71]);$(this)[_0xa3fc[18]](_0xa3fc[75])[_0xa3fc[18]](_0xa3fc[74])[_0xa3fc[22]](_0xa3fc[77])[_0xa3fc[20]](_0xa3fc[76]);var _0x8220xc=$(this)[_0xa3fc[18]](_0xa3fc[75])[_0xa3fc[22]](_0xa3fc[78]);if(_0x8220xc[_0xa3fc[80]](_0xa3fc[79])){_0x8220xc[_0xa3fc[81]](_0xa3fc[71]);$(this)[_0xa3fc[18]](_0xa3fc[75])[_0xa3fc[25]](_0xa3fc[76]);}else {$(this)[_0xa3fc[18]](_0xa3fc[75])[_0xa3fc[18]](_0xa3fc[74])[_0xa3fc[22]](_0xa3fc[73])[_0xa3fc[72]](_0xa3fc[71]);$(this)[_0xa3fc[18]](_0xa3fc[75])[_0xa3fc[20]](_0xa3fc[76]);};};})},HandleSidebartoggle:function(){$(_0xa3fc[87])[_0xa3fc[5]](_0xa3fc[0],function(){if($(_0xa3fc[31])[_0xa3fc[3]](_0xa3fc[83])!==_0xa3fc[84]){$(_0xa3fc[44])[_0xa3fc[66]](_0xa3fc[35]);$(_0xa3fc[39])[_0xa3fc[66]](_0xa3fc[35]);if($(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13])!==_0xa3fc[15]){$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13],_0xa3fc[15])}else {$(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13],_0xa3fc[14])};}else {if(!$(_0xa3fc[31])[_0xa3fc[86]](_0xa3fc[85])){$(_0xa3fc[31])[_0xa3fc[25]](_0xa3fc[85])}else {$(_0xa3fc[31])[_0xa3fc[20]](_0xa3fc[85])}}})},Handlelpanel:function(){function _0x8220xd(){var _0x8220xe=$(window)[0][_0xa3fc[88]];if(_0x8220xe>=768&&_0x8220xe<=1024){$(_0xa3fc[31])[_0xa3fc[3]](_0xa3fc[83],_0xa3fc[89]);$(_0xa3fc[36])[_0xa3fc[25]](_0xa3fc[35]);$(_0xa3fc[91])[_0xa3fc[3]](_0xa3fc[90],false);}else {if(_0x8220xe<768){$(_0xa3fc[31])[_0xa3fc[3]](_0xa3fc[83],_0xa3fc[84]);$(_0xa3fc[36])[_0xa3fc[20]](_0xa3fc[35]);$(_0xa3fc[91])[_0xa3fc[3]](_0xa3fc[90],_0xa3fc[90]);}else {if($(_0xa3fc[4])[_0xa3fc[3]](_0xa3fc[13])!==_0xa3fc[15]){$(_0xa3fc[31])[_0xa3fc[3]](_0xa3fc[83],_0xa3fc[92]);$(_0xa3fc[36])[_0xa3fc[20]](_0xa3fc[35]);$(_0xa3fc[91])[_0xa3fc[3]](_0xa3fc[90],false);}else {$(_0xa3fc[31])[_0xa3fc[3]](_0xa3fc[83],_0xa3fc[92]);$(_0xa3fc[36])[_0xa3fc[25]](_0xa3fc[35]);$(_0xa3fc[91])[_0xa3fc[3]](_0xa3fc[90],false);}}};}_0x8220xd();$(window)[_0xa3fc[54]](_0x8220xd);}};HoeDatapp[_0xa3fc[93]]();});
/*hoe.js*/