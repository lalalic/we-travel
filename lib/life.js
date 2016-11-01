"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Life = exports.REDUCER = exports.ACTION = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _reactRedux = require("react-redux");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Empty = _qiliApp.UI.Empty;
var Photo = _qiliApp.UI.Photo;


var DOMAIN = "ui.life";

var INIT_STATE = {
	memory: [],
	wish: [],
	active: [],
	showHistory: true,
	onMap: false
};

var ACTION = exports.ACTION = {
	FETCH: function FETCH(a) {
		return function (dispatch) {
			return _db.Journey.find().fetch(function (journeys) {
				return dispatch({ type: "@@" + DOMAIN + "/fetched", payload: journeys });
			});
		};
	},

	TOGGLE_MAP: { type: "@@" + DOMAIN + "/TOGGLE_MAP" }
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length <= 0 || arguments[0] === undefined ? INIT_STATE : arguments[0];
	var _ref = arguments[1];
	var type = _ref.type;
	var payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/TOGGLE_MAP":
			return Object.assign({}, state, { onMap: !state.onMap });
		case "@@" + DOMAIN + "/fetched":
			var journeys = payload;
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
			return Object.assign({}, state, { memory: memory, wish: wish, active: active });
	}
	return state;
});

var Life = exports.Life = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
})(function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.props.dispatch(ACTION.FETCH());
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var memory = _props.memory;
			var wish = _props.wish;
			var active = _props.active;
			var showHistory = _props.showHistory;
			var onMap = _props.onMap;
			var dispatch = _props.dispatch;
			var router = _props.router;


			var map = null,
			    mapToggler = null;

			if (active.length > 0) {
				mapToggler = _react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "sticky top right _2",
						mini: true, onClick: function onClick(e) {
							return dispatch(ACTION.TOGGLE_MAP);
						} },
					_react2.default.createElement(_map2.default, null)
				);

				if (onMap) {
					map = _react2.default.createElement(
						"div",
						null,
						_react2.default.createElement(_map4.default, { className: "sticky full", ref: "map",
							onReady: function onReady(map) {
								return _this2.showJourneyOnMap(map);
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
									return _this2.onChangeMapOpacity();
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
							return router.push("/journey/_new");
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
		key: "showJourneyOnMap",
		value: function showJourneyOnMap(map) {
			var _props$active = _slicedToArray(this.props.active, 1);

			var journey = _props$active[0];
			var startedAt = journey.startedAt;
			var endedAt = journey.endedAt;
			var _BMap = BMap;
			var Marker = _BMap.Marker;
			var Point = _BMap.Point;
			var PointCollection = _BMap.PointCollection;
			var Label = _BMap.Label;
			var Size = _BMap.Size;

			_db.Waypoint.get(startedAt, endedAt, function (waypoints) {
				map.reset();
				if (waypoints.length == 0) return;
				waypoints.sort(function (a, b) {
					return a.when.getTime() - b.when.getTime();
				});
				var days = [waypoints[0]];
				var points = waypoints.map(function (waypoint) {
					var when = waypoint.when;
					var _waypoint$loc = waypoint.loc;
					var lat = _waypoint$loc.y;
					var lng = _waypoint$loc.x;

					if (!when.isSameDate(days[0].when)) days.unshift(waypoint);
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
				days.forEach(function (_ref2, i) {
					var when = _ref2.when;
					var _ref2$loc = _ref2.loc;
					var lat = _ref2$loc.y;
					var lng = _ref2$loc.x;

					var marker = new Marker(new Point(lng, lat));
					var dayNo = when.relative(startedAt) + 1;
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
	}]);

	return _class;
}(_react.Component));

exports.default = Object.assign(Life, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,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Ozs7OzttQkF0RkosQ0FBTDs7a0JBb0lFLE9BQU8sTUFBUCxDQUFjLElBQWQsRUFBbUIsRUFBQyxjQUFELEVBQVMsZ0JBQVQsRUFBbkIiLCJmaWxlIjoibGlmZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHtVSSwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5cclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9uLCBJY29uQnV0dG9uLCBEaWFsb2csIFNsaWRlciwgRHJhd2VyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge1N0ZXAsU3RlcHBlcixTdGVwTGFiZWwsU3RlcENvbnRlbnR9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXHJcblxyXG5pbXBvcnQgTG9nbyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9kaXJlY3Rpb25zLXdhbGsnXHJcblxyXG5pbXBvcnQgSWNvbk1vcmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vbW9yZS1ob3JpeidcclxuaW1wb3J0IEljb25BZGQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkJ1xyXG5pbXBvcnQgSWNvbk1hcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvbWFwXCJcclxuXHJcbmltcG9ydCB7Sm91cm5leSBhcyBKb3VybmV5REIsIEZvb3RwcmludCBhcyBGb290cHJpbnREQiwgV2F5cG9pbnQgYXMgV2F5cG9pbnREQn0gZnJvbSBcIi4vZGJcIlxyXG5pbXBvcnQgQ2hpcHBlciBmcm9tIFwiLi9jb21wb25lbnRzL2NoaXBwZXJcIlxyXG5pbXBvcnQgSm91cm5leSwge1RpdGxlfSBmcm9tIFwiLi9jb21wb25lbnRzL2pvdXJuZXlcIlxyXG5pbXBvcnQgTWFwIGZyb20gXCIuL2NvbXBvbmVudHMvbWFwXCJcclxuaW1wb3J0IExvY2F0aW9uREIgZnJvbSBcIi4vZGIvbG9jYXRpb25cIlxyXG5cclxuXHJcbmNvbnN0IHtFbXB0eSwgUGhvdG99PVVJXHJcblxyXG5jb25zdCBET01BSU49XCJ1aS5saWZlXCJcclxuXHJcbmNvbnN0IElOSVRfU1RBVEU9e1xyXG5cdG1lbW9yeTpbXSxcclxuXHR3aXNoOltdLFxyXG5cdGFjdGl2ZTpbXSxcclxuXHRzaG93SGlzdG9yeTp0cnVlLFxyXG5cdG9uTWFwOmZhbHNlXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdEZFVENIOiBhPT5kaXNwYXRjaD0+Sm91cm5leURCLmZpbmQoKVxyXG5cdFx0LmZldGNoKGpvdXJuZXlzPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAscGF5bG9hZDpqb3VybmV5c30pKVxyXG5cdFx0XHJcblx0LFRPR0dMRV9NQVA6IHt0eXBlOmBAQCR7RE9NQUlOfS9UT0dHTEVfTUFQYH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xyXG5cdFtET01BSU5dOihzdGF0ZT1JTklUX1NUQVRFLHt0eXBlLCBwYXlsb2FkfSk9PntcclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgYEBAJHtET01BSU59L1RPR0dMRV9NQVBgOlxyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7b25NYXA6IXN0YXRlLm9uTWFwfSlcclxuXHRcdGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRgOlxyXG5cdFx0XHRsZXQgam91cm5leXM9cGF5bG9hZFxyXG5cdFx0XHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRcdFx0bGV0IG1lbW9yeT1bXSwgd2lzaD1bXSwgYWN0aXZlPVtdXHJcblx0XHRcdGpvdXJuZXlzLmZvckVhY2goam91cm5leT0+e1xyXG5cdFx0XHRcdHN3aXRjaChKb3VybmV5REIuZ2V0U3RhdGUoam91cm5leSkpe1xyXG5cdFx0XHRcdGNhc2UgXCJNZW1vcnlcIjpcclxuXHRcdFx0XHRcdG1lbW9yeS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwiU3RhcnRpbmdcIjpcclxuXHRcdFx0XHRjYXNlIFwiRW5kaW5nXCI6XHJcblx0XHRcdFx0Y2FzZSBcIlRyYXZlbGluZ1wiOlxyXG5cdFx0XHRcdFx0YWN0aXZlLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJQbGFuXCI6XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHdpc2gucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0bWVtb3J5LnNvcnQoKGEsYik9PmEuc3RhcnRlZEF0LmdldFRpbWUoKS1iLnN0YXJ0ZWRBdC5nZXRUaW1lKCkpXHJcblx0XHRcdGFjdGl2ZS5zb3J0KChhLGIpPT5hLnN0YXJ0ZWRBdC5nZXRUaW1lKCktYi5zdGFydGVkQXQuZ2V0VGltZSgpKVxyXG5cdFx0XHR3aXNoLnNvcnQoKGEsYik9PntcclxuXHRcdFx0XHRpZihhLnN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0XHRpZihiLnN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0XHRcdHJldHVybiBhLnN0YXJ0ZWRBdC5nZXRUaW1lKCktYi5zdGFydGVkQXQuZ2V0VGltZSgpXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIC0xXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRpZihiLnN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0XHRcdHJldHVybiAxXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGEuY3JlYXRlZEF0LmdldFRpbWUoKS1iLmNyZWF0ZWRBdC5nZXRUaW1lKClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7bWVtb3J5LHdpc2gsYWN0aXZlfSlcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdGF0ZVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IExpZmU9Y29ubmVjdChzdGF0ZT0+c3RhdGVbRE9NQUlOXSkoXHJcbmNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKEFDVElPTi5GRVRDSCgpKVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7bWVtb3J5LCB3aXNoLCBhY3RpdmUsIHNob3dIaXN0b3J5LCBvbk1hcCxkaXNwYXRjaCxyb3V0ZXJ9PXRoaXMucHJvcHNcclxuXHJcblx0XHRsZXQgbWFwPW51bGwsIG1hcFRvZ2dsZXI9bnVsbFxyXG5cclxuXHRcdGlmKGFjdGl2ZS5sZW5ndGg+MCl7XHJcblx0XHRcdG1hcFRvZ2dsZXI9KDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHQgXzJcIlxyXG5cdFx0XHRcdFx0XHRcdG1pbmk9e3RydWV9IG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5UT0dHTEVfTUFQKX0+XHJcblx0XHRcdFx0XHRcdFx0PEljb25NYXAvPlxyXG5cdFx0XHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPilcclxuXHJcblx0XHRcdGlmKG9uTWFwKXtcclxuXHRcdFx0XHRtYXA9KDxkaXY+XHJcblx0XHRcdFx0XHRcdDxNYXAgY2xhc3NOYW1lPVwic3RpY2t5IGZ1bGxcIiByZWY9XCJtYXBcIlxyXG5cdFx0XHRcdFx0XHRcdG9uUmVhZHk9e21hcD0+dGhpcy5zaG93Sm91cm5leU9uTWFwKG1hcCl9XHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3tvcGFjaXR5OlwiMC41XCIsIHpJbmRleDoxfX0vPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gcmlnaHQgXzJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8U2xpZGVyIGF4aXM9XCJ5XCIgcmVmPVwib3BhY2l0eVwiXHJcblx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e2hlaWdodDoxMDB9fVxyXG5cdFx0XHRcdFx0XHRcdFx0ZGlzYWJsZUZvY3VzUmlwcGxlPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXswLjV9XHJcblx0XHRcdFx0XHRcdFx0XHRzdGVwPXswLjF9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17ZT0+dGhpcy5vbkNoYW5nZU1hcE9wYWNpdHkoKX1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHttYXB9XHJcblxyXG5cdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuXHRcdFx0XHRjbGFzc05hbWU9XCJmbG9hdGluZyBzdGlja3kgdG9wIHJpZ2h0XCJcclxuXHRcdFx0XHRtaW5pPXt0cnVlfSBvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChcIi9qb3VybmV5L19uZXdcIil9PlxyXG5cdFx0XHRcdDxJY29uQWRkLz5cclxuXHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHJcblx0XHRcdHttYXBUb2dnbGVyfVxyXG5cclxuXHRcdFx0PGRpdiBzdHlsZT17e2JhY2tncm91bmQ6XCJ3aGl0ZVwifX0+XHJcblx0XHRcdFx0e3Nob3dIaXN0b3J5ICYmIG1lbW9yeS5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bWVtb3J5Lm1hcChhPT4oPFRpdGxlIGtleT17YS5uYW1lfSBqb3VybmV5PXthfSBjb21wbGV0ZWQ9e3RydWV9Lz4pKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHRcdCl8fG51bGx9XHJcblxyXG5cdFx0XHRcdHthY3RpdmUubGVuZ3RoICYmIChcclxuXHRcdFx0XHRcdGFjdGl2ZS5tYXAoam91cm5leT0+KFxyXG5cdFx0XHRcdFx0XHQ8Sm91cm5leSBrZXk9e2pvdXJuZXl9IGpvdXJuZXk9e2pvdXJuZXl9IHB1Ymxpc2hhYmxlPXt0cnVlfS8+XHJcblx0XHRcdFx0XHQpKVxyXG5cdFx0XHRcdCl8fG51bGx9XHJcblxyXG5cdFx0XHRcdHt3aXNoLmxlbmd0aCAmJiAoXHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgYWN0aXZlU3RlcD17LTF9IGxpbmVhcj17ZmFsc2V9PlxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0d2lzaC5tYXAoYT0+KDxUaXRsZSBrZXk9e2EubmFtZX0gY29tcGxldGVkPXtmYWxzZX0gam91cm5leT17YX0vPikpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0KXx8KDxFbXB0eSBpY29uPXs8TG9nby8+fT7mnaUs5byA5aeL5L2g55qE5b+D5peF56iLPC9FbXB0eT4pfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0b25DaGFuZ2VNYXBPcGFjaXR5KCl7XHJcblx0XHRsZXQgbWFwU3R5bGU9dGhpcy5yZWZzLm1hcC5yZWZzLnJvb3Quc3R5bGVcclxuXHRcdGxldCBvcGFjaXR5PW1hcFN0eWxlLm9wYWNpdHk9dGhpcy5yZWZzLm9wYWNpdHkuZ2V0VmFsdWUoKVxyXG5cdFx0aWYob3BhY2l0eTwwLjUpXHJcblx0XHRcdG1hcFN0eWxlLnpJbmRleD0xO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRtYXBTdHlsZS56SW5kZXg9MztcclxuXHR9XHJcblxyXG5cdHNob3dKb3VybmV5T25NYXAobWFwKXtcclxuXHRcdGNvbnN0IHthY3RpdmU6W2pvdXJuZXldfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7c3RhcnRlZEF0LCBlbmRlZEF0fT1qb3VybmV5XHJcblx0XHRjb25zdCB7TWFya2VyLFBvaW50LFBvaW50Q29sbGVjdGlvbixMYWJlbCxTaXplfT1CTWFwXHJcblx0XHRXYXlwb2ludERCLmdldChzdGFydGVkQXQsIGVuZGVkQXQsXHJcblx0XHRcdHdheXBvaW50cz0+e1xyXG5cdFx0XHRcdG1hcC5yZXNldCgpXHJcblx0XHRcdFx0aWYod2F5cG9pbnRzLmxlbmd0aD09MClcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR3YXlwb2ludHMuc29ydCgoYSxiKT0+YS53aGVuLmdldFRpbWUoKS1iLndoZW4uZ2V0VGltZSgpKVxyXG5cdFx0XHRcdGxldCBkYXlzPVt3YXlwb2ludHNbMF1dXHJcblx0XHRcdFx0bGV0IHBvaW50cz13YXlwb2ludHMubWFwKHdheXBvaW50PT57XHJcblx0XHRcdFx0XHRjb25zdCB7d2hlbixsb2M6e3k6bGF0LHg6bG5nfX09d2F5cG9pbnRcclxuXHRcdFx0XHRcdGlmKCF3aGVuLmlzU2FtZURhdGUoZGF5c1swXS53aGVuKSlcclxuXHRcdFx0XHRcdFx0ZGF5cy51bnNoaWZ0KHdheXBvaW50KVxyXG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBQb2ludChsbmcsbGF0KVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0bGV0IHBjPW5ldyBQb2ludENvbGxlY3Rpb24ocG9pbnRzLCB7c2l6ZTpCTUFQX1BPSU5UX1NJWkVfVElOWSxzaGFwZTpCTUFQX1BPSU5UX1NIQVBFX0NJUkNMRSwgY29sb3I6XCJyZWRcIn0pXHJcblx0XHRcdFx0bWFwLmFkZE92ZXJsYXkocGMpXHJcblx0XHRcdFx0bWFwLmFkZEV2ZW50TGlzdGVuZXIoXCJ6b29tZW5kXCIsICgpPT57XHJcblx0XHRcdFx0XHRsZXQgem9vbT1tYXAuZ2V0Wm9vbSgpXHJcblx0XHRcdFx0XHRpZih6b29tPD0xMSl7XHJcblx0XHRcdFx0XHRcdHBjLnNldFN0eWxlcyh7c2l6ZTpCTUFQX1BPSU5UX1NJWkVfVElOWX0pXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0cGMuc2V0U3R5bGVzKHtzaXplOkJNQVBfUE9JTlRfU0laRV9CSUd9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdGxldCBzdGFydGVkQXQ9am91cm5leS5zdGFydGVkQXRcclxuXHRcdFx0XHRkYXlzLmZvckVhY2goKHt3aGVuLGxvYzp7eTpsYXQseDpsbmd9fSwgaSk9PntcclxuXHRcdFx0XHRcdGxldCBtYXJrZXI9bmV3IE1hcmtlcihuZXcgUG9pbnQobG5nLGxhdCkpXHJcblx0XHRcdFx0XHRsZXQgZGF5Tm89d2hlbi5yZWxhdGl2ZShzdGFydGVkQXQpKzFcclxuXHRcdFx0XHRcdGxldCBsYWJlbD1uZXcgTGFiZWwoYCR7ZGF5Tm99YClcclxuXHRcdFx0XHRcdGxhYmVsLnNldFN0eWxlKHtiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiLGJvcmRlcjpcIjBweFwifSlcclxuXHRcdFx0XHRcdGxhYmVsLnNldE9mZnNldChuZXcgU2l6ZShkYXlObz45ID8gMiA6IDUsIDIpKVxyXG5cdFx0XHRcdFx0bWFya2VyLnNldExhYmVsKGxhYmVsKVxyXG5cdFx0XHRcdFx0bWFwLmFkZE92ZXJsYXkobWFya2VyKVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRsZXQgZGVsdGE9TWF0aC5yb3VuZChwb2ludHMubGVuZ3RoLzUpXHJcblx0XHRcdFx0bWFwLnNldFZpZXdwb3J0KHBvaW50cy5maWx0ZXIoKGEsaSk9PmklZGVsdGE9PTApKVxyXG5cdFx0XHR9KVxyXG5cclxuXHR9XHJcbn0pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKExpZmUse0FDVElPTiwgUkVEVUNFUn0pIl19