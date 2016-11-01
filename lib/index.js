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
							if (uploaded == sum) refApp && refApp.getWrappedInstance().showMessage(sum + " location data synced to server from " + startTime.smartFormat() + " to " + endTime.smartFormat());
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
//# sourceMappingURL=data:application/json;base64,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OEJBQXRCLENBRkQ7RUFHQzs7S0FBTyxNQUFLLElBQUwsRUFBUDtHQUNDLHlEQUFZLHlCQUFaLENBREQ7R0FFQyxvREFBTyxNQUFLLFNBQUwsRUFBZSw4QkFBdEIsQ0FGRDtHQUdDLG9EQUFPLE1BQUssU0FBTCxFQUFlLGtDQUF0QixDQUhEO0dBSEQ7RUFTQzs7S0FBTyxNQUFLLFNBQUwsRUFBZSw4QkFBdEI7R0FDQyw0REFERDtHQUVDLG9EQUFPLE1BQUssY0FBTCxFQUFQLENBRkQ7R0FURDtFQWNDOztLQUFPLE1BQUssU0FBTCxFQUFQO0dBQ0Msb0RBQU8sTUFBSyxNQUFMLEVBQVksV0FBVyxrQkFBVSxPQUFWLEVBQTlCLENBREQ7R0FFQzs7TUFBTyxNQUFLLE1BQUwsRUFBUDtJQUNDLHlEQUFZLDhCQUFaLENBREQ7SUFFQzs7T0FBTyxNQUFLLFdBQUwsRUFBUDtLQUNDLHlEQUFhLGdDQUFiLENBREQ7S0FFQyxvREFBTyxNQUFLLE9BQUwsRUFBYSxnQ0FBcEIsQ0FGRDtLQUZEO0lBRkQ7R0FkRDtFQXlCQyxvREFBTyxNQUFLLG9CQUFMLEVBQTBCLFdBQVcsT0FBWCxFQUFqQyxDQXpCRDtFQURDLEVBNEJBLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBaUIsZUFBTyxPQUFQLEVBQWUsa0JBQVUsT0FBVixDQTVCaEMsRUFEa0Q7Q0FBWCxDQUF6QyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxyXG5cclxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGV9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcclxuaW1wb3J0IEljb25FeHBsb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZXhwbG9yZSdcclxuaW1wb3J0IEljb25MaWZlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL3BlcnNvbi1waW4tY2lyY2xlJ1xyXG5cclxuaW1wb3J0IHtRaWxpQXBwLCBVSSwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtpbml0LCBXYXlwb2ludCBhcyBXYXlwb2ludERCfSBmcm9tIFwiLi9kYlwiXHJcbmltcG9ydCBQaG90b1ZpZXdlciBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvLXZpZXdlclwiXHJcbmNvbnN0IHtDb21tYW5kQmFyLCBDb21tZW50fT1VSVxyXG5cclxuY29uc3QgRE9NQUlOPSdtYWluJ1xyXG5jb25zdCBJTklUX1NUQVRFPXt9XHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUkVEVUNFUj17XHJcblx0W0RPTUFJTl06KHN0YXRlPUlOSVRfU1RBVEUse3R5cGUscGF5bG9hZH0pPT57XHJcblx0XHRzd2l0Y2godHlwZSl7XHJcblxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHN0YXRlXHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBNYWluPWNvbm5lY3QoKShcclxuY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7c2VydmljZSwgcm91dGVyfT10aGlzLnByb3BzXHJcblx0XHRsZXQge3BhdGhuYW1lfT10aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLmxvY2F0aW9uXHJcblx0XHRsZXQgcmVmQXBwXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8UWlsaUFwcCBcclxuXHRcdFx0XHRhcHBJZD1cIndlLXRyYXZlbFwiIFxyXG5cdFx0XHRcdHJlZj17YT0+cmVmQXBwPWF9XHJcblx0XHRcdFx0dGl0bGU9XCJ0cmF2ZWwgYWxvbmcgbGlmZVwiXHJcblx0XHRcdFx0aW5pdD17YT0+e1xyXG5cdFx0XHRcdFx0aW5pdCgpO1xyXG5cdFx0XHRcdFx0V2F5cG9pbnREQi5vbihcInVwbG9hZFwiLCAodXBsb2FkZWQsIHN1bSwgc3RhcnRUaW1lLCBlbmRUaW1lKT0+e1xyXG5cdFx0XHRcdFx0XHRpZih1cGxvYWRlZD09c3VtKVxyXG5cdFx0XHRcdFx0XHRcdHJlZkFwcCAmJiByZWZBcHAuZ2V0V3JhcHBlZEluc3RhbmNlKCkuc2hvd01lc3NhZ2UoYCR7c3VtfSBsb2NhdGlvbiBkYXRhIHN5bmNlZCB0byBzZXJ2ZXIgZnJvbSAke3N0YXJ0VGltZS5zbWFydEZvcm1hdCgpfSB0byAke2VuZFRpbWUuc21hcnRGb3JtYXQoKX1gKVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFdheXBvaW50REIudXBsb2FkKCk7XHJcblx0XHRcdFx0fX0+XHJcblxyXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6OH19XHJcblx0XHRcdFx0XHRwcmltYXJ5PXtwYXRobmFtZT09XCIvXCIgPyBcIi9cIiA6IHBhdGhuYW1lLnNwbGl0KFwiL1wiKVsxXX1cclxuXHRcdFx0XHRcdGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCIvXCIsaWNvbjo8SWNvbkxpZmUvPiBcclxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6YT0+cm91dGVyLnB1c2goXCIvXCIpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0LHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJleHBsb3JlXCIsIGljb246PEljb25FeHBsb3JlLz5cclxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6YT0+cm91dGVyLnB1c2goXCIvZXhwbG9yZVwiKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCx7bGFiZWw6XCLluJDlj7dcIiwgYWN0aW9uOlwibXlcIiwgaWNvbjo8SWNvbkFjY291bnQvPlxyXG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDphPT5yb3V0ZXIucHVzaChcIi9teVwiKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PFBob3RvVmlld2VyIHJlZj1cInBob3RvVmlld2VyXCIvPlxyXG5cdFx0XHQ8L1FpbGlBcHA+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0c2hvd01lc3NhZ2U6IFByb3BUeXBlcy5mdW5jXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xyXG5cdFx0dmlld1Bob3RvOiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfVxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHZpZXdQaG90bzp1cmw9PnRoaXMucmVmcy5waG90b1ZpZXdlci52aWV3KHVybClcclxuXHRcdH1cclxuXHR9XHJcbn0pXHJcblxyXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXHJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcInFpbGktYXBwL2xpYi9zZXR0aW5nXCJcclxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwicWlsaS1hcHAvbGliL3VzZXItcHJvZmlsZVwiXHJcbmltcG9ydCBMaWZlVUkgZnJvbSBcIi4vbGlmZVwiXHJcbmltcG9ydCBFeHBsb3JlVUkgZnJvbSBcIi4vZXhwbG9yZVwiXHJcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSBcIi4vcHVibGlzaFwiXHJcbmltcG9ydCBKb3VybmV5VUkgZnJvbSBcIi4vam91cm5leVwiXHJcbmltcG9ydCBJdGluZXJhcnlVSSBmcm9tIFwiLi9pdGluZXJhcnlcIlxyXG5pbXBvcnQgSXRpRGV0YWlsVUkgZnJvbSBcIi4vaXRpZGV0YWlsXCJcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgZnVuY3Rpb24oKSB7XHJcbiAgUWlsaUFwcC5yZW5kZXIoXHJcblx0PFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtNYWlufT5cclxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17TGlmZVVJfS8+XHJcblx0XHQ8Um91dGUgcGF0aD1cImV4cGxvcmVcIiBjb21wb25lbnQ9e0V4cGxvcmVVSX0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e015VUl9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cclxuXHRcdFx0PEluZGV4Um91dGUvPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImpvdXJuZXkvOl9pZFwiLz5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJqb3VybmV5XCI+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiX25ld1wiIGNvbXBvbmVudD17Sm91cm5leVVJLkNyZWF0b3J9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkXCI+XHJcblx0XHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtKb3VybmV5VUl9Lz5cclxuXHRcdFx0XHQ8Um91dGUgcGF0aD1cIml0aW5lcmFyeVwiPlxyXG5cdFx0XHRcdFx0PEluZGV4Um91dGUgIGNvbXBvbmVudD17SXRpbmVyYXJ5VUl9Lz5cclxuXHRcdFx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZDJcIiBjb21wb25lbnQ9e0l0aURldGFpbFVJfS8+XHJcblx0XHRcdFx0PC9Sb3V0ZT5cclxuXHRcdFx0PC9Sb3V0ZT5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0NvbW1lbnR9Lz5cclxuXHQ8L1JvdXRlPlxyXG5cdCxPYmplY3QuYXNzaWduKHt9LExpZmVVSS5SRURVQ0VSLEpvdXJuZXlVSS5SRURVQ0VSKSlcclxufSk7XHJcblxyXG4iXX0=