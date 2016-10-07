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

		var waypoints = [];
		var extracting = function extracting(lastTimeExtractingPosFromPhoto) {
			return extractPosFromPhotos(lastTimeExtractingPosFromPhoto, null, function (waypoint) {
				switch (typeof waypoint === "undefined" ? "undefined" : _typeof(waypoint)) {
					case 'number':
						console.info("发现" + waypoint + "个地址信息");
						LocationDB.upsert(waypoints).then(function (a) {
							_db.User.localStorage.setItem('lastTimeExtractingPosFromPhoto', new Date());
						});
						break;
					default:
						waypoints.push(waypoint);
						break;
				}
			});
		};
		_db.User.localStorage.getItem('lastTimeExtractingPosFromPhoto', null).then(function (startTime) {
			return extracting;
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
//# sourceMappingURL=data:application/json;base64,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RUFBRjtHQU5HLENBRGU7QUFTbkIsU0FBTyxLQUFLLE9BQUwsQ0FBYSxjQUFiLEVBQTZCLFVBQVMsS0FBVCxFQUFlLElBQWYsRUFBb0I7QUFDdkQsVUFBTyxNQUFNLFFBQU0sR0FBTixHQUFZLEtBQUssV0FBTCxFQUFaLEdBQWlDLElBQWpDLENBQU4sSUFBZ0QsRUFBaEQsQ0FEZ0Q7R0FBcEIsQ0FBcEMsQ0FUbUI7RUFsQlE7QUErQjVCLHFDQUE4RTtNQUFsRSxnRUFBUSwwQkFBMEQ7TUFBOUMsbUVBQVcsd0JBQW1DO01BQXpCLG1FQUFXLDZCQUFjOztBQUM3RSxNQUFJLE1BQUksSUFBSSxJQUFKLEVBQUosQ0FEeUU7QUFFN0UsU0FBTyxLQUFLLE1BQUwsQ0FBWSxLQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsSUFBdUIsT0FBdkIsR0FDZCxLQUFLLFdBQUwsTUFBb0IsSUFBSSxXQUFKLEVBQXBCLEdBQXdDLFVBQXhDLEdBQXFELFVBQXJELENBREwsQ0FGNkU7RUEvQmxEO0NBQTdCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXHJcblxyXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGV9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5cclxuaW1wb3J0IEljb25BY2NvdW50IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnXHJcbmltcG9ydCBJY29uRXhwbG9yZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2V4cGxvcmUnXHJcbmltcG9ydCBJY29uTGlmZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9wZXJzb24tcGluLWNpcmNsZSdcclxuXHJcbmltcG9ydCB7UWlsaUFwcCwgVUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXHJcbmNvbnN0IHtDb21tYW5kQmFyfT1VSVxyXG5cclxuY2xhc3MgTWFpbiBleHRlbmRzIFFpbGlBcHB7XHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKFFpbGlBcHAuZGVmYXVsdFByb3BzLHtcclxuXHRcdGFwcElkOlwid2UtdHJhdmVsXCIsXHJcblx0XHR0aXRsZTpcInRyYXZlbCBhbG9uZyBsaWZlXCJcclxuXHR9KVxyXG5cclxuXHRyZW5kZXJDb250ZW50KCl7XHJcblx0XHRsZXQge3BhdGhuYW1lfT10aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmxvY2F0aW9uXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBzdHlsZT17e3pJbmRleDo4fX1cclxuXHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChjbWQudG9Mb3dlckNhc2UoKSl9XHJcblx0XHRcdFx0XHRwcmltYXJ5PXtwYXRobmFtZT09XCIvXCIgPyBcIi9cIiA6IHBhdGhuYW1lLnNwbGl0KFwiL1wiKVsxXX1cclxuXHRcdFx0XHRcdGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCIvXCIsaWNvbjpJY29uTGlmZX0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJleHBsb3JlXCIsIGljb246SWNvbkV4cGxvcmV9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLluJDlj7dcIiwgYWN0aW9uOlwibXlcIiwgaWNvbjpJY29uQWNjb3VudH0sXHJcblx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKFFpbGlBcHAuZGVmYXVsdFByb3BzLHtcclxuXHRcdGluaXQ6YT0+e1xyXG5cdFx0XHRpbml0KClcclxuXHJcblx0XHRcdGlmKHR5cGVvZihleHRyYWN0UG9zRnJvbVBob3Rvcyk9PSd1bmRlZmluZWQnKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdGxldCB3YXlwb2ludHM9W11cclxuXHRcdFx0bGV0IGV4dHJhY3Rpbmc9bGFzdFRpbWVFeHRyYWN0aW5nUG9zRnJvbVBob3RvPT5leHRyYWN0UG9zRnJvbVBob3RvcyhsYXN0VGltZUV4dHJhY3RpbmdQb3NGcm9tUGhvdG8sbnVsbCx3YXlwb2ludD0+e1xyXG5cdFx0XHRcdHN3aXRjaCh0eXBlb2Ygd2F5cG9pbnQpe1xyXG5cdFx0XHRcdGNhc2UgJ251bWJlcic6XHJcblx0XHRcdFx0XHRjb25zb2xlLmluZm8oYOWPkeeOsCR7d2F5cG9pbnR95Liq5Zyw5Z2A5L+h5oGvYClcclxuXHRcdFx0XHRcdExvY2F0aW9uREIudXBzZXJ0KHdheXBvaW50cylcclxuXHRcdFx0XHRcdFx0LnRoZW4oYT0+e1xyXG5cdFx0XHRcdFx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhc3RUaW1lRXh0cmFjdGluZ1Bvc0Zyb21QaG90bycsbmV3IERhdGUoKSlcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHR3YXlwb2ludHMucHVzaCh3YXlwb2ludClcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0VXNlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFzdFRpbWVFeHRyYWN0aW5nUG9zRnJvbVBob3RvJyxudWxsKS50aGVuKHN0YXJ0VGltZT0+ZXh0cmFjdGluZylcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXHJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcInFpbGktYXBwL2xpYi9zZXR0aW5nXCJcclxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwicWlsaS1hcHAvbGliL3VzZXItcHJvZmlsZVwiXHJcbmltcG9ydCBMaWZlVUkgZnJvbSBcIi4vbGlmZVwiXHJcbmltcG9ydCBFeHBsb3JlVUkgZnJvbSBcIi4vZXhwbG9yZVwiXHJcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSBcIi4vcHVibGlzaFwiXHJcbmltcG9ydCBKb3VybmV5VUkgZnJvbSBcIi4vam91cm5leVwiXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsIGZ1bmN0aW9uKCkge1xyXG4gIE1haW4ucmVuZGVyKFxyXG5cdDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17TWFpbn0+XHJcblx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0xpZmVVSX0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJleHBsb3JlXCIgY29tcG9uZW50PXtFeHBsb3JlVUl9Lz5cclxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIj5cclxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0vPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0vPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwiam91cm5leVwiPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cIl9uZXdcIiBjb21wb25lbnQ9e0pvdXJuZXlVSS5DcmVhdG9yfS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZFwiIGNvbXBvbmVudD17Sm91cm5leVVJfS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cdDwvUm91dGU+XHJcblx0KVxyXG59KTtcclxuXHJcblxyXG5PYmplY3QuYXNzaWduKERhdGUucHJvdG90eXBlLHtcclxuXHR0b0RhdGUoKXtcclxuXHRcdGxldCBkPW5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKVxyXG5cdFx0ZC5zZXRIb3VycygwKVxyXG5cdFx0ZC5zZXRNaW51dGVzKDApXHJcblx0XHRkLnNldFNlY29uZHMoMClcclxuXHRcdGQuc2V0TWlsbGlzZWNvbmRzKDApXHJcblx0XHRyZXR1cm4gZFxyXG5cdH0sXHJcblx0aXNTYW1lRGF0ZShkKXtcclxuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKGQpPT0wXHJcblx0fSxcclxuXHRyZWxhdGl2ZShkKXtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKCh0aGlzLnRvRGF0ZSgpLmdldFRpbWUoKS1kLnRvRGF0ZSgpLmdldFRpbWUoKSkvKDI0KjYwKjYwKjEwMDApKVxyXG5cdH0sXHJcblx0cmVsYXRpdmVEYXRlKGRheXMpe1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKzI0KjYwKjYwKjEwMDAqZGF5cylcclxuXHR9LFxyXG5cdGZvcm1hdCh0bXBsPVwieS1NLWRcIil7XHJcblx0XHRsZXQgdmFsdWU9e1xyXG5cdFx0XHR5OnRoaXMuZ2V0RnVsbFllYXIoKSxcclxuXHRcdFx0TTp0aGlzLmdldE1vbnRoKCkrMSxcclxuXHRcdFx0ZDp0aGlzLmdldERhdGUoKSxcclxuXHRcdFx0aDp0aGlzLmdldEhvdXJzKCksXHJcblx0XHRcdG06dGhpcy5nZXRNaW51dGVzKCksXHJcblx0XHRcdHM6dGhpcy5nZXRTZWNvbmRzKClcclxuXHRcdH1cclxuXHRcdHJldHVybiB0bXBsLnJlcGxhY2UoLyhbeW1kaHNdKSsvaWcsIGZ1bmN0aW9uKG1hdGNoLHR5cGUpe1xyXG5cdFx0XHRyZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxyXG5cdFx0fSlcclxuXHR9LFxyXG5cdHNtYXJ0Rm9ybWF0KHJlVG9kYXk9XCLku4rlpKkgSEg6bW1cIiwgcmVUaGlzWWVhcj1cIk1N5pyIRETml6VcIiwgcmVZZWFyc0Fnbz1cIllZWVnlubRNTeaciERE5pelXCIpe1xyXG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5pc1NhbWVEYXRlKG5vdykgPyByZVRvZGF5IDpcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gcmVUaGlzWWVhciA6IHJlWWVhcnNBZ28pXHJcblx0fVxyXG59KVxyXG4iXX0=