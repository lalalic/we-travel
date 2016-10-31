"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _textFieldWithIcon = require("./textFieldWithIcon");

var _textFieldWithIcon2 = _interopRequireDefault(_textFieldWithIcon);

var _search = require("material-ui/svg-icons/action/search");

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_TextField) {
	_inherits(Search, _TextField);

	function Search() {
		_classCallCheck(this, Search);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Search).apply(this, arguments));
	}

	_createClass(Search, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(_textFieldWithIcon2.default, _extends({ icon: _react2.default.createElement(_search2.default, null) }, this.props));
		}
	}]);

	return Search;
}(_textFieldWithIcon2.default);

exports.default = Search;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3NlYXJjaFRleHRGaWVsZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUNaO0FBQ1AsVUFBTyxzRUFBVyxNQUFNLHFEQUFOLElBQXlCLEtBQUssS0FBTCxDQUFwQyxDQUFQLENBRE87Ozs7UUFEWSIsImZpbGUiOiJzZWFyY2hUZXh0RmllbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCBUZXh0RmllbGQgZnJvbSBcIi4vdGV4dEZpZWxkV2l0aEljb25cIlxyXG5pbXBvcnQgSWNvblNlYXJjaCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3NlYXJjaCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIFRleHRGaWVsZHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiA8VGV4dEZpZWxkIGljb249ezxJY29uU2VhcmNoLz59IHsuLi50aGlzLnByb3BzfS8+XHJcblx0fVxyXG59Il19