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

		return _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3NlYXJjaFRleHRGaWVsZC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJwcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7OzsyQkFDWjtBQUNQLFVBQU8sc0VBQVcsTUFBTSxxREFBakIsSUFBb0MsS0FBS0MsS0FBekMsRUFBUDtBQUNBOzs7Ozs7a0JBSG1CRCxNIiwiZmlsZSI6InNlYXJjaFRleHRGaWVsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IFRleHRGaWVsZCBmcm9tIFwiLi90ZXh0RmllbGRXaXRoSWNvblwiXHJcbmltcG9ydCBJY29uU2VhcmNoIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc2VhcmNoJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgVGV4dEZpZWxke1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIDxUZXh0RmllbGQgaWNvbj17PEljb25TZWFyY2gvPn0gey4uLnRoaXMucHJvcHN9Lz5cclxuXHR9XHJcbn0iXX0=