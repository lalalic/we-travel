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
		key: "upsert",
		value: function upsert() {
			var _cols;

			return (_cols = this.cols).upsert.apply(_cols, arguments);
		}
	}, {
		key: "get",
		value: function get(start, end) {
			return Promise.resolve([{ loc: { coordinates: [40.2423, 168.234343] } }, { loc: { coordinates: [40.2433, 168.234443] } }]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9sb2NhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQU9nQjs7O0FBQ2QsVUFBTyxjQUFLLElBQUwsRUFBVSxNQUFWLGNBQW9CLFNBQXBCLENBQVAsQ0FEYzs7OztzQkFJSixPQUFPLEtBQUk7QUFDckIsVUFBTyxRQUFRLE9BQVIsQ0FBZ0IsQ0FBQyxFQUFDLEtBQUksRUFBQyxhQUFZLENBQUMsT0FBRCxFQUFTLFVBQVQsQ0FBWixFQUFMLEVBQUYsRUFBMEMsRUFBQyxLQUFJLEVBQUMsYUFBWSxDQUFDLE9BQUQsRUFBUyxVQUFULENBQVosRUFBTCxFQUEzQyxDQUFoQixDQUFQLENBRHFCO0FBRXJCLE9BQUksT0FBSyxFQUFMO09BQVMsV0FBUyxJQUFULENBRlE7QUFHckIsT0FBRyxLQUFILEVBQ0MsS0FBSyxJQUFMLEdBQVUsTUFBTSxPQUFOLEVBQVYsQ0FERDs7OztBQUhxQixVQVFkLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQsRUFBa0I7QUFDcEMsYUFBUyxJQUFULENBQWMsRUFBQyxNQUFLLElBQUwsRUFBZixFQUNFLEtBREYsQ0FDUSxnQkFBTTtBQUNaLGFBQVEsR0FBUixDQUFZLElBQVosRUFEWTtBQUVaLGFBQVEsSUFBUixFQUZZO0tBQU4sRUFHTCxNQUpILEVBRG9DO0lBQWxCLENBQW5CLENBUnFCOzs7O3NCQVJKO0FBQ2pCLFVBQU8sU0FBUCxDQURpQjs7Ozs7OztPQXlCWCxTQUFPIiwiZmlsZSI6ImxvY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbH0gZnJvbSBcInFpbGktYXBwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNb2RlbHtcblx0c3RhdGljIGdldCBfbmFtZSgpe1xuXHRcdHJldHVybiBcIl9fYWJjX19cIlxuXHR9XG5cdFxuXHRzdGF0aWMgdXBzZXJ0KCl7XG5cdFx0cmV0dXJuIHRoaXMuY29scy51cHNlcnQoLi4uYXJndW1lbnRzKVxuXHR9XG5cdFxuXHRzdGF0aWMgZ2V0KHN0YXJ0LCBlbmQpe1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoW3tsb2M6e2Nvb3JkaW5hdGVzOls0MC4yNDIzLDE2OC4yMzQzNDNdfX0se2xvYzp7Y29vcmRpbmF0ZXM6WzQwLjI0MzMsMTY4LjIzNDQ0M119fV0pXG5cdFx0bGV0IGNvbmQ9e30sIExvY2F0aW9uPXRoaXNcblx0XHRpZihzdGFydClcblx0XHRcdGNvbmQuJGd0ZT1zdGFydC5nZXRUaW1lKClcblx0XHQvL2lmKGVuZClcblx0XHRcdC8vY29uZC4kbHRlPWVuZC5nZXRUaW1lKClcblx0XHRcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuXHRcdFx0TG9jYXRpb24uZmluZCh7d2hlbjpjb25kfSlcblx0XHRcdFx0LmZldGNoKGxvY3M9Pntcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhsb2NzKVxuXHRcdFx0XHRcdHJlc29sdmUobG9jcylcdFxuXHRcdFx0XHR9LHJlamVjdClcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIHNjaGVtYT17XG5cdC8qXG5cdGdlbzp7dHlwZTpcIlBvaW50XCIsY29vcmRpbmF0ZXM6W2xhdCxsbmddfSxcblx0dGh1bWJuYWlsLFxuXHRwaG90byxcblx0d2hlbixcblx0Y3JlYXRlZEF0LFxuXHRhdXRob3Jcblx0Ki9cblx0fVxufVxuIl19