;(function($) {

	/*
	 * jQuery.zoom.js
	 * 
	 * jquery.zoom.js is a jQuery plugin for scaling a image.
	 *
	 * @author makotot
	 * 
	 */

	$.fn.zoom = function(options) {
		var option = $.extend({}, $.fn.zoom.defaults, options),
			method = {},
			originImg = {};

		method = {
			init: function(target) {
				var $target = $(target),
					largeImg = $target.attr('href'),
					$originImg = $target.find('img');
				
				$target.on('click', function(e) {
					e.preventDefault();
					method.createLargeElem(largeImg, $originImg);
					method.createOverlay();
				});
			},
			checkOriginPos: function($origin) {
				var $win = $(window),
					originTop = $origin.offset().top,
					originLeft = $origin.offset().left,
					winScTop = $win.scrollTop(),
					winScLeft = $win.scrollLeft();

				originImg.top = originTop - winScTop;
				originImg.left = originLeft - winScLeft;

				return {
					'top': originTop - winScTop,
					'left': originLeft - winScLeft
				};
			},
			checkLargeSize: function($largeImg) {
				return {
					'width': $largeImg.width(),
					'height': $largeImg.height(),
					'outerWidth': $largeImg.outerWidth(),
					'outerHeight': $largeImg.outerHeight()
				};
			},
			placeCenter: function($elem, largeSize) {
				var $win = $(window),
					winH = $win.height(),
					winW = $win.width(),
					winScTop = $win.scrollTop(),
					winScLeft = $win.scrollLeft(),
					elemOH = largeSize.outerHeight,
					elemOW = largeSize.outerWidth;

				return {
					'top': ((winH - elemOH) / 2) + winScTop,
					'left': ((winW - elemOW) / 2) + winScLeft,
					'width': elemOW,
					'height': elemOH
				};
			},
			createLargeElem: function(img, $originImg) {
				var $largeImg = $('<img src="' + img + '" class="jscLargeImg" />'),
					$wrapper = $('<div class="jscModalWrapper"></div>'),
					originPos = method.checkOriginPos($originImg),
					imgObj = new Image(),
					largeSize;

				function loadImg() {
					if (!imgObj.complete) {
						setTimeout(loadImg, 100);
					} else {
						showLargeElem();
					}
				};
				originImg.width = $originImg.width();
				originImg.height = $originImg.height();
				originImg.element = $originImg;

				method.hideOrigin($originImg);
				$('body').append($wrapper);
				$wrapper.append($largeImg);
				$largeImg.hide();
				imgObj.src = $largeImg.attr('src');

				// image onload event does not work well in IE.
				if (!jQuery.support.noCloneEvent) {
					loadImg();
				} else {
					imgObj.onload = showLargeElem;
				}
				// if img.complete is false, it returns this width and height 0.

				function showLargeElem() {

					largeSize = method.checkLargeSize($largeImg);
				
					$wrapper.css({
						width: originImg.width + 'px',
						height: originImg.height + 'px',
						position: 'absolute',
						top: originPos.top,
						left: originPos.left,
						zIndex: 1000,
						opacity: 0.1,
						padding: '5px',
						backgroundColor: '#FFFFFF'
					});
	
					$largeImg.css({
						width: originImg.width + 'px',
						height: originImg.height + 'px',
						zIndex: 1001,
						opacity: 0.1
					});
					$largeImg.show();
					method.animateZoom($wrapper, $largeImg, largeSize);
				};
			},
			createModalWrapper: function($largeImg) {
				var $wrapper = $('<div class="jscModalWrapper"></div>');

				$largeImg.wrap($wrapper);
			},
			createOverlay: function() {
				var $overlay = $('<div class="jscOverlay"></div>'),
					$doc = $(document),
					docW = $doc.width(),
					docH = $doc.height();

				$overlay.css({
					position: 'absolute',
					top: 0,
					left: 0,
					width: docW,
					height: docH,
					backgroundColor: '#000000',
					opacity: 0.5,
					zIndex: 998
				});

				$('body').append($overlay);
				$overlay.on('click', function() {
					method.animateReduce();
				});
			},
			hideOrigin: function($origin) {
				$origin.css('visibility', 'hidden');
			},
			showOrigin: function($originImg) {
				$originImg.css('visibility', 'visible');
			},
			animateZoom: function($wrapper, $largeImg, largeSize) {
				var pos = method.placeCenter($largeImg, largeSize);

				$wrapper.stop().animate({
					width: pos.width + 'px',
					height: pos.height + 'px',
					top: pos.top + 'px',
					left: pos.left + 'px',
					opacity: 1
				});

				$largeImg.stop().animate({
					width: pos.width + 'px',
					height: pos.height + 'px',
					top: pos.top + 'px',
					left: pos.left + 'px',
					opacity: 1
				});
			},
			animateReduce: function() {
				var $largeImg = $('.jscLargeImg'),
					$wrapper = $('.jscModalWrapper'),
					$overlay = $('.jscOverlay');

				$wrapper.stop().animate({
					width: originImg.width + 'px',
					height: originImg.height + 'px',
					top: originImg.top + 'px',
					left: originImg.left + 'px'
				}, function() {
					$(this).remove();
				});
				$largeImg.stop().animate({
					width: originImg.width + 'px',
					height: originImg.height + 'px',
					top: originImg.top + 'px',
					left: originImg.left + 'px'
				}, function() {
					$(this).remove();
					method.showOrigin(originImg.element);
				});
				$overlay.stop().animate({
					opacity: 0
				}, function() {
					$(this).remove();
				});
			}
		};

		return this.each(function() {
			method.init(this);
		});
	};

	$.fn.zoom.defaults = {
	};

})(jQuery);
