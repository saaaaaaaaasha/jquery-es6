'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * class View - here view has/do two entry points:
 *   - bind(eventName, handler) - Registers the handler for necessary events
 *   - render(commandName, paramsObject) - Renders the given command
 */
var View = function () {
  function View(options) {
    var _this = this;

    _classCallCheck(this, View);

    this.template = options.template;

    this.$container = (0, _jquery2.default)(options.containerSelector || '#stickers');
    this.deleteSelector = '.close';
    this.likeSelector = '.like';

    this.commands = {
      showItems: function showItems(params) {
        _this.$container.html(_this.template.show(params));
      },
      removeItem: function removeItem(params) {
        _this.$container.find(params.selectorId).hide();
      },
      likeItem: function likeItem(params) {
        _this.$container.find(params.selectorId).find(_this.likeSelector).toggleClass('liked').find('span').text(params.likes);
      }
    };
  }

  _createClass(View, [{
    key: 'render',
    value: function render(cmd, params) {
      params.selectorId = '[data-id="' + params.id + '"]';
      this.commands[cmd](params);
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

      switch (event) {
        case 'itemRemove':
          this.$container.on('click', this.deleteSelector, function (event) {
            handler({
              id: _this2._itemId((0, _jquery2.default)(event.target))
            });
          });
          break;

        case 'itemLike':
          this.$container.on('click', this.likeSelector, function (event) {
            handler({
              id: _this2._itemId((0, _jquery2.default)(event.target)),
              vote: !(0, _jquery2.default)(event.target).hasClass('liked')
            });
          });
          break;
      }
    }
  }]);

  return View;
}();

exports.default = View;