var Shopeca = Shopeca || {}; Shopeca.ui = Shopeca.ui || {}; Shopeca.ui.floodFill = {

	fill: function(el, endSettings) {
		let startSettings = this.getStartSettings(el);
		endSettings = this.getEndSettings(endSettings);
		let paths = this.createPaths(startSettings, endSettings);
		this.animate(paths['start'], paths['end']);
	},
	getStartSettings: function (el) {
		return {
			background: el.css('background-color'),
			height: el.css('height'),
			width: el.css('width'),
			borderTopLeftRadius: el.css('border-top-left-radius'),
			borderTopRightRadius: el.css('border-top-right-radius'),
			borderBottomLeftRadius: el.css('border-bottom-left-radius'),
			borderBottomRightRadius: el.css('border-bottom-right-radius'),
			borderTopWidth: el.css('border-top-width'),
			borderBottomWidth: el.css('border-bottom-width'),
			borderLeftWidth: el.css('border-left-width'),
			borderRightWidth: el.css('border-right-width'),
			borderTopColor: el.css('border-top-color'),
			borderBottomColor: el.css('border-bottom-color'),
			borderLeftColor: el.css('border-left-color'),
			borderRightColor: el.css('border-right-color'),
			paddingLeft: el.css('padding-left'),
			paddingRight: el.css('padding-right'),
			paddingTop: el.css('padding-top'),
			paddingBottom: el.css('padding-bottom'),
			position: el.offset(),
		}
	},
	getEndSettings: function (settings) {
		if (typeof settings !== 'undefined') {
			return settings;
		}
		return {
			background: '#00FF00',
			height: $( window ).height(),
			width: $( window ).width(),
			position: {top:0, left: 0},
		};
	},
	createPaths: function (startPathSettings, endPathSettings) {
		return {
			start: this.createPath(startPathSettings),
			end: this.createPath(endPathSettings)
		};
	},
	createPath: function (pathSettings) {
		var top = pathSettings['position'].top;
		var left = pathSettings['position'].left;
		var fill = pathSettings['background'];
		var width = parseInt(pathSettings['width']);
		var height = parseInt(pathSettings['height']);
		var paddingLeft = parseInt(pathSettings['paddingLeft']);
		var paddingRight = parseInt(pathSettings['paddingRight']);
		var paddingTop = parseInt(pathSettings['paddingTop']);
		var paddingBottom = parseInt(pathSettings['paddingBottom']);
		var borderStroke = parseInt(pathSettings['borderLeftWidth']);
		var borderRadius = parseInt(pathSettings['borderTopLeftRadius']);
		var borderColor = pathSettings['borderLeftColor'];

		width = paddingLeft > 0 ? width+paddingLeft : width;
		width = paddingRight > 0 ? width+paddingRight : width;
		width = borderStroke > 0 ? width+borderStroke : width;
		height = paddingTop > 0 ? height+paddingTop : height;
		height = paddingBottom > 0 ? height+paddingBottom : height;
		height = borderStroke > 0 ? height+borderStroke : height;
		left = borderStroke > 0 ? left+borderStroke/2 : left;
		top = borderStroke > 0 ? top+borderStroke/2 : top;

		var path = 'M'+left+' '+top+' L'+(left+width)+','+top+' L'+(left+width)+','+(top+height)+' L'+left+','+(top+height)+' L'+left+','+top+' Z';

		var pathFill = fill !== undefined ? 'fill="'+fill+'"' : '';
		var pathStrokeWidth = borderStroke > 0 ? 'stroke-width="'+borderStroke+'"' : '';
		var pathStrokeColor = borderColor !== undefined ? 'stroke="'+borderColor+'"' : '';

		var id = this.randomId(10);
		return {
			id: id,
			path: '<path id="svg-path-'+id+'" d="'+path+'" '+pathFill+' '+pathStrokeWidth+' '+pathStrokeColor+'></path>',
			fill: fill !== undefined ? fill : '',
		}
	},
	animate: function (start, end) {
		var w = $( window ).width();
		var h = $( window ).height();
		var svg = '<svg id="svg-path-screen-wrapper" viewBox="0 0 '+w+' '+h+'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px">'+start['path']+' '+end['path']+'</svg>';
		var defs = '<defs><style type="text/css">#svg-path-'+end['id']+'{visibility:hidden}</style></defs>';
		$(defs).appendTo(document.body);
		$(svg).appendTo(document.body);

		var morphTween = KUTE.fromTo('#svg-path-'+start['id'],
			{ path: '#svg-path-'+start['id'], attr: {fill: start['fill']} },
			{ path: '#svg-path-'+end['id'], attr: {fill: end['fill']} },
			{
				morphIndex: 0,
				morphPrecision: 0,
				duration: 1000,
			}
		);
		morphTween.start();
	},
	randomId: function (length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
};
