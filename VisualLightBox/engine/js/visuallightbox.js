//////////////////////////////////////////////
// Obfuscated by Javascript Obfuscator 4.1  //
// http://javascript-source.com             //
//////////////////////////////////////////////

// -----------------------------------------------------------------------------------
//
//    VisualLightBox v 1.3
//    http://visuallightbox.com/
//    VisualLightBox is a free wizard program that helps you easily generate LightBox photo
//    galleries, in a few clicks without writing a single line of code. For Windows and Mac!
//    Last updated: 2009-10-22
//
//    Script based on Lightbox Slideshow v1.1 by Justin Barkhuff -
//    http://www.justinbarkhuff.com/lab/lightbox_slideshow/
//
//    Modificated by VisualLightbox.com
//    * 30.04.2009 create table structure
//    + Round corner for image container
//    + Integration of automatic resize from Michael R. Bagnall - elusivemind.net & Sebastien Grosjean - ZenCocoon.com
//    + Synchronously changing size of Lightbox (width and height)
//    + 12.10.2009 zoom effect for opened image, improved automatic resize
//    + 22.10.2009 zoom effect show image with fade in while resize 
//
var Lightbox = {activeImage:null, badObjects:["select", "object", "embed"], container:null, enableSlideshow:null, groupName:null, imageArray:[], options:null, overlayDuration:null, playSlides:null, refTags:["a", "area"], relAttribute:null, resizeDuration:null, slideShowTimer:null, startImage:null, descriptionHeight:50, initialize:function (options) {if (!document.getElementsByTagName) {return;}this.options = $H({animate:true, autoPlay:true, borderSize:10, containerID:document, enableSlideshow:true, googleAnalytics:false, imageDataLocation:"south", initImage:"", loop:true, overlayDuration:0.2, overlayOpacity:0.8, prefix:"", relAttribute:"lightbox", resizeSpeed:7, showGroupName:false, slideTime:3, strings:{closeLink:"", loadingMsg:"loading", nextLink:"", prevLink:"", startSlideshow:"", stopSlideshow:"", numDisplayPrefix:"", numDisplaySeparator:"/"}, featBrowser:true, breathingSize:20, startZoom:false}).merge(options);if (this.options.animate) {this.overlayDuration = Math.max(this.options.overlayDuration, 0);this.options.resizeSpeed = Math.max(Math.min(this.options.resizeSpeed, 10), 1);this.resizeDuration = (11 - this.options.resizeSpeed) * 0.15;} else {this.overlayDuration = 0;this.resizeDuration = 0;}this.enableSlideshow = this.options.enableSlideshow;this.options.overlayOpacity = Math.max(Math.min(this.options.overlayOpacity, 1), 0);this.playSlides = this.options.autoPlay;this.container = $(this.options.containerID);this.relAttribute = this.options.relAttribute;this.updateImageList();var objBody = this.container != document ? this.container : document.getElementsByTagName("body").item(0);var objOverlay = document.createElement("div");objOverlay.setAttribute("id", this.getID("overlay"));objOverlay.style.display = "none";objBody.appendChild(objOverlay);Event.observe(objOverlay, "click", this.end.bindAsEventListener(this));var objLightbox = document.createElement("div");objLightbox.setAttribute("id", this.getID("lightbox"));objLightbox.style.display = "none";objBody.appendChild(objLightbox);Event.observe(objLightbox, "click", this.end.bindAsEventListener(this));var objImageDataContainer = document.createElement("div");objImageDataContainer.setAttribute("id", this.getID("imageDataContainer"));objImageDataContainer.className = this.getID("clearfix");var objImageData = document.createElement("div");objImageData.setAttribute("id", this.getID("imageData"));objImageDataContainer.appendChild(objImageData);var objImageDetails = document.createElement("div");objImageDetails.setAttribute("id", this.getID("imageDetails"));objImageData.appendChild(objImageDetails);var objCaption = document.createElement("span");objCaption.setAttribute("id", this.getID("caption"));objImageDetails.appendChild(objCaption);var objNumberDisplay = document.createElement("span");objNumberDisplay.setAttribute("id", this.getID("numberDisplay"));objImageDetails.appendChild(objNumberDisplay);var objDetailsNav = document.createElement("span");objDetailsNav.setAttribute("id", this.getID("detailsNav"));objImageDetails.appendChild(objDetailsNav);var objPrevLink = document.createElement("a");objPrevLink.setAttribute("id", this.getID("prevLinkDetails"));objPrevLink.setAttribute("href", "javascript:void(0);");objPrevLink.innerHTML = this.options.strings.prevLink;objDetailsNav.appendChild(objPrevLink);Event.observe(objPrevLink, "click", this.showPrev.bindAsEventListener(this));var objSlideShowControl = document.createElement("a");objSlideShowControl.setAttribute("id", this.getID("slideShowControl"));objSlideShowControl.setAttribute("href", "javascript:void(0);");objDetailsNav.appendChild(objSlideShowControl);Event.observe(objSlideShowControl, "click", this.toggleSlideShow.bindAsEventListener(this));var objNextLink = document.createElement("a");objNextLink.setAttribute("id", this.getID("nextLinkDetails"));objNextLink.setAttribute("href", "javascript:void(0);");objNextLink.innerHTML = this.options.strings.nextLink;objDetailsNav.appendChild(objNextLink);Event.observe(objNextLink, "click", this.showNext.bindAsEventListener(this));var objClose = document.createElement("div");objClose.setAttribute("id", this.getID("close"));objImageData.appendChild(objClose);var objCloseLink = document.createElement("a");objCloseLink.setAttribute("id", this.getID("closeLink"));objCloseLink.setAttribute("href", "javascript:void(0);");objCloseLink.innerHTML = this.options.strings.closeLink;objClose.appendChild(objCloseLink);Event.observe(objCloseLink, "click", this.end.bindAsEventListener(this));var objOuterImageContainer = document.createElement("table");objOuterImageContainer.setAttribute("id", this.getID("outerImageContainer"));objOuterImageContainer.cellSpacing = 0;objLightbox.appendChild(objOuterImageContainer);var objOICTop = objOuterImageContainer.insertRow(-1);var objOICTL = objOICTop.insertCell(-1);objOICTL.className = "tl";var objOICTC = objOICTop.insertCell(-1);objOICTC.className = "tc";var objOICTR = objOICTop.insertCell(-1);objOICTR.className = "tr";var objOICMiddle = objOuterImageContainer.insertRow(-1);var objOICML = objOICMiddle.insertCell(-1);objOICML.className = "ml";var objLightboxFrameBody = objOICMiddle.insertCell(-1);objLightboxFrameBody.setAttribute("id", this.getID("lightboxFrameBody"));objLightboxFrameBody.innerHTML = "&nbsp;";var objOICMR = objOICMiddle.insertCell(-1);objOICMR.className = "mr";var objOICBottom = objOuterImageContainer.insertRow(-1);var objOICBL = objOICBottom.insertCell(-1);objOICBL.className = "bl";var objOICBC = objOICBottom.insertCell(-1);objOICBC.className = "bc";var objOICBR = objOICBottom.insertCell(-1);objOICBR.className = "br";if (this.options.imageDataLocation == "north") {objLightboxFrameBody.appendChild(objImageDataContainer);}var objImageContainer = document.createElement("div");objImageContainer.setAttribute("id", this.getID("imageContainer"));objLightboxFrameBody.appendChild(objImageContainer);var objLightboxImage = document.createElement("img");objLightboxImage.setAttribute("id", this.getID("lightboxImage"));objImageContainer.appendChild(objLightboxImage);var objHoverNav = document.createElement("div");objHoverNav.setAttribute("id", this.getID("hoverNav"));objImageContainer.appendChild(objHoverNav);var objPrevLinkImg = document.createElement("a");objPrevLinkImg.setAttribute("id", this.getID("prevLinkImg"));objPrevLinkImg.setAttribute("href", "javascript:void(0);");objHoverNav.appendChild(objPrevLinkImg);Event.observe(objPrevLinkImg, "click", this.showPrev.bindAsEventListener(this));var objNextLinkImg = document.createElement("a");objNextLinkImg.setAttribute("id", this.getID("nextLinkImg"));objNextLinkImg.setAttribute("href", "javascript:void(0);");objHoverNav.appendChild(objNextLinkImg);Event.observe(objNextLinkImg, "click", this.showNext.bindAsEventListener(this));var objLoading = document.createElement("div");objLoading.setAttribute("id", this.getID("loading"));objImageContainer.appendChild(objLoading);var objLoadingLink = document.createElement("a");objLoadingLink.setAttribute("id", this.getID("loadingLink"));objLoadingLink.setAttribute("href", "javascript:void(0);");objLoadingLink.innerHTML = this.options.strings.loadingMsg;objLoading.appendChild(objLoadingLink);Event.observe(objLoadingLink, "click", this.end.bindAsEventListener(this));if (this.options.imageDataLocation != "north") {objLightboxFrameBody.appendChild(objImageDataContainer);}if (this.options.initImage != "") {this.start($(this.options.initImage));}}, updateImageList:function () {var el, els, rel;for (var i = 0; i < this.refTags.length; i++) {els = this.container.getElementsByTagName(this.refTags[i]);for (var j = 0; j < els.length; j++) {el = els[j];rel = String(el.getAttribute("rel"));if (el.getAttribute("href") && rel.toLowerCase().match(this.relAttribute)) {el.onclick = function () {Lightbox.start(this);return false;};}}}}, start:function (imageLink) {if ($(this.getID("lightbox")).visible()) {return;}this.hideBadObjects();var pageSize = this.getPageSize();$(this.getID("overlay")).setStyle({height:pageSize.pageHeight + "px"});$(this.getID("imageDataContainer")).hide();$(this.getID("lightboxImage")).hide();var linkSize = $(imageLink).getDimensions();if (this.options.startZoom) {$(this.getID("imageContainer")).setStyle({width:linkSize.width + "px", height:linkSize.height + "px"});$(this.getID("outerImageContainer")).setStyle({opacity:document.all ? 1 : 0.1});Position.clone(imageLink, this.getID("lightbox"), {offsetLeft:- this.options.borderSize, offsetTop:- this.options.borderSize});$(this.getID("lightbox")).setStyle({width:linkSize.width + this.options.borderSize * 2 + "px", height:"auto"});} else {new Effect.Appear(this.getID("overlay"), {duration:this.overlayDuration, from:0, to:this.options.overlayOpacity});$(Lightbox.getID("lightbox")).setStyle({left:0, width:"100%"});}$(this.getID("lightbox")).show();this.imageArray = [];this.groupName = null;var rel = imageLink.getAttribute("rel");var imageTitle = "";if (rel == this.relAttribute) {imageTitle = imageLink.getAttribute("title") ? imageLink.getAttribute("title") : "";this.imageArray.push({link:imageLink.getAttribute("href"), title:imageTitle});this.startImage = 0;} else {var els = this.container.getElementsByTagName(imageLink.tagName);for (var i = 0; i < els.length; i++) {var el = els[i];if (el.getAttribute("href") && el.getAttribute("rel") == rel) {imageTitle = el.getAttribute("title") ? el.getAttribute("title") : "";this.imageArray.push({link:el.getAttribute("href"), title:imageTitle});if (el == imageLink) {this.startImage = this.imageArray.length - 1;}}}this.groupName = rel.substring(this.relAttribute.length + 1, rel.length - 1);}if (Lightbox.options.featBrowser) {Event.observe(window, "resize", (function (e) {this.adjustImageSize(true);}).bind(this));}this.changeImage(this.startImage);}, changeImage:function (imageNum) {this.activeImage = imageNum;this.disableKeyboardNav();this.pauseSlideShow();$(this.getID("loading")).show();$(this.getID("lightboxImage")).hide();$(this.getID("hoverNav")).hide();$(this.getID("imageDataContainer")).hide();$(this.getID("numberDisplay")).hide();$(this.getID("detailsNav")).hide();var imgPreloader = new Image;imgPreloader.onload = function () {Lightbox.imageArray[Lightbox.activeImage].width = imgPreloader.width;Lightbox.imageArray[Lightbox.activeImage].height = imgPreloader.height;Lightbox.adjustImageSize(false);};imgPreloader.src = this.imageArray[this.activeImage].link;if (this.options.googleAnalytics) {urchinTracker(this.imageArray[this.activeImage].link);}}, adjustImageSize:function (recall) {imgWidth = this.imageArray[this.activeImage].width;imgHeight = this.imageArray[this.activeImage].height;var arrayPageSize = this.getPageSize();if (this.options.featBrowser == true) {var imageProportion = imgWidth / imgHeight;var winProportion = arrayPageSize.winWidth / arrayPageSize.winHeight;if (imageProportion > winProportion) {var maxWidth = arrayPageSize.winWidth - this.options.borderSize * 2 - this.options.breathingSize * 2;var maxHeight = Math.round(maxWidth / imageProportion);} else {var maxHeight = arrayPageSize.winHeight - this.options.borderSize * 2 - this.options.breathingSize * 2 - this.descriptionHeight;var maxWidth = Math.round(maxHeight * imageProportion);}if (imgWidth > maxWidth || imgHeight > maxHeight) {imgWidth = maxWidth;imgHeight = maxHeight;}}var imgTop = this.getPageScroll().y + (this.getPageSize().winHeight - (imgHeight + this.descriptionHeight + this.options.borderSize * 2)) / 2;$(this.getID("overlay")).setStyle({height:arrayPageSize.pageHeight + "px"});if (recall == true) {$(this.getID("imageContainer")).setStyle({height:imgHeight + "px", width:imgWidth + "px"});$(this.getID("lightbox")).setStyle({top:imgTop + "px"});} else {if (this.options.startZoom) {$(Lightbox.getID("loading")).hide();var cDim = $(this.getID("imageContainer")).getDimensions();if (cDim.width / cDim.height > imageProportion) {$(this.getID("lightboxImage")).setStyle({position:"relative", top:(cDim.height - cDim.width / imageProportion) / 2 + "px", left:0, width:"100%", height:"auto"});} else {$(this.getID("lightboxImage")).setStyle({position:"relative", top:0, left:(cDim.width - cDim.height * imageProportion) / 2 + "px", width:"auto", height:"100%"});}}$(this.getID("lightboxImage")).src = this.imageArray[this.activeImage].link;this.resizeImageContainer(imgTop, imgWidth, imgHeight);}}, resizeImageContainer:function (imgTop, imgWidth, imgHeight) {var cDims = $(this.getID("imageContainer")).getDimensions();var effectScale = [];var lightboxImage = $(this.getID("lightboxImage"));if (parseFloat(lightboxImage.getStyle("top"))) {effectScale[effectScale.length] = new Effect.Move(lightboxImage, {y:0, mode:"absolute", sync:true});}if (parseFloat(lightboxImage.getStyle("left"))) {effectScale[effectScale.length] = new Effect.Move(lightboxImage, {x:0, mode:"absolute", sync:true});}if (cDims.width != imgWidth) {effectScale[effectScale.length] = new Effect.Scale(this.getID("imageContainer"), imgWidth / cDims.width * 100, {scaleY:false, sync:true});}if (cDims.height != imgHeight) {effectScale[effectScale.length] = new Effect.Scale(this.getID("imageContainer"), imgHeight / cDims.height * 100, {scaleX:false, sync:true});}var cWidth = $(this.getID("lightbox")).getStyle("width");var cLeft = 0;if (this.options.startZoom) {new Effect.Appear(this.getID("lightboxImage"), {from:0, to:1, duration:this.resizeDuration});if (cWidth != "100%") {if (cWidth != "auto") {var relWidth = (cDims.width + this.options.borderSize * 2) / this.getPageSize().pageWidth;$(this.getID("lightbox")).setStyle({width:relWidth * 100 + "%"});effectScale[effectScale.length] = new Effect.Scale(this.getID("lightbox"), 100 / relWidth, {scaleY:false, sync:true});}cLeft = - parseFloat($(this.getID("lightbox")).getStyle("left"));new Effect.Opacity(this.getID("outerImageContainer"), {duration:this.resizeDuration});}}var cTop = imgTop - parseFloat($(this.getID("lightbox")).getStyle("top"));if (cTop || cLeft) {effectScale[effectScale.length] = new Effect.Move(this.getID("lightbox"), {y:cTop || 0, x:cLeft || 0, sync:true, afterFinish:cLeft ? function () {$(Lightbox.getID("lightbox")).setStyle({left:0, width:"100%"});} : null});}if (effectScale.length) {new Effect.Parallel(effectScale, {duration:this.resizeDuration, afterFinish:function () {Lightbox.showImage();}});} else {if (hDiff == 0 && wDiff == 0) {if (navigator.appVersion.indexOf("MSIE") != -1) {this.pause(250);} else {this.pause(100);}}this.showImage();}}, showImage:function () {$(Lightbox.getID("loading")).hide();if (Lightbox.options.startZoom) {if (!$(this.getID("overlay")).visible()) {new Effect.Appear(this.getID("overlay"), {duration:this.overlayDuration, to:this.options.overlayOpacity});}Lightbox.updateDetails();} else {new Effect.Appear(this.getID("lightboxImage"), {duration:0.5, queue:"end", afterFinish:function () {Lightbox.updateDetails();}});}this.preloadNeighborImages();}, updateDetails:function () {$(this.getID("caption")).show();$(this.getID("caption")).update(this.imageArray[this.activeImage].title);if (this.imageArray.length > 1) {var num_display = this.options.strings.numDisplayPrefix + " " + eval(this.activeImage + 1) + " " + this.options.strings.numDisplaySeparator + " " + this.imageArray.length;if (this.options.showGroupName && this.groupName != "") {num_display += " " + this.options.strings.numDisplaySeparator + " " + this.groupName;}$(this.getID("numberDisplay")).update(num_display).show();if (!this.enableSlideshow) {$(this.getID("slideShowControl")).hide();}$(this.getID("detailsNav")).show();}new Effect.Parallel([new Effect.SlideDown(this.getID("imageDataContainer"), {sync:true}), new Effect.Appear(this.getID("imageDataContainer"), {sync:true})], {duration:0.65, afterFinish:function () {Lightbox.updateNav();}});}, updateNav:function () {$(this.getID("imageDataContainer")).setStyle({width:"100%"});var d = 1 / this.imageArray.length;this.descriptionHeight = this.descriptionHeight * (1 - d) + $(this.getID("imageDataContainer")).getHeight() * d;if (this.imageArray.length > 1) {$(this.getID("hoverNav")).show();if (this.enableSlideshow) {if (this.playSlides) {this.startSlideShow();} else {this.stopSlideShow();}}}this.enableKeyboardNav();}, startSlideShow:function () {if (!$(this.getID("lightbox")).visible()) {return;}this.playSlides = true;this.slideShowTimer = new PeriodicalExecuter(function (pe) {Lightbox.showNext();pe.stop();}, this.options.slideTime);$(this.getID("slideShowControl")).update(this.options.strings.stopSlideshow);$(this.getID("slideShowControl")).addClassName("started");}, stopSlideShow:function () {this.playSlides = false;if (this.slideShowTimer) {this.slideShowTimer.stop();}$(this.getID("slideShowControl")).update(this.options.strings.startSlideshow);$(this.getID("slideShowControl")).removeClassName("started");}, toggleSlideShow:function () {if (this.playSlides) {this.stopSlideShow();} else {this.startSlideShow();}}, pauseSlideShow:function () {if (this.slideShowTimer) {this.slideShowTimer.stop();}}, showNext:function () {if (this.imageArray.length > 1) {if (!this.options.loop && (this.activeImage == this.imageArray.length - 1 && this.startImage == 0 || this.activeImage + 1 == this.startImage)) {return this.end();}if (this.activeImage == this.imageArray.length - 1) {this.changeImage(0);} else {this.changeImage(this.activeImage + 1);}}}, showPrev:function () {if (this.imageArray.length > 1) {if (this.activeImage == 0) {this.changeImage(this.imageArray.length - 1);} else {this.changeImage(this.activeImage - 1);}}}, showFirst:function () {if (this.imageArray.length > 1) {this.changeImage(0);}}, showLast:function () {if (this.imageArray.length > 1) {this.changeImage(this.imageArray.length - 1);}}, enableKeyboardNav:function () {document.onkeydown = this.keyboardAction;}, disableKeyboardNav:function () {document.onkeydown = "";}, keyboardAction:function (e) {if (e == null) {keycode = event.keyCode;} else {keycode = e.which;}key = String.fromCharCode(keycode).toLowerCase();if (key == "x" || key == "o" || key == "c") {Lightbox.end();} else if (key == "p" || key == "%") {Lightbox.showPrev();} else if (key == "n" || key == "'") {Lightbox.showNext();} else if (key == "f") {Lightbox.showFirst();} else if (key == "l") {Lightbox.showLast();} else if (key == "s") {if (Lightbox.imageArray.length > 0 && Lightbox.options.enableSlideshow) {Lightbox.toggleSlideShow();}}}, preloadNeighborImages:function () {var nextImageID = this.imageArray.length - 1 == this.activeImage ? 0 : this.activeImage + 1;nextImage = new Image;nextImage.src = this.imageArray[nextImageID].link;var prevImageID = this.activeImage == 0 ? this.imageArray.length - 1 : this.activeImage - 1;prevImage = new Image;prevImage.src = this.imageArray[prevImageID].link;}, end:function (e) {if (e) {var id = $(Event.element(e)).id;if (this.getID("closeLink") != id && this.getID("lightbox") != id && this.getID("overlay") != id) {return;}}this.disableKeyboardNav();this.pauseSlideShow();$(this.getID("lightbox")).hide();if (this.options.overlayOpacity) {new Effect.Fade(this.getID("overlay"), {duration:this.overlayDuration});} else {$(this.getID("overlay")).hide();}this.showBadObjects();}, showBadObjects:function () {var els;var tags = Lightbox.badObjects;for (var i = 0; i < tags.length; i++) {els = document.getElementsByTagName(tags[i]);for (var j = 0; j < els.length; j++) {$(els[j]).setStyle({visibility:"visible"});}}}, hideBadObjects:function () {var els;var tags = Lightbox.badObjects;for (var i = 0; i < tags.length; i++) {els = document.getElementsByTagName(tags[i]);for (var j = 0; j < els.length; j++) {$(els[j]).setStyle({visibility:"hidden"});}}}, pause:function (numberMillis) {var now = new Date;var exitTime = now.getTime() + numberMillis;while (true) {now = new Date;if (now.getTime() > exitTime) {return;}}}, getPageScroll:function () {var x, y;if (self.pageYOffset) {x = self.pageXOffset;y = self.pageYOffset;} else if (document.documentElement && document.documentElement.scrollTop) {x = document.documentElement.scrollLeft;y = document.documentElement.scrollTop;} else if (document.body) {x = document.body.scrollLeft;y = document.body.scrollTop;}return {x:x, y:y};}, getPageSize:function () {var scrollX, scrollY, windowX, windowY, pageX, pageY;if (window.innerHeight && window.scrollMaxY) {scrollX = document.body.scrollWidth;scrollY = window.innerHeight + window.scrollMaxY;} else if (document.body.scrollHeight > document.body.offsetHeight) {scrollX = document.body.scrollWidth;scrollY = document.body.scrollHeight;} else {scrollX = document.body.offsetWidth;scrollY = document.body.offsetHeight;}if (self.innerHeight) {windowX = self.innerWidth;windowY = self.innerHeight;} else if (document.documentElement && document.documentElement.clientHeight) {windowX = document.documentElement.clientWidth;windowY = document.documentElement.clientHeight;} else if (document.body) {windowX = document.body.clientWidth;windowY = document.body.clientHeight;}pageY = scrollY < windowY ? windowY : scrollY;pageX = scrollX < windowX ? windowX : scrollX;return {pageWidth:pageX, pageHeight:pageY, winWidth:windowX, winHeight:windowY};}, getID:function (id) {return this.options.prefix + id;}};Event.observe(window, "load", function () {Lightbox.initialize({enableSlideshow:1, autoPlay:1, startZoom:1, overlayOpacity:0});});