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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUNBOzs7O0FBNENBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUE3REEsUUFBUSxxQkFBUjs7SUFZTztJQUFZOztJQUViOzs7Ozs7Ozs7OztrQ0FNVTs7O09BQ1QsV0FBVSxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXBCLENBQTBCLFFBQTFCLENBQVYsU0FEUzs7QUFFZCxVQUNDOzs7SUFDRSxLQUFLLEtBQUwsQ0FBVyxRQUFYO0lBQ0QsOEJBQUMsVUFBRCxJQUFZLFdBQVUsU0FBVixFQUFvQixPQUFPLEVBQUMsUUFBTyxDQUFQLEVBQVI7QUFDL0IsZUFBVTthQUFLLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsSUFBSSxXQUFKLEVBQXpCO01BQUw7QUFDVixjQUFTLFlBQVUsR0FBVixHQUFnQixHQUFoQixHQUFzQixTQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLENBQXBCLENBQXRCO0FBQ1QsWUFBTyxDQUNOLEVBQUMsT0FBTSxHQUFOLEVBQVcsUUFBTyxHQUFQLEVBQVcsK0JBQXZCLEVBRE0sRUFFTixFQUFDLE9BQU0sSUFBTixFQUFZLFFBQU8sU0FBUCxFQUFrQix1QkFBL0IsRUFGTSxFQUdOLEVBQUMsT0FBTSxJQUFOLEVBQVksUUFBTyxJQUFQLEVBQWEsMEJBQTFCLEVBSE0sQ0FBUCxFQUhELENBRkQ7SUFVQyx1REFBYSxLQUFJLGFBQUosRUFBYixDQVZEO0lBREQsQ0FGYzs7OztvQ0FzQkU7OztBQUNoQixVQUFPLE9BQU8sTUFBUCw0QkE3Qkgsb0RBNkJHLEVBQXNDO0FBQzVDLGVBQVU7WUFBSyxPQUFLLElBQUwsQ0FBVSxXQUFWLENBQXNCLElBQXRCLENBQTJCLEdBQTNCO0tBQUw7SUFESixDQUFQLENBRGdCOzs7O1FBNUJaOzs7S0FDRSxlQUFhLE9BQU8sTUFBUCxDQUFjLGlCQUFRLFlBQVIsRUFBcUI7QUFDdEQsUUFBTSxXQUFOO0FBQ0EsUUFBTSxtQkFBTjtDQUZtQjtBQURmLEtBd0JFLG9CQUFrQixPQUFPLE1BQVAsQ0FBYyxpQkFBUSxpQkFBUixFQUEwQjtBQUNoRSxZQUFXLGlCQUFVLElBQVY7Q0FEYTtBQXhCcEIsS0FrQ0UsZUFBYSxPQUFPLE1BQVAsQ0FBYyxpQkFBUSxZQUFSLEVBQXFCO0FBQ3RELE9BQUssaUJBQUc7QUFDUCxrQkFETztFQUFIO0NBRGM7OztBQWVyQixTQUFTLGdCQUFULENBQTBCLGFBQTFCLEVBQXlDLFlBQVc7QUFDbEQsTUFBSyxNQUFMLENBQ0Q7O0lBQU8sTUFBSyxHQUFMLEVBQVMsV0FBVyxJQUFYLEVBQWhCO0VBQ0MseURBQVksMkJBQVosQ0FERDtFQUVDLG9EQUFPLE1BQUssU0FBTCxFQUFlLDhCQUF0QixDQUZEO0VBR0M7O0tBQU8sTUFBSyxJQUFMLEVBQVA7R0FDQyx5REFBWSx5QkFBWixDQUREO0dBRUMsb0RBQU8sTUFBSyxTQUFMLEVBQWUsOEJBQXRCLENBRkQ7R0FHQyxvREFBTyxNQUFLLFNBQUwsRUFBZSxrQ0FBdEIsQ0FIRDtHQUhEO0VBU0Msb0RBQU8sTUFBSyxTQUFMLEVBQWUsOEJBQXRCLENBVEQ7RUFXQzs7S0FBTyxNQUFLLFNBQUwsRUFBUDtHQUNDLG9EQUFPLE1BQUssTUFBTCxFQUFZLFdBQVcsa0JBQVUsT0FBVixFQUE5QixDQUREO0dBRUMsb0RBQU8sTUFBSyxNQUFMLEVBQVksOEJBQW5CLENBRkQ7R0FYRDtFQWdCQyxvREFBTyxNQUFLLG9CQUFMLEVBQTBCLFdBQVcsT0FBWCxFQUFqQyxDQWhCRDtFQURDLEVBRGtEO0NBQVgsQ0FBekM7O0FBd0JBLE9BQU8sTUFBUCxDQUFjLEtBQUssU0FBTCxFQUFlO0FBQzVCLDJCQUFRO0FBQ1AsTUFBSSxJQUFFLElBQUksSUFBSixDQUFTLEtBQUssT0FBTCxFQUFULENBQUYsQ0FERztBQUVQLElBQUUsUUFBRixDQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUZPO0FBR1AsU0FBTyxDQUFQLENBSE87RUFEb0I7QUFNNUIsaUNBQVcsR0FBRTtBQUNaLFNBQU8sS0FBSyxRQUFMLENBQWMsQ0FBZCxLQUFrQixDQUFsQixDQURLO0VBTmU7QUFTNUIsNkJBQVMsR0FBRTtBQUNWLFNBQU8sS0FBSyxLQUFMLENBQVcsQ0FBQyxLQUFLLE1BQUwsR0FBYyxPQUFkLEtBQXdCLEVBQUUsTUFBRixHQUFXLE9BQVgsRUFBeEIsQ0FBRCxJQUFnRCxLQUFHLEVBQUgsR0FBTSxFQUFOLEdBQVMsSUFBVCxDQUFoRCxDQUFsQixDQURVO0VBVGlCO0FBWTVCLHFDQUFhLE1BQUs7QUFDakIsU0FBTyxJQUFJLElBQUosQ0FBUyxLQUFLLE9BQUwsS0FBZSxLQUFHLEVBQUgsR0FBTSxFQUFOLEdBQVMsSUFBVCxHQUFjLElBQWQsQ0FBL0IsQ0FEaUI7RUFaVTtBQWU1QiwrQkFBVTtBQUNULFNBQU8sS0FBSyxRQUFMLENBQWMsSUFBSSxJQUFKLEVBQWQsSUFBMEIsQ0FBMUIsQ0FERTtFQWZrQjtBQWtCNUIsMkJBQW9CO01BQWIsNkRBQUssdUJBQVE7O0FBQ25CLE1BQUksUUFBTTtBQUNULE1BQUUsS0FBSyxXQUFMLEVBQUY7QUFDQSxNQUFFLEtBQUssUUFBTCxLQUFnQixDQUFoQjtBQUNGLE1BQUUsS0FBSyxPQUFMLEVBQUY7QUFDQSxNQUFFLEtBQUssUUFBTCxFQUFGO0FBQ0EsTUFBRSxLQUFLLFVBQUwsRUFBRjtBQUNBLE1BQUUsS0FBSyxVQUFMLEVBQUY7R0FORyxDQURlO0FBU25CLFNBQU8sS0FBSyxPQUFMLENBQWEsY0FBYixFQUE2QixVQUFTLEtBQVQsRUFBZSxJQUFmLEVBQW9CO0FBQ3ZELFVBQU8sTUFBTSxRQUFNLEdBQU4sR0FBWSxLQUFLLFdBQUwsRUFBWixHQUFpQyxJQUFqQyxDQUFOLElBQWdELEVBQWhELENBRGdEO0dBQXBCLENBQXBDLENBVG1CO0VBbEJRO0FBK0I1QixxQ0FBOEU7TUFBbEUsZ0VBQVEsMEJBQTBEO01BQTlDLG1FQUFXLHdCQUFtQztNQUF6QixtRUFBVyw2QkFBYzs7QUFDN0UsTUFBSSxNQUFJLElBQUksSUFBSixFQUFKLENBRHlFO0FBRTdFLFNBQU8sS0FBSyxNQUFMLENBQVksS0FBSyxVQUFMLENBQWdCLEdBQWhCLElBQXVCLE9BQXZCLEdBQ2QsS0FBSyxXQUFMLE1BQW9CLElBQUksV0FBSixFQUFwQixHQUF3QyxVQUF4QyxHQUFxRCxVQUFyRCxDQURMLENBRjZFO0VBL0JsRDtDQUE3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxyXG5cclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuXHJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xyXG5pbXBvcnQgSWNvbkV4cGxvcmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9leHBsb3JlJ1xyXG5pbXBvcnQgSWNvbkxpZmUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvcGVyc29uLXBpbi1jaXJjbGUnXHJcblxyXG5pbXBvcnQge1FpbGlBcHAsIFVJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge2luaXQsIExvY2F0aW9uIGFzIExvY2F0aW9uREJ9IGZyb20gXCIuL2RiXCJcclxuaW1wb3J0IFBob3RvVmlld2VyIGZyb20gXCIuL2NvbXBvbmVudHMvcGhvdG8tdmlld2VyXCJcclxuY29uc3Qge0NvbW1hbmRCYXIsIENvbW1lbnR9PVVJXHJcblxyXG5jbGFzcyBNYWluIGV4dGVuZHMgUWlsaUFwcHtcclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oUWlsaUFwcC5kZWZhdWx0UHJvcHMse1xyXG5cdFx0YXBwSWQ6XCJ3ZS10cmF2ZWxcIixcclxuXHRcdHRpdGxlOlwidHJhdmVsIGFsb25nIGxpZmVcIlxyXG5cdH0pXHJcblxyXG5cdHJlbmRlckNvbnRlbnQoKXtcclxuXHRcdGxldCB7cGF0aG5hbWV9PXRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMubG9jYXRpb25cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7ekluZGV4Ojh9fVxyXG5cdFx0XHRcdFx0b25TZWxlY3Q9e2NtZD0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGNtZC50b0xvd2VyQ2FzZSgpKX1cclxuXHRcdFx0XHRcdHByaW1hcnk9e3BhdGhuYW1lPT1cIi9cIiA/IFwiL1wiIDogcGF0aG5hbWUuc3BsaXQoXCIvXCIpWzFdfVxyXG5cdFx0XHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIi9cIixpY29uOkljb25MaWZlfSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImV4cGxvcmVcIiwgaWNvbjpJY29uRXhwbG9yZX0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuW4kOWPt1wiLCBhY3Rpb246XCJteVwiLCBpY29uOkljb25BY2NvdW50fSxcclxuXHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHQ8UGhvdG9WaWV3ZXIgcmVmPVwicGhvdG9WaWV3ZXJcIi8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbihRaWxpQXBwLmNoaWxkQ29udGV4dFR5cGVzLHtcclxuXHRcdHZpZXdQaG90bzogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH0pXHJcblx0XHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XHJcblx0XHRcdHZpZXdQaG90bzp1cmw9PnRoaXMucmVmcy5waG90b1ZpZXdlci52aWV3KHVybClcclxuXHRcdH0pXHJcblx0fSBcclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKFFpbGlBcHAuZGVmYXVsdFByb3BzLHtcclxuXHRcdGluaXQ6YT0+e1xyXG5cdFx0XHRpbml0KClcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5pbXBvcnQgTXlVSSBmcm9tIFwiLi9teVwiXHJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcInFpbGktYXBwL2xpYi9zZXR0aW5nXCJcclxuaW1wb3J0IFByb2ZpbGVVSSBmcm9tIFwicWlsaS1hcHAvbGliL3VzZXItcHJvZmlsZVwiXHJcbmltcG9ydCBMaWZlVUkgZnJvbSBcIi4vbGlmZVwiXHJcbmltcG9ydCBFeHBsb3JlVUkgZnJvbSBcIi4vZXhwbG9yZVwiXHJcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSBcIi4vcHVibGlzaFwiXHJcbmltcG9ydCBKb3VybmV5VUkgZnJvbSBcIi4vam91cm5leVwiXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsIGZ1bmN0aW9uKCkge1xyXG4gIE1haW4ucmVuZGVyKFxyXG5cdDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17TWFpbn0+XHJcblx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0xpZmVVSX0vPlxyXG5cdFx0PFJvdXRlIHBhdGg9XCJleHBsb3JlXCIgY29tcG9uZW50PXtFeHBsb3JlVUl9Lz5cclxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIj5cclxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0vPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0vPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwiam91cm5leVwiPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cIl9uZXdcIiBjb21wb25lbnQ9e0pvdXJuZXlVSS5DcmVhdG9yfS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZFwiIGNvbXBvbmVudD17Sm91cm5leVVJfS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cdFx0XHJcblx0XHQ8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxyXG5cdDwvUm91dGU+XHJcblx0KVxyXG59KTtcclxuXHJcblxyXG5PYmplY3QuYXNzaWduKERhdGUucHJvdG90eXBlLHtcclxuXHR0b0RhdGUoKXtcclxuXHRcdGxldCBkPW5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKVxyXG5cdFx0ZC5zZXRIb3VycygwLDAsMCwwKVxyXG5cdFx0cmV0dXJuIGRcclxuXHR9LFxyXG5cdGlzU2FtZURhdGUoZCl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShkKT09MFxyXG5cdH0sXHJcblx0cmVsYXRpdmUoZCl7XHJcblx0XHRyZXR1cm4gTWF0aC5mbG9vcigodGhpcy50b0RhdGUoKS5nZXRUaW1lKCktZC50b0RhdGUoKS5nZXRUaW1lKCkpLygyNCo2MCo2MCoxMDAwKSlcclxuXHR9LFxyXG5cdHJlbGF0aXZlRGF0ZShkYXlzKXtcclxuXHRcdHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldFRpbWUoKSsyNCo2MCo2MCoxMDAwKmRheXMpXHJcblx0fSxcclxuXHRpc0Z1dHVyZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpdmUobmV3IERhdGUoKSk+MFxyXG5cdH0sXHJcblx0Zm9ybWF0KHRtcGw9XCJ5LU0tZFwiKXtcclxuXHRcdGxldCB2YWx1ZT17XHJcblx0XHRcdHk6dGhpcy5nZXRGdWxsWWVhcigpLFxyXG5cdFx0XHRNOnRoaXMuZ2V0TW9udGgoKSsxLFxyXG5cdFx0XHRkOnRoaXMuZ2V0RGF0ZSgpLFxyXG5cdFx0XHRoOnRoaXMuZ2V0SG91cnMoKSxcclxuXHRcdFx0bTp0aGlzLmdldE1pbnV0ZXMoKSxcclxuXHRcdFx0czp0aGlzLmdldFNlY29uZHMoKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRtcGwucmVwbGFjZSgvKFt5bWRoc10pKy9pZywgZnVuY3Rpb24obWF0Y2gsdHlwZSl7XHJcblx0XHRcdHJldHVybiB2YWx1ZVt0eXBlIT0nTScgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiB0eXBlXSB8fCBcIlwiXHJcblx0XHR9KVxyXG5cdH0sXHJcblx0c21hcnRGb3JtYXQocmVUb2RheT1cIuS7iuWkqSBISDptbVwiLCByZVRoaXNZZWFyPVwiTU3mnIhEROaXpVwiLCByZVllYXJzQWdvPVwiWVlZWeW5tE1N5pyIRETml6VcIil7XHJcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRcdHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLmlzU2FtZURhdGUobm93KSA/IHJlVG9kYXkgOlxyXG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0RnVsbFllYXIoKT09bm93LmdldEZ1bGxZZWFyKCkgPyByZVRoaXNZZWFyIDogcmVZZWFyc0FnbylcclxuXHR9XHJcbn0pXHJcbiJdfQ==