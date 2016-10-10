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

			var startedAt = journey.startedAt;
			var endedAt = journey.endedAt;

			var scheduler = void 0,
			    searcher = void 0;
			if (startedAt && endedAt && endedAt.getTime() < Date.now()) {} else {
				scheduler = _react2.default.createElement(TextScheduler, { ref: "scheduler", journey: journey });
				searcher = _react2.default.createElement(_searchTextField2.default, { hintText: "查找:看看大侠们的足迹好好规划一下", fullWidth: true });
			}
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { ref: "name", hintText: "名字", fullWidth: true, defaultValue: journey.name }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", hintText: "开始日期", autoOk: true, defaultDate: journey.startedAt }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", hintText: "结束日期", autoOk: true, defaultDate: journey.endedAt }),
					_react2.default.createElement("br", null),
					_react2.default.createElement(_chipper2.default, {
						title: "更多信息",
						autoOpen: false,
						chips: ["徒步", "自驾", "自行车", "挑战", "放松", "家庭", "商务", "老人", "小孩", "情侣", { label: "预算", type: "number" }, "海滩", "人文", "山水", "都市", "会友", "蜜月", "生日", "周年庆"] }),
					_react2.default.createElement("br", null),
					scheduler,
					searcher
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
							}, style: { width: "100%", height: 500 } })
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
			var _BMap = BMap;
			var Marker = _BMap.Marker;
			var Point = _BMap.Point;

			var points = [];
			waypoints.forEach(function (waypoint) {
				var _waypoint$loc$coordin = _slicedToArray(waypoint.loc.coordinates, 2);

				var lat = _waypoint$loc$coordin[0];
				var lng = _waypoint$loc$coordin[1];

				var marker = new Marker(new Point(lat, lng), { enableDragging: true });
				map.addOverlay(marker);
				points.push(marker.getPosition());
			});

			if (points.length) map.setViewport(points);
		}
	}]);

	return TextScheduler;
}(_react.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LElBQVgsSUFBcUIsT0FGdkMsQ0FERDtLQURELENBREk7SUFmTDs7Ozs0QkF5QlE7QUFDUixRQUFLLFFBQUwsQ0FBYyxFQUFDLFNBQVEsSUFBUixFQUFmLEVBRFE7Ozs7Z0NBSUssS0FBSTtPQUNWLFlBQVcsS0FBSyxLQUFMLENBQVgsVUFEVTtlQUVJLEtBRko7T0FFVixzQkFGVTtPQUVILG9CQUZHOztBQUdqQixPQUFJLFNBQU8sRUFBUCxDQUhhO0FBSWpCLGFBQVUsT0FBVixDQUFrQixvQkFBVTsrQ0FDRyxTQUFTLEdBQVQsQ0FBdkIsZ0JBRG9COztRQUNQLCtCQURPO1FBQ0gsK0JBREc7O0FBRTNCLFFBQUksU0FBTyxJQUFJLE1BQUosQ0FBVyxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWMsR0FBZCxDQUFYLEVBQStCLEVBQUMsZ0JBQWUsSUFBZixFQUFoQyxDQUFQLENBRnVCO0FBRzNCLFFBQUksVUFBSixDQUFlLE1BQWYsRUFIMkI7QUFJM0IsV0FBTyxJQUFQLENBQVksT0FBTyxXQUFQLEVBQVosRUFKMkI7SUFBVixDQUFsQixDQUppQjs7QUFXakIsT0FBRyxPQUFPLE1BQVAsRUFDRixJQUFJLFdBQUosQ0FBZ0IsTUFBaEIsRUFERDs7OztRQXJESSIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge1RleHRGaWVsZCwgRGF0ZVBpY2tlciwgQXZhdGFyLCBEaXZpZGVyLCBEaWFsb2d9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgSWNvblNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxyXG5pbXBvcnQgSWNvbk1hcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvbWFwXCJcclxuaW1wb3J0IEljb25TY2hlZHVsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZWRpdC1sb2NhdGlvblwiXHJcblxyXG5pbXBvcnQgQ2hpcHBlciBmcm9tIFwiLi9jb21wb25lbnRzL2NoaXBwZXJcIlxyXG5pbXBvcnQgVGV4dEZpZWxkV2l0aEljb24gZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0RmllbGRXaXRoSWNvblwiXHJcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hUZXh0RmllbGRcIlxyXG5pbXBvcnQgTWFwIGZyb20gXCIuL2NvbXBvbmVudHMvbWFwXCJcclxuXHJcbmltcG9ydCB7Sm91cm5leSBhcyBKb3VybmV5REJ9IGZyb20gXCIuL2RiXCJcclxuXHJcbmNvbnN0IHtMb2FkaW5nfT1VSVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb3VybmV5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtlbnRpdHk6bnVsbH1cclxuXHJcblx0Z2V0RGF0YShfaWQpe1xyXG5cdFx0Sm91cm5leURCLmZpbmRPbmUoe19pZH0sZW50aXR5PT57XHJcblx0XHRcdGVudGl0eS5zdGFydGVkQXQgJiYgKGVudGl0eS5zdGFydGVkQXQ9bmV3IERhdGUoZW50aXR5LnN0YXJ0ZWRBdCkpO1xyXG5cdFx0XHRlbnRpdHkuZW5kZWRBdCAmJiAoZW50aXR5LmVuZGVkQXQ9bmV3IERhdGUoZW50aXR5LmVuZGVkQXQpKTtcclxuXHRcdFxyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHl9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMucGFyYW1zLl9pZCE9bmV4dFByb3BzLnBhcmFtcy5faWQpXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YShuZXh0UHJvcHMucGFyYW1zLl9pZClcclxuICAgIH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZW50aXR5OmpvdXJuZXl9PXRoaXMuc3RhdGVcclxuXHJcblx0XHRpZigham91cm5leSlcclxuXHRcdFx0cmV0dXJuICg8TG9hZGluZy8+KVxyXG5cdFx0XHJcblx0XHRjb25zdCB7c3RhcnRlZEF0LCBlbmRlZEF0fT1qb3VybmV5XHJcblx0XHRsZXQgc2NoZWR1bGVyLCBzZWFyY2hlclxyXG5cdFx0aWYoc3RhcnRlZEF0ICYmIGVuZGVkQXQgJiYgZW5kZWRBdC5nZXRUaW1lKCk8RGF0ZS5ub3coKSl7XHJcblx0XHRcdFxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHNjaGVkdWxlcj0oPFRleHRTY2hlZHVsZXIgcmVmPVwic2NoZWR1bGVyXCIgam91cm5leT17am91cm5leX0vPilcclxuXHRcdFx0c2VhcmNoZXI9KDxTZWFyY2ggaGludFRleHQ9XCLmn6Xmib4655yL55yL5aSn5L6g5Lus55qE6Laz6L+55aW95aW96KeE5YiS5LiA5LiLXCIgZnVsbFdpZHRoPXt0cnVlfS8+KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIiBoaW50VGV4dD1cIuWQjeWtl1wiIGZ1bGxXaWR0aD17dHJ1ZX0gZGVmYXVsdFZhbHVlPXtqb3VybmV5Lm5hbWV9Lz5cclxuXHJcblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJzdGFydGVkQXRcIiBoaW50VGV4dD1cIuW8gOWni+aXpeacn1wiIGF1dG9Paz17dHJ1ZX0gZGVmYXVsdERhdGU9e2pvdXJuZXkuc3RhcnRlZEF0fS8+XHJcblxyXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwiZW5kZWRBdFwiIGhpbnRUZXh0PVwi57uT5p2f5pel5pyfXCIgYXV0b09rPXt0cnVlfSBkZWZhdWx0RGF0ZT17am91cm5leS5lbmRlZEF0fS8+XHJcblxyXG5cdFx0XHRcdFx0PGJyLz5cclxuXHRcdFx0XHRcdDxDaGlwcGVyXHJcblx0XHRcdFx0XHRcdHRpdGxlPVwi5pu05aSa5L+h5oGvXCJcclxuXHRcdFx0XHRcdFx0YXV0b09wZW49e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRjaGlwcz17W1xyXG5cdFx0XHRcdFx0XHRcdFx0XCLlvpLmraVcIixcIuiHqumpvlwiLFwi6Ieq6KGM6L2mXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuaMkeaImFwiLFwi5pS+5p2+XCIsXCLlrrbluq1cIixcIuWVhuWKoVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLogIHkurpcIixcIuWwj+WtqVwiLFwi5oOF5L6jXCIsXHJcblx0XHRcdFx0XHRcdFx0XHR7bGFiZWw6XCLpooTnrpdcIix0eXBlOlwibnVtYmVyXCJ9LFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmtbfmu6lcIixcIuS6uuaWh1wiLFwi5bGx5rC0XCIsXCLpg73luIJcIixcIuS8muWPi1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLonJzmnIhcIixcIueUn+aXpVwiLFwi5ZGo5bm05bqGXCJcclxuXHRcdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdDxici8+XHJcblxyXG5cdFx0XHRcdFx0e3NjaGVkdWxlcn1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0e3NlYXJjaGVyfVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiRXh0cmFjdFwiLCBsYWJlbDpcIuaPkOWPllwiLCBvblNlbGVjdDogZT0+dGhpcy5leHRyYWN0KCksIGljb246SWNvblNhdmV9XHJcblx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgQ3JlYXRvcj1jbGFzcyBKb3VybmV5Q3JlYXRvciBleHRlbmRzIEpvdXJuZXl7XHJcblx0XHRyZW5kZXIoKXtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIiBoaW50VGV4dD1cIuWQjeWtl1wiIGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwic3RhcnRlZEF0XCIgaGludFRleHQ9XCLlvIDlp4vml6XmnJ9cIiBhdXRvT2s9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImVuZGVkQXRcIiBoaW50VGV4dD1cIue7k+adn+aXpeacn1wiIGF1dG9Paz17dHJ1ZX0vPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcblx0ICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxyXG5cdFx0XHRcdFx0XHRcdHthY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2F2ZSgpLCBpY29uOkljb25TYXZlfVxyXG5cdFx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cclxuXHRcdHNhdmUoKXtcclxuXHRcdFx0Y29uc3Qge25hbWUsIHN0YXJ0ZWRBdCwgZW5kZWRBdH09dGhpcy5yZWZzXHJcblx0XHRcdEpvdXJuZXlEQi51cHNlcnQoe1xyXG5cdFx0XHRcdG5hbWU6bmFtZS5nZXRWYWx1ZSgpLFxyXG5cdFx0XHRcdHN0YXJ0ZWRBdDpzdGFydGVkQXQuZ2V0RGF0ZSgpLFxyXG5cdFx0XHRcdGVuZGVkQXQ6ZW5kZWRBdC5nZXREYXRlKClcclxuXHRcdFx0fSkudGhlbihqb3VybmV5PT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGpvdXJuZXkvJHtqb3VybmV5Ll9pZH1gKSlcclxuXHRcdH1cclxuXHJcblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdFx0cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRTY2hlZHVsZXIgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0d2F5cG9pbnRzOiBudWxsLFxyXG5cdFx0bmVlZE1hcDpmYWxzZVxyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Sm91cm5leURCLmdldFdheXBvaW50cyh0aGlzLnByb3BzLmpvdXJuZXkpXHJcblx0XHRcdC50aGVuKHdheXBvaW50cz0+dGhpcy5zZXRTdGF0ZSh7d2F5cG9pbnRzfSkpXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtqb3VybmV5LCBvdGhlcnN9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHt3YXlwb2ludHMsIG5lZWRNYXB9PXRoaXMuc3RhdGVcclxuXHRcdGlmKHdheXBvaW50cyAmJiB3YXlwb2ludHMubGVuZ3RoKXtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGRXaXRoSWNvbiBpY29uPXs8SWNvblNjaGVkdWxlLz59IGZsb2F0aW5nTGFiZWxGaXhlZD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9e2Dlj5HnjrAke3dheXBvaW50cy5sZW5ndGh95byg54Wn54mH5pyJ5Zyw5Z2A5L+h5oGv77yM54K55Ye75Zu+5qCH5p+l55yL6K+m57uG5L+h5oGvYH1cclxuXHRcdFx0XHRcdFx0bXVsdGlMaW5lPXt0cnVlfSBmdWxsV2lkdGg9e3RydWV9IHsuLi5vdGhlcnN9Lz5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3t3aWR0aDoyNCx2ZXJ0aWNhbEFsaWduOlwiYm90dG9tXCJ9fT5cclxuXHRcdFx0XHRcdFx0PEljb25NYXAgY29sb3I9XCJsaWdodGJsdWVcIiBvbkNsaWNrPXtlPT50aGlzLnNob3dNYXAoKX0vPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8RGlhbG9nIG9wZW49e25lZWRNYXB9IFxyXG5cdFx0XHRcdFx0XHRvblJlcXVlc3RDbG9zZT17ZT0+dGhpcy5zZXRTdGF0ZSh7bmVlZE1hcDpmYWxzZX0pfT5cclxuXHRcdFx0XHRcdFx0PE1hcCBvblJlYWR5PXttYXA9PnRoaXMuc2hvd1dheXBvaW50cyhtYXApfSBzdHlsZT17e3dpZHRoOlwiMTAwJVwiLGhlaWdodDo1MDB9fS8+XHJcblx0XHRcdFx0XHQ8L0RpYWxvZz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGRXaXRoSWNvbiBpY29uPXs8SWNvblNjaGVkdWxlLz59IGZsb2F0aW5nTGFiZWxGaXhlZD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLlv6vpgJ/orqHliJLkvaDnmoTooYznqIvvvIzmr5TlpoLvvJrljJfkuqws5LiK5rW3LC4uLlwiXHJcblx0XHRcdFx0XHRcdG11bHRpTGluZT17dHJ1ZX0gZnVsbFdpZHRoPXt0cnVlfSB7Li4ub3RoZXJzfS8+XHJcblx0XHRcdFx0PC9kaXY+KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2hvd01hcCgpe1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7bmVlZE1hcDp0cnVlfSlcclxuXHR9XHJcblx0XHJcblx0c2hvd1dheXBvaW50cyhtYXApe1xyXG5cdFx0Y29uc3Qge3dheXBvaW50c309dGhpcy5zdGF0ZVxyXG5cdFx0Y29uc3Qge01hcmtlcixQb2ludH09Qk1hcFxyXG5cdFx0bGV0IHBvaW50cz1bXVxyXG5cdFx0d2F5cG9pbnRzLmZvckVhY2god2F5cG9pbnQ9PntcclxuXHRcdFx0Y29uc3Qge2Nvb3JkaW5hdGVzOltsYXQsbG5nXX09d2F5cG9pbnQubG9jXHJcblx0XHRcdGxldCBtYXJrZXI9bmV3IE1hcmtlcihuZXcgUG9pbnQobGF0LGxuZyksIHtlbmFibGVEcmFnZ2luZzp0cnVlfSlcclxuXHRcdFx0bWFwLmFkZE92ZXJsYXkobWFya2VyKVxyXG5cdFx0XHRwb2ludHMucHVzaChtYXJrZXIuZ2V0UG9zaXRpb24oKSlcclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdGlmKHBvaW50cy5sZW5ndGgpXHJcblx0XHRcdG1hcC5zZXRWaWV3cG9ydChwb2ludHMpXHJcblx0fVxyXG59XHJcbiJdfQ==