"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.REDUCER = exports.ACTION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('../style/index.less');

var CommandBar = _qiliApp.UI.CommandBar;
var Comment = _qiliApp.UI.Comment;


var DOMAIN = 'main';
var INIT_STATE = {};
var ACTION = exports.ACTION = {};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length <= 0 || arguments[0] === undefined ? INIT_STATE : arguments[0];
	var _ref = arguments[1];
	var type = _ref.type;
	var payload = _ref.payload;

	switch (type) {}
	return state;
});

var Main = (0, _reactRedux.connect)()((_temp = _class = function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "render",
		value: function render() {
			var _props = this.props;
			var service = _props.service;
			var router = _props.router;
			var pathname = this.props.children.props.location.pathname;

			var refApp = void 0;
			return _react2.default.createElement(
				_qiliApp.QiliApp,
				{
					appId: "we-travel",
					ref: function ref(a) {
						return refApp = a;
					},
					title: "travel along life",
					init: function init(a) {
						(0, _db.init)();
						_db.Waypoint.on("upload", function (uploaded, sum, startTime, endTime) {
							if (uploaded == sum) refApp && refApp.showMessage(sum + " location data synced to server from " + startTime.smartFormat() + " to " + endTime.smartFormat());
						});
						_db.Waypoint.upload();
					} },
				this.props.children,
				_react2.default.createElement(CommandBar, { className: "footbar", style: { zIndex: 8 },
					primary: pathname == "/" ? "/" : pathname.split("/")[1],
					items: [{ label: "我", action: "/", icon: _react2.default.createElement(_personPinCircle2.default, null),
						onSelect: function onSelect(a) {
							return router.push("/");
						}
					}, { label: "发现", action: "explore", icon: _react2.default.createElement(_explore2.default, null),
						onSelect: function onSelect(a) {
							return router.push("/explore");
						}
					}, { label: "帐号", action: "my", icon: _react2.default.createElement(_accountBox2.default, null),
						onSelect: function onSelect(a) {
							return router.push("/my");
						}
					}] }),
				_react2.default.createElement(_photoViewer2.default, { ref: "photoViewer" })
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var _this2 = this;

			return {
				viewPhoto: function viewPhoto(url) {
					return _this2.refs.photoViewer.view(url);
				}
			};
		}
	}]);

	return _class;
}(_react.Component), _class.contextTypes = {
	showMessage: _react.PropTypes.func
}, _class.childContextTypes = {
	viewPhoto: _react.PropTypes.func
}, _temp));

document.addEventListener('deviceready', function () {
	_qiliApp.QiliApp.render(_react2.default.createElement(
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
	), Object.assign({}, _life2.default.REDUCER, _journey2.default.REDUCER));
});
//# sourceMappingURL=data:application/json;base64,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QUdDOztLQUFPLE1BQUssSUFBTCxFQUFQO0dBQ0MseURBQVkseUJBQVosQ0FERDtHQUVDLG9EQUFPLE1BQUssU0FBTCxFQUFlLDhCQUF0QixDQUZEO0dBR0Msb0RBQU8sTUFBSyxTQUFMLEVBQWUsa0NBQXRCLENBSEQ7R0FIRDtFQVNDOztLQUFPLE1BQUssU0FBTCxFQUFlLDhCQUF0QjtHQUNDLDREQUREO0dBRUMsb0RBQU8sTUFBSyxjQUFMLEVBQVAsQ0FGRDtHQVREO0VBY0M7O0tBQU8sTUFBSyxTQUFMLEVBQVA7R0FDQyxvREFBTyxNQUFLLE1BQUwsRUFBWSxXQUFXLGtCQUFVLE9BQVYsRUFBOUIsQ0FERDtHQUVDOztNQUFPLE1BQUssTUFBTCxFQUFQO0lBQ0MseURBQVksOEJBQVosQ0FERDtJQUVDOztPQUFPLE1BQUssV0FBTCxFQUFQO0tBQ0MseURBQWEsZ0NBQWIsQ0FERDtLQUVDLG9EQUFPLE1BQUssT0FBTCxFQUFhLGdDQUFwQixDQUZEO0tBRkQ7SUFGRDtHQWREO0VBeUJDLG9EQUFPLE1BQUssb0JBQUwsRUFBMEIsV0FBVyxPQUFYLEVBQWpDLENBekJEO0VBREMsRUE0QkEsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFpQixlQUFPLE9BQVAsRUFBZSxrQkFBVSxPQUFWLENBNUJoQyxFQURrRDtDQUFYLENBQXpDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXHJcblxyXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xyXG5pbXBvcnQgSWNvbkV4cGxvcmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9leHBsb3JlJ1xyXG5pbXBvcnQgSWNvbkxpZmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvcGVyc29uLXBpbi1jaXJjbGUnXHJcblxyXG5pbXBvcnQge1FpbGlBcHAsIFVJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge2luaXQsIFdheXBvaW50IGFzIFdheXBvaW50REJ9IGZyb20gXCIuL2RiXCJcclxuaW1wb3J0IFBob3RvVmlld2VyIGZyb20gXCIuL2NvbXBvbmVudHMvcGhvdG8tdmlld2VyXCJcclxuY29uc3Qge0NvbW1hbmRCYXIsIENvbW1lbnR9PVVJXHJcblxyXG5jb25zdCBET01BSU49J21haW4nXHJcbmNvbnN0IElOSVRfU1RBVEU9e31cclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcclxuXHRbRE9NQUlOXTooc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9PntcclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3RhdGVcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IE1haW49Y29ubmVjdCgpKFxyXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtzZXJ2aWNlLCByb3V0ZXJ9PXRoaXMucHJvcHNcclxuXHRcdGxldCB7cGF0aG5hbWV9PXRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMubG9jYXRpb25cclxuXHRcdGxldCByZWZBcHBcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxRaWxpQXBwIFxyXG5cdFx0XHRcdGFwcElkPVwid2UtdHJhdmVsXCIgXHJcblx0XHRcdFx0cmVmPXthPT5yZWZBcHA9YX1cclxuXHRcdFx0XHR0aXRsZT1cInRyYXZlbCBhbG9uZyBsaWZlXCJcclxuXHRcdFx0XHRpbml0PXthPT57XHJcblx0XHRcdFx0XHRpbml0KCk7XHJcblx0XHRcdFx0XHRXYXlwb2ludERCLm9uKFwidXBsb2FkXCIsICh1cGxvYWRlZCwgc3VtLCBzdGFydFRpbWUsIGVuZFRpbWUpPT57XHJcblx0XHRcdFx0XHRcdGlmKHVwbG9hZGVkPT1zdW0pXHJcblx0XHRcdFx0XHRcdFx0cmVmQXBwICYmIHJlZkFwcC5zaG93TWVzc2FnZShgJHtzdW19IGxvY2F0aW9uIGRhdGEgc3luY2VkIHRvIHNlcnZlciBmcm9tICR7c3RhcnRUaW1lLnNtYXJ0Rm9ybWF0KCl9IHRvICR7ZW5kVGltZS5zbWFydEZvcm1hdCgpfWApXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0V2F5cG9pbnREQi51cGxvYWQoKTtcclxuXHRcdFx0XHR9fT5cclxuXHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBzdHlsZT17e3pJbmRleDo4fX1cclxuXHRcdFx0XHRcdHByaW1hcnk9e3BhdGhuYW1lPT1cIi9cIiA/IFwiL1wiIDogcGF0aG5hbWUuc3BsaXQoXCIvXCIpWzFdfVxyXG5cdFx0XHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIi9cIixpY29uOjxJY29uTGlmZS8+IFxyXG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDphPT5yb3V0ZXIucHVzaChcIi9cIilcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQse2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImV4cGxvcmVcIiwgaWNvbjo8SWNvbkV4cGxvcmUvPlxyXG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDphPT5yb3V0ZXIucHVzaChcIi9leHBsb3JlXCIpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0LHtsYWJlbDpcIuW4kOWPt1wiLCBhY3Rpb246XCJteVwiLCBpY29uOjxJY29uQWNjb3VudC8+XHJcblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PnJvdXRlci5wdXNoKFwiL215XCIpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8UGhvdG9WaWV3ZXIgcmVmPVwicGhvdG9WaWV3ZXJcIi8+XHJcblx0XHRcdDwvUWlsaUFwcD5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRzaG93TWVzc2FnZTogUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XHJcblx0XHR2aWV3UGhvdG86IFByb3BUeXBlcy5mdW5jXHJcbiAgICB9XHJcblxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dmlld1Bob3RvOnVybD0+dGhpcy5yZWZzLnBob3RvVmlld2VyLnZpZXcodXJsKVxyXG5cdFx0fVxyXG5cdH1cclxufSlcclxuXHJcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcclxuaW1wb3J0IFNldHRpbmdVSSBmcm9tIFwicWlsaS1hcHAvbGliL3NldHRpbmdcIlxyXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCJxaWxpLWFwcC9saWIvdXNlci1wcm9maWxlXCJcclxuaW1wb3J0IExpZmVVSSBmcm9tIFwiLi9saWZlXCJcclxuaW1wb3J0IEV4cGxvcmVVSSBmcm9tIFwiLi9leHBsb3JlXCJcclxuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tIFwiLi9wdWJsaXNoXCJcclxuaW1wb3J0IEpvdXJuZXlVSSBmcm9tIFwiLi9qb3VybmV5XCJcclxuaW1wb3J0IEl0aW5lcmFyeVVJIGZyb20gXCIuL2l0aW5lcmFyeVwiXHJcbmltcG9ydCBJdGlEZXRhaWxVSSBmcm9tIFwiLi9pdGlkZXRhaWxcIlxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLCBmdW5jdGlvbigpIHtcclxuICBRaWxpQXBwLnJlbmRlcihcclxuXHQ8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e01haW59PlxyXG5cdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtMaWZlVUl9Lz5cclxuXHRcdDxSb3V0ZSBwYXRoPVwiZXhwbG9yZVwiIGNvbXBvbmVudD17RXhwbG9yZVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cIm15XCI+XHJcblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TXlVSX0vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCIgY29tcG9uZW50PXtQcm9maWxlVUl9Lz5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJwdWJsaXNoXCIgY29tcG9uZW50PXtQdWJsaXNoVUl9PlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiam91cm5leS86X2lkXCIvPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImpvdXJuZXlcIj5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJfbmV3XCIgY29tcG9uZW50PXtKb3VybmV5VUkuQ3JlYXRvcn0vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIj5cclxuXHRcdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0pvdXJuZXlVSX0vPlxyXG5cdFx0XHRcdDxSb3V0ZSBwYXRoPVwiaXRpbmVyYXJ5XCI+XHJcblx0XHRcdFx0XHQ8SW5kZXhSb3V0ZSAgY29tcG9uZW50PXtJdGluZXJhcnlVSX0vPlxyXG5cdFx0XHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkMlwiIGNvbXBvbmVudD17SXRpRGV0YWlsVUl9Lz5cclxuXHRcdFx0XHQ8L1JvdXRlPlxyXG5cdFx0XHQ8L1JvdXRlPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxyXG5cdDwvUm91dGU+XHJcblx0LE9iamVjdC5hc3NpZ24oe30sTGlmZVVJLlJFRFVDRVIsSm91cm5leVVJLlJFRFVDRVIpKVxyXG59KTtcclxuXHJcbiJdfQ==