"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextFieldWithIcon = function (_Component) {
	_inherits(TextFieldWithIcon, _Component);

	function TextFieldWithIcon() {
		_classCallCheck(this, TextFieldWithIcon);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(TextFieldWithIcon).apply(this, arguments));
	}

	_createClass(TextFieldWithIcon, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var _props$inputStyle = _props.inputStyle;
			var inputStyle = _props$inputStyle === undefined ? {} : _props$inputStyle;
			var hintText = _props.hintText;
			var icon = _props.icon;

			var others = _objectWithoutProperties(_props, ["inputStyle", "hintText", "icon"]);

			inputStyle.paddingLeft = 24;
			icon = _react2.default.cloneElement(icon, { color: "lightgray", style: { marginBottom: -10 } });

			hintText = _react2.default.createElement(
				"span",
				null,
				icon,
				hintText
			);

			return _react2.default.createElement(_materialUi.TextField, _extends({}, others, { hintText: hintText, inputStyle: inputStyle }));
		}
	}]);

	return TextFieldWithIcon;
}(_react.Component);

exports.default = TextFieldWithIcon;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3RleHRGaWVsZFdpdGhJY29uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUNaO2dCQUV3QyxLQUFLLEtBQUwsQ0FGeEM7a0NBRUYsV0FGRTtPQUVGLCtDQUFXLHVCQUZUO09BRWEsMkJBRmI7T0FFdUIsbUJBRnZCOztPQUVnQyw4RUFGaEM7O0FBSVAsY0FBVyxXQUFYLEdBQXVCLEVBQXZCLENBSk87QUFLUCxVQUFLLGdCQUFNLFlBQU4sQ0FBbUIsSUFBbkIsRUFBd0IsRUFBQyxPQUFNLFdBQU4sRUFBbUIsT0FBTSxFQUFDLGNBQWEsQ0FBQyxFQUFELEVBQXBCLEVBQTVDLENBQUwsQ0FMTzs7QUFPUCxjQUFVOzs7SUFBTyxJQUFQO0lBQWEsUUFBYjtJQUFWLENBUE87O0FBU1AsVUFDQyxrRUFBZSxVQUFRLFVBQVUsUUFBVixFQUFvQixZQUFZLFVBQVosR0FBM0MsQ0FERCxDQVRPOzs7O1FBRFkiLCJmaWxlIjoidGV4dEZpZWxkV2l0aEljb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dEZpZWxkV2l0aEljb24gZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRcclxuXHRcdGxldCB7aW5wdXRTdHlsZT17fSwgaGludFRleHQsIGljb24sIC4uLm90aGVyc309dGhpcy5wcm9wcztcclxuXHRcdFxyXG5cdFx0aW5wdXRTdHlsZS5wYWRkaW5nTGVmdD0yNDtcclxuXHRcdGljb249UmVhY3QuY2xvbmVFbGVtZW50KGljb24se2NvbG9yOlwibGlnaHRncmF5XCIsIHN0eWxlOnttYXJnaW5Cb3R0b206LTEwfX0pXHJcblx0XHRcclxuXHRcdGhpbnRUZXh0PSg8c3Bhbj57aWNvbn17aGludFRleHR9PC9zcGFuPik7XHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxUZXh0RmllbGQgey4uLm90aGVyc30gaGludFRleHQ9e2hpbnRUZXh0fSBpbnB1dFN0eWxlPXtpbnB1dFN0eWxlfS8+XHJcblx0XHQpXHJcblx0fVxyXG59Il19