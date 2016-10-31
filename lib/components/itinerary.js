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

			var _id = this.props.journey._id;

			_db.Itinerary.find({ journey: _id }, function (itinerary) {
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
							"span",
							null,
							place
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2l0aW5lcmFyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O3FNQUNwQixRQUFNO0FBQ0wsY0FBVSxFQUFWOzs7O2NBRm1COztzQ0FLRDs7O09BQ0YsTUFBTSxLQUFLLEtBQUwsQ0FBZixRQUFTLElBREU7O0FBRWxCLGlCQUFZLElBQVosQ0FBaUIsRUFBQyxTQUFRLEdBQVIsRUFBbEIsRUFBK0IscUJBQVc7QUFDekMsV0FBSyxRQUFMLENBQWMsRUFBQyxvQkFBRCxFQUFkLEVBRHlDO0lBQVgsQ0FBL0IsQ0FGa0I7Ozs7MkJBT1g7T0FDQSxPQUFNLEtBQUssS0FBTCxDQUFOLEtBREE7O0FBRVAsV0FBTyxJQUFQO0FBQ0EsU0FBSyxNQUFMO0FBQ0MsWUFBTyxLQUFLLFlBQUwsRUFBUCxDQUREO0FBRUEsV0FGQTtBQURBLFNBSUssT0FBTCxDQUpBO0FBS0E7QUFDQyxZQUFPLEtBQUssYUFBTCxFQUFQLENBREQ7QUFMQSxJQUZPOzs7O2lDQVlNO3dCQUNjLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FEZDtPQUNOLHFDQURNO09BQ0ssaUNBREw7T0FFTixZQUFXLEtBQUssS0FBTCxDQUFYLFVBRk07O0FBR2IsT0FBSSxNQUFJLFFBQVEsUUFBUixDQUFpQixTQUFqQixDQUFKO09BQWlDLE9BQUssRUFBTCxDQUh4QjtBQUliLFFBQUksSUFBSSxJQUFFLENBQUYsRUFBSSxJQUFFLEdBQUYsRUFBTSxHQUFsQixFQUFzQjtBQUNyQixTQUFLLENBQUwsSUFDQzs7T0FBTSxLQUFLLENBQUwsRUFBTjtLQUNDOzs7TUFDQzs7U0FBSyxXQUFVLE1BQVYsRUFBTDtPQUNDOztVQUFNLE9BQU8sRUFBQyxPQUFNLE1BQU4sRUFBUixFQUFOO1FBQ0UsVUFBVSxZQUFWLENBQXVCLENBQXZCLEVBQTBCLFdBQTFCLEVBREY7UUFERDtPQUlDOztVQUFNLE9BQU8sRUFBQyxPQUFNLEdBQU4sRUFBVSxjQUFhLEVBQWIsRUFBbEIsRUFBTjtRQUNDLDhCQUFDLGlCQUFELElBQW1CLFVBQVMsWUFBVCxFQUFzQixNQUFLLE9BQUwsRUFBekMsQ0FERDtRQUpEO09BT0M7O1VBQU0sT0FBTyxFQUFDLE9BQU0sR0FBTixFQUFSLEVBQU47UUFDQyw4QkFBQyxpQkFBRCxJQUFtQixVQUFTLFNBQVQsRUFBbUIsTUFBSyxLQUFMLEVBQXRDLENBREQ7UUFQRDtPQVVDLDJDQVZEO09BREQ7TUFERDtLQURELENBRHFCO0lBQXRCO0FBb0JBLFVBQ0M7O01BQVMsYUFBWSxVQUFaLEVBQVQ7SUFDRSxJQURGO0lBREQsQ0F4QmE7Ozs7a0NBK0JDO3lCQUNhLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FEYjtPQUNQLHNDQURPO09BQ0ksa0NBREo7T0FFUCxZQUFXLEtBQUssS0FBTCxDQUFYLFVBRk87O0FBR2QsT0FBSSxTQUFPLFVBQVUsR0FBVixDQUFjLGFBQUc7UUFDcEIsUUFBYSxFQUFiLE1BRG9CO1FBQ2IsT0FBTSxFQUFOLEtBRGE7O0FBRTNCLFdBQ0M7O09BQU0sS0FBSyxLQUFMLEVBQU47S0FDQzs7O01BQ0M7OztPQUFPLEtBQVA7T0FERDtNQUREO0tBREQsQ0FGMkI7SUFBSCxDQUFyQixDQUhVO0FBYWQsVUFDQzs7TUFBUyxhQUFZLFVBQVosRUFBVDtJQUNFLE1BREY7SUFERCxDQWJjOzs7O1FBdkRLOzs7OztJQTRFZjs7Ozs7Ozs7Ozs7MkJBQ0c7Z0JBQ29CLEtBQUssS0FBTCxDQURwQjs2QkFDQSxNQURBO09BQ0EscUNBQU0sa0JBRE47O09BQ1kscURBRFo7O09BRUEsUUFBc0IsTUFBdEIsTUFGQTs7T0FFVSxzQ0FBWSxrQkFGdEI7O0FBR1AsVUFBTyxLQUFQLEdBQWEsVUFBYixDQUhPO0FBSVAsT0FBSSxhQUFXLEVBQVgsQ0FKRztBQUtQLE9BQUcsS0FBSCxFQUNDLFdBQVcsS0FBWCxHQUFpQixRQUFNLEVBQU4sQ0FEbEI7O0FBR0EsVUFDQzs7ZUFBSyxXQUFVLE1BQVYsSUFBcUIsV0FBMUI7SUFDQzs7O0tBQ0Msa0VBQWUsVUFBUSxXQUFXLElBQVgsR0FBdkIsQ0FERDtLQUREO0lBSUM7O09BQUssT0FBTyxFQUFDLE9BQU0sRUFBTixFQUFSLEVBQUw7S0FDQzs7UUFBTSxPQUFPLEVBQUMsVUFBUyxVQUFULEVBQW9CLEtBQUksQ0FBSixFQUE1QixFQUFOO01BQ0MsK0NBQVMsT0FBTSxXQUFOLEVBQVQsQ0FERDtNQUREO0tBSkQ7SUFERCxDQVJPOzs7O1FBREgiLCJmaWxlIjoiaXRpbmVyYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge1N0ZXAsU3RlcHBlcixTdGVwTGFiZWwsU3RlcENvbnRlbnR9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5cclxuaW1wb3J0IHtJdGluZXJhcnkgYXMgSXRpbmVyYXJ5REJ9IGZyb20gXCIuLi9kYlwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGluZXJhcnkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0aXRpbmVyYXJ5OltdXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXk6e19pZH19PXRoaXMucHJvcHNcclxuXHRcdEl0aW5lcmFyeURCLmZpbmQoe2pvdXJuZXk6X2lkfSxpdGluZXJhcnk9PntcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7aXRpbmVyYXJ5fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHttb2RlfT10aGlzLnByb3BzXHJcblx0XHRzd2l0Y2gobW9kZSl7XHJcblx0XHRjYXNlIFwiZGF0ZVwiOlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJCeURhdGUoKVxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJwbGFjZVwiOlxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIHRoaXMucmVuZGVyQnlQbGFjZSgpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXJCeURhdGUoKXtcclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsIGVuZGVkQXR9PXRoaXMucHJvcHMuam91cm5leVxyXG5cdFx0Y29uc3Qge2l0aW5lcmFyeX09dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IGxlbj1lbmRlZEF0LnJlbGF0aXZlKHN0YXJ0ZWRBdCksIGRheXM9W11cclxuXHRcdGZvcihsZXQgaT0wO2k8bGVuO2krKyl7XHJcblx0XHRcdGRheXNbaV09KFxyXG5cdFx0XHRcdDxTdGVwIGtleT17aX0+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3dpZHRoOlwiMTBlbVwifX0+XHJcblx0XHRcdFx0XHRcdFx0XHR7c3RhcnRlZEF0LnJlbGF0aXZlRGF0ZShpKS5zbWFydEZvcm1hdCgpfVxyXG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3dpZHRoOjE1MCxwYWRkaW5nUmlnaHQ6MjB9fT5cclxuXHRcdFx0XHRcdFx0XHRcdDxMb2NhdGlvblRleHRGaWVsZCBoaW50VGV4dD1cInN0YXJ0IGZyb21cIiBuYW1lPVwic3RhcnRcIi8+XHJcblx0XHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7d2lkdGg6MTUwfX0+XHJcblx0XHRcdFx0XHRcdFx0XHQ8TG9jYXRpb25UZXh0RmllbGQgaGludFRleHQ9XCJzdGF5IGF0XCIgbmFtZT1cImVuZFwiLz5cclxuXHRcdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4vPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxyXG5cdFx0XHRcdHtkYXlzfVxyXG5cdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRyZW5kZXJCeVBsYWNlKCl7XHJcblx0XHRjb25zdCB7c3RhcnRlZEF0LCBlbmRlZEF0fT10aGlzLnByb3BzLmpvdXJuZXlcclxuXHRcdGNvbnN0IHtpdGluZXJhcnl9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBwbGFjZXM9aXRpbmVyYXJ5Lm1hcChhPT57XHJcblx0XHRcdGNvbnN0IHtwbGFjZSwgZGF5c309YVxyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxTdGVwIGtleT17cGxhY2V9PlxyXG5cdFx0XHRcdFx0PFN0ZXBMYWJlbD5cclxuXHRcdFx0XHRcdFx0PHNwYW4+e3BsYWNlfTwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0KVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIj5cclxuXHRcdFx0XHR7cGxhY2VzfVxyXG5cdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBMb2NhdGlvblRleHRGaWVsZCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtzdHlsZT17fSwuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHt3aWR0aCwgLi4ub3RoZXJTdHlsZX09c3R5bGVcclxuXHRcdG90aGVycy5zdHlsZT1vdGhlclN0eWxlXHJcblx0XHRsZXQgb3V0ZXJTdHlsZT17fVxyXG5cdFx0aWYod2lkdGgpXHJcblx0XHRcdG91dGVyU3R5bGUud2lkdGg9d2lkdGgtMjRcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIiB7Li4ub3V0ZXJTdHlsZX0+XHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgey4uLm90aGVyc30gZnVsbFdpZHRoPXt0cnVlfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17e3dpZHRoOjI0fX0+XHJcblx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3Bvc2l0aW9uOlwicmVsYXRpdmVcIix0b3A6OH19PlxyXG5cdFx0XHRcdFx0XHQ8SWNvbk1hcCBjb2xvcj1cImxpZ2h0Z3JheVwiLz5cclxuXHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcbiJdfQ==