KISSY.add("app/views/pages/discovery/article_list",function(a,e,t,i,s,l){l.all;return e.extend({template:'<ul class=article-list bx-name="codeprettify" bx-path="components/codeprettify/"> {{#list}} <li class=list-item> <div class=hd> <h3 class=title> <a href="#!/pages/discovery/article_detail?id={{_id}}">{{title}}</a> </h3> <div class=meta> <span class=date>{{publishDate}}</span> <span class=divide></span> <a class=tag href="#!/pages/tags/tags?tag={{tag}}">{{tag}}</a> </div> </div> <div class="bd markdown-body"> {{{content}}} </div> <div class=ft> <a href="#!/pages/discovery/article_detail?id={{_id}}" class=continue-reading>Read more \u2192</a> </div> </li> {{/list}} {{^list}} <li class=no-data> \u55ef\uff0c\u4ec0\u4e48\u90fd\u8fd8\u6ca1\u5199~ </li> {{/list}} </ul>',locationChange:function(){this.render()},render:function(){var a=this;a.manage(t.fetchAll([{name:"article_list",urlParams:{type:"discovery"}}],function(e,t){for(var i=t.get("data"),s=0;s<i.length;s++)i[s].content=i[s].content.replace(/<[^>]+>/g,""),i[s].content=i[s].content.substring(0,300)+" ... ...";a.setViewPagelet({list:i})}))}})},{requires:["mxext/view","app/models/modelmanager","magix/vom","magix/router","node","app/util/util"]});