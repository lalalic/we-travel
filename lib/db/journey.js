"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _location = require("./location");

var _location2 = _interopRequireDefault(_location);

var _footprint = require("./footprint");

var _footprint2 = _interopRequireDefault(_footprint);

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
		key: "getState",
		value: function getState(journey) {
			var now = new Date();
			var startedAt = journey.startedAt;
			var endedAt = journey.endedAt;

			var started = null,
			    ended = null;
			if (startedAt) {
				started = now.relative(startedAt);
				if (started < 0) {
					return "Plan";
				} else if (started == 0) {
					return "Starting";
				}
			}

			if (endedAt) {
				ended = now.relative(endedAt);
				if (ended > 0) {
					return "Memory";
				} else if (ended == 0) {
					return "Ending";
				}
			}

			if (started != null && ended != null && started > 0 && ended < 0) {
				return "Traveling";
			}

			return "Plan";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9qb3VybmV5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7K0JBT3FCLFNBQVE7T0FDcEIsWUFBbUIsUUFBbkIsVUFEb0I7T0FDVixVQUFTLFFBQVQsUUFEVTs7QUFFM0IsT0FBRyxhQUFhLFVBQVUsT0FBVixNQUFxQixLQUFLLEdBQUwsRUFBckIsRUFDZixPQUFPLFFBQVEsT0FBUixDQUFnQixFQUFoQixDQUFQLENBREQ7O0FBR0EsVUFBTyxtQkFBUyxHQUFULENBQWEsU0FBYixFQUF3QixPQUF4QixDQUFQLENBTDJCOzs7OzJCQVFaLFNBQVE7QUFDdkIsT0FBSSxNQUFJLElBQUksSUFBSixFQUFKLENBRG1CO09BRWhCLFlBQW9CLFFBQXBCLFVBRmdCO09BRUwsVUFBUyxRQUFULFFBRks7O0FBR3ZCLE9BQUksVUFBUSxJQUFSO09BQWMsUUFBTSxJQUFOLENBSEs7QUFJdkIsT0FBRyxTQUFILEVBQWE7QUFDWixjQUFRLElBQUksUUFBSixDQUFhLFNBQWIsQ0FBUixDQURZO0FBRVosUUFBRyxVQUFRLENBQVIsRUFBVTtBQUNaLFlBQU8sTUFBUCxDQURZO0tBQWIsTUFFTSxJQUFHLFdBQVMsQ0FBVCxFQUFXO0FBQ25CLFlBQU8sVUFBUCxDQURtQjtLQUFkO0lBSlA7O0FBU0EsT0FBRyxPQUFILEVBQVc7QUFDVixZQUFNLElBQUksUUFBSixDQUFhLE9BQWIsQ0FBTixDQURVO0FBRVYsUUFBRyxRQUFNLENBQU4sRUFBUTtBQUNWLFlBQU8sUUFBUCxDQURVO0tBQVgsTUFFTSxJQUFHLFNBQU8sQ0FBUCxFQUFTO0FBQ2pCLFlBQU8sUUFBUCxDQURpQjtLQUFaO0lBSlA7O0FBU0EsT0FBRyxXQUFTLElBQVQsSUFBaUIsU0FBTyxJQUFQLElBQWUsVUFBUSxDQUFSLElBQWEsUUFBTSxDQUFOLEVBQVE7QUFDdkQsV0FBTyxXQUFQLENBRHVEO0lBQXhEOztBQUlBLFVBQU8sTUFBUCxDQTFCdUI7Ozs7c0JBWk47QUFDakIsVUFBTyxTQUFQLENBRGlCIiwiZmlsZSI6ImpvdXJuZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsLFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCBMb2NhdGlvbiBmcm9tIFwiLi9sb2NhdGlvblwiXHJcbmltcG9ydCBGb290cHJpbnQgZnJvbSBcIi4vZm9vdHByaW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgTW9kZWx7XHJcblx0c3RhdGljIGdldCBfbmFtZSgpe1xyXG5cdFx0cmV0dXJuIFwiam91cm5leVwiXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0V2F5cG9pbnRzKGpvdXJuZXkpe1xyXG5cdFx0Y29uc3Qge3N0YXJ0ZWRBdCxlbmRlZEF0fT1qb3VybmV5XHJcblx0XHRpZihzdGFydGVkQXQgJiYgc3RhcnRlZEF0LmdldFRpbWUoKT49RGF0ZS5ub3coKSlcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSlcclxuXHJcblx0XHRyZXR1cm4gTG9jYXRpb24uZ2V0KHN0YXJ0ZWRBdCwgZW5kZWRBdClcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXRTdGF0ZShqb3VybmV5KXtcclxuXHRcdGxldCBub3c9bmV3IERhdGUoKVxyXG5cdFx0Y29uc3Qge3N0YXJ0ZWRBdCwgZW5kZWRBdH09am91cm5leVxyXG5cdFx0bGV0IHN0YXJ0ZWQ9bnVsbCwgZW5kZWQ9bnVsbFxyXG5cdFx0aWYoc3RhcnRlZEF0KXtcclxuXHRcdFx0c3RhcnRlZD1ub3cucmVsYXRpdmUoc3RhcnRlZEF0KVxyXG5cdFx0XHRpZihzdGFydGVkPDApe1xyXG5cdFx0XHRcdHJldHVybiBcIlBsYW5cIlxyXG5cdFx0XHR9ZWxzZSBpZihzdGFydGVkPT0wKXtcclxuXHRcdFx0XHRyZXR1cm4gXCJTdGFydGluZ1wiXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZihlbmRlZEF0KXtcclxuXHRcdFx0ZW5kZWQ9bm93LnJlbGF0aXZlKGVuZGVkQXQpXHJcblx0XHRcdGlmKGVuZGVkPjApe1xyXG5cdFx0XHRcdHJldHVybiBcIk1lbW9yeVwiXHJcblx0XHRcdH1lbHNlIGlmKGVuZGVkPT0wKXtcclxuXHRcdFx0XHRyZXR1cm4gXCJFbmRpbmdcIlxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoc3RhcnRlZCE9bnVsbCAmJiBlbmRlZCE9bnVsbCAmJiBzdGFydGVkPjAgJiYgZW5kZWQ8MCl7XHJcblx0XHRcdHJldHVybiBcIlRyYXZlbGluZ1wiXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIFwiUGxhblwiXHJcblx0fVxyXG59XHJcbiJdfQ==