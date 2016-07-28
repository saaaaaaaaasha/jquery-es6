'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExternalStore = function () {
  function ExternalStore() {
    _classCallCheck(this, ExternalStore);

    this.config = {
      get: 'GET http://localhost:8089/stickers',
      delete: 'DELETE http://localhost:8089/sticker/:id',
      like: 'PUT http://localhost:8089/sticker/:id/like'
    };
  }

  _createClass(ExternalStore, [{
    key: 'sync',
    value: function sync() {
      var _this = this;

      var params = this.config.get.split(' ');

      return new Promise(function (resolve, reject) {
        _this.fetch({
          url: params[1],
          method: params[0]
        }).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          // error instanceof Error. show message for testing
          console.error(error.message);
        });
      });
    }
  }, {
    key: 'send',
    value: function send(query, data, callback) {
      callback = callback || function () {};
      data = data || null;

      if (this.config[query]) {
        var params = this.config[query].split(' ');

        this.fetch({
          url: params[1],
          method: params[0],
          data: data
        }).then(function (response) {
          callback(response);
        }).catch(function (error) {
          // error instanceof Error. show message for testing
          console.error(error.message);
        });
      }
    }
  }, {
    key: 'fetch',
    value: function fetch(options) {

      if (options.data && options.data.id) {
        options.url = options.url.replace(':id', options.data.id);
      }

      return new Promise(function (resolve, reject) {

        var params = {};

        params.url = options.url;
        params.method = options.method || 'GET';
        params.dataType = options.dataType || 'json';
        params.data = JSON.stringify(options.data || null);
        params.contentType = 'application/json';

        params.success = function (data) {
          resolve(data);
        };
        params.error = function (jqXHR, textStatus) {
          reject(new Error('Network Error. Request failed: ' + textStatus));
        };

        _jquery2.default.ajax(params);
      });
    }
  }]);

  return ExternalStore;
}();

exports.default = ExternalStore;