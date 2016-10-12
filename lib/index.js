"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
		if (typeof extractPosFromPhotos == 'undefined') return;

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
//# sourceMappingURL=data:application/json;base64,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QUFOLEdBQVMsSUFBVCxHQUFjLElBQWQsQ0FBL0IsQ0FEaUI7RUFaVTtBQWU1QiwyQkFBb0I7TUFBYiw2REFBSyx1QkFBUTs7QUFDbkIsTUFBSSxRQUFNO0FBQ1QsTUFBRSxLQUFLLFdBQUwsRUFBRjtBQUNBLE1BQUUsS0FBSyxRQUFMLEtBQWdCLENBQWhCO0FBQ0YsTUFBRSxLQUFLLE9BQUwsRUFBRjtBQUNBLE1BQUUsS0FBSyxRQUFMLEVBQUY7QUFDQSxNQUFFLEtBQUssVUFBTCxFQUFGO0FBQ0EsTUFBRSxLQUFLLFVBQUwsRUFBRjtHQU5HLENBRGU7QUFTbkIsU0FBTyxLQUFLLE9BQUwsQ0FBYSxjQUFiLEVBQTZCLFVBQVMsS0FBVCxFQUFlLElBQWYsRUFBb0I7QUFDdkQsVUFBTyxNQUFNLFFBQU0sR0FBTixHQUFZLEtBQUssV0FBTCxFQUFaLEdBQWlDLElBQWpDLENBQU4sSUFBZ0QsRUFBaEQsQ0FEZ0Q7R0FBcEIsQ0FBcEMsQ0FUbUI7RUFmUTtBQTRCNUIscUNBQThFO01BQWxFLGdFQUFRLDBCQUEwRDtNQUE5QyxtRUFBVyx3QkFBbUM7TUFBekIsbUVBQVcsNkJBQWM7O0FBQzdFLE1BQUksTUFBSSxJQUFJLElBQUosRUFBSixDQUR5RTtBQUU3RSxTQUFPLEtBQUssTUFBTCxDQUFZLEtBQUssVUFBTCxDQUFnQixHQUFoQixJQUF1QixPQUF2QixHQUNkLEtBQUssV0FBTCxNQUFvQixJQUFJLFdBQUosRUFBcEIsR0FBd0MsVUFBeEMsR0FBcUQsVUFBckQsQ0FETCxDQUY2RTtFQTVCbEQ7Q0FBN0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcclxuXHJcbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcblxyXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcclxuaW1wb3J0IEljb25FeHBsb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZXhwbG9yZSdcclxuaW1wb3J0IEljb25MaWZlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL3BlcnNvbi1waW4tY2lyY2xlJ1xyXG5cclxuaW1wb3J0IHtRaWxpQXBwLCBVSSwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtpbml0LCBMb2NhdGlvbiBhcyBMb2NhdGlvbkRCfSBmcm9tIFwiLi9kYlwiXHJcbmltcG9ydCBQaG90b1ZpZXdlciBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvLXZpZXdlclwiXHJcbmNvbnN0IHtDb21tYW5kQmFyfT1VSVxyXG5cclxuY2xhc3MgTWFpbiBleHRlbmRzIFFpbGlBcHB7XHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKFFpbGlBcHAuZGVmYXVsdFByb3BzLHtcclxuXHRcdGFwcElkOlwid2UtdHJhdmVsXCIsXHJcblx0XHR0aXRsZTpcInRyYXZlbCBhbG9uZyBsaWZlXCJcclxuXHR9KVxyXG5cclxuXHRyZW5kZXJDb250ZW50KCl7XHJcblx0XHRsZXQge3BhdGhuYW1lfT10aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmxvY2F0aW9uXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBzdHlsZT17e3pJbmRleDo4fX1cclxuXHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChjbWQudG9Mb3dlckNhc2UoKSl9XHJcblx0XHRcdFx0XHRwcmltYXJ5PXtwYXRobmFtZT09XCIvXCIgPyBcIi9cIiA6IHBhdGhuYW1lLnNwbGl0KFwiL1wiKVsxXX1cclxuXHRcdFx0XHRcdGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCIvXCIsaWNvbjpJY29uTGlmZX0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJleHBsb3JlXCIsIGljb246SWNvbkV4cGxvcmV9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLluJDlj7dcIiwgYWN0aW9uOlwibXlcIiwgaWNvbjpJY29uQWNjb3VudH0sXHJcblx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PFBob3RvVmlld2VyIHJlZj1cInBob3RvVmlld2VyXCIvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5jaGlsZENvbnRleHRUeXBlcyx7XHJcblx0XHR2aWV3UGhvdG86IFByb3BUeXBlcy5mdW5jXHJcbiAgICB9KVxyXG5cdFxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHR2aWV3UGhvdG86dXJsPT50aGlzLnJlZnMucGhvdG9WaWV3ZXIudmlldyh1cmwpXHJcblx0XHR9KVxyXG5cdH0gXHJcblxyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmRlZmF1bHRQcm9wcyx7XHJcblx0XHRpbml0OmE9PntcclxuXHRcdFx0aW5pdCgpXHJcblx0XHRcdGlmKHR5cGVvZihleHRyYWN0UG9zRnJvbVBob3Rvcyk9PSd1bmRlZmluZWQnKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHJcblx0XHRcdGxldCB3YXlwb2ludHM9W11cclxuXHRcdFx0bGV0IGV4dHJhY3Rpbmc9bGFzdFRpbWVFeHRyYWN0aW5nUG9zRnJvbVBob3RvPT5leHRyYWN0UG9zRnJvbVBob3RvcyhsYXN0VGltZUV4dHJhY3RpbmdQb3NGcm9tUGhvdG8sbnVsbCx3YXlwb2ludD0+e1xyXG5cdFx0XHRcdHN3aXRjaCh0eXBlb2Ygd2F5cG9pbnQpe1xyXG5cdFx0XHRcdGNhc2UgJ251bWJlcic6XHJcblx0XHRcdFx0XHRpZih3YXlwb2ludD4wKXtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5pbmZvKGDlj5HnjrAke3dheXBvaW50feS4quWcsOWdgOS/oeaBr2ApXHJcblx0XHRcdFx0XHRcdExvY2F0aW9uREIudXBzZXJ0KHdheXBvaW50cywgYT0+e1xyXG5cdFx0XHRcdFx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhc3RUaW1lRXh0cmFjdGluZ1Bvc0Zyb21QaG90bycsbmV3IERhdGUoKSlcclxuXHRcdFx0XHRcdFx0fSwgY29uc29sZS5lcnJvcilcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHR3YXlwb2ludHMucHVzaCh3YXlwb2ludClcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0VXNlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGFzdFRpbWVFeHRyYWN0aW5nUG9zRnJvbVBob3RvJyxudWxsKVxyXG5cdFx0XHRcdC50aGVuKHN0YXJ0VGltZT0+ZXh0cmFjdGluZyhzdGFydFRpbWUpKVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcclxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwicWlsaS1hcHAvbGliL3NldHRpbmdcIlxyXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCJxaWxpLWFwcC9saWIvdXNlci1wcm9maWxlXCJcclxuaW1wb3J0IExpZmVVSSBmcm9tIFwiLi9saWZlXCJcclxuaW1wb3J0IEV4cGxvcmVVSSBmcm9tIFwiLi9leHBsb3JlXCJcclxuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tIFwiLi9wdWJsaXNoXCJcclxuaW1wb3J0IEpvdXJuZXlVSSBmcm9tIFwiLi9qb3VybmV5XCJcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgZnVuY3Rpb24oKSB7XHJcbiAgTWFpbi5yZW5kZXIoXHJcblx0PFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtNYWlufT5cclxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TGlmZVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cImV4cGxvcmVcIiBjb21wb25lbnQ9e0V4cGxvcmVVSX0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e015VUl9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfS8+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJqb3VybmV5XCI+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiX25ld1wiIGNvbXBvbmVudD17Sm91cm5leVVJLkNyZWF0b3J9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkXCIgY29tcG9uZW50PXtKb3VybmV5VUl9Lz5cclxuXHRcdDwvUm91dGU+XHJcblx0PC9Sb3V0ZT5cclxuXHQpXHJcbn0pO1xyXG5cclxuXHJcbk9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUse1xyXG5cdHRvRGF0ZSgpe1xyXG5cdFx0bGV0IGQ9bmV3IERhdGUodGhpcy5nZXRUaW1lKCkpXHJcblx0XHRkLnNldEhvdXJzKDAsMCwwLDApXHJcblx0XHRyZXR1cm4gZFxyXG5cdH0sXHJcblx0aXNTYW1lRGF0ZShkKXtcclxuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKGQpPT0wXHJcblx0fSxcclxuXHRyZWxhdGl2ZShkKXtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKCh0aGlzLnRvRGF0ZSgpLmdldFRpbWUoKS1kLnRvRGF0ZSgpLmdldFRpbWUoKSkvKDI0KjYwKjYwKjEwMDApKVxyXG5cdH0sXHJcblx0cmVsYXRpdmVEYXRlKGRheXMpe1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKzI0KjYwKjYwKjEwMDAqZGF5cylcclxuXHR9LFxyXG5cdGZvcm1hdCh0bXBsPVwieS1NLWRcIil7XHJcblx0XHRsZXQgdmFsdWU9e1xyXG5cdFx0XHR5OnRoaXMuZ2V0RnVsbFllYXIoKSxcclxuXHRcdFx0TTp0aGlzLmdldE1vbnRoKCkrMSxcclxuXHRcdFx0ZDp0aGlzLmdldERhdGUoKSxcclxuXHRcdFx0aDp0aGlzLmdldEhvdXJzKCksXHJcblx0XHRcdG06dGhpcy5nZXRNaW51dGVzKCksXHJcblx0XHRcdHM6dGhpcy5nZXRTZWNvbmRzKClcclxuXHRcdH1cclxuXHRcdHJldHVybiB0bXBsLnJlcGxhY2UoLyhbeW1kaHNdKSsvaWcsIGZ1bmN0aW9uKG1hdGNoLHR5cGUpe1xyXG5cdFx0XHRyZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxyXG5cdFx0fSlcclxuXHR9LFxyXG5cdHNtYXJ0Rm9ybWF0KHJlVG9kYXk9XCLku4rlpKkgSEg6bW1cIiwgcmVUaGlzWWVhcj1cIk1N5pyIRETml6VcIiwgcmVZZWFyc0Fnbz1cIllZWVnlubRNTeaciERE5pelXCIpe1xyXG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5pc1NhbWVEYXRlKG5vdykgPyByZVRvZGF5IDpcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gcmVUaGlzWWVhciA6IHJlWWVhcnNBZ28pXHJcblx0fVxyXG59KVxyXG4iXX0=