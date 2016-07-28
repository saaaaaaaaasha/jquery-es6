const fs = require('fs');

class Stickers {
  constructor() {
    this.path = '../data/stickers.json';
    this.fileName = this.path.split('/').slice(-1)[0];
    this.items = require(this.path);
  }

  findAll() {
    return this.items;
  }

  findById(id, returnIndex = false) {
    let index = -1;

    for(let i = 0, len = this.items.length; i < len; i++) {
      if (this.items[i].id == id) {
        index = i;
        break;
      }
    }

    if (returnIndex) {
      return index;
    }
    return index > -1 ? this.items[index] : false;
  }

  getIndex(id) {
    return this.findById(id, true);
  }

  updateLikes(params, callback) { 
    callback = callback || function() {};
    let item = this.findById(params.id);

    if (item) {
      item.likes += params.vote;
      if (item.likes < 0) {
        item.likes = 0;
      }
      return this.updateStore((error) => {
        let voteMsg = (params.vote > 0 ? '' : 'dis') + 'liked';
        console.log('Item (id: '+ params.id + ') was ' + voteMsg +' (likes: ' + item.likes + ')');
        callback({
          status: true,
          likes: item.likes
        });
      });
    }
    callback({
      status: false,
      likes: item.likes
    });
  }

  deleteItem(id, callback) {
    callback = callback || function() {};
    let index = this.getIndex(id);

    if (index > -1) {
      this.items.splice(index, 1); // delete item from array by index
      return this.updateStore((error) => {
        console.log('Item (id: '+ id + ') has been deleted.');
        callback({status: true});
      });
    }
    callback({status: false});
  }

  updateStore(callback) {
    callback = callback || function() {};
    fs.writeFile(__dirname + '/' + this.path, JSON.stringify(this.items), callback);
    //console.log('Store "'+ this.fileName + '" has been updated');
  }
}

module.exports = Stickers;
