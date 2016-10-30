"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Title = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var _map = require("material-ui/svg-icons/maps/map");

var _map2 = _interopRequireDefault(_map);

var _photoCamera = require("material-ui/svg-icons/image/photo-camera");

var _photoCamera2 = _interopRequireDefault(_photoCamera);

var _db = require("../db");

var _chipper = require("./chipper");

var _chipper2 = _interopRequireDefault(_chipper);

var _photosField = require("./photos-field");

var _photosField2 = _interopRequireDefault(_photosField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;

var Journey = function (_Component) {
	_inherits(Journey, _Component);

	function Journey() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Journey);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Journey.__proto__ || Object.getPrototypeOf(Journey)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			footprints: [],
			itinerary: []
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Journey, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var journey = this.props.journey;

			var cond = { journey: journey._id };
			Promise.all([new Promise(function (resolve, reject) {
				return _db.Footprint.find(cond).fetch(resolve, reject);
			}), new Promise(function (resolve, reject) {
				return _db.Itinerary.find(cond).fetch(resolve, reject);
			})]).then(function (_ref2) {
				var _ref3 = _slicedToArray(_ref2, 2);

				var footprints = _ref3[0];
				var itinerary = _ref3[1];
				return _this2.setState({ footprints: footprints, itinerary: itinerary });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var _props = this.props;
			var _props$journey = _props.journey;
			var startedAt = _props$journey.startedAt;
			var _id = _props$journey._id;
			var onMap = _props.onMap;
			var publishable = _props.publishable;
			var _state = this.state;
			var footprints = _state.footprints;
			var itinerary = _state.itinerary;

			var currentDate = null,
			    lastDay = 0;
			var all = [];
			footprints.forEach(function (footprint, i) {
				var when = footprint.when;
				var photo = footprint.photo;
				var note = footprint.note;

				if (currentDate == null || !when.isSameDate(currentDate)) {
					currentDate = when;
					var day = currentDate.relative(startedAt) + 1;

					var _loop = function _loop() {
						lastDay++;
						var date = startedAt.relativeDate(lastDay - 1);
						all.push(_react2.default.createElement(Day, { key: "day" + lastDay, day: lastDay,
							date: date,
							onEdit: function onEdit(a) {
								return _this3.editing({ when: date });
							} }));
					};

					while (lastDay < day) {
						_loop();
					}
				}
				all.push(_react2.default.createElement(Footprint, { key: i, data: footprint,
					onEdit: function onEdit(a) {
						return _this3.editing(footprint);
					} }));
			});

			if (publishable) {
				all.push(_react2.default.createElement(
					_Stepper.Step,
					{ active: true, completed: false, key: "trigger" },
					_react2.default.createElement(
						_Stepper.StepLabel,
						{ icon: "*" },
						_react2.default.createElement(
							"p",
							null,
							_react2.default.createElement("input", { style: { border: "1px solid lightgray", padding: 10, marginRight: 10 },
								onClick: function onClick(e) {
									return _this3.editing({ when: new Date(), journey: _id }, "text");
								},
								placeholder: "\u53D1\u72B6\u6001\u5F53\u8FBE\u4EBA..." }),
							_react2.default.createElement(
								"span",
								{ style: { position: "relative", top: 8 } },
								_react2.default.createElement(_photoCamera2.default, {
									onClick: function onClick(e) {
										return _this3.editing({ when: new Date(), journey: _id }, "photo");
									},
									color: "lightgray" })
							)
						)
					)
				));
			}

			all.push(_react2.default.createElement(Title, { journey: this.props.journey, key: "title" }));

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_Stepper.Stepper,
					{ orientation: "vertical" },
					all.reverse()
				),
				_react2.default.createElement(Editor, { ref: "editor", onSave: function onSave(a) {
						return _this3.onSave(a);
					} })
			);
		}
	}, {
		key: "onSave",
		value: function onSave(footprint) {
			var _this4 = this;

			var journey = this.props.journey;

			var cond = { journey: journey._id };
			_db.Footprint.find(cond).fetch(function (footprints) {
				return _this4.setState({ footprints: footprints });
			});
		}
	}, {
		key: "editing",
		value: function editing(footprint, focusing) {
			this.refs.editor.setState({ footprint: footprint, focusing: focusing });
		}
	}]);

	return Journey;
}(_react.Component);

exports.default = Journey;

var Editor = function (_Component2) {
	_inherits(Editor, _Component2);

	function Editor() {
		var _ref4;

		var _temp2, _this5, _ret3;

		_classCallCheck(this, Editor);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret3 = (_temp2 = (_this5 = _possibleConstructorReturn(this, (_ref4 = Editor.__proto__ || Object.getPrototypeOf(Editor)).call.apply(_ref4, [this].concat(args))), _this5), _this5.state = {
			footprint: false,
			focusing: null
		}, _temp2), _possibleConstructorReturn(_this5, _ret3);
	}

	_createClass(Editor, [{
		key: "render",
		value: function render() {
			var _this6 = this;

			var footprint = this.state.footprint;


			if (!footprint) return null;

			var actions = [_react2.default.createElement(_materialUi.FlatButton, {
				label: "\u5173\u95ED",
				primary: false,
				onTouchTap: function onTouchTap(e) {
					return _this6.cancel();
				}
			}), _react2.default.createElement(_materialUi.FlatButton, {
				label: "\u4FDD\u5B58",
				primary: true,
				onTouchTap: function onTouchTap(e) {
					return _this6.save();
				}
			})];

			var note = footprint.note;
			var photos = footprint.photos;
			var when = footprint.when;


			return _react2.default.createElement(
				_materialUi.Dialog,
				{ title: when.smartFormat(),
					actions: actions,
					modal: false,
					open: !!footprint,
					onRequestClose: function onRequestClose(e) {
						return _this6.cancel();
					} },
				_react2.default.createElement(
					"div",
					{ className: "section" },
					_react2.default.createElement(_photosField2.default, { ref: "photos", defaultValue: photos,
						iconStyle: { iconRatio: 2 / 3, iconSize: { width: 50, height: 50 } } }),
					_react2.default.createElement("textarea", { ref: "text",
						style: { width: "100%", border: 0, height: 100, fontSize: 12, paddingTop: 5, borderTop: "1px dotted lightgray" },
						placeholder: "\u8FD9\u4E00\u523B\u7684\u60F3\u6CD5",
						defaultValue: note }),
					_react2.default.createElement(_chipper2.default, { chips: ["早餐", "午餐", "晚餐", "购物", "门票", "公交", "飞机", "的士", { label: "特色交通" }, { label: "特色吃的" }, { label: "花销", type: "number" }] }),
					_react2.default.createElement(_chipper2.default, { chips: ["太美了", "无法呼吸", "太壮观了", "喜欢这里"] })
				)
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var focusing = this.props.focusing;

			switch (focusing) {
				case "text":
					this.refs.text.focus();
					break;
				case "photo":
					this.refs.photos.focus();
					break;
			}
		}
	}, {
		key: "cancel",
		value: function cancel() {
			this.setState({ footprint: null });
		}
	}, {
		key: "save",
		value: function save() {
			var _this7 = this;

			var onSave = this.props.onSave;
			var footprint = this.state.footprint;
			var _refs = this.refs;
			var photos = _refs.photos;
			var text = _refs.text;

			footprint.photos = photos.value;
			footprint.note = text.value;
			_db.Footprint.upsert(footprint).then(function (updated) {
				_this7.setState({ footprint: null });
				onSave(updated);
			});
		}
	}]);

	return Editor;
}(_react.Component);

var Title = exports.Title = function (_Component3) {
	_inherits(Title, _Component3);

	function Title() {
		_classCallCheck(this, Title);

		return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
	}

	_createClass(Title, [{
		key: "render",
		value: function render() {
			var _this9 = this;

			var _props2 = this.props;
			var journey = _props2.journey;
			var completed = _props2.completed;
			var onMap = _props2.onMap;
			var name = journey.name;
			var _id = journey._id;
			var startedAt = journey.startedAt;

			if (completed) {
				return _react2.default.createElement(
					_Stepper.Step,
					{ completed: true, disabled: true },
					_react2.default.createElement(
						_Stepper.StepLabel,
						null,
						_react2.default.createElement(
							"span",
							{ onClick: function onClick(e) {
									return _this9.context.router.push("journey/" + _id);
								}, style: { cursor: "default" } },
							startedAt.smartFormat(),
							_react2.default.createElement("br", null),
							name
						)
					)
				);
			} else {
				var mapToggle = null;
				if (onMap) {
					mapToggle = _react2.default.createElement(
						"div",
						{ style: { width: 100 } },
						_react2.default.createElement(_materialUi.Toggle, { labelPosition: "right", label: "Map", onToggle: onMap })
					);
				}
				return _react2.default.createElement(
					_Stepper.Step,
					{ completed: true, active: true },
					_react2.default.createElement(
						_Stepper.StepLabel,
						{ icon: "*" },
						_react2.default.createElement(
							"div",
							{ className: "grid", style: { cursor: "default" } },
							_react2.default.createElement(
								"b",
								{ onClick: function onClick(e) {
										return _this9.context.router.push("journey/" + _id);
									} },
								name
							),
							mapToggle
						)
					)
				);
			}
		}
	}]);

	return Title;
}(_react.Component);

Title.contextTypes = {
	router: _react.PropTypes.object
};

var Day = function (_Component4) {
	_inherits(Day, _Component4);

	function Day() {
		_classCallCheck(this, Day);

		return _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).apply(this, arguments));
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

var Footprint = function (_Component5) {
	_inherits(Footprint, _Component5);

	function Footprint() {
		_classCallCheck(this, Footprint);

		return _possibleConstructorReturn(this, (Footprint.__proto__ || Object.getPrototypeOf(Footprint)).apply(this, arguments));
	}

	_createClass(Footprint, [{
		key: "render",
		value: function render() {
			var _this12 = this;

			var _props4 = this.props;
			var _props4$data = _props4.data;
			var when = _props4$data.when;
			var _props4$data$photos = _props4$data.photos;
			var photos = _props4$data$photos === undefined ? [] : _props4$data$photos;
			var note = _props4$data.note;
			var onEdit = _props4.onEdit;

			return _react2.default.createElement(
				_Stepper.Step,
				{ completed: true, active: true },
				_react2.default.createElement(
					_Stepper.StepLabel,
					{ icon: "." },
					_react2.default.createElement(
						"time",
						null,
						when.format('HH:mm'),
						"\xA0"
					),
					_react2.default.createElement(
						"span",
						null,
						note
					),
					_react2.default.createElement(_moreHoriz2.default, { onTouchTap: onEdit })
				),
				_react2.default.createElement(
					_Stepper.StepContent,
					null,
					_react2.default.createElement(
						"p",
						null,
						photos.map(function (_ref5, i) {
							var url = _ref5.url;
							var taken = _ref5.taken;
							var loc = _ref5.loc;
							return _react2.default.createElement("img", { key: i, onClick: function onClick(e) {
									return _this12.context.viewPhoto(url);
								}, style: { height: 50, margin: 2 }, src: url });
						})
					)
				)
			);
		}
	}]);

	return Footprint;
}(_react.Component);

Footprint.contextTypes = {
	viewPhoto: _react2.default.PropTypes.func
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2pvdXJuZXkuanMiXSwibmFtZXMiOlsiRW1wdHkiLCJKb3VybmV5Iiwic3RhdGUiLCJmb290cHJpbnRzIiwiaXRpbmVyYXJ5Iiwiam91cm5leSIsInByb3BzIiwiY29uZCIsIl9pZCIsIlByb21pc2UiLCJhbGwiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmluZCIsImZldGNoIiwidGhlbiIsInNldFN0YXRlIiwic3RhcnRlZEF0Iiwib25NYXAiLCJwdWJsaXNoYWJsZSIsImN1cnJlbnREYXRlIiwibGFzdERheSIsImZvckVhY2giLCJmb290cHJpbnQiLCJpIiwid2hlbiIsInBob3RvIiwibm90ZSIsImlzU2FtZURhdGUiLCJkYXkiLCJyZWxhdGl2ZSIsImRhdGUiLCJyZWxhdGl2ZURhdGUiLCJwdXNoIiwiZWRpdGluZyIsImJvcmRlciIsInBhZGRpbmciLCJtYXJnaW5SaWdodCIsIkRhdGUiLCJwb3NpdGlvbiIsInRvcCIsInJldmVyc2UiLCJvblNhdmUiLCJhIiwiZm9jdXNpbmciLCJyZWZzIiwiZWRpdG9yIiwiRWRpdG9yIiwiYWN0aW9ucyIsImNhbmNlbCIsInNhdmUiLCJwaG90b3MiLCJzbWFydEZvcm1hdCIsImljb25SYXRpbyIsImljb25TaXplIiwid2lkdGgiLCJoZWlnaHQiLCJmb250U2l6ZSIsInBhZGRpbmdUb3AiLCJib3JkZXJUb3AiLCJsYWJlbCIsInR5cGUiLCJ0ZXh0IiwiZm9jdXMiLCJ2YWx1ZSIsInVwc2VydCIsInVwZGF0ZWQiLCJUaXRsZSIsImNvbXBsZXRlZCIsIm5hbWUiLCJjb250ZXh0Iiwicm91dGVyIiwiY3Vyc29yIiwibWFwVG9nZ2xlIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiRGF5Iiwib25FZGl0IiwiRm9vdHByaW50IiwiZGF0YSIsImZvcm1hdCIsIm1hcCIsInVybCIsInRha2VuIiwibG9jIiwidmlld1Bob3RvIiwibWFyZ2luIiwiUHJvcFR5cGVzIiwiZnVuYyJdLCJtYXBwaW5n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QUREO0FBTkQsSUFERDtBQWNBOzs7Ozs7QUFqQklKLFMsQ0FtQkVKLFksR0FBYTtBQUNuQlcsWUFBVSxnQkFBTUUsU0FBTixDQUFnQkM7QUFEUCxDIiwiZmlsZSI6ImpvdXJuZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7VUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLCBGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b24sIEljb25CdXR0b24sIERpYWxvZywgVG9nZ2xlfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge1N0ZXAsU3RlcHBlcixTdGVwTGFiZWwsU3RlcENvbnRlbnR9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXHJcblxyXG5pbXBvcnQgTG9nbyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9kaXJlY3Rpb25zLXdhbGsnXHJcbmltcG9ydCBJY29uUHVibGlzaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuaW1wb3J0IEljb25Nb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtaG9yaXonXHJcbmltcG9ydCBJY29uQWRkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZCdcclxuaW1wb3J0IEljb25NYXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL21hcFwiXHJcbmltcG9ydCBJY29uQ2FtZXJhIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9waG90by1jYW1lcmEnXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBGb290cHJpbnQgYXMgRm9vdHByaW50REIsIFdheXBvaW50IGFzIFdheXBvaW50REIsIEl0aW5lcmFyeSBhcyBJdGluZXJhcnlEQn0gZnJvbSBcIi4uL2RiXCJcclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY2hpcHBlclwiXHJcbmltcG9ydCBQaG90b3NGaWVsZCBmcm9tIFwiLi9waG90b3MtZmllbGRcIlxyXG5cclxuY29uc3Qge0VtcHR5fT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm91cm5leSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRmb290cHJpbnRzOltdXHJcblx0XHQsaXRpbmVyYXJ5OltdXHJcblx0fVxyXG5cdFxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRjb25zdCB7am91cm5leX09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IGNvbmQ9e2pvdXJuZXk6am91cm5leS5faWR9XHJcblx0XHRQcm9taXNlLmFsbChbXHJcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PkZvb3RwcmludERCLmZpbmQoY29uZCkuZmV0Y2gocmVzb2x2ZSxyZWplY3QpKVxyXG5cdFx0XHQsbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+SXRpbmVyYXJ5REIuZmluZChjb25kKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpXHJcblx0XHRcdF0pLnRoZW4oKFtmb290cHJpbnRzLGl0aW5lcmFyeV0pPT50aGlzLnNldFN0YXRlKHtmb290cHJpbnRzLCBpdGluZXJhcnl9KSlcclxuXHR9XHJcblx0XHJcblx0cmVuZGVyKCl7XHJcblx0XHRsZXQge2pvdXJuZXk6e3N0YXJ0ZWRBdCwgX2lkIH0sIG9uTWFwLCBwdWJsaXNoYWJsZX09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IHtmb290cHJpbnRzLCBpdGluZXJhcnl9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBjdXJyZW50RGF0ZT1udWxsLCBsYXN0RGF5PTBcclxuXHRcdGxldCBhbGw9W11cclxuXHRcdGZvb3RwcmludHMuZm9yRWFjaCgoZm9vdHByaW50LGkpPT57XHJcblx0XHRcdGNvbnN0IHt3aGVuLHBob3RvLG5vdGV9PWZvb3RwcmludFxyXG5cdFx0XHRpZihjdXJyZW50RGF0ZT09bnVsbCB8fCAhd2hlbi5pc1NhbWVEYXRlKGN1cnJlbnREYXRlKSl7XHJcblx0XHRcdFx0Y3VycmVudERhdGU9d2hlblxyXG5cdFx0XHRcdGxldCBkYXk9Y3VycmVudERhdGUucmVsYXRpdmUoc3RhcnRlZEF0KSsxXHJcblx0XHRcdFx0d2hpbGUobGFzdERheTxkYXkpe1xyXG5cdFx0XHRcdFx0bGFzdERheSsrXHJcblx0XHRcdFx0XHRsZXQgZGF0ZT1zdGFydGVkQXQucmVsYXRpdmVEYXRlKGxhc3REYXktMSlcclxuXHRcdFx0XHRcdGFsbC5wdXNoKDxEYXkga2V5PXtgZGF5JHtsYXN0RGF5fWB9IGRheT17bGFzdERheX1cclxuXHRcdFx0XHRcdFx0ZGF0ZT17ZGF0ZX1cclxuXHRcdFx0XHRcdFx0b25FZGl0PXthPT50aGlzLmVkaXRpbmcoe3doZW46ZGF0ZX0pfS8+KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRhbGwucHVzaCg8Rm9vdHByaW50IGtleT17aX0gZGF0YT17Zm9vdHByaW50fVxyXG5cdFx0XHRcdG9uRWRpdD17YT0+dGhpcy5lZGl0aW5nKGZvb3RwcmludCl9Lz4pXHJcblx0XHR9KVxyXG5cdFx0XHJcblx0XHRpZihwdWJsaXNoYWJsZSl7XHJcblx0XHRcdGFsbC5wdXNoKFxyXG5cdFx0XHRcdDxTdGVwIGFjdGl2ZT17dHJ1ZX0gY29tcGxldGVkPXtmYWxzZX0ga2V5PVwidHJpZ2dlclwiPlxyXG5cdFx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPVwiKlwiPlxyXG5cdFx0XHRcdFx0XHQ8cD5cclxuXHRcdFx0XHRcdFx0XHQ8aW5wdXQgc3R5bGU9e3tib3JkZXI6XCIxcHggc29saWQgbGlnaHRncmF5XCIscGFkZGluZzoxMCwgbWFyZ2luUmlnaHQ6MTB9fVxyXG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+dGhpcy5lZGl0aW5nKHt3aGVuOm5ldyBEYXRlKCksIGpvdXJuZXk6X2lkfSxcInRleHRcIil9XHJcblx0XHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIuWPkeeKtuaAgeW9k+i+vuS6ui4uLlwiLz5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3Bvc2l0aW9uOlwicmVsYXRpdmVcIiwgdG9wOjh9fT5cclxuXHRcdFx0XHRcdFx0XHRcdDxJY29uQ2FtZXJhXHJcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnRoaXMuZWRpdGluZyh7d2hlbjpuZXcgRGF0ZSgpLCBqb3VybmV5Ol9pZH0sXCJwaG90b1wiKX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29sb3I9XCJsaWdodGdyYXlcIi8+XHJcblx0XHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHQ8L1N0ZXA+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0YWxsLnB1c2goPFRpdGxlIGpvdXJuZXk9e3RoaXMucHJvcHMuam91cm5leX0ga2V5PVwidGl0bGVcIi8+KVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiPlxyXG5cdFx0XHRcdFx0e2FsbC5yZXZlcnNlKCl9XHJcblx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cclxuXHRcdFx0XHQ8RWRpdG9yIHJlZj1cImVkaXRvclwiIG9uU2F2ZT17YT0+dGhpcy5vblNhdmUoYSl9Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRvblNhdmUoZm9vdHByaW50KXtcclxuXHRcdGNvbnN0IHtqb3VybmV5fT10aGlzLnByb3BzXHJcblx0XHRsZXQgY29uZD17am91cm5leTpqb3VybmV5Ll9pZH1cclxuXHRcdEZvb3RwcmludERCLmZpbmQoY29uZCkuZmV0Y2goZm9vdHByaW50cz0+dGhpcy5zZXRTdGF0ZSh7Zm9vdHByaW50c30pKVxyXG5cdH1cclxuXHRcclxuXHRlZGl0aW5nKGZvb3RwcmludCwgZm9jdXNpbmcpe1xyXG5cdFx0dGhpcy5yZWZzLmVkaXRvci5zZXRTdGF0ZSh7Zm9vdHByaW50LCBmb2N1c2luZ30pXHJcblx0fVxyXG59XHJcblxyXG5cclxuY2xhc3MgRWRpdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtcclxuXHRcdGZvb3RwcmludDpmYWxzZSxcclxuXHRcdGZvY3VzaW5nOm51bGxcclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7Zm9vdHByaW50fT10aGlzLnN0YXRlXHJcblx0XHRcclxuXHRcdGlmKCFmb290cHJpbnQpXHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcclxuXHRcdGNvbnN0IGFjdGlvbnMgPSBbXHJcblx0XHRcdCAgPEZsYXRCdXR0b25cclxuXHRcdFx0XHRsYWJlbD1cIuWFs+mXrVwiXHJcblx0XHRcdFx0cHJpbWFyeT17ZmFsc2V9XHJcblx0XHRcdFx0b25Ub3VjaFRhcD17ZT0+dGhpcy5jYW5jZWwoKX1cclxuXHRcdFx0ICAvPixcclxuXHRcdFx0ICA8RmxhdEJ1dHRvblxyXG5cdFx0XHRcdGxhYmVsPVwi5L+d5a2YXCJcclxuXHRcdFx0XHRwcmltYXJ5PXt0cnVlfVxyXG5cdFx0XHRcdG9uVG91Y2hUYXA9e2U9PnRoaXMuc2F2ZSgpfVxyXG5cdFx0XHQgIC8+LFxyXG5cdFx0XHRdO1xyXG5cclxuICAgICAgICBsZXQge25vdGUsIHBob3Rvcyx3aGVufT1mb290cHJpbnRcclxuICAgICAgICBcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxEaWFsb2cgdGl0bGU9e3doZW4uc21hcnRGb3JtYXQoKX1cclxuXHRcdFx0XHRhY3Rpb25zPXthY3Rpb25zfVxyXG5cdFx0XHRcdG1vZGFsPXtmYWxzZX1cclxuXHRcdFx0XHRvcGVuPXshIWZvb3RwcmludH1cclxuXHRcdFx0XHRvblJlcXVlc3RDbG9zZT17ZT0+dGhpcy5jYW5jZWwoKX0+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XHJcblx0XHRcdFx0XHQ8UGhvdG9zRmllbGQgcmVmPVwicGhvdG9zXCIgZGVmYXVsdFZhbHVlPXtwaG90b3N9IFxyXG5cdFx0XHRcdFx0XHRpY29uU3R5bGU9e3tpY29uUmF0aW86Mi8zLCBpY29uU2l6ZTp7d2lkdGg6NTAsIGhlaWdodDo1MH19fS8+XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdDx0ZXh0YXJlYSByZWY9XCJ0ZXh0XCJcclxuXHRcdFx0XHRcdFx0c3R5bGU9e3t3aWR0aDpcIjEwMCVcIixib3JkZXI6MCxoZWlnaHQ6MTAwLCBmb250U2l6ZToxMiwgcGFkZGluZ1RvcDo1LCBib3JkZXJUb3A6XCIxcHggZG90dGVkIGxpZ2h0Z3JheVwifX1cclxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCLov5nkuIDliLvnmoTmg7Pms5VcIlxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e25vdGV9Lz5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8Q2hpcHBlciBjaGlwcz17W1xyXG5cdFx0XHRcdFx0XHRcIuaXqemkkFwiLFwi5Y2I6aSQXCIsXCLmmZrppJBcIixcIui0reeJqVwiLFwi6Zeo56WoXCIsXCLlhazkuqRcIixcIumjnuaculwiLFwi55qE5aOrXCIsXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIueJueiJsuS6pOmAmlwifSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi54m56Imy5ZCD55qEXCJ9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLoirHplIBcIix0eXBlOlwibnVtYmVyXCJ9XHJcblx0XHRcdFx0XHRcdF19Lz5cclxuXHJcblx0XHRcdFx0XHQ8Q2hpcHBlciBjaGlwcz17W1xyXG5cdFx0XHRcdFx0XHRcIuWkque+juS6hlwiLFwi5peg5rOV5ZG85ZC4XCIsXCLlpKrlo67op4LkuoZcIixcIuWWnOasoui/memHjFwiXHJcblx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9EaWFsb2c+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Y29uc3Qge2ZvY3VzaW5nfT10aGlzLnByb3BzXHJcblx0XHRzd2l0Y2goZm9jdXNpbmcpe1xyXG5cdFx0Y2FzZSBcInRleHRcIjpcclxuXHRcdFx0dGhpcy5yZWZzLnRleHQuZm9jdXMoKVxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJwaG90b1wiOlxyXG5cdFx0XHR0aGlzLnJlZnMucGhvdG9zLmZvY3VzKClcclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdGNhbmNlbCgpe1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7Zm9vdHByaW50Om51bGx9KVxyXG5cdH1cclxuXHRcclxuXHRzYXZlKCl7XHJcblx0XHRjb25zdCB7b25TYXZlfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7Zm9vdHByaW50fT10aGlzLnN0YXRlXHJcblx0XHRjb25zdCB7cGhvdG9zLCB0ZXh0fT10aGlzLnJlZnNcclxuXHRcdGZvb3RwcmludC5waG90b3M9cGhvdG9zLnZhbHVlXHJcblx0XHRmb290cHJpbnQubm90ZT10ZXh0LnZhbHVlXHJcblx0XHRGb290cHJpbnREQi51cHNlcnQoZm9vdHByaW50KVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT57XHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7Zm9vdHByaW50Om51bGx9KVxyXG5cdFx0XHRcdG9uU2F2ZSh1cGRhdGVkKVx0XHJcblx0XHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGl0bGUgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7am91cm5leSwgY29tcGxldGVkLCBvbk1hcH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge25hbWUsX2lkLCBzdGFydGVkQXR9PWpvdXJuZXlcclxuXHRcdGlmKGNvbXBsZXRlZCl7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PFN0ZXAgY29tcGxldGVkPXt0cnVlfSBkaXNhYmxlZD17dHJ1ZX0+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGpvdXJuZXkvJHtfaWR9YCl9IHN0eWxlPXt7Y3Vyc29yOlwiZGVmYXVsdFwifX0+XHJcblx0XHRcdFx0XHRcdFx0e3N0YXJ0ZWRBdC5zbWFydEZvcm1hdCgpfVxyXG5cdFx0XHRcdFx0XHRcdDxici8+XHJcblx0XHRcdFx0XHRcdFx0e25hbWV9XHJcblx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0KVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGxldCBtYXBUb2dnbGU9bnVsbFxyXG5cdFx0XHRpZihvbk1hcCl7XHJcblx0XHRcdFx0bWFwVG9nZ2xlPSg8ZGl2IHN0eWxlPXt7d2lkdGg6MTAwfX0+PFRvZ2dsZSBsYWJlbFBvc2l0aW9uPVwicmlnaHRcIiBsYWJlbD1cIk1hcFwib25Ub2dnbGU9e29uTWFwfS8+PC9kaXY+KVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PFN0ZXAgY29tcGxldGVkPXt0cnVlfSBhY3RpdmU9e3RydWV9PlxyXG5cdFx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPVwiKlwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIiBzdHlsZT17e2N1cnNvcjpcImRlZmF1bHRcIn19PlxyXG5cdFx0XHRcdFx0XHRcdDxiIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgam91cm5leS8ke19pZH1gKX0+e25hbWV9PC9iPlxyXG5cdFx0XHRcdFx0XHRcdHttYXBUb2dnbGV9XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgRGF5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2RheSxkYXRlLCBvbkVkaXR9PXRoaXMucHJvcHNcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTdGVwIGRpc2FibGVkPXtmYWxzZX0+XHJcblx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPXtgJHtkYXl9YH0gb25Ub3VjaFRhcD17b25FZGl0fT5cclxuXHRcdFx0XHRcdDxzcGFuPntkYXRlLnNtYXJ0Rm9ybWF0KFwi5LuK5aSpXCIpfTwvc3Bhbj5cclxuXHRcdFx0XHRcdDxJY29uTW9yZS8+XHJcblx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdDwvU3RlcD5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEZvb3RwcmludCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkYXRhOiB7d2hlbixwaG90b3M9W10sbm90ZX0sIG9uRWRpdH09dGhpcy5wcm9wc1xyXG5cdFx0cmV0dXJuICAoXHJcblx0XHRcdDxTdGVwIGNvbXBsZXRlZD17dHJ1ZX0gYWN0aXZlPXt0cnVlfT5cclxuXHRcdFx0XHQ8U3RlcExhYmVsIGljb249e1wiLlwifSA+XHJcblx0XHRcdFx0XHQ8dGltZT57d2hlbi5mb3JtYXQoJ0hIOm1tJyl9Jm5ic3A7PC90aW1lPlxyXG5cdFx0XHRcdFx0PHNwYW4+e25vdGV9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PEljb25Nb3JlIG9uVG91Y2hUYXA9e29uRWRpdH0gLz5cclxuXHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHQ8U3RlcENvbnRlbnQ+XHJcblx0XHRcdFx0XHQ8cD5cclxuXHRcdFx0XHRcdFx0e3Bob3Rvcy5tYXAoKHt1cmwsdGFrZW4sbG9jfSxpKT0+KDxpbWcga2V5PXtpfSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQudmlld1Bob3RvKHVybCl9IHN0eWxlPXt7aGVpZ2h0OjUwLCBtYXJnaW46Mn19IHNyYz17dXJsfS8+KSl9XHJcblx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0PC9TdGVwQ29udGVudD5cclxuXHRcdFx0PC9TdGVwPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHR2aWV3UGhvdG86UmVhY3QuUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcbn1cclxuIl19