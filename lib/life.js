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
					{ style: { background: "white" } },
					showHistory && memory.length && _react2.default.createElement(
						_Stepper.Stepper,
						{ orientation: "vertical", activeStep: -1 },
						memory.map(function (a) {
							return _react2.default.createElement(_journey.Title, { key: a.name, journey: a, completed: true });
						})
					) || null,
					active.length && active.map(function (journey) {
						return _react2.default.createElement(_journey2.default, { key: journey, journey: journey, publishable: true });
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
			var startedAt = journey.startedAt;
			var endedAt = journey.endedAt;
			var _BMap = BMap;
			var Marker = _BMap.Marker;
			var Point = _BMap.Point;
			var PointCollection = _BMap.PointCollection;
			var Label = _BMap.Label;
			var Size = _BMap.Size;

			_location2.default.get(startedAt, endedAt, function (waypoints) {
				map.reset();
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
//# sourceMappingURL=data:application/json;base64,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QUFIO1dBQU8sRUFBRSxTQUFGLENBQVksT0FBWixLQUFzQixFQUFFLFNBQUYsQ0FBWSxPQUFaLEVBQXRCO0lBQVAsQ0FBWixDQW5CYztBQW9CZCxRQUFLLElBQUwsQ0FBVSxVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDaEIsUUFBRyxFQUFFLFNBQUYsRUFBWTtBQUNkLFNBQUcsRUFBRSxTQUFGLEVBQVk7QUFDZCxhQUFPLEVBQUUsU0FBRixDQUFZLE9BQVosS0FBc0IsRUFBRSxTQUFGLENBQVksT0FBWixFQUF0QixDQURPO01BQWYsTUFFSztBQUNKLGFBQU8sQ0FBQyxDQUFELENBREg7TUFGTDtLQURELE1BTUs7QUFDSixTQUFHLEVBQUUsU0FBRixFQUFZO0FBQ2QsYUFBTyxDQUFQLENBRGM7TUFBZixNQUVLO0FBQ0osYUFBTyxFQUFFLFNBQUYsQ0FBWSxPQUFaLEtBQXNCLEVBQUUsU0FBRixDQUFZLE9BQVosRUFBdEIsQ0FESDtNQUZMO0tBUEQ7SUFEUyxDQUFWLENBcEJjO0FBbUNkLFVBQU8sRUFBQyxjQUFELEVBQVMsVUFBVCxFQUFlLGNBQWYsRUFBUCxDQW5DYzs7OztRQS9JSzs7O0tBcUxiLGVBQWE7QUFDbkIsU0FBUSxpQkFBVSxNQUFWOztrQkF0TFciLCJmaWxlIjoibGlmZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHtVSSwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuXHJcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b24sIEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbiwgSWNvbkJ1dHRvbiwgRGlhbG9nLCBTbGlkZXIsIERyYXdlcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtTdGVwLFN0ZXBwZXIsU3RlcExhYmVsLFN0ZXBDb250ZW50fSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xyXG5cclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5cclxuaW1wb3J0IEljb25Nb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtaG9yaXonXHJcbmltcG9ydCBJY29uQWRkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZCdcclxuaW1wb3J0IEljb25NYXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL21hcFwiXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBGb290cHJpbnQgYXMgRm9vdHByaW50REJ9IGZyb20gXCIuL2RiXCJcclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jaGlwcGVyXCJcclxuaW1wb3J0IEpvdXJuZXksIHtUaXRsZX0gZnJvbSBcIi4vY29tcG9uZW50cy9qb3VybmV5XCJcclxuaW1wb3J0IE1hcCBmcm9tIFwiLi9jb21wb25lbnRzL21hcFwiXHJcbmltcG9ydCBMb2NhdGlvbkRCIGZyb20gXCIuL2RiL2xvY2F0aW9uXCJcclxuXHJcblxyXG5jb25zdCB7RW1wdHksIFBob3RvfT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlmZSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRtZW1vcnk6W10sXHJcblx0XHR3aXNoOltdLFxyXG5cdFx0YWN0aXZlOltdLFxyXG5cdFx0c2hvd0hpc3Rvcnk6dHJ1ZSxcclxuXHRcdG9uTWFwOmZhbHNlXHJcblx0fVxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRKb3VybmV5REIuZmluZCgpXHJcblx0XHRcdC5mZXRjaChqb3VybmV5cz0+dGhpcy5zZXRTdGF0ZSh0aGlzLmdyb3VwKGpvdXJuZXlzKSkpXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHttZW1vcnksIHdpc2gsIGFjdGl2ZSwgc2hvd0hpc3RvcnksIG9uTWFwfT10aGlzLnN0YXRlXHJcblxyXG5cdFx0bGV0IG1hcD1udWxsLCBtYXBUb2dnbGVyPW51bGxcclxuXHJcblx0XHRpZihhY3RpdmUubGVuZ3RoPjApe1xyXG5cdFx0XHRtYXBUb2dnbGVyPSg8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0IF8yXCJcclxuXHRcdFx0XHRcdFx0XHRtaW5pPXt0cnVlfSBvbkNsaWNrPXtlPT50aGlzLnRvZ2dsZU1hcCgpfT5cclxuXHRcdFx0XHRcdFx0XHQ8SWNvbk1hcC8+XHJcblx0XHRcdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+KVxyXG5cclxuXHRcdFx0aWYob25NYXApe1xyXG5cdFx0XHRcdG1hcD0oPGRpdj5cclxuXHRcdFx0XHRcdFx0PE1hcCBjbGFzc05hbWU9XCJzdGlja3kgZnVsbFwiIHJlZj1cIm1hcFwiXHJcblx0XHRcdFx0XHRcdFx0b25SZWFkeT17bWFwPT50aGlzLnNob3dKb3VybmV5T25NYXAobWFwKX1cclxuXHRcdFx0XHRcdFx0XHRzdHlsZT17e29wYWNpdHk6XCIwLjVcIiwgekluZGV4OjF9fS8+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSByaWdodCBfMlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxTbGlkZXIgYXhpcz1cInlcIiByZWY9XCJvcGFjaXR5XCJcclxuXHRcdFx0XHRcdFx0XHRcdHN0eWxlPXt7aGVpZ2h0OjEwMH19XHJcblx0XHRcdFx0XHRcdFx0XHRkaXNhYmxlRm9jdXNSaXBwbGU9e3RydWV9XHJcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9ezAuNX1cclxuXHRcdFx0XHRcdFx0XHRcdHN0ZXA9ezAuMX1cclxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtlPT50aGlzLm9uQ2hhbmdlTWFwT3BhY2l0eSgpfVxyXG5cdFx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj4pXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0PGRpdj5cclxuXHRcdFx0e21hcH1cclxuXHJcblx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG5cdFx0XHRcdGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSB0b3AgcmlnaHRcIlxyXG5cdFx0XHRcdG1pbmk9e3RydWV9IG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcImpvdXJuZXkvX25ld1wiKX0+XHJcblx0XHRcdFx0PEljb25BZGQvPlxyXG5cdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxyXG5cclxuXHRcdFx0e21hcFRvZ2dsZXJ9XHJcblxyXG5cdFx0XHQ8ZGl2IHN0eWxlPXt7YmFja2dyb3VuZDpcIndoaXRlXCJ9fT5cclxuXHRcdFx0XHR7c2hvd0hpc3RvcnkgJiYgbWVtb3J5Lmxlbmd0aCAmJiAoXHJcblx0XHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgYWN0aXZlU3RlcD17LTF9PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRtZW1vcnkubWFwKGE9Pig8VGl0bGUga2V5PXthLm5hbWV9IGpvdXJuZXk9e2F9IGNvbXBsZXRlZD17dHJ1ZX0vPikpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdFx0KXx8bnVsbH1cclxuXHJcblx0XHRcdFx0e2FjdGl2ZS5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdFx0YWN0aXZlLm1hcChqb3VybmV5PT4oXHJcblx0XHRcdFx0XHRcdDxKb3VybmV5IGtleT17am91cm5leX0gam91cm5leT17am91cm5leX0gcHVibGlzaGFibGU9e3RydWV9Lz5cclxuXHRcdFx0XHRcdCkpXHJcblx0XHRcdFx0KXx8bnVsbH1cclxuXHJcblx0XHRcdFx0e3dpc2gubGVuZ3RoICYmIChcclxuXHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBhY3RpdmVTdGVwPXstMX0gbGluZWFyPXtmYWxzZX0+XHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHR3aXNoLm1hcChhPT4oPFRpdGxlIGtleT17YS5uYW1lfSBjb21wbGV0ZWQ9e2ZhbHNlfSBqb3VybmV5PXthfS8+KSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQpfHwoPEVtcHR5IGljb249ezxMb2dvLz59PuadpSzlvIDlp4vkvaDnmoTlv4Pml4XnqIs8L0VtcHR5Pil9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRvbkNoYW5nZU1hcE9wYWNpdHkoKXtcclxuXHRcdGxldCBtYXBTdHlsZT10aGlzLnJlZnMubWFwLnJlZnMucm9vdC5zdHlsZVxyXG5cdFx0bGV0IG9wYWNpdHk9bWFwU3R5bGUub3BhY2l0eT10aGlzLnJlZnMub3BhY2l0eS5nZXRWYWx1ZSgpXHJcblx0XHRpZihvcGFjaXR5PDAuNSlcclxuXHRcdFx0bWFwU3R5bGUuekluZGV4PTE7XHJcblx0XHRlbHNlXHJcblx0XHRcdG1hcFN0eWxlLnpJbmRleD0zO1xyXG5cdH1cclxuXHJcblx0dG9nZ2xlTWFwKCl7XHJcblx0XHRjb25zdCB7b25NYXB9PXRoaXMuc3RhdGVcclxuXHRcdHRoaXMuc2V0U3RhdGUoe29uTWFwOiFvbk1hcH0pXHJcblx0fVxyXG5cclxuXHRzaG93Sm91cm5leU9uTWFwKG1hcCl7XHJcblx0XHRjb25zdCB7YWN0aXZlOltqb3VybmV5XX09dGhpcy5zdGF0ZVxyXG5cdFx0Y29uc3Qge3N0YXJ0ZWRBdCwgZW5kZWRBdH09am91cm5leVxyXG5cdFx0Y29uc3Qge01hcmtlcixQb2ludCxQb2ludENvbGxlY3Rpb24sTGFiZWwsU2l6ZX09Qk1hcFxyXG5cdFx0TG9jYXRpb25EQi5nZXQoc3RhcnRlZEF0LCBlbmRlZEF0LFxyXG5cdFx0XHR3YXlwb2ludHM9PntcclxuXHRcdFx0XHRtYXAucmVzZXQoKVxyXG5cdFx0XHRcdGlmKHdheXBvaW50cy5sZW5ndGg9PTApXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0d2F5cG9pbnRzLnNvcnQoKGEsYik9PmEud2hlbi1iLndoZW4pXHJcblx0XHRcdFx0bGV0IGRheXM9W3dheXBvaW50c1swXV0sIGRheUxvbmc9MjQqNjAqNjAqMTAwMFxyXG5cdFx0XHRcdGxldCBwb2ludHM9d2F5cG9pbnRzLm1hcCh3YXlwb2ludD0+e1xyXG5cdFx0XHRcdFx0Y29uc3Qge3doZW4sbGF0LGxuZ309d2F5cG9pbnRcclxuXHRcdFx0XHRcdGlmKHdoZW4tZGF5c1tkYXlzLmxlbmd0aC0xXS53aGVuPmRheUxvbmcpXHJcblx0XHRcdFx0XHRcdGRheXMucHVzaCh3YXlwb2ludClcclxuXHRcdFx0XHRcdHJldHVybiBuZXcgUG9pbnQobG5nLGxhdClcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdGxldCBwYz1uZXcgUG9pbnRDb2xsZWN0aW9uKHBvaW50cywge3NpemU6Qk1BUF9QT0lOVF9TSVpFX1RJTlksc2hhcGU6Qk1BUF9QT0lOVF9TSEFQRV9DSVJDTEUsIGNvbG9yOlwicmVkXCJ9KVxyXG5cdFx0XHRcdG1hcC5hZGRPdmVybGF5KHBjKVxyXG5cdFx0XHRcdG1hcC5hZGRFdmVudExpc3RlbmVyKFwiem9vbWVuZFwiLCAoKT0+e1xyXG5cdFx0XHRcdFx0bGV0IHpvb209bWFwLmdldFpvb20oKVxyXG5cdFx0XHRcdFx0aWYoem9vbTw9MTEpe1xyXG5cdFx0XHRcdFx0XHRwYy5zZXRTdHlsZXMoe3NpemU6Qk1BUF9QT0lOVF9TSVpFX1RJTll9KVxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdHBjLnNldFN0eWxlcyh7c2l6ZTpCTUFQX1BPSU5UX1NJWkVfQklHfSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHRsZXQgc3RhcnRlZEF0PWpvdXJuZXkuc3RhcnRlZEF0XHJcblx0XHRcdFx0ZGF5cy5mb3JFYWNoKCh7d2hlbixsYXQsbG5nfSwgaSk9PntcclxuXHRcdFx0XHRcdGxldCBtYXJrZXI9bmV3IE1hcmtlcihuZXcgUG9pbnQobG5nLGxhdCkpXHJcblx0XHRcdFx0XHRsZXQgZGF5Tm89bmV3IERhdGUod2hlbikucmVsYXRpdmUoc3RhcnRlZEF0KSsxXHJcblx0XHRcdFx0XHRsZXQgbGFiZWw9bmV3IExhYmVsKGAke2RheU5vfWApXHJcblx0XHRcdFx0XHRsYWJlbC5zZXRTdHlsZSh7YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIixib3JkZXI6XCIwcHhcIn0pXHJcblx0XHRcdFx0XHRsYWJlbC5zZXRPZmZzZXQobmV3IFNpemUoZGF5Tm8+OSA/IDIgOiA1LCAyKSlcclxuXHRcdFx0XHRcdG1hcmtlci5zZXRMYWJlbChsYWJlbClcclxuXHRcdFx0XHRcdG1hcC5hZGRPdmVybGF5KG1hcmtlcilcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0bGV0IGRlbHRhPU1hdGgucm91bmQocG9pbnRzLmxlbmd0aC81KVxyXG5cdFx0XHRcdG1hcC5zZXRWaWV3cG9ydChwb2ludHMuZmlsdGVyKChhLGkpPT5pJWRlbHRhPT0wKSlcclxuXHRcdFx0fSlcclxuXHJcblx0fVxyXG5cclxuXHRncm91cChqb3VybmV5cyl7XHJcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRcdGxldCBtZW1vcnk9W10sIHdpc2g9W10sIGFjdGl2ZT1bXVxyXG5cdFx0am91cm5leXMuZm9yRWFjaChqb3VybmV5PT57XHJcblx0XHRcdHN3aXRjaChKb3VybmV5REIuZ2V0U3RhdGUoam91cm5leSkpe1xyXG5cdFx0XHRjYXNlIFwiTWVtb3J5XCI6XHJcblx0XHRcdFx0bWVtb3J5LnB1c2goam91cm5leSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcIlN0YXJ0aW5nXCI6XHJcblx0XHRcdGNhc2UgXCJFbmRpbmdcIjpcclxuXHRcdFx0Y2FzZSBcIlRyYXZlbGluZ1wiOlxyXG5cdFx0XHRcdGFjdGl2ZS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJQbGFuXCI6XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0d2lzaC5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRtZW1vcnkuc29ydCgoYSxiKT0+YS5zdGFydGVkQXQuZ2V0VGltZSgpLWIuc3RhcnRlZEF0LmdldFRpbWUoKSlcclxuXHRcdGFjdGl2ZS5zb3J0KChhLGIpPT5hLnN0YXJ0ZWRBdC5nZXRUaW1lKCktYi5zdGFydGVkQXQuZ2V0VGltZSgpKVxyXG5cdFx0d2lzaC5zb3J0KChhLGIpPT57XHJcblx0XHRcdGlmKGEuc3RhcnRlZEF0KXtcclxuXHRcdFx0XHRpZihiLnN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gYS5zdGFydGVkQXQuZ2V0VGltZSgpLWIuc3RhcnRlZEF0LmdldFRpbWUoKVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIC0xXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRpZihiLnN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gMVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIGEuY3JlYXRlZEF0LmdldFRpbWUoKS1iLmNyZWF0ZWRBdC5nZXRUaW1lKClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRyZXR1cm4ge21lbW9yeSwgd2lzaCwgYWN0aXZlfVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuIl19