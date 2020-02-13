var Shopeca = Shopeca || {}; Shopeca.ui = Shopeca.ui || {}; Shopeca.ui.floodFill = {

	fill: function(el, endSettings) {
		let startSettings = this.getStarSettings(el);
		endSettings = this.getEndSettings(endSettings);
		let paths = this.createPaths(startSettings, endSettings);
		this.animate(path['start'], path['end']);
	},
	getStarSettings: function (el) {
		// TODO path settings from CSS of el(ement)
	},
	getEndSettings: function (settings) {
		if (typeof settings !== 'undefined') {
			return settings;
		}
		return {};
	},
	createPaths: function (startPathSettings, endPathSettings) {
		return {
			start: this.createPath(startPathSettings),
			end: this.createPath(endPathSettings)
		};
	},
	createPath: function (pathSettings) {
		// TODO create path with random ID
		// TODO add path to document
		return 'pathId';
	},
	animate: function (start, end) {

	}
};
