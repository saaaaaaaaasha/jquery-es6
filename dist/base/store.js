'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store(callback) {
    _classCallCheck(this, Store);

    callback = callback || function () {};
    callback.call(this, this.findAll());
  }

  _createClass(Store, [{
    key: 'findAll',
    value: function findAll(callback) {
      callback = callback || function () {};
      console.log('Store.findAll');
      this.request('/stickers', {
        onSuccess: callback
      });
    }
  }, {
    key: 'remove',
    value: function remove(id, callback) {
      console.log('Store.remove');
      this.request('/sticker/:id', {
        method: 'DELETE',
        id: id,
        onSuccess: callback
      });
    }
  }, {
    key: 'like',
    value: function like(id, callback) {
      console.log('Store.like');
      this.request('/sticker/:id/like', {
        method: 'POST',
        id: id,
        onSuccess: callback
      });
    }
  }, {
    key: 'request',
    value: function request(url, options) {
      options.onSuccess(JSON.parse('[{"id":42,"title":"New title","description":"Some very interesting description","likes":101},{"id":34,"title":"sdfsd","description":"sfdsf","likes":16},{"id":48,"title":"New title","description":"Some very interesting description","likes":15},{"id":38,"title":"sdfsd","description":"sfdsf","likes":0}]'));
    }

    /*
      if (!url) {
        return false;
      }
       if (options.id) {
        url = url.replace(':id', options.id);
      }
       var resolve = (typeof options.onSuccess === 'function') ? options.onSuccess : function () {};
      var reject = (typeof options.onError === 'function') ? option.onError : function () {};
      var params = {};
       params.url = url;
      params.method = options.method || 'GET';
      params.dataType = options.dataType || 'json';
      params.data = options.data || null;
      params.contentType = 'application/json';
       params.success = function(data) {
        resolve(data);
      };
      params.error = function(jqXHR, textStatus) {
        reject('Request failed: ' + textStatus);
      };
       var request = $.ajax(params);
    };
    */

  }]);

  return Store;
}();

exports.default = Store;