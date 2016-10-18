"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _Stepper = require("material-ui/Stepper");

var _map = require("material-ui/svg-icons/maps/map");

var _map2 = _interopRequireDefault(_map);

var _db = require("../db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Itinerary = function (_Component) {
	_inherits(Itinerary, _Component);

	function Itinerary() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Itinerary);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Itinerary)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			itinerary: []
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Itinerary, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var journey = this.props.journey;

			_db.Itinerary.find().fetch(function (itinerary) {
				_this2.setState({ itinerary: itinerary });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var mode = this.props.mode;

			switch (mode) {
				case "date":
					return this.renderByDate();
					break;
				case "place":
				default:
					return this.renderByPlace();
			}
		}
	}, {
		key: "renderByDate",
		value: function renderByDate() {
			var _props$journey = this.props.journey;
			var startedAt = _props$journey.startedAt;
			var endedAt = _props$journey.endedAt;
			var itinerary = this.state.itinerary;

			var len = endedAt.relative(startedAt),
			    days = [];
			for (var i = 0; i < len; i++) {
				days[i] = _react2.default.createElement(
					_Stepper.Step,
					{ key: i },
					_react2.default.createElement(
						_Stepper.StepLabel,
						null,
						_react2.default.createElement(
							"div",
							{ className: "grid" },
							_react2.default.createElement(
								"span",
								{ style: { width: "10em" } },
								startedAt.relativeDate(i).smartFormat()
							),
							_react2.default.createElement(
								"span",
								{ style: { width: 150, paddingRight: 20 } },
								_react2.default.createElement(LocationTextField, { hintText: "start from", name: "start" })
							),
							_react2.default.createElement(
								"span",
								{ style: { width: 150 } },
								_react2.default.createElement(LocationTextField, { hintText: "stay at", name: "end" })
							),
							_react2.default.createElement("span", null)
						)
					)
				);
			}
			return _react2.default.createElement(
				_Stepper.Stepper,
				{ orientation: "vertical" },
				days
			);
		}
	}, {
		key: "renderByPlace",
		value: function renderByPlace() {
			var _props$journey2 = this.props.journey;
			var startedAt = _props$journey2.startedAt;
			var endedAt = _props$journey2.endedAt;
			var itinerary = this.state.itinerary;

			var places = itinerary.map(function (a) {
				var place = a.place;
				var days = a.days;

				return _react2.default.createElement(
					_Stepper.Step,
					{ key: place },
					_react2.default.createElement(
						_Stepper.StepLabel,
						null,
						_react2.default.createElement(
							"div",
							{ className: "grid" },
							_react2.default.createElement(
								"span",
								null,
								place
							),
							_react2.default.createElement(
								"span",
								null,
								_react2.default.createElement(_materialUi.TextField, { floatHintText: "��������", name: "days", defaultValue: 1 })
							),
							_react2.default.createElement("span", null)
						)
					)
				);
			});
			return _react2.default.createElement(
				_Stepper.Stepper,
				{ orientation: "vertical" },
				places
			);
		}
	}]);

	return Itinerary;
}(_react.Component);

exports.default = Itinerary;

var LocationTextField = function (_Component2) {
	_inherits(LocationTextField, _Component2);

	function LocationTextField() {
		_classCallCheck(this, LocationTextField);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(LocationTextField).apply(this, arguments));
	}

	_createClass(LocationTextField, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var _props$style = _props.style;
			var style = _props$style === undefined ? {} : _props$style;

			var others = _objectWithoutProperties(_props, ["style"]);

			var width = style.width;

			var otherStyle = _objectWithoutProperties(style, ["width"]);

			others.style = otherStyle;
			var outerStyle = {};
			if (width) outerStyle.width = width - 24;

			return _react2.default.createElement(
				"div",
				_extends({ className: "grid" }, outerStyle),
				_react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(_materialUi.TextField, _extends({}, others, { fullWidth: true }))
				),
				_react2.default.createElement(
					"div",
					{ style: { width: 24 } },
					_react2.default.createElement(
						"span",
						{ style: { position: "relative", top: 8 } },
						_react2.default.createElement(_map2.default, { color: "lightgray" })
					)
				)
			);
		}
	}]);

	return LocationTextField;
}(_react.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2l0aW5lcmFyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O3FNQUNwQixRQUFNO0FBQ0wsY0FBVSxFQUFWOzs7O2NBRm1COztzQ0FLRDs7O09BQ1gsVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQURXOztBQUVsQixpQkFBWSxJQUFaLEdBQW1CLEtBQW5CLENBQXlCLHFCQUFXO0FBQ25DLFdBQUssUUFBTCxDQUFjLEVBQUMsb0JBQUQsRUFBZCxFQURtQztJQUFYLENBQXpCLENBRmtCOzs7OzJCQU9YO09BQ0EsT0FBTSxLQUFLLEtBQUwsQ0FBTixLQURBOztBQUVQLFdBQU8sSUFBUDtBQUNBLFNBQUssTUFBTDtBQUNDLFlBQU8sS0FBSyxZQUFMLEVBQVAsQ0FERDtBQUVBLFdBRkE7QUFEQSxTQUlLLE9BQUwsQ0FKQTtBQUtBO0FBQ0MsWUFBTyxLQUFLLGFBQUwsRUFBUCxDQUREO0FBTEEsSUFGTzs7OztpQ0FZTTt3QkFDYyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBRGQ7T0FDTixxQ0FETTtPQUNLLGlDQURMO09BRU4sWUFBVyxLQUFLLEtBQUwsQ0FBWCxVQUZNOztBQUdiLE9BQUksTUFBSSxRQUFRLFFBQVIsQ0FBaUIsU0FBakIsQ0FBSjtPQUFpQyxPQUFLLEVBQUwsQ0FIeEI7QUFJYixRQUFJLElBQUksSUFBRSxDQUFGLEVBQUksSUFBRSxHQUFGLEVBQU0sR0FBbEIsRUFBc0I7QUFDckIsU0FBSyxDQUFMLElBQ0M7O09BQU0sS0FBSyxDQUFMLEVBQU47S0FDQzs7O01BQ0M7O1NBQUssV0FBVSxNQUFWLEVBQUw7T0FDQzs7VUFBTSxPQUFPLEVBQUMsT0FBTSxNQUFOLEVBQVIsRUFBTjtRQUNFLFVBQVUsWUFBVixDQUF1QixDQUF2QixFQUEwQixXQUExQixFQURGO1FBREQ7T0FJQzs7VUFBTSxPQUFPLEVBQUMsT0FBTSxHQUFOLEVBQVUsY0FBYSxFQUFiLEVBQWxCLEVBQU47UUFDQyw4QkFBQyxpQkFBRCxJQUFtQixVQUFTLFlBQVQsRUFBc0IsTUFBSyxPQUFMLEVBQXpDLENBREQ7UUFKRDtPQU9DOztVQUFNLE9BQU8sRUFBQyxPQUFNLEdBQU4sRUFBUixFQUFOO1FBQ0MsOEJBQUMsaUJBQUQsSUFBbUIsVUFBUyxTQUFULEVBQW1CLE1BQUssS0FBTCxFQUF0QyxDQUREO1FBUEQ7T0FVQywyQ0FWRDtPQUREO01BREQ7S0FERCxDQURxQjtJQUF0QjtBQW9CQSxVQUNDOztNQUFTLGFBQVksVUFBWixFQUFUO0lBQ0UsSUFERjtJQURELENBeEJhOzs7O2tDQStCQzt5QkFDYSxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBRGI7T0FDUCxzQ0FETztPQUNJLGtDQURKO09BRVAsWUFBVyxLQUFLLEtBQUwsQ0FBWCxVQUZPOztBQUdkLE9BQUksU0FBTyxVQUFVLEdBQVYsQ0FBYyxhQUFHO1FBQ3BCLFFBQWEsRUFBYixNQURvQjtRQUNiLE9BQU0sRUFBTixLQURhOztBQUUzQixXQUNDOztPQUFNLEtBQUssS0FBTCxFQUFOO0tBQ0M7OztNQUNDOztTQUFLLFdBQVUsTUFBVixFQUFMO09BQ0M7OztRQUFPLEtBQVA7UUFERDtPQUVDOzs7UUFBTSx1REFBVyxlQUFjLFVBQWQsRUFBeUIsTUFBSyxNQUFMLEVBQVksY0FBYyxDQUFkLEVBQWhELENBQU47UUFGRDtPQUdDLDJDQUhEO09BREQ7TUFERDtLQURELENBRjJCO0lBQUgsQ0FBckIsQ0FIVTtBQWlCZCxVQUNDOztNQUFTLGFBQVksVUFBWixFQUFUO0lBQ0UsTUFERjtJQURELENBakJjOzs7O1FBdkRLOzs7OztJQWdGZjs7Ozs7Ozs7Ozs7MkJBQ0c7Z0JBQ29CLEtBQUssS0FBTCxDQURwQjs2QkFDQSxNQURBO09BQ0EscUNBQU0sa0JBRE47O09BQ1kscURBRFo7O09BRUEsUUFBc0IsTUFBdEIsTUFGQTs7T0FFVSxzQ0FBWSxrQkFGdEI7O0FBR1AsVUFBTyxLQUFQLEdBQWEsVUFBYixDQUhPO0FBSVAsT0FBSSxhQUFXLEVBQVgsQ0FKRztBQUtQLE9BQUcsS0FBSCxFQUNDLFdBQVcsS0FBWCxHQUFpQixRQUFNLEVBQU4sQ0FEbEI7O0FBR0EsVUFDQzs7ZUFBSyxXQUFVLE1BQVYsSUFBcUIsV0FBMUI7SUFDQzs7O0tBQ0Msa0VBQWUsVUFBUSxXQUFXLElBQVgsR0FBdkIsQ0FERDtLQUREO0lBSUM7O09BQUssT0FBTyxFQUFDLE9BQU0sRUFBTixFQUFSLEVBQUw7S0FDQzs7UUFBTSxPQUFPLEVBQUMsVUFBUyxVQUFULEVBQW9CLEtBQUksQ0FBSixFQUE1QixFQUFOO01BQ0MsK0NBQVMsT0FBTSxXQUFOLEVBQVQsQ0FERDtNQUREO0tBSkQ7SUFERCxDQVJPOzs7O1FBREgiLCJmaWxlIjoiaXRpbmVyYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge1N0ZXAsU3RlcHBlcixTdGVwTGFiZWwsU3RlcENvbnRlbnR9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQiwgSXRpbmVyYXJ5IGFzIEl0aW5lcmFyeURCfSBmcm9tIFwiLi4vZGJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRpbmVyYXJ5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtcclxuXHRcdGl0aW5lcmFyeTpbXVxyXG5cdH1cclxuXHRcclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXl9PXRoaXMucHJvcHNcclxuXHRcdEl0aW5lcmFyeURCLmZpbmQoKS5mZXRjaChpdGluZXJhcnk9PntcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7aXRpbmVyYXJ5fSlcclxuXHRcdH0pXHRcclxuXHR9XHJcblx0XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7bW9kZX09dGhpcy5wcm9wc1xyXG5cdFx0c3dpdGNoKG1vZGUpe1xyXG5cdFx0Y2FzZSBcImRhdGVcIjpcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyQnlEYXRlKClcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwicGxhY2VcIjpcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiB0aGlzLnJlbmRlckJ5UGxhY2UoKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRyZW5kZXJCeURhdGUoKXtcclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsIGVuZGVkQXR9PXRoaXMucHJvcHMuam91cm5leVxyXG5cdFx0Y29uc3Qge2l0aW5lcmFyeX09dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IGxlbj1lbmRlZEF0LnJlbGF0aXZlKHN0YXJ0ZWRBdCksIGRheXM9W11cclxuXHRcdGZvcihsZXQgaT0wO2k8bGVuO2krKyl7XHJcblx0XHRcdGRheXNbaV09KFxyXG5cdFx0XHRcdDxTdGVwIGtleT17aX0+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3dpZHRoOlwiMTBlbVwifX0+XHJcblx0XHRcdFx0XHRcdFx0XHR7c3RhcnRlZEF0LnJlbGF0aXZlRGF0ZShpKS5zbWFydEZvcm1hdCgpfVxyXG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3dpZHRoOjE1MCxwYWRkaW5nUmlnaHQ6MjB9fT5cclxuXHRcdFx0XHRcdFx0XHRcdDxMb2NhdGlvblRleHRGaWVsZCBoaW50VGV4dD1cInN0YXJ0IGZyb21cIiBuYW1lPVwic3RhcnRcIi8+XHJcblx0XHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7d2lkdGg6MTUwfX0+XHJcblx0XHRcdFx0XHRcdFx0XHQ8TG9jYXRpb25UZXh0RmllbGQgaGludFRleHQ9XCJzdGF5IGF0XCIgbmFtZT1cImVuZFwiLz5cclxuXHRcdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4vPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxyXG5cdFx0XHRcdHtkYXlzfVxyXG5cdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHQpXHJcblx0fVx0XHJcblxyXG5cdHJlbmRlckJ5UGxhY2UoKXtcclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsIGVuZGVkQXR9PXRoaXMucHJvcHMuam91cm5leVxyXG5cdFx0Y29uc3Qge2l0aW5lcmFyeX09dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IHBsYWNlcz1pdGluZXJhcnkubWFwKGE9PntcclxuXHRcdFx0Y29uc3Qge3BsYWNlLCBkYXlzfT1hXHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PFN0ZXAga2V5PXtwbGFjZX0+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj57cGxhY2V9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPjxUZXh0RmllbGQgZmxvYXRIaW50VGV4dD1cIu+/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vVwiIG5hbWU9XCJkYXlzXCIgZGVmYXVsdFZhbHVlPXsxfS8+PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuLz5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHQ8L1N0ZXA+XHJcblx0XHRcdClcdFxyXG5cdFx0fSlcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIj5cclxuXHRcdFx0XHR7cGxhY2VzfVxyXG5cdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBMb2NhdGlvblRleHRGaWVsZCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtzdHlsZT17fSwuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHt3aWR0aCwgLi4ub3RoZXJTdHlsZX09c3R5bGVcclxuXHRcdG90aGVycy5zdHlsZT1vdGhlclN0eWxlXHJcblx0XHRsZXQgb3V0ZXJTdHlsZT17fVxyXG5cdFx0aWYod2lkdGgpXHJcblx0XHRcdG91dGVyU3R5bGUud2lkdGg9d2lkdGgtMjRcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCIgey4uLm91dGVyU3R5bGV9PlxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIHsuLi5vdGhlcnN9IGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3t3aWR0aDoyNH19PlxyXG5cdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3twb3NpdGlvbjpcInJlbGF0aXZlXCIsdG9wOjh9fT5cclxuXHRcdFx0XHRcdFx0PEljb25NYXAgY29sb3I9XCJsaWdodGdyYXlcIi8+XHJcblx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufSJdfQ==