"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _map = require("material-ui/svg-icons/maps/map");

var _map2 = _interopRequireDefault(_map);

var _chipper = require("./components/chipper");

var _chipper2 = _interopRequireDefault(_chipper);

var _textFieldWithIcon = require("./components/textFieldWithIcon");

var _textFieldWithIcon2 = _interopRequireDefault(_textFieldWithIcon);

var _searchTextField = require("./components/searchTextField");

var _searchTextField2 = _interopRequireDefault(_searchTextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Journey = function (_Component) {
	_inherits(Journey, _Component);

	function Journey() {
		_classCallCheck(this, Journey);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Journey).apply(this, arguments));

		_this.state = {
			waypoints: []
		};
		return _this;
	}

	_createClass(Journey, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var journey = this.props.journey;
			var waypoints = this.state.waypoints;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { hintText: "名字", fullWidth: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "from", hintText: "开始日期" }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "to", hintText: "结束日期" }),
					_react2.default.createElement(_chipper2.default, {
						chips: ["徒步", "自驾", "自行车", "挑战", "放松", "家庭", "商务", "老人", "小孩", "情侣", { label: "预算", type: "number" }, "海滩", "人文", "山水", "都市", "会友", "蜜月", "生日", "周年庆"] }),
					_react2.default.createElement(_textFieldWithIcon2.default, { fullWidth: true,
						value: waypoints.length,
						icon: _react2.default.createElement(_map2.default, null) }),
					_react2.default.createElement(
						_materialUi.Chip,
						{ style: { margin: 4 } },
						"住宿"
					),
					_react2.default.createElement(_searchTextField2.default, { hintText: "search" })
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Extract", label: "提取", onSelect: function onSelect(e) {
							return _this2.extract();
						}, icon: _cloudDone2.default }, { action: "Save", label: "保存", onSelect: function onSelect(e) {
							return _this2.add();
						}, icon: _cloudDone2.default }] })
			);
		}
	}, {
		key: "extract",
		value: function extract() {
			var _this3 = this;

			var waypoints = [],
			    last;
			var _refs = this.refs;
			var from = _refs.from;
			var to = _refs.to;

			extractPosFromPhotos(from.getDate(), to.getDate(), function (waypoint) {
				switch (waypoint) {
					case 0:
						_this3.setState({ waypoints: waypoints });
						break;
					default:
						if (last && last.lat == waypoint.lat && last.lng == waypoint.lng) {
							last.photos.push(waypoint.photos[0]);
						} else {
							waypoints.push(last = waypoint);
							waypoints.length % 100 == 0 && _this3.setState({ waypoints: waypoints });
						}
				}
			});
		}
	}, {
		key: "add",
		value: function add() {}
	}]);

	return Journey;
}(_react.Component);

Journey.Creator = function (_Journey) {
	_inherits(JourneyCreator, _Journey);

	function JourneyCreator() {
		_classCallCheck(this, JourneyCreator);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(JourneyCreator).apply(this, arguments));
	}

	return JourneyCreator;
}(Journey);

exports.default = Journey;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Ijoiam91cm5leS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtUZXh0RmllbGQsIERhdGVQaWNrZXIsIENoaXAsIEF2YXRhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5cclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jaGlwcGVyXCJcclxuaW1wb3J0IFRleHRGaWVsZFdpdGhJY29uIGZyb20gXCIuL2NvbXBvbmVudHMvdGV4dEZpZWxkV2l0aEljb25cIlxyXG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoVGV4dEZpZWxkXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvdXJuZXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuc3RhdGU9e1xyXG5cdFx0XHR3YXlwb2ludHM6W11cclxuXHRcdH1cclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7am91cm5leX09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3dheXBvaW50c309dGhpcy5zdGF0ZVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIGhpbnRUZXh0PVwi5ZCN5a2XXCIgZnVsbFdpZHRoPXt0cnVlfS8+XHJcblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJmcm9tXCIgaGludFRleHQ9XCLlvIDlp4vml6XmnJ9cIi8+XHJcblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJ0b1wiIGhpbnRUZXh0PVwi57uT5p2f5pel5pyfXCIvPlxyXG5cdFx0XHRcdFx0PENoaXBwZXIgXHJcblx0XHRcdFx0XHRcdGNoaXBzPXtbXHJcblx0XHRcdFx0XHRcdFx0XHRcIuW+kuatpVwiLFwi6Ieq6am+XCIsXCLoh6rooYzovaZcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi5oyR5oiYXCIsXCLmlL7mnb5cIixcIuWutuW6rVwiLFwi5ZWG5YqhXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuiAgeS6ulwiLFwi5bCP5a2pXCIsXCLmg4XkvqNcIixcclxuXHRcdFx0XHRcdFx0XHRcdHtsYWJlbDpcIumihOeul1wiLHR5cGU6XCJudW1iZXJcIn0sXHJcblx0XHRcdFx0XHRcdFx0XHRcIua1t+a7qVwiLFwi5Lq65paHXCIsXCLlsbHmsLRcIixcIumDveW4glwiLFwi5Lya5Y+LXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuicnOaciFwiLFwi55Sf5pelXCIsXCLlkajlubTluoZcIlxyXG5cdFx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGRXaXRoSWNvbiBmdWxsV2lkdGg9e3RydWV9IFxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17d2F5cG9pbnRzLmxlbmd0aH1cclxuXHRcdFx0XHRcdFx0aWNvbj17PEljb25NYXAvPn0vPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8Q2hpcCBzdHlsZT17e21hcmdpbjo0fX0+5L2P5a6/PC9DaGlwPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8U2VhcmNoIGhpbnRUZXh0PVwic2VhcmNoXCIvPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsIFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiRXh0cmFjdFwiLCBsYWJlbDpcIuaPkOWPllwiLCBvblNlbGVjdDogZT0+dGhpcy5leHRyYWN0KCksIGljb246SWNvblNhdmV9LFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBvblNlbGVjdDplPT50aGlzLmFkZCgpLCBpY29uOkljb25TYXZlfVxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHRleHRyYWN0KCl7XHJcblx0XHR2YXIgd2F5cG9pbnRzPVtdLGxhc3RcclxuXHRcdGNvbnN0IHtmcm9tLHRvfT10aGlzLnJlZnNcclxuXHRcdGV4dHJhY3RQb3NGcm9tUGhvdG9zKGZyb20uZ2V0RGF0ZSgpLCB0by5nZXREYXRlKCksIHdheXBvaW50PT57XHJcblx0XHRcdHN3aXRjaCh3YXlwb2ludCl7XHJcblx0XHRcdGNhc2UgMDpcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHt3YXlwb2ludHN9KVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0aWYobGFzdCAmJiBsYXN0LmxhdD09d2F5cG9pbnQubGF0ICYmIGxhc3QubG5nPT13YXlwb2ludC5sbmcpe1xyXG5cdFx0XHRcdFx0bGFzdC5waG90b3MucHVzaCh3YXlwb2ludC5waG90b3NbMF0pXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHR3YXlwb2ludHMucHVzaChsYXN0PXdheXBvaW50KTtcclxuXHRcdFx0XHRcdCh3YXlwb2ludHMubGVuZ3RoJTEwMCk9PTAgJiYgdGhpcy5zZXRTdGF0ZSh7d2F5cG9pbnRzfSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdGFkZCgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIEpvdXJuZXlDcmVhdG9yIGV4dGVuZHMgSm91cm5leXtcclxuXHRcdFxyXG5cdH1cclxufVxyXG5cclxuIl19