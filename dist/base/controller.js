'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
  function Controller(options) {
    var _this = this;

    _classCallCheck(this, Controller);

    this.model = options.model;
    this.view = options.view;

    this.view.bind('itemRemove', function (item) {
      return _this.removeItem(item.id);
    });
    this.view.bind('itemLike', function (item) {
      return _this.likeItem(item.id, item.vote);
    });

    this.renderItems();
  }

  _createClass(Controller, [{
    key: 'removeItem',
    value: function removeItem(id) {
      var _this2 = this;

      this.model.remove(id, function () {
        return _this2.view.render('removeItem', { id: id });
      });
    }
  }, {
    key: 'likeItem',
    value: function likeItem(id, vote) {
      var _this3 = this;

      this.model.like(id, vote, function (likes) {
        return _this3.view.render('likeItem', { id: id, likes: likes });
      });
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var _this4 = this;

      var stickers = this.model.findAll(function (items) {
        _this4.view.render('showItems', items);
      });
    }
  }]);

  return Controller;
}();

exports.default = Controller;