"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

		var _this = _possibleConstructorReturn(this, (Chipper.__proto__ || Object.getPrototypeOf(Chipper)).apply(this, arguments));

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
				var onClick = null;
				if (!autoOpen) {
					onClick = function onClick(e) {
						return _this2.setState({ open: !_this2.state.open });
					};
					if (open) icon = _react2.default.createElement(_expandLess2.default, { viewBox: "0 0 24 12", color: "lightgray" });else icon = _react2.default.createElement(_expandMore2.default, { viewBox: "0 0 24 12", color: "lightgray" });
				}

				header = _react2.default.createElement(
					"div",
					{ style: { color: "lightgray" }, onClick: onClick, unselectable: "on" },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NoaXBwZXIuanMiXSwibmFtZXMiOlsiQ2hpcHBlciIsImFyZ3VtZW50cyIsInN0YXRlIiwib3BlbiIsInByb3BzIiwiYXV0b09wZW4iLCJjaGlwcyIsImNoaWxkcmVuIiwidGl0bGUiLCJvdGhlcnMiLCJzdHlsZSIsImRpc3BsYXkiLCJmbGV4V3JhcCIsImhlYWRlciIsImljb24iLCJvbkNsaWNrIiwic2V0U3RhdGUiLCJjb2xvciIsIm1hcCIsImFjaGlwIiwiY2hpcCIsImRhdGEiLCJrZXkiLCJtYXJnaW4iLCJpbnB1dFN0eWxlIiwid2lkdGgiLCJBcnJheSIsImlzQXJyYXkiLCJhIiwiaSIsImxhYmVsIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7QUFDcEIsb0JBQWE7QUFBQTs7QUFBQSxpSEFDSEMsU0FERzs7QUFFWixRQUFLQyxLQUFMLEdBQVc7QUFDVkMsU0FBSyxNQUFLQyxLQUFMLENBQVdDO0FBRE4sR0FBWDtBQUZZO0FBS1o7Ozs7MkJBQ087QUFBQTs7QUFBQSxnQkFDcUQsS0FBS0QsS0FEMUQ7QUFBQSw2QkFDQUUsS0FEQTtBQUFBLE9BQ0FBLEtBREEsZ0NBQ00sRUFETjtBQUFBLE9BQ1VDLFFBRFYsVUFDVUEsUUFEVjtBQUFBLE9BQ29CQyxLQURwQixVQUNvQkEsS0FEcEI7QUFBQSxnQ0FDMkJILFFBRDNCO0FBQUEsT0FDMkJBLFFBRDNCLG1DQUNvQyxJQURwQzs7QUFBQSxPQUM2Q0ksTUFEN0M7O0FBQUEsT0FFQU4sSUFGQSxHQUVNLEtBQUtELEtBRlgsQ0FFQUMsSUFGQTs7O0FBSVAsT0FBSU8sUUFBTSxFQUFDQyxTQUFTLE1BQVYsRUFBaUJDLFVBQVUsTUFBM0IsRUFBVjtBQUNBLE9BQUlDLFNBQU8sSUFBWDtBQUFBLE9BQWlCQyxhQUFqQjs7QUFFQSxPQUFHTixLQUFILEVBQVM7QUFDUixRQUFJTyxVQUFRLElBQVo7QUFDQSxRQUFHLENBQUNWLFFBQUosRUFBYTtBQUNaVSxlQUFRO0FBQUEsYUFBRyxPQUFLQyxRQUFMLENBQWMsRUFBQ2IsTUFBSyxDQUFDLE9BQUtELEtBQUwsQ0FBV0MsSUFBbEIsRUFBZCxDQUFIO0FBQUEsTUFBUjtBQUNBLFNBQUdBLElBQUgsRUFDQ1csT0FBTSxzREFBVSxTQUFRLFdBQWxCLEVBQThCLE9BQU0sV0FBcEMsR0FBTixDQURELEtBR0NBLE9BQU0sc0RBQVUsU0FBUSxXQUFsQixFQUE4QixPQUFNLFdBQXBDLEdBQU47QUFDRDs7QUFFREQsYUFBUTtBQUFBO0FBQUEsT0FBSyxPQUFPLEVBQUNJLE9BQU0sV0FBUCxFQUFaLEVBQWlDLFNBQVNGLE9BQTFDLEVBQW1ELGNBQWEsSUFBaEU7QUFBc0VELFNBQXRFO0FBQTRFTjtBQUE1RSxLQUFSOztBQUVBLFFBQUcsQ0FBQ0wsSUFBSixFQUNDTyxNQUFNQyxPQUFOLEdBQWMsTUFBZDtBQUNEOztBQUVELFVBQ0M7QUFBQTtBQUFBO0FBQ0VFLFVBREY7QUFFQztBQUFBO0FBQUEsZ0JBQUssT0FBT0gsS0FBWixJQUF1QkQsTUFBdkI7QUFDRUgsV0FBTVksR0FBTixDQUFVO0FBQUEsYUFBTSxPQUFLQyxLQUFMLENBQVdDLElBQVgsQ0FBTjtBQUFBLE1BQVYsQ0FERjtBQUVFYjtBQUZGO0FBRkQsSUFERDtBQVNBOzs7d0JBRUtjLEksRUFBS0MsRyxFQUFJO0FBQUE7O0FBQ2QsT0FBTVosUUFBTSxFQUFDYSxRQUFPLENBQVIsRUFBWjtBQUFBLE9BQXdCQyxhQUFXLEVBQUNDLE9BQU0sS0FBUCxFQUFuQztBQUNBLGtCQUFjSixJQUFkLHlDQUFjQSxJQUFkO0FBQ0EsU0FBSyxRQUFMO0FBQ0MsU0FBR0ssTUFBTUMsT0FBTixDQUFjTixJQUFkLENBQUgsRUFBdUI7QUFDdEIsYUFBT0EsS0FBS0gsR0FBTCxDQUFTLFVBQUNVLENBQUQsRUFBR0MsQ0FBSDtBQUFBLGNBQU8sT0FBS1YsS0FBTCxDQUFXUyxDQUFYLEVBQWFDLENBQWIsQ0FBUDtBQUFBLE9BQVQsQ0FBUDtBQUNBLE1BRkQsTUFFSztBQUFBLFVBQ0dDLEtBREgsR0FDb0NULElBRHBDLENBQ0dTLEtBREg7QUFBQSxzQkFDb0NULElBRHBDLENBQ1NDLEdBRFQ7O0FBQUEsVUFDU0EsSUFEVCw2QkFDYVEsS0FEYjs7QUFBQSxVQUNtQkMsSUFEbkIsR0FDb0NWLElBRHBDLENBQ21CVSxJQURuQjs7QUFBQSxVQUM0QnRCLE1BRDVCLDRCQUNvQ1ksSUFEcEM7O0FBRUosY0FBT1UsSUFBUDtBQUNBO0FBQ0MsZUFBUTtBQUFBO0FBQUEsV0FBTSxLQUFLVCxJQUFYO0FBQWlCUSxjQUFqQjtBQUFBO0FBQXdCLDJEQUFPLE9BQU9OLFVBQWQsRUFBMEIsTUFBTU8sSUFBaEMsSUFBMEN0QixNQUExQztBQUF4QixTQUFSO0FBQ0Q7QUFIQTtBQU1BO0FBQ0Y7QUFDQTtBQUNDLFlBQVE7QUFBQTtBQUFBLFFBQU0sS0FBS2EsT0FBS0QsSUFBaEIsRUFBc0IsT0FBT1gsS0FBN0I7QUFDTiw2REFETTtBQUVMVztBQUZLLE1BQVI7QUFmRDtBQW9CQTs7Ozs7O2tCQS9EbUJyQixPIiwiZmlsZSI6ImNoaXBwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7Q2hpcCwgQXZhdGFyLFN1YmhlYWRlcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IEljb25DaGVjayBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jaGVjaydcclxuaW1wb3J0IEljb25Nb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2V4cGFuZC1tb3JlJ1xyXG5pbXBvcnQgSWNvbkxlc3MgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vZXhwYW5kLWxlc3MnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGlwcGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnN0YXRlPXtcclxuXHRcdFx0b3Blbjp0aGlzLnByb3BzLmF1dG9PcGVuXHJcblx0XHR9XHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2NoaXBzPVtdLCBjaGlsZHJlbiwgdGl0bGUsIGF1dG9PcGVuPXRydWUsIC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge29wZW59PXRoaXMuc3RhdGVcclxuXHRcdFxyXG5cdFx0bGV0IHN0eWxlPXtkaXNwbGF5OiAnZmxleCcsZmxleFdyYXA6ICd3cmFwJ31cclxuXHRcdGxldCBoZWFkZXI9bnVsbCwgaWNvblxyXG5cdFx0XHJcblx0XHRpZih0aXRsZSl7XHJcblx0XHRcdGxldCBvbkNsaWNrPW51bGxcclxuXHRcdFx0aWYoIWF1dG9PcGVuKXtcclxuXHRcdFx0XHRvbkNsaWNrPWU9PnRoaXMuc2V0U3RhdGUoe29wZW46IXRoaXMuc3RhdGUub3Blbn0pXHJcblx0XHRcdFx0aWYob3BlbilcclxuXHRcdFx0XHRcdGljb249KDxJY29uTGVzcyB2aWV3Qm94PVwiMCAwIDI0IDEyXCIgY29sb3I9XCJsaWdodGdyYXlcIi8+KVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdGljb249KDxJY29uTW9yZSB2aWV3Qm94PVwiMCAwIDI0IDEyXCIgY29sb3I9XCJsaWdodGdyYXlcIi8+KVxyXG5cdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdGhlYWRlcj0oPGRpdiBzdHlsZT17e2NvbG9yOlwibGlnaHRncmF5XCJ9fSBvbkNsaWNrPXtvbkNsaWNrfSB1bnNlbGVjdGFibGU9XCJvblwiPntpY29ufXt0aXRsZX08L2Rpdj4pXHJcblx0XHRcdFxyXG5cdFx0XHRpZighb3BlbilcclxuXHRcdFx0XHRzdHlsZS5kaXNwbGF5PVwibm9uZVwiXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e2hlYWRlcn1cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXtzdHlsZX0gey4uLm90aGVyc30+XHJcblx0XHRcdFx0XHR7Y2hpcHMubWFwKGNoaXA9PnRoaXMuYWNoaXAoY2hpcCkpfVxyXG5cdFx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0YWNoaXAoZGF0YSxrZXkpe1xyXG5cdFx0Y29uc3Qgc3R5bGU9e21hcmdpbjoyfSwgaW5wdXRTdHlsZT17d2lkdGg6XCI2ZW1cIn1cclxuXHRcdHN3aXRjaCh0eXBlb2YoZGF0YSkpe1xyXG5cdFx0Y2FzZSAnb2JqZWN0JzpcclxuXHRcdFx0aWYoQXJyYXkuaXNBcnJheShkYXRhKSl7XHJcblx0XHRcdFx0cmV0dXJuIGRhdGEubWFwKChhLGkpPT50aGlzLmFjaGlwKGEsaSkpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGNvbnN0IHtsYWJlbCxrZXk9bGFiZWwsdHlwZSwgLi4ub3RoZXJzfT1kYXRhXHJcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gKDxDaGlwIGtleT17a2V5fT57bGFiZWx9IDxpbnB1dCBzdHlsZT17aW5wdXRTdHlsZX0gdHlwZT17dHlwZX0gey4uLm90aGVyc30vPjwvQ2hpcD4pXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdGJyZWFrXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gKDxDaGlwIGtleT17a2V5fHxkYXRhfSBzdHlsZT17c3R5bGV9PlxyXG5cdFx0XHRcdFx0PEF2YXRhcj48L0F2YXRhcj5cclxuXHRcdFx0XHRcdHtkYXRhfVxyXG5cdFx0XHRcdDwvQ2hpcD4pXHJcblx0XHR9XHJcblx0fVxyXG59Il19