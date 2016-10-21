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
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Itinerary);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Itinerary)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
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
						onKeyDown: function onKeyDown(_ref) {
							var keyCode = _ref.keyCode;
							var value = _ref.target.value;
							return keyCode == 13 && value && _this3.add(value);
						},
						onBlur: function onBlur(_ref2) {
							var value = _ref2.target.value;
							return _this3.add(value);
						},
						name: "place", floatingLabelText: "输入地址" }),
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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
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
						"逗留",
						_react2.default.createElement("input", { name: "days",
							style: { width: "2em", background: "transparent", textAlign: "center", borderBottom: "1px solid lightgray" },
							onBlur: function onBlur(_ref3) {
								var value = _ref3.target.value;
								return value != days && _this7.update({ days: value });
							},
							onKeyDown: function onKeyDown(_ref4) {
								var keyCode = _ref4.keyCode;
								var value = _ref4.target.value;
								return keyCode == 13 && value != days && _this7.update({ days: value });
							},
							defaultValue: days }),
						"天"
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
							_react2.default.createElement(_materialUi.MenuItem, { value: 1, primaryText: "飞" }),
							_react2.default.createElement(_materialUi.MenuItem, { value: 2, primaryText: "火车" }),
							_react2.default.createElement(_materialUi.MenuItem, { value: 3, primaryText: "自驾" }),
							_react2.default.createElement(_materialUi.MenuItem, { value: 4, primaryText: "走" })
						)
					),
					_react2.default.createElement(
						"span",
						{ style: { position: "relative", top: -12 } },
						"飞"
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

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1RleHRGaWVsZCwgQ2hlY2tib3gsIEljb25NZW51LCBJY29uQnV0dG9uLCBNZW51SXRlbX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IERpdmlkZXIgZnJvbSAnbWF0ZXJpYWwtdWkvRGl2aWRlcic7XHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0xpc3QsIExpc3RJdGVtLCBtYWtlU2VsZWN0YWJsZX0gZnJvbSAnbWF0ZXJpYWwtdWkvTGlzdCdcclxuaW1wb3J0IFJpZ2h0QXJyb3cgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0J1xyXG5pbXBvcnQgTmV4dEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZG93bndhcmQnXHJcbmltcG9ydCBSZW1vdmVJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3JlbW92ZS1jaXJjbGUtb3V0bGluZSdcclxuaW1wb3J0IEFkZEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkLWNpcmNsZS1vdXRsaW5lJ1xyXG5cclxuaW1wb3J0IE1hcCBmcm9tIFwiLi9jb21wb25lbnRzL21hcFwiXHJcbmltcG9ydCB7SXRpbmVyYXJ5IGFzIEl0aW5lcmFyeURCfSBmcm9tIFwiLi9kYlwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGluZXJhcnkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblx0c3RhdGU9e1xyXG5cdFx0aXRpbmVyYXJ5OltdXHJcblx0XHQsZWRpdGluZzpmYWxzZVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGNvbnN0IHtfaWR9PXRoaXMucHJvcHMucGFyYW1zXHJcblx0XHRJdGluZXJhcnlEQi5maW5kKHtqb3VybmV5Ol9pZH0pXHJcblx0XHRcdC5mZXRjaChpdGluZXJhcnk9PnRoaXMuc2V0U3RhdGUoe2l0aW5lcmFyeX0pKVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7aXRpbmVyYXJ5LCBlZGl0aW5nfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgYWN0aW9ucz1bXCJCYWNrXCJdXHJcblx0XHRpZihlZGl0aW5nKVxyXG5cdFx0XHRhY3Rpb25zLnB1c2goe2FjdGlvbjpcImVkaXQtZG9uZVwiLGxhYmVsOlwi5a6M5oiQXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6ZmFsc2V9KX0pXHJcblx0XHRlbHNlXHJcblx0XHRcdGFjdGlvbnMucHVzaCh7YWN0aW9uOlwiZWRpdFwiLGxhYmVsOlwi57yW6L6RXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6dHJ1ZX0pfSlcclxuXHJcblx0XHRsZXQgaXRlbXM9W11cclxuXHRcdGl0aW5lcmFyeS5mb3JFYWNoKChhLGkpPT57XHJcblx0XHRcdGl0ZW1zLnB1c2goPEl0ZW0ga2V5PXtgJHthLnBsYWNlfV8ke2l9YH0gZGF0YT17YX0gXHJcblx0XHRcdFx0ZWRpdGluZz17ZWRpdGluZ30gXHJcblx0XHRcdFx0b25SZW1vdmU9e2lkPT50aGlzLnJlbW92ZShpZCl9Lz4pXHJcblx0XHRcdFx0XHJcblx0XHRcdGl0ZW1zLnB1c2goPERpdmlkZXIgaW5zZXQ9e3RydWV9IGtleT17YC0ke2l9YH0vPilcclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJwbGFjZVwiIGZ1bGxXaWR0aD17dHJ1ZX0gXHJcblx0XHRcdFx0XHRcdG9uS2V5RG93bj17KHtrZXlDb2RlLHRhcmdldDp7dmFsdWV9fSk9PmtleUNvZGU9PTEzICYmIHZhbHVlICYmdGhpcy5hZGQodmFsdWUpfVxyXG5cdFx0XHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+dGhpcy5hZGQodmFsdWUpfVxyXG5cdFx0XHRcdFx0XHRuYW1lPVwicGxhY2VcIiBmbG9hdGluZ0xhYmVsVGV4dD1cIui+k+WFpeWcsOWdgFwiLz5cclxuXHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7d2lkdGg6NTB9fT5cclxuXHRcdFx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IHZhbHVlPXRoaXMucmVmcy5wbGFjZS52YWx1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWUgJiYgdGhpcy5hZGQodmFsdWUpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0fT5cclxuXHRcdFx0XHRcdFx0XHQ8QWRkSWNvbi8+XHJcblx0XHRcdFx0XHRcdDwvSWNvbkJ1dHRvbj5cclxuXHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8TGlzdD5cclxuXHRcdFx0XHRcdHtpdGVtc31cclxuXHRcdFx0XHQ8L0xpc3Q+XHJcblx0XHRcdFx0PFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIGl0ZW1zPXthY3Rpb25zfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHRyZW1vdmUoX2lkKXtcclxuXHRcdEl0aW5lcmFyeURCLnJlbW92ZShfaWQpXHJcblx0XHRcdC50aGVuKGE9PntcclxuXHRcdFx0XHRjb25zdCB7aXRpbmVyYXJ5fT10aGlzLnN0YXRlXHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7aXRpbmVyYXJ5Oml0aW5lcmFyeS5maWx0ZXIoYT0+YS5faWQhPV9pZCl9KVxyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHRhZGQocGxhY2Upe1xyXG5cdFx0bGV0IGE9e3BsYWNlLGRheXM6MSxqb3VybmV5OnRoaXMucHJvcHMucGFyYW1zLl9pZH1cclxuXHRcdEl0aW5lcmFyeURCLnVwc2VydChhKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT57XHJcblx0XHRcdFx0Y29uc3Qge2l0aW5lcmFyeX09dGhpcy5zdGF0ZVxyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2l0aW5lcmFyeTppdGluZXJhcnkuY29uY2F0KFt1cGRhdGVkXSl9KVxyXG5cdFx0XHRcdHRoaXMucmVmcy5wbGFjZS5zZXRTdGF0ZSh7dmFsdWU6XCJcIn0pXHJcblx0XHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cclxuXHJcbn1cclxuXHJcbmNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZGF0YTp7X2lkLHBsYWNlLGRheXM9MX0sZWRpdGluZywgb25SZW1vdmV9PXRoaXMucHJvcHNcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxMaXN0SXRlbSBrZXk9e3BsYWNlfVxyXG5cdFx0XHRcdGxlZnRJY29uPXtlZGl0aW5nID8gKDxSZW1vdmVJY29uIG9uQ2xpY2s9e2U9Pm9uUmVtb3ZlKF9pZCl9Lz4pIDogPHNwYW4vPn1cclxuXHRcdFx0XHRyaWdodEljb249ezxSaWdodEFycm93IG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgJHt0aGlzLnByb3BzLmxvY2F0aW9uLnBhdGhuYW1lfS8ke19pZH1gKX0vPn1cclxuXHRcdFx0XHRwcmltYXJ5VGV4dD17XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdFx0PHNwYW4+e3BsYWNlfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PHNwYW4gIHN0eWxlPXt7d2lkdGg6MTUwfX0+XHJcblx0XHRcdFx0XHRcdFx06YCX55WZXHJcblx0XHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9XCJkYXlzXCJcclxuXHRcdFx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCIyZW1cIixiYWNrZ3JvdW5kOlwidHJhbnNwYXJlbnRcIix0ZXh0QWxpZ246XCJjZW50ZXJcIixib3JkZXJCb3R0b206XCIxcHggc29saWQgbGlnaHRncmF5XCJ9fVxyXG5cdFx0XHRcdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PnZhbHVlIT1kYXlzICYmIHRoaXMudXBkYXRlKHtkYXlzOnZhbHVlfSl9XHJcblx0XHRcdFx0XHRcdFx0XHRvbktleURvd249eyh7a2V5Q29kZSx0YXJnZXQ6e3ZhbHVlfX0pPT5rZXlDb2RlPT0xMyAmJiB2YWx1ZSE9ZGF5cyAmJiB0aGlzLnVwZGF0ZSh7ZGF5czp2YWx1ZX0pfVxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXtkYXlzfS8+XHJcblx0XHRcdFx0XHRcdFx05aSpXHJcblx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvZGl2Pn1cclxuXHRcdFx0XHRzZWNvbmRhcnlUZXh0PXtcclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3dpZHRoOjMwfX0+XHJcblx0XHRcdFx0XHRcdFx0PEljb25NZW51IGljb25CdXR0b25FbGVtZW50PXs8SWNvbkJ1dHRvbj48TmV4dEljb24vPjwvSWNvbkJ1dHRvbj59PlxyXG5cdFx0XHRcdFx0XHRcdFx0PE1lbnVJdGVtIHZhbHVlPXsxfSBwcmltYXJ5VGV4dD1cIumjnlwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdDxNZW51SXRlbSB2YWx1ZT17Mn0gcHJpbWFyeVRleHQ9XCLngavovaZcIi8+XHJcblx0XHRcdFx0XHRcdFx0XHQ8TWVudUl0ZW0gdmFsdWU9ezN9IHByaW1hcnlUZXh0PVwi6Ieq6am+XCIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PE1lbnVJdGVtIHZhbHVlPXs0fSBwcmltYXJ5VGV4dD1cIui1sFwiLz5cclxuXHRcdFx0XHRcdFx0XHQ8L0ljb25NZW51PlxyXG5cdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7cG9zaXRpb246XCJyZWxhdGl2ZVwiLCB0b3A6LTEyfX0+6aOePC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0fS8+XHJcblx0XHQpXHJcblx0fVxyXG5cdHVwZGF0ZShjaGFuZ2VkKXtcclxuXHRcdGNvbnN0IHtkYXRhfT10aGlzLnByb3BzXHJcblx0XHRJdGluZXJhcnlEQi51cHNlcnQoT2JqZWN0LmFzc2lnbihkYXRhLGNoYW5nZWQpKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT50aGlzLnNldFN0YXRlKHVwZGF0ZWQpKVxyXG5cdH1cclxufVxyXG4iXX0=