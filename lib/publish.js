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

			var _id = this.props.params._id;
			var template = this.state.template;

			var cond = null;
			if (!_id) {
				cond = _react2.default.createElement(_materialUi.DatePicker, { ref: "since",
					floatingLabelText: "自从",
					autoOk: true, mode: "landscape" });
			}
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(_materialUi.AppBar, { title: "出版-留下永久的回忆",
					showMenuIconButton: false }),
				_react2.default.createElement(
					"center",
					null,
					cond,
					_react2.default.createElement(_materialUi.TextField, { ref: "copy",
						floatingLabelText: "打印多少本",
						defaultValue: 1,
						type: "number" })
				),
				_react2.default.createElement(
					_materialUi.GridList,
					null,
					_react2.default.createElement(
						_materialUi.Subheader,
						null,
						"选择出版模板"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU87SUFBVTs7SUFHSTs7Ozs7Ozs7Ozs7Ozs7cU1BQ3BCLFFBQU0sRUFBQyxVQUFTLE9BQVQ7OztjQURhOzsyQkFHVDs7O09BQ0gsTUFBSyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQUwsSUFERztPQUVILFdBQVUsS0FBSyxLQUFMLENBQVYsU0FGRzs7QUFHVixPQUFJLE9BQUssSUFBTCxDQUhNO0FBSVYsT0FBRyxDQUFDLEdBQUQsRUFBSztBQUNQLFdBQU0sd0RBQVksS0FBSSxPQUFKO0FBQ2pCLHdCQUFrQixJQUFsQjtBQUNBLGFBQVEsSUFBUixFQUFjLE1BQUssV0FBTCxFQUZULENBQU4sQ0FETztJQUFSO0FBS00sVUFDSTs7O0lBQ1Isb0RBQVE7QUFDUCx5QkFBb0IsS0FBcEIsRUFERCxDQURRO0lBR1I7OztLQUNFLElBREY7S0FHQyx1REFBVyxLQUFJLE1BQUo7QUFDVix5QkFBa0IsT0FBbEI7QUFDQSxvQkFBYyxDQUFkO0FBQ0EsWUFBSyxRQUFMLEVBSEQsQ0FIRDtLQUhRO0lBV1I7OztLQUNDOzs7O01BREQ7S0FHRSx5QkFBeUIsS0FBekIsQ0FBK0IsR0FBL0IsRUFBb0MsR0FBcEMsQ0FBd0M7YUFDeEM7O1NBQVUsS0FBSyxDQUFMO0FBQ1QseUJBQWdCLHVGQUFoQjtBQUNBLGVBQU8sQ0FBUCxFQUFVLGVBQWMsS0FBZDtBQUNWLHdCQUFlLE1BQWY7QUFDQSxvQkFBWTs7V0FBWSxTQUFTO2tCQUFHLE9BQUssUUFBTCxDQUFjLEVBQUMsVUFBUyxDQUFULEVBQWY7V0FBSCxFQUFyQjtTQUNULFlBQVUsQ0FBVixHQUNBLGdEQUFjLFlBQVcsTUFBWCxFQUFrQixPQUFNLFFBQU4sRUFBaEMsQ0FEQSxHQUVBLHNEQUFnQixZQUFXLE1BQVgsRUFBa0IsT0FBTSxPQUFOLEVBQWxDLENBRkE7U0FESCxFQUpEO09BVUMsdUNBQUssMEJBQXdCLFVBQXhCLEVBQUwsQ0FWRDs7TUFEd0MsQ0FIMUM7S0FYUTtJQTZCSSw4QkFBQyxVQUFELElBQVksV0FBVSxTQUFWO0FBQ1IsWUFBTyxDQUFDLE1BQUQsRUFDckIsRUFBQyxRQUFPLFNBQVAsRUFBa0IsT0FBTSxJQUFOLEVBQVksVUFBUztjQUFHLE9BQUssT0FBTDtPQUFILEVBQW1CLE1BQUssdURBQUwsRUFEdEMsRUFFckIsRUFBQyxRQUFPLE9BQVAsRUFBZ0IsT0FBTSxLQUFOLEVBQWEsVUFBUztjQUFHLE9BQUssS0FBTDtPQUFILEVBQWlCLE1BQUssb0RBQUwsRUFGbkMsQ0FBUCxFQURKLENBN0JKO0lBREosQ0FUSTs7Ozs0QkFnREY7QUFDUixRQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLFdBQXpCLEVBRFE7Ozs7MEJBSUY7QUFDTixRQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLDRDQUF6QixFQURNOzs7O1FBdkRhOzs7VUEyRGIsZUFBYTtBQUNuQixjQUFhLGlCQUFVLElBQVY7O2tCQTVETSIsImZpbGUiOiJwdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7VGV4dEZpZWxkLCBEYXRlUGlja2VyLCBJY29uQnV0dG9uLCBHcmlkTGlzdCwgR3JpZFRpbGUsIFN1YmhlYWRlciwgQXBwQmFyLCBEaXZpZGVyLH0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IEljb25VblNlbGVjdGVkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy90b2dnbGUvc3Rhci1ib3JkZXInXHJcbmltcG9ydCBJY29uU2VsZWN0ZWQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL3RvZ2dsZS9zdGFyJ1xyXG5pbXBvcnQgSWNvblByaW50IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3ByaW50XCJcclxuaW1wb3J0IEljb25WaWV3IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3BhZ2V2aWV3XCJcclxuXHJcbmNvbnN0IHtNZXNzYWdlciwgQ29tbWFuZEJhcn09VUlcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoZXIgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e3RlbXBsYXRlOlwibGlnaHRcIn1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtfaWR9PXRoaXMucHJvcHMucGFyYW1zXHJcblx0XHRjb25zdCB7dGVtcGxhdGV9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBjb25kPW51bGxcclxuXHRcdGlmKCFfaWQpe1xyXG5cdFx0XHRjb25kPSg8RGF0ZVBpY2tlciByZWY9XCJzaW5jZVwiXHJcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLoh6rku45cIlxyXG5cdFx0XHRcdGF1dG9Paz17dHJ1ZX0gbW9kZT1cImxhbmRzY2FwZVwiLz4pXHJcblx0XHR9XHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG5cdFx0XHRcdDxBcHBCYXIgdGl0bGU9e2Dlh7rniYgt55WZ5LiL5rC45LmF55qE5Zue5b+GYH1cclxuXHRcdFx0XHRcdHNob3dNZW51SWNvbkJ1dHRvbj17ZmFsc2V9Lz5cclxuXHRcdFx0XHQ8Y2VudGVyPlxyXG5cdFx0XHRcdFx0e2NvbmR9XHJcblxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9XCJjb3B5XCJcclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLmiZPljbDlpJrlsJHmnKxcIlxyXG5cdFx0XHRcdFx0XHRkZWZhdWx0VmFsdWU9ezF9XHJcblx0XHRcdFx0XHRcdHR5cGU9XCJudW1iZXJcIi8+XHJcblx0XHRcdFx0PC9jZW50ZXI+XHJcblx0XHRcdFx0PEdyaWRMaXN0PlxyXG5cdFx0XHRcdFx0PFN1YmhlYWRlcj7pgInmi6nlh7rniYjmqKHmnb88L1N1YmhlYWRlcj5cclxuXHJcblx0XHRcdFx0XHR7XCJsaWdodCxkYXJrLG1vZGVybixnaWZ0XCIuc3BsaXQoXCIsXCIpLm1hcChhPT4oXHJcblx0XHRcdFx0XHRcdDxHcmlkVGlsZSBrZXk9e2F9XHJcblx0XHRcdFx0XHRcdFx0dGl0bGVCYWNrZ3JvdW5kPVwibGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgcmdiYSgwLDAsMCwwLjcpIDAlLHJnYmEoMCwwLDAsMC4zKSA3MCUscmdiYSgwLDAsMCwwKSAxMDAlKVwiXHJcblx0XHRcdFx0XHRcdFx0dGl0bGU9e2F9IHRpdGxlUG9zaXRpb249XCJ0b3BcIlxyXG5cdFx0XHRcdFx0XHRcdGFjdGlvblBvc2l0aW9uPVwibGVmdFwiXHJcblx0XHRcdFx0XHRcdFx0YWN0aW9uSWNvbj17PEljb25CdXR0b24gb25DbGljaz17ZT0+dGhpcy5zZXRTdGF0ZSh7dGVtcGxhdGU6YX0pfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e3RlbXBsYXRlPT1hID9cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8SWNvblNlbGVjdGVkIGhvdmVyQ29sb3I9XCJibHVlXCIgY29sb3I9XCJ5ZWxsb3dcIi8+IDpcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8SWNvblVuU2VsZWN0ZWQgaG92ZXJDb2xvcj1cImJsdWVcIiBjb2xvcj1cIndoaXRlXCIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+fT5cclxuXHRcdFx0XHRcdFx0XHQ8aW1nIHNyYz17YGltYWdlcy90ZW1wbGF0ZS8ke2F9LmpwZ2B9Lz5cclxuXHRcdFx0XHRcdFx0PC9HcmlkVGlsZT5cclxuXHRcdFx0XHRcdCkpfVxyXG5cdFx0XHRcdDwvR3JpZExpc3Q+XHJcbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiUHJldmlld1wiLCBsYWJlbDpcIumihOiniFwiLCBvblNlbGVjdDplPT50aGlzLnByZXZpZXcoKSwgaWNvbjo8SWNvblZpZXcvPn0sXHJcblx0XHRcdFx0XHRcdHthY3Rpb246XCJQcmludFwiLCBsYWJlbDpcIuS6keaJk+WNsFwiLCBvblNlbGVjdDplPT50aGlzLnByaW50KCksIGljb246PEljb25QcmludC8+fVxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblx0cHJldmlldygpe1xyXG5cdFx0dGhpcy5jb250ZXh0LnNob3dNZXNzYWdlKFwic3RheSB0dW5lXCIpXHJcblx0fVxyXG5cclxuXHRwcmludCgpe1xyXG5cdFx0dGhpcy5jb250ZXh0LnNob3dNZXNzYWdlKFwiUHV0IGludG8gcXVldWUsIHBsZWFzZSBwYXkgd2l0aGluIDI0IGhvdXJzXCIpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHNob3dNZXNzYWdlOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH1cclxufVxyXG4iXX0=