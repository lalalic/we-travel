"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _check = require("material-ui/svg-icons/navigation/check");

var _check2 = _interopRequireDefault(_check);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chipper = function (_Component) {
	_inherits(Chipper, _Component);

	function Chipper() {
		_classCallCheck(this, Chipper);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Chipper).apply(this, arguments));
	}

	_createClass(Chipper, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var _props$chips = _props.chips;
			var chips = _props$chips === undefined ? [] : _props$chips;
			var children = _props.children;

			var others = _objectWithoutProperties(_props, ["chips", "children"]);

			return _react2.default.createElement(
				"div",
				_extends({ style: { display: 'flex', flexWrap: 'wrap' } }, others),
				chips.map(function (chip) {
					return _this2.achip(chip);
				}),
				children
			);
		}
	}, {
		key: "achip",
		value: function achip(data, key) {
			var _this3 = this;

			var style = { margin: 2 },
			    inputStyle = { width: "6em" };
			switch (typeof data === "undefined" ? "undefined" : _typeof(data)) {
				case 'object':
					if (Array.isArray(data)) {
						return data.map(function (a, i) {
							return _this3.achip(a, i);
						});
					} else {
						var label = data.label;
						var _data$key = data.key;

						var _key = _data$key === undefined ? label : _data$key;

						var type = data.type;

						var others = _objectWithoutProperties(data, ["label", "key", "type"]);

						switch (type) {
							default:
								return _react2.default.createElement(
									_materialUi.Chip,
									{ key: _key },
									label,
									" ",
									_react2.default.createElement("input", _extends({ style: inputStyle, type: type }, others))
								);
								break;
						}
					}
					break;
				default:
					return _react2.default.createElement(
						_materialUi.Chip,
						{ key: key || data, style: style },
						_react2.default.createElement(_materialUi.Avatar, null),
						data
					);
			}
		}
	}]);

	return Chipper;
}(_react.Component);

exports.default = Chipper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NoaXBwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUNaOzs7Z0JBQytCLEtBQUssS0FBTCxDQUQvQjs2QkFDQSxNQURBO09BQ0EscUNBQU0sa0JBRE47T0FDVSwyQkFEVjs7T0FDdUIsaUVBRHZCOztBQUdQLFVBQ0M7O2VBQUssT0FBTyxFQUFDLFNBQVMsTUFBVCxFQUFnQixVQUFVLE1BQVYsRUFBeEIsSUFBK0MsT0FBcEQ7SUFDRSxNQUFNLEdBQU4sQ0FBVTtZQUFNLE9BQUssS0FBTCxDQUFXLElBQVg7S0FBTixDQURaO0lBRUUsUUFGRjtJQURELENBSE87Ozs7d0JBV0YsTUFBSyxLQUFJOzs7QUFDZCxPQUFNLFFBQU0sRUFBQyxRQUFPLENBQVAsRUFBUDtPQUFrQixhQUFXLEVBQUMsT0FBTSxLQUFOLEVBQVosQ0FEVjtBQUVkLGtCQUFjLGtEQUFkO0FBQ0EsU0FBSyxRQUFMO0FBQ0MsU0FBRyxNQUFNLE9BQU4sQ0FBYyxJQUFkLENBQUgsRUFBdUI7QUFDdEIsYUFBTyxLQUFLLEdBQUwsQ0FBUyxVQUFDLENBQUQsRUFBRyxDQUFIO2NBQU8sT0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFhLENBQWI7T0FBUCxDQUFoQixDQURzQjtNQUF2QixNQUVLO1VBQ0csUUFBaUMsS0FBakMsTUFESDtzQkFDb0MsS0FBM0IsSUFEVDs7VUFDUyxpQ0FBSSxrQkFEYjs7VUFDbUIsT0FBaUIsS0FBakIsS0FEbkI7O1VBQzRCLGtDQUFRLGdDQURwQzs7QUFFSixjQUFPLElBQVA7QUFDQTtBQUNDLGVBQVE7O1dBQU0sS0FBSyxJQUFMLEVBQU47U0FBaUIsS0FBakI7O1NBQXdCLGtEQUFPLE9BQU8sVUFBUCxFQUFtQixNQUFNLElBQU4sSUFBZ0IsT0FBMUMsQ0FBeEI7U0FBUixDQUREO0FBRUEsY0FGQTtBQURBLE9BRkk7TUFGTDtBQVdELFdBWkE7QUFEQTtBQWVDLFlBQVE7O1FBQU0sS0FBSyxPQUFLLElBQUwsRUFBVyxPQUFPLEtBQVAsRUFBdEI7TUFDTix1REFETTtNQUVMLElBRks7TUFBUixDQUREO0FBZEEsSUFGYzs7OztRQVpLIiwiZmlsZSI6ImNoaXBwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7Q2hpcCwgQXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgSWNvbkNoZWNrIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2NoZWNrJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hpcHBlciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtjaGlwcz1bXSwgY2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IHN0eWxlPXt7ZGlzcGxheTogJ2ZsZXgnLGZsZXhXcmFwOiAnd3JhcCd9fSB7Li4ub3RoZXJzfT5cclxuXHRcdFx0XHR7Y2hpcHMubWFwKGNoaXA9PnRoaXMuYWNoaXAoY2hpcCkpfVxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdGFjaGlwKGRhdGEsa2V5KXtcclxuXHRcdGNvbnN0IHN0eWxlPXttYXJnaW46Mn0sIGlucHV0U3R5bGU9e3dpZHRoOlwiNmVtXCJ9XHJcblx0XHRzd2l0Y2godHlwZW9mKGRhdGEpKXtcclxuXHRcdGNhc2UgJ29iamVjdCc6XHJcblx0XHRcdGlmKEFycmF5LmlzQXJyYXkoZGF0YSkpe1xyXG5cdFx0XHRcdHJldHVybiBkYXRhLm1hcCgoYSxpKT0+dGhpcy5hY2hpcChhLGkpKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRjb25zdCB7bGFiZWwsa2V5PWxhYmVsLHR5cGUsIC4uLm90aGVyc309ZGF0YVxyXG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0cmV0dXJuICg8Q2hpcCBrZXk9e2tleX0+e2xhYmVsfSA8aW5wdXQgc3R5bGU9e2lucHV0U3R5bGV9IHR5cGU9e3R5cGV9IHsuLi5vdGhlcnN9Lz48L0NoaXA+KVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHRicmVha1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuICg8Q2hpcCBrZXk9e2tleXx8ZGF0YX0gc3R5bGU9e3N0eWxlfT5cclxuXHRcdFx0XHRcdDxBdmF0YXI+PC9BdmF0YXI+XHJcblx0XHRcdFx0XHR7ZGF0YX1cclxuXHRcdFx0XHQ8L0NoaXA+KVxyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ==