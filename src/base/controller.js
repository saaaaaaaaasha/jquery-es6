export default class Controller {
  constructor(options) {
    this.model = options.model;
    this.view = options.view;

    this.view.bind('itemRemove', (item) => this.removeItem(item.id));
    this.view.bind('itemLike', (item) => this.likeItem(item.id));

    this.renderItems();
  }

  removeItem(id) {
    this.model.remove(id, () => this.view.render('removeItem', {id: id}));
  }

  likeItem(id) {
    this.model.like(id, (likes) => this.view.render('likeItem', {id: id, likes: likes}));
  }

  renderItems() {
    var stickers = this.model.findAll( (items) => {
      console.log(items);
      this.view.render('showItems', items)
    });
  }
}