export function isNumeric(n) {
  return !window.isNaN(parseFloat(n)) && window.isFinite(n);
}

export function isString(s) {
  return typeof s === 'string';
}

export function isEmpty(s) {
  return !(this.isNumeric(s) || !!s);
}