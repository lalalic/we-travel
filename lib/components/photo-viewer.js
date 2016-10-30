"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotoViewer = function (_Component) {
	_inherits(PhotoViewer, _Component);

	function PhotoViewer() {
		_classCallCheck(this, PhotoViewer);

		var _this = _possibleConstructorReturn(this, (PhotoViewer.__proto__ || Object.getPrototypeOf(PhotoViewer)).apply(this, arguments));

		_this.state = {
			open: false,
			url: _this.props.url
		};
		return _this;
	}

	_createClass(PhotoViewer, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _state = this.state;
			var open = _state.open;
			var url = _state.url;

			return _react2.default.createElement(
				_materialUi.Dialog,
				{
					open: open,
					onRequestClose: function onRequestClose(e) {
						return _this2.setState({ open: false, url: null });
					} },
				_react2.default.createElement("img", { src: url })
			);
		}
	}, {
		key: "view",
		value: function view(url) {
			this.setState({ open: true, url: url });
		}
	}]);

	return PhotoViewer;
}(_react.Component);

exports.default = PhotoViewer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLXZpZXdlci5qcyJdLCJuYW1lcyI6WyJQaG90b1ZpZXdlciIsImFyZ3VtZW50cyIsInN0YXRlIiwib3BlbiIsInVybCIsInByb3BzIiwic2V0U3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsVzs7O0FBQ3BCLHdCQUFhO0FBQUE7O0FBQUEseUhBQ0hDLFNBREc7O0FBRVosUUFBS0MsS0FBTCxHQUFXO0FBQ1ZDLFNBQU0sS0FESTtBQUVWQyxRQUFLLE1BQUtDLEtBQUwsQ0FBV0Q7QUFGTixHQUFYO0FBRlk7QUFNWjs7OzsyQkFDTztBQUFBOztBQUFBLGdCQUNXLEtBQUtGLEtBRGhCO0FBQUEsT0FDQUMsSUFEQSxVQUNBQSxJQURBO0FBQUEsT0FDTUMsR0FETixVQUNNQSxHQUROOztBQUVQLFVBQ0M7QUFBQTtBQUFBO0FBQ0MsV0FBTUQsSUFEUDtBQUVDLHFCQUFnQjtBQUFBLGFBQUcsT0FBS0csUUFBTCxDQUFjLEVBQUNILE1BQUssS0FBTixFQUFhQyxLQUFJLElBQWpCLEVBQWQsQ0FBSDtBQUFBLE1BRmpCO0FBR0MsMkNBQUssS0FBS0EsR0FBVjtBQUhELElBREQ7QUFPQTs7O3VCQUVJQSxHLEVBQUk7QUFDUixRQUFLRSxRQUFMLENBQWMsRUFBQ0gsTUFBSyxJQUFOLEVBQVlDLFFBQVosRUFBZDtBQUNBOzs7Ozs7a0JBckJtQkosVyIsImZpbGUiOiJwaG90by12aWV3ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQge0RpYWxvZ30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBob3RvVmlld2VyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnN0YXRlPXtcclxuXHRcdFx0b3BlbjogZmFsc2UsXHJcblx0XHRcdHVybDogdGhpcy5wcm9wcy51cmxcclxuXHRcdH1cclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7b3BlbiwgdXJsfT10aGlzLnN0YXRlXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8RGlhbG9nXHJcblx0XHRcdFx0b3Blbj17b3Blbn0gXHJcblx0XHRcdFx0b25SZXF1ZXN0Q2xvc2U9e2U9PnRoaXMuc2V0U3RhdGUoe29wZW46ZmFsc2UsIHVybDpudWxsfSl9PlxyXG5cdFx0XHRcdDxpbWcgc3JjPXt1cmx9Lz5cclxuXHRcdFx0PC9EaWFsb2c+XHJcblx0XHQpXHJcblx0fVxyXG5cdFxyXG5cdHZpZXcodXJsKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe29wZW46dHJ1ZSwgdXJsfSlcclxuXHR9XHJcbn0iXX0=