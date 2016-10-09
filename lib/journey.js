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
				return _this6.context.router.push("journey/" + journey._id);
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
						{ open: needMap },
						_react2.default.createElement(_map4.default, { onReady: function onReady(map) {
								return _this9.showWaypoints(map);
							} })
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
//# sourceMappingURL=data:application/json;base64,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QWxCLENBSGlCOzs7O1FBekNiIiwiZmlsZSI6ImpvdXJuZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuXHJcbmltcG9ydCB7VGV4dEZpZWxkLCBEYXRlUGlja2VyLCBBdmF0YXIsIERpdmlkZXIsIERpYWxvZ30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5pbXBvcnQgSWNvblNjaGVkdWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9lZGl0LWxvY2F0aW9uXCJcclxuXHJcbmltcG9ydCBDaGlwcGVyIGZyb20gXCIuL2NvbXBvbmVudHMvY2hpcHBlclwiXHJcbmltcG9ydCBUZXh0RmllbGRXaXRoSWNvbiBmcm9tIFwiLi9jb21wb25lbnRzL3RleHRGaWVsZFdpdGhJY29uXCJcclxuaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9jb21wb25lbnRzL3NlYXJjaFRleHRGaWVsZFwiXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vY29tcG9uZW50cy9tYXBcIlxyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQn0gZnJvbSBcIi4vZGJcIlxyXG5cclxuY29uc3Qge0xvYWRpbmd9PVVJXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvdXJuZXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e2VudGl0eTpudWxsfVxyXG5cclxuXHRnZXREYXRhKF9pZCl7XHJcblx0XHRKb3VybmV5REIuZmluZE9uZSh7X2lkfSxlbnRpdHk9PntcclxuXHRcdFx0ZW50aXR5LnN0YXJ0ZWRBdCAmJiAoZW50aXR5LnN0YXJ0ZWRBdD1uZXcgRGF0ZShlbnRpdHkuc3RhcnRlZEF0KSk7XHJcblx0XHRcdGVudGl0eS5lbmRlZEF0ICYmIChlbnRpdHkuZW5kZWRBdD1uZXcgRGF0ZShlbnRpdHkuZW5kZWRBdCkpO1xyXG5cdFx0XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2VudGl0eX0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0dGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLl9pZClcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wYXJhbXMuX2lkIT1uZXh0UHJvcHMucGFyYW1zLl9pZClcclxuICAgICAgICAgICAgdGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxyXG4gICAgfVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtlbnRpdHk6am91cm5leX09dGhpcy5zdGF0ZVxyXG5cclxuXHRcdGlmKCFqb3VybmV5KVxyXG5cdFx0XHRyZXR1cm4gKDxMb2FkaW5nLz4pXHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PFRleHRTY2hlZHVsZXIgcmVmPVwic2NoZWR1bGVyXCIgam91cm5leT17am91cm5leX0vPlxyXG5cclxuXHRcdFx0XHRcdDxTZWFyY2ggaGludFRleHQ9XCLmn6Xmib4655yL55yL5aSn5L6g5Lus55qE6Laz6L+55aW95aW96KeE5YiS5LiA5LiLXCIgZnVsbFdpZHRoPXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdFx0PGJyLz5cclxuXHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIiBoaW50VGV4dD1cIuWQjeWtl1wiIGZ1bGxXaWR0aD17dHJ1ZX0gZGVmYXVsdFZhbHVlPXtqb3VybmV5Lm5hbWV9Lz5cclxuXHJcblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJzdGFydGVkQXRcIiBoaW50VGV4dD1cIuW8gOWni+aXpeacn1wiIGF1dG9Paz17dHJ1ZX0gZGVmYXVsdERhdGU9e2pvdXJuZXkuc3RhcnRlZEF0fS8+XHJcblxyXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwiZW5kZWRBdFwiIGhpbnRUZXh0PVwi57uT5p2f5pel5pyfXCIgYXV0b09rPXt0cnVlfSBkZWZhdWx0RGF0ZT17am91cm5leS5lbmRlZEF0fS8+XHJcblxyXG5cdFx0XHRcdFx0PGJyLz5cclxuXHRcdFx0XHRcdDxDaGlwcGVyXHJcblx0XHRcdFx0XHRcdHRpdGxlPVwi5pu05aSa5L+h5oGvXCJcclxuXHRcdFx0XHRcdFx0YXV0b09wZW49e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRjaGlwcz17W1xyXG5cdFx0XHRcdFx0XHRcdFx0XCLlvpLmraVcIixcIuiHqumpvlwiLFwi6Ieq6KGM6L2mXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuaMkeaImFwiLFwi5pS+5p2+XCIsXCLlrrbluq1cIixcIuWVhuWKoVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLogIHkurpcIixcIuWwj+WtqVwiLFwi5oOF5L6jXCIsXHJcblx0XHRcdFx0XHRcdFx0XHR7bGFiZWw6XCLpooTnrpdcIix0eXBlOlwibnVtYmVyXCJ9LFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmtbfmu6lcIixcIuS6uuaWh1wiLFwi5bGx5rC0XCIsXCLpg73luIJcIixcIuS8muWPi1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLonJzmnIhcIixcIueUn+aXpVwiLFwi5ZGo5bm05bqGXCJcclxuXHRcdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsXHJcblx0XHRcdFx0XHRcdHthY3Rpb246XCJFeHRyYWN0XCIsIGxhYmVsOlwi5o+Q5Y+WXCIsIG9uU2VsZWN0OiBlPT50aGlzLmV4dHJhY3QoKSwgaWNvbjpJY29uU2F2ZX1cclxuXHRcdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIEpvdXJuZXlDcmVhdG9yIGV4dGVuZHMgSm91cm5leXtcclxuXHRcdHJlbmRlcigpe1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwibmFtZVwiIGhpbnRUZXh0PVwi5ZCN5a2XXCIgZnVsbFdpZHRoPXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJzdGFydGVkQXRcIiBoaW50VGV4dD1cIuW8gOWni+aXpeacn1wiIGF1dG9Paz17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwiZW5kZWRBdFwiIGhpbnRUZXh0PVwi57uT5p2f5pel5pyfXCIgYXV0b09rPXt0cnVlfS8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuXHQgICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsXHJcblx0XHRcdFx0XHRcdFx0e2FjdGlvbjpcIlNhdmVcIiwgbGFiZWw6XCLkv53lrZhcIiwgb25TZWxlY3Q6ZT0+dGhpcy5zYXZlKCksIGljb246SWNvblNhdmV9XHJcblx0XHRcdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblxyXG5cdFx0c2F2ZSgpe1xyXG5cdFx0XHRjb25zdCB7bmFtZSwgc3RhcnRlZEF0LCBlbmRlZEF0fT10aGlzLnJlZnNcclxuXHRcdFx0Sm91cm5leURCLnVwc2VydCh7XHJcblx0XHRcdFx0bmFtZTpuYW1lLmdldFZhbHVlKCksXHJcblx0XHRcdFx0c3RhcnRlZEF0OnN0YXJ0ZWRBdC5nZXREYXRlKCksXHJcblx0XHRcdFx0ZW5kZWRBdDplbmRlZEF0LmdldERhdGUoKVxyXG5cdFx0XHR9KS50aGVuKGpvdXJuZXk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgam91cm5leS8ke2pvdXJuZXkuX2lkfWApKVxyXG5cdFx0fVxyXG5cclxuXHRcdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0XHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgVGV4dFNjaGVkdWxlciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHR3YXlwb2ludHM6IG51bGwsXHJcblx0XHRuZWVkTWFwOmZhbHNlXHJcblx0fVxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRKb3VybmV5REIuZ2V0V2F5cG9pbnRzKHRoaXMucHJvcHMuam91cm5leSlcclxuXHRcdFx0LnRoZW4od2F5cG9pbnRzPT50aGlzLnNldFN0YXRlKHt3YXlwb2ludHN9KSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXksIG90aGVyc309dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3dheXBvaW50cywgbmVlZE1hcH09dGhpcy5zdGF0ZVxyXG5cdFx0aWYod2F5cG9pbnRzICYmIHdheXBvaW50cy5sZW5ndGgpe1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZFdpdGhJY29uIGljb249ezxJY29uU2NoZWR1bGUvPn0gZmxvYXRpbmdMYWJlbEZpeGVkPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD17YOWPkeeOsCR7d2F5cG9pbnRzLmxlbmd0aH3lvKDnhafniYfmnInlnLDlnYDkv6Hmga/vvIzngrnlh7vlm77moIfmn6XnnIvor6bnu4bkv6Hmga9gfVxyXG5cdFx0XHRcdFx0XHRtdWx0aUxpbmU9e3RydWV9IGZ1bGxXaWR0aD17dHJ1ZX0gey4uLm90aGVyc30vPlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3dpZHRoOjI0LHZlcnRpY2FsQWxpZ246XCJib3R0b21cIn19PlxyXG5cdFx0XHRcdFx0XHQ8SWNvbk1hcCBjb2xvcj1cImxpZ2h0Ymx1ZVwiIG9uQ2xpY2s9e2U9PnRoaXMuc2hvd01hcCgpfS8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxEaWFsb2cgb3Blbj17bmVlZE1hcH0+XHJcblx0XHRcdFx0XHRcdDxNYXAgb25SZWFkeT17bWFwPT50aGlzLnNob3dXYXlwb2ludHMobWFwKX0vPlxyXG5cdFx0XHRcdFx0PC9EaWFsb2c+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkV2l0aEljb24gaWNvbj17PEljb25TY2hlZHVsZS8+fSBmbG9hdGluZ0xhYmVsRml4ZWQ9e3RydWV9XHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5b+r6YCf6K6h5YiS5L2g55qE6KGM56iL77yM5q+U5aaC77ya5YyX5LqsLOS4iua1tywuLi5cIlxyXG5cdFx0XHRcdFx0XHRtdWx0aUxpbmU9e3RydWV9IGZ1bGxXaWR0aD17dHJ1ZX0gey4uLm90aGVyc30vPlxyXG5cdFx0XHRcdDwvZGl2PilcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNob3dNYXAoKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe25lZWRNYXA6dHJ1ZX0pXHJcblx0fVxyXG5cdFxyXG5cdHNob3dXYXlwb2ludHMobWFwKXtcclxuXHRcdGNvbnN0IHt3YXlwb2ludHN9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtNYXJrZXJ9PW1hcFxyXG5cdFx0d2F5cG9pbnRzLmZvckVhY2god2F5cG9pbnQ9PntcclxuXHRcdFx0Y29uc3Qge2Nvb3JkaW5hdGVzOltsYXQsbG5nXX09d2F5cG9pbnQubG9jXHJcblx0XHRcdG1hcC5hZGRPdmVybGF5KG5ldyBNYXJrZXIobGF0LGxuZykpXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=