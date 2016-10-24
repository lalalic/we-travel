"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TravelDateField = function (_Component) {
	_inherits(TravelDateField, _Component);

	function TravelDateField() {
		_classCallCheck(this, TravelDateField);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(TravelDateField).apply(this, arguments));
	}

	_createClass(TravelDateField, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "grid" },
				_react2.default.createElement(_materialUi.DatePicker, null)
			);
		}
	}]);

	return TravelDateField;
}(_react.Component);

exports.default = TravelDateField;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3RyYXZlbC1kYXRlLWZpZWxkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7OztJQUNxQjs7Ozs7Ozs7Ozs7MkJBQ1o7QUFDUCxVQUNDOztNQUFLLFdBQVUsTUFBVixFQUFMO0lBQXNCLDJEQUF0QjtJQURELENBRE87Ozs7UUFEWSIsImZpbGUiOiJ0cmF2ZWwtZGF0ZS1maWVsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtUZXh0RmllbGQsIERhdGVQaWNrZXJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYXZlbERhdGVGaWVsZCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPjxEYXRlUGlja2VyLz48L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn0iXX0=