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

			var init = function init(a) {
				var _BMap = BMap;
				var Map = _BMap.Map;
				var Point = _BMap.Point;
				var Marker = _BMap.Marker;

				var map = _this2._map = new Map(_this2.id);
				map.Marker = Marker;
				map.centerAndZoom(new Point(116.404, 39.915), 11);
				map.setCurrentCity("北京");
				map.addControl(new BMap.NavigationControl());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLFFBQUssRUFBTCxHQUFRLE1BQUssS0FBTCxDQUFXLEVBQVgsYUFBc0IsS0FBSyxHQUFMLEVBQXRCLENBRkk7O0VBQWI7Ozs7c0NBSXVCOzs7QUFDdEIsT0FBSSxPQUFLLFNBQUwsSUFBSyxJQUFHO2dCQUNjLEtBRGQ7UUFDSixnQkFESTtRQUNBLG9CQURBO1FBQ00sc0JBRE47O0FBRVgsUUFBSSxNQUFJLE9BQUssSUFBTCxHQUFZLElBQUksR0FBSixDQUFRLE9BQUssRUFBTCxDQUFwQixDQUZHO0FBR1gsUUFBSSxNQUFKLEdBQVcsTUFBWCxDQUhXO0FBSVgsUUFBSSxhQUFKLENBQWtCLElBQUksS0FBSixDQUFVLE9BQVYsRUFBbUIsTUFBbkIsQ0FBbEIsRUFBOEMsRUFBOUMsRUFKVztBQUtYLFFBQUksY0FBSixDQUFtQixJQUFuQixFQUxXO0FBTVgsUUFBSSxVQUFKLENBQWUsSUFBSSxLQUFLLGlCQUFMLEVBQW5CLEVBTlc7QUFPWCxXQUFLLFdBQUwsQ0FBaUIsR0FBakIsRUFQVztJQUFILENBRGE7O0FBV3RCLE9BQUcsQ0FBQyxTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBRCxFQUFzQztBQUN4QyxXQUFPLFNBQVAsR0FBaUIsWUFBVTtBQUMxQixZQUQwQjtBQUUxQixZQUFPLFNBQVAsR0FBaUIsSUFBakIsQ0FGMEI7S0FBVixDQUR1QjtBQUt4QyxRQUFJLFNBQVMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQVQsQ0FMb0M7QUFNeEMsV0FBTyxFQUFQLEdBQVUsS0FBVixDQU53QztBQU94QyxXQUFPLElBQVAsR0FBYyxpQkFBZCxDQVB3QztBQVF4QyxXQUFPLEdBQVAsR0FBYSwyRkFBYixDQVJ3QztBQVN4QyxhQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLE1BQTFCLEVBVHdDO0lBQXpDLE1BVUs7QUFDSixXQURJO0lBVkw7Ozs7OEJBZVcsS0FBSTtPQUNSLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFEUTs7QUFFZixjQUFXLFFBQVEsR0FBUixDQUFYLENBRmU7Ozs7MkJBS0o7Z0JBQ2MsS0FBSyxLQUFMLENBRGQ7T0FDTix5QkFETTs7T0FDTSx1REFETjs7QUFFTCxVQUFPOztlQUFLLElBQUksS0FBSyxFQUFMLElBQWEsT0FBdEI7O0lBQVAsQ0FGSzs7Ozs7RUFwQ2dCLGdCQUFNLFNBQU47O09BeUNsQixZQUFZO0FBQ2YsS0FBSSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1YsVUFBUyxnQkFBTSxTQUFOLENBQWdCLElBQWhCIiwiZmlsZSI6Im1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuaWQ9dGhpcy5wcm9wcy5pZHx8YF9tYXAke0RhdGUubm93KCl9YFxuXHR9XG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG5cdFx0bGV0IGluaXQ9YT0+e1xuXHRcdFx0Y29uc3Qge01hcCxQb2ludCxNYXJrZXJ9PUJNYXBcblx0XHRcdHZhciBtYXA9dGhpcy5fbWFwID0gbmV3IE1hcCh0aGlzLmlkKTtcblx0XHRcdG1hcC5NYXJrZXI9TWFya2VyXG5cdFx0XHRtYXAuY2VudGVyQW5kWm9vbShuZXcgUG9pbnQoMTE2LjQwNCwgMzkuOTE1KSwgMTEpO1xuXHRcdFx0bWFwLnNldEN1cnJlbnRDaXR5KFwi5YyX5LqsXCIpO1xuXHRcdFx0bWFwLmFkZENvbnRyb2wobmV3IEJNYXAuTmF2aWdhdGlvbkNvbnRyb2woKSk7ICBcblx0XHRcdHRoaXMubWFwRGlkTW91bnQobWFwKVxuXHRcdH1cblx0XHRcblx0XHRpZighZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNjcmlwdCNtYXBcIikpe1xuXHRcdFx0d2luZG93Ll9faW5pdE1hcD1mdW5jdGlvbigpe1xuXHRcdFx0XHRpbml0KClcblx0XHRcdFx0d2luZG93Ll9faW5pdE1hcD1udWxsXG5cdFx0XHR9XG5cdFx0XHRsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcblx0XHRcdHNjcmlwdC5pZD1cIm1hcFwiXG5cdFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XG5cdFx0XHRzY3JpcHQuc3JjID0gXCJodHRwOi8vYXBpLm1hcC5iYWlkdS5jb20vYXBpP3Y9Mi4wJmFrPXZYZlN5R002SE5wR3JHZXZFa09yR1JHZFZ5QTlBSUIyJmNhbGxiYWNrPV9faW5pdE1hcFwiO1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXHRcdH1lbHNle1xuXHRcdFx0aW5pdCgpXG5cdFx0fVx0XG4gICAgfVxuXHRcblx0bWFwRGlkTW91bnQobWFwKXtcblx0XHRjb25zdCB7b25SZWFkeX09dGhpcy5wcm9wc1xuXHRcdG9uUmVhZHkgJiYgb25SZWFkeShtYXApO1xuXHR9XG5cbiAgICByZW5kZXIoKSB7XG5cdFx0bGV0IHtvblJlYWR5LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIDxkaXYgaWQ9e3RoaXMuaWR9IHsuLi5vdGhlcnN9PmxvYWRpbmcuLi48L2Rpdj47XG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0b25SZWFkeTogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbiAgICB9XG59XG4iXX0=