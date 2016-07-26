'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _view = require('./base/view');

var _view2 = _interopRequireDefault(_view);

var _model = require('./base/model');

var _model2 = _interopRequireDefault(_model);

var _store = require('./base/store');

var _store2 = _interopRequireDefault(_store);

var _template = require('./base/template');

var _template2 = _interopRequireDefault(_template);

var _controller = require('./base/controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jStickers = function jStickers(el) {
	_classCallCheck(this, jStickers);

	var name = 'ES6';
	(0, _jquery2.default)('body').append('Hello from {{name}}');

	var template = new _template2.default(),
	    storage = new _store2.default(),
	    model = new _model2.default({
		storage: storage
	}),
	    view = new _view2.default({
		template: template
	}),
	    controller = new _controller2.default({
		model: model,
		view: view
	});
};

;

(0, _jquery2.default)(function () {
	new jStickers({ el: document.body });
});