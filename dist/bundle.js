!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return e[i].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}var o=n(2),a=i(o),d=n(3),s=i(d),r=n(4),u=i(r),c=n(5),h=n(6);console.log("----------------------------------------------------------------------"),console.log("source code ----> https://github.com/christinecha/collaborativewebsite"),console.log("----------------------------------------------------------------------");var l=document.getElementById("node-editor"),f=document.getElementById("wtf"),v=document.getElementById("warning"),p=document.getElementById("mailing-list"),m=document.querySelector(".trigger-open"),y=document.querySelector(".trigger-close"),g=firebase.database().ref("/nodes"),b=new a["default"]({handleSubmit:function(e){return E(e)}}),w={text:s["default"],image:u["default"]},$=null,x={},T=function(e){v.textContent=e,v.classList.add("is-active"),setTimeout(function(){v.classList.remove("is-active")},3e3)},E=function(e){if((0,c.isValidConfig)(e)){var t={coords:e.data.coords,size:e.data.size};"text"===e.type&&(t.text=e.data.text,t.font=e.data.font,e.data=t,k(e)),"image"===e.type&&(t.src=e.data.src,e.data=t,(0,h.isValidImageSrc)(t.src).then(function(){return k(e)})["catch"](function(e){return T(e)}))}},k=function(e){var t={type:e.type,data:e.data,createdBy:$,createdAt:(new Date).getTime()};g.push(t)["catch"](function(e){return console.warn(e)})},I=function(e){for(var t in e)if(x[t]){var n=x[t];n.update(e[t])}else{var i=w[e[t].type];x[t]=new i(e[t])}},C=(new Date).getTime(),M=C-3e5,S=function(){firebase.database().ref("/nodes").orderByChild("createdAt").endAt(M).once("value",function(e){var t=e.val();for(var n in t)firebase.database().ref("/nodes/"+n).remove()})},z=function(e){firebase.database().ref("/nodes").orderByChild("createdAt").startAt(M).on("value",function(t){var n=t.val();e(n)})};document.addEventListener("click",function(e){var t=e.path;if(!(t.indexOf(l)>-1)){if(t.indexOf(f)>-1)return e.target===m&&f.setAttribute("data-status","opened"),void(e.target===y&&f.setAttribute("data-status","closed"));var n=e.clientX,i=e.clientY;b.renderAt(n,i)}}),p.addEventListener("submit",function(e){e.preventDefault();var t=document.getElementById("email-input").value;firebase.database().ref("/emails").push({email:t,createdAt:(new Date).getTime()}).then(function(){p.innerHTML="<p>you are great</p>"})}),firebase.auth().onAuthStateChanged(function(e){return e&&e.uid?($=e.uid,S(),void z(I)):void firebase.auth().signInAnonymously()})},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),d=n(3),s=i(d),r=n(4),u=i(r),c={"node-text":"nodeText","node-type":"nodeType","node-font":"nodeFont","node-size":"nodeSize","node-image-src":"nodeImageSrc"},h=function(){function e(t){o(this,e),this.handleSubmit=t.handleSubmit,this.$container=document.getElementById("node-editor"),this.$submitButton=document.getElementById("submit-node"),this.$nodeType=document.getElementById("node-type"),this.$nodeText=document.getElementById("node-text"),this.$nodeFont=document.getElementById("node-font"),this.$nodeSize=document.getElementById("node-size"),this.$nodeImageSrc=document.getElementById("node-image-src"),this.previewTextNode=new s["default"]({previewMode:!0}),this.previewImageNode=new u["default"]({previewMode:!0}),this.previewImageNode.hide(),this.nodeType="text",this.nodeSize="medium",this.nodeFont="inconsolata",this.initEventListeners()}return a(e,[{key:"clearFields",value:function(){this.$nodeText.value="",this.$nodeFont.value="inconsolata",this.$nodeSize.value="medium",this.$nodeImageSrc.value="",this.nodeText="",this.nodeFont="inconsolata",this.nodeSize="medium",this.nodeImageSrc="",this.updatePreviewNodes()}},{key:"initEventListeners",value:function(){this.$nodeText.addEventListener("keyup",this.handleChange.bind(this)),this.$nodeImageSrc.addEventListener("keyup",this.handleChange.bind(this)),this.$nodeType.addEventListener("change",this.handleChange.bind(this)),this.$nodeFont.addEventListener("change",this.handleChange.bind(this)),this.$nodeSize.addEventListener("change",this.handleChange.bind(this)),this.$submitButton.addEventListener("click",this.submitNode.bind(this))}},{key:"getConfig",value:function(){return{previewMode:!0,type:this.nodeType||"text",data:{src:this.nodeImageSrc,size:this.nodeSize||"medium",text:this.nodeText,coords:this.coords,font:this.nodeFont||"inconsolata"}}}},{key:"handleChange",value:function(e){e.preventDefault();var t=c[e.target.id];this[t]=e.target.value,this.$container.setAttribute("type",this.nodeType),this.updatePreviewNodes()}},{key:"updatePreviewNodes",value:function(){"text"===this.nodeType&&(this.previewTextNode.update(this.getConfig()),this.previewTextNode.show(),this.previewImageNode.hide()),"image"===this.nodeType&&(this.previewImageNode.update(this.getConfig()),this.previewImageNode.show(),this.previewTextNode.hide())}},{key:"hide",value:function(){this.$container.style.display="none",this.previewTextNode.hide(),this.previewImageNode.hide()}},{key:"renderAt",value:function(e,t){this.coords=[e,t],this.$container.style.display="inline-block",window.innerWidth-e<this.$container.clientWidth?(this.$container.style.right=0,this.$container.style.left="auto",this.$container.style.top=t+"px"):(this.$container.style.right="auto",this.$container.style.left=e+"px",this.$container.style.top=t+"px"),this.$nodeText.focus(),this.updatePreviewNodes()}},{key:"submitNode",value:function(e){e.preventDefault(),this.handleSubmit&&this.handleSubmit(this.getConfig()),this.clearFields(),this.hide()}}]),e}();t["default"]=h},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(t){n(this,e),this.$node=document.createElement("div"),this.$node.classList.add("text-node"),document.body.appendChild(this.$node),t&&(t.previewMode&&(this.previewMode=t.previewMode),t.data&&(this.data=t.data,this.render()))}return i(e,[{key:"destroy",value:function(){document.body.removeChild(this.$node)}},{key:"hide",value:function(){this.$node.style.display="none"}},{key:"show",value:function(){this.$node.style.display="block"}},{key:"update",value:function(e){this.data=e.data,this.previewMode=e.previewMode,this.render()}},{key:"render",value:function(){this.data.text&&""!==this.data.text?this.$node.textContent=this.data.text:this.$node.innerHTML="&nbsp;",this.$node.style.left=this.data.coords[0]+"px",this.$node.style.top=this.data.coords[1]+"px",this.data.font&&this.$node.setAttribute("font",this.data.font),this.data.size&&this.$node.setAttribute("size",this.data.size),this.previewMode?this.$node.classList.add("preview-mode"):this.$node.classList.remove("preview-mode")}}]),e}();t["default"]=o},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(t){n(this,e),this.$node=document.createElement("img"),this.$node.classList.add("image-node"),document.body.appendChild(this.$node),t&&(t.previewMode&&(this.previewMode=t.previewMode),t.data&&(this.data=t.data),this.render())}return i(e,[{key:"destroy",value:function(){document.body.removeChild(this.$node)}},{key:"hide",value:function(){this.$node.style.display="none"}},{key:"show",value:function(){this.$node.style.display="block"}},{key:"update",value:function(e){this.data=e.data,this.previewMode=e.previewMode,this.render()}},{key:"render",value:function(){this.data&&this.data.src?this.$node.src=this.data.src:this.$node.src="./assets/placeholder-image.png",this.previewMode?this.$node.classList.add("preview-mode"):this.$node.classList.remove("preview-mode"),this.data&&(this.data.size&&this.$node.setAttribute("size",this.data.size),this.data.coords&&(this.$node.style.left=this.data.coords[0]+"px",this.$node.style.top=this.data.coords[1]+"px"))}}]),e}();t["default"]=o},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={text:["font","size","text","coords"],image:["size","src"]};t.isValidConfig=function(e){if(!e)return!1;var t=e.type,i=e.data;if(!t||!i||!n[t])return!1;var o=n[t];return o.forEach(function(e){if(!i[e])return!1}),!0}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.isValidImageSrc=function(e){return new Promise(function(t,n){var i=document.createElement("img");i.onload=function(){var e=i.height,o=i.width;e>1e3||o>1e3?n("The max image size is 1000px in either direction."):t()},i.onerror=function(){return n("This is not a valid image source.")},i.src=e})}}]);