/*
  DMXzone jQuery.csstransform
  
  Version 1.4
  
  Copyright (c) 2010 DMXzone.com 
*/
(function(d){function f(a,b,c,g,e,h){if(arguments.length==6){this.a=a;this.b=b;this.c=c;this.d=g;this.tx=e;this.ty=h}}function k(a,b){var c=parseFloat(a);return c+""=="NaN"||c+""=="Infinity"||c+""=="-Infinity"?b===undefined?0:b:c}function o(a){if(!a||!(a in l))throw'Invalid transformation type "'+a+'"';this.type=a;this.args=[].concat(o.defaultArgs[a])}function i(a){this._stack=[];this._stackIndex={};this.element=a||null}function n(a){this.element=a||null;this.origStyle=null;this.origState={};this.wrapper=
null;this._stack=[];this._stackIndex={};this.filterReg=/(progid:DXImageTransform\.Microsoft\.)?Matrix\s*\([^\)]*\)/i}var l={matrix:"",rotate:"deg",scale:"",scaleX:"",scaleY:"",skew:"deg",skewX:"deg",skewY:"deg",translate:"px",translateX:"px",translateY:"px",transform:""};d.versionCompare=function(a){a=String(a).split(".");for(var b=d.prototype.jquery.split("."),c=0;c<Math.max(b.length,a.length);c++){if(a[c]===undefined)a[c]=0;if(b[c]===undefined)b[c]=0;if(parseFloat(a[c])>parseFloat(b[c]))return 1;
if(parseFloat(a[c])<parseFloat(b[c]))return-1}return 0};d.versionGTE=function(a){return d.versionCompare(a)<=0};d.versionLTE=function(a){return d.versionCompare(a)>=0};var m=document.createElement("div");d.support.transform=m.style.transform!==undefined?"transform":m.style["-ms-transform"]!==undefined?"-ms-transform":m.style.MozTransform!==undefined?"MozTransform":m.style.WebkitTransform!==undefined?"WebkitTransform":m.style.OTransform!==undefined?"OTransform":m.style.KhtmlTransform!==undefined?"KhtmlTransform":
false;if(!d.cssHooks)d.cssHooks={};d.cssHooks.multipliedMatrix={get:function(a){return i.getInstance(a).get("multipliedMatrix")}};d.each(l,function(a,b){d.cssHooks[a]={set:function(c,g){i.getInstance(c).set(a,g).paint()},get:function(c){return i.getInstance(c).get(a)}};if(a!="matrix")d.fx.step[a]=function(c){c.unit=b;i.getInstance(c.elem).set(a,c.now).paint()}});if(d.versionLTE("1.4.2")){var r=jQuery.curCSS;jQuery.curCSS=function(a,b){var c=d.cssHooks[b]?d.cssHooks[b].get:null;if(b in l&&c)return c(a);
return r.apply(jQuery,arguments)};var s=d.fn.css;d.fn.css=function(a,b){if(typeof a=="string"){if(b!==undefined){var c=d.cssHooks[a]?d.cssHooks[a].set:null;if(a in l&&c)return this.each(function(g){c(this,d.isFunction(b)?b(g,d(this).css(a)):b)})}}else this.each(function(g){var e,h,j;for(e in a){h=d.cssHooks[e]?d.cssHooks[e].set:null;if(e in l&&h){j=a[e];if(d.isFunction(j))j=j(g,d(this).css(e));h(this,j)}}});return s.apply(this,arguments)}}var t=d.fx.prototype.cur;d.fx.prototype.cur=function(){var a=
d.cssHooks[this.prop]?d.cssHooks[this.prop].get:null;if(this.prop in l&&a)return parseFloat(String(a(this.elem)).replace(/^[^\d-\.\+]*/,""));return t.apply(this,arguments)};f.prototype={a:1,b:0,c:0,d:1,tx:0,ty:0};f.prototype.multiply=function(a){var b=this.a,c=this.b,g=this.c,e=this.d,h=this.tx,j=this.ty;this.a=b*a.a+c*a.c;this.b=b*a.b+c*a.d;this.c=g*a.a+e*a.c;this.d=g*a.b+e*a.d;this.tx=h*a.a+j*a.c+a.tx;this.ty=h*a.b+j*a.d+a.ty;return this};f.prototype.toString=d.browser.mozilla?function(){return this.a+
", "+this.b+", "+this.c+", "+this.d+", "+this.tx+"px, "+this.ty+"px"}:function(){return this.a+", "+this.b+", "+this.c+", "+this.d+", "+this.tx+", "+this.ty};f.prototype.isIdentity=function(){return this.a===1&&this.b===0&&this.c===0&&this.d===1&&this.tx===0&&this.ty===0};f.rotate=function(a){var b=Math.PI/180*k(a);a=Math.cos(b);b=Math.sin(b);return new f(a,b,-b,a,0,0)};f.scale=function(a,b){a=k(a,1);b=k(b,a);return new f(a,0,0,b,0,0)};f.scaleX=function(a){return new f(k(a,1),0,0,1,0,0)};f.scaleY=
function(a){return new f(1,0,0,k(a,1),0,0)};f.translate=function(a,b){return new f(1,0,0,1,k(a),k(b))};f.translateX=function(a){return new f(1,0,0,1,k(a),0)};f.translateY=function(a){return new f(1,0,0,1,0,k(a))};f.skew=function(a,b){return new f(1,Math.tan(k(b)*(Math.PI/180)),Math.tan(k(a)*(Math.PI/180)),1,0,0)};f.skewX=function(a){return new f(1,0,Math.tan(k(a)*(Math.PI/180)),1,0,0)};f.skewY=function(a){return new f(1,Math.tan(k(a)*(Math.PI/180)),0,1,0,0)};f.matrix=function(a,b,c,g,e,h){return new f(a,
b,c,g,e,h)};o.prototype={toString:function(){return this.type+(this.type=="matrix"?"("+this.getMatrix()+")":"("+this.args.join(l[this.type]+", ")+l[this.type]+")")},init:function(){this.args=[];var a=arguments.length;if(a>0){var b;for(b=0;b<a;b++)this.args.push(arguments[b])}return this},getMatrix:function(){return f[this.type].apply(f,this.args)}};o.defaultArgs={matrix:[1,0,0,1,0,0],rotate:[0],scale:[1,1],scaleX:[1],scaleY:[1],skew:[0,0],skewX:[0],skewY:[0],translate:[0,0],translateX:[0],translateY:[0]};
i.prototype._defaultValues={matrix:d.browser.mozilla?[1,0,0,1,"0px","0px"]:[1,0,0,1,0,0],rotate:["0deg"],scale:[1,1],scaleX:[1],scaleY:[1],skew:["0deg","0deg"],skewX:["0deg"],skewY:["0deg"],translate:["0px","0px"],translateX:["0px"],translateY:["0px"]};i.prototype.empty=function(){this._stack=[];this._stackIndex={};return this};i.prototype.isEmpty=function(){return this._stack.length===0};i.prototype.get=function(a){if(!a||a=="transform")return this.toString();if(a=="multipliedMatrix")return"matrix("+
this.getMatrix()+")";if(this._stackIndex[a]!==undefined)return this._stack[this._stackIndex[a]].toString();return a+"("+this._defaultValues[a].join(", ")+")"};i.prototype.toString=function(){for(var a=[],b=this._stack.length;b;)a.unshift(this._stack[--b].toString());return a.join(" ")||"none"};i.prototype.getMatrix=function(){for(var a=new f,b=this._stack.length;b;)a.multiply(this._stack[--b].getMatrix());return a};i.prototype.getCSS=function(){return this.toString()};i.prototype.setCSS=function(a){this.empty();
var b=/^(\w+)\(([\d\w,-\.]+)$/i;if((a=String(a||""))&&a!="none"){a=a.replace(/\s+/g,"").split(")");if(a.length>0)for(var c,g,e=0;e<a.length;e++)if(a[e])if(c=b.exec(a[e])){g=c[1];specialProps[g]&&this.set(g,c[2])}}return this};i.prototype.set=function(a,b){if(a)if(a=="transform")this.setCSS(b);else if(a!="none"){for(var c=d.isArray(b)?b:typeof b=="string"?b.split(/,/):[b],g=[],e=c.length,h,j,p,q;e;){h=c[--e];if(this._stackIndex[a]===undefined)this._stackIndex[a]=this._stack.push(new o(a))-1;q=this._stack[this._stackIndex[a]];
p=parseFloat(q.args[e]);h=d.trim(String(h));if(j=h.replace(/\s/g,"").match(/^(([\+-]=)?(-?\d+(\.\d+)?)).*$/)){if(j[3])h=parseFloat(j[3]);if(j[2])switch(j[2]){case "+=":h=p+h;break;case "-=":h=p-h}}isNaN(h)||g.unshift(h)}q.args=g}return this};i.prototype.paint=function(){this.element.style[d.support.transform]=this.toString();return this};i.factory=function(a){if(!d.support.transform)if(i.isFilterSupported())return new n(a);return new i(a)};i.getInstance=function(a){if(!a.transformManager)a.transformManager=
i.factory(a);return a.transformManager};i.isFilterSupported=function(){var a=document.getElementsByTagName("body")[0].filters,b=a&&typeof a=="object"&&!window.opera;i.isFilterSupported=function(){return b};return b};n.prototype=new i;n.prototype.paint=function(){this.origStyle||this.initTransform();var a=this.getMatrix();if(a.isIdentity())this.uninitTransform();else{var b=Math.abs(a.b-a.c);if(b>100)a.b*=b/100;b=this.element.style;var c=b.filter||"",g="";if(a.a!==1||a.b!==0||a.c!==0||a.d!==1)g="progid:DXImageTransform.Microsoft.Matrix(M11="+
a.a+",M12="+a.c+",M21="+a.b+",M22="+a.d+",sizingMethod='auto expand',FilterType='nearest neighbor')";if(this.filterReg.test(c))b.filter=c.replace(this.filterReg,g);else if(g)b.filter=g+" "+b.filter;b.top=(this.origState.height-d(this.element).height())/2+a.ty+this.origState.top+"px";b.left=(this.origState.width-d(this.element).width())/2+a.tx+this.origState.left+"px"}return this};n.prototype.initTransform=function(){function a(){if(!g.origStyle)g.origStyle={};for(var e=0;e<arguments.length;e++)g.origStyle[arguments[e]]=
c.css(arguments[e])}function b(){var e=c.css("float");if(e=="none")e=c.attr("align");if(e!="left"&&e!="right")e="none";return e}var c=d(this.element),g=this;this.origState={width:c.width(),height:c.height(),top:0,left:0};switch(c.css("position")){case "absolute":this.origState.top=c.position().top;this.origState.left=c.position().left;a("width","height","top","left");c.css({width:this.origState.width,height:this.origState.height,top:this.origState.top,left:this.origState.left});break;case "fixed":this.origState.top=
c.offset().top;this.origState.left=c.offset().left;a("width","height","top","left");c.css({width:this.origState.width,height:this.origState.height,top:this.origState.top,left:this.origState.left});break;case "relative":this.origState.top=parseFloat(c.css("top"));this.origState.left=parseFloat(c.css("left"));if(isNaN(this.origState.top))this.origState.top=0;if(isNaN(this.origState.left))this.origState.left=0;a("width","height","top","left","position");c.css({width:this.origState.width,height:this.origState.height,
top:this.origState.top,left:this.origState.left,position:"absolute"});if(!this.wrapper){c.wrap('<span class="dmx-filter-transform-wrapper" />');this.wrapper=c.parent().css({display:c.css("display")=="block"?"block":"inline-block",position:"relative","float":b(),width:c.outerWidth({margin:true}),height:c.outerHeight({margin:true})})}break;default:this.origState.top=0;this.origState.left=0;a("width","height","top","left","position","filter");c.css({width:this.origState.width,height:this.origState.height,
top:this.origState.top,left:this.origState.left,position:"absolute"});if(!this.wrapper){c.wrap('<span class="dmx-filter-transform-wrapper" />');this.wrapper=c.parent().css({display:c.css("display")=="block"?"block":"inline-block",position:"relative","float":b(),width:c.outerWidth({margin:true}),height:c.outerHeight({margin:true})})}}};n.prototype.uninitTransform=function(){this.origState={};if(this.origStyle){d(this.element).css(this.origStyle);this.origStyle=null}if(this.wrapper){this.wrapper.before(d(this.element));
this.wrapper.remove();this.wrapper=null}}})(jQuery);