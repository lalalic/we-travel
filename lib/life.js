"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _Stepper = require("material-ui/Stepper");

var _directionsWalk = require("material-ui/svg-icons/maps/directions-walk");

var _directionsWalk2 = _interopRequireDefault(_directionsWalk);

var _moreHoriz = require("material-ui/svg-icons/navigation/more-horiz");

var _moreHoriz2 = _interopRequireDefault(_moreHoriz);

var _add = require("material-ui/svg-icons/content/add");

var _add2 = _interopRequireDefault(_add);

var _map = require("material-ui/svg-icons/maps/map");

var _map2 = _interopRequireDefault(_map);

var _db = require("./db");

var _chipper = require("./components/chipper");

var _chipper2 = _interopRequireDefault(_chipper);

var _journey = require("./components/journey");

var _journey2 = _interopRequireDefault(_journey);

var _map3 = require("./components/map");

var _map4 = _interopRequireDefault(_map3);

var _location = require("./db/location");

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;
var Photo = _qiliApp.UI.Photo;

var Life = function (_Component) {
	_inherits(Life, _Component);

	function Life() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Life);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Life)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			memory: [],
			wish: [],
			active: [],
			showHistory: true,
			onMap: false
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Life, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			_db.Journey.find().fetch(function (journeys) {
				return _this2.setState(_this2.group(journeys));
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var _state = this.state;
			var memory = _state.memory;
			var wish = _state.wish;
			var active = _state.active;
			var showHistory = _state.showHistory;
			var onMap = _state.onMap;


			var map = null,
			    mapToggler = null;

			if (active.length > 0) {
				mapToggler = _react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "sticky top right _2",
						mini: true, onClick: function onClick(e) {
							return _this3.toggleMap();
						} },
					_react2.default.createElement(_map2.default, null)
				);

				if (onMap) {
					map = _react2.default.createElement(
						"div",
						null,
						_react2.default.createElement(_map4.default, { className: "sticky full", ref: "map",
							onReady: function onReady(map) {
								return _this3.showJourneyOnMap(map);
							},
							style: { opacity: "0.5", zIndex: 1 } }),
						_react2.default.createElement(
							"div",
							{ className: "sticky bottom right _2" },
							_react2.default.createElement(_materialUi.Slider, { axis: "y", ref: "opacity",
								style: { height: 100 },
								disableFocusRipple: true,
								defaultValue: 0.5,
								step: 0.1,
								onChange: function onChange(e) {
									return _this3.onChangeMapOpacity();
								}
							})
						)
					);
				}
			}

			return _react2.default.createElement(
				"div",
				null,
				map,
				_react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "floating sticky top right",
						mini: true, onClick: function onClick(e) {
							return _this3.context.router.push("journey/_new");
						} },
					_react2.default.createElement(_add2.default, null)
				),
				mapToggler,
				_react2.default.createElement(
					"div",
					{ style: { zIndex: 7, background: "white" } },
					showHistory && memory.length && _react2.default.createElement(
						_Stepper.Stepper,
						{ orientation: "vertical", activeStep: -1 },
						memory.map(function (a) {
							return _react2.default.createElement(_journey.Title, { key: a.name, journey: a, completed: true });
						})
					) || null,
					active.length && active.map(function (journey) {
						return _react2.default.createElement(_journey2.default, { key: journey, journey: journey });
					}) || null,
					wish.length && _react2.default.createElement(
						"div",
						null,
						_react2.default.createElement(
							_Stepper.Stepper,
							{ orientation: "vertical", activeStep: -1, linear: false },
							wish.map(function (a) {
								return _react2.default.createElement(_journey.Title, { key: a.name, completed: false, journey: a });
							})
						)
					) || _react2.default.createElement(
						Empty,
						{ icon: _react2.default.createElement(_directionsWalk2.default, null) },
						"来,开始你的心旅程"
					)
				)
			);
		}
	}, {
		key: "onChangeMapOpacity",
		value: function onChangeMapOpacity() {
			var mapStyle = this.refs.map.refs.root.style;
			var opacity = mapStyle.opacity = this.refs.opacity.getValue();
			if (opacity < 0.5) mapStyle.zIndex = 1;else mapStyle.zIndex = 3;
		}
	}, {
		key: "toggleMap",
		value: function toggleMap() {
			var onMap = this.state.onMap;

			this.setState({ onMap: !onMap });
		}
	}, {
		key: "showJourneyOnMap",
		value: function showJourneyOnMap(map) {
			var _state$active = _slicedToArray(this.state.active, 1);

			var journey = _state$active[0];
			var _BMap = BMap;
			var Marker = _BMap.Marker;
			var Point = _BMap.Point;
			var PointCollection = _BMap.PointCollection;
			var Label = _BMap.Label;
			var Size = _BMap.Size;

			_location2.default.get().then(function (waypoints) {
				if (waypoints.length == 0) return;
				waypoints.sort(function (a, b) {
					return a.when - b.when;
				});
				var days = [waypoints[0]],
				    dayLong = 24 * 60 * 60 * 1000;
				var points = waypoints.map(function (waypoint) {
					var when = waypoint.when;
					var lat = waypoint.lat;
					var lng = waypoint.lng;

					if (when - days[days.length - 1].when > dayLong) days.push(waypoint);
					return new Point(lng, lat);
				});
				var pc = new PointCollection(points, { size: BMAP_POINT_SIZE_TINY, shape: BMAP_POINT_SHAPE_CIRCLE, color: "red" });
				map.addOverlay(pc);
				map.addEventListener("zoomend", function () {
					var zoom = map.getZoom();
					if (zoom <= 11) {
						pc.setStyles({ size: BMAP_POINT_SIZE_TINY });
					} else {
						pc.setStyles({ size: BMAP_POINT_SIZE_BIG });
					}
				});

				var startedAt = journey.startedAt;
				days.forEach(function (_ref, i) {
					var when = _ref.when;
					var lat = _ref.lat;
					var lng = _ref.lng;

					var marker = new Marker(new Point(lng, lat));
					var dayNo = new Date(when).relative(startedAt) + 1;
					var label = new Label("" + dayNo);
					label.setStyle({ backgroundColor: "transparent", border: "0px" });
					label.setOffset(new Size(dayNo > 9 ? 2 : 5, 2));
					marker.setLabel(label);
					map.addOverlay(marker);
				});

				var delta = Math.round(points.length / 5);
				map.setViewport(points.filter(function (a, i) {
					return i % delta == 0;
				}));
			});
		}
	}, {
		key: "group",
		value: function group(journeys) {
			var now = new Date();
			var memory = [],
			    wish = [],
			    active = [];
			journeys.forEach(function (journey) {
				switch (_db.Journey.getState(journey)) {
					case "Memory":
						memory.push(journey);
						break;
					case "Starting":
					case "Ending":
					case "Traveling":
						active.push(journey);
						break;
					case "Plan":
					default:
						wish.push(journey);
				}
			});
			memory.sort(function (a, b) {
				return a.startedAt.getTime() - b.startedAt.getTime();
			});
			active.sort(function (a, b) {
				return a.startedAt.getTime() - b.startedAt.getTime();
			});
			wish.sort(function (a, b) {
				if (a.startedAt) {
					if (b.startedAt) {
						return a.startedAt.getTime() - b.startedAt.getTime();
					} else {
						return -1;
					}
				} else {
					if (b.startedAt) {
						return 1;
					} else {
						return a.createdAt.getTime() - b.createdAt.getTime();
					}
				}
			});
			return { memory: memory, wish: wish, active: active };
		}
	}]);

	return Life;
}(_react.Component);

Life.contextTypes = {
	router: _react.PropTypes.object
};
exports.default = Life;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QjtJQUFQLENBQVosQ0FuQmM7QUFvQmQsUUFBSyxJQUFMLENBQVUsVUFBQyxDQUFELEVBQUcsQ0FBSCxFQUFPO0FBQ2hCLFFBQUcsRUFBRSxTQUFGLEVBQVk7QUFDZCxTQUFHLEVBQUUsU0FBRixFQUFZO0FBQ2QsYUFBTyxFQUFFLFNBQUYsQ0FBWSxPQUFaLEtBQXNCLEVBQUUsU0FBRixDQUFZLE9BQVosRUFBdEIsQ0FETztNQUFmLE1BRUs7QUFDSixhQUFPLENBQUMsQ0FBRCxDQURIO01BRkw7S0FERCxNQU1LO0FBQ0osU0FBRyxFQUFFLFNBQUYsRUFBWTtBQUNkLGFBQU8sQ0FBUCxDQURjO01BQWYsTUFFSztBQUNKLGFBQU8sRUFBRSxTQUFGLENBQVksT0FBWixLQUFzQixFQUFFLFNBQUYsQ0FBWSxPQUFaLEVBQXRCLENBREg7TUFGTDtLQVBEO0lBRFMsQ0FBVixDQXBCYztBQW1DZCxVQUFPLEVBQUMsY0FBRCxFQUFTLFVBQVQsRUFBZSxjQUFmLEVBQVAsQ0FuQ2M7Ozs7UUE3SUs7OztLQW1MYixlQUFhO0FBQ25CLFNBQVEsaUJBQVUsTUFBVjs7a0JBcExXIiwiZmlsZSI6ImxpZmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7VUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLCBGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b24sIEljb25CdXR0b24sIERpYWxvZywgU2xpZGVyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge1N0ZXAsU3RlcHBlcixTdGVwTGFiZWwsU3RlcENvbnRlbnR9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXHJcblxyXG5pbXBvcnQgTG9nbyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9kaXJlY3Rpb25zLXdhbGsnXHJcblxyXG5pbXBvcnQgSWNvbk1vcmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vbW9yZS1ob3JpeidcclxuaW1wb3J0IEljb25BZGQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkJ1xyXG5pbXBvcnQgSWNvbk1hcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvbWFwXCJcclxuXHJcbmltcG9ydCB7Sm91cm5leSBhcyBKb3VybmV5REIsIEZvb3RwcmludCBhcyBGb290cHJpbnREQn0gZnJvbSBcIi4vZGJcIlxyXG5pbXBvcnQgQ2hpcHBlciBmcm9tIFwiLi9jb21wb25lbnRzL2NoaXBwZXJcIlxyXG5pbXBvcnQgSm91cm5leSwge1RpdGxlfSBmcm9tIFwiLi9jb21wb25lbnRzL2pvdXJuZXlcIlxyXG5pbXBvcnQgTWFwIGZyb20gXCIuL2NvbXBvbmVudHMvbWFwXCJcclxuaW1wb3J0IExvY2F0aW9uREIgZnJvbSBcIi4vZGIvbG9jYXRpb25cIlxyXG5cclxuXHJcbmNvbnN0IHtFbXB0eSwgUGhvdG99PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaWZlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtcclxuXHRcdG1lbW9yeTpbXSxcclxuXHRcdHdpc2g6W10sXHJcblx0XHRhY3RpdmU6W10sXHJcblx0XHRzaG93SGlzdG9yeTp0cnVlLFxyXG5cdFx0b25NYXA6ZmFsc2VcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdEpvdXJuZXlEQi5maW5kKClcclxuXHRcdFx0LmZldGNoKGpvdXJuZXlzPT50aGlzLnNldFN0YXRlKHRoaXMuZ3JvdXAoam91cm5leXMpKSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge21lbW9yeSwgd2lzaCwgYWN0aXZlLCBzaG93SGlzdG9yeSwgb25NYXB9PXRoaXMuc3RhdGVcclxuXHJcblx0XHRsZXQgbWFwPW51bGwsIG1hcFRvZ2dsZXI9bnVsbFxyXG5cclxuXHRcdGlmKGFjdGl2ZS5sZW5ndGg+MCl7XHJcblx0XHRcdG1hcFRvZ2dsZXI9KDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHQgXzJcIlxyXG5cdFx0XHRcdFx0XHRcdG1pbmk9e3RydWV9IG9uQ2xpY2s9e2U9PnRoaXMudG9nZ2xlTWFwKCl9PlxyXG5cdFx0XHRcdFx0XHRcdDxJY29uTWFwLz5cclxuXHRcdFx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj4pXHJcblxyXG5cdFx0XHRpZihvbk1hcCl7XHJcblx0XHRcdFx0bWFwPSg8ZGl2PlxyXG5cdFx0XHRcdFx0XHQ8TWFwIGNsYXNzTmFtZT1cInN0aWNreSBmdWxsXCIgcmVmPVwibWFwXCJcclxuXHRcdFx0XHRcdFx0XHRvblJlYWR5PXttYXA9PnRoaXMuc2hvd0pvdXJuZXlPbk1hcChtYXApfVxyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt7b3BhY2l0eTpcIjAuNVwiLCB6SW5kZXg6MX19Lz5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIHJpZ2h0IF8yXCI+XHJcblx0XHRcdFx0XHRcdFx0PFNsaWRlciBheGlzPVwieVwiIHJlZj1cIm9wYWNpdHlcIlxyXG5cdFx0XHRcdFx0XHRcdFx0c3R5bGU9e3toZWlnaHQ6MTAwfX0gXHJcblx0XHRcdFx0XHRcdFx0XHRkaXNhYmxlRm9jdXNSaXBwbGU9e3RydWV9IFxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXswLjV9XHJcblx0XHRcdFx0XHRcdFx0XHRzdGVwPXswLjF9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17ZT0+dGhpcy5vbkNoYW5nZU1hcE9wYWNpdHkoKX1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHttYXB9XHJcblxyXG5cdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuXHRcdFx0XHRjbGFzc05hbWU9XCJmbG9hdGluZyBzdGlja3kgdG9wIHJpZ2h0XCJcclxuXHRcdFx0XHRtaW5pPXt0cnVlfSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJqb3VybmV5L19uZXdcIil9PlxyXG5cdFx0XHRcdDxJY29uQWRkLz5cclxuXHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHJcblx0XHRcdHttYXBUb2dnbGVyfVxyXG5cclxuXHRcdFx0PGRpdiBzdHlsZT17e3pJbmRleDogNywgYmFja2dyb3VuZDpcIndoaXRlXCJ9fT5cclxuXHRcdFx0XHR7c2hvd0hpc3RvcnkgJiYgbWVtb3J5Lmxlbmd0aCAmJiAoXHJcblx0XHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgYWN0aXZlU3RlcD17LTF9PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRtZW1vcnkubWFwKGE9Pig8VGl0bGUga2V5PXthLm5hbWV9IGpvdXJuZXk9e2F9IGNvbXBsZXRlZD17dHJ1ZX0vPikpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdFx0KXx8bnVsbH1cclxuXHJcblx0XHRcdFx0e2FjdGl2ZS5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdFx0YWN0aXZlLm1hcChqb3VybmV5PT4oXHJcblx0XHRcdFx0XHRcdDxKb3VybmV5IGtleT17am91cm5leX0gam91cm5leT17am91cm5leX0vPlxyXG5cdFx0XHRcdFx0KSlcclxuXHRcdFx0XHQpfHxudWxsfVxyXG5cclxuXHRcdFx0XHR7d2lzaC5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfSBsaW5lYXI9e2ZhbHNlfT5cclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHdpc2gubWFwKGE9Pig8VGl0bGUga2V5PXthLm5hbWV9IGNvbXBsZXRlZD17ZmFsc2V9IGpvdXJuZXk9e2F9Lz4pKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdDwvU3RlcHBlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdCl8fCg8RW1wdHkgaWNvbj17PExvZ28vPn0+5p2lLOW8gOWni+S9oOeahOW/g+aXheeoizwvRW1wdHk+KX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0b25DaGFuZ2VNYXBPcGFjaXR5KCl7XHJcblx0XHRsZXQgbWFwU3R5bGU9dGhpcy5yZWZzLm1hcC5yZWZzLnJvb3Quc3R5bGVcclxuXHRcdGxldCBvcGFjaXR5PW1hcFN0eWxlLm9wYWNpdHk9dGhpcy5yZWZzLm9wYWNpdHkuZ2V0VmFsdWUoKVxyXG5cdFx0aWYob3BhY2l0eTwwLjUpXHJcblx0XHRcdG1hcFN0eWxlLnpJbmRleD0xO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRtYXBTdHlsZS56SW5kZXg9MztcclxuXHR9XHJcblxyXG5cdHRvZ2dsZU1hcCgpe1xyXG5cdFx0Y29uc3Qge29uTWFwfT10aGlzLnN0YXRlXHJcblx0XHR0aGlzLnNldFN0YXRlKHtvbk1hcDohb25NYXB9KVxyXG5cdH1cclxuXHJcblx0c2hvd0pvdXJuZXlPbk1hcChtYXApe1xyXG5cdFx0Y29uc3Qge2FjdGl2ZTpbam91cm5leV19PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtNYXJrZXIsUG9pbnQsUG9pbnRDb2xsZWN0aW9uLExhYmVsLFNpemV9PUJNYXBcclxuXHRcdExvY2F0aW9uREIuZ2V0KClcclxuXHRcdFx0LnRoZW4od2F5cG9pbnRzPT57XHJcblx0XHRcdFx0aWYod2F5cG9pbnRzLmxlbmd0aD09MClcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR3YXlwb2ludHMuc29ydCgoYSxiKT0+YS53aGVuLWIud2hlbilcclxuXHRcdFx0XHRsZXQgZGF5cz1bd2F5cG9pbnRzWzBdXSwgZGF5TG9uZz0yNCo2MCo2MCoxMDAwXHJcblx0XHRcdFx0bGV0IHBvaW50cz13YXlwb2ludHMubWFwKHdheXBvaW50PT57XHJcblx0XHRcdFx0XHRjb25zdCB7d2hlbixsYXQsbG5nfT13YXlwb2ludFxyXG5cdFx0XHRcdFx0aWYod2hlbi1kYXlzW2RheXMubGVuZ3RoLTFdLndoZW4+ZGF5TG9uZylcclxuXHRcdFx0XHRcdFx0ZGF5cy5wdXNoKHdheXBvaW50KVxyXG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBQb2ludChsbmcsbGF0KVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0bGV0IHBjPW5ldyBQb2ludENvbGxlY3Rpb24ocG9pbnRzLCB7c2l6ZTpCTUFQX1BPSU5UX1NJWkVfVElOWSxzaGFwZTpCTUFQX1BPSU5UX1NIQVBFX0NJUkNMRSwgY29sb3I6XCJyZWRcIn0pXHJcblx0XHRcdFx0bWFwLmFkZE92ZXJsYXkocGMpXHJcblx0XHRcdFx0bWFwLmFkZEV2ZW50TGlzdGVuZXIoXCJ6b29tZW5kXCIsICgpPT57XHJcblx0XHRcdFx0XHRsZXQgem9vbT1tYXAuZ2V0Wm9vbSgpXHJcblx0XHRcdFx0XHRpZih6b29tPD0xMSl7XHJcblx0XHRcdFx0XHRcdHBjLnNldFN0eWxlcyh7c2l6ZTpCTUFQX1BPSU5UX1NJWkVfVElOWX0pXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0cGMuc2V0U3R5bGVzKHtzaXplOkJNQVBfUE9JTlRfU0laRV9CSUd9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdGxldCBzdGFydGVkQXQ9am91cm5leS5zdGFydGVkQXRcclxuXHRcdFx0XHRkYXlzLmZvckVhY2goKHt3aGVuLGxhdCxsbmd9LCBpKT0+e1xyXG5cdFx0XHRcdFx0bGV0IG1hcmtlcj1uZXcgTWFya2VyKG5ldyBQb2ludChsbmcsbGF0KSlcclxuXHRcdFx0XHRcdGxldCBkYXlObz1uZXcgRGF0ZSh3aGVuKS5yZWxhdGl2ZShzdGFydGVkQXQpKzFcclxuXHRcdFx0XHRcdGxldCBsYWJlbD1uZXcgTGFiZWwoYCR7ZGF5Tm99YClcclxuXHRcdFx0XHRcdGxhYmVsLnNldFN0eWxlKHtiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiLGJvcmRlcjpcIjBweFwifSlcclxuXHRcdFx0XHRcdGxhYmVsLnNldE9mZnNldChuZXcgU2l6ZShkYXlObz45ID8gMiA6IDUsIDIpKVxyXG5cdFx0XHRcdFx0bWFya2VyLnNldExhYmVsKGxhYmVsKVxyXG5cdFx0XHRcdFx0bWFwLmFkZE92ZXJsYXkobWFya2VyKVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRsZXQgZGVsdGE9TWF0aC5yb3VuZChwb2ludHMubGVuZ3RoLzUpXHJcblx0XHRcdFx0bWFwLnNldFZpZXdwb3J0KHBvaW50cy5maWx0ZXIoKGEsaSk9PmklZGVsdGE9PTApKVxyXG5cdFx0XHR9KVxyXG5cdFxyXG5cdH1cclxuXHJcblx0Z3JvdXAoam91cm5leXMpe1xyXG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRsZXQgbWVtb3J5PVtdLCB3aXNoPVtdLCBhY3RpdmU9W11cclxuXHRcdGpvdXJuZXlzLmZvckVhY2goam91cm5leT0+e1xyXG5cdFx0XHRzd2l0Y2goSm91cm5leURCLmdldFN0YXRlKGpvdXJuZXkpKXtcclxuXHRcdFx0Y2FzZSBcIk1lbW9yeVwiOlxyXG5cdFx0XHRcdG1lbW9yeS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJTdGFydGluZ1wiOlxyXG5cdFx0XHRjYXNlIFwiRW5kaW5nXCI6XHJcblx0XHRcdGNhc2UgXCJUcmF2ZWxpbmdcIjpcclxuXHRcdFx0XHRhY3RpdmUucHVzaChqb3VybmV5KVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwiUGxhblwiOlxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHdpc2gucHVzaChqb3VybmV5KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0bWVtb3J5LnNvcnQoKGEsYik9PmEuc3RhcnRlZEF0LmdldFRpbWUoKS1iLnN0YXJ0ZWRBdC5nZXRUaW1lKCkpXHJcblx0XHRhY3RpdmUuc29ydCgoYSxiKT0+YS5zdGFydGVkQXQuZ2V0VGltZSgpLWIuc3RhcnRlZEF0LmdldFRpbWUoKSlcclxuXHRcdHdpc2guc29ydCgoYSxiKT0+e1xyXG5cdFx0XHRpZihhLnN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0aWYoYi5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGEuc3RhcnRlZEF0LmdldFRpbWUoKS1iLnN0YXJ0ZWRBdC5nZXRUaW1lKClcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiAtMVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0aWYoYi5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIDFcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiBhLmNyZWF0ZWRBdC5nZXRUaW1lKCktYi5jcmVhdGVkQXQuZ2V0VGltZSgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHttZW1vcnksIHdpc2gsIGFjdGl2ZX1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcbiJdfQ==