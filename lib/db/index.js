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
		_location2.default.init();
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNkLDJCQURjO0FBRWIsK0JBRmE7QUFHYiw2QkFIYTtBQUliLHVCQUFNO0FBQ04sb0JBQVEsSUFBUixHQURNO0FBRU4sc0JBQVUsSUFBVixHQUZNO0FBR04scUJBQVMsSUFBVCxHQUhNO0VBSk8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRm9vdHByaW50IGZyb20gXCIuL2Zvb3RwcmludFwiXHJcbmltcG9ydCBKb3VybmV5IGZyb20gXCIuL2pvdXJuZXlcIlxyXG5pbXBvcnQgTG9jYXRpb24gZnJvbSBcIi4vbG9jYXRpb25cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdEpvdXJuZXlcclxuXHQsRm9vdHByaW50XHJcblx0LExvY2F0aW9uXHJcblx0LGluaXQoKXtcclxuXHRcdEpvdXJuZXkuaW5pdCgpXHJcblx0XHRGb290cHJpbnQuaW5pdCgpXHJcblx0XHRMb2NhdGlvbi5pbml0KClcclxuXHR9XHJcbn1cclxuIl19