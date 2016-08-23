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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Journey).apply(this, arguments));
	}

	_createClass(Journey, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var journey = this.props.journey;


			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { hintText: "名字", fullWidth: true }),
					_react2.default.createElement(_materialUi.DatePicker, { hintText: "开始日期" }),
					_react2.default.createElement(_materialUi.DatePicker, { hintText: "结束日期" }),
					_react2.default.createElement(_chipper2.default, {
						chips: ["徒步", "自驾", "自行车", "挑战", "放松", "家庭", "商务", "老人", "小孩", "情侣", { label: "预算", type: "number" }, "海滩", "人文", "山水", "都市", "会友", "蜜月", "生日", "周年庆"] }),
					_react2.default.createElement(_textFieldWithIcon2.default, { fullWidth: true,
						icon: _react2.default.createElement(_map2.default, null) }),
					_react2.default.createElement(
						_materialUi.Chip,
						{ style: { margin: 4 } },
						"住宿"
					),
					_react2.default.createElement(_searchTextField2.default, { hintText: "search" })
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Save", label: "保存", onSelect: function onSelect(e) {
							return _this2.add();
						}, icon: _cloudDone2.default }] })
			);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb3VybmV5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUNaOzs7T0FDQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBREE7OztBQUdQLFVBQ0M7OztJQUNDOztPQUFLLE9BQU8sRUFBQyxTQUFRLENBQVIsRUFBUixFQUFMO0tBQ0MsdURBQVcsVUFBUyxJQUFULEVBQWMsV0FBVyxJQUFYLEVBQXpCLENBREQ7S0FFQyx3REFBWSxVQUFTLE1BQVQsRUFBWixDQUZEO0tBR0Msd0RBQVksVUFBUyxNQUFULEVBQVosQ0FIRDtLQUlDO0FBQ0MsYUFBTyxDQUNMLElBREssRUFDQSxJQURBLEVBQ0ssS0FETCxFQUVMLElBRkssRUFFQSxJQUZBLEVBRUssSUFGTCxFQUVVLElBRlYsRUFHTCxJQUhLLEVBR0EsSUFIQSxFQUdLLElBSEwsRUFJTCxFQUFDLE9BQU0sSUFBTixFQUFXLE1BQUssUUFBTCxFQUpQLEVBS0wsSUFMSyxFQUtBLElBTEEsRUFLSyxJQUxMLEVBS1UsSUFMVixFQUtlLElBTGYsRUFNTCxJQU5LLEVBTUEsSUFOQSxFQU1LLEtBTkwsQ0FBUCxFQURELENBSkQ7S0FhQyw2REFBbUIsV0FBVyxJQUFYO0FBQ2xCLFlBQU0sa0RBQU4sRUFERCxDQWJEO0tBZ0JDOztRQUFNLE9BQU8sRUFBQyxRQUFPLENBQVAsRUFBUixFQUFOOztNQWhCRDtLQWtCQywyREFBUSxVQUFTLFFBQVQsRUFBUixDQWxCRDtLQUREO0lBc0JDLDBDQUFJLFVBQUosSUFBZSxXQUFVLFNBQVY7QUFDQyxZQUFPLENBQUMsTUFBRCxFQUNyQixFQUFDLFFBQU8sTUFBUCxFQUFlLE9BQU0sSUFBTixFQUFZLFVBQVM7Y0FBRyxPQUFLLEdBQUw7T0FBSCxFQUFlLHlCQUFwRCxFQURxQixDQUFQLEVBRGhCLENBdEJEO0lBREQsQ0FITzs7Ozt3QkFrQ0g7OztRQW5DZTs7O1FBdUNiO1dBQWM7Ozs7Ozs7OztFQUF1Qjs7a0JBdkN4QiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge1RleHRGaWVsZCwgRGF0ZVBpY2tlciwgQ2hpcCwgQXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuaW1wb3J0IEljb25TYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcclxuaW1wb3J0IEljb25NYXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL21hcFwiXHJcblxyXG5pbXBvcnQgQ2hpcHBlciBmcm9tIFwiLi9jb21wb25lbnRzL2NoaXBwZXJcIlxyXG5pbXBvcnQgVGV4dEZpZWxkV2l0aEljb24gZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0RmllbGRXaXRoSWNvblwiXHJcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hUZXh0RmllbGRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm91cm5leSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtqb3VybmV5fT10aGlzLnByb3BzXHJcblx0XHRcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCBoaW50VGV4dD1cIuWQjeWtl1wiIGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgaGludFRleHQ9XCLlvIDlp4vml6XmnJ9cIi8+XHJcblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciBoaW50VGV4dD1cIue7k+adn+aXpeacn1wiLz5cclxuXHRcdFx0XHRcdDxDaGlwcGVyIFxyXG5cdFx0XHRcdFx0XHRjaGlwcz17W1xyXG5cdFx0XHRcdFx0XHRcdFx0XCLlvpLmraVcIixcIuiHqumpvlwiLFwi6Ieq6KGM6L2mXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuaMkeaImFwiLFwi5pS+5p2+XCIsXCLlrrbluq1cIixcIuWVhuWKoVwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLogIHkurpcIixcIuWwj+WtqVwiLFwi5oOF5L6jXCIsXHJcblx0XHRcdFx0XHRcdFx0XHR7bGFiZWw6XCLpooTnrpdcIix0eXBlOlwibnVtYmVyXCJ9LFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmtbfmu6lcIixcIuS6uuaWh1wiLFwi5bGx5rC0XCIsXCLpg73luIJcIixcIuS8muWPi1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLonJzmnIhcIixcIueUn+aXpVwiLFwi5ZGo5bm05bqGXCJcclxuXHRcdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkV2l0aEljb24gZnVsbFdpZHRoPXt0cnVlfSBcclxuXHRcdFx0XHRcdFx0aWNvbj17PEljb25NYXAvPn0vPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8Q2hpcCBzdHlsZT17e21hcmdpbjo0fX0+5L2P5a6/PC9DaGlwPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8U2VhcmNoIGhpbnRUZXh0PVwic2VhcmNoXCIvPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsIFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBvblNlbGVjdDplPT50aGlzLmFkZCgpLCBpY29uOkljb25TYXZlfVxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHRcclxuXHRhZGQoKXtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgQ3JlYXRvcj1jbGFzcyBKb3VybmV5Q3JlYXRvciBleHRlbmRzIEpvdXJuZXl7XHJcblx0XHRcclxuXHR9XHJcbn1cclxuXHJcbiJdfQ==