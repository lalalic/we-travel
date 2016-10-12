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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PhotoViewer).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLXZpZXdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNwQixVQURvQixXQUNwQixHQUFhO3dCQURPLGFBQ1A7O3FFQURPLHlCQUVWLFlBREc7O0FBRVosUUFBSyxLQUFMLEdBQVc7QUFDVixTQUFNLEtBQU47QUFDQSxRQUFLLE1BQUssS0FBTCxDQUFXLEdBQVg7R0FGTixDQUZZOztFQUFiOztjQURvQjs7MkJBUVo7OztnQkFDVyxLQUFLLEtBQUwsQ0FEWDtPQUNBLG1CQURBO09BQ00saUJBRE47O0FBRVAsVUFDQzs7O0FBQ0MsV0FBTSxJQUFOO0FBQ0EscUJBQWdCO2FBQUcsT0FBSyxRQUFMLENBQWMsRUFBQyxNQUFLLEtBQUwsRUFBWSxLQUFJLElBQUosRUFBM0I7TUFBSCxFQUZqQjtJQUdDLHVDQUFLLEtBQUssR0FBTCxFQUFMLENBSEQ7SUFERCxDQUZPOzs7O3VCQVdILEtBQUk7QUFDUixRQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssSUFBTCxFQUFXLFFBQVosRUFBZCxFQURROzs7O1FBbkJXIiwiZmlsZSI6InBob3RvLXZpZXdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7RGlhbG9nfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGhvdG9WaWV3ZXIgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuc3RhdGU9e1xyXG5cdFx0XHRvcGVuOiBmYWxzZSxcclxuXHRcdFx0dXJsOiB0aGlzLnByb3BzLnVybFxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtvcGVuLCB1cmx9PXRoaXMuc3RhdGVcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxEaWFsb2dcclxuXHRcdFx0XHRvcGVuPXtvcGVufSBcclxuXHRcdFx0XHRvblJlcXVlc3RDbG9zZT17ZT0+dGhpcy5zZXRTdGF0ZSh7b3BlbjpmYWxzZSwgdXJsOm51bGx9KX0+XHJcblx0XHRcdFx0PGltZyBzcmM9e3VybH0vPlxyXG5cdFx0XHQ8L0RpYWxvZz5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0dmlldyh1cmwpe1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7b3Blbjp0cnVlLCB1cmx9KVxyXG5cdH1cclxufSJdfQ==