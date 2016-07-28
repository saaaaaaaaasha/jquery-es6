export default class Model {
  constructor(options) {
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
	save(data, callback) {
    callback = callback || function () {};

		if (this.validate(data)) {
			let fields = this.getData(data);
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
	find(query, callback) {

		let queryType = typeof query;
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
	};

	/**
	 * Find all models
	 */
	findAll(callback) {
    callback = callback || function () {};
		this.storage.findAll(callback);
	}

	/**
	 * Updates a model by ID
	 */
	update(data, callback) {
    callback = callback || function () {};

    if (this.validate(data)) {
      let fields = this.getData(data);
      this.storage.save(fields, callback, data.id);
    }
	}

	like (id, vote, callback) {
    callback = callback || function () {};
    this.storage.like(id, !!vote, callback);
  }

	/**
	 * Removes a model from storage
	 */
	remove(id, callback) {
    callback = callback || function () {};
		this.storage.remove(id, callback);
	}

	/**
	 * WARNING: Remove all data from storage.
	 */
	removeAll(callback) {
    callback = callback || function () {};	
		this.storage.drop(callback);
	}

  getData(data) {
  	let fields = {}
    this.fieldMap.forEach( (name) => {
      if (typeof data[name] !== 'undefined') {
        fields[name] = data[name];
      }
    });
    return fields;
  }

  /*
   * Validate fields 
   */
  validate(data) {
    // @todo implement
    
    /*this.fieldMap.forEach((value) => {
      if (this.validator.isEmpty(value)) {
        return false;
      }
    });*/
    
    return true;
  }

}    