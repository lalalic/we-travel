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

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC5qcyJdLCJuYW1lcyI6WyJhcmd1bWVudHMiLCJpZCIsInByb3BzIiwiRGF0ZSIsIm5vdyIsInpJbmRleCIsInN0eWxlIiwiaW5pdCIsIkJNYXAiLCJNYXAiLCJQb2ludCIsIm1hcCIsIl9tYXAiLCJjZW50ZXJBbmRab29tIiwidW5kZWZpbmVkIiwicmVmcyIsInJvb3QiLCJtYXBEaWRNb3VudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIndpbmRvdyIsIl9faW5pdE1hcCIsInNjcmlwdCIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwic3JjIiwiYm9keSIsImFwcGVuZENoaWxkIiwib25SZWFkeSIsIm90aGVycyIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQyxtQkFBYTtBQUFBOztBQUFBLCtHQUNIQSxTQURHOztBQUVaLFFBQUtDLEVBQUwsR0FBUSxNQUFLQyxLQUFMLENBQVdELEVBQVgsYUFBc0JFLEtBQUtDLEdBQUwsRUFBOUI7QUFGWTtBQUdaOzs7O3NDQUVzQjtBQUFBOztBQUFBLE9BQ1JDLE1BRFEsR0FDQyxLQUFLSCxLQUROLENBQ2ZJLEtBRGUsQ0FDUkQsTUFEUTs7QUFFdEIsT0FBSUUsT0FBSyxTQUFMQSxJQUFLLElBQUc7QUFBQSxnQkFDT0MsSUFEUDtBQUFBLFFBQ0pDLEdBREksU0FDSkEsR0FESTtBQUFBLFFBQ0FDLEtBREEsU0FDQUEsS0FEQTs7QUFFWCxRQUFJQyxNQUFJLE9BQUtDLElBQUwsR0FBWSxJQUFJSCxHQUFKLENBQVEsT0FBS1IsRUFBYixDQUFwQjtBQUNBVSxRQUFJRSxhQUFKLENBQWtCLElBQUlILEtBQUosQ0FBVSxPQUFWLEVBQW1CLE1BQW5CLENBQWxCLEVBQThDLEVBQTlDO0FBQ0EsUUFBR0wsVUFBUVMsU0FBWCxFQUNDLE9BQUtDLElBQUwsQ0FBVUMsSUFBVixDQUFlVixLQUFmLENBQXFCRCxNQUFyQixHQUE0QkEsTUFBNUI7QUFDRCxXQUFLWSxXQUFMLENBQWlCTixHQUFqQjtBQUNBLElBUEQ7O0FBU0EsT0FBRyxDQUFDTyxTQUFTQyxhQUFULENBQXVCLFlBQXZCLENBQUosRUFBeUM7QUFDeENDLFdBQU9DLFNBQVAsR0FBaUIsWUFBVTtBQUMxQmQ7QUFDQWEsWUFBT0MsU0FBUCxHQUFpQixJQUFqQjtBQUNBLEtBSEQ7QUFJQSxRQUFJQyxTQUFTSixTQUFTSyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQUQsV0FBT3JCLEVBQVAsR0FBVSxLQUFWO0FBQ0FxQixXQUFPRSxJQUFQLEdBQWMsaUJBQWQ7QUFDQUYsV0FBT0csR0FBUCxHQUFhLDJGQUFiO0FBQ0FQLGFBQVNRLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkwsTUFBMUI7QUFDQSxJQVZELE1BVUs7QUFDSmY7QUFDQTtBQUNFOzs7OEJBRVFJLEcsRUFBSTtBQUFBLE9BQ1JpQixPQURRLEdBQ0MsS0FBSzFCLEtBRE4sQ0FDUjBCLE9BRFE7O0FBRWZBLGNBQVdBLFFBQVFqQixHQUFSLENBQVg7QUFDQTs7OzJCQUVXO0FBQUEsZ0JBQ2MsS0FBS1QsS0FEbkI7QUFBQSxPQUNOMEIsT0FETSxVQUNOQSxPQURNOztBQUFBLE9BQ01DLE1BRE47O0FBRUwsVUFBTztBQUFBO0FBQUEsZUFBSyxLQUFJLE1BQVQsRUFBZ0IsSUFBSSxLQUFLNUIsRUFBekIsSUFBaUM0QixNQUFqQztBQUFBO0FBQUEsSUFBUDtBQUNIOzs7O0VBeEN3QixnQkFBTUMsUzs7T0EwQ3hCQyxTLEdBQVk7QUFDZjlCLEtBQUksZ0JBQU0rQixTQUFOLENBQWdCQyxNQURMO0FBRXJCTCxVQUFTLGdCQUFNSSxTQUFOLENBQWdCRTtBQUZKLEMiLCJmaWxlIjoibWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5pZD10aGlzLnByb3BzLmlkfHxgX21hcCR7RGF0ZS5ub3coKX1gXG5cdH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdGNvbnN0IHtzdHlsZTp7ekluZGV4fX09dGhpcy5wcm9wc1xuXHRcdGxldCBpbml0PWE9Pntcblx0XHRcdGNvbnN0IHtNYXAsUG9pbnR9PUJNYXBcblx0XHRcdHZhciBtYXA9dGhpcy5fbWFwID0gbmV3IE1hcCh0aGlzLmlkKTtcblx0XHRcdG1hcC5jZW50ZXJBbmRab29tKG5ldyBQb2ludCgxMTYuNDA0LCAzOS45MTUpLCAxMSk7XG5cdFx0XHRpZih6SW5kZXghPXVuZGVmaW5lZClcblx0XHRcdFx0dGhpcy5yZWZzLnJvb3Quc3R5bGUuekluZGV4PXpJbmRleDtcblx0XHRcdHRoaXMubWFwRGlkTW91bnQobWFwKVxuXHRcdH1cblxuXHRcdGlmKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2NyaXB0I21hcFwiKSl7XG5cdFx0XHR3aW5kb3cuX19pbml0TWFwPWZ1bmN0aW9uKCl7XG5cdFx0XHRcdGluaXQoKVxuXHRcdFx0XHR3aW5kb3cuX19pbml0TWFwPW51bGxcblx0XHRcdH1cblx0XHRcdGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXHRcdFx0c2NyaXB0LmlkPVwibWFwXCJcblx0XHRcdHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIjtcblx0XHRcdHNjcmlwdC5zcmMgPSBcImh0dHA6Ly9hcGkubWFwLmJhaWR1LmNvbS9hcGk/dj0yLjAmYWs9dlhmU3lHTTZITnBHckdldkVrT3JHUkdkVnlBOUFJQjImY2FsbGJhY2s9X19pbml0TWFwXCI7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cdFx0fWVsc2V7XG5cdFx0XHRpbml0KClcblx0XHR9XG4gICAgfVxuXG5cdG1hcERpZE1vdW50KG1hcCl7XG5cdFx0Y29uc3Qge29uUmVhZHl9PXRoaXMucHJvcHNcblx0XHRvblJlYWR5ICYmIG9uUmVhZHkobWFwKTtcblx0fVxuXG4gICAgcmVuZGVyKCkge1xuXHRcdGxldCB7b25SZWFkeSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiA8ZGl2IHJlZj1cInJvb3RcIiBpZD17dGhpcy5pZH0gey4uLm90aGVyc30+bG9hZGluZy4uLjwvZGl2PjtcbiAgICB9XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRvblJlYWR5OiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH1cbn1cbiJdfQ==