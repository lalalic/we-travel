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
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this3 = this;

			_get(Object.getPrototypeOf(Main.prototype), "componentDidMount", this).call(this);
			_db.Waypoint.on("upload", function (uploaded, sum, startTime, endTime) {
				if (uploaded == sum) _this3.showMessage(sum + " location data synced to server from " + startTime.smartFormat() + " to " + endTime.smartFormat());
			});
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var _this4 = this;

			return Object.assign(_get(Object.getPrototypeOf(Main.prototype), "getChildContext", this).call(this), {
				viewPhoto: function viewPhoto(url) {
					return _this4.refs.photoViewer.view(url);
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
	init: function init() {
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
//# sourceMappingURL=data:application/json;base64,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LENBQTFCLENBREU7RUFma0I7QUFrQjVCLDJCQUFvQjtNQUFiLDZEQUFLLHVCQUFROztBQUNuQixNQUFJLFFBQU07QUFDVCxNQUFFLEtBQUssV0FBTCxFQUFGO0FBQ0EsTUFBRSxLQUFLLFFBQUwsS0FBZ0IsQ0FBaEI7QUFDRixNQUFFLEtBQUssT0FBTCxFQUFGO0FBQ0EsTUFBRSxLQUFLLFFBQUwsRUFBRjtBQUNBLE1BQUUsS0FBSyxVQUFMLEVBQUY7QUFDQSxNQUFFLEtBQUssVUFBTCxFQUFGO0dBTkcsQ0FEZTtBQVNuQixTQUFPLEtBQUssT0FBTCxDQUFhLGNBQWIsRUFBNkIsVUFBUyxLQUFULEVBQWUsSUFBZixFQUFvQjtBQUN2RCxVQUFPLE1BQU0sUUFBTSxHQUFOLEdBQVksS0FBSyxXQUFMLEVBQVosR0FBaUMsSUFBakMsQ0FBTixJQUFnRCxFQUFoRCxDQURnRDtHQUFwQixDQUFwQyxDQVRtQjtFQWxCUTtBQStCNUIscUNBQThFO01BQWxFLGdFQUFRLDBCQUEwRDtNQUE5QyxtRUFBVyx3QkFBbUM7TUFBekIsbUVBQVcsNkJBQWM7O0FBQzdFLE1BQUksTUFBSSxJQUFJLElBQUosRUFBSixDQUR5RTtBQUU3RSxTQUFPLEtBQUssTUFBTCxDQUFZLEtBQUssVUFBTCxDQUFnQixHQUFoQixJQUF1QixPQUF2QixHQUNkLEtBQUssV0FBTCxNQUFvQixJQUFJLFdBQUosRUFBcEIsR0FBd0MsVUFBeEMsR0FBcUQsVUFBckQsQ0FETCxDQUY2RTtFQS9CbEQ7Q0FBN0IiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcclxuXHJcbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcblxyXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcclxuaW1wb3J0IEljb25FeHBsb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZXhwbG9yZSdcclxuaW1wb3J0IEljb25MaWZlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL3BlcnNvbi1waW4tY2lyY2xlJ1xyXG5cclxuaW1wb3J0IHtRaWxpQXBwLCBVSSwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtpbml0LCBXYXlwb2ludCBhcyBXYXlwb2ludERCfSBmcm9tIFwiLi9kYlwiXHJcbmltcG9ydCBQaG90b1ZpZXdlciBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvLXZpZXdlclwiXHJcbmNvbnN0IHtDb21tYW5kQmFyLCBDb21tZW50fT1VSVxyXG5cclxuY2xhc3MgTWFpbiBleHRlbmRzIFFpbGlBcHB7XHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKFFpbGlBcHAuZGVmYXVsdFByb3BzLHtcclxuXHRcdGFwcElkOlwid2UtdHJhdmVsXCIsXHJcblx0XHR0aXRsZTpcInRyYXZlbCBhbG9uZyBsaWZlXCJcclxuXHR9KVxyXG5cclxuXHRyZW5kZXJDb250ZW50KCl7XHJcblx0XHRsZXQge3BhdGhuYW1lfT10aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmxvY2F0aW9uXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBzdHlsZT17e3pJbmRleDo4fX1cclxuXHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChjbWQudG9Mb3dlckNhc2UoKSl9XHJcblx0XHRcdFx0XHRwcmltYXJ5PXtwYXRobmFtZT09XCIvXCIgPyBcIi9cIiA6IHBhdGhuYW1lLnNwbGl0KFwiL1wiKVsxXX1cclxuXHRcdFx0XHRcdGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCIvXCIsaWNvbjpJY29uTGlmZX0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJleHBsb3JlXCIsIGljb246SWNvbkV4cGxvcmV9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLluJDlj7dcIiwgYWN0aW9uOlwibXlcIiwgaWNvbjpJY29uQWNjb3VudH0sXHJcblx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PFBob3RvVmlld2VyIHJlZj1cInBob3RvVmlld2VyXCIvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHN1cGVyLmNvbXBvbmVudERpZE1vdW50KClcclxuXHRcdFdheXBvaW50REIub24oXCJ1cGxvYWRcIiwgKHVwbG9hZGVkLCBzdW0sIHN0YXJ0VGltZSwgZW5kVGltZSk9PntcclxuXHRcdFx0aWYodXBsb2FkZWQ9PXN1bSlcclxuXHRcdFx0XHR0aGlzLnNob3dNZXNzYWdlKGAke3N1bX0gbG9jYXRpb24gZGF0YSBzeW5jZWQgdG8gc2VydmVyIGZyb20gJHtzdGFydFRpbWUuc21hcnRGb3JtYXQoKX0gdG8gJHtlbmRUaW1lLnNtYXJ0Rm9ybWF0KCl9YClcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmNoaWxkQ29udGV4dFR5cGVzLHtcclxuXHRcdHZpZXdQaG90bzogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH0pXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkse1xyXG5cdFx0XHR2aWV3UGhvdG86dXJsPT50aGlzLnJlZnMucGhvdG9WaWV3ZXIudmlldyh1cmwpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKFFpbGlBcHAuZGVmYXVsdFByb3BzLHtcclxuXHRcdGluaXQoKXtcclxuXHRcdFx0aW5pdCgpXHJcblx0XHRcdFdheXBvaW50REIudXBsb2FkKClcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXHJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcInFpbGktYXBwL2xpYi9zZXR0aW5nXCJcclxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwicWlsaS1hcHAvbGliL3VzZXItcHJvZmlsZVwiXHJcbmltcG9ydCBMaWZlVUkgZnJvbSBcIi4vbGlmZVwiXHJcbmltcG9ydCBFeHBsb3JlVUkgZnJvbSBcIi4vZXhwbG9yZVwiXHJcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSBcIi4vcHVibGlzaFwiXHJcbmltcG9ydCBKb3VybmV5VUkgZnJvbSBcIi4vam91cm5leVwiXHJcbmltcG9ydCBJdGluZXJhcnlVSSBmcm9tIFwiLi9pdGluZXJhcnlcIlxyXG5pbXBvcnQgSXRpRGV0YWlsVUkgZnJvbSBcIi4vaXRpZGV0YWlsXCJcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgZnVuY3Rpb24oKSB7XHJcbiAgTWFpbi5yZW5kZXIoXHJcblx0PFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtNYWlufT5cclxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TGlmZVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cImV4cGxvcmVcIiBjb21wb25lbnQ9e0V4cGxvcmVVSX0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e015VUl9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cclxuXHRcdFx0PEluZGV4Um91dGUvPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImpvdXJuZXkvOl9pZFwiLz5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJqb3VybmV5XCI+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiX25ld1wiIGNvbXBvbmVudD17Sm91cm5leVVJLkNyZWF0b3J9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkXCI+XHJcblx0XHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtKb3VybmV5VUl9Lz5cclxuXHRcdFx0XHQ8Um91dGUgcGF0aD1cIml0aW5lcmFyeVwiPlxyXG5cdFx0XHRcdFx0PEluZGV4Um91dGUgIGNvbXBvbmVudD17SXRpbmVyYXJ5VUl9Lz5cclxuXHRcdFx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZDJcIiBjb21wb25lbnQ9e0l0aURldGFpbFVJfS8+XHJcblx0XHRcdFx0PC9Sb3V0ZT5cclxuXHRcdFx0PC9Sb3V0ZT5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0NvbW1lbnR9Lz5cclxuXHQ8L1JvdXRlPlxyXG5cdClcclxufSk7XHJcblxyXG5cclxuT2JqZWN0LmFzc2lnbihEYXRlLnByb3RvdHlwZSx7XHJcblx0dG9EYXRlKCl7XHJcblx0XHRsZXQgZD1uZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSlcclxuXHRcdGQuc2V0SG91cnMoMCwwLDAsMClcclxuXHRcdHJldHVybiBkXHJcblx0fSxcclxuXHRpc1NhbWVEYXRlKGQpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUoZCk9PTBcclxuXHR9LFxyXG5cdHJlbGF0aXZlKGQpe1xyXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoKHRoaXMudG9EYXRlKCkuZ2V0VGltZSgpLWQudG9EYXRlKCkuZ2V0VGltZSgpKS8oMjQqNjAqNjAqMTAwMCkpXHJcblx0fSxcclxuXHRyZWxhdGl2ZURhdGUoZGF5cyl7XHJcblx0XHRyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRUaW1lKCkrMjQqNjAqNjAqMTAwMCpkYXlzKVxyXG5cdH0sXHJcblx0aXNGdXR1cmUoKXtcclxuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKG5ldyBEYXRlKCkpPjBcclxuXHR9LFxyXG5cdGZvcm1hdCh0bXBsPVwieS1NLWRcIil7XHJcblx0XHRsZXQgdmFsdWU9e1xyXG5cdFx0XHR5OnRoaXMuZ2V0RnVsbFllYXIoKSxcclxuXHRcdFx0TTp0aGlzLmdldE1vbnRoKCkrMSxcclxuXHRcdFx0ZDp0aGlzLmdldERhdGUoKSxcclxuXHRcdFx0aDp0aGlzLmdldEhvdXJzKCksXHJcblx0XHRcdG06dGhpcy5nZXRNaW51dGVzKCksXHJcblx0XHRcdHM6dGhpcy5nZXRTZWNvbmRzKClcclxuXHRcdH1cclxuXHRcdHJldHVybiB0bXBsLnJlcGxhY2UoLyhbeW1kaHNdKSsvaWcsIGZ1bmN0aW9uKG1hdGNoLHR5cGUpe1xyXG5cdFx0XHRyZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxyXG5cdFx0fSlcclxuXHR9LFxyXG5cdHNtYXJ0Rm9ybWF0KHJlVG9kYXk9XCLku4rlpKkgSEg6bW1cIiwgcmVUaGlzWWVhcj1cIk1N5pyIRETml6VcIiwgcmVZZWFyc0Fnbz1cIllZWVnlubRNTeaciERE5pelXCIpe1xyXG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5pc1NhbWVEYXRlKG5vdykgPyByZVRvZGF5IDpcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gcmVUaGlzWWVhciA6IHJlWWVhcnNBZ28pXHJcblx0fVxyXG59KVxyXG4iXX0=