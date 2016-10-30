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
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Life);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Life.__proto__ || Object.getPrototypeOf(Life)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
						"\u6765,\u5F00\u59CB\u4F60\u7684\u5FC3\u65C5\u7A0B"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWZlLmpzIl0sIm5hbWVzIjpbIkVtcHR5IiwiUGhvdG8iLCJMaWZlIiwic3RhdGUiLCJtZW1vcnkiLCJ3aXNoIiwiYWN0aXZlIiwic2hvd0hpc3RvcnkiLCJvbk1hcCIsImZpbmQiLCJmZXRjaCIsInNldFN0YXRlIiwiZ3JvdXAiLCJqb3VybmV5cyIsIm1hcCIsIm1hcFRvZ2dsZXIiLCJsZW5ndGgiLCJ0b2dnbGVNYXAiLCJzaG93Sm91cm5leU9uTWFwIiwib3BhY2l0eSIsInpJbmRleCIsImhlaWdodCIsIm9uQ2hhbmdlTWFwT3BhY2l0eSIsImNvbnRleHQiLCJyb3V0ZXIiLCJwdXNoIiwiYmFja2dyb3VuZCIsImEiLCJuYW1lIiwiam91cm5leSIsIm1hcFN0eWxlIiwicmVmcyIsInJvb3QiLCJzdHlsZSIsImdldFZhbHVlIiwic3RhcnRlZEF0IiwiZW5kZWRBdCIsIkJNYXAiLCJNYXJrZXIiLCJQb2ludCIsIlBvaW50Q29sbGVjdGlvbiIsIkxhYmVsIiwiU2l6ZSIsImdldCIsInJlc2V0Iiwid2F5cG9pbnRzIiwic29ydCIsImIiLCJ3aGVuIiwiZ2V0VGltZSIsImRheXMiLCJwb2ludHMiLCJ3YXlwb2ludCIsImxvYyIsImxhdCIsInkiLCJsbmciLCJ4IiwiaXNTYW1lRGF0ZSIsInVuc2hpZnQiLCJwYyIsInNpemUiLCJCTUFQX1BPSU5UX1NJWkVfVElOWSIsInNoYXBlIiwiQk1BUF9QT0lOVF9TSEFQRV9DSVJDTEUiLCJjb2xvciIsImFkZE92ZXJsYXkiLCJhZGRFdmVudExpc3RlbmVyIiwiem9vbSIsImdldFpvb20iLCJzZXRTdHlsZXMiLCJCTUFQX1BPSU5UX1NJWkVfQklHIiwiZm9yRWFjaCIsImkiLCJtYXJrZXIiLCJkYXlObyIsInJlbGF0aXZlIiwibGFiZWwiLCJzZXRTdHlsZSIsImJhY2tncm91bmRDb2xvciIsImJvcmRlciIsInNldE9mZnNldCIsInNldExhYmVsIiwiZGVsdGEiLCJNYXRoIiwicm91bmQiLCJzZXRWaWV3cG9ydCIsImZpbHRlciIsIm5vdyIsIkRhdGUiLCJnZXRTdGF0ZSIsImNyZWF0ZWRBdCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR09BLEssZUFBQUEsSztJQUFPQyxLLGVBQUFBLEs7O0lBRU9DLEk7Ozs7Ozs7Ozs7Ozs7O2dMQUNwQkMsSyxHQUFNO0FBQ0xDLFdBQU8sRUFERjtBQUVMQyxTQUFLLEVBRkE7QUFHTEMsV0FBTyxFQUhGO0FBSUxDLGdCQUFZLElBSlA7QUFLTEMsVUFBTTtBQUxELEc7Ozs7O3NDQU9hO0FBQUE7O0FBQ2xCLGVBQVVDLElBQVYsR0FDRUMsS0FERixDQUNRO0FBQUEsV0FBVSxPQUFLQyxRQUFMLENBQWMsT0FBS0MsS0FBTCxDQUFXQyxRQUFYLENBQWQsQ0FBVjtBQUFBLElBRFI7QUFFQTs7OzJCQUVPO0FBQUE7O0FBQUEsZ0JBQzBDLEtBQUtWLEtBRC9DO0FBQUEsT0FDQUMsTUFEQSxVQUNBQSxNQURBO0FBQUEsT0FDUUMsSUFEUixVQUNRQSxJQURSO0FBQUEsT0FDY0MsTUFEZCxVQUNjQSxNQURkO0FBQUEsT0FDc0JDLFdBRHRCLFVBQ3NCQSxXQUR0QjtBQUFBLE9BQ21DQyxLQURuQyxVQUNtQ0EsS0FEbkM7OztBQUdQLE9BQUlNLE1BQUksSUFBUjtBQUFBLE9BQWNDLGFBQVcsSUFBekI7O0FBRUEsT0FBR1QsT0FBT1UsTUFBUCxHQUFjLENBQWpCLEVBQW1CO0FBQ2xCRCxpQkFBWTtBQUFBO0FBQUE7QUFDUixpQkFBVSxxQkFERjtBQUVSLFlBQU0sSUFGRSxFQUVJLFNBQVM7QUFBQSxjQUFHLE9BQUtFLFNBQUwsRUFBSDtBQUFBLE9BRmI7QUFHUjtBQUhRLEtBQVo7O0FBTUEsUUFBR1QsS0FBSCxFQUFTO0FBQ1JNLFdBQUs7QUFBQTtBQUFBO0FB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QUFDLENBQVI7QUFDQTtBQUNELEtBTkQsTUFNSztBQUNKLFNBQUdGLEVBQUVaLFNBQUwsRUFBZTtBQUNkLGFBQU8sQ0FBUDtBQUNBLE1BRkQsTUFFSztBQUNKLGFBQU9SLEVBQUVnRSxTQUFGLENBQVkxQyxPQUFaLEtBQXNCRixFQUFFNEMsU0FBRixDQUFZMUMsT0FBWixFQUE3QjtBQUNBO0FBQ0Q7QUFDRCxJQWREO0FBZUEsVUFBTyxFQUFDN0MsY0FBRCxFQUFTQyxVQUFULEVBQWVDLGNBQWYsRUFBUDtBQUNBOzs7Ozs7QUFuTG1CSixJLENBcUxiMEYsWSxHQUFhO0FBQ25CcEUsU0FBUSxpQkFBVXFFO0FBREMsQztrQkFyTEEzRixJIiwiZmlsZSI6ImxpZmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7VUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLCBGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b24sIEljb25CdXR0b24sIERpYWxvZywgU2xpZGVyLCBEcmF3ZXJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCB7U3RlcCxTdGVwcGVyLFN0ZXBMYWJlbCxTdGVwQ29udGVudH0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcidcclxuXHJcbmltcG9ydCBMb2dvIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL2RpcmVjdGlvbnMtd2FsaydcclxuXHJcbmltcG9ydCBJY29uTW9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLWhvcml6J1xyXG5pbXBvcnQgSWNvbkFkZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQnXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQiwgRm9vdHByaW50IGFzIEZvb3RwcmludERCLCBXYXlwb2ludCBhcyBXYXlwb2ludERCfSBmcm9tIFwiLi9kYlwiXHJcbmltcG9ydCBDaGlwcGVyIGZyb20gXCIuL2NvbXBvbmVudHMvY2hpcHBlclwiXHJcbmltcG9ydCBKb3VybmV5LCB7VGl0bGV9IGZyb20gXCIuL2NvbXBvbmVudHMvam91cm5leVwiXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vY29tcG9uZW50cy9tYXBcIlxyXG5pbXBvcnQgTG9jYXRpb25EQiBmcm9tIFwiLi9kYi9sb2NhdGlvblwiXHJcblxyXG5cclxuY29uc3Qge0VtcHR5LCBQaG90b309VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpZmUgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0bWVtb3J5OltdLFxyXG5cdFx0d2lzaDpbXSxcclxuXHRcdGFjdGl2ZTpbXSxcclxuXHRcdHNob3dIaXN0b3J5OnRydWUsXHJcblx0XHRvbk1hcDpmYWxzZVxyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Sm91cm5leURCLmZpbmQoKVxyXG5cdFx0XHQuZmV0Y2goam91cm5leXM9PnRoaXMuc2V0U3RhdGUodGhpcy5ncm91cChqb3VybmV5cykpKVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7bWVtb3J5LCB3aXNoLCBhY3RpdmUsIHNob3dIaXN0b3J5LCBvbk1hcH09dGhpcy5zdGF0ZVxyXG5cclxuXHRcdGxldCBtYXA9bnVsbCwgbWFwVG9nZ2xlcj1udWxsXHJcblxyXG5cdFx0aWYoYWN0aXZlLmxlbmd0aD4wKXtcclxuXHRcdFx0bWFwVG9nZ2xlcj0oPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcblx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodCBfMlwiXHJcblx0XHRcdFx0XHRcdFx0bWluaT17dHJ1ZX0gb25DbGljaz17ZT0+dGhpcy50b2dnbGVNYXAoKX0+XHJcblx0XHRcdFx0XHRcdFx0PEljb25NYXAvPlxyXG5cdFx0XHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPilcclxuXHJcblx0XHRcdGlmKG9uTWFwKXtcclxuXHRcdFx0XHRtYXA9KDxkaXY+XHJcblx0XHRcdFx0XHRcdDxNYXAgY2xhc3NOYW1lPVwic3RpY2t5IGZ1bGxcIiByZWY9XCJtYXBcIlxyXG5cdFx0XHRcdFx0XHRcdG9uUmVhZHk9e21hcD0+dGhpcy5zaG93Sm91cm5leU9uTWFwKG1hcCl9XHJcblx0XHRcdFx0XHRcdFx0c3R5bGU9e3tvcGFjaXR5OlwiMC41XCIsIHpJbmRleDoxfX0vPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gcmlnaHQgXzJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8U2xpZGVyIGF4aXM9XCJ5XCIgcmVmPVwib3BhY2l0eVwiXHJcblx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e2hlaWdodDoxMDB9fVxyXG5cdFx0XHRcdFx0XHRcdFx0ZGlzYWJsZUZvY3VzUmlwcGxlPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXswLjV9XHJcblx0XHRcdFx0XHRcdFx0XHRzdGVwPXswLjF9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNoYW5nZT17ZT0+dGhpcy5vbkNoYW5nZU1hcE9wYWNpdHkoKX1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHttYXB9XHJcblxyXG5cdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuXHRcdFx0XHRjbGFzc05hbWU9XCJmbG9hdGluZyBzdGlja3kgdG9wIHJpZ2h0XCJcclxuXHRcdFx0XHRtaW5pPXt0cnVlfSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJqb3VybmV5L19uZXdcIil9PlxyXG5cdFx0XHRcdDxJY29uQWRkLz5cclxuXHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHJcblx0XHRcdHttYXBUb2dnbGVyfVxyXG5cclxuXHRcdFx0PGRpdiBzdHlsZT17e2JhY2tncm91bmQ6XCJ3aGl0ZVwifX0+XHJcblx0XHRcdFx0e3Nob3dIaXN0b3J5ICYmIG1lbW9yeS5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bWVtb3J5Lm1hcChhPT4oPFRpdGxlIGtleT17YS5uYW1lfSBqb3VybmV5PXthfSBjb21wbGV0ZWQ9e3RydWV9Lz4pKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHRcdCl8fG51bGx9XHJcblxyXG5cdFx0XHRcdHthY3RpdmUubGVuZ3RoICYmIChcclxuXHRcdFx0XHRcdGFjdGl2ZS5tYXAoam91cm5leT0+KFxyXG5cdFx0XHRcdFx0XHQ8Sm91cm5leSBrZXk9e2pvdXJuZXl9IGpvdXJuZXk9e2pvdXJuZXl9IHB1Ymxpc2hhYmxlPXt0cnVlfS8+XHJcblx0XHRcdFx0XHQpKVxyXG5cdFx0XHRcdCl8fG51bGx9XHJcblxyXG5cdFx0XHRcdHt3aXNoLmxlbmd0aCAmJiAoXHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgYWN0aXZlU3RlcD17LTF9IGxpbmVhcj17ZmFsc2V9PlxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0d2lzaC5tYXAoYT0+KDxUaXRsZSBrZXk9e2EubmFtZX0gY29tcGxldGVkPXtmYWxzZX0gam91cm5leT17YX0vPikpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0KXx8KDxFbXB0eSBpY29uPXs8TG9nby8+fT7mnaUs5byA5aeL5L2g55qE5b+D5peF56iLPC9FbXB0eT4pfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0b25DaGFuZ2VNYXBPcGFjaXR5KCl7XHJcblx0XHRsZXQgbWFwU3R5bGU9dGhpcy5yZWZzLm1hcC5yZWZzLnJvb3Quc3R5bGVcclxuXHRcdGxldCBvcGFjaXR5PW1hcFN0eWxlLm9wYWNpdHk9dGhpcy5yZWZzLm9wYWNpdHkuZ2V0VmFsdWUoKVxyXG5cdFx0aWYob3BhY2l0eTwwLjUpXHJcblx0XHRcdG1hcFN0eWxlLnpJbmRleD0xO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRtYXBTdHlsZS56SW5kZXg9MztcclxuXHR9XHJcblxyXG5cdHRvZ2dsZU1hcCgpe1xyXG5cdFx0Y29uc3Qge29uTWFwfT10aGlzLnN0YXRlXHJcblx0XHR0aGlzLnNldFN0YXRlKHtvbk1hcDohb25NYXB9KVxyXG5cdH1cclxuXHJcblx0c2hvd0pvdXJuZXlPbk1hcChtYXApe1xyXG5cdFx0Y29uc3Qge2FjdGl2ZTpbam91cm5leV19PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsIGVuZGVkQXR9PWpvdXJuZXlcclxuXHRcdGNvbnN0IHtNYXJrZXIsUG9pbnQsUG9pbnRDb2xsZWN0aW9uLExhYmVsLFNpemV9PUJNYXBcclxuXHRcdFdheXBvaW50REIuZ2V0KHN0YXJ0ZWRBdCwgZW5kZWRBdCxcclxuXHRcdFx0d2F5cG9pbnRzPT57XHJcblx0XHRcdFx0bWFwLnJlc2V0KClcclxuXHRcdFx0XHRpZih3YXlwb2ludHMubGVuZ3RoPT0wKVxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdHdheXBvaW50cy5zb3J0KChhLGIpPT5hLndoZW4uZ2V0VGltZSgpLWIud2hlbi5nZXRUaW1lKCkpXHJcblx0XHRcdFx0bGV0IGRheXM9W3dheXBvaW50c1swXV1cclxuXHRcdFx0XHRsZXQgcG9pbnRzPXdheXBvaW50cy5tYXAod2F5cG9pbnQ9PntcclxuXHRcdFx0XHRcdGNvbnN0IHt3aGVuLGxvYzp7eTpsYXQseDpsbmd9fT13YXlwb2ludFxyXG5cdFx0XHRcdFx0aWYoIXdoZW4uaXNTYW1lRGF0ZShkYXlzWzBdLndoZW4pKVxyXG5cdFx0XHRcdFx0XHRkYXlzLnVuc2hpZnQod2F5cG9pbnQpXHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFBvaW50KGxuZyxsYXQpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRsZXQgcGM9bmV3IFBvaW50Q29sbGVjdGlvbihwb2ludHMsIHtzaXplOkJNQVBfUE9JTlRfU0laRV9USU5ZLHNoYXBlOkJNQVBfUE9JTlRfU0hBUEVfQ0lSQ0xFLCBjb2xvcjpcInJlZFwifSlcclxuXHRcdFx0XHRtYXAuYWRkT3ZlcmxheShwYylcclxuXHRcdFx0XHRtYXAuYWRkRXZlbnRMaXN0ZW5lcihcInpvb21lbmRcIiwgKCk9PntcclxuXHRcdFx0XHRcdGxldCB6b29tPW1hcC5nZXRab29tKClcclxuXHRcdFx0XHRcdGlmKHpvb208PTExKXtcclxuXHRcdFx0XHRcdFx0cGMuc2V0U3R5bGVzKHtzaXplOkJNQVBfUE9JTlRfU0laRV9USU5ZfSlcclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRwYy5zZXRTdHlsZXMoe3NpemU6Qk1BUF9QT0lOVF9TSVpFX0JJR30pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0bGV0IHN0YXJ0ZWRBdD1qb3VybmV5LnN0YXJ0ZWRBdFxyXG5cdFx0XHRcdGRheXMuZm9yRWFjaCgoe3doZW4sbG9jOnt5OmxhdCx4OmxuZ319LCBpKT0+e1xyXG5cdFx0XHRcdFx0bGV0IG1hcmtlcj1uZXcgTWFya2VyKG5ldyBQb2ludChsbmcsbGF0KSlcclxuXHRcdFx0XHRcdGxldCBkYXlObz13aGVuLnJlbGF0aXZlKHN0YXJ0ZWRBdCkrMVxyXG5cdFx0XHRcdFx0bGV0IGxhYmVsPW5ldyBMYWJlbChgJHtkYXlOb31gKVxyXG5cdFx0XHRcdFx0bGFiZWwuc2V0U3R5bGUoe2JhY2tncm91bmRDb2xvcjpcInRyYW5zcGFyZW50XCIsYm9yZGVyOlwiMHB4XCJ9KVxyXG5cdFx0XHRcdFx0bGFiZWwuc2V0T2Zmc2V0KG5ldyBTaXplKGRheU5vPjkgPyAyIDogNSwgMikpXHJcblx0XHRcdFx0XHRtYXJrZXIuc2V0TGFiZWwobGFiZWwpXHJcblx0XHRcdFx0XHRtYXAuYWRkT3ZlcmxheShtYXJrZXIpXHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGxldCBkZWx0YT1NYXRoLnJvdW5kKHBvaW50cy5sZW5ndGgvNSlcclxuXHRcdFx0XHRtYXAuc2V0Vmlld3BvcnQocG9pbnRzLmZpbHRlcigoYSxpKT0+aSVkZWx0YT09MCkpXHJcblx0XHRcdH0pXHJcblxyXG5cdH1cclxuXHJcblx0Z3JvdXAoam91cm5leXMpe1xyXG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRsZXQgbWVtb3J5PVtdLCB3aXNoPVtdLCBhY3RpdmU9W11cclxuXHRcdGpvdXJuZXlzLmZvckVhY2goam91cm5leT0+e1xyXG5cdFx0XHRzd2l0Y2goSm91cm5leURCLmdldFN0YXRlKGpvdXJuZXkpKXtcclxuXHRcdFx0Y2FzZSBcIk1lbW9yeVwiOlxyXG5cdFx0XHRcdG1lbW9yeS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJTdGFydGluZ1wiOlxyXG5cdFx0XHRjYXNlIFwiRW5kaW5nXCI6XHJcblx0XHRcdGNhc2UgXCJUcmF2ZWxpbmdcIjpcclxuXHRcdFx0XHRhY3RpdmUucHVzaChqb3VybmV5KVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwiUGxhblwiOlxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHdpc2gucHVzaChqb3VybmV5KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0bWVtb3J5LnNvcnQoKGEsYik9PmEuc3RhcnRlZEF0LmdldFRpbWUoKS1iLnN0YXJ0ZWRBdC5nZXRUaW1lKCkpXHJcblx0XHRhY3RpdmUuc29ydCgoYSxiKT0+YS5zdGFydGVkQXQuZ2V0VGltZSgpLWIuc3RhcnRlZEF0LmdldFRpbWUoKSlcclxuXHRcdHdpc2guc29ydCgoYSxiKT0+e1xyXG5cdFx0XHRpZihhLnN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0aWYoYi5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGEuc3RhcnRlZEF0LmdldFRpbWUoKS1iLnN0YXJ0ZWRBdC5nZXRUaW1lKClcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiAtMVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0aWYoYi5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIDFcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiBhLmNyZWF0ZWRBdC5nZXRUaW1lKCktYi5jcmVhdGVkQXQuZ2V0VGltZSgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHttZW1vcnksIHdpc2gsIGFjdGl2ZX1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcbiJdfQ==