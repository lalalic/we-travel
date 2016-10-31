"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _qiliApp = require("qili-app");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footprint = function (_Model) {
	_inherits(Footprint, _Model);

	function Footprint() {
		_classCallCheck(this, Footprint);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Footprint).apply(this, arguments));
	}

	_createClass(Footprint, null, [{
		key: "upsert",
		value: function upsert(footprint) {
			var _this2 = this;

			var _footprint$photos = footprint.photos;
			var photos = _footprint$photos === undefined ? [] : _footprint$photos;

			var args = arguments;
			var localPhotos = photos.filter(function (photo) {
				return Footprint.isLocal(photo);
			});
			if (localPhotos.length) {
				Promise.all(localPhotos.map(function (photo) {
					return _qiliApp.File.upload(photo);
				})).then(function (urls) {
					var _get2;

					footprint.photos = urls;
					return (_get2 = _get(Object.getPrototypeOf(Footprint), "upsert", _this2)).call.apply(_get2, [_this2].concat(_toConsumableArray(args)));
				});
			} else {
				var _get3;

				return (_get3 = _get(Object.getPrototypeOf(Footprint), "upsert", this)).call.apply(_get3, [this].concat(_toConsumableArray(args)));
			}
		}
	}, {
		key: "isLocal",
		value: function isLocal(photo) {
			return false;
		}

		/*
  schema={
  	}
  */

	}, {
		key: "_name",
		get: function get() {
			return "footprint";
		}
	}]);

	return Footprint;
}(_qiliApp.Model);

exports.default = Footprint;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9mb290cHJpbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozt5QkFLTixXQUFVOzs7MkJBQ0wsVUFBWCxPQURnQjtPQUNoQiwyQ0FBTyx1QkFEUzs7QUFFdkIsT0FBSSxPQUFLLFNBQUwsQ0FGbUI7QUFHdkIsT0FBSSxjQUFZLE9BQU8sTUFBUCxDQUFjO1dBQU8sVUFBVSxPQUFWLENBQWtCLEtBQWxCO0lBQVAsQ0FBMUIsQ0FIbUI7QUFJdkIsT0FBRyxZQUFZLE1BQVosRUFBbUI7QUFDckIsWUFBUSxHQUFSLENBQVksWUFBWSxHQUFaLENBQWdCLGlCQUFPO0FBQ2xDLFlBQU8sY0FBSyxNQUFMLENBQVksS0FBWixDQUFQLENBRGtDO0tBQVAsQ0FBNUIsRUFFSSxJQUZKLENBRVMsZ0JBQU07OztBQUNkLGVBQVUsTUFBVixHQUFpQixJQUFqQixDQURjO0FBRWQsZ0RBZGlCLG9GQWNNLE9BQXZCLENBRmM7S0FBTixDQUZULENBRHFCO0lBQXRCLE1BT0s7OztBQUNKLCtDQWpCa0IsZ0ZBaUJLLE9BQXZCLENBREk7SUFQTDs7OzswQkFZYyxPQUFNO0FBQ3BCLFVBQU8sS0FBUCxDQURvQjs7Ozs7Ozs7OztzQkFwQkg7QUFDakIsVUFBTyxXQUFQLENBRGlCOzs7O1FBREUiLCJmaWxlIjoiZm9vdHByaW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCwgRmlsZX0gZnJvbSBcInFpbGktYXBwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9vdHByaW50IGV4dGVuZHMgTW9kZWx7XG5cdHN0YXRpYyBnZXQgX25hbWUoKXtcblx0XHRyZXR1cm4gXCJmb290cHJpbnRcIlxuXHR9XG5cblx0c3RhdGljIHVwc2VydChmb290cHJpbnQpe1xuXHRcdGNvbnN0IHtwaG90b3M9W119PWZvb3RwcmludFxuXHRcdGxldCBhcmdzPWFyZ3VtZW50c1xuXHRcdGxldCBsb2NhbFBob3Rvcz1waG90b3MuZmlsdGVyKHBob3RvPT5Gb290cHJpbnQuaXNMb2NhbChwaG90bykpXG5cdFx0aWYobG9jYWxQaG90b3MubGVuZ3RoKXtcblx0XHRcdFByb21pc2UuYWxsKGxvY2FsUGhvdG9zLm1hcChwaG90bz0+e1xuXHRcdFx0XHRyZXR1cm4gRmlsZS51cGxvYWQocGhvdG8pXG5cdFx0XHR9KSkudGhlbih1cmxzPT57XG5cdFx0XHRcdGZvb3RwcmludC5waG90b3M9dXJsc1xuXHRcdFx0XHRyZXR1cm4gc3VwZXIudXBzZXJ0KC4uLmFyZ3MpXG5cdFx0XHR9KVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHN1cGVyLnVwc2VydCguLi5hcmdzKVxuXHRcdH1cblx0fVxuXHRcblx0c3RhdGljIGlzTG9jYWwocGhvdG8pe1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cblx0Lypcblx0c2NoZW1hPXtcblxuXHR9XG5cdCovXG59XG4iXX0=