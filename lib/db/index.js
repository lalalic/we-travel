"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _footprint = require("./footprint");

var _footprint2 = _interopRequireDefault(_footprint);

var _journey = require("./journey");

var _journey2 = _interopRequireDefault(_journey);

var _waypoint = require("./waypoint");

var _waypoint2 = _interopRequireDefault(_waypoint);

var _itinerary = require("./itinerary");

var _itinerary2 = _interopRequireDefault(_itinerary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	Journey: _journey2.default,
	Footprint: _footprint2.default,
	Waypoint: _waypoint2.default,
	Itinerary: _itinerary2.default,
	init: function init() {
		_journey2.default.init();
		_footprint2.default.init();
		_waypoint2.default.init();
		_itinerary2.default.init();
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUVlO0FBQ2QsMkJBRGM7QUFFYiwrQkFGYTtBQUdiLDZCQUhhO0FBSWIsK0JBSmE7QUFLYix1QkFBTTtBQUNOLG9CQUFRLElBQVIsR0FETTtBQUVOLHNCQUFVLElBQVYsR0FGTTtBQUdOLHFCQUFTLElBQVQsR0FITTtBQUlOLHNCQUFVLElBQVYsR0FKTTtFQUxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZvb3RwcmludCBmcm9tIFwiLi9mb290cHJpbnRcIlxyXG5pbXBvcnQgSm91cm5leSBmcm9tIFwiLi9qb3VybmV5XCJcclxuaW1wb3J0IFdheXBvaW50IGZyb20gXCIuL3dheXBvaW50XCJcclxuaW1wb3J0IEl0aW5lcmFyeSBmcm9tIFwiLi9pdGluZXJhcnlcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdEpvdXJuZXlcclxuXHQsRm9vdHByaW50XHJcblx0LFdheXBvaW50XHJcblx0LEl0aW5lcmFyeVxyXG5cdCxpbml0KCl7XHJcblx0XHRKb3VybmV5LmluaXQoKVxyXG5cdFx0Rm9vdHByaW50LmluaXQoKVxyXG5cdFx0V2F5cG9pbnQuaW5pdCgpXHJcblx0XHRJdGluZXJhcnkuaW5pdCgpXHJcblx0fVxyXG59XHJcbiJdfQ==