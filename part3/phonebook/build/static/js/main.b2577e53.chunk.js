(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(36)},36:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(2),l=t(3),i=t.n(l),m="/api/persons/",s=function(){return i.a.get(m).then((function(e){return e.data}))},f=function(e){return i.a.post(m,e).then((function(e){return e.data}))},d=function(e){return i.a.put(m+e.id,e).then((function(e){return e.data}))},h=function(e){return i.a.delete(m+e).then((function(e){return e.data}))},b=function(e){var n=e.newName,t=e.setNewName,a=e.newNumber,u=e.setNewNumber,c=e.addName;return r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:function(e){t(e.target.value)}})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:function(e){u(e.target.value)}}),r.a.createElement("div",null),r.a.createElement("button",{type:"submit",onClick:c},"add")))},p=function(e){var n=e.displayNames;return r.a.createElement("ul",null,n())},w=function(e){var n=e.newSearch,t=e.setNewSearch;return r.a.createElement("form",null,r.a.createElement("div",null,"Search: ",r.a.createElement("input",{value:n,onChange:function(e){t(e.target.value)}})))},v=function(e){var n=e.message,t=e.messageType;if(null===n)return null;return"success"===t?r.a.createElement("div",{style:{color:"white",backgroundColor:"green",margin:"10px",textAlign:"center",fontSize:"26px"}},n):r.a.createElement("div",{style:{color:"white",backgroundColor:"red",margin:"10px",textAlign:"center",fontSize:"26px"}},n)},E=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),l=Object(o.a)(c,2),i=l[0],m=l[1],E=Object(a.useState)(""),g=Object(o.a)(E,2),N=g[0],k=g[1],C=Object(a.useState)(""),j=Object(o.a)(C,2),y=j[0],O=j[1],S=Object(a.useState)(null),x=Object(o.a)(S,2),L=x[0],T=x[1],A=Object(a.useState)(null),z=Object(o.a)(A,2),D=z[0],J=z[1];Object(a.useEffect)((function(){s().then((function(e){u(e)}))}),[]);var B=function(){for(var e=0;e<t.length;e++)if(i.toLowerCase()===t[e].name.toLowerCase())return!1;return!0};return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(w,{newSearch:y,setNewSearch:O}),r.a.createElement("h2",null,"Add an entry"),r.a.createElement(v,{message:L,messageType:D}),r.a.createElement(b,{checkNames:B,newName:i,setNewName:m,addName:function(e){e.preventDefault();var n={name:i,number:N};if(!0===B())f(n).then((function(e){u(t.concat(e)),J("success"),T("".concat(i," was added to the phonebook.")),m(""),k(""),setTimeout((function(){T(null),J(null)}),2e3)})).catch((function(e){J("error"),T(e.message),setTimeout((function(){T(null),J(null)}),2e3)}));else if(window.confirm('"'.concat(n.name,'" is already in the phonebook. Replace the old number with a new one?'))){var a=t.find((function(e){return e.name.toLowerCase()===i.toLowerCase()})),r={name:n.name,number:N,id:a.id};d(r).then((function(e){u(t.map((function(n){return n.id!==r.id?n:e}))),J("success"),T("".concat(i," was updated.")),m(""),k(""),setTimeout((function(){T(null),J(null)}),2e3)})).catch((function(e){T("".concat(i," was already removed from server.")),setTimeout((function(){T(null)}),2e3)}))}},newNumber:N,setNewNumber:k}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(p,{displayNames:function(){if(""===y)return t.map((function(e){return r.a.createElement("li",{key:e.id},e.name,": ",e.number," ",r.a.createElement("button",{onClick:function(){return function(e){var n=t.find((function(n){return n.id===e})).id;h(n).then((function(n){u(t.filter((function(n){return n.id!==e}))),T("A name was deleted."),J("success"),setTimeout((function(){T(null),J(null)}),2e3)}))}(e.id)}},"Delete"))}));for(var e=0;e<t.length;e++){var n=t[e].name.toLowerCase().includes(y);if(!0===t[e].name.toLowerCase().includes(y)&&n)return t.filter((function(e){return e.name.toLowerCase().includes(y)})).map((function(e){return r.a.createElement("li",{key:e.id},e.name,": ",e.number)}))}return r.a.createElement("li",null,"No such name in the phonebook")}}))};c.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.b2577e53.chunk.js.map