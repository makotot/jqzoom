;(function($) {

	$.fn.zoom = function(options) {
		var option = $.extend({}, $.fn.zoom.defaults, options),
			method = {},
			originImg = {};

		method = {
			init: function(target) {
				var $target = $(target),
					largeImg = $target.attr('href'),
					$originImg = $target.find('img'),
					originW = $originImg.width(),
					originH = $originImg.height();

				originImg.width = originW; 
				originImg.height = originH;
				originImg.element = $originImg;
				
				$target.on('click', function(e) {
					e.preventDefault();
					method.createLargeElem(largeImg, $originImg, originW, originH);
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
					'outerWidth': $largeImg.outerHeight(),
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
			createLargeElem: function(img, $originImg, originW, originH) {
				var $largeImg = $('<img src="' + img + '" class="jscLargeImg" />'),
					$wrapper = $('<div class="jscModalWrapper"></div>'),
					originPos = method.checkOriginPos($originImg),
					largeSize;

				method.hideOrigin($originImg);
				$('body').append($wrapper);
				$wrapper.append($largeImg);
				largeSize = method.checkLargeSize($largeImg);
				
				$wrapper.css({
					width: originW + 'px',
					height: originH + 'px',
					position: 'absolute',
					top: originPos.top,
					left: originPos.left,
					zIndex: 1000,
					opacity: 0.1,
					padding: '5px',
					backgroundColor: '#FFFFFF'
				});

				$largeImg.css({
					width: originW + 'px',
					height: originH + 'px',
					zIndex: 1001,
					opacity: 0.1
				});
				method.animateZoom($wrapper, $largeImg, largeSize);
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
				$origin.hide();
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
			},
			showOrigin: function($originImg) {
				$originImg.show();
			}
		};

		return this.each(function() {
			method.init(this);
		});
	};

	$.fn.zoom.defaults = {

	};

})(jQuery);
