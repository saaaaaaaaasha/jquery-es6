'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
	function View(options) {
		_classCallCheck(this, View);

		this.template = options.template;

		this.$container = (0, _jquery2.default)(options.containerSelector || '#stickers');
		this.deleteSelector = '.close';
		this.likeSelector = '.like';
	}

	_createClass(View, [{
		key: 'render',
		value: function render(cmd, params) {
			var _this = this;

			var selectorId = '[data-id="' + params.id + '"]';

			var commands = {
				showItems: function showItems() {
					_this.$container.html(_this.template.show(params));
				},
				removeItem: function removeItem() {
					_this.$container.find(selectorId).hide();
				},
				likeItem: function likeItem() {
					_this.$container.find(selectorId).find(_this.likeSelector).text(params.likes).toggleClass('liked');
				}
			};

			if (typeof commands[cmd] === 'undefined') {
				return;
			}

			commands[cmd]();
		}
	}, {
		key: '_itemId',
		value: function _itemId($element) {
			return $element.closest('.stickers__item').attr('data-id');
		}
	}, {
		key: 'bind',
		value: function bind(event, handler) {
			var _this2 = this;

			if (event === 'itemRemove') {
				this.$container.on('click', this.deleteSelector, function (event) {
					handler({ id: _this2._itemId((0, _jquery2.default)(event.target)) });
				});
			} else if (event === 'itemLike') {
				this.$container.on('click', this.likeSelector, function (event) {
					handler({ id: _this2._itemId((0, _jquery2.default)(event.target)) });
				});
			}
		}
	}]);

	return View;
}();

exports.default = View;