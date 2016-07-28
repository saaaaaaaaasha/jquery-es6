'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * class Store
 * Use for manipulate object (save in the localstorage, crud operation)
 */
var Store = function () {

  /**
   * Create a new client side object storage and will create an empty collection 
   * if no collection already exists.
   * 
   * @constructor
   * @param {string} name The name of collection
   * @param {function} callback The callback to call when the store was loaded
   */
  function Store(options) {
    _classCallCheck(this, Store);

    var callback = options.callback || function () {};

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
      var data = { models: [] };
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


  _createClass(Store, [{
    key: 'find',
    value: function find(query, callback) {
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

  }, {
    key: 'findAll',
    value: function findAll(callback) {
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

  }, {
    key: 'save',
    value: function save(data, callback, id) {
      callback = callback || function () {};

      if (id) {
        this.update(data, id, callback);
      } else {
        this.create(data, callback);
      }
    }
  }, {
    key: 'create',
    value: function create(item, callback) {
      var data = this.get(),
          models = data.models;

      models.push(item);

      this.set(data);
      callback.call(this, [item]);
    }
  }, {
    key: 'like',
    value: function like(id, vote, callback) {
      var _this = this;

      callback = callback || function () {};

      this.find({ id: +id }, function (items) {
        var item = items.pop();

        _this.external.send('like', { id: id, 'vote': vote }, function (res) {
          if (res.status) {
            item.likes = res.likes;
            item.is_liked = !!vote;
            _this.update(item, item.id, function () {
              callback(item.likes);
            });
          }
        });
      });
    }
  }, {
    key: 'update',
    value: function update(updateData, id, callback) {
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

  }, {
    key: 'remove',
    value: function remove(id, callback) {
      var _this2 = this;

      callback = callback || function () {};
      id = parseInt(id, 10);

      var data = this.get();
      var models = data.models;

      this.external.send('delete', { id: id }, function (res) {
        if (res) {
          for (var i = 0, length = models.length; i < length; i++) {
            if (models[i].id === id) {
              models.splice(i, 1);
              break;
            }
          }
          _this2.set(data);
          callback.call(_this2, _this2.get().models);
        }
      });
    }

    /**
     * Drop current storage
     * @param {function} callback
     */

  }, {
    key: 'drop',
    value: function drop(callback) {
      this.set({ models: [] });
      callback.call(this, this.get().models);
    }

    // getter/setter for data

    /**
     * Set data to store
     * @param {object} data obj
     */

  }, {
    key: 'set',
    value: function set(data) {
      data = data || {};
      localStorage[this._key] = JSON.stringify(data);
    }

    /**
     * Get data from store
     * @returns {string} HTML String of an <tr> element   
     */

  }, {
    key: 'get',
    value: function get() {
      return JSON.parse(localStorage[this._key]);
    }
  }]);

  return Store;
}();

exports.default = Store;