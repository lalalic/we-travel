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

			var nav = this.props.nav;

			var init = function init(a) {
				var _BMap = BMap;
				var Map = _BMap.Map;
				var Point = _BMap.Point;
				var Marker = _BMap.Marker;

				var map = _this2._map = new Map(_this2.id);
				map.Marker = Marker;
				map.centerAndZoom(new Point(116.404, 39.915), 11);
				map.setCurrentCity("北京");
				map.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));
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
				_extends({ id: this.id }, others),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLFFBQUssRUFBTCxHQUFRLE1BQUssS0FBTCxDQUFXLEVBQVgsYUFBc0IsS0FBSyxHQUFMLEVBQXRCLENBRkk7O0VBQWI7Ozs7c0NBSXVCOzs7T0FDZixNQUFLLEtBQUssS0FBTCxDQUFMLElBRGU7O0FBRXRCLE9BQUksT0FBSyxTQUFMLElBQUssSUFBRztnQkFDYyxLQURkO1FBQ0osZ0JBREk7UUFDQSxvQkFEQTtRQUNNLHNCQUROOztBQUVYLFFBQUksTUFBSSxPQUFLLElBQUwsR0FBWSxJQUFJLEdBQUosQ0FBUSxPQUFLLEVBQUwsQ0FBcEIsQ0FGRztBQUdYLFFBQUksTUFBSixHQUFXLE1BQVgsQ0FIVztBQUlYLFFBQUksYUFBSixDQUFrQixJQUFJLEtBQUosQ0FBVSxPQUFWLEVBQW1CLE1BQW5CLENBQWxCLEVBQThDLEVBQTlDLEVBSlc7QUFLWCxRQUFJLGNBQUosQ0FBbUIsSUFBbkIsRUFMVztBQU1YLFFBQUksVUFBSixDQUFlLElBQUksS0FBSyxpQkFBTCxDQUF1QixFQUFDLFFBQU8sd0JBQVAsRUFBNUIsQ0FBZixFQU5XO0FBT1gsV0FBSyxXQUFMLENBQWlCLEdBQWpCLEVBUFc7SUFBSCxDQUZhOztBQVl0QixPQUFHLENBQUMsU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQUQsRUFBc0M7QUFDeEMsV0FBTyxTQUFQLEdBQWlCLFlBQVU7QUFDMUIsWUFEMEI7QUFFMUIsWUFBTyxTQUFQLEdBQWlCLElBQWpCLENBRjBCO0tBQVYsQ0FEdUI7QUFLeEMsUUFBSSxTQUFTLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFULENBTG9DO0FBTXhDLFdBQU8sRUFBUCxHQUFVLEtBQVYsQ0FOd0M7QUFPeEMsV0FBTyxJQUFQLEdBQWMsaUJBQWQsQ0FQd0M7QUFReEMsV0FBTyxHQUFQLEdBQWEsMkZBQWIsQ0FSd0M7QUFTeEMsYUFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixNQUExQixFQVR3QztJQUF6QyxNQVVLO0FBQ0osV0FESTtJQVZMOzs7OzhCQWVXLEtBQUk7T0FDUixVQUFTLEtBQUssS0FBTCxDQUFULFFBRFE7O0FBRWYsY0FBVyxRQUFRLEdBQVIsQ0FBWCxDQUZlOzs7OzJCQUtKO2dCQUNjLEtBQUssS0FBTCxDQURkO09BQ04seUJBRE07O09BQ00sdURBRE47O0FBRUwsVUFBTzs7ZUFBSyxJQUFJLEtBQUssRUFBTCxJQUFhLE9BQXRCOztJQUFQLENBRks7Ozs7O0VBckNnQixnQkFBTSxTQUFOOztPQTBDbEIsWUFBWTtBQUNmLEtBQUksZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtBQUNWLFVBQVMsZ0JBQU0sU0FBTixDQUFnQixJQUFoQiIsImZpbGUiOiJtYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmlkPXRoaXMucHJvcHMuaWR8fGBfbWFwJHtEYXRlLm5vdygpfWBcblx0fVxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGNvbnN0IHtuYXZ9PXRoaXMucHJvcHNcblx0XHRsZXQgaW5pdD1hPT57XG5cdFx0XHRjb25zdCB7TWFwLFBvaW50LE1hcmtlcn09Qk1hcFxuXHRcdFx0dmFyIG1hcD10aGlzLl9tYXAgPSBuZXcgTWFwKHRoaXMuaWQpO1xuXHRcdFx0bWFwLk1hcmtlcj1NYXJrZXJcblx0XHRcdG1hcC5jZW50ZXJBbmRab29tKG5ldyBQb2ludCgxMTYuNDA0LCAzOS45MTUpLCAxMSk7XG5cdFx0XHRtYXAuc2V0Q3VycmVudENpdHkoXCLljJfkuqxcIik7XG5cdFx0XHRtYXAuYWRkQ29udHJvbChuZXcgQk1hcC5OYXZpZ2F0aW9uQ29udHJvbCh7YW5jaG9yOkJNQVBfQU5DSE9SX0JPVFRPTV9SSUdIVH0pKTsgIFxuXHRcdFx0dGhpcy5tYXBEaWRNb3VudChtYXApXG5cdFx0fVxuXHRcdFxuXHRcdGlmKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2NyaXB0I21hcFwiKSl7XG5cdFx0XHR3aW5kb3cuX19pbml0TWFwPWZ1bmN0aW9uKCl7XG5cdFx0XHRcdGluaXQoKVxuXHRcdFx0XHR3aW5kb3cuX19pbml0TWFwPW51bGxcblx0XHRcdH1cblx0XHRcdGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXHRcdFx0c2NyaXB0LmlkPVwibWFwXCJcblx0XHRcdHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcblx0XHRcdHNjcmlwdC5zcmMgPSBcImh0dHA6Ly9hcGkubWFwLmJhaWR1LmNvbS9hcGk/dj0yLjAmYWs9dlhmU3lHTTZITnBHckdldkVrT3JHUkdkVnlBOUFJQjImY2FsbGJhY2s9X19pbml0TWFwXCI7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpbml0KClcblx0XHR9XHRcbiAgICB9XG5cdFxuXHRtYXBEaWRNb3VudChtYXApe1xuXHRcdGNvbnN0IHtvblJlYWR5fT10aGlzLnByb3BzXG5cdFx0b25SZWFkeSAmJiBvblJlYWR5KG1hcCk7XG5cdH1cblxuICAgIHJlbmRlcigpIHtcblx0XHRsZXQge29uUmVhZHksIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gPGRpdiBpZD17dGhpcy5pZH0gey4uLm90aGVyc30+bG9hZGluZy4uLjwvZGl2PjtcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblJlYWR5OiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH1cbn1cbiJdfQ==