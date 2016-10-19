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
						defaultValue: journey.name }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", floatingLabelText: "开始日期",
						fullWidth: false,
						autoOk: true, defaultDate: journey.startedAt }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", floatingLabelText: "结束日期",
						fullWidth: false,
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
			var _this5 = this;

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
							return _this5.save();
						}, icon: _cloudDone2.default }] })
			);
		}
	}, {
		key: "save",
		value: function save() {
			var _this6 = this;

			var _refs = this.refs;
			var name = _refs.name;
			var startedAt = _refs.startedAt;
			var endedAt = _refs.endedAt;

			_db.Journey.upsert({
				name: name.getValue(),
				startedAt: startedAt.getDate(),
				endedAt: endedAt.getDate()
			}).then(function (journey) {
				return _this6.context.router.replace("journey/" + journey._id);
			});
		}
	}]);

	return JourneyCreator;
}(Journey);

exports.default = Journey;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUZELENBTEQ7S0FTQyx3REFBWSxLQUFJLFNBQUosRUFBYyxtQkFBa0IsTUFBbEI7QUFDekIsaUJBQVcsS0FBWDtBQUNBLGNBQVEsSUFBUixFQUZELENBVEQ7S0FERDtJQWVDLDBDQUFJLFVBQUosSUFBZSxXQUFVLFNBQVY7QUFDQyxZQUFPLENBQUMsTUFBRCxFQUNyQixFQUFDLFFBQU8sTUFBUCxFQUFlLE9BQU0sSUFBTixFQUFZLFVBQVM7Y0FBRyxPQUFLLElBQUw7T0FBSCxFQUFnQix5QkFBckQsRUFEcUIsQ0FBUCxFQURoQixDQWZEO0lBREQsQ0FETzs7Ozt5QkF5QkY7OztlQUM0QixLQUFLLElBQUwsQ0FENUI7T0FDRSxrQkFERjtPQUNRLDRCQURSO09BQ21CLHdCQURuQjs7QUFFTCxlQUFVLE1BQVYsQ0FBaUI7QUFDaEIsVUFBSyxLQUFLLFFBQUwsRUFBTDtBQUNBLGVBQVUsVUFBVSxPQUFWLEVBQVY7QUFDQSxhQUFRLFFBQVEsT0FBUixFQUFSO0lBSEQsRUFJRyxJQUpILENBSVE7V0FBUyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLE9BQXBCLGNBQXVDLFFBQVEsR0FBUjtJQUFoRCxDQUpSLENBRks7Ozs7UUE3QmM7RUFBdUI7O2tCQWpIeEIiLCJmaWxlIjoiam91cm5leS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbixUZXh0RmllbGQsIERhdGVQaWNrZXIsIEF2YXRhciwgRGl2aWRlciwgRGlhbG9nfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuaW1wb3J0IEljb25TYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcclxuaW1wb3J0IEljb25NYXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL21hcFwiXHJcbmltcG9ydCBJY29uU2NoZWR1bGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL2VkaXQtbG9jYXRpb25cIlxyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBJY29uUmVtb3ZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2RlbGV0ZVwiXHJcblxyXG5pbXBvcnQgQ2hpcHBlciBmcm9tIFwiLi9jb21wb25lbnRzL2NoaXBwZXJcIlxyXG5pbXBvcnQgVGV4dEZpZWxkV2l0aEljb24gZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0RmllbGRXaXRoSWNvblwiXHJcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hUZXh0RmllbGRcIlxyXG5pbXBvcnQgTWFwIGZyb20gXCIuL2NvbXBvbmVudHMvbWFwXCJcclxuaW1wb3J0IEl0aW5lcmFyeSBmcm9tIFwiLi9jb21wb25lbnRzL2l0aW5lcmFyeVwiXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCfSBmcm9tIFwiLi9kYlwiXHJcblxyXG5jb25zdCB7TG9hZGluZywgQ29tbWFuZEJhcn09VUlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm91cm5leSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17ZW50aXR5Om51bGx9XHJcblxyXG5cdGdldERhdGEoX2lkKXtcclxuXHRcdEpvdXJuZXlEQi5maW5kT25lKHtfaWR9LGVudGl0eT0+e1xyXG5cdFx0XHRpZihlbnRpdHkpe1xyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2VudGl0eX0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHR0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMuX2lkKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcclxuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxyXG4gICAgICAgICAgICB0aGlzLmdldERhdGEobmV4dFByb3BzLnBhcmFtcy5faWQpXHJcbiAgICB9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2VudGl0eTpqb3VybmV5fT10aGlzLnN0YXRlXHJcblxyXG5cdFx0aWYoIWpvdXJuZXkpXHJcblx0XHRcdHJldHVybiAoPExvYWRpbmcvPilcclxuXHJcblx0XHRjb25zdCB7c3RhcnRlZEF0LCBlbmRlZEF0fT1qb3VybmV5XHJcblx0XHRsZXQgc2NoZWR1bGVyXHJcblx0XHRsZXQgYWN0aW9ucz1bXHJcblx0XHRcdFwiQmFja1wiXHJcblx0XHRcdCx7YWN0aW9uOlwiQ29tbWVudFwiXHJcblx0XHRcdFx0LGxhYmVsOlwi6K+E6K66XCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6IGU9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgY29tbWVudC8ke0pvdXJuZXlEQi5fbmFtZX0vJHtqb3VybmV5Ll9pZH1gLHtqb3VybmV5fSlcclxuXHRcdFx0XHQsaWNvbjpJY29uUHVibGlzaH1cclxuXHRcdF1cclxuXHRcdHN3aXRjaChKb3VybmV5REIuZ2V0U3RhdGUoam91cm5leSkpe1xyXG5cdFx0Y2FzZSBcIk1lbW9yeVwiOlxyXG5cclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwiU3RhcnRpbmdcIjpcclxuXHRcdGNhc2UgXCJFbmRpbmdcIjpcclxuXHRcdGNhc2UgXCJUcmF2ZWxpbmdcIjpcclxuXHRcdGNhc2UgXCJQbGFuXCI6XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRzY2hlZHVsZXI9KFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgam91cm5leS8ke2pvdXJuZXkuX2lkfS9pdGluZXJhcnlgKX1cclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLlv6vpgJ/orqHliJLkvaDnmoTooYznqItcIlxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsRml4ZWQ9e3RydWV9Lz5cclxuXHRcdFx0XHRcdDxJdGluZXJhcnkgam91cm5leT17am91cm5leX0gbW9kZT1cInBsYWNlXCIvPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblxyXG5cdFx0XHRhY3Rpb25zLnNwbGljZSgxLDAse1xyXG5cdFx0XHRcdGFjdGlvbjpcIlJlbW92ZVwiXHJcblx0XHRcdFx0LGxhYmVsOlwi5Yig6ZmkXCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6ZT0+dGhpcy5yZW1vdmUoKVxyXG5cdFx0XHRcdCxpY29uOiBJY29uUmVtb3ZlXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSB0b3AgcmlnaHRcIlxyXG5cdFx0XHRcdFx0bWluaT17dHJ1ZX1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgcHVibGlzaC9qb3VybmV5LyR7am91cm5leS5faWR9YCl9PlxyXG5cdFx0XHRcdFx0JDxJY29uUHVibGlzaC8+XHJcblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHJcblx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJuYW1lXCJcclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLkuIDmrKHmnInni6znibnmhI/kuYnnmoTml4XooYzlkI3np7BcIlxyXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17am91cm5leS5uYW1lfS8+IFxyXG5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInN0YXJ0ZWRBdFwiIGZsb2F0aW5nTGFiZWxUZXh0PVwi5byA5aeL5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfSBkZWZhdWx0RGF0ZT17am91cm5leS5zdGFydGVkQXR9Lz5cclxuXHJcblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJlbmRlZEF0XCIgZmxvYXRpbmdMYWJlbFRleHQ9XCLnu5PmnZ/ml6XmnJ9cIlxyXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9IGRlZmF1bHREYXRlPXtqb3VybmV5LmVuZGVkQXR9Lz5cclxuXHJcblx0XHRcdFx0XHQ8Q2hpcHBlclxyXG5cdFx0XHRcdFx0XHR0aXRsZT1cIuabtOWkmuS/oeaBr1wiXHJcblx0XHRcdFx0XHRcdGF1dG9PcGVuPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0Y2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XHRcdFwi5b6S5q2lXCIsXCLoh6rpqb5cIixcIuiHquihjOi9plwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmjJHmiJhcIixcIuaUvuadvlwiLFwi5a625bqtXCIsXCLllYbliqFcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6ICB5Lq6XCIsXCLlsI/lralcIixcIuaDheS+o1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0e2xhYmVsOlwi6aKE566XXCIsdHlwZTpcIm51bWJlclwifSxcclxuXHRcdFx0XHRcdFx0XHRcdFwi5rW35rupXCIsXCLkurrmlodcIixcIuWxseawtFwiLFwi6YO95biCXCIsXCLkvJrlj4tcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6Jyc5pyIXCIsXCLnlJ/ml6VcIixcIuWRqOW5tOW6hlwiXHJcblx0XHRcdFx0XHRcdFx0XX0vPlxyXG5cclxuXHRcdFx0XHRcdHtzY2hlZHVsZXJ9XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17YWN0aW9uc30vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0Sm91cm5leURCLnJlbW92ZSh0aGlzLnN0YXRlLmVudGl0eSlcclxuXHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShcIi9cIilcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIEpvdXJuZXlDcmVhdG9yIGV4dGVuZHMgSm91cm5leXtcclxuXHRcdGdldERhdGEoKXtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRyZW5kZXIoKXtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIlxyXG5cdFx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5LiA5qyh5pyJ54us54m55oSP5LmJ55qE5peF6KGM5ZCN56ewXCJcclxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz4gXHJcblxyXG5cdFx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJzdGFydGVkQXRcIiBmbG9hdGluZ0xhYmVsVGV4dD1cIuW8gOWni+aXpeacn1wiXHJcblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImVuZGVkQXRcIiBmbG9hdGluZ0xhYmVsVGV4dD1cIue7k+adn+aXpeacn1wiXHJcblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG5cdCAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcclxuXHRcdFx0XHRcdFx0XHR7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBvblNlbGVjdDplPT50aGlzLnNhdmUoKSwgaWNvbjpJY29uU2F2ZX1cclxuXHRcdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHJcblx0XHRzYXZlKCl7XHJcblx0XHRcdGNvbnN0IHtuYW1lLCBzdGFydGVkQXQsIGVuZGVkQXR9PXRoaXMucmVmc1xyXG5cdFx0XHRKb3VybmV5REIudXBzZXJ0KHtcclxuXHRcdFx0XHRuYW1lOm5hbWUuZ2V0VmFsdWUoKSxcclxuXHRcdFx0XHRzdGFydGVkQXQ6c3RhcnRlZEF0LmdldERhdGUoKSxcclxuXHRcdFx0XHRlbmRlZEF0OmVuZGVkQXQuZ2V0RGF0ZSgpXHJcblx0XHRcdH0pLnRoZW4oam91cm5leT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBqb3VybmV5LyR7am91cm5leS5faWR9YCkpXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==