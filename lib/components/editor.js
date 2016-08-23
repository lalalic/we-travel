"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _noteAdd = require("material-ui/svg-icons/action/note-add");

var _noteAdd2 = _interopRequireDefault(_noteAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photo = _qiliApp.UI.Photo;

var Editor = function (_Component) {
    _inherits(Editor, _Component);

    function Editor() {
        _classCallCheck(this, Editor);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).apply(this, arguments));
    }

    _createClass(Editor, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var readonly = _props.readonly;
            var _props$content = _props.content;
            var content = _props$content === undefined ? {} : _props$content;

            if (readonly) return this.readonly(content);

            var desc = content.desc;
            var _content$photos = content.photos;
            var photos = _content$photos === undefined ? [] : _content$photos;
            var styles = { iconRatio: 2 / 3, iconSize: { width: 50, height: 50 } };
            var i = 0;
            var uiPhotos = photos.map(function (photo) {
                var _this2 = this;

                return _react2.default.createElement(Photo, _extends({ key: photo }, styles, {
                    onPhoto: function onPhoto(url) {
                        return _this2.onPhoto(url, i++);
                    },
                    src: photo }));
            });

            if (uiPhotos.length < 9) uiPhotos.push(_react2.default.createElement(Photo, _extends({}, styles, { onPhoto: this.onPhoto.bind(this), key: Date.now() })));

            return _react2.default.createElement(
                "div",
                { className: "section" },
                _react2.default.createElement(
                    "div",
                    { style: { textAlign: "center" } },
                    uiPhotos
                ),
                _react2.default.createElement("textarea", {
                    style: { width: "100%", border: 0, height: 100, fontSize: 12 },
                    placeholder: "��һ�̵��뷨",
                    onChange: function onChange(e) {
                        return content.desc = e.target.value;
                    },
                    defaultValue: desc })
            );
        }
    }, {
        key: "readonly",
        value: function readonly(content) {
            var desc = content.desc;
            var _content$photos2 = content.photos;
            var photos = _content$photos2 === undefined ? [] : _content$photos2;
            var createdAt = content.createdAt;

            return _react2.default.createElement(
                "div",
                { className: "readonly" },
                _react2.default.createElement(
                    "p",
                    null,
                    photos.map(function (photo) {
                        return _react2.default.createElement("img", { key: photo, src: photo });
                    }),
                    desc,
                    _react2.default.createElement(
                        "time",
                        null,
                        createdAt
                    )
                )
            );
        }
    }, {
        key: "onPhoto",
        value: function onPhoto(url, index) {
            var content = this.props.content;

            if (content.photos.indexOf(url) != -1) {
                this.forceUpdate();
                return;
            }

            if (index != undefined) content.photos.splice(index, 1, url);else {
                content.photos.push(url);
                this.forceUpdate();
            }
        }
    }]);

    return Editor;
}(_react.Component);

exports.default = Editor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkaXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRU87O0lBRWM7Ozs7Ozs7Ozs7O2lDQUNUO3lCQUNzQixLQUFLLEtBQUwsQ0FEdEI7Z0JBQ0MsMkJBREQ7d0NBQ1UsUUFEVjtnQkFDVSx5Q0FBUSxvQkFEbEI7O0FBRUosZ0JBQUcsUUFBSCxFQUNJLE9BQU8sS0FBSyxRQUFMLENBQWMsT0FBZCxDQUFQLENBREo7O2dCQUdLLE9BQWlCLFFBQWpCLEtBTEQ7a0NBS2tCLFFBQVgsT0FMUDtBQUtBLGdCQUFPLHlDQUFPLG9CQUFkLENBTEE7QUFNQSx5QkFBTyxFQUFDLFdBQVUsSUFBRSxDQUFGLEVBQUssVUFBUyxFQUFDLE9BQU0sRUFBTixFQUFVLFFBQU8sRUFBUCxFQUFwQixFQUF2QixDQU5BO0FBT0Esb0JBQUUsQ0FBRixDQVBBO0FBUUEsMkJBQVMsT0FBTyxHQUFQLENBQVcsVUFBUyxLQUFULEVBQWU7OztBQUMvQix1QkFBUSw4QkFBQyxLQUFELGFBQU8sS0FBSyxLQUFMLElBQWdCO0FBQzNCLDZCQUFTLGlCQUFDLEdBQUQ7K0JBQU8sT0FBSyxPQUFMLENBQWEsR0FBYixFQUFpQixHQUFqQjtxQkFBUDtBQUNULHlCQUFLLEtBQUwsR0FGSSxDQUFSLENBRCtCO2FBQWYsQ0FBcEIsQ0FSQTs7QUFjSixnQkFBRyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsRUFDQyxTQUFTLElBQVQsQ0FBZSw4QkFBQyxLQUFELGVBQVcsVUFBUSxTQUFTLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBVCxFQUFrQyxLQUFLLEtBQUssR0FBTCxFQUFMLEdBQXJELENBQWYsRUFESjs7QUFHQSxtQkFDSTs7a0JBQUssV0FBVSxTQUFWLEVBQUw7Z0JBQ0k7O3NCQUFLLE9BQU8sRUFBQyxXQUFVLFFBQVYsRUFBUixFQUFMO29CQUFtQyxRQUFuQztpQkFESjtnQkFFSTtBQUNJLDJCQUFPLEVBQUMsT0FBTSxNQUFOLEVBQWEsUUFBTyxDQUFQLEVBQVMsUUFBTyxHQUFQLEVBQVksVUFBUyxFQUFULEVBQTFDO0FBQ0EsaUNBQVksVUFBWjtBQUNBLDhCQUFVLGtCQUFDLENBQUQ7K0JBQUssUUFBUSxJQUFSLEdBQWEsRUFBRSxNQUFGLENBQVMsS0FBVDtxQkFBbEI7QUFDVixrQ0FBYyxJQUFkLEVBSkosQ0FGSjthQURKLENBakJJOzs7O2lDQTZCQyxTQUFRO2dCQUNSLE9BQTRCLFFBQTVCLEtBRFE7bUNBQ29CLFFBQXRCLE9BREU7Z0JBQ0YsMENBQU8sc0JBREw7Z0JBQ1MsWUFBVyxRQUFYLFVBRFQ7O0FBRWIsbUJBQ0k7O2tCQUFLLFdBQVUsVUFBVixFQUFMO2dCQUNJOzs7b0JBQ0ssT0FBTyxHQUFQLENBQVcsVUFBQyxLQUFEOytCQUFVLHVDQUFLLEtBQUssS0FBTCxFQUFZLEtBQUssS0FBTCxFQUFqQjtxQkFBVixDQURoQjtvQkFFSyxJQUZMO29CQUVVOzs7d0JBQU8sU0FBUDtxQkFGVjtpQkFESjthQURKLENBRmE7Ozs7Z0NBWVQsS0FBSyxPQUFNO2dCQUNWLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFEVTs7QUFFZixnQkFBRyxRQUFRLE1BQVIsQ0FBZSxPQUFmLENBQXVCLEdBQXZCLEtBQTZCLENBQUMsQ0FBRCxFQUFHO0FBQy9CLHFCQUFLLFdBQUwsR0FEK0I7QUFFL0IsdUJBRitCO2FBQW5DOztBQUtBLGdCQUFHLFNBQU8sU0FBUCxFQUNDLFFBQVEsTUFBUixDQUFlLE1BQWYsQ0FBc0IsS0FBdEIsRUFBNEIsQ0FBNUIsRUFBOEIsR0FBOUIsRUFESixLQUVJO0FBQ0Esd0JBQVEsTUFBUixDQUFlLElBQWYsQ0FBb0IsR0FBcEIsRUFEQTtBQUVBLHFCQUFLLFdBQUwsR0FGQTthQUZKOzs7O1dBakRhIiwiZmlsZSI6ImVkaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuXHJcbmltcG9ydCBBZGRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL25vdGUtYWRkXCJcclxuXHJcbmNvbnN0IHtQaG90b309VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXRvciBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHZhciB7cmVhZG9ubHksY29udGVudD17fX09dGhpcy5wcm9wcztcclxuICAgICAgICBpZihyZWFkb25seSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZG9ubHkoY29udGVudClcclxuXHJcbiAgICAgICAgdmFyIHtkZXNjLCBwaG90b3M9W119PWNvbnRlbnQsXHJcbiAgICAgICAgICAgIHN0eWxlcz17aWNvblJhdGlvOjIvMywgaWNvblNpemU6e3dpZHRoOjUwLCBoZWlnaHQ6NTB9fSxcclxuICAgICAgICAgICAgaT0wLFxyXG4gICAgICAgICAgICB1aVBob3Rvcz1waG90b3MubWFwKGZ1bmN0aW9uKHBob3RvKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoPFBob3RvIGtleT17cGhvdG99IHsuLi5zdHlsZXN9XHJcbiAgICAgICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9PnRoaXMub25QaG90byh1cmwsaSsrKX1cclxuICAgICAgICAgICAgICAgICAgICBzcmM9e3Bob3RvfS8+KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICBpZih1aVBob3Rvcy5sZW5ndGg8OSlcclxuICAgICAgICAgICAgdWlQaG90b3MucHVzaCgoPFBob3RvIHsuLi5zdHlsZXN9IG9uUGhvdG89e3RoaXMub25QaG90by5iaW5kKHRoaXMpfSBrZXk9e0RhdGUubm93KCl9Lz4pKVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t0ZXh0QWxpZ246XCJjZW50ZXJcIn19Pnt1aVBob3Rvc308L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7d2lkdGg6XCIxMDAlXCIsYm9yZGVyOjAsaGVpZ2h0OjEwMCwgZm9udFNpemU6MTJ9fVxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi77+977+90rvvv73Mte+/ve+/veu3qFwiXHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKT0+Y29udGVudC5kZXNjPWUudGFyZ2V0LnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVzY30vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgcmVhZG9ubHkoY29udGVudCl7XHJcbiAgICAgICAgdmFyIHtkZXNjLCBwaG90b3M9W10sIGNyZWF0ZWRBdH09Y29udGVudFxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVhZG9ubHlcIj5cclxuICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgIHtwaG90b3MubWFwKChwaG90byk9Pig8aW1nIGtleT17cGhvdG99IHNyYz17cGhvdG99Lz4pKX1cclxuICAgICAgICAgICAgICAgICAgICB7ZGVzY308dGltZT57Y3JlYXRlZEF0fTwvdGltZT5cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIG9uUGhvdG8odXJsLCBpbmRleCl7XHJcbiAgICAgICAgdmFyIHtjb250ZW50fT10aGlzLnByb3BzXHJcbiAgICAgICAgaWYoY29udGVudC5waG90b3MuaW5kZXhPZih1cmwpIT0tMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGluZGV4IT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGNvbnRlbnQucGhvdG9zLnNwbGljZShpbmRleCwxLHVybClcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb250ZW50LnBob3Rvcy5wdXNoKHVybClcclxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==