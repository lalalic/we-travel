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
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Journey);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Journey)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { entity: null }, _temp), _possibleConstructorReturn(_this, _ret);
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
				icon: _cameraRoll2.default }];
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
							floatingLabelText: "快速计划你的行程",
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
						icon: _delete2.default
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
						floatingLabelText: "一次有独特意义的旅行名称",
						fullWidth: true,
						defaultValue: journey.name,
						onBlur: function onBlur(_ref) {
							var value = _ref.target.value;
							return value != journey.name && _this3.update({ name: value });
						},
						onKeyDown: function onKeyDown(_ref2) {
							var keyCode = _ref2.keyCode;
							var value = _ref2.target.value;
							keyCode == 13 && value != journey.name && _this3.update({ name: value });
						} }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", floatingLabelText: "开始日期",
						fullWidth: false,
						onChange: function onChange(e, startedAt) {
							return startedAt != journey.startedAt && _this3.update({ startedAt: startedAt });
						},
						autoOk: true, defaultDate: journey.startedAt }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", floatingLabelText: "结束日期",
						fullWidth: false,
						onChange: function onChange(e, endedAt) {
							return endedAt != journey.endedAt && _this3.update({ endedAt: endedAt });
						},
						autoOk: true, defaultDate: journey.endedAt }),
					_react2.default.createElement(_chipper2.default, {
						title: "更多信息",
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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(JourneyCreator).apply(this, arguments));
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
						floatingLabelText: "一次有独特意义的旅行名称",
						fullWidth: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", floatingLabelText: "开始日期",
						fullWidth: false,
						autoOk: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", floatingLabelText: "结束日期",
						fullWidth: false,
						autoOk: true })
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Save", label: "保存", onSelect: function onSelect(e) {
							return _this6.save();
						}, icon: _cloudDone2.default }] })
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
//# sourceMappingURL=data:application/json;base64,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QXlCRjs7O2VBQzRCLEtBQUssSUFBTCxDQUQ1QjtPQUNFLGtCQURGO09BQ1EsNEJBRFI7T0FDbUIsd0JBRG5COztBQUVMLGVBQVUsTUFBVixDQUFpQjtBQUNoQixVQUFLLEtBQUssUUFBTCxFQUFMO0FBQ0EsZUFBVSxVQUFVLE9BQVYsRUFBVjtBQUNBLGFBQVEsUUFBUSxPQUFSLEVBQVI7SUFIRCxFQUlHLElBSkgsQ0FJUTtXQUFTLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsT0FBcEIsY0FBdUMsUUFBUSxHQUFSO0lBQWhELENBSlIsQ0FGSzs7OztRQTdCYztFQUF1Qjs7a0JBNUh4QiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLFRleHRGaWVsZCwgRGF0ZVBpY2tlciwgQXZhdGFyLCBEaXZpZGVyLCBEaWFsb2d9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgSWNvblNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxyXG5pbXBvcnQgSWNvbk1hcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvbWFwXCJcclxuaW1wb3J0IEljb25TY2hlZHVsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZWRpdC1sb2NhdGlvblwiXHJcbmltcG9ydCBJY29uUHVibGlzaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuaW1wb3J0IEljb25SZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGVsZXRlXCJcclxuXHJcbmltcG9ydCBDaGlwcGVyIGZyb20gXCIuL2NvbXBvbmVudHMvY2hpcHBlclwiXHJcbmltcG9ydCBUZXh0RmllbGRXaXRoSWNvbiBmcm9tIFwiLi9jb21wb25lbnRzL3RleHRGaWVsZFdpdGhJY29uXCJcclxuaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9jb21wb25lbnRzL3NlYXJjaFRleHRGaWVsZFwiXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vY29tcG9uZW50cy9tYXBcIlxyXG5pbXBvcnQgSXRpbmVyYXJ5IGZyb20gXCIuL2NvbXBvbmVudHMvaXRpbmVyYXJ5XCJcclxuXHJcbmltcG9ydCB7Sm91cm5leSBhcyBKb3VybmV5REJ9IGZyb20gXCIuL2RiXCJcclxuXHJcbmNvbnN0IHtMb2FkaW5nLCBDb21tYW5kQmFyfT1VSVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb3VybmV5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtlbnRpdHk6bnVsbH1cclxuXHJcblx0Z2V0RGF0YShfaWQpe1xyXG5cdFx0Sm91cm5leURCLmZpbmRPbmUoe19pZH0sZW50aXR5PT57XHJcblx0XHRcdGlmKGVudGl0eSl7XHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMucGFyYW1zLl9pZCE9bmV4dFByb3BzLnBhcmFtcy5faWQpXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YShuZXh0UHJvcHMucGFyYW1zLl9pZClcclxuICAgIH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZW50aXR5OmpvdXJuZXl9PXRoaXMuc3RhdGVcclxuXHJcblx0XHRpZigham91cm5leSlcclxuXHRcdFx0cmV0dXJuICg8TG9hZGluZy8+KVxyXG5cclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsIGVuZGVkQXR9PWpvdXJuZXlcclxuXHRcdGxldCBzY2hlZHVsZXJcclxuXHRcdGxldCBhY3Rpb25zPVtcclxuXHRcdFx0XCJCYWNrXCJcclxuXHRcdFx0LHthY3Rpb246XCJDb21tZW50XCJcclxuXHRcdFx0XHQsbGFiZWw6XCLor4TorrpcIlxyXG5cdFx0XHRcdCxvblNlbGVjdDogZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBjb21tZW50LyR7Sm91cm5leURCLl9uYW1lfS8ke2pvdXJuZXkuX2lkfWAse2pvdXJuZXl9KVxyXG5cdFx0XHRcdCxpY29uOkljb25QdWJsaXNofVxyXG5cdFx0XVxyXG5cdFx0c3dpdGNoKEpvdXJuZXlEQi5nZXRTdGF0ZShqb3VybmV5KSl7XHJcblx0XHRjYXNlIFwiTWVtb3J5XCI6XHJcblxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJTdGFydGluZ1wiOlxyXG5cdFx0Y2FzZSBcIkVuZGluZ1wiOlxyXG5cdFx0Y2FzZSBcIlRyYXZlbGluZ1wiOlxyXG5cdFx0Y2FzZSBcIlBsYW5cIjpcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHNjaGVkdWxlcj0oXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBqb3VybmV5LyR7am91cm5leS5faWR9L2l0aW5lcmFyeWApfVxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuW/q+mAn+iuoeWIkuS9oOeahOihjOeoi1wiXHJcblx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT1cIi4uLlwiXHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxGaXhlZD17dHJ1ZX0vPlxyXG5cdFx0XHRcdFx0PEl0aW5lcmFyeSBqb3VybmV5PXtqb3VybmV5fSBtb2RlPVwicGxhY2VcIi8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHJcblx0XHRcdGFjdGlvbnMuc3BsaWNlKDEsMCx7XHJcblx0XHRcdFx0YWN0aW9uOlwiUmVtb3ZlXCJcclxuXHRcdFx0XHQsbGFiZWw6XCLliKDpmaRcIlxyXG5cdFx0XHRcdCxvblNlbGVjdDplPT50aGlzLnJlbW92ZSgpXHJcblx0XHRcdFx0LGljb246IEljb25SZW1vdmVcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZmxvYXRpbmcgc3RpY2t5IHRvcCByaWdodFwiXHJcblx0XHRcdFx0XHRtaW5pPXt0cnVlfVxyXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBwdWJsaXNoL2pvdXJuZXkvJHtqb3VybmV5Ll9pZH1gKX0+XHJcblx0XHRcdFx0XHQkPEljb25QdWJsaXNoLz5cclxuXHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxyXG5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIlxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuS4gOasoeacieeLrOeJueaEj+S5ieeahOaXheihjOWQjeensFwiXHJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXtqb3VybmV5Lm5hbWV9XHJcblx0XHRcdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT52YWx1ZSE9am91cm5leS5uYW1lICYmIHRoaXMudXBkYXRlKHtuYW1lOnZhbHVlfSl9XHJcblx0XHRcdFx0XHRcdG9uS2V5RG93bj17KHtrZXlDb2RlLHRhcmdldDp7dmFsdWV9fSk9PntrZXlDb2RlPT0xMyAmJiB2YWx1ZSE9am91cm5leS5uYW1lICYmIHRoaXMudXBkYXRlKHtuYW1lOnZhbHVlfSl9fS8+IFxyXG5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInN0YXJ0ZWRBdFwiIGZsb2F0aW5nTGFiZWxUZXh0PVwi5byA5aeL5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhlLHN0YXJ0ZWRBdCk9PnN0YXJ0ZWRBdCE9am91cm5leS5zdGFydGVkQXQgJiYgdGhpcy51cGRhdGUoe3N0YXJ0ZWRBdH0pfVxyXG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9IGRlZmF1bHREYXRlPXtqb3VybmV5LnN0YXJ0ZWRBdH0vPlxyXG5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImVuZGVkQXRcIiBmbG9hdGluZ0xhYmVsVGV4dD1cIue7k+adn+aXpeacn1wiXHJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSxlbmRlZEF0KT0+ZW5kZWRBdCE9am91cm5leS5lbmRlZEF0ICYmIHRoaXMudXBkYXRlKHtlbmRlZEF0fSl9XHJcblx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX0gZGVmYXVsdERhdGU9e2pvdXJuZXkuZW5kZWRBdH0vPlxyXG5cclxuXHRcdFx0XHRcdDxDaGlwcGVyXHJcblx0XHRcdFx0XHRcdHRpdGxlPVwi5pu05aSa5L+h5oGvXCJcclxuXHRcdFx0XHRcdFx0YXV0b09wZW49e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRjaGlwcz17W1xyXG5cdFx0XHRcdFx0XHRcdFx0XCLlvpLmraVcIixcIuiHqumpvlwiLFwi6Ieq6KGM6L2mXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuaMkeaImFwiLFwi5pS+5p2+XCIsXCLlrrbluq1cIixcIuWVhuWKoVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLogIHkurpcIixcIuWwj+WtqVwiLFwi5oOF5L6jXCIsXHJcblx0XHRcdFx0XHRcdFx0XHR7bGFiZWw6XCLpooTnrpdcIix0eXBlOlwibnVtYmVyXCJ9LFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmtbfmu6lcIixcIuS6uuaWh1wiLFwi5bGx5rC0XCIsXCLpg73luIJcIixcIuS8muWPi1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLonJzmnIhcIixcIueUn+aXpVwiLFwi5ZGo5bm05bqGXCJcclxuXHRcdFx0XHRcdFx0XHRdfS8+XHJcblxyXG5cdFx0XHRcdFx0e3NjaGVkdWxlcn1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIGl0ZW1zPXthY3Rpb25zfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHR1cGRhdGUoY2hhbmdlZCl7XHJcblx0XHRjb25zdCB7ZW50aXR5OmpvdXJuZXl9PXRoaXMuc3RhdGVcclxuXHRcdEpvdXJuZXlEQi51cHNlcnQoT2JqZWN0LmFzc2lnbihqb3VybmV5LGNoYW5nZWQpKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT50aGlzLnNldFN0YXRlKHtlbnRpdHk6dXBkYXRlZH0pKVxyXG5cdH1cclxuXHJcblx0cmVtb3ZlKCl7XHJcblx0XHRKb3VybmV5REIucmVtb3ZlKHRoaXMuc3RhdGUuZW50aXR5KVxyXG5cdFx0dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKFwiL1wiKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHJcblx0c3RhdGljIENyZWF0b3I9Y2xhc3MgSm91cm5leUNyZWF0b3IgZXh0ZW5kcyBKb3VybmV5e1xyXG5cdFx0Z2V0RGF0YSgpe1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdHJlbmRlcigpe1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwibmFtZVwiXHJcblx0XHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLkuIDmrKHmnInni6znibnmhI/kuYnnmoTml4XooYzlkI3np7BcIlxyXG5cdFx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPiBcclxuXHJcblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInN0YXJ0ZWRBdFwiIGZsb2F0aW5nTGFiZWxUZXh0PVwi5byA5aeL5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwiZW5kZWRBdFwiIGZsb2F0aW5nTGFiZWxUZXh0PVwi57uT5p2f5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX0vPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcblx0ICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxyXG5cdFx0XHRcdFx0XHRcdHthY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2F2ZSgpLCBpY29uOkljb25TYXZlfVxyXG5cdFx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cclxuXHRcdHNhdmUoKXtcclxuXHRcdFx0Y29uc3Qge25hbWUsIHN0YXJ0ZWRBdCwgZW5kZWRBdH09dGhpcy5yZWZzXHJcblx0XHRcdEpvdXJuZXlEQi51cHNlcnQoe1xyXG5cdFx0XHRcdG5hbWU6bmFtZS5nZXRWYWx1ZSgpLFxyXG5cdFx0XHRcdHN0YXJ0ZWRBdDpzdGFydGVkQXQuZ2V0RGF0ZSgpLFxyXG5cdFx0XHRcdGVuZGVkQXQ6ZW5kZWRBdC5nZXREYXRlKClcclxuXHRcdFx0fSkudGhlbihqb3VybmV5PT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGpvdXJuZXkvJHtqb3VybmV5Ll9pZH1gKSlcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19