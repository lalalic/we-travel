'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Subheader = require('material-ui/Subheader');

var _Subheader2 = _interopRequireDefault(_Subheader);

var _List = require('material-ui/List');

var _qiliApp = require('qili-app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = _qiliApp.UI.Loading;

var ItiDetail = function (_Component) {
	_inherits(ItiDetail, _Component);

	function ItiDetail() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, ItiDetail);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ItiDetail)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { iti: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ItiDetail, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			ItineraryDB.findOne({ _id: this.props.params._id2 }, function (iti) {
				return _this2.setState({ iti: iti });
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var iti = this.state.iti;

			if (!iti) return _react2.default.createElement(Loading, null);

			var place = iti.place;
			var days = iti.days;


			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_List.List,
					null,
					_react2.default.createElement(
						_Subheader2.default,
						null,
						place
					)
				),
				_react2.default.createElement(_qiliApp.CommandBar, { items: ["Back"] })
			);
		}
	}]);

	return ItiDetail;
}(_react.Component);

exports.default = ItiDetail;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pdGlkZXRhaWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7SUFFTzs7SUFFYzs7Ozs7Ozs7Ozs7Ozs7cU1BQ3BCLFFBQU0sRUFBQyxLQUFJLElBQUo7OztjQURhOztzQ0FHRDs7O0FBQ2xCLGVBQVksT0FBWixDQUFvQixFQUFDLEtBQUksS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixJQUFsQixFQUF6QixFQUFrRDtXQUFLLE9BQUssUUFBTCxDQUFjLEVBQUMsUUFBRCxFQUFkO0lBQUwsQ0FBbEQsQ0FEa0I7Ozs7MkJBR1g7T0FDQSxNQUFLLEtBQUssS0FBTCxDQUFMLElBREE7O0FBRVAsT0FBRyxDQUFDLEdBQUQsRUFDRixPQUFRLDhCQUFDLE9BQUQsT0FBUixDQUREOztPQUdPLFFBQWEsSUFBYixNQUxBO09BS08sT0FBTSxJQUFOLEtBTFA7OztBQU9QLFVBQ0M7OztJQUNDOzs7S0FDQzs7O01BQVksS0FBWjtNQUREO0tBREQ7SUFLQyxxREFBWSxPQUFPLENBQUMsTUFBRCxDQUFQLEVBQVosQ0FMRDtJQURELENBUE87Ozs7UUFOWSIsImZpbGUiOiJpdGlkZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFN1YmhlYWRlciBmcm9tICdtYXRlcmlhbC11aS9TdWJoZWFkZXInXHJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW19IGZyb20gJ21hdGVyaWFsLXVpL0xpc3QnXHJcblxyXG5pbXBvcnQge1VJLCBDb21tYW5kQmFyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuY29uc3Qge0xvYWRpbmd9ID0gVUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0aURldGFpbCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17aXRpOm51bGx9XHJcblx0XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdEl0aW5lcmFyeURCLmZpbmRPbmUoe19pZDp0aGlzLnByb3BzLnBhcmFtcy5faWQyfSwgaXRpPT50aGlzLnNldFN0YXRlKHtpdGl9KSlcclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7aXRpfT10aGlzLnN0YXRlXHJcblx0XHRpZighaXRpKVxyXG5cdFx0XHRyZXR1cm4gKDxMb2FkaW5nLz4pXHJcblx0XHRcclxuXHRcdGNvbnN0IHtwbGFjZSwgZGF5c309aXRpXHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PExpc3Q+XHJcblx0XHRcdFx0XHQ8U3ViaGVhZGVyPntwbGFjZX08L1N1YmhlYWRlcj5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdDwvTGlzdD5cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBpdGVtcz17W1wiQmFja1wiXX0vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn0iXX0=