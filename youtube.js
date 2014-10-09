// ==UserScript==
// @id             www.forocoches.com-desactivar_youtube@forocoches_electrosa
// @name           FC - Desactivar YouTube
// @version        2.0
// @namespace      forocoches_electrosa
// @author         Electrosa
// @description    
// @include        http://www.forocoches.com/foro/showthread.php?*
// ==/UserScript==

"use strict";

// si en la página hay más vídeos que `minimo`, se eliminarán
var minimo = 0;

(function quitarVideosYoutube() {
	if (window === window.top) {
		var elems = document.getElementsByClassName("youtube-player");
		if (elems.length < minimo) return;
		//var elems = document.querySelectorAll("iframe[type='text/html']");
		var iframes = [];
		
		//var re = /http:\/\/widget\.smartycenter\.com\/webservice\/directYoutube\/\d{4}\/([^\/]+)\/640\/360/;
		
		for (var i = elems.length - 1; i >= 0; i--) {
			var elem = elems[i];
			var parent = elem.parentNode;
			
			// Quitar nuevo reproductor
			/*if (elem.src.startsWith('http://widget.smartycenter.com')) {
				var code = re.exec(elem.src)[1];
				
				elem.src = "//www.youtube.com/embed/" + code;
			}*/
			
			iframes[i] = elem.outerHTML;
			
			parent.removeChild(elem);
			
			var button = document.createElement("button");
			button.title = i;
			button.innerHTML = "YouTube";
			button.onclick = function (event) {
				var button = event.target;
				var parent = button.parentNode;
				
				parent.removeChild(button);
				parent.innerHTML = iframes[~~button.title];
			};
			parent.appendChild(button);
		}
	}
})();
