"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp3;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _map = require("material-ui/svg-icons/maps/map");

var _map2 = _interopRequireDefault(_map);

var _editLocation = require("material-ui/svg-icons/maps/edit-location");

var _editLocation2 = _interopRequireDefault(_editLocation);

var _chipper = require("./components/chipper");

var _chipper2 = _interopRequireDefault(_chipper);

var _textFieldWithIcon = require("./components/textFieldWithIcon");

var _textFieldWithIcon2 = _interopRequireDefault(_textFieldWithIcon);

var _searchTextField = require("./components/searchTextField");

var _searchTextField2 = _interopRequireDefault(_searchTextField);

var _map3 = require("./components/map");

var _map4 = _interopRequireDefault(_map3);

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = _qiliApp.UI.Loading;

var Journey = function (_Component) {
	_inherits(Journey, _Component);

	function Journey() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Journey);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Journey)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { entity: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Journey, [{
		key: "getData",
		value: function getData(_id) {
			var _this2 = this;

			_db.Journey.findOne({ _id: _id }, function (entity) {
				_this2.setState({ entity: entity });
			});
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			this.getData(this.props.params._id);
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.params._id != nextProps.params._id) this.getData(nextProps.params._id);
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var journey = this.state.entity;


			if (!journey) return _react2.default.createElement(Loading, null);

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(TextScheduler, { ref: "scheduler", journey: journey }),
					_react2.default.createElement(_searchTextField2.default, { hintText: "查找:看看大侠们的足迹好好规划一下", fullWidth: true }),
					_react2.default.createElement("br", null),
					_react2.default.createElement(_materialUi.TextField, { ref: "name", hintText: "名字", fullWidth: true, defaultValue: journey.name }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", hintText: "开始日期", autoOk: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "endedAt", hintText: "结束日期", autoOk: true }),
					_react2.default.createElement("br", null),
					_react2.default.createElement(_chipper2.default, {
						title: "更多信息",
						autoOpen: false,
						chips: ["徒步", "自驾", "自行车", "挑战", "放松", "家庭", "商务", "老人", "小孩", "情侣", { label: "预算", type: "number" }, "海滩", "人文", "山水", "都市", "会友", "蜜月", "生日", "周年庆"] })
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Extract", label: "提取", onSelect: function onSelect(e) {
							return _this3.extract();
						}, icon: _cloudDone2.default }] })
			);
		}
	}]);

	return Journey;
}(_react.Component);

Journey.Creator = (_temp3 = _class = function (_Journey) {
	_inherits(JourneyCreator, _Journey);

	function JourneyCreator() {
		var _Object$getPrototypeO2;

		var _temp2, _this4, _ret2;

		_classCallCheck(this, JourneyCreator);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(JourneyCreator)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this4), _this4.state = { startedAt: null }, _temp2), _possibleConstructorReturn(_this4, _ret2);
	}

	_createClass(JourneyCreator, [{
		key: "render",
		value: function render() {
			var _this5 = this;

			var startedAt = this.state.startedAt;

			var others = {};
			if (startedAt) others.startedAt = startedAt;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { ref: "name", hintText: "名字", fullWidth: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: "startedAt", hintText: "开始日期", autoOk: true,
						onChange: function onChange(e) {
							return _this5.setState({ startedAt: _this5.refs.startedAt.getDate() });
						} }),
					_react2.default.createElement(_materialUi.DatePicker, _extends({ ref: "endedAt", hintText: "结束日期", autoOk: true }, others))
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Save", label: "保存", onSelect: function onSelect(e) {
							return _this5.save();
						}, icon: _cloudDone2.default }] })
			);
		}
	}, {
		key: "save",
		value: function save() {
			var _this6 = this;

			var _refs = this.refs;
			var name = _refs.name;
			var startedAt = _refs.startedAt;
			var endedAt = _refs.endedAt;

			_db.Journey.upsert({
				name: name.getValue(),
				startedAt: startedAt.getDate(),
				endedAt: endedAt.getDate()
			}).then(function (journey) {
				return _this6.context.router.push("journey/" + journey._id);
			});
		}
	}]);

	return JourneyCreator;
}(Journey), _class.contextTypes = {
	router: _react2.default.PropTypes.object
}, _temp3);
exports.default = Journey;

var TextScheduler = function (_Component2) {
	_inherits(TextScheduler, _Component2);

	function TextScheduler() {
		_classCallCheck(this, TextScheduler);

		var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(TextScheduler).apply(this, arguments));

		_this7.state = {
			waypoints: null,
			map: false
		};
		return _this7;
	}

	_createClass(TextScheduler, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this8 = this;

			_db.Journey.getWaypoints(this.props.journey).then(function (waypoints) {
				return _this8.setState({ waypoints: waypoints });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this9 = this;

			var _props = this.props;
			var journey = _props.journey;
			var others = _props.others;
			var _state = this.state;
			var waypoints = _state.waypoints;
			var map = _state.map;

			if (waypoints && waypoints.length) {
				return _react2.default.createElement(
					"div",
					{ className: "grid" },
					_react2.default.createElement(_textFieldWithIcon2.default, _extends({ icon: _react2.default.createElement(_editLocation2.default, null), floatingLabelFixed: true,
						floatingLabelText: "发现" + waypoints.length + "张照片有地址信息，点击图标查看详细信息",
						multiLine: true, fullWidth: true }, others)),
					_react2.default.createElement(
						"div",
						{ style: { width: 24, verticalAlign: "bottom" } },
						_react2.default.createElement(_map2.default, { color: "lightblue", onClick: function onClick(e) {
								return _this9.showMap();
							} })
					),
					map && _react2.default.createElement(_map4.default, { markers: waypoints })
				);
			} else {
				return _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(_textFieldWithIcon2.default, _extends({ icon: _react2.default.createElement(_editLocation2.default, null), floatingLabelFixed: true,
						floatingLabelText: "快速计划你的行程，比如：北京,上海,...",
						multiLine: true, fullWidth: true }, others))
				);
			}
		}
	}, {
		key: "showMap",
		value: function showMap() {
			this.setState({ map: true });
		}
	}]);

	return TextScheduler;
}(_react.Component);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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RSxJQURGLENBQ087V0FBVyxPQUFLLFFBQUwsQ0FBYyxFQUFDLG9CQUFELEVBQWQ7SUFBWCxDQURQLENBRGtCOzs7OzJCQUtYOzs7Z0JBQ2lCLEtBQUssS0FBTCxDQURqQjtPQUNBLHlCQURBO09BQ1MsdUJBRFQ7Z0JBRWdCLEtBQUssS0FBTCxDQUZoQjtPQUVBLDZCQUZBO09BRVcsaUJBRlg7O0FBR1AsT0FBRyxhQUFhLFVBQVUsTUFBVixFQUFpQjtBQUNoQyxXQUNDOztPQUFLLFdBQVUsTUFBVixFQUFMO0tBQ0Msc0VBQW1CLE1BQU0sMkRBQU4sRUFBdUIsb0JBQW9CLElBQXBCO0FBQ3pDLGdDQUF3QixVQUFVLE1BQVYsd0JBQXhCO0FBQ0EsaUJBQVcsSUFBWCxFQUFpQixXQUFXLElBQVgsSUFBcUIsT0FGdkMsQ0FERDtLQUlDOztRQUFLLE9BQU8sRUFBQyxPQUFNLEVBQU4sRUFBUyxlQUFjLFFBQWQsRUFBakIsRUFBTDtNQUNDLCtDQUFTLE9BQU0sV0FBTixFQUFrQixTQUFTO2VBQUcsT0FBSyxPQUFMO1FBQUgsRUFBcEMsQ0FERDtNQUpEO0tBT0UsT0FBUSwrQ0FBSyxTQUFTLFNBQVQsRUFBTCxDQUFSO0tBUkgsQ0FEZ0M7SUFBakMsTUFZSztBQUNKLFdBQ0M7OztLQUNDLHNFQUFtQixNQUFNLDJEQUFOLEVBQXVCLG9CQUFvQixJQUFwQjtBQUN6Qyx5QkFBa0IsdUJBQWxCO0FBQ0EsaUJBQVcsSUFBWCxFQUFpQixXQUFXLElBQVgsSUFBcUIsT0FGdkMsQ0FERDtLQURELENBREk7SUFaTDs7Ozs0QkFzQlE7QUFDUixRQUFLLFFBQUwsQ0FBYyxFQUFDLEtBQUksSUFBSixFQUFmLEVBRFE7Ozs7UUF2Q0oiLCJmaWxlIjoiam91cm5leS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5cclxuaW1wb3J0IHtUZXh0RmllbGQsIERhdGVQaWNrZXIsIEF2YXRhciwgRGl2aWRlcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5pbXBvcnQgSWNvblNjaGVkdWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9lZGl0LWxvY2F0aW9uXCJcclxuXHJcbmltcG9ydCBDaGlwcGVyIGZyb20gXCIuL2NvbXBvbmVudHMvY2hpcHBlclwiXHJcbmltcG9ydCBUZXh0RmllbGRXaXRoSWNvbiBmcm9tIFwiLi9jb21wb25lbnRzL3RleHRGaWVsZFdpdGhJY29uXCJcclxuaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9jb21wb25lbnRzL3NlYXJjaFRleHRGaWVsZFwiXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vY29tcG9uZW50cy9tYXBcIlxyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQixMb2NhdGlvbiBhcyBMb2NhdGlvbkRCfSBmcm9tIFwiLi9kYlwiXHJcblxyXG5jb25zdCB7TG9hZGluZ309VUlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSm91cm5leSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17ZW50aXR5Om51bGx9XHJcblxyXG5cdGdldERhdGEoX2lkKXtcclxuXHRcdEpvdXJuZXlEQi5maW5kT25lKHtfaWR9LGVudGl0eT0+e1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlbnRpdHl9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5faWQpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMucGFyYW1zLl9pZCE9bmV4dFByb3BzLnBhcmFtcy5faWQpXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YShuZXh0UHJvcHMucGFyYW1zLl9pZClcclxuICAgIH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZW50aXR5OmpvdXJuZXl9PXRoaXMuc3RhdGVcclxuXHJcblx0XHRpZigham91cm5leSlcclxuXHRcdFx0cmV0dXJuICg8TG9hZGluZy8+KVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PFRleHRTY2hlZHVsZXIgcmVmPVwic2NoZWR1bGVyXCIgam91cm5leT17am91cm5leX0vPlxyXG5cclxuXHRcdFx0XHRcdDxTZWFyY2ggaGludFRleHQ9XCLmn6Xmib4655yL55yL5aSn5L6g5Lus55qE6Laz6L+55aW95aW96KeE5YiS5LiA5LiLXCIgZnVsbFdpZHRoPXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdFx0PGJyLz5cclxuXHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIiBoaW50VGV4dD1cIuWQjeWtl1wiIGZ1bGxXaWR0aD17dHJ1ZX0gZGVmYXVsdFZhbHVlPXtqb3VybmV5Lm5hbWV9Lz5cclxuXHJcblx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJzdGFydGVkQXRcIiBoaW50VGV4dD1cIuW8gOWni+aXpeacn1wiIGF1dG9Paz17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj1cImVuZGVkQXRcIiBoaW50VGV4dD1cIue7k+adn+aXpeacn1wiIGF1dG9Paz17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdDxici8+XHJcblx0XHRcdFx0XHQ8Q2hpcHBlclxyXG5cdFx0XHRcdFx0XHR0aXRsZT1cIuabtOWkmuS/oeaBr1wiXHJcblx0XHRcdFx0XHRcdGF1dG9PcGVuPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0Y2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XHRcdFwi5b6S5q2lXCIsXCLoh6rpqb5cIixcIuiHquihjOi9plwiLFxyXG5cdFx0XHRcdFx0XHRcdFx0XCLmjJHmiJhcIixcIuaUvuadvlwiLFwi5a625bqtXCIsXCLllYbliqFcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6ICB5Lq6XCIsXCLlsI/lralcIixcIuaDheS+o1wiLFxyXG5cdFx0XHRcdFx0XHRcdFx0e2xhYmVsOlwi6aKE566XXCIsdHlwZTpcIm51bWJlclwifSxcclxuXHRcdFx0XHRcdFx0XHRcdFwi5rW35rupXCIsXCLkurrmlodcIixcIuWxseawtFwiLFwi6YO95biCXCIsXCLkvJrlj4tcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi6Jyc5pyIXCIsXCLnlJ/ml6VcIixcIuWRqOW5tOW6hlwiXHJcblx0XHRcdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiLFxyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiRXh0cmFjdFwiLCBsYWJlbDpcIuaPkOWPllwiLCBvblNlbGVjdDogZT0+dGhpcy5leHRyYWN0KCksIGljb246SWNvblNhdmV9XHJcblx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgQ3JlYXRvcj1jbGFzcyBKb3VybmV5Q3JlYXRvciBleHRlbmRzIEpvdXJuZXl7XHJcblx0XHRzdGF0ZT17c3RhcnRlZEF0Om51bGx9XHJcblx0XHRyZW5kZXIoKXtcclxuXHRcdFx0Y29uc3Qge3N0YXJ0ZWRBdH09dGhpcy5zdGF0ZVxyXG5cdFx0XHRsZXQgb3RoZXJzPXt9XHJcblx0XHRcdGlmKHN0YXJ0ZWRBdClcclxuXHRcdFx0XHRvdGhlcnMuc3RhcnRlZEF0PXN0YXJ0ZWRBdFxyXG5cclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIiBoaW50VGV4dD1cIuWQjeWtl1wiIGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPVwic3RhcnRlZEF0XCIgaGludFRleHQ9XCLlvIDlp4vml6XmnJ9cIiBhdXRvT2s9e3RydWV9XHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9e2U9PnRoaXMuc2V0U3RhdGUoe3N0YXJ0ZWRBdDp0aGlzLnJlZnMuc3RhcnRlZEF0LmdldERhdGUoKX0pfS8+XHJcblxyXG5cdFx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9XCJlbmRlZEF0XCIgaGludFRleHQ9XCLnu5PmnZ/ml6XmnJ9cIiBhdXRvT2s9e3RydWV9IHsuLi5vdGhlcnN9Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG5cdCAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcclxuXHRcdFx0XHRcdFx0XHR7YWN0aW9uOlwiU2F2ZVwiLCBsYWJlbDpcIuS/neWtmFwiLCBvblNlbGVjdDplPT50aGlzLnNhdmUoKSwgaWNvbjpJY29uU2F2ZX1cclxuXHRcdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHJcblx0XHRzYXZlKCl7XHJcblx0XHRcdGNvbnN0IHtuYW1lLCBzdGFydGVkQXQsIGVuZGVkQXR9PXRoaXMucmVmc1xyXG5cdFx0XHRKb3VybmV5REIudXBzZXJ0KHtcclxuXHRcdFx0XHRuYW1lOm5hbWUuZ2V0VmFsdWUoKSxcclxuXHRcdFx0XHRzdGFydGVkQXQ6c3RhcnRlZEF0LmdldERhdGUoKSxcclxuXHRcdFx0XHRlbmRlZEF0OmVuZGVkQXQuZ2V0RGF0ZSgpXHJcblx0XHRcdH0pLnRoZW4oam91cm5leT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBqb3VybmV5LyR7am91cm5leS5faWR9YCkpXHJcblx0XHR9XHJcblxyXG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRcdHJvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBUZXh0U2NoZWR1bGVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnN0YXRlPXtcclxuXHRcdFx0d2F5cG9pbnRzOiBudWxsLFxyXG5cdFx0XHRtYXA6ZmFsc2VcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRKb3VybmV5REIuZ2V0V2F5cG9pbnRzKHRoaXMucHJvcHMuam91cm5leSlcclxuXHRcdFx0LnRoZW4od2F5cG9pbnRzPT50aGlzLnNldFN0YXRlKHt3YXlwb2ludHN9KSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXksIG90aGVyc309dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3dheXBvaW50cywgbWFwfT10aGlzLnN0YXRlXHJcblx0XHRpZih3YXlwb2ludHMgJiYgd2F5cG9pbnRzLmxlbmd0aCl7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkV2l0aEljb24gaWNvbj17PEljb25TY2hlZHVsZS8+fSBmbG9hdGluZ0xhYmVsRml4ZWQ9e3RydWV9XHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PXtg5Y+R546wJHt3YXlwb2ludHMubGVuZ3RofeW8oOeFp+eJh+acieWcsOWdgOS/oeaBr++8jOeCueWHu+Wbvuagh+afpeeci+ivpue7huS/oeaBr2B9XHJcblx0XHRcdFx0XHRcdG11bHRpTGluZT17dHJ1ZX0gZnVsbFdpZHRoPXt0cnVlfSB7Li4ub3RoZXJzfS8+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7d2lkdGg6MjQsdmVydGljYWxBbGlnbjpcImJvdHRvbVwifX0+XHJcblx0XHRcdFx0XHRcdDxJY29uTWFwIGNvbG9yPVwibGlnaHRibHVlXCIgb25DbGljaz17ZT0+dGhpcy5zaG93TWFwKCl9Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0e21hcCAmJiAoPE1hcCBtYXJrZXJzPXt3YXlwb2ludHN9Lz4pfVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZFdpdGhJY29uIGljb249ezxJY29uU2NoZWR1bGUvPn0gZmxvYXRpbmdMYWJlbEZpeGVkPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuW/q+mAn+iuoeWIkuS9oOeahOihjOeoi++8jOavlOWmgu+8muWMl+S6rCzkuIrmtbcsLi4uXCJcclxuXHRcdFx0XHRcdFx0bXVsdGlMaW5lPXt0cnVlfSBmdWxsV2lkdGg9e3RydWV9IHsuLi5vdGhlcnN9Lz5cclxuXHRcdFx0XHQ8L2Rpdj4pXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzaG93TWFwKCl7XHJcblx0XHR0aGlzLnNldFN0YXRlKHttYXA6dHJ1ZX0pXHJcblx0fVxyXG59XHJcbiJdfQ==