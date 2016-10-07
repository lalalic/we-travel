"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _location = require("./location");

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Model) {
	_inherits(_class, _Model);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, null, [{
		key: "getWaypoints",
		value: function getWaypoints(journey) {
			var startedAt = journey.startedAt;
			var endAt = journey.endAt;

			if (startedAt && startedAt.getTime() >= Date.now()) return Promise.resolve([]);
			return _location2.default.find({ startedAt: startedAt, endAt: endAt }).fetch(locs);
		}
	}, {
		key: "_name",
		get: function get() {
			return "journey";
		}
	}]);

	return _class;
}(_qiliApp.Model);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9qb3VybmV5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQU1xQixTQUFRO09BQ3BCLFlBQWlCLFFBQWpCLFVBRG9CO09BQ1YsUUFBTyxRQUFQLE1BRFU7O0FBRTNCLE9BQUcsYUFBYSxVQUFVLE9BQVYsTUFBcUIsS0FBSyxHQUFMLEVBQXJCLEVBQ2YsT0FBTyxRQUFRLE9BQVIsQ0FBZ0IsRUFBaEIsQ0FBUCxDQUREO0FBRUEsVUFBTyxtQkFBUyxJQUFULENBQWMsRUFBQyxvQkFBRCxFQUFXLFlBQVgsRUFBZCxFQUFpQyxLQUFqQyxDQUF1QyxJQUF2QyxDQUFQLENBSjJCOzs7O3NCQUhWO0FBQ2pCLFVBQU8sU0FBUCxDQURpQiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCxVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQgTG9jYXRpb24gZnJvbSBcIi4vbG9jYXRpb25cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNb2RlbHtcclxuXHRzdGF0aWMgZ2V0IF9uYW1lKCl7XHJcblx0XHRyZXR1cm4gXCJqb3VybmV5XCJcclxuXHR9XHJcblx0c3RhdGljIGdldFdheXBvaW50cyhqb3VybmV5KXtcclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsZW5kQXR9PWpvdXJuZXlcclxuXHRcdGlmKHN0YXJ0ZWRBdCAmJiBzdGFydGVkQXQuZ2V0VGltZSgpPj1EYXRlLm5vdygpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKVxyXG5cdFx0cmV0dXJuIExvY2F0aW9uLmZpbmQoe3N0YXJ0ZWRBdCxlbmRBdH0pLmZldGNoKGxvY3MpXHJcblx0fVxyXG59XHJcbiJdfQ==