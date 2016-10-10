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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

				footprints.splice.apply(footprints, [0, 0].concat(_toConsumableArray(waypoints)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9qb3VybmV5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQU9xQixTQUFRO09BQ3BCLFlBQW1CLFFBQW5CLFVBRG9CO09BQ1YsVUFBUyxRQUFULFFBRFU7O0FBRTNCLE9BQUcsYUFBYSxVQUFVLE9BQVYsTUFBcUIsS0FBSyxHQUFMLEVBQXJCLEVBQ2YsT0FBTyxRQUFRLE9BQVIsQ0FBZ0IsRUFBaEIsQ0FBUCxDQUREOztBQUdBLFVBQU8sbUJBQVMsR0FBVCxDQUFhLFNBQWIsRUFBd0IsT0FBeEIsQ0FBUCxDQUwyQjs7OztnQ0FRUCxTQUFRO0FBQzVCLFVBQU8sUUFBUSxHQUFSLENBQVksQ0FDbEIsSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVMsTUFBVDtXQUFrQixvQkFBVSxJQUFWLEdBQWlCLEtBQWpCLENBQXVCO1lBQVksUUFBUSxVQUFSO0tBQVosRUFBaUMsTUFBeEQ7SUFBbEIsQ0FETSxFQUVsQixLQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FGa0IsQ0FBWixFQUdILElBSEcsQ0FHRSxhQUFHOzRCQUNtQixNQURuQjs7UUFDSCxtQkFERztRQUNRLGtCQURSOztBQUVWLGVBQVcsTUFBWCxvQkFBa0IsR0FBRSw2QkFBSyxXQUF6QixFQUZVO0FBR1YsZUFBVyxJQUFYLENBQWdCLFVBQUMsQ0FBRCxFQUFHLENBQUg7WUFBTyxFQUFFLElBQUYsQ0FBTyxPQUFQLEtBQWlCLEVBQUUsSUFBRixDQUFPLE9BQVAsRUFBakI7S0FBUCxDQUFoQixDQUhVO0FBSVYsV0FBTyxVQUFQLENBSlU7SUFBSCxFQUtMLFFBQVEsS0FBUixDQVJKLENBRDRCOzs7O3NCQVpYO0FBQ2pCLFVBQU8sU0FBUCxDQURpQiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCxVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQgTG9jYXRpb24gZnJvbSBcIi4vbG9jYXRpb25cIlxyXG5pbXBvcnQgRm9vdHByaW50IGZyb20gXCIuL2Zvb3RwcmludFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE1vZGVse1xyXG5cdHN0YXRpYyBnZXQgX25hbWUoKXtcclxuXHRcdHJldHVybiBcImpvdXJuZXlcIlxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgZ2V0V2F5cG9pbnRzKGpvdXJuZXkpe1xyXG5cdFx0Y29uc3Qge3N0YXJ0ZWRBdCxlbmRlZEF0fT1qb3VybmV5XHJcblx0XHRpZihzdGFydGVkQXQgJiYgc3RhcnRlZEF0LmdldFRpbWUoKT49RGF0ZS5ub3coKSlcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShbXSlcclxuXHRcdFxyXG5cdFx0cmV0dXJuIExvY2F0aW9uLmdldChzdGFydGVkQXQsIGVuZGVkQXQpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXRGb290cHJpbnRzKGpvdXJuZXkpe1xyXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKFtcclxuXHRcdFx0bmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+Rm9vdHByaW50LmZpbmQoKS5mZXRjaChmb290cHJpbnRzPT5yZXNvbHZlKGZvb3RwcmludHMpLCByZWplY3QpKSxcclxuXHRcdFx0dGhpcy5nZXRXYXlwb2ludHMoam91cm5leSlcclxuXHRcdFx0XSkudGhlbihhPT57XHJcblx0XHRcdFx0Y29uc3QgW2Zvb3RwcmludHMsd2F5cG9pbnRzXT1hXHJcblx0XHRcdFx0Zm9vdHByaW50cy5zcGxpY2UoMCwwLC4uLndheXBvaW50cylcclxuXHRcdFx0XHRmb290cHJpbnRzLnNvcnQoKGEsYik9PmEud2hlbi5nZXRUaW1lKCktYi53aGVuLmdldFRpbWUoKSlcclxuXHRcdFx0XHRyZXR1cm4gZm9vdHByaW50c1xyXG5cdFx0XHR9LCBjb25zb2xlLmVycm9yKVxyXG5cdH1cclxufVxyXG4iXX0=