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

var _transportationField = require("./transportation-field");

var _transportationField2 = _interopRequireDefault(_transportationField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;

var Journey = function (_Component) {
	_inherits(Journey, _Component);

	function Journey() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Journey);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Journey)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
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
			})]).then(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2);

				var footprints = _ref2[0];
				var itinerary = _ref2[1];
				return _this2.setState({ footprints: footprints, itinerary: itinerary });
			});
		}
	}, {
		key: "getDayItinerary",
		value: function getDayItinerary(dayth) {
			var itinerary = this.state.itinerary;

			return itinerary.reduceRight(function (found, a) {
				if (a.dayth == dayth) {
					found.unshift(a);
				} else if (found.length == 0) {
					if (a.dayth < dayth) found.unshift(a);
				}
				return found;
			}, []);
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
							date: date, itinerary: _this3.getDayItinerary(lastDay),
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
								placeholder: "发状态当达人..." }),
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
		var _Object$getPrototypeO2;

		var _temp2, _this5, _ret3;

		_classCallCheck(this, Editor);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret3 = (_temp2 = (_this5 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(Editor)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this5), _this5.state = {
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
				label: "关闭",
				primary: false,
				onTouchTap: function onTouchTap(e) {
					return _this6.cancel();
				}
			}), _react2.default.createElement(_materialUi.FlatButton, {
				label: "保存",
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
						placeholder: "这一刻的想法",
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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Day).apply(this, arguments));
	}

	_createClass(Day, [{
		key: "render",
		value: function render() {
			var label = _transportationField2.default.getLabel;
			var _props3 = this.props;
			var day = _props3.day;
			var date = _props3.date;
			var onEdit = _props3.onEdit;
			var itinerary = _props3.itinerary;

			var itiText = itinerary.reduce(function (r, a) {
				var dayth = a.dayth;
				var place = a.place;
				var trans = a.trans;

				if (trans != undefined) {
					if (trans = label(trans)) place = trans + "到" + place;
				}
				return r.length ? r + "," + place : place;
			}, "");

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
					_react2.default.createElement(
						"span",
						null,
						itiText
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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Footprint).apply(this, arguments));
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
						" "
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
						photos.map(function (_ref3, i) {
							var url = _ref3.url;
							var taken = _ref3.taken;
							var loc = _ref3.loc;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2pvdXJuZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU87O0lBRWM7Ozs7Ozs7Ozs7Ozs7O21NQUNwQixRQUFNO0FBQ0wsZUFBVyxFQUFYO0FBQ0MsY0FBVSxFQUFWOzs7O2NBSGtCOztzQ0FNRDs7O09BQ1gsVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQURXOztBQUVsQixPQUFJLE9BQUssRUFBQyxTQUFRLFFBQVEsR0FBUixFQUFkLENBRmM7QUFHbEIsV0FBUSxHQUFSLENBQVksQ0FDWCxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBUyxNQUFUO1dBQWtCLGNBQVksSUFBWixDQUFpQixJQUFqQixFQUF1QixLQUF2QixDQUE2QixPQUE3QixFQUFxQyxNQUFyQztJQUFsQixDQURELEVBRVYsSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVMsTUFBVDtXQUFrQixjQUFZLElBQVosQ0FBaUIsSUFBakIsRUFBdUIsS0FBdkIsQ0FBNkIsT0FBN0IsRUFBcUMsTUFBckM7SUFBbEIsQ0FGRixDQUFaLEVBR0ksSUFISixDQUdTOzs7UUFBRTtRQUFXO1dBQWEsT0FBSyxRQUFMLENBQWMsRUFBQyxzQkFBRCxFQUFhLG9CQUFiLEVBQWQ7SUFBMUIsQ0FIVCxDQUhrQjs7OztrQ0FTSCxPQUFNO09BQ2QsWUFBVyxLQUFLLEtBQUwsQ0FBWCxVQURjOztBQUVyQixVQUFPLFVBQVUsV0FBVixDQUFzQixVQUFDLEtBQUQsRUFBTyxDQUFQLEVBQVc7QUFDdkMsUUFBRyxFQUFFLEtBQUYsSUFBUyxLQUFULEVBQWU7QUFDakIsV0FBTSxPQUFOLENBQWMsQ0FBZCxFQURpQjtLQUFsQixNQUVNLElBQUcsTUFBTSxN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RG5CO09BQ3NCLHlCQUR0QjtPQUM2Qix3QkFEN0I7O0FBRVAsVUFDQzs7TUFBTSxXQUFXLElBQVgsRUFBaUIsUUFBUSxJQUFSLEVBQXZCO0lBQ0M7O09BQVcsTUFBTSxHQUFOLEVBQVg7S0FDQzs7O01BQU8sS0FBSyxNQUFMLENBQVksT0FBWixDQUFQOztNQUREO0tBRUM7OztNQUFPLElBQVA7TUFGRDtLQUdDLHFEQUFVLFlBQVksTUFBWixFQUFWLENBSEQ7S0FERDtJQU1DOzs7S0FDQzs7O01BQ0UsT0FBTyxHQUFQLENBQVcsaUJBQWlCLENBQWpCO1dBQUU7V0FBSTtXQUFNO2NBQVUsdUNBQUssS0FBSyxDQUFMLEVBQVEsU0FBUztnQkFBRyxRQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCO1NBQUgsRUFBZ0MsT0FBTyxFQUFDLFFBQU8sRUFBUCxFQUFXLFFBQU8sQ0FBUCxFQUFuQixFQUE4QixLQUFLLEdBQUwsRUFBcEY7T0FBdEIsQ0FEYjtNQUREO0tBTkQ7SUFERCxDQUZPOzs7O1FBREg7OztVQW1CRSxlQUFhO0FBQ25CLFlBQVUsZ0JBQU0sU0FBTixDQUFnQixJQUFoQiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge1VJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9uLCBJY29uQnV0dG9uLCBEaWFsb2csIFRvZ2dsZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtTdGVwLFN0ZXBwZXIsU3RlcExhYmVsLFN0ZXBDb250ZW50fSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xyXG5cclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBJY29uTW9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLWhvcml6J1xyXG5pbXBvcnQgSWNvbkFkZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQnXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5pbXBvcnQgSWNvbkNhbWVyYSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvcGhvdG8tY2FtZXJhJ1xyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQiwgRm9vdHByaW50IGFzIEZvb3RwcmludERCLCBXYXlwb2ludCBhcyBXYXlwb2ludERCLCBJdGluZXJhcnkgYXMgSXRpbmVyYXJ5REJ9IGZyb20gXCIuLi9kYlwiXHJcbmltcG9ydCBDaGlwcGVyIGZyb20gXCIuL2NoaXBwZXJcIlxyXG5pbXBvcnQgUGhvdG9zRmllbGQgZnJvbSBcIi4vcGhvdG9zLWZpZWxkXCJcclxuaW1wb3J0IFRyYW5zcG9ydGF0aW9uRmllbGQgZnJvbSBcIi4vdHJhbnNwb3J0YXRpb24tZmllbGRcIlxyXG5cclxuY29uc3Qge0VtcHR5fT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm91cm5leSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRmb290cHJpbnRzOltdXHJcblx0XHQsaXRpbmVyYXJ5OltdXHJcblx0fVxyXG5cdFxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRjb25zdCB7am91cm5leX09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IGNvbmQ9e2pvdXJuZXk6am91cm5leS5faWR9XHJcblx0XHRQcm9taXNlLmFsbChbXHJcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PkZvb3RwcmludERCLmZpbmQoY29uZCkuZmV0Y2gocmVzb2x2ZSxyZWplY3QpKVxyXG5cdFx0XHQsbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+SXRpbmVyYXJ5REIuZmluZChjb25kKS5mZXRjaChyZXNvbHZlLHJlamVjdCkpXHJcblx0XHRcdF0pLnRoZW4oKFtmb290cHJpbnRzLGl0aW5lcmFyeV0pPT50aGlzLnNldFN0YXRlKHtmb290cHJpbnRzLCBpdGluZXJhcnl9KSlcclxuXHR9XHJcblx0XHJcblx0Z2V0RGF5SXRpbmVyYXJ5KGRheXRoKXtcclxuXHRcdGNvbnN0IHtpdGluZXJhcnl9PXRoaXMuc3RhdGVcclxuXHRcdHJldHVybiBpdGluZXJhcnkucmVkdWNlUmlnaHQoKGZvdW5kLGEpPT57XHJcblx0XHRcdGlmKGEuZGF5dGg9PWRheXRoKXtcclxuXHRcdFx0XHRmb3VuZC51bnNoaWZ0KGEpXHJcblx0XHRcdH1lbHNlIGlmKGZvdW5kLmxlbmd0aD09MCl7XHJcblx0XHRcdFx0aWYoYS5kYXl0aDxkYXl0aClcclxuXHRcdFx0XHRcdGZvdW5kLnVuc2hpZnQoYSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdH0sW10pXHJcblx0fVxyXG5cdFxyXG5cdHJlbmRlcigpe1xyXG5cdFx0bGV0IHtqb3VybmV5OntzdGFydGVkQXQsIF9pZCB9LCBvbk1hcCwgcHVibGlzaGFibGV9PXRoaXMucHJvcHNcclxuXHRcdGxldCB7Zm9vdHByaW50cywgaXRpbmVyYXJ5fT10aGlzLnN0YXRlXHJcblx0XHRsZXQgY3VycmVudERhdGU9bnVsbCwgbGFzdERheT0wXHJcblx0XHRsZXQgYWxsPVtdXHJcblx0XHRmb290cHJpbnRzLmZvckVhY2goKGZvb3RwcmludCxpKT0+e1xyXG5cdFx0XHRjb25zdCB7d2hlbixwaG90byxub3RlfT1mb290cHJpbnRcclxuXHRcdFx0aWYoY3VycmVudERhdGU9PW51bGwgfHwgIXdoZW4uaXNTYW1lRGF0ZShjdXJyZW50RGF0ZSkpe1xyXG5cdFx0XHRcdGN1cnJlbnREYXRlPXdoZW5cclxuXHRcdFx0XHRsZXQgZGF5PWN1cnJlbnREYXRlLnJlbGF0aXZlKHN0YXJ0ZWRBdCkrMVxyXG5cdFx0XHRcdHdoaWxlKGxhc3REYXk8ZGF5KXtcclxuXHRcdFx0XHRcdGxhc3REYXkrK1xyXG5cdFx0XHRcdFx0bGV0IGRhdGU9c3RhcnRlZEF0LnJlbGF0aXZlRGF0ZShsYXN0RGF5LTEpXHJcblx0XHRcdFx0XHRhbGwucHVzaCg8RGF5IGtleT17YGRheSR7bGFzdERheX1gfSBkYXk9e2xhc3REYXl9XHJcblx0XHRcdFx0XHRcdGRhdGU9e2RhdGV9IGl0aW5lcmFyeT17dGhpcy5nZXREYXlJdGluZXJhcnkobGFzdERheSl9XHJcblx0XHRcdFx0XHRcdG9uRWRpdD17YT0+dGhpcy5lZGl0aW5nKHt3aGVuOmRhdGV9KX0vPilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0YWxsLnB1c2goPEZvb3RwcmludCBrZXk9e2l9IGRhdGE9e2Zvb3RwcmludH1cclxuXHRcdFx0XHRvbkVkaXQ9e2E9PnRoaXMuZWRpdGluZyhmb290cHJpbnQpfS8+KVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdFx0aWYocHVibGlzaGFibGUpe1xyXG5cdFx0XHRhbGwucHVzaChcclxuXHRcdFx0XHQ8U3RlcCBhY3RpdmU9e3RydWV9IGNvbXBsZXRlZD17ZmFsc2V9IGtleT1cInRyaWdnZXJcIj5cclxuXHRcdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj1cIipcIj5cclxuXHRcdFx0XHRcdFx0PHA+XHJcblx0XHRcdFx0XHRcdFx0PGlucHV0IHN0eWxlPXt7Ym9yZGVyOlwiMXB4IHNvbGlkIGxpZ2h0Z3JheVwiLHBhZGRpbmc6MTAsIG1hcmdpblJpZ2h0OjEwfX1cclxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnRoaXMuZWRpdGluZyh7d2hlbjpuZXcgRGF0ZSgpLCBqb3VybmV5Ol9pZH0sXCJ0ZXh0XCIpfVxyXG5cdFx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCLlj5HnirbmgIHlvZPovr7kurouLi5cIi8+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3twb3NpdGlvbjpcInJlbGF0aXZlXCIsIHRvcDo4fX0+XHJcblx0XHRcdFx0XHRcdFx0XHQ8SWNvbkNhbWVyYVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT50aGlzLmVkaXRpbmcoe3doZW46bmV3IERhdGUoKSwgam91cm5leTpfaWR9LFwicGhvdG9cIil9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbG9yPVwibGlnaHRncmF5XCIvPlxyXG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGFsbC5wdXNoKDxUaXRsZSBqb3VybmV5PXt0aGlzLnByb3BzLmpvdXJuZXl9IGtleT1cInRpdGxlXCIvPilcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIj5cclxuXHRcdFx0XHRcdHthbGwucmV2ZXJzZSgpfVxyXG5cdFx0XHRcdDwvU3RlcHBlcj5cclxuXHJcblx0XHRcdFx0PEVkaXRvciByZWY9XCJlZGl0b3JcIiBvblNhdmU9e2E9PnRoaXMub25TYXZlKGEpfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0b25TYXZlKGZvb3RwcmludCl7XHJcblx0XHRjb25zdCB7am91cm5leX09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IGNvbmQ9e2pvdXJuZXk6am91cm5leS5faWR9XHJcblx0XHRGb290cHJpbnREQi5maW5kKGNvbmQpLmZldGNoKGZvb3RwcmludHM9PnRoaXMuc2V0U3RhdGUoe2Zvb3RwcmludHN9KSlcclxuXHR9XHJcblx0XHJcblx0ZWRpdGluZyhmb290cHJpbnQsIGZvY3VzaW5nKXtcclxuXHRcdHRoaXMucmVmcy5lZGl0b3Iuc2V0U3RhdGUoe2Zvb3RwcmludCwgZm9jdXNpbmd9KVxyXG5cdH1cclxufVxyXG5cclxuXHJcbmNsYXNzIEVkaXRvciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRmb290cHJpbnQ6ZmFsc2UsXHJcblx0XHRmb2N1c2luZzpudWxsXHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2Zvb3RwcmludH09dGhpcy5zdGF0ZVxyXG5cdFx0XHJcblx0XHRpZighZm9vdHByaW50KVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHJcblx0XHRjb25zdCBhY3Rpb25zID0gW1xyXG5cdFx0XHQgIDxGbGF0QnV0dG9uXHJcblx0XHRcdFx0bGFiZWw9XCLlhbPpl61cIlxyXG5cdFx0XHRcdHByaW1hcnk9e2ZhbHNlfVxyXG5cdFx0XHRcdG9uVG91Y2hUYXA9e2U9PnRoaXMuY2FuY2VsKCl9XHJcblx0XHRcdCAgLz4sXHJcblx0XHRcdCAgPEZsYXRCdXR0b25cclxuXHRcdFx0XHRsYWJlbD1cIuS/neWtmFwiXHJcblx0XHRcdFx0cHJpbWFyeT17dHJ1ZX1cclxuXHRcdFx0XHRvblRvdWNoVGFwPXtlPT50aGlzLnNhdmUoKX1cclxuXHRcdFx0ICAvPixcclxuXHRcdFx0XTtcclxuXHJcbiAgICAgICAgbGV0IHtub3RlLCBwaG90b3Msd2hlbn09Zm9vdHByaW50XHJcbiAgICAgICAgXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8RGlhbG9nIHRpdGxlPXt3aGVuLnNtYXJ0Rm9ybWF0KCl9XHJcblx0XHRcdFx0YWN0aW9ucz17YWN0aW9uc31cclxuXHRcdFx0XHRtb2RhbD17ZmFsc2V9XHJcblx0XHRcdFx0b3Blbj17ISFmb290cHJpbnR9XHJcblx0XHRcdFx0b25SZXF1ZXN0Q2xvc2U9e2U9PnRoaXMuY2FuY2VsKCl9PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxyXG5cdFx0XHRcdFx0PFBob3Rvc0ZpZWxkIHJlZj1cInBob3Rvc1wiIGRlZmF1bHRWYWx1ZT17cGhvdG9zfSBcclxuXHRcdFx0XHRcdFx0aWNvblN0eWxlPXt7aWNvblJhdGlvOjIvMywgaWNvblNpemU6e3dpZHRoOjUwLCBoZWlnaHQ6NTB9fX0vPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8dGV4dGFyZWEgcmVmPVwidGV4dFwiXHJcblx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCIxMDAlXCIsYm9yZGVyOjAsaGVpZ2h0OjEwMCwgZm9udFNpemU6MTIsIHBhZGRpbmdUb3A6NSwgYm9yZGVyVG9wOlwiMXB4IGRvdHRlZCBsaWdodGdyYXlcIn19XHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwi6L+Z5LiA5Yi755qE5oOz5rOVXCJcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXtub3RlfS8+XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PENoaXBwZXIgY2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XCLml6nppJBcIixcIuWNiOmkkFwiLFwi5pma6aSQXCIsXCLotK3nialcIixcIumXqOelqFwiLFwi5YWs5LqkXCIsXCLpo57mnLpcIixcIueahOWjq1wiLFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLnibnoibLkuqTpgJpcIn0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIueJueiJsuWQg+eahFwifSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi6Iqx6ZSAXCIsdHlwZTpcIm51bWJlclwifVxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcblxyXG5cdFx0XHRcdFx0PENoaXBwZXIgY2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XCLlpKrnvo7kuoZcIixcIuaXoOazleWRvOWQuFwiLFwi5aSq5aOu6KeC5LqGXCIsXCLllpzmrKLov5nph4xcIlxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvRGlhbG9nPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGNvbnN0IHtmb2N1c2luZ309dGhpcy5wcm9wc1xyXG5cdFx0c3dpdGNoKGZvY3VzaW5nKXtcclxuXHRcdGNhc2UgXCJ0ZXh0XCI6XHJcblx0XHRcdHRoaXMucmVmcy50ZXh0LmZvY3VzKClcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwicGhvdG9cIjpcclxuXHRcdFx0dGhpcy5yZWZzLnBob3Rvcy5mb2N1cygpXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRjYW5jZWwoKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2Zvb3RwcmludDpudWxsfSlcclxuXHR9XHJcblx0XHJcblx0c2F2ZSgpe1xyXG5cdFx0Y29uc3Qge29uU2F2ZX09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge2Zvb3RwcmludH09dGhpcy5zdGF0ZVxyXG5cdFx0Y29uc3Qge3Bob3RvcywgdGV4dH09dGhpcy5yZWZzXHJcblx0XHRmb290cHJpbnQucGhvdG9zPXBob3Rvcy52YWx1ZVxyXG5cdFx0Zm9vdHByaW50Lm5vdGU9dGV4dC52YWx1ZVxyXG5cdFx0Rm9vdHByaW50REIudXBzZXJ0KGZvb3RwcmludClcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+e1xyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2Zvb3RwcmludDpudWxsfSlcclxuXHRcdFx0XHRvblNhdmUodXBkYXRlZClcdFxyXG5cdFx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRpdGxlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXksIGNvbXBsZXRlZCwgb25NYXB9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtuYW1lLF9pZCwgc3RhcnRlZEF0fT1qb3VybmV5XHJcblx0XHRpZihjb21wbGV0ZWQpe1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxTdGVwIGNvbXBsZXRlZD17dHJ1ZX0gZGlzYWJsZWQ9e3RydWV9PlxyXG5cdFx0XHRcdFx0PFN0ZXBMYWJlbD5cclxuXHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBqb3VybmV5LyR7X2lkfWApfSBzdHlsZT17e2N1cnNvcjpcImRlZmF1bHRcIn19PlxyXG5cdFx0XHRcdFx0XHRcdHtzdGFydGVkQXQuc21hcnRGb3JtYXQoKX1cclxuXHRcdFx0XHRcdFx0XHQ8YnIvPlxyXG5cdFx0XHRcdFx0XHRcdHtuYW1lfVxyXG5cdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHQ8L1N0ZXA+XHJcblx0XHRcdClcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRsZXQgbWFwVG9nZ2xlPW51bGxcclxuXHRcdFx0aWYob25NYXApe1xyXG5cdFx0XHRcdG1hcFRvZ2dsZT0oPGRpdiBzdHlsZT17e3dpZHRoOjEwMH19PjxUb2dnbGUgbGFiZWxQb3NpdGlvbj1cInJpZ2h0XCIgbGFiZWw9XCJNYXBcIm9uVG9nZ2xlPXtvbk1hcH0vPjwvZGl2PilcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxTdGVwIGNvbXBsZXRlZD17dHJ1ZX0gYWN0aXZlPXt0cnVlfT5cclxuXHRcdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj1cIipcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCIgc3R5bGU9e3tjdXJzb3I6XCJkZWZhdWx0XCJ9fT5cclxuXHRcdFx0XHRcdFx0XHQ8YiBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGpvdXJuZXkvJHtfaWR9YCl9PntuYW1lfTwvYj5cclxuXHRcdFx0XHRcdFx0XHR7bWFwVG9nZ2xlfVxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIERheSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IGxhYmVsPVRyYW5zcG9ydGF0aW9uRmllbGQuZ2V0TGFiZWxcclxuXHRcdGNvbnN0IHtkYXksZGF0ZSwgb25FZGl0LCBpdGluZXJhcnl9PXRoaXMucHJvcHNcclxuXHRcdGxldCBpdGlUZXh0PWl0aW5lcmFyeS5yZWR1Y2UoKHIsYSk9PntcclxuXHRcdFx0bGV0IHtkYXl0aCwgcGxhY2UsIHRyYW5zfT1hXHJcblx0XHRcdGlmKHRyYW5zIT11bmRlZmluZWQpe1xyXG5cdFx0XHRcdGlmKHRyYW5zPWxhYmVsKHRyYW5zKSlcclxuXHRcdFx0XHRcdHBsYWNlPWAke3RyYW5zfeWIsCR7cGxhY2V9YFxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiByLmxlbmd0aCA/IGAke3J9LCR7cGxhY2V9YCA6IHBsYWNlXHJcblx0XHR9LFwiXCIpXHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTdGVwIGRpc2FibGVkPXtmYWxzZX0+XHJcblx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPXtgJHtkYXl9YH0gb25Ub3VjaFRhcD17b25FZGl0fT5cclxuXHRcdFx0XHRcdDxzcGFuPntkYXRlLnNtYXJ0Rm9ybWF0KFwi5LuK5aSpXCIpfTwvc3Bhbj5cclxuXHRcdFx0XHRcdDxzcGFuPntpdGlUZXh0fTwvc3Bhbj5cclxuXHRcdFx0XHRcdDxJY29uTW9yZS8+XHJcblx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdDwvU3RlcD5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEZvb3RwcmludCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkYXRhOiB7d2hlbixwaG90b3M9W10sbm90ZX0sIG9uRWRpdH09dGhpcy5wcm9wc1xyXG5cdFx0cmV0dXJuICAoXHJcblx0XHRcdDxTdGVwIGNvbXBsZXRlZD17dHJ1ZX0gYWN0aXZlPXt0cnVlfT5cclxuXHRcdFx0XHQ8U3RlcExhYmVsIGljb249e1wiLlwifSA+XHJcblx0XHRcdFx0XHQ8dGltZT57d2hlbi5mb3JtYXQoJ0hIOm1tJyl9Jm5ic3A7PC90aW1lPlxyXG5cdFx0XHRcdFx0PHNwYW4+e25vdGV9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PEljb25Nb3JlIG9uVG91Y2hUYXA9e29uRWRpdH0gLz5cclxuXHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHQ8U3RlcENvbnRlbnQ+XHJcblx0XHRcdFx0XHQ8cD5cclxuXHRcdFx0XHRcdFx0e3Bob3Rvcy5tYXAoKHt1cmwsdGFrZW4sbG9jfSxpKT0+KDxpbWcga2V5PXtpfSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQudmlld1Bob3RvKHVybCl9IHN0eWxlPXt7aGVpZ2h0OjUwLCBtYXJnaW46Mn19IHNyYz17dXJsfS8+KSl9XHJcblx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0PC9TdGVwQ29udGVudD5cclxuXHRcdFx0PC9TdGVwPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHR2aWV3UGhvdG86UmVhY3QuUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcbn1cclxuIl19