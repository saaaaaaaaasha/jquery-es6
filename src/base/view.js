import $ from 'jquery';

export default class View {
  constructor(options) {
    this.template = options.template;

    this.$container = $(options.containerSelector || '#stickers');
    this.deleteSelector = '.close';
    this.likeSelector = '.like';
  }

  render(cmd, params) {

    let selectorId = '[data-id="' + params.id + '"]';

    const commands = {
      showItems: () => { this.$container.html(this.template.show(params)); },
      removeItem: () => { this.$container.find(selectorId).hide(); },
      likeItem: () => {
        this.$container
          .find(selectorId)
          .find(this.likeSelector)
          .text(params.likes)
          .toggleClass('liked');
      }
    };

    if (typeof commands[cmd] === 'undefined') {
      return;
    }

    (commands[cmd])();
  }

  _itemId($element) {
    return $element.closest('.stickers__item').attr('data-id');
  }

  bind(event, handler) {
    if (event === 'itemRemove') {
      this.$container.on('click', this.deleteSelector, (event) => {
        handler({id: this._itemId($(event.target))});
      });
    } else if (event === 'itemLike') {
      this.$container.on('click', this.likeSelector, (event) => {
        handler({id: this._itemId($(event.target))});
      });
    }
  }
}
