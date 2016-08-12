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
			var _props$journey = this.props.journey;
			var startedAt = _props$journey.startedAt;
			var name = _props$journey.name;
			var footprints = this.state.footprints;

			var currentDate = null,
			    all = [];

			footprints.forEach(function (_ref3) {
				var when = _ref3.when;
				var photo = _ref3.photo;
				var note = _ref3.note;

				if (currentDate == null || !when.isSameDate(currentDate)) {
					currentDate = when;
					var day = currentDate.relative(startedAt) + 1;
					all.push(_react2.default.createElement(
						_Stepper.Step,
						{ key: day, disabled: false },
						_react2.default.createElement(
							_Stepper.StepLabel,
							{ icon: "" + day },
							currentDate.smartFormat("今天")
						)
					));
				}
				all.push(_react2.default.createElement(
					_Stepper.Step,
					{ key: when, completed: true, active: true },
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
				));
			});
			return _react2.default.createElement(
				_Stepper.Stepper,
				{ orientation: "vertical" },
				_react2.default.createElement(
					_Stepper.Step,
					null,
					_react2.default.createElement(
						_Stepper.StepLabel,
						{ icon: " " },
						name
					)
				),
				all
			);
		}
	}]);

	return Journey;
}(_react.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUFkLG9CQUFjO1FBQVIsa0JBQVE7O0FBQ3ZDLFFBQUcsZUFBYSxJQUFiLElBQXFCLENBQUMsS0FBSyxVQUFMLENBQWdCLFdBQWhCLENBQUQsRUFBOEI7QUFDckQsbUJBQVksSUFBWixDQURxRDtBQUVyRCxTQUFJLE1BQUksWUFBWSxRQUFaLENBQXFCLFNBQXJCLElBQWdDLENBQWhDLENBRjZDO0FBR3JELFNBQUksSUFBSixDQUFTOztRQUFNLEtBQUssR0FBTCxFQUFVLFVBQVUsS0FBVixFQUFoQjtNQUNQOztTQUFXLFdBQVMsR0FBVCxFQUFYO09BQ0UsWUFBWSxXQUFaLENBQXdCLElBQXhCLENBREY7T0FETztNQUFULEVBSHFEO0tBQXREO0FBU0EsUUFBSSxJQUFKLENBQ0M7O09BQU0sS0FBSyxJQUFMLEVBQVcsV0FBVyxJQUFYLEVBQWlCLFFBQVEsSUFBUixFQUFsQztLQUNDOztRQUFXLE1BQU0sR0FBTixFQUFYO01BQ0M7OztPQUNDOzs7UUFBTyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQVA7UUFERDs7T0FFQzs7O1FBQU8sSUFBUDtRQUZEO09BREQ7TUFERDtLQU9DOzs7TUFDQzs7O09BQ0MsdUNBQUssT0FBTyxFQUFDLFFBQU8sR0FBUCxFQUFSLEVBQXFCLEtBQUssS0FBTCxFQUExQixDQUREO09BREQ7TUFQRDtLQURELEVBVnVDO0lBQXJCLENBQW5CLENBTE87QUErQlAsVUFDQzs7TUFBUyxhQUFZLFVBQVosRUFBVDtJQUNDOzs7S0FDQzs7UUFBVyxNQUFLLEdBQUwsRUFBWDtNQUFxQixJQUFyQjtNQUREO0tBREQ7SUFJRSxHQUpGO0lBREQsQ0EvQk87Ozs7UUFWSCIsImZpbGUiOiJsaWZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtcclxuICBTdGVwLFxyXG4gIFN0ZXBwZXIsXHJcbiAgU3RlcExhYmVsLFxyXG4gIFN0ZXBDb250ZW50LFxyXG59IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXHJcbmltcG9ydCBMb2dvIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL2RpcmVjdGlvbnMtd2FsaydcclxuaW1wb3J0IEljb25QdWJsaXNoIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIlxyXG5cclxuY29uc3Qge0VtcHR5fT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0am91cm5leXM6W1xyXG5cdFx0XHR7bmFtZTpcIlRpYmV0LCB0aGUgRXZlcmVzdFwiLCBzdGFydGVkQXQ6IG5ldyBEYXRlKERhdGUucGFyc2UoXCIyMDEyLTktMTJcIikpLCBlbmRlZEF0Om5ldyBEYXRlKERhdGUucGFyc2UoXCIyMDEyLTktMjdcIikpLCBzdGF0dXM6XCJib29rXCJ9XHJcblx0XHRcdCx7bmFtZTpcIuWwvOaziuWwlE1CQ1wiLCBzdGFydGVkQXQ6IG5ldyBEYXRlKERhdGUucGFyc2UoXCIyMDE0LTktMTJcIikpLCBlbmRlZEF0Om5ldyBEYXRlKERhdGUucGFyc2UoXCIyMDE0LTktMjdcIikpLCBzdGF0dXM6XCJtZW1vcnlcIn1cclxuXHRcdFx0LHtuYW1lOlwiQWxwcyBXYWxrZXIncyBIYXV0ZSBSb3V0ZVwiLCBzdGFydGVkQXQ6IG5ldyBEYXRlKERhdGUucGFyc2UoXCIyMDE2LTgtMTBcIikpLCBlbmRlZEF0Om5ldyBEYXRlKERhdGUucGFyc2UoXCIyMDE2LTktMjdcIikpLCBzdGF0dXM6XCJ3aXNoXCJ9XHJcblx0XHRcdCx7bmFtZTpcIk5ldyBaZXJsYW5kXCIsIHN0YXJ0ZWRBdDogbmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTctOC0xMFwiKSksIGVuZGVkQXQ6bmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTctOS0yN1wiKSksIHN0YXR1czpcIndpc2hcIn1cclxuXHRcdFx0LHtuYW1lOlwiTmViYWxcIiwgc3RhcnRlZEF0OiBuZXcgRGF0ZShEYXRlLnBhcnNlKFwiMjAxOC04LTEwXCIpKSwgZW5kZWRBdDpuZXcgRGF0ZShEYXRlLnBhcnNlKFwiMjAxOC05LTI3XCIpKSwgc3RhdHVzOlwid2lzaFwifVxyXG5cdFx0XHRdLFxyXG5cdFx0c2hvd0hpc3Rvcnk6ZmFsc2VcclxuXHR9XHJcblx0XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7am91cm5leXMsIHNob3dIaXN0b3J5fT10aGlzLnN0YXRlXHJcblx0XHRjb25zdCB7bWVtb3J5LCB3aXNoLCBhY3RpdmV9PXRoaXMuZ3JvdXAoam91cm5leXMpXHJcblx0XHRsZXQgcHVibGlzaGVyPW51bGxcclxuXHRcdFxyXG5cdFx0aWYobWVtb3J5Lmxlbmd0aCB8fCBhY3RpdmUubGVuZ3RoKXtcclxuXHRcdFx0cHVibGlzaGVyPShcclxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJmbG9hdGluZyBzdGlja3kgdG9wIHJpZ2h0XCJcclxuXHRcdFx0XHRcdG1pbmk9e3RydWV9IG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcInB1Ymxpc2hcIix7am91cm5leTphY3RpdmVbMF19KX0+XHJcblx0XHRcdFx0XHQ8SWNvblB1Ymxpc2gvPiRcclxuXHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0PGRpdj5cclxuXHRcdFx0e3B1Ymxpc2hlcn1cclxuXHRcdFx0e3Nob3dIaXN0b3J5ICYmIG1lbW9yeS5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBhY3RpdmVTdGVwPXstMX0+XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bWVtb3J5Lm1hcCgoe25hbWUsIHN0YXJ0ZWRBdH0pPT4oXHJcblx0XHRcdFx0XHRcdDxTdGVwIGtleT17bmFtZX0gY29tcGxldGVkPXt0cnVlfT5cclxuXHRcdFx0XHRcdFx0XHQ8U3RlcExhYmVsPjxkaXY+e3N0YXJ0ZWRBdC5zbWFydEZvcm1hdCgpfTxici8+e25hbWV9PC9kaXY+PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0XHRcdCkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdDwvU3RlcHBlcj5cclxuXHRcdFx0KXx8bnVsbH1cclxuXHRcdFx0XHJcblx0XHRcdHthY3RpdmUubGVuZ3RoICYmIChcclxuXHRcdFx0XHRhY3RpdmUubWFwKGpvdXJuZXk9PihcclxuXHRcdFx0XHRcdDxKb3VybmV5IGpvdXJuZXk9e2pvdXJuZXl9Lz5cclxuXHRcdFx0XHQpKVxyXG5cdFx0XHQpfHxudWxsfVxyXG5cdFx0XHRcclxuXHRcdFx0e3dpc2gubGVuZ3RoICYmIChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PEVtcHR5IGljb249ezxMb2dvLz59PmdvLCBtb3JlIGpvdXJuZXk8L0VtcHR5PlxyXG5cdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfSBsaW5lYXI9e2ZhbHNlfT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0d2lzaC5tYXAoKHtuYW1lLCBzdGFydGVkQXR9KT0+KFxyXG5cdFx0XHRcdFx0XHRcdDxTdGVwIGtleT17bmFtZX0gY29tcGxldGVkPXtmYWxzZX0+XHJcblx0XHRcdFx0XHRcdFx0XHQ8U3RlcExhYmVsIGljb249XCIgXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0e3N0YXJ0ZWRBdC5zbWFydEZvcm1hdCgpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxici8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0e25hbWV9XHJcblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHRcdFx0XHQpKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpfHwoPEVtcHR5IGljb249ezxMb2dvLz59PuadpSzlvIDlp4vkvaDnmoTlv4Pml4XnqIs8L0VtcHR5Pil9XHJcblx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0Z3JvdXAoam91cm5leXMpe1xyXG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRsZXQgbWVtb3J5PVtdLCB3aXNoPVtdLCBhY3RpdmU9W11cclxuXHRcdGpvdXJuZXlzLmZvckVhY2goam91cm5leT0+e1xyXG5cdFx0XHRsZXQge3N0YXJ0ZWRBdCwgZW5kZWRBdH09am91cm5leVxyXG5cdFx0XHRsZXQgc3RhcnRlZD1udWxsLCBlbmRlZD1udWxsXHJcblx0XHRcdFxyXG5cdFx0XHRpZihzdGFydGVkQXQpe1xyXG5cdFx0XHRcdHN0YXJ0ZWQ9bm93LnJlbGF0aXZlKHN0YXJ0ZWRBdClcclxuXHRcdFx0XHRpZihzdGFydGVkPDApe1xyXG5cdFx0XHRcdFx0d2lzaC5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHR9ZWxzZSBpZihzdGFydGVkPT0wKXtcclxuXHRcdFx0XHRcdGFjdGl2ZS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGlmKGVuZGVkQXQpe1xyXG5cdFx0XHRcdGVuZGVkPW5vdy5yZWxhdGl2ZShlbmRlZEF0KVxyXG5cdFx0XHRcdGlmKGVuZGVkPjApe1xyXG5cdFx0XHRcdFx0bWVtb3J5LnB1c2goam91cm5leSlcclxuXHRcdFx0XHRcdHJldHVybiBcclxuXHRcdFx0XHR9ZWxzZSBpZihlbmRlZD09MCl7XHJcblx0XHRcdFx0XHRhY3RpdmUucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZihzdGFydGVkIT1udWxsICYmIGVuZGVkIT1udWxsICYmIHN0YXJ0ZWQ+MCAmJiBlbmRlZDwwKXtcclxuXHRcdFx0XHRhY3RpdmUucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHQvL3VuY29uZmlybWVkIGFzIHdpc2hcclxuXHRcdFx0d2lzaC5wdXNoKGpvdXJuZXkpXHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHttZW1vcnksIHdpc2gsIGFjdGl2ZX1cclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCB7Q2FyZCwgQ2FyZEFjdGlvbnMsIENhcmRIZWFkZXIsIENhcmRNZWRpYSwgQ2FyZFRpdGxlLCBDYXJkVGV4dH0gZnJvbSAnbWF0ZXJpYWwtdWkvQ2FyZCdcclxuaW1wb3J0IHtGbGF0QnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5jbGFzcyBKb3VybmV5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtcclxuXHRcdGl0aW5lcmFyeTpbXSxcclxuXHRcdGZvb3RwcmludHM6W1xyXG5cdFx0XHR7d2hlbjpuZXcgRGF0ZShEYXRlLnBhcnNlKCcyMDE2LTgtMTAgODoyMycpKSxub3RlOiBcIuWHuuWPkeS6hlwiLHBob3RvOlwiaHR0cDovL3d3dy5pbW5vdG9ic2Vzc2VkLmNvbS93cC1jb250ZW50L3VwbG9hZHMvY2hhcmxpemUtdGhlcm9uMjAxMi0wNS0zMF8wOC0zMC0zOHN0b3BzLWJ5LXRoZS1jb2xiZXJ0LXJlcG9ydC00OTl4ODAwLmpwZ1wifVxyXG5cdFx0XHQse3doZW46bmV3IERhdGUoRGF0ZS5wYXJzZSgnMjAxNi04LTE0IDEyOjQ1JykpLG5vdGU6IFwiYWxwc1wiLHBob3RvOlwiaHR0cDovL3d3dy5pbW5vdG9ic2Vzc2VkLmNvbS93cC1jb250ZW50L3VwbG9hZHMvY2hhcmxpemUtdGhlcm9uMjAxMi0wNS0zMF8wOC0zMC0zOHN0b3BzLWJ5LXRoZS1jb2xiZXJ0LXJlcG9ydC00OTl4ODAwLmpwZ1wifVxyXG5cdFx0XHQse3doZW46bmV3IERhdGUoRGF0ZS5wYXJzZSgnMjAxNi04LTI1IDM6MjQnKSksIG5vdGU6IFwi5bCP5pyo5bGLXCIscGhvdG86XCJodHRwOi8vd3d3Lmltbm90b2JzZXNzZWQuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy9jaGFybGl6ZS10aGVyb24yMDEyLTA1LTMwXzA4LTMwLTM4c3RvcHMtYnktdGhlLWNvbGJlcnQtcmVwb3J0LTQ5OXg4MDAuanBnXCJ9XHJcblx0XHRcdCx7d2hlbjpuZXcgRGF0ZShEYXRlLnBhcnNlKCcyMDE2LTktNCAxMzozNCcpKSxub3RlOiBcIuWHhuWkh+WbnuWutlwiLHBob3RvOlwiaHR0cDovL3d3dy5pbW5vdG9ic2Vzc2VkLmNvbS93cC1jb250ZW50L3VwbG9hZHMvY2hhcmxpemUtdGhlcm9uMjAxMi0wNS0zMF8wOC0zMC0zOHN0b3BzLWJ5LXRoZS1jb2xiZXJ0LXJlcG9ydC00OTl4ODAwLmpwZ1wifVxyXG5cdFx0XVxyXG5cdH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCB7c3RhcnRlZEF0LG5hbWV9PXRoaXMucHJvcHMuam91cm5leVxyXG5cdFx0bGV0IHtmb290cHJpbnRzfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgY3VycmVudERhdGU9bnVsbCwgYWxsPVtdO1xyXG5cdFx0XHJcblx0XHRmb290cHJpbnRzLmZvckVhY2goKHt3aGVuLHBob3RvLG5vdGV9KT0+e1xyXG5cdFx0XHRpZihjdXJyZW50RGF0ZT09bnVsbCB8fCAhd2hlbi5pc1NhbWVEYXRlKGN1cnJlbnREYXRlKSl7XHJcblx0XHRcdFx0Y3VycmVudERhdGU9d2hlblxyXG5cdFx0XHRcdGxldCBkYXk9Y3VycmVudERhdGUucmVsYXRpdmUoc3RhcnRlZEF0KSsxXHJcblx0XHRcdFx0YWxsLnB1c2goPFN0ZXAga2V5PXtkYXl9IGRpc2FibGVkPXtmYWxzZX0+XHJcblx0XHRcdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj17YCR7ZGF5fWB9PlxyXG5cdFx0XHRcdFx0XHRcdHtjdXJyZW50RGF0ZS5zbWFydEZvcm1hdChcIuS7iuWkqVwiKX1cclxuXHRcdFx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0XHQ8L1N0ZXA+KVxyXG5cdFx0XHR9XHJcblx0XHRcdGFsbC5wdXNoKFxyXG5cdFx0XHRcdDxTdGVwIGtleT17d2hlbn0gY29tcGxldGVkPXt0cnVlfSBhY3RpdmU9e3RydWV9PlxyXG5cdFx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPXtcIi5cIn0+XHJcblx0XHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdFx0PHRpbWU+e3doZW4uZm9ybWF0KCdISDptbScpfTwvdGltZT4tXHJcblx0XHRcdFx0XHRcdFx0PHNwYW4+e25vdGV9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0PFN0ZXBDb250ZW50PlxyXG5cdFx0XHRcdFx0XHQ8cD5cclxuXHRcdFx0XHRcdFx0XHQ8aW1nIHN0eWxlPXt7aGVpZ2h0OjI1MH19IHNyYz17cGhvdG99Lz5cclxuXHRcdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdFx0PC9TdGVwQ29udGVudD5cclxuXHRcdFx0XHQ8L1N0ZXA+XHJcblx0XHRcdClcclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+XHJcblx0XHRcdFx0PFN0ZXA+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsIGljb249XCIgXCI+e25hbWV9PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHRcdHthbGx9XHJcblx0XHRcdDwvU3RlcHBlcj5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuIl19