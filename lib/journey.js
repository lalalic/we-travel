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
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Journey);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Journey)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { entity: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Journey, [{
		key: "getData",
		value: function getData(_id) {
			var _this2 = this;

			_db.Journey.findOne({ _id: _id }, function (entity) {
				entity.startedAt && (entity.startedAt = new Date(entity.startedAt));
				entity.endedAt && (entity.endedAt = new Date(entity.endedAt));

				_this2.setState({ entity: entity });
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
							floatingLabelText: "快速计划你的行程",
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
						floatingLabelText: "一次有独特意义的旅行名称",
						fullWidth: true,
						defaultValue: journey.name }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", floatingLabelText: "开始日期",
						fullWidth: false,
						autoOk: true, defaultDate: journey.startedAt }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", floatingLabelText: "结束日期",
						fullWidth: false,
						autoOk: true, defaultDate: journey.endedAt }),
					_react2.default.createElement(_chipper2.default, {
						title: "更多信息",
						autoOpen: false,
						chips: ["徒步", "自驾", "自行车", "挑战", "放松", "家庭", "商务", "老人", "小孩", "情侣", { label: "预算", type: "number" }, "海滩", "人文", "山水", "都市", "会友", "蜜月", "生日", "周年庆"] }),
					scheduler
				),
				_react2.default.createElement(CommandBar, { className: "footbar", items: actions })
			);
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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(JourneyCreator).apply(this, arguments));
	}

	_createClass(JourneyCreator, [{
		key: "render",
		value: function render() {
			var _this5 = this;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { ref: "name", hintText: "名字", fullWidth: true }),
					_react2.default.createElement(
						"div",
						{ className: "grid" },
						_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", hintText: "开始日期",
							fullWidth: true, autoOk: true }),
						_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", hintText: "结束日期",
							fullWidth: true, autoOk: true })
					)
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Save", label: "保存", onSelect: function onSelect(e) {
							return _this5.save();
						}, icon: _cloudDone2.default }] })
			);
		}
	}, {
		key: "save",
		value: function save() {
			var _this6 = this;

			var _refs = this.refs;
			var name = _refs.name;
			var startedAt = _refs.startedAt;
			var endedAt = _refs.endedAt;

			_db.Journey.upsert({
				name: name.getValue(),
				startedAt: startedAt.getDate(),
				endedAt: endedAt.getDate()
			}).then(function (journey) {
				return _this6.context.router.replace("journey/" + journey._id);
			});
		}
	}]);

	return JourneyCreator;
}(Journey);

exports.default = Journey;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb3VybmV5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7O0lBRU87SUFBUzs7SUFDSzs7Ozs7Ozs7Ozs7Ozs7bU1BQ3BCLFFBQU0sRUFBQyxRQUFPLElBQVA7OztjQURhOzswQkFHWixLQUFJOzs7QUFDWCxlQUFVLE9BQVYsQ0FBa0IsRUFBQyxRQUFELEVBQWxCLEVBQXdCLGtCQUFRO0FBQy9CLFdBQU8sU0FBUCxLQUFxQixPQUFPLFNBQVAsR0FBaUIsSUFBSSxJQUFKLENBQVMsT0FBTyxTQUFQLENBQTFCLENBQXJCLENBRCtCO0FBRS9CLFdBQU8sT0FBUCxLQUFtQixPQUFPLE9BQVAsR0FBZSxJQUFJLElBQUosQ0FBUyxPQUFPLE9BQVAsQ0FBeEIsQ0FBbkIsQ0FGK0I7O0FBSS9CLFdBQUssUUFBTCxDQUFjLEVBQUMsY0FBRCxFQUFkLEVBSitCO0lBQVIsQ0FBeEIsQ0FEVzs7OztzQ0FTVTtBQUNyQixRQUFLLE9BQUwsQ0FBYSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEdBQWxCLENBQWIsQ0FEcUI7Ozs7NENBSU8sV0FBVTtBQUNoQyxPQUFHLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsR0FBbEIsSUFBdUIsVUFBVSxNQUFWLENBQWlCLEdBQWpCLEVBQ3RCLEtBQUssT0FBTCxDQUFhLFVBQVUsTUFBVixDQUFpQixHQUFqQixDQUFiLENBREo7Ozs7MkJBSUM7OztPQUNPLFVBQVMsS0FBSyxLQUFMLENBQWhCLE9BREE7OztBQUdQLE9BQUcsQ0FBQyxPQUFELEVBQ0YsT0FBUSw4QkFBQyxPQUFELE9BQVIsQ0FERDs7T0FHTyxZQUFvQixRQUFwQixVQU5BO09BTVcsVUFBUyxRQUFULFFBTlg7O0FBT1AsT0FBSSxrQkFB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VyxLQUFJLE1BQUosRUFBVyxVQUFTLElBQVQsRUFBYyxXQUFXLElBQVgsRUFBcEMsQ0FERDtLQUdDOztRQUFLLFdBQVUsTUFBVixFQUFMO01BQ0Msd0RBQVksS0FBSSxXQUFKLEVBQWdCLFVBQVMsTUFBVDtBQUMzQixrQkFBVyxJQUFYLEVBQWlCLFFBQVEsSUFBUixFQURsQixDQUREO01BR0Msd0RBQVksS0FBSSxTQUFKLEVBQWMsVUFBUyxNQUFUO0FBQ3pCLGtCQUFXLElBQVgsRUFBaUIsUUFBUSxJQUFSLEVBRGxCLENBSEQ7TUFIRDtLQUREO0lBWUMsMENBQUksVUFBSixJQUFlLFdBQVUsU0FBVjtBQUNDLFlBQU8sQ0FBQyxNQUFELEVBQ3JCLEVBQUMsUUFBTyxNQUFQLEVBQWUsT0FBTSxJQUFOLEVBQVksVUFBUztjQUFHLE9BQUssSUFBTDtPQUFILEVBQWdCLHlCQUFyRCxFQURxQixDQUFQLEVBRGhCLENBWkQ7SUFERCxDQURPOzs7O3lCQXNCRjs7O2VBQzRCLEtBQUssSUFBTCxDQUQ1QjtPQUNFLGtCQURGO09BQ1EsNEJBRFI7T0FDbUIsd0JBRG5COztBQUVMLGVBQVUsTUFBVixDQUFpQjtBQUNoQixVQUFLLEtBQUssUUFBTCxFQUFMO0FBQ0EsZUFBVSxVQUFVLE9BQVYsRUFBVjtBQUNBLGFBQVEsUUFBUSxPQUFSLEVBQVI7SUFIRCxFQUlHLElBSkgsQ0FJUTtXQUFTLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsT0FBcEIsY0FBdUMsUUFBUSxHQUFSO0lBQWhELENBSlIsQ0FGSzs7OztRQXZCYztFQUF1Qjs7a0JBbEh4QiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLFRleHRGaWVsZCwgRGF0ZVBpY2tlciwgQXZhdGFyLCBEaXZpZGVyLCBEaWFsb2d9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgSWNvblNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxyXG5pbXBvcnQgSWNvbk1hcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvbWFwXCJcclxuaW1wb3J0IEljb25TY2hlZHVsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZWRpdC1sb2NhdGlvblwiXHJcbmltcG9ydCBJY29uUHVibGlzaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuaW1wb3J0IEljb25SZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGVsZXRlXCJcclxuXHJcbmltcG9ydCBDaGlwcGVyIGZyb20gXCIuL2NvbXBvbmVudHMvY2hpcHBlclwiXHJcbmltcG9ydCBUZXh0RmllbGRXaXRoSWNvbiBmcm9tIFwiLi9jb21wb25lbnRzL3RleHRGaWVsZFdpdGhJY29uXCJcclxuaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9jb21wb25lbnRzL3NlYXJjaFRleHRGaWVsZFwiXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vY29tcG9uZW50cy9tYXBcIlxyXG5pbXBvcnQgSXRpbmVyYXJ5IGZyb20gXCIuL2NvbXBvbmVudHMvaXRpbmVyYXJ5XCJcclxuXHJcbmltcG9ydCB7Sm91cm5leSBhcyBKb3VybmV5REJ9IGZyb20gXCIuL2RiXCJcclxuXHJcbmNvbnN0IHtMb2FkaW5nLCBDb21tYW5kQmFyfT1VSVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBKb3VybmV5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtlbnRpdHk6bnVsbH1cclxuXHJcblx0Z2V0RGF0YShfaWQpe1xyXG5cdFx0Sm91cm5leURCLmZpbmRPbmUoe19pZH0sZW50aXR5PT57XHJcblx0XHRcdGVudGl0eS5zdGFydGVkQXQgJiYgKGVudGl0eS5zdGFydGVkQXQ9bmV3IERhdGUoZW50aXR5LnN0YXJ0ZWRBdCkpO1xyXG5cdFx0XHRlbnRpdHkuZW5kZWRBdCAmJiAoZW50aXR5LmVuZGVkQXQ9bmV3IERhdGUoZW50aXR5LmVuZGVkQXQpKTtcclxuXHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2VudGl0eX0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0dGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLl9pZClcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5wYXJhbXMuX2lkIT1uZXh0UHJvcHMucGFyYW1zLl9pZClcclxuICAgICAgICAgICAgdGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMuX2lkKVxyXG4gICAgfVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtlbnRpdHk6am91cm5leX09dGhpcy5zdGF0ZVxyXG5cclxuXHRcdGlmKCFqb3VybmV5KVxyXG5cdFx0XHRyZXR1cm4gKDxMb2FkaW5nLz4pXHJcblxyXG5cdFx0Y29uc3Qge3N0YXJ0ZWRBdCwgZW5kZWRBdH09am91cm5leVxyXG5cdFx0bGV0IHNjaGVkdWxlclxyXG5cdFx0bGV0IGFjdGlvbnM9W1xyXG5cdFx0XHRcIkJhY2tcIlxyXG5cdFx0XHQse2FjdGlvbjpcIkNvbW1lbnRcIlxyXG5cdFx0XHRcdCxsYWJlbDpcIuivhOiuulwiXHJcblx0XHRcdFx0LG9uU2VsZWN0OiBlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGNvbW1lbnQvJHtKb3VybmV5REIuX25hbWV9LyR7am91cm5leS5faWR9YCx7am91cm5leX0pXHJcblx0XHRcdFx0LGljb246SWNvblB1Ymxpc2h9XHJcblx0XHRdXHJcblx0XHRzd2l0Y2goSm91cm5leURCLmdldFN0YXRlKGpvdXJuZXkpKXtcclxuXHRcdGNhc2UgXCJNZW1vcnlcIjpcclxuXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcIlN0YXJ0aW5nXCI6XHJcblx0XHRjYXNlIFwiRW5kaW5nXCI6XHJcblx0XHRjYXNlIFwiVHJhdmVsaW5nXCI6XHJcblx0XHRjYXNlIFwiUGxhblwiOlxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0c2NoZWR1bGVyPShcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGpvdXJuZXkvJHtqb3VybmV5Ll9pZH0vaXRpbmVyYXJ5YCl9XHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5b+r6YCf6K6h5YiS5L2g55qE6KGM56iLXCJcclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbEZpeGVkPXt0cnVlfS8+XHJcblx0XHRcdFx0XHQ8SXRpbmVyYXJ5IGpvdXJuZXk9e2pvdXJuZXl9IG1vZGU9XCJwbGFjZVwiLz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cclxuXHRcdFx0YWN0aW9ucy5zcGxpY2UoMSwwLHtcclxuXHRcdFx0XHRhY3Rpb246XCJSZW1vdmVcIlxyXG5cdFx0XHRcdCxsYWJlbDpcIuWIoOmZpFwiXHJcblx0XHRcdFx0LG9uU2VsZWN0OmU9PnRoaXMucmVtb3ZlKClcclxuXHRcdFx0XHQsaWNvbjogSWNvblJlbW92ZVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJmbG9hdGluZyBzdGlja3kgdG9wIHJpZ2h0XCJcclxuXHRcdFx0XHRcdG1pbmk9e3RydWV9XHJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYHB1Ymxpc2gvam91cm5leS8ke2pvdXJuZXkuX2lkfWApfT5cclxuXHRcdFx0XHRcdCQ8SWNvblB1Ymxpc2gvPlxyXG5cdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwibmFtZVwiXHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5LiA5qyh5pyJ54us54m55oSP5LmJ55qE5peF6KGM5ZCN56ewXCJcclxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e2pvdXJuZXkubmFtZX0vPlxyXG5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInN0YXJ0ZWRBdFwiIGZsb2F0aW5nTGFiZWxUZXh0PVwi5byA5aeL5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfSBkZWZhdWx0RGF0ZT17am91cm5leS5zdGFydGVkQXR9Lz5cclxuXHJcblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJlbmRlZEF0XCIgZmxvYXRpbmdMYWJlbFRleHQ9XCLnu5PmnZ/ml6XmnJ9cIlxyXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9IGRlZmF1bHREYXRlPXtqb3VybmV5LmVuZGVkQXR9Lz5cclxuXHJcblx0XHRcdFx0XHQ8Q2hpcHBlclxyXG5cdFx0XHRcdFx0XHR0aXRsZT1cIuabtOWkmuS/oeaBr1wiXHJcblx0XHRcdFx0XHRcdGF1dG9PcGVuPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0Y2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XHRcdFwi5b6S5q2lXCIsXCLoh6rpqb5cIixcIuiHquihjOi9plwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmjJHmiJhcIixcIuaUvuadvlwiLFwi5a625bqtXCIsXCLllYbliqFcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6ICB5Lq6XCIsXCLlsI/lralcIixcIuaDheS+o1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0e2xhYmVsOlwi6aKE566XXCIsdHlwZTpcIm51bWJlclwifSxcclxuXHRcdFx0XHRcdFx0XHRcdFwi5rW35rupXCIsXCLkurrmlodcIixcIuWxseawtFwiLFwi6YO95biCXCIsXCLkvJrlj4tcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6Jyc5pyIXCIsXCLnlJ/ml6VcIixcIuWRqOW5tOW6hlwiXHJcblx0XHRcdFx0XHRcdFx0XX0vPlxyXG5cclxuXHRcdFx0XHRcdHtzY2hlZHVsZXJ9XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17YWN0aW9uc30vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHJlbW92ZSgpe1xyXG5cdFx0Sm91cm5leURCLnJlbW92ZSh0aGlzLnN0YXRlLmVudGl0eSlcclxuXHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShcIi9cIilcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIEpvdXJuZXlDcmVhdG9yIGV4dGVuZHMgSm91cm5leXtcclxuXHRcdHJlbmRlcigpe1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwibmFtZVwiIGhpbnRUZXh0PVwi5ZCN5a2XXCIgZnVsbFdpZHRoPXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJzdGFydGVkQXRcIiBoaW50VGV4dD1cIuW8gOWni+aXpeacn1wiXHJcblx0XHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGF1dG9Paz17dHJ1ZX0vPlxyXG5cdFx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImVuZGVkQXRcIiBoaW50VGV4dD1cIue7k+adn+aXpeacn1wiXHJcblx0XHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9IGF1dG9Paz17dHJ1ZX0vPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG5cdCAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcclxuXHRcdFx0XHRcdFx0XHR7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBvblNlbGVjdDplPT50aGlzLnNhdmUoKSwgaWNvbjpJY29uU2F2ZX1cclxuXHRcdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHJcblx0XHRzYXZlKCl7XHJcblx0XHRcdGNvbnN0IHtuYW1lLCBzdGFydGVkQXQsIGVuZGVkQXR9PXRoaXMucmVmc1xyXG5cdFx0XHRKb3VybmV5REIudXBzZXJ0KHtcclxuXHRcdFx0XHRuYW1lOm5hbWUuZ2V0VmFsdWUoKSxcclxuXHRcdFx0XHRzdGFydGVkQXQ6c3RhcnRlZEF0LmdldERhdGUoKSxcclxuXHRcdFx0XHRlbmRlZEF0OmVuZGVkQXQuZ2V0RGF0ZSgpXHJcblx0XHRcdH0pLnRoZW4oam91cm5leT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBqb3VybmV5LyR7am91cm5leS5faWR9YCkpXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==