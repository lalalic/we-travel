"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

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


var Main = (0, _reactRedux.connect)()((_temp = _class = function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var pathname = this.props.children.props.location.pathname;

			return _react2.default.createElement(
				_qiliApp.QiliApp,
				null,
				this.props.children,
				_react2.default.createElement(CommandBar, { className: "footbar", style: { zIndex: 8 },
					onSelect: function onSelect(cmd) {
						return _this2.context.router.push(cmd.toLowerCase());
					},
					primary: pathname == "/" ? "/" : pathname.split("/")[1],
					items: [{ label: "我", action: "/", icon: _react2.default.createElement(_personPinCircle2.default, null) }, { label: "发现", action: "explore", icon: _react2.default.createElement(_explore2.default, null) }, { label: "帐号", action: "my", icon: _react2.default.createElement(_accountBox2.default, null) }] }),
				_react2.default.createElement(_photoViewer2.default, { ref: "photoViewer" })
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this3 = this;

			_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "componentDidMount", this).call(this);
			_db.Waypoint.on("upload", function (uploaded, sum, startTime, endTime) {
				if (uploaded == sum) _this3.showMessage(sum + " location data synced to server from " + startTime.smartFormat() + " to " + endTime.smartFormat());
			});
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var _this4 = this;

			return Object.assign(_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "getChildContext", this).call(this), {
				viewPhoto: function viewPhoto(url) {
					return _this4.refs.photoViewer.view(url);
				}
			});
		}
	}]);

	return _class;
}(Component), _class.defaultProps = Object.assign(_qiliApp.QiliApp.defaultProps, {
	appId: "we-travel",
	title: "travel along life"
}), _class.childContextTypes = Object.assign(_qiliApp.QiliApp.childContextTypes, {
	viewPhoto: _react.PropTypes.func
}), _class.defaultProps = Object.assign(_qiliApp.QiliApp.defaultProps, {
	init: function init() {
		(0, _db.init)();
		_db.Waypoint.upload();
	}
}), _temp));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiQ29tbWFuZEJhciIsIkNvbW1lbnQiLCJNYWluIiwicGF0aG5hbWUiLCJwcm9wcyIsImNoaWxkcmVuIiwibG9jYXRpb24iLCJ6SW5kZXgiLCJjb250ZXh0Iiwicm91dGVyIiwicHVzaCIsImNtZCIsInRvTG93ZXJDYXNlIiwic3BsaXQiLCJsYWJlbCIsImFjdGlvbiIsImljb24iLCJvbiIsInVwbG9hZGVkIiwic3VtIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsInNob3dNZXNzYWdlIiwic21hcnRGb3JtYXQiLCJPYmplY3QiLCJhc3NpZ24iLCJ2aWV3UGhvdG8iLCJyZWZzIiwicGhvdG9WaWV3ZXIiLCJ2aWV3IiwidXJsIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiYXBwSWQiLCJ0aXRsZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiZnVuYyIsImluaXQiLCJ1cGxvYWQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJDcmVhdG9yIiwiRGF0ZSIsInByb3RvdHlwZSIsInRvRGF0ZSIsImQiLCJnZXRUaW1lIiwic2V0SG91cnMiLCJpc1NhbWVEYXRlIiwicmVsYXRpdmUiLCJNYXRoIiwiZmxvb3IiLCJyZWxhdGl2ZURhdGUiLCJkYXlzIiwiaXNGdXR1cmUiLCJmb3JtYXQiLCJ0bXBsIiwidmFsdWUiLCJ5IiwiZ2V0RnVsbFllYXIiLCJNIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiaCIsImdldEhvdXJzIiwibSIsImdldE1pbnV0ZXMiLCJzIiwiZ2V0U2Vjb25kcyIsInJlcGxhY2UiLCJtYXRjaCIsInR5cGUiLCJyZVRvZGF5IiwicmVUaGlzWWVhciIsInJlWWVhcnNBZ28iLCJub3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQXVEQTs7OztBQUNBOzs7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d0NjLFVBQXhDLEdBQXFEQyxVQURuRCxDQUFQO0FBRUE7QUFuQzJCLENBQTdCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXHJcblxyXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGV9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcclxuaW1wb3J0IEljb25FeHBsb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZXhwbG9yZSdcclxuaW1wb3J0IEljb25MaWZlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL3BlcnNvbi1waW4tY2lyY2xlJ1xyXG5cclxuaW1wb3J0IHtRaWxpQXBwLCBVSSwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtpbml0LCBXYXlwb2ludCBhcyBXYXlwb2ludERCfSBmcm9tIFwiLi9kYlwiXHJcbmltcG9ydCBQaG90b1ZpZXdlciBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvLXZpZXdlclwiXHJcbmNvbnN0IHtDb21tYW5kQmFyLCBDb21tZW50fT1VSVxyXG5cclxuXHJcbmNvbnN0IE1haW49Y29ubmVjdCgpKFxyXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5kZWZhdWx0UHJvcHMse1xyXG5cdFx0YXBwSWQ6XCJ3ZS10cmF2ZWxcIixcclxuXHRcdHRpdGxlOlwidHJhdmVsIGFsb25nIGxpZmVcIlxyXG5cdH0pXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0bGV0IHtwYXRobmFtZX09dGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5sb2NhdGlvblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFFpbGlBcHA+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7ekluZGV4Ojh9fVxyXG5cdFx0XHRcdFx0b25TZWxlY3Q9e2NtZD0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGNtZC50b0xvd2VyQ2FzZSgpKX1cclxuXHRcdFx0XHRcdHByaW1hcnk9e3BhdGhuYW1lPT1cIi9cIiA/IFwiL1wiIDogcGF0aG5hbWUuc3BsaXQoXCIvXCIpWzFdfVxyXG5cdFx0XHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIi9cIixpY29uOjxJY29uTGlmZS8+fSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImV4cGxvcmVcIiwgaWNvbjo8SWNvbkV4cGxvcmUvPn0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuW4kOWPt1wiLCBhY3Rpb246XCJteVwiLCBpY29uOjxJY29uQWNjb3VudC8+fSxcclxuXHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8UGhvdG9WaWV3ZXIgcmVmPVwicGhvdG9WaWV3ZXJcIi8+XHJcblx0XHRcdDwvUWlsaUFwcD5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRzdXBlci5jb21wb25lbnREaWRNb3VudCgpXHJcblx0XHRXYXlwb2ludERCLm9uKFwidXBsb2FkXCIsICh1cGxvYWRlZCwgc3VtLCBzdGFydFRpbWUsIGVuZFRpbWUpPT57XHJcblx0XHRcdGlmKHVwbG9hZGVkPT1zdW0pXHJcblx0XHRcdFx0dGhpcy5zaG93TWVzc2FnZShgJHtzdW19IGxvY2F0aW9uIGRhdGEgc3luY2VkIHRvIHNlcnZlciBmcm9tICR7c3RhcnRUaW1lLnNtYXJ0Rm9ybWF0KCl9IHRvICR7ZW5kVGltZS5zbWFydEZvcm1hdCgpfWApXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5jaGlsZENvbnRleHRUeXBlcyx7XHJcblx0XHR2aWV3UGhvdG86IFByb3BUeXBlcy5mdW5jXHJcbiAgICB9KVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcclxuXHRcdFx0dmlld1Bob3RvOnVybD0+dGhpcy5yZWZzLnBob3RvVmlld2VyLnZpZXcodXJsKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmRlZmF1bHRQcm9wcyx7XHJcblx0XHRpbml0KCl7XHJcblx0XHRcdGluaXQoKVxyXG5cdFx0XHRXYXlwb2ludERCLnVwbG9hZCgpXHJcblx0XHR9XHJcblx0fSlcclxufSlcclxuXHJcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcclxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwicWlsaS1hcHAvbGliL3NldHRpbmdcIlxyXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCJxaWxpLWFwcC9saWIvdXNlci1wcm9maWxlXCJcclxuaW1wb3J0IExpZmVVSSBmcm9tIFwiLi9saWZlXCJcclxuaW1wb3J0IEV4cGxvcmVVSSBmcm9tIFwiLi9leHBsb3JlXCJcclxuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tIFwiLi9wdWJsaXNoXCJcclxuaW1wb3J0IEpvdXJuZXlVSSBmcm9tIFwiLi9qb3VybmV5XCJcclxuaW1wb3J0IEl0aW5lcmFyeVVJIGZyb20gXCIuL2l0aW5lcmFyeVwiXHJcbmltcG9ydCBJdGlEZXRhaWxVSSBmcm9tIFwiLi9pdGlkZXRhaWxcIlxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLCBmdW5jdGlvbigpIHtcclxuICBNYWluLnJlbmRlcihcclxuXHQ8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e01haW59PlxyXG5cdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtMaWZlVUl9Lz5cclxuXHRcdDxSb3V0ZSBwYXRoPVwiZXhwbG9yZVwiIGNvbXBvbmVudD17RXhwbG9yZVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cIm15XCI+XHJcblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TXlVSX0vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCIgY29tcG9uZW50PXtQcm9maWxlVUl9Lz5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJwdWJsaXNoXCIgY29tcG9uZW50PXtQdWJsaXNoVUl9PlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiam91cm5leS86X2lkXCIvPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImpvdXJuZXlcIj5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJfbmV3XCIgY29tcG9uZW50PXtKb3VybmV5VUkuQ3JlYXRvcn0vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIj5cclxuXHRcdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0pvdXJuZXlVSX0vPlxyXG5cdFx0XHRcdDxSb3V0ZSBwYXRoPVwiaXRpbmVyYXJ5XCI+XHJcblx0XHRcdFx0XHQ8SW5kZXhSb3V0ZSAgY29tcG9uZW50PXtJdGluZXJhcnlVSX0vPlxyXG5cdFx0XHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkMlwiIGNvbXBvbmVudD17SXRpRGV0YWlsVUl9Lz5cclxuXHRcdFx0XHQ8L1JvdXRlPlxyXG5cdFx0XHQ8L1JvdXRlPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxyXG5cdDwvUm91dGU+XHJcblx0KVxyXG59KTtcclxuXHJcblxyXG5PYmplY3QuYXNzaWduKERhdGUucHJvdG90eXBlLHtcclxuXHR0b0RhdGUoKXtcclxuXHRcdGxldCBkPW5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKVxyXG5cdFx0ZC5zZXRIb3VycygwLDAsMCwwKVxyXG5cdFx0cmV0dXJuIGRcclxuXHR9LFxyXG5cdGlzU2FtZURhdGUoZCl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShkKT09MFxyXG5cdH0sXHJcblx0cmVsYXRpdmUoZCl7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcigodGhpcy50b0RhdGUoKS5nZXRUaW1lKCktZC50b0RhdGUoKS5nZXRUaW1lKCkpLygyNCo2MCo2MCoxMDAwKSlcclxuXHR9LFxyXG5cdHJlbGF0aXZlRGF0ZShkYXlzKXtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSsyNCo2MCo2MCoxMDAwKmRheXMpXHJcblx0fSxcclxuXHRpc0Z1dHVyZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUobmV3IERhdGUoKSk+MFxyXG5cdH0sXHJcblx0Zm9ybWF0KHRtcGw9XCJ5LU0tZFwiKXtcclxuXHRcdGxldCB2YWx1ZT17XHJcblx0XHRcdHk6dGhpcy5nZXRGdWxsWWVhcigpLFxyXG5cdFx0XHRNOnRoaXMuZ2V0TW9udGgoKSsxLFxyXG5cdFx0XHRkOnRoaXMuZ2V0RGF0ZSgpLFxyXG5cdFx0XHRoOnRoaXMuZ2V0SG91cnMoKSxcclxuXHRcdFx0bTp0aGlzLmdldE1pbnV0ZXMoKSxcclxuXHRcdFx0czp0aGlzLmdldFNlY29uZHMoKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRtcGwucmVwbGFjZSgvKFt5bWRoc10pKy9pZywgZnVuY3Rpb24obWF0Y2gsdHlwZSl7XHJcblx0XHRcdHJldHVybiB2YWx1ZVt0eXBlIT0nTScgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiB0eXBlXSB8fCBcIlwiXHJcblx0XHR9KVxyXG5cdH0sXHJcblx0c21hcnRGb3JtYXQocmVUb2RheT1cIuS7iuWkqSBISDptbVwiLCByZVRoaXNZZWFyPVwiTU3mnIhEROaXpVwiLCByZVllYXJzQWdvPVwiWVlZWeW5tE1N5pyIRETml6VcIil7XHJcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRcdHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLmlzU2FtZURhdGUobm93KSA/IHJlVG9kYXkgOlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RnVsbFllYXIoKT09bm93LmdldEZ1bGxZZWFyKCkgPyByZVRoaXNZZWFyIDogcmVZZWFyc0FnbylcclxuXHR9XHJcbn0pXHJcbiJdfQ==