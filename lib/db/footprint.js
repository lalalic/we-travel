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

		return _possibleConstructorReturn(this, (Footprint.__proto__ || Object.getPrototypeOf(Footprint)).apply(this, arguments));
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
					return (_get2 = _get(Footprint.__proto__ || Object.getPrototypeOf(Footprint), "upsert", _this2)).call.apply(_get2, [_this2].concat(_toConsumableArray(args)));
				});
			} else {
				var _get3;

				return (_get3 = _get(Footprint.__proto__ || Object.getPrototypeOf(Footprint), "upsert", this)).call.apply(_get3, [this].concat(_toConsumableArray(args)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9mb290cHJpbnQuanMiXSwibmFtZXMiOlsiRm9vdHByaW50IiwiZm9vdHByaW50IiwicGhvdG9zIiwiYXJncyIsImFyZ3VtZW50cyIsImxvY2FsUGhvdG9zIiwiZmlsdGVyIiwiaXNMb2NhbCIsInBob3RvIiwibGVuZ3RoIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsInVwbG9hZCIsInRoZW4iLCJ1cmxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7O3lCQUtOQyxTLEVBQVU7QUFBQTs7QUFBQSwyQkFDTEEsU0FESyxDQUNoQkMsTUFEZ0I7QUFBQSxPQUNoQkEsTUFEZ0IscUNBQ1QsRUFEUzs7QUFFdkIsT0FBSUMsT0FBS0MsU0FBVDtBQUNBLE9BQUlDLGNBQVlILE9BQU9JLE1BQVAsQ0FBYztBQUFBLFdBQU9OLFVBQVVPLE9BQVYsQ0FBa0JDLEtBQWxCLENBQVA7QUFBQSxJQUFkLENBQWhCO0FBQ0EsT0FBR0gsWUFBWUksTUFBZixFQUFzQjtBQUNyQkMsWUFBUUMsR0FBUixDQUFZTixZQUFZTyxHQUFaLENBQWdCLGlCQUFPO0FBQ2xDLFlBQU8sY0FBS0MsTUFBTCxDQUFZTCxLQUFaLENBQVA7QUFDQSxLQUZXLENBQVosRUFFSU0sSUFGSixDQUVTLGdCQUFNO0FBQUE7O0FBQ2RiLGVBQVVDLE1BQVYsR0FBaUJhLElBQWpCO0FBQ0EsMkpBQXVCWixJQUF2QjtBQUNBLEtBTEQ7QUFNQSxJQVBELE1BT0s7QUFBQTs7QUFDSixzSkFBdUJBLElBQXZCO0FBQ0E7QUFDRDs7OzBCQUVjSyxLLEVBQU07QUFDcEIsVUFBTyxLQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7c0JBeEJrQjtBQUNqQixVQUFPLFdBQVA7QUFDQTs7Ozs7O2tCQUhtQlIsUyIsImZpbGUiOiJmb290cHJpbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge01vZGVsLCBGaWxlfSBmcm9tIFwicWlsaS1hcHBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb290cHJpbnQgZXh0ZW5kcyBNb2RlbHtcblx0c3RhdGljIGdldCBfbmFtZSgpe1xuXHRcdHJldHVybiBcImZvb3RwcmludFwiXG5cdH1cblxuXHRzdGF0aWMgdXBzZXJ0KGZvb3RwcmludCl7XG5cdFx0Y29uc3Qge3Bob3Rvcz1bXX09Zm9vdHByaW50XG5cdFx0bGV0IGFyZ3M9YXJndW1lbnRzXG5cdFx0bGV0IGxvY2FsUGhvdG9zPXBob3Rvcy5maWx0ZXIocGhvdG89PkZvb3RwcmludC5pc0xvY2FsKHBob3RvKSlcblx0XHRpZihsb2NhbFBob3Rvcy5sZW5ndGgpe1xuXHRcdFx0UHJvbWlzZS5hbGwobG9jYWxQaG90b3MubWFwKHBob3RvPT57XG5cdFx0XHRcdHJldHVybiBGaWxlLnVwbG9hZChwaG90bylcblx0XHRcdH0pKS50aGVuKHVybHM9Pntcblx0XHRcdFx0Zm9vdHByaW50LnBob3Rvcz11cmxzXG5cdFx0XHRcdHJldHVybiBzdXBlci51cHNlcnQoLi4uYXJncylcblx0XHRcdH0pXG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gc3VwZXIudXBzZXJ0KC4uLmFyZ3MpXG5cdFx0fVxuXHR9XG5cdFxuXHRzdGF0aWMgaXNMb2NhbChwaG90byl7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblxuXHQvKlxuXHRzY2hlbWE9e1xuXG5cdH1cblx0Ki9cbn1cbiJdfQ==