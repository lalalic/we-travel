"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

var _db = require("./db");

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
Main.defaultProps = Object.assign(_qiliApp.QiliApp.defaultProps, {
	init: function init(a) {
		(0, _db.init)();
		if (typeof extractPosFromPhotos == 'undefined') return;

		alert(1);
		debugger;
		var waypoints = [];
		var extracting = function extracting(lastTimeExtractingPosFromPhoto) {
			return extractPosFromPhotos(lastTimeExtractingPosFromPhoto, null, function (waypoint) {
				switch (typeof waypoint === "undefined" ? "undefined" : _typeof(waypoint)) {
					case 'number':
						if (waypoint > 0) {
							console.info("发现" + waypoint + "个地址信息");
							_db.Location.upsert(waypoints, function (a) {
								_qiliApp.User.localStorage.setItem('lastTimeExtractingPosFromPhoto', new Date());
							}, console.error);
						}
						break;
					default:
						waypoints.push(waypoint);
						break;
				}
			});
		};
		_qiliApp.User.localStorage.getItem('lastTimeExtractingPosFromPhoto', null).then(function (startTime) {
			return extracting(startTime);
		});
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
//# sourceMappingURL=data:application/json;base64,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QUFFLEtBQUssVUFBTCxFQUFGO0dBTkcsQ0FEZTtBQVNuQixTQUFPLEtBQUssT0FBTCxDQUFhLGNBQWIsRUFBNkIsVUFBUyxLQUFULEVBQWUsSUFBZixFQUFvQjtBQUN2RCxVQUFPLE1BQU0sUUFBTSxHQUFOLEdBQVksS0FBSyxXQUFMLEVBQVosR0FBaUMsSUFBakMsQ0FBTixJQUFnRCxFQUFoRCxDQURnRDtHQUFwQixDQUFwQyxDQVRtQjtFQWZRO0FBNEI1QixxQ0FBOEU7TUFBbEUsZ0VBQVEsMEJBQTBEO01BQTlDLG1FQUFXLHdCQUFtQztNQUF6QixtRUFBVyw2QkFBYzs7QUFDN0UsTUFBSSxNQUFJLElBQUksSUFBSixFQUFKLENBRHlFO0FBRTdFLFNBQU8sS0FBSyxNQUFMLENBQVksS0FBSyxVQUFMLENBQWdCLEdBQWhCLElBQXVCLE9BQXZCLEdBQ2QsS0FBSyxXQUFMLE1BQW9CLElBQUksV0FBSixFQUFwQixHQUF3QyxVQUF4QyxHQUFxRCxVQUFyRCxDQURMLENBRjZFO0VBNUJsRDtDQUE3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxyXG5cclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuXHJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xyXG5pbXBvcnQgSWNvbkV4cGxvcmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9leHBsb3JlJ1xyXG5pbXBvcnQgSWNvbkxpZmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvcGVyc29uLXBpbi1jaXJjbGUnXHJcblxyXG5pbXBvcnQge1FpbGlBcHAsIFVJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge2luaXQsIExvY2F0aW9uIGFzIExvY2F0aW9uREJ9IGZyb20gXCIuL2RiXCJcclxuY29uc3Qge0NvbW1hbmRCYXJ9PVVJXHJcblxyXG5jbGFzcyBNYWluIGV4dGVuZHMgUWlsaUFwcHtcclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5kZWZhdWx0UHJvcHMse1xyXG5cdFx0YXBwSWQ6XCJ3ZS10cmF2ZWxcIixcclxuXHRcdHRpdGxlOlwidHJhdmVsIGFsb25nIGxpZmVcIlxyXG5cdH0pXHJcblxyXG5cdHJlbmRlckNvbnRlbnQoKXtcclxuXHRcdGxldCB7cGF0aG5hbWV9PXRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMubG9jYXRpb25cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7ekluZGV4Ojh9fVxyXG5cdFx0XHRcdFx0b25TZWxlY3Q9e2NtZD0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGNtZC50b0xvd2VyQ2FzZSgpKX1cclxuXHRcdFx0XHRcdHByaW1hcnk9e3BhdGhuYW1lPT1cIi9cIiA/IFwiL1wiIDogcGF0aG5hbWUuc3BsaXQoXCIvXCIpWzFdfVxyXG5cdFx0XHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIi9cIixpY29uOkljb25MaWZlfSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImV4cGxvcmVcIiwgaWNvbjpJY29uRXhwbG9yZX0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuW4kOWPt1wiLCBhY3Rpb246XCJteVwiLCBpY29uOkljb25BY2NvdW50fSxcclxuXHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5kZWZhdWx0UHJvcHMse1xyXG5cdFx0aW5pdDphPT57XHJcblx0XHRcdGluaXQoKVxyXG5cdFx0XHRpZih0eXBlb2YoZXh0cmFjdFBvc0Zyb21QaG90b3MpPT0ndW5kZWZpbmVkJylcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFxyXG5cdFx0XHRhbGVydCgxKVxyXG5cdFx0XHRkZWJ1Z2dlclxyXG5cdFx0XHRsZXQgd2F5cG9pbnRzPVtdXHJcblx0XHRcdGxldCBleHRyYWN0aW5nPWxhc3RUaW1lRXh0cmFjdGluZ1Bvc0Zyb21QaG90bz0+ZXh0cmFjdFBvc0Zyb21QaG90b3MobGFzdFRpbWVFeHRyYWN0aW5nUG9zRnJvbVBob3RvLG51bGwsd2F5cG9pbnQ9PntcclxuXHRcdFx0XHRzd2l0Y2godHlwZW9mIHdheXBvaW50KXtcclxuXHRcdFx0XHRjYXNlICdudW1iZXInOlxyXG5cdFx0XHRcdFx0aWYod2F5cG9pbnQ+MCl7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUuaW5mbyhg5Y+R546wJHt3YXlwb2ludH3kuKrlnLDlnYDkv6Hmga9gKVxyXG5cdFx0XHRcdFx0XHRMb2NhdGlvbkRCLnVwc2VydCh3YXlwb2ludHMsIGE9PntcclxuXHRcdFx0XHRcdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYXN0VGltZUV4dHJhY3RpbmdQb3NGcm9tUGhvdG8nLG5ldyBEYXRlKCkpXHJcblx0XHRcdFx0XHRcdH0sIGNvbnNvbGUuZXJyb3IpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0d2F5cG9pbnRzLnB1c2god2F5cG9pbnQpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xhc3RUaW1lRXh0cmFjdGluZ1Bvc0Zyb21QaG90bycsbnVsbClcclxuXHRcdFx0XHQudGhlbihzdGFydFRpbWU9PmV4dHJhY3Rpbmcoc3RhcnRUaW1lKSlcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXHJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcInFpbGktYXBwL2xpYi9zZXR0aW5nXCJcclxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwicWlsaS1hcHAvbGliL3VzZXItcHJvZmlsZVwiXHJcbmltcG9ydCBMaWZlVUkgZnJvbSBcIi4vbGlmZVwiXHJcbmltcG9ydCBFeHBsb3JlVUkgZnJvbSBcIi4vZXhwbG9yZVwiXHJcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSBcIi4vcHVibGlzaFwiXHJcbmltcG9ydCBKb3VybmV5VUkgZnJvbSBcIi4vam91cm5leVwiXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsIGZ1bmN0aW9uKCkge1xyXG4gIE1haW4ucmVuZGVyKFxyXG5cdDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17TWFpbn0+XHJcblx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0xpZmVVSX0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJleHBsb3JlXCIgY29tcG9uZW50PXtFeHBsb3JlVUl9Lz5cclxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIj5cclxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0vPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0vPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwiam91cm5leVwiPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cIl9uZXdcIiBjb21wb25lbnQ9e0pvdXJuZXlVSS5DcmVhdG9yfS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZFwiIGNvbXBvbmVudD17Sm91cm5leVVJfS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cdDwvUm91dGU+XHJcblx0KVxyXG59KTtcclxuXHJcblxyXG5PYmplY3QuYXNzaWduKERhdGUucHJvdG90eXBlLHtcclxuXHR0b0RhdGUoKXtcclxuXHRcdGxldCBkPW5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKVxyXG5cdFx0ZC5zZXRIb3VycygwLDAsMCwwKVxyXG5cdFx0cmV0dXJuIGRcclxuXHR9LFxyXG5cdGlzU2FtZURhdGUoZCl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShkKT09MFxyXG5cdH0sXHJcblx0cmVsYXRpdmUoZCl7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcigodGhpcy50b0RhdGUoKS5nZXRUaW1lKCktZC50b0RhdGUoKS5nZXRUaW1lKCkpLygyNCo2MCo2MCoxMDAwKSlcclxuXHR9LFxyXG5cdHJlbGF0aXZlRGF0ZShkYXlzKXtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSsyNCo2MCo2MCoxMDAwKmRheXMpXHJcblx0fSxcclxuXHRmb3JtYXQodG1wbD1cInktTS1kXCIpe1xyXG5cdFx0bGV0IHZhbHVlPXtcclxuXHRcdFx0eTp0aGlzLmdldEZ1bGxZZWFyKCksXHJcblx0XHRcdE06dGhpcy5nZXRNb250aCgpKzEsXHJcblx0XHRcdGQ6dGhpcy5nZXREYXRlKCksXHJcblx0XHRcdGg6dGhpcy5nZXRIb3VycygpLFxyXG5cdFx0XHRtOnRoaXMuZ2V0TWludXRlcygpLFxyXG5cdFx0XHRzOnRoaXMuZ2V0U2Vjb25kcygpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcclxuXHRcdFx0cmV0dXJuIHZhbHVlW3R5cGUhPSdNJyA/IHR5cGUudG9Mb3dlckNhc2UoKSA6IHR5cGVdIHx8IFwiXCJcclxuXHRcdH0pXHJcblx0fSxcclxuXHRzbWFydEZvcm1hdChyZVRvZGF5PVwi5LuK5aSpIEhIOm1tXCIsIHJlVGhpc1llYXI9XCJNTeaciERE5pelXCIsIHJlWWVhcnNBZ289XCJZWVlZ5bm0TU3mnIhEROaXpVwiKXtcclxuXHRcdGxldCBub3c9bmV3IERhdGUoKVxyXG5cdFx0cmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMuaXNTYW1lRGF0ZShub3cpID8gcmVUb2RheSA6XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGdWxsWWVhcigpPT1ub3cuZ2V0RnVsbFllYXIoKSA/IHJlVGhpc1llYXIgOiByZVllYXJzQWdvKVxyXG5cdH1cclxufSlcclxuIl19