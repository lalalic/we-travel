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

var _expandMore = require("material-ui/svg-icons/navigation/expand-more");

var _expandMore2 = _interopRequireDefault(_expandMore);

var _expandLess = require("material-ui/svg-icons/navigation/expand-less");

var _expandLess2 = _interopRequireDefault(_expandLess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chipper = function (_Component) {
	_inherits(Chipper, _Component);

	function Chipper() {
		_classCallCheck(this, Chipper);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Chipper).apply(this, arguments));

		_this.state = {
			open: _this.props.autoOpen
		};
		return _this;
	}

	_createClass(Chipper, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var _props$chips = _props.chips;
			var chips = _props$chips === undefined ? [] : _props$chips;
			var children = _props.children;
			var title = _props.title;
			var _props$autoOpen = _props.autoOpen;
			var autoOpen = _props$autoOpen === undefined ? true : _props$autoOpen;

			var others = _objectWithoutProperties(_props, ["chips", "children", "title", "autoOpen"]);

			var open = this.state.open;


			var style = { display: 'flex', flexWrap: 'wrap' };
			var header = null,
			    icon = void 0;

			if (title) {
				if (!autoOpen) {
					var onClick = function onClick(e) {
						return _this2.setState({ open: !_this2.state.open });
					};
					if (open) icon = _react2.default.createElement(_expandLess2.default, { viewBox: "0 0 24 12", color: "lightgray", onClick: onClick });else icon = _react2.default.createElement(_expandMore2.default, { viewBox: "0 0 24 12", color: "lightgray", onClick: onClick });
				}

				header = _react2.default.createElement(
					"div",
					{ style: { color: "lightgray" } },
					icon,
					title
				);

				if (!open) style.display = "none";
			}

			return _react2.default.createElement(
				"div",
				null,
				header,
				_react2.default.createElement(
					"div",
					_extends({ style: style }, others),
					chips.map(function (chip) {
						return _this2.achip(chip);
					}),
					children
				)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NoaXBwZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsT0FDcEIsR0FBYTt3QkFETyxTQUNQOztxRUFETyxxQkFFVixZQURHOztBQUVaLFFBQUssS0FBTCxHQUFXO0FBQ1YsU0FBSyxNQUFLLEtBQUwsQ0FBVyxRQUFYO0dBRE4sQ0FGWTs7RUFBYjs7Y0FEb0I7OzJCQU9aOzs7Z0JBQ3FELEtBQUssS0FBTCxDQURyRDs2QkFDQSxNQURBO09BQ0EscUNBQU0sa0JBRE47T0FDVSwyQkFEVjtPQUNvQixxQkFEcEI7Z0NBQzJCLFNBRDNCO09BQzJCLDJDQUFTLHVCQURwQzs7T0FDNkMsc0ZBRDdDOztPQUVBLE9BQU0sS0FBSyxLQUFMLENBQU4sS0FGQTs7O0FBSVAsT0FBSSxRQUFNLEVBQUMsU0FBUyxNQUFULEVBQWdCLFVBQVUsTUFBVixFQUF2QixDQUpHO0FBS1AsT0FBSSxTQUFPLElBQVA7T0FBYSxhQUFqQixDQUxPOztBQU9QLE9BQUcsS0FBSCxFQUFTO0FBQ1IsUUFBRyxDQUFDLFFBQUQsRUFBVTtBQUNaLFNBQUksVUFBUSxTQUFSLE9BQVE7YUFBRyxPQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssQ0FBQyxPQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQXJCO01BQUgsQ0FEQTtBQUVaLFNBQUcsSUFBSCxFQUNDLE9BQU0sc0RBQVUsU0FBUSxXQUFSLEVBQW9CLE9BQU0sV0FBTixFQUFrQixTQUFTLE9BQVQsRUFBaEQsQ0FBTixDQURELEtBR0MsT0FBTSxzREFBVSxTQUFRLFdBQVIsRUFBb0IsT0FBTSxXQUFOLEVBQWtCLFNBQVMsT0FBVCxFQUFoRCxDQUFOLENBSEQ7S0FGRDs7QUFRQSxhQUFROztPQUFLLE9BQU8sRUFBQyxPQUFNLFdBQU4sRUFBUixFQUFMO0tBQWtDLElBQWxDO0tBQXdDLEtBQXhDO0tBQVIsQ0FUUTs7QUFXUixRQUFHLENBQUMsSUFBRCxFQUNGLE1BQU0sT0FBTixHQUFjLE1BQWQsQ0FERDtJQVhEOztBQWVBLFVBQ0M7OztJQUNFLE1BREY7SUFFQzs7Z0JBQUssT0FBTyxLQUFQLElBQWtCLE9BQXZCO0tBQ0UsTUFBTSxHQUFOLENBQVU7YUFBTSxPQUFLLEtBQUwsQ0FBVyxJQUFYO01BQU4sQ0FEWjtLQUVFLFFBRkY7S0FGRDtJQURELENBdEJPOzs7O3dCQWlDRixNQUFLLEtBQUk7OztBQUNkLE9BQU0sUUFBTSxFQUFDLFFBQU8sQ0FBUCxFQUFQO09BQWtCLGFBQVcsRUFBQyxPQUFNLEtBQU4sRUFBWixDQURWO0FBRWQsa0JBQWMsa0RBQWQ7QUFDQSxTQUFLLFFBQUw7QUFDQyxTQUFHLE1BQU0sT0FBTixDQUFjLElBQWQsQ0FBSCxFQUF1QjtBQUN0QixhQUFPLEtBQUssR0FBTCxDQUFTLFVBQUMsQ0FBRCxFQUFHLENBQUg7Y0FBTyxPQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBYjtPQUFQLENBQWhCLENBRHNCO01BQXZCLE1BRUs7VUFDRyxRQUFpQyxLQUFqQyxNQURIO3NCQUNvQyxLQUEzQixJQURUOztVQUNTLGlDQUFJLGtCQURiOztVQUNtQixPQUFpQixLQUFqQixLQURuQjs7VUFDNEIsa0NBQVEsZ0NBRHBDOztBQUVKLGNBQU8sSUFBUDtBQUNBO0FBQ0MsZUFBUTs7V0FBTSxLQUFLLElBQUwsRUFBTjtTQUFpQixLQUFqQjs7U0FBd0Isa0RBQU8sT0FBTyxVQUFQLEVBQW1CLE1BQU0sSUFBTixJQUFnQixPQUExQyxDQUF4QjtTQUFSLENBREQ7QUFFQSxjQUZBO0FBREEsT0FGSTtNQUZMO0FBV0QsV0FaQTtBQURBO0FBZUMsWUFBUTs7UUFBTSxLQUFLLE9BQUssSUFBTCxFQUFXLE9BQU8sS0FBUCxFQUF0QjtNQUNOLHVEQURNO01BRUwsSUFGSztNQUFSLENBREQ7QUFkQSxJQUZjOzs7O1FBeENLIiwiZmlsZSI6ImNoaXBwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7Q2hpcCwgQXZhdGFyLFN1YmhlYWRlcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IEljb25DaGVjayBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jaGVjaydcclxuaW1wb3J0IEljb25Nb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2V4cGFuZC1tb3JlJ1xyXG5pbXBvcnQgSWNvbkxlc3MgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vZXhwYW5kLWxlc3MnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGlwcGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnN0YXRlPXtcclxuXHRcdFx0b3Blbjp0aGlzLnByb3BzLmF1dG9PcGVuXHJcblx0XHR9XHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2NoaXBzPVtdLCBjaGlsZHJlbiwgdGl0bGUsIGF1dG9PcGVuPXRydWUsIC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge29wZW59PXRoaXMuc3RhdGVcclxuXHRcdFxyXG5cdFx0bGV0IHN0eWxlPXtkaXNwbGF5OiAnZmxleCcsZmxleFdyYXA6ICd3cmFwJ31cclxuXHRcdGxldCBoZWFkZXI9bnVsbCwgaWNvblxyXG5cdFx0XHJcblx0XHRpZih0aXRsZSl7XHJcblx0XHRcdGlmKCFhdXRvT3Blbil7XHJcblx0XHRcdFx0bGV0IG9uQ2xpY2s9ZT0+dGhpcy5zZXRTdGF0ZSh7b3BlbjohdGhpcy5zdGF0ZS5vcGVufSlcclxuXHRcdFx0XHRpZihvcGVuKVxyXG5cdFx0XHRcdFx0aWNvbj0oPEljb25MZXNzIHZpZXdCb3g9XCIwIDAgMjQgMTJcIiBjb2xvcj1cImxpZ2h0Z3JheVwiIG9uQ2xpY2s9e29uQ2xpY2t9Lz4pXHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0aWNvbj0oPEljb25Nb3JlIHZpZXdCb3g9XCIwIDAgMjQgMTJcIiBjb2xvcj1cImxpZ2h0Z3JheVwiIG9uQ2xpY2s9e29uQ2xpY2t9Lz4pXHJcblx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0aGVhZGVyPSg8ZGl2IHN0eWxlPXt7Y29sb3I6XCJsaWdodGdyYXlcIn19PntpY29ufXt0aXRsZX08L2Rpdj4pXHJcblx0XHRcdFxyXG5cdFx0XHRpZighb3BlbilcclxuXHRcdFx0XHRzdHlsZS5kaXNwbGF5PVwibm9uZVwiXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e2hlYWRlcn1cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXtzdHlsZX0gey4uLm90aGVyc30+XHJcblx0XHRcdFx0XHR7Y2hpcHMubWFwKGNoaXA9PnRoaXMuYWNoaXAoY2hpcCkpfVxyXG5cdFx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0YWNoaXAoZGF0YSxrZXkpe1xyXG5cdFx0Y29uc3Qgc3R5bGU9e21hcmdpbjoyfSwgaW5wdXRTdHlsZT17d2lkdGg6XCI2ZW1cIn1cclxuXHRcdHN3aXRjaCh0eXBlb2YoZGF0YSkpe1xyXG5cdFx0Y2FzZSAnb2JqZWN0JzpcclxuXHRcdFx0aWYoQXJyYXkuaXNBcnJheShkYXRhKSl7XHJcblx0XHRcdFx0cmV0dXJuIGRhdGEubWFwKChhLGkpPT50aGlzLmFjaGlwKGEsaSkpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGNvbnN0IHtsYWJlbCxrZXk9bGFiZWwsdHlwZSwgLi4ub3RoZXJzfT1kYXRhXHJcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gKDxDaGlwIGtleT17a2V5fT57bGFiZWx9IDxpbnB1dCBzdHlsZT17aW5wdXRTdHlsZX0gdHlwZT17dHlwZX0gey4uLm90aGVyc30vPjwvQ2hpcD4pXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdGJyZWFrXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gKDxDaGlwIGtleT17a2V5fHxkYXRhfSBzdHlsZT17c3R5bGV9PlxyXG5cdFx0XHRcdFx0PEF2YXRhcj48L0F2YXRhcj5cclxuXHRcdFx0XHRcdHtkYXRhfVxyXG5cdFx0XHRcdDwvQ2hpcD4pXHJcblx0XHR9XHJcblx0fVxyXG59Il19