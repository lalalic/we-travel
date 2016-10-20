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

var _addCircleOutline = require("material-ui/svg-icons/content/add-circle-outline");

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _map = require("./components/map");

var _map2 = _interopRequireDefault(_map);

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Itinerary = function (_Component) {
	_inherits(Itinerary, _Component);

	function Itinerary() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Itinerary);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Itinerary.__proto__ || Object.getPrototypeOf(Itinerary)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			itinerary: [],
			editing: false
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Itinerary, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var _id = this.props.params._id;

			_db.Itinerary.find({ journey: _id }).fetch(function (itinerary) {
				return _this2.setState({ itinerary: itinerary });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var _state = this.state;
			var itinerary = _state.itinerary;
			var editing = _state.editing;

			var actions = ["Back"];
			if (editing) actions.push({ action: "edit-done", label: "完成", onSelect: function onSelect(e) {
					return _this3.setState({ editing: false });
				} });else actions.push({ action: "edit", label: "编辑", onSelect: function onSelect(e) {
					return _this3.setState({ editing: true });
				} });

			var items = [];
			itinerary.forEach(function (a, i) {
				items.push(_react2.default.createElement(Item, { key: a.place + "_" + i, data: a,
					editing: editing,
					onRemove: function onRemove(id) {
						return _this3.remove(id);
					} }));

				items.push(_react2.default.createElement(_Divider2.default, { inset: true, key: "-" + i }));
			});
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ className: "grid" },
					_react2.default.createElement(_materialUi.TextField, { ref: "place", fullWidth: true,
						onKeyDown: function onKeyDown(_ref2) {
							var keyCode = _ref2.keyCode;
							var value = _ref2.target.value;
							return keyCode == 13 && value && _this3.add(value);
						},
						onBlur: function onBlur(_ref3) {
							var value = _ref3.target.value;
							return _this3.add(value);
						},
						name: "place", floatingLabelText: "\u8F93\u5165\u5730\u5740" }),
					_react2.default.createElement(
						"span",
						{ style: { width: 50 } },
						_react2.default.createElement(
							_materialUi.IconButton,
							{ onClick: function onClick(e) {
									var value = _this3.refs.place.value;
									value && _this3.add(value);
								} },
							_react2.default.createElement(_addCircleOutline2.default, null)
						)
					)
				),
				_react2.default.createElement(
					_List.List,
					null,
					items
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar", items: actions })
			);
		}
	}, {
		key: "remove",
		value: function remove(_id) {
			var _this4 = this;

			_db.Itinerary.remove(_id).then(function (a) {
				var itinerary = _this4.state.itinerary;

				_this4.setState({ itinerary: itinerary.filter(function (a) {
						return a._id != _id;
					}) });
			});
		}
	}, {
		key: "add",
		value: function add(place) {
			var _this5 = this;

			var a = { place: place, days: 1, journey: this.props.params._id };
			_db.Itinerary.upsert(a).then(function (updated) {
				var itinerary = _this5.state.itinerary;

				_this5.setState({ itinerary: itinerary.concat([updated]) });
				_this5.refs.place.setState({ value: "" });
			});
		}
	}]);

	return Itinerary;
}(_react.Component);

Itinerary.contextTypes = {
	router: _react.PropTypes.object
};
exports.default = Itinerary;

var Item = function (_Component2) {
	_inherits(Item, _Component2);

	function Item() {
		_classCallCheck(this, Item);

		return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
	}

	_createClass(Item, [{
		key: "render",
		value: function render() {
			var _this7 = this;

			var _props = this.props;
			var _props$data = _props.data;
			var _id = _props$data._id;
			var place = _props$data.place;
			var _props$data$days = _props$data.days;
			var days = _props$data$days === undefined ? 1 : _props$data$days;
			var editing = _props.editing;
			var onRemove = _props.onRemove;

			return _react2.default.createElement(_List.ListItem, { key: place,
				leftIcon: editing ? _react2.default.createElement(_removeCircleOutline2.default, { onClick: function onClick(e) {
						return onRemove(_id);
					} }) : _react2.default.createElement("span", null),
				rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, { onClick: function onClick(e) {
						return _this7.context.router.push(_this7.props.location.pathname + "/" + _id);
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
						{ style: { width: 150 } },
						"\u9017\u7559",
						_react2.default.createElement("input", { name: "days",
							style: { width: "2em", background: "transparent", textAlign: "center", borderBottom: "1px solid lightgray" },
							onBlur: function onBlur(_ref4) {
								var value = _ref4.target.value;
								return value != days && _this7.update({ days: value });
							},
							onKeyDown: function onKeyDown(_ref5) {
								var keyCode = _ref5.keyCode;
								var value = _ref5.target.value;
								return keyCode == 13 && value != days && _this7.update({ days: value });
							},
							defaultValue: days }),
						"\u5929"
					)
				),
				secondaryText: _react2.default.createElement(
					"div",
					{ className: "grid" },
					_react2.default.createElement(
						"span",
						{ style: { width: 30 } },
						_react2.default.createElement(
							_materialUi.IconMenu,
							{ iconButtonElement: _react2.default.createElement(
									_materialUi.IconButton,
									null,
									_react2.default.createElement(_arrowDownward2.default, null)
								) },
							_react2.default.createElement(_materialUi.MenuItem, { value: 1, primaryText: "\u98DE" }),
							_react2.default.createElement(_materialUi.MenuItem, { value: 2, primaryText: "\u706B\u8F66" }),
							_react2.default.createElement(_materialUi.MenuItem, { value: 3, primaryText: "\u81EA\u9A7E" }),
							_react2.default.createElement(_materialUi.MenuItem, { value: 4, primaryText: "\u8D70" })
						)
					),
					_react2.default.createElement(
						"span",
						{ style: { position: "relative", top: -12 } },
						"\u98DE"
					)
				) });
		}
	}, {
		key: "update",
		value: function update(changed) {
			var _this8 = this;

			var data = this.props.data;

			_db.Itinerary.upsert(Object.assign(data, changed)).then(function (updated) {
				return _this8.setState(updated);
			});
		}
	}]);

	return Item;
}(_react.Component);

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pdGluZXJhcnkuanMiXSwibmFtZXMiOlsiSXRpbmVyYXJ5Iiwic3RhdGUiLCJpdGluZXJhcnkiLCJlZGl0aW5nIiwiX2lkIiwicHJvcHMiLCJwYXJhbXMiLCJmaW5kIiwiam91cm5leSIsImZldGNoIiwic2V0U3RhdGUiLCJhY3Rpb25zIiwicHVzaCIsImFjdGlvbiIsImxhYmVsIiwib25TZWxlY3QiLCJpdGVtcyIsImZvckVhY2giLCJhIiwiaSIsInBsYWNlIiwicmVtb3ZlIiwiaWQiLCJrZXlDb2RlIiwidmFsdWUiLCJ0YXJnZXQiLCJhZGQiLCJ3aWR0aCIsInJlZnMiLCJ0aGVuIiwiZmlsdGVyIiwiZGF5cyIsInVwc2VydCIsImNvbmNhdCIsInVwZGF0ZWQiLCJjb250ZXh0VHlwZXMiLCJyb3V0ZXIiLCJvYmplY3QiLCJJdGVtIiwiZGF0YSIsIm9uUmVtb3ZlIiwiY29udGV4dCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJiYWNrZ3JvdW5kIiwidGV4dEFsaWduIiwiYm9yZGVyQm90dG9tIiwidXBkYXRlIiwicG9zaXRpb24iLCJ0b3AiLCJjaGFuZ2VkIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzBMQUlwQkMsSyxHQUFNO0FBQ0xDLGNBQVUsRUFETDtBQUVKQyxZQUFRO0FBRkosRzs7Ozs7c0NBS2E7QUFBQTs7QUFBQSxPQUNYQyxHQURXLEdBQ04sS0FBS0MsS0FBTCxDQUFXQyxNQURMLENBQ1hGLEdBRFc7O0FBRWxCLGlCQUFZRyxJQUFaLENBQWlCLEVBQUNDLFNBQVFKLEdBQVQsRUFBakIsRUFDRUssS0FERixDQUNRO0FBQUEsV0FBVyxPQUFLQyxRQUFMLENBQWMsRUFBQ1Isb0JBQUQsRUFBZCxDQUFYO0FBQUEs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RCxLQWpCRixHQUREO0FBK0JBOzs7eUJBQ01DLE8sRUFBUTtBQUFBOztBQUFBLE9BQ1BYLElBRE8sR0FDRCxLQUFLbEMsS0FESixDQUNQa0MsSUFETzs7QUFFZCxpQkFBWVAsTUFBWixDQUFtQm1CLE9BQU9DLE1BQVAsQ0FBY2IsSUFBZCxFQUFtQlcsT0FBbkIsQ0FBbkIsRUFDRXJCLElBREYsQ0FDTztBQUFBLFdBQVMsT0FBS25CLFFBQUwsQ0FBY3dCLE9BQWQsQ0FBVDtBQUFBLElBRFA7QUFFQSIsImZpbGUiOiJpdGluZXJhcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtUZXh0RmllbGQsIENoZWNrYm94LCBJY29uTWVudSwgSWNvbkJ1dHRvbiwgTWVudUl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCBEaXZpZGVyIGZyb20gJ21hdGVyaWFsLXVpL0RpdmlkZXInO1xyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtMaXN0LCBMaXN0SXRlbSwgbWFrZVNlbGVjdGFibGV9IGZyb20gJ21hdGVyaWFsLXVpL0xpc3QnXHJcbmltcG9ydCBSaWdodEFycm93IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodCdcclxuaW1wb3J0IE5leHRJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LWRvd253YXJkJ1xyXG5pbXBvcnQgUmVtb3ZlSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9yZW1vdmUtY2lyY2xlLW91dGxpbmUnXHJcbmltcG9ydCBBZGRJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZC1jaXJjbGUtb3V0bGluZSdcclxuXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vY29tcG9uZW50cy9tYXBcIlxyXG5pbXBvcnQge0l0aW5lcmFyeSBhcyBJdGluZXJhcnlEQn0gZnJvbSBcIi4vZGJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRpbmVyYXJ5IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cdHN0YXRlPXtcclxuXHRcdGl0aW5lcmFyeTpbXVxyXG5cdFx0LGVkaXRpbmc6ZmFsc2VcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRjb25zdCB7X2lkfT10aGlzLnByb3BzLnBhcmFtc1xyXG5cdFx0SXRpbmVyYXJ5REIuZmluZCh7am91cm5leTpfaWR9KVxyXG5cdFx0XHQuZmV0Y2goaXRpbmVyYXJ5PT50aGlzLnNldFN0YXRlKHtpdGluZXJhcnl9KSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2l0aW5lcmFyeSwgZWRpdGluZ309dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IGFjdGlvbnM9W1wiQmFja1wiXVxyXG5cdFx0aWYoZWRpdGluZylcclxuXHRcdFx0YWN0aW9ucy5wdXNoKHthY3Rpb246XCJlZGl0LWRvbmVcIixsYWJlbDpcIuWujOaIkFwiLCBvblNlbGVjdDplPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOmZhbHNlfSl9KVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRhY3Rpb25zLnB1c2goe2FjdGlvbjpcImVkaXRcIixsYWJlbDpcIue8lui+kVwiLCBvblNlbGVjdDplPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOnRydWV9KX0pXHJcblxyXG5cdFx0bGV0IGl0ZW1zPVtdXHJcblx0XHRpdGluZXJhcnkuZm9yRWFjaCgoYSxpKT0+e1xyXG5cdFx0XHRpdGVtcy5wdXNoKDxJdGVtIGtleT17YCR7YS5wbGFjZX1fJHtpfWB9IGRhdGE9e2F9IFxyXG5cdFx0XHRcdGVkaXRpbmc9e2VkaXRpbmd9IFxyXG5cdFx0XHRcdG9uUmVtb3ZlPXtpZD0+dGhpcy5yZW1vdmUoaWQpfS8+KVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRpdGVtcy5wdXNoKDxEaXZpZGVyIGluc2V0PXt0cnVlfSBrZXk9e2AtJHtpfWB9Lz4pXHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwicGxhY2VcIiBmdWxsV2lkdGg9e3RydWV9IFxyXG5cdFx0XHRcdFx0XHRvbktleURvd249eyh7a2V5Q29kZSx0YXJnZXQ6e3ZhbHVlfX0pPT5rZXlDb2RlPT0xMyAmJiB2YWx1ZSAmJnRoaXMuYWRkKHZhbHVlKX1cclxuXHRcdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PnRoaXMuYWRkKHZhbHVlKX1cclxuXHRcdFx0XHRcdFx0bmFtZT1cInBsYWNlXCIgZmxvYXRpbmdMYWJlbFRleHQ9XCLovpPlhaXlnLDlnYBcIi8+XHJcblx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3dpZHRoOjUwfX0+XHJcblx0XHRcdFx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxldCB2YWx1ZT10aGlzLnJlZnMucGxhY2UudmFsdWVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlICYmIHRoaXMuYWRkKHZhbHVlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0+XHJcblx0XHRcdFx0XHRcdFx0PEFkZEljb24vPlxyXG5cdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+XHJcblx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PExpc3Q+XHJcblx0XHRcdFx0XHR7aXRlbXN9XHJcblx0XHRcdFx0PC9MaXN0PlxyXG5cdFx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17YWN0aW9uc30vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0cmVtb3ZlKF9pZCl7XHJcblx0XHRJdGluZXJhcnlEQi5yZW1vdmUoX2lkKVxyXG5cdFx0XHQudGhlbihhPT57XHJcblx0XHRcdFx0Y29uc3Qge2l0aW5lcmFyeX09dGhpcy5zdGF0ZVxyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2l0aW5lcmFyeTppdGluZXJhcnkuZmlsdGVyKGE9PmEuX2lkIT1faWQpfSlcclxuXHRcdFx0fSlcclxuXHR9XHJcblx0YWRkKHBsYWNlKXtcclxuXHRcdGxldCBhPXtwbGFjZSxkYXlzOjEsam91cm5leTp0aGlzLnByb3BzLnBhcmFtcy5faWR9XHJcblx0XHRJdGluZXJhcnlEQi51cHNlcnQoYSlcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+e1xyXG5cdFx0XHRcdGNvbnN0IHtpdGluZXJhcnl9PXRoaXMuc3RhdGVcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtpdGluZXJhcnk6aXRpbmVyYXJ5LmNvbmNhdChbdXBkYXRlZF0pfSlcclxuXHRcdFx0XHR0aGlzLnJlZnMucGxhY2Uuc2V0U3RhdGUoe3ZhbHVlOlwiXCJ9KVxyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHRcclxuXHJcblxyXG59XHJcblxyXG5jbGFzcyBJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2RhdGE6e19pZCxwbGFjZSxkYXlzPTF9LGVkaXRpbmcsIG9uUmVtb3ZlfT10aGlzLnByb3BzXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8TGlzdEl0ZW0ga2V5PXtwbGFjZX1cclxuXHRcdFx0XHRsZWZ0SWNvbj17ZWRpdGluZyA/ICg8UmVtb3ZlSWNvbiBvbkNsaWNrPXtlPT5vblJlbW92ZShfaWQpfS8+KSA6IDxzcGFuLz59XHJcblx0XHRcdFx0cmlnaHRJY29uPXs8UmlnaHRBcnJvdyBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYCR7dGhpcy5wcm9wcy5sb2NhdGlvbi5wYXRobmFtZX0vJHtfaWR9YCl9Lz59XHJcblx0XHRcdFx0cHJpbWFyeVRleHQ9e1xyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XHJcblx0XHRcdFx0XHRcdDxzcGFuPntwbGFjZX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdDxzcGFuICBzdHlsZT17e3dpZHRoOjE1MH19PlxyXG5cdFx0XHRcdFx0XHRcdOmAl+eVmVxyXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPVwiZGF5c1wiXHJcblx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e3dpZHRoOlwiMmVtXCIsYmFja2dyb3VuZDpcInRyYW5zcGFyZW50XCIsdGV4dEFsaWduOlwiY2VudGVyXCIsYm9yZGVyQm90dG9tOlwiMXB4IHNvbGlkIGxpZ2h0Z3JheVwifX1cclxuXHRcdFx0XHRcdFx0XHRcdG9uQmx1cj17KHt0YXJnZXQ6e3ZhbHVlfX0pPT52YWx1ZSE9ZGF5cyAmJiB0aGlzLnVwZGF0ZSh7ZGF5czp2YWx1ZX0pfVxyXG5cdFx0XHRcdFx0XHRcdFx0b25LZXlEb3duPXsoe2tleUNvZGUsdGFyZ2V0Ont2YWx1ZX19KT0+a2V5Q29kZT09MTMgJiYgdmFsdWUhPWRheXMgJiYgdGhpcy51cGRhdGUoe2RheXM6dmFsdWV9KX1cclxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17ZGF5c30vPlxyXG5cdFx0XHRcdFx0XHRcdOWkqVxyXG5cdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHQ8L2Rpdj59XHJcblx0XHRcdFx0c2Vjb25kYXJ5VGV4dD17XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3t3aWR0aDozMH19PlxyXG5cdFx0XHRcdFx0XHRcdDxJY29uTWVudSBpY29uQnV0dG9uRWxlbWVudD17PEljb25CdXR0b24+PE5leHRJY29uLz48L0ljb25CdXR0b24+fT5cclxuXHRcdFx0XHRcdFx0XHRcdDxNZW51SXRlbSB2YWx1ZT17MX0gcHJpbWFyeVRleHQ9XCLpo55cIi8+XHJcblx0XHRcdFx0XHRcdFx0XHQ8TWVudUl0ZW0gdmFsdWU9ezJ9IHByaW1hcnlUZXh0PVwi54Gr6L2mXCIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PE1lbnVJdGVtIHZhbHVlPXszfSBwcmltYXJ5VGV4dD1cIuiHqumpvlwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdDxNZW51SXRlbSB2YWx1ZT17NH0gcHJpbWFyeVRleHQ9XCLotbBcIi8+XHJcblx0XHRcdFx0XHRcdFx0PC9JY29uTWVudT5cclxuXHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3Bvc2l0aW9uOlwicmVsYXRpdmVcIiwgdG9wOi0xMn19Pumjnjwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdH0vPlxyXG5cdFx0KVxyXG5cdH1cclxuXHR1cGRhdGUoY2hhbmdlZCl7XHJcblx0XHRjb25zdCB7ZGF0YX09dGhpcy5wcm9wc1xyXG5cdFx0SXRpbmVyYXJ5REIudXBzZXJ0KE9iamVjdC5hc3NpZ24oZGF0YSxjaGFuZ2VkKSlcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+dGhpcy5zZXRTdGF0ZSh1cGRhdGVkKSlcclxuXHR9XHJcbn1cclxuIl19