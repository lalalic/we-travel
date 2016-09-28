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
			extractPosFromPhotos(alert);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9qb3VybmV5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7QUFFQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUNaOzs7T0FDQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBREE7OztBQUdQLFVBQ0M7OztJQUNDOztPQUFLLE9BQU8sRUFBQyxTQUFRLENBQVIsRUFBUixFQUFMO0tBQ0MsdURBQVcsVUFBUyxJQUFULEVBQWMsV0FBVyxJQUFYLEVBQXpCLENBREQ7S0FFQyx3REFBWSxVQUFTLE1BQVQsRUFBWixDQUZEO0tBR0Msd0RBQVksVUFBUyxNQUFULEVBQVosQ0FIRDtLQUlDO0FBQ0MsYUFBTyxDQUNMLElBREssRUFDQSxJQURBLEVBQ0ssS0FETCxFQUVMLElBRkssRUFFQSxJQUZBLEVBRUssSUFGTCxFQUVVLElBRlYsRUFHTCxJQUhLLEVBR0EsSUFIQSxFQUdLLElBSEwsRUFJTCxFQUFDLE9BQU0sSUFBTixFQUFXLE1BQUssUUFBTCxFQUpQLEVBS0wsSUFMSyxFQUtBLElBTEEsRUFLSyxJQUxMLEVBS1UsSUFMVixFQUtlLElBTGYsRUFNTCxJQU5LLEVBTUEsSUFOQSxFQU1LLEtBTkwsQ0FBUCxFQURELENBSkQ7S0FhQyw2REFBbUIsV0FBVyxJQUFYO0FBQ2xCLFlBQU0sa0RBQU4sRUFERCxDQWJEO0tBZ0JDOztRQUFNLE9BQU8sRUFBQyxRQUFPLENBQVAsRUFBUixFQUFOOztNQWhCRDtLQWtCQywyREFBUSxVQUFTLFFBQVQsRUFBUixDQWxCRDtLQUREO0lBc0JDLDBDQUFJLFVBQUosSUFBZSxXQUFVLFNBQVY7QUFDQyxZQUFPLENBQUMsTUFBRCxFQUNyQixFQUFDLFFBQU8sU0FBUCxFQUFrQixPQUFNLElBQU4sRUFBWSxVQUFVO2NBQUcsT0FBSyxPQUFMO09BQUgsRUFBbUIseUJBQTVELEVBRHFCLEVBRXJCLEVBQUMsUUFBTyxNQUFQLEVBQWUsT0FBTSxJQUFOLEVBQVksVUFBUztjQUFHLE9BQUssR0FBTDtPQUFILEVBQWUseUJBQXBELEVBRnFCLENBQVAsRUFEaEIsQ0F0QkQ7SUFERCxDQUhPOzs7OzRCQW1DQztBQUNSLHdCQUFxQixLQUFyQixFQURROzs7O3dCQUlKOzs7UUF4Q2U7OztRQTRDYjtXQUFjOzs7Ozs7Ozs7RUFBdUI7O2tCQTVDeEIiLCJmaWxlIjoiam91cm5leS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtUZXh0RmllbGQsIERhdGVQaWNrZXIsIENoaXAsIEF2YXRhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5cclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jaGlwcGVyXCJcclxuaW1wb3J0IFRleHRGaWVsZFdpdGhJY29uIGZyb20gXCIuL2NvbXBvbmVudHMvdGV4dEZpZWxkV2l0aEljb25cIlxyXG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoVGV4dEZpZWxkXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvdXJuZXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7am91cm5leX09dGhpcy5wcm9wc1xyXG5cdFx0XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgaGludFRleHQ9XCLlkI3lrZdcIiBmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIGhpbnRUZXh0PVwi5byA5aeL5pel5pyfXCIvPlxyXG5cdFx0XHRcdFx0PERhdGVQaWNrZXIgaGludFRleHQ9XCLnu5PmnZ/ml6XmnJ9cIi8+XHJcblx0XHRcdFx0XHQ8Q2hpcHBlciBcclxuXHRcdFx0XHRcdFx0Y2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XHRcdFwi5b6S5q2lXCIsXCLoh6rpqb5cIixcIuiHquihjOi9plwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmjJHmiJhcIixcIuaUvuadvlwiLFwi5a625bqtXCIsXCLllYbliqFcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6ICB5Lq6XCIsXCLlsI/lralcIixcIuaDheS+o1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0e2xhYmVsOlwi6aKE566XXCIsdHlwZTpcIm51bWJlclwifSxcclxuXHRcdFx0XHRcdFx0XHRcdFwi5rW35rupXCIsXCLkurrmlodcIixcIuWxseawtFwiLFwi6YO95biCXCIsXCLkvJrlj4tcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6Jyc5pyIXCIsXCLnlJ/ml6VcIixcIuWRqOW5tOW6hlwiXHJcblx0XHRcdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZFdpdGhJY29uIGZ1bGxXaWR0aD17dHJ1ZX0gXHJcblx0XHRcdFx0XHRcdGljb249ezxJY29uTWFwLz59Lz5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PENoaXAgc3R5bGU9e3ttYXJnaW46NH19PuS9j+WuvzwvQ2hpcD5cclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PFNlYXJjaCBoaW50VGV4dD1cInNlYXJjaFwiLz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLCBcclxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIkV4dHJhY3RcIiwgbGFiZWw6XCLmj5Dlj5ZcIiwgb25TZWxlY3Q6IGU9PnRoaXMuZXh0cmFjdCgpLCBpY29uOkljb25TYXZlfSxcclxuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIlNhdmVcIiwgbGFiZWw6XCLkv53lrZhcIiwgb25TZWxlY3Q6ZT0+dGhpcy5hZGQoKSwgaWNvbjpJY29uU2F2ZX1cclxuXHRcdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0ZXh0cmFjdCgpe1xyXG5cdFx0ZXh0cmFjdFBvc0Zyb21QaG90b3MoYWxlcnQpXHJcblx0fVxyXG5cdFxyXG5cdGFkZCgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIEpvdXJuZXlDcmVhdG9yIGV4dGVuZHMgSm91cm5leXtcclxuXHRcdFxyXG5cdH1cclxufVxyXG5cclxuIl19