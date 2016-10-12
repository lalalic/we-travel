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
							"span",
							{ onClick: function onClick(e) {
									return _this7.context.router.push("journey/" + _id);
								} },
							_react2.default.createElement(
								"b",
								null,
								name
							),
							onMap && _react2.default.createElement(_materialUi.Toggle, { labelPosition: "right",
								label: "map",
								style: { display: "inline" },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2pvdXJuZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVPO0lBQU87O0lBRU87Ozs7Ozs7Ozs7Ozs7O21NQUNwQixRQUFNO0FBQ0wsY0FBVSxFQUFWO0FBQ0EsZUFBVyxFQUFYOzs7O2NBSG1COztzQ0FLRDs7O0FBQ2xCLGVBQVUsYUFBVixDQUF3QixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQXhCLENBQ0UsSUFERixDQUNPO1dBQVksT0FBSyxRQUFMLENBQWMsRUFBQyxzQkFBRCxFQUFkO0lBQVosQ0FEUCxDQURrQjs7OzsyQkFJWDs7O2dCQUMwQixLQUFLLEtBQUwsQ0FEMUI7T0FDTyxtQkFBVCxRQUFTLFVBRFA7T0FDbUIscUJBRG5CO2dCQUVtQixLQUFLLEtBQUwsQ0FGbkI7T0FFRiwrQkFGRTtPQUVVLHlCQUZWOztBQUdQLE9BQUksY0FBWSxJQUFaO09BQWtCLFVBQVEsQ0FBUjtPQUFXLE1BQUksRUFBSixDQUgxQjs7QUFLUCxjQUFXLE9BQVgsQ0FBbUIscUJBQVc7UUFDdEIsT0FBaUIsVUFBakIsS0FEc0I7UUFDakIsUUFBWSxVQUFaLE1BRGlCO1FBQ1gsT0FBTSxVQUFOLEtBRFc7O0FBRTdCLFFBQUcsZUFBYSxJQUFiLElBQXFCLENBQUMsS0FBSyxVQUFMLENBQWdCLFdBQWhCLENBQUQsRUFBOEI7QUFDckQsbUJBQVksSUFBWixDQURxRDtBQUVyRCxTQUFJLE1BQUksWUFBWSxRQUFaLENBQXFCLFNBQXJCLElBQWdDLENBQWhDLENBRjZDOzs7QUFJcEQ7QUFDQSxVQUFJLE9BQUssVUFBVSxZQUFWLENBQXVCLFVBQVEsQ0FBUixDQUE1QjtBQUNKLFVBQUksSUFBSixDQUFTLDhCQUFDLEdBQUQsSUFBSyxLQUFLLE9BQUwsRUFBYyxLQUFLLE9B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T0FBWixDQUFQOztNQUREO0tBRUM7OztNQUFPLElBQVA7TUFGRDtLQUdDLHFEQUFVLFlBQVksTUFBWixFQUFWLENBSEQ7S0FERDtJQU1DOzs7S0FDQzs7O01BQ0UsT0FBTyxHQUFQLENBQVcsZ0JBQWlCLENBQWpCO1dBQUU7V0FBSTtXQUFNO2NBQVUsdUNBQUssS0FBSyxDQUFMLEVBQVEsU0FBUztnQkFBRyxRQUFLLE9BQUwsQ0FBYSxTQUFiLENBQXVCLEdBQXZCO1NBQUgsRUFBZ0MsT0FBTyxFQUFDLFFBQU8sRUFBUCxFQUFXLFFBQU8sQ0FBUCxFQUFuQixFQUE4QixLQUFLLEdBQUwsRUFBcEY7T0FBdEIsQ0FEYjtNQUREO0tBTkQ7SUFERCxDQUZPOzs7O1FBREg7OztVQW1CRSxlQUFhO0FBQ25CLFlBQVUsZ0JBQU0sU0FBTixDQUFnQixJQUFoQiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge1VJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9uLCBJY29uQnV0dG9uLCBEaWFsb2csIFRvZ2dsZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtTdGVwLFN0ZXBwZXIsU3RlcExhYmVsLFN0ZXBDb250ZW50fSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xyXG5cclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBJY29uTW9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLWhvcml6J1xyXG5pbXBvcnQgSWNvbkFkZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQnXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBGb290cHJpbnQgYXMgRm9vdHByaW50REJ9IGZyb20gXCIuLi9kYlwiXHJcbmltcG9ydCBDaGlwcGVyIGZyb20gXCIuL2NoaXBwZXJcIlxyXG5cclxuY29uc3Qge0VtcHR5LCBQaG90b309VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvdXJuZXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0aXRpbmVyYXJ5OltdLFxyXG5cdFx0Zm9vdHByaW50czpbXVxyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Sm91cm5leURCLmdldEZvb3RwcmludHModGhpcy5wcm9wcy5qb3VybmV5KVxyXG5cdFx0XHQudGhlbihmb290cHJpbnRzPT50aGlzLnNldFN0YXRlKHtmb290cHJpbnRzfSkpXHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0bGV0IHtqb3VybmV5OntzdGFydGVkQXR9LCBvbk1hcH09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IHtmb290cHJpbnRzLCBlZGl0aW5nfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgY3VycmVudERhdGU9bnVsbCwgbGFzdERheT0wLCBhbGw9W107XHJcblx0XHRcclxuXHRcdGZvb3RwcmludHMuZm9yRWFjaChmb290cHJpbnQ9PntcclxuXHRcdFx0Y29uc3Qge3doZW4scGhvdG8sbm90ZX09Zm9vdHByaW50XHJcblx0XHRcdGlmKGN1cnJlbnREYXRlPT1udWxsIHx8ICF3aGVuLmlzU2FtZURhdGUoY3VycmVudERhdGUpKXtcclxuXHRcdFx0XHRjdXJyZW50RGF0ZT13aGVuXHJcblx0XHRcdFx0bGV0IGRheT1jdXJyZW50RGF0ZS5yZWxhdGl2ZShzdGFydGVkQXQpKzFcclxuXHRcdFx0XHR3aGlsZShsYXN0RGF5PGRheSl7XHJcblx0XHRcdFx0XHRsYXN0RGF5KytcclxuXHRcdFx0XHRcdGxldCBkYXRlPXN0YXJ0ZWRBdC5yZWxhdGl2ZURhdGUobGFzdERheS0xKVxyXG5cdFx0XHRcdFx0YWxsLnB1c2goPERheSBrZXk9e2xhc3REYXl9IGRheT17bGFzdERheX0gXHJcblx0XHRcdFx0XHRcdGRhdGU9e2RhdGV9XHJcblx0XHRcdFx0XHRcdG9uRWRpdD17YT0+dGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzp7d2hlbjpkYXRlfX0pfS8+KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRhbGwucHVzaCg8Rm9vdHByaW50IGtleT17d2hlbn0gZGF0YT17Zm9vdHByaW50fSBcclxuXHRcdFx0XHRvbkVkaXQ9e2E9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6Zm9vdHByaW50fSl9Lz4pXHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+XHJcblx0XHRcdFx0XHQ8VGl0bGUgam91cm5leT17dGhpcy5wcm9wcy5qb3VybmV5fSBvbk1hcD17b25NYXB9Lz5cclxuXHRcdFx0XHRcdHthbGx9XHJcblx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHRcdHtlZGl0aW5nICYmICg8RWRpdG9yIGZvb3RwcmludD17ZWRpdGluZ30gXHJcblx0XHRcdFx0XHRvblNhdmU9e2E9PnRoaXMub25TYXZlKGEpfSBcclxuXHRcdFx0XHRcdG9uQ2FuY2VsPXthPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOnVuZGVmaW5lZH0pfS8+KX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdG9uU2F2ZShmb290cHJpbnQpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXl9PXRoaXMucHJvcHNcclxuXHRcdEpvdXJuZXlEQi51cHNlcnQoZm9vdHByaW50KVxyXG5cdFx0XHQudGhlbihhPT57XHJcblx0XHRcdFx0Sm91cm5leURCLmVtaXQoXCJmb290cHJpbnQuY2hhbmdlZFwiKVxyXG5cdFx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuXHJcbmNsYXNzIEVkaXRvciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtmb290cHJpbnQsIG9uU2F2ZSwgb25DYW5jZWx9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IGFjdGlvbnMgPSBbXHJcblx0XHRcdCAgPEZsYXRCdXR0b25cclxuXHRcdFx0XHRsYWJlbD1cIuWFs+mXrVwiXHJcblx0XHRcdFx0cHJpbWFyeT17ZmFsc2V9XHJcblx0XHRcdFx0b25Ub3VjaFRhcD17b25DYW5jZWx9XHJcblx0XHRcdCAgLz4sXHJcblx0XHRcdCAgPEZsYXRCdXR0b25cclxuXHRcdFx0XHRsYWJlbD1cIuS/neWtmFwiXHJcblx0XHRcdFx0cHJpbWFyeT17dHJ1ZX1cclxuXHRcdFx0XHRvblRvdWNoVGFwPXtvblNhdmV9XHJcblx0XHRcdCAgLz4sXHJcblx0XHRcdF07XHJcblxyXG5cdFx0dmFyIHtub3RlLCBwaG90b3M9W119PWZvb3RwcmludCxcclxuICAgICAgICAgICAgc3R5bGVzPXtpY29uUmF0aW86Mi8zLCBpY29uU2l6ZTp7d2lkdGg6NTAsIGhlaWdodDo1MH19LFxyXG4gICAgICAgICAgICBpPTAsXHJcbiAgICAgICAgICAgIHVpUGhvdG9zPXBob3Rvcy5tYXAoZnVuY3Rpb24ocGhvdG8pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8UGhvdG8ga2V5PXtwaG90b30gey4uLnN0eWxlc31cclxuICAgICAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+dGhpcy5vblBob3RvKHVybCxpKyspfVxyXG4gICAgICAgICAgICAgICAgICAgIHNyYz17cGhvdG99Lz4pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIGlmKHVpUGhvdG9zLmxlbmd0aDw5KVxyXG4gICAgICAgICAgICB1aVBob3Rvcy5wdXNoKCg8UGhvdG8gey4uLnN0eWxlc30gb25QaG90bz17dGhpcy5vblBob3RvLmJpbmQodGhpcyl9IGtleT17RGF0ZS5ub3coKX0vPikpXHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxEaWFsb2cgdGl0bGU9e2Zvb3RwcmludC53aGVuLnNtYXJ0Rm9ybWF0KCl9XHJcblx0XHRcdFx0YWN0aW9ucz17YWN0aW9uc31cclxuXHRcdFx0XHRtb2RhbD17ZmFsc2V9XHJcblx0XHRcdFx0b3Blbj17dHJ1ZX1cclxuXHRcdFx0XHRvblJlcXVlc3RDbG9zZT17b25DYW5jZWx9PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3RleHRBbGlnbjpcImNlbnRlclwifX0+e3VpUGhvdG9zfTwvZGl2PlxyXG5cdFx0XHRcdFx0PHRleHRhcmVhXHJcblx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCIxMDAlXCIsYm9yZGVyOjAsaGVpZ2h0OjEwMCwgZm9udFNpemU6MTIsIHBhZGRpbmdUb3A6NSwgYm9yZGVyVG9wOlwiMXB4IGRvdHRlZCBsaWdodGdyYXlcIn19XHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwi6L+Z5LiA5Yi755qE5oOz5rOVXCJcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXtmb290cHJpbnQubm90ZX0vPlxyXG5cdFx0XHRcdFx0PENoaXBwZXIgY2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XCLml6nppJBcIixcIuWNiOmkkFwiLFwi5pma6aSQXCIsXCLotK3nialcIixcIumXqOelqFwiLFwi5YWs5LqkXCIsXCLpo57mnLpcIixcIueahOWjq1wiLFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLnibnoibLkuqTpgJpcIn0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIueJueiJsuWQg+eahFwifSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi6Iqx6ZSAXCIsdHlwZTpcIm51bWJlclwifVxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PENoaXBwZXIgY2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XCLlpKrnvo7kuoZcIixcIuaXoOazleWRvOWQuFwiLFwi5aSq5aOu6KeC5LqGXCIsXCLllpzmrKLov5nph4xcIlxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvRGlhbG9nPlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHRvblBob3RvKHVybCwgaW5kZXgpe1xyXG4gICAgICAgIHZhciB7Zm9vdHByaW50fT10aGlzLnByb3BzXHJcbiAgICAgICAgaWYoZm9vdHByaW50LnBob3Rvcy5pbmRleE9mKHVybCkhPS0xKXtcclxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaW5kZXghPXVuZGVmaW5lZClcclxuICAgICAgICAgICAgZm9vdHByaW50LnBob3Rvcy5zcGxpY2UoaW5kZXgsMSx1cmwpXHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZm9vdHByaW50LnBob3Rvcy5wdXNoKHVybClcclxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGl0bGUgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7am91cm5leSwgY29tcGxldGVkLCBvbk1hcH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge25hbWUsX2lkLCBzdGFydGVkQXR9PWpvdXJuZXlcclxuXHRcdGlmKGNvbXBsZXRlZCl7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PFN0ZXAgY29tcGxldGVkPXt0cnVlfSBkaXNhYmxlZD17dHJ1ZX0+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGpvdXJuZXkvJHtfaWR9YCl9PlxyXG5cdFx0XHRcdFx0XHRcdHtzdGFydGVkQXQuc21hcnRGb3JtYXQoKX1cclxuXHRcdFx0XHRcdFx0XHQ8YnIvPlxyXG5cdFx0XHRcdFx0XHRcdHtuYW1lfVxyXG5cdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHQ8L1N0ZXA+XHJcblx0XHRcdClcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxTdGVwPlxyXG5cdFx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPVwiKlwiPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGpvdXJuZXkvJHtfaWR9YCl9PlxyXG5cdFx0XHRcdFx0XHRcdDxiPntuYW1lfTwvYj5cclxuXHRcdFx0XHRcdFx0XHR7b25NYXAgJiYgKDxUb2dnbGUgbGFiZWxQb3NpdGlvbj1cInJpZ2h0XCIgXHJcblx0XHRcdFx0XHRcdFx0XHRsYWJlbD1cIm1hcFwiIFxyXG5cdFx0XHRcdFx0XHRcdFx0c3R5bGU9e3tkaXNwbGF5OlwiaW5saW5lXCJ9fVxyXG5cdFx0XHRcdFx0XHRcdFx0b25Ub2dnbGU9e29uTWFwfS8+KX1cclxuXHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PC9TdGVwPlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0fVxyXG5cdFx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIERheSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkYXksZGF0ZSwgb25FZGl0fT10aGlzLnByb3BzXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8U3RlcCBkaXNhYmxlZD17ZmFsc2V9PlxyXG5cdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj17YCR7ZGF5fWB9IG9uVG91Y2hUYXA9e29uRWRpdH0+XHJcblx0XHRcdFx0XHQ8c3Bhbj57ZGF0ZS5zbWFydEZvcm1hdChcIuS7iuWkqVwiKX08L3NwYW4+XHJcblx0XHRcdFx0XHQ8SWNvbk1vcmUvPlxyXG5cdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHQ8L1N0ZXA+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBGb290cHJpbnQgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZGF0YToge3doZW4scGhvdG9zPVtdLG5vdGV9LCBvbkVkaXR9PXRoaXMucHJvcHNcclxuXHRcdHJldHVybiAgKFxyXG5cdFx0XHQ8U3RlcCBjb21wbGV0ZWQ9e3RydWV9IGFjdGl2ZT17dHJ1ZX0+XHJcblx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPXtcIi5cIn0gPlxyXG5cdFx0XHRcdFx0PHRpbWU+e3doZW4uZm9ybWF0KCdISDptbScpfSZuYnNwOzwvdGltZT5cclxuXHRcdFx0XHRcdDxzcGFuPntub3RlfTwvc3Bhbj5cclxuXHRcdFx0XHRcdDxJY29uTW9yZSBvblRvdWNoVGFwPXtvbkVkaXR9IC8+XHJcblx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PFN0ZXBDb250ZW50PlxyXG5cdFx0XHRcdFx0PHA+XHJcblx0XHRcdFx0XHRcdHtwaG90b3MubWFwKCh7dXJsLHRha2VuLGxvY30saSk9Pig8aW1nIGtleT17aX0gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnZpZXdQaG90byh1cmwpfSBzdHlsZT17e2hlaWdodDo1MCwgbWFyZ2luOjJ9fSBzcmM9e3VybH0vPikpfVxyXG5cdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdDwvU3RlcENvbnRlbnQ+XHJcblx0XHRcdDwvU3RlcD5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHR2aWV3UGhvdG86UmVhY3QuUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcbn1cclxuIl19