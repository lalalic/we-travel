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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_searchTextField2.default, { fullWidth: true, hintText: '查找别人的旅途经验' }),
				_react2.default.createElement(
					Empty,
					{ icon: _react2.default.createElement(_directionsWalk2.default, null) },
					'发现新旅程'
				)
			);
		}
	}]);

	return _class;
}(_react.Component);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9leHBsb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7SUFDTzs7Ozs7Ozs7Ozs7OzsyQkFHRTtBQUNQLFVBQ0M7OztJQUNDLDJEQUFRLFdBQVcsSUFBWCxFQUFpQixVQUFTLFdBQVQsRUFBekIsQ0FERDtJQUVDO0FBQUMsVUFBRDtPQUFPLE1BQU0sNkRBQU4sRUFBUDs7S0FGRDtJQURELENBRE8iLCJmaWxlIjoiZXhwbG9yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCdcclxuXHJcbmltcG9ydCBMb2dvIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL2RpcmVjdGlvbnMtd2FsaydcclxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuXHJcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hUZXh0RmllbGRcIlxyXG5jb25zdCB7RW1wdHl9PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PFNlYXJjaCBmdWxsV2lkdGg9e3RydWV9IGhpbnRUZXh0PVwi5p+l5om+5Yir5Lq655qE5peF6YCU57uP6aqMXCIvPlxyXG5cdFx0XHRcdDxFbXB0eSBpY29uPXs8TG9nby8+fT7lj5HnjrDmlrDml4XnqIs8L0VtcHR5PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuIl19