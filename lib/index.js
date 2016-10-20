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

		return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
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

			return Object.assign(_get(Main.prototype.__proto__ || Object.getPrototypeOf(Main.prototype), "getChildContext", this).call(this), {
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
		_db.Waypoint.upload();
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
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: "publish", component: _publish2.default },
			_react2.default.createElement(_reactRouter.IndexRoute, null),
			_react2.default.createElement(_reactRouter.Route, { path: "journey/:_id" })
		),
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
		var tmpl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "y-M-d";

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
		var reToday = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "今天 HH:mm";
		var reThisYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "MM月DD日";
		var reYearsAgo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "YYYY年MM月DD日";

		var now = new Date();
		return this.format(this.isSameDate(now) ? reToday : this.getFullYear() == now.getFullYear() ? reThisYear : reYearsAgo);
	}
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiQ29tbWFuZEJhciIsIkNvbW1lbnQiLCJNYWluIiwicGF0aG5hbWUiLCJwcm9wcyIsImNoaWxkcmVuIiwibG9jYXRpb24iLCJ6SW5kZXgiLCJjb250ZXh0Iiwicm91dGVyIiwicHVzaCIsImNtZCIsInRvTG93ZXJDYXNlIiwic3BsaXQiLCJsYWJlbCIsImFjdGlvbiIsImljb24iLCJPYmplY3QiLCJhc3NpZ24iLCJ2aWV3UGhvdG8iLCJyZWZzIiwicGhvdG9WaWV3ZXIiLCJ2aWV3IiwidXJsIiwiZGVmYXVsdFByb3BzIiwiYXBwSWQiLCJ0aXRsZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiZnVuYyIsImluaXQiLCJ1cGxvYWQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJDcmVhdG9yIiwiRGF0ZSIsInByb3RvdHlwZSIsInRvRGF0ZSIsImQiLCJnZXRUaW1lIiwic2V0SG91cnMiLCJpc1NhbWVEYXRlIiwicmVsYXRpdmUiLCJNYXRoIiwiZmxvb3IiLCJyZWxhdGl2ZURhdGUiLCJkYXlzIiwiaXNGdXR1cmUiLCJmb3JtYXQiLCJ0bXBsIiwidmFsdWUiLCJ5IiwiZ2V0RnVsbFllYXIiLCJNIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJzIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaCIsInR5cGUiLCJzbWFydEZvcm1hdCIsInJlVG9kYXkiLCJyZVRoaXNZZWFyIiwicmVZZWFyc0FnbyIsIm5vdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQTZDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQWhFQUEsUUFBUSxx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RUFKTztBQUtUQyxNQUFFLEtBQUtDLFVBQUwsRUFMTztBQU1UQyxNQUFFLEtBQUtDLFVBQUw7QUFOTyxHQUFWO0FBUUEsU0FBT1osS0FBS2EsT0FBTCxDQUFhLGNBQWIsRUFBNkIsVUFBU0MsS0FBVCxFQUFlQyxJQUFmLEVBQW9CO0FBQ3ZELFVBQU9kLE1BQU1jLFFBQU0sR0FBTixHQUFZQSxLQUFLcEQsV0FBTCxFQUFaLEdBQWlDb0QsSUFBdkMsS0FBZ0QsRUFBdkQ7QUFDQSxHQUZNLENBQVA7QUFHQSxFQTlCMkI7QUErQjVCQyxZQS9CNEIseUJBK0JrRDtBQUFBLE1BQWxFQyxPQUFrRSx1RUFBMUQsVUFBMEQ7QUFBQSxNQUE5Q0MsVUFBOEMsdUVBQW5DLFFBQW1DO0FBQUEsTUFBekJDLFVBQXlCLHVFQUFkLGFBQWM7O0FBQzdFLE1BQUlDLE1BQUksSUFBSWxDLElBQUosRUFBUjtBQUNBLFNBQU8sS0FBS2EsTUFBTCxDQUFZLEtBQUtQLFVBQUwsQ0FBZ0I0QixHQUFoQixJQUF1QkgsT0FBdkIsR0FDZCxLQUFLZCxXQUFMLE1BQW9CaUIsSUFBSWpCLFdBQUosRUFBcEIsR0FBd0NlLFVBQXhDLEdBQXFEQyxVQURuRCxDQUFQO0FBRUE7QUFuQzJCLENBQTdCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXHJcblxyXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGV9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5cclxuaW1wb3J0IEljb25BY2NvdW50IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnXHJcbmltcG9ydCBJY29uRXhwbG9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2V4cGxvcmUnXHJcbmltcG9ydCBJY29uTGlmZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9wZXJzb24tcGluLWNpcmNsZSdcclxuXHJcbmltcG9ydCB7UWlsaUFwcCwgVUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7aW5pdCwgV2F5cG9pbnQgYXMgV2F5cG9pbnREQn0gZnJvbSBcIi4vZGJcIlxyXG5pbXBvcnQgUGhvdG9WaWV3ZXIgZnJvbSBcIi4vY29tcG9uZW50cy9waG90by12aWV3ZXJcIlxyXG5jb25zdCB7Q29tbWFuZEJhciwgQ29tbWVudH09VUlcclxuXHJcbmNsYXNzIE1haW4gZXh0ZW5kcyBRaWxpQXBwe1xyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmRlZmF1bHRQcm9wcyx7XHJcblx0XHRhcHBJZDpcIndlLXRyYXZlbFwiLFxyXG5cdFx0dGl0bGU6XCJ0cmF2ZWwgYWxvbmcgbGlmZVwiXHJcblx0fSlcclxuXHJcblx0cmVuZGVyQ29udGVudCgpe1xyXG5cdFx0bGV0IHtwYXRobmFtZX09dGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5sb2NhdGlvblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6OH19XHJcblx0XHRcdFx0XHRvblNlbGVjdD17Y21kPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goY21kLnRvTG93ZXJDYXNlKCkpfVxyXG5cdFx0XHRcdFx0cHJpbWFyeT17cGF0aG5hbWU9PVwiL1wiID8gXCIvXCIgOiBwYXRobmFtZS5zcGxpdChcIi9cIilbMV19XHJcblx0XHRcdFx0XHRpdGVtcz17W1xyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwiL1wiLGljb246SWNvbkxpZmV9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwiZXhwbG9yZVwiLCBpY29uOkljb25FeHBsb3JlfSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5biQ5Y+3XCIsIGFjdGlvbjpcIm15XCIsIGljb246SWNvbkFjY291bnR9LFxyXG5cdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdDxQaG90b1ZpZXdlciByZWY9XCJwaG90b1ZpZXdlclwiLz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmNoaWxkQ29udGV4dFR5cGVzLHtcclxuXHRcdHZpZXdQaG90bzogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH0pXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHR2aWV3UGhvdG86dXJsPT50aGlzLnJlZnMucGhvdG9WaWV3ZXIudmlldyh1cmwpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKFFpbGlBcHAuZGVmYXVsdFByb3BzLHtcclxuXHRcdGluaXQ6YT0+e1xyXG5cdFx0XHRpbml0KCk7XHJcblx0XHRcdFdheXBvaW50REIudXBsb2FkKClcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXHJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcInFpbGktYXBwL2xpYi9zZXR0aW5nXCJcclxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwicWlsaS1hcHAvbGliL3VzZXItcHJvZmlsZVwiXHJcbmltcG9ydCBMaWZlVUkgZnJvbSBcIi4vbGlmZVwiXHJcbmltcG9ydCBFeHBsb3JlVUkgZnJvbSBcIi4vZXhwbG9yZVwiXHJcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSBcIi4vcHVibGlzaFwiXHJcbmltcG9ydCBKb3VybmV5VUkgZnJvbSBcIi4vam91cm5leVwiXHJcbmltcG9ydCBJdGluZXJhcnlVSSBmcm9tIFwiLi9pdGluZXJhcnlcIlxyXG5pbXBvcnQgSXRpRGV0YWlsVUkgZnJvbSBcIi4vaXRpZGV0YWlsXCJcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgZnVuY3Rpb24oKSB7XHJcbiAgTWFpbi5yZW5kZXIoXHJcblx0PFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtNYWlufT5cclxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TGlmZVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cImV4cGxvcmVcIiBjb21wb25lbnQ9e0V4cGxvcmVVSX0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e015VUl9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cclxuXHRcdFx0PEluZGV4Um91dGUvPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImpvdXJuZXkvOl9pZFwiLz5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJqb3VybmV5XCI+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiX25ld1wiIGNvbXBvbmVudD17Sm91cm5leVVJLkNyZWF0b3J9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkXCI+XHJcblx0XHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtKb3VybmV5VUl9Lz5cclxuXHRcdFx0XHQ8Um91dGUgcGF0aD1cIml0aW5lcmFyeVwiPlxyXG5cdFx0XHRcdFx0PEluZGV4Um91dGUgIGNvbXBvbmVudD17SXRpbmVyYXJ5VUl9Lz5cclxuXHRcdFx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZDJcIiBjb21wb25lbnQ9e0l0aURldGFpbFVJfS8+XHJcblx0XHRcdFx0PC9Sb3V0ZT5cclxuXHRcdFx0PC9Sb3V0ZT5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0NvbW1lbnR9Lz5cclxuXHQ8L1JvdXRlPlxyXG5cdClcclxufSk7XHJcblxyXG5cclxuT2JqZWN0LmFzc2lnbihEYXRlLnByb3RvdHlwZSx7XHJcblx0dG9EYXRlKCl7XHJcblx0XHRsZXQgZD1uZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSlcclxuXHRcdGQuc2V0SG91cnMoMCwwLDAsMClcclxuXHRcdHJldHVybiBkXHJcblx0fSxcclxuXHRpc1NhbWVEYXRlKGQpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUoZCk9PTBcclxuXHR9LFxyXG5cdHJlbGF0aXZlKGQpe1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoKHRoaXMudG9EYXRlKCkuZ2V0VGltZSgpLWQudG9EYXRlKCkuZ2V0VGltZSgpKS8oMjQqNjAqNjAqMTAwMCkpXHJcblx0fSxcclxuXHRyZWxhdGl2ZURhdGUoZGF5cyl7XHJcblx0XHRyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRUaW1lKCkrMjQqNjAqNjAqMTAwMCpkYXlzKVxyXG5cdH0sXHJcblx0aXNGdXR1cmUoKXtcclxuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKG5ldyBEYXRlKCkpPjBcclxuXHR9LFxyXG5cdGZvcm1hdCh0bXBsPVwieS1NLWRcIil7XHJcblx0XHRsZXQgdmFsdWU9e1xyXG5cdFx0XHR5OnRoaXMuZ2V0RnVsbFllYXIoKSxcclxuXHRcdFx0TTp0aGlzLmdldE1vbnRoKCkrMSxcclxuXHRcdFx0ZDp0aGlzLmdldERhdGUoKSxcclxuXHRcdFx0aDp0aGlzLmdldEhvdXJzKCksXHJcblx0XHRcdG06dGhpcy5nZXRNaW51dGVzKCksXHJcblx0XHRcdHM6dGhpcy5nZXRTZWNvbmRzKClcclxuXHRcdH1cclxuXHRcdHJldHVybiB0bXBsLnJlcGxhY2UoLyhbeW1kaHNdKSsvaWcsIGZ1bmN0aW9uKG1hdGNoLHR5cGUpe1xyXG5cdFx0XHRyZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxyXG5cdFx0fSlcclxuXHR9LFxyXG5cdHNtYXJ0Rm9ybWF0KHJlVG9kYXk9XCLku4rlpKkgSEg6bW1cIiwgcmVUaGlzWWVhcj1cIk1N5pyIRETml6VcIiwgcmVZZWFyc0Fnbz1cIllZWVnlubRNTeaciERE5pelXCIpe1xyXG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5pc1NhbWVEYXRlKG5vdykgPyByZVRvZGF5IDpcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gcmVUaGlzWWVhciA6IHJlWWVhcnNBZ28pXHJcblx0fVxyXG59KVxyXG4iXX0=