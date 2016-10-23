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
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this3 = this;

			_get(Main.prototype.__proto__ || Object.getPrototypeOf(Main.prototype), "componentDidMount", this).call(this);
			_db.Waypoint.on("upload", function (uploaded, sum, startTime, endTime) {
				if (uploaded == sum) _this3.showMessage(sum + " location data synced to server from " + startTime.smartFormat() + " to " + endTime.smartFormat());
			});
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var _this4 = this;

			return Object.assign(_get(Main.prototype.__proto__ || Object.getPrototypeOf(Main.prototype), "getChildContext", this).call(this), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiQ29tbWFuZEJhciIsIkNvbW1lbnQiLCJNYWluIiwicGF0aG5hbWUiLCJwcm9wcyIsImNoaWxkcmVuIiwibG9jYXRpb24iLCJ6SW5kZXgiLCJjb250ZXh0Iiwicm91dGVyIiwicHVzaCIsImNtZCIsInRvTG93ZXJDYXNlIiwic3BsaXQiLCJsYWJlbCIsImFjdGlvbiIsImljb24iLCJvbiIsInVwbG9hZGVkIiwic3VtIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInNob3dNZXNzYWdlIiwic21hcnRGb3JtYXQiLCJPYmplY3QiLCJhc3NpZ24iLCJ2aWV3UGhvdG8iLCJyZWZzIiwicGhvdG9WaWV3ZXIiLCJ2aWV3IiwidXJsIiwiZGVmYXVsdFByb3BzIiwiYXBwSWQiLCJ0aXRsZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiZnVuYyIsImluaXQiLCJ1cGxvYWQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJDcmVhdG9yIiwiRGF0ZSIsInByb3RvdHlwZSIsInRvRGF0ZSIsImQiLCJnZXRUaW1lIiwic2V0SG91cnMiLCJpc1NhbWVEYXRlIiwicmVsYXRpdmUiLCJNYXRoIiwiZmxvb3IiLCJyZWxhdGl2ZURhdGUiLCJkYXlzIiwiaXNGdXR1cmUiLCJmb3JtYXQiLCJ0bXBsIiwidmFsdWUiLCJ5IiwiZ2V0RnVsbFllYXIiLCJNIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJzIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaCIsInR5cGUiLCJyZVRvZGF5IiwicmVUaGlzWWVhciIsInJlWWVhcnNBZ28iLCJub3ciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFxREE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFD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QXRDLENBQVA7QUFDQSxFQWQyQjtBQWU1QkMsU0FmNEIsc0JBZWxCO0FBQ1QsU0FBTyxLQUFLTCxRQUFMLENBQWMsSUFBSVAsSUFBSixFQUFkLElBQTBCLENBQWpDO0FBQ0EsRUFqQjJCO0FBa0I1QmEsT0FsQjRCLG9CQWtCUjtBQUFBLE1BQWJDLElBQWEsdUVBQVIsT0FBUTs7QUFDbkIsTUFBSUMsUUFBTTtBQUNUQyxNQUFFLEtBQUtDLFdBQUwsRUFETztBQUVUQyxNQUFFLEtBQUtDLFFBQUwsS0FBZ0IsQ0FGVDtBQUdUaEIsTUFBRSxLQUFLaUIsT0FBTCxFQUhPO0FBSVRDLE1BQUUsS0FBS0MsUUFBTCxFQUpPO0FBS1RDLE1BQUUsS0FBS0MsVUFBTCxFQUxPO0FBTVRDLE1BQUUsS0FBS0MsVUFBTDtBQU5PLEdBQVY7QUFRQSxTQUFPWixLQUFLYSxPQUFMLENBQWEsY0FBYixFQUE2QixVQUFTQyxLQUFULEVBQWVDLElBQWYsRUFBb0I7QUFDdkQsVUFBT2QsTUFBTWMsUUFBTSxHQUFOLEdBQVlBLEtBQUszRCxXQUFMLEVBQVosR0FBaUMyRCxJQUF2QyxLQUFnRCxFQUF2RDtBQUNBLEdBRk0sQ0FBUDtBQUdBLEVBOUIyQjtBQStCNUJoRCxZQS9CNEIseUJBK0JrRDtBQUFBLE1BQWxFaUQsT0FBa0UsdUVBQTFELFVBQTBEO0FBQUEsTUFBOUNDLFVBQThDLHVFQUFuQyxRQUFtQztBQUFBLE1BQXpCQyxVQUF5Qix1RUFBZCxhQUFjOztBQUM3RSxNQUFJQyxNQUFJLElBQUlqQyxJQUFKLEVBQVI7QUFDQSxTQUFPLEtBQUthLE1BQUwsQ0FBWSxLQUFLUCxVQUFMLENBQWdCMkIsR0FBaEIsSUFBdUJILE9BQXZCLEdBQ2QsS0FBS2IsV0FBTCxNQUFvQmdCLElBQUloQixXQUFKLEVBQXBCLEdBQXdDYyxVQUF4QyxHQUFxREMsVUFEbkQsQ0FBUDtBQUVBO0FBbkMyQixDQUE3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxyXG5cclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuXHJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xyXG5pbXBvcnQgSWNvbkV4cGxvcmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9leHBsb3JlJ1xyXG5pbXBvcnQgSWNvbkxpZmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvcGVyc29uLXBpbi1jaXJjbGUnXHJcblxyXG5pbXBvcnQge1FpbGlBcHAsIFVJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge2luaXQsIFdheXBvaW50IGFzIFdheXBvaW50REJ9IGZyb20gXCIuL2RiXCJcclxuaW1wb3J0IFBob3RvVmlld2VyIGZyb20gXCIuL2NvbXBvbmVudHMvcGhvdG8tdmlld2VyXCJcclxuY29uc3Qge0NvbW1hbmRCYXIsIENvbW1lbnR9PVVJXHJcblxyXG5jbGFzcyBNYWluIGV4dGVuZHMgUWlsaUFwcHtcclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5kZWZhdWx0UHJvcHMse1xyXG5cdFx0YXBwSWQ6XCJ3ZS10cmF2ZWxcIixcclxuXHRcdHRpdGxlOlwidHJhdmVsIGFsb25nIGxpZmVcIlxyXG5cdH0pXHJcblxyXG5cdHJlbmRlckNvbnRlbnQoKXtcclxuXHRcdGxldCB7cGF0aG5hbWV9PXRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMubG9jYXRpb25cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7ekluZGV4Ojh9fVxyXG5cdFx0XHRcdFx0b25TZWxlY3Q9e2NtZD0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGNtZC50b0xvd2VyQ2FzZSgpKX1cclxuXHRcdFx0XHRcdHByaW1hcnk9e3BhdGhuYW1lPT1cIi9cIiA/IFwiL1wiIDogcGF0aG5hbWUuc3BsaXQoXCIvXCIpWzFdfVxyXG5cdFx0XHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIi9cIixpY29uOkljb25MaWZlfSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImV4cGxvcmVcIiwgaWNvbjpJY29uRXhwbG9yZX0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuW4kOWPt1wiLCBhY3Rpb246XCJteVwiLCBpY29uOkljb25BY2NvdW50fSxcclxuXHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8UGhvdG9WaWV3ZXIgcmVmPVwicGhvdG9WaWV3ZXJcIi8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0c3VwZXIuY29tcG9uZW50RGlkTW91bnQoKVxyXG5cdFx0V2F5cG9pbnREQi5vbihcInVwbG9hZFwiLCAodXBsb2FkZWQsIHN1bSwgc3RhcnRUaW1lLCBlbmRUaW1lKT0+e1xyXG5cdFx0XHRpZih1cGxvYWRlZD09c3VtKVxyXG5cdFx0XHRcdHRoaXMuc2hvd01lc3NhZ2UoYCR7c3VtfSBsb2NhdGlvbiBkYXRhIHN5bmNlZCB0byBzZXJ2ZXIgZnJvbSAke3N0YXJ0VGltZS5zbWFydEZvcm1hdCgpfSB0byAke2VuZFRpbWUuc21hcnRGb3JtYXQoKX1gKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKFFpbGlBcHAuY2hpbGRDb250ZXh0VHlwZXMse1xyXG5cdFx0dmlld1Bob3RvOiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfSlcclxuXHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcblx0XHRcdHZpZXdQaG90bzp1cmw9PnRoaXMucmVmcy5waG90b1ZpZXdlci52aWV3KHVybClcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5kZWZhdWx0UHJvcHMse1xyXG5cdFx0aW5pdCgpe1xyXG5cdFx0XHRpbml0KClcclxuXHRcdFx0V2F5cG9pbnREQi51cGxvYWQoKVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcclxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwicWlsaS1hcHAvbGliL3NldHRpbmdcIlxyXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCJxaWxpLWFwcC9saWIvdXNlci1wcm9maWxlXCJcclxuaW1wb3J0IExpZmVVSSBmcm9tIFwiLi9saWZlXCJcclxuaW1wb3J0IEV4cGxvcmVVSSBmcm9tIFwiLi9leHBsb3JlXCJcclxuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tIFwiLi9wdWJsaXNoXCJcclxuaW1wb3J0IEpvdXJuZXlVSSBmcm9tIFwiLi9qb3VybmV5XCJcclxuaW1wb3J0IEl0aW5lcmFyeVVJIGZyb20gXCIuL2l0aW5lcmFyeVwiXHJcbmltcG9ydCBJdGlEZXRhaWxVSSBmcm9tIFwiLi9pdGlkZXRhaWxcIlxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLCBmdW5jdGlvbigpIHtcclxuICBNYWluLnJlbmRlcihcclxuXHQ8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e01haW59PlxyXG5cdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtMaWZlVUl9Lz5cclxuXHRcdDxSb3V0ZSBwYXRoPVwiZXhwbG9yZVwiIGNvbXBvbmVudD17RXhwbG9yZVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cIm15XCI+XHJcblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TXlVSX0vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCIgY29tcG9uZW50PXtQcm9maWxlVUl9Lz5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJwdWJsaXNoXCIgY29tcG9uZW50PXtQdWJsaXNoVUl9PlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiam91cm5leS86X2lkXCIvPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImpvdXJuZXlcIj5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJfbmV3XCIgY29tcG9uZW50PXtKb3VybmV5VUkuQ3JlYXRvcn0vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIj5cclxuXHRcdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0pvdXJuZXlVSX0vPlxyXG5cdFx0XHRcdDxSb3V0ZSBwYXRoPVwiaXRpbmVyYXJ5XCI+XHJcblx0XHRcdFx0XHQ8SW5kZXhSb3V0ZSAgY29tcG9uZW50PXtJdGluZXJhcnlVSX0vPlxyXG5cdFx0XHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkMlwiIGNvbXBvbmVudD17SXRpRGV0YWlsVUl9Lz5cclxuXHRcdFx0XHQ8L1JvdXRlPlxyXG5cdFx0XHQ8L1JvdXRlPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxyXG5cdDwvUm91dGU+XHJcblx0KVxyXG59KTtcclxuXHJcblxyXG5PYmplY3QuYXNzaWduKERhdGUucHJvdG90eXBlLHtcclxuXHR0b0RhdGUoKXtcclxuXHRcdGxldCBkPW5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKVxyXG5cdFx0ZC5zZXRIb3VycygwLDAsMCwwKVxyXG5cdFx0cmV0dXJuIGRcclxuXHR9LFxyXG5cdGlzU2FtZURhdGUoZCl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShkKT09MFxyXG5cdH0sXHJcblx0cmVsYXRpdmUoZCl7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcigodGhpcy50b0RhdGUoKS5nZXRUaW1lKCktZC50b0RhdGUoKS5nZXRUaW1lKCkpLygyNCo2MCo2MCoxMDAwKSlcclxuXHR9LFxyXG5cdHJlbGF0aXZlRGF0ZShkYXlzKXtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSsyNCo2MCo2MCoxMDAwKmRheXMpXHJcblx0fSxcclxuXHRpc0Z1dHVyZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUobmV3IERhdGUoKSk+MFxyXG5cdH0sXHJcblx0Zm9ybWF0KHRtcGw9XCJ5LU0tZFwiKXtcclxuXHRcdGxldCB2YWx1ZT17XHJcblx0XHRcdHk6dGhpcy5nZXRGdWxsWWVhcigpLFxyXG5cdFx0XHRNOnRoaXMuZ2V0TW9udGgoKSsxLFxyXG5cdFx0XHRkOnRoaXMuZ2V0RGF0ZSgpLFxyXG5cdFx0XHRoOnRoaXMuZ2V0SG91cnMoKSxcclxuXHRcdFx0bTp0aGlzLmdldE1pbnV0ZXMoKSxcclxuXHRcdFx0czp0aGlzLmdldFNlY29uZHMoKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRtcGwucmVwbGFjZSgvKFt5bWRoc10pKy9pZywgZnVuY3Rpb24obWF0Y2gsdHlwZSl7XHJcblx0XHRcdHJldHVybiB2YWx1ZVt0eXBlIT0nTScgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiB0eXBlXSB8fCBcIlwiXHJcblx0XHR9KVxyXG5cdH0sXHJcblx0c21hcnRGb3JtYXQocmVUb2RheT1cIuS7iuWkqSBISDptbVwiLCByZVRoaXNZZWFyPVwiTU3mnIhEROaXpVwiLCByZVllYXJzQWdvPVwiWVlZWeW5tE1N5pyIRETml6VcIil7XHJcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRcdHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLmlzU2FtZURhdGUobm93KSA/IHJlVG9kYXkgOlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RnVsbFllYXIoKT09bm93LmdldEZ1bGxZZWFyKCkgPyByZVRoaXNZZWFyIDogcmVZZWFyc0FnbylcclxuXHR9XHJcbn0pXHJcbiJdfQ==