"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

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

var _chipper = require("./components/chipper");

var _chipper2 = _interopRequireDefault(_chipper);

var _textFieldWithIcon = require("./components/textFieldWithIcon");

var _textFieldWithIcon2 = _interopRequireDefault(_textFieldWithIcon);

var _searchTextField = require("./components/searchTextField");

var _searchTextField2 = _interopRequireDefault(_searchTextField);

var _map3 = require("./components/map");

var _map4 = _interopRequireDefault(_map3);

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = _qiliApp.UI.Loading;

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
				entity.startedAt && (entity.startedAt = new Date(entity.startedAt));
				entity.endedAt && (entity.endedAt = new Date(entity.endedAt));

				_this2.setState({ entity: entity });
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

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(TextScheduler, { ref: "scheduler", journey: journey }),
					_react2.default.createElement(_searchTextField2.default, { hintText: "查找:看看大侠们的足迹好好规划一下", fullWidth: true }),
					_react2.default.createElement("br", null),
					_react2.default.createElement(_materialUi.TextField, { ref: "name", hintText: "名字", fullWidth: true, defaultValue: journey.name }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", hintText: "开始日期", autoOk: true, defaultDate: journey.startedAt }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", hintText: "结束日期", autoOk: true, defaultDate: journey.endedAt }),
					_react2.default.createElement("br", null),
					_react2.default.createElement(_chipper2.default, {
						title: "更多信息",
						autoOpen: false,
						chips: ["徒步", "自驾", "自行车", "挑战", "放松", "家庭", "商务", "老人", "小孩", "情侣", { label: "预算", type: "number" }, "海滩", "人文", "山水", "都市", "会友", "蜜月", "生日", "周年庆"] })
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Extract", label: "提取", onSelect: function onSelect(e) {
							return _this3.extract();
						}, icon: _cloudDone2.default }] })
			);
		}
	}]);

	return Journey;
}(_react.Component);

Journey.Creator = (_temp2 = _class = function (_Journey) {
	_inherits(JourneyCreator, _Journey);

	function JourneyCreator() {
		_classCallCheck(this, JourneyCreator);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(JourneyCreator).apply(this, arguments));
	}

	_createClass(JourneyCreator, [{
		key: "render",
		value: function render() {
			var _this5 = this;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { ref: "name", hintText: "名字", fullWidth: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", hintText: "开始日期", autoOk: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", hintText: "结束日期", autoOk: true })
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
}(Journey), _class.contextTypes = {
	router: _react2.default.PropTypes.object
}, _temp2);
exports.default = Journey;

var TextScheduler = function (_Component2) {
	_inherits(TextScheduler, _Component2);

	function TextScheduler() {
		var _Object$getPrototypeO2;

		var _temp3, _this7, _ret2;

		_classCallCheck(this, TextScheduler);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp3 = (_this7 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(TextScheduler)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this7), _this7.state = {
			waypoints: null,
			needMap: false
		}, _temp3), _possibleConstructorReturn(_this7, _ret2);
	}

	_createClass(TextScheduler, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this8 = this;

			_db.Journey.getWaypoints(this.props.journey).then(function (waypoints) {
				return _this8.setState({ waypoints: waypoints });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this9 = this;

			var _props = this.props;
			var journey = _props.journey;
			var others = _props.others;
			var _state = this.state;
			var waypoints = _state.waypoints;
			var needMap = _state.needMap;

			if (waypoints && waypoints.length) {
				return _react2.default.createElement(
					"div",
					{ className: "grid" },
					_react2.default.createElement(_textFieldWithIcon2.default, _extends({ icon: _react2.default.createElement(_editLocation2.default, null), floatingLabelFixed: true,
						floatingLabelText: "发现" + waypoints.length + "张照片有地址信息，点击图标查看详细信息",
						multiLine: true, fullWidth: true }, others)),
					_react2.default.createElement(
						"div",
						{ style: { width: 24, verticalAlign: "bottom" } },
						_react2.default.createElement(_map2.default, { color: "lightblue", onClick: function onClick(e) {
								return _this9.showMap();
							} })
					),
					_react2.default.createElement(
						_materialUi.Dialog,
						{ open: needMap,
							onRequestClose: function onRequestClose(e) {
								return _this9.setState({ needMap: false });
							} },
						_react2.default.createElement(_map4.default, { onReady: function onReady(map) {
								return _this9.showWaypoints(map);
							}, style: { width: 400, height: 500 } })
					)
				);
			} else {
				return _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(_textFieldWithIcon2.default, _extends({ icon: _react2.default.createElement(_editLocation2.default, null), floatingLabelFixed: true,
						floatingLabelText: "快速计划你的行程，比如：北京,上海,...",
						multiLine: true, fullWidth: true }, others))
				);
			}
		}
	}, {
		key: "showMap",
		value: function showMap() {
			this.setState({ needMap: true });
		}
	}, {
		key: "showWaypoints",
		value: function showWaypoints(map) {
			var waypoints = this.state.waypoints;
			var Marker = map.Marker;

			waypoints.forEach(function (waypoint) {
				var _waypoint$loc$coordin = _slicedToArray(waypoint.loc.coordinates, 2);

				var lat = _waypoint$loc$coordin[0];
				var lng = _waypoint$loc$coordin[1];

				map.addOverlay(new Marker(lat, lng));
			});
		}
	}]);

	return TextScheduler;
}(_react.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Q0FBdkIsZ0JBRG9COztRQUNQLCtCQURPO1FBQ0gsK0JBREc7O0FBRTNCLFFBQUksVUFBSixDQUFlLElBQUksTUFBSixDQUFXLEdBQVgsRUFBZSxHQUFmLENBQWYsRUFGMkI7SUFBVixDQUFsQixDQUhpQjs7OztRQTFDYiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge1RleHRGaWVsZCwgRGF0ZVBpY2tlciwgQXZhdGFyLCBEaXZpZGVyLCBEaWFsb2d9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgSWNvblNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxyXG5pbXBvcnQgSWNvbk1hcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvbWFwXCJcclxuaW1wb3J0IEljb25TY2hlZHVsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZWRpdC1sb2NhdGlvblwiXHJcblxyXG5pbXBvcnQgQ2hpcHBlciBmcm9tIFwiLi9jb21wb25lbnRzL2NoaXBwZXJcIlxyXG5pbXBvcnQgVGV4dEZpZWxkV2l0aEljb24gZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0RmllbGRXaXRoSWNvblwiXHJcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hUZXh0RmllbGRcIlxyXG5pbXBvcnQgTWFwIGZyb20gXCIuL2NvbXBvbmVudHMvbWFwXCJcclxuXHJcbmltcG9ydCB7Sm91cm5leSBhcyBKb3VybmV5REJ9IGZyb20gXCIuL2RiXCJcclxuXHJcbmNvbnN0IHtMb2FkaW5nfT1VSVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb3VybmV5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtlbnRpdHk6bnVsbH1cclxuXHJcblx0Z2V0RGF0YShfaWQpe1xyXG5cdFx0Sm91cm5leURCLmZpbmRPbmUoe19pZH0sZW50aXR5PT57XHJcblx0XHRcdGVudGl0eS5zdGFydGVkQXQgJiYgKGVudGl0eS5zdGFydGVkQXQ9bmV3IERhdGUoZW50aXR5LnN0YXJ0ZWRBdCkpO1xyXG5cdFx0XHRlbnRpdHkuZW5kZWRBdCAmJiAoZW50aXR5LmVuZGVkQXQ9bmV3IERhdGUoZW50aXR5LmVuZGVkQXQpKTtcclxuXHRcdFxyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHl9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMucGFyYW1zLl9pZCE9bmV4dFByb3BzLnBhcmFtcy5faWQpXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YShuZXh0UHJvcHMucGFyYW1zLl9pZClcclxuICAgIH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZW50aXR5OmpvdXJuZXl9PXRoaXMuc3RhdGVcclxuXHJcblx0XHRpZigham91cm5leSlcclxuXHRcdFx0cmV0dXJuICg8TG9hZGluZy8+KVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdFx0XHRcdDxUZXh0U2NoZWR1bGVyIHJlZj1cInNjaGVkdWxlclwiIGpvdXJuZXk9e2pvdXJuZXl9Lz5cclxuXHJcblx0XHRcdFx0XHQ8U2VhcmNoIGhpbnRUZXh0PVwi5p+l5om+Oueci+eci+Wkp+S+oOS7rOeahOi2s+i/ueWlveWlveinhOWIkuS4gOS4i1wiIGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdDxici8+XHJcblxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJuYW1lXCIgaGludFRleHQ9XCLlkI3lrZdcIiBmdWxsV2lkdGg9e3RydWV9IGRlZmF1bHRWYWx1ZT17am91cm5leS5uYW1lfS8+XHJcblxyXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwic3RhcnRlZEF0XCIgaGludFRleHQ9XCLlvIDlp4vml6XmnJ9cIiBhdXRvT2s9e3RydWV9IGRlZmF1bHREYXRlPXtqb3VybmV5LnN0YXJ0ZWRBdH0vPlxyXG5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImVuZGVkQXRcIiBoaW50VGV4dD1cIue7k+adn+aXpeacn1wiIGF1dG9Paz17dHJ1ZX0gZGVmYXVsdERhdGU9e2pvdXJuZXkuZW5kZWRBdH0vPlxyXG5cclxuXHRcdFx0XHRcdDxici8+XHJcblx0XHRcdFx0XHQ8Q2hpcHBlclxyXG5cdFx0XHRcdFx0XHR0aXRsZT1cIuabtOWkmuS/oeaBr1wiXHJcblx0XHRcdFx0XHRcdGF1dG9PcGVuPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0Y2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XHRcdFwi5b6S5q2lXCIsXCLoh6rpqb5cIixcIuiHquihjOi9plwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmjJHmiJhcIixcIuaUvuadvlwiLFwi5a625bqtXCIsXCLllYbliqFcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6ICB5Lq6XCIsXCLlsI/lralcIixcIuaDheS+o1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0e2xhYmVsOlwi6aKE566XXCIsdHlwZTpcIm51bWJlclwifSxcclxuXHRcdFx0XHRcdFx0XHRcdFwi5rW35rupXCIsXCLkurrmlodcIixcIuWxseawtFwiLFwi6YO95biCXCIsXCLkvJrlj4tcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6Jyc5pyIXCIsXCLnlJ/ml6VcIixcIuWRqOW5tOW6hlwiXHJcblx0XHRcdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiRXh0cmFjdFwiLCBsYWJlbDpcIuaPkOWPllwiLCBvblNlbGVjdDogZT0+dGhpcy5leHRyYWN0KCksIGljb246SWNvblNhdmV9XHJcblx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgQ3JlYXRvcj1jbGFzcyBKb3VybmV5Q3JlYXRvciBleHRlbmRzIEpvdXJuZXl7XHJcblx0XHRyZW5kZXIoKXtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIiBoaW50VGV4dD1cIuWQjeWtl1wiIGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwic3RhcnRlZEF0XCIgaGludFRleHQ9XCLlvIDlp4vml6XmnJ9cIiBhdXRvT2s9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImVuZGVkQXRcIiBoaW50VGV4dD1cIue7k+adn+aXpeacn1wiIGF1dG9Paz17dHJ1ZX0vPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcblx0ICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxyXG5cdFx0XHRcdFx0XHRcdHthY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2F2ZSgpLCBpY29uOkljb25TYXZlfVxyXG5cdFx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cclxuXHRcdHNhdmUoKXtcclxuXHRcdFx0Y29uc3Qge25hbWUsIHN0YXJ0ZWRBdCwgZW5kZWRBdH09dGhpcy5yZWZzXHJcblx0XHRcdEpvdXJuZXlEQi51cHNlcnQoe1xyXG5cdFx0XHRcdG5hbWU6bmFtZS5nZXRWYWx1ZSgpLFxyXG5cdFx0XHRcdHN0YXJ0ZWRBdDpzdGFydGVkQXQuZ2V0RGF0ZSgpLFxyXG5cdFx0XHRcdGVuZGVkQXQ6ZW5kZWRBdC5nZXREYXRlKClcclxuXHRcdFx0fSkudGhlbihqb3VybmV5PT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGpvdXJuZXkvJHtqb3VybmV5Ll9pZH1gKSlcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdFx0cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRTY2hlZHVsZXIgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0d2F5cG9pbnRzOiBudWxsLFxyXG5cdFx0bmVlZE1hcDpmYWxzZVxyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Sm91cm5leURCLmdldFdheXBvaW50cyh0aGlzLnByb3BzLmpvdXJuZXkpXHJcblx0XHRcdC50aGVuKHdheXBvaW50cz0+dGhpcy5zZXRTdGF0ZSh7d2F5cG9pbnRzfSkpXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtqb3VybmV5LCBvdGhlcnN9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHt3YXlwb2ludHMsIG5lZWRNYXB9PXRoaXMuc3RhdGVcclxuXHRcdGlmKHdheXBvaW50cyAmJiB3YXlwb2ludHMubGVuZ3RoKXtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGRXaXRoSWNvbiBpY29uPXs8SWNvblNjaGVkdWxlLz59IGZsb2F0aW5nTGFiZWxGaXhlZD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9e2Dlj5HnjrAke3dheXBvaW50cy5sZW5ndGh95byg54Wn54mH5pyJ5Zyw5Z2A5L+h5oGv77yM54K55Ye75Zu+5qCH5p+l55yL6K+m57uG5L+h5oGvYH1cclxuXHRcdFx0XHRcdFx0bXVsdGlMaW5lPXt0cnVlfSBmdWxsV2lkdGg9e3RydWV9IHsuLi5vdGhlcnN9Lz5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3t3aWR0aDoyNCx2ZXJ0aWNhbEFsaWduOlwiYm90dG9tXCJ9fT5cclxuXHRcdFx0XHRcdFx0PEljb25NYXAgY29sb3I9XCJsaWdodGJsdWVcIiBvbkNsaWNrPXtlPT50aGlzLnNob3dNYXAoKX0vPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8RGlhbG9nIG9wZW49e25lZWRNYXB9IFxyXG5cdFx0XHRcdFx0XHRvblJlcXVlc3RDbG9zZT17ZT0+dGhpcy5zZXRTdGF0ZSh7bmVlZE1hcDpmYWxzZX0pfT5cclxuXHRcdFx0XHRcdFx0PE1hcCBvblJlYWR5PXttYXA9PnRoaXMuc2hvd1dheXBvaW50cyhtYXApfSBzdHlsZT17e3dpZHRoOjQwMCxoZWlnaHQ6NTAwfX0vPlxyXG5cdFx0XHRcdFx0PC9EaWFsb2c+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkV2l0aEljb24gaWNvbj17PEljb25TY2hlZHVsZS8+fSBmbG9hdGluZ0xhYmVsRml4ZWQ9e3RydWV9XHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5b+r6YCf6K6h5YiS5L2g55qE6KGM56iL77yM5q+U5aaC77ya5YyX5LqsLOS4iua1tywuLi5cIlxyXG5cdFx0XHRcdFx0XHRtdWx0aUxpbmU9e3RydWV9IGZ1bGxXaWR0aD17dHJ1ZX0gey4uLm90aGVyc30vPlxyXG5cdFx0XHRcdDwvZGl2PilcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNob3dNYXAoKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe25lZWRNYXA6dHJ1ZX0pXHJcblx0fVxyXG5cdFxyXG5cdHNob3dXYXlwb2ludHMobWFwKXtcclxuXHRcdGNvbnN0IHt3YXlwb2ludHN9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtNYXJrZXJ9PW1hcFxyXG5cdFx0d2F5cG9pbnRzLmZvckVhY2god2F5cG9pbnQ9PntcclxuXHRcdFx0Y29uc3Qge2Nvb3JkaW5hdGVzOltsYXQsbG5nXX09d2F5cG9pbnQubG9jXHJcblx0XHRcdG1hcC5hZGRPdmVybGF5KG5ldyBNYXJrZXIobGF0LGxuZykpXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=