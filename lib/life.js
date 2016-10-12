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
						return _react2.default.createElement(_journey2.default, { key: journey, journey: journey, onMap: function onMap(e) {
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
//# sourceMappingURL=data:application/json;base64,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LENBckNjO0FBc0NkLFVBQU8sSUFBUCxDQUFZLFVBQUMsQ0FBRCxFQUFHLENBQUg7V0FBTyxFQUFFLFNBQUYsQ0FBWSxPQUFaLEtBQXNCLEVBQUUsU0FBRixDQUFZLE9BQVosRUFBdEI7SUFBUCxDQUFaLENBdENjO0FBdUNkLFFBQUssSUFBTCxDQUFVLFVBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTztBQUNoQixRQUFHLEVBQUUsU0FBRixFQUFZO0FBQ2QsU0FBRyxFQUFFLFNBQUYsRUFBWTtBQUNkLGFBQU8sRUFBRSxTQUFGLENBQVksT0FBWixLQUFzQixFQUFFLFNBQUYsQ0FBWSxPQUFaLEVBQXRCLENBRE87TUFBZixNQUVLO0FBQ0osYUFBTyxDQUFDLENBQUQsQ0FESDtNQUZMO0tBREQsTUFNSztBQUNKLFNBQUcsRUFBRSxTQUFGLEVBQVk7QUFDZCxhQUFPLENBQVAsQ0FEYztNQUFmLE1BRUs7QUFDSixhQUFPLEVBQUUsU0FBRixDQUFZLE9BQVosS0FBc0IsRUFBRSxTQUFGLENBQVksT0FBWixFQUF0QixDQURIO01BRkw7S0FQRDtJQURTLENBQVYsQ0F2Q2M7QUFzRGQsVUFBTyxFQUFDLGNBQUQsRUFBUyxVQUFULEVBQWUsY0FBZixFQUFQLENBdERjOzs7Ozs7O09BeURSLGVBQWE7QUFDbkIsU0FBUSxpQkFBVSxNQUFWIiwiZmlsZSI6ImxpZmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7VUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLCBGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b24sIEljb25CdXR0b24sIERpYWxvZ30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtTdGVwLFN0ZXBwZXIsU3RlcExhYmVsLFN0ZXBDb250ZW50fSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xyXG5cclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBJY29uTW9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLWhvcml6J1xyXG5pbXBvcnQgSWNvbkFkZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQnXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBGb290cHJpbnQgYXMgRm9vdHByaW50REJ9IGZyb20gXCIuL2RiXCJcclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jaGlwcGVyXCJcclxuaW1wb3J0IEpvdXJuZXksIHtUaXRsZX0gZnJvbSBcIi4vY29tcG9uZW50cy9qb3VybmV5XCJcclxuaW1wb3J0IE1hcCBmcm9tIFwiLi9jb21wb25lbnRzL21hcFwiXHJcblxyXG5jb25zdCB7RW1wdHksIFBob3RvfT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0am91cm5leXM6W10sXHJcblx0XHRzaG93SGlzdG9yeTp0cnVlLFxyXG5cdFx0b25NYXA6W11cclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdEpvdXJuZXlEQi5maW5kKClcclxuXHRcdFx0LmZldGNoKGpvdXJuZXlzPT50aGlzLnNldFN0YXRlKHtqb3VybmV5c30pKVxyXG5cdH1cclxuXHRcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtqb3VybmV5cywgc2hvd0hpc3RvcnksIG9uTWFwfT10aGlzLnN0YXRlXHJcblx0XHRjb25zdCB7bWVtb3J5LCB3aXNoLCBhY3RpdmV9PXRoaXMuZ3JvdXAoam91cm5leXMpXHJcblx0XHRsZXQgcHVibGlzaGVyPW51bGxcclxuXHRcdFxyXG5cdFx0aWYobWVtb3J5Lmxlbmd0aCB8fCBhY3RpdmUubGVuZ3RoKXtcclxuXHRcdFx0cHVibGlzaGVyPShcclxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJmbG9hdGluZyBzdGlja3kgYm90dG9tIHJpZ2h0XCJcclxuXHRcdFx0XHRcdG1pbmk9e3RydWV9IG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcInB1Ymxpc2hcIix7am91cm5leTphY3RpdmVbMF19KX0+XHJcblx0XHRcdFx0XHQ8SWNvblB1Ymxpc2gvPiRcclxuXHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGxldCBtYXA9bnVsbFxyXG5cdFx0XHJcblx0XHRpZihvbk1hcCAmJiBvbk1hcC5sZW5ndGg+MCl7XHJcblx0XHRcdG1hcD0oPE1hcCBjbGFzc05hbWU9XCJmbG9hdGluZyBzdGlja3kgdG9wIGxlZnRcIiBcclxuXHRcdFx0XHRzdHlsZT17e3pJbmRleDoxLG9wYWNpdHk6XCIwLjEzXCIsaGVpZ2h0OlwiMTAwJVwiLHdpZHRoOlwiMTAwJVwifX0vPilcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHttYXB9XHJcblx0XHRcdFxyXG5cdFx0XHR7cHVibGlzaGVyfVxyXG5cdFx0XHRcclxuXHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIFxyXG5cdFx0XHRcdGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSB0b3AgcmlnaHRcIlxyXG5cdFx0XHRcdG1pbmk9e3RydWV9IG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcImpvdXJuZXkvX25ld1wiKX0+XHJcblx0XHRcdFx0PEljb25BZGQvPlxyXG5cdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxyXG5cdFx0XHRcclxuXHRcdFx0PGRpdiBzdHlsZT17e3pJbmRleDo3LCBiYWNrZ3JvdW5kOlwid2hpdGVcIn19PlxyXG5cdFx0XHRcdHtzaG93SGlzdG9yeSAmJiBtZW1vcnkubGVuZ3RoICYmIChcclxuXHRcdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBhY3RpdmVTdGVwPXstMX0+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdG1lbW9yeS5tYXAoYT0+KDxUaXRsZSBrZXk9e2EubmFtZX0gam91cm5leT17YX0gY29tcGxldGVkPXt0cnVlfS8+KSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdDwvU3RlcHBlcj5cclxuXHRcdFx0XHQpfHxudWxsfVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHthY3RpdmUubGVuZ3RoICYmIChcclxuXHRcdFx0XHRcdGFjdGl2ZS5tYXAoam91cm5leT0+KFxyXG5cdFx0XHRcdFx0XHQ8Sm91cm5leSBrZXk9e2pvdXJuZXl9IGpvdXJuZXk9e2pvdXJuZXl9IG9uTWFwPXtlPT50aGlzLnNldFN0YXRlKHtvbk1hcDogdGhpcy5zdGF0ZS5vbk1hcC5jb25jYXQoW2pvdXJuZXldKX0pfS8+XHJcblx0XHRcdFx0XHQpKVxyXG5cdFx0XHRcdCl8fG51bGx9XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0e3dpc2gubGVuZ3RoICYmIChcclxuXHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdDxTdGVwcGVyIG9yaWVudGF0aW9uPVwidmVydGljYWxcIiBhY3RpdmVTdGVwPXstMX0gbGluZWFyPXtmYWxzZX0+XHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHR3aXNoLm1hcChhPT4oPFRpdGxlIGtleT17YS5uYW1lfSBjb21wbGV0ZWQ9e2ZhbHNlfSBqb3VybmV5PXthfS8+KSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQpfHwoPEVtcHR5IGljb249ezxMb2dvLz59PuadpSzlvIDlp4vkvaDnmoTlv4Pml4XnqIs8L0VtcHR5Pil9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdGdyb3VwKGpvdXJuZXlzKXtcclxuXHRcdGxldCBub3c9bmV3IERhdGUoKVxyXG5cdFx0bGV0IG1lbW9yeT1bXSwgd2lzaD1bXSwgYWN0aXZlPVtdXHJcblx0XHRqb3VybmV5cy5mb3JFYWNoKGpvdXJuZXk9PntcclxuXHRcdFx0bGV0IHtzdGFydGVkQXQsIGVuZGVkQXR9PWpvdXJuZXlcclxuXHRcdFx0bGV0IHN0YXJ0ZWQ9bnVsbCwgZW5kZWQ9bnVsbFxyXG5cdFx0XHRcclxuXHRcdFx0aWYoc3RhcnRlZEF0KXtcclxuXHRcdFx0XHRzdGFydGVkPW5vdy5yZWxhdGl2ZShzdGFydGVkQXQpXHJcblx0XHRcdFx0aWYoc3RhcnRlZDwwKXtcclxuXHRcdFx0XHRcdHdpc2gucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fWVsc2UgaWYoc3RhcnRlZD09MCl7XHJcblx0XHRcdFx0XHRhY3RpdmUucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZihlbmRlZEF0KXtcclxuXHRcdFx0XHRlbmRlZD1ub3cucmVsYXRpdmUoZW5kZWRBdClcclxuXHRcdFx0XHRpZihlbmRlZD4wKXtcclxuXHRcdFx0XHRcdG1lbW9yeS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdFx0XHRyZXR1cm4gXHJcblx0XHRcdFx0fWVsc2UgaWYoZW5kZWQ9PTApe1xyXG5cdFx0XHRcdFx0YWN0aXZlLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYoc3RhcnRlZCE9bnVsbCAmJiBlbmRlZCE9bnVsbCAmJiBzdGFydGVkPjAgJiYgZW5kZWQ8MCl7XHJcblx0XHRcdFx0YWN0aXZlLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0Ly91bmNvbmZpcm1lZCBhcyB3aXNoXHJcblx0XHRcdHdpc2gucHVzaChqb3VybmV5KVxyXG5cdFx0fSlcclxuXHRcdG1lbW9yeS5zb3J0KChhLGIpPT5hLnN0YXJ0ZWRBdC5nZXRUaW1lKCktYi5zdGFydGVkQXQuZ2V0VGltZSgpKVxyXG5cdFx0YWN0aXZlLnNvcnQoKGEsYik9PmEuc3RhcnRlZEF0LmdldFRpbWUoKS1iLnN0YXJ0ZWRBdC5nZXRUaW1lKCkpXHJcblx0XHR3aXNoLnNvcnQoKGEsYik9PntcclxuXHRcdFx0aWYoYS5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdGlmKGIuc3RhcnRlZEF0KXtcclxuXHRcdFx0XHRcdHJldHVybiBhLnN0YXJ0ZWRBdC5nZXRUaW1lKCktYi5zdGFydGVkQXQuZ2V0VGltZSgpXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gLTFcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGlmKGIuc3RhcnRlZEF0KXtcclxuXHRcdFx0XHRcdHJldHVybiAxXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gYS5jcmVhdGVkQXQuZ2V0VGltZSgpLWIuY3JlYXRlZEF0LmdldFRpbWUoKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiB7bWVtb3J5LCB3aXNoLCBhY3RpdmV9XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcbiJdfQ==