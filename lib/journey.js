"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
			var actions = ["Back", { action: "Comment",
				label: "评论",
				onSelect: function onSelect(e) {
					return _this3.context.router.push("comment/" + _db.Journey._name + "/" + journey._id, { journey: journey });
				},
				icon: _cameraRoll2.default }, { action: "Publish",
				label: "出版",
				onSelect: function onSelect(e) {
					return _this3.context.router.push("publish", { journey: journey });
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
					scheduler = _react2.default.createElement(TextScheduler, { ref: "scheduler", journey: journey });
					searcher = _react2.default.createElement(_searchTextField2.default, { hintText: "查找:看看大侠们的足迹好好规划一下", fullWidth: true });
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
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { ref: "name", hintText: "名字", fullWidth: true, defaultValue: journey.name }),
					_react2.default.createElement(
						"div",
						{ className: "grid" },
						_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", hintText: "开始日期", fullWidth: true,
							autoOk: true, defaultDate: journey.startedAt }),
						_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", hintText: "结束日期", fullWidth: true,
							autoOk: true, defaultDate: journey.endedAt })
					),
					_react2.default.createElement("br", null),
					_react2.default.createElement(_chipper2.default, {
						title: "更多信息",
						autoOpen: false,
						chips: ["徒步", "自驾", "自行车", "挑战", "放松", "家庭", "商务", "老人", "小孩", "情侣", { label: "预算", type: "number" }, "海滩", "人文", "山水", "都市", "会友", "蜜月", "生日", "周年庆"] }),
					_react2.default.createElement("br", null),
					scheduler,
					searcher,
					_react2.default.createElement(_itinerary2.default, { journey: journey, mode: "place" })
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: actions })
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
					_react2.default.createElement(
						"div",
						{ className: "grid" },
						_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", hintText: "开始日期",
							fullWidth: true, autoOk: true }),
						_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", hintText: "结束日期",
							fullWidth: true, autoOk: true })
					)
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

var TextScheduler = function (_Component2) {
	_inherits(TextScheduler, _Component2);

	function TextScheduler() {
		var _Object$getPrototypeO2;

		var _temp2, _this7, _ret2;

		_classCallCheck(this, TextScheduler);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this7 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(TextScheduler)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this7), _this7.state = {
			waypoints: null,
			needMap: false
		}, _temp2), _possibleConstructorReturn(_this7, _ret2);
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
					_react2.default.createElement(_materialUi.TextField, _extends({ floatingLabelFixed: true,
						onClick: function onClick(e) {
							return _this9.context.router.push("journey/" + journey._id + "/itinerary");
						},
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
						onClick: function onClick(e) {
							return _this9.context.router.push("journey/" + journey._id + "/itinerary");
						},
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

TextScheduler.contextTypes = {
	router: _react.PropTypes.object
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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SUFBWCxJQUFxQixPQUh2QyxDQUREO0tBREQsQ0FESTtJQWhCTDs7Ozs0QkEyQlE7QUFDUixRQUFLLFFBQUwsQ0FBYyxFQUFDLFNBQVEsSUFBUixFQUFmLEVBRFE7Ozs7Z0NBSUssS0FBSTtPQUNWLFlBQVcsS0FBSyxLQUFMLENBQVgsVUFEVTtlQUVJLEtBRko7T0FFVixzQkFGVTtPQUVILG9CQUZHOztBQUdqQixPQUFJLFNBQU8sRUFBUCxDQUhhO0FBSWpCLGFBQVUsT0FBVixDQUFrQixvQkFBVTsrQ0FDRyxTQUFTLEdBQVQsQ0FBdkIsZ0JBRG9COztRQUNQLCtCQURPO1FBQ0gsK0JBREc7O0FBRTNCLFFBQUksU0FBTyxJQUFJLE1BQUosQ0FBVyxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWMsR0FBZCxDQUFYLEVBQStCLEVBQUMsZ0JBQWUsSUFBZixFQUFoQyxDQUFQLENBRnVCO0FBRzNCLFFBQUksVUFBSixDQUFlLE1BQWYsRUFIMkI7QUFJM0IsV0FBTyxJQUFQLENBQVksT0FBTyxXQUFQLEVBQVosRUFKMkI7SUFBVixDQUFsQixDQUppQjs7QUFXakIsT0FBRyxPQUFPLE1BQVAsRUFDRixJQUFJLFdBQUosQ0FBZ0IsTUFBaEIsRUFERDs7OztRQXZESTs7O2NBMkRFLGVBQWE7QUFDbkIsU0FBUSxpQkFBVSxNQUFWIiwiZmlsZSI6ImpvdXJuZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuXHJcbmltcG9ydCB7VGV4dEZpZWxkLCBEYXRlUGlja2VyLCBBdmF0YXIsIERpdmlkZXIsIERpYWxvZ30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5pbXBvcnQgSWNvblNjaGVkdWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9lZGl0LWxvY2F0aW9uXCJcclxuaW1wb3J0IEljb25QdWJsaXNoIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIlxyXG5pbXBvcnQgSWNvblJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kZWxldGVcIlxyXG5cclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jaGlwcGVyXCJcclxuaW1wb3J0IFRleHRGaWVsZFdpdGhJY29uIGZyb20gXCIuL2NvbXBvbmVudHMvdGV4dEZpZWxkV2l0aEljb25cIlxyXG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoVGV4dEZpZWxkXCJcclxuaW1wb3J0IE1hcCBmcm9tIFwiLi9jb21wb25lbnRzL21hcFwiXHJcbmltcG9ydCBJdGluZXJhcnkgZnJvbSBcIi4vY29tcG9uZW50cy9pdGluZXJhcnlcIlxyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQn0gZnJvbSBcIi4vZGJcIlxyXG5cclxuY29uc3Qge0xvYWRpbmd9PVVJXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvdXJuZXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e2VudGl0eTpudWxsfVxyXG5cclxuXHRnZXREYXRhKF9pZCl7XHJcblx0XHRKb3VybmV5REIuZmluZE9uZSh7X2lkfSxlbnRpdHk9PntcclxuXHRcdFx0ZW50aXR5LnN0YXJ0ZWRBdCAmJiAoZW50aXR5LnN0YXJ0ZWRBdD1uZXcgRGF0ZShlbnRpdHkuc3RhcnRlZEF0KSk7XHJcblx0XHRcdGVudGl0eS5lbmRlZEF0ICYmIChlbnRpdHkuZW5kZWRBdD1uZXcgRGF0ZShlbnRpdHkuZW5kZWRBdCkpO1xyXG5cclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHR0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMuX2lkKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcclxuICAgICAgICBpZih0aGlzLnByb3BzLnBhcmFtcy5faWQhPW5leHRQcm9wcy5wYXJhbXMuX2lkKVxyXG4gICAgICAgICAgICB0aGlzLmdldERhdGEobmV4dFByb3BzLnBhcmFtcy5faWQpXHJcbiAgICB9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2VudGl0eTpqb3VybmV5fT10aGlzLnN0YXRlXHJcblxyXG5cdFx0aWYoIWpvdXJuZXkpXHJcblx0XHRcdHJldHVybiAoPExvYWRpbmcvPilcclxuXHJcblx0XHRjb25zdCB7c3RhcnRlZEF0LCBlbmRlZEF0fT1qb3VybmV5XHJcblx0XHRsZXQgc2NoZWR1bGVyLCBzZWFyY2hlclxyXG5cdFx0bGV0IGFjdGlvbnM9W1xyXG5cdFx0XHRcIkJhY2tcIlxyXG5cdFx0XHQse2FjdGlvbjpcIkNvbW1lbnRcIlxyXG5cdFx0XHRcdCxsYWJlbDpcIuivhOiuulwiXHJcblx0XHRcdFx0LG9uU2VsZWN0OiBlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGNvbW1lbnQvJHtKb3VybmV5REIuX25hbWV9LyR7am91cm5leS5faWR9YCx7am91cm5leX0pXHJcblx0XHRcdFx0LGljb246SWNvblB1Ymxpc2h9XHJcblx0XHRcdCx7YWN0aW9uOlwiUHVibGlzaFwiXHJcblx0XHRcdFx0LGxhYmVsOlwi5Ye654mIXCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6IGU9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcInB1Ymxpc2hcIix7am91cm5leX0pXHJcblx0XHRcdFx0LGljb246SWNvblB1Ymxpc2h9XHJcblx0XHRdXHJcblx0XHRzd2l0Y2goSm91cm5leURCLmdldFN0YXRlKGpvdXJuZXkpKXtcclxuXHRcdGNhc2UgXCJNZW1vcnlcIjpcclxuXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcIlN0YXJ0aW5nXCI6XHJcblx0XHRjYXNlIFwiRW5kaW5nXCI6XHJcblx0XHRjYXNlIFwiVHJhdmVsaW5nXCI6XHJcblx0XHRjYXNlIFwiUGxhblwiOlxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0c2NoZWR1bGVyPSg8VGV4dFNjaGVkdWxlciByZWY9XCJzY2hlZHVsZXJcIiBqb3VybmV5PXtqb3VybmV5fS8+KVxyXG5cdFx0XHRzZWFyY2hlcj0oPFNlYXJjaCBoaW50VGV4dD1cIuafpeaJvjrnnIvnnIvlpKfkvqDku6znmoTotrPov7nlpb3lpb3op4TliJLkuIDkuItcIiBmdWxsV2lkdGg9e3RydWV9Lz4pXHJcblx0XHRcdGFjdGlvbnMuc3BsaWNlKDEsMCx7XHJcblx0XHRcdFx0YWN0aW9uOlwiUmVtb3ZlXCJcclxuXHRcdFx0XHQsbGFiZWw6XCLliKDpmaRcIlxyXG5cdFx0XHRcdCxvblNlbGVjdDplPT50aGlzLnJlbW92ZSgpXHJcblx0XHRcdFx0LGljb246IEljb25SZW1vdmVcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwibmFtZVwiIGhpbnRUZXh0PVwi5ZCN5a2XXCIgZnVsbFdpZHRoPXt0cnVlfSBkZWZhdWx0VmFsdWU9e2pvdXJuZXkubmFtZX0vPlxyXG5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG5cdFx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJzdGFydGVkQXRcIiBoaW50VGV4dD1cIuW8gOWni+aXpeacn1wiIGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9IGRlZmF1bHREYXRlPXtqb3VybmV5LnN0YXJ0ZWRBdH0vPlxyXG5cdFx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJlbmRlZEF0XCIgaGludFRleHQ9XCLnu5PmnZ/ml6XmnJ9cIiBmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfSBkZWZhdWx0RGF0ZT17am91cm5leS5lbmRlZEF0fS8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHQ8YnIvPlxyXG5cdFx0XHRcdFx0PENoaXBwZXJcclxuXHRcdFx0XHRcdFx0dGl0bGU9XCLmm7TlpJrkv6Hmga9cIlxyXG5cdFx0XHRcdFx0XHRhdXRvT3Blbj17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdGNoaXBzPXtbXHJcblx0XHRcdFx0XHRcdFx0XHRcIuW+kuatpVwiLFwi6Ieq6am+XCIsXCLoh6rooYzovaZcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi5oyR5oiYXCIsXCLmlL7mnb5cIixcIuWutuW6rVwiLFwi5ZWG5YqhXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuiAgeS6ulwiLFwi5bCP5a2pXCIsXCLmg4XkvqNcIixcclxuXHRcdFx0XHRcdFx0XHRcdHtsYWJlbDpcIumihOeul1wiLHR5cGU6XCJudW1iZXJcIn0sXHJcblx0XHRcdFx0XHRcdFx0XHRcIua1t+a7qVwiLFwi5Lq65paHXCIsXCLlsbHmsLRcIixcIumDveW4glwiLFwi5Lya5Y+LXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuicnOaciFwiLFwi55Sf5pelXCIsXCLlkajlubTluoZcIlxyXG5cdFx0XHRcdFx0XHRcdF19Lz5cclxuXHJcblxyXG5cdFx0XHRcdFx0PGJyLz5cclxuXHJcblx0XHRcdFx0XHR7c2NoZWR1bGVyfVxyXG5cclxuXHRcdFx0XHRcdHtzZWFyY2hlcn1cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PEl0aW5lcmFyeSBqb3VybmV5PXtqb3VybmV5fSBtb2RlPVwicGxhY2VcIi8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXthY3Rpb25zfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0cmVtb3ZlKCl7XHJcblx0XHRKb3VybmV5REIucmVtb3ZlKHRoaXMuc3RhdGUuZW50aXR5KVxyXG5cdFx0dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKFwiL1wiKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHJcblx0c3RhdGljIENyZWF0b3I9Y2xhc3MgSm91cm5leUNyZWF0b3IgZXh0ZW5kcyBKb3VybmV5e1xyXG5cdFx0cmVuZGVyKCl7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJuYW1lXCIgaGludFRleHQ9XCLlkI3lrZdcIiBmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInN0YXJ0ZWRBdFwiIGhpbnRUZXh0PVwi5byA5aeL5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0gYXV0b09rPXt0cnVlfS8+XHJcblx0XHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwiZW5kZWRBdFwiIGhpbnRUZXh0PVwi57uT5p2f5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0gYXV0b09rPXt0cnVlfS8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcblx0ICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxyXG5cdFx0XHRcdFx0XHRcdHthY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2F2ZSgpLCBpY29uOkljb25TYXZlfVxyXG5cdFx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cclxuXHRcdHNhdmUoKXtcclxuXHRcdFx0Y29uc3Qge25hbWUsIHN0YXJ0ZWRBdCwgZW5kZWRBdH09dGhpcy5yZWZzXHJcblx0XHRcdEpvdXJuZXlEQi51cHNlcnQoe1xyXG5cdFx0XHRcdG5hbWU6bmFtZS5nZXRWYWx1ZSgpLFxyXG5cdFx0XHRcdHN0YXJ0ZWRBdDpzdGFydGVkQXQuZ2V0RGF0ZSgpLFxyXG5cdFx0XHRcdGVuZGVkQXQ6ZW5kZWRBdC5nZXREYXRlKClcclxuXHRcdFx0fSkudGhlbihqb3VybmV5PT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGpvdXJuZXkvJHtqb3VybmV5Ll9pZH1gKSlcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFRleHRTY2hlZHVsZXIgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0d2F5cG9pbnRzOiBudWxsLFxyXG5cdFx0bmVlZE1hcDpmYWxzZVxyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Sm91cm5leURCLmdldFdheXBvaW50cyh0aGlzLnByb3BzLmpvdXJuZXkpXHJcblx0XHRcdC50aGVuKHdheXBvaW50cz0+dGhpcy5zZXRTdGF0ZSh7d2F5cG9pbnRzfSkpXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtqb3VybmV5LCBvdGhlcnN9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHt3YXlwb2ludHMsIG5lZWRNYXB9PXRoaXMuc3RhdGVcclxuXHRcdGlmKHdheXBvaW50cyAmJiB3YXlwb2ludHMubGVuZ3RoKXtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgZmxvYXRpbmdMYWJlbEZpeGVkPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGpvdXJuZXkvJHtqb3VybmV5Ll9pZH0vaXRpbmVyYXJ5YCl9XHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PXtg5Y+R546wJHt3YXlwb2ludHMubGVuZ3RofeW8oOeFp+eJh+acieWcsOWdgOS/oeaBr++8jOeCueWHu+Wbvuagh+afpeeci+ivpue7huS/oeaBr2B9XHJcblx0XHRcdFx0XHRcdG11bHRpTGluZT17dHJ1ZX0gZnVsbFdpZHRoPXt0cnVlfSB7Li4ub3RoZXJzfS8+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7d2lkdGg6MjQsdmVydGljYWxBbGlnbjpcImJvdHRvbVwifX0+XHJcblx0XHRcdFx0XHRcdDxJY29uTWFwIGNvbG9yPVwibGlnaHRibHVlXCIgb25DbGljaz17ZT0+dGhpcy5zaG93TWFwKCl9Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PERpYWxvZyBvcGVuPXtuZWVkTWFwfVxyXG5cdFx0XHRcdFx0XHRvblJlcXVlc3RDbG9zZT17ZT0+dGhpcy5zZXRTdGF0ZSh7bmVlZE1hcDpmYWxzZX0pfT5cclxuXHRcdFx0XHRcdFx0PE1hcCBvblJlYWR5PXttYXA9PnRoaXMuc2hvd1dheXBvaW50cyhtYXApfSBzdHlsZT17e3dpZHRoOlwiMTAwJVwiLGhlaWdodDo1MDB9fS8+XHJcblx0XHRcdFx0XHQ8L0RpYWxvZz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGRXaXRoSWNvbiBpY29uPXs8SWNvblNjaGVkdWxlLz59IGZsb2F0aW5nTGFiZWxGaXhlZD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBqb3VybmV5LyR7am91cm5leS5faWR9L2l0aW5lcmFyeWApfVxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuW/q+mAn+iuoeWIkuS9oOeahOihjOeoi++8jOavlOWmgu+8muWMl+S6rCzkuIrmtbcsLi4uXCJcclxuXHRcdFx0XHRcdFx0bXVsdGlMaW5lPXt0cnVlfSBmdWxsV2lkdGg9e3RydWV9IHsuLi5vdGhlcnN9Lz5cclxuXHRcdFx0XHQ8L2Rpdj4pXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzaG93TWFwKCl7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtuZWVkTWFwOnRydWV9KVxyXG5cdH1cclxuXHJcblx0c2hvd1dheXBvaW50cyhtYXApe1xyXG5cdFx0Y29uc3Qge3dheXBvaW50c309dGhpcy5zdGF0ZVxyXG5cdFx0Y29uc3Qge01hcmtlcixQb2ludH09Qk1hcFxyXG5cdFx0bGV0IHBvaW50cz1bXVxyXG5cdFx0d2F5cG9pbnRzLmZvckVhY2god2F5cG9pbnQ9PntcclxuXHRcdFx0Y29uc3Qge2Nvb3JkaW5hdGVzOltsYXQsbG5nXX09d2F5cG9pbnQubG9jXHJcblx0XHRcdGxldCBtYXJrZXI9bmV3IE1hcmtlcihuZXcgUG9pbnQobGF0LGxuZyksIHtlbmFibGVEcmFnZ2luZzp0cnVlfSlcclxuXHRcdFx0bWFwLmFkZE92ZXJsYXkobWFya2VyKVxyXG5cdFx0XHRwb2ludHMucHVzaChtYXJrZXIuZ2V0UG9zaXRpb24oKSlcclxuXHRcdH0pXHJcblxyXG5cdFx0aWYocG9pbnRzLmxlbmd0aClcclxuXHRcdFx0bWFwLnNldFZpZXdwb3J0KHBvaW50cylcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuIl19