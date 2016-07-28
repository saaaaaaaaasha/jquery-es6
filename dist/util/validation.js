'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumeric = isNumeric;
exports.isString = isString;
exports.isEmpty = isEmpty;
function isNumeric(n) {
  return !window.isNaN(parseFloat(n)) && window.isFinite(n);
}

function isString(s) {
  return typeof s === 'string';
}

function isEmpty(s) {
  return !(this.isNumeric(s) || !!s);
}