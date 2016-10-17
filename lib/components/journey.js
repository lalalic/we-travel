"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Title = undefined;

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

var _map = require("material-ui/svg-icons/maps/map");

var _map2 = _interopRequireDefault(_map);

var _photoCamera = require("material-ui/svg-icons/image/photo-camera");

var _photoCamera2 = _interopRequireDefault(_photoCamera);

var _db = require("../db");

var _chipper = require("./chipper");

var _chipper2 = _interopRequireDefault(_chipper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;
var Photo = _qiliApp.UI.Photo;

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
			itinerary: [],
			footprints: []
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Journey, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			_db.Journey.getFootprints(this.props.journey).then(function (footprints) {
				return _this2.setState({ footprints: footprints });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var _props = this.props;
			var startedAt = _props.journey.startedAt;
			var onMap = _props.onMap;
			var publishable = _props.publishable;
			var _state = this.state;
			var footprints = _state.footprints;
			var editing = _state.editing;

			var currentDate = null,
			    lastDay = 0;
			var all = [_react2.default.createElement(Title, { journey: this.props.journey, key: "title" })];
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
									return _this3.setState({ editing: { when: new Date(), focusing: "text" } });
								},
								placeholder: "发状态当达人..." }),
							_react2.default.createElement(
								"span",
								{ style: { position: "relative", top: 8 } },
								_react2.default.createElement(_photoCamera2.default, {
									onClick: function onClick(e) {
										return _this3.setState({ editing: { when: new Date(), focusing: "photo" } });
									},
									color: "lightgray" })
							)
						)
					)
				));
			}

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
						all.push(_react2.default.createElement(Day, { key: lastDay, day: lastDay,
							date: date,
							onEdit: function onEdit(a) {
								return _this3.setState({ editing: { when: date } });
							} }));
					};

					while (lastDay < day) {
						_loop();
					}
				}
				all.push(_react2.default.createElement(Footprint, { key: i, data: footprint,
					onEdit: function onEdit(a) {
						return _this3.setState({ editing: footprint });
					} }));
			});

			var editor = null;
			if (editing) {
				var focusing = editing.focusing;

				var others = _objectWithoutProperties(editing, ["focusing"]);

				editor = _react2.default.createElement(Editor, { footprint: others,
					focusing: focusing,
					onSave: function onSave(a) {
						return _this3.onSave(a);
					},
					onCancel: function onCancel(a) {
						return _this3.setState({ editing: undefined });
					} });
			}
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_Stepper.Stepper,
					{ orientation: "vertical" },
					all
				),
				editor
			);
		}
	}, {
		key: "onSave",
		value: function onSave(footprint) {
			var journey = this.props.journey;
			var _state$footprints = this.state.footprints;
			var footprints = _state$footprints === undefined ? [] : _state$footprints;

			footprint.journey = journey._id;
			this.state.setState({ footprints: footprints.concat([footprint]) });
			_db.Footprint.upsert(footprint).then(function (a) {
				_db.Journey.emit("footprint.changed");
			});
		}
	}]);

	return Journey;
}(_react.Component);

exports.default = Journey;

var Editor = function (_Component2) {
	_inherits(Editor, _Component2);

	function Editor() {
		_classCallCheck(this, Editor);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).apply(this, arguments));
	}

	_createClass(Editor, [{
		key: "render",
		value: function render() {
			var _this5 = this;

			var _props2 = this.props;
			var footprint = _props2.footprint;
			var onSave = _props2.onSave;
			var onCancel = _props2.onCancel;
			var focusing = _props2.focusing;

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

			if (uiPhotos.length < 9) uiPhotos.push(_react2.default.createElement(Photo, _extends({ ref: "photo", key: "_new" }, styles, {
				onPhoto: function onPhoto(url, i) {
					return _this5.onPhoto(url, i);
				} })));

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
					_react2.default.createElement("textarea", { ref: "text",
						style: { width: "100%", border: 0, height: 100, fontSize: 12, paddingTop: 5, borderTop: "1px dotted lightgray" },
						placeholder: "这一刻的想法",
						defaultValue: footprint.note }),
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
					this.refs.photo.doPhoto();
					break;
			}
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

var Title = exports.Title = function (_Component3) {
	_inherits(Title, _Component3);

	function Title() {
		_classCallCheck(this, Title);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
	}

	_createClass(Title, [{
		key: "render",
		value: function render() {
			var _this8 = this;

			var _props3 = this.props;
			var journey = _props3.journey;
			var completed = _props3.completed;
			var onMap = _props3.onMap;
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
									return _this8.context.router.push("journey/" + _id);
								} },
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
							{ className: "grid" },
							_react2.default.createElement(
								"b",
								{ onClick: function onClick(e) {
										return _this8.context.router.push("journey/" + _id);
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
			var _props4 = this.props;
			var day = _props4.day;
			var date = _props4.date;
			var onEdit = _props4.onEdit;

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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Footprint).apply(this, arguments));
	}

	_createClass(Footprint, [{
		key: "render",
		value: function render() {
			var _this11 = this;

			var _props5 = this.props;
			var _props5$data = _props5.data;
			var when = _props5$data.when;
			var _props5$data$photos = _props5$data.photos;
			var photos = _props5$data$photos === undefined ? [] : _props5$data$photos;
			var note = _props5$data.note;
			var onEdit = _props5.onEdit;

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
						photos.map(function (_ref, i) {
							var url = _ref.url;
							var taken = _ref.taken;
							var loc = _ref.loc;
							return _react2.default.createElement("img", { key: i, onClick: function onClick(e) {
									return _this11.context.viewPhoto(url);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2pvdXJuZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVPO0lBQU87O0lBRU87Ozs7Ozs7Ozs7Ozs7O21NQUNwQixRQUFNO0FBQ0wsY0FBVSxFQUFWO0FBQ0EsZUFBVyxFQUFYOzs7O2NBSG1COztzQ0FLRDs7O0FBQ2xCLGVBQVUsYUFBVixDQUF3QixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQXhCLENBQ0UsSUFERixDQUNPO1dBQVksT0FBSyxRQUFMLENBQWMsRUFBQyxzQkFBRCxFQUFkO0lBQVosQ0FEUCxDQURrQjs7OzsyQkFJWDs7O2dCQUN1QyxLQUFLLEtBQUwsQ0FEdkM7T0FDTyxtQkFBVCxRQUFTLFVBRFA7T0FDbUIscUJBRG5CO09BQzBCLGlDQUQxQjtnQkFFbUIsS0FBSyxLQUFMLENBRm5CO09BRUYsK0JBRkU7T0FFVSx5QkFGVjs7QUFHUCxPQUFJLGNBQVksSUFBWjtPQUFrQixVQUFRLENBQVIsQ0FIZjtBQUlQLE9BQUksTUFBSSxDQUFDLDhCQUFDLEtBQUQsSUFBTyxTQUFTLEtBQUssS0FBTCxDQUFXLE9BQVgsRUFBb0IsS0FBSSxPQUFKLEVBQXBDLENBQUQsQ0FBSixDQUpHO0FBS1AsT0FBRyxXQUFILEVBQWU7QUFDZCxRQUFJLElBQUosQ0FDQzs7T0FBTSxRQUFRLElBQVIsRUFBYyxXQUFXLEtBQVgsRUFBa0IsS0FBSSxTQUFKLEVBQXRDO0tBQ0M7O1FBQVcsTUFBSyxHQUFMLEVBQVg7TUFDQzs7O09BQ0MseUNBQU8sT0FBTyxFQUFDLFFBQU8scUJBQVAsRUFBNkIsU0FBUSxFQUFSLEVBQVksYUFBWSxFQUFaLEVBQWpEO0FBQ04saUJBQVM7Z0JBQUcsT0FBSyxRQUFMLENBQWMsRUFBQyxTQUFRLEVB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QkFESjtPQUNVLHdCQURWOztBQUVQLFVBQ0M7O01BQU0sVUFBVSxLQUFWLEVBQU47SUFDQzs7T0FBVyxXQUFTLEdBQVQsRUFBZ0IsWUFBWSxNQUFaLEVBQTNCO0tBQ0M7OztNQUFPLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFQO01BREQ7S0FFQyx3REFGRDtLQUREO0lBREQsQ0FGTzs7OztRQURIOzs7SUFjQTs7Ozs7Ozs7Ozs7MkJBQ0c7OztpQkFDcUMsS0FBSyxLQUFMLENBRHJDOzhCQUNBLEtBREE7T0FDTyx5QkFEUDswQ0FDWSxPQURaO09BQ1ksNkNBQU8seUJBRG5CO09BQ3NCLHlCQUR0QjtPQUM2Qix3QkFEN0I7O0FBRVAsVUFDQzs7TUFBTSxXQUFXLElBQVgsRUFBaUIsUUFBUSxJQUFSLEVBQXZCO0lBQ0M7O09BQVcsTUFBTSxHQUFOLEVBQVg7S0FDQzs7O01BQU8sS0FBSyxNQUFMLENBQVksT0FBWixDQUFQOztNQUREO0tBRUM7OztNQUFPLElBQVA7TUFGRDtLQUdDLHFEQUFVLFlBQVksTUFBWixFQUFWLENBSEQ7S0FERDtJQU1DOzs7S0FDQzs7O01BQ0UsT0FBTyxHQUFQLENBQVcsZ0JBQWlCLENBQWpCO1dBQUU7V0FBSTtXQUFNO2NBQVUsdUNBQUssS0FBSyxDQUFMLEVBQVEsU0FBUztnQkFBRyxRQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCO1NBQUgsRUFBZ0MsT0FBTyxFQUFDLFFBQU8sRUFBUCxFQUFXLFFBQU8sQ0FBUCxFQUFuQixFQUE4QixLQUFLLEdBQUwsRUFBcEY7T0FBdEIsQ0FEYjtNQUREO0tBTkQ7SUFERCxDQUZPOzs7O1FBREg7OztVQW1CRSxlQUFhO0FBQ25CLFlBQVUsZ0JBQU0sU0FBTixDQUFnQixJQUFoQiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge1VJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9uLCBJY29uQnV0dG9uLCBEaWFsb2csIFRvZ2dsZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtTdGVwLFN0ZXBwZXIsU3RlcExhYmVsLFN0ZXBDb250ZW50fSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xyXG5cclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBJY29uTW9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLWhvcml6J1xyXG5pbXBvcnQgSWNvbkFkZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQnXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5pbXBvcnQgSWNvbkNhbWVyYSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvcGhvdG8tY2FtZXJhJ1xyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQiwgRm9vdHByaW50IGFzIEZvb3RwcmludERCfSBmcm9tIFwiLi4vZGJcIlxyXG5pbXBvcnQgQ2hpcHBlciBmcm9tIFwiLi9jaGlwcGVyXCJcclxuXHJcbmNvbnN0IHtFbXB0eSwgUGhvdG99PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb3VybmV5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtcclxuXHRcdGl0aW5lcmFyeTpbXSxcclxuXHRcdGZvb3RwcmludHM6W11cclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdEpvdXJuZXlEQi5nZXRGb290cHJpbnRzKHRoaXMucHJvcHMuam91cm5leSlcclxuXHRcdFx0LnRoZW4oZm9vdHByaW50cz0+dGhpcy5zZXRTdGF0ZSh7Zm9vdHByaW50c30pKVxyXG5cdH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCB7am91cm5leTp7c3RhcnRlZEF0fSwgb25NYXAsIHB1Ymxpc2hhYmxlfT10aGlzLnByb3BzXHJcblx0XHRsZXQge2Zvb3RwcmludHMsIGVkaXRpbmd9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBjdXJyZW50RGF0ZT1udWxsLCBsYXN0RGF5PTBcclxuXHRcdGxldCBhbGw9WzxUaXRsZSBqb3VybmV5PXt0aGlzLnByb3BzLmpvdXJuZXl9IGtleT1cInRpdGxlXCIvPl1cclxuXHRcdGlmKHB1Ymxpc2hhYmxlKXtcclxuXHRcdFx0YWxsLnB1c2goXHJcblx0XHRcdFx0PFN0ZXAgYWN0aXZlPXt0cnVlfSBjb21wbGV0ZWQ9e2ZhbHNlfSBrZXk9XCJ0cmlnZ2VyXCI+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsIGljb249XCIqXCI+XHJcblx0XHRcdFx0XHRcdDxwPlxyXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBzdHlsZT17e2JvcmRlcjpcIjFweCBzb2xpZCBsaWdodGdyYXlcIixwYWRkaW5nOjEwLCBtYXJnaW5SaWdodDoxMH19XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOnt3aGVuOm5ldyBEYXRlKCksZm9jdXNpbmc6XCJ0ZXh0XCJ9fSl9XHJcblx0XHRcdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIuWPkeeKtuaAgeW9k+i+vuS6ui4uLlwiLz5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3Bvc2l0aW9uOlwicmVsYXRpdmVcIiwgdG9wOjh9fT5cclxuXHRcdFx0XHRcdFx0XHRcdDxJY29uQ2FtZXJhXHJcblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6e3doZW46bmV3IERhdGUoKSxmb2N1c2luZzpcInBob3RvXCJ9fSl9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGNvbG9yPVwibGlnaHRncmF5XCIvPlxyXG5cdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblxyXG5cdFx0Zm9vdHByaW50cy5mb3JFYWNoKChmb290cHJpbnQsaSk9PntcclxuXHRcdFx0Y29uc3Qge3doZW4scGhvdG8sbm90ZX09Zm9vdHByaW50XHJcblx0XHRcdGlmKGN1cnJlbnREYXRlPT1udWxsIHx8ICF3aGVuLmlzU2FtZURhdGUoY3VycmVudERhdGUpKXtcclxuXHRcdFx0XHRjdXJyZW50RGF0ZT13aGVuXHJcblx0XHRcdFx0bGV0IGRheT1jdXJyZW50RGF0ZS5yZWxhdGl2ZShzdGFydGVkQXQpKzFcclxuXHRcdFx0XHR3aGlsZShsYXN0RGF5PGRheSl7XHJcblx0XHRcdFx0XHRsYXN0RGF5KytcclxuXHRcdFx0XHRcdGxldCBkYXRlPXN0YXJ0ZWRBdC5yZWxhdGl2ZURhdGUobGFzdERheS0xKVxyXG5cdFx0XHRcdFx0YWxsLnB1c2goPERheSBrZXk9e2xhc3REYXl9IGRheT17bGFzdERheX1cclxuXHRcdFx0XHRcdFx0ZGF0ZT17ZGF0ZX1cclxuXHRcdFx0XHRcdFx0b25FZGl0PXthPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOnt3aGVuOmRhdGV9fSl9Lz4pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGFsbC5wdXNoKDxGb290cHJpbnQga2V5PXtpfSBkYXRhPXtmb290cHJpbnR9XHJcblx0XHRcdFx0b25FZGl0PXthPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOmZvb3RwcmludH0pfS8+KVxyXG5cdFx0fSlcclxuXHJcblx0XHRsZXQgZWRpdG9yPW51bGxcclxuXHRcdGlmKGVkaXRpbmcpe1xyXG5cdFx0XHRjb25zdCB7Zm9jdXNpbmcsIC4uLm90aGVyc309ZWRpdGluZ1xyXG5cdFx0XHRlZGl0b3I9KDxFZGl0b3IgZm9vdHByaW50PXtvdGhlcnN9XHJcblx0XHRcdFx0XHRmb2N1c2luZz17Zm9jdXNpbmd9XHJcblx0XHRcdFx0XHRvblNhdmU9e2E9PnRoaXMub25TYXZlKGEpfVxyXG5cdFx0XHRcdFx0b25DYW5jZWw9e2E9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6dW5kZWZpbmVkfSl9Lz4pXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIj5cclxuXHRcdFx0XHRcdHthbGx9XHJcblx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cclxuXHRcdFx0XHR7ZWRpdG9yfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdG9uU2F2ZShmb290cHJpbnQpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXl9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtmb290cHJpbnRzPVtdfT10aGlzLnN0YXRlXHJcblx0XHRmb290cHJpbnQuam91cm5leT1qb3VybmV5Ll9pZFxyXG5cdFx0dGhpcy5zdGF0ZS5zZXRTdGF0ZSh7Zm9vdHByaW50czogZm9vdHByaW50cy5jb25jYXQoW2Zvb3RwcmludF0pfSlcclxuXHRcdEZvb3RwcmludERCLnVwc2VydChmb290cHJpbnQpXHJcblx0XHRcdC50aGVuKGE9PntcclxuXHRcdFx0XHRKb3VybmV5REIuZW1pdChcImZvb3RwcmludC5jaGFuZ2VkXCIpXHJcblx0XHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5cclxuY2xhc3MgRWRpdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2Zvb3RwcmludCwgb25TYXZlLCBvbkNhbmNlbCwgZm9jdXNpbmd9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IGFjdGlvbnMgPSBbXHJcblx0XHRcdCAgPEZsYXRCdXR0b25cclxuXHRcdFx0XHRsYWJlbD1cIuWFs+mXrVwiXHJcblx0XHRcdFx0cHJpbWFyeT17ZmFsc2V9XHJcblx0XHRcdFx0b25Ub3VjaFRhcD17b25DYW5jZWx9XHJcblx0XHRcdCAgLz4sXHJcblx0XHRcdCAgPEZsYXRCdXR0b25cclxuXHRcdFx0XHRsYWJlbD1cIuS/neWtmFwiXHJcblx0XHRcdFx0cHJpbWFyeT17dHJ1ZX1cclxuXHRcdFx0XHRvblRvdWNoVGFwPXtvblNhdmV9XHJcblx0XHRcdCAgLz4sXHJcblx0XHRcdF07XHJcblxyXG5cdFx0dmFyIHtub3RlLCBwaG90b3M9W119PWZvb3RwcmludCxcclxuICAgICAgICAgICAgc3R5bGVzPXtpY29uUmF0aW86Mi8zLCBpY29uU2l6ZTp7d2lkdGg6NTAsIGhlaWdodDo1MH19LFxyXG4gICAgICAgICAgICBpPTAsXHJcbiAgICAgICAgICAgIHVpUGhvdG9zPXBob3Rvcy5tYXAoZnVuY3Rpb24ocGhvdG8pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8UGhvdG8ga2V5PXtwaG90b30gey4uLnN0eWxlc31cclxuICAgICAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+dGhpcy5vblBob3RvKHVybCxpKyspfVxyXG4gICAgICAgICAgICAgICAgICAgIHNyYz17cGhvdG99Lz4pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIGlmKHVpUGhvdG9zLmxlbmd0aDw5KVxyXG4gICAgICAgICAgICB1aVBob3Rvcy5wdXNoKCg8UGhvdG8gcmVmPVwicGhvdG9cIiBrZXk9XCJfbmV3XCIgey4uLnN0eWxlc31cclxuXHRcdFx0XHRvblBob3RvPXsodXJsLGkpPT50aGlzLm9uUGhvdG8odXJsLGkpfS8+KSlcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8RGlhbG9nIHRpdGxlPXtmb290cHJpbnQud2hlbi5zbWFydEZvcm1hdCgpfVxyXG5cdFx0XHRcdGFjdGlvbnM9e2FjdGlvbnN9XHJcblx0XHRcdFx0bW9kYWw9e2ZhbHNlfVxyXG5cdFx0XHRcdG9wZW49e3RydWV9XHJcblx0XHRcdFx0b25SZXF1ZXN0Q2xvc2U9e29uQ2FuY2VsfT5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246XCJjZW50ZXJcIn19Pnt1aVBob3Rvc308L2Rpdj5cclxuXHRcdFx0XHRcdDx0ZXh0YXJlYSByZWY9XCJ0ZXh0XCJcclxuXHRcdFx0XHRcdFx0c3R5bGU9e3t3aWR0aDpcIjEwMCVcIixib3JkZXI6MCxoZWlnaHQ6MTAwLCBmb250U2l6ZToxMiwgcGFkZGluZ1RvcDo1LCBib3JkZXJUb3A6XCIxcHggZG90dGVkIGxpZ2h0Z3JheVwifX1cclxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCLov5nkuIDliLvnmoTmg7Pms5VcIlxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e2Zvb3RwcmludC5ub3RlfS8+XHJcblx0XHRcdFx0XHQ8Q2hpcHBlciBjaGlwcz17W1xyXG5cdFx0XHRcdFx0XHRcIuaXqemkkFwiLFwi5Y2I6aSQXCIsXCLmmZrppJBcIixcIui0reeJqVwiLFwi6Zeo56WoXCIsXCLlhazkuqRcIixcIumjnuaculwiLFwi55qE5aOrXCIsXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIueJueiJsuS6pOmAmlwifSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi54m56Imy5ZCD55qEXCJ9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLoirHplIBcIix0eXBlOlwibnVtYmVyXCJ9XHJcblx0XHRcdFx0XHRcdF19Lz5cclxuXHJcblx0XHRcdFx0XHQ8Q2hpcHBlciBjaGlwcz17W1xyXG5cdFx0XHRcdFx0XHRcIuWkque+juS6hlwiLFwi5peg5rOV5ZG85ZC4XCIsXCLlpKrlo67op4LkuoZcIixcIuWWnOasoui/memHjFwiXHJcblx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9EaWFsb2c+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Y29uc3Qge2ZvY3VzaW5nfT10aGlzLnByb3BzXHJcblx0XHRzd2l0Y2goZm9jdXNpbmcpe1xyXG5cdFx0Y2FzZSBcInRleHRcIjpcclxuXHRcdFx0dGhpcy5yZWZzLnRleHQuZm9jdXMoKVxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJwaG90b1wiOlxyXG5cdFx0XHR0aGlzLnJlZnMucGhvdG8uZG9QaG90bygpXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25QaG90byh1cmwsIGluZGV4KXtcclxuICAgICAgICB2YXIge2Zvb3RwcmludH09dGhpcy5wcm9wc1xyXG4gICAgICAgIGlmKGZvb3RwcmludC5waG90b3MuaW5kZXhPZih1cmwpIT0tMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGluZGV4IT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGZvb3RwcmludC5waG90b3Muc3BsaWNlKGluZGV4LDEsdXJsKVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGZvb3RwcmludC5waG90b3MucHVzaCh1cmwpXHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRpdGxlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXksIGNvbXBsZXRlZCwgb25NYXB9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtuYW1lLF9pZCwgc3RhcnRlZEF0fT1qb3VybmV5XHJcblx0XHRpZihjb21wbGV0ZWQpe1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxTdGVwIGNvbXBsZXRlZD17dHJ1ZX0gZGlzYWJsZWQ9e3RydWV9PlxyXG5cdFx0XHRcdFx0PFN0ZXBMYWJlbD5cclxuXHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBqb3VybmV5LyR7X2lkfWApfT5cclxuXHRcdFx0XHRcdFx0XHR7c3RhcnRlZEF0LnNtYXJ0Rm9ybWF0KCl9XHJcblx0XHRcdFx0XHRcdFx0PGJyLz5cclxuXHRcdFx0XHRcdFx0XHR7bmFtZX1cclxuXHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHQpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IG1hcFRvZ2dsZT1udWxsXHJcblx0XHRcdGlmKG9uTWFwKXtcclxuXHRcdFx0XHRtYXBUb2dnbGU9KDxkaXYgc3R5bGU9e3t3aWR0aDoxMDB9fT48VG9nZ2xlIGxhYmVsUG9zaXRpb249XCJyaWdodFwiIGxhYmVsPVwiTWFwXCJvblRvZ2dsZT17b25NYXB9Lz48L2Rpdj4pXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8U3RlcCBjb21wbGV0ZWQ9e3RydWV9IGFjdGl2ZT17dHJ1ZX0+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsIGljb249XCIqXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxiIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgam91cm5leS8ke19pZH1gKX0+e25hbWV9PC9iPlxyXG5cdFx0XHRcdFx0XHRcdHttYXBUb2dnbGV9XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgRGF5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2RheSxkYXRlLCBvbkVkaXR9PXRoaXMucHJvcHNcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTdGVwIGRpc2FibGVkPXtmYWxzZX0+XHJcblx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPXtgJHtkYXl9YH0gb25Ub3VjaFRhcD17b25FZGl0fT5cclxuXHRcdFx0XHRcdDxzcGFuPntkYXRlLnNtYXJ0Rm9ybWF0KFwi5LuK5aSpXCIpfTwvc3Bhbj5cclxuXHRcdFx0XHRcdDxJY29uTW9yZS8+XHJcblx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdDwvU3RlcD5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEZvb3RwcmludCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkYXRhOiB7d2hlbixwaG90b3M9W10sbm90ZX0sIG9uRWRpdH09dGhpcy5wcm9wc1xyXG5cdFx0cmV0dXJuICAoXHJcblx0XHRcdDxTdGVwIGNvbXBsZXRlZD17dHJ1ZX0gYWN0aXZlPXt0cnVlfT5cclxuXHRcdFx0XHQ8U3RlcExhYmVsIGljb249e1wiLlwifSA+XHJcblx0XHRcdFx0XHQ8dGltZT57d2hlbi5mb3JtYXQoJ0hIOm1tJyl9Jm5ic3A7PC90aW1lPlxyXG5cdFx0XHRcdFx0PHNwYW4+e25vdGV9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PEljb25Nb3JlIG9uVG91Y2hUYXA9e29uRWRpdH0gLz5cclxuXHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHQ8U3RlcENvbnRlbnQ+XHJcblx0XHRcdFx0XHQ8cD5cclxuXHRcdFx0XHRcdFx0e3Bob3Rvcy5tYXAoKHt1cmwsdGFrZW4sbG9jfSxpKT0+KDxpbWcga2V5PXtpfSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQudmlld1Bob3RvKHVybCl9IHN0eWxlPXt7aGVpZ2h0OjUwLCBtYXJnaW46Mn19IHNyYz17dXJsfS8+KSl9XHJcblx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0PC9TdGVwQ29udGVudD5cclxuXHRcdFx0PC9TdGVwPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHR2aWV3UGhvdG86UmVhY3QuUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcbn1cclxuIl19