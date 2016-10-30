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
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Itinerary);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Itinerary.__proto__ || Object.getPrototypeOf(Itinerary)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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

		return _possibleConstructorReturn(this, (LocationTextField.__proto__ || Object.getPrototypeOf(LocationTextField)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2l0aW5lcmFyeS5qcyJdLCJuYW1lcyI6WyJJdGluZXJhcnkiLCJzdGF0ZSIsIml0aW5lcmFyeSIsIl9pZCIsInByb3BzIiwiam91cm5leSIsImZpbmQiLCJzZXRTdGF0ZSIsIm1vZGUiLCJyZW5kZXJCeURhdGUiLCJyZW5kZXJCeVBsYWNlIiwic3RhcnRlZEF0IiwiZW5kZWRBdCIsImxlbiIsInJlbGF0aXZlIiwiZGF5cyIsImkiLCJ3aWR0aCIsInJlbGF0aXZlRGF0ZSIsInNtYXJ0Rm9ybWF0IiwicGFkZGluZ1JpZ2h0IiwicGxhY2VzIiwibWFwIiwicGxhY2UiLCJhIiwiTG9jYXRpb25UZXh0RmllbGQiLCJzdHlsZSIsIm90aGVycyIsIm90aGVyU3R5bGUiLCJvdXRlclN0eWxlIiwicG9zaXRpb24iLCJ0b3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7MExBQ3BCQyxLLEdBQU07QUFDTEMsY0FBVTtBQURMLEc7Ozs7O3NDQUlhO0FBQUE7O0FBQUEsT0FDRkMsR0FERSxHQUNJLEtBQUtDLEtBRFQsQ0FDWEMsT0FEVyxDQUNGRixHQURFOztBQUVsQixpQkFBWUcsSUFBWixDQUFpQixFQUFDRCxTQUFRRixHQUFULEVBQWpCLEVBQStCLHFCQUFXO0FBQ3pDLFdBQUtJLFFBQUwsQ0FBYyxFQUFDTCxvQkFBRCxFQUFkO0FBQ0EsSUFGRDtBQUdBOzs7MkJBRU87QUFBQSxPQUNBTSxJQURBLEdBQ00sS0FBS0osS0FEWCxDQUNBSSxJQURBOztBQUVQLFdBQU9BLElBQVA7QUFDQSxTQUFLLE1BQUw7QUFDQyxZQUFPLEtBQUtDLFlBQUwsRUFBUDtBQUNEO0FBQ0EsU0FBSyxPQUFMO0FBQ0E7QUFDQyxZQUFPLEtBQUtDLGFBQUwsRUFBUDtBQU5EO0FBUUE7OztpQ0FFYTtBQUFBLHdCQUNjLEtBQUtOLEtBQUwsQ0FB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UmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCB7U3RlcCxTdGVwcGVyLFN0ZXBMYWJlbCxTdGVwQ29udGVudH0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcidcclxuaW1wb3J0IEljb25NYXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL21hcFwiXHJcblxyXG5pbXBvcnQge0l0aW5lcmFyeSBhcyBJdGluZXJhcnlEQn0gZnJvbSBcIi4uL2RiXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0aW5lcmFyeSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRpdGluZXJhcnk6W11cclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRjb25zdCB7am91cm5leTp7X2lkfX09dGhpcy5wcm9wc1xyXG5cdFx0SXRpbmVyYXJ5REIuZmluZCh7am91cm5leTpfaWR9LGl0aW5lcmFyeT0+e1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtpdGluZXJhcnl9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge21vZGV9PXRoaXMucHJvcHNcclxuXHRcdHN3aXRjaChtb2RlKXtcclxuXHRcdGNhc2UgXCJkYXRlXCI6XHJcblx0XHRcdHJldHVybiB0aGlzLnJlbmRlckJ5RGF0ZSgpXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcInBsYWNlXCI6XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJCeVBsYWNlKClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbmRlckJ5RGF0ZSgpe1xyXG5cdFx0Y29uc3Qge3N0YXJ0ZWRBdCwgZW5kZWRBdH09dGhpcy5wcm9wcy5qb3VybmV5XHJcblx0XHRjb25zdCB7aXRpbmVyYXJ5fT10aGlzLnN0YXRlXHJcblx0XHRsZXQgbGVuPWVuZGVkQXQucmVsYXRpdmUoc3RhcnRlZEF0KSwgZGF5cz1bXVxyXG5cdFx0Zm9yKGxldCBpPTA7aTxsZW47aSsrKXtcclxuXHRcdFx0ZGF5c1tpXT0oXHJcblx0XHRcdFx0PFN0ZXAga2V5PXtpfT5cclxuXHRcdFx0XHRcdDxTdGVwTGFiZWw+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7d2lkdGg6XCIxMGVtXCJ9fT5cclxuXHRcdFx0XHRcdFx0XHRcdHtzdGFydGVkQXQucmVsYXRpdmVEYXRlKGkpLnNtYXJ0Rm9ybWF0KCl9XHJcblx0XHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7d2lkdGg6MTUwLHBhZGRpbmdSaWdodDoyMH19PlxyXG5cdFx0XHRcdFx0XHRcdFx0PExvY2F0aW9uVGV4dEZpZWxkIGhpbnRUZXh0PVwic3RhcnQgZnJvbVwiIG5hbWU9XCJzdGFydFwiLz5cclxuXHRcdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3t3aWR0aDoxNTB9fT5cclxuXHRcdFx0XHRcdFx0XHRcdDxMb2NhdGlvblRleHRGaWVsZCBoaW50VGV4dD1cInN0YXkgYXRcIiBuYW1lPVwiZW5kXCIvPlxyXG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbi8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+XHJcblx0XHRcdFx0e2RheXN9XHJcblx0XHRcdDwvU3RlcHBlcj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHJlbmRlckJ5UGxhY2UoKXtcclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsIGVuZGVkQXR9PXRoaXMucHJvcHMuam91cm5leVxyXG5cdFx0Y29uc3Qge2l0aW5lcmFyeX09dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IHBsYWNlcz1pdGluZXJhcnkubWFwKGE9PntcclxuXHRcdFx0Y29uc3Qge3BsYWNlLCBkYXlzfT1hXHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PFN0ZXAga2V5PXtwbGFjZX0+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0XHQ8c3Bhbj57cGxhY2V9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHQpXHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxyXG5cdFx0XHRcdHtwbGFjZXN9XHJcblx0XHRcdDwvU3RlcHBlcj5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIExvY2F0aW9uVGV4dEZpZWxkIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge3N0eWxlPXt9LC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3dpZHRoLCAuLi5vdGhlclN0eWxlfT1zdHlsZVxyXG5cdFx0b3RoZXJzLnN0eWxlPW90aGVyU3R5bGVcclxuXHRcdGxldCBvdXRlclN0eWxlPXt9XHJcblx0XHRpZih3aWR0aClcclxuXHRcdFx0b3V0ZXJTdHlsZS53aWR0aD13aWR0aC0yNFxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiIHsuLi5vdXRlclN0eWxlfT5cclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCB7Li4ub3RoZXJzfSBmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7d2lkdGg6MjR9fT5cclxuXHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7cG9zaXRpb246XCJyZWxhdGl2ZVwiLHRvcDo4fX0+XHJcblx0XHRcdFx0XHRcdDxJY29uTWFwIGNvbG9yPVwibGlnaHRncmF5XCIvPlxyXG5cdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuIl19