export default class Controller {


  /**
   * Take a model & view, then act as controller between them
   * @param  {object} [options] Object with the model and view instance
   */
  constructor(options) {
    this.model = options.model;
    this.view = options.view;

    this.view.bind('itemRemove', (item) => this.removeItem(item.id));
    this.view.bind('itemLike', (item) => this.likeItem(item.id, item.vote));

    this.renderItems();
  }

  /**
   * Will remove item by id from the DOM and storage.
   * @param  {number} id
   */
  removeItem(id) {
    this.model.remove(id, () => this.view.render('removeItem', {id: id}));
  }

  /**
   * Will add/remove like for item by id and render that.
   * @param  {number} id
   * @param  {boolean} vote Add like: true, Remove like: false
   */
  likeItem(id, vote) {
    this.model.like(id, vote, (likes) => this.view.render('likeItem', {id: id, likes: likes}));
  }

  /**
   * Method fires on load or update data. Gets all items & displays them
   */
  renderItems() {
    let stickers = this.model.findAll( (items) => {
      this.view.render('showItems', items)
    });
  }
}