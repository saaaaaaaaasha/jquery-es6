export default class Controller {
  constructor(options) {
    this.model = options.model;
    this.view = options.view;

    this.view.bind('itemRemove', (item) => this.removeItem(item.id));
    this.view.bind('itemLike', (item) => this.likeItem(item.id, item.vote));

    this.renderItems();
  }

  removeItem(id) {
    this.model.remove(id, () => this.view.render('removeItem', {id: id}));
  }

  likeItem(id, vote) {
    this.model.like(id, vote, (likes) => this.view.render('likeItem', {id: id, likes: likes}));
  }

  renderItems() {
    var stickers = this.model.findAll( (items) => {
      this.view.render('showItems', items)
    });
  }
}