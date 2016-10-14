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
						className: "floating sticky top right _2",
						mini: true, onClick: function onClick(e) {
							return _this3.toggleMap();
						} },
					_react2.default.createElement(_map2.default, null)
				);

				if (onMap) {
					map = _react2.default.createElement(_map4.default, { className: "floating sticky top left",
						onReady: function onReady(map) {
							return _this3.showJourneyOnMap(map);
						},
						style: { opacity: "0.5", width: 940, height: window.innerHeight - 50 - 10 } });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUdPO0lBQU87Ozs7Ozs7Ozs7Ozs7Ozs7a01BR2IsUUFBTTtBQUNMLFdBQU8sRUFBUDtBQUNBLFNBQUssRUFBTDtBQUNBLFdBQU8sRUFBUDtBQUNBLGdCQUFZLElBQVo7QUFDQSxVQUFNLEtBQU47Ozs7OztzQ0FFa0I7OztBQUNsQixlQUFVLElBQVYsR0FDRSxLQURGLENBQ1E7V0FBVSxPQUFLLFFBQUwsQ0FBYyxPQUFLLEtBQUwsQ0FBVyxRQUFYLENBQWQ7SUFBVixDQURSLENBRGtCOzs7OzJCQUtYOzs7Z0JBQzBDLEtBQUssS0FBTCxDQUQxQztPQUNBLHVCQURBO09BQ1EsbUJBRFI7T0FDYyx1QkFEZDtPQUNzQixpQ0FEdEI7T0FDbUMscUJBRG5DOzs7QUFHUCxPQUFJLE1BQUksSUFBSjtPQUFVLGFBQVcsSUFBWCxDQUhQOztBQUtQLE9BQUcsT0FBTyxNQUFQLEdBQWMsQ0FBZCxFQUFnQjtBQUNsQixpQkFBWTs7O0FBQ1IsaUJBQVUsOEJBQVY7QUFDQSxZQUFNLElBQU4sRUFBWSxTQUFTO2NBQUcsT0FBSyxTQUFMO09BQUgsRUFGYjtLQUdSLGtEQUhRO0tBQVosQ0FEa0I7O0FBT2xCLFFBQUcsS0FBSCxFQUFTO0FBQ1IsV0FBSywrQ0FBSyxXQUFVLDBCQUFWO0FBQ1IsZUFBUztjQUFLLE9BQUssZ0JBQUwsQ0FBc0IsR0FBdEI7T0FBTDtBQUNULGFBQU8sRUFBQyxTQUFRLEtBQVIsRUFBZSxPQUFNLEdBQU4sRUFBVyxRQUFPLE9BQU8sV0FBUCxHQUFtQixFQUFuQixHQUFzQixFQUF0QixFQUF6QyxFQUZHLENBQUwsQ0FEUTtLQUFUO0lBUEQ7O0FBY0EsVUFDQTs7O0lBQ0UsR0FERjtJQUdDOzs7QUFDQyxpQkFBVSwyQkFBVjtBQUNBLFlBQU0sSUFBTixFQUFZLFNBQVM7Y0FBRyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLGNBQXpCO09BQUgsRUFGdEI7S0FHQyxrREFIRDtLQUhEO0lBU0UsVUFURjtJQVdDOztPQUFLLE9BQU8sRUFBQyxRQUFPLENBQVAsRUFBVSxZQUFXLE9BQVgsRUFBbEIsRUFBTDtLQUNFLGVBQWUsT0FBTyxNQUFQLElBQ2Y7O1FBQVMsYUFBWSxVQUFaLEVBQXVCLFlBQVksQ0FBQyxDQUFELEVBQTVDO01BRUMsT0FBTyxHQUFQLENBQVc7Y0FBSSxnREFBTyxLQUFLLEVBQUUsSUFBRixFQUFRLFNBQVMsQ0FBVCxFQUFZLFdBQVcsSUFBWCxFQUFoQztPQUFKLENBRlo7TUFEQSxJQU1FLElBTkY7S0FRQSxPQUFPLE1BQVAsSUFDQSxPQUFPLEdBQVAsQ0FBVzthQUNWLG1EQUFTLEtBQUssT0FBTCxFQUFjLFNBQVMsT0FBVCxFQUF2QjtNQURVLENBRFgsSUFJRSxJQUpGO0tBTUEsS0FBSyxNQUFMLElBQ0E7OztNQUNDOztTQUFTLGFBQVksVUFBWixFQUF1QixZQUFZLENBQUMsQ0FBRCxFQUFJLFFBQVEsS0FBUixFQUFoRDtPQUVDLEtBQUssR0FBTCxDQUFTO2VBQUksZ0RBQU8sS0FBSyxFQUFFLElBQUYsRUFBUSxXQUFXLEtBQVgsRUFBa0IsU0FBUyxDQUFULEVBQXRDO1FBQUosQ0FGVjtPQUREO01BREEsSUFRRztBQUFDLFdBQUQ7UUFBTyxNQUFNLDZEQUFOLEVBQVA7O01BUkg7S0ExQkg7SUFEQSxDQW5CTzs7Ozs4QkE0REc7T0FDSCxRQUFPLEtBQUssS0FBTCxDQUFQLE1BREc7O0FBRVYsUUFBSyxRQUFMLENBQWMsRUFBQyxPQUFNLENBQUMsS0FBRCxFQUFyQixFQUZVOzs7O21DQUtNLEtBQUk7c0NBQ0ssS0FBSyxLQUFMLENBQWxCLFdBRGE7O09BQ0wsMkJBREs7ZUFFNEIsS0FGNUI7T0FFYixzQkFGYTtPQUVOLG9CQUZNO09BRUEsd0NBRkE7T0FFZ0Isb0JBRmhCO09BRXNCLGtCQUZ0Qjs7QUFHcEIsc0JBQVcsR0FBWCxHQUNFLElBREYsQ0FDTyxxQkFBVztBQUNoQixRQUFHLFVBQVUsTUFBVixJQUFrQixDQUFsQixFQUNGLE9BREQ7QUFFQSxjQUFVLElBQVYsQ0FBZSxVQUFDLENBQUQsRUFBRyxDQUFIO1lBQU8sRUFBRSxJQUFGLEdBQU8sRUFBRSxJQUFGO0tBQWQsQ0FBZixDQUhnQjtBQUloQixRQUFJLE9BQUssQ0FBQyxVQUFVLENBQVYsQ0FBRCxDQUFMO1FBQXFCLFVBQVEsS0FBRyxFQUFILEdBQU0sRUFBTixHQUFTLElBQVQsQ0FKakI7QUFLaEIsUUFBSSxTQUFPLFVBQVUsR0FBVixDQUFjLG9CQUFVO1NBQzNCLE9BQWMsU0FBZCxLQUQyQjtTQUN0QixNQUFTLFNBQVQsSUFEc0I7U0FDbEIsTUFBSyxTQUFMLElBRGtCOztBQUVsQyxTQUFHLE9BQUssS0FBSyxLQUFLLE1BQUwsR0FBWSxDQUFaLENBQUwsQ0FBb0IsSUFBcEIsR0FBeUIsT0FBOUIsRUFDRixLQUFLLElBQUwsQ0FBVSxRQUFWLEVBREQ7QUFFQSxZQUFPLElBQUksS0FBSixDQUFVLEdBQVYsRUFBYyxHQUFkLENBQVAsQ0FKa0M7S0FBVixDQUFyQixDQUxZO0FBV2hCLFFBQUksVUFBSixDQUFlLElBQUksZUFBSixDQUFvQixNQUFwQixFQUE0QixFQUFDLE1BQUssb0JBQUwsRUFBMEIsT0FBTSxxQkFBTixFQUE2QixPQUFNLEtBQU4sRUFBcEYsQ0FBZixFQVhnQjs7QUFhaEIsUUFBSSxZQUFVLFFBQVEsU0FBUixDQWJFO0FBY2hCLFFBQUksZ0JBQUo7UUFBYSxVQUFRLFNBQVIsT0FBUSxJQUFHO0FBQ3ZCLGdCQUFXLFFBQVEsWUFBUixDQUFxQixJQUFyQixDQUFYLENBRHVCO0FBRXZCLGVBQVEsRUFBRSxNQUFGLENBRmU7QUFHdkIsYUFBUSxZQUFSLENBQXFCLHFCQUFyQixFQUh1QjtLQUFILENBZEw7QUFtQmhCLFNBQUssT0FBTCxDQUFhLGdCQUFpQixDQUFqQixFQUFxQjtTQUFuQixpQkFBbUI7U0FBZCxlQUFjO1NBQVYsZUFBVTs7QUFDakMsU0FBSSxTQUFPLElBQUksTUFBSixDQUFXLElBQUksS0FBSixDQUFVLEdBQVYsRUFBYyxHQUFkLENBQVgsQ0FBUCxDQUQ2QjtBQUVqQyxTQUFJLFFBQU0sSUFBSSxJQUFKLENBQVMsSUFBVCxFQUFlLFFBQWYsQ0FBd0IsU0FBeEIsSUFBbUMsQ0FBbkMsQ0FGdUI7QUFHakMsU0FBSSxRQUFNLElBQUksS0FBSixNQUFhLEtBQWIsQ0FBTixDQUg2QjtBQUlqQyxXQUFNLFFBQU4sQ0FBZSxFQUFDLGlCQUFnQixhQUFoQixFQUE4QixRQUFPLEtBQVAsRUFBOUMsRUFKaUM7QUFLakMsV0FBTSxTQUFOLENBQWdCLElBQUksSUFBSixDQUFTLFFBQU0sQ0FBTixHQUFVLENBQVYsR0FBYyxDQUFkLEVBQWlCLENBQTFCLENBQWhCLEVBTGlDO0FBTWpDLFlBQU8sUUFBUCxDQUFnQixLQUFoQixFQU5pQztBQU9qQyxTQUFJLFVBQUosQ0FBZSxNQUFmLEVBUGlDO0FBUWpDLFlBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsT0FBakMsRUFSaUM7QUFTakMsU0FBRyxLQUFHLENBQUgsRUFBSztBQUNQLGdCQUFRLE1BQVIsQ0FETztBQUVQLGFBQU8sWUFBUCxDQUFvQixxQkFBcEIsRUFGTztNQUFSO0tBVFksQ0FBYixDQW5CZ0I7O0FBa0NoQixRQUFJLFFBQU0sS0FBSyxLQUFMLENBQVcsT0FBTyxNQUFQLEdBQWMsQ0FBZCxDQUFqQixDQWxDWTtBQW1DaEIsUUFBSSxXQUFKLENBQWdCLE9BQU8sTUFBUCxDQUFjLFVBQUMsQ0FBRCxFQUFHLENBQUg7WUFBTyxJQUFFLEtBQUYsSUFBUyxDQUFUO0tBQVAsQ0FBOUIsRUFuQ2dCO0lBQVgsQ0FEUCxDQUhvQjs7Ozt3QkEyQ2YsVUFBUztBQUNkLE9BQUksTUFBSSxJQUFJLElBQUosRUFBSixDQURVO0FBRWQsT0FBSSxTQUFPLEVBQVA7T0FBVyxPQUFLLEVBQUw7T0FBUyxTQUFPLEVBQVAsQ0FGVjtBQUdkLFlBQVMsT0FBVCxDQUFpQixtQkFBUztBQUN6QixZQUFPLFlBQVUsUUFBVixDQUFtQixPQUFuQixDQUFQO0FBQ0EsVUFBSyxRQUFMO0FBQ0MsYUFBTyxJQUFQLENBQVksT0FBWixFQUREO0FBRUEsWUFGQTtBQURBLFVBSUssVUFBTCxDQUpBO0FBS0EsVUFBSyxRQUFMLENBTEE7QUFNQSxVQUFLLFdBQUw7QUFDQyxhQUFPLElBQVAsQ0FBWSxPQUFaLEVBREQ7QUFFQSxZQUZBO0FBTkEsVUFTSyxNQUFMLENBVEE7QUFVQTtBQUNDLFdBQUssSUFBTCxDQUFVLE9BQVYsRUFERDtBQVZBLEtBRHlCO0lBQVQsQ0FBakIsQ0FIYztBQWtCZCxVQUFPLElBQVAsQ0FBWSxVQUFDLENBQUQsRUFBRyxDQUFIO1dBQU8sRUFBRSxTQUFGLENBQVksT0FBWixLQUFzQixFQUFFLFNBQUYsQ0FBWSxPQUFaLEVBQXRCO0lBQVAsQ0FBWixDQWxCYztBQW1CZCxVQUFPLElBQVAsQ0FBWSxVQUFDLENBQUQsRUFBRyxDQUFIO1dBQU8sRUFBRSxTQUFGLENBQVksT0FBWixLQUFzQixFQUFFLFNBQUYsQ0FBWSxPQUFaLEVBQXRCO0lBQVAsQ0FBWixDQW5CYztBQW9CZCxRQUFLLElBQUwsQ0FBVSxVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDaEIsUUFBRyxFQUFFLFNBQUYsRUFBWTtBQUNkLFNBQUcsRUFBRSxTQUFGLEVBQVk7QUFDZCxhQUFPLEVBQUUsU0FBRixDQUFZLE9BQVosS0FBc0IsRUFBRSxTQUFGLENBQVksT0FBWixFQUF0QixDQURPO01BQWYsTUFFSztBQUNKLGFBQU8sQ0FBQyxDQUFELENBREg7TUFGTDtLQURELE1BTUs7QUFDSixTQUFHLEVBQUUsU0FBRixFQUFZO0FBQ2QsYUFBTyxDQUFQLENBRGM7TUFBZixNQUVLO0FBQ0osYUFBTyxFQUFFLFNBQUYsQ0FBWSxPQUFaLEtBQXNCLEVBQUUsU0FBRixDQUFZLE9BQVosRUFBdEIsQ0FESDtNQUZMO0tBUEQ7SUFEUyxDQUFWLENBcEJjO0FBbUNkLFVBQU8sRUFBQyxjQUFELEVBQVMsVUFBVCxFQUFlLGNBQWYsRUFBUCxDQW5DYzs7Ozs7OztPQXNDUixlQUFhO0FBQ25CLFNBQVEsaUJBQVUsTUFBViIsImZpbGUiOiJsaWZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge1VJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9uLCBJY29uQnV0dG9uLCBEaWFsb2d9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCB7U3RlcCxTdGVwcGVyLFN0ZXBMYWJlbCxTdGVwQ29udGVudH0gZnJvbSAnbWF0ZXJpYWwtdWkvU3RlcHBlcidcclxuXHJcbmltcG9ydCBMb2dvIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL2RpcmVjdGlvbnMtd2FsaydcclxuXHJcbmltcG9ydCBJY29uTW9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLWhvcml6J1xyXG5pbXBvcnQgSWNvbkFkZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQnXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQiwgRm9vdHByaW50IGFzIEZvb3RwcmludERCfSBmcm9tIFwiLi9kYlwiXHJcbmltcG9ydCBDaGlwcGVyIGZyb20gXCIuL2NvbXBvbmVudHMvY2hpcHBlclwiXHJcbmltcG9ydCBKb3VybmV5LCB7VGl0bGV9IGZyb20gXCIuL2NvbXBvbmVudHMvam91cm5leVwiXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vY29tcG9uZW50cy9tYXBcIlxyXG5pbXBvcnQgTG9jYXRpb25EQiBmcm9tIFwiLi9kYi9sb2NhdGlvblwiXHJcblxyXG5cclxuY29uc3Qge0VtcHR5LCBQaG90b309VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtcclxuXHRcdG1lbW9yeTpbXSxcclxuXHRcdHdpc2g6W10sXHJcblx0XHRhY3RpdmU6W10sXHJcblx0XHRzaG93SGlzdG9yeTp0cnVlLFxyXG5cdFx0b25NYXA6ZmFsc2VcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdEpvdXJuZXlEQi5maW5kKClcclxuXHRcdFx0LmZldGNoKGpvdXJuZXlzPT50aGlzLnNldFN0YXRlKHRoaXMuZ3JvdXAoam91cm5leXMpKSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge21lbW9yeSwgd2lzaCwgYWN0aXZlLCBzaG93SGlzdG9yeSwgb25NYXB9PXRoaXMuc3RhdGVcclxuXHRcclxuXHRcdGxldCBtYXA9bnVsbCwgbWFwVG9nZ2xlcj1udWxsXHJcblx0XHRcclxuXHRcdGlmKGFjdGl2ZS5sZW5ndGg+MCl7XHRcdFx0XHJcblx0XHRcdG1hcFRvZ2dsZXI9KDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG5cdFx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSB0b3AgcmlnaHQgXzJcIlxyXG5cdFx0XHRcdFx0XHRcdG1pbmk9e3RydWV9IG9uQ2xpY2s9e2U9PnRoaXMudG9nZ2xlTWFwKCl9PlxyXG5cdFx0XHRcdFx0XHRcdDxJY29uTWFwLz5cclxuXHRcdFx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj4pXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRpZihvbk1hcCl7XHJcblx0XHRcdFx0bWFwPSg8TWFwIGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSB0b3AgbGVmdFwiIFxyXG5cdFx0XHRcdFx0XHRvblJlYWR5PXttYXA9PnRoaXMuc2hvd0pvdXJuZXlPbk1hcChtYXApfVxyXG5cdFx0XHRcdFx0XHRzdHlsZT17e29wYWNpdHk6XCIwLjVcIiwgd2lkdGg6OTQwLCBoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0LTUwLTEwfX0vPilcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHQ8ZGl2PlxyXG5cdFx0XHR7bWFwfVxyXG5cclxuXHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcblx0XHRcdFx0Y2xhc3NOYW1lPVwiZmxvYXRpbmcgc3RpY2t5IHRvcCByaWdodFwiXHJcblx0XHRcdFx0bWluaT17dHJ1ZX0gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwiam91cm5leS9fbmV3XCIpfT5cclxuXHRcdFx0XHQ8SWNvbkFkZC8+XHJcblx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblx0XHRcdFxyXG5cdFx0XHR7bWFwVG9nZ2xlcn1cclxuXHJcblx0XHRcdDxkaXYgc3R5bGU9e3t6SW5kZXg6NywgYmFja2dyb3VuZDpcIndoaXRlXCJ9fT5cclxuXHRcdFx0XHR7c2hvd0hpc3RvcnkgJiYgbWVtb3J5Lmxlbmd0aCAmJiAoXHJcblx0XHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgYWN0aXZlU3RlcD17LTF9PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRtZW1vcnkubWFwKGE9Pig8VGl0bGUga2V5PXthLm5hbWV9IGpvdXJuZXk9e2F9IGNvbXBsZXRlZD17dHJ1ZX0vPikpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdFx0KXx8bnVsbH1cclxuXHJcblx0XHRcdFx0e2FjdGl2ZS5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdFx0YWN0aXZlLm1hcChqb3VybmV5PT4oXHJcblx0XHRcdFx0XHRcdDxKb3VybmV5IGtleT17am91cm5leX0gam91cm5leT17am91cm5leX0vPlxyXG5cdFx0XHRcdFx0KSlcclxuXHRcdFx0XHQpfHxudWxsfVxyXG5cclxuXHRcdFx0XHR7d2lzaC5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfSBsaW5lYXI9e2ZhbHNlfT5cclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHdpc2gubWFwKGE9Pig8VGl0bGUga2V5PXthLm5hbWV9IGNvbXBsZXRlZD17ZmFsc2V9IGpvdXJuZXk9e2F9Lz4pKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdDwvU3RlcHBlcj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdCl8fCg8RW1wdHkgaWNvbj17PExvZ28vPn0+5p2lLOW8gOWni+S9oOeahOW/g+aXheeoizwvRW1wdHk+KX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0dG9nZ2xlTWFwKCl7XHJcblx0XHRjb25zdCB7b25NYXB9PXRoaXMuc3RhdGVcclxuXHRcdHRoaXMuc2V0U3RhdGUoe29uTWFwOiFvbk1hcH0pXHJcblx0fVxyXG5cdFxyXG5cdHNob3dKb3VybmV5T25NYXAobWFwKXtcclxuXHRcdGNvbnN0IHthY3RpdmU6W2pvdXJuZXldfT10aGlzLnN0YXRlXHJcblx0XHRjb25zdCB7TWFya2VyLFBvaW50LFBvaW50Q29sbGVjdGlvbixMYWJlbCxTaXplfT1CTWFwXHJcblx0XHRMb2NhdGlvbkRCLmdldCgpXHJcblx0XHRcdC50aGVuKHdheXBvaW50cz0+e1xyXG5cdFx0XHRcdGlmKHdheXBvaW50cy5sZW5ndGg9PTApXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0d2F5cG9pbnRzLnNvcnQoKGEsYik9PmEud2hlbi1iLndoZW4pXHJcblx0XHRcdFx0bGV0IGRheXM9W3dheXBvaW50c1swXV0sIGRheUxvbmc9MjQqNjAqNjAqMTAwMFxyXG5cdFx0XHRcdGxldCBwb2ludHM9d2F5cG9pbnRzLm1hcCh3YXlwb2ludD0+e1xyXG5cdFx0XHRcdFx0Y29uc3Qge3doZW4sbGF0LGxuZ309d2F5cG9pbnRcclxuXHRcdFx0XHRcdGlmKHdoZW4tZGF5c1tkYXlzLmxlbmd0aC0xXS53aGVuPmRheUxvbmcpXHJcblx0XHRcdFx0XHRcdGRheXMucHVzaCh3YXlwb2ludClcclxuXHRcdFx0XHRcdHJldHVybiBuZXcgUG9pbnQobG5nLGxhdClcdFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0bWFwLmFkZE92ZXJsYXkobmV3IFBvaW50Q29sbGVjdGlvbihwb2ludHMsIHtzaXplOkJNQVBfUE9JTlRfU0laRV9USU5ZLHNoYXBlOkJNQVBfUE9JTlRfU0hBUEVfU1RBUiwgY29sb3I6XCJyZWRcIn0pKSBcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgc3RhcnRlZEF0PWpvdXJuZXkuc3RhcnRlZEF0XHJcblx0XHRcdFx0bGV0IGN1cnJlbnQsIG9uQ2xpY2s9ZT0+e1xyXG5cdFx0XHRcdFx0Y3VycmVudCAmJiBjdXJyZW50LnNldEFuaW1hdGlvbihudWxsKTtcclxuXHRcdFx0XHRcdGN1cnJlbnQ9ZS50YXJnZXRcclxuXHRcdFx0XHRcdGN1cnJlbnQuc2V0QW5pbWF0aW9uKEJNQVBfQU5JTUFUSU9OX0JPVU5DRSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZGF5cy5mb3JFYWNoKCh7d2hlbixsYXQsbG5nfSwgaSk9PntcclxuXHRcdFx0XHRcdGxldCBtYXJrZXI9bmV3IE1hcmtlcihuZXcgUG9pbnQobG5nLGxhdCkpXHJcblx0XHRcdFx0XHRsZXQgZGF5Tm89bmV3IERhdGUod2hlbikucmVsYXRpdmUoc3RhcnRlZEF0KSsxXHJcblx0XHRcdFx0XHRsZXQgbGFiZWw9bmV3IExhYmVsKGAke2RheU5vfWApXHJcblx0XHRcdFx0XHRsYWJlbC5zZXRTdHlsZSh7YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIixib3JkZXI6XCIwcHhcIn0pXHJcblx0XHRcdFx0XHRsYWJlbC5zZXRPZmZzZXQobmV3IFNpemUoZGF5Tm8+OSA/IDIgOiA1LCAyKSlcclxuXHRcdFx0XHRcdG1hcmtlci5zZXRMYWJlbChsYWJlbClcclxuXHRcdFx0XHRcdG1hcC5hZGRPdmVybGF5KG1hcmtlcilcclxuXHRcdFx0XHRcdG1hcmtlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGljaylcclxuXHRcdFx0XHRcdGlmKGk9PTApe1xyXG5cdFx0XHRcdFx0XHRjdXJyZW50PW1hcmtlclxyXG5cdFx0XHRcdFx0XHRtYXJrZXIuc2V0QW5pbWF0aW9uKEJNQVBfQU5JTUFUSU9OX0JPVU5DRSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgZGVsdGE9TWF0aC5yb3VuZChwb2ludHMubGVuZ3RoLzUpXHJcblx0XHRcdFx0bWFwLnNldFZpZXdwb3J0KHBvaW50cy5maWx0ZXIoKGEsaSk9PmklZGVsdGE9PTApKVxyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHJcblx0Z3JvdXAoam91cm5leXMpe1xyXG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRsZXQgbWVtb3J5PVtdLCB3aXNoPVtdLCBhY3RpdmU9W11cclxuXHRcdGpvdXJuZXlzLmZvckVhY2goam91cm5leT0+e1xyXG5cdFx0XHRzd2l0Y2goSm91cm5leURCLmdldFN0YXRlKGpvdXJuZXkpKXtcclxuXHRcdFx0Y2FzZSBcIk1lbW9yeVwiOlxyXG5cdFx0XHRcdG1lbW9yeS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJTdGFydGluZ1wiOlxyXG5cdFx0XHRjYXNlIFwiRW5kaW5nXCI6XHJcblx0XHRcdGNhc2UgXCJUcmF2ZWxpbmdcIjpcclxuXHRcdFx0XHRhY3RpdmUucHVzaChqb3VybmV5KVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwiUGxhblwiOlxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHdpc2gucHVzaChqb3VybmV5KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0bWVtb3J5LnNvcnQoKGEsYik9PmEuc3RhcnRlZEF0LmdldFRpbWUoKS1iLnN0YXJ0ZWRBdC5nZXRUaW1lKCkpXHJcblx0XHRhY3RpdmUuc29ydCgoYSxiKT0+YS5zdGFydGVkQXQuZ2V0VGltZSgpLWIuc3RhcnRlZEF0LmdldFRpbWUoKSlcclxuXHRcdHdpc2guc29ydCgoYSxiKT0+e1xyXG5cdFx0XHRpZihhLnN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0aWYoYi5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGEuc3RhcnRlZEF0LmdldFRpbWUoKS1iLnN0YXJ0ZWRBdC5nZXRUaW1lKClcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiAtMVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0aWYoYi5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIDFcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiBhLmNyZWF0ZWRBdC5nZXRUaW1lKCktYi5jcmVhdGVkQXQuZ2V0VGltZSgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHttZW1vcnksIHdpc2gsIGFjdGl2ZX1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcbiJdfQ==