describe('jqzoom', function() {
	var $elem = $('<a href="img/pig.jpg" class="jscZoom"><img src="../sample/img/pig_s.jpg" title="http://www.sxc.hu/photo/560043""></a>');

	beforeEach(function() {
		$elem.appendTo($('body'));
	});
	
	describe('jquery', function() {
		it('expect function', function() {
			expect($).to.be.a('function');
		});
	});
	describe('$(div.elem).zoom()', function() {
		it('should be a elem', function() {
			$elem.zoom().should.equal($elem);
		});
	});

	afterEach(function() {
		$elem.remove();
	});
});
