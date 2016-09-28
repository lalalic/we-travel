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


document.addEventListener('deviceready', function () {
	alert(1);
	debugger;
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
//# sourceMappingURL=data:application/json;base64,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RyxFQUFILEdBQU0sRUFBTixHQUFTLElBQVQsQ0FBaEQsQ0FBbEIsQ0FEVTtFQVppQjtBQWU1QixxQ0FBYSxNQUFLO0FBQ2pCLFNBQU8sSUFBSSxJQUFKLENBQVMsS0FBSyxPQUFMLEtBQWUsS0FBRyxFQUFILEdBQU0sRUFBTixHQUFTLElBQVQsR0FBYyxJQUFkLENBQS9CLENBRGlCO0VBZlU7QUFrQjVCLDJCQUFvQjtNQUFiLDZEQUFLLHVCQUFROztBQUNuQixNQUFJLFFBQU07QUFDVCxNQUFFLEtBQUssV0FBTCxFQUFGO0FBQ0EsTUFBRSxLQUFLLFFBQUwsS0FBZ0IsQ0FBaEI7QUFDRixNQUFFLEtBQUssT0FBTCxFQUFGO0FBQ0EsTUFBRSxLQUFLLFFBQUwsRUFBRjtBQUNBLE1BQUUsS0FBSyxVQUFMLEVBQUY7QUFDQSxNQUFFLEtBQUssVUFBTCxFQUFGO0dBTkcsQ0FEZTtBQVNuQixTQUFPLEtBQUssT0FBTCxDQUFhLGNBQWIsRUFBNkIsVUFBUyxLQUFULEVBQWUsSUFBZixFQUFvQjtBQUN2RCxVQUFPLE1BQU0sUUFBTSxHQUFOLEdBQVksS0FBSyxXQUFMLEVBQVosR0FBaUMsSUFBakMsQ0FBTixJQUFnRCxFQUFoRCxDQURnRDtHQUFwQixDQUFwQyxDQVRtQjtFQWxCUTtBQStCNUIscUNBQThFO01BQWxFLGdFQUFRLDBCQUEwRDtNQUE5QyxtRUFBVyx3QkFBbUM7TUFBekIsbUVBQVcsNkJBQWM7O0FBQzdFLE1BQUksTUFBSSxJQUFJLElBQUosRUFBSixDQUR5RTtBQUU3RSxTQUFPLEtBQUssTUFBTCxDQUFZLEtBQUssVUFBTCxDQUFnQixHQUFoQixJQUF1QixPQUF2QixHQUNkLEtBQUssV0FBTCxNQUFvQixJQUFJLFdBQUosRUFBcEIsR0FBd0MsVUFBeEMsR0FBcUQsVUFBckQsQ0FETCxDQUY2RTtFQS9CbEQ7Q0FBN0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcclxuXHJcbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcblxyXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcclxuaW1wb3J0IEljb25FeHBsb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZXhwbG9yZSdcclxuaW1wb3J0IEljb25MaWZlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL3BlcnNvbi1waW4tY2lyY2xlJ1xyXG5cclxuaW1wb3J0IHtRaWxpQXBwLCBVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuY29uc3Qge0NvbW1hbmRCYXJ9PVVJXHJcblxyXG5jbGFzcyBNYWluIGV4dGVuZHMgUWlsaUFwcHtcclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5kZWZhdWx0UHJvcHMse1xyXG5cdFx0YXBwSWQ6XCJ3ZS10cmF2ZWxcIixcclxuXHRcdHRpdGxlOlwidHJhdmVsIGFsb25nIGxpZmVcIlxyXG5cdH0pXHJcblx0XHJcblx0cmVuZGVyQ29udGVudCgpe1xyXG5cdFx0bGV0IHtwYXRobmFtZX09dGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5sb2NhdGlvblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6OH19IFxyXG5cdFx0XHRcdFx0b25TZWxlY3Q9e2NtZD0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGNtZC50b0xvd2VyQ2FzZSgpKX1cclxuXHRcdFx0XHRcdHByaW1hcnk9e3BhdGhuYW1lPT1cIi9cIiA/IFwiL1wiIDogcGF0aG5hbWUuc3BsaXQoXCIvXCIpWzFdfVxyXG5cdFx0XHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIi9cIixpY29uOkljb25MaWZlfSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImV4cGxvcmVcIiwgaWNvbjpJY29uRXhwbG9yZX0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuW4kOWPt1wiLCBhY3Rpb246XCJteVwiLCBpY29uOkljb25BY2NvdW50fSxcclxuXHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcblxyXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXHJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcInFpbGktYXBwL2xpYi9zZXR0aW5nXCJcclxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwicWlsaS1hcHAvbGliL3VzZXItcHJvZmlsZVwiXHJcbmltcG9ydCBMaWZlVUkgZnJvbSBcIi4vbGlmZVwiXHJcbmltcG9ydCBFeHBsb3JlVUkgZnJvbSBcIi4vZXhwbG9yZVwiXHJcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSBcIi4vcHVibGlzaFwiXHJcbmltcG9ydCBKb3VybmV5VUkgZnJvbSBcIi4vam91cm5leVwiXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsIGZ1bmN0aW9uKCkge1xyXG4gIGFsZXJ0KDEpXHJcbiAgZGVidWdnZXJcclxuICBNYWluLnJlbmRlcihcclxuPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtNYWlufT5cclxuXHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0xpZmVVSX0vPlxyXG5cdDxSb3V0ZSBwYXRoPVwiZXhwbG9yZVwiIGNvbXBvbmVudD17RXhwbG9yZVVJfS8+XHJcblx0PFJvdXRlIHBhdGg9XCJteVwiPlxyXG5cdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cclxuXHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XHJcblx0PC9Sb3V0ZT5cclxuXHRcclxuXHQ8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0vPlxyXG5cdFxyXG5cdDxSb3V0ZSBwYXRoPVwiam91cm5leVwiPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJfbmV3XCIgY29tcG9uZW50PXtKb3VybmV5VUkuQ3JlYXRvcn0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCI6aWRcIiBjb21wb25lbnQ9e0pvdXJuZXlVSX0vPlxyXG5cdDwvUm91dGU+XHJcbjwvUm91dGU+XHJcbilcclxufSk7XHJcblxyXG5cclxuT2JqZWN0LmFzc2lnbihEYXRlLnByb3RvdHlwZSx7XHJcblx0dG9EYXRlKCl7XHJcblx0XHRsZXQgZD1uZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSlcclxuXHRcdGQuc2V0SG91cnMoMClcclxuXHRcdGQuc2V0TWludXRlcygwKVxyXG5cdFx0ZC5zZXRTZWNvbmRzKDApXHJcblx0XHRkLnNldE1pbGxpc2Vjb25kcygwKVxyXG5cdFx0cmV0dXJuIGRcclxuXHR9LFxyXG5cdGlzU2FtZURhdGUoZCl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShkKT09MFxyXG5cdH0sXHJcblx0cmVsYXRpdmUoZCl7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcigodGhpcy50b0RhdGUoKS5nZXRUaW1lKCktZC50b0RhdGUoKS5nZXRUaW1lKCkpLygyNCo2MCo2MCoxMDAwKSlcclxuXHR9LFxyXG5cdHJlbGF0aXZlRGF0ZShkYXlzKXtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSsyNCo2MCo2MCoxMDAwKmRheXMpXHJcblx0fSxcclxuXHRmb3JtYXQodG1wbD1cInktTS1kXCIpe1xyXG5cdFx0bGV0IHZhbHVlPXtcclxuXHRcdFx0eTp0aGlzLmdldEZ1bGxZZWFyKCksXHJcblx0XHRcdE06dGhpcy5nZXRNb250aCgpKzEsXHJcblx0XHRcdGQ6dGhpcy5nZXREYXRlKCksXHJcblx0XHRcdGg6dGhpcy5nZXRIb3VycygpLFxyXG5cdFx0XHRtOnRoaXMuZ2V0TWludXRlcygpLFxyXG5cdFx0XHRzOnRoaXMuZ2V0U2Vjb25kcygpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcclxuXHRcdFx0cmV0dXJuIHZhbHVlW3R5cGUhPSdNJyA/IHR5cGUudG9Mb3dlckNhc2UoKSA6IHR5cGVdIHx8IFwiXCJcclxuXHRcdH0pXHJcblx0fSxcclxuXHRzbWFydEZvcm1hdChyZVRvZGF5PVwi5LuK5aSpIEhIOm1tXCIsIHJlVGhpc1llYXI9XCJNTeaciERE5pelXCIsIHJlWWVhcnNBZ289XCJZWVlZ5bm0TU3mnIhEROaXpVwiKXtcclxuXHRcdGxldCBub3c9bmV3IERhdGUoKVxyXG5cdFx0cmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMuaXNTYW1lRGF0ZShub3cpID8gcmVUb2RheSA6XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRGdWxsWWVhcigpPT1ub3cuZ2V0RnVsbFllYXIoKSA/IHJlVGhpc1llYXIgOiByZVllYXJzQWdvKVxyXG5cdH1cclxufSkiXX0=