"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Waypoint).apply(this, arguments));
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi93YXlwb2ludC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBSSxhQUFXLEdBQVg7O0lBQ2lCOzs7Ozs7Ozs7OzsyQkFLTDtBQUNkLE9BQUksV0FBUztBQUNaLDRCQUFPO0FBQ04sWUFBTyxRQUFRLE9BQVIsQ0FBZ0IsUUFBUSxpQkFBUixDQUFoQixDQUFQLENBRE07S0FESztJQUFULENBRFU7O0FBT2QsT0FBRyxPQUFPLFFBQVAsSUFBa0IsV0FBbEIsRUFDRixPQUREO0FBRUEsVUFBTyxTQUFTLEtBQVQsQ0FBZSxjQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBMEIsWUFBMUIsRUFBdUMsSUFBdkMsQ0FBZixFQUNMLElBREssQ0FDQSxnQkFBTTtBQUNYLFFBQUcsUUFBUSxLQUFLLE1BQUwsRUFBWTs7QUFDdEIsVUFBSSxNQUFJLEtBQUssTUFBTDtBQUNSLGNBQVEsR0FBUixZQUFxQiw2Q0FBckI7QUFDQSxVQUFJLFNBQU8sSUFBSSxLQUFKLENBQVUsS0FBSyxJQUFMLENBQVUsTUFBSSxVQUFKLENBQXBCLENBQVA7QUFDSixVQUFJLFNBQU8sY0FBSyxPQUFMLENBQWEsR0FBYjtBQUNYLFdBQUssT0FBTCxDQUFhLFVBQUMsQ0FBRCxFQUFHLENBQUgsRUFBTztBQUNuQixTQUFFLEdBQUYsR0FBUyxlQUFVLEVBQUUsSUFBRixDQURBO0FBRW5CLFNBQUUsSUFBRixHQUFPLElBQUksSUFBSixDQUFTLEVBQUUsSUFBRixDQUFoQixDQUZtQjtBQUduQixTQUFFLEdBQUYsR0FBTSxFQUFDLEdBQUUsRUFBRSxHQUFGLEVBQU0sR0FBRSxFQUFFLEdBQUYsRUFBakIsQ0FIbUI7QUFJbkIsY0FBTyxFQUFFLEdBQUYsQ0FKWTtBQUtuQixjQUFPLEVBQUUsR0FBRixDQUxZO0FBTW5CLFdBQUksUUFBTSxLQUFLLEtBQUwsQ0FBVyxJQUFFLFVBQUYsQ0FBakIsQ0FOZTtBQU9uQixXQUFHLENBQUMsT0FBTyxLQUFQLENBQUQsRUFDRixPQUFPLEtBQVAsSUFBYyxFQUFkLENBREQ7QUFFQSxjQUFPLEtBQVAsRUFBYyxJQUFkLENBQW1CLENBQW5CLEVBVG1CO09BQVAsQ0FBYjs7QUFZQSxVQUFJLFVBQVEsQ0FBUjtVQUFXLE9BQUssQ0FBQyxPQUFELEVBQVMsR0FBVCxFQUFjLEtBQUssQ0FBTCxFQUFRLElBQVIsRUFBYyxLQUFLLE1BQUksQ0FBSixDQUFMLENBQVksSUFBWixDQUFqQztBQUNmLGVBQVMsSUFBVCxrQkFBYyxpQkFBWSxLQUExQjtBQUNBO1VBQU8sT0FBTyxNQUFQLENBQWMsVUFBQyxDQUFELEVBQUcsS0FBSCxFQUFXO0FBQy9CLGVBQU8sRUFBRSxJQUFGLENBQU8sYUFBRztBQUNoQixnQkFBTyxTQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsRUFBc0IsSUFBdEIsRUFBMkIsSUFBM0IsRUFBZ0MsSUFBaEMsRUFBcUMsSUFBckMsRUFDTCxJQURLLENBQ0EsYUFBRztBQUNSLGtCQUFRLEdBQVIsd0JBQWdDLFdBQVMsQ0FBVCxnQkFBaEMsRUFEUTtBQUVSLGVBQUssTUFBTCxDQUFZLENBQVosRUFBYyxDQUFkLEVBQWdCLE9BQWhCLEVBRlE7QUFHUixtQkFBUyxJQUFULGtCQUFjLGlCQUFZLEtBQTFCLEVBSFE7QUFJUixpQkFBTyxjQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBMEIsWUFBMUIsRUFBdUMsTUFBTSxNQUFNLE1BQU4sR0FBYSxDQUFiLENBQU4sQ0FBc0IsSUFBdEIsQ0FBOUMsQ0FKUTtVQUFILENBRFAsQ0FEZ0I7U0FBSCxDQUFkLENBRCtCO1FBQVgsRUFVbkIsUUFBUSxPQUFSLEVBVkssRUFVYyxJQVZkLENBVW1CLGFBQUc7QUFDNUIsZ0JBQVEsR0FBUixtQkFBNEIsMEJBQTVCLEVBRDRCO0FBRTVCLGVBQU8sY0FBSyxZQUFMLENBQWtCLE9BQWxCLENBQTBCLFlBQTFCLEVBQXVDLElBQUksSUFBSixFQUF2QyxDQUFQLENBRjRCO1FBQUg7T0FWMUI7U0FuQnNCOzs7S0FBdkI7SUFESyxDQURQLENBVGM7Ozs7c0JBZ0RKLE9BQU8sS0FBSyxTQUFTLE9BQU07OztBQUNyQyxVQUFPLFFBQVEsT0FBUixDQUFnQixRQUFRLGlCQUFSLENBQWhCLEVBQTRDLElBQTVDLENBQWlELE9BQWpELEVBQXlELEtBQXpELENBQVAsQ0FEcUM7O0FBR3JDLE9BQUksT0FBSyxFQUFMLENBSGlDO0FBSXJDLE9BQUcsS0FBSCxFQUNDLEtBQUssSUFBTCxHQUFVLE1BQU0sT0FBTixFQUFWLENBREQ7QUFFQSxPQUFHLEdBQUgsRUFDQyxLQUFLLElBQUwsR0FBVSxJQUFJLE9BQUosRUFBVixDQUREO0FBRUEsT0FBRyxPQUFPLFFBQVAsSUFBa0IsV0FBbEIsRUFBOEI7QUFDaEMsU0FBSyxJQUFMLENBQVUsRUFBQyxNQUFLLElBQUwsRUFBWCxFQUF1QixLQUF2QixDQUE2QixPQUE3QixFQUFzQyxLQUF0QyxFQURnQztJQUFqQyxNQUVLO0FBQ0osV0FBTyxTQUFTLEtBQVQsQ0FBZSxLQUFmLEVBQXFCLEdBQXJCLEVBQ0wsSUFESyxDQUNBLGdCQUFNO0FBQ1gsU0FBRyxRQUFRLEtBQUssTUFBTCxFQUFZO0FBQ3RCLGNBQVEsSUFBUixFQURzQjtNQUF2QixNQUVLO0FBQ0osYUFBSyxJQUFMLENBQVUsRUFBQyxNQUFLLElBQUwsRUFBWCxFQUF1QixLQUF2QixDQUE2QixPQUE3QixFQUFxQyxLQUFyQyxFQURJO01BRkw7S0FESyxDQURQLENBREk7SUFGTDs7OztzQkE1RGlCO0FBQ2pCLFVBQU8sVUFBUCxDQURpQjs7OztRQURFIiwiZmlsZSI6IndheXBvaW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcblxudmFyIE1BWF9VUExPQUQ9MTAwXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXYXlwb2ludCBleHRlbmRzIE1vZGVse1xuXHRzdGF0aWMgZ2V0IF9uYW1lKCl7XG5cdFx0cmV0dXJuIFwid2F5cG9pbnRcIlxuXHR9XG5cblx0c3RhdGljIHVwbG9hZCgpe1xuXHRcdGxldCBQaG90b1Bvcz17XG5cdFx0XHRxdWVyeSgpe1xuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVpcmUoXCIuL2xvY2F0aW9uLWRhdGFcIikpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYodHlwZW9mKFBob3RvUG9zKT09J3VuZGVmaW5lZCcpXG5cdFx0XHRyZXR1cm5cblx0XHRyZXR1cm4gUGhvdG9Qb3MucXVlcnkoVXNlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxhc3RVcGxvYWRcIixudWxsKSlcblx0XHRcdC50aGVuKGRhdGE9Pntcblx0XHRcdFx0aWYoZGF0YSAmJiBkYXRhLmxlbmd0aCl7XG5cdFx0XHRcdFx0bGV0IGxlbj1kYXRhLmxlbmd0aFxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGBmb3VuZCAke2xlbn0gbG9jYXRpb24gZGF0YSBmcm9tIHBob3RvcywgdXBsb2FkaW5nYClcblx0XHRcdFx0XHRsZXQgY2h1bmtzPW5ldyBBcnJheShNYXRoLmNlaWwobGVuL01BWF9VUExPQUQpKVxuXHRcdFx0XHRcdGxldCB1c2VySWQ9VXNlci5jdXJyZW50Ll9pZFxuXHRcdFx0XHRcdGRhdGEuZm9yRWFjaCgoYSxpKT0+e1xuXHRcdFx0XHRcdFx0YS5faWQ9YCR7dXNlcklkfS4ke2Eud2hlbn1gXG5cdFx0XHRcdFx0XHRhLndoZW49bmV3IERhdGUoYS53aGVuKVxuXHRcdFx0XHRcdFx0YS5sb2M9e3g6YS5sbmcseTphLmxhdH1cblx0XHRcdFx0XHRcdGRlbGV0ZSBhLmxuZ1xuXHRcdFx0XHRcdFx0ZGVsZXRlIGEubGF0XG5cdFx0XHRcdFx0XHRsZXQgaW5kZXg9TWF0aC5mbG9vcihpL01BWF9VUExPQUQpXG5cdFx0XHRcdFx0XHRpZighY2h1bmtzW2luZGV4XSlcblx0XHRcdFx0XHRcdFx0Y2h1bmtzW2luZGV4XT1bXVxuXHRcdFx0XHRcdFx0Y2h1bmtzW2luZGV4XS5wdXNoKGEpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsZXQgY291bnRlcj0wLCBhcmdzPVtjb3VudGVyLGxlbiwgZGF0YVswXS53aGVuLCBkYXRhW2xlbi0xXS53aGVuXVxuXHRcdFx0XHRcdFdheXBvaW50LmVtaXQoXCJ1cGxvYWRcIiwuLi5hcmdzKVxuXHRcdFx0XHRcdHJldHVybiBjaHVua3MucmVkdWNlKChwLGNodW5rKT0+e1xuXHRcdFx0XHRcdFx0cmV0dXJuIHAudGhlbihhPT57XG5cdFx0XHRcdFx0XHRcdHJldHVybiBXYXlwb2ludC51cHNlcnQoY2h1bmssbnVsbCxudWxsLG51bGwsdHJ1ZSlcblx0XHRcdFx0XHRcdFx0XHQudGhlbihuPT57XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhgdG90YWxseSB1cGxvYWRlZCAke2NvdW50ZXIrPW59IGxvY2F0aW9uc2ApXG5cdFx0XHRcdFx0XHRcdFx0XHRhcmdzLnNwbGljZSgwLDEsY291bnRlcilcblx0XHRcdFx0XHRcdFx0XHRcdFdheXBvaW50LmVtaXQoXCJ1cGxvYWRcIiwuLi5hcmdzKVxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJsYXN0VXBsb2FkXCIsY2h1bmtbY2h1bmsubGVuZ3RoLTFdLndoZW4pXG5cdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fSxQcm9taXNlLnJlc29sdmUoKSkudGhlbihhPT57XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhgdXBsb2FkZWQgYWxsICR7Y291bnRlcn0gbG9jYXRpb24gZGF0YWApXG5cdFx0XHRcdFx0XHRyZXR1cm4gVXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhc3RVcGxvYWRcIixuZXcgRGF0ZSgpKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgZ2V0KHN0YXJ0LCBlbmQsIHN1Y2Nlc3MsIGVycm9yKXtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVpcmUoXCIuL2xvY2F0aW9uLWRhdGFcIikpLnRoZW4oc3VjY2VzcyxlcnJvcilcblx0XHRcblx0XHRsZXQgY29uZD17fVxuXHRcdGlmKHN0YXJ0KVxuXHRcdFx0Y29uZC4kZ3RlPXN0YXJ0LmdldFRpbWUoKVxuXHRcdGlmKGVuZClcblx0XHRcdGNvbmQuJGx0ZT1lbmQuZ2V0VGltZSgpXG5cdFx0aWYodHlwZW9mKFBob3RvUG9zKT09J3VuZGVmaW5lZCcpe1xuXHRcdFx0dGhpcy5maW5kKHt3aGVuOmNvbmR9KS5mZXRjaChzdWNjZXNzLCBlcnJvcilcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBQaG90b1Bvcy5xdWVyeShzdGFydCxlbmQpXG5cdFx0XHRcdC50aGVuKGxvY3M9Pntcblx0XHRcdFx0XHRpZihsb2NzICYmIGxvY3MubGVuZ3RoKXtcblx0XHRcdFx0XHRcdHN1Y2Nlc3MobG9jcylcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHRoaXMuZmluZCh7d2hlbjpjb25kfSkuZmV0Y2goc3VjY2VzcyxlcnJvcilcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0fVxuXHR9XG59XG4iXX0=