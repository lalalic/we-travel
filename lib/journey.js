"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _map = require("material-ui/svg-icons/maps/map");

var _map2 = _interopRequireDefault(_map);

var _editLocation = require("material-ui/svg-icons/maps/edit-location");

var _editLocation2 = _interopRequireDefault(_editLocation);

var _cameraRoll = require("material-ui/svg-icons/image/camera-roll");

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

var _delete = require("material-ui/svg-icons/action/delete");

var _delete2 = _interopRequireDefault(_delete);

var _chipper = require("./components/chipper");

var _chipper2 = _interopRequireDefault(_chipper);

var _textFieldWithIcon = require("./components/textFieldWithIcon");

var _textFieldWithIcon2 = _interopRequireDefault(_textFieldWithIcon);

var _searchTextField = require("./components/searchTextField");

var _searchTextField2 = _interopRequireDefault(_searchTextField);

var _map3 = require("./components/map");

var _map4 = _interopRequireDefault(_map3);

var _itinerary = require("./components/itinerary");

var _itinerary2 = _interopRequireDefault(_itinerary);

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = _qiliApp.UI.Loading;
var CommandBar = _qiliApp.UI.CommandBar;

var Journey = function (_Component) {
	_inherits(Journey, _Component);

	function Journey() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Journey);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Journey.__proto__ || Object.getPrototypeOf(Journey)).call.apply(_ref, [this].concat(args))), _this), _this.state = { entity: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Journey, [{
		key: "getData",
		value: function getData(_id) {
			var _this2 = this;

			_db.Journey.findOne({ _id: _id }, function (entity) {
				if (entity) {
					_this2.setState({ entity: entity });
				}
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.getData(this.props.params._id);
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.params._id != nextProps.params._id) this.getData(nextProps.params._id);
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var journey = this.state.entity;


			if (!journey) return _react2.default.createElement(Loading, null);

			var startedAt = journey.startedAt;
			var endedAt = journey.endedAt;

			var scheduler = void 0;
			var actions = ["Back", { action: "Comment",
				label: "评论",
				onSelect: function onSelect(e) {
					return _this3.context.router.push("comment/" + _db.Journey._name + "/" + journey._id, { journey: journey });
				},
				icon: _react2.default.createElement(_cameraRoll2.default, null) }];
			switch (_db.Journey.getState(journey)) {
				case "Memory":

					break;
				case "Starting":
				case "Ending":
				case "Traveling":
				case "Plan":
				default:
					scheduler = _react2.default.createElement(
						"div",
						null,
						_react2.default.createElement(_materialUi.TextField, { onClick: function onClick(e) {
								return _this3.context.router.push("journey/" + journey._id + "/itinerary");
							},
							floatingLabelText: "\u5FEB\u901F\u8BA1\u5212\u4F60\u7684\u884C\u7A0B",
							defaultValue: "...",
							floatingLabelFixed: true }),
						_react2.default.createElement(_itinerary2.default, { journey: journey, mode: "place" })
					);

					actions.splice(1, 0, {
						action: "Remove",
						label: "删除",
						onSelect: function onSelect(e) {
							return _this3.remove();
						},
						icon: _react2.default.createElement(_delete2.default, null)
					});
			}

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "floating sticky top right",
						mini: true,
						onClick: function onClick(e) {
							return _this3.context.router.push("publish/journey/" + journey._id);
						} },
					"$",
					_react2.default.createElement(_cameraRoll2.default, null)
				),
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { ref: "name",
						floatingLabelText: "\u4E00\u6B21\u6709\u72EC\u7279\u610F\u4E49\u7684\u65C5\u884C\u540D\u79F0",
						fullWidth: true,
						defaultValue: journey.name,
						onBlur: function onBlur(_ref2) {
							var value = _ref2.target.value;
							return value != journey.name && _this3.update({ name: value });
						},
						onKeyDown: function onKeyDown(_ref3) {
							var keyCode = _ref3.keyCode;
							var value = _ref3.target.value;
							keyCode == 13 && value != journey.name && _this3.update({ name: value });
						} }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", floatingLabelText: "\u5F00\u59CB\u65E5\u671F",
						fullWidth: false,
						onChange: function onChange(e, startedAt) {
							return startedAt != journey.startedAt && _this3.update({ startedAt: startedAt });
						},
						autoOk: true, defaultDate: journey.startedAt }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", floatingLabelText: "\u7ED3\u675F\u65E5\u671F",
						fullWidth: false,
						onChange: function onChange(e, endedAt) {
							return endedAt != journey.endedAt && _this3.update({ endedAt: endedAt });
						},
						autoOk: true, defaultDate: journey.endedAt }),
					_react2.default.createElement(_chipper2.default, {
						title: "\u66F4\u591A\u4FE1\u606F",
						autoOpen: false,
						chips: ["徒步", "自驾", "自行车", "挑战", "放松", "家庭", "商务", "老人", "小孩", "情侣", { label: "预算", type: "number" }, "海滩", "人文", "山水", "都市", "会友", "蜜月", "生日", "周年庆"] }),
					scheduler
				),
				_react2.default.createElement(CommandBar, { className: "footbar", items: actions })
			);
		}
	}, {
		key: "update",
		value: function update(changed) {
			var _this4 = this;

			var journey = this.state.entity;

			_db.Journey.upsert(Object.assign(journey, changed)).then(function (updated) {
				return _this4.setState({ entity: updated });
			});
		}
	}, {
		key: "remove",
		value: function remove() {
			_db.Journey.remove(this.state.entity);
			this.context.router.replace("/");
		}
	}]);

	return Journey;
}(_react.Component);

Journey.contextTypes = {
	router: _react2.default.PropTypes.object
};

Journey.Creator = function (_Journey) {
	_inherits(JourneyCreator, _Journey);

	function JourneyCreator() {
		_classCallCheck(this, JourneyCreator);

		return _possibleConstructorReturn(this, (JourneyCreator.__proto__ || Object.getPrototypeOf(JourneyCreator)).apply(this, arguments));
	}

	_createClass(JourneyCreator, [{
		key: "getData",
		value: function getData() {}
	}, {
		key: "render",
		value: function render() {
			var _this6 = this;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { ref: "name",
						floatingLabelText: "\u4E00\u6B21\u6709\u72EC\u7279\u610F\u4E49\u7684\u65C5\u884C\u540D\u79F0",
						fullWidth: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", floatingLabelText: "\u5F00\u59CB\u65E5\u671F",
						fullWidth: false,
						autoOk: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", floatingLabelText: "\u7ED3\u675F\u65E5\u671F",
						fullWidth: false,
						autoOk: true })
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Save", label: "保存", onSelect: function onSelect(e) {
							return _this6.save();
						}, icon: _react2.default.createElement(_cloudDone2.default, null) }] })
			);
		}
	}, {
		key: "save",
		value: function save() {
			var _this7 = this;

			var _refs = this.refs;
			var name = _refs.name;
			var startedAt = _refs.startedAt;
			var endedAt = _refs.endedAt;

			_db.Journey.upsert({
				name: name.getValue(),
				startedAt: startedAt.getDate(),
				endedAt: endedAt.getDate()
			}).then(function (journey) {
				return _this7.context.router.replace("journey/" + journey._id);
			});
		}
	}]);

	return JourneyCreator;
}(Journey);

exports.default = Journey;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb3VybmV5LmpzIl0sIm5hbWVzIjpbIkxvYWRpbmciLCJDb21tYW5kQmFyIiwiSm91cm5leSIsInN0YXRlIiwiZW50aXR5IiwiX2lkIiwiZmluZE9uZSIsInNldFN0YXRlIiwiZ2V0RGF0YSIsInByb3BzIiwicGFyYW1zIiwibmV4dFByb3BzIiwiam91cm5leSIsInN0YXJ0ZWRBdCIsImVuZGVkQXQiLCJzY2hlZHVsZXIiLCJhY3Rpb25zIiwiYWN0aW9uIiwibGFiZWwiLCJvblNlbGVjdCIsImNvbnRleHQiLCJyb3V0ZXIiLCJwdXNoIiwiX25hbWUiLCJpY29uIiwiZ2V0U3RhdGUiLCJzcGxpY2UiLCJyZW1vdmUiLCJwYWRkaW5nIiwibmFtZSIsInZhbHVlIiwidGFyZ2V0IiwidXBkYXRlIiwia2V5Q29kZSIsImUiLCJ0eXBlIiwiY2hhbmdlZCIsInVwc2VydCIsIk9iamVjdCIsImFzc2lnbiIsInRoZW4iLCJ1cGRhdGVkIiwicmVwbGFjZSIsImNvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsIkNyZWF0b3IiLCJzYXZlIiwicmVmcyIsImdldFZhbHVlIiwiZ2V0RGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFT0EsTyxlQUFBQSxPO0lBQVNDLFUsZUFBQUEsVTs7SUFDS0MsTzs7Ozs7Ozs7Ozs7Ozs7c0xBQ3BCQyxLLEdBQU0sRUFBQ0MsUUFBTyxJQUFSLEU7Ozs7OzBCQUVFQyxHLEVBQUk7QUFBQTs7QUFDWCxlQUFVQyxPQUFWLENBQWtCLEVBQUNELFFBQUQsRUFBbEIsRUFBd0Isa0JBQVE7QUFDL0IsUUFBR0QsTUFBSCxFQUFVO0FBQ1QsWUFBS0csUUFBTCxDQUFjLEVBQUNILGNBQUQsRUFBZDtBQUNBO0FBQ0QsSUFK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QztBQUFBLE9BQ0VuQixJQURGLFNBQ0VBLElBREY7QUFBQSxPQUNRaEIsU0FEUixTQUNRQSxTQURSO0FBQUEsT0FDbUJDLE9BRG5CLFNBQ21CQSxPQURuQjs7QUFFTCxlQUFVdUIsTUFBVixDQUFpQjtBQUNoQlIsVUFBS0EsS0FBS29CLFFBQUwsRUFEVztBQUVoQnBDLGVBQVVBLFVBQVVxQyxPQUFWLEVBRk07QUFHaEJwQyxhQUFRQSxRQUFRb0MsT0FBUjtBQUhRLElBQWpCLEVBSUdWLElBSkgsQ0FJUTtBQUFBLFdBQVMsT0FBS3BCLE9BQUwsQ0FBYUMsTUFBYixDQUFvQnFCLE9BQXBCLGNBQXVDOUIsUUFBUVAsR0FBL0MsQ0FBVDtBQUFBLElBSlI7QUFLQTs7OztFQXBDMENILE87O2tCQTVIeEJBLE8iLCJmaWxlIjoiam91cm5leS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbixUZXh0RmllbGQsIERhdGVQaWNrZXIsIEF2YXRhciwgRGl2aWRlciwgRGlhbG9nfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuaW1wb3J0IEljb25TYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcclxuaW1wb3J0IEljb25NYXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL21hcFwiXHJcbmltcG9ydCBJY29uU2NoZWR1bGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL2VkaXQtbG9jYXRpb25cIlxyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBJY29uUmVtb3ZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RlbGV0ZVwiXHJcblxyXG5pbXBvcnQgQ2hpcHBlciBmcm9tIFwiLi9jb21wb25lbnRzL2NoaXBwZXJcIlxyXG5pbXBvcnQgVGV4dEZpZWxkV2l0aEljb24gZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0RmllbGRXaXRoSWNvblwiXHJcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hUZXh0RmllbGRcIlxyXG5pbXBvcnQgTWFwIGZyb20gXCIuL2NvbXBvbmVudHMvbWFwXCJcclxuaW1wb3J0IEl0aW5lcmFyeSBmcm9tIFwiLi9jb21wb25lbnRzL2l0aW5lcmFyeVwiXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCfSBmcm9tIFwiLi9kYlwiXHJcblxyXG5jb25zdCB7TG9hZGluZywgQ29tbWFuZEJhcn09VUlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm91cm5leSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17ZW50aXR5Om51bGx9XHJcblxyXG5cdGdldERhdGEoX2lkKXtcclxuXHRcdEpvdXJuZXlEQi5maW5kT25lKHtfaWR9LGVudGl0eT0+e1xyXG5cdFx0XHRpZihlbnRpdHkpe1xyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2VudGl0eX0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHR0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMuX2lkKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcclxuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxyXG4gICAgICAgICAgICB0aGlzLmdldERhdGEobmV4dFByb3BzLnBhcmFtcy5faWQpXHJcbiAgICB9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2VudGl0eTpqb3VybmV5fT10aGlzLnN0YXRlXHJcblxyXG5cdFx0aWYoIWpvdXJuZXkpXHJcblx0XHRcdHJldHVybiAoPExvYWRpbmcvPilcclxuXHJcblx0XHRjb25zdCB7c3RhcnRlZEF0LCBlbmRlZEF0fT1qb3VybmV5XHJcblx0XHRsZXQgc2NoZWR1bGVyXHJcblx0XHRsZXQgYWN0aW9ucz1bXHJcblx0XHRcdFwiQmFja1wiXHJcblx0XHRcdCx7YWN0aW9uOlwiQ29tbWVudFwiXHJcblx0XHRcdFx0LGxhYmVsOlwi6K+E6K66XCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6IGU9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgY29tbWVudC8ke0pvdXJuZXlEQi5fbmFtZX0vJHtqb3VybmV5Ll9pZH1gLHtqb3VybmV5fSlcclxuXHRcdFx0XHQsaWNvbjo8SWNvblB1Ymxpc2gvPn1cclxuXHRcdF1cclxuXHRcdHN3aXRjaChKb3VybmV5REIuZ2V0U3RhdGUoam91cm5leSkpe1xyXG5cdFx0Y2FzZSBcIk1lbW9yeVwiOlxyXG5cclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwiU3RhcnRpbmdcIjpcclxuXHRcdGNhc2UgXCJFbmRpbmdcIjpcclxuXHRcdGNhc2UgXCJUcmF2ZWxpbmdcIjpcclxuXHRcdGNhc2UgXCJQbGFuXCI6XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRzY2hlZHVsZXI9KFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgam91cm5leS8ke2pvdXJuZXkuX2lkfS9pdGluZXJhcnlgKX1cclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLlv6vpgJ/orqHliJLkvaDnmoTooYznqItcIlxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9XCIuLi5cIlxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsRml4ZWQ9e3RydWV9Lz5cclxuXHRcdFx0XHRcdDxJdGluZXJhcnkgam91cm5leT17am91cm5leX0gbW9kZT1cInBsYWNlXCIvPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblxyXG5cdFx0XHRhY3Rpb25zLnNwbGljZSgxLDAse1xyXG5cdFx0XHRcdGFjdGlvbjpcIlJlbW92ZVwiXHJcblx0XHRcdFx0LGxhYmVsOlwi5Yig6ZmkXCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6ZT0+dGhpcy5yZW1vdmUoKVxyXG5cdFx0XHRcdCxpY29uOiA8SWNvblJlbW92ZS8+XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSB0b3AgcmlnaHRcIlxyXG5cdFx0XHRcdFx0bWluaT17dHJ1ZX1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgcHVibGlzaC9qb3VybmV5LyR7am91cm5leS5faWR9YCl9PlxyXG5cdFx0XHRcdFx0JDxJY29uUHVibGlzaC8+XHJcblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHJcblx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJuYW1lXCJcclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLkuIDmrKHmnInni6znibnmhI/kuYnnmoTml4XooYzlkI3np7BcIlxyXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17am91cm5leS5uYW1lfVxyXG5cdFx0XHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+dmFsdWUhPWpvdXJuZXkubmFtZSAmJiB0aGlzLnVwZGF0ZSh7bmFtZTp2YWx1ZX0pfVxyXG5cdFx0XHRcdFx0XHRvbktleURvd249eyh7a2V5Q29kZSx0YXJnZXQ6e3ZhbHVlfX0pPT57a2V5Q29kZT09MTMgJiYgdmFsdWUhPWpvdXJuZXkubmFtZSAmJiB0aGlzLnVwZGF0ZSh7bmFtZTp2YWx1ZX0pfX0vPlxyXG5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInN0YXJ0ZWRBdFwiIGZsb2F0aW5nTGFiZWxUZXh0PVwi5byA5aeL5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhlLHN0YXJ0ZWRBdCk9PnN0YXJ0ZWRBdCE9am91cm5leS5zdGFydGVkQXQgJiYgdGhpcy51cGRhdGUoe3N0YXJ0ZWRBdH0pfVxyXG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9IGRlZmF1bHREYXRlPXtqb3VybmV5LnN0YXJ0ZWRBdH0vPlxyXG5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImVuZGVkQXRcIiBmbG9hdGluZ0xhYmVsVGV4dD1cIue7k+adn+aXpeacn1wiXHJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSxlbmRlZEF0KT0+ZW5kZWRBdCE9am91cm5leS5lbmRlZEF0ICYmIHRoaXMudXBkYXRlKHtlbmRlZEF0fSl9XHJcblx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX0gZGVmYXVsdERhdGU9e2pvdXJuZXkuZW5kZWRBdH0vPlxyXG5cclxuXHRcdFx0XHRcdDxDaGlwcGVyXHJcblx0XHRcdFx0XHRcdHRpdGxlPVwi5pu05aSa5L+h5oGvXCJcclxuXHRcdFx0XHRcdFx0YXV0b09wZW49e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRjaGlwcz17W1xyXG5cdFx0XHRcdFx0XHRcdFx0XCLlvpLmraVcIixcIuiHqumpvlwiLFwi6Ieq6KGM6L2mXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuaMkeaImFwiLFwi5pS+5p2+XCIsXCLlrrbluq1cIixcIuWVhuWKoVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLogIHkurpcIixcIuWwj+WtqVwiLFwi5oOF5L6jXCIsXHJcblx0XHRcdFx0XHRcdFx0XHR7bGFiZWw6XCLpooTnrpdcIix0eXBlOlwibnVtYmVyXCJ9LFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmtbfmu6lcIixcIuS6uuaWh1wiLFwi5bGx5rC0XCIsXCLpg73luIJcIixcIuS8muWPi1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLonJzmnIhcIixcIueUn+aXpVwiLFwi5ZGo5bm05bqGXCJcclxuXHRcdFx0XHRcdFx0XHRdfS8+XHJcblxyXG5cdFx0XHRcdFx0e3NjaGVkdWxlcn1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIGl0ZW1zPXthY3Rpb25zfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0dXBkYXRlKGNoYW5nZWQpe1xyXG5cdFx0Y29uc3Qge2VudGl0eTpqb3VybmV5fT10aGlzLnN0YXRlXHJcblx0XHRKb3VybmV5REIudXBzZXJ0KE9iamVjdC5hc3NpZ24oam91cm5leSxjaGFuZ2VkKSlcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnVwZGF0ZWR9KSlcclxuXHR9XHJcblxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0Sm91cm5leURCLnJlbW92ZSh0aGlzLnN0YXRlLmVudGl0eSlcclxuXHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShcIi9cIilcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIEpvdXJuZXlDcmVhdG9yIGV4dGVuZHMgSm91cm5leXtcclxuXHRcdGdldERhdGEoKXtcclxuXHJcblx0XHR9XHJcblx0XHRyZW5kZXIoKXtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIlxyXG5cdFx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5LiA5qyh5pyJ54us54m55oSP5LmJ55qE5peF6KGM5ZCN56ewXCJcclxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInN0YXJ0ZWRBdFwiIGZsb2F0aW5nTGFiZWxUZXh0PVwi5byA5aeL5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwiZW5kZWRBdFwiIGZsb2F0aW5nTGFiZWxUZXh0PVwi57uT5p2f5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX0vPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcblx0ICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxyXG5cdFx0XHRcdFx0XHRcdHthY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2F2ZSgpLCBpY29uOjxJY29uU2F2ZS8+fVxyXG5cdFx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cclxuXHRcdHNhdmUoKXtcclxuXHRcdFx0Y29uc3Qge25hbWUsIHN0YXJ0ZWRBdCwgZW5kZWRBdH09dGhpcy5yZWZzXHJcblx0XHRcdEpvdXJuZXlEQi51cHNlcnQoe1xyXG5cdFx0XHRcdG5hbWU6bmFtZS5nZXRWYWx1ZSgpLFxyXG5cdFx0XHRcdHN0YXJ0ZWRBdDpzdGFydGVkQXQuZ2V0RGF0ZSgpLFxyXG5cdFx0XHRcdGVuZGVkQXQ6ZW5kZWRBdC5nZXREYXRlKClcclxuXHRcdFx0fSkudGhlbihqb3VybmV5PT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGpvdXJuZXkvJHtqb3VybmV5Ll9pZH1gKSlcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19