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
//# sourceMappingURL=data:application/json;base64,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QUFWLENBQWtCLG9CQUFVOytDQUNHLFNBQVMsR0FBVCxDQUF2QixnQkFEb0I7O1FBQ1AsK0JBRE87UUFDSCwrQkFERzs7QUFFM0IsUUFBSSxTQUFPLElBQUksTUFBSixDQUFXLElBQUksS0FBSixDQUFVLEdBQVYsRUFBYyxHQUFkLENBQVgsRUFBK0IsRUFBQyxnQkFBZSxJQUFmLEVBQWhDLENBQVAsQ0FGdUI7QUFHM0IsUUFBSSxVQUFKLENBQWUsTUFBZixFQUgyQjtBQUkzQixXQUFPLElBQVAsQ0FBWSxPQUFPLFdBQVAsRUFBWixFQUoyQjtJQUFWLENBQWxCLENBSmlCOztBQVdqQixPQUFHLE9BQU8sTUFBUCxFQUNGLElBQUksV0FBSixDQUFnQixNQUFoQixFQUREOzs7O1FBckRJIiwiZmlsZSI6ImpvdXJuZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuXHJcbmltcG9ydCB7VGV4dEZpZWxkLCBEYXRlUGlja2VyLCBBdmF0YXIsIERpdmlkZXIsIERpYWxvZ30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5pbXBvcnQgSWNvblNjaGVkdWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9lZGl0LWxvY2F0aW9uXCJcclxuaW1wb3J0IEljb25QdWJsaXNoIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIlxyXG5pbXBvcnQgSWNvblJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kZWxldGVcIlxyXG5cclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jaGlwcGVyXCJcclxuaW1wb3J0IFRleHRGaWVsZFdpdGhJY29uIGZyb20gXCIuL2NvbXBvbmVudHMvdGV4dEZpZWxkV2l0aEljb25cIlxyXG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoVGV4dEZpZWxkXCJcclxuaW1wb3J0IE1hcCBmcm9tIFwiLi9jb21wb25lbnRzL21hcFwiXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCfSBmcm9tIFwiLi9kYlwiXHJcblxyXG5jb25zdCB7TG9hZGluZ309VUlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm91cm5leSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17ZW50aXR5Om51bGx9XHJcblxyXG5cdGdldERhdGEoX2lkKXtcclxuXHRcdEpvdXJuZXlEQi5maW5kT25lKHtfaWR9LGVudGl0eT0+e1xyXG5cdFx0XHRlbnRpdHkuc3RhcnRlZEF0ICYmIChlbnRpdHkuc3RhcnRlZEF0PW5ldyBEYXRlKGVudGl0eS5zdGFydGVkQXQpKTtcclxuXHRcdFx0ZW50aXR5LmVuZGVkQXQgJiYgKGVudGl0eS5lbmRlZEF0PW5ldyBEYXRlKGVudGl0eS5lbmRlZEF0KSk7XHJcblxyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHl9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMucGFyYW1zLl9pZCE9bmV4dFByb3BzLnBhcmFtcy5faWQpXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YShuZXh0UHJvcHMucGFyYW1zLl9pZClcclxuICAgIH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZW50aXR5OmpvdXJuZXl9PXRoaXMuc3RhdGVcclxuXHJcblx0XHRpZigham91cm5leSlcclxuXHRcdFx0cmV0dXJuICg8TG9hZGluZy8+KVxyXG5cclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsIGVuZGVkQXR9PWpvdXJuZXlcclxuXHRcdGxldCBzY2hlZHVsZXIsIHNlYXJjaGVyXHJcblx0XHRsZXQgYWN0aW9ucz1bXHJcblx0XHRcdFwiQmFja1wiXHJcblx0XHRcdCx7YWN0aW9uOlwiQ29tbWVudFwiXHJcblx0XHRcdFx0LGxhYmVsOlwi6K+E6K66XCJcclxuXHRcdFx0XHQsb25TZWxlY3Q6IGU9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgY29tbWVudC8ke0pvdXJuZXlEQi5fbmFtZX0vJHtqb3VybmV5Ll9pZH1gLHtqb3VybmV5fSlcclxuXHRcdFx0XHQsaWNvbjpJY29uUHVibGlzaH1cclxuXHRcdFx0LHthY3Rpb246XCJQdWJsaXNoXCJcclxuXHRcdFx0XHQsbGFiZWw6XCLlh7rniYhcIlxyXG5cdFx0XHRcdCxvblNlbGVjdDogZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwicHVibGlzaFwiLHtqb3VybmV5fSlcclxuXHRcdFx0XHQsaWNvbjpJY29uUHVibGlzaH1cclxuXHRcdF1cclxuXHRcdHN3aXRjaChKb3VybmV5REIuZ2V0U3RhdGUoam91cm5leSkpe1xyXG5cdFx0Y2FzZSBcIk1lbW9yeVwiOlxyXG5cclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwiU3RhcnRpbmdcIjpcclxuXHRcdGNhc2UgXCJFbmRpbmdcIjpcclxuXHRcdGNhc2UgXCJUcmF2ZWxpbmdcIjpcclxuXHRcdGNhc2UgXCJQbGFuXCI6XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRzY2hlZHVsZXI9KDxUZXh0U2NoZWR1bGVyIHJlZj1cInNjaGVkdWxlclwiIGpvdXJuZXk9e2pvdXJuZXl9Lz4pXHJcblx0XHRcdHNlYXJjaGVyPSg8U2VhcmNoIGhpbnRUZXh0PVwi5p+l5om+Oueci+eci+Wkp+S+oOS7rOeahOi2s+i/ueWlveWlveinhOWIkuS4gOS4i1wiIGZ1bGxXaWR0aD17dHJ1ZX0vPilcclxuXHRcdFx0YWN0aW9ucy5zcGxpY2UoMSwwLHtcclxuXHRcdFx0XHRhY3Rpb246XCJSZW1vdmVcIlxyXG5cdFx0XHRcdCxsYWJlbDpcIuWIoOmZpFwiXHJcblx0XHRcdFx0LG9uU2VsZWN0OmU9PnRoaXMucmVtb3ZlKClcclxuXHRcdFx0XHQsaWNvbjogSWNvblJlbW92ZVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJuYW1lXCIgaGludFRleHQ9XCLlkI3lrZdcIiBmdWxsV2lkdGg9e3RydWV9IGRlZmF1bHRWYWx1ZT17am91cm5leS5uYW1lfS8+XHJcblxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XHJcblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInN0YXJ0ZWRBdFwiIGhpbnRUZXh0PVwi5byA5aeL5pel5pyfXCIgZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX0gZGVmYXVsdERhdGU9e2pvdXJuZXkuc3RhcnRlZEF0fS8+XHJcblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImVuZGVkQXRcIiBoaW50VGV4dD1cIue7k+adn+aXpeacn1wiIGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9IGRlZmF1bHREYXRlPXtqb3VybmV5LmVuZGVkQXR9Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxici8+XHJcblx0XHRcdFx0XHQ8Q2hpcHBlclxyXG5cdFx0XHRcdFx0XHR0aXRsZT1cIuabtOWkmuS/oeaBr1wiXHJcblx0XHRcdFx0XHRcdGF1dG9PcGVuPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0Y2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XHRcdFwi5b6S5q2lXCIsXCLoh6rpqb5cIixcIuiHquihjOi9plwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmjJHmiJhcIixcIuaUvuadvlwiLFwi5a625bqtXCIsXCLllYbliqFcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6ICB5Lq6XCIsXCLlsI/lralcIixcIuaDheS+o1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0e2xhYmVsOlwi6aKE566XXCIsdHlwZTpcIm51bWJlclwifSxcclxuXHRcdFx0XHRcdFx0XHRcdFwi5rW35rupXCIsXCLkurrmlodcIixcIuWxseawtFwiLFwi6YO95biCXCIsXCLkvJrlj4tcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6Jyc5pyIXCIsXCLnlJ/ml6VcIixcIuWRqOW5tOW6hlwiXHJcblx0XHRcdFx0XHRcdFx0XX0vPlxyXG5cclxuXHJcblx0XHRcdFx0XHQ8YnIvPlxyXG5cclxuXHRcdFx0XHRcdHtzY2hlZHVsZXJ9XHJcblxyXG5cdFx0XHRcdFx0e3NlYXJjaGVyfVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17YWN0aW9uc30vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0Sm91cm5leURCLnJlbW92ZSh0aGlzLnN0YXRlLmVudGl0eSlcclxuXHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShcIi9cIilcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIEpvdXJuZXlDcmVhdG9yIGV4dGVuZHMgSm91cm5leXtcclxuXHRcdHJlbmRlcigpe1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwibmFtZVwiIGhpbnRUZXh0PVwi5ZCN5a2XXCIgZnVsbFdpZHRoPXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJzdGFydGVkQXRcIiBoaW50VGV4dD1cIuW8gOWni+aXpeacn1wiXHJcblx0XHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGF1dG9Paz17dHJ1ZX0vPlxyXG5cdFx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImVuZGVkQXRcIiBoaW50VGV4dD1cIue7k+adn+aXpeacn1wiXHJcblx0XHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGF1dG9Paz17dHJ1ZX0vPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG5cdCAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcclxuXHRcdFx0XHRcdFx0XHR7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBvblNlbGVjdDplPT50aGlzLnNhdmUoKSwgaWNvbjpJY29uU2F2ZX1cclxuXHRcdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHJcblx0XHRzYXZlKCl7XHJcblx0XHRcdGNvbnN0IHtuYW1lLCBzdGFydGVkQXQsIGVuZGVkQXR9PXRoaXMucmVmc1xyXG5cdFx0XHRKb3VybmV5REIudXBzZXJ0KHtcclxuXHRcdFx0XHRuYW1lOm5hbWUuZ2V0VmFsdWUoKSxcclxuXHRcdFx0XHRzdGFydGVkQXQ6c3RhcnRlZEF0LmdldERhdGUoKSxcclxuXHRcdFx0XHRlbmRlZEF0OmVuZGVkQXQuZ2V0RGF0ZSgpXHJcblx0XHRcdH0pLnRoZW4oam91cm5leT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBqb3VybmV5LyR7am91cm5leS5faWR9YCkpXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBUZXh0U2NoZWR1bGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtcclxuXHRcdHdheXBvaW50czogbnVsbCxcclxuXHRcdG5lZWRNYXA6ZmFsc2VcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdEpvdXJuZXlEQi5nZXRXYXlwb2ludHModGhpcy5wcm9wcy5qb3VybmV5KVxyXG5cdFx0XHQudGhlbih3YXlwb2ludHM9PnRoaXMuc2V0U3RhdGUoe3dheXBvaW50c30pKVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7am91cm5leSwgb3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7d2F5cG9pbnRzLCBuZWVkTWFwfT10aGlzLnN0YXRlXHJcblx0XHRpZih3YXlwb2ludHMgJiYgd2F5cG9pbnRzLmxlbmd0aCl7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIGZsb2F0aW5nTGFiZWxGaXhlZD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9e2Dlj5HnjrAke3dheXBvaW50cy5sZW5ndGh95byg54Wn54mH5pyJ5Zyw5Z2A5L+h5oGv77yM54K55Ye75Zu+5qCH5p+l55yL6K+m57uG5L+h5oGvYH1cclxuXHRcdFx0XHRcdFx0bXVsdGlMaW5lPXt0cnVlfSBmdWxsV2lkdGg9e3RydWV9IHsuLi5vdGhlcnN9Lz5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3t3aWR0aDoyNCx2ZXJ0aWNhbEFsaWduOlwiYm90dG9tXCJ9fT5cclxuXHRcdFx0XHRcdFx0PEljb25NYXAgY29sb3I9XCJsaWdodGJsdWVcIiBvbkNsaWNrPXtlPT50aGlzLnNob3dNYXAoKX0vPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8RGlhbG9nIG9wZW49e25lZWRNYXB9XHJcblx0XHRcdFx0XHRcdG9uUmVxdWVzdENsb3NlPXtlPT50aGlzLnNldFN0YXRlKHtuZWVkTWFwOmZhbHNlfSl9PlxyXG5cdFx0XHRcdFx0XHQ8TWFwIG9uUmVhZHk9e21hcD0+dGhpcy5zaG93V2F5cG9pbnRzKG1hcCl9IHN0eWxlPXt7d2lkdGg6XCIxMDAlXCIsaGVpZ2h0OjUwMH19Lz5cclxuXHRcdFx0XHRcdDwvRGlhbG9nPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZFdpdGhJY29uIGljb249ezxJY29uU2NoZWR1bGUvPn0gZmxvYXRpbmdMYWJlbEZpeGVkPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuW/q+mAn+iuoeWIkuS9oOeahOihjOeoi++8jOavlOWmgu+8muWMl+S6rCzkuIrmtbcsLi4uXCJcclxuXHRcdFx0XHRcdFx0bXVsdGlMaW5lPXt0cnVlfSBmdWxsV2lkdGg9e3RydWV9IHsuLi5vdGhlcnN9Lz5cclxuXHRcdFx0XHQ8L2Rpdj4pXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzaG93TWFwKCl7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtuZWVkTWFwOnRydWV9KVxyXG5cdH1cclxuXHJcblx0c2hvd1dheXBvaW50cyhtYXApe1xyXG5cdFx0Y29uc3Qge3dheXBvaW50c309dGhpcy5zdGF0ZVxyXG5cdFx0Y29uc3Qge01hcmtlcixQb2ludH09Qk1hcFxyXG5cdFx0bGV0IHBvaW50cz1bXVxyXG5cdFx0d2F5cG9pbnRzLmZvckVhY2god2F5cG9pbnQ9PntcclxuXHRcdFx0Y29uc3Qge2Nvb3JkaW5hdGVzOltsYXQsbG5nXX09d2F5cG9pbnQubG9jXHJcblx0XHRcdGxldCBtYXJrZXI9bmV3IE1hcmtlcihuZXcgUG9pbnQobGF0LGxuZyksIHtlbmFibGVEcmFnZ2luZzp0cnVlfSlcclxuXHRcdFx0bWFwLmFkZE92ZXJsYXkobWFya2VyKVxyXG5cdFx0XHRwb2ludHMucHVzaChtYXJrZXIuZ2V0UG9zaXRpb24oKSlcclxuXHRcdH0pXHJcblxyXG5cdFx0aWYocG9pbnRzLmxlbmd0aClcclxuXHRcdFx0bWFwLnNldFZpZXdwb3J0KHBvaW50cylcclxuXHR9XHJcbn1cclxuIl19