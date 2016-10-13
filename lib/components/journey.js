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
								return _this3.setState({ editing: { when: date } });
							} }));
					};

					while (lastDay < day) {
						_loop();
					}
				}
				all.push(_react2.default.createElement(Footprint, { key: when, data: footprint,
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
							onMap && _react2.default.createElement(_materialUi.Toggle, { labelPosition: "right",
								label: "map",
								onToggle: onMap })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2pvdXJuZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVPO0lBQU87O0lBRU87Ozs7Ozs7Ozs7Ozs7O21NQUNwQixRQUFNO0FBQ0wsY0FBVSxFQUFWO0FBQ0EsZUFBVyxFQUFYOzs7O2NBSG1COztzQ0FLRDs7O0FBQ2xCLGVBQVUsYUFBVixDQUF3QixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQXhCLENBQ0UsSUFERixDQUNPO1dBQVksT0FBSyxRQUFMLENBQWMsRUFBQyxzQkFBRCxFQUFkO0lBQVosQ0FEUCxDQURrQjs7OzsyQkFJWDs7O2dCQUMwQixLQUFLLEtBQUwsQ0FEMUI7T0FDTyxtQkFBVCxRQUFTLFVBRFA7T0FDbUIscUJBRG5CO2dCQUVtQixLQUFLLEtBQUwsQ0FGbkI7T0FFRiwrQkFGRTtPQUVVLHlCQUZWOztBQUdQLE9BQUksY0FBWSxJQUFaO09BQWtCLFVBQVEsQ0FBUjtPQUFXLE1BQUksRUFBSixDQUgxQjs7QUFLUCxjQUFXLE9BQVgsQ0FBbUIscUJBQVc7UUFDdEIsT0FBaUIsVUFBakIsS0FEc0I7UUFDakIsUUFBWSxVQUFaLE1BRGlCO1FBQ1gsT0FBTSxVQUFOLEtBRFc7O0FBRTdCLFFBQUcsZUFBYSxJQUFiLElBQXFCLENBQUMsS0FBSyxVQUFMLENBQWdCLFdBQWhCLENBQUQsRUFBOEI7QUFDckQsbUJBQVksSUFBWixDQURxRDtBQUVyRCxTQUFJLE1BQUksWUFBWSxRQUFaLENBQXFCLFNBQXJCLElBQWdDLENBQWhDLENBRjZDOzs7QUFJcEQ7QUFDQSxVQUFJLE9BQUssVUFBVSxZQUFWLENBQXVCLFVBQVEsQ0FBUixDQUE1QjtBQUNKLFVBQUksSUFBSixDQUFTLDhCQUFDLEdBQUQsSUFBSyxLQUFLLE9BQUwsRUFBYyxLQUFLLE9B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OztNQUREO0tBRUM7OztNQUFPLElBQVA7TUFGRDtLQUdDLHFEQUFVLFlBQVksTUFBWixFQUFWLENBSEQ7S0FERDtJQU1DOzs7S0FDQzs7O01BQ0UsT0FBTyxHQUFQLENBQVcsZ0JBQWlCLENBQWpCO1dBQUU7V0FBSTtXQUFNO2NBQVUsdUNBQUssS0FBSyxDQUFMLEVBQVEsU0FBUztnQkFBRyxRQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCO1NBQUgsRUFBZ0MsT0FBTyxFQUFDLFFBQU8sRUFBUCxFQUFXLFFBQU8sQ0FBUCxFQUFuQixFQUE4QixLQUFLLEdBQUwsRUFBcEY7T0FBdEIsQ0FEYjtNQUREO0tBTkQ7SUFERCxDQUZPOzs7O1FBREg7OztVQW1CRSxlQUFhO0FBQ25CLFlBQVUsZ0JBQU0sU0FBTixDQUFnQixJQUFoQiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge1VJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9uLCBJY29uQnV0dG9uLCBEaWFsb2csIFRvZ2dsZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtTdGVwLFN0ZXBwZXIsU3RlcExhYmVsLFN0ZXBDb250ZW50fSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xyXG5cclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBJY29uTW9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLWhvcml6J1xyXG5pbXBvcnQgSWNvbkFkZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQnXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBGb290cHJpbnQgYXMgRm9vdHByaW50REJ9IGZyb20gXCIuLi9kYlwiXHJcbmltcG9ydCBDaGlwcGVyIGZyb20gXCIuL2NoaXBwZXJcIlxyXG5cclxuY29uc3Qge0VtcHR5LCBQaG90b309VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvdXJuZXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0aXRpbmVyYXJ5OltdLFxyXG5cdFx0Zm9vdHByaW50czpbXVxyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Sm91cm5leURCLmdldEZvb3RwcmludHModGhpcy5wcm9wcy5qb3VybmV5KVxyXG5cdFx0XHQudGhlbihmb290cHJpbnRzPT50aGlzLnNldFN0YXRlKHtmb290cHJpbnRzfSkpXHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0bGV0IHtqb3VybmV5OntzdGFydGVkQXR9LCBvbk1hcH09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IHtmb290cHJpbnRzLCBlZGl0aW5nfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgY3VycmVudERhdGU9bnVsbCwgbGFzdERheT0wLCBhbGw9W107XHJcblxyXG5cdFx0Zm9vdHByaW50cy5mb3JFYWNoKGZvb3RwcmludD0+e1xyXG5cdFx0XHRjb25zdCB7d2hlbixwaG90byxub3RlfT1mb290cHJpbnRcclxuXHRcdFx0aWYoY3VycmVudERhdGU9PW51bGwgfHwgIXdoZW4uaXNTYW1lRGF0ZShjdXJyZW50RGF0ZSkpe1xyXG5cdFx0XHRcdGN1cnJlbnREYXRlPXdoZW5cclxuXHRcdFx0XHRsZXQgZGF5PWN1cnJlbnREYXRlLnJlbGF0aXZlKHN0YXJ0ZWRBdCkrMVxyXG5cdFx0XHRcdHdoaWxlKGxhc3REYXk8ZGF5KXtcclxuXHRcdFx0XHRcdGxhc3REYXkrK1xyXG5cdFx0XHRcdFx0bGV0IGRhdGU9c3RhcnRlZEF0LnJlbGF0aXZlRGF0ZShsYXN0RGF5LTEpXHJcblx0XHRcdFx0XHRhbGwucHVzaCg8RGF5IGtleT17bGFzdERheX0gZGF5PXtsYXN0RGF5fVxyXG5cdFx0XHRcdFx0XHRkYXRlPXtkYXRlfVxyXG5cdFx0XHRcdFx0XHRvbkVkaXQ9e2E9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6e3doZW46ZGF0ZX19KX0vPilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0YWxsLnB1c2goPEZvb3RwcmludCBrZXk9e3doZW59IGRhdGE9e2Zvb3RwcmludH1cclxuXHRcdFx0XHRvbkVkaXQ9e2E9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6Zm9vdHByaW50fSl9Lz4pXHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+XHJcblx0XHRcdFx0XHQ8VGl0bGUgam91cm5leT17dGhpcy5wcm9wcy5qb3VybmV5fSBvbk1hcD17b25NYXB9Lz5cclxuXHRcdFx0XHRcdHthbGx9XHJcblx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHRcdHtlZGl0aW5nICYmICg8RWRpdG9yIGZvb3RwcmludD17ZWRpdGluZ31cclxuXHRcdFx0XHRcdG9uU2F2ZT17YT0+dGhpcy5vblNhdmUoYSl9XHJcblx0XHRcdFx0XHRvbkNhbmNlbD17YT0+dGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzp1bmRlZmluZWR9KX0vPil9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0b25TYXZlKGZvb3RwcmludCl7XHJcblx0XHRjb25zdCB7am91cm5leX09dGhpcy5wcm9wc1xyXG5cdFx0Sm91cm5leURCLnVwc2VydChmb290cHJpbnQpXHJcblx0XHRcdC50aGVuKGE9PntcclxuXHRcdFx0XHRKb3VybmV5REIuZW1pdChcImZvb3RwcmludC5jaGFuZ2VkXCIpXHJcblx0XHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5cclxuY2xhc3MgRWRpdG9yIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2Zvb3RwcmludCwgb25TYXZlLCBvbkNhbmNlbH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3QgYWN0aW9ucyA9IFtcclxuXHRcdFx0ICA8RmxhdEJ1dHRvblxyXG5cdFx0XHRcdGxhYmVsPVwi5YWz6ZetXCJcclxuXHRcdFx0XHRwcmltYXJ5PXtmYWxzZX1cclxuXHRcdFx0XHRvblRvdWNoVGFwPXtvbkNhbmNlbH1cclxuXHRcdFx0ICAvPixcclxuXHRcdFx0ICA8RmxhdEJ1dHRvblxyXG5cdFx0XHRcdGxhYmVsPVwi5L+d5a2YXCJcclxuXHRcdFx0XHRwcmltYXJ5PXt0cnVlfVxyXG5cdFx0XHRcdG9uVG91Y2hUYXA9e29uU2F2ZX1cclxuXHRcdFx0ICAvPixcclxuXHRcdFx0XTtcclxuXHJcblx0XHR2YXIge25vdGUsIHBob3Rvcz1bXX09Zm9vdHByaW50LFxyXG4gICAgICAgICAgICBzdHlsZXM9e2ljb25SYXRpbzoyLzMsIGljb25TaXplOnt3aWR0aDo1MCwgaGVpZ2h0OjUwfX0sXHJcbiAgICAgICAgICAgIGk9MCxcclxuICAgICAgICAgICAgdWlQaG90b3M9cGhvdG9zLm1hcChmdW5jdGlvbihwaG90byl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxQaG90byBrZXk9e3Bob3RvfSB7Li4uc3R5bGVzfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uUGhvdG89eyh1cmwpPT50aGlzLm9uUGhvdG8odXJsLGkrKyl9XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtwaG90b30vPilcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYodWlQaG90b3MubGVuZ3RoPDkpXHJcbiAgICAgICAgICAgIHVpUGhvdG9zLnB1c2goKDxQaG90byB7Li4uc3R5bGVzfSBvblBob3RvPXt0aGlzLm9uUGhvdG8uYmluZCh0aGlzKX0ga2V5PXtEYXRlLm5vdygpfS8+KSlcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8RGlhbG9nIHRpdGxlPXtmb290cHJpbnQud2hlbi5zbWFydEZvcm1hdCgpfVxyXG5cdFx0XHRcdGFjdGlvbnM9e2FjdGlvbnN9XHJcblx0XHRcdFx0bW9kYWw9e2ZhbHNlfVxyXG5cdFx0XHRcdG9wZW49e3RydWV9XHJcblx0XHRcdFx0b25SZXF1ZXN0Q2xvc2U9e29uQ2FuY2VsfT5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246XCJjZW50ZXJcIn19Pnt1aVBob3Rvc308L2Rpdj5cclxuXHRcdFx0XHRcdDx0ZXh0YXJlYVxyXG5cdFx0XHRcdFx0XHRzdHlsZT17e3dpZHRoOlwiMTAwJVwiLGJvcmRlcjowLGhlaWdodDoxMDAsIGZvbnRTaXplOjEyLCBwYWRkaW5nVG9wOjUsIGJvcmRlclRvcDpcIjFweCBkb3R0ZWQgbGlnaHRncmF5XCJ9fVxyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIui/meS4gOWIu+eahOaDs+azlVwiXHJcblx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17Zm9vdHByaW50Lm5vdGV9Lz5cclxuXHRcdFx0XHRcdDxDaGlwcGVyIGNoaXBzPXtbXHJcblx0XHRcdFx0XHRcdFwi5pep6aSQXCIsXCLljYjppJBcIixcIuaZmumkkFwiLFwi6LSt54mpXCIsXCLpl6jnpahcIixcIuWFrOS6pFwiLFwi6aOe5py6XCIsXCLnmoTlo6tcIixcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi54m56Imy5Lqk6YCaXCJ9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLnibnoibLlkIPnmoRcIn0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuiKsemUgFwiLHR5cGU6XCJudW1iZXJcIn1cclxuXHRcdFx0XHRcdFx0XX0vPlxyXG5cclxuXHRcdFx0XHRcdDxDaGlwcGVyIGNoaXBzPXtbXHJcblx0XHRcdFx0XHRcdFwi5aSq576O5LqGXCIsXCLml6Dms5XlkbzlkLhcIixcIuWkquWjruinguS6hlwiLFwi5Zac5qyi6L+Z6YeMXCJcclxuXHRcdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L0RpYWxvZz5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdG9uUGhvdG8odXJsLCBpbmRleCl7XHJcbiAgICAgICAgdmFyIHtmb290cHJpbnR9PXRoaXMucHJvcHNcclxuICAgICAgICBpZihmb290cHJpbnQucGhvdG9zLmluZGV4T2YodXJsKSE9LTEpe1xyXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpbmRleCE9dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBmb290cHJpbnQucGhvdG9zLnNwbGljZShpbmRleCwxLHVybClcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBmb290cHJpbnQucGhvdG9zLnB1c2godXJsKVxyXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUaXRsZSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtqb3VybmV5LCBjb21wbGV0ZWQsIG9uTWFwfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7bmFtZSxfaWQsIHN0YXJ0ZWRBdH09am91cm5leVxyXG5cdFx0aWYoY29tcGxldGVkKXtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8U3RlcCBjb21wbGV0ZWQ9e3RydWV9IGRpc2FibGVkPXt0cnVlfT5cclxuXHRcdFx0XHRcdDxTdGVwTGFiZWw+XHJcblx0XHRcdFx0XHRcdDxzcGFuIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgam91cm5leS8ke19pZH1gKX0+XHJcblx0XHRcdFx0XHRcdFx0e3N0YXJ0ZWRBdC5zbWFydEZvcm1hdCgpfVxyXG5cdFx0XHRcdFx0XHRcdDxici8+XHJcblx0XHRcdFx0XHRcdFx0e25hbWV9XHJcblx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0KVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PFN0ZXA+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsIGljb249XCIqXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxiIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgam91cm5leS8ke19pZH1gKX0+e25hbWV9PC9iPlxyXG5cdFx0XHRcdFx0XHRcdHtvbk1hcCAmJiAoPFRvZ2dsZSBsYWJlbFBvc2l0aW9uPVwicmlnaHRcIlxyXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw9XCJtYXBcIlxyXG5cdFx0XHRcdFx0XHRcdFx0b25Ub2dnbGU9e29uTWFwfS8+KX1cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHQ8L1N0ZXA+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBEYXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZGF5LGRhdGUsIG9uRWRpdH09dGhpcy5wcm9wc1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFN0ZXAgZGlzYWJsZWQ9e2ZhbHNlfT5cclxuXHRcdFx0XHQ8U3RlcExhYmVsIGljb249e2Ake2RheX1gfSBvblRvdWNoVGFwPXtvbkVkaXR9PlxyXG5cdFx0XHRcdFx0PHNwYW4+e2RhdGUuc21hcnRGb3JtYXQoXCLku4rlpKlcIil9PC9zcGFuPlxyXG5cdFx0XHRcdFx0PEljb25Nb3JlLz5cclxuXHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0PC9TdGVwPlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgRm9vdHByaW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2RhdGE6IHt3aGVuLHBob3Rvcz1bXSxub3RlfSwgb25FZGl0fT10aGlzLnByb3BzXHJcblx0XHRyZXR1cm4gIChcclxuXHRcdFx0PFN0ZXAgY29tcGxldGVkPXt0cnVlfSBhY3RpdmU9e3RydWV9PlxyXG5cdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj17XCIuXCJ9ID5cclxuXHRcdFx0XHRcdDx0aW1lPnt3aGVuLmZvcm1hdCgnSEg6bW0nKX0mbmJzcDs8L3RpbWU+XHJcblx0XHRcdFx0XHQ8c3Bhbj57bm90ZX08L3NwYW4+XHJcblx0XHRcdFx0XHQ8SWNvbk1vcmUgb25Ub3VjaFRhcD17b25FZGl0fSAvPlxyXG5cdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdDxTdGVwQ29udGVudD5cclxuXHRcdFx0XHRcdDxwPlxyXG5cdFx0XHRcdFx0XHR7cGhvdG9zLm1hcCgoe3VybCx0YWtlbixsb2N9LGkpPT4oPGltZyBrZXk9e2l9IG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC52aWV3UGhvdG8odXJsKX0gc3R5bGU9e3toZWlnaHQ6NTAsIG1hcmdpbjoyfX0gc3JjPXt1cmx9Lz4pKX1cclxuXHRcdFx0XHRcdDwvcD5cclxuXHRcdFx0XHQ8L1N0ZXBDb250ZW50PlxyXG5cdFx0XHQ8L1N0ZXA+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHZpZXdQaG90bzpSZWFjdC5Qcm9wVHlwZXMuZnVuY1xyXG5cdH1cclxufVxyXG4iXX0=