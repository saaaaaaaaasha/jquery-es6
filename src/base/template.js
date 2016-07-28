export default class Template {
  constructor() {
    this.defaultTemplate = `
      <div class="stickers__item" data-id="{{id}}">
        <div class="stickers__item__close">
          <a href="#" class="close">X</a>
        </div>  
        <div class="stickers__item__title">{{title}}</div>
          <div class="stickers__item__description">{{description}}</div>
          <div class="stickers__item__like">
          <a href="#" class="like{{is_liked}}">like (<span>{{likes}}</span>)</a>
       </div>
     </div>
     `;
  }

   /**
   * Creates an HTML string and returns it for placement in app.
   *
   * @param {object} data The object containing keys to replace in the template 
   * @returns {string} HTML String with data
   *
   * @example
   * template.show({
   *  id: 1,
   *  name: "Toyota Corolla",
   *  speed: 180,
   * });
   */
  show(data){
    const view = data.map(d => {
      let template = this.defaultTemplate;

      return template
        .replace('{{id}}', d.id)
        .replace('{{title}}', d.title)
        .replace('{{description}}', d.description)
        .replace('{{is_liked}}', d.is_liked ? ' liked': '')
        .replace('{{likes}}', d.likes);
    });

    return view.join('');
  }
}