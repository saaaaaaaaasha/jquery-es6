//import Helpers from './util/helpers';

export default class Store {

  /**
   * Create a new storage object and will create an empty collection 
   * if no collection already exists.
   * 
   * @constructor
   * @param {string} name The name of collection
   * @param {function} callback The callback to call when the store was loaded
   */
  constructor(options) {
    let callback = options.callback || function () {};
    let name = options.name;


    /**
     * @see https://developer.mozilla.org/docs/Web/API/Window/localStorage
     */
    this.localStorage = window.localStorage || {};
    this._key = name;
    this.external = options.external;

    // Create localStorage with appropriate name if it didn't exits
    if (!this.localStorage[name]) {
      var data = {models: []};
      this.set(data);
    }


    console.log('Store start');
    //this.request('/stickers', {
    //  onSuccess: callback
    //});

    callback(this.get());

    //callback.call(this, this.findAll());
  }

  /**
   * Finds items by query - just object, like {}
   *
   * @param {object} query The query to match against (i.e. {foo: 'bar'})
   * @param {function} callback
   *
   * @example
   * storage.find({foo: 'bar'}, function (data) {
   *   // data will return any items that have foo: bar in their properties
   * });
   */
  find(query, callback) {
    if (typeof callback !== 'function') {
      return;
    }

    var models = this.get().models,
      query = query || {};

    callback.call(this, models.filter(function (model) {
      for (var q in query) {
        if (query.hasOwnProperty(q)) {
        if (query[q] !== model[q]) {
          return false;
        }
        }
      }
      return true;
    }));
  }

  /**
   * Get all data from the collection
   * @param {function} callback
   */
  findAll(callback) {
    callback = callback || function () {};
    callback.call(this, this.get().models);
  }

  /**
   * Save the given data to the store. If item don't exists that 
   * it will create a new item, otherwise update an existing item's properties
   * 
   * @param {object} data   
   * @param {function} callback
   * @param {number} id
   */
  save(data, callback, id) {
    callback = callback || function () {};

    if (id) {
      this.update(data, id, callback);
    } else {
      this.create(data, callback);
    }
  }

  create(item, callback) {
    var data = this.get(),
      models = data.models;

    models.push(item);

    this.set(data);
    callback.call(this, [item]);
  }

  like(id, vote, callback) {
    callback = callback || function () {};

    this.find({id: +id}, (items) => {
      let item = items[0];
      this.external.send('like', {id: id, 'vote': vote}, (res) => {
        if (res.status) {
          item.likes = res.likes;
          item.is_liked = !!vote;
          this.update(item, item.id, () => {
            callback(item.likes);  
          });
        }
      });
    });
  }


  update(updateData, id, callback) {
    var data = this.get(),
      models = data.models;

    for (var i = 0; i < models.length; i++) {
      if (models[i].id === id) {
        for (var key in updateData) {
          if (updateData.hasOwnProperty(key)) { 
            models[i][key] = updateData[key];
          }
        }
        break;
      }
    }

    this.set(data);
    callback.call(this, this.get().models);
  }

  /**
   * Remove an item from the store by its
   * @param {number} id The identifier of item
   * @param {function} callback
   */
  remove(id, callback) {
    var data = this.get();
    var models = data.models;

    callback = callback || function () {};
    this.external.send('delete', {id: id}, (res) => {
      //if (res.status) {
        for (var i = 0, length = models.length; i < length; i++) {
          if (models[i].id === +id) {
            models.splice(i, 1);
            break;
          }
        }
        this.set(data);
        callback.call(this, this.get().models);
      //}
    });
  }

  /**
   * Drop current storage
   * @param {function} callback
   */
  drop(callback) {
    this.set({models: []});
    callback.call(this, this.get().models);
  }

  /**
   * Set data to store
   * @param {object} data obj
   */
  set(data) {
    data = data || {};
    localStorage[this._key] = JSON.stringify(data);
  }

  /**
   * Get data from store
   * @returns {string} HTML String of an <tr> element   
   */ 
  get() {
    return JSON.parse(localStorage[this._key]);
  }



/*
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
  }*/

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
