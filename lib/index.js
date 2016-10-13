"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

var _db = require("./db");

var _photoViewer = require("./components/photo-viewer");

var _photoViewer2 = _interopRequireDefault(_photoViewer);

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
					items: [{ label: "我", action: "/", icon: _personPinCircle2.default }, { label: "发现", action: "explore", icon: _explore2.default }, { label: "帐号", action: "my", icon: _accountBox2.default }] }),
				_react2.default.createElement(_photoViewer2.default, { ref: "photoViewer" })
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var _this3 = this;

			return Object.assign(_get(Object.getPrototypeOf(Main.prototype), "getChildContext", this).call(this), {
				viewPhoto: function viewPhoto(url) {
					return _this3.refs.photoViewer.view(url);
				}
			});
		}
	}]);

	return Main;
}(_qiliApp.QiliApp);

Main.defaultProps = Object.assign(_qiliApp.QiliApp.defaultProps, {
	appId: "we-travel",
	title: "travel along life"
});
Main.childContextTypes = Object.assign(_qiliApp.QiliApp.childContextTypes, {
	viewPhoto: _react.PropTypes.func
});
Main.defaultProps = Object.assign(_qiliApp.QiliApp.defaultProps, {
	init: function init(a) {
		(0, _db.init)();
	}
});


document.addEventListener('deviceready', function () {
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
			_react2.default.createElement(_reactRouter.Route, { path: ":_id", component: _journey2.default })
		)
	));
});

Object.assign(Date.prototype, {
	toDate: function toDate() {
		var d = new Date(this.getTime());
		d.setHours(0, 0, 0, 0);
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
//# sourceMappingURL=data:application/json;base64,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LFVBQUwsQ0FBZ0IsR0FBaEIsSUFBdUIsT0FBdkIsR0FDZCxLQUFLLFdBQUwsTUFBb0IsSUFBSSxXQUFKLEVBQXBCLEdBQXdDLFVBQXhDLEdBQXFELFVBQXJELENBREwsQ0FGNkU7RUE1QmxEO0NBQTdCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXHJcblxyXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGV9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5cclxuaW1wb3J0IEljb25BY2NvdW50IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnXHJcbmltcG9ydCBJY29uRXhwbG9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2V4cGxvcmUnXHJcbmltcG9ydCBJY29uTGlmZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9wZXJzb24tcGluLWNpcmNsZSdcclxuXHJcbmltcG9ydCB7UWlsaUFwcCwgVUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7aW5pdCwgTG9jYXRpb24gYXMgTG9jYXRpb25EQn0gZnJvbSBcIi4vZGJcIlxyXG5pbXBvcnQgUGhvdG9WaWV3ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9waG90by12aWV3ZXJcIlxyXG5jb25zdCB7Q29tbWFuZEJhcn09VUlcclxuXHJcbmNsYXNzIE1haW4gZXh0ZW5kcyBRaWxpQXBwe1xyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmRlZmF1bHRQcm9wcyx7XHJcblx0XHRhcHBJZDpcIndlLXRyYXZlbFwiLFxyXG5cdFx0dGl0bGU6XCJ0cmF2ZWwgYWxvbmcgbGlmZVwiXHJcblx0fSlcclxuXHJcblx0cmVuZGVyQ29udGVudCgpe1xyXG5cdFx0bGV0IHtwYXRobmFtZX09dGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5sb2NhdGlvblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6OH19XHJcblx0XHRcdFx0XHRvblNlbGVjdD17Y21kPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goY21kLnRvTG93ZXJDYXNlKCkpfVxyXG5cdFx0XHRcdFx0cHJpbWFyeT17cGF0aG5hbWU9PVwiL1wiID8gXCIvXCIgOiBwYXRobmFtZS5zcGxpdChcIi9cIilbMV19XHJcblx0XHRcdFx0XHRpdGVtcz17W1xyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwiL1wiLGljb246SWNvbkxpZmV9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwiZXhwbG9yZVwiLCBpY29uOkljb25FeHBsb3JlfSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5biQ5Y+3XCIsIGFjdGlvbjpcIm15XCIsIGljb246SWNvbkFjY291bnR9LFxyXG5cdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdDxQaG90b1ZpZXdlciByZWY9XCJwaG90b1ZpZXdlclwiLz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKFFpbGlBcHAuY2hpbGRDb250ZXh0VHlwZXMse1xyXG5cdFx0dmlld1Bob3RvOiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfSlcclxuXHRcclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0dmlld1Bob3RvOnVybD0+dGhpcy5yZWZzLnBob3RvVmlld2VyLnZpZXcodXJsKVxyXG5cdFx0fSlcclxuXHR9IFxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5kZWZhdWx0UHJvcHMse1xyXG5cdFx0aW5pdDphPT57XHJcblx0XHRcdGluaXQoKVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcclxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwicWlsaS1hcHAvbGliL3NldHRpbmdcIlxyXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCJxaWxpLWFwcC9saWIvdXNlci1wcm9maWxlXCJcclxuaW1wb3J0IExpZmVVSSBmcm9tIFwiLi9saWZlXCJcclxuaW1wb3J0IEV4cGxvcmVVSSBmcm9tIFwiLi9leHBsb3JlXCJcclxuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tIFwiLi9wdWJsaXNoXCJcclxuaW1wb3J0IEpvdXJuZXlVSSBmcm9tIFwiLi9qb3VybmV5XCJcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgZnVuY3Rpb24oKSB7XHJcbiAgTWFpbi5yZW5kZXIoXHJcblx0PFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtNYWlufT5cclxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TGlmZVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cImV4cGxvcmVcIiBjb21wb25lbnQ9e0V4cGxvcmVVSX0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e015VUl9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfS8+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJqb3VybmV5XCI+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiX25ld1wiIGNvbXBvbmVudD17Sm91cm5leVVJLkNyZWF0b3J9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkXCIgY29tcG9uZW50PXtKb3VybmV5VUl9Lz5cclxuXHRcdDwvUm91dGU+XHJcblx0PC9Sb3V0ZT5cclxuXHQpXHJcbn0pO1xyXG5cclxuXHJcbk9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUse1xyXG5cdHRvRGF0ZSgpe1xyXG5cdFx0bGV0IGQ9bmV3IERhdGUodGhpcy5nZXRUaW1lKCkpXHJcblx0XHRkLnNldEhvdXJzKDAsMCwwLDApXHJcblx0XHRyZXR1cm4gZFxyXG5cdH0sXHJcblx0aXNTYW1lRGF0ZShkKXtcclxuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKGQpPT0wXHJcblx0fSxcclxuXHRyZWxhdGl2ZShkKXtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKCh0aGlzLnRvRGF0ZSgpLmdldFRpbWUoKS1kLnRvRGF0ZSgpLmdldFRpbWUoKSkvKDI0KjYwKjYwKjEwMDApKVxyXG5cdH0sXHJcblx0cmVsYXRpdmVEYXRlKGRheXMpe1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKzI0KjYwKjYwKjEwMDAqZGF5cylcclxuXHR9LFxyXG5cdGZvcm1hdCh0bXBsPVwieS1NLWRcIil7XHJcblx0XHRsZXQgdmFsdWU9e1xyXG5cdFx0XHR5OnRoaXMuZ2V0RnVsbFllYXIoKSxcclxuXHRcdFx0TTp0aGlzLmdldE1vbnRoKCkrMSxcclxuXHRcdFx0ZDp0aGlzLmdldERhdGUoKSxcclxuXHRcdFx0aDp0aGlzLmdldEhvdXJzKCksXHJcblx0XHRcdG06dGhpcy5nZXRNaW51dGVzKCksXHJcblx0XHRcdHM6dGhpcy5nZXRTZWNvbmRzKClcclxuXHRcdH1cclxuXHRcdHJldHVybiB0bXBsLnJlcGxhY2UoLyhbeW1kaHNdKSsvaWcsIGZ1bmN0aW9uKG1hdGNoLHR5cGUpe1xyXG5cdFx0XHRyZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxyXG5cdFx0fSlcclxuXHR9LFxyXG5cdHNtYXJ0Rm9ybWF0KHJlVG9kYXk9XCLku4rlpKkgSEg6bW1cIiwgcmVUaGlzWWVhcj1cIk1N5pyIRETml6VcIiwgcmVZZWFyc0Fnbz1cIllZWVnlubRNTeaciERE5pelXCIpe1xyXG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5pc1NhbWVEYXRlKG5vdykgPyByZVRvZGF5IDpcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gcmVUaGlzWWVhciA6IHJlWWVhcnNBZ28pXHJcblx0fVxyXG59KVxyXG4iXX0=