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
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var _id = this.props.params._id;

			_db.Itinerary.find({ journey: _id }, function (itinerary) {
				_this2.setState(itinerary);
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

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_materialUi.TextField, { ref: "place", fullWidth: true, name: "place", floatingLabelText: "输入地址",
					onKeyDown: function onKeyDown(e) {
						return e.keyCode == 13 && e.target.value && _this3.add(e.target.value);
					} }),
				_react2.default.createElement(
					SelectableList,
					null,
					itinerary.map(function (_ref, i) {
						var _id = _ref._id;
						var place = _ref.place;
						var days = _ref.days;
						return _react2.default.createElement(_List.ListItem, { key: place,
							leftIcon: editing ? _react2.default.createElement(_removeCircleOutline2.default, { onClick: function onClick(e) {
									return _this3.remove(_id);
								} }) : null,
							rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, { onClick: function onClick(e) {
									return _this3.context.router.push(_this3.props.location.pathname + "/" + _id);
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
										defaultValue: 1 }),
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
					})
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar", items: actions })
			);
		}
	}, {
		key: "remove",
		value: function remove(_id) {
			var _this4 = this;

			itineraryDB.remove(_id).then(function (a) {
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
			});
		}
	}]);

	return Itinerary;
}(_react.Component);

Itinerary.contextTypes = {
	router: _react.PropTypes.object
};
exports.default = Itinerary;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pdGluZXJhcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU0sMkJBQU47O0lBRXFCOzs7Ozs7Ozs7Ozs7OztxTUFJcEIsUUFBTTtBQUNMLGNBQVUsQ0FBQyxFQUFDLE9BQU0sU0FBTixFQUFpQixNQUFLLENBQUwsRUFBbkIsRUFBMkIsRUFBQyxPQUFNLFFBQU4sRUFBZ0IsTUFBSyxDQUFMLEVBQTVDLENBQVY7QUFDQyxZQUFRLEtBQVI7Ozs7Y0FOa0I7O3NDQVNEOzs7T0FDWCxNQUFLLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBTCxJQURXOztBQUVsQixpQkFBWSxJQUFaLENBQWlCLEVBQUMsU0FBUSxHQUFSLEVBQWxCLEVBQStCLHFCQUFXO0FBQ3pDLFdBQUssUUFBTCxDQUFjLFNBQWQsRUFEeUM7SUFBWCxDQUEvQixDQUZrQjs7OzsyQkFPWDs7O2dCQUNvQixLQUFLLEtBQUwsQ0FEcEI7T0FDQSw2QkFEQTtPQUNXLHlCQURYOztBQUVQLE9BQUksVUFBUSxDQUFDLE1BQUQsQ0FBUixDQUZHO0FBR1AsT0FBRyxPQUFILEVBQ0MsUUFBUSxJQUFSLENBQWEsRUFBQyxRQUFPLFdBQVAsRUFBbUIsT0FBTSxJQUFOLEVBQVksVUFBUztZQUFHLE9BQUssUUFBTCxDQUFjLEVBQUMsU0FBUSxLQUFSLEVBQWY7S0FBSCxFQUF0RCxFQURELEtBR0MsUUFBUSxJQUFSLENBQWEsRUFBQyxRQUFPLE1BQVAsRUFBYyxPQUFNLElBQU4sRUFBWSxVQUFTO1lBQUcsT0FBSyxRQUFMLENBQWMsRUFBQyxTQUFRLElBQVIsRUFBZjtLQUFILEVBQWpELEVBSEQ7O0FBTUEsVUFDQzs7O0lBQ0MsdURBQVcsS0FBSSxPQUFKLEVBQVksV0FBVyxJQUFYLEVBQWlCLE1BQUssT0FBTCxFQUFhLG1CQUFrQixNQUFsQjtBQUNwRCxnQkFBVzthQUFHLEVBQUUsT0FBRixJQUFXLEVBQVgsSUFBaUIsRUFBRSxNQUFGLENBQVMsS0FBVCxJQUFpQixPQUFLLEdBQUwsQ0FBUyxFQUFFLE1BQUYsQ0FBUyxLQUFULENBQTNDO01BQUgsRUFEWixDQUREO0lBR0M7QUFBQyxtQkFBRDs7S0FDRSxVQUFVLEdBQVYsQ0FBYyxnQkFBa0IsQ0FBbEI7VUFBRTtVQUFJO1VBQU07YUFDMUIsZ0RBQVUsS0FBSyxLQUFMO0FBQ1QsaUJBQVUsVUFBVywrREFBWSxTQUFTO2dCQUFHLE9BQUssTUFBTCxDQUFZLEdBQVo7U0FBSCxFQUFyQixDQUFYLEdBQTBELElBQTFEO0FBQ1Ysa0JBQVcsOERBQVksU0FBUztnQkFBRyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQTRCLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsUUFBcEIsU0FBZ0MsR0FBNUQ7U0FBSCxFQUFyQixDQUFYO0FBQ0Esb0JBQ0M7O1VBQUssV0FBVSxNQUFWLEVBQUw7UUFDQzs7O1NBQU8sS0FBUDtTQUREO1FBRUM7O1dBQU8sT0FBTyxFQUFDLE9BQU0sR0FBTixFQUFSLEVBQVA7O1NBRUMseUNBQU8sTUFBSyxNQUFMO0FBQ04saUJBQU8sRUFBQyxPQUFNLEtBQU4sRUFBWSxZQUFXLGFBQVgsRUFBeUIsV0FBVSxRQUFWLEVBQW1CLGNBQWEscUJBQWIsRUFBaEU7QUFDQSx3QkFBYyxDQUFkLEVBRkQsQ0FGRDs7U0FGRDtRQUREO0FBV0Esc0JBQ0M7O1VBQUssV0FBVSxNQUFWLEVBQUw7UUFDQzs7V0FBTSxPQUFPLEVBQUMsT0FBTSxFQUFOLEVBQVIsRUFBTjtTQUNDOztZQUFVLG1CQUFtQjs7O1lBQVksNERBQVo7WUFBbkIsRUFBVjtVQUNDLHNEQUFVLE9BQU8sQ0FBUCxFQUFVLGFBQVksR0FBWixFQUFwQixDQUREO1VBRUMsc0RBQVUsT0FBTyxDQUFQLEVBQVUsYUFBWSxJQUFaLEVBQXBCLENBRkQ7VUFHQyxzREFBVSxPQUFPLENBQVAsRUFBVSxhQUFZLElBQVosRUFBcEIsQ0FIRDtVQUlDLHNEQUFVLE9BQU8sQ0FBUCxFQUFVLGFBQVksR0FBWixFQUFwQixDQUpEO1VBREQ7U0FERDtRQVNDOztXQUFNLE9BQU8sRUFBQyxVQUFTLFVBQVQsRUFBcUIsS0FBSSxDQUFDLEVBQUQsRUFBakMsRUFBTjs7U0FURDtRQURELEVBZEQ7TUFEYyxDQURoQjtLQUhEO0lBa0NDLDBDQUFJLFVBQUosSUFBZSxXQUFVLFNBQVYsRUFBb0IsT0FBTyxPQUFQLEVBQW5DLENBbENEO0lBREQsQ0FUTzs7Ozt5QkFpREQsS0FBSTs7O0FBQ1YsZUFBWSxNQUFaLENBQW1CLEdBQW5CLEVBQ0UsSUFERixDQUNPLGFBQUc7UUFDRCxZQUFXLE9BQUssS0FBTCxDQUFYLFVBREM7O0FBRVIsV0FBSyxRQUFMLENBQWMsRUFBQyxXQUFVLFVBQVUsTUFBVixDQUFpQjthQUFHLEVBQUUsR0FBRixJQUFPLEdBQVA7TUFBSCxDQUEzQixFQUFmLEVBRlE7SUFBSCxDQURQLENBRFU7Ozs7c0JBUVAsT0FBTTs7O0FBQ1QsT0FBSSxJQUFFLEVBQUMsWUFBRCxFQUFPLE1BQUssQ0FBTCxFQUFPLFNBQVEsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixHQUFsQixFQUF4QixDQURLO0FBRVQsaUJBQVksTUFBWixDQUFtQixDQUFuQixFQUNFLElBREYsQ0FDTyxtQkFBUztRQUNQLFlBQVcsT0FBSyxLQUFMLENBQVgsVUFETzs7QUFFZCxXQUFLLFFBQUwsQ0FBYyxFQUFDLFdBQVUsVUFBVSxNQUFWLENBQWlCLENBQUMsT0FBRCxDQUFqQixDQUFWLEVBQWYsRUFGYztJQUFULENBRFAsQ0FGUzs7OztRQXpFVTs7O1VBQ2IsZUFBYTtBQUNuQixTQUFRLGlCQUFVLE1BQVY7O2tCQUZXIiwiZmlsZSI6Iml0aW5lcmFyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1RleHRGaWVsZCwgQ2hlY2tib3gsIEljb25NZW51LCBJY29uQnV0dG9uLCBNZW51SXRlbX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IERpdmlkZXIgZnJvbSAnbWF0ZXJpYWwtdWkvRGl2aWRlcic7XHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0xpc3QsIExpc3RJdGVtLCBtYWtlU2VsZWN0YWJsZX0gZnJvbSAnbWF0ZXJpYWwtdWkvTGlzdCdcclxuaW1wb3J0IFJpZ2h0QXJyb3cgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0J1xyXG5pbXBvcnQgTmV4dEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZG93bndhcmQnXHJcbmltcG9ydCBSZW1vdmVJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3JlbW92ZS1jaXJjbGUtb3V0bGluZSdcclxuXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vY29tcG9uZW50cy9tYXBcIlxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBJdGluZXJhcnkgYXMgSXRpbmVyYXJ5REJ9IGZyb20gXCIuL2RiXCJcclxuXHJcbmNvbnN0IFNlbGVjdGFibGVMaXN0PUxpc3RcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0aW5lcmFyeSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxuXHRzdGF0ZT17XHJcblx0XHRpdGluZXJhcnk6W3twbGFjZTpcImJlaWppbmdcIiwgZGF5czoxfSx7cGxhY2U6XCJHZW5ldmFcIiwgZGF5czoxfV1cclxuXHRcdCxlZGl0aW5nOmZhbHNlXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Y29uc3Qge19pZH09dGhpcy5wcm9wcy5wYXJhbXNcclxuXHRcdEl0aW5lcmFyeURCLmZpbmQoe2pvdXJuZXk6X2lkfSxpdGluZXJhcnk9PntcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZShpdGluZXJhcnkpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7aXRpbmVyYXJ5LCBlZGl0aW5nfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgYWN0aW9ucz1bXCJCYWNrXCJdXHJcblx0XHRpZihlZGl0aW5nKVxyXG5cdFx0XHRhY3Rpb25zLnB1c2goe2FjdGlvbjpcImVkaXQtZG9uZVwiLGxhYmVsOlwi5a6M5oiQXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6ZmFsc2V9KX0pXHJcblx0XHRlbHNlXHJcblx0XHRcdGFjdGlvbnMucHVzaCh7YWN0aW9uOlwiZWRpdFwiLGxhYmVsOlwi57yW6L6RXCIsIG9uU2VsZWN0OmU9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6dHJ1ZX0pfSlcclxuXHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cInBsYWNlXCIgZnVsbFdpZHRoPXt0cnVlfSBuYW1lPVwicGxhY2VcIiBmbG9hdGluZ0xhYmVsVGV4dD1cIui+k+WFpeWcsOWdgFwiXHJcblx0XHRcdFx0XHRvbktleURvd249e2U9PmUua2V5Q29kZT09MTMgJiYgZS50YXJnZXQudmFsdWUgJiZ0aGlzLmFkZChlLnRhcmdldC52YWx1ZSl9Lz5cclxuXHRcdFx0XHQ8U2VsZWN0YWJsZUxpc3Q+XHJcblx0XHRcdFx0XHR7aXRpbmVyYXJ5Lm1hcCgoe19pZCxwbGFjZSxkYXlzfSxpKT0+KFxyXG5cdFx0XHRcdFx0XHQ8TGlzdEl0ZW0ga2V5PXtwbGFjZX1cclxuXHRcdFx0XHRcdFx0XHRsZWZ0SWNvbj17ZWRpdGluZyA/ICg8UmVtb3ZlSWNvbiBvbkNsaWNrPXtlPT50aGlzLnJlbW92ZShfaWQpfS8+KSA6IG51bGx9XHJcblx0XHRcdFx0XHRcdFx0cmlnaHRJY29uPXs8UmlnaHRBcnJvdyBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYCR7dGhpcy5wcm9wcy5sb2NhdGlvbi5wYXRobmFtZX0vJHtfaWR9YCl9Lz59XHJcblx0XHRcdFx0XHRcdFx0cHJpbWFyeVRleHQ9e1xyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuPntwbGFjZX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuICBzdHlsZT17e3dpZHRoOjE1MH19PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdOmAl+eVmVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBuYW1lPVwiZGF5c1wiXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzdHlsZT17e3dpZHRoOlwiMmVtXCIsYmFja2dyb3VuZDpcInRyYW5zcGFyZW50XCIsdGV4dEFsaWduOlwiY2VudGVyXCIsYm9yZGVyQm90dG9tOlwiMXB4IHNvbGlkIGxpZ2h0Z3JheVwifX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17MX0gLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHTlpKlcclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+fVxyXG5cdFx0XHRcdFx0XHRcdHNlY29uZGFyeVRleHQ9e1xyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7d2lkdGg6MzB9fT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8SWNvbk1lbnUgaWNvbkJ1dHRvbkVsZW1lbnQ9ezxJY29uQnV0dG9uPjxOZXh0SWNvbi8+PC9JY29uQnV0dG9uPn0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8TWVudUl0ZW0gdmFsdWU9ezF9IHByaW1hcnlUZXh0PVwi6aOeXCIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PE1lbnVJdGVtIHZhbHVlPXsyfSBwcmltYXJ5VGV4dD1cIueBq+i9plwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxNZW51SXRlbSB2YWx1ZT17M30gcHJpbWFyeVRleHQ9XCLoh6rpqb5cIi8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8TWVudUl0ZW0gdmFsdWU9ezR9IHByaW1hcnlUZXh0PVwi6LWwXCIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvSWNvbk1lbnU+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3twb3NpdGlvbjpcInJlbGF0aXZlXCIsIHRvcDotMTJ9fT7po548L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHR9Lz5cclxuXHRcdFx0XHRcdCkpfVxyXG5cdFx0XHRcdDwvU2VsZWN0YWJsZUxpc3Q+XHJcblx0XHRcdFx0PFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIGl0ZW1zPXthY3Rpb25zfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0cmVtb3ZlKF9pZCl7XHJcblx0XHRpdGluZXJhcnlEQi5yZW1vdmUoX2lkKVxyXG5cdFx0XHQudGhlbihhPT57XHJcblx0XHRcdFx0Y29uc3Qge2l0aW5lcmFyeX09dGhpcy5zdGF0ZVxyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2l0aW5lcmFyeTppdGluZXJhcnkuZmlsdGVyKGE9PmEuX2lkIT1faWQpfSlcclxuXHRcdFx0fSlcclxuXHR9XHJcblxyXG5cdGFkZChwbGFjZSl7XHJcblx0XHRsZXQgYT17cGxhY2UsZGF5czoxLGpvdXJuZXk6dGhpcy5wcm9wcy5wYXJhbXMuX2lkfVxyXG5cdFx0SXRpbmVyYXJ5REIudXBzZXJ0KGEpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PntcclxuXHRcdFx0XHRjb25zdCB7aXRpbmVyYXJ5fT10aGlzLnN0YXRlXHJcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7aXRpbmVyYXJ5Oml0aW5lcmFyeS5jb25jYXQoW3VwZGF0ZWRdKX0pXHJcblx0XHRcdH0pXHJcblx0fVxyXG5cclxuXHJcbn1cclxuIl19