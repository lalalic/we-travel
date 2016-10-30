"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _starBorder = require("material-ui/svg-icons/toggle/star-border");

var _starBorder2 = _interopRequireDefault(_starBorder);

var _star = require("material-ui/svg-icons/toggle/star");

var _star2 = _interopRequireDefault(_star);

var _print = require("material-ui/svg-icons/action/print");

var _print2 = _interopRequireDefault(_print);

var _pageview = require("material-ui/svg-icons/action/pageview");

var _pageview2 = _interopRequireDefault(_pageview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Messager = _qiliApp.UI.Messager;
var CommandBar = _qiliApp.UI.CommandBar;

var Publisher = function (_Component) {
	_inherits(Publisher, _Component);

	function Publisher() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Publisher);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Publisher.__proto__ || Object.getPrototypeOf(Publisher)).call.apply(_ref, [this].concat(args))), _this), _this.state = { template: "light" }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Publisher, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _id = this.props.params._id;
			var template = this.state.template;

			var cond = null;
			if (!_id) {
				cond = _react2.default.createElement(_materialUi.DatePicker, { ref: "since",
					floatingLabelText: "\u81EA\u4ECE",
					autoOk: true, mode: "landscape" });
			}
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_materialUi.AppBar, { title: "\u51FA\u7248-\u7559\u4E0B\u6C38\u4E45\u7684\u56DE\u5FC6",
					showMenuIconButton: false }),
				_react2.default.createElement(
					"center",
					null,
					cond,
					_react2.default.createElement(_materialUi.TextField, { ref: "copy",
						floatingLabelText: "\u6253\u5370\u591A\u5C11\u672C",
						defaultValue: 1,
						type: "number" })
				),
				_react2.default.createElement(
					_materialUi.GridList,
					null,
					_react2.default.createElement(
						_materialUi.Subheader,
						null,
						"\u9009\u62E9\u51FA\u7248\u6A21\u677F"
					),
					"light,dark,modern,gift".split(",").map(function (a) {
						return _react2.default.createElement(
							_materialUi.GridTile,
							{ key: a,
								titleBackground: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)",
								title: a, titlePosition: "top",
								actionPosition: "left",
								actionIcon: _react2.default.createElement(
									_materialUi.IconButton,
									{ onClick: function onClick(e) {
											return _this2.setState({ template: a });
										} },
									template == a ? _react2.default.createElement(_star2.default, { hoverColor: "blue", color: "yellow" }) : _react2.default.createElement(_starBorder2.default, { hoverColor: "blue", color: "white" })
								) },
							_react2.default.createElement("img", { src: "images/template/" + a + ".jpg" })
						);
					})
				),
				_react2.default.createElement(CommandBar, { className: "footbar",
					items: ["Back", { action: "Preview", label: "预览", onSelect: function onSelect(e) {
							return _this2.preview();
						}, icon: _react2.default.createElement(_pageview2.default, null) }, { action: "Print", label: "云打印", onSelect: function onSelect(e) {
							return _this2.print();
						}, icon: _react2.default.createElement(_print2.default, null) }] })
			);
		}
	}, {
		key: "preview",
		value: function preview() {
			this.context.showMessage("stay tune");
		}
	}, {
		key: "print",
		value: function print() {
			this.context.showMessage("Put into queue, please pay within 24 hours");
		}
	}]);

	return Publisher;
}(_react.Component);

Publisher.contextTypes = {
	showMessage: _react.PropTypes.func
};
exports.default = Publisher;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2VyIiwiQ29tbWFuZEJhciIsIlB1Ymxpc2hlciIsInN0YXRlIiwidGVtcGxhdGUiLCJfaWQiLCJwcm9wcyIsInBhcmFtcyIsImNvbmQiLCJzcGxpdCIsIm1hcCIsImEiLCJzZXRTdGF0ZSIsImFjdGlvbiIsImxhYmVsIiwib25TZWxlY3QiLCJwcmV2aWV3IiwiaWNvbiIsInByaW50IiwiY29udGV4dCIsInNob3dNZXNzYWdlIiwiY29udGV4dFR5cGVzIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFT0EsUSxlQUFBQSxRO0lBQVVDLFUsZUFBQUEsVTs7SUFHSUMsUzs7Ozs7Ozs7Ozs7Ozs7MExBQ3BCQyxLLEdBQU0sRUFBQ0MsVUFBUyxPQUFWLEU7Ozs7OzJCQUVLO0FBQUE7O0FBQUEsT0FDSEMsR0FERyxHQUNFLEtBQUtDLEtBQUwsQ0FBV0MsTUFEYixDQUNIRixHQURHO0FBQUEsT0FFSEQsUUFGRyxHQUVPLEtBQUtELEtBRlosQ0FFSEMsUUFGRzs7QUFHVixPQUFJSSxPQUFLLElBQVQ7QUFDQSxPQUFHLENBQUNILEdBQUosRUFBUTtBQUNQRyxXQUFNLHdEQUFZLEtBQUksT0FBaEI7QUFDTCx3QkFBa0IsY0FEYjtBQUVMLGFBQVEsSUFGSCxFQUVTLE1BQUssV0FGZCxHQUFOO0FBR0E7QUFDSyxVQUNJO0FBQUE7QUFBQTtBQUNSLHdEQUFRLGdFQUFSO0FBQ0MseUJBQW9CLEtBRHJCLEdBRFE7QUFHUjtBQUFBO0FBQUE7QUFDRUEsU0FERjtBQUdDLDREQUFXLEtBQUksTUFBZjtBQUNDLHlCQUFrQixnQ0FEbkI7QUFFQyxvQkFBYyxDQUZmO0FBR0MsWUFBSyxRQUhOO0FBSEQsS0FIUTtBQVdSO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFERDtBQUdFLDhCQUF5QkMsS0FBekIsQ0FBK0IsR0FBL0IsRUFBb0NDLEdBQXBDLENBQXdDO0FBQUEsYUFDeEM7QUFBQTtBQUFBLFNBQVUsS0FBS0MsQ0FBZjtBQUNDLHlCQUFnQix1RkFEakI7QUFFQyxlQUFPQSxDQUZSLEVBRVcsZUFBYyxLQUZ6QjtBQUdDLHdCQUFlLE1BSGhCO0FBSUMsb0JBQVk7QUFBQTtBQUFBLFdBQVksU0FBUztBQUFBLGtCQUFHLE9BQUtDLFFBQUwsQ0FBYyxFQUFDUixVQUFTTyxDQUFWLEVBQWQsQ0FBSDtBQUFBLFdBQXJCO0FBQ1RQLHFCQUFVTyxDQUFWLEdBQ0EsZ0RBQWMsWUFBVyxNQUF6QixFQUFnQyxPQUFNLFFBQXRDLEdBREEsR0FFQSxzREFBZ0IsWUFBVyxNQUEzQixFQUFrQyxPQUFNLE9BQXhDO0FBSFMsU0FKYjtBQVVDLDhDQUFLLDBCQUF3QkEsQ0FBeEIsU0FBTDtBQVZELE9BRHdDO0FBQUEsTUFBeEM7QUFIRixLQVhRO0FBNkJJLGtDQUFDLFVBQUQsSUFBWSxXQUFVLFNBQXRCO0FBQ0ksWUFBTyxDQUFDLE1BQUQsRUFDckIsRUFBQ0UsUUFBTyxTQUFSLEVBQW1CQyxPQUFNLElBQXpCLEVBQStCQyxVQUFTO0FBQUEsY0FBRyxPQUFLQyxPQUFMLEVBQUg7QUFBQSxPQUF4QyxFQUEyREMsTUFBSyx1REFBaEUsRUFEcUIsRUFFckIsRUFBQ0osUUFBTyxPQUFSLEVBQWlCQyxPQUFNLEtBQXZCLEVBQThCQyxVQUFTO0FBQUEsY0FBRyxPQUFLRyxLQUFMLEVBQUg7QUFBQSxPQUF2QyxFQUF3REQsTUFBSyxvREFBN0QsRUFGcUIsQ0FEWDtBQTdCSixJQURKO0FBcUNIOzs7NEJBRUs7QUFDUixRQUFLRSxPQUFMLENBQWFDLFdBQWIsQ0FBeUIsV0FBekI7QUFDQTs7OzBCQUVNO0FBQ04sUUFBS0QsT0FBTCxDQUFhQyxXQUFiLENBQXlCLDRDQUF6QjtBQUNBOzs7Ozs7QUF6RG1CbEIsUyxDQTJEYm1CLFksR0FBYTtBQUNuQkQsY0FBYSxpQkFBVUU7QUFESixDO2tCQTNEQXBCLFMiLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge1RleHRGaWVsZCwgRGF0ZVBpY2tlciwgSWNvbkJ1dHRvbiwgR3JpZExpc3QsIEdyaWRUaWxlLCBTdWJoZWFkZXIsIEFwcEJhciwgRGl2aWRlcix9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCBJY29uVW5TZWxlY3RlZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvdG9nZ2xlL3N0YXItYm9yZGVyJ1xyXG5pbXBvcnQgSWNvblNlbGVjdGVkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy90b2dnbGUvc3RhcidcclxuaW1wb3J0IEljb25QcmludCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9wcmludFwiXHJcbmltcG9ydCBJY29uVmlldyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9wYWdldmlld1wiXHJcblxyXG5jb25zdCB7TWVzc2FnZXIsIENvbW1hbmRCYXJ9PVVJXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXt0ZW1wbGF0ZTpcImxpZ2h0XCJ9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcblx0XHRjb25zdCB7X2lkfT10aGlzLnByb3BzLnBhcmFtc1xyXG5cdFx0Y29uc3Qge3RlbXBsYXRlfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgY29uZD1udWxsXHJcblx0XHRpZighX2lkKXtcclxuXHRcdFx0Y29uZD0oPERhdGVQaWNrZXIgcmVmPVwic2luY2VcIlxyXG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi6Ieq5LuOXCJcclxuXHRcdFx0XHRhdXRvT2s9e3RydWV9IG1vZGU9XCJsYW5kc2NhcGVcIi8+KVxyXG5cdFx0fVxyXG4gICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgPGRpdj5cclxuXHRcdFx0XHQ8QXBwQmFyIHRpdGxlPXtg5Ye654mILeeVmeS4i+awuOS5heeahOWbnuW/hmB9XHJcblx0XHRcdFx0XHRzaG93TWVudUljb25CdXR0b249e2ZhbHNlfS8+XHJcblx0XHRcdFx0PGNlbnRlcj5cclxuXHRcdFx0XHRcdHtjb25kfVxyXG5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwiY29weVwiXHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5omT5Y2w5aSa5bCR5pysXCJcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXsxfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwibnVtYmVyXCIvPlxyXG5cdFx0XHRcdDwvY2VudGVyPlxyXG5cdFx0XHRcdDxHcmlkTGlzdD5cclxuXHRcdFx0XHRcdDxTdWJoZWFkZXI+6YCJ5oup5Ye654mI5qih5p2/PC9TdWJoZWFkZXI+XHJcblxyXG5cdFx0XHRcdFx0e1wibGlnaHQsZGFyayxtb2Rlcm4sZ2lmdFwiLnNwbGl0KFwiLFwiKS5tYXAoYT0+KFxyXG5cdFx0XHRcdFx0XHQ8R3JpZFRpbGUga2V5PXthfVxyXG5cdFx0XHRcdFx0XHRcdHRpdGxlQmFja2dyb3VuZD1cImxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMCwwLDAsMC43KSAwJSxyZ2JhKDAsMCwwLDAuMykgNzAlLHJnYmEoMCwwLDAsMCkgMTAwJSlcIlxyXG5cdFx0XHRcdFx0XHRcdHRpdGxlPXthfSB0aXRsZVBvc2l0aW9uPVwidG9wXCJcclxuXHRcdFx0XHRcdFx0XHRhY3Rpb25Qb3NpdGlvbj1cImxlZnRcIlxyXG5cdFx0XHRcdFx0XHRcdGFjdGlvbkljb249ezxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe3RlbXBsYXRlOmF9KX0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdHt0ZW1wbGF0ZT09YSA/XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25TZWxlY3RlZCBob3ZlckNvbG9yPVwiYmx1ZVwiIGNvbG9yPVwieWVsbG93XCIvPiA6XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25VblNlbGVjdGVkIGhvdmVyQ29sb3I9XCJibHVlXCIgY29sb3I9XCJ3aGl0ZVwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPn0+XHJcblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e2BpbWFnZXMvdGVtcGxhdGUvJHthfS5qcGdgfS8+XHJcblx0XHRcdFx0XHRcdDwvR3JpZFRpbGU+XHJcblx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHQ8L0dyaWRMaXN0PlxyXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcclxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIlByZXZpZXdcIiwgbGFiZWw6XCLpooTop4hcIiwgb25TZWxlY3Q6ZT0+dGhpcy5wcmV2aWV3KCksIGljb246PEljb25WaWV3Lz59LFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiUHJpbnRcIiwgbGFiZWw6XCLkupHmiZPljbBcIiwgb25TZWxlY3Q6ZT0+dGhpcy5wcmludCgpLCBpY29uOjxJY29uUHJpbnQvPn1cclxuXHRcdFx0XHRcdFx0XX0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cdHByZXZpZXcoKXtcclxuXHRcdHRoaXMuY29udGV4dC5zaG93TWVzc2FnZShcInN0YXkgdHVuZVwiKVxyXG5cdH1cclxuXHJcblx0cHJpbnQoKXtcclxuXHRcdHRoaXMuY29udGV4dC5zaG93TWVzc2FnZShcIlB1dCBpbnRvIHF1ZXVlLCBwbGVhc2UgcGF5IHdpdGhpbiAyNCBob3Vyc1wiKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRzaG93TWVzc2FnZTogUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcbn1cclxuIl19