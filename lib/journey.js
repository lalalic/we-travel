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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb3VybmV5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFTzs7SUFDYzs7Ozs7Ozs7Ozs7Ozs7bU1BQ3BCLFFBQU0sRUFBQyxRQUFPLElBQVA7OztjQURhOzswQkFHWixLQUFJOzs7QUFDWCxlQUFVLE9BQVYsQ0FBa0IsRUFBQyxRQUFELEVBQWxCLEVBQXdCLGtCQUFRO0FBQy9CLFdBQU8sU0FBUCxLQUFxQixPQUFPLFNBQVAsR0FBaUIsSUFBSSxJQUFKLENBQVMsT0FBTyxTQUFQLENBQTFCLENBQXJCLENBRCtCO0FBRS9CLFdBQU8sT0FBUCxLQUFtQixPQUFPLE9BQVAsR0FBZSxJQUFJLElBQUosQ0FBUyxPQUFPLE9BQVAsQ0FBeEIsQ0FBbkIsQ0FGK0I7O0FBSS9CLFdBQUssUUFBTCxDQUFjLEVBQUMsY0FBRCxFQUFkLEVBSitCO0lBQVIsQ0FBeEIsQ0FEVzs7OztzQ0FTVTtBQUNyQixRQUFLLE9BQUwsQ0FBYSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEdBQWxCLENBQWIsQ0FEcUI7Ozs7NENBSU8sV0FBVTtBQUNoQyxPQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsR0FBbEIsSUFBdUIsVUFBVSxNQUFWLENBQWlCLEdBQWpCLEVBQ3RCLEtBQUssT0FBTCxDQUFhLFVBQVUsTUFBVixDQUFpQixHQUFqQixDQUFiLENBREo7Ozs7MkJBSUM7OztPQUNPLFVBQVMsS0FBSyxLQUFMLENBQWhCLE9BREE7OztBQUdQLE9BQUcsQ0FBQyxPQUFELEVBQ0YsT0FBUSw4QkFBQyxPQUFELE9BQVIsQ0FERDs7T0FHTyxZQUFvQixRQUFwQixVQU5BO09BTVcsVUFBUyxRQUFULFFBTlg7O0FBT1AsT0FBSSxrQkFBSjtPQUFlLGlCQUFmLENBUE87QUFRUCxPQUFJLFVBQVEsQ0FDWCxNQURXLEVBRVYsRUFBQyxRQUFPLFNBQVA7QUFDQSxXQUFNLElBQU47QUFDQSxjQUFVO1lBQUcsT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixjQUFvQyxZQUFVLEtBQVYsU0FBbUIsUUFBUSxHQUFSLEVBQWMsRUFBQyxnQkFBRCxFQUFyRTtLQUFIO0FBQ1YsOEJBSEQsRUFGVSxFQU1WLEVBQUMsUUFBTyxTQUFQO0FBQ0EsV0FBTSxJQUFOO0FBQ0EsY0FBVTtZQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsU0FBekIsRUFBbUMsRUFBQyxnQkFBRCxFQUFuQztLQUFIO0FBQ1YsOEJBSEQsRUFOVSxDQUFSLENBUkc7QUFtQlAsV0FBTyxZQUFVLFFBQVYsQ0FBbUIsT0FBbkIsQ0FBUDtBQUNBLFNBQUssUUFBTDs7QUFFQSxXQUZBO0FBREEsU0FJSyxVQUFMLENBSkE7QUFLQSxTQUFLLFFBQUwsQ0FMQTtBQU1BLFNBQUssV0FBTCxDQU5BO0FBT0EsU0FBSyxNQUFMLENBUEE7QUFRQTtBQUNDLGlCQUFXLDhCQUFDLGFBQUQsSUFBZSxLQUFJLFdBQUosRUFBZ0IsU0FBUyxPQUFULEVBQS9CLENBQVgsQ0FERDtBQUVDLGdCQUFVLDJEQUFRLFVBQVMsbUJBQVQsRUFBNkIsV0FBVyxJQUFYLEVBQXJDLENBQVYsQ0FGRDtBQUdDLGFBQVEsTUFBUixDQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUI7QUFDbEIsY0FBTyxRQUFQO0FBQ0MsYUFBTSxJQUFOO0FBQ0EsZ0JBQVM7Y0FBRyxPQUFLLE1BQUw7T0FBSDtBQUNULDRCQUppQjtNQUFuQixFQUhEO0FBUkEsSUFuQk87O0FBc0NQLFVBQ0M7OztJQUNDOztPQUFLLE9BQU8sRUFBQyxTQUFRLENBQVIsRUFBUixFQUFMO0tBQ0MsdURBQVcsS0FBSSxNQUFKLEVBQVcsVUFBUyxJQUFULEVBQWMsV0FBVyxJQUFYLEVBQWlCLGNBQWMsUUFBUSxJQUFSLEVBQW5FLENBREQ7S0FHQyx3REFBWSxLQUFJLFdBQUosRUFBZ0IsVUFBUyxNQUFULEVBQWdCLFFBQVEsSUFBUixFQUFjLGFBQWEsUUFBUSxTQUFSLEVBQXZFLENBSEQ7S0FLQyx3REFBWSxLQUFJLFNBQUosRUFBYyxVQUFTLE1BQVQsRUFBZ0IsUUFBUSxJQUFSLEVBQWMsYUFBYSxRQUFRLE9BQVIsRUFBckUsQ0FMRDtLQU9DLHlDQVBEO0tBUUM7QUFDQyxhQUFNLE1BQU47QUFDQSxnQkFBVSxLQUFWO0FBQ0EsYUFBTyxDQUNMLElBREssRUFDQSxJQURBLEVBQ0ssS0FETCxFQUVMLElBRkssRUFFQSxJQUZBLEVBRUssSUFGTCxFQUVVLElBRlYsRUFHTCxJQUhLLEVBR0EsSUFIQSxFQUdLLElBSEwsRUFJTCxFQUFDLE9BQU0sSUFBTixFQUFXLE1BQUssUUFBTCxFQUpQLEVBS0wsSUFMSyxFQUtBLElBTEEsRUFLSyxJQUxMLEVBS1UsSUFMVixFQUtlLElBTGYsRUFNTCxJQU5LLEVBTUEsSUFOQSxFQU1LLEtBTkwsQ0FBUCxFQUhELENBUkQ7S0FxQkMseUNBckJEO0tBdUJFLFNBdkJGO0tBeUJFLFFBekJGO0tBREQ7SUE2QkMsMENBQUksVUFBSixJQUFlLFdBQVUsU0FBVjtBQUNDLFlBQU8sT0FBUCxFQURoQixDQTdCRDtJQURELENBdENPOzs7OzJCQTBFQTtBQUNQLGVBQVUsTUFBVixDQUFpQixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWpCLENBRE87QUFFUCxRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLE9BQXBCLENBQTRCLEdBQTVCLEVBRk87Ozs7UUEvRlk7OztRQW9HYixlQUFhO0FBQ25CLFNBQU8sZ0JBQU0sU0FBTixDQUFnQixNQUFoQjs7O0FBckdZLFFBd0diO1dBQWM7Ozs7Ozs7Ozs7MkJBQ1o7OztBQUNQLFVBQ0M7OztJQUNDOztPQUFLLE9BQU8sRUFBQyxTQUFRLENBQVIsRUFBUixFQUFMO0tBQ0MsdURBQVcsS0FBSSxNQUFKLEVBQVcsVUFBUyxJQUFULEVBQWMsV0FBVyxJQUFYLEVBQXBDLENBREQ7S0FHQyx3REFBWSxLQUFJLFdBQUosRUFBZ0IsVUFBUyxNQUFULEVBQWdCLFFBQVEsSUFBUixFQUE1QyxDQUhEO0tBS0Msd0RBQVksS0FBSSxTQUFKLEVBQWMsVUFBUyxNQUFULEVBQWdCLFFBQVEsSUFBUixFQUExQyxDQUxEO0tBREQ7SUFTQywwQ0FBSSxVQUFKLElBQWUsV0FBVSxTQUFWO0FBQ0MsWUFBTyxDQUFDLE1BQUQsRUFDckIsRUFBQyxRQUFPLE1BQVAsRUFBZSxPQUFNLElBQU4sRUFBWSxVQUFTO2NBQUcsT0FBSyxJQUFMO09BQUgsRUFBZ0IseUJBQXJELEVBRHFCLENBQVAsRUFEaEIsQ0FURDtJQURELENBRE87Ozs7eUJBbUJGOzs7ZUFDNEIsS0FBSyxJQUFMLENBRDVCO09BQ0Usa0JBREY7T0FDUSw0QkFEUjtPQUNtQix3QkFEbkI7O0FBRUwsZUFBVSxNQUFWLENBQWlCO0FBQ2hCLFVBQUssS0FBSyxRQUFMLEVBQUw7QUFDQSxlQUFVLFVBQVUsT0FBVixFQUFWO0FBQ0EsYUFBUSxRQUFRLE9BQVIsRUFBUjtJQUhELEVBSUcsSUFKSCxDQUlRO1dBQVMsT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixPQUFwQixjQUF1QyxRQUFRLEdBQVI7SUFBaEQsQ0FKUixDQUZLOzs7O1FBcEJjO0VBQXVCOztrQkF4R3hCOztJQXVJZjs7Ozs7Ozs7Ozs7Ozs7Z05BQ0wsUUFBTTtBQUNMLGNBQVcsSUFBWDtBQUNBLFlBQVEsS0FBUjs7OztjQUhJOztzQ0FLYzs7O0FBQ2xCLGVBQVUsWUFBVixDQUF1QixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQXZCLENBQ0UsSUFERixDQUNPO1dBQVcsT0FBSyxRQUFMLENBQWMsRUFBQyxvQkFBRCxFQUFkO0lBQVgsQ0FEUCxDQURrQjs7OzsyQkFLWDs7O2dCQUNpQixLQUFLLEtBQUwsQ0FEakI7T0FDQSx5QkFEQTtPQUNTLHVCQURUO2dCQUVvQixLQUFLLEtBQUwsQ0FGcEI7T0FFQSw2QkFGQTtPQUVXLHlCQUZYOztBQUdQLE9BQUcsYUFBYSxVQUFVLE1BQVYsRUFBaUI7QUFDaEMsV0FDQzs7T0FBSyxXQUFVLE1BQVYsRUFBTDtLQUNDLGdFQUFXLG9CQUFvQixJQUFwQjtBQUNWLGdDQUF3QixVQUFVLE1BQVYsd0JBQXhCO0FBQ0EsaUJBQVcsSUFBWCxFQUFpQixXQUFXLElBQVgsSUFBcUIsT0FGdkMsQ0FERDtLQUlDOztRQUFLLE9BQU8sRUFBQyxPQUFNLEVBQU4sRUFBUyxlQUFjLFFBQWQsRUFBakIsRUFBTDtNQUNDLCtDQUFTLE9BQU0sV0FBTixFQUFrQixTQUFTO2VBQUcsT0FBSyxPQUFMO1FBQUgsRUFBcEMsQ0FERDtNQUpEO0tBT0M7O1FBQVEsTUFBTSxPQUFOO0FBQ1AsdUJBQWdCO2VBQUcsT0FBSyxRQUFMLENBQWMsRUFBQyxTQUFRLEtBQVIsRUFBZjtRQUFILEVBRGpCO01BRUMsK0NBQUssU0FBUztlQUFLLE9BQUssYUFBTCxDQUFtQixHQUFuQjtRQUFMLEVBQThCLE9BQU8sRUFBQyxPQUFNLE1BQU4sRUFBYSxRQUFPLEdBQVAsRUFBckIsRUFBNUMsQ0FGRDtNQVBEO0tBREQsQ0FEZ0M7SUFBakMsTUFlSztBQUNKLFdBQ0M7OztLQUNDLHNFQUFtQixNQUFNLDJEQUFOLEVBQXVCLG9CQUFvQixJQUFwQjtBQUN6Qyx5QkFBa0IsdUJBQWxCO0FBQ0EsaUJBQVcsSUFBWCxFQUFpQixXQUFXLElBQVgsSUFBcUIsT0FGdkMsQ0FERDtLQURELENBREk7SUFmTDs7Ozs0QkF5QlE7QUFDUixRQUFLLFFBQUwsQ0FBYyxFQUFDLFNBQVEsSUFBUixFQUFmLEVBRFE7Ozs7Z0NBSUssS0FBSTtPQUNWLFlBQVcsS0FBSyxLQUFMLENBQVgsVUFEVTtlQUVJLEtBRko7T0FFVixzQkFGVTtPQUVILG9CQUZHOztBQUdqQixPQUFJLFNBQU8sRUFBUCxDQUhhO0FBSWpCLGFBQVUsT0FBVixDQUFrQixvQkFBVTsrQ0FDRyxTQUFTLEdBQVQsQ0FBdkIsZ0JBRG9COztRQUNQLCtCQURPO1FBQ0gsK0JBREc7O0FBRTNCLFFBQUksU0FBTyxJQUFJLE1BQUosQ0FBVyxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWMsR0FBZCxDQUFYLEVBQStCLEVBQUMsZ0JBQWUsSUFBZixFQUFoQyxDQUFQLENBRnVCO0FBRzNCLFFBQUksVUFBSixDQUFlLE1BQWYsRUFIMkI7QUFJM0IsV0FBTyxJQUFQLENBQVksT0FBTyxXQUFQLEVBQVosRUFKMkI7SUFBVixDQUFsQixDQUppQjs7QUFXakIsT0FBRyxPQUFPLE1BQVAsRUFDRixJQUFJLFdBQUosQ0FBZ0IsTUFBaEIsRUFERDs7OztRQXJESSIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge1RleHRGaWVsZCwgRGF0ZVBpY2tlciwgQXZhdGFyLCBEaXZpZGVyLCBEaWFsb2d9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgSWNvblNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxyXG5pbXBvcnQgSWNvbk1hcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvbWFwXCJcclxuaW1wb3J0IEljb25TY2hlZHVsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZWRpdC1sb2NhdGlvblwiXHJcbmltcG9ydCBJY29uUHVibGlzaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuaW1wb3J0IEljb25SZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGVsZXRlXCJcclxuXHJcbmltcG9ydCBDaGlwcGVyIGZyb20gXCIuL2NvbXBvbmVudHMvY2hpcHBlclwiXHJcbmltcG9ydCBUZXh0RmllbGRXaXRoSWNvbiBmcm9tIFwiLi9jb21wb25lbnRzL3RleHRGaWVsZFdpdGhJY29uXCJcclxuaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9jb21wb25lbnRzL3NlYXJjaFRleHRGaWVsZFwiXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vY29tcG9uZW50cy9tYXBcIlxyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQn0gZnJvbSBcIi4vZGJcIlxyXG5cclxuY29uc3Qge0xvYWRpbmd9PVVJXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvdXJuZXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e2VudGl0eTpudWxsfVxyXG5cclxuXHRnZXREYXRhKF9pZCl7XHJcblx0XHRKb3VybmV5REIuZmluZE9uZSh7X2lkfSxlbnRpdHk9PntcclxuXHRcdFx0ZW50aXR5LnN0YXJ0ZWRBdCAmJiAoZW50aXR5LnN0YXJ0ZWRBdD1uZXcgRGF0ZShlbnRpdHkuc3RhcnRlZEF0KSk7XHJcblx0XHRcdGVudGl0eS5lbmRlZEF0ICYmIChlbnRpdHkuZW5kZWRBdD1uZXcgRGF0ZShlbnRpdHkuZW5kZWRBdCkpO1xyXG5cdFx0XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2VudGl0eX0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0dGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLl9pZClcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wYXJhbXMuX2lkIT1uZXh0UHJvcHMucGFyYW1zLl9pZClcclxuICAgICAgICAgICAgdGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxyXG4gICAgfVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtlbnRpdHk6am91cm5leX09dGhpcy5zdGF0ZVxyXG5cclxuXHRcdGlmKCFqb3VybmV5KVxyXG5cdFx0XHRyZXR1cm4gKDxMb2FkaW5nLz4pXHJcblx0XHRcclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsIGVuZGVkQXR9PWpvdXJuZXlcclxuXHRcdGxldCBzY2hlZHVsZXIsIHNlYXJjaGVyXHJcblx0XHRsZXQgYWN0aW9ucz1bXHJcblx0XHRcdFwiQmFja1wiXHJcblx0XHRcdCx7YWN0aW9uOlwiQ29tbWVudFwiXHJcblx0XHRcdFx0LGxhYmVsOlwi6K+E6K66XCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6IGU9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgY29tbWVudC8ke0pvdXJuZXlEQi5fbmFtZX0vJHtqb3VybmV5Ll9pZH1gLHtqb3VybmV5fSkgXHJcblx0XHRcdFx0LGljb246SWNvblB1Ymxpc2h9XHJcblx0XHRcdCx7YWN0aW9uOlwiUHVibGlzaFwiXHJcblx0XHRcdFx0LGxhYmVsOlwi5Ye654mIXCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6IGU9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcInB1Ymxpc2hcIix7am91cm5leX0pIFxyXG5cdFx0XHRcdCxpY29uOkljb25QdWJsaXNofVxyXG5cdFx0XVxyXG5cdFx0c3dpdGNoKEpvdXJuZXlEQi5nZXRTdGF0ZShqb3VybmV5KSl7XHJcblx0XHRjYXNlIFwiTWVtb3J5XCI6XHJcblx0XHRcdFxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJTdGFydGluZ1wiOlxyXG5cdFx0Y2FzZSBcIkVuZGluZ1wiOlxyXG5cdFx0Y2FzZSBcIlRyYXZlbGluZ1wiOlxyXG5cdFx0Y2FzZSBcIlBsYW5cIjpcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHNjaGVkdWxlcj0oPFRleHRTY2hlZHVsZXIgcmVmPVwic2NoZWR1bGVyXCIgam91cm5leT17am91cm5leX0vPilcclxuXHRcdFx0c2VhcmNoZXI9KDxTZWFyY2ggaGludFRleHQ9XCLmn6Xmib4655yL55yL5aSn5L6g5Lus55qE6Laz6L+55aW95aW96KeE5YiS5LiA5LiLXCIgZnVsbFdpZHRoPXt0cnVlfS8+KVxyXG5cdFx0XHRhY3Rpb25zLnNwbGljZSgxLDAse1xyXG5cdFx0XHRcdGFjdGlvbjpcIlJlbW92ZVwiXHJcblx0XHRcdFx0LGxhYmVsOlwi5Yig6ZmkXCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6ZT0+dGhpcy5yZW1vdmUoKVxyXG5cdFx0XHRcdCxpY29uOiBJY29uUmVtb3ZlXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJuYW1lXCIgaGludFRleHQ9XCLlkI3lrZdcIiBmdWxsV2lkdGg9e3RydWV9IGRlZmF1bHRWYWx1ZT17am91cm5leS5uYW1lfS8+XHJcblxyXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwic3RhcnRlZEF0XCIgaGludFRleHQ9XCLlvIDlp4vml6XmnJ9cIiBhdXRvT2s9e3RydWV9IGRlZmF1bHREYXRlPXtqb3VybmV5LnN0YXJ0ZWRBdH0vPlxyXG5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImVuZGVkQXRcIiBoaW50VGV4dD1cIue7k+adn+aXpeacn1wiIGF1dG9Paz17dHJ1ZX0gZGVmYXVsdERhdGU9e2pvdXJuZXkuZW5kZWRBdH0vPlxyXG5cclxuXHRcdFx0XHRcdDxici8+XHJcblx0XHRcdFx0XHQ8Q2hpcHBlclxyXG5cdFx0XHRcdFx0XHR0aXRsZT1cIuabtOWkmuS/oeaBr1wiXHJcblx0XHRcdFx0XHRcdGF1dG9PcGVuPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0Y2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XHRcdFwi5b6S5q2lXCIsXCLoh6rpqb5cIixcIuiHquihjOi9plwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmjJHmiJhcIixcIuaUvuadvlwiLFwi5a625bqtXCIsXCLllYbliqFcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6ICB5Lq6XCIsXCLlsI/lralcIixcIuaDheS+o1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0e2xhYmVsOlwi6aKE566XXCIsdHlwZTpcIm51bWJlclwifSxcclxuXHRcdFx0XHRcdFx0XHRcdFwi5rW35rupXCIsXCLkurrmlodcIixcIuWxseawtFwiLFwi6YO95biCXCIsXCLkvJrlj4tcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6Jyc5pyIXCIsXCLnlJ/ml6VcIixcIuWRqOW5tOW6hlwiXHJcblx0XHRcdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8YnIvPlxyXG5cclxuXHRcdFx0XHRcdHtzY2hlZHVsZXJ9XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHtzZWFyY2hlcn1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2FjdGlvbnN9Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0Sm91cm5leURCLnJlbW92ZSh0aGlzLnN0YXRlLmVudGl0eSlcclxuXHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShcIi9cIilcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHJcblx0c3RhdGljIENyZWF0b3I9Y2xhc3MgSm91cm5leUNyZWF0b3IgZXh0ZW5kcyBKb3VybmV5e1xyXG5cdFx0cmVuZGVyKCl7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJuYW1lXCIgaGludFRleHQ9XCLlkI3lrZdcIiBmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInN0YXJ0ZWRBdFwiIGhpbnRUZXh0PVwi5byA5aeL5pel5pyfXCIgYXV0b09rPXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJlbmRlZEF0XCIgaGludFRleHQ9XCLnu5PmnZ/ml6XmnJ9cIiBhdXRvT2s9e3RydWV9Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG5cdCAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcclxuXHRcdFx0XHRcdFx0XHR7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBvblNlbGVjdDplPT50aGlzLnNhdmUoKSwgaWNvbjpJY29uU2F2ZX1cclxuXHRcdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHJcblx0XHRzYXZlKCl7XHJcblx0XHRcdGNvbnN0IHtuYW1lLCBzdGFydGVkQXQsIGVuZGVkQXR9PXRoaXMucmVmc1xyXG5cdFx0XHRKb3VybmV5REIudXBzZXJ0KHtcclxuXHRcdFx0XHRuYW1lOm5hbWUuZ2V0VmFsdWUoKSxcclxuXHRcdFx0XHRzdGFydGVkQXQ6c3RhcnRlZEF0LmdldERhdGUoKSxcclxuXHRcdFx0XHRlbmRlZEF0OmVuZGVkQXQuZ2V0RGF0ZSgpXHJcblx0XHRcdH0pLnRoZW4oam91cm5leT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBqb3VybmV5LyR7am91cm5leS5faWR9YCkpXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBUZXh0U2NoZWR1bGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtcclxuXHRcdHdheXBvaW50czogbnVsbCxcclxuXHRcdG5lZWRNYXA6ZmFsc2VcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdEpvdXJuZXlEQi5nZXRXYXlwb2ludHModGhpcy5wcm9wcy5qb3VybmV5KVxyXG5cdFx0XHQudGhlbih3YXlwb2ludHM9PnRoaXMuc2V0U3RhdGUoe3dheXBvaW50c30pKVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7am91cm5leSwgb3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7d2F5cG9pbnRzLCBuZWVkTWFwfT10aGlzLnN0YXRlXHJcblx0XHRpZih3YXlwb2ludHMgJiYgd2F5cG9pbnRzLmxlbmd0aCl7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIGZsb2F0aW5nTGFiZWxGaXhlZD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9e2Dlj5HnjrAke3dheXBvaW50cy5sZW5ndGh95byg54Wn54mH5pyJ5Zyw5Z2A5L+h5oGv77yM54K55Ye75Zu+5qCH5p+l55yL6K+m57uG5L+h5oGvYH1cclxuXHRcdFx0XHRcdFx0bXVsdGlMaW5lPXt0cnVlfSBmdWxsV2lkdGg9e3RydWV9IHsuLi5vdGhlcnN9Lz5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3t3aWR0aDoyNCx2ZXJ0aWNhbEFsaWduOlwiYm90dG9tXCJ9fT5cclxuXHRcdFx0XHRcdFx0PEljb25NYXAgY29sb3I9XCJsaWdodGJsdWVcIiBvbkNsaWNrPXtlPT50aGlzLnNob3dNYXAoKX0vPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8RGlhbG9nIG9wZW49e25lZWRNYXB9IFxyXG5cdFx0XHRcdFx0XHRvblJlcXVlc3RDbG9zZT17ZT0+dGhpcy5zZXRTdGF0ZSh7bmVlZE1hcDpmYWxzZX0pfT5cclxuXHRcdFx0XHRcdFx0PE1hcCBvblJlYWR5PXttYXA9PnRoaXMuc2hvd1dheXBvaW50cyhtYXApfSBzdHlsZT17e3dpZHRoOlwiMTAwJVwiLGhlaWdodDo1MDB9fS8+XHJcblx0XHRcdFx0XHQ8L0RpYWxvZz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGRXaXRoSWNvbiBpY29uPXs8SWNvblNjaGVkdWxlLz59IGZsb2F0aW5nTGFiZWxGaXhlZD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLlv6vpgJ/orqHliJLkvaDnmoTooYznqIvvvIzmr5TlpoLvvJrljJfkuqws5LiK5rW3LC4uLlwiXHJcblx0XHRcdFx0XHRcdG11bHRpTGluZT17dHJ1ZX0gZnVsbFdpZHRoPXt0cnVlfSB7Li4ub3RoZXJzfS8+XHJcblx0XHRcdFx0PC9kaXY+KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2hvd01hcCgpe1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7bmVlZE1hcDp0cnVlfSlcclxuXHR9XHJcblx0XHJcblx0c2hvd1dheXBvaW50cyhtYXApe1xyXG5cdFx0Y29uc3Qge3dheXBvaW50c309dGhpcy5zdGF0ZVxyXG5cdFx0Y29uc3Qge01hcmtlcixQb2ludH09Qk1hcFxyXG5cdFx0bGV0IHBvaW50cz1bXVxyXG5cdFx0d2F5cG9pbnRzLmZvckVhY2god2F5cG9pbnQ9PntcclxuXHRcdFx0Y29uc3Qge2Nvb3JkaW5hdGVzOltsYXQsbG5nXX09d2F5cG9pbnQubG9jXHJcblx0XHRcdGxldCBtYXJrZXI9bmV3IE1hcmtlcihuZXcgUG9pbnQobGF0LGxuZyksIHtlbmFibGVEcmFnZ2luZzp0cnVlfSlcclxuXHRcdFx0bWFwLmFkZE92ZXJsYXkobWFya2VyKVxyXG5cdFx0XHRwb2ludHMucHVzaChtYXJrZXIuZ2V0UG9zaXRpb24oKSlcclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdGlmKHBvaW50cy5sZW5ndGgpXHJcblx0XHRcdG1hcC5zZXRWaWV3cG9ydChwb2ludHMpXHJcblx0fVxyXG59XHJcbiJdfQ==