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

var _transportationField = require("./components/transportation-field");

var _transportationField2 = _interopRequireDefault(_transportationField);

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

			var a = { place: place, dayth: 1, journey: this.props.params._id };
			var itinerary = this.state.itinerary;var last = itinerary[itinerary.length - 1];
			if (last) a.dayth = last.dayth + 1;
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
			var dayth = _props$data.dayth;
			var _props$data$trans = _props$data.trans;
			var trans = _props$data$trans === undefined ? 1 : _props$data$trans;
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
						{ style: { width: 80 } },
						"\u7B2C",
						_react2.default.createElement("input", { name: "dayth", type: "number",
							style: { width: "2em", background: "transparent", textAlign: "center", borderBottom: "1px solid lightgray" },
							onBlur: function onBlur(_ref4) {
								var value = _ref4.target.value;
								return parseInt(value) != dayth && _this7.update({ dayth: parseInt(value) });
							},
							onKeyDown: function onKeyDown(_ref5) {
								var keyCode = _ref5.keyCode;
								var value = _ref5.target.value;
								return keyCode == 13 && parseInt(value) != dayth && _this7.update({ dayth: parseInt(value) });
							},
							defaultValue: dayth }),
						"\u5929"
					),
					_react2.default.createElement(
						"span",
						{ style: { width: 50 } },
						_react2.default.createElement(_transportationField2.default, { style: { width: 50 } })
					),
					_react2.default.createElement(
						"span",
						null,
						place
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pdGluZXJhcnkuanMiXSwibmFtZXMiOlsiSXRpbmVyYXJ5Iiwic3RhdGUiLCJpdGluZXJhcnkiLCJ0ZXh0IiwiZWRpdGluZyIsIl9pZCIsInByb3BzIiwicGFyYW1zIiwiZmluZCIsImpvdXJuZXkiLCJmZXRjaCIsInNldFN0YXRlIiwiYWN0aW9ucyIsInB1c2giLCJhY3Rpb24iLCJsYWJlbCIsIm9uU2VsZWN0IiwiaXRlbXMiLCJmb3JFYWNoIiwiYSIsImkiLCJwbGFjZSIsInJlbW92ZSIsImlkIiwiZSIsInRhcmdldCIsInZhbHVlIiwia2V5Q29kZSIsImFkZCIsIndpZHRoIiwicmVmcyIsInRoZW4iLCJmaWx0ZXIiLCJkYXl0aCIsImxlbmd0aCIsImxhc3QiLCJ1cHNlcnQiLCJjb25jYXQiLCJ1cGRhdGVkIiwiY29udGV4dFR5cGVzIiwicm91dGVyIiwib2JqZWN0IiwiSXRlbSIsImRhdGEiLCJ0cmFucyIsIm9uUmVtb3ZlIiwiY29udGV4dCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJiYWNrZ3JvdW5kIiwidGV4dEFsaWduIiwiYm9yZGVyQm90dG9tIiwicGFyc2VJbnQiLCJ1cGRhdGUiLCJjaGFuZ2VkIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7MExBSXBCQyxLLEdBQU07QUFDTEMsY0FBVSxFQURMO0FBRUpDLFNBQUssRUFGRDtBQUdKQyxZQUFRO0FBSEosRzs7Ozs7c0NBTWE7QUFBQTs7QUFBQSxPQUNYQyxHQURXLEdBQ04sS0FBS0MsS0FBTCxDQUFXQyxNQURMLENBQ1hGLEdBRFc7O0FBRWxCLGlCQUFZRyxJQUFaLENBQWlCLEVBQUNDLFNBQVFKLEdBQVQsRUFBakIsRUFDRUssS0FERixDQUNR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Q0osT0FBTSxFQUFQLEVBQWI7QUFBeUIscUVBQXFCLE9BQU8sRUFBQ0EsT0FBTSxFQUFQLEVBQTVCO0FBQXpCLE1BVkQ7QUFXQztBQUFBO0FBQUE7QUFBT1I7QUFBUDtBQVhELEtBSkYsR0FERDtBQW1CQTs7O3lCQUNNaUMsTyxFQUFRO0FBQUE7O0FBQUEsT0FDUFgsSUFETyxHQUNELEtBQUtyQyxLQURKLENBQ1BxQyxJQURPOztBQUVkLGlCQUFZUCxNQUFaLENBQW1CbUIsT0FBT0MsTUFBUCxDQUFjYixJQUFkLEVBQW1CVyxPQUFuQixDQUFuQixFQUNFdkIsSUFERixDQUNPO0FBQUEsV0FBUyxPQUFLcEIsUUFBTCxDQUFjMkIsT0FBZCxDQUFUO0FBQUEsSUFEUDtBQUVBIiwiZmlsZSI6Iml0aW5lcmFyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1RleHRGaWVsZCwgQ2hlY2tib3gsIEljb25NZW51LCBJY29uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgRGl2aWRlciBmcm9tICdtYXRlcmlhbC11aS9EaXZpZGVyJztcclxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuXHJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW0sIG1ha2VTZWxlY3RhYmxlfSBmcm9tICdtYXRlcmlhbC11aS9MaXN0J1xyXG5pbXBvcnQgUmlnaHRBcnJvdyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctcmlnaHQnXHJcbmltcG9ydCBOZXh0SWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1kb3dud2FyZCdcclxuaW1wb3J0IFJlbW92ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvcmVtb3ZlLWNpcmNsZS1vdXRsaW5lJ1xyXG5pbXBvcnQgQWRkSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQtY2lyY2xlLW91dGxpbmUnXHJcblxyXG5pbXBvcnQgTWFwIGZyb20gXCIuL2NvbXBvbmVudHMvbWFwXCJcclxuaW1wb3J0IFRyYW5zcG9ydGF0aW9uRmllbGQgZnJvbSBcIi4vY29tcG9uZW50cy90cmFuc3BvcnRhdGlvbi1maWVsZFwiXHJcbmltcG9ydCB7SXRpbmVyYXJ5IGFzIEl0aW5lcmFyeURCfSBmcm9tIFwiLi9kYlwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGluZXJhcnkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblx0c3RhdGU9e1xyXG5cdFx0aXRpbmVyYXJ5OltdXHJcblx0XHQsdGV4dDpcIlwiXHJcblx0XHQsZWRpdGluZzpmYWxzZVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGNvbnN0IHtfaWR9PXRoaXMucHJvcHMucGFyYW1zXHJcblx0XHRJdGluZXJhcnlEQi5maW5kKHtqb3VybmV5Ol9pZH0pXHJcblx0XHRcdC5mZXRjaChpdGluZXJhcnk9PnRoaXMuc2V0U3RhdGUoe2l0aW5lcmFyeX0pKVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7aXRpbmVyYXJ5LCB0ZXh0LCBlZGl0aW5nfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgYWN0aW9ucz1bXCJCYWNrXCJdXHJcblx0XHRpZihlZGl0aW5nKVxyXG5cdFx0XHRhY3Rpb25zLnB1c2goe2FjdGlvbjpcImVkaXQtZG9uZVwiLGxhYmVsOlwi5a6M5oiQXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6ZmFsc2V9KX0pXHJcblx0XHRlbHNlXHJcblx0XHRcdGFjdGlvbnMucHVzaCh7YWN0aW9uOlwiZWRpdFwiLGxhYmVsOlwi57yW6L6RXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6dHJ1ZX0pfSlcclxuXHJcblx0XHRsZXQgaXRlbXM9W11cclxuXHRcdGl0aW5lcmFyeS5mb3JFYWNoKChhLGkpPT57XHJcblx0XHRcdGl0ZW1zLnB1c2goPEl0ZW0ga2V5PXtgJHthLnBsYWNlfV8ke2l9YH0gZGF0YT17YX1cclxuXHRcdFx0XHRlZGl0aW5nPXtlZGl0aW5nfVxyXG5cdFx0XHRcdG9uUmVtb3ZlPXtpZD0+dGhpcy5yZW1vdmUoaWQpfS8+KVxyXG5cclxuXHRcdFx0aXRlbXMucHVzaCg8RGl2aWRlciBpbnNldD17dHJ1ZX0ga2V5PXtgLSR7aX1gfS8+KVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cInBsYWNlXCIgZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17ZT0+dGhpcy5zZXRTdGF0ZSh7dGV4dDplLnRhcmdldC52YWx1ZX0pfVxyXG5cdFx0XHRcdFx0XHRvbktleURvd249eyh7a2V5Q29kZSx0YXJnZXQ6e3ZhbHVlfX0pPT5rZXlDb2RlPT0xMyAmJiB2YWx1ZSAmJnRoaXMuYWRkKHZhbHVlKX1cclxuXHRcdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PnZhbHVlICYmIHRoaXMuYWRkKHZhbHVlKX1cclxuXHRcdFx0XHRcdFx0dmFsdWU9e3RleHR9IG5hbWU9XCJwbGFjZVwiIGZsb2F0aW5nTGFiZWxUZXh0PVwi6L6T5YWl5Zyw5Z2AXCIvPlxyXG5cdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3t3aWR0aDo1MH19PlxyXG5cdFx0XHRcdFx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT57XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgdmFsdWU9dGhpcy5yZWZzLnBsYWNlLnZhbHVlXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZSAmJiB0aGlzLmFkZCh2YWx1ZSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9PlxyXG5cdFx0XHRcdFx0XHRcdDxBZGRJY29uLz5cclxuXHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxMaXN0PlxyXG5cdFx0XHRcdFx0e2l0ZW1zfVxyXG5cdFx0XHRcdDwvTGlzdD5cclxuXHRcdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e2FjdGlvbnN9Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdHJlbW92ZShfaWQpe1xyXG5cdFx0SXRpbmVyYXJ5REIucmVtb3ZlKF9pZClcclxuXHRcdFx0LnRoZW4oYT0+e1xyXG5cdFx0XHRcdGNvbnN0IHtpdGluZXJhcnl9PXRoaXMuc3RhdGVcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtpdGluZXJhcnk6aXRpbmVyYXJ5LmZpbHRlcihhPT5hLl9pZCE9X2lkKX0pXHJcblx0XHRcdH0pXHJcblx0fVxyXG5cdGFkZChwbGFjZSl7XHJcblx0XHRsZXQgYT17cGxhY2UsZGF5dGg6MSwgam91cm5leTp0aGlzLnByb3BzLnBhcmFtcy5faWR9XHJcblx0XHRsZXQge2l0aW5lcmFyeX09dGhpcy5zdGF0ZSwgbGFzdD1pdGluZXJhcnlbaXRpbmVyYXJ5Lmxlbmd0aC0xXVxyXG5cdFx0aWYobGFzdClcclxuXHRcdFx0YS5kYXl0aD1sYXN0LmRheXRoKzFcclxuXHRcdEl0aW5lcmFyeURCLnVwc2VydChhKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT57XHJcblx0XHRcdFx0Y29uc3Qge2l0aW5lcmFyeX09dGhpcy5zdGF0ZVxyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2l0aW5lcmFyeTppdGluZXJhcnkuY29uY2F0KFt1cGRhdGVkXSksdGV4dDonJ30pXHJcblx0XHRcdH0pXHJcblx0fVxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG5jbGFzcyBJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2RhdGE6e19pZCxwbGFjZSxkYXl0aCx0cmFucz0xfSxlZGl0aW5nLCBvblJlbW92ZX09dGhpcy5wcm9wc1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PExpc3RJdGVtIGtleT17cGxhY2V9XHJcblx0XHRcdFx0bGVmdEljb249e2VkaXRpbmcgPyAoPFJlbW92ZUljb24gb25DbGljaz17ZT0+b25SZW1vdmUoX2lkKX0vPikgOiA8c3Bhbi8+fVxyXG5cdFx0XHRcdHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGAke3RoaXMucHJvcHMubG9jYXRpb24ucGF0aG5hbWV9LyR7X2lkfWApfS8+fVxyXG5cdFx0XHRcdHByaW1hcnlUZXh0PXtcclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiAgc3R5bGU9e3t3aWR0aDo4MH19PlxyXG5cdFx0XHRcdFx0XHRcdOesrFxyXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPVwiZGF5dGhcIiB0eXBlPVwibnVtYmVyXCJcclxuXHRcdFx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCIyZW1cIixiYWNrZ3JvdW5kOlwidHJhbnNwYXJlbnRcIix0ZXh0QWxpZ246XCJjZW50ZXJcIixib3JkZXJCb3R0b206XCIxcHggc29saWQgbGlnaHRncmF5XCJ9fVxyXG5cdFx0XHRcdFx0XHRcdFx0b25CbHVyPXsoe3RhcmdldDp7dmFsdWV9fSk9PnBhcnNlSW50KHZhbHVlKSE9ZGF5dGggJiYgdGhpcy51cGRhdGUoe2RheXRoOnBhcnNlSW50KHZhbHVlKX0pfVxyXG5cdFx0XHRcdFx0XHRcdFx0b25LZXlEb3duPXsoe2tleUNvZGUsdGFyZ2V0Ont2YWx1ZX19KT0+a2V5Q29kZT09MTMgJiYgcGFyc2VJbnQodmFsdWUpIT1kYXl0aCAmJiB0aGlzLnVwZGF0ZSh7ZGF5dGg6cGFyc2VJbnQodmFsdWUpfSl9XHJcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9e2RheXRofS8+XHJcblx0XHRcdFx0XHRcdFx05aSpXHJcblx0XHRcdFx0XHRcdDwvc3Bhbj5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7d2lkdGg6NTB9fT48VHJhbnNwb3J0YXRpb25GaWVsZCBzdHlsZT17e3dpZHRoOjUwfX0vPjwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PHNwYW4+e3BsYWNlfTwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvZGl2Pn0vPlxyXG5cdFx0KVxyXG5cdH1cclxuXHR1cGRhdGUoY2hhbmdlZCl7XHJcblx0XHRjb25zdCB7ZGF0YX09dGhpcy5wcm9wc1xyXG5cdFx0SXRpbmVyYXJ5REIudXBzZXJ0KE9iamVjdC5hc3NpZ24oZGF0YSxjaGFuZ2VkKSlcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+dGhpcy5zZXRTdGF0ZSh1cGRhdGVkKSlcclxuXHR9XHJcbn1cclxuIl19