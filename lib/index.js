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

var _itidetail = require("./itidetail");

var _itidetail2 = _interopRequireDefault(_itidetail);

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
					_react2.default.createElement(_reactRouter.IndexRoute, { component: _itinerary2.default }),
					_react2.default.createElement(_reactRouter.Route, { path: ":_id2", component: _itidetail2.default })
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
//# sourceMappingURL=data:application/json;base64,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ZSxJQUFmLEVBQW9CO0FBQ3ZELFVBQU8sTUFBTSxRQUFNLEdBQU4sR0FBWSxLQUFLLFdBQUwsRUFBWixHQUFpQyxJQUFqQyxDQUFOLElBQWdELEVBQWhELENBRGdEO0dBQXBCLENBQXBDLENBVG1CO0VBbEJRO0FBK0I1QixxQ0FBOEU7TUFBbEUsZ0VBQVEsMEJBQTBEO01BQTlDLG1FQUFXLHdCQUFtQztNQUF6QixtRUFBVyw2QkFBYzs7QUFDN0UsTUFBSSxNQUFJLElBQUksSUFBSixFQUFKLENBRHlFO0FBRTdFLFNBQU8sS0FBSyxNQUFMLENBQVksS0FBSyxVQUFMLENBQWdCLEdBQWhCLElBQXVCLE9BQXZCLEdBQ2QsS0FBSyxXQUFMLE1BQW9CLElBQUksV0FBSixFQUFwQixHQUF3QyxVQUF4QyxHQUFxRCxVQUFyRCxDQURMLENBRjZFO0VBL0JsRDtDQUE3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxyXG5cclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuXHJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xyXG5pbXBvcnQgSWNvbkV4cGxvcmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9leHBsb3JlJ1xyXG5pbXBvcnQgSWNvbkxpZmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvcGVyc29uLXBpbi1jaXJjbGUnXHJcblxyXG5pbXBvcnQge1FpbGlBcHAsIFVJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge2luaXQsIExvY2F0aW9uIGFzIExvY2F0aW9uREJ9IGZyb20gXCIuL2RiXCJcclxuaW1wb3J0IFBob3RvVmlld2VyIGZyb20gXCIuL2NvbXBvbmVudHMvcGhvdG8tdmlld2VyXCJcclxuY29uc3Qge0NvbW1hbmRCYXIsIENvbW1lbnR9PVVJXHJcblxyXG5jbGFzcyBNYWluIGV4dGVuZHMgUWlsaUFwcHtcclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5kZWZhdWx0UHJvcHMse1xyXG5cdFx0YXBwSWQ6XCJ3ZS10cmF2ZWxcIixcclxuXHRcdHRpdGxlOlwidHJhdmVsIGFsb25nIGxpZmVcIlxyXG5cdH0pXHJcblxyXG5cdHJlbmRlckNvbnRlbnQoKXtcclxuXHRcdGxldCB7cGF0aG5hbWV9PXRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMubG9jYXRpb25cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7ekluZGV4Ojh9fVxyXG5cdFx0XHRcdFx0b25TZWxlY3Q9e2NtZD0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGNtZC50b0xvd2VyQ2FzZSgpKX1cclxuXHRcdFx0XHRcdHByaW1hcnk9e3BhdGhuYW1lPT1cIi9cIiA/IFwiL1wiIDogcGF0aG5hbWUuc3BsaXQoXCIvXCIpWzFdfVxyXG5cdFx0XHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIi9cIixpY29uOkljb25MaWZlfSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImV4cGxvcmVcIiwgaWNvbjpJY29uRXhwbG9yZX0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuW4kOWPt1wiLCBhY3Rpb246XCJteVwiLCBpY29uOkljb25BY2NvdW50fSxcclxuXHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8UGhvdG9WaWV3ZXIgcmVmPVwicGhvdG9WaWV3ZXJcIi8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmNoaWxkQ29udGV4dFR5cGVzLHtcclxuXHRcdHZpZXdQaG90bzogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH0pXHJcblx0XHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcblx0XHRcdHZpZXdQaG90bzp1cmw9PnRoaXMucmVmcy5waG90b1ZpZXdlci52aWV3KHVybClcclxuXHRcdH0pXHJcblx0fSBcclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKFFpbGlBcHAuZGVmYXVsdFByb3BzLHtcclxuXHRcdGluaXQ6YT0+e1xyXG5cdFx0XHRpbml0KClcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXHJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcInFpbGktYXBwL2xpYi9zZXR0aW5nXCJcclxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwicWlsaS1hcHAvbGliL3VzZXItcHJvZmlsZVwiXHJcbmltcG9ydCBMaWZlVUkgZnJvbSBcIi4vbGlmZVwiXHJcbmltcG9ydCBFeHBsb3JlVUkgZnJvbSBcIi4vZXhwbG9yZVwiXHJcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSBcIi4vcHVibGlzaFwiXHJcbmltcG9ydCBKb3VybmV5VUkgZnJvbSBcIi4vam91cm5leVwiXHJcbmltcG9ydCBJdGluZXJhcnlVSSBmcm9tIFwiLi9pdGluZXJhcnlcIlxyXG5pbXBvcnQgSXRpRGV0YWlsVUkgZnJvbSBcIi4vaXRpZGV0YWlsXCJcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgZnVuY3Rpb24oKSB7XHJcbiAgTWFpbi5yZW5kZXIoXHJcblx0PFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtNYWlufT5cclxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TGlmZVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cImV4cGxvcmVcIiBjb21wb25lbnQ9e0V4cGxvcmVVSX0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e015VUl9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfS8+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJqb3VybmV5XCI+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiX25ld1wiIGNvbXBvbmVudD17Sm91cm5leVVJLkNyZWF0b3J9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkXCI+XHJcblx0XHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtKb3VybmV5VUl9Lz5cclxuXHRcdFx0XHQ8Um91dGUgcGF0aD1cIml0aW5lcmFyeVwiPlxyXG5cdFx0XHRcdFx0PEluZGV4Um91dGUgIGNvbXBvbmVudD17SXRpbmVyYXJ5VUl9Lz5cclxuXHRcdFx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZDJcIiBjb21wb25lbnQ9e0l0aURldGFpbFVJfS8+XHJcblx0XHRcdFx0PC9Sb3V0ZT5cclxuXHRcdFx0PC9Sb3V0ZT5cclxuXHRcdDwvUm91dGU+XHJcblx0XHRcclxuXHRcdDxSb3V0ZSBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkXCIgY29tcG9uZW50PXtDb21tZW50fS8+XHJcblx0PC9Sb3V0ZT5cclxuXHQpXHJcbn0pO1xyXG5cclxuXHJcbk9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUse1xyXG5cdHRvRGF0ZSgpe1xyXG5cdFx0bGV0IGQ9bmV3IERhdGUodGhpcy5nZXRUaW1lKCkpXHJcblx0XHRkLnNldEhvdXJzKDAsMCwwLDApXHJcblx0XHRyZXR1cm4gZFxyXG5cdH0sXHJcblx0aXNTYW1lRGF0ZShkKXtcclxuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKGQpPT0wXHJcblx0fSxcclxuXHRyZWxhdGl2ZShkKXtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKCh0aGlzLnRvRGF0ZSgpLmdldFRpbWUoKS1kLnRvRGF0ZSgpLmdldFRpbWUoKSkvKDI0KjYwKjYwKjEwMDApKVxyXG5cdH0sXHJcblx0cmVsYXRpdmVEYXRlKGRheXMpe1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKzI0KjYwKjYwKjEwMDAqZGF5cylcclxuXHR9LFxyXG5cdGlzRnV0dXJlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShuZXcgRGF0ZSgpKT4wXHJcblx0fSxcclxuXHRmb3JtYXQodG1wbD1cInktTS1kXCIpe1xyXG5cdFx0bGV0IHZhbHVlPXtcclxuXHRcdFx0eTp0aGlzLmdldEZ1bGxZZWFyKCksXHJcblx0XHRcdE06dGhpcy5nZXRNb250aCgpKzEsXHJcblx0XHRcdGQ6dGhpcy5nZXREYXRlKCksXHJcblx0XHRcdGg6dGhpcy5nZXRIb3VycygpLFxyXG5cdFx0XHRtOnRoaXMuZ2V0TWludXRlcygpLFxyXG5cdFx0XHRzOnRoaXMuZ2V0U2Vjb25kcygpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcclxuXHRcdFx0cmV0dXJuIHZhbHVlW3R5cGUhPSdNJyA/IHR5cGUudG9Mb3dlckNhc2UoKSA6IHR5cGVdIHx8IFwiXCJcclxuXHRcdH0pXHJcblx0fSxcclxuXHRzbWFydEZvcm1hdChyZVRvZGF5PVwi5LuK5aSpIEhIOm1tXCIsIHJlVGhpc1llYXI9XCJNTeaciERE5pelXCIsIHJlWWVhcnNBZ289XCJZWVlZ5bm0TU3mnIhEROaXpVwiKXtcclxuXHRcdGxldCBub3c9bmV3IERhdGUoKVxyXG5cdFx0cmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMuaXNTYW1lRGF0ZShub3cpID8gcmVUb2RheSA6XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGdWxsWWVhcigpPT1ub3cuZ2V0RnVsbFllYXIoKSA/IHJlVGhpc1llYXIgOiByZVllYXJzQWdvKVxyXG5cdH1cclxufSlcclxuIl19