'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _directionsWalk = require('material-ui/svg-icons/maps/directions-walk');

var _directionsWalk2 = _interopRequireDefault(_directionsWalk);

var _qiliApp = require('qili-app');

var _searchTextField = require('./components/searchTextField');

var _searchTextField2 = _interopRequireDefault(_searchTextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;

var _class = function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_searchTextField2.default, { fullWidth: true, hintText: '\u67E5\u627E\u522B\u4EBA\u7684\u65C5\u9014\u7ECF\u9A8C' }),
				_react2.default.createElement(
					Empty,
					{ icon: _react2.default.createElement(_directionsWalk2.default, null) },
					'\u53D1\u73B0\u65B0\u65C5\u7A0B'
				)
			);
		}
	}]);

	return _class;
}(_react.Component);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHBsb3JlLmpzIl0sIm5hbWVzIjpbIkVtcHR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0lBQ09BLEssZUFBQUEsSzs7Ozs7Ozs7Ozs7OzsyQkFHRTtBQUNQLFVBQ0M7QUFBQTtBQUFBO0FBQ0MsK0RBQVEsV0FBVyxJQUFuQixFQUF5QixVQUFTLHdEQUFsQyxHQUREO0FBRUM7QUFBQyxVQUFEO0FBQUEsT0FBTyxNQUFNLDZEQUFiO0FBQUE7QUFBQTtBQUZELElBREQ7QUFNQSIsImZpbGUiOiJleHBsb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xyXG5cclxuaW1wb3J0IExvZ28gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL21hcHMvZGlyZWN0aW9ucy13YWxrJ1xyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9jb21wb25lbnRzL3NlYXJjaFRleHRGaWVsZFwiXHJcbmNvbnN0IHtFbXB0eX09VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8U2VhcmNoIGZ1bGxXaWR0aD17dHJ1ZX0gaGludFRleHQ9XCLmn6Xmib7liKvkurrnmoTml4XpgJTnu4/pqoxcIi8+XHJcblx0XHRcdFx0PEVtcHR5IGljb249ezxMb2dvLz59PuWPkeeOsOaWsOaXheeoizwvRW1wdHk+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG4iXX0=