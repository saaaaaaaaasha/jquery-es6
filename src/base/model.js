export default class Model {
  constructor(options) {
    this.storage = options.storage;
  }

  findAll (callback) {
    this.storage.findAll(callback);
  }

  like (id, callback) {
  	let like = 14;
    callback(like);
    //this.getStorage().like(id, callback);
  }

  remove (id, callback) {
    callback();
    //this.getStorage().remove(id, callback);
  }
}




