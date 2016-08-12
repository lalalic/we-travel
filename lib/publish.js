"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Publisher = function (_Component) {
	_inherits(Publisher, _Component);

	function Publisher() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Publisher);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Publisher)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { template: "light" }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Publisher, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var child = this.props.child;
			var template = this.state.template;

			return _qiliApp.React.createElement(
				"div",
				null,
				_qiliApp.React.createElement(_materialUi.AppBar, { title: "出版-留下永久的回忆",
					showMenuIconButton: false }),
				_qiliApp.React.createElement(
					"center",
					null,
					_qiliApp.React.createElement(_materialUi.DatePicker, { ref: "since",
						floatingLabelText: "自从",
						autoOk: true, mode: "landscape" }),
					_qiliApp.React.createElement(_materialUi.TextField, { ref: "copy",
						floatingLabelText: "打印多少本",
						defaultValue: 1,
						type: "number" })
				),
				_qiliApp.React.createElement(
					_materialUi.GridList,
					null,
					_qiliApp.React.createElement(
						_materialUi.Subheader,
						null,
						"选择出版模板"
					),
					"light,dark,modern,gift".split(",").map(function (a) {
						return _qiliApp.React.createElement(
							_materialUi.GridTile,
							{ key: a, title: a,
								actionIcon: _qiliApp.React.createElement(
									_materialUi.IconButton,
									{ onClick: function onClick(e) {
											return _this2.setState({ template: a });
										} },
									template == a ? _qiliApp.React.createElement(_star2.default, { hoverColor: "blue", color: "yellow" }) : _qiliApp.React.createElement(_starBorder2.default, { hoverColor: "blue", color: "white" })
								) },
							_qiliApp.React.createElement("img", { src: "images/template/" + a + ".jpg" })
						);
					})
				),
				_qiliApp.React.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Preview", label: "预览", onSelect: function onSelect(e) {
							return _this2.preview();
						}, icon: _pageview2.default }, { action: "Print", label: "云打印", onSelect: function onSelect(e) {
							return _this2.print();
						}, icon: _print2.default }] })
			);
		}
	}, {
		key: "preview",
		value: function preview() {
			Messager.show("stay tune");
		}
	}, {
		key: "print",
		value: function print() {
			Messager.show("Put into queue, please pay within 24 hours");
		}
	}]);

	return Publisher;
}(_qiliApp.Component);

exports.default = Publisher;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVPOztJQUdjOzs7Ozs7Ozs7Ozs7OztxTUFDcEIsUUFBTSxFQUFDLFVBQVMsT0FBVDs7O2NBRGE7OzJCQUdUOzs7T0FDSCxRQUFPLEtBQUssS0FBTCxDQUFQLE1BREc7T0FFSCxXQUFVLEtBQUssS0FBTCxDQUFWLFNBRkc7O0FBR0osVUFDSTs7O0lBQ1IsbURBQVE7QUFDUCx5QkFBb0IsS0FBcEIsRUFERCxDQURRO0lBR1I7OztLQUNDLHVEQUFZLEtBQUksT0FBSjtBQUNYLHlCQUFrQixJQUFsQjtBQUNBLGNBQVEsSUFBUixFQUFjLE1BQUssV0FBTCxFQUZmLENBREQ7S0FLQyxzREFBVyxLQUFJLE1BQUo7QUFDVix5QkFBa0IsT0FBbEI7QUFDQSxvQkFBYyxDQUFkO0FBQ0EsWUFBSyxRQUFMLEVBSEQsQ0FMRDtLQUhRO0lBYVI7OztLQUNDOzs7O01BREQ7S0FHRSx5QkFBeUIsS0FBekIsQ0FBK0IsR0FBL0IsRUFBb0MsR0FBcEMsQ0FBd0M7YUFDeEM7O1NBQVUsS0FBSyxDQUFMLEVBQVEsT0FBTyxDQUFQO0FBQ2pCLG9CQUFZOztXQUFZLFNBQVM7a0JBQUcsT0FBSyxRQUFMLENBQWMsRUFBQyxVQUFTLENBQVQsRUFBZjtXQUFILEVBQXJCO1NBQ1QsWUFBVSxDQUFWLEdBQ0EsK0NBQWMsWUFBVyxNQUFYLEVBQWtCLE9BQU0sUUFBTixFQUFoQyxDQURBLEdBRUEscURBQWdCLFlBQVcsTUFBWCxFQUFrQixPQUFNLE9BQU4sRUFBbEMsQ0FGQTtTQURILEVBREQ7T0FPQyxzQ0FBSywwQkFBd0IsVUFBeEIsRUFBTCxDQVBEOztNQUR3QyxDQUgxQztLQWJRO0lBNEJJLHlDQUFJLFVBQUosSUFBZSxXQUFVLFNBQVY7QUFDWCxZQUFPLENBQUMsTUFBRCxFQUNyQixFQUFDLFFBQU8sU0FBUCxFQUFrQixPQUFNLElBQU4sRUFBWSxVQUFTO2NBQUcsT0FBSyxPQUFMO09BQUgsRUFBbUIsd0JBQTNELEVBRHFCLEVBRXJCLEVBQUMsUUFBTyxPQUFQLEVBQWdCLE9BQU0sS0FBTixFQUFhLFVBQVM7Y0FBRyxPQUFLLEtBQUw7T0FBSCxFQUFpQixxQkFBeEQsRUFGcUIsQ0FBUCxFQURKLENBNUJKO0lBREosQ0FISTs7Ozs0QkF5Q0Y7QUFDUixZQUFTLElBQVQsQ0FBYyxXQUFkLEVBRFE7Ozs7MEJBSUY7QUFDTixZQUFTLElBQVQsQ0FBYyw0Q0FBZCxFQURNOzs7O1FBaERhIiwiZmlsZSI6InB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgUmVhY3QsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge1RleHRGaWVsZCwgRGF0ZVBpY2tlciwgSWNvbkJ1dHRvbiwgR3JpZExpc3QsIEdyaWRUaWxlLCBTdWJoZWFkZXIsIEFwcEJhciwgRGl2aWRlcix9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCBJY29uVW5TZWxlY3RlZCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvdG9nZ2xlL3N0YXItYm9yZGVyJ1xyXG5pbXBvcnQgSWNvblNlbGVjdGVkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy90b2dnbGUvc3RhcidcclxuaW1wb3J0IEljb25QcmludCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9wcmludFwiXHJcbmltcG9ydCBJY29uVmlldyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9wYWdldmlld1wiXHJcblxyXG5jb25zdCB7TWVzc2FnZXJ9PVVJXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVibGlzaGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXt0ZW1wbGF0ZTpcImxpZ2h0XCJ9XHJcblx0XHJcbiAgICByZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtjaGlsZH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3RlbXBsYXRlfT10aGlzLnN0YXRlXHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG5cdFx0XHRcdDxBcHBCYXIgdGl0bGU9e2Dlh7rniYgt55WZ5LiL5rC45LmF55qE5Zue5b+GYH0gXHJcblx0XHRcdFx0XHRzaG93TWVudUljb25CdXR0b249e2ZhbHNlfS8+XHJcblx0XHRcdFx0PGNlbnRlcj5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cInNpbmNlXCJcclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLoh6rku45cIiBcclxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfSBtb2RlPVwibGFuZHNjYXBlXCIvPlxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwiY29weVwiXHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5omT5Y2w5aSa5bCR5pysXCJcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXsxfVxyXG5cdFx0XHRcdFx0XHR0eXBlPVwibnVtYmVyXCIvPlxyXG5cdFx0XHRcdDwvY2VudGVyPlxyXG5cdFx0XHRcdDxHcmlkTGlzdD5cclxuXHRcdFx0XHRcdDxTdWJoZWFkZXI+6YCJ5oup5Ye654mI5qih5p2/PC9TdWJoZWFkZXI+XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdHtcImxpZ2h0LGRhcmssbW9kZXJuLGdpZnRcIi5zcGxpdChcIixcIikubWFwKGE9PihcclxuXHRcdFx0XHRcdFx0PEdyaWRUaWxlIGtleT17YX0gdGl0bGU9e2F9XHJcblx0XHRcdFx0XHRcdFx0YWN0aW9uSWNvbj17PEljb25CdXR0b24gb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7dGVtcGxhdGU6YX0pfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e3RlbXBsYXRlPT1hID8gXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25TZWxlY3RlZCBob3ZlckNvbG9yPVwiYmx1ZVwiIGNvbG9yPVwieWVsbG93XCIvPiA6XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25VblNlbGVjdGVkIGhvdmVyQ29sb3I9XCJibHVlXCIgY29sb3I9XCJ3aGl0ZVwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPn0+XHJcblx0XHRcdFx0XHRcdFx0PGltZyBzcmM9e2BpbWFnZXMvdGVtcGxhdGUvJHthfS5qcGdgfS8+XHJcblx0XHRcdFx0XHRcdDwvR3JpZFRpbGU+XHJcblx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHQ8L0dyaWRMaXN0PlxyXG4gICAgICAgICAgICAgICAgPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIiwgXHJcblx0XHRcdFx0XHRcdHthY3Rpb246XCJQcmV2aWV3XCIsIGxhYmVsOlwi6aKE6KeIXCIsIG9uU2VsZWN0OmU9PnRoaXMucHJldmlldygpLCBpY29uOkljb25WaWV3fSwgXHJcblx0XHRcdFx0XHRcdHthY3Rpb246XCJQcmludFwiLCBsYWJlbDpcIuS6keaJk+WNsFwiLCBvblNlbGVjdDplPT50aGlzLnByaW50KCksIGljb246SWNvblByaW50fVxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHRcclxuXHRwcmV2aWV3KCl7XHJcblx0XHRNZXNzYWdlci5zaG93KFwic3RheSB0dW5lXCIpXHJcblx0fVxyXG5cdFxyXG5cdHByaW50KCl7XHJcblx0XHRNZXNzYWdlci5zaG93KFwiUHV0IGludG8gcXVldWUsIHBsZWFzZSBwYXkgd2l0aGluIDI0IGhvdXJzXCIpXHJcblx0fVxyXG59XHJcbiJdfQ==