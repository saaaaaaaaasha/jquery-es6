'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validation = function () {
    function Validation() {
        _classCallCheck(this, Validation);

        this.isNaN = window.isNaN || function (n) {
            return n != n;
        };
        this.isFinite = window.isFinite || function (n) {
            return typeof n === 'number';
        };
    }

    _createClass(Validation, [{
        key: 'isNumeric',
        value: function isNumeric(n) {
            return !this.isNaN(parseFloat(n)) && this.isFinite(n);
        }
    }, {
        key: 'isString',
        value: function isString(s) {
            return typeof s === 'string';
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty(s) {
            return !(this.isNumeric(s) || !!s);
        }
    }]);

    return Validation;
}();

// (new Validation()).isNumeric(45); // true


exports.default = Validation;