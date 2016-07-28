'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _view = require('./base/view');

var _view2 = _interopRequireDefault(_view);

var _model = require('./base/model');

var _model2 = _interopRequireDefault(_model);

var _store = require('./base/store');

var _store2 = _interopRequireDefault(_store);

var _template = require('./base/template');

var _template2 = _interopRequireDefault(_template);

var _controller = require('./base/controller');

var _controller2 = _interopRequireDefault(_controller);

var _validation = require('./util/validation');

var _validation2 = _interopRequireDefault(_validation);

var _external_store = require('./base/external_store');

var _external_store2 = _interopRequireDefault(_external_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * class jStickers
 * Create all necessary object for stikers work
 */
var jStickers = function () {
  function jStickers(el) {
    _classCallCheck(this, jStickers);

    /**
     * Service to share information with the server, 
     * synchronize and request for delete/like stickers
     * 
     * @type {ExternalStore} [externalStorage]
     */
    var externalStorage = new _external_store2.default(),


    /**
     * [validator description]
     * @type {Validation}
     */
    validator = new _validation2.default(),
        template = new _template2.default(),
        storage = new _store2.default({
      name: 'stickers',
      external: externalStorage
    }),
        model = new _model2.default({
      storage: storage,
      validator: validator
    }),
        view = new _view2.default({
      template: template
    }),
        controller = new _controller2.default({
      model: model,
      view: view
    });

    // @todo synchronize external data with local (maybe by websoket)
    this.loadStikers(externalStorage, model, controller);
  }

  /**
   * Firstly loading stikers from server and save it in local storage
   * @todo to need to move this method
   * 
   * @param  {ExternalStore} external
   * @param  {Model} model
   * @param  {Controller} controller
   */


  _createClass(jStickers, [{
    key: 'loadStikers',
    value: function loadStikers(external, model, controller) {
      external.sync().then(function (data) {
        console.log('after external sync:' + JSON.stringify(data));
        var ids = [];
        data.items.forEach(function (item) {
          if (model.validate(item)) {
            ids.push(item.id);
            model.find({ 'id': item.id }, function (data) {
              // if data has already exist, then update it
              if (data.length) {
                model.update(item, function (updateData) {
                  console.log('update ' + data[0].title + ' (#' + data[0].id + ')');
                  controller.renderItems();
                });
              } else {
                model.save(item, function (newData) {
                  console.log('create ' + newData[0].title + ' (#' + newData[0].id + ')');
                  controller.renderItems();
                });
              }
            });
          }
        });
        console.log('3434');
        return ids;
      }).then(function (ids) {
        //console.log(ids);
        //return; 
        model.findAll(function (items) {
          items.forEach(function (item) {
            // if local data is outdated, deleted that from local storage
            if (!~ids.indexOf(item.id)) {
              model.remove(item.id);
            }
          });
        });
      }).catch(function (error) {
        // error instanceof Error. show message for testing
        console.error(error.message);
      });
    }
  }]);

  return jStickers;
}();

(0, _jquery2.default)(function () {
  new jStickers({ el: document.body });
});