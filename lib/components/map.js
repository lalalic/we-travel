"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_React$Component) {
	_inherits(_class, _React$Component);

	function _class() {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));

		_this.id = _this.props.id || "_map" + Date.now();
		return _this;
	}

	_createClass(_class, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var zIndex = this.props.style.zIndex;

			var init = function init(a) {
				var _BMap = BMap;
				var Map = _BMap.Map;
				var Point = _BMap.Point;

				var map = _this2._map = new Map(_this2.id);
				map.centerAndZoom(new Point(116.404, 39.915), 11);
				if (zIndex != undefined) _this2.refs.root.style.zIndex = zIndex;
				_this2.mapDidMount(map);
			};

			if (!document.querySelector("script#map")) {
				window.__initMap = function () {
					init();
					window.__initMap = null;
				};
				var script = document.createElement("script");
				script.id = "map";
				script.type = "text/javascript";
				script.src = "http://api.map.baidu.com/api?v=2.0&ak=vXfSyGM6HNpGrGevEkOrGRGdVyA9AIB2&callback=__initMap";
				document.body.appendChild(script);
			} else {
				init();
			}
		}
	}, {
		key: "mapDidMount",
		value: function mapDidMount(map) {
			var onReady = this.props.onReady;

			onReady && onReady(map);
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props;
			var onReady = _props.onReady;

			var others = _objectWithoutProperties(_props, ["onReady"]);

			return _react2.default.createElement(
				"div",
				_extends({ ref: "root", id: this.id }, others),
				"loading..."
			);
		}
	}]);

	return _class;
}(_react2.default.Component);

_class.propTypes = {
	id: _react2.default.PropTypes.string,
	onReady: _react2.default.PropTypes.func
};
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLFFBQUssRUFBTCxHQUFRLE1BQUssS0FBTCxDQUFXLEVBQVgsYUFBc0IsS0FBSyxHQUFMLEVBQXRCLENBRkk7O0VBQWI7Ozs7c0NBS3VCOzs7T0FDUixTQUFTLEtBQUssS0FBTCxDQUFoQixNQUFPLE9BRFE7O0FBRXRCLE9BQUksT0FBSyxTQUFMLElBQUssSUFBRztnQkFDTyxLQURQO1FBQ0osZ0JBREk7UUFDQSxvQkFEQTs7QUFFWCxRQUFJLE1BQUksT0FBSyxJQUFMLEdBQVksSUFBSSxHQUFKLENBQVEsT0FBSyxFQUFMLENBQXBCLENBRkc7QUFHWCxRQUFJLGFBQUosQ0FBa0IsSUFBSSxLQUFKLENBQVUsT0FBVixFQUFtQixNQUFuQixDQUFsQixFQUE4QyxFQUE5QyxFQUhXO0FBSVgsUUFBRyxVQUFRLFNBQVIsRUFDRixPQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsS0FBZixDQUFxQixNQUFyQixHQUE0QixNQUE1QixDQUREO0FBRUEsV0FBSyxXQUFMLENBQWlCLEdBQWpCLEVBTlc7SUFBSCxDQUZhOztBQVd0QixPQUFHLENBQUMsU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQUQsRUFBc0M7QUFDeEMsV0FBTyxTQUFQLEdBQWlCLFlBQVU7QUFDMUIsWUFEMEI7QUFFMUIsWUFBTyxTQUFQLEdBQWlCLElBQWpCLENBRjBCO0tBQVYsQ0FEdUI7QUFLeEMsUUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFULENBTG9DO0FBTXhDLFdBQU8sRUFBUCxHQUFVLEtBQVYsQ0FOd0M7QUFPeEMsV0FBTyxJQUFQLEdBQWMsaUJBQWQsQ0FQd0M7QUFReEMsV0FBTyxHQUFQLEdBQWEsMkZBQWIsQ0FSd0M7QUFTeEMsYUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixNQUExQixFQVR3QztJQUF6QyxNQVVLO0FBQ0osV0FESTtJQVZMOzs7OzhCQWVXLEtBQUk7T0FDUixVQUFTLEtBQUssS0FBTCxDQUFULFFBRFE7O0FBRWYsY0FBVyxRQUFRLEdBQVIsQ0FBWCxDQUZlOzs7OzJCQUtKO2dCQUNjLEtBQUssS0FBTCxDQURkO09BQ04seUJBRE07O09BQ00sdURBRE47O0FBRUwsVUFBTzs7ZUFBSyxLQUFJLE1BQUosRUFBVyxJQUFJLEtBQUssRUFBTCxJQUFhLE9BQWpDOztJQUFQLENBRks7Ozs7O0VBckNnQixnQkFBTSxTQUFOOztPQTBDbEIsWUFBWTtBQUNmLEtBQUksZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNWLFVBQVMsZ0JBQU0sU0FBTixDQUFnQixJQUFoQiIsImZpbGUiOiJtYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmlkPXRoaXMucHJvcHMuaWR8fGBfbWFwJHtEYXRlLm5vdygpfWBcblx0fVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0Y29uc3Qge3N0eWxlOnt6SW5kZXh9fT10aGlzLnByb3BzXG5cdFx0bGV0IGluaXQ9YT0+e1xuXHRcdFx0Y29uc3Qge01hcCxQb2ludH09Qk1hcFxuXHRcdFx0dmFyIG1hcD10aGlzLl9tYXAgPSBuZXcgTWFwKHRoaXMuaWQpO1xuXHRcdFx0bWFwLmNlbnRlckFuZFpvb20obmV3IFBvaW50KDExNi40MDQsIDM5LjkxNSksIDExKTtcblx0XHRcdGlmKHpJbmRleCE9dW5kZWZpbmVkKVxuXHRcdFx0XHR0aGlzLnJlZnMucm9vdC5zdHlsZS56SW5kZXg9ekluZGV4O1xuXHRcdFx0dGhpcy5tYXBEaWRNb3VudChtYXApXG5cdFx0fVxuXG5cdFx0aWYoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzY3JpcHQjbWFwXCIpKXtcblx0XHRcdHdpbmRvdy5fX2luaXRNYXA9ZnVuY3Rpb24oKXtcblx0XHRcdFx0aW5pdCgpXG5cdFx0XHRcdHdpbmRvdy5fX2luaXRNYXA9bnVsbFxuXHRcdFx0fVxuXHRcdFx0bGV0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG5cdFx0XHRzY3JpcHQuaWQ9XCJtYXBcIlxuXHRcdFx0c2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuXHRcdFx0c2NyaXB0LnNyYyA9IFwiaHR0cDovL2FwaS5tYXAuYmFpZHUuY29tL2FwaT92PTIuMCZhaz12WGZTeUdNNkhOcEdyR2V2RWtPckdSR2RWeUE5QUlCMiZjYWxsYmFjaz1fX2luaXRNYXBcIjtcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblx0XHR9ZWxzZXtcblx0XHRcdGluaXQoKVxuXHRcdH1cbiAgICB9XG5cblx0bWFwRGlkTW91bnQobWFwKXtcblx0XHRjb25zdCB7b25SZWFkeX09dGhpcy5wcm9wc1xuXHRcdG9uUmVhZHkgJiYgb25SZWFkeShtYXApO1xuXHR9XG5cbiAgICByZW5kZXIoKSB7XG5cdFx0bGV0IHtvblJlYWR5LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIDxkaXYgcmVmPVwicm9vdFwiIGlkPXt0aGlzLmlkfSB7Li4ub3RoZXJzfT5sb2FkaW5nLi4uPC9kaXY+O1xuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdG9uUmVhZHk6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG4gICAgfVxufVxuIl19