"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
  function Model(options) {
    _classCallCheck(this, Model);

    this.storage = options.storage;
  }

  _createClass(Model, [{
    key: "findAll",
    value: function findAll(callback) {
      this.storage.findAll(callback);
    }
  }, {
    key: "like",
    value: function like(id, callback) {
      var like = 14;
      callback(like);
      //this.getStorage().like(id, callback);
    }
  }, {
    key: "remove",
    value: function remove(id, callback) {
      callback();
      //this.getStorage().remove(id, callback);
    }
  }]);

  return Model;
}();

exports.default = Model;