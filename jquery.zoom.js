;(function($) {

	$.fn.zoom = function(options) {
		var options = $.extend({}, $.fn.zoom.defaults, options),
			method = {};

		method = {
			init: function(target) {
				var $target = $(target),
					$wrapper = (options.isLimited) ? $target.parent() : $('body');


				$wrapper.css({
					'-webkit-transition': '1s ease-in',
					'-moz-transition': '1s ease-in',
				});

				$target.bind('click', function() {
					method.scale($wrapper);
				});
			},
			scale: function($wrapper) {
				var xScale = 0.9,
					yScale = 0.9,
					$win = $(window),
					winW = $win.width(),
					winH = $win.height(),
					transformValue = 'scale(' + xScale + ', ' + yScale + ') rotate(' + 13 + 'deg)';

				$wrapper.css({
					'-webkit-transform': transformValue,
					'-moz-transform': 'scale(' + xScale + ', ' + yScale + ') rotate(' + 13 + 'deg)'

				});
			}
		};

		return this.each(function() {
			method.init(this);
		});
	};

	$.fn.zoom.defaults = {
		isLimited: false
	};

})(jQuery);
