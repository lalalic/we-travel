"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _footprint = require("./footprint");

var _footprint2 = _interopRequireDefault(_footprint);

var _journey = require("./journey");

var _journey2 = _interopRequireDefault(_journey);

var _location = require("./location");

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	Journey: _journey2.default,
	Footprint: _footprint2.default,
	Location: _location2.default,
	init: function init() {
		_journey2.default.init();
		_footprint2.default.init();
		_location2.default.init(true); //local only
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNkLDJCQURjO0FBRWIsK0JBRmE7QUFHYiw2QkFIYTtBQUliLHVCQUFNO0FBQ04sb0JBQVEsSUFBUixHQURNO0FBRU4sc0JBQVUsSUFBVixHQUZNO0FBR04scUJBQVMsSUFBVCxDQUFjLElBQWQ7QUFITSxFQUpPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZvb3RwcmludCBmcm9tIFwiLi9mb290cHJpbnRcIlxyXG5pbXBvcnQgSm91cm5leSBmcm9tIFwiLi9qb3VybmV5XCJcclxuaW1wb3J0IExvY2F0aW9uIGZyb20gXCIuL2xvY2F0aW9uXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRKb3VybmV5XHJcblx0LEZvb3RwcmludFxyXG5cdCxMb2NhdGlvblxyXG5cdCxpbml0KCl7XHJcblx0XHRKb3VybmV5LmluaXQoKVxyXG5cdFx0Rm9vdHByaW50LmluaXQoKVxyXG5cdFx0TG9jYXRpb24uaW5pdCh0cnVlKS8vbG9jYWwgb25seVxyXG5cdH1cclxufVxyXG4iXX0=