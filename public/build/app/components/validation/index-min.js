KISSY.add("components/validation/index",function(e,a,t){function s(){return{init:function(){var a,t=this,s=n(t.target);a=s.attr("data-messagebox")?n(s.attr("data-messagebox")):t.messagebox?n(t.messagebox):e.Node(t.template).appendTo(s.parent()),a&&(t.panel=a,t.estate=a.one(".estate"),t.label=a.one(".label"),t.estate&&t.label&&a.hide())},showMessage:function(a,t){var s=this,l=n(s.el),i=s.panel,o=s.estate,d=s.label,u=e.isNumber(s.anim)?s.anim:.25;s.invalidClass&&(a==r.ignore&&a==r.ok?l.removeClass(s.invalidClass):l.addClass(s.invalidClass));var p="none"==i.css("display")?!1:!0,v="INPUT"===s.el.tagName&&"text"===s.el.type||"TEXTAREA"===s.el.tagName||"password"===s.el.type;a===r.ignore||a===r.ok?(p&&i.slideUp(u),v&&e.one(s.el).removeClass("input-text-error").addClass("input-text")):(o.removeClass("ok tip error"),a==r.error?(o.addClass("error"),d.html(t),p||i.slideDown(u),v&&e.one(s.el).removeClass("input-text").addClass("input-text-error")):a===r.hint&&(o.addClass("tip"),d.html(t),p||i.slideDown(u),v&&e.one(s.el).removeClass("input-text-error").addClass("input-text")))},style:{under:{template:'<div class="ux-valid"><p class="estate"><span class="label"></span></p></div>',event:"blur"}}}}function l(){l.superclass.constructor.apply(this,arguments)}var n=e.all,r={error:0,hint:2,ignore:3,ok:1};return t.Warn.extend("custom",s),e.extend(l,a,{initialize:function(){var e=this,a=e.get("el")[0];e.valid=new t(a,{event:"blur",style:"under",warn:"custom"})},destructor:function(){var e=this;e.valid&&(e.valid=null)}}),l},{requires:["brix/core/brick","gallery/validation/1.0/index"]});