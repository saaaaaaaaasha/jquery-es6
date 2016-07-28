import $ from 'jquery';

/**
 * class View - here view has/do two entry points:
 *   - bind(eventName, handler) - Registers the handler for necessary events
 *   - render(commandName, paramsObject) - Renders the given command
 */
export default class View {
  constructor(options) {
    this.template = options.template;

    this.$container = $(options.containerSelector || '#stickers');
    this.deleteSelector = '.close';
    this.likeSelector = '.like';

    this.commands = {
      showItems: params => { this.$container.html(this.template.show(params)); },
      removeItem: params => { this.$container.find(params.selectorId).hide(); },
      likeItem: params => {
        this.$container
          .find(params.selectorId)
          .find(this.likeSelector)
          .toggleClass('liked')
          .find('span')
          .text(params.likes);
      }
    };
  }

  render(cmd, params) {
    params.selectorId = '[data-id="' + params.id + '"]';
    this.commands[cmd](params);
  }

  _itemId($element) {
    return $element.closest('.stickers__item').attr('data-id');
  }

  bind(event, handler) {
    switch (event) {
      case 'itemRemove':
        this.$container.on('click', this.deleteSelector, (event) => {
          handler({
            id: this._itemId($(event.target))
          });
        });
        break;

      case 'itemLike':
        this.$container.on('click', this.likeSelector, (event) => {
          handler({
            id: this._itemId($(event.target)), 
            vote: !$(event.target).hasClass('liked')
          });
        });
        break;
    }
  }
}
