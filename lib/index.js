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

var _itinerary = require("./itinerary");

var _itinerary2 = _interopRequireDefault(_itinerary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var CommandBar = _qiliApp.UI.CommandBar;
var Comment = _qiliApp.UI.Comment;

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
			_react2.default.createElement(
				_reactRouter.Route,
				{ path: ":_id" },
				_react2.default.createElement(_reactRouter.IndexRoute, { component: _journey2.default }),
				_react2.default.createElement(
					_reactRouter.Route,
					{ path: "itinerary" },
					_react2.default.createElement(_reactRouter.IndexRoute, { component: _itinerary2.default })
				)
			)
		),
		_react2.default.createElement(_reactRouter.Route, { path: "comment/:type/:_id", component: Comment })
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
	isFuture: function isFuture() {
		return this.relative(new Date()) > 0;
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
//# sourceMappingURL=data:application/json;base64,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QUssV0FBTCxFQUFaLEdBQWlDLElBQWpDLENBQU4sSUFBZ0QsRUFBaEQsQ0FEZ0Q7R0FBcEIsQ0FBcEMsQ0FUbUI7RUFsQlE7QUErQjVCLHFDQUE4RTtNQUFsRSxnRUFBUSwwQkFBMEQ7TUFBOUMsbUVBQVcsd0JBQW1DO01BQXpCLG1FQUFXLDZCQUFjOztBQUM3RSxNQUFJLE1BQUksSUFBSSxJQUFKLEVBQUosQ0FEeUU7QUFFN0UsU0FBTyxLQUFLLE1BQUwsQ0FBWSxLQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsSUFBdUIsT0FBdkIsR0FDZCxLQUFLLFdBQUwsTUFBb0IsSUFBSSxXQUFKLEVBQXBCLEdBQXdDLFVBQXhDLEdBQXFELFVBQXJELENBREwsQ0FGNkU7RUEvQmxEO0NBQTdCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXHJcblxyXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGV9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5cclxuaW1wb3J0IEljb25BY2NvdW50IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnXHJcbmltcG9ydCBJY29uRXhwbG9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2V4cGxvcmUnXHJcbmltcG9ydCBJY29uTGlmZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9wZXJzb24tcGluLWNpcmNsZSdcclxuXHJcbmltcG9ydCB7UWlsaUFwcCwgVUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7aW5pdCwgTG9jYXRpb24gYXMgTG9jYXRpb25EQn0gZnJvbSBcIi4vZGJcIlxyXG5pbXBvcnQgUGhvdG9WaWV3ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9waG90by12aWV3ZXJcIlxyXG5jb25zdCB7Q29tbWFuZEJhciwgQ29tbWVudH09VUlcclxuXHJcbmNsYXNzIE1haW4gZXh0ZW5kcyBRaWxpQXBwe1xyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmRlZmF1bHRQcm9wcyx7XHJcblx0XHRhcHBJZDpcIndlLXRyYXZlbFwiLFxyXG5cdFx0dGl0bGU6XCJ0cmF2ZWwgYWxvbmcgbGlmZVwiXHJcblx0fSlcclxuXHJcblx0cmVuZGVyQ29udGVudCgpe1xyXG5cdFx0bGV0IHtwYXRobmFtZX09dGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5sb2NhdGlvblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6OH19XHJcblx0XHRcdFx0XHRvblNlbGVjdD17Y21kPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goY21kLnRvTG93ZXJDYXNlKCkpfVxyXG5cdFx0XHRcdFx0cHJpbWFyeT17cGF0aG5hbWU9PVwiL1wiID8gXCIvXCIgOiBwYXRobmFtZS5zcGxpdChcIi9cIilbMV19XHJcblx0XHRcdFx0XHRpdGVtcz17W1xyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwiL1wiLGljb246SWNvbkxpZmV9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwiZXhwbG9yZVwiLCBpY29uOkljb25FeHBsb3JlfSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5biQ5Y+3XCIsIGFjdGlvbjpcIm15XCIsIGljb246SWNvbkFjY291bnR9LFxyXG5cdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdDxQaG90b1ZpZXdlciByZWY9XCJwaG90b1ZpZXdlclwiLz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKFFpbGlBcHAuY2hpbGRDb250ZXh0VHlwZXMse1xyXG5cdFx0dmlld1Bob3RvOiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfSlcclxuXHRcclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0dmlld1Bob3RvOnVybD0+dGhpcy5yZWZzLnBob3RvVmlld2VyLnZpZXcodXJsKVxyXG5cdFx0fSlcclxuXHR9IFxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5kZWZhdWx0UHJvcHMse1xyXG5cdFx0aW5pdDphPT57XHJcblx0XHRcdGluaXQoKVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcclxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwicWlsaS1hcHAvbGliL3NldHRpbmdcIlxyXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCJxaWxpLWFwcC9saWIvdXNlci1wcm9maWxlXCJcclxuaW1wb3J0IExpZmVVSSBmcm9tIFwiLi9saWZlXCJcclxuaW1wb3J0IEV4cGxvcmVVSSBmcm9tIFwiLi9leHBsb3JlXCJcclxuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tIFwiLi9wdWJsaXNoXCJcclxuaW1wb3J0IEpvdXJuZXlVSSBmcm9tIFwiLi9qb3VybmV5XCJcclxuaW1wb3J0IEl0aW5lcmFyeVVJIGZyb20gXCIuL2l0aW5lcmFyeVwiXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsIGZ1bmN0aW9uKCkge1xyXG4gIE1haW4ucmVuZGVyKFxyXG5cdDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17TWFpbn0+XHJcblx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0xpZmVVSX0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJleHBsb3JlXCIgY29tcG9uZW50PXtFeHBsb3JlVUl9Lz5cclxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIj5cclxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0vPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0vPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwiam91cm5leVwiPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cIl9uZXdcIiBjb21wb25lbnQ9e0pvdXJuZXlVSS5DcmVhdG9yfS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZFwiPlxyXG5cdFx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Sm91cm5leVVJfS8+XHJcblx0XHRcdFx0PFJvdXRlIHBhdGg9XCJpdGluZXJhcnlcIj5cclxuXHRcdFx0XHRcdDxJbmRleFJvdXRlICBjb21wb25lbnQ9e0l0aW5lcmFyeVVJfS8+XHJcblx0XHRcdFx0PC9Sb3V0ZT5cclxuXHRcdFx0PC9Sb3V0ZT5cclxuXHRcdDwvUm91dGU+XHJcblx0XHRcclxuXHRcdDxSb3V0ZSBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkXCIgY29tcG9uZW50PXtDb21tZW50fS8+XHJcblx0PC9Sb3V0ZT5cclxuXHQpXHJcbn0pO1xyXG5cclxuXHJcbk9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUse1xyXG5cdHRvRGF0ZSgpe1xyXG5cdFx0bGV0IGQ9bmV3IERhdGUodGhpcy5nZXRUaW1lKCkpXHJcblx0XHRkLnNldEhvdXJzKDAsMCwwLDApXHJcblx0XHRyZXR1cm4gZFxyXG5cdH0sXHJcblx0aXNTYW1lRGF0ZShkKXtcclxuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKGQpPT0wXHJcblx0fSxcclxuXHRyZWxhdGl2ZShkKXtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKCh0aGlzLnRvRGF0ZSgpLmdldFRpbWUoKS1kLnRvRGF0ZSgpLmdldFRpbWUoKSkvKDI0KjYwKjYwKjEwMDApKVxyXG5cdH0sXHJcblx0cmVsYXRpdmVEYXRlKGRheXMpe1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKzI0KjYwKjYwKjEwMDAqZGF5cylcclxuXHR9LFxyXG5cdGlzRnV0dXJlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShuZXcgRGF0ZSgpKT4wXHJcblx0fSxcclxuXHRmb3JtYXQodG1wbD1cInktTS1kXCIpe1xyXG5cdFx0bGV0IHZhbHVlPXtcclxuXHRcdFx0eTp0aGlzLmdldEZ1bGxZZWFyKCksXHJcblx0XHRcdE06dGhpcy5nZXRNb250aCgpKzEsXHJcblx0XHRcdGQ6dGhpcy5nZXREYXRlKCksXHJcblx0XHRcdGg6dGhpcy5nZXRIb3VycygpLFxyXG5cdFx0XHRtOnRoaXMuZ2V0TWludXRlcygpLFxyXG5cdFx0XHRzOnRoaXMuZ2V0U2Vjb25kcygpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcclxuXHRcdFx0cmV0dXJuIHZhbHVlW3R5cGUhPSdNJyA/IHR5cGUudG9Mb3dlckNhc2UoKSA6IHR5cGVdIHx8IFwiXCJcclxuXHRcdH0pXHJcblx0fSxcclxuXHRzbWFydEZvcm1hdChyZVRvZGF5PVwi5LuK5aSpIEhIOm1tXCIsIHJlVGhpc1llYXI9XCJNTeaciERE5pelXCIsIHJlWWVhcnNBZ289XCJZWVlZ5bm0TU3mnIhEROaXpVwiKXtcclxuXHRcdGxldCBub3c9bmV3IERhdGUoKVxyXG5cdFx0cmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMuaXNTYW1lRGF0ZShub3cpID8gcmVUb2RheSA6XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGdWxsWWVhcigpPT1ub3cuZ2V0RnVsbFllYXIoKSA/IHJlVGhpc1llYXIgOiByZVllYXJzQWdvKVxyXG5cdH1cclxufSlcclxuIl19