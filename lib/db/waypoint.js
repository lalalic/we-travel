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

var MAX_UPLOAD = 100;

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
				if (data && data.length) {
					var _ret = function () {
						var len = data.length;
						console.log("found " + len + " location data from photos, uploading");
						var chunks = new Array(Math.ceil(len / MAX_UPLOAD));
						var userId = _qiliApp.User.current._id;
						data.forEach(function (a, i) {
							a._id = userId + "." + a.when;
							a.when = new Date(a.when);
							a.loc = { x: a.lng, y: a.lat };
							delete a.lng;
							delete a.lat;
							var index = Math.floor(i / MAX_UPLOAD);
							if (!chunks[index]) chunks[index] = [];
							chunks[index].push(a);
						});

						var counter = 0,
						    args = [counter, len, data[0].when, data[len - 1].when];
						Waypoint.emit.apply(Waypoint, ["upload"].concat(args));
						return {
							v: chunks.reduce(function (p, chunk) {
								return p.then(function (a) {
									return Waypoint.upsert(chunk, null, null, null, true).then(function (n) {
										console.log("totally uploaded " + (counter += n) + " locations");
										args.splice(0, 1, counter);
										Waypoint.emit.apply(Waypoint, ["upload"].concat(args));
										return _qiliApp.User.localStorage.setItem("lastUpload", chunk[chunk.length - 1].when);
									});
								});
							}, Promise.resolve()).then(function (a) {
								console.log("uploaded all " + counter + " location data");
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
		value: function get(start, end, success, error) {
			var _this2 = this;

			return Promise.resolve(require("./location-data")).then(success, error);

			var cond = {};
			if (start) cond.$gte = start.getTime();
			if (end) cond.$lte = end.getTime();
			if (typeof PhotoPos == 'undefined') {
				this.find({ when: cond }).fetch(success, error);
			} else {
				return PhotoPos.query(start, end).then(function (locs) {
					if (locs && locs.length) {
						success(locs);
					} else {
						_this2.find({ when: cond }).fetch(success, error);
					}
				});
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi93YXlwb2ludC5qcyJdLCJuYW1lcyI6WyJNQVhfVVBMT0FEIiwiV2F5cG9pbnQiLCJQaG90b1BvcyIsInF1ZXJ5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZXF1aXJlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInRoZW4iLCJkYXRhIiwibGVuZ3RoIiwibGVuIiwiY29uc29sZSIsImxvZyIsImNodW5rcyIsIkFycmF5IiwiTWF0aCIsImNlaWwiLCJ1c2VySWQiLCJjdXJyZW50IiwiX2lkIiwiZm9yRWFjaCIsImEiLCJpIiwid2hlbiIsIkRhdGUiLCJsb2MiLCJ4IiwibG5nIiwieSIsImxhdCIsImluZGV4IiwiZmxvb3IiLCJwdXNoIiwiY291bnRlciIsImFyZ3MiLCJlbWl0IiwicmVkdWNlIiwicCIsImNodW5rIiwidXBzZXJ0IiwibiIsInNwbGljZSIsInNldEl0ZW0iLCJzdGFydCIsImVuZCIsInN1Y2Nlc3MiLCJlcnJvciIsImNvbmQiLCIkZ3RlIiwiZ2V0VGltZSIsIiRsdGUiLCJmaW5kIiwiZmV0Y2giLCJsb2NzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBSUEsYUFBVyxHQUFmOztJQUNxQkMsUTs7Ozs7Ozs7Ozs7MkJBS0w7QUFDZCxPQUFJQyxXQUFTO0FBQ1pDLFNBRFksbUJBQ0w7QUFDTixZQUFPQyxRQUFRQyxPQUFSLENBQWdCQyxRQUFRLGlCQUFSLENBQWhCLENBQVA7QUFDQTtBQUhXLElBQWI7O0FBTUEsT0FBRyxPQUFPSixRQUFQLElBQWtCLFdBQXJCLEVBQ0M7QUFDRCxVQUFPQSxTQUFTQyxLQUFULENBQWUsY0FBS0ksWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEIsWUFBMUIsRUFBdUMsSUFBdkMsQ0FBZixFQUNMQyxJQURLLENBQ0EsZ0JBQU07QUFDWCxRQUFHQyxRQUFRQSxLQUFLQyxNQUFoQixFQUF1QjtBQUFBO0FBQ3RCLFVBQUlDLE1BQUlGLEtBQUtDLE1BQWI7QUFDQUUs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SyxLQUF2QixDQUE2QlAsT0FBN0IsRUFBc0NDLEtBQXRDO0FBQ0EsSUFGRCxNQUVLO0FBQ0osV0FBTzlDLFNBQVNDLEtBQVQsQ0FBZTBDLEtBQWYsRUFBcUJDLEdBQXJCLEVBQ0xyQyxJQURLLENBQ0EsZ0JBQU07QUFDWCxTQUFHOEMsUUFBUUEsS0FBSzVDLE1BQWhCLEVBQXVCO0FBQ3RCb0MsY0FBUVEsSUFBUjtBQUNBLE1BRkQsTUFFSztBQUNKLGFBQUtGLElBQUwsQ0FBVSxFQUFDNUIsTUFBS3dCLElBQU4sRUFBVixFQUF1QkssS0FBdkIsQ0FBNkJQLE9BQTdCLEVBQXFDQyxLQUFyQztBQUNBO0FBQ0QsS0FQSyxDQUFQO0FBUUE7QUFDRDs7O3NCQXhFaUI7QUFDakIsVUFBTyxVQUFQO0FBQ0E7Ozs7OztrQkFIbUIvQyxRIiwiZmlsZSI6IndheXBvaW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcblxudmFyIE1BWF9VUExPQUQ9MTAwXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXlwb2ludCBleHRlbmRzIE1vZGVse1xuXHRzdGF0aWMgZ2V0IF9uYW1lKCl7XG5cdFx0cmV0dXJuIFwid2F5cG9pbnRcIlxuXHR9XG5cblx0c3RhdGljIHVwbG9hZCgpe1xuXHRcdGxldCBQaG90b1Bvcz17XG5cdFx0XHRxdWVyeSgpe1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVpcmUoXCIuL2xvY2F0aW9uLWRhdGFcIikpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYodHlwZW9mKFBob3RvUG9zKT09J3VuZGVmaW5lZCcpXG5cdFx0XHRyZXR1cm5cblx0XHRyZXR1cm4gUGhvdG9Qb3MucXVlcnkoVXNlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxhc3RVcGxvYWRcIixudWxsKSlcblx0XHRcdC50aGVuKGRhdGE9Pntcblx0XHRcdFx0aWYoZGF0YSAmJiBkYXRhLmxlbmd0aCl7XG5cdFx0XHRcdFx0bGV0IGxlbj1kYXRhLmxlbmd0aFxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGBmb3VuZCAke2xlbn0gbG9jYXRpb24gZGF0YSBmcm9tIHBob3RvcywgdXBsb2FkaW5nYClcblx0XHRcdFx0XHRsZXQgY2h1bmtzPW5ldyBBcnJheShNYXRoLmNlaWwobGVuL01BWF9VUExPQUQpKVxuXHRcdFx0XHRcdGxldCB1c2VySWQ9VXNlci5jdXJyZW50Ll9pZFxuXHRcdFx0XHRcdGRhdGEuZm9yRWFjaCgoYSxpKT0+e1xuXHRcdFx0XHRcdFx0YS5faWQ9YCR7dXNlcklkfS4ke2Eud2hlbn1gXG5cdFx0XHRcdFx0XHRhLndoZW49bmV3IERhdGUoYS53aGVuKVxuXHRcdFx0XHRcdFx0YS5sb2M9e3g6YS5sbmcseTphLmxhdH1cblx0XHRcdFx0XHRcdGRlbGV0ZSBhLmxuZ1xuXHRcdFx0XHRcdFx0ZGVsZXRlIGEubGF0XG5cdFx0XHRcdFx0XHRsZXQgaW5kZXg9TWF0aC5mbG9vcihpL01BWF9VUExPQUQpXG5cdFx0XHRcdFx0XHRpZighY2h1bmtzW2luZGV4XSlcblx0XHRcdFx0XHRcdFx0Y2h1bmtzW2luZGV4XT1bXVxuXHRcdFx0XHRcdFx0Y2h1bmtzW2luZGV4XS5wdXNoKGEpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsZXQgY291bnRlcj0wLCBhcmdzPVtjb3VudGVyLGxlbiwgZGF0YVswXS53aGVuLCBkYXRhW2xlbi0xXS53aGVuXVxuXHRcdFx0XHRcdFdheXBvaW50LmVtaXQoXCJ1cGxvYWRcIiwuLi5hcmdzKVxuXHRcdFx0XHRcdHJldHVybiBjaHVua3MucmVkdWNlKChwLGNodW5rKT0+e1xuXHRcdFx0XHRcdFx0cmV0dXJuIHAudGhlbihhPT57XG5cdFx0XHRcdFx0XHRcdHJldHVybiBXYXlwb2ludC51cHNlcnQoY2h1bmssbnVsbCxudWxsLG51bGwsdHJ1ZSlcblx0XHRcdFx0XHRcdFx0XHQudGhlbihuPT57XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhgdG90YWxseSB1cGxvYWRlZCAke2NvdW50ZXIrPW59IGxvY2F0aW9uc2ApXG5cdFx0XHRcdFx0XHRcdFx0XHRhcmdzLnNwbGljZSgwLDEsY291bnRlcilcblx0XHRcdFx0XHRcdFx0XHRcdFdheXBvaW50LmVtaXQoXCJ1cGxvYWRcIiwuLi5hcmdzKVxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsYXN0VXBsb2FkXCIsY2h1bmtbY2h1bmsubGVuZ3RoLTFdLndoZW4pXG5cdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fSxQcm9taXNlLnJlc29sdmUoKSkudGhlbihhPT57XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhgdXBsb2FkZWQgYWxsICR7Y291bnRlcn0gbG9jYXRpb24gZGF0YWApXG5cdFx0XHRcdFx0XHRyZXR1cm4gVXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhc3RVcGxvYWRcIixuZXcgRGF0ZSgpKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgZ2V0KHN0YXJ0LCBlbmQsIHN1Y2Nlc3MsIGVycm9yKXtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVpcmUoXCIuL2xvY2F0aW9uLWRhdGFcIikpLnRoZW4oc3VjY2VzcyxlcnJvcilcblx0XHRcblx0XHRsZXQgY29uZD17fVxuXHRcdGlmKHN0YXJ0KVxuXHRcdFx0Y29uZC4kZ3RlPXN0YXJ0LmdldFRpbWUoKVxuXHRcdGlmKGVuZClcblx0XHRcdGNvbmQuJGx0ZT1lbmQuZ2V0VGltZSgpXG5cdFx0aWYodHlwZW9mKFBob3RvUG9zKT09J3VuZGVmaW5lZCcpe1xuXHRcdFx0dGhpcy5maW5kKHt3aGVuOmNvbmR9KS5mZXRjaChzdWNjZXNzLCBlcnJvcilcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBQaG90b1Bvcy5xdWVyeShzdGFydCxlbmQpXG5cdFx0XHRcdC50aGVuKGxvY3M9Pntcblx0XHRcdFx0XHRpZihsb2NzICYmIGxvY3MubGVuZ3RoKXtcblx0XHRcdFx0XHRcdHN1Y2Nlc3MobG9jcylcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRoaXMuZmluZCh7d2hlbjpjb25kfSkuZmV0Y2goc3VjY2VzcyxlcnJvcilcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0fVxuXHR9XG59XG4iXX0=