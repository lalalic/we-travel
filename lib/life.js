"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _moreHoriz = require("material-ui/svg-icons/navigation/more-horiz");

var _moreHoriz2 = _interopRequireDefault(_moreHoriz);

var _add = require("material-ui/svg-icons/content/add");

var _add2 = _interopRequireDefault(_add);

var _db = require("./db");

var _chipper = require("./components/chipper");

var _chipper2 = _interopRequireDefault(_chipper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;
var Photo = _qiliApp.UI.Photo;

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
						className: "floating sticky bottom right",
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
				_react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "floating sticky top right",
						mini: true, onClick: function onClick(e) {
							return _this2.context.router.push("journey/_new");
						} },
					_react2.default.createElement(_add2.default, null)
				),
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
					return _react2.default.createElement(Journey, { key: journey, journey: journey });
				}) || null,
				wish.length && _react2.default.createElement(
					"div",
					null,
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
			var _this4 = this;

			var startedAt = this.props.journey.startedAt;
			var _state2 = this.state;
			var footprints = _state2.footprints;
			var editing = _state2.editing;

			var currentDate = null,
			    lastDay = 0,
			    all = [];

			footprints.forEach(function (footprint) {
				var when = footprint.when;
				var photo = footprint.photo;
				var note = footprint.note;

				if (currentDate == null || !when.isSameDate(currentDate)) {
					currentDate = when;
					var day = currentDate.relative(startedAt) + 1;

					var _loop = function _loop() {
						lastDay++;
						var date = startedAt.relativeDate(lastDay - 1);
						all.push(_react2.default.createElement(Day, { key: lastDay, day: lastDay,
							date: date,
							onEdit: function onEdit(a) {
								return _this4.setState({ editing: { when: date } });
							} }));
					};

					while (lastDay < day) {
						_loop();
					}
				}
				all.push(_react2.default.createElement(Footprint, { key: when, data: footprint,
					onEdit: function onEdit(a) {
						return _this4.setState({ editing: footprint });
					} }));
			});
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_Stepper.Stepper,
					{ orientation: "vertical" },
					_react2.default.createElement(Title, { journey: this.props.journey }),
					all
				),
				editing && _react2.default.createElement(Editor, { footprint: editing,
					onSave: function onSave(a) {
						return _this4.onSave(a);
					},
					onCancel: function onCancel(a) {
						return _this4.setState({ editing: undefined });
					} })
			);
		}
	}, {
		key: "onSave",
		value: function onSave(footprint) {
			var journey = this.props.journey;

			_db.Journey.upsert(footprint).then(function (a) {
				_db.Journey.emit("footprint.changed");
			});
		}
	}]);

	return Journey;
}(_react.Component);

var Editor = function (_Component3) {
	_inherits(Editor, _Component3);

	function Editor() {
		_classCallCheck(this, Editor);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).apply(this, arguments));
	}

	_createClass(Editor, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var footprint = _props.footprint;
			var onSave = _props.onSave;
			var onCancel = _props.onCancel;

			var actions = [_react2.default.createElement(_materialUi.FlatButton, {
				label: "关闭",
				primary: false,
				onTouchTap: onCancel
			}), _react2.default.createElement(_materialUi.FlatButton, {
				label: "保存",
				primary: true,
				onTouchTap: onSave
			})];

			var note = footprint.note;
			var _footprint$photos = footprint.photos;
			var photos = _footprint$photos === undefined ? [] : _footprint$photos;
			var styles = { iconRatio: 2 / 3, iconSize: { width: 50, height: 50 } };
			var i = 0;
			var uiPhotos = photos.map(function (photo) {
				var _this6 = this;

				return _react2.default.createElement(Photo, _extends({ key: photo }, styles, {
					onPhoto: function onPhoto(url) {
						return _this6.onPhoto(url, i++);
					},
					src: photo }));
			});

			if (uiPhotos.length < 9) uiPhotos.push(_react2.default.createElement(Photo, _extends({}, styles, { onPhoto: this.onPhoto.bind(this), key: Date.now() })));

			return _react2.default.createElement(
				_materialUi.Dialog,
				{ title: footprint.when.smartFormat(),
					actions: actions,
					modal: false,
					open: true,
					onRequestClose: onCancel },
				_react2.default.createElement(
					"div",
					{ className: "section" },
					_react2.default.createElement(
						"div",
						{ style: { textAlign: "center" } },
						uiPhotos
					),
					_react2.default.createElement("textarea", {
						style: { width: "100%", border: 0, height: 100, fontSize: 12, paddingTop: 5, borderTop: "1px dotted lightgray" },
						placeholder: "这一刻的想法",
						defaultValue: footprint.note }),
					_react2.default.createElement(_chipper2.default, { chips: ["早餐", "午餐", "晚餐", "购物", "门票", "公交", "飞机", "的士", { label: "特色交通" }, { label: "特色吃的" }, { label: "花销", type: "number" }] }),
					_react2.default.createElement(_chipper2.default, { chips: ["太美了", "无法呼吸", "太壮观了", "喜欢这里"] })
				)
			);
		}
	}, {
		key: "onPhoto",
		value: function onPhoto(url, index) {
			var footprint = this.props.footprint;

			if (footprint.photos.indexOf(url) != -1) {
				this.forceUpdate();
				return;
			}

			if (index != undefined) footprint.photos.splice(index, 1, url);else {
				footprint.photos.push(url);
				this.forceUpdate();
			}
		}
	}]);

	return Editor;
}(_react.Component);

var Title = function (_Component4) {
	_inherits(Title, _Component4);

	function Title() {
		_classCallCheck(this, Title);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
	}

	_createClass(Title, [{
		key: "render",
		value: function render() {
			var _this8 = this;

			var _props2 = this.props;
			var journey = _props2.journey;
			var onEdit = _props2.onEdit;
			var name = journey.name;
			var _id = journey._id;

			return _react2.default.createElement(
				_Stepper.Step,
				null,
				_react2.default.createElement(
					_Stepper.StepLabel,
					{ icon: "*", onTouchTap: function onTouchTap(e) {
							return _this8.context.router.push("journey/" + _id, { journey: journey });
						} },
					_react2.default.createElement(
						"span",
						null,
						name
					),
					_react2.default.createElement(_moreHoriz2.default, null)
				)
			);
		}
	}]);

	return Title;
}(_react.Component);

Title.contextTypes = {
	router: _react.PropTypes.object
};

var Day = function (_Component5) {
	_inherits(Day, _Component5);

	function Day() {
		_classCallCheck(this, Day);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Day).apply(this, arguments));
	}

	_createClass(Day, [{
		key: "render",
		value: function render() {
			var _props3 = this.props;
			var day = _props3.day;
			var date = _props3.date;
			var onEdit = _props3.onEdit;

			return _react2.default.createElement(
				_Stepper.Step,
				{ disabled: false },
				_react2.default.createElement(
					_Stepper.StepLabel,
					{ icon: "" + day, onTouchTap: onEdit },
					_react2.default.createElement(
						"span",
						null,
						date.smartFormat("今天")
					),
					_react2.default.createElement(_moreHoriz2.default, null)
				)
			);
		}
	}]);

	return Day;
}(_react.Component);

var Footprint = function (_Component6) {
	_inherits(Footprint, _Component6);

	function Footprint() {
		_classCallCheck(this, Footprint);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Footprint).apply(this, arguments));
	}

	_createClass(Footprint, [{
		key: "render",
		value: function render() {
			var _props4 = this.props;
			var _props4$data = _props4.data;
			var when = _props4$data.when;
			var photo = _props4$data.photo;
			var note = _props4$data.note;
			var onEdit = _props4.onEdit;

			return _react2.default.createElement(
				_Stepper.Step,
				{ completed: true, active: true },
				_react2.default.createElement(
					_Stepper.StepLabel,
					{ icon: ".", onTouchTap: onEdit },
					_react2.default.createElement(
						"time",
						null,
						when.format('HH:mm'),
						" "
					),
					_react2.default.createElement(
						"span",
						null,
						note
					),
					_react2.default.createElement(_moreHoriz2.default, null)
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
//# sourceMappingURL=data:application/json;base64,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RUFBaUIsUUFBUSxJQUFSLEVBQXZCO0lBQ0M7O09BQVcsTUFBTSxHQUFOLEVBQVcsWUFBWSxNQUFaLEVBQXRCO0tBQ0M7OztNQUFPLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBUDs7TUFERDtLQUVDOzs7TUFBTyxJQUFQO01BRkQ7S0FHQyx3REFIRDtLQUREO0lBTUM7OztLQUNDOzs7TUFDQyx1Q0FBSyxPQUFPLEVBQUMsUUFBTyxHQUFQLEVBQVIsRUFBcUIsS0FBSyxLQUFMLEVBQTFCLENBREQ7TUFERDtLQU5EO0lBREQsQ0FGTzs7OztRQURIIiwiZmlsZSI6ImxpZmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLCBGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b24sIEljb25CdXR0b24sIERpYWxvZ30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtTdGVwLFN0ZXBwZXIsU3RlcExhYmVsLFN0ZXBDb250ZW50fSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xyXG5cclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBJY29uTW9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLWhvcml6J1xyXG5pbXBvcnQgSWNvbkFkZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQnXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBGb290cHJpbnQgYXMgRm9vdHByaW50REJ9IGZyb20gXCIuL2RiXCJcclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jaGlwcGVyXCJcclxuXHJcbmNvbnN0IHtFbXB0eSwgUGhvdG99PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRqb3VybmV5czpbXHJcblx0XHRcdHtuYW1lOlwiVGliZXQsIHRoZSBFdmVyZXN0XCIsIHN0YXJ0ZWRBdDogbmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTItOS0xMlwiKSksIGVuZGVkQXQ6bmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTItOS0yN1wiKSksIHN0YXR1czpcImJvb2tcIn1cclxuXHRcdFx0LHtuYW1lOlwi5bC85rOK5bCUTUJDXCIsIHN0YXJ0ZWRBdDogbmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTQtOS0xMlwiKSksIGVuZGVkQXQ6bmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTQtOS0yN1wiKSksIHN0YXR1czpcIm1lbW9yeVwifVxyXG5cdFx0XHQse25hbWU6XCJBbHBzIFdhbGtlcidzIEhhdXRlIFJvdXRlXCIsIHN0YXJ0ZWRBdDogbmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTYtOC0xMFwiKSksIGVuZGVkQXQ6bmV3IERhdGUoRGF0ZS5wYXJzZShcIjIwMTYtOS0yN1wiKSksIHN0YXR1czpcIndpc2hcIn1cclxuXHRcdFx0LHtuYW1lOlwiTmV3IFplcmxhbmRcIiwgc3RhcnRlZEF0OiBuZXcgRGF0ZShEYXRlLnBhcnNlKFwiMjAxNy04LTEwXCIpKSwgZW5kZWRBdDpuZXcgRGF0ZShEYXRlLnBhcnNlKFwiMjAxNy05LTI3XCIpKSwgc3RhdHVzOlwid2lzaFwifVxyXG5cdFx0XHQse25hbWU6XCJOZWJhbFwiLCBzdGFydGVkQXQ6IG5ldyBEYXRlKERhdGUucGFyc2UoXCIyMDE4LTgtMTBcIikpLCBlbmRlZEF0Om5ldyBEYXRlKERhdGUucGFyc2UoXCIyMDE4LTktMjdcIikpLCBzdGF0dXM6XCJ3aXNoXCJ9XHJcblx0XHRcdF0sXHJcblx0XHRzaG93SGlzdG9yeTpmYWxzZVxyXG5cdH1cclxuXHRcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtqb3VybmV5cywgc2hvd0hpc3Rvcnl9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHttZW1vcnksIHdpc2gsIGFjdGl2ZX09dGhpcy5ncm91cChqb3VybmV5cylcclxuXHRcdGxldCBwdWJsaXNoZXI9bnVsbFxyXG5cdFx0XHJcblx0XHRpZihtZW1vcnkubGVuZ3RoIHx8IGFjdGl2ZS5sZW5ndGgpe1xyXG5cdFx0XHRwdWJsaXNoZXI9KFxyXG5cdFx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSBib3R0b20gcmlnaHRcIlxyXG5cdFx0XHRcdFx0bWluaT17dHJ1ZX0gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwicHVibGlzaFwiLHtqb3VybmV5OmFjdGl2ZVswXX0pfT5cclxuXHRcdFx0XHRcdDxJY29uUHVibGlzaC8+JFxyXG5cdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHtwdWJsaXNoZXJ9XHJcblx0XHRcdFxyXG5cdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gXHJcblx0XHRcdFx0Y2xhc3NOYW1lPVwiZmxvYXRpbmcgc3RpY2t5IHRvcCByaWdodFwiXHJcblx0XHRcdFx0bWluaT17dHJ1ZX0gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwiam91cm5leS9fbmV3XCIpfT5cclxuXHRcdFx0XHQ8SWNvbkFkZC8+XHJcblx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblx0XHRcdFxyXG5cdFx0XHR7c2hvd0hpc3RvcnkgJiYgbWVtb3J5Lmxlbmd0aCAmJiAoXHJcblx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRtZW1vcnkubWFwKCh7bmFtZSwgc3RhcnRlZEF0fSk9PihcclxuXHRcdFx0XHRcdFx0PFN0ZXAga2V5PXtuYW1lfSBjb21wbGV0ZWQ9e3RydWV9PlxyXG5cdFx0XHRcdFx0XHRcdDxTdGVwTGFiZWw+PGRpdj57c3RhcnRlZEF0LnNtYXJ0Rm9ybWF0KCl9PGJyLz57bmFtZX08L2Rpdj48L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHRcdFx0KSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHQpfHxudWxsfVxyXG5cdFx0XHRcclxuXHRcdFx0e2FjdGl2ZS5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdGFjdGl2ZS5tYXAoam91cm5leT0+KFxyXG5cdFx0XHRcdFx0PEpvdXJuZXkga2V5PXtqb3VybmV5fSBqb3VybmV5PXtqb3VybmV5fS8+XHJcblx0XHRcdFx0KSlcclxuXHRcdFx0KXx8bnVsbH1cclxuXHRcdFx0XHJcblx0XHRcdHt3aXNoLmxlbmd0aCAmJiAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBhY3RpdmVTdGVwPXstMX0gbGluZWFyPXtmYWxzZX0+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHdpc2gubWFwKCh7bmFtZSwgc3RhcnRlZEF0fSk9PihcclxuXHRcdFx0XHRcdFx0XHQ8U3RlcCBrZXk9e25hbWV9IGNvbXBsZXRlZD17ZmFsc2V9PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPVwiIFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtzdGFydGVkQXQuc21hcnRGb3JtYXQoKX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8YnIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtuYW1lfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0XHRcdFx0KSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdDwvU3RlcHBlcj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KXx8KDxFbXB0eSBpY29uPXs8TG9nby8+fT7mnaUs5byA5aeL5L2g55qE5b+D5peF56iLPC9FbXB0eT4pfVxyXG5cdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdGdyb3VwKGpvdXJuZXlzKXtcclxuXHRcdGxldCBub3c9bmV3IERhdGUoKVxyXG5cdFx0bGV0IG1lbW9yeT1bXSwgd2lzaD1bXSwgYWN0aXZlPVtdXHJcblx0XHRqb3VybmV5cy5mb3JFYWNoKGpvdXJuZXk9PntcclxuXHRcdFx0bGV0IHtzdGFydGVkQXQsIGVuZGVkQXR9PWpvdXJuZXlcclxuXHRcdFx0bGV0IHN0YXJ0ZWQ9bnVsbCwgZW5kZWQ9bnVsbFxyXG5cdFx0XHRcclxuXHRcdFx0aWYoc3RhcnRlZEF0KXtcclxuXHRcdFx0XHRzdGFydGVkPW5vdy5yZWxhdGl2ZShzdGFydGVkQXQpXHJcblx0XHRcdFx0aWYoc3RhcnRlZDwwKXtcclxuXHRcdFx0XHRcdHdpc2gucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fWVsc2UgaWYoc3RhcnRlZD09MCl7XHJcblx0XHRcdFx0XHRhY3RpdmUucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZihlbmRlZEF0KXtcclxuXHRcdFx0XHRlbmRlZD1ub3cucmVsYXRpdmUoZW5kZWRBdClcclxuXHRcdFx0XHRpZihlbmRlZD4wKXtcclxuXHRcdFx0XHRcdG1lbW9yeS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdFx0XHRyZXR1cm4gXHJcblx0XHRcdFx0fWVsc2UgaWYoZW5kZWQ9PTApe1xyXG5cdFx0XHRcdFx0YWN0aXZlLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYoc3RhcnRlZCE9bnVsbCAmJiBlbmRlZCE9bnVsbCAmJiBzdGFydGVkPjAgJiYgZW5kZWQ8MCl7XHJcblx0XHRcdFx0YWN0aXZlLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0Ly91bmNvbmZpcm1lZCBhcyB3aXNoXHJcblx0XHRcdHdpc2gucHVzaChqb3VybmV5KVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiB7bWVtb3J5LCB3aXNoLCBhY3RpdmV9XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBKb3VybmV5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtcclxuXHRcdGl0aW5lcmFyeTpbXSxcclxuXHRcdGZvb3RwcmludHM6W1xyXG5cdFx0XHR7d2hlbjpuZXcgRGF0ZShEYXRlLnBhcnNlKCcyMDE2LTgtMTAgODoyMycpKSxub3RlOiBcIuWHuuWPkeS6hlwiLHBob3RvOlwiaHR0cDovL3d3dy5pbW5vdG9ic2Vzc2VkLmNvbS93cC1jb250ZW50L3VwbG9hZHMvY2hhcmxpemUtdGhlcm9uMjAxMi0wNS0zMF8wOC0zMC0zOHN0b3BzLWJ5LXRoZS1jb2xiZXJ0LXJlcG9ydC00OTl4ODAwLmpwZ1wifVxyXG5cdFx0XHQse3doZW46bmV3IERhdGUoRGF0ZS5wYXJzZSgnMjAxNi04LTE0IDEyOjQ1JykpLG5vdGU6IFwiYWxwc1wiLHBob3RvOlwiaHR0cDovL3d3dy5pbW5vdG9ic2Vzc2VkLmNvbS93cC1jb250ZW50L3VwbG9hZHMvY2hhcmxpemUtdGhlcm9uMjAxMi0wNS0zMF8wOC0zMC0zOHN0b3BzLWJ5LXRoZS1jb2xiZXJ0LXJlcG9ydC00OTl4ODAwLmpwZ1wifVxyXG5cdFx0XHQse3doZW46bmV3IERhdGUoRGF0ZS5wYXJzZSgnMjAxNi04LTI1IDM6MjQnKSksIG5vdGU6IFwi5bCP5pyo5bGLXCIscGhvdG86XCJodHRwOi8vd3d3Lmltbm90b2JzZXNzZWQuY29tL3dwLWNvbnRlbnQvdXBsb2Fkcy9jaGFybGl6ZS10aGVyb24yMDEyLTA1LTMwXzA4LTMwLTM4c3RvcHMtYnktdGhlLWNvbGJlcnQtcmVwb3J0LTQ5OXg4MDAuanBnXCJ9XHJcblx0XHRcdCx7d2hlbjpuZXcgRGF0ZShEYXRlLnBhcnNlKCcyMDE2LTktNCAxMzozNCcpKSxub3RlOiBcIuWHhuWkh+WbnuWutlwiLHBob3RvOlwiaHR0cDovL3d3dy5pbW5vdG9ic2Vzc2VkLmNvbS93cC1jb250ZW50L3VwbG9hZHMvY2hhcmxpemUtdGhlcm9uMjAxMi0wNS0zMF8wOC0zMC0zOHN0b3BzLWJ5LXRoZS1jb2xiZXJ0LXJlcG9ydC00OTl4ODAwLmpwZ1wifVxyXG5cdFx0XVxyXG5cdH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCB7c3RhcnRlZEF0fT10aGlzLnByb3BzLmpvdXJuZXlcclxuXHRcdGxldCB7Zm9vdHByaW50cywgZWRpdGluZ309dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IGN1cnJlbnREYXRlPW51bGwsIGxhc3REYXk9MCwgYWxsPVtdO1xyXG5cdFx0XHJcblx0XHRmb290cHJpbnRzLmZvckVhY2goZm9vdHByaW50PT57XHJcblx0XHRcdGNvbnN0IHt3aGVuLHBob3RvLG5vdGV9PWZvb3RwcmludFxyXG5cdFx0XHRpZihjdXJyZW50RGF0ZT09bnVsbCB8fCAhd2hlbi5pc1NhbWVEYXRlKGN1cnJlbnREYXRlKSl7XHJcblx0XHRcdFx0Y3VycmVudERhdGU9d2hlblxyXG5cdFx0XHRcdGxldCBkYXk9Y3VycmVudERhdGUucmVsYXRpdmUoc3RhcnRlZEF0KSsxXHJcblx0XHRcdFx0d2hpbGUobGFzdERheTxkYXkpe1xyXG5cdFx0XHRcdFx0bGFzdERheSsrXHJcblx0XHRcdFx0XHRsZXQgZGF0ZT1zdGFydGVkQXQucmVsYXRpdmVEYXRlKGxhc3REYXktMSlcclxuXHRcdFx0XHRcdGFsbC5wdXNoKDxEYXkga2V5PXtsYXN0RGF5fSBkYXk9e2xhc3REYXl9IFxyXG5cdFx0XHRcdFx0XHRkYXRlPXtkYXRlfVxyXG5cdFx0XHRcdFx0XHRvbkVkaXQ9e2E9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6e3doZW46ZGF0ZX19KX0vPilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0YWxsLnB1c2goPEZvb3RwcmludCBrZXk9e3doZW59IGRhdGE9e2Zvb3RwcmludH0gXHJcblx0XHRcdFx0b25FZGl0PXthPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOmZvb3RwcmludH0pfS8+KVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxyXG5cdFx0XHRcdFx0PFRpdGxlIGpvdXJuZXk9e3RoaXMucHJvcHMuam91cm5leX0vPlxyXG5cdFx0XHRcdFx0e2FsbH1cclxuXHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdFx0e2VkaXRpbmcgJiYgKDxFZGl0b3IgZm9vdHByaW50PXtlZGl0aW5nfSBcclxuXHRcdFx0XHRcdG9uU2F2ZT17YT0+dGhpcy5vblNhdmUoYSl9IFxyXG5cdFx0XHRcdFx0b25DYW5jZWw9e2E9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6dW5kZWZpbmVkfSl9Lz4pfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0b25TYXZlKGZvb3RwcmludCl7XHJcblx0XHRjb25zdCB7am91cm5leX09dGhpcy5wcm9wc1xyXG5cdFx0Sm91cm5leURCLnVwc2VydChmb290cHJpbnQpXHJcblx0XHRcdC50aGVuKGE9PntcclxuXHRcdFx0XHRKb3VybmV5REIuZW1pdChcImZvb3RwcmludC5jaGFuZ2VkXCIpXHJcblx0XHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5cclxuY2xhc3MgRWRpdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2Zvb3RwcmludCwgb25TYXZlLCBvbkNhbmNlbH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3QgYWN0aW9ucyA9IFtcclxuXHRcdFx0ICA8RmxhdEJ1dHRvblxyXG5cdFx0XHRcdGxhYmVsPVwi5YWz6ZetXCJcclxuXHRcdFx0XHRwcmltYXJ5PXtmYWxzZX1cclxuXHRcdFx0XHRvblRvdWNoVGFwPXtvbkNhbmNlbH1cclxuXHRcdFx0ICAvPixcclxuXHRcdFx0ICA8RmxhdEJ1dHRvblxyXG5cdFx0XHRcdGxhYmVsPVwi5L+d5a2YXCJcclxuXHRcdFx0XHRwcmltYXJ5PXt0cnVlfVxyXG5cdFx0XHRcdG9uVG91Y2hUYXA9e29uU2F2ZX1cclxuXHRcdFx0ICAvPixcclxuXHRcdFx0XTtcclxuXHJcblx0XHR2YXIge25vdGUsIHBob3Rvcz1bXX09Zm9vdHByaW50LFxyXG4gICAgICAgICAgICBzdHlsZXM9e2ljb25SYXRpbzoyLzMsIGljb25TaXplOnt3aWR0aDo1MCwgaGVpZ2h0OjUwfX0sXHJcbiAgICAgICAgICAgIGk9MCxcclxuICAgICAgICAgICAgdWlQaG90b3M9cGhvdG9zLm1hcChmdW5jdGlvbihwaG90byl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxQaG90byBrZXk9e3Bob3RvfSB7Li4uc3R5bGVzfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uUGhvdG89eyh1cmwpPT50aGlzLm9uUGhvdG8odXJsLGkrKyl9XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtwaG90b30vPilcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYodWlQaG90b3MubGVuZ3RoPDkpXHJcbiAgICAgICAgICAgIHVpUGhvdG9zLnB1c2goKDxQaG90byB7Li4uc3R5bGVzfSBvblBob3RvPXt0aGlzLm9uUGhvdG8uYmluZCh0aGlzKX0ga2V5PXtEYXRlLm5vdygpfS8+KSlcclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PERpYWxvZyB0aXRsZT17Zm9vdHByaW50LndoZW4uc21hcnRGb3JtYXQoKX1cclxuXHRcdFx0XHRhY3Rpb25zPXthY3Rpb25zfVxyXG5cdFx0XHRcdG1vZGFsPXtmYWxzZX1cclxuXHRcdFx0XHRvcGVuPXt0cnVlfVxyXG5cdFx0XHRcdG9uUmVxdWVzdENsb3NlPXtvbkNhbmNlbH0+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7dGV4dEFsaWduOlwiY2VudGVyXCJ9fT57dWlQaG90b3N9PC9kaXY+XHJcblx0XHRcdFx0XHQ8dGV4dGFyZWFcclxuXHRcdFx0XHRcdFx0c3R5bGU9e3t3aWR0aDpcIjEwMCVcIixib3JkZXI6MCxoZWlnaHQ6MTAwLCBmb250U2l6ZToxMiwgcGFkZGluZ1RvcDo1LCBib3JkZXJUb3A6XCIxcHggZG90dGVkIGxpZ2h0Z3JheVwifX1cclxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCLov5nkuIDliLvnmoTmg7Pms5VcIlxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e2Zvb3RwcmludC5ub3RlfS8+XHJcblx0XHRcdFx0XHQ8Q2hpcHBlciBjaGlwcz17W1xyXG5cdFx0XHRcdFx0XHRcIuaXqemkkFwiLFwi5Y2I6aSQXCIsXCLmmZrppJBcIixcIui0reeJqVwiLFwi6Zeo56WoXCIsXCLlhazkuqRcIixcIumjnuaculwiLFwi55qE5aOrXCIsXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIueJueiJsuS6pOmAmlwifSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi54m56Imy5ZCD55qEXCJ9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLoirHplIBcIix0eXBlOlwibnVtYmVyXCJ9XHJcblx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8Q2hpcHBlciBjaGlwcz17W1xyXG5cdFx0XHRcdFx0XHRcIuWkque+juS6hlwiLFwi5peg5rOV5ZG85ZC4XCIsXCLlpKrlo67op4LkuoZcIixcIuWWnOasoui/memHjFwiXHJcblx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9EaWFsb2c+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdG9uUGhvdG8odXJsLCBpbmRleCl7XHJcbiAgICAgICAgdmFyIHtmb290cHJpbnR9PXRoaXMucHJvcHNcclxuICAgICAgICBpZihmb290cHJpbnQucGhvdG9zLmluZGV4T2YodXJsKSE9LTEpe1xyXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpbmRleCE9dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBmb290cHJpbnQucGhvdG9zLnNwbGljZShpbmRleCwxLHVybClcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBmb290cHJpbnQucGhvdG9zLnB1c2godXJsKVxyXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRpdGxlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXksb25FZGl0fT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7bmFtZSxfaWR9PWpvdXJuZXlcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTdGVwPlxyXG5cdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj1cIipcIiBvblRvdWNoVGFwPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGpvdXJuZXkvJHtfaWR9YCx7am91cm5leX0pfT5cclxuXHRcdFx0XHRcdDxzcGFuPntuYW1lfTwvc3Bhbj5cclxuXHRcdFx0XHRcdDxJY29uTW9yZS8+XHJcblx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdDwvU3RlcD5cclxuXHRcdClcclxuXHR9XHJcblx0XHRcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgRGF5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2RheSxkYXRlLCBvbkVkaXR9PXRoaXMucHJvcHNcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTdGVwIGRpc2FibGVkPXtmYWxzZX0+XHJcblx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPXtgJHtkYXl9YH0gb25Ub3VjaFRhcD17b25FZGl0fT5cclxuXHRcdFx0XHRcdDxzcGFuPntkYXRlLnNtYXJ0Rm9ybWF0KFwi5LuK5aSpXCIpfTwvc3Bhbj5cclxuXHRcdFx0XHRcdDxJY29uTW9yZS8+XHJcblx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdDwvU3RlcD5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEZvb3RwcmludCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkYXRhOiB7d2hlbixwaG90byxub3RlfSwgb25FZGl0fT10aGlzLnByb3BzXHJcblx0XHRyZXR1cm4gIChcclxuXHRcdFx0PFN0ZXAgY29tcGxldGVkPXt0cnVlfSBhY3RpdmU9e3RydWV9PlxyXG5cdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj17XCIuXCJ9IG9uVG91Y2hUYXA9e29uRWRpdH0+XHJcblx0XHRcdFx0XHQ8dGltZT57d2hlbi5mb3JtYXQoJ0hIOm1tJyl9Jm5ic3A7PC90aW1lPlxyXG5cdFx0XHRcdFx0PHNwYW4+e25vdGV9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PEljb25Nb3JlLz5cclxuXHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHQ8U3RlcENvbnRlbnQ+XHJcblx0XHRcdFx0XHQ8cD5cclxuXHRcdFx0XHRcdFx0PGltZyBzdHlsZT17e2hlaWdodDoyNTB9fSBzcmM9e3Bob3RvfS8+XHJcblx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0PC9TdGVwQ29udGVudD5cclxuXHRcdFx0PC9TdGVwPlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG4iXX0=