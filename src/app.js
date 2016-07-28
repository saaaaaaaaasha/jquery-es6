import $ from 'jquery';
import View from './base/view';
import Model from './base/model';
import Store from './base/store';
import Template from './base/template';
import Controller from './base/controller';
import * as validation from './util/validation';
import ExternalStore from './base/external_store';

/**
 * class jStickers
 * Create all necessary object for stikers work
 */
class jStickers {
  constructor(el) {

    /**
     * Service to share information with the server, 
     * synchronize and request for delete/like stickers
     * 
     * @type {ExternalStore} [externalStorage]
     */
    let externalStorage = new ExternalStore(),

        template = new Template(),
        storage = new Store({
        	name: 'stickers',
        	external: externalStorage
        }),
        model = new Model({
          storage: storage
        }),
        view = new View({
          template: template
        }),
        controller = new Controller({
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
  loadStikers(external, model, controller) {
    external.sync()
    .then( data => {
      console.log('after external sync:' + JSON.stringify(data));
      let ids = [];
    	data.items.forEach((item) => {
        if (model.validate(item)) {
          ids.push(item.id);
          model.find({'id': item.id}, function(data) {
            // if data has already exist, then update it
            if (data.length) {
              model.update(item, (updateData) => {
                console.log('update ' + data[0].title + ' (#' + data[0].id + ')');
              });
            } else {
              model.save(item, (newData) => {
                console.log('create ' + newData[0].title + ' (#' + newData[0].id + ')');
              });
            }
          });
        }
    	});
      return ids;
    })
    .then( ids => {
      model.findAll((items) => {
        items.forEach((item) => {
          // if local data is outdated, deleted that from local storage
          if (!~ids.indexOf(item.id)) {
            model.remove(item.id);
          }
        });
      });
    })
    .then( ids => {
      controller.renderItems();     
    })
    .catch(error => {
      // error instanceof Error. show message for testing
      console.error(error.message);
    });
  }
}

$(() => {
  new jStickers({el: document.body});
});