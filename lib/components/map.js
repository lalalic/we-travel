"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaiduMap = function (_React$Component) {
    _inherits(BaiduMap, _React$Component);

    function BaiduMap() {
        _classCallCheck(this, BaiduMap);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaiduMap).apply(this, arguments));

        _this.state = {
            waypoints: null
        };
        return _this;
    }

    _createClass(BaiduMap, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this._map = new BMap.Map(this.props.id);
            this._map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
            this._local = new BMap.LocalSearch(this._map, {
                renderOptions: { map: this._map },
                onInfoHtmlSet: function onInfoHtmlSet(poi) {
                    if (typeof _this2.props.onSelect === 'function') {
                        _this2.props.onSelect(poi.marker.getPosition());
                    }
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", _extends({ id: this.props.id }, this.props));
        }
    }, {
        key: "search",
        value: function search(text) {
            this._local.search(text);
        }
    }]);

    return BaiduMap;
}(_react2.default.Component);

BaiduMap.propTypes = {
    id: _react2.default.PropTypes.string,
    onSelect: _react2.default.PropTypes.func
};
exports.default = BaiduMap;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLFFBQ2pCLEdBQWE7OEJBREksVUFDSjs7MkVBREksc0JBRUosWUFEQTs7QUFFVCxjQUFLLEtBQUwsR0FBVztBQUNQLHVCQUFVLElBQVY7U0FESixDQUZTOztLQUFiOztpQkFEaUI7OzRDQU9HOzs7QUFDaEIsaUJBQUssSUFBTCxHQUFZLElBQUksS0FBSyxHQUFMLENBQVMsS0FBSyxLQUFMLENBQVcsRUFBWCxDQUF6QixDQURnQjtBQUVoQixpQkFBSyxJQUFMLENBQVUsYUFBVixDQUF3QixJQUFJLEtBQUssS0FBTCxDQUFXLE9BQWYsRUFBd0IsTUFBeEIsQ0FBeEIsRUFBeUQsRUFBekQsRUFGZ0I7QUFHaEIsaUJBQUssTUFBTCxHQUFjLElBQUksS0FBSyxXQUFMLENBQWlCLEtBQUssSUFBTCxFQUFXO0FBQzFDLCtCQUFlLEVBQUUsS0FBSyxLQUFLLElBQUwsRUFBdEI7QUFDQSwrQkFBZSw0QkFBTztBQUNsQix3QkFBSSxPQUFPLE9BQUssS0FBTCxDQUFXLFFBQVgsS0FBd0IsVUFBL0IsRUFBMkM7QUFDM0MsK0JBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsSUFBSSxNQUFKLENBQVcsV0FBWCxFQUFwQixFQUQyQztxQkFBL0M7aUJBRFc7YUFGTCxDQUFkLENBSGdCOzs7O2lDQWFYO0FBQ0wsbUJBQU8sZ0RBQUssSUFBSSxLQUFLLEtBQUwsQ0FBVyxFQUFYLElBQW1CLEtBQUssS0FBTCxDQUE1QixDQUFQLENBREs7Ozs7K0JBSUYsTUFBTTtBQUNULGlCQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLElBQW5CLEVBRFM7Ozs7V0F4Qkk7RUFBaUIsZ0JBQU0sU0FBTjs7QUFBakIsU0E0QlYsWUFBWTtBQUNmLFFBQUksZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNKLGNBQVUsZ0JBQU0sU0FBTixDQUFnQixJQUFoQjs7a0JBOUJHIiwiZmlsZSI6Im1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWlkdU1hcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIHdheXBvaW50czpudWxsXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuX21hcCA9IG5ldyBCTWFwLk1hcCh0aGlzLnByb3BzLmlkKTtcbiAgICAgICAgdGhpcy5fbWFwLmNlbnRlckFuZFpvb20obmV3IEJNYXAuUG9pbnQoMTE2LjQwNCwgMzkuOTE1KSwgMTEpO1xuICAgICAgICB0aGlzLl9sb2NhbCA9IG5ldyBCTWFwLkxvY2FsU2VhcmNoKHRoaXMuX21hcCwge1xuICAgICAgICAgICAgcmVuZGVyT3B0aW9uczogeyBtYXA6IHRoaXMuX21hcCB9LFxuICAgICAgICAgICAgb25JbmZvSHRtbFNldDogcG9pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJvcHMub25TZWxlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChwb2kubWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBpZD17dGhpcy5wcm9wcy5pZH0gey4uLnRoaXMucHJvcHN9PjwvZGl2PjtcbiAgICB9XG5cbiAgICBzZWFyY2godGV4dCkge1xuICAgICAgICB0aGlzLl9sb2NhbC5zZWFyY2godGV4dCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG9uU2VsZWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH1cbn1cbiJdfQ==