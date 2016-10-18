"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _Divider = require("material-ui/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _qiliApp = require("qili-app");

var _List = require("material-ui/List");

var _keyboardArrowRight = require("material-ui/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _arrowDownward = require("material-ui/svg-icons/navigation/arrow-downward");

var _arrowDownward2 = _interopRequireDefault(_arrowDownward);

var _removeCircleOutline = require("material-ui/svg-icons/content/remove-circle-outline");

var _removeCircleOutline2 = _interopRequireDefault(_removeCircleOutline);

var _map = require("./components/map");

var _map2 = _interopRequireDefault(_map);

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectableList = _List.List;

var Itinerary = function (_Component) {
	_inherits(Itinerary, _Component);

	function Itinerary() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Itinerary);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Itinerary)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			itinerary: [{ place: "beijing", days: 1 }, { place: "Geneva", days: 1 }],
			editing: false
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Itinerary, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _state = this.state;
			var itinerary = _state.itinerary;
			var editing = _state.editing;

			var actions = ["action"];
			if (editing) actions.push({ action: "edit-done", label: "完成", onSelect: function onSelect(e) {
					return _this2.setState({ editing: false });
				} });else actions.push({ action: "edit", label: "编辑", onSelect: function onSelect(e) {
					return _this2.setState({ editing: true });
				} });
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_materialUi.TextField, { ref: "place", fullWidth: true, name: "place", floatingLabelText: "输入地址",
					onKeyDown: function onKeyDown(e) {
						return e.keyCode == 13 && _this2.add(e.target.value);
					} }),
				_react2.default.createElement(
					SelectableList,
					null,
					itinerary.map(function (_ref, i) {
						var _id = _ref._id;
						var place = _ref.place;
						var days = _ref.days;
						return _react2.default.createElement(_List.ListItem, { key: place,
							leftIcon: editing ? _react2.default.createElement(_removeCircleOutline2.default, null) : null,
							rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, { onClick: function onClick(e) {
									return _this2.context.router.push("journey/" + _this2.props.params._id + "/iternerary/" + _id);
								} }),
							primaryText: _react2.default.createElement(
								"div",
								{ className: "grid" },
								_react2.default.createElement(
									"span",
									null,
									place
								),
								_react2.default.createElement(
									"span",
									{ style: { width: 50 } },
									_react2.default.createElement("input", { name: "days", defaultValue: 1, placeholder: "逗留天数" })
								)
							),
							secondaryText: _react2.default.createElement(
								"div",
								{ className: "grid" },
								_react2.default.createElement(
									"span",
									null,
									_react2.default.createElement(_arrowDownward2.default, null)
								),
								_react2.default.createElement(
									_materialUi.DropDownMenu,
									null,
									_react2.default.createElement(_materialUi.MenuItem, { value: 1, primaryText: "飞" }),
									_react2.default.createElement(_materialUi.MenuItem, { value: 2, primaryText: "火车" }),
									_react2.default.createElement(_materialUi.MenuItem, { value: 3, primaryText: "自驾" }),
									_react2.default.createElement(_materialUi.MenuItem, { value: 4, primaryText: "走" })
								)
							) });
					})
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: actions })
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this3 = this;

			var _id = this.props.params._id;

			_db.Itinerary.find({ journey: _id }).then(function (itinerary) {
				_this3.setState(itinerary);
			});
		}
	}, {
		key: "remove",
		value: function remove() {}
	}, {
		key: "add",
		value: function add(place) {
			var _this4 = this;

			var a = { place: place, days: 1, journey: this.props.params._id };
			this.setState({ itinerary: this.state.itinerary.concat([a]) });
			return;
			_db.Itinerary.upsert(a).then(function (updated) {
				return _this4.setState({ itinerary: _this4.state.itinerary.concat([updated]) });
			});
		}
	}]);

	return Itinerary;
}(_react.Component);

exports.default = Itinerary;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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OztzQkFJSixPQUFNOzs7QUFDVCxPQUFJLElBQUUsRUFBQyxZQUFELEVBQU8sTUFBSyxDQUFMLEVBQU8sU0FBUSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEdBQWxCLEVBQXhCLENBREs7QUFFVCxRQUFLLFFBQUwsQ0FBYyxFQUFDLFdBQVUsS0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixNQUFyQixDQUE0QixDQUFDLENBQUQsQ0FBNUIsQ0FBVixFQUFmLEVBRlM7QUFHVCxVQUhTO0FBSVQsaUJBQVksTUFBWixDQUFtQixDQUFuQixFQUNFLElBREYsQ0FDTztXQUFTLE9BQUssUUFBTCxDQUFjLEVBQUMsV0FBVSxPQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLE1BQXJCLENBQTRCLENBQUMsT0FBRCxDQUE1QixDQUFWLEVBQWY7SUFBVCxDQURQLENBSlM7Ozs7UUFyRFUiLCJmaWxlIjoiaXRpbmVyYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VGV4dEZpZWxkLCBDaGVja2JveCwgRHJvcERvd25NZW51LCBNZW51SXRlbX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IERpdmlkZXIgZnJvbSAnbWF0ZXJpYWwtdWkvRGl2aWRlcic7XHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0xpc3QsIExpc3RJdGVtLCBtYWtlU2VsZWN0YWJsZX0gZnJvbSAnbWF0ZXJpYWwtdWkvTGlzdCdcclxuaW1wb3J0IFJpZ2h0QXJyb3cgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0J1xyXG5pbXBvcnQgTmV4dEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZG93bndhcmQnXHJcbmltcG9ydCBSZW1vdmVJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3JlbW92ZS1jaXJjbGUtb3V0bGluZSdcclxuXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vY29tcG9uZW50cy9tYXBcIlxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBJdGluZXJhcnkgYXMgSXRpbmVyYXJ5REJ9IGZyb20gXCIuL2RiXCJcclxuXHJcbmNvbnN0IFNlbGVjdGFibGVMaXN0PUxpc3RcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0aW5lcmFyeSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRpdGluZXJhcnk6W3twbGFjZTpcImJlaWppbmdcIiwgZGF5czoxfSx7cGxhY2U6XCJHZW5ldmFcIiwgZGF5czoxfV1cclxuXHRcdCxlZGl0aW5nOmZhbHNlXHJcblx0fVxyXG5cdFxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2l0aW5lcmFyeSwgZWRpdGluZ309dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IGFjdGlvbnM9W1wiYWN0aW9uXCJdXHJcblx0XHRpZihlZGl0aW5nKVxyXG5cdFx0XHRhY3Rpb25zLnB1c2goe2FjdGlvbjpcImVkaXQtZG9uZVwiLGxhYmVsOlwi5a6M5oiQXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6ZmFsc2V9KX0pXHJcblx0XHRlbHNlXHJcblx0XHRcdGFjdGlvbnMucHVzaCh7YWN0aW9uOlwiZWRpdFwiLGxhYmVsOlwi57yW6L6RXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6dHJ1ZX0pfSlcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJwbGFjZVwiIGZ1bGxXaWR0aD17dHJ1ZX0gbmFtZT1cInBsYWNlXCIgZmxvYXRpbmdMYWJlbFRleHQ9XCLovpPlhaXlnLDlnYBcIlxyXG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT5lLmtleUNvZGU9PTEzICYmIHRoaXMuYWRkKGUudGFyZ2V0LnZhbHVlKX0vPlxyXG5cdFx0XHRcdDxTZWxlY3RhYmxlTGlzdD5cclxuXHRcdFx0XHRcdHtpdGluZXJhcnkubWFwKCh7X2lkLHBsYWNlLGRheXN9LGkpPT4oXHJcblx0XHRcdFx0XHRcdDxMaXN0SXRlbSBrZXk9e3BsYWNlfSBcclxuXHRcdFx0XHRcdFx0XHRsZWZ0SWNvbj17ZWRpdGluZyA/ICg8UmVtb3ZlSWNvbi8+KSA6IG51bGx9XHJcblx0XHRcdFx0XHRcdFx0cmlnaHRJY29uPXs8UmlnaHRBcnJvdyBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGpvdXJuZXkvJHt0aGlzLnByb3BzLnBhcmFtcy5faWR9L2l0ZXJuZXJhcnkvJHtfaWR9YCl9Lz59XHJcblx0XHRcdFx0XHRcdFx0cHJpbWFyeVRleHQ9ezxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPjxzcGFuPntwbGFjZX08L3NwYW4+PHNwYW4gIHN0eWxlPXt7d2lkdGg6NTB9fT48aW5wdXQgbmFtZT1cImRheXNcIiBkZWZhdWx0VmFsdWU9ezF9IHBsYWNlaG9sZGVyPVwi6YCX55WZ5aSp5pWwXCIvPjwvc3Bhbj48L2Rpdj59XHJcblx0XHRcdFx0XHRcdFx0c2Vjb25kYXJ5VGV4dD17XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4+PE5leHRJY29uLz48L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxEcm9wRG93bk1lbnU+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PE1lbnVJdGVtIHZhbHVlPXsxfSBwcmltYXJ5VGV4dD1cIumjnlwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8TWVudUl0ZW0gdmFsdWU9ezJ9IHByaW1hcnlUZXh0PVwi54Gr6L2mXCIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxNZW51SXRlbSB2YWx1ZT17M30gcHJpbWFyeVRleHQ9XCLoh6rpqb5cIi8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PE1lbnVJdGVtIHZhbHVlPXs0fSBwcmltYXJ5VGV4dD1cIui1sFwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9Ecm9wRG93bk1lbnU+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHR9Lz5cdFxyXG5cdFx0XHRcdFx0KSl9XHJcblx0XHRcdFx0PC9TZWxlY3RhYmxlTGlzdD5cclxuXHRcdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17YWN0aW9uc30vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGNvbnN0IHtfaWR9PXRoaXMucHJvcHMucGFyYW1zXHJcblx0XHRJdGluZXJhcnlEQi5maW5kKHtqb3VybmV5Ol9pZH0pLnRoZW4oaXRpbmVyYXJ5PT57XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoaXRpbmVyYXJ5KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0cmVtb3ZlKCl7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0YWRkKHBsYWNlKXtcclxuXHRcdGxldCBhPXtwbGFjZSxkYXlzOjEsam91cm5leTp0aGlzLnByb3BzLnBhcmFtcy5faWR9XHJcblx0XHR0aGlzLnNldFN0YXRlKHtpdGluZXJhcnk6dGhpcy5zdGF0ZS5pdGluZXJhcnkuY29uY2F0KFthXSl9KVxyXG5cdFx0cmV0dXJuIDtcclxuXHRcdEl0aW5lcmFyeURCLnVwc2VydChhKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT50aGlzLnNldFN0YXRlKHtpdGluZXJhcnk6dGhpcy5zdGF0ZS5pdGluZXJhcnkuY29uY2F0KFt1cGRhdGVkXSl9KSlcclxuXHR9XHJcblx0XHJcblx0XHJcbn1cclxuXHJcbiJdfQ==