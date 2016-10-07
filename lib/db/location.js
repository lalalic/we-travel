"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

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
		key: "_name",
		get: function get() {
			return "__abc__";
		}
	}]);

	return _class;
}(_qiliApp.Model);

_class.schema = {
	/*
 geo:{type:"Point",coordinates:[lat,lng]},
 thumbnail,
 photo,
 when,
 createdAt,
 author
 */
};
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9sb2NhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQUdtQjtBQUNqQixVQUFPLFNBQVAsQ0FEaUI7Ozs7Ozs7T0FJWCxTQUFPIiwiZmlsZSI6ImxvY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbH0gZnJvbSBcInFpbGktYXBwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNb2RlbHtcblx0c3RhdGljIGdldCBfbmFtZSgpe1xuXHRcdHJldHVybiBcIl9fYWJjX19cIlxuXHR9XG5cblx0c3RhdGljIHNjaGVtYT17XG5cdC8qXG5cdGdlbzp7dHlwZTpcIlBvaW50XCIsY29vcmRpbmF0ZXM6W2xhdCxsbmddfSxcblx0dGh1bWJuYWlsLFxuXHRwaG90byxcblx0d2hlbixcblx0Y3JlYXRlZEF0LFxuXHRhdXRob3Jcblx0Ki9cblx0fVxufVxuIl19