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
	onMap: false,
	waypoints: []
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
//# sourceMappingURL=data:application/json;base64,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SUFBWCxDQURELENBSm9COzs7OzttQkF0RkosQ0FBTDs7a0JBb0lFLE9BQU8sTUFBUCxDQUFjLElBQWQsRUFBbUIsRUFBQyxjQUFELEVBQVMsZ0JBQVQsRUFBbkIiLCJmaWxlIjoibGlmZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHtVSSwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5cclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9uLCBJY29uQnV0dG9uLCBEaWFsb2csIFNsaWRlciwgRHJhd2VyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge1N0ZXAsU3RlcHBlcixTdGVwTGFiZWwsU3RlcENvbnRlbnR9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXHJcblxyXG5pbXBvcnQgTG9nbyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9kaXJlY3Rpb25zLXdhbGsnXHJcblxyXG5pbXBvcnQgSWNvbk1vcmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vbW9yZS1ob3JpeidcclxuaW1wb3J0IEljb25BZGQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkJ1xyXG5pbXBvcnQgSWNvbk1hcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvbWFwXCJcclxuXHJcbmltcG9ydCB7Sm91cm5leSBhcyBKb3VybmV5REIsIEZvb3RwcmludCBhcyBGb290cHJpbnREQiwgV2F5cG9pbnQgYXMgV2F5cG9pbnREQn0gZnJvbSBcIi4vZGJcIlxyXG5pbXBvcnQgQ2hpcHBlciBmcm9tIFwiLi9jb21wb25lbnRzL2NoaXBwZXJcIlxyXG5pbXBvcnQgSm91cm5leSwge1RpdGxlfSBmcm9tIFwiLi9jb21wb25lbnRzL2pvdXJuZXlcIlxyXG5pbXBvcnQgTWFwIGZyb20gXCIuL2NvbXBvbmVudHMvbWFwXCJcclxuaW1wb3J0IExvY2F0aW9uREIgZnJvbSBcIi4vZGIvbG9jYXRpb25cIlxyXG5cclxuXHJcbmNvbnN0IHtFbXB0eSwgUGhvdG99PVVJXHJcblxyXG5jb25zdCBET01BSU49XCJ1aS5saWZlXCJcclxuXHJcbmNvbnN0IElOSVRfU1RBVEU9e1xyXG5cdG1lbW9yeTpbXSxcclxuXHR3aXNoOltdLFxyXG5cdGFjdGl2ZTpbXSxcclxuXHRzaG93SGlzdG9yeTp0cnVlLFxyXG5cdG9uTWFwOmZhbHNlLFxyXG5cdHdheXBvaW50czpbXVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRGRVRDSDogYT0+ZGlzcGF0Y2g9PkpvdXJuZXlEQi5maW5kKClcclxuXHRcdC5mZXRjaChqb3VybmV5cz0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2ZldGNoZWRgLHBheWxvYWQ6am91cm5leXN9KSlcclxuXHRcdFxyXG5cdCxUT0dHTEVfTUFQOiB7dHlwZTpgQEAke0RPTUFJTn0vVE9HR0xFX01BUGB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcclxuXHRbRE9NQUlOXTooc3RhdGU9SU5JVF9TVEFURSx7dHlwZSwgcGF5bG9hZH0pPT57XHJcblx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9UT0dHTEVfTUFQYDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse29uTWFwOiFzdGF0ZS5vbk1hcH0pXHJcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcclxuXHRcdFx0bGV0IGpvdXJuZXlzPXBheWxvYWRcclxuXHRcdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRcdGxldCBtZW1vcnk9W10sIHdpc2g9W10sIGFjdGl2ZT1bXVxyXG5cdFx0XHRqb3VybmV5cy5mb3JFYWNoKGpvdXJuZXk9PntcclxuXHRcdFx0XHRzd2l0Y2goSm91cm5leURCLmdldFN0YXRlKGpvdXJuZXkpKXtcclxuXHRcdFx0XHRjYXNlIFwiTWVtb3J5XCI6XHJcblx0XHRcdFx0XHRtZW1vcnkucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcIlN0YXJ0aW5nXCI6XHJcblx0XHRcdFx0Y2FzZSBcIkVuZGluZ1wiOlxyXG5cdFx0XHRcdGNhc2UgXCJUcmF2ZWxpbmdcIjpcclxuXHRcdFx0XHRcdGFjdGl2ZS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwiUGxhblwiOlxyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHR3aXNoLnB1c2goam91cm5leSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdG1lbW9yeS5zb3J0KChhLGIpPT5hLnN0YXJ0ZWRBdC5nZXRUaW1lKCktYi5zdGFydGVkQXQuZ2V0VGltZSgpKVxyXG5cdFx0XHRhY3RpdmUuc29ydCgoYSxiKT0+YS5zdGFydGVkQXQuZ2V0VGltZSgpLWIuc3RhcnRlZEF0LmdldFRpbWUoKSlcclxuXHRcdFx0d2lzaC5zb3J0KChhLGIpPT57XHJcblx0XHRcdFx0aWYoYS5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdFx0aWYoYi5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYS5zdGFydGVkQXQuZ2V0VGltZSgpLWIuc3RhcnRlZEF0LmdldFRpbWUoKVxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdHJldHVybiAtMVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0aWYoYi5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gMVxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdHJldHVybiBhLmNyZWF0ZWRBdC5nZXRUaW1lKCktYi5jcmVhdGVkQXQuZ2V0VGltZSgpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse21lbW9yeSx3aXNoLGFjdGl2ZX0pXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3RhdGVcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBMaWZlPWNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0pKFxyXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaChBQ1RJT04uRkVUQ0goKSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge21lbW9yeSwgd2lzaCwgYWN0aXZlLCBzaG93SGlzdG9yeSwgb25NYXAsZGlzcGF0Y2gscm91dGVyfT10aGlzLnByb3BzXHJcblxyXG5cdFx0bGV0IG1hcD1udWxsLCBtYXBUb2dnbGVyPW51bGxcclxuXHJcblx0XHRpZihhY3RpdmUubGVuZ3RoPjApe1xyXG5cdFx0XHRtYXBUb2dnbGVyPSg8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0IF8yXCJcclxuXHRcdFx0XHRcdFx0XHRtaW5pPXt0cnVlfSBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uVE9HR0xFX01BUCl9PlxyXG5cdFx0XHRcdFx0XHRcdDxJY29uTWFwLz5cclxuXHRcdFx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj4pXHJcblxyXG5cdFx0XHRpZihvbk1hcCl7XHJcblx0XHRcdFx0bWFwPSg8ZGl2PlxyXG5cdFx0XHRcdFx0XHQ8TWFwIGNsYXNzTmFtZT1cInN0aWNreSBmdWxsXCIgcmVmPVwibWFwXCJcclxuXHRcdFx0XHRcdFx0XHRvblJlYWR5PXttYXA9PnRoaXMuc2hvd0pvdXJuZXlPbk1hcChtYXApfVxyXG5cdFx0XHRcdFx0XHRcdHN0eWxlPXt7b3BhY2l0eTpcIjAuNVwiLCB6SW5kZXg6MX19Lz5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIHJpZ2h0IF8yXCI+XHJcblx0XHRcdFx0XHRcdFx0PFNsaWRlciBheGlzPVwieVwiIHJlZj1cIm9wYWNpdHlcIlxyXG5cdFx0XHRcdFx0XHRcdFx0c3R5bGU9e3toZWlnaHQ6MTAwfX1cclxuXHRcdFx0XHRcdFx0XHRcdGRpc2FibGVGb2N1c1JpcHBsZT17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17MC41fVxyXG5cdFx0XHRcdFx0XHRcdFx0c3RlcD17MC4xfVxyXG5cdFx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e2U9PnRoaXMub25DaGFuZ2VNYXBPcGFjaXR5KCl9XHJcblx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PilcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHQ8ZGl2PlxyXG5cdFx0XHR7bWFwfVxyXG5cclxuXHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcblx0XHRcdFx0Y2xhc3NOYW1lPVwiZmxvYXRpbmcgc3RpY2t5IHRvcCByaWdodFwiXHJcblx0XHRcdFx0bWluaT17dHJ1ZX0gb25DbGljaz17ZT0+cm91dGVyLnB1c2goXCIvam91cm5leS9fbmV3XCIpfT5cclxuXHRcdFx0XHQ8SWNvbkFkZC8+XHJcblx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblxyXG5cdFx0XHR7bWFwVG9nZ2xlcn1cclxuXHJcblx0XHRcdDxkaXYgc3R5bGU9e3tiYWNrZ3JvdW5kOlwid2hpdGVcIn19PlxyXG5cdFx0XHRcdHtzaG93SGlzdG9yeSAmJiBtZW1vcnkubGVuZ3RoICYmIChcclxuXHRcdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBhY3RpdmVTdGVwPXstMX0+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdG1lbW9yeS5tYXAoYT0+KDxUaXRsZSBrZXk9e2EubmFtZX0gam91cm5leT17YX0gY29tcGxldGVkPXt0cnVlfS8+KSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdDwvU3RlcHBlcj5cclxuXHRcdFx0XHQpfHxudWxsfVxyXG5cclxuXHRcdFx0XHR7YWN0aXZlLmxlbmd0aCAmJiAoXHJcblx0XHRcdFx0XHRhY3RpdmUubWFwKGpvdXJuZXk9PihcclxuXHRcdFx0XHRcdFx0PEpvdXJuZXkga2V5PXtqb3VybmV5fSBqb3VybmV5PXtqb3VybmV5fSBwdWJsaXNoYWJsZT17dHJ1ZX0vPlxyXG5cdFx0XHRcdFx0KSlcclxuXHRcdFx0XHQpfHxudWxsfVxyXG5cclxuXHRcdFx0XHR7d2lzaC5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfSBsaW5lYXI9e2ZhbHNlfT5cclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHdpc2gubWFwKGE9Pig8VGl0bGUga2V5PXthLm5hbWV9IGNvbXBsZXRlZD17ZmFsc2V9IGpvdXJuZXk9e2F9Lz4pKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdDwvU3RlcHBlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdCl8fCg8RW1wdHkgaWNvbj17PExvZ28vPn0+5p2lLOW8gOWni+S9oOeahOW/g+aXheeoizwvRW1wdHk+KX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdG9uQ2hhbmdlTWFwT3BhY2l0eSgpe1xyXG5cdFx0bGV0IG1hcFN0eWxlPXRoaXMucmVmcy5tYXAucmVmcy5yb290LnN0eWxlXHJcblx0XHRsZXQgb3BhY2l0eT1tYXBTdHlsZS5vcGFjaXR5PXRoaXMucmVmcy5vcGFjaXR5LmdldFZhbHVlKClcclxuXHRcdGlmKG9wYWNpdHk8MC41KVxyXG5cdFx0XHRtYXBTdHlsZS56SW5kZXg9MTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bWFwU3R5bGUuekluZGV4PTM7XHJcblx0fVxyXG5cclxuXHRzaG93Sm91cm5leU9uTWFwKG1hcCl7XHJcblx0XHRjb25zdCB7YWN0aXZlOltqb3VybmV5XX09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3N0YXJ0ZWRBdCwgZW5kZWRBdH09am91cm5leVxyXG5cdFx0Y29uc3Qge01hcmtlcixQb2ludCxQb2ludENvbGxlY3Rpb24sTGFiZWwsU2l6ZX09Qk1hcFxyXG5cdFx0V2F5cG9pbnREQi5nZXQoc3RhcnRlZEF0LCBlbmRlZEF0LFxyXG5cdFx0XHR3YXlwb2ludHM9PntcclxuXHRcdFx0XHRtYXAucmVzZXQoKVxyXG5cdFx0XHRcdGlmKHdheXBvaW50cy5sZW5ndGg9PTApXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0d2F5cG9pbnRzLnNvcnQoKGEsYik9PmEud2hlbi5nZXRUaW1lKCktYi53aGVuLmdldFRpbWUoKSlcclxuXHRcdFx0XHRsZXQgZGF5cz1bd2F5cG9pbnRzWzBdXVxyXG5cdFx0XHRcdGxldCBwb2ludHM9d2F5cG9pbnRzLm1hcCh3YXlwb2ludD0+e1xyXG5cdFx0XHRcdFx0Y29uc3Qge3doZW4sbG9jOnt5OmxhdCx4OmxuZ319PXdheXBvaW50XHJcblx0XHRcdFx0XHRpZighd2hlbi5pc1NhbWVEYXRlKGRheXNbMF0ud2hlbikpXHJcblx0XHRcdFx0XHRcdGRheXMudW5zaGlmdCh3YXlwb2ludClcclxuXHRcdFx0XHRcdHJldHVybiBuZXcgUG9pbnQobG5nLGxhdClcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdGxldCBwYz1uZXcgUG9pbnRDb2xsZWN0aW9uKHBvaW50cywge3NpemU6Qk1BUF9QT0lOVF9TSVpFX1RJTlksc2hhcGU6Qk1BUF9QT0lOVF9TSEFQRV9DSVJDTEUsIGNvbG9yOlwicmVkXCJ9KVxyXG5cdFx0XHRcdG1hcC5hZGRPdmVybGF5KHBjKVxyXG5cdFx0XHRcdG1hcC5hZGRFdmVudExpc3RlbmVyKFwiem9vbWVuZFwiLCAoKT0+e1xyXG5cdFx0XHRcdFx0bGV0IHpvb209bWFwLmdldFpvb20oKVxyXG5cdFx0XHRcdFx0aWYoem9vbTw9MTEpe1xyXG5cdFx0XHRcdFx0XHRwYy5zZXRTdHlsZXMoe3NpemU6Qk1BUF9QT0lOVF9TSVpFX1RJTll9KVxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdHBjLnNldFN0eWxlcyh7c2l6ZTpCTUFQX1BPSU5UX1NJWkVfQklHfSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cclxuXHRcdFx0XHRsZXQgc3RhcnRlZEF0PWpvdXJuZXkuc3RhcnRlZEF0XHJcblx0XHRcdFx0ZGF5cy5mb3JFYWNoKCh7d2hlbixsb2M6e3k6bGF0LHg6bG5nfX0sIGkpPT57XHJcblx0XHRcdFx0XHRsZXQgbWFya2VyPW5ldyBNYXJrZXIobmV3IFBvaW50KGxuZyxsYXQpKVxyXG5cdFx0XHRcdFx0bGV0IGRheU5vPXdoZW4ucmVsYXRpdmUoc3RhcnRlZEF0KSsxXHJcblx0XHRcdFx0XHRsZXQgbGFiZWw9bmV3IExhYmVsKGAke2RheU5vfWApXHJcblx0XHRcdFx0XHRsYWJlbC5zZXRTdHlsZSh7YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIixib3JkZXI6XCIwcHhcIn0pXHJcblx0XHRcdFx0XHRsYWJlbC5zZXRPZmZzZXQobmV3IFNpemUoZGF5Tm8+OSA/IDIgOiA1LCAyKSlcclxuXHRcdFx0XHRcdG1hcmtlci5zZXRMYWJlbChsYWJlbClcclxuXHRcdFx0XHRcdG1hcC5hZGRPdmVybGF5KG1hcmtlcilcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0bGV0IGRlbHRhPU1hdGgucm91bmQocG9pbnRzLmxlbmd0aC81KVxyXG5cdFx0XHRcdG1hcC5zZXRWaWV3cG9ydChwb2ludHMuZmlsdGVyKChhLGkpPT5pJWRlbHRhPT0wKSlcclxuXHRcdFx0fSlcclxuXHJcblx0fVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihMaWZlLHtBQ1RJT04sIFJFRFVDRVJ9KSJdfQ==