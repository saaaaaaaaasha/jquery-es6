import $ from 'jquery';
import View from './base/view';
import Model from './base/model';
import Store from './base/store';
import Template from './base/template';
import Controller from './base/controller';

class jStickers {
  constructor(el) {

    let name = 'ES6';
    $('body').append(`Hello from {{name}}`);

    let template = new Template(),
        storage = new Store(),
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
  }
};

$(() => {
  new jStickers({el: document.body});
});