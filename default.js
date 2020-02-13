$(function() {
	var el = $('#but-click');
	el.on('click', function (e) {
		e.preventDefault();
		Shopeca.ui.floodFill.fill($(this));
	});

});
