"use strict";(self.webpackChunkcollabothon2023_front=self.webpackChunkcollabothon2023_front||[]).push([[133],{37133:function(e,t,r){r.r(t),r.d(t,{Camera:function(){return f},CameraWeb:function(){return l}});var n=r(74165),a=r(15861),i=r(15671),o=r(43144),c=r(60136),u=r(27277),s=r(66653),p=r(72012),l=function(e){(0,c.Z)(r,e);var t=(0,u.Z)(r);function r(){return(0,i.Z)(this,r),t.apply(this,arguments)}return(0,o.Z)(r,[{key:"getPhoto",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r=this;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=(0,a.Z)((0,n.Z)().mark((function e(i,o){var c;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.webUseInput||t.source===p.oK.Photos?r.fileInputExperience(t,i):t.source===p.oK.Prompt?((c=document.querySelector("pwa-action-sheet"))||(c=document.createElement("pwa-action-sheet"),document.body.appendChild(c)),c.header=t.promptLabelHeader||"Photo",c.cancelable=!1,c.options=[{title:t.promptLabelPhoto||"From Photos"},{title:t.promptLabelPicture||"Take Picture"}],c.addEventListener("onSelection",function(){var e=(0,a.Z)((0,n.Z)().mark((function e(a){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:0===a.detail?r.fileInputExperience(t,i):r.cameraExperience(t,i,o);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())):r.cameraExperience(t,i,o);case 1:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"pickImages",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){var r=this;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.multipleFileInputExperience(t);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"cameraExperience",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(t,r,i){var o,c=this;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!customElements.get("pwa-camera-modal")){e.next=16;break}return(o=document.createElement("pwa-camera-modal")).facingMode=t.direction===p.GW.Front?"user":"environment",document.body.appendChild(o),e.prev=4,e.next=7,o.componentOnReady();case 7:o.addEventListener("onPhoto",function(){var e=(0,a.Z)((0,n.Z)().mark((function e(a){var u;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==(u=a.detail)){e.next=5;break}i(new s.xz("User cancelled photos app")),e.next=14;break;case 5:if(!(u instanceof Error)){e.next=9;break}i(u),e.next=14;break;case 9:return e.t0=r,e.next=12,c._getCameraPhoto(u,t);case 12:e.t1=e.sent,(0,e.t0)(e.t1);case 14:o.dismiss(),document.body.removeChild(o);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),o.present(),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(4),this.fileInputExperience(t,r);case 14:e.next=18;break;case 16:console.error("Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/web/pwa-elements."),this.fileInputExperience(t,r);case 18:case"end":return e.stop()}}),e,this,[[4,11]])})));return function(t,r,n){return e.apply(this,arguments)}}()},{key:"fileInputExperience",value:function(e,t){var r=document.querySelector("#_capacitor-camera-input"),n=function(){var e;null===(e=r.parentNode)||void 0===e||e.removeChild(r)};r||((r=document.createElement("input")).id="_capacitor-camera-input",r.type="file",r.hidden=!0,document.body.appendChild(r),r.addEventListener("change",(function(a){var i=r.files[0],o="jpeg";if("image/png"===i.type?o="png":"image/gif"===i.type&&(o="gif"),"dataUrl"===e.resultType||"base64"===e.resultType){var c=new FileReader;c.addEventListener("load",(function(){if("dataUrl"===e.resultType)t({dataUrl:c.result,format:o});else if("base64"===e.resultType){var r=c.result.split(",")[1];t({base64String:r,format:o})}n()})),c.readAsDataURL(i)}else t({webPath:URL.createObjectURL(i),format:o}),n()}))),r.accept="image/*",r.capture=!0,e.source===p.oK.Photos||e.source===p.oK.Prompt?r.removeAttribute("capture"):e.direction===p.GW.Front?r.capture="user":e.direction===p.GW.Rear&&(r.capture="environment"),r.click()}},{key:"multipleFileInputExperience",value:function(e){var t=document.querySelector("#_capacitor-camera-input-multiple");t||((t=document.createElement("input")).id="_capacitor-camera-input-multiple",t.type="file",t.hidden=!0,t.multiple=!0,document.body.appendChild(t),t.addEventListener("change",(function(r){for(var n=[],a=0;a<t.files.length;a++){var i=t.files[a],o="jpeg";"image/png"===i.type?o="png":"image/gif"===i.type&&(o="gif"),n.push({webPath:URL.createObjectURL(i),format:o})}e({photos:n}),function(){var e;null===(e=t.parentNode)||void 0===e||e.removeChild(t)}()}))),t.accept="image/*",t.click()}},{key:"_getCameraPhoto",value:function(e,t){return new Promise((function(r,n){var a=new FileReader,i=e.type.split("/")[1];"uri"===t.resultType?r({webPath:URL.createObjectURL(e),format:i,saved:!1}):(a.readAsDataURL(e),a.onloadend=function(){var e=a.result;"dataUrl"===t.resultType?r({dataUrl:e,format:i,saved:!1}):r({base64String:e.split(",")[1],format:i,saved:!1})},a.onerror=function(e){n(e)})}))}},{key:"checkPermissions",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){var t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"!==typeof navigator&&navigator.permissions){e.next=2;break}throw this.unavailable("Permissions API not available in this browser");case 2:return e.prev=2,e.next=5,window.navigator.permissions.query({name:"camera"});case 5:return t=e.sent,e.abrupt("return",{camera:t.state,photos:"granted"});case 9:throw e.prev=9,e.t0=e.catch(2),this.unavailable("Camera permissions are not available in this browser");case 12:case"end":return e.stop()}}),e,this,[[2,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"requestPermissions",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw this.unimplemented("Not implemented on web.");case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"pickLimitedLibraryPhotos",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw this.unavailable("Not implemented on web.");case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getLimitedLibraryPhotos",value:function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw this.unavailable("Not implemented on web.");case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),r}(s.Uw),f=new l}}]);
//# sourceMappingURL=133.d2ac0a27.chunk.js.map