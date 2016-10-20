"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _map = require("material-ui/svg-icons/maps/map");

var _map2 = _interopRequireDefault(_map);

var _editLocation = require("material-ui/svg-icons/maps/edit-location");

var _editLocation2 = _interopRequireDefault(_editLocation);

var _cameraRoll = require("material-ui/svg-icons/image/camera-roll");

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

var _delete = require("material-ui/svg-icons/action/delete");

var _delete2 = _interopRequireDefault(_delete);

var _chipper = require("./components/chipper");

var _chipper2 = _interopRequireDefault(_chipper);

var _textFieldWithIcon = require("./components/textFieldWithIcon");

var _textFieldWithIcon2 = _interopRequireDefault(_textFieldWithIcon);

var _searchTextField = require("./components/searchTextField");

var _searchTextField2 = _interopRequireDefault(_searchTextField);

var _map3 = require("./components/map");

var _map4 = _interopRequireDefault(_map3);

var _itinerary = require("./components/itinerary");

var _itinerary2 = _interopRequireDefault(_itinerary);

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = _qiliApp.UI.Loading;
var CommandBar = _qiliApp.UI.CommandBar;

var Journey = function (_Component) {
	_inherits(Journey, _Component);

	function Journey() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Journey);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Journey.__proto__ || Object.getPrototypeOf(Journey)).call.apply(_ref, [this].concat(args))), _this), _this.state = { entity: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Journey, [{
		key: "getData",
		value: function getData(_id) {
			var _this2 = this;

			_db.Journey.findOne({ _id: _id }, function (entity) {
				if (entity) {
					_this2.setState({ entity: entity });
				}
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.getData(this.props.params._id);
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.params._id != nextProps.params._id) this.getData(nextProps.params._id);
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var journey = this.state.entity;


			if (!journey) return _react2.default.createElement(Loading, null);

			var startedAt = journey.startedAt;
			var endedAt = journey.endedAt;

			var scheduler = void 0;
			var actions = ["Back", { action: "Comment",
				label: "评论",
				onSelect: function onSelect(e) {
					return _this3.context.router.push("comment/" + _db.Journey._name + "/" + journey._id, { journey: journey });
				},
				icon: _cameraRoll2.default }];
			switch (_db.Journey.getState(journey)) {
				case "Memory":

					break;
				case "Starting":
				case "Ending":
				case "Traveling":
				case "Plan":
				default:
					scheduler = _react2.default.createElement(
						"div",
						null,
						_react2.default.createElement(_materialUi.TextField, { onClick: function onClick(e) {
								return _this3.context.router.push("journey/" + journey._id + "/itinerary");
							},
							floatingLabelText: "\u5FEB\u901F\u8BA1\u5212\u4F60\u7684\u884C\u7A0B",
							defaultValue: "...",
							floatingLabelFixed: true }),
						_react2.default.createElement(_itinerary2.default, { journey: journey, mode: "place" })
					);

					actions.splice(1, 0, {
						action: "Remove",
						label: "删除",
						onSelect: function onSelect(e) {
							return _this3.remove();
						},
						icon: _delete2.default
					});
			}

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "floating sticky top right",
						mini: true,
						onClick: function onClick(e) {
							return _this3.context.router.push("publish/journey/" + journey._id);
						} },
					"$",
					_react2.default.createElement(_cameraRoll2.default, null)
				),
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { ref: "name",
						floatingLabelText: "\u4E00\u6B21\u6709\u72EC\u7279\u610F\u4E49\u7684\u65C5\u884C\u540D\u79F0",
						fullWidth: true,
						defaultValue: journey.name,
						onBlur: function onBlur(_ref2) {
							var value = _ref2.target.value;
							return value != journey.name && _this3.update({ name: value });
						},
						onKeyDown: function onKeyDown(_ref3) {
							var keyCode = _ref3.keyCode;
							var value = _ref3.target.value;
							keyCode == 13 && value != journey.name && _this3.update({ name: value });
						} }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", floatingLabelText: "\u5F00\u59CB\u65E5\u671F",
						fullWidth: false,
						onChange: function onChange(e, startedAt) {
							return startedAt != journey.startedAt && _this3.update({ startedAt: startedAt });
						},
						autoOk: true, defaultDate: journey.startedAt }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", floatingLabelText: "\u7ED3\u675F\u65E5\u671F",
						fullWidth: false,
						onChange: function onChange(e, endedAt) {
							return endedAt != journey.endedAt && _this3.update({ endedAt: endedAt });
						},
						autoOk: true, defaultDate: journey.endedAt }),
					_react2.default.createElement(_chipper2.default, {
						title: "\u66F4\u591A\u4FE1\u606F",
						autoOpen: false,
						chips: ["徒步", "自驾", "自行车", "挑战", "放松", "家庭", "商务", "老人", "小孩", "情侣", { label: "预算", type: "number" }, "海滩", "人文", "山水", "都市", "会友", "蜜月", "生日", "周年庆"] }),
					scheduler
				),
				_react2.default.createElement(CommandBar, { className: "footbar", items: actions })
			);
		}
	}, {
		key: "update",
		value: function update(changed) {
			var _this4 = this;

			var journey = this.state.entity;

			_db.Journey.upsert(Object.assign(journey, changed)).then(function (updated) {
				return _this4.setState({ entity: updated });
			});
		}
	}, {
		key: "remove",
		value: function remove() {
			_db.Journey.remove(this.state.entity);
			this.context.router.replace("/");
		}
	}]);

	return Journey;
}(_react.Component);

Journey.contextTypes = {
	router: _react2.default.PropTypes.object
};

Journey.Creator = function (_Journey) {
	_inherits(JourneyCreator, _Journey);

	function JourneyCreator() {
		_classCallCheck(this, JourneyCreator);

		return _possibleConstructorReturn(this, (JourneyCreator.__proto__ || Object.getPrototypeOf(JourneyCreator)).apply(this, arguments));
	}

	_createClass(JourneyCreator, [{
		key: "getData",
		value: function getData() {}
	}, {
		key: "render",
		value: function render() {
			var _this6 = this;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { ref: "name",
						floatingLabelText: "\u4E00\u6B21\u6709\u72EC\u7279\u610F\u4E49\u7684\u65C5\u884C\u540D\u79F0",
						fullWidth: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", floatingLabelText: "\u5F00\u59CB\u65E5\u671F",
						fullWidth: false,
						autoOk: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", floatingLabelText: "\u7ED3\u675F\u65E5\u671F",
						fullWidth: false,
						autoOk: true })
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Save", label: "保存", onSelect: function onSelect(e) {
							return _this6.save();
						}, icon: _cloudDone2.default }] })
			);
		}
	}, {
		key: "save",
		value: function save() {
			var _this7 = this;

			var _refs = this.refs;
			var name = _refs.name;
			var startedAt = _refs.startedAt;
			var endedAt = _refs.endedAt;

			_db.Journey.upsert({
				name: name.getValue(),
				startedAt: startedAt.getDate(),
				endedAt: endedAt.getDate()
			}).then(function (journey) {
				return _this7.context.router.replace("journey/" + journey._id);
			});
		}
	}]);

	return JourneyCreator;
}(Journey);

exports.default = Journey;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb3VybmV5LmpzIl0sIm5hbWVzIjpbIkxvYWRpbmciLCJDb21tYW5kQmFyIiwiSm91cm5leSIsInN0YXRlIiwiZW50aXR5IiwiX2lkIiwiZmluZE9uZSIsInNldFN0YXRlIiwiZ2V0RGF0YSIsInByb3BzIiwicGFyYW1zIiwibmV4dFByb3BzIiwiam91cm5leSIsInN0YXJ0ZWRBdCIsImVuZGVkQXQiLCJzY2hlZHVsZXIiLCJhY3Rpb25zIiwiYWN0aW9uIiwibGFiZWwiLCJvblNlbGVjdCIsImNvbnRleHQiLCJyb3V0ZXIiLCJwdXNoIiwiX25hbWUiLCJpY29uIiwiZ2V0U3RhdGUiLCJzcGxpY2UiLCJyZW1vdmUiLCJwYWRkaW5nIiwibmFtZSIsInZhbHVlIiwidGFyZ2V0IiwidXBkYXRlIiwia2V5Q29kZSIsImUiLCJ0eXBlIiwiY2hhbmdlZCIsInVwc2VydCIsIk9iamVjdCIsImFzc2lnbiIsInRoZW4iLCJ1cGRhdGVkIiwicmVwbGFjZSIsImNvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsIkNyZWF0b3IiLCJzYXZlIiwicmVmcyIsImdldFZhbHVlIiwiZ2V0RGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFT0EsTyxlQUFBQSxPO0lBQVNDLFUsZUFBQUEsVTs7SUFDS0MsTzs7Ozs7Ozs7Ozs7Ozs7c0xBQ3BCQyxLLEdBQU0sRUFBQ0MsUUFBTyxJQUFSLEU7Ozs7OzBCQUVFQyxHLEVBQUk7QUFBQTs7QUFDWCxlQUFVQyxPQUFWLENBQWtCLEVBQUNELFFBQUQsRUFBbEIsRUFBd0Isa0JBQVE7QUFDL0IsUUFBR0QsTUFBSCxFQUFVO0FBQ1QsWUFBS0csUUFBTCxDQUFjLEVBQUNILGNBQUQsRUFBZDtBQUNBO0FBQ0QsSUFK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SUFERixTQUNFQSxJQURGO0FBQUEsT0FDUWhCLFNBRFIsU0FDUUEsU0FEUjtBQUFBLE9BQ21CQyxPQURuQixTQUNtQkEsT0FEbkI7O0FBRUwsZUFBVXVCLE1BQVYsQ0FBaUI7QUFDaEJSLFVBQUtBLEtBQUtvQixRQUFMLEVBRFc7QUFFaEJwQyxlQUFVQSxVQUFVcUMsT0FBVixFQUZNO0FBR2hCcEMsYUFBUUEsUUFBUW9DLE9BQVI7QUFIUSxJQUFqQixFQUlHVixJQUpILENBSVE7QUFBQSxXQUFTLE9BQUtwQixPQUFMLENBQWFDLE1BQWIsQ0FBb0JxQixPQUFwQixjQUF1QzlCLFFBQVFQLEdBQS9DLENBQVQ7QUFBQSxJQUpSO0FBS0E7Ozs7RUFwQzBDSCxPOztrQkE1SHhCQSxPIiwiZmlsZSI6ImpvdXJuZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuXHJcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b24sVGV4dEZpZWxkLCBEYXRlUGlja2VyLCBBdmF0YXIsIERpdmlkZXIsIERpYWxvZ30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5pbXBvcnQgSWNvblNjaGVkdWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9lZGl0LWxvY2F0aW9uXCJcclxuaW1wb3J0IEljb25QdWJsaXNoIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIlxyXG5pbXBvcnQgSWNvblJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kZWxldGVcIlxyXG5cclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jaGlwcGVyXCJcclxuaW1wb3J0IFRleHRGaWVsZFdpdGhJY29uIGZyb20gXCIuL2NvbXBvbmVudHMvdGV4dEZpZWxkV2l0aEljb25cIlxyXG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoVGV4dEZpZWxkXCJcclxuaW1wb3J0IE1hcCBmcm9tIFwiLi9jb21wb25lbnRzL21hcFwiXHJcbmltcG9ydCBJdGluZXJhcnkgZnJvbSBcIi4vY29tcG9uZW50cy9pdGluZXJhcnlcIlxyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQn0gZnJvbSBcIi4vZGJcIlxyXG5cclxuY29uc3Qge0xvYWRpbmcsIENvbW1hbmRCYXJ9PVVJXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvdXJuZXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e2VudGl0eTpudWxsfVxyXG5cclxuXHRnZXREYXRhKF9pZCl7XHJcblx0XHRKb3VybmV5REIuZmluZE9uZSh7X2lkfSxlbnRpdHk9PntcclxuXHRcdFx0aWYoZW50aXR5KXtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHl9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0dGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLl9pZClcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wYXJhbXMuX2lkIT1uZXh0UHJvcHMucGFyYW1zLl9pZClcclxuICAgICAgICAgICAgdGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxyXG4gICAgfVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtlbnRpdHk6am91cm5leX09dGhpcy5zdGF0ZVxyXG5cclxuXHRcdGlmKCFqb3VybmV5KVxyXG5cdFx0XHRyZXR1cm4gKDxMb2FkaW5nLz4pXHJcblxyXG5cdFx0Y29uc3Qge3N0YXJ0ZWRBdCwgZW5kZWRBdH09am91cm5leVxyXG5cdFx0bGV0IHNjaGVkdWxlclxyXG5cdFx0bGV0IGFjdGlvbnM9W1xyXG5cdFx0XHRcIkJhY2tcIlxyXG5cdFx0XHQse2FjdGlvbjpcIkNvbW1lbnRcIlxyXG5cdFx0XHRcdCxsYWJlbDpcIuivhOiuulwiXHJcblx0XHRcdFx0LG9uU2VsZWN0OiBlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGNvbW1lbnQvJHtKb3VybmV5REIuX25hbWV9LyR7am91cm5leS5faWR9YCx7am91cm5leX0pXHJcblx0XHRcdFx0LGljb246SWNvblB1Ymxpc2h9XHJcblx0XHRdXHJcblx0XHRzd2l0Y2goSm91cm5leURCLmdldFN0YXRlKGpvdXJuZXkpKXtcclxuXHRcdGNhc2UgXCJNZW1vcnlcIjpcclxuXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcIlN0YXJ0aW5nXCI6XHJcblx0XHRjYXNlIFwiRW5kaW5nXCI6XHJcblx0XHRjYXNlIFwiVHJhdmVsaW5nXCI6XHJcblx0XHRjYXNlIFwiUGxhblwiOlxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0c2NoZWR1bGVyPShcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGpvdXJuZXkvJHtqb3VybmV5Ll9pZH0vaXRpbmVyYXJ5YCl9XHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5b+r6YCf6K6h5YiS5L2g55qE6KGM56iLXCJcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPVwiLi4uXCJcclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbEZpeGVkPXt0cnVlfS8+XHJcblx0XHRcdFx0XHQ8SXRpbmVyYXJ5IGpvdXJuZXk9e2pvdXJuZXl9IG1vZGU9XCJwbGFjZVwiLz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cclxuXHRcdFx0YWN0aW9ucy5zcGxpY2UoMSwwLHtcclxuXHRcdFx0XHRhY3Rpb246XCJSZW1vdmVcIlxyXG5cdFx0XHRcdCxsYWJlbDpcIuWIoOmZpFwiXHJcblx0XHRcdFx0LG9uU2VsZWN0OmU9PnRoaXMucmVtb3ZlKClcclxuXHRcdFx0XHQsaWNvbjogSWNvblJlbW92ZVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJmbG9hdGluZyBzdGlja3kgdG9wIHJpZ2h0XCJcclxuXHRcdFx0XHRcdG1pbmk9e3RydWV9XHJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYHB1Ymxpc2gvam91cm5leS8ke2pvdXJuZXkuX2lkfWApfT5cclxuXHRcdFx0XHRcdCQ8SWNvblB1Ymxpc2gvPlxyXG5cdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwibmFtZVwiXHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5LiA5qyh5pyJ54us54m55oSP5LmJ55qE5peF6KGM5ZCN56ewXCJcclxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e2pvdXJuZXkubmFtZX1cclxuXHRcdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PnZhbHVlIT1qb3VybmV5Lm5hbWUgJiYgdGhpcy51cGRhdGUoe25hbWU6dmFsdWV9KX1cclxuXHRcdFx0XHRcdFx0b25LZXlEb3duPXsoe2tleUNvZGUsdGFyZ2V0Ont2YWx1ZX19KT0+e2tleUNvZGU9PTEzICYmIHZhbHVlIT1qb3VybmV5Lm5hbWUgJiYgdGhpcy51cGRhdGUoe25hbWU6dmFsdWV9KX19Lz4gXHJcblxyXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwic3RhcnRlZEF0XCIgZmxvYXRpbmdMYWJlbFRleHQ9XCLlvIDlp4vml6XmnJ9cIlxyXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17KGUsc3RhcnRlZEF0KT0+c3RhcnRlZEF0IT1qb3VybmV5LnN0YXJ0ZWRBdCAmJiB0aGlzLnVwZGF0ZSh7c3RhcnRlZEF0fSl9XHJcblx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX0gZGVmYXVsdERhdGU9e2pvdXJuZXkuc3RhcnRlZEF0fS8+XHJcblxyXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwiZW5kZWRBdFwiIGZsb2F0aW5nTGFiZWxUZXh0PVwi57uT5p2f5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhlLGVuZGVkQXQpPT5lbmRlZEF0IT1qb3VybmV5LmVuZGVkQXQgJiYgdGhpcy51cGRhdGUoe2VuZGVkQXR9KX1cclxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfSBkZWZhdWx0RGF0ZT17am91cm5leS5lbmRlZEF0fS8+XHJcblxyXG5cdFx0XHRcdFx0PENoaXBwZXJcclxuXHRcdFx0XHRcdFx0dGl0bGU9XCLmm7TlpJrkv6Hmga9cIlxyXG5cdFx0XHRcdFx0XHRhdXRvT3Blbj17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdGNoaXBzPXtbXHJcblx0XHRcdFx0XHRcdFx0XHRcIuW+kuatpVwiLFwi6Ieq6am+XCIsXCLoh6rooYzovaZcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi5oyR5oiYXCIsXCLmlL7mnb5cIixcIuWutuW6rVwiLFwi5ZWG5YqhXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuiAgeS6ulwiLFwi5bCP5a2pXCIsXCLmg4XkvqNcIixcclxuXHRcdFx0XHRcdFx0XHRcdHtsYWJlbDpcIumihOeul1wiLHR5cGU6XCJudW1iZXJcIn0sXHJcblx0XHRcdFx0XHRcdFx0XHRcIua1t+a7qVwiLFwi5Lq65paHXCIsXCLlsbHmsLRcIixcIumDveW4glwiLFwi5Lya5Y+LXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuicnOaciFwiLFwi55Sf5pelXCIsXCLlkajlubTluoZcIlxyXG5cdFx0XHRcdFx0XHRcdF19Lz5cclxuXHJcblx0XHRcdFx0XHR7c2NoZWR1bGVyfVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e2FjdGlvbnN9Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdHVwZGF0ZShjaGFuZ2VkKXtcclxuXHRcdGNvbnN0IHtlbnRpdHk6am91cm5leX09dGhpcy5zdGF0ZVxyXG5cdFx0Sm91cm5leURCLnVwc2VydChPYmplY3QuYXNzaWduKGpvdXJuZXksY2hhbmdlZCkpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PnRoaXMuc2V0U3RhdGUoe2VudGl0eTp1cGRhdGVkfSkpXHJcblx0fVxyXG5cclxuXHRyZW1vdmUoKXtcclxuXHRcdEpvdXJuZXlEQi5yZW1vdmUodGhpcy5zdGF0ZS5lbnRpdHkpXHJcblx0XHR0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoXCIvXCIpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgQ3JlYXRvcj1jbGFzcyBKb3VybmV5Q3JlYXRvciBleHRlbmRzIEpvdXJuZXl7XHJcblx0XHRnZXREYXRhKCl7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0cmVuZGVyKCl7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJuYW1lXCJcclxuXHRcdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuS4gOasoeacieeLrOeJueaEj+S5ieeahOaXheihjOWQjeensFwiXHJcblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfS8+IFxyXG5cclxuXHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwic3RhcnRlZEF0XCIgZmxvYXRpbmdMYWJlbFRleHQ9XCLlvIDlp4vml6XmnJ9cIlxyXG5cdFx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJlbmRlZEF0XCIgZmxvYXRpbmdMYWJlbFRleHQ9XCLnu5PmnZ/ml6XmnJ9cIlxyXG5cdFx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfS8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuXHQgICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsXHJcblx0XHRcdFx0XHRcdFx0e2FjdGlvbjpcIlNhdmVcIiwgbGFiZWw6XCLkv53lrZhcIiwgb25TZWxlY3Q6ZT0+dGhpcy5zYXZlKCksIGljb246SWNvblNhdmV9XHJcblx0XHRcdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblxyXG5cdFx0c2F2ZSgpe1xyXG5cdFx0XHRjb25zdCB7bmFtZSwgc3RhcnRlZEF0LCBlbmRlZEF0fT10aGlzLnJlZnNcclxuXHRcdFx0Sm91cm5leURCLnVwc2VydCh7XHJcblx0XHRcdFx0bmFtZTpuYW1lLmdldFZhbHVlKCksXHJcblx0XHRcdFx0c3RhcnRlZEF0OnN0YXJ0ZWRBdC5nZXREYXRlKCksXHJcblx0XHRcdFx0ZW5kZWRBdDplbmRlZEF0LmdldERhdGUoKVxyXG5cdFx0XHR9KS50aGVuKGpvdXJuZXk9PnRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShgam91cm5leS8ke2pvdXJuZXkuX2lkfWApKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=