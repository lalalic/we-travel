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

var _class = function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, _class);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			memory: [],
			wish: [],
			active: [],
			showHistory: true,
			onMap: false
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(_class, [{
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
					map = _react2.default.createElement(_map4.default, { className: "sticky top left",
						onReady: function onReady(map) {
							return _this3.showJourneyOnMap(map);
						},
						style: { zIndex: 3, opacity: "0.5", width: 940, height: window.innerHeight - 50 - 10 } });
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
				map.addOverlay(new PointCollection(points, { size: BMAP_POINT_SIZE_TINY, shape: BMAP_POINT_SHAPE_STAR, color: "red" }));

				var startedAt = journey.startedAt;
				var current = void 0,
				    onClick = function onClick(e) {
					current && current.setAnimation(null);
					current = e.target;
					current.setAnimation(BMAP_ANIMATION_BOUNCE);
				};
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
					marker.addEventListener("click", onClick);
					if (i == 0) {
						current = marker;
						marker.setAnimation(BMAP_ANIMATION_BOUNCE);
					}
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

	return _class;
}(_react.Component);

_class.contextTypes = {
	router: _react.PropTypes.object
};
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUQsRUFBUyxVQUFULEVBQWUsY0FBZixFQUFQLENBbkNjOzs7Ozs7O09Bc0NSLGVBQWE7QUFDbkIsU0FBUSxpQkFBVSxNQUFWIiwiZmlsZSI6ImxpZmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7VUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLCBGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b24sIEljb25CdXR0b24sIERpYWxvZ30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtTdGVwLFN0ZXBwZXIsU3RlcExhYmVsLFN0ZXBDb250ZW50fSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xyXG5cclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5cclxuaW1wb3J0IEljb25Nb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtaG9yaXonXHJcbmltcG9ydCBJY29uQWRkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZCdcclxuaW1wb3J0IEljb25NYXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL21hcFwiXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBGb290cHJpbnQgYXMgRm9vdHByaW50REJ9IGZyb20gXCIuL2RiXCJcclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jaGlwcGVyXCJcclxuaW1wb3J0IEpvdXJuZXksIHtUaXRsZX0gZnJvbSBcIi4vY29tcG9uZW50cy9qb3VybmV5XCJcclxuaW1wb3J0IE1hcCBmcm9tIFwiLi9jb21wb25lbnRzL21hcFwiXHJcbmltcG9ydCBMb2NhdGlvbkRCIGZyb20gXCIuL2RiL2xvY2F0aW9uXCJcclxuXHJcblxyXG5jb25zdCB7RW1wdHksIFBob3RvfT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0bWVtb3J5OltdLFxyXG5cdFx0d2lzaDpbXSxcclxuXHRcdGFjdGl2ZTpbXSxcclxuXHRcdHNob3dIaXN0b3J5OnRydWUsXHJcblx0XHRvbk1hcDpmYWxzZVxyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Sm91cm5leURCLmZpbmQoKVxyXG5cdFx0XHQuZmV0Y2goam91cm5leXM9PnRoaXMuc2V0U3RhdGUodGhpcy5ncm91cChqb3VybmV5cykpKVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7bWVtb3J5LCB3aXNoLCBhY3RpdmUsIHNob3dIaXN0b3J5LCBvbk1hcH09dGhpcy5zdGF0ZVxyXG5cclxuXHRcdGxldCBtYXA9bnVsbCwgbWFwVG9nZ2xlcj1udWxsXHJcblxyXG5cdFx0aWYoYWN0aXZlLmxlbmd0aD4wKXtcclxuXHRcdFx0bWFwVG9nZ2xlcj0oPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodCBfMlwiXHJcblx0XHRcdFx0XHRcdFx0bWluaT17dHJ1ZX0gb25DbGljaz17ZT0+dGhpcy50b2dnbGVNYXAoKX0+XHJcblx0XHRcdFx0XHRcdFx0PEljb25NYXAvPlxyXG5cdFx0XHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPilcclxuXHJcblx0XHRcdGlmKG9uTWFwKXtcclxuXHRcdFx0XHRtYXA9KDxNYXAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCBsZWZ0XCJcclxuXHRcdFx0XHRcdFx0b25SZWFkeT17bWFwPT50aGlzLnNob3dKb3VybmV5T25NYXAobWFwKX1cclxuXHRcdFx0XHRcdFx0c3R5bGU9e3t6SW5kZXg6Mywgb3BhY2l0eTpcIjAuNVwiLCB3aWR0aDo5NDAsIGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHQtNTAtMTB9fS8+KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHttYXB9XHJcblxyXG5cdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuXHRcdFx0XHRjbGFzc05hbWU9XCJmbG9hdGluZyBzdGlja3kgdG9wIHJpZ2h0XCJcclxuXHRcdFx0XHRtaW5pPXt0cnVlfSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJqb3VybmV5L19uZXdcIil9PlxyXG5cdFx0XHRcdDxJY29uQWRkLz5cclxuXHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHJcblx0XHRcdHttYXBUb2dnbGVyfVxyXG5cclxuXHRcdFx0PGRpdiBzdHlsZT17e2JhY2tncm91bmQ6XCJ3aGl0ZVwifX0+XHJcblx0XHRcdFx0e3Nob3dIaXN0b3J5ICYmIG1lbW9yeS5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bWVtb3J5Lm1hcChhPT4oPFRpdGxlIGtleT17YS5uYW1lfSBqb3VybmV5PXthfSBjb21wbGV0ZWQ9e3RydWV9Lz4pKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHRcdCl8fG51bGx9XHJcblxyXG5cdFx0XHRcdHthY3RpdmUubGVuZ3RoICYmIChcclxuXHRcdFx0XHRcdGFjdGl2ZS5tYXAoam91cm5leT0+KFxyXG5cdFx0XHRcdFx0XHQ8Sm91cm5leSBrZXk9e2pvdXJuZXl9IGpvdXJuZXk9e2pvdXJuZXl9Lz5cclxuXHRcdFx0XHRcdCkpXHJcblx0XHRcdFx0KXx8bnVsbH1cclxuXHJcblx0XHRcdFx0e3dpc2gubGVuZ3RoICYmIChcclxuXHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBhY3RpdmVTdGVwPXstMX0gbGluZWFyPXtmYWxzZX0+XHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHR3aXNoLm1hcChhPT4oPFRpdGxlIGtleT17YS5uYW1lfSBjb21wbGV0ZWQ9e2ZhbHNlfSBqb3VybmV5PXthfS8+KSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQpfHwoPEVtcHR5IGljb249ezxMb2dvLz59PuadpSzlvIDlp4vkvaDnmoTlv4Pml4XnqIs8L0VtcHR5Pil9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHR0b2dnbGVNYXAoKXtcclxuXHRcdGNvbnN0IHtvbk1hcH09dGhpcy5zdGF0ZVxyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7b25NYXA6IW9uTWFwfSlcclxuXHR9XHJcblxyXG5cdHNob3dKb3VybmV5T25NYXAobWFwKXtcclxuXHRcdGNvbnN0IHthY3RpdmU6W2pvdXJuZXldfT10aGlzLnN0YXRlXHJcblx0XHRjb25zdCB7TWFya2VyLFBvaW50LFBvaW50Q29sbGVjdGlvbixMYWJlbCxTaXplfT1CTWFwXHJcblx0XHRMb2NhdGlvbkRCLmdldCgpXHJcblx0XHRcdC50aGVuKHdheXBvaW50cz0+e1xyXG5cdFx0XHRcdGlmKHdheXBvaW50cy5sZW5ndGg9PTApXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0d2F5cG9pbnRzLnNvcnQoKGEsYik9PmEud2hlbi1iLndoZW4pXHJcblx0XHRcdFx0bGV0IGRheXM9W3dheXBvaW50c1swXV0sIGRheUxvbmc9MjQqNjAqNjAqMTAwMFxyXG5cdFx0XHRcdGxldCBwb2ludHM9d2F5cG9pbnRzLm1hcCh3YXlwb2ludD0+e1xyXG5cdFx0XHRcdFx0Y29uc3Qge3doZW4sbGF0LGxuZ309d2F5cG9pbnRcclxuXHRcdFx0XHRcdGlmKHdoZW4tZGF5c1tkYXlzLmxlbmd0aC0xXS53aGVuPmRheUxvbmcpXHJcblx0XHRcdFx0XHRcdGRheXMucHVzaCh3YXlwb2ludClcclxuXHRcdFx0XHRcdHJldHVybiBuZXcgUG9pbnQobG5nLGxhdClcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdG1hcC5hZGRPdmVybGF5KG5ldyBQb2ludENvbGxlY3Rpb24ocG9pbnRzLCB7c2l6ZTpCTUFQX1BPSU5UX1NJWkVfVElOWSxzaGFwZTpCTUFQX1BPSU5UX1NIQVBFX1NUQVIsIGNvbG9yOlwicmVkXCJ9KSlcclxuXHJcblx0XHRcdFx0bGV0IHN0YXJ0ZWRBdD1qb3VybmV5LnN0YXJ0ZWRBdFxyXG5cdFx0XHRcdGxldCBjdXJyZW50LCBvbkNsaWNrPWU9PntcclxuXHRcdFx0XHRcdGN1cnJlbnQgJiYgY3VycmVudC5zZXRBbmltYXRpb24obnVsbCk7XHJcblx0XHRcdFx0XHRjdXJyZW50PWUudGFyZ2V0XHJcblx0XHRcdFx0XHRjdXJyZW50LnNldEFuaW1hdGlvbihCTUFQX0FOSU1BVElPTl9CT1VOQ0UpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGRheXMuZm9yRWFjaCgoe3doZW4sbGF0LGxuZ30sIGkpPT57XHJcblx0XHRcdFx0XHRsZXQgbWFya2VyPW5ldyBNYXJrZXIobmV3IFBvaW50KGxuZyxsYXQpKVxyXG5cdFx0XHRcdFx0bGV0IGRheU5vPW5ldyBEYXRlKHdoZW4pLnJlbGF0aXZlKHN0YXJ0ZWRBdCkrMVxyXG5cdFx0XHRcdFx0bGV0IGxhYmVsPW5ldyBMYWJlbChgJHtkYXlOb31gKVxyXG5cdFx0XHRcdFx0bGFiZWwuc2V0U3R5bGUoe2JhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsYm9yZGVyOlwiMHB4XCJ9KVxyXG5cdFx0XHRcdFx0bGFiZWwuc2V0T2Zmc2V0KG5ldyBTaXplKGRheU5vPjkgPyAyIDogNSwgMikpXHJcblx0XHRcdFx0XHRtYXJrZXIuc2V0TGFiZWwobGFiZWwpXHJcblx0XHRcdFx0XHRtYXAuYWRkT3ZlcmxheShtYXJrZXIpXHJcblx0XHRcdFx0XHRtYXJrZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xpY2spXHJcblx0XHRcdFx0XHRpZihpPT0wKXtcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1tYXJrZXJcclxuXHRcdFx0XHRcdFx0bWFya2VyLnNldEFuaW1hdGlvbihCTUFQX0FOSU1BVElPTl9CT1VOQ0UpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGxldCBkZWx0YT1NYXRoLnJvdW5kKHBvaW50cy5sZW5ndGgvNSlcclxuXHRcdFx0XHRtYXAuc2V0Vmlld3BvcnQocG9pbnRzLmZpbHRlcigoYSxpKT0+aSVkZWx0YT09MCkpXHJcblx0XHRcdH0pXHJcblx0fVxyXG5cclxuXHRncm91cChqb3VybmV5cyl7XHJcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRcdGxldCBtZW1vcnk9W10sIHdpc2g9W10sIGFjdGl2ZT1bXVxyXG5cdFx0am91cm5leXMuZm9yRWFjaChqb3VybmV5PT57XHJcblx0XHRcdHN3aXRjaChKb3VybmV5REIuZ2V0U3RhdGUoam91cm5leSkpe1xyXG5cdFx0XHRjYXNlIFwiTWVtb3J5XCI6XHJcblx0XHRcdFx0bWVtb3J5LnB1c2goam91cm5leSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcIlN0YXJ0aW5nXCI6XHJcblx0XHRcdGNhc2UgXCJFbmRpbmdcIjpcclxuXHRcdFx0Y2FzZSBcIlRyYXZlbGluZ1wiOlxyXG5cdFx0XHRcdGFjdGl2ZS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJQbGFuXCI6XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0d2lzaC5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRtZW1vcnkuc29ydCgoYSxiKT0+YS5zdGFydGVkQXQuZ2V0VGltZSgpLWIuc3RhcnRlZEF0LmdldFRpbWUoKSlcclxuXHRcdGFjdGl2ZS5zb3J0KChhLGIpPT5hLnN0YXJ0ZWRBdC5nZXRUaW1lKCktYi5zdGFydGVkQXQuZ2V0VGltZSgpKVxyXG5cdFx0d2lzaC5zb3J0KChhLGIpPT57XHJcblx0XHRcdGlmKGEuc3RhcnRlZEF0KXtcclxuXHRcdFx0XHRpZihiLnN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gYS5zdGFydGVkQXQuZ2V0VGltZSgpLWIuc3RhcnRlZEF0LmdldFRpbWUoKVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIC0xXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRpZihiLnN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gMVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIGEuY3JlYXRlZEF0LmdldFRpbWUoKS1iLmNyZWF0ZWRBdC5nZXRUaW1lKClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRyZXR1cm4ge21lbW9yeSwgd2lzaCwgYWN0aXZlfVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuIl19