"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photo = _qiliApp.UI.Photo;

var PhotosField = function (_Component) {
	_inherits(PhotosField, _Component);

	function PhotosField() {
		_classCallCheck(this, PhotosField);

		var _this = _possibleConstructorReturn(this, (PhotosField.__proto__ || Object.getPrototypeOf(PhotosField)).apply(this, arguments));

		var defaultValue = _this.props.defaultValue;

		_this.state = {
			photos: [].concat(defaultValue || [])
		};
		return _this;
	}

	_createClass(PhotosField, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var max = _props.max;
			var iconStyle = _props.iconStyle;
			var photos = this.state.photos;

			var uiPhotos = photos.map(function (photo, i) {
				return _react2.default.createElement(Photo, _extends({ key: photo }, iconStyle, { onPhoto: function onPhoto(url) {
						return _this2.insert(url, i);
					}, src: photo }));
			});

			if (uiPhotos.length < max) uiPhotos.push(_react2.default.createElement(Photo, _extends({ ref: "photo", key: "_new" }, iconStyle, { onPhoto: function onPhoto(url) {
					return _this2.insert(url);
				} })));

			return _react2.default.createElement(
				"div",
				{ style: { textAlign: "center" } },
				uiPhotos
			);
		}
	}, {
		key: "insert",
		value: function insert(url, i) {
			var photos = this.state.photos;

			if (photos.indexOf(url) != -1) {
				this.forceUpdate();
				return;
			}
			if (i != undefined) photos.splice(i, 1, url);else this.setState({ photos: photos.concat([url]) });
		}
	}, {
		key: "focus",
		value: function focus() {
			this.refs.photo.doPhoto();
		}
	}, {
		key: "value",
		get: function get() {
			return this.state.photos;
		}
	}]);

	return PhotosField;
}(_react.Component);

PhotosField.propTypes = {
	defaultValue: _react.PropTypes.array,
	max: _react.PropTypes.number
};
PhotosField.defaultProps = {
	max: 6
};
exports.default = PhotosField;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3Rvcy1maWVsZC5qcyJdLCJuYW1lcyI6WyJQaG90byIsIlBob3Rvc0ZpZWxkIiwiYXJndW1lbnRzIiwiZGVmYXVsdFZhbHVlIiwicHJvcHMiLCJzdGF0ZSIsInBob3RvcyIsImNvbmNhdCIsIm1heCIsImljb25TdHlsZSIsInVpUGhvdG9zIiwibWFwIiwicGhvdG8iLCJpIiwiaW5zZXJ0IiwidXJsIiwibGVuZ3RoIiwicHVzaCIsInRleHRBbGlnbiIsImluZGV4T2YiLCJmb3JjZVVwZGF0ZSIsInVuZGVmaW5lZCIsInNwbGljZSIsInNldFN0YXRlIiwicmVmcyIsImRvUGhvdG8iLCJwcm9wVHlwZXMiLCJhcnJheSIsIm51bWJlciIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDT0EsSyxlQUFBQSxLOztJQUVjQyxXOzs7QUFDcEIsd0JBQWE7QUFBQTs7QUFBQSx5SEFDSEMsU0FERzs7QUFBQSxNQUVMQyxZQUZLLEdBRVMsTUFBS0MsS0FGZCxDQUVMRCxZQUZLOztBQUdaLFFBQUtFLEtBQUwsR0FBVztBQUNWQyxXQUFRLEdBQUdDLE1BQUgsQ0FBVUosZ0JBQWMsRUFBeEI7QUFERSxHQUFYO0FBSFk7QUFNWjs7OzsyQkFDTztBQUFBOztBQUFBLGdCQUNnQixLQUFLQyxLQURyQjtBQUFBLE9BQ0FJLEdBREEsVUFDQUEsR0FEQTtBQUFBLE9BQ0tDLFNBREwsVUFDS0EsU0FETDtBQUFBLE9BRUFILE1BRkEsR0FFUSxLQUFLRCxLQUZiLENBRUFDLE1BRkE7O0FBR04sT0FBSUksV0FBU0osT0FBT0ssR0FBUCxDQUFXLFVBQUNDLEtBQUQsRUFBT0MsQ0FBUDtBQUFBLFdBQ3ZCLDhCQUFDLEtBQUQsYUFBTyxLQUFLRCxLQUFaLElBQXVCSCxTQUF2QixJQUFrQyxTQUFTO0FBQUEsYUFBSyxPQUFLSyxNQUFMLENBQVlDLEdBQVosRUFBZ0JGLENBQWhCLENBQUw7QUFBQSxNQUEzQyxFQUFvRSxLQUFLRCxLQUF6RSxJQUR1QjtBQUFBLElBQVgsQ0FBYjs7QUFHSyxPQUFHRixTQUFTTSxNQUFULEdBQWdCUixHQUFuQixFQUNJRSxTQUFTTyxJQUFULENBQWUsOEJBQUMsS0FBRCxhQUFPLEtBQUksT0FBWCxFQUFtQixLQUFJLE1BQXZCLElBQWtDUixTQUFsQyxJQUE2QyxTQUFTO0FBQUEsWUFBSyxPQUFLSyxNQUFMLENBQVlDLEdBQVosQ0FBTDtBQUFBLEtBQXRELElBQWY7O0FBRVYsVUFDQztBQUFBO0FBQUEsTUFBSyxPQUFPLEVBQUNHLFdBQVUsUUFBWCxFQUFaO0FBQ0VSO0FBREYsSUFERDtBQUtBOzs7eUJBRU1LLEcsRUFBSUYsQyxFQUFFO0FBQUEsT0FDTFAsTUFESyxHQUNHLEtBQUtELEtBRFIsQ0FDTEMsTUFESzs7QUFFWixPQUFHQSxPQUFPYSxPQUFQLENBQWVKLEdBQWYsS0FBcUIsQ0FBQyxDQUF6QixFQUEyQjtBQUMxQixTQUFLSyxXQUFMO0FBQ0E7QUFDQTtBQUNELE9BQUdQLEtBQUdRLFNBQU4sRUFDQ2YsT0FBT2dCLE1BQVAsQ0FBY1QsQ0FBZCxFQUFnQixDQUFoQixFQUFrQkUsR0FBbEIsRUFERCxLQUdDLEtBQUtRLFFBQUwsQ0FBYyxFQUFDakIsUUFBT0EsT0FBT0MsTUFBUCxDQUFjLENBQUNRLEdBQUQsQ0FBZCxDQUFSLEVBQWQ7QUFDRDs7OzBCQU1NO0FBQ04sUUFBS1MsSUFBTCxDQUFVWixLQUFWLENBQWdCYSxPQUFoQjtBQUNBOzs7c0JBTlU7QUFDVixVQUFPLEtBQUtwQixLQUFMLENBQVdDLE1BQWxCO0FBQ0E7Ozs7OztBQXRDbUJMLFcsQ0E0Q2J5QixTLEdBQVU7QUFDaEJ2QixlQUFjLGlCQUFVd0IsS0FEUjtBQUVmbkIsTUFBSyxpQkFBVW9CO0FBRkEsQztBQTVDRzNCLFcsQ0FnRGI0QixZLEdBQWE7QUFDbkJyQixNQUFJO0FBRGUsQztrQkFoREFQLFciLCJmaWxlIjoicGhvdG9zLWZpZWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmNvbnN0IHtQaG90b309VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBob3Rvc0ZpZWxkIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRjb25zdCB7ZGVmYXVsdFZhbHVlfT10aGlzLnByb3BzXHJcblx0XHR0aGlzLnN0YXRlPXtcclxuXHRcdFx0cGhvdG9zOiBbXS5jb25jYXQoZGVmYXVsdFZhbHVlfHxbXSlcclxuXHRcdH1cclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7bWF4LCBpY29uU3R5bGV9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtwaG90b3N9PXRoaXMuc3RhdGVcclxuXHRcdCBsZXQgdWlQaG90b3M9cGhvdG9zLm1hcCgocGhvdG8saSk9PlxyXG5cdFx0XHQoPFBob3RvIGtleT17cGhvdG99IHsuLi5pY29uU3R5bGV9IG9uUGhvdG89e3VybD0+dGhpcy5pbnNlcnQodXJsLGkpfSBzcmM9e3Bob3RvfS8+KSlcclxuXHJcbiAgICAgICAgaWYodWlQaG90b3MubGVuZ3RoPG1heClcclxuICAgICAgICAgICAgdWlQaG90b3MucHVzaCgoPFBob3RvIHJlZj1cInBob3RvXCIga2V5PVwiX25ld1wiIHsuLi5pY29uU3R5bGV9IG9uUGhvdG89e3VybD0+dGhpcy5pbnNlcnQodXJsKX0vPikpXHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246XCJjZW50ZXJcIn19PlxyXG5cdFx0XHRcdHt1aVBob3Rvc31cclxuXHRcdFx0PC9kaXY+XHRcclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0aW5zZXJ0KHVybCxpKXtcclxuXHRcdGNvbnN0IHtwaG90b3N9PXRoaXMuc3RhdGVcclxuXHRcdGlmKHBob3Rvcy5pbmRleE9mKHVybCkhPS0xKXtcclxuXHRcdFx0dGhpcy5mb3JjZVVwZGF0ZSgpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0fVxyXG5cdFx0aWYoaSE9dW5kZWZpbmVkKVxyXG5cdFx0XHRwaG90b3Muc3BsaWNlKGksMSx1cmwpXHJcblx0XHRlbHNlXHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3Bob3RvczpwaG90b3MuY29uY2F0KFt1cmxdKX0pXHJcblx0fVxyXG5cdFxyXG5cdGdldCB2YWx1ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUucGhvdG9zXHJcblx0fVxyXG5cdFxyXG5cdGZvY3VzKCl7XHJcblx0XHR0aGlzLnJlZnMucGhvdG8uZG9QaG90bygpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xyXG5cdFx0ZGVmYXVsdFZhbHVlOiBQcm9wVHlwZXMuYXJyYXlcclxuXHRcdCxtYXg6IFByb3BUeXBlcy5udW1iZXJcclxuXHR9XHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHRtYXg6Nlx0XHJcblx0fVxyXG59Il19