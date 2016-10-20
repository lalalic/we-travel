"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Waypoint = function (_Model) {
	_inherits(Waypoint, _Model);

	function Waypoint() {
		_classCallCheck(this, Waypoint);

		return _possibleConstructorReturn(this, (Waypoint.__proto__ || Object.getPrototypeOf(Waypoint)).apply(this, arguments));
	}

	_createClass(Waypoint, null, [{
		key: "upload",
		value: function upload() {
			var PhotoPos = {
				query: function query() {
					return Promise.resolve(require("./location-data"));
				}
			};

			if (typeof PhotoPos == 'undefined') return;
			return PhotoPos.query(_qiliApp.User.localStorage.getItem("lastUpload", null)).then(function (data) {
				debugger;
				if (data && data.length) {
					var _ret = function () {
						console.log("found " + data.length + " location data from photos, uploading");
						var userId = _qiliApp.User.current._id;
						data.forEach(function (a) {
							a._id = userId + "." + a.when;
							a.when = new Date(a.when);
						});
						return {
							v: Waypoint.upsert(data, null, null, null, true).then(function (a) {
								console.log("uploaded location data");
								return _qiliApp.User.localStorage.setItem("lastUpload", new Date());
							})
						};
					}();

					if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
				}
			});
		}
	}, {
		key: "get",
		value: function get(start, end) {
			return Promise.resolve(require("./location-data"));
			var cond = {},
			    Location = this;
			if (start) cond.$gte = start.getTime();
			//if(end)
			//cond.$lte=end.getTime()

			return new Promise(function (resolve, reject) {
				Location.find({ when: cond }).fetch(function (locs) {
					console.log(locs);
					resolve(locs);
				}, reject);
			});
		}
	}, {
		key: "_name",
		get: function get() {
			return "waypoint";
		}
	}]);

	return Waypoint;
}(_qiliApp.Model);

exports.default = Waypoint;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi93YXlwb2ludC5qcyJdLCJuYW1lcyI6WyJXYXlwb2ludCIsIlBob3RvUG9zIiwicXVlcnkiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlcXVpcmUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidGhlbiIsImRhdGEiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwidXNlcklkIiwiY3VycmVudCIsIl9pZCIsImZvckVhY2giLCJhIiwid2hlbiIsIkRhdGUiLCJ1cHNlcnQiLCJzZXRJdGVtIiwic3RhcnQiLCJlbmQiLCJjb25kIiwiTG9jYXRpb24iLCIkZ3RlIiwiZ2V0VGltZSIsInJlamVjdCIsImZpbmQiLCJmZXRjaCIsImxvY3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7OzJCQUtMO0FBQ2QsT0FBSUMsV0FBUztBQUNaQyxTQURZLG1CQUNMO0FBQ04sWUFBT0MsUUFBUUMsT0FBUixDQUFnQkMsUUFBUSxpQkFBUixDQUFoQixDQUFQO0FBQ0E7QUFIVyxJQUFiOztBQU1BLE9BQUcsT0FBT0osUUFBUCxJQUFrQixXQUFyQixFQUNDO0FBQ0QsVUFBT0EsU0FBU0MsS0FBVCxDQUFlLGNBQUtJLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCLFlBQTFCLEVBQXVDLElBQXZDLENBQWYsRUFDTEMsSUFESyxDQUNBLGdCQUFNO0FBQ1g7QUFDQSxRQUFHQyxRQUFRQSxLQUFLQyxNQUFoQixFQUF1QjtBQUFBO0FBQ3RCQyxjQUFRQyxHQUFSLFlBQXFCSCxLQUFLQyxNQUExQjtBQUNBLFVBQUlHLFNBQU8sY0FBS0MsT0FBTCxDQUFhQyxHQUF4QjtBQUNBTixXQUFLTyxPQUFMLENBQWEsYUFBRztBQUNmQyxTQUFFRixHQUFGLEdBQVNGLE1BQVQsU0FBbUJJLEVBQUVDLElBQXJCO0FBQ0FELFNBQUVDLElBQUYsR0FBTyxJQUFJQyxJQUFKLENBQVNGLEVBQUVDLElBQVgsQ0FBUDtBQUNBLE9BSEQ7QUFJQTtBQUFBLFVBQU9sQixTQUFTb0IsTUFBVCxDQUFnQlgsSUFBaEIsRUFBcUIsSUFBckIsRUFBMEIsSUFBMUIsRUFBK0IsSUFBL0IsRUFBb0MsSUFBcEMsRUFDTEQsSUFESyxDQUNBLGFBQUc7QUFDUkcsZ0JBQVFDLEdBQVI7QUFDQSxlQUFPLGNBQUtOLFlBQUwsQ0FBa0JlLE9BQWxCLENBQTBCLFlBQTFCLEVBQXVDLElBQUlGLElBQUosRUFBdkMsQ0FBUDtBQUNBLFFBSks7QUFBUDtBQVBzQjs7QUFBQTtBQVl0QjtBQUNELElBaEJLLENBQVA7QUFpQkE7OztzQkFFVUcsSyxFQUFPQyxHLEVBQUk7QUFDckIsVUFBT3BCLFFBQVFDLE9BQVIsQ0FBZ0JDLFFBQVEsaUJBQVIsQ0FBaEIsQ0FBUDtBQUNBLE9BQUltQixPQUFLLEVBQVQ7QUFBQSxPQUFhQyxXQUFTLElBQXRCO0FBQ0EsT0FBR0gsS0FBSCxFQUNDRSxLQUFLRSxJQUFMLEdBQVVKLE1BQU1LLE9BQU4sRUFBVjtBQUNEO0FBQ0M7O0FBRUQsVUFBTyxJQUFJeEIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBU3dCLE1BQVQsRUFBa0I7QUFDcENILGFBQVNJLElBQVQsQ0FBYyxFQUFDWCxNQUFLTSxJQUFOLEVBQWQsRUFDRU0sS0FERixDQUNRLGdCQUFNO0FBQ1puQixhQUFRQyxHQUFSLENBQVltQixJQUFaO0FBQ0EzQixhQUFRMkIsSUFBUjtBQUNBLEtBSkYsRUFJR0gsTUFKSDtBQUtBLElBTk0sQ0FBUDtBQU9BOzs7c0JBL0NpQjtBQUNqQixVQUFPLFVBQVA7QUFDQTs7Ozs7O2tCQUhtQjVCLFEiLCJmaWxlIjoid2F5cG9pbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXlwb2ludCBleHRlbmRzIE1vZGVse1xuXHRzdGF0aWMgZ2V0IF9uYW1lKCl7XG5cdFx0cmV0dXJuIFwid2F5cG9pbnRcIlxuXHR9XG5cblx0c3RhdGljIHVwbG9hZCgpe1xuXHRcdGxldCBQaG90b1Bvcz17XG5cdFx0XHRxdWVyeSgpe1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVpcmUoXCIuL2xvY2F0aW9uLWRhdGFcIikpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYodHlwZW9mKFBob3RvUG9zKT09J3VuZGVmaW5lZCcpXG5cdFx0XHRyZXR1cm5cblx0XHRyZXR1cm4gUGhvdG9Qb3MucXVlcnkoVXNlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxhc3RVcGxvYWRcIixudWxsKSlcblx0XHRcdC50aGVuKGRhdGE9Pntcblx0XHRcdFx0ZGVidWdnZXJcblx0XHRcdFx0aWYoZGF0YSAmJiBkYXRhLmxlbmd0aCl7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coYGZvdW5kICR7ZGF0YS5sZW5ndGh9IGxvY2F0aW9uIGRhdGEgZnJvbSBwaG90b3MsIHVwbG9hZGluZ2ApXG5cdFx0XHRcdFx0bGV0IHVzZXJJZD1Vc2VyLmN1cnJlbnQuX2lkXG5cdFx0XHRcdFx0ZGF0YS5mb3JFYWNoKGE9Pntcblx0XHRcdFx0XHRcdGEuX2lkPWAke3VzZXJJZH0uJHthLndoZW59YFxuXHRcdFx0XHRcdFx0YS53aGVuPW5ldyBEYXRlKGEud2hlbilcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdHJldHVybiBXYXlwb2ludC51cHNlcnQoZGF0YSxudWxsLG51bGwsbnVsbCx0cnVlKVxuXHRcdFx0XHRcdFx0LnRoZW4oYT0+e1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhgdXBsb2FkZWQgbG9jYXRpb24gZGF0YWApXG5cdFx0XHRcdFx0XHRcdHJldHVybiBVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibGFzdFVwbG9hZFwiLG5ldyBEYXRlKCkpXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHR9XG5cblx0c3RhdGljIGdldChzdGFydCwgZW5kKXtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVpcmUoXCIuL2xvY2F0aW9uLWRhdGFcIikpXG5cdFx0bGV0IGNvbmQ9e30sIExvY2F0aW9uPXRoaXNcblx0XHRpZihzdGFydClcblx0XHRcdGNvbmQuJGd0ZT1zdGFydC5nZXRUaW1lKClcblx0XHQvL2lmKGVuZClcblx0XHRcdC8vY29uZC4kbHRlPWVuZC5nZXRUaW1lKClcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG5cdFx0XHRMb2NhdGlvbi5maW5kKHt3aGVuOmNvbmR9KVxuXHRcdFx0XHQuZmV0Y2gobG9jcz0+e1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGxvY3MpXG5cdFx0XHRcdFx0cmVzb2x2ZShsb2NzKVxuXHRcdFx0XHR9LHJlamVjdClcblx0XHR9KVxuXHR9XG59XG4iXX0=