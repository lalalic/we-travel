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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJKb3VybmV5IiwiRm9vdHByaW50IiwiV2F5cG9pbnQiLCJJdGluZXJhcnkiLCJpbml0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2tCQUVlO0FBQ2RBLDJCQURjO0FBRWJDLCtCQUZhO0FBR2JDLDZCQUhhO0FBSWJDLCtCQUphO0FBS2JDLEtBTGEsa0JBS1A7QUFDTixvQkFBUUEsSUFBUjtBQUNBLHNCQUFVQSxJQUFWO0FBQ0EscUJBQVNBLElBQVQ7QUFDQSxzQkFBVUEsSUFBVjtBQUNBO0FBVmEsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGb290cHJpbnQgZnJvbSBcIi4vZm9vdHByaW50XCJcclxuaW1wb3J0IEpvdXJuZXkgZnJvbSBcIi4vam91cm5leVwiXHJcbmltcG9ydCBXYXlwb2ludCBmcm9tIFwiLi93YXlwb2ludFwiXHJcbmltcG9ydCBJdGluZXJhcnkgZnJvbSBcIi4vaXRpbmVyYXJ5XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRKb3VybmV5XHJcblx0LEZvb3RwcmludFxyXG5cdCxXYXlwb2ludFxyXG5cdCxJdGluZXJhcnlcclxuXHQsaW5pdCgpe1xyXG5cdFx0Sm91cm5leS5pbml0KClcclxuXHRcdEZvb3RwcmludC5pbml0KClcclxuXHRcdFdheXBvaW50LmluaXQoKVxyXG5cdFx0SXRpbmVyYXJ5LmluaXQoKVxyXG5cdH1cclxufVxyXG4iXX0=