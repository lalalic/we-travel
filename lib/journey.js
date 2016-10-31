"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Creator = exports.Journey = exports.REDUCER = exports.ACTION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _reactRedux = require("react-redux");

var _materialUi = require("material-ui");

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _map = require("material-ui/svg-icons/maps/map");

var _map2 = _interopRequireDefault(_map);

var _editLocation = require("material-ui/svg-icons/maps/edit-location");

var _editLocation2 = _interopRequireDefault(_editLocation);

var _cameraRoll = require("material-ui/svg-icons/image/camera-roll");

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

var _delete = require("material-ui/svg-icons/action/delete");

var _delete2 = _interopRequireDefault(_delete);

var _chipper = require("./components/chipper");

var _chipper2 = _interopRequireDefault(_chipper);

var _textFieldWithIcon = require("./components/textFieldWithIcon");

var _textFieldWithIcon2 = _interopRequireDefault(_textFieldWithIcon);

var _searchTextField = require("./components/searchTextField");

var _searchTextField2 = _interopRequireDefault(_searchTextField);

var _map3 = require("./components/map");

var _map4 = _interopRequireDefault(_map3);

var _itinerary = require("./components/itinerary");

var _itinerary2 = _interopRequireDefault(_itinerary);

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Loading = _qiliApp.UI.Loading;
var CommandBar = _qiliApp.UI.CommandBar;


var DOMAIN = "ui.journey";

var INIT_STATE = {};
var ACTION = exports.ACTION = {
	CREATE: function CREATE(journey) {
		return function (dispatch) {
			var name = journey.name;
			var startedAt = journey.startedAt;
			var endedAt = journey.endedAt;

			var nameError = void 0,
			    endedAtError = void 0;
			if (!name) nameError = "名称不能为空";
			if (startedAt && endedAt && endedAt.getTime() - startedAt.getTime() < 0) endedAtError = "结束时间不能晚于开始时间";

			if (nameError || endedAtError) {
				dispatch({ type: "@@" + DOMAIN + "/error", payload: { nameError: nameError, endedAtError: endedAtError } });
				return Promise.reject();
			}
			return _db.Journey.upsert(journey).then(function (journey) {
				dispatch({ type: "@@" + DOMAIN + "/created", journey: journey });
				return journey;
			});
		};
	},
	FETCH: function FETCH(_id) {
		return function (dispatch) {
			return _db.Journey.findOne({ _id: _id }, function (a) {
				return dispatch({ type: "@@" + DOMAIN + "/fetched", payload: a });
			});
		};
	},
	UPDATE: function UPDATE(journey, changed) {
		return function (dispatch) {
			var name = journey.name;
			var startedAt = journey.startedAt;
			var endedAt = journey.endedAt;

			var nameError = void 0,
			    endedAtError = void 0;
			if (!name) nameError = "名称不能为空";
			if (startedAt && endedAt && endedAt.getTime() - startedAt.getTime() < 0) endedAtError = "结束时间不能晚于开始时间";

			if (nameError || endedAtError) {
				dispatch({ type: "@@" + DOMAIN + "/error", payload: { nameError: nameError, endedAtError: endedAtError } });
				return Promise.reject();
			}

			return _db.Journey.upsert(journey).then(function (a) {
				return dispatch({ type: "@@" + DOMAIN + "/updated", payload: a });
			});
		};
	},
	REMOVE: function REMOVE(_id) {
		return function (dispatch) {
			return _db.Journey.remove(_id);
		};
	},
	CLEAR: { type: "@@" + DOMAIN + "/CLEAR" }
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length <= 0 || arguments[0] === undefined ? INIT_STATE : arguments[0];
	var _ref = arguments[1];
	var type = _ref.type;
	var payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/error":
			return payload;
		case "@@" + DOMAIN + "/fetched":
		case "@@" + DOMAIN + "/updated":
			return Object.assign({}, INIT_STATE, { entity: payload });
		case "@@" + DOMAIN + "/created":
		case "@@" + DOMAIN + "/CLEAR":
			return INIT_STATE;
	}
	return state;
});

var Journey = exports.Journey = (0, _reactRedux.connect)(function (state, _ref2) {
	var _id = _ref2.params._id;
	return _extends({ _id: _id }, state[DOMAIN]);
})(function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _props = this.props;
			var dispatch = _props.dispatch;
			var _id = _props._id;

			dispatch(ACTION.FETCH(_id));
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(next) {
			if (this.props._id != next._id) next.dispatch(ACTION.FETCH(_id));
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.props.dispatch(ACTION.CLEAR);
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props;
			var journey = _props2.entity;
			var router = _props2.router;
			var dispatch = _props2.dispatch;
			var _id = _props2._id;
			var nameError = _props2.nameError;
			var endedAtError = _props2.endedAtError;

			if (!journey) return _react2.default.createElement(Loading, null);
			var startedAt = journey.startedAt;
			var endedAt = journey.endedAt;

			var scheduler = void 0;
			var actions = ["Back", { action: "Comment",
				label: "评论",
				onSelect: function onSelect(e) {
					return router.push("/comment/" + _db.Journey._name + "/" + journey._id, { journey: journey });
				},
				icon: _react2.default.createElement(_cameraRoll2.default, null) }];
			switch (_db.Journey.getState(journey)) {
				case "Memory":

					break;
				case "Starting":
				case "Ending":
				case "Traveling":
				case "Plan":
				default:
					scheduler = _react2.default.createElement(
						"div",
						null,
						_react2.default.createElement(_materialUi.TextField, { onClick: function onClick(e) {
								return router.push("/journey/" + journey._id + "/itinerary");
							},
							floatingLabelText: "快速计划你的行程",
							defaultValue: "...",
							floatingLabelFixed: true }),
						_react2.default.createElement(_itinerary2.default, { journey: journey, mode: "place" })
					);

					actions.splice(1, 0, {
						action: "Remove",
						label: "删除",
						onSelect: function onSelect(e) {
							return dispatch(ACTION.REMOVE(_id)).then(function (removed) {
								return router.replace("/");
							});
						},
						icon: _react2.default.createElement(_delete2.default, null)
					});
			}

			var refName = void 0;
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "floating sticky top right",
						mini: true,
						onClick: function onClick(e) {
							return router.push("/publish/journey/" + journey._id);
						} },
					"$",
					_react2.default.createElement(_cameraRoll2.default, null)
				),
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
							return refName = a;
						},
						floatingLabelText: "一次有独特意义的旅行名称",
						fullWidth: true,
						value: journey.name,
						errorText: nameError,
						onChange: function onChange(e, value) {
							return refName.value = value;
						},
						onBlur: function onBlur(_ref3) {
							var value = _ref3.target.value;
							return value != journey.name && dispatch(ACTION.UPDATE(journey, { name: value }));
						},
						onKeyDown: function onKeyDown(_ref4) {
							var keyCode = _ref4.keyCode;
							var value = _ref4.target.value;
							keyCode == 13 && value != journey.name && dispatch(ACTION.UPDATE(journey, { name: value }));
						} }),
					_react2.default.createElement(_materialUi.DatePicker, {
						floatingLabelText: "开始日期",
						fullWidth: false,
						value: journey.startedAt,
						onChange: function onChange(e, startedAt) {
							return startedAt != journey.startedAt && dispatch(ACTION.UPDATE(journey, { startedAt: startedAt }));
						},
						autoOk: true }),
					_react2.default.createElement(_materialUi.DatePicker, {
						floatingLabelText: "结束日期",
						fullWidth: false,
						value: journey.endedAt,
						errorText: endedAtError,
						onChange: function onChange(e, endedAt) {
							return endedAt != journey.endedAt && dispatch(ACTION.UPDATE(journey, { endedAt: endedAt }));
						},
						autoOk: true }),
					_react2.default.createElement(_chipper2.default, {
						title: "更多信息",
						autoOpen: false,
						chips: ["徒步", "自驾", "自行车", "挑战", "放松", "家庭", "商务", "老人", "小孩", "情侣", { label: "预算", type: "number" }, "海滩", "人文", "山水", "都市", "会友", "蜜月", "生日", "周年庆"] }),
					scheduler
				),
				_react2.default.createElement(CommandBar, { className: "footbar", items: actions })
			);
		}
	}]);

	return _class;
}(_react.Component));

var Creator = exports.Creator = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
})(function (_Component2) {
	_inherits(_class2, _Component2);

	function _class2() {
		_classCallCheck(this, _class2);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).apply(this, arguments));
	}

	_createClass(_class2, [{
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.props.dispatch(ACTION.CLEAR);
		}
	}, {
		key: "render",
		value: function render() {
			var _props3 = this.props;
			var dispatch = _props3.dispatch;
			var router = _props3.router;
			var nameError = _props3.nameError;
			var endedAtError = _props3.endedAtError;

			var name = void 0,
			    startedAt = void 0,
			    endedAt = void 0;
			var values = function values(a) {
				return {
					name: name.getValue(),
					startedAt: startedAt.getDate(),
					endedAt: endedAt.getDate()
				};
			};
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ style: { padding: 5 } },
					_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
							return name = a;
						},
						floatingLabelText: "一次有独特意义的旅行名称",
						fullWidth: true,
						errorText: nameError }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: function ref(a) {
							return startedAt = a;
						},
						floatingLabelText: "开始日期",
						fullWidth: false,
						autoOk: true }),
					_react2.default.createElement(_materialUi.DatePicker, { ref: function ref(a) {
							return endedAt = a;
						},
						floatingLabelText: "结束日期",
						fullWidth: false,
						autoOk: true,
						errorText: endedAtError })
				),
				_react2.default.createElement(_qiliApp.UI.CommandBar, { className: "footbar",
					items: ["Back", { action: "Save", label: "保存", icon: _react2.default.createElement(_cloudDone2.default, null),
						onSelect: function onSelect(a) {
							return dispatch(ACTION.CREATE(values())).then(function (a) {
								return router.replace("/journey/" + a._id);
							});
						}
					}] })
			);
		}
	}]);

	return _class2;
}(_react.Component));

exports.default = Object.assign(Journey, { ACTION: ACTION, REDUCER: REDUCER, Creator: Creator });
//# sourceMappingURL=data:application/json;base64,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Q0EsaUJBQVcsWUFBWCxFQUpELENBWEQ7S0FERDtJQW1CQywwQ0FBSSxVQUFKLElBQWUsV0FBVSxTQUFWO0FBQ2QsWUFBTyxDQUFDLE1BQUQsRUFDTixFQUFDLFFBQU8sTUFBUCxFQUFlLE9BQU0sSUFBTixFQUFZLE1BQUssd0RBQUw7QUFDMUIsZ0JBQVM7Y0FBRyxTQUFTLE9BQU8sTUFBUCxDQUFjLFFBQWQsQ0FBVCxFQUNYLElBRFcsQ0FDTjtlQUFHLE9BQU8sT0FBUCxlQUEyQixFQUFFLEdBQUY7UUFBOUI7T0FERztNQUZMLENBQVAsRUFERCxDQW5CRDtJQURELENBUk87Ozs7O21CQUxXLENBQVI7O2tCQThDRSxPQUFPLE1BQVAsQ0FBYyxPQUFkLEVBQXNCLEVBQUMsY0FBRCxFQUFRLGdCQUFSLEVBQWdCLGdCQUFoQixFQUF0QiIsImZpbGUiOiJqb3VybmV5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b24sVGV4dEZpZWxkLCBEYXRlUGlja2VyLCBBdmF0YXIsIERpdmlkZXIsIERpYWxvZ30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXHJcbmltcG9ydCBJY29uTWFwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9tYXBcIlxyXG5pbXBvcnQgSWNvblNjaGVkdWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9lZGl0LWxvY2F0aW9uXCJcclxuaW1wb3J0IEljb25QdWJsaXNoIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIlxyXG5pbXBvcnQgSWNvblJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kZWxldGVcIlxyXG5cclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY29tcG9uZW50cy9jaGlwcGVyXCJcclxuaW1wb3J0IFRleHRGaWVsZFdpdGhJY29uIGZyb20gXCIuL2NvbXBvbmVudHMvdGV4dEZpZWxkV2l0aEljb25cIlxyXG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoVGV4dEZpZWxkXCJcclxuaW1wb3J0IE1hcCBmcm9tIFwiLi9jb21wb25lbnRzL21hcFwiXHJcbmltcG9ydCBJdGluZXJhcnkgZnJvbSBcIi4vY29tcG9uZW50cy9pdGluZXJhcnlcIlxyXG5cclxuaW1wb3J0IHtKb3VybmV5IGFzIEpvdXJuZXlEQn0gZnJvbSBcIi4vZGJcIlxyXG5cclxuY29uc3Qge0xvYWRpbmcsIENvbW1hbmRCYXJ9PVVJXHJcblxyXG5jb25zdCBET01BSU49XCJ1aS5qb3VybmV5XCJcclxuXHJcbmNvbnN0IElOSVRfU1RBVEU9e31cclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0Q1JFQVRFOiBqb3VybmV5PT5kaXNwYXRjaD0+e1xyXG5cdFx0Y29uc3Qge25hbWUsc3RhcnRlZEF0LCBlbmRlZEF0fT1qb3VybmV5XHJcblx0XHRsZXQgbmFtZUVycm9yLCBlbmRlZEF0RXJyb3JcclxuXHRcdGlmKCFuYW1lKVxyXG5cdFx0XHRuYW1lRXJyb3I9XCLlkI3np7DkuI3og73kuLrnqbpcIlxyXG5cdFx0aWYoc3RhcnRlZEF0ICYmIGVuZGVkQXQgJiYgKGVuZGVkQXQuZ2V0VGltZSgpLXN0YXJ0ZWRBdC5nZXRUaW1lKCkpPDApXHJcblx0XHRcdGVuZGVkQXRFcnJvcj1cIue7k+adn+aXtumXtOS4jeiDveaZmuS6juW8gOWni+aXtumXtFwiXHJcblx0XHRcclxuXHRcdGlmKG5hbWVFcnJvciB8fCBlbmRlZEF0RXJyb3Ipe1xyXG5cdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZXJyb3JgLCBwYXlsb2FkOntuYW1lRXJyb3IsIGVuZGVkQXRFcnJvcn19KVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIEpvdXJuZXlEQi51cHNlcnQoam91cm5leSlcclxuXHRcdFx0LnRoZW4oam91cm5leT0+e1xyXG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9jcmVhdGVkYCxqb3VybmV5fSlcclxuXHRcdFx0XHRyZXR1cm4gam91cm5leVxyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHQsRkVUQ0g6IF9pZD0+ZGlzcGF0Y2g9PkpvdXJuZXlEQi5maW5kT25lKHtfaWR9LGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxwYXlsb2FkOmF9KSlcclxuXHQsVVBEQVRFOiAoam91cm5leSxjaGFuZ2VkKT0+ZGlzcGF0Y2g9PntcclxuXHRcdGNvbnN0IHtuYW1lLHN0YXJ0ZWRBdCwgZW5kZWRBdH09am91cm5leVxyXG5cdFx0bGV0IG5hbWVFcnJvciwgZW5kZWRBdEVycm9yXHJcblx0XHRpZighbmFtZSlcclxuXHRcdFx0bmFtZUVycm9yPVwi5ZCN56ew5LiN6IO95Li656m6XCJcclxuXHRcdGlmKHN0YXJ0ZWRBdCAmJiBlbmRlZEF0ICYmIChlbmRlZEF0LmdldFRpbWUoKS1zdGFydGVkQXQuZ2V0VGltZSgpKTwwKVxyXG5cdFx0XHRlbmRlZEF0RXJyb3I9XCLnu5PmnZ/ml7bpl7TkuI3og73mmZrkuo7lvIDlp4vml7bpl7RcIlxyXG5cdFx0XHJcblx0XHRpZihuYW1lRXJyb3IgfHwgZW5kZWRBdEVycm9yKXtcclxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2Vycm9yYCwgcGF5bG9hZDp7bmFtZUVycm9yLCBlbmRlZEF0RXJyb3J9fSlcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIEpvdXJuZXlEQi51cHNlcnQoam91cm5leSlcclxuXHRcdFx0LnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3VwZGF0ZWRgLHBheWxvYWQ6YX0pKVx0XHJcblx0fVxyXG5cdCxSRU1PVkU6IF9pZD0+ZGlzcGF0Y2g9PkpvdXJuZXlEQi5yZW1vdmUoX2lkKVxyXG5cdCxDTEVBUjoge3R5cGU6YEBAJHtET01BSU59L0NMRUFSYH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xyXG5cdFtET01BSU5dOiAoc3RhdGU9SU5JVF9TVEFURSwge3R5cGUsIHBheWxvYWR9KT0+e1xyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vZXJyb3JgOlxyXG5cdFx0XHRyZXR1cm4gcGF5bG9hZFxyXG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XHJcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS91cGRhdGVkYDpcclxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sSU5JVF9TVEFURSx7ZW50aXR5OnBheWxvYWR9KVxyXG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XHJcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XHJcblx0XHRcdHJldHVybiBJTklUX1NUQVRFXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3RhdGVcclxuXHR9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY29uc3QgSm91cm5leT1jb25uZWN0KChzdGF0ZSx7cGFyYW1zOntfaWR9fSk9Pih7X2lkLCAuLi5zdGF0ZVtET01BSU5dfSkpKFxyXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcblx0XHRjb25zdCB7ZGlzcGF0Y2gsIF9pZH09dGhpcy5wcm9wc1xyXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIKF9pZCkpXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcclxuICAgICAgICBpZih0aGlzLnByb3BzLl9pZCE9bmV4dC5faWQpXHJcbiAgICAgICAgICAgbmV4dC5kaXNwYXRjaChBQ1RJT04uRkVUQ0goX2lkKSlcclxuICAgIH1cclxuXHRcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaChBQ1RJT04uQ0xFQVIpXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtlbnRpdHk6am91cm5leSxyb3V0ZXIsIGRpc3BhdGNoLCBfaWQsIG5hbWVFcnJvcixlbmRlZEF0RXJyb3J9PXRoaXMucHJvcHNcclxuXHRcdGlmKCFqb3VybmV5KVxyXG5cdFx0XHRyZXR1cm4gPExvYWRpbmcvPlxyXG5cdFx0Y29uc3Qge3N0YXJ0ZWRBdCwgZW5kZWRBdH09am91cm5leVxyXG5cdFx0bGV0IHNjaGVkdWxlclxyXG5cdFx0bGV0IGFjdGlvbnM9W1xyXG5cdFx0XHRcIkJhY2tcIlxyXG5cdFx0XHQse2FjdGlvbjpcIkNvbW1lbnRcIlxyXG5cdFx0XHRcdCxsYWJlbDpcIuivhOiuulwiXHJcblx0XHRcdFx0LG9uU2VsZWN0OiBlPT5yb3V0ZXIucHVzaChgL2NvbW1lbnQvJHtKb3VybmV5REIuX25hbWV9LyR7am91cm5leS5faWR9YCx7am91cm5leX0pXHJcblx0XHRcdFx0LGljb246PEljb25QdWJsaXNoLz59XHJcblx0XHRdXHJcblx0XHRzd2l0Y2goSm91cm5leURCLmdldFN0YXRlKGpvdXJuZXkpKXtcclxuXHRcdGNhc2UgXCJNZW1vcnlcIjpcclxuXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcIlN0YXJ0aW5nXCI6XHJcblx0XHRjYXNlIFwiRW5kaW5nXCI6XHJcblx0XHRjYXNlIFwiVHJhdmVsaW5nXCI6XHJcblx0XHRjYXNlIFwiUGxhblwiOlxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0c2NoZWR1bGVyPShcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCBvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChgL2pvdXJuZXkvJHtqb3VybmV5Ll9pZH0vaXRpbmVyYXJ5YCl9XHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5b+r6YCf6K6h5YiS5L2g55qE6KGM56iLXCJcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPVwiLi4uXCJcclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbEZpeGVkPXt0cnVlfS8+XHJcblx0XHRcdFx0XHQ8SXRpbmVyYXJ5IGpvdXJuZXk9e2pvdXJuZXl9IG1vZGU9XCJwbGFjZVwiLz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cclxuXHRcdFx0YWN0aW9ucy5zcGxpY2UoMSwwLHtcclxuXHRcdFx0XHRhY3Rpb246XCJSZW1vdmVcIlxyXG5cdFx0XHRcdCxsYWJlbDpcIuWIoOmZpFwiXHJcblx0XHRcdFx0LG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkUoX2lkKSkudGhlbihyZW1vdmVkPT5yb3V0ZXIucmVwbGFjZShcIi9cIikpXHJcblx0XHRcdFx0LGljb246IDxJY29uUmVtb3ZlLz5cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcmVmTmFtZVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSB0b3AgcmlnaHRcIlxyXG5cdFx0XHRcdFx0bWluaT17dHJ1ZX1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnJvdXRlci5wdXNoKGAvcHVibGlzaC9qb3VybmV5LyR7am91cm5leS5faWR9YCl9PlxyXG5cdFx0XHRcdFx0JDxJY29uUHVibGlzaC8+XHJcblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHJcblx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZk5hbWU9YX1cclxuXHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLkuIDmrKHmnInni6znibnmhI/kuYnnmoTml4XooYzlkI3np7BcIlxyXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXtqb3VybmV5Lm5hbWV9XHJcblx0XHRcdFx0XHRcdGVycm9yVGV4dD17bmFtZUVycm9yfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17KGUsdmFsdWUpPT5yZWZOYW1lLnZhbHVlPXZhbHVlfVxyXG5cdFx0XHRcdFx0XHRvbkJsdXI9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+dmFsdWUhPWpvdXJuZXkubmFtZSAmJiBkaXNwYXRjaChBQ1RJT04uVVBEQVRFKGpvdXJuZXkse25hbWU6dmFsdWV9KSl9XHJcblx0XHRcdFx0XHRcdG9uS2V5RG93bj17KHtrZXlDb2RlLHRhcmdldDp7dmFsdWV9fSk9PntrZXlDb2RlPT0xMyAmJiB2YWx1ZSE9am91cm5leS5uYW1lICYmIGRpc3BhdGNoKEFDVElPTi5VUERBVEUoam91cm5leSx7bmFtZTp2YWx1ZX0pKX19Lz5cclxuXHJcblx0XHRcdFx0XHQ8RGF0ZVBpY2tlclxyXG5cdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuW8gOWni+aXpeacn1wiXHJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdHZhbHVlPXtqb3VybmV5LnN0YXJ0ZWRBdH1cclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhlLHN0YXJ0ZWRBdCk9PnN0YXJ0ZWRBdCE9am91cm5leS5zdGFydGVkQXQgJiYgZGlzcGF0Y2goQUNUSU9OLlVQREFURShqb3VybmV5LHtzdGFydGVkQXR9KSl9XHJcblx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdDxEYXRlUGlja2VyXHJcblx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi57uT5p2f5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0dmFsdWU9e2pvdXJuZXkuZW5kZWRBdH1cclxuXHRcdFx0XHRcdFx0ZXJyb3JUZXh0PXtlbmRlZEF0RXJyb3J9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSxlbmRlZEF0KT0+ZW5kZWRBdCE9am91cm5leS5lbmRlZEF0ICYmIGRpc3BhdGNoKEFDVElPTi5VUERBVEUoam91cm5leSx7ZW5kZWRBdH0pKX1cclxuXHRcdFx0XHRcdFx0YXV0b09rPXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdFx0PENoaXBwZXJcclxuXHRcdFx0XHRcdFx0dGl0bGU9XCLmm7TlpJrkv6Hmga9cIlxyXG5cdFx0XHRcdFx0XHRhdXRvT3Blbj17ZmFsc2V9XHJcblx0XHRcdFx0XHRcdGNoaXBzPXtbXHJcblx0XHRcdFx0XHRcdFx0XHRcIuW+kuatpVwiLFwi6Ieq6am+XCIsXCLoh6rooYzovaZcIixcclxuXHRcdFx0XHRcdFx0XHRcdFwi5oyR5oiYXCIsXCLmlL7mnb5cIixcIuWutuW6rVwiLFwi5ZWG5YqhXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuiAgeS6ulwiLFwi5bCP5a2pXCIsXCLmg4XkvqNcIixcclxuXHRcdFx0XHRcdFx0XHRcdHtsYWJlbDpcIumihOeul1wiLHR5cGU6XCJudW1iZXJcIn0sXHJcblx0XHRcdFx0XHRcdFx0XHRcIua1t+a7qVwiLFwi5Lq65paHXCIsXCLlsbHmsLRcIixcIumDveW4glwiLFwi5Lya5Y+LXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRcIuicnOaciFwiLFwi55Sf5pelXCIsXCLlkajlubTluoZcIlxyXG5cdFx0XHRcdFx0XHRcdF19Lz5cclxuXHJcblx0XHRcdFx0XHR7c2NoZWR1bGVyfVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e2FjdGlvbnN9Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IENyZWF0b3I9Y29ubmVjdChzdGF0ZT0+c3RhdGVbRE9NQUlOXSkoXHJcblx0Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0XHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG5cdFx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKEFDVElPTi5DTEVBUilcclxuXHRcdH1cclxuXHRcdHJlbmRlcigpe1xyXG5cdFx0XHRjb25zdCB7ZGlzcGF0Y2gsIHJvdXRlciwgbmFtZUVycm9yLCBlbmRlZEF0RXJyb3J9PXRoaXMucHJvcHNcclxuXHRcdFx0bGV0IG5hbWUsIHN0YXJ0ZWRBdCwgZW5kZWRBdFxyXG5cdFx0XHRsZXQgdmFsdWVzPWE9Pih7XHJcblx0XHRcdFx0bmFtZTpuYW1lLmdldFZhbHVlKCksXHJcblx0XHRcdFx0c3RhcnRlZEF0OnN0YXJ0ZWRBdC5nZXREYXRlKCksXHJcblx0XHRcdFx0ZW5kZWRBdDplbmRlZEF0LmdldERhdGUoKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5uYW1lPWF9XHJcblx0XHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLkuIDmrKHmnInni6znibnmhI/kuYnnmoTml4XooYzlkI3np7BcIlxyXG5cdFx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0XHRlcnJvclRleHQ9e25hbWVFcnJvcn0vPlxyXG5cclxuXHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPXthPT5zdGFydGVkQXQ9YX1cclxuXHRcdFx0XHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuW8gOWni+aXpeacn1wiXHJcblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXtmYWxzZX1cclxuXHRcdFx0XHRcdFx0XHRhdXRvT2s9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj17YT0+ZW5kZWRBdD1hfVxyXG5cdFx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi57uT5p2f5pel5pyfXCJcclxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e2ZhbHNlfVxyXG5cdFx0XHRcdFx0XHRcdGF1dG9Paz17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0XHRlcnJvclRleHQ9e2VuZGVkQXRFcnJvcn0vPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdFx0PFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcblx0XHRcdFx0XHRcdGl0ZW1zPXtbXCJCYWNrXCIsXHJcblx0XHRcdFx0XHRcdFx0e2FjdGlvbjpcIlNhdmVcIiwgbGFiZWw6XCLkv53lrZhcIiwgaWNvbjo8SWNvblNhdmUvPlxyXG5cdFx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUodmFsdWVzKCkpKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQudGhlbihhPT5yb3V0ZXIucmVwbGFjZShgL2pvdXJuZXkvJHthLl9pZH1gKSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0fVxyXG4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKEpvdXJuZXkse0FDVElPTixSRURVQ0VSLENyZWF0b3J9KSJdfQ==