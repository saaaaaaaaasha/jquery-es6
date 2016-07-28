import $ from 'jquery';

export default class ExternalStore {
  constructor(){
    this.config = {
      get: 'GET http://localhost:8089/stickers',
      delete: 'DELETE http://localhost:8089/sticker/:id',
      like: 'PUT http://localhost:8089/sticker/:id/like',
    }
  }

  sync() {
    let params = this.config.get.split(' ');

    return new Promise((resolve, reject) => {
      this.fetch({
        url: params[1], 
        method: params[0]
      })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        // error instanceof Error. show message for testing
        console.error(error.message);
      });
    });
  }

  send(query, data, callback) {
    callback = callback || function () {};
    data = data || null;

    if (this.config[query]) {
      let params = this.config[query].split(' ');

      this.fetch({
        url: params[1], 
        method: params[0],
        data: data
      })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        // error instanceof Error. show message for testing
        console.error(error.message);
      });
    }
  }

  fetch(options) {

    if (options.data && options.data.id) {
      options.url = options.url.replace(':id', options.data.id);
    }

    return new Promise(function(resolve, reject) {

      let params = {};

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

      $.ajax(params);
    });
  }
}