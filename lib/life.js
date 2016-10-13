"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _Stepper = require("material-ui/Stepper");

var _directionsWalk = require("material-ui/svg-icons/maps/directions-walk");

var _directionsWalk2 = _interopRequireDefault(_directionsWalk);

var _cameraRoll = require("material-ui/svg-icons/image/camera-roll");

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

var _moreHoriz = require("material-ui/svg-icons/navigation/more-horiz");

var _moreHoriz2 = _interopRequireDefault(_moreHoriz);

var _add = require("material-ui/svg-icons/content/add");

var _add2 = _interopRequireDefault(_add);

var _db = require("./db");

var _chipper = require("./components/chipper");

var _chipper2 = _interopRequireDefault(_chipper);

var _journey = require("./components/journey");

var _journey2 = _interopRequireDefault(_journey);

var _map = require("./components/map");

var _map2 = _interopRequireDefault(_map);

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
			journeys: [],
			showHistory: true,
			onMap: []
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(_class, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			_db.Journey.find().fetch(function (journeys) {
				return _this2.setState({ journeys: journeys });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var _state = this.state;
			var journeys = _state.journeys;
			var showHistory = _state.showHistory;
			var onMap = _state.onMap;

			var _group = this.group(journeys);

			var memory = _group.memory;
			var wish = _group.wish;
			var active = _group.active;

			var publisher = null;

			if (memory.length || active.length) {
				publisher = _react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "floating sticky bottom right",
						mini: true, onClick: function onClick(e) {
							return _this3.context.router.push("publish", { journey: active[0] });
						} },
					_react2.default.createElement(_cameraRoll2.default, null),
					"$"
				);
			}

			var map = null;

			if (onMap && onMap.length > 0) {
				map = _react2.default.createElement(_map2.default, { className: "floating sticky top left",
					style: { zIndex: 1, opacity: "0.13", height: "100%", width: "100%" } });
			}

			return _react2.default.createElement(
				"div",
				null,
				map,
				publisher,
				_react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "floating sticky top right",
						mini: true, onClick: function onClick(e) {
							return _this3.context.router.push("journey/_new");
						} },
					_react2.default.createElement(_add2.default, null)
				),
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
						return _react2.default.createElement(_journey2.default, { key: journey, journey: journey,
							onMap: function onMap(e) {
								return _this3.setState({ onMap: _this3.state.onMap.concat([journey]) });
							} });
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
		key: "group",
		value: function group(journeys) {
			var now = new Date();
			var memory = [],
			    wish = [],
			    active = [];
			journeys.forEach(function (journey) {
				var startedAt = journey.startedAt;
				var endedAt = journey.endedAt;

				var started = null,
				    ended = null;

				if (startedAt) {
					started = now.relative(startedAt);
					if (started < 0) {
						wish.push(journey);
						return;
					} else if (started == 0) {
						active.push(journey);
						return;
					}
				}

				if (endedAt) {
					ended = now.relative(endedAt);
					if (ended > 0) {
						memory.push(journey);
						return;
					} else if (ended == 0) {
						active.push(journey);
						return;
					}
				}

				if (started != null && ended != null && started > 0 && ended < 0) {
					active.push(journey);
					return;
				}

				//unconfirmed as wish
				wish.push(journey);
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
//# sourceMappingURL=data:application/json;base64,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Q0FyQ2M7QUFzQ2QsVUFBTyxJQUFQLENBQVksVUFBQyxDQUFELEVBQUcsQ0FBSDtXQUFPLEVBQUUsU0FBRixDQUFZLE9BQVosS0FBc0IsRUFBRSxTQUFGLENBQVksT0FBWixFQUF0QjtJQUFQLENBQVosQ0F0Q2M7QUF1Q2QsUUFBSyxJQUFMLENBQVUsVUFBQyxDQUFELEVBQUcsQ0FBSCxFQUFPO0FBQ2hCLFFBQUcsRUFBRSxTQUFGLEVBQVk7QUFDZCxTQUFHLEVBQUUsU0FBRixFQUFZO0FBQ2QsYUFBTyxFQUFFLFNBQUYsQ0FBWSxPQUFaLEtBQXNCLEVBQUUsU0FBRixDQUFZLE9BQVosRUFBdEIsQ0FETztNQUFmLE1BRUs7QUFDSixhQUFPLENBQUMsQ0FBRCxDQURIO01BRkw7S0FERCxNQU1LO0FBQ0osU0FBRyxFQUFFLFNBQUYsRUFBWTtBQUNkLGFBQU8sQ0FBUCxDQURjO01BQWYsTUFFSztBQUNKLGFBQU8sRUFBRSxTQUFGLENBQVksT0FBWixLQUFzQixFQUFFLFNBQUYsQ0FBWSxPQUFaLEVBQXRCLENBREg7TUFGTDtLQVBEO0lBRFMsQ0FBVixDQXZDYztBQXNEZCxVQUFPLEVBQUMsY0FBRCxFQUFTLFVBQVQsRUFBZSxjQUFmLEVBQVAsQ0F0RGM7Ozs7Ozs7T0F5RFIsZUFBYTtBQUNuQixTQUFRLGlCQUFVLE1BQVYiLCJmaWxlIjoibGlmZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHtVSSwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuXHJcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b24sIEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbiwgSWNvbkJ1dHRvbiwgRGlhbG9nfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge1N0ZXAsU3RlcHBlcixTdGVwTGFiZWwsU3RlcENvbnRlbnR9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXHJcblxyXG5pbXBvcnQgTG9nbyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9kaXJlY3Rpb25zLXdhbGsnXHJcbmltcG9ydCBJY29uUHVibGlzaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuaW1wb3J0IEljb25Nb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtaG9yaXonXHJcbmltcG9ydCBJY29uQWRkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZCdcclxuXHJcbmltcG9ydCB7Sm91cm5leSBhcyBKb3VybmV5REIsIEZvb3RwcmludCBhcyBGb290cHJpbnREQn0gZnJvbSBcIi4vZGJcIlxyXG5pbXBvcnQgQ2hpcHBlciBmcm9tIFwiLi9jb21wb25lbnRzL2NoaXBwZXJcIlxyXG5pbXBvcnQgSm91cm5leSwge1RpdGxlfSBmcm9tIFwiLi9jb21wb25lbnRzL2pvdXJuZXlcIlxyXG5pbXBvcnQgTWFwIGZyb20gXCIuL2NvbXBvbmVudHMvbWFwXCJcclxuXHJcbmNvbnN0IHtFbXB0eSwgUGhvdG99PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRqb3VybmV5czpbXSxcclxuXHRcdHNob3dIaXN0b3J5OnRydWUsXHJcblx0XHRvbk1hcDpbXVxyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Sm91cm5leURCLmZpbmQoKVxyXG5cdFx0XHQuZmV0Y2goam91cm5leXM9PnRoaXMuc2V0U3RhdGUoe2pvdXJuZXlzfSkpXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtqb3VybmV5cywgc2hvd0hpc3RvcnksIG9uTWFwfT10aGlzLnN0YXRlXHJcblx0XHRjb25zdCB7bWVtb3J5LCB3aXNoLCBhY3RpdmV9PXRoaXMuZ3JvdXAoam91cm5leXMpXHJcblx0XHRsZXQgcHVibGlzaGVyPW51bGxcclxuXHJcblx0XHRpZihtZW1vcnkubGVuZ3RoIHx8IGFjdGl2ZS5sZW5ndGgpe1xyXG5cdFx0XHRwdWJsaXNoZXI9KFxyXG5cdFx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZmxvYXRpbmcgc3RpY2t5IGJvdHRvbSByaWdodFwiXHJcblx0XHRcdFx0XHRtaW5pPXt0cnVlfSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJwdWJsaXNoXCIse2pvdXJuZXk6YWN0aXZlWzBdfSl9PlxyXG5cdFx0XHRcdFx0PEljb25QdWJsaXNoLz4kXHJcblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBtYXA9bnVsbFxyXG5cclxuXHRcdGlmKG9uTWFwICYmIG9uTWFwLmxlbmd0aD4wKXtcclxuXHRcdFx0bWFwPSg8TWFwIGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSB0b3AgbGVmdFwiXHJcblx0XHRcdFx0c3R5bGU9e3t6SW5kZXg6MSxvcGFjaXR5OlwiMC4xM1wiLGhlaWdodDpcIjEwMCVcIix3aWR0aDpcIjEwMCVcIn19Lz4pXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHttYXB9XHJcblxyXG5cdFx0XHR7cHVibGlzaGVyfVxyXG5cclxuXHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcblx0XHRcdFx0Y2xhc3NOYW1lPVwiZmxvYXRpbmcgc3RpY2t5IHRvcCByaWdodFwiXHJcblx0XHRcdFx0bWluaT17dHJ1ZX0gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwiam91cm5leS9fbmV3XCIpfT5cclxuXHRcdFx0XHQ8SWNvbkFkZC8+XHJcblx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblxyXG5cdFx0XHQ8ZGl2IHN0eWxlPXt7ekluZGV4OjcsIGJhY2tncm91bmQ6XCJ3aGl0ZVwifX0+XHJcblx0XHRcdFx0e3Nob3dIaXN0b3J5ICYmIG1lbW9yeS5sZW5ndGggJiYgKFxyXG5cdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bWVtb3J5Lm1hcChhPT4oPFRpdGxlIGtleT17YS5uYW1lfSBqb3VybmV5PXthfSBjb21wbGV0ZWQ9e3RydWV9Lz4pKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0PC9TdGVwcGVyPlxyXG5cdFx0XHRcdCl8fG51bGx9XHJcblxyXG5cdFx0XHRcdHthY3RpdmUubGVuZ3RoICYmIChcclxuXHRcdFx0XHRcdGFjdGl2ZS5tYXAoam91cm5leT0+KFxyXG5cdFx0XHRcdFx0XHQ8Sm91cm5leSBrZXk9e2pvdXJuZXl9IGpvdXJuZXk9e2pvdXJuZXl9XHJcblx0XHRcdFx0XHRcdFx0b25NYXA9e2U9PnRoaXMuc2V0U3RhdGUoe29uTWFwOiB0aGlzLnN0YXRlLm9uTWFwLmNvbmNhdChbam91cm5leV0pfSl9Lz5cclxuXHRcdFx0XHRcdCkpXHJcblx0XHRcdFx0KXx8bnVsbH1cclxuXHJcblx0XHRcdFx0e3dpc2gubGVuZ3RoICYmIChcclxuXHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBhY3RpdmVTdGVwPXstMX0gbGluZWFyPXtmYWxzZX0+XHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHR3aXNoLm1hcChhPT4oPFRpdGxlIGtleT17YS5uYW1lfSBjb21wbGV0ZWQ9e2ZhbHNlfSBqb3VybmV5PXthfS8+KSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQpfHwoPEVtcHR5IGljb249ezxMb2dvLz59PuadpSzlvIDlp4vkvaDnmoTlv4Pml4XnqIs8L0VtcHR5Pil9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRncm91cChqb3VybmV5cyl7XHJcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRcdGxldCBtZW1vcnk9W10sIHdpc2g9W10sIGFjdGl2ZT1bXVxyXG5cdFx0am91cm5leXMuZm9yRWFjaChqb3VybmV5PT57XHJcblx0XHRcdGxldCB7c3RhcnRlZEF0LCBlbmRlZEF0fT1qb3VybmV5XHJcblx0XHRcdGxldCBzdGFydGVkPW51bGwsIGVuZGVkPW51bGxcclxuXHJcblx0XHRcdGlmKHN0YXJ0ZWRBdCl7XHJcblx0XHRcdFx0c3RhcnRlZD1ub3cucmVsYXRpdmUoc3RhcnRlZEF0KVxyXG5cdFx0XHRcdGlmKHN0YXJ0ZWQ8MCl7XHJcblx0XHRcdFx0XHR3aXNoLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1lbHNlIGlmKHN0YXJ0ZWQ9PTApe1xyXG5cdFx0XHRcdFx0YWN0aXZlLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoZW5kZWRBdCl7XHJcblx0XHRcdFx0ZW5kZWQ9bm93LnJlbGF0aXZlKGVuZGVkQXQpXHJcblx0XHRcdFx0aWYoZW5kZWQ+MCl7XHJcblx0XHRcdFx0XHRtZW1vcnkucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fWVsc2UgaWYoZW5kZWQ9PTApe1xyXG5cdFx0XHRcdFx0YWN0aXZlLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoc3RhcnRlZCE9bnVsbCAmJiBlbmRlZCE9bnVsbCAmJiBzdGFydGVkPjAgJiYgZW5kZWQ8MCl7XHJcblx0XHRcdFx0YWN0aXZlLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly91bmNvbmZpcm1lZCBhcyB3aXNoXHJcblx0XHRcdHdpc2gucHVzaChqb3VybmV5KVxyXG5cdFx0fSlcclxuXHRcdG1lbW9yeS5zb3J0KChhLGIpPT5hLnN0YXJ0ZWRBdC5nZXRUaW1lKCktYi5zdGFydGVkQXQuZ2V0VGltZSgpKVxyXG5cdFx0YWN0aXZlLnNvcnQoKGEsYik9PmEuc3RhcnRlZEF0LmdldFRpbWUoKS1iLnN0YXJ0ZWRBdC5nZXRUaW1lKCkpXHJcblx0XHR3aXNoLnNvcnQoKGEsYik9PntcclxuXHRcdFx0aWYoYS5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdGlmKGIuc3RhcnRlZEF0KXtcclxuXHRcdFx0XHRcdHJldHVybiBhLnN0YXJ0ZWRBdC5nZXRUaW1lKCktYi5zdGFydGVkQXQuZ2V0VGltZSgpXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gLTFcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGlmKGIuc3RhcnRlZEF0KXtcclxuXHRcdFx0XHRcdHJldHVybiAxXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gYS5jcmVhdGVkQXQuZ2V0VGltZSgpLWIuY3JlYXRlZEF0LmdldFRpbWUoKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiB7bWVtb3J5LCB3aXNoLCBhY3RpdmV9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG4iXX0=