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
          <a href="#" class="like{{is_liked}}">{{likes}}</a>
       </div>
     </div>
     `;
  }

  show(data){

    console.log(data);

    const view = data.map(d => {
      let template = this.defaultTemplate;

      return template
        .replace('{{id}}', d.id)
        .replace('{{title}}', d.title)
        .replace('{{description}}', d.description)
        .replace('{{is_liked}}', d.isLiked ? ' liked': '')
        .replace('{{likes}}', d.likes);
    });

    return view.join('');
  }
}