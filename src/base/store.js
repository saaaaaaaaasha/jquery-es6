/**
 * class Store
 * Use for manipulate object (save in the localstorage, crud operation)
 */
export default class Store {

  /**
   * Create a new client side object storage and will create an empty collection 
   * if no collection already exists.
   * 
   * @constructor
   * @param {string} name The name of collection
   * @param {function} callback The callback to call when the store was loaded
   */
  constructor(options) {
    let callback = options.callback || function () {};

    /**
     * @see https://developer.mozilla.org/docs/Web/API/Window/localStorage
     */
    this.localStorage = window.localStorage || {};

    /**
     * External store must to have "send" method for send data to server
     * @type {object} this.external
     */
    this.external = options.external;
    this._key = options.name;

    // Create localStorage with appropriate name if it didn't exits
    if (!this.localStorage[this._key]) {
      var data = {models: []};
      this.set(data);
    }

    callback(this.get());
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
      let item = items.pop();

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
    let data = this.get(),
        models = data.models;

    for (let i = 0; i < models.length; i++) {
      if (models[i].id === id) {
        for (let key in updateData) {
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
    callback = callback || function () {};
    id = parseInt(id, 10);

    let data = this.get();
    let models = data.models;

    this.external.send('delete', {id: id}, (res) => {
      if (res) {
        for (let i = 0, length = models.length; i < length; i++) {
          if (models[i].id === id) {
            models.splice(i, 1);
            break;
          }
        }
        this.set(data);
        callback.call(this, this.get().models);
      }
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

  // getter/setter for data

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
}
