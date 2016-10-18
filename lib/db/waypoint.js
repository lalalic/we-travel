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

	return _class;
}(_qiliApp.Model);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi93YXlwb2ludC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQU9nQjs7O0FBQ2QsVUFBTyxjQUFLLElBQUwsRUFBVSxNQUFWLGNBQW9CLFNBQXBCLENBQVAsQ0FEYzs7OztzQkFJSixPQUFPLEtBQUk7QUFDckIsVUFBTyxRQUFRLE9BQVIsQ0FBZ0IsUUFBUSxpQkFBUixDQUFoQixDQUFQLENBRHFCO0FBRXJCLE9BQUksT0FBSyxFQUFMO09BQVMsV0FBUyxJQUFULENBRlE7QUFHckIsT0FBRyxLQUFILEVBQ0MsS0FBSyxJQUFMLEdBQVUsTUFBTSxPQUFOLEVBQVYsQ0FERDs7OztBQUhxQixVQVFkLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQsRUFBa0I7QUFDcEMsYUFBUyxJQUFULENBQWMsRUFBQyxNQUFLLElBQUwsRUFBZixFQUNFLEtBREYsQ0FDUSxnQkFBTTtBQUNaLGFBQVEsR0FBUixDQUFZLElBQVosRUFEWTtBQUVaLGFBQVEsSUFBUixFQUZZO0tBQU4sRUFHTCxNQUpILEVBRG9DO0lBQWxCLENBQW5CLENBUnFCOzs7O3NCQVJKO0FBQ2pCLFVBQU8sVUFBUCxDQURpQiIsImZpbGUiOiJ3YXlwb2ludC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWx9IGZyb20gXCJxaWxpLWFwcFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgTW9kZWx7XG5cdHN0YXRpYyBnZXQgX25hbWUoKXtcblx0XHRyZXR1cm4gXCJ3YXlwb2ludFwiXG5cdH1cblxuXHRzdGF0aWMgdXBzZXJ0KCl7XG5cdFx0cmV0dXJuIHRoaXMuY29scy51cHNlcnQoLi4uYXJndW1lbnRzKVxuXHR9XG5cblx0c3RhdGljIGdldChzdGFydCwgZW5kKXtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcXVpcmUoXCIuL2xvY2F0aW9uLWRhdGFcIikpXG5cdFx0bGV0IGNvbmQ9e30sIExvY2F0aW9uPXRoaXNcblx0XHRpZihzdGFydClcblx0XHRcdGNvbmQuJGd0ZT1zdGFydC5nZXRUaW1lKClcblx0XHQvL2lmKGVuZClcblx0XHRcdC8vY29uZC4kbHRlPWVuZC5nZXRUaW1lKClcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG5cdFx0XHRMb2NhdGlvbi5maW5kKHt3aGVuOmNvbmR9KVxuXHRcdFx0XHQuZmV0Y2gobG9jcz0+e1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGxvY3MpXG5cdFx0XHRcdFx0cmVzb2x2ZShsb2NzKVxuXHRcdFx0XHR9LHJlamVjdClcblx0XHR9KVxuXHR9XG59XG4iXX0=