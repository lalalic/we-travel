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
			showHistory: true
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

			return _react2.default.createElement(
				"div",
				null,
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
				showHistory && memory.length && _react2.default.createElement(
					_Stepper.Stepper,
					{ orientation: "vertical", activeStep: -1 },
					memory.map(function (_ref) {
						var _id = _ref._id;
						var name = _ref.name;
						var startedAt = _ref.startedAt;
						return _react2.default.createElement(
							_Stepper.Step,
							{ key: name, completed: true },
							_react2.default.createElement(
								_Stepper.StepLabel,
								null,
								_react2.default.createElement(
									"div",
									{ onClick: function onClick(e) {
											return _this3.context.router.push("journey/" + _id);
										} },
									startedAt.smartFormat(),
									_react2.default.createElement("br", null),
									name
								)
							)
						);
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
						wish.map(function (_ref2) {
							var _id = _ref2._id;
							var name = _ref2.name;
							var startedAt = _ref2.startedAt;
							return _react2.default.createElement(
								_Stepper.Step,
								{ key: name, completed: false },
								_react2.default.createElement(
									_Stepper.StepLabel,
									null,
									_react2.default.createElement(
										"div",
										{ onClick: function onClick(e) {
												return _this3.context.router.push("journey/" + _id);
											} },
										startedAt.smartFormat(),
										_react2.default.createElement("br", null),
										name
									)
								)
							);
						})
					)
				) || _react2.default.createElement(
					Empty,
					{ icon: _react2.default.createElement(_directionsWalk2.default, null) },
					"来,开始你的心旅程"
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
//# sourceMappingURL=data:application/json;base64,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Q0FBRCxFQUFHLENBQUgsRUFBTztBQUNoQixRQUFHLEVBQUUsU0FBRixFQUFZO0FBQ2QsU0FBRyxFQUFFLFNBQUYsRUFBWTtBQUNkLGFBQU8sRUFBRSxTQUFGLENBQVksT0FBWixLQUFzQixFQUFFLFNBQUYsQ0FBWSxPQUFaLEVBQXRCLENBRE87TUFBZixNQUVLO0FBQ0osYUFBTyxDQUFDLENBQUQsQ0FESDtNQUZMO0tBREQsTUFNSztBQUNKLFNBQUcsRUFBRSxTQUFGLEVBQVk7QUFDZCxhQUFPLENBQVAsQ0FEYztNQUFmLE1BRUs7QUFDSixhQUFPLEVBQUUsU0FBRixDQUFZLE9BQVosS0FBc0IsRUFBRSxTQUFGLENBQVksT0FBWixFQUF0QixDQURIO01BRkw7S0FQRDtJQURTLENBQVYsQ0F2Q2M7QUFzRGQsVUFBTyxFQUFDLGNBQUQsRUFBUyxVQUFULEVBQWUsY0FBZixFQUFQLENBdERjOzs7Ozs7O09BeURSLGVBQWE7QUFDbkIsU0FBUSxpQkFBVSxNQUFWIiwiZmlsZSI6ImxpZmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7VUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLCBGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b24sIEljb25CdXR0b24sIERpYWxvZ30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtTdGVwLFN0ZXBwZXIsU3RlcExhYmVsLFN0ZXBDb250ZW50fSBmcm9tICdtYXRlcmlhbC11aS9TdGVwcGVyJ1xyXG5cclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBJY29uTW9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLWhvcml6J1xyXG5pbXBvcnQgSWNvbkFkZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQnXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBGb290cHJpbnQgYXMgRm9vdHByaW50REJ9IGZyb20gXCIuL2RiXCJcclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jaGlwcGVyXCJcclxuaW1wb3J0IEpvdXJuZXkgZnJvbSBcIi4vY29tcG9uZW50cy9qb3VybmV5XCJcclxuXHJcbmNvbnN0IHtFbXB0eSwgUGhvdG99PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRqb3VybmV5czpbXSxcclxuXHRcdHNob3dIaXN0b3J5OnRydWVcclxuXHR9XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdEpvdXJuZXlEQi5maW5kKClcclxuXHRcdFx0LmZldGNoKGpvdXJuZXlzPT50aGlzLnNldFN0YXRlKHtqb3VybmV5c30pKVxyXG5cdH1cclxuXHRcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtqb3VybmV5cywgc2hvd0hpc3Rvcnl9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHttZW1vcnksIHdpc2gsIGFjdGl2ZX09dGhpcy5ncm91cChqb3VybmV5cylcclxuXHRcdGxldCBwdWJsaXNoZXI9bnVsbFxyXG5cdFx0XHJcblx0XHRpZihtZW1vcnkubGVuZ3RoIHx8IGFjdGl2ZS5sZW5ndGgpe1xyXG5cdFx0XHRwdWJsaXNoZXI9KFxyXG5cdFx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBcclxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSBib3R0b20gcmlnaHRcIlxyXG5cdFx0XHRcdFx0bWluaT17dHJ1ZX0gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwicHVibGlzaFwiLHtqb3VybmV5OmFjdGl2ZVswXX0pfT5cclxuXHRcdFx0XHRcdDxJY29uUHVibGlzaC8+JFxyXG5cdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdHtwdWJsaXNoZXJ9XHJcblx0XHRcdFxyXG5cdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gXHJcblx0XHRcdFx0Y2xhc3NOYW1lPVwiZmxvYXRpbmcgc3RpY2t5IHRvcCByaWdodFwiXHJcblx0XHRcdFx0bWluaT17dHJ1ZX0gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwiam91cm5leS9fbmV3XCIpfT5cclxuXHRcdFx0XHQ8SWNvbkFkZC8+XHJcblx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblx0XHRcdFxyXG5cdFx0XHR7c2hvd0hpc3RvcnkgJiYgbWVtb3J5Lmxlbmd0aCAmJiAoXHJcblx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRtZW1vcnkubWFwKCh7X2lkLCBuYW1lLCBzdGFydGVkQXR9KT0+KFxyXG5cdFx0XHRcdFx0XHQ8U3RlcCBrZXk9e25hbWV9IGNvbXBsZXRlZD17dHJ1ZX0+XHJcblx0XHRcdFx0XHRcdFx0PFN0ZXBMYWJlbD5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBqb3VybmV5LyR7X2lkfWApfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e3N0YXJ0ZWRBdC5zbWFydEZvcm1hdCgpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8YnIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7bmFtZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0XHQ8L1N0ZXA+XHJcblx0XHRcdFx0XHQpKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdCl8fG51bGx9XHJcblx0XHRcdFxyXG5cdFx0XHR7YWN0aXZlLmxlbmd0aCAmJiAoXHJcblx0XHRcdFx0YWN0aXZlLm1hcChqb3VybmV5PT4oXHJcblx0XHRcdFx0XHQ8Sm91cm5leSBrZXk9e2pvdXJuZXl9IGpvdXJuZXk9e2pvdXJuZXl9Lz5cclxuXHRcdFx0XHQpKVxyXG5cdFx0XHQpfHxudWxsfVxyXG5cdFx0XHRcclxuXHRcdFx0e3dpc2gubGVuZ3RoICYmIChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PFN0ZXBwZXIgb3JpZW50YXRpb249XCJ2ZXJ0aWNhbFwiIGFjdGl2ZVN0ZXA9ey0xfSBsaW5lYXI9e2ZhbHNlfT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0d2lzaC5tYXAoKHtfaWQsbmFtZSwgc3RhcnRlZEF0fSk9PihcclxuXHRcdFx0XHRcdFx0XHQ8U3RlcCBrZXk9e25hbWV9IGNvbXBsZXRlZD17ZmFsc2V9PlxyXG5cdFx0XHRcdFx0XHRcdFx0PFN0ZXBMYWJlbD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGpvdXJuZXkvJHtfaWR9YCl9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtzdGFydGVkQXQuc21hcnRGb3JtYXQoKX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8YnIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtuYW1lfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0XHRcdFx0KSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdDwvU3RlcHBlcj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KXx8KDxFbXB0eSBpY29uPXs8TG9nby8+fT7mnaUs5byA5aeL5L2g55qE5b+D5peF56iLPC9FbXB0eT4pfVxyXG5cdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdGdyb3VwKGpvdXJuZXlzKXtcclxuXHRcdGxldCBub3c9bmV3IERhdGUoKVxyXG5cdFx0bGV0IG1lbW9yeT1bXSwgd2lzaD1bXSwgYWN0aXZlPVtdXHJcblx0XHRqb3VybmV5cy5mb3JFYWNoKGpvdXJuZXk9PntcclxuXHRcdFx0bGV0IHtzdGFydGVkQXQsIGVuZGVkQXR9PWpvdXJuZXlcclxuXHRcdFx0bGV0IHN0YXJ0ZWQ9bnVsbCwgZW5kZWQ9bnVsbFxyXG5cdFx0XHRcclxuXHRcdFx0aWYoc3RhcnRlZEF0KXtcclxuXHRcdFx0XHRzdGFydGVkPW5vdy5yZWxhdGl2ZShzdGFydGVkQXQpXHJcblx0XHRcdFx0aWYoc3RhcnRlZDwwKXtcclxuXHRcdFx0XHRcdHdpc2gucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fWVsc2UgaWYoc3RhcnRlZD09MCl7XHJcblx0XHRcdFx0XHRhY3RpdmUucHVzaChqb3VybmV5KVxyXG5cdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZihlbmRlZEF0KXtcclxuXHRcdFx0XHRlbmRlZD1ub3cucmVsYXRpdmUoZW5kZWRBdClcclxuXHRcdFx0XHRpZihlbmRlZD4wKXtcclxuXHRcdFx0XHRcdG1lbW9yeS5wdXNoKGpvdXJuZXkpXHJcblx0XHRcdFx0XHRyZXR1cm4gXHJcblx0XHRcdFx0fWVsc2UgaWYoZW5kZWQ9PTApe1xyXG5cdFx0XHRcdFx0YWN0aXZlLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYoc3RhcnRlZCE9bnVsbCAmJiBlbmRlZCE9bnVsbCAmJiBzdGFydGVkPjAgJiYgZW5kZWQ8MCl7XHJcblx0XHRcdFx0YWN0aXZlLnB1c2goam91cm5leSlcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0Ly91bmNvbmZpcm1lZCBhcyB3aXNoXHJcblx0XHRcdHdpc2gucHVzaChqb3VybmV5KVxyXG5cdFx0fSlcclxuXHRcdG1lbW9yeS5zb3J0KChhLGIpPT5hLnN0YXJ0ZWRBdC5nZXRUaW1lKCktYi5zdGFydGVkQXQuZ2V0VGltZSgpKVxyXG5cdFx0YWN0aXZlLnNvcnQoKGEsYik9PmEuc3RhcnRlZEF0LmdldFRpbWUoKS1iLnN0YXJ0ZWRBdC5nZXRUaW1lKCkpXHJcblx0XHR3aXNoLnNvcnQoKGEsYik9PntcclxuXHRcdFx0aWYoYS5zdGFydGVkQXQpe1xyXG5cdFx0XHRcdGlmKGIuc3RhcnRlZEF0KXtcclxuXHRcdFx0XHRcdHJldHVybiBhLnN0YXJ0ZWRBdC5nZXRUaW1lKCktYi5zdGFydGVkQXQuZ2V0VGltZSgpXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gLTFcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGlmKGIuc3RhcnRlZEF0KXtcclxuXHRcdFx0XHRcdHJldHVybiAxXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gYS5jcmVhdGVkQXQuZ2V0VGltZSgpLWIuY3JlYXRlZEF0LmdldFRpbWUoKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiB7bWVtb3J5LCB3aXNoLCBhY3RpdmV9XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcbiJdfQ==