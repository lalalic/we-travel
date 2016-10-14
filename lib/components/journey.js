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

var _db = require("../db");

var _chipper = require("./chipper");

var _chipper2 = _interopRequireDefault(_chipper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
			var _state = this.state;
			var footprints = _state.footprints;
			var editing = _state.editing;

			var currentDate = null,
			    lastDay = 0,
			    all = [];

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
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_Stepper.Stepper,
					{ orientation: "vertical" },
					_react2.default.createElement(Title, { journey: this.props.journey, onMap: onMap }),
					all
				),
				editing && _react2.default.createElement(Editor, { footprint: editing,
					onSave: function onSave(a) {
						return _this3.onSave(a);
					},
					onCancel: function onCancel(a) {
						return _this3.setState({ editing: undefined });
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
			var _props2 = this.props;
			var footprint = _props2.footprint;
			var onSave = _props2.onSave;
			var onCancel = _props2.onCancel;

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
				var _this5 = this;

				return _react2.default.createElement(Photo, _extends({ key: photo }, styles, {
					onPhoto: function onPhoto(url) {
						return _this5.onPhoto(url, i++);
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

var Title = exports.Title = function (_Component3) {
	_inherits(Title, _Component3);

	function Title() {
		_classCallCheck(this, Title);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
	}

	_createClass(Title, [{
		key: "render",
		value: function render() {
			var _this7 = this;

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
									return _this7.context.router.push("journey/" + _id);
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
					null,
					_react2.default.createElement(
						_Stepper.StepLabel,
						{ icon: "*" },
						_react2.default.createElement(
							"div",
							{ className: "grid" },
							_react2.default.createElement(
								"b",
								{ onClick: function onClick(e) {
										return _this7.context.router.push("journey/" + _id);
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
			var _this10 = this;

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
									return _this10.context.viewPhoto(url);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2pvdXJuZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU87SUFBTzs7SUFFTzs7Ozs7Ozs7Ozs7Ozs7bU1BQ3BCLFFBQU07QUFDTCxjQUFVLEVBQVY7QUFDQSxlQUFXLEVBQVg7Ozs7Y0FIbUI7O3NDQUtEOzs7QUFDbEIsZUFBVSxhQUFWLENBQXdCLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBeEIsQ0FDRSxJQURGLENBQ087V0FBWSxPQUFLLFFBQUwsQ0FBYyxFQUFDLHNCQUFELEVBQWQ7SUFBWixDQURQLENBRGtCOzs7OzJCQUlYOzs7Z0JBQzBCLEtBQUssS0FBTCxDQUQxQjtPQUNPLG1CQUFULFFBQVMsVUFEUDtPQUNtQixxQkFEbkI7Z0JBRW1CLEtBQUssS0FBTCxDQUZuQjtPQUVGLCtCQUZFO09BRVUseUJBRlY7O0FBR1AsT0FBSSxjQUFZLElBQVo7T0FBa0IsVUFBUSxDQUFSO09BQVcsTUFBSSxFQUFKLENBSDFCOztBQUtQLGNBQVcsT0FBWCxDQUFtQixVQUFDLFNBQUQsRUFBVyxDQUFYLEVBQWU7UUFDMUIsT0FBaUIsVUFBakIsS0FEMEI7UUFDckIsUUFBWSxVQUFaLE1BRHFCO1FBQ2YsT0FBTSxVQUFOLEtBRGU7O0FBRWpDLFFBQUcsZUFBYSxJQUFiLElBQXFCLENBQUMsS0FBSyxVQUFMLENBQWdCLFdBQWhCLENBQUQsRUFBOEI7QUFDckQsbUJBQVksSUFBWixDQURxRDtBQUVyRCxTQUFJLE1BQUksWUFBWSxRQUFaLENBQXFCLFNBQXJCLElBQWdDLENBQWhDLENBRjZDOzs7QUFJcEQ7QUFDQSxVQUFJLE9BQUssVUFBVSxZQUFWLENBQXVCLFVBQVEsQ0FBUixDQUE1QjtBQUNKLFVBQUksSUFBSixDQUFTLDhCQUFDLEdBQUQs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RG5CO09BQ3NCLHlCQUR0QjtPQUM2Qix3QkFEN0I7O0FBRVAsVUFDQzs7TUFBTSxXQUFXLElBQVgsRUFBaUIsUUFBUSxJQUFSLEVBQXZCO0lBQ0M7O09BQVcsTUFBTSxHQUFOLEVBQVg7S0FDQzs7O01BQU8sS0FBSyxNQUFMLENBQVksT0FBWixDQUFQOztNQUREO0tBRUM7OztNQUFPLElBQVA7TUFGRDtLQUdDLHFEQUFVLFlBQVksTUFBWixFQUFWLENBSEQ7S0FERDtJQU1DOzs7S0FDQzs7O01BQ0UsT0FBTyxHQUFQLENBQVcsZ0JBQWlCLENBQWpCO1dBQUU7V0FBSTtXQUFNO2NBQVUsdUNBQUssS0FBSyxDQUFMLEVBQVEsU0FBUztnQkFBRyxRQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCO1NBQUgsRUFBZ0MsT0FBTyxFQUFDLFFBQU8sRUFBUCxFQUFXLFFBQU8sQ0FBUCxFQUFuQixFQUE4QixLQUFLLEdBQUwsRUFBcEY7T0FBdEIsQ0FEYjtNQUREO0tBTkQ7SUFERCxDQUZPOzs7O1FBREg7OztVQW1CRSxlQUFhO0FBQ25CLFlBQVUsZ0JBQU0sU0FBTixDQUFnQixJQUFoQiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge1VJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9uLCBJY29uQnV0dG9uLCBEaWFsb2csIFRvZ2dsZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtTdGVwLFN0ZXBwZXIsU3RlcExhYmVsLFN0ZXBDb250ZW50fSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xyXG5cclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBJY29uTW9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLWhvcml6J1xyXG5pbXBvcnQgSWNvbkFkZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQnXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQiwgRm9vdHByaW50IGFzIEZvb3RwcmludERCfSBmcm9tIFwiLi4vZGJcIlxyXG5pbXBvcnQgQ2hpcHBlciBmcm9tIFwiLi9jaGlwcGVyXCJcclxuXHJcbmNvbnN0IHtFbXB0eSwgUGhvdG99PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb3VybmV5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtcclxuXHRcdGl0aW5lcmFyeTpbXSxcclxuXHRcdGZvb3RwcmludHM6W11cclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdEpvdXJuZXlEQi5nZXRGb290cHJpbnRzKHRoaXMucHJvcHMuam91cm5leSlcclxuXHRcdFx0LnRoZW4oZm9vdHByaW50cz0+dGhpcy5zZXRTdGF0ZSh7Zm9vdHByaW50c30pKVxyXG5cdH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCB7am91cm5leTp7c3RhcnRlZEF0fSwgb25NYXB9PXRoaXMucHJvcHNcclxuXHRcdGxldCB7Zm9vdHByaW50cywgZWRpdGluZ309dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IGN1cnJlbnREYXRlPW51bGwsIGxhc3REYXk9MCwgYWxsPVtdO1xyXG5cclxuXHRcdGZvb3RwcmludHMuZm9yRWFjaCgoZm9vdHByaW50LGkpPT57XHJcblx0XHRcdGNvbnN0IHt3aGVuLHBob3RvLG5vdGV9PWZvb3RwcmludFxyXG5cdFx0XHRpZihjdXJyZW50RGF0ZT09bnVsbCB8fCAhd2hlbi5pc1NhbWVEYXRlKGN1cnJlbnREYXRlKSl7XHJcblx0XHRcdFx0Y3VycmVudERhdGU9d2hlblxyXG5cdFx0XHRcdGxldCBkYXk9Y3VycmVudERhdGUucmVsYXRpdmUoc3RhcnRlZEF0KSsxXHJcblx0XHRcdFx0d2hpbGUobGFzdERheTxkYXkpe1xyXG5cdFx0XHRcdFx0bGFzdERheSsrXHJcblx0XHRcdFx0XHRsZXQgZGF0ZT1zdGFydGVkQXQucmVsYXRpdmVEYXRlKGxhc3REYXktMSlcclxuXHRcdFx0XHRcdGFsbC5wdXNoKDxEYXkga2V5PXtsYXN0RGF5fSBkYXk9e2xhc3REYXl9XHJcblx0XHRcdFx0XHRcdGRhdGU9e2RhdGV9XHJcblx0XHRcdFx0XHRcdG9uRWRpdD17YT0+dGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzp7d2hlbjpkYXRlfX0pfS8+KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRhbGwucHVzaCg8Rm9vdHByaW50IGtleT17aX0gZGF0YT17Zm9vdHByaW50fVxyXG5cdFx0XHRcdG9uRWRpdD17YT0+dGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzpmb290cHJpbnR9KX0vPilcclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIj5cclxuXHRcdFx0XHRcdDxUaXRsZSBqb3VybmV5PXt0aGlzLnByb3BzLmpvdXJuZXl9IG9uTWFwPXtvbk1hcH0vPlxyXG5cdFx0XHRcdFx0e2FsbH1cclxuXHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdFx0e2VkaXRpbmcgJiYgKDxFZGl0b3IgZm9vdHByaW50PXtlZGl0aW5nfVxyXG5cdFx0XHRcdFx0b25TYXZlPXthPT50aGlzLm9uU2F2ZShhKX1cclxuXHRcdFx0XHRcdG9uQ2FuY2VsPXthPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOnVuZGVmaW5lZH0pfS8+KX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRvblNhdmUoZm9vdHByaW50KXtcclxuXHRcdGNvbnN0IHtqb3VybmV5fT10aGlzLnByb3BzXHJcblx0XHRKb3VybmV5REIudXBzZXJ0KGZvb3RwcmludClcclxuXHRcdFx0LnRoZW4oYT0+e1xyXG5cdFx0XHRcdEpvdXJuZXlEQi5lbWl0KFwiZm9vdHByaW50LmNoYW5nZWRcIilcclxuXHRcdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBFZGl0b3IgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7Zm9vdHByaW50LCBvblNhdmUsIG9uQ2FuY2VsfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCBhY3Rpb25zID0gW1xyXG5cdFx0XHQgIDxGbGF0QnV0dG9uXHJcblx0XHRcdFx0bGFiZWw9XCLlhbPpl61cIlxyXG5cdFx0XHRcdHByaW1hcnk9e2ZhbHNlfVxyXG5cdFx0XHRcdG9uVG91Y2hUYXA9e29uQ2FuY2VsfVxyXG5cdFx0XHQgIC8+LFxyXG5cdFx0XHQgIDxGbGF0QnV0dG9uXHJcblx0XHRcdFx0bGFiZWw9XCLkv53lrZhcIlxyXG5cdFx0XHRcdHByaW1hcnk9e3RydWV9XHJcblx0XHRcdFx0b25Ub3VjaFRhcD17b25TYXZlfVxyXG5cdFx0XHQgIC8+LFxyXG5cdFx0XHRdO1xyXG5cclxuXHRcdHZhciB7bm90ZSwgcGhvdG9zPVtdfT1mb290cHJpbnQsXHJcbiAgICAgICAgICAgIHN0eWxlcz17aWNvblJhdGlvOjIvMywgaWNvblNpemU6e3dpZHRoOjUwLCBoZWlnaHQ6NTB9fSxcclxuICAgICAgICAgICAgaT0wLFxyXG4gICAgICAgICAgICB1aVBob3Rvcz1waG90b3MubWFwKGZ1bmN0aW9uKHBob3RvKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoPFBob3RvIGtleT17cGhvdG99IHsuLi5zdHlsZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9PnRoaXMub25QaG90byh1cmwsaSsrKX1cclxuICAgICAgICAgICAgICAgICAgICBzcmM9e3Bob3RvfS8+KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICBpZih1aVBob3Rvcy5sZW5ndGg8OSlcclxuICAgICAgICAgICAgdWlQaG90b3MucHVzaCgoPFBob3RvIHsuLi5zdHlsZXN9IG9uUGhvdG89e3RoaXMub25QaG90by5iaW5kKHRoaXMpfSBrZXk9e0RhdGUubm93KCl9Lz4pKVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxEaWFsb2cgdGl0bGU9e2Zvb3RwcmludC53aGVuLnNtYXJ0Rm9ybWF0KCl9XHJcblx0XHRcdFx0YWN0aW9ucz17YWN0aW9uc31cclxuXHRcdFx0XHRtb2RhbD17ZmFsc2V9XHJcblx0XHRcdFx0b3Blbj17dHJ1ZX1cclxuXHRcdFx0XHRvblJlcXVlc3RDbG9zZT17b25DYW5jZWx9PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3RleHRBbGlnbjpcImNlbnRlclwifX0+e3VpUGhvdG9zfTwvZGl2PlxyXG5cdFx0XHRcdFx0PHRleHRhcmVhXHJcblx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCIxMDAlXCIsYm9yZGVyOjAsaGVpZ2h0OjEwMCwgZm9udFNpemU6MTIsIHBhZGRpbmdUb3A6NSwgYm9yZGVyVG9wOlwiMXB4IGRvdHRlZCBsaWdodGdyYXlcIn19XHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwi6L+Z5LiA5Yi755qE5oOz5rOVXCJcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXtmb290cHJpbnQubm90ZX0vPlxyXG5cdFx0XHRcdFx0PENoaXBwZXIgY2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XCLml6nppJBcIixcIuWNiOmkkFwiLFwi5pma6aSQXCIsXCLotK3nialcIixcIumXqOelqFwiLFwi5YWs5LqkXCIsXCLpo57mnLpcIixcIueahOWjq1wiLFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLnibnoibLkuqTpgJpcIn0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIueJueiJsuWQg+eahFwifSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi6Iqx6ZSAXCIsdHlwZTpcIm51bWJlclwifVxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcblxyXG5cdFx0XHRcdFx0PENoaXBwZXIgY2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XCLlpKrnvo7kuoZcIixcIuaXoOazleWRvOWQuFwiLFwi5aSq5aOu6KeC5LqGXCIsXCLllpzmrKLov5nph4xcIlxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvRGlhbG9nPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0b25QaG90byh1cmwsIGluZGV4KXtcclxuICAgICAgICB2YXIge2Zvb3RwcmludH09dGhpcy5wcm9wc1xyXG4gICAgICAgIGlmKGZvb3RwcmludC5waG90b3MuaW5kZXhPZih1cmwpIT0tMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGluZGV4IT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGZvb3RwcmludC5waG90b3Muc3BsaWNlKGluZGV4LDEsdXJsKVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGZvb3RwcmludC5waG90b3MucHVzaCh1cmwpXHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRpdGxlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXksIGNvbXBsZXRlZCwgb25NYXB9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtuYW1lLF9pZCwgc3RhcnRlZEF0fT1qb3VybmV5XHJcblx0XHRpZihjb21wbGV0ZWQpe1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxTdGVwIGNvbXBsZXRlZD17dHJ1ZX0gZGlzYWJsZWQ9e3RydWV9PlxyXG5cdFx0XHRcdFx0PFN0ZXBMYWJlbD5cclxuXHRcdFx0XHRcdFx0PHNwYW4gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBqb3VybmV5LyR7X2lkfWApfT5cclxuXHRcdFx0XHRcdFx0XHR7c3RhcnRlZEF0LnNtYXJ0Rm9ybWF0KCl9XHJcblx0XHRcdFx0XHRcdFx0PGJyLz5cclxuXHRcdFx0XHRcdFx0XHR7bmFtZX1cclxuXHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHQpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IG1hcFRvZ2dsZT1udWxsXHJcblx0XHRcdGlmKG9uTWFwKXtcclxuXHRcdFx0XHRtYXBUb2dnbGU9KDxkaXYgc3R5bGU9e3t3aWR0aDoxMDB9fT48VG9nZ2xlIGxhYmVsUG9zaXRpb249XCJyaWdodFwiIGxhYmVsPVwiTWFwXCJvblRvZ2dsZT17b25NYXB9Lz48L2Rpdj4pXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8U3RlcD5cclxuXHRcdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj1cIipcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XHJcblx0XHRcdFx0XHRcdFx0PGIgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBqb3VybmV5LyR7X2lkfWApfT57bmFtZX08L2I+XHJcblx0XHRcdFx0XHRcdFx0e21hcFRvZ2dsZX1cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHQ8L1N0ZXA+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBEYXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZGF5LGRhdGUsIG9uRWRpdH09dGhpcy5wcm9wc1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFN0ZXAgZGlzYWJsZWQ9e2ZhbHNlfT5cclxuXHRcdFx0XHQ8U3RlcExhYmVsIGljb249e2Ake2RheX1gfSBvblRvdWNoVGFwPXtvbkVkaXR9PlxyXG5cdFx0XHRcdFx0PHNwYW4+e2RhdGUuc21hcnRGb3JtYXQoXCLku4rlpKlcIil9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PEljb25Nb3JlLz5cclxuXHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0PC9TdGVwPlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgRm9vdHByaW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2RhdGE6IHt3aGVuLHBob3Rvcz1bXSxub3RlfSwgb25FZGl0fT10aGlzLnByb3BzXHJcblx0XHRyZXR1cm4gIChcclxuXHRcdFx0PFN0ZXAgY29tcGxldGVkPXt0cnVlfSBhY3RpdmU9e3RydWV9PlxyXG5cdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj17XCIuXCJ9ID5cclxuXHRcdFx0XHRcdDx0aW1lPnt3aGVuLmZvcm1hdCgnSEg6bW0nKX0mbmJzcDs8L3RpbWU+XHJcblx0XHRcdFx0XHQ8c3Bhbj57bm90ZX08L3NwYW4+XHJcblx0XHRcdFx0XHQ8SWNvbk1vcmUgb25Ub3VjaFRhcD17b25FZGl0fSAvPlxyXG5cdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdDxTdGVwQ29udGVudD5cclxuXHRcdFx0XHRcdDxwPlxyXG5cdFx0XHRcdFx0XHR7cGhvdG9zLm1hcCgoe3VybCx0YWtlbixsb2N9LGkpPT4oPGltZyBrZXk9e2l9IG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC52aWV3UGhvdG8odXJsKX0gc3R5bGU9e3toZWlnaHQ6NTAsIG1hcmdpbjoyfX0gc3JjPXt1cmx9Lz4pKX1cclxuXHRcdFx0XHRcdDwvcD5cclxuXHRcdFx0XHQ8L1N0ZXBDb250ZW50PlxyXG5cdFx0XHQ8L1N0ZXA+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHZpZXdQaG90bzpSZWFjdC5Qcm9wVHlwZXMuZnVuY1xyXG5cdH1cclxufVxyXG4iXX0=