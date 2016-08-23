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

var _life = require("./life");

var _life2 = _interopRequireDefault(_life);

var _explore3 = require("./explore");

var _explore4 = _interopRequireDefault(_explore3);

var _publish = require("./publish");

var _publish2 = _interopRequireDefault(_publish);

var _journey = require("./journey");

var _journey2 = _interopRequireDefault(_journey);

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
				_react2.default.createElement(CommandBar, { className: "footbar", style: { zIndex: 8 },
					onSelect: function onSelect(cmd) {
						return _this2.context.router.push(cmd.toLowerCase());
					},
					primary: pathname == "/" ? "/" : pathname.split("/")[1],
					items: [{ label: "我", action: "/", icon: _personPinCircle2.default }, { label: "发现", action: "explore", icon: _explore2.default }, { label: "帐号", action: "my", icon: _accountBox2.default }] })
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
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _life2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: "explore", component: _explore4.default }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "my" },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: _my2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: "setting", component: _setting2.default }),
		_react2.default.createElement(_reactRouter.Route, { path: "profile", component: _userProfile2.default })
	),
	_react2.default.createElement(_reactRouter.Route, { path: "publish", component: _publish2.default }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "journey" },
		_react2.default.createElement(_reactRouter.Route, { path: "_new", component: _journey2.default.Creator }),
		_react2.default.createElement(_reactRouter.Route, { path: ":id", component: _journey2.default })
	)
));

Object.assign(Date.prototype, {
	toDate: function toDate() {
		var d = new Date(this.getTime());
		d.setHours(0);
		d.setMinutes(0);
		d.setSeconds(0);
		d.setMilliseconds(0);
		return d;
	},
	isSameDate: function isSameDate(d) {
		return this.relative(d) == 0;
	},
	relative: function relative(d) {
		return Math.floor((this.toDate().getTime() - d.toDate().getTime()) / (24 * 60 * 60 * 1000));
	},
	relativeDate: function relativeDate(days) {
		return new Date(this.getTime() + 24 * 60 * 60 * 1000 * days);
	},
	format: function format() {
		var tmpl = arguments.length <= 0 || arguments[0] === undefined ? "y-M-d" : arguments[0];

		var value = {
			y: this.getFullYear(),
			M: this.getMonth() + 1,
			d: this.getDate(),
			h: this.getHours(),
			m: this.getMinutes(),
			s: this.getSeconds()
		};
		return tmpl.replace(/([ymdhs])+/ig, function (match, type) {
			return value[type != 'M' ? type.toLowerCase() : type] || "";
		});
	},
	smartFormat: function smartFormat() {
		var reToday = arguments.length <= 0 || arguments[0] === undefined ? "今天 HH:mm" : arguments[0];
		var reThisYear = arguments.length <= 1 || arguments[1] === undefined ? "MM月DD日" : arguments[1];
		var reYearsAgo = arguments.length <= 2 || arguments[2] === undefined ? "YYYY年MM月DD日" : arguments[2];

		var now = new Date();
		return this.format(this.isSameDate(now) ? reToday : this.getFullYear() == now.getFullYear() ? reThisYear : reYearsAgo);
	}
});
//# sourceMappingURL=data:application/json;base64,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UyxLQUFLLE9BQUwsS0FBZSxLQUFHLEVBQUgsR0FBTSxFQUFOLEdBQVMsSUFBVCxHQUFjLElBQWQsQ0FBL0IsQ0FEaUI7RUFmVTtBQWtCNUIsMkJBQW9CO01BQWIsNkRBQUssdUJBQVE7O0FBQ25CLE1BQUksUUFBTTtBQUNULE1BQUUsS0FBSyxXQUFMLEVBQUY7QUFDQSxNQUFFLEtBQUssUUFBTCxLQUFnQixDQUFoQjtBQUNGLE1BQUUsS0FBSyxPQUFMLEVBQUY7QUFDQSxNQUFFLEtBQUssUUFBTCxFQUFGO0FBQ0EsTUFBRSxLQUFLLFVBQUwsRUFBRjtBQUNBLE1BQUUsS0FBSyxVQUFMLEVBQUY7R0FORyxDQURlO0FBU25CLFNBQU8sS0FBSyxPQUFMLENBQWEsY0FBYixFQUE2QixVQUFTLEtBQVQsRUFBZSxJQUFmLEVBQW9CO0FBQ3ZELFVBQU8sTUFBTSxRQUFNLEdBQU4sR0FBWSxLQUFLLFdBQUwsRUFBWixHQUFpQyxJQUFqQyxDQUFOLElBQWdELEVBQWhELENBRGdEO0dBQXBCLENBQXBDLENBVG1CO0VBbEJRO0FBK0I1QixxQ0FBOEU7TUFBbEUsZ0VBQVEsMEJBQTBEO01BQTlDLG1FQUFXLHdCQUFtQztNQUF6QixtRUFBVyw2QkFBYzs7QUFDN0UsTUFBSSxNQUFJLElBQUksSUFBSixFQUFKLENBRHlFO0FBRTdFLFNBQU8sS0FBSyxNQUFMLENBQVksS0FBSyxVQUFMLENBQWdCLEdBQWhCLElBQXVCLE9BQXZCLEdBQ2QsS0FBSyxXQUFMLE1BQW9CLElBQUksV0FBSixFQUFwQixHQUF3QyxVQUF4QyxHQUFxRCxVQUFyRCxDQURMLENBRjZFO0VBL0JsRDtDQUE3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxyXG5cclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuXHJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xyXG5pbXBvcnQgSWNvbkV4cGxvcmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9leHBsb3JlJ1xyXG5pbXBvcnQgSWNvbkxpZmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvcGVyc29uLXBpbi1jaXJjbGUnXHJcblxyXG5pbXBvcnQge1FpbGlBcHAsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5jb25zdCB7Q29tbWFuZEJhcn09VUlcclxuXHJcbmNsYXNzIE1haW4gZXh0ZW5kcyBRaWxpQXBwe1xyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmRlZmF1bHRQcm9wcyx7XHJcblx0XHRhcHBJZDpcIndlLXRyYXZlbFwiLFxyXG5cdFx0dGl0bGU6XCJ0cmF2ZWwgYWxvbmcgbGlmZVwiXHJcblx0fSlcclxuXHRcclxuXHRyZW5kZXJDb250ZW50KCl7XHJcblx0XHRsZXQge3BhdGhuYW1lfT10aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmxvY2F0aW9uXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBzdHlsZT17e3pJbmRleDo4fX0gXHJcblx0XHRcdFx0XHRvblNlbGVjdD17Y21kPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goY21kLnRvTG93ZXJDYXNlKCkpfVxyXG5cdFx0XHRcdFx0cHJpbWFyeT17cGF0aG5hbWU9PVwiL1wiID8gXCIvXCIgOiBwYXRobmFtZS5zcGxpdChcIi9cIilbMV19XHJcblx0XHRcdFx0XHRpdGVtcz17W1xyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwiL1wiLGljb246SWNvbkxpZmV9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwiZXhwbG9yZVwiLCBpY29uOkljb25FeHBsb3JlfSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5biQ5Y+3XCIsIGFjdGlvbjpcIm15XCIsIGljb246SWNvbkFjY291bnR9LFxyXG5cdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcclxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwicWlsaS1hcHAvbGliL3NldHRpbmdcIlxyXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCJxaWxpLWFwcC9saWIvdXNlci1wcm9maWxlXCJcclxuaW1wb3J0IExpZmVVSSBmcm9tIFwiLi9saWZlXCJcclxuaW1wb3J0IEV4cGxvcmVVSSBmcm9tIFwiLi9leHBsb3JlXCJcclxuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tIFwiLi9wdWJsaXNoXCJcclxuaW1wb3J0IEpvdXJuZXlVSSBmcm9tIFwiLi9qb3VybmV5XCJcclxuIFxyXG5NYWluLnJlbmRlcihcclxuPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtNYWlufT5cclxuXHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0xpZmVVSX0vPlxyXG5cdDxSb3V0ZSBwYXRoPVwiZXhwbG9yZVwiIGNvbXBvbmVudD17RXhwbG9yZVVJfS8+XHJcblx0PFJvdXRlIHBhdGg9XCJteVwiPlxyXG5cdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cclxuXHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XHJcblx0PC9Sb3V0ZT5cclxuXHRcclxuXHQ8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0vPlxyXG5cdFxyXG5cdDxSb3V0ZSBwYXRoPVwiam91cm5leVwiPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJfbmV3XCIgY29tcG9uZW50PXtKb3VybmV5VUkuQ3JlYXRvcn0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCI6aWRcIiBjb21wb25lbnQ9e0pvdXJuZXlVSX0vPlxyXG5cdDwvUm91dGU+XHJcbjwvUm91dGU+XHJcbilcclxuXHJcbk9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUse1xyXG5cdHRvRGF0ZSgpe1xyXG5cdFx0bGV0IGQ9bmV3IERhdGUodGhpcy5nZXRUaW1lKCkpXHJcblx0XHRkLnNldEhvdXJzKDApXHJcblx0XHRkLnNldE1pbnV0ZXMoMClcclxuXHRcdGQuc2V0U2Vjb25kcygwKVxyXG5cdFx0ZC5zZXRNaWxsaXNlY29uZHMoMClcclxuXHRcdHJldHVybiBkXHJcblx0fSxcclxuXHRpc1NhbWVEYXRlKGQpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUoZCk9PTBcclxuXHR9LFxyXG5cdHJlbGF0aXZlKGQpe1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoKHRoaXMudG9EYXRlKCkuZ2V0VGltZSgpLWQudG9EYXRlKCkuZ2V0VGltZSgpKS8oMjQqNjAqNjAqMTAwMCkpXHJcblx0fSxcclxuXHRyZWxhdGl2ZURhdGUoZGF5cyl7XHJcblx0XHRyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRUaW1lKCkrMjQqNjAqNjAqMTAwMCpkYXlzKVxyXG5cdH0sXHJcblx0Zm9ybWF0KHRtcGw9XCJ5LU0tZFwiKXtcclxuXHRcdGxldCB2YWx1ZT17XHJcblx0XHRcdHk6dGhpcy5nZXRGdWxsWWVhcigpLFxyXG5cdFx0XHRNOnRoaXMuZ2V0TW9udGgoKSsxLFxyXG5cdFx0XHRkOnRoaXMuZ2V0RGF0ZSgpLFxyXG5cdFx0XHRoOnRoaXMuZ2V0SG91cnMoKSxcclxuXHRcdFx0bTp0aGlzLmdldE1pbnV0ZXMoKSxcclxuXHRcdFx0czp0aGlzLmdldFNlY29uZHMoKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRtcGwucmVwbGFjZSgvKFt5bWRoc10pKy9pZywgZnVuY3Rpb24obWF0Y2gsdHlwZSl7XHJcblx0XHRcdHJldHVybiB2YWx1ZVt0eXBlIT0nTScgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiB0eXBlXSB8fCBcIlwiXHJcblx0XHR9KVxyXG5cdH0sXHJcblx0c21hcnRGb3JtYXQocmVUb2RheT1cIuS7iuWkqSBISDptbVwiLCByZVRoaXNZZWFyPVwiTU3mnIhEROaXpVwiLCByZVllYXJzQWdvPVwiWVlZWeW5tE1N5pyIRETml6VcIil7XHJcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRcdHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLmlzU2FtZURhdGUobm93KSA/IHJlVG9kYXkgOlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RnVsbFllYXIoKT09bm93LmdldEZ1bGxZZWFyKCkgPyByZVRoaXNZZWFyIDogcmVZZWFyc0FnbylcclxuXHR9XHJcbn0pIl19