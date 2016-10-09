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
			var endedAt = journey.endedAt;

			if (startedAt && startedAt.getTime() >= Date.now()) return Promise.resolve([]);

			return _location2.default.get(startedAt, endedAt);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9qb3VybmV5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQU9xQixTQUFRO09BQ3BCLFlBQW1CLFFBQW5CLFVBRG9CO09BQ1YsVUFBUyxRQUFULFFBRFU7O0FBRTNCLE9BQUcsYUFBYSxVQUFVLE9BQVYsTUFBcUIsS0FBSyxHQUFMLEVBQXJCLEVBQ2YsT0FBTyxRQUFRLE9BQVIsQ0FBZ0IsRUFBaEIsQ0FBUCxDQUREOztBQUdBLFVBQU8sbUJBQVMsR0FBVCxDQUFhLFNBQWIsRUFBd0IsT0FBeEIsQ0FBUCxDQUwyQjs7OztzQkFKVjtBQUNqQixVQUFPLFNBQVAsQ0FEaUIiLCJmaWxlIjoiam91cm5leS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWwsVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IExvY2F0aW9uIGZyb20gXCIuL2xvY2F0aW9uXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgTW9kZWx7XHJcblx0c3RhdGljIGdldCBfbmFtZSgpe1xyXG5cdFx0cmV0dXJuIFwiam91cm5leVwiXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXRXYXlwb2ludHMoam91cm5leSl7XHJcblx0XHRjb25zdCB7c3RhcnRlZEF0LGVuZGVkQXR9PWpvdXJuZXlcclxuXHRcdGlmKHN0YXJ0ZWRBdCAmJiBzdGFydGVkQXQuZ2V0VGltZSgpPj1EYXRlLm5vdygpKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtdKVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gTG9jYXRpb24uZ2V0KHN0YXJ0ZWRBdCwgZW5kZWRBdClcclxuXHR9XHJcbn1cclxuIl19