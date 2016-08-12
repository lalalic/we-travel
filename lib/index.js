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
	_react2.default.createElement(_reactRouter.Route, { path: "publish", component: _publish2.default })
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
//# sourceMappingURL=data:application/json;base64,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QUwsRUFBRjtBQUNBLE1BQUUsS0FBSyxVQUFMLEVBQUY7R0FORyxDQURlO0FBU25CLFNBQU8sS0FBSyxPQUFMLENBQWEsY0FBYixFQUE2QixVQUFTLEtBQVQsRUFBZSxJQUFmLEVBQW9CO0FBQ3ZELFVBQU8sTUFBTSxRQUFNLEdBQU4sR0FBWSxLQUFLLFdBQUwsRUFBWixHQUFpQyxJQUFqQyxDQUFOLElBQWdELEVBQWhELENBRGdEO0dBQXBCLENBQXBDLENBVG1CO0VBaEJRO0FBNkI1QixxQ0FBOEU7TUFBbEUsZ0VBQVEsMEJBQTBEO01BQTlDLG1FQUFXLHdCQUFtQztNQUF6QixtRUFBVyw2QkFBYzs7QUFDN0UsTUFBSSxNQUFJLElBQUksSUFBSixFQUFKLENBRHlFO0FBRTdFLFNBQU8sS0FBSyxNQUFMLENBQVksS0FBSyxVQUFMLENBQWdCLEdBQWhCLElBQXVCLE9BQXZCLEdBQ2QsS0FBSyxXQUFMLE1BQW9CLElBQUksV0FBSixFQUFwQixHQUF3QyxVQUF4QyxHQUFxRCxVQUFyRCxDQURMLENBRjZFO0VBN0JsRDtDQUE3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxyXG5cclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuXHJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xyXG5pbXBvcnQgSWNvbkV4cGxvcmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9leHBsb3JlJ1xyXG5pbXBvcnQgSWNvbkxpZmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvcGVyc29uLXBpbi1jaXJjbGUnXHJcblxyXG5pbXBvcnQge1FpbGlBcHAsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5jb25zdCB7Q29tbWFuZEJhcn09VUlcclxuXHJcbmNsYXNzIE1haW4gZXh0ZW5kcyBRaWxpQXBwe1xyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmRlZmF1bHRQcm9wcyx7XHJcblx0XHRhcHBJZDpcIndlLXRyYXZlbFwiLFxyXG5cdFx0dGl0bGU6XCJ0cmF2ZWwgYWxvbmcgbGlmZVwiXHJcblx0fSlcclxuXHRcclxuXHRyZW5kZXJDb250ZW50KCl7XHJcblx0XHRsZXQge3BhdGhuYW1lfT10aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmxvY2F0aW9uXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBzdHlsZT17e3pJbmRleDo4fX0gXHJcblx0XHRcdFx0XHRvblNlbGVjdD17Y21kPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goY21kLnRvTG93ZXJDYXNlKCkpfVxyXG5cdFx0XHRcdFx0cHJpbWFyeT17cGF0aG5hbWU9PVwiL1wiID8gXCIvXCIgOiBwYXRobmFtZS5zcGxpdChcIi9cIilbMV19XHJcblx0XHRcdFx0XHRpdGVtcz17W1xyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwiL1wiLGljb246SWNvbkxpZmV9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwiZXhwbG9yZVwiLCBpY29uOkljb25FeHBsb3JlfSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5biQ5Y+3XCIsIGFjdGlvbjpcIm15XCIsIGljb246SWNvbkFjY291bnR9LFxyXG5cdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuXHJcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcclxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwicWlsaS1hcHAvbGliL3NldHRpbmdcIlxyXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCJxaWxpLWFwcC9saWIvdXNlci1wcm9maWxlXCJcclxuaW1wb3J0IExpZmVVSSBmcm9tIFwiLi9saWZlXCJcclxuaW1wb3J0IEV4cGxvcmVVSSBmcm9tIFwiLi9leHBsb3JlXCJcclxuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tIFwiLi9wdWJsaXNoXCJcclxuIFxyXG5NYWluLnJlbmRlcihcclxuPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtNYWlufT5cclxuXHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0xpZmVVSX0vPlxyXG5cdDxSb3V0ZSBwYXRoPVwiZXhwbG9yZVwiIGNvbXBvbmVudD17RXhwbG9yZVVJfS8+XHJcblx0PFJvdXRlIHBhdGg9XCJteVwiPlxyXG5cdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cclxuXHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XHJcblx0PC9Sb3V0ZT5cclxuXHRcclxuXHQ8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0vPlxyXG48L1JvdXRlPlxyXG4pXHJcblxyXG5PYmplY3QuYXNzaWduKERhdGUucHJvdG90eXBlLHtcclxuXHR0b0RhdGUoKXtcclxuXHRcdGxldCBkPW5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKVxyXG5cdFx0ZC5zZXRIb3VycygwKVxyXG5cdFx0ZC5zZXRNaW51dGVzKDApXHJcblx0XHRkLnNldFNlY29uZHMoMClcclxuXHRcdGQuc2V0TWlsbGlzZWNvbmRzKDApXHJcblx0XHRyZXR1cm4gZFxyXG5cdH0sXHJcblx0aXNTYW1lRGF0ZShkKXtcclxuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKGQpPT0wXHJcblx0fSxcclxuXHRyZWxhdGl2ZShkKXtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKCh0aGlzLnRvRGF0ZSgpLmdldFRpbWUoKS1kLnRvRGF0ZSgpLmdldFRpbWUoKSkvKDI0KjYwKjYwKjEwMDApKVxyXG5cdH0sXHJcblx0XHJcblx0Zm9ybWF0KHRtcGw9XCJ5LU0tZFwiKXtcclxuXHRcdGxldCB2YWx1ZT17XHJcblx0XHRcdHk6dGhpcy5nZXRGdWxsWWVhcigpLFxyXG5cdFx0XHRNOnRoaXMuZ2V0TW9udGgoKSsxLFxyXG5cdFx0XHRkOnRoaXMuZ2V0RGF0ZSgpLFxyXG5cdFx0XHRoOnRoaXMuZ2V0SG91cnMoKSxcclxuXHRcdFx0bTp0aGlzLmdldE1pbnV0ZXMoKSxcclxuXHRcdFx0czp0aGlzLmdldFNlY29uZHMoKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRtcGwucmVwbGFjZSgvKFt5bWRoc10pKy9pZywgZnVuY3Rpb24obWF0Y2gsdHlwZSl7XHJcblx0XHRcdHJldHVybiB2YWx1ZVt0eXBlIT0nTScgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiB0eXBlXSB8fCBcIlwiXHJcblx0XHR9KVxyXG5cdH0sXHJcblx0c21hcnRGb3JtYXQocmVUb2RheT1cIuS7iuWkqSBISDptbVwiLCByZVRoaXNZZWFyPVwiTU3mnIhEROaXpVwiLCByZVllYXJzQWdvPVwiWVlZWeW5tE1N5pyIRETml6VcIil7XHJcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRcdHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLmlzU2FtZURhdGUobm93KSA/IHJlVG9kYXkgOlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RnVsbFllYXIoKT09bm93LmdldEZ1bGxZZWFyKCkgPyByZVRoaXNZZWFyIDogcmVZZWFyc0FnbylcclxuXHR9XHJcbn0pIl19