!function(e){var n={_mocked:{}};n.mockjax=function(e){function r(){return{open:e.noop,send:e.noop,getAllResponseHeaders:e.noop,readyState:4,status:200}}function t(e){return function(){return n.gen(e.template)}}return e.ajaxPrefilter("*",function(e){for(var a in n._mocked){var o=n._mocked[a];if(o.rurl.test(e.url)){e.converters["text json"]=t(o),e.xhr=r;break}}}),n},e.jQuery&&n.mockjax(jQuery);var r=String.fromCharCode,t=Math.floor,a=Math.round,o=Math.random,i=function(){return n._data.NUMBER[t(o()*n._data.NUMBER.length)]},u=function(){return new Date(t(o()*(new Date).valueOf()))},l=function(e){return null===e||void 0===e?String(e):Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1].toLowerCase()};return n.mock=function(e,r){return 1===arguments.length?n.gen(e):(n._mocked[e]={rurl:e,template:r},n)},n.gen=function(e,u){var s,c,d=/(.+)\|(?:\+(\d+)|(\d+-?\d*)?(?:\.(\d+-?\d*))?)/,m=/(\d+)-?(\d+)?/,f=(u=u||"").match(d),p=f&&f[3]&&f[3].match(m),h=p&&parseInt(p[1],10)||1,g=p&&parseInt(p[2],10)||1,v=p&&!p[2]&&parseInt(p[1],10)||a(o()*(g-h))+h||1,M=f&&f[4]&&f[4].match(m),E=M&&parseInt(M[1],10)||0,y=M&&parseInt(M[2],10)||0,R=M&&!M[2]&&M[1]||a(o()*(y-E))+E||0,S=f&&f[4];switch(l(e)){case"array":if(1===v&&e.length>1)s=e[t(o()*e.length)];else for(s=[],c=0;v>c;c++)s[c]=n.gen(e[0]);break;case"object":s={};for(var b in e){s[b.replace(d,"$1")]=n.gen(e[b],b);var k=b.match(d);k&&k[2]&&"number"==l(e[b])&&(e[b]+=parseInt(k[2],10))}break;case"number":if(s="",S){e+="";var L=e.split(".");for(L[0]=p?v:L[0],L[1]=(L[1]||"").slice(0,R),c=0;L[1].length<R;c++)L[1]+=i();s=parseFloat(L.join("."))}else s=p&&!f[2]?v:e;break;case"boolean":s=f?o()>=.5:e;break;case"string":if(e.length){for(s="",c=0;v>c;c++)s+=e;var _=s.match(/@([A-Z_0-9]+(?:\([^@]+\))?)/g)||[];for(c=0;c<_.length;c++){var A=_[c];s=s.replace(A,n.genRandom(A))}}else for(s="",c=0;v>c;c++)s+=r(t(255*o()));break;default:s=e}return s},n.genRandom=function(e){var r=e.match(/@([^\(\)]+)(?:\((.+)\))?/),a=r&&r[1],i=r&&r[2]?r[2].split(/,\s*/):[];if(!(a in n._data))return a;var u=n._data[a];switch(l(u)){case"array":return u[t(u.length*o())];case"function":return u.apply({},i)}},n._data={NUMBER:"0123456789".split(""),LETTER_UPPER:"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),LETTER_LOWER:"abcdefghijklmnopqrstuvwxyz".split(""),MALE_FIRST_NAME:["James","John","Robert","Michael","William","David","Richard","Charles","Joseph","Thomas","Christopher","Daniel","Paul","Mark","Donald","George","Kenneth","Steven","Edward","Brian","Ronald","Anthony","Kevin","Jason","Matthew","Gary","Timothy","Jose","Larry","Jeffrey","Frank","Scott","Eric"],FEMALE_FIRST_NAME:["Mary","Patricia","Linda","Barbara","Elizabeth","Jennifer","Maria","Susan","Margaret","Dorothy","Lisa","Nancy","Karen","Betty","Helen","Sandra","Donna","Carol","Ruth","Sharon","Michelle","Laura","Sarah","Kimberly","Deborah","Jessica","Shirley","Cynthia","Angela","Melissa","Brenda","Amy","Anna"],LAST_NAME:["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White","Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall","Young","Allen"],EMAIL:function(){return n.genRandom("@LETTER_LOWER")+"."+n.genRandom("@LAST_NAME").toLowerCase()+"@"+n.genRandom("@LAST_NAME").toLowerCase()+".com"},DATE:function(){var e=u(),n="getFullYear",r=function(e){var n=e.getMonth()+1;return 10>n?"0"+n:n},t=function(e){var n=e.getDate();return 10>n?"0"+n:n};return e[n]()+"-"+r(e)+"-"+t(e)},TIME:function(){var e=u(),n=function(e){var n=e.getHours();return 10>n?"0"+n:n},r=function(e){var n=e.getMinutes();return 10>n?"0"+n:n},t=function(e){var n=e.getSeconds();return 10>n?"0"+n:n};return n(e)+":"+r(e)+":"+t(e)},DATETIME:function(){return n._data.DATE()+" "+n._data.TIME()},LOREM:function(){var e="lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "),n=t(o()*e.length);return e[n]},LOREM_IPSUM:function(){for(var e="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "),n=[],r=t(o()*e.length/2),a=0;r>a;a++){var i=t(o()*e.length);n.push(e[i])}return n.join(" ")}},"function"==typeof define&&define(function(){return n}),"undefined"!=typeof module&&module.exports&&(module.exports=n),"undefined"!=typeof KISSY&&KISSY.add&&KISSY.add("components/mock/index",function(e){return n.mockjax=function(e){var r=e.io;e.io=function(t){for(var a in n._mocked){var o=n._mocked[a];if(o.rurl.test(t.url)){var i=n.gen(o.template);return t.success&&t.success(i),t.complete&&t.complete(i),e}}return r.apply(this,arguments)}},n.mockjax(e),n},{requires:["ajax"]}),e.Mock=n,n}(this);