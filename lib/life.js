"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _Stepper = require("material-ui/Stepper");

var _directionsWalk = require("material-ui/svg-icons/maps/directions-walk");

var _directionsWalk2 = _interopRequireDefault(_directionsWalk);

var _cameraRoll = require("material-ui/svg-icons/image/camera-roll");

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

var _Card = require("material-ui/Card");

var _IconButton = require("material-ui/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _keyboardArrowRight = require("material-ui/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;

var _class = function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, _class);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			journeys: [{ name: "Tibet, the Everest", startedAt: new Date(Date.parse("2012-9-12")), endedAt: new Date(Date.parse("2012-9-27")), status: "book" }, { name: "尼泊尔MBC", startedAt: new Date(Date.parse("2014-9-12")), endedAt: new Date(Date.parse("2014-9-27")), status: "memory" }, { name: "Alps Walker's Haute Route", startedAt: new Date(Date.parse("2016-8-10")), endedAt: new Date(Date.parse("2016-9-27")), status: "wish" }, { name: "New Zerland", startedAt: new Date(Date.parse("2017-8-10")), endedAt: new Date(Date.parse("2017-9-27")), status: "wish" }, { name: "Nebal", startedAt: new Date(Date.parse("2018-8-10")), endedAt: new Date(Date.parse("2018-9-27")), status: "wish" }],
			showHistory: false
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(_class, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _state = this.state;
			var journeys = _state.journeys;
			var showHistory = _state.showHistory;

			var _group = this.group(journeys);

			var memory = _group.memory;
			var wish = _group.wish;
			var active = _group.active;

			var publisher = null;

			if (memory.length || active.length) {
				publisher = _react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "floating sticky top right",
						mini: true, onClick: function onClick(e) {
							return _this2.context.router.push("publish", { journey: active[0] });
						} },
					_react2.default.createElement(_cameraRoll2.default, null),
					"$"
				);
			}
			return _react2.default.createElement(
				"div",
				null,
				publisher,
				showHistory && memory.length && _react2.default.createElement(
					_Stepper.Stepper,
					{ orientation: "vertical", activeStep: -1 },
					memory.map(function (_ref) {
						var name = _ref.name;
						var startedAt = _ref.startedAt;
						return _react2.default.createElement(
							_Stepper.Step,
							{ key: name, completed: true },
							_react2.default.createElement(
								_Stepper.StepLabel,
								null,
								_react2.default.createElement(
									"div",
									null,
									startedAt.smartFormat(),
									_react2.default.createElement("br", null),
									name
								)
							)
						);
					})
				) || null,
				active.length && active.map(function (journey) {
					return _react2.default.createElement(Journey, { journey: journey });
				}) || null,
				wish.length && _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						Empty,
						{ icon: _react2.default.createElement(_directionsWalk2.default, null) },
						"go, more journey"
					),
					_react2.default.createElement(
						_Stepper.Stepper,
						{ orientation: "vertical", activeStep: -1, linear: false },
						wish.map(function (_ref2) {
							var name = _ref2.name;
							var startedAt = _ref2.startedAt;
							return _react2.default.createElement(
								_Stepper.Step,
								{ key: name, completed: false },
								_react2.default.createElement(
									_Stepper.StepLabel,
									{ icon: " " },
									_react2.default.createElement(
										"div",
										null,
										startedAt.smartFormat(),
										_react2.default.createElement("br", null),
										name
									)
								)
							);
						})
					)
				) || _react2.default.createElement(
					Empty,
					{ icon: _react2.default.createElement(_directionsWalk2.default, null) },
					"来,开始你的心旅程"
				)
			);
		}
	}, {
		key: "group",
		value: function group(journeys) {
			var now = new Date();
			var memory = [],
			    wish = [],
			    active = [];
			journeys.forEach(function (journey) {
				var startedAt = journey.startedAt;
				var endedAt = journey.endedAt;

				var started = null,
				    ended = null;

				if (startedAt) {
					started = now.relative(startedAt);
					if (started < 0) {
						wish.push(journey);
						return;
					} else if (started == 0) {
						active.push(journey);
						return;
					}
				}

				if (endedAt) {
					ended = now.relative(endedAt);
					if (ended > 0) {
						memory.push(journey);
						return;
					} else if (ended == 0) {
						active.push(journey);
						return;
					}
				}

				if (started != null && ended != null && started > 0 && ended < 0) {
					active.push(journey);
					return;
				}

				//unconfirmed as wish
				wish.push(journey);
			});
			return { memory: memory, wish: wish, active: active };
		}
	}]);

	return _class;
}(_react.Component);

_class.contextTypes = {
	router: _react.PropTypes.object
};
exports.default = _class;

var Journey = function (_Component2) {
	_inherits(Journey, _Component2);

	function Journey() {
		var _Object$getPrototypeO2;

		var _temp2, _this3, _ret2;

		_classCallCheck(this, Journey);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(Journey)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this3), _this3.state = {
			itinerary: [],
			footprints: [{ when: new Date(Date.parse('2016-8-10 8:23')), note: "出发了", photo: "http://www.imnotobsessed.com/wp-content/uploads/charlize-theron2012-05-30_08-30-38stops-by-the-colbert-report-499x800.jpg" }, { when: new Date(Date.parse('2016-8-14 12:45')), note: "alps", photo: "http://www.imnotobsessed.com/wp-content/uploads/charlize-theron2012-05-30_08-30-38stops-by-the-colbert-report-499x800.jpg" }, { when: new Date(Date.parse('2016-8-25 3:24')), note: "小木屋", photo: "http://www.imnotobsessed.com/wp-content/uploads/charlize-theron2012-05-30_08-30-38stops-by-the-colbert-report-499x800.jpg" }, { when: new Date(Date.parse('2016-9-4 13:34')), note: "准备回家", photo: "http://www.imnotobsessed.com/wp-content/uploads/charlize-theron2012-05-30_08-30-38stops-by-the-colbert-report-499x800.jpg" }]
		}, _temp2), _possibleConstructorReturn(_this3, _ret2);
	}

	_createClass(Journey, [{
		key: "render",
		value: function render() {
			var startedAt = this.props.journey.startedAt;
			var footprints = this.state.footprints;

			var currentDate = null,
			    all = [];

			footprints.forEach(function (footprint) {
				var when = footprint.when;
				var photo = footprint.photo;
				var note = footprint.note;

				if (currentDate == null || !when.isSameDate(currentDate)) {
					currentDate = when;
					var day = currentDate.relative(startedAt) + 1;
					all.push(_react2.default.createElement(Day, { key: day, day: day, date: currentDate }));
				}
				all.push(_react2.default.createElement(Footprint, { key: when, data: footprint }));
			});
			return _react2.default.createElement(
				_Stepper.Stepper,
				{ orientation: "vertical" },
				_react2.default.createElement(Title, { journey: this.props.journey }),
				all
			);
		}
	}]);

	return Journey;
}(_react.Component);

var Title = function (_Component3) {
	_inherits(Title, _Component3);

	function Title() {
		_classCallCheck(this, Title);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
	}

	_createClass(Title, [{
		key: "render",
		value: function render() {
			var name = this.props.journey.name;

			return _react2.default.createElement(
				_Stepper.Step,
				null,
				_react2.default.createElement(
					_Stepper.StepLabel,
					{ icon: "*" },
					_react2.default.createElement(
						"span",
						null,
						name
					),
					_react2.default.createElement(_keyboardArrowRight2.default, null)
				)
			);
		}
	}]);

	return Title;
}(_react.Component);

var Day = function (_Component4) {
	_inherits(Day, _Component4);

	function Day() {
		_classCallCheck(this, Day);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Day).apply(this, arguments));
	}

	_createClass(Day, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var day = _props.day;
			var date = _props.date;

			return _react2.default.createElement(
				_Stepper.Step,
				{ disabled: false },
				_react2.default.createElement(
					_Stepper.StepLabel,
					{ icon: "" + day },
					date.smartFormat("今天")
				)
			);
		}
	}]);

	return Day;
}(_react.Component);

var Footprint = function (_Component5) {
	_inherits(Footprint, _Component5);

	function Footprint() {
		_classCallCheck(this, Footprint);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Footprint).apply(this, arguments));
	}

	_createClass(Footprint, [{
		key: "render",
		value: function render() {
			var _props$data = this.props.data;
			var when = _props$data.when;
			var photo = _props$data.photo;
			var note = _props$data.note;

			return _react2.default.createElement(
				_Stepper.Step,
				{ completed: true, active: true },
				_react2.default.createElement(
					_Stepper.StepLabel,
					{ icon: "." },
					_react2.default.createElement(
						"div",
						null,
						_react2.default.createElement(
							"time",
							null,
							when.format('HH:mm')
						),
						"-",
						_react2.default.createElement(
							"span",
							null,
							note
						)
					)
				),
				_react2.default.createElement(
					_Stepper.StepContent,
					null,
					_react2.default.createElement(
						"p",
						null,
						_react2.default.createElement("img", { style: { height: 250 }, src: photo })
					)
				)
			);
		}
	}]);

	return Footprint;
}(_react.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Q0FEakI7T0FDQSx3QkFEQTtPQUNLLDBCQURMO09BQ1csd0JBRFg7O0FBRVAsVUFDQzs7TUFBTSxXQUFXLElBQVgsRUFBaUIsUUFBUSxJQUFSLEVBQXZCO0lBQ0M7O09BQVcsTUFBTSxHQUFOLEVBQVg7S0FDQzs7O01BQ0M7OztPQUFPLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBUDtPQUREOztNQUVDOzs7T0FBTyxJQUFQO09BRkQ7TUFERDtLQUREO0lBT0M7OztLQUNDOzs7TUFDQyx1Q0FBSyxPQUFPLEVBQUMsUUFBTyxHQUFQLEVBQVIsRUFBcUIsS0FBSyxLQUFMLEVBQTFCLENBREQ7TUFERDtLQVBEO0lBREQsQ0FGTzs7OztRQURIIiwiZmlsZSI6ImxpZmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge1xyXG4gIFN0ZXAsXHJcbiAgU3RlcHBlcixcclxuICBTdGVwTGFiZWwsXHJcbiAgU3RlcENvbnRlbnQsXHJcbn0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcidcclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcblxyXG5jb25zdCB7RW1wdHl9PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRqb3VybmV5czpbXHJcblx0XHRcdHtuYW1lOlwiVGliZXQsIHRoZSBFdmVyZXN0XCIsIHN0YXJ0ZWRBdDogbmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTItOS0xMlwiKSksIGVuZGVkQXQ6bmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTItOS0yN1wiKSksIHN0YXR1czpcImJvb2tcIn1cclxuXHRcdFx0LHtuYW1lOlwi5bC85rOK5bCUTUJDXCIsIHN0YXJ0ZWRBdDogbmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTQtOS0xMlwiKSksIGVuZGVkQXQ6bmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTQtOS0yN1wiKSksIHN0YXR1czpcIm1lbW9yeVwifVxyXG5cdFx0XHQse25hbWU6XCJBbHBzIFdhbGtlcidzIEhhdXRlIFJvdXRlXCIsIHN0YXJ0ZWRBdDogbmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTYtOC0xMFwiKSksIGVuZGVkQXQ6bmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTYtOS0yN1wiKSksIHN0YXR1czpcIndpc2hcIn1cclxuXHRcdFx0LHtuYW1lOlwiTmV3IFplcmxhbmRcIiwgc3RhcnRlZEF0OiBuZXcgRGF0ZShEYXRlLnBhcnNlKFwiMjAxNy04LTEwXCIpKSwgZW5kZWRBdDpuZXcgRGF0ZShEYXRlLnBhcnNlKFwiMjAxNy05LTI3XCIpKSwgc3RhdHVzOlwid2lzaFwifVxyXG5cdFx0XHQse25hbWU6XCJOZWJhbFwiLCBzdGFydGVkQXQ6IG5ldyBEYXRlKERhdGUucGFyc2UoXCIyMDE4LTgtMTBcIikpLCBlbmRlZEF0Om5ldyBEYXRlKERhdGUucGFyc2UoXCIyMDE4LTktMjdcIikpLCBzdGF0dXM6XCJ3aXNoXCJ9XHJcblx0XHRcdF0sXHJcblx0XHRzaG93SGlzdG9yeTpmYWxzZVxyXG5cdH1cclxuXHRcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtqb3VybmV5cywgc2hvd0hpc3Rvcnl9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHttZW1vcnksIHdpc2gsIGFjdGl2ZX09dGhpcy5ncm91cChqb3VybmV5cylcclxuXHRcdGxldCBwdWJsaXNoZXI9bnVsbFxyXG5cdFx0XHJcblx0XHRpZihtZW1vcnkubGVuZ3RoIHx8IGFjdGl2ZS5sZW5ndGgpe1xyXG5cdFx0XHRwdWJsaXNoZXI9KFxyXG5cdFx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSB0b3AgcmlnaHRcIlxyXG5cdFx0XHRcdFx0bWluaT17dHJ1ZX0gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwicHVibGlzaFwiLHtqb3VybmV5OmFjdGl2ZVswXX0pfT5cclxuXHRcdFx0XHRcdDxJY29uUHVibGlzaC8+JFxyXG5cdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHRcdHJldHVybiAoXHJcblx0XHQ8ZGl2PlxyXG5cdFx0XHR7cHVibGlzaGVyfVxyXG5cdFx0XHR7c2hvd0hpc3RvcnkgJiYgbWVtb3J5Lmxlbmd0aCAmJiAoXHJcblx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRtZW1vcnkubWFwKCh7bmFtZSwgc3RhcnRlZEF0fSk9PihcclxuXHRcdFx0XHRcdFx0PFN0ZXAga2V5PXtuYW1lfSBjb21wbGV0ZWQ9e3RydWV9PlxyXG5cdFx0XHRcdFx0XHRcdDxTdGVwTGFiZWw+PGRpdj57c3RhcnRlZEF0LnNtYXJ0Rm9ybWF0KCl9PGJyLz57bmFtZX08L2Rpdj48L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHRcdFx0KSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHQpfHxudWxsfVxyXG5cdFx0XHRcclxuXHRcdFx0e2FjdGl2ZS5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdGFjdGl2ZS5tYXAoam91cm5leT0+KFxyXG5cdFx0XHRcdFx0PEpvdXJuZXkgam91cm5leT17am91cm5leX0vPlxyXG5cdFx0XHRcdCkpXHJcblx0XHRcdCl8fG51bGx9XHJcblx0XHRcdFxyXG5cdFx0XHR7d2lzaC5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8RW1wdHkgaWNvbj17PExvZ28vPn0+Z28sIG1vcmUgam91cm5leTwvRW1wdHk+XHJcblx0XHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgYWN0aXZlU3RlcD17LTF9IGxpbmVhcj17ZmFsc2V9PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR3aXNoLm1hcCgoe25hbWUsIHN0YXJ0ZWRBdH0pPT4oXHJcblx0XHRcdFx0XHRcdFx0PFN0ZXAga2V5PXtuYW1lfSBjb21wbGV0ZWQ9e2ZhbHNlfT5cclxuXHRcdFx0XHRcdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj1cIiBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7c3RhcnRlZEF0LnNtYXJ0Rm9ybWF0KCl9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGJyLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7bmFtZX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHRcdFx0XHQ8L1N0ZXA+XHJcblx0XHRcdFx0XHRcdCkpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCl8fCg8RW1wdHkgaWNvbj17PExvZ28vPn0+5p2lLOW8gOWni+S9oOeahOW/g+aXheeoizwvRW1wdHk+KX1cclxuXHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHRncm91cChqb3VybmV5cyl7XHJcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRcdGxldCBtZW1vcnk9W10sIHdpc2g9W10sIGFjdGl2ZT1bXVxyXG5cdFx0am91cm5leXMuZm9yRWFjaChqb3VybmV5PT57XHJcblx0XHRcdGxldCB7c3RhcnRlZEF0LCBlbmRlZEF0fT1qb3VybmV5XHJcblx0XHRcdGxldCBzdGFydGVkPW51bGwsIGVuZGVkPW51bGxcclxuXHRcdFx0XHJcblx0XHRcdGlmKHN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0c3RhcnRlZD1ub3cucmVsYXRpdmUoc3RhcnRlZEF0KVxyXG5cdFx0XHRcdGlmKHN0YXJ0ZWQ8MCl7XHJcblx0XHRcdFx0XHR3aXNoLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1lbHNlIGlmKHN0YXJ0ZWQ9PTApe1xyXG5cdFx0XHRcdFx0YWN0aXZlLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYoZW5kZWRBdCl7XHJcblx0XHRcdFx0ZW5kZWQ9bm93LnJlbGF0aXZlKGVuZGVkQXQpXHJcblx0XHRcdFx0aWYoZW5kZWQ+MCl7XHJcblx0XHRcdFx0XHRtZW1vcnkucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdFx0cmV0dXJuIFxyXG5cdFx0XHRcdH1lbHNlIGlmKGVuZGVkPT0wKXtcclxuXHRcdFx0XHRcdGFjdGl2ZS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGlmKHN0YXJ0ZWQhPW51bGwgJiYgZW5kZWQhPW51bGwgJiYgc3RhcnRlZD4wICYmIGVuZGVkPDApe1xyXG5cdFx0XHRcdGFjdGl2ZS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdC8vdW5jb25maXJtZWQgYXMgd2lzaFxyXG5cdFx0XHR3aXNoLnB1c2goam91cm5leSlcclxuXHRcdH0pXHJcblx0XHRyZXR1cm4ge21lbW9yeSwgd2lzaCwgYWN0aXZlfVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG5cclxuaW1wb3J0IHtDYXJkLCBDYXJkQWN0aW9ucywgQ2FyZEhlYWRlciwgQ2FyZE1lZGlhLCBDYXJkVGl0bGUsIENhcmRUZXh0fSBmcm9tICdtYXRlcmlhbC11aS9DYXJkJ1xyXG5pbXBvcnQge0ZsYXRCdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmNsYXNzIEpvdXJuZXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0aXRpbmVyYXJ5OltdLFxyXG5cdFx0Zm9vdHByaW50czpbXHJcblx0XHRcdHt3aGVuOm5ldyBEYXRlKERhdGUucGFyc2UoJzIwMTYtOC0xMCA4OjIzJykpLG5vdGU6IFwi5Ye65Y+R5LqGXCIscGhvdG86XCJodHRwOi8vd3d3Lmltbm90b2JzZXNzZWQuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy9jaGFybGl6ZS10aGVyb24yMDEyLTA1LTMwXzA4LTMwLTM4c3RvcHMtYnktdGhlLWNvbGJlcnQtcmVwb3J0LTQ5OXg4MDAuanBnXCJ9XHJcblx0XHRcdCx7d2hlbjpuZXcgRGF0ZShEYXRlLnBhcnNlKCcyMDE2LTgtMTQgMTI6NDUnKSksbm90ZTogXCJhbHBzXCIscGhvdG86XCJodHRwOi8vd3d3Lmltbm90b2JzZXNzZWQuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy9jaGFybGl6ZS10aGVyb24yMDEyLTA1LTMwXzA4LTMwLTM4c3RvcHMtYnktdGhlLWNvbGJlcnQtcmVwb3J0LTQ5OXg4MDAuanBnXCJ9XHJcblx0XHRcdCx7d2hlbjpuZXcgRGF0ZShEYXRlLnBhcnNlKCcyMDE2LTgtMjUgMzoyNCcpKSwgbm90ZTogXCLlsI/mnKjlsYtcIixwaG90bzpcImh0dHA6Ly93d3cuaW1ub3RvYnNlc3NlZC5jb20vd3AtY29udGVudC91cGxvYWRzL2NoYXJsaXplLXRoZXJvbjIwMTItMDUtMzBfMDgtMzAtMzhzdG9wcy1ieS10aGUtY29sYmVydC1yZXBvcnQtNDk5eDgwMC5qcGdcIn1cclxuXHRcdFx0LHt3aGVuOm5ldyBEYXRlKERhdGUucGFyc2UoJzIwMTYtOS00IDEzOjM0JykpLG5vdGU6IFwi5YeG5aSH5Zue5a62XCIscGhvdG86XCJodHRwOi8vd3d3Lmltbm90b2JzZXNzZWQuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy9jaGFybGl6ZS10aGVyb24yMDEyLTA1LTMwXzA4LTMwLTM4c3RvcHMtYnktdGhlLWNvbGJlcnQtcmVwb3J0LTQ5OXg4MDAuanBnXCJ9XHJcblx0XHRdXHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0bGV0IHtzdGFydGVkQXR9PXRoaXMucHJvcHMuam91cm5leVxyXG5cdFx0bGV0IHtmb290cHJpbnRzfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgY3VycmVudERhdGU9bnVsbCwgYWxsPVtdO1xyXG5cdFx0XHJcblx0XHRmb290cHJpbnRzLmZvckVhY2goZm9vdHByaW50PT57XHJcblx0XHRcdGNvbnN0IHt3aGVuLHBob3RvLG5vdGV9PWZvb3RwcmludFxyXG5cdFx0XHRpZihjdXJyZW50RGF0ZT09bnVsbCB8fCAhd2hlbi5pc1NhbWVEYXRlKGN1cnJlbnREYXRlKSl7XHJcblx0XHRcdFx0Y3VycmVudERhdGU9d2hlblxyXG5cdFx0XHRcdGxldCBkYXk9Y3VycmVudERhdGUucmVsYXRpdmUoc3RhcnRlZEF0KSsxXHJcblx0XHRcdFx0YWxsLnB1c2goPERheSBrZXk9e2RheX0gZGF5PXtkYXl9IGRhdGU9e2N1cnJlbnREYXRlfS8+KVxyXG5cdFx0XHR9XHJcblx0XHRcdGFsbC5wdXNoKDxGb290cHJpbnQga2V5PXt3aGVufSBkYXRhPXtmb290cHJpbnR9Lz4pXHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxyXG5cdFx0XHRcdDxUaXRsZSBqb3VybmV5PXt0aGlzLnByb3BzLmpvdXJuZXl9Lz5cclxuXHRcdFx0XHR7YWxsfVxyXG5cdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5pbXBvcnQgSWNvbkJ1dHRvbiBmcm9tICdtYXRlcmlhbC11aS9JY29uQnV0dG9uJztcclxuaW1wb3J0IEljb25Nb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodCc7XHJcbmNsYXNzIFRpdGxlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge25hbWV9PXRoaXMucHJvcHMuam91cm5leVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFN0ZXA+XHJcblx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPVwiKlwiPlxyXG5cdFx0XHRcdFx0PHNwYW4+e25hbWV9PC9zcGFuPjxJY29uTW9yZS8+XHJcblx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdDwvU3RlcD5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIERheSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkYXksZGF0ZX09dGhpcy5wcm9wc1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFN0ZXAgZGlzYWJsZWQ9e2ZhbHNlfT5cclxuXHRcdFx0XHQ8U3RlcExhYmVsIGljb249e2Ake2RheX1gfT5cclxuXHRcdFx0XHRcdHtkYXRlLnNtYXJ0Rm9ybWF0KFwi5LuK5aSpXCIpfVxyXG5cdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHQ8L1N0ZXA+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBGb290cHJpbnQgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7d2hlbixwaG90byxub3RlfT10aGlzLnByb3BzLmRhdGFcclxuXHRcdHJldHVybiAgKFxyXG5cdFx0XHQ8U3RlcCBjb21wbGV0ZWQ9e3RydWV9IGFjdGl2ZT17dHJ1ZX0+XHJcblx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPXtcIi5cIn0+XHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHQ8dGltZT57d2hlbi5mb3JtYXQoJ0hIOm1tJyl9PC90aW1lPi1cclxuXHRcdFx0XHRcdFx0PHNwYW4+e25vdGV9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PFN0ZXBDb250ZW50PlxyXG5cdFx0XHRcdFx0PHA+XHJcblx0XHRcdFx0XHRcdDxpbWcgc3R5bGU9e3toZWlnaHQ6MjUwfX0gc3JjPXtwaG90b30vPlxyXG5cdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdDwvU3RlcENvbnRlbnQ+XHJcblx0XHRcdDwvU3RlcD5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuIl19