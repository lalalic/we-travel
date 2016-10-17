"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
		key: "getFootprints",
		value: function getFootprints(journey) {
			return Promise.all([new Promise(function (resolve, reject) {
				return _footprint2.default.find() //{journey:journey._id})
				.fetch(function (footprints) {
					return resolve(footprints);
				}, reject);
			}), this.getWaypoints(journey)]).then(function (a) {
				var _a = _slicedToArray(a, 2);

				var footprints = _a[0];
				var waypoints = _a[1];
				//footprints.splice(0,0,...waypoints)

				footprints.sort(function (a, b) {
					if (typeof a.when == 'number') a.when = new Date(a);

					if (typeof b.when == 'number') b.when = new Date(b);

					return a.when.getTime() - b.when.getTime();
				});
				return footprints;
			}, console.error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9qb3VybmV5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFPcUIsU0FBUTtPQUNwQixZQUFtQixRQUFuQixVQURvQjtPQUNWLFVBQVMsUUFBVCxRQURVOztBQUUzQixPQUFHLGFBQWEsVUFBVSxPQUFWLE1BQXFCLEtBQUssR0FBTCxFQUFyQixFQUNmLE9BQU8sUUFBUSxPQUFSLENBQWdCLEVBQWhCLENBQVAsQ0FERDs7QUFHQSxVQUFPLG1CQUFTLEdBQVQsQ0FBYSxTQUFiLEVBQXdCLE9BQXhCLENBQVAsQ0FMMkI7Ozs7Z0NBUVAsU0FBUTtBQUM1QixVQUFPLFFBQVEsR0FBUixDQUFZLENBQ2xCLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQ7V0FBa0Isb0JBQVUsSUFBVjtLQUM1QixLQUQ0QixDQUN0QjtZQUFZLFFBQVEsVUFBUjtLQUFaLEVBQWlDLE1BRFg7SUFBbEIsQ0FETSxFQUdsQixLQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FIa0IsQ0FBWixFQUlILElBSkcsQ0FJRSxhQUFHOzRCQUNtQixNQURuQjs7UUFDSCxtQkFERztRQUNROztBQURSO0FBR1YsZUFBVyxJQUFYLENBQWdCLFVBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTztBQUN0QixTQUFHLE9BQU8sRUFBRSxJQUFGLElBQVMsUUFBaEIsRUFDRixFQUFFLElBQUYsR0FBTyxJQUFJLElBQUosQ0FBUyxDQUFULENBQVAsQ0FERDs7QUFHQSxTQUFHLE9BQU8sRUFBRSxJQUFGLElBQVMsUUFBaEIsRUFDRixFQUFFLElBQUYsR0FBTyxJQUFJLElBQUosQ0FBUyxDQUFULENBQVAsQ0FERDs7QUFHQSxZQUFPLEVBQUUsSUFBRixDQUFPLE9BQVAsS0FBaUIsRUFBRSxJQUFGLENBQU8sT0FBUCxFQUFqQixDQVBlO0tBQVAsQ0FBaEIsQ0FIVTtBQVlWLFdBQU8sVUFBUCxDQVpVO0lBQUgsRUFhTCxRQUFRLEtBQVIsQ0FqQkosQ0FENEI7Ozs7MkJBcUJiLFNBQVE7QUFDdkIsT0FBSSxNQUFJLElBQUksSUFBSixFQUFKLENBRG1CO09BRWhCLFlBQW9CLFFBQXBCLFVBRmdCO09BRUwsVUFBUyxRQUFULFFBRks7O0FBR3ZCLE9BQUksVUFBUSxJQUFSO09BQWMsUUFBTSxJQUFOLENBSEs7QUFJdkIsT0FBRyxTQUFILEVBQWE7QUFDWixjQUFRLElBQUksUUFBSixDQUFhLFNBQWIsQ0FBUixDQURZO0FBRVosUUFBRyxVQUFRLENBQVIsRUFBVTtBQUNaLFlBQU8sTUFBUCxDQURZO0tBQWIsTUFFTSxJQUFHLFdBQVMsQ0FBVCxFQUFXO0FBQ25CLFlBQU8sVUFBUCxDQURtQjtLQUFkO0lBSlA7O0FBU0EsT0FBRyxPQUFILEVBQVc7QUFDVixZQUFNLElBQUksUUFBSixDQUFhLE9BQWIsQ0FBTixDQURVO0FBRVYsUUFBRyxRQUFNLENBQU4sRUFBUTtBQUNWLFlBQU8sUUFBUCxDQURVO0tBQVgsTUFFTSxJQUFHLFNBQU8sQ0FBUCxFQUFTO0FBQ2pCLFlBQU8sUUFBUCxDQURpQjtLQUFaO0lBSlA7O0FBU0EsT0FBRyxXQUFTLElBQVQsSUFBaUIsU0FBTyxJQUFQLElBQWUsVUFBUSxDQUFSLElBQWEsUUFBTSxDQUFOLEVBQVE7QUFDdkQsV0FBTyxXQUFQLENBRHVEO0lBQXhEOztBQUlBLFVBQU8sTUFBUCxDQTFCdUI7Ozs7c0JBakNOO0FBQ2pCLFVBQU8sU0FBUCxDQURpQiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCxVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQgTG9jYXRpb24gZnJvbSBcIi4vbG9jYXRpb25cIlxyXG5pbXBvcnQgRm9vdHByaW50IGZyb20gXCIuL2Zvb3RwcmludFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE1vZGVse1xyXG5cdHN0YXRpYyBnZXQgX25hbWUoKXtcclxuXHRcdHJldHVybiBcImpvdXJuZXlcIlxyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldFdheXBvaW50cyhqb3VybmV5KXtcclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsZW5kZWRBdH09am91cm5leVxyXG5cdFx0aWYoc3RhcnRlZEF0ICYmIHN0YXJ0ZWRBdC5nZXRUaW1lKCk+PURhdGUubm93KCkpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pXHJcblxyXG5cdFx0cmV0dXJuIExvY2F0aW9uLmdldChzdGFydGVkQXQsIGVuZGVkQXQpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0Rm9vdHByaW50cyhqb3VybmV5KXtcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChbXHJcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PkZvb3RwcmludC5maW5kKCkvL3tqb3VybmV5OmpvdXJuZXkuX2lkfSlcclxuXHRcdFx0XHQuZmV0Y2goZm9vdHByaW50cz0+cmVzb2x2ZShmb290cHJpbnRzKSwgcmVqZWN0KSksXHJcblx0XHRcdHRoaXMuZ2V0V2F5cG9pbnRzKGpvdXJuZXkpXHJcblx0XHRcdF0pLnRoZW4oYT0+e1xyXG5cdFx0XHRcdGNvbnN0IFtmb290cHJpbnRzLHdheXBvaW50c109YVxyXG5cdFx0XHRcdC8vZm9vdHByaW50cy5zcGxpY2UoMCwwLC4uLndheXBvaW50cylcclxuXHRcdFx0XHRmb290cHJpbnRzLnNvcnQoKGEsYik9PntcclxuXHRcdFx0XHRcdGlmKHR5cGVvZihhLndoZW4pPT0nbnVtYmVyJylcclxuXHRcdFx0XHRcdFx0YS53aGVuPW5ldyBEYXRlKGEpO1xyXG5cclxuXHRcdFx0XHRcdGlmKHR5cGVvZihiLndoZW4pPT0nbnVtYmVyJylcclxuXHRcdFx0XHRcdFx0Yi53aGVuPW5ldyBEYXRlKGIpO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBhLndoZW4uZ2V0VGltZSgpLWIud2hlbi5nZXRUaW1lKClcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHJldHVybiBmb290cHJpbnRzXHJcblx0XHRcdH0sIGNvbnNvbGUuZXJyb3IpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0U3RhdGUoam91cm5leSl7XHJcblx0XHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsIGVuZGVkQXR9PWpvdXJuZXlcclxuXHRcdGxldCBzdGFydGVkPW51bGwsIGVuZGVkPW51bGxcclxuXHRcdGlmKHN0YXJ0ZWRBdCl7XHJcblx0XHRcdHN0YXJ0ZWQ9bm93LnJlbGF0aXZlKHN0YXJ0ZWRBdClcclxuXHRcdFx0aWYoc3RhcnRlZDwwKXtcclxuXHRcdFx0XHRyZXR1cm4gXCJQbGFuXCJcclxuXHRcdFx0fWVsc2UgaWYoc3RhcnRlZD09MCl7XHJcblx0XHRcdFx0cmV0dXJuIFwiU3RhcnRpbmdcIlxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZW5kZWRBdCl7XHJcblx0XHRcdGVuZGVkPW5vdy5yZWxhdGl2ZShlbmRlZEF0KVxyXG5cdFx0XHRpZihlbmRlZD4wKXtcclxuXHRcdFx0XHRyZXR1cm4gXCJNZW1vcnlcIlxyXG5cdFx0XHR9ZWxzZSBpZihlbmRlZD09MCl7XHJcblx0XHRcdFx0cmV0dXJuIFwiRW5kaW5nXCJcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHN0YXJ0ZWQhPW51bGwgJiYgZW5kZWQhPW51bGwgJiYgc3RhcnRlZD4wICYmIGVuZGVkPDApe1xyXG5cdFx0XHRyZXR1cm4gXCJUcmF2ZWxpbmdcIlxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBcIlBsYW5cIlxyXG5cdH1cclxufVxyXG4iXX0=