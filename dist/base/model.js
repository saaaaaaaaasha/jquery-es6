'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
		function Model(options) {
				_classCallCheck(this, Model);

				this.storage = options.storage;
				this.validator = options.validator;

				// (?)
				this.fieldMap = ['id', 'title', 'description', 'likes', 'is_liked'];
		}

		/**
   * Save a new item if data is valid.
   * @param {object} data
   * @param {function} callback
   */


		_createClass(Model, [{
				key: 'save',
				value: function save(data, callback) {
						callback = callback || function () {};

						if (this.validate(data)) {
								var fields = this.getData(data);
								this.storage.save(fields, callback);
						}
				}

				/**
     * Finds a model in storage. If query is number or sting, then its will be id
     * and find model with this id. If query is object, find appropriate models
     *
     * @param {string|number|object} [query] A query to match models against
     * @param {function} [callback] The callback to call after the model(s) is(are) found
     *
     * @example
     * model.find(1, function(){}); // Will find the model with an ID of 1
     * model.find({ foo: 'bar' });
     */

		}, {
				key: 'find',
				value: function find(query, callback) {

						var queryType = typeof query === 'undefined' ? 'undefined' : _typeof(query);
						callback = callback || function () {};
						query = query || {};

						// If query is callback, findAll and fire callback
						if (queryType === 'function') {
								callback = query;
								this.storage.findAll(callback);
						} else if (queryType === 'string' || queryType === 'number') {
								query = parseInt(query, 10);
								this.storage.find({ id: query }, callback);
						} else {
								this.storage.find(query, callback);
						}
				}
		}, {
				key: 'findAll',


				/**
     * Find all models
     */
				value: function findAll(callback) {
						callback = callback || function () {};
						this.storage.findAll(callback);
				}

				/**
     * Updates a model by ID
     */

		}, {
				key: 'update',
				value: function update(data, callback) {
						callback = callback || function () {};

						if (this.validate(data)) {
								var fields = this.getData(data);
								this.storage.save(fields, callback, data.id);
						}
				}
		}, {
				key: 'like',
				value: function like(id, vote, callback) {
						callback = callback || function () {};
						this.storage.like(id, !!vote, callback);
				}

				/**
     * Removes a model from storage
     */

		}, {
				key: 'remove',
				value: function remove(id, callback) {
						callback = callback || function () {};
						this.storage.remove(id, callback);
				}

				/**
     * WARNING: Remove all data from storage.
     */

		}, {
				key: 'removeAll',
				value: function removeAll(callback) {
						callback = callback || function () {};
						this.storage.drop(callback);
				}
		}, {
				key: 'getData',
				value: function getData(data) {
						var fields = {};
						this.fieldMap.forEach(function (name) {
								if (typeof data[name] !== 'undefined') {
										fields[name] = data[name];
								}
						});
						return fields;
				}

				/*
     * Validate fields 
     */

		}, {
				key: 'validate',
				value: function validate(data) {
						// @todo implement

						/*this.fieldMap.forEach((value) => {
        if (this.validator.isEmpty(value)) {
          return false;
        }
      });*/

						return true;
				}
		}]);

		return Model;
}();

exports.default = Model;