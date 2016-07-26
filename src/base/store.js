export default class Store {
  constructor(callback) {
    callback = callback || function () {};
    callback.call(this, this.findAll());
  }

  findAll(callback) {
    callback = callback || function () {};
    console.log('Store.findAll');
    this.request('/stickers', {
      onSuccess: callback
    });
  }

  remove(id, callback) {
    console.log('Store.remove');
    this.request('/sticker/:id', {
      method: 'DELETE',
      id: id,
      onSuccess: callback
    });
  }

  like(id, callback) {
    console.log('Store.like');
    this.request('/sticker/:id/like', {
      method: 'POST',
      id: id,
      onSuccess: callback
    });
  }

  request(url, options) { 
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
}
