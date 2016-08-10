"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _accountBox = require("material-ui/svg-icons/action/account-box");

var _accountBox2 = _interopRequireDefault(_accountBox);

var _explore = require("material-ui/svg-icons/action/explore");

var _explore2 = _interopRequireDefault(_explore);

var _personPinCircle = require("material-ui/svg-icons/maps/person-pin-circle");

var _personPinCircle2 = _interopRequireDefault(_personPinCircle);

var _qiliApp = require("qili-app");

var _my = require("./my");

var _my2 = _interopRequireDefault(_my);

var _setting = require("qili-app/lib/setting");

var _setting2 = _interopRequireDefault(_setting);

var _userProfile = require("qili-app/lib/user-profile");

var _userProfile2 = _interopRequireDefault(_userProfile);

var _trip = require("./trip");

var _trip2 = _interopRequireDefault(_trip);

var _explore3 = require("./explore");

var _explore4 = _interopRequireDefault(_explore3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var CommandBar = _qiliApp.UI.CommandBar;

var Main = function (_QiliApp) {
	_inherits(Main, _QiliApp);

	function Main() {
		_classCallCheck(this, Main);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).apply(this, arguments));
	}

	_createClass(Main, [{
		key: "renderContent",
		value: function renderContent() {
			var _this2 = this;

			var pathname = this.props.children.props.location.pathname;

			return _react2.default.createElement(
				"div",
				null,
				this.props.children,
				_react2.default.createElement(CommandBar, { className: "footbar",
					onSelect: function onSelect(cmd) {
						return _this2.context.router.push(cmd.toLowerCase());
					},
					primary: pathname == "/" ? "/" : pathname.split("/")[1],
					items: [{ label: "旅程", action: "/", icon: _personPinCircle2.default }, { label: "发现", action: "explore", icon: _explore2.default }, { label: "帐号", action: "my", icon: _accountBox2.default }] })
			);
		}
	}]);

	return Main;
}(_qiliApp.QiliApp);

Main.defaultProps = Object.assign(_qiliApp.QiliApp.defaultProps, {
	appId: "we-travel",
	title: "travel along life"
});
Main.contextTypes = {
	router: _react.PropTypes.object
};


Main.render(_react2.default.createElement(
	_reactRouter.Route,
	{ path: "/", component: Main },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _trip2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: "explore", component: _explore4.default }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "my" },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: _my2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: "setting", component: _setting2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: "profile", component: _userProfile2.default })
	)
));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUErQkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBNUNBLFFBQVEscUJBQVI7O0lBVU87O0lBRUQ7Ozs7Ozs7Ozs7O2tDQU1VOzs7T0FDVCxXQUFVLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsS0FBcEIsQ0FBMEIsUUFBMUIsQ0FBVixTQURTOztBQUVkLFVBQ0M7OztJQUNFLEtBQUssS0FBTCxDQUFXLFFBQVg7SUFDRCw4QkFBQyxVQUFELElBQVksV0FBVSxTQUFWO0FBQ1gsZUFBVTthQUFLLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBSSxXQUFKLEVBQXpCO01BQUw7QUFDVixjQUFTLFlBQVUsR0FBVixHQUFnQixHQUFoQixHQUFzQixTQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLENBQXBCLENBQXRCO0FBQ1QsWUFBTyxDQUNOLEVBQUMsT0FBTSxJQUFOLEVBQVksUUFBTyxHQUFQLEVBQVcsK0JBQXhCLEVBRE0sRUFFTixFQUFDLE9BQU0sSUFBTixFQUFZLFFBQU8sU0FBUCxFQUFrQix1QkFBL0IsRUFGTSxFQUdOLEVBQUMsT0FBTSxJQUFOLEVBQVksUUFBTyxJQUFQLEVBQWEsMEJBQTFCLEVBSE0sQ0FBUCxFQUhELENBRkQ7SUFERCxDQUZjOzs7O1FBTlY7OztLQUNFLGVBQWEsT0FBTyxNQUFQLENBQWMsaUJBQVEsWUFBUixFQUFxQjtBQUN0RCxRQUFNLFdBQU47QUFDQSxRQUFNLG1CQUFOO0NBRm1CO0FBRGYsS0F1QkUsZUFBYTtBQUNuQixTQUFRLGlCQUFVLE1BQVY7Ozs7QUFVVixLQUFLLE1BQUwsQ0FDQTs7R0FBTyxNQUFLLEdBQUwsRUFBUyxXQUFXLElBQVgsRUFBaEI7Q0FDQyx5REFBWSwyQkFBWixDQUREO0NBRUMsb0RBQU8sTUFBSyxTQUFMLEVBQWUsOEJBQXRCLENBRkQ7Q0FHQzs7SUFBTyxNQUFLLElBQUwsRUFBUDtFQUNDLHlEQUFZLHlCQUFaLENBREQ7RUFFQyxvREFBTyxNQUFLLFNBQUwsRUFBZSw4QkFBdEIsQ0FGRDtFQUdDLG9EQUFPLE1BQUssU0FBTCxFQUFlLGtDQUF0QixDQUhEO0VBSEQ7Q0FEQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxyXG5cclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuXHJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xyXG5pbXBvcnQgSWNvbkV4cGxvcmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9leHBsb3JlJ1xyXG5pbXBvcnQgSWNvblRyaXAgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvcGVyc29uLXBpbi1jaXJjbGUnXHJcblxyXG5pbXBvcnQge1FpbGlBcHAsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5jb25zdCB7Q29tbWFuZEJhcn09VUlcclxuXHJcbmNsYXNzIE1haW4gZXh0ZW5kcyBRaWxpQXBwe1xyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmRlZmF1bHRQcm9wcyx7XHJcblx0XHRhcHBJZDpcIndlLXRyYXZlbFwiLFxyXG5cdFx0dGl0bGU6XCJ0cmF2ZWwgYWxvbmcgbGlmZVwiXHJcblx0fSlcclxuXHRcclxuXHRyZW5kZXJDb250ZW50KCl7XHJcblx0XHRsZXQge3BhdGhuYW1lfT10aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmxvY2F0aW9uXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBcclxuXHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChjbWQudG9Mb3dlckNhc2UoKSl9XHJcblx0XHRcdFx0XHRwcmltYXJ5PXtwYXRobmFtZT09XCIvXCIgPyBcIi9cIiA6IHBhdGhuYW1lLnNwbGl0KFwiL1wiKVsxXX1cclxuXHRcdFx0XHRcdGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaXheeoi1wiLCBhY3Rpb246XCIvXCIsaWNvbjpJY29uVHJpcH0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJleHBsb3JlXCIsIGljb246SWNvbkV4cGxvcmV9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLluJDlj7dcIiwgYWN0aW9uOlwibXlcIiwgaWNvbjpJY29uQWNjb3VudH0sXHJcblx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG5cclxuaW1wb3J0IE15VUkgZnJvbSBcIi4vbXlcIlxyXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gXCJxaWxpLWFwcC9saWIvc2V0dGluZ1wiXHJcbmltcG9ydCBQcm9maWxlVUkgZnJvbSBcInFpbGktYXBwL2xpYi91c2VyLXByb2ZpbGVcIlxyXG5pbXBvcnQgVHJpcFVJIGZyb20gXCIuL3RyaXBcIlxyXG5pbXBvcnQgRXhwbG9yZVVJIGZyb20gXCIuL2V4cGxvcmVcIlxyXG5cclxuTWFpbi5yZW5kZXIoXHJcbjxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17TWFpbn0+XHJcblx0PEluZGV4Um91dGUgY29tcG9uZW50PXtUcmlwVUl9Lz5cclxuXHQ8Um91dGUgcGF0aD1cImV4cGxvcmVcIiBjb21wb25lbnQ9e0V4cGxvcmVVSX0vPlxyXG5cdDxSb3V0ZSBwYXRoPVwibXlcIj5cclxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TXlVSX0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XHJcblx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0vPlxyXG5cdDwvUm91dGU+XHJcbjwvUm91dGU+XHJcbikiXX0=