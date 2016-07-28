export default class Validation {
  constructor() {
    this.isNaN = window.isNaN || ( (n) => n != n );
    this.isFinite = window.isFinite || ( (n) => typeof n === 'number' );
  }

  isNumeric(n) {
      return !this.isNaN(parseFloat(n)) && this.isFinite(n);
  }

  isString(s) {
      return typeof s === 'string';
  }

  isEmpty(s) {
      return !(this.isNumeric(s) || !!s);
  }
}

// (new Validation()).isNumeric(45); // true