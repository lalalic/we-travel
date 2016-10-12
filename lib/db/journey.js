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
				return _footprint2.default.find().fetch(function (footprints) {
					return resolve(footprints);
				}, reject);
			}), this.getWaypoints(journey)]).then(function (a) {
				var _a = _slicedToArray(a, 2);

				var footprints = _a[0];
				var waypoints = _a[1];
				//footprints.splice(0,0,...waypoints)

				footprints.sort(function (a, b) {
					return a.when.getTime() - b.when.getTime();
				});
				return footprints;
			}, console.error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9qb3VybmV5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFPcUIsU0FBUTtPQUNwQixZQUFtQixRQUFuQixVQURvQjtPQUNWLFVBQVMsUUFBVCxRQURVOztBQUUzQixPQUFHLGFBQWEsVUFBVSxPQUFWLE1BQXFCLEtBQUssR0FBTCxFQUFyQixFQUNmLE9BQU8sUUFBUSxPQUFSLENBQWdCLEVBQWhCLENBQVAsQ0FERDs7QUFHQSxVQUFPLG1CQUFTLEdBQVQsQ0FBYSxTQUFiLEVBQXdCLE9BQXhCLENBQVAsQ0FMMkI7Ozs7Z0NBUVAsU0FBUTtBQUM1QixVQUFPLFFBQVEsR0FBUixDQUFZLENBQ2xCLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQ7V0FBa0Isb0JBQVUsSUFBVixHQUFpQixLQUFqQixDQUF1QjtZQUFZLFFBQVEsVUFBUjtLQUFaLEVBQWlDLE1BQXhEO0lBQWxCLENBRE0sRUFFbEIsS0FBSyxZQUFMLENBQWtCLE9BQWxCLENBRmtCLENBQVosRUFHSCxJQUhHLENBR0UsYUFBRzs0QkFDbUIsTUFEbkI7O1FBQ0gsbUJBREc7UUFDUTs7QUFEUjtBQUdWLGVBQVcsSUFBWCxDQUFnQixVQUFDLENBQUQsRUFBRyxDQUFIO1lBQU8sRUFBRSxJQUFGLENBQU8sT0FBUCxLQUFpQixFQUFFLElBQUYsQ0FBTyxPQUFQLEVBQWpCO0tBQVAsQ0FBaEIsQ0FIVTtBQUlWLFdBQU8sVUFBUCxDQUpVO0lBQUgsRUFLTCxRQUFRLEtBQVIsQ0FSSixDQUQ0Qjs7OztzQkFaWDtBQUNqQixVQUFPLFNBQVAsQ0FEaUIiLCJmaWxlIjoiam91cm5leS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWwsVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IExvY2F0aW9uIGZyb20gXCIuL2xvY2F0aW9uXCJcclxuaW1wb3J0IEZvb3RwcmludCBmcm9tIFwiLi9mb290cHJpbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNb2RlbHtcclxuXHRzdGF0aWMgZ2V0IF9uYW1lKCl7XHJcblx0XHRyZXR1cm4gXCJqb3VybmV5XCJcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGdldFdheXBvaW50cyhqb3VybmV5KXtcclxuXHRcdGNvbnN0IHtzdGFydGVkQXQsZW5kZWRBdH09am91cm5leVxyXG5cdFx0aWYoc3RhcnRlZEF0ICYmIHN0YXJ0ZWRBdC5nZXRUaW1lKCk+PURhdGUubm93KCkpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoW10pXHJcblx0XHRcclxuXHRcdHJldHVybiBMb2NhdGlvbi5nZXQoc3RhcnRlZEF0LCBlbmRlZEF0KVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgZ2V0Rm9vdHByaW50cyhqb3VybmV5KXtcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChbXHJcblx0XHRcdG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PkZvb3RwcmludC5maW5kKCkuZmV0Y2goZm9vdHByaW50cz0+cmVzb2x2ZShmb290cHJpbnRzKSwgcmVqZWN0KSksXHJcblx0XHRcdHRoaXMuZ2V0V2F5cG9pbnRzKGpvdXJuZXkpXHJcblx0XHRcdF0pLnRoZW4oYT0+e1xyXG5cdFx0XHRcdGNvbnN0IFtmb290cHJpbnRzLHdheXBvaW50c109YVxyXG5cdFx0XHRcdC8vZm9vdHByaW50cy5zcGxpY2UoMCwwLC4uLndheXBvaW50cylcclxuXHRcdFx0XHRmb290cHJpbnRzLnNvcnQoKGEsYik9PmEud2hlbi5nZXRUaW1lKCktYi53aGVuLmdldFRpbWUoKSlcclxuXHRcdFx0XHRyZXR1cm4gZm9vdHByaW50c1xyXG5cdFx0XHR9LCBjb25zb2xlLmVycm9yKVxyXG5cdH1cclxufVxyXG4iXX0=