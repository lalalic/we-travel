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
				_this2.refs.root.style.zIndex = 3;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLFFBQUssRUFBTCxHQUFRLE1BQUssS0FBTCxDQUFXLEVBQVgsYUFBc0IsS0FBSyxHQUFMLEVBQXRCLENBRkk7O0VBQWI7Ozs7c0NBS3VCOzs7T0FDZixNQUFLLEtBQUssS0FBTCxDQUFMLElBRGU7O0FBRXRCLE9BQUksT0FBSyxTQUFMLElBQUssSUFBRztnQkFDYyxLQURkO1FBQ0osZ0JBREk7UUFDQSxvQkFEQTtRQUNNLHNCQUROOztBQUVYLFFBQUksTUFBSSxPQUFLLElBQUwsR0FBWSxJQUFJLEdBQUosQ0FBUSxPQUFLLEVBQUwsQ0FBcEIsQ0FGRztBQUdYLFFBQUksTUFBSixHQUFXLE1BQVgsQ0FIVztBQUlYLFFBQUksYUFBSixDQUFrQixJQUFJLEtBQUosQ0FBVSxPQUFWLEVBQW1CLE1BQW5CLENBQWxCLEVBQThDLEVBQTlDLEVBSlc7QUFLWCxXQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsS0FBZixDQUFxQixNQUFyQixHQUE0QixDQUE1QixDQUxXO0FBTVgsUUFBSSxVQUFKLENBQWUsSUFBSSxLQUFLLGlCQUFMLENBQXVCLEVBQUMsUUFBTyx3QkFBUCxFQUE1QixDQUFmLEVBTlc7QUFPWCxXQUFLLFdBQUwsQ0FBaUIsR0FBakIsRUFQVztJQUFILENBRmE7O0FBWXRCLE9BQUcsQ0FBQyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBRCxFQUFzQztBQUN4QyxXQUFPLFNBQVAsR0FBaUIsWUFBVTtBQUMxQixZQUQwQjtBQUUxQixZQUFPLFNBQVAsR0FBaUIsSUFBakIsQ0FGMEI7S0FBVixDQUR1QjtBQUt4QyxRQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVQsQ0FMb0M7QUFNeEMsV0FBTyxFQUFQLEdBQVUsS0FBVixDQU53QztBQU94QyxXQUFPLElBQVAsR0FBYyxpQkFBZCxDQVB3QztBQVF4QyxXQUFPLEdBQVAsR0FBYSwyRkFBYixDQVJ3QztBQVN4QyxhQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLE1BQTFCLEVBVHdDO0lBQXpDLE1BVUs7QUFDSixXQURJO0lBVkw7Ozs7OEJBZVcsS0FBSTtPQUNSLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFEUTs7QUFFZixjQUFXLFFBQVEsR0FBUixDQUFYLENBRmU7Ozs7MkJBS0o7Z0JBQ2MsS0FBSyxLQUFMLENBRGQ7T0FDTix5QkFETTs7T0FDTSx1REFETjs7QUFFTCxVQUFPOztlQUFLLEtBQUksTUFBSixFQUFXLElBQUksS0FBSyxFQUFMLElBQWEsT0FBakM7O0lBQVAsQ0FGSzs7Ozs7RUF0Q2dCLGdCQUFNLFNBQU47O09BMkNsQixZQUFZO0FBQ2YsS0FBSSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1YsVUFBUyxnQkFBTSxTQUFOLENBQWdCLElBQWhCIiwiZmlsZSI6Im1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuaWQ9dGhpcy5wcm9wcy5pZHx8YF9tYXAke0RhdGUubm93KCl9YFxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRjb25zdCB7bmF2fT10aGlzLnByb3BzXG5cdFx0bGV0IGluaXQ9YT0+e1xuXHRcdFx0Y29uc3Qge01hcCxQb2ludCxNYXJrZXJ9PUJNYXBcblx0XHRcdHZhciBtYXA9dGhpcy5fbWFwID0gbmV3IE1hcCh0aGlzLmlkKTtcblx0XHRcdG1hcC5NYXJrZXI9TWFya2VyXG5cdFx0XHRtYXAuY2VudGVyQW5kWm9vbShuZXcgUG9pbnQoMTE2LjQwNCwgMzkuOTE1KSwgMTEpO1xuXHRcdFx0dGhpcy5yZWZzLnJvb3Quc3R5bGUuekluZGV4PTM7XG5cdFx0XHRtYXAuYWRkQ29udHJvbChuZXcgQk1hcC5OYXZpZ2F0aW9uQ29udHJvbCh7YW5jaG9yOkJNQVBfQU5DSE9SX0JPVFRPTV9SSUdIVH0pKTtcblx0XHRcdHRoaXMubWFwRGlkTW91bnQobWFwKVxuXHRcdH1cblxuXHRcdGlmKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2NyaXB0I21hcFwiKSl7XG5cdFx0XHR3aW5kb3cuX19pbml0TWFwPWZ1bmN0aW9uKCl7XG5cdFx0XHRcdGluaXQoKVxuXHRcdFx0XHR3aW5kb3cuX19pbml0TWFwPW51bGxcblx0XHRcdH1cblx0XHRcdGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXHRcdFx0c2NyaXB0LmlkPVwibWFwXCJcblx0XHRcdHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcblx0XHRcdHNjcmlwdC5zcmMgPSBcImh0dHA6Ly9hcGkubWFwLmJhaWR1LmNvbS9hcGk/dj0yLjAmYWs9dlhmU3lHTTZITnBHckdldkVrT3JHUkdkVnlBOUFJQjImY2FsbGJhY2s9X19pbml0TWFwXCI7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpbml0KClcblx0XHR9XG4gICAgfVxuXG5cdG1hcERpZE1vdW50KG1hcCl7XG5cdFx0Y29uc3Qge29uUmVhZHl9PXRoaXMucHJvcHNcblx0XHRvblJlYWR5ICYmIG9uUmVhZHkobWFwKTtcblx0fVxuXG4gICAgcmVuZGVyKCkge1xuXHRcdGxldCB7b25SZWFkeSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiA8ZGl2IHJlZj1cInJvb3RcIiBpZD17dGhpcy5pZH0gey4uLm90aGVyc30+bG9hZGluZy4uLjwvZGl2PjtcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblJlYWR5OiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH1cbn1cbiJdfQ==