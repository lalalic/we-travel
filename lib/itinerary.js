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
			text: "",
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
			var text = _state.text;
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
						onChange: function onChange(e) {
							return _this3.setState({ text: e.target.value });
						},
						onKeyDown: function onKeyDown(_ref2) {
							var keyCode = _ref2.keyCode;
							var value = _ref2.target.value;
							return keyCode == 13 && value && _this3.add(value);
						},
						onBlur: function onBlur(_ref3) {
							var value = _ref3.target.value;
							return value && _this3.add(value);
						},
						value: text, name: "place", floatingLabelText: "\u8F93\u5165\u5730\u5740" }),
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

				_this5.setState({ itinerary: itinerary.concat([updated]), text: '' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pdGluZXJhcnkuanMiXSwibmFtZXMiOlsiSXRpbmVyYXJ5Iiwic3RhdGUiLCJpdGluZXJhcnkiLCJ0ZXh0IiwiZWRpdGluZyIsIl9pZCIsInByb3BzIiwicGFyYW1zIiwiZmluZCIsImpvdXJuZXkiLCJmZXRjaCIsInNldFN0YXRlIiwiYWN0aW9ucyIsInB1c2giLCJhY3Rpb24iLCJsYWJlbCIsIm9uU2VsZWN0IiwiaXRlbXMiLCJmb3JFYWNoIiwiYSIsImkiLCJwbGFjZSIsInJlbW92ZSIsImlkIiwiZSIsInRhcmdldCIsInZhbHVlIiwia2V5Q29kZSIsImFkZCIsIndpZHRoIiwicmVmcyIsInRoZW4iLCJmaWx0ZXIiLCJkYXlzIiwidXBzZXJ0IiwiY29uY2F0IiwidXBkYXRlZCIsImNvbnRleHRUeXBlcyIsInJvdXRlciIsIm9iamVjdCIsIkl0ZW0iLCJkYXRhIiwib25SZW1vdmUiLCJjb250ZXh0IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImJhY2tncm91bmQiLCJ0ZXh0QWxpZ24iLCJib3JkZXJCb3R0b20iLCJ1cGRhdGUiLCJwb3NpdGlvbiIsInRvcCIsImNoYW5nZWQiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7MExBSXBCQyxLLEdBQU07QUFDTEMsY0FBVSxFQURMO0FBRUpDLFNBQUssRUFGRDtBQUdKQyxZQUFRO0FBSEosRzs7Ozs7c0NBTWE7QUFBQTs7QUFBQSxPQUNYQyxHQURXLEdBQ04sS0FBS0MsS0FBTCxDQUFXQyxNQURMLENBQ1hGLEdBRFc7O0FBRWxCLGlCQUFZRyxJQUFaLENBQWlCLEVBQUNDLFNBQVFKLEdBQVQsRUFBakIsRUFDRUssS0FERixDQUNRO0FBQUEsV0FBVyxPQUFLQyxRQUFMLENBQWMs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LE9BQU8sQ0FBakIsRUFBb0IsYUFBWSxRQUFoQztBQUpEO0FBREQsTUFERDtBQVNDO0FBQUE7QUFBQSxRQUFNLE9BQU8sRUFBQ3FCLFVBQVMsVUFBVixFQUFzQkMsS0FBSSxDQUFDLEVBQTNCLEVBQWI7QUFBQTtBQUFBO0FBVEQsS0FqQkYsR0FERDtBQStCQTs7O3lCQUNNQyxPLEVBQVE7QUFBQTs7QUFBQSxPQUNQWCxJQURPLEdBQ0QsS0FBS25DLEtBREosQ0FDUG1DLElBRE87O0FBRWQsaUJBQVlQLE1BQVosQ0FBbUJtQixPQUFPQyxNQUFQLENBQWNiLElBQWQsRUFBbUJXLE9BQW5CLENBQW5CLEVBQ0VyQixJQURGLENBQ087QUFBQSxXQUFTLE9BQUtwQixRQUFMLENBQWN5QixPQUFkLENBQVQ7QUFBQSxJQURQO0FBRUEiLCJmaWxlIjoiaXRpbmVyYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VGV4dEZpZWxkLCBDaGVja2JveCwgSWNvbk1lbnUsIEljb25CdXR0b24sIE1lbnVJdGVtfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgRGl2aWRlciBmcm9tICdtYXRlcmlhbC11aS9EaXZpZGVyJztcclxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuXHJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW0sIG1ha2VTZWxlY3RhYmxlfSBmcm9tICdtYXRlcmlhbC11aS9MaXN0J1xyXG5pbXBvcnQgUmlnaHRBcnJvdyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctcmlnaHQnXHJcbmltcG9ydCBOZXh0SWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1kb3dud2FyZCdcclxuaW1wb3J0IFJlbW92ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvcmVtb3ZlLWNpcmNsZS1vdXRsaW5lJ1xyXG5pbXBvcnQgQWRkSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQtY2lyY2xlLW91dGxpbmUnXHJcblxyXG5pbXBvcnQgTWFwIGZyb20gXCIuL2NvbXBvbmVudHMvbWFwXCJcclxuaW1wb3J0IHtJdGluZXJhcnkgYXMgSXRpbmVyYXJ5REJ9IGZyb20gXCIuL2RiXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0aW5lcmFyeSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHRzdGF0ZT17XHJcblx0XHRpdGluZXJhcnk6W11cclxuXHRcdCx0ZXh0OlwiXCJcclxuXHRcdCxlZGl0aW5nOmZhbHNlXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Y29uc3Qge19pZH09dGhpcy5wcm9wcy5wYXJhbXNcclxuXHRcdEl0aW5lcmFyeURCLmZpbmQoe2pvdXJuZXk6X2lkfSlcclxuXHRcdFx0LmZldGNoKGl0aW5lcmFyeT0+dGhpcy5zZXRTdGF0ZSh7aXRpbmVyYXJ5fSkpXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtpdGluZXJhcnksIHRleHQsIGVkaXRpbmd9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBhY3Rpb25zPVtcIkJhY2tcIl1cclxuXHRcdGlmKGVkaXRpbmcpXHJcblx0XHRcdGFjdGlvbnMucHVzaCh7YWN0aW9uOlwiZWRpdC1kb25lXCIsbGFiZWw6XCLlrozmiJBcIiwgb25TZWxlY3Q6ZT0+dGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzpmYWxzZX0pfSlcclxuXHRcdGVsc2VcclxuXHRcdFx0YWN0aW9ucy5wdXNoKHthY3Rpb246XCJlZGl0XCIsbGFiZWw6XCLnvJbovpFcIiwgb25TZWxlY3Q6ZT0+dGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzp0cnVlfSl9KVxyXG5cclxuXHRcdGxldCBpdGVtcz1bXVxyXG5cdFx0aXRpbmVyYXJ5LmZvckVhY2goKGEsaSk9PntcclxuXHRcdFx0aXRlbXMucHVzaCg8SXRlbSBrZXk9e2Ake2EucGxhY2V9XyR7aX1gfSBkYXRhPXthfVxyXG5cdFx0XHRcdGVkaXRpbmc9e2VkaXRpbmd9XHJcblx0XHRcdFx0b25SZW1vdmU9e2lkPT50aGlzLnJlbW92ZShpZCl9Lz4pXHJcblxyXG5cdFx0XHRpdGVtcy5wdXNoKDxEaXZpZGVyIGluc2V0PXt0cnVlfSBrZXk9e2AtJHtpfWB9Lz4pXHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwicGxhY2VcIiBmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXtlPT50aGlzLnNldFN0YXRlKHt0ZXh0OmUudGFyZ2V0LnZhbHVlfSl9XHJcblx0XHRcdFx0XHRcdG9uS2V5RG93bj17KHtrZXlDb2RlLHRhcmdldDp7dmFsdWV9fSk9PmtleUNvZGU9PTEzICYmIHZhbHVlICYmdGhpcy5hZGQodmFsdWUpfVxyXG5cdFx0XHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+dmFsdWUgJiYgdGhpcy5hZGQodmFsdWUpfVxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17dGV4dH0gbmFtZT1cInBsYWNlXCIgZmxvYXRpbmdMYWJlbFRleHQ9XCLovpPlhaXlnLDlnYBcIi8+XHJcblx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3dpZHRoOjUwfX0+XHJcblx0XHRcdFx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGxldCB2YWx1ZT10aGlzLnJlZnMucGxhY2UudmFsdWVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlICYmIHRoaXMuYWRkKHZhbHVlKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0+XHJcblx0XHRcdFx0XHRcdFx0PEFkZEljb24vPlxyXG5cdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+XHJcblx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PExpc3Q+XHJcblx0XHRcdFx0XHR7aXRlbXN9XHJcblx0XHRcdFx0PC9MaXN0PlxyXG5cdFx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17YWN0aW9uc30vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0cmVtb3ZlKF9pZCl7XHJcblx0XHRJdGluZXJhcnlEQi5yZW1vdmUoX2lkKVxyXG5cdFx0XHQudGhlbihhPT57XHJcblx0XHRcdFx0Y29uc3Qge2l0aW5lcmFyeX09dGhpcy5zdGF0ZVxyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2l0aW5lcmFyeTppdGluZXJhcnkuZmlsdGVyKGE9PmEuX2lkIT1faWQpfSlcclxuXHRcdFx0fSlcclxuXHR9XHJcblx0YWRkKHBsYWNlKXtcclxuXHRcdGxldCBhPXtwbGFjZSxkYXlzOjEsam91cm5leTp0aGlzLnByb3BzLnBhcmFtcy5faWR9XHJcblx0XHRJdGluZXJhcnlEQi51cHNlcnQoYSlcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+e1xyXG5cdFx0XHRcdGNvbnN0IHtpdGluZXJhcnl9PXRoaXMuc3RhdGVcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtpdGluZXJhcnk6aXRpbmVyYXJ5LmNvbmNhdChbdXBkYXRlZF0pLHRleHQ6Jyd9KVxyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmNsYXNzIEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZGF0YTp7X2lkLHBsYWNlLGRheXM9MX0sZWRpdGluZywgb25SZW1vdmV9PXRoaXMucHJvcHNcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxMaXN0SXRlbSBrZXk9e3BsYWNlfVxyXG5cdFx0XHRcdGxlZnRJY29uPXtlZGl0aW5nID8gKDxSZW1vdmVJY29uIG9uQ2xpY2s9e2U9Pm9uUmVtb3ZlKF9pZCl9Lz4pIDogPHNwYW4vPn1cclxuXHRcdFx0XHRyaWdodEljb249ezxSaWdodEFycm93IG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgJHt0aGlzLnByb3BzLmxvY2F0aW9uLnBhdGhuYW1lfS8ke19pZH1gKX0vPn1cclxuXHRcdFx0XHRwcmltYXJ5VGV4dD17XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIj5cclxuXHRcdFx0XHRcdFx0PHNwYW4+e3BsYWNlfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PHNwYW4gIHN0eWxlPXt7d2lkdGg6MTUwfX0+XHJcblx0XHRcdFx0XHRcdFx06YCX55WZXHJcblx0XHRcdFx0XHRcdFx0PGlucHV0IG5hbWU9XCJkYXlzXCJcclxuXHRcdFx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCIyZW1cIixiYWNrZ3JvdW5kOlwidHJhbnNwYXJlbnRcIix0ZXh0QWxpZ246XCJjZW50ZXJcIixib3JkZXJCb3R0b206XCIxcHggc29saWQgbGlnaHRncmF5XCJ9fVxyXG5cdFx0XHRcdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PnZhbHVlIT1kYXlzICYmIHRoaXMudXBkYXRlKHtkYXlzOnZhbHVlfSl9XHJcblx0XHRcdFx0XHRcdFx0XHRvbktleURvd249eyh7a2V5Q29kZSx0YXJnZXQ6e3ZhbHVlfX0pPT5rZXlDb2RlPT0xMyAmJiB2YWx1ZSE9ZGF5cyAmJiB0aGlzLnVwZGF0ZSh7ZGF5czp2YWx1ZX0pfVxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXtkYXlzfS8+XHJcblx0XHRcdFx0XHRcdFx05aSpXHJcblx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvZGl2Pn1cclxuXHRcdFx0XHRzZWNvbmRhcnlUZXh0PXtcclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e3dpZHRoOjMwfX0+XHJcblx0XHRcdFx0XHRcdFx0PEljb25NZW51IGljb25CdXR0b25FbGVtZW50PXs8SWNvbkJ1dHRvbj48TmV4dEljb24vPjwvSWNvbkJ1dHRvbj59PlxyXG5cdFx0XHRcdFx0XHRcdFx0PE1lbnVJdGVtIHZhbHVlPXsxfSBwcmltYXJ5VGV4dD1cIumjnlwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdDxNZW51SXRlbSB2YWx1ZT17Mn0gcHJpbWFyeVRleHQ9XCLngavovaZcIi8+XHJcblx0XHRcdFx0XHRcdFx0XHQ8TWVudUl0ZW0gdmFsdWU9ezN9IHByaW1hcnlUZXh0PVwi6Ieq6am+XCIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0PE1lbnVJdGVtIHZhbHVlPXs0fSBwcmltYXJ5VGV4dD1cIui1sFwiLz5cclxuXHRcdFx0XHRcdFx0XHQ8L0ljb25NZW51PlxyXG5cdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7cG9zaXRpb246XCJyZWxhdGl2ZVwiLCB0b3A6LTEyfX0+6aOePC9zcGFuPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0fS8+XHJcblx0XHQpXHJcblx0fVxyXG5cdHVwZGF0ZShjaGFuZ2VkKXtcclxuXHRcdGNvbnN0IHtkYXRhfT10aGlzLnByb3BzXHJcblx0XHRJdGluZXJhcnlEQi51cHNlcnQoT2JqZWN0LmFzc2lnbihkYXRhLGNoYW5nZWQpKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT50aGlzLnNldFN0YXRlKHVwZGF0ZWQpKVxyXG5cdH1cclxufVxyXG4iXX0=