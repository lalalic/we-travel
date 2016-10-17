"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Title = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _Stepper = require("material-ui/Stepper");

var _directionsWalk = require("material-ui/svg-icons/maps/directions-walk");

var _directionsWalk2 = _interopRequireDefault(_directionsWalk);

var _cameraRoll = require("material-ui/svg-icons/image/camera-roll");

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

var _moreHoriz = require("material-ui/svg-icons/navigation/more-horiz");

var _moreHoriz2 = _interopRequireDefault(_moreHoriz);

var _add = require("material-ui/svg-icons/content/add");

var _add2 = _interopRequireDefault(_add);

var _map = require("material-ui/svg-icons/maps/map");

var _map2 = _interopRequireDefault(_map);

var _photoCamera = require("material-ui/svg-icons/image/photo-camera");

var _photoCamera2 = _interopRequireDefault(_photoCamera);

var _db = require("../db");

var _chipper = require("./chipper");

var _chipper2 = _interopRequireDefault(_chipper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;
var Photo = _qiliApp.UI.Photo;

var Journey = function (_Component) {
	_inherits(Journey, _Component);

	function Journey() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Journey);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Journey)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
			itinerary: [],
			footprints: []
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Journey, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			_db.Journey.getFootprints(this.props.journey).then(function (footprints) {
				return _this2.setState({ footprints: footprints });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var _props = this.props;
			var startedAt = _props.journey.startedAt;
			var onMap = _props.onMap;
			var _state = this.state;
			var footprints = _state.footprints;
			var editing = _state.editing;

			var currentDate = null,
			    lastDay = 0,
			    all = [];

			footprints.forEach(function (footprint, i) {
				var when = footprint.when;
				var photo = footprint.photo;
				var note = footprint.note;

				if (currentDate == null || !when.isSameDate(currentDate)) {
					currentDate = when;
					var day = currentDate.relative(startedAt) + 1;

					var _loop = function _loop() {
						lastDay++;
						var date = startedAt.relativeDate(lastDay - 1);
						all.push(_react2.default.createElement(Day, { key: lastDay, day: lastDay,
							date: date,
							onEdit: function onEdit(a) {
								return _this3.setState({ editing: { when: date } });
							} }));
					};

					while (lastDay < day) {
						_loop();
					}
				}
				all.push(_react2.default.createElement(Footprint, { key: i, data: footprint,
					onEdit: function onEdit(a) {
						return _this3.setState({ editing: footprint });
					} }));
			});

			var editor = null;
			if (editing) {
				var focusing = editing.focusing;

				var others = _objectWithoutProperties(editing, ["focusing"]);

				editor = _react2.default.createElement(Editor, { footprint: others,
					focusing: focusing,
					onSave: function onSave(a) {
						return _this3.onSave(a);
					},
					onCancel: function onCancel(a) {
						return _this3.setState({ editing: undefined });
					} });
			}
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_Stepper.Stepper,
					{ orientation: "vertical" },
					_react2.default.createElement(Title, { journey: this.props.journey,
						onMap: onMap,
						onEdit: function onEdit(type) {
							return _this3.setState({ editing: { when: new Date(), focusing: type } });
						} }),
					all
				),
				editor
			);
		}
	}, {
		key: "onSave",
		value: function onSave(footprint) {
			var journey = this.props.journey;

			_db.Journey.upsert(footprint).then(function (a) {
				_db.Journey.emit("footprint.changed");
			});
		}
	}]);

	return Journey;
}(_react.Component);

exports.default = Journey;

var Editor = function (_Component2) {
	_inherits(Editor, _Component2);

	function Editor() {
		_classCallCheck(this, Editor);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).apply(this, arguments));
	}

	_createClass(Editor, [{
		key: "render",
		value: function render() {
			var _props2 = this.props;
			var footprint = _props2.footprint;
			var onSave = _props2.onSave;
			var onCancel = _props2.onCancel;
			var focusing = _props2.focusing;

			var actions = [_react2.default.createElement(_materialUi.FlatButton, {
				label: "关闭",
				primary: false,
				onTouchTap: onCancel
			}), _react2.default.createElement(_materialUi.FlatButton, {
				label: "保存",
				primary: true,
				onTouchTap: onSave
			})];

			var note = footprint.note;
			var _footprint$photos = footprint.photos;
			var photos = _footprint$photos === undefined ? [] : _footprint$photos;
			var styles = { iconRatio: 2 / 3, iconSize: { width: 50, height: 50 } };
			var i = 0;
			var uiPhotos = photos.map(function (photo) {
				var _this5 = this;

				return _react2.default.createElement(Photo, _extends({ key: photo }, styles, {
					onPhoto: function onPhoto(url) {
						return _this5.onPhoto(url, i++);
					},
					src: photo }));
			});

			if (uiPhotos.length < 9) uiPhotos.push(_react2.default.createElement(Photo, _extends({ ref: "photo" }, styles, { onPhoto: this.onPhoto.bind(this), key: Date.now() })));

			return _react2.default.createElement(
				_materialUi.Dialog,
				{ title: footprint.when.smartFormat(),
					actions: actions,
					modal: false,
					open: true,
					onRequestClose: onCancel },
				_react2.default.createElement(
					"div",
					{ className: "section" },
					_react2.default.createElement(
						"div",
						{ style: { textAlign: "center" } },
						uiPhotos
					),
					_react2.default.createElement("textarea", { ref: "text",
						style: { width: "100%", border: 0, height: 100, fontSize: 12, paddingTop: 5, borderTop: "1px dotted lightgray" },
						placeholder: "这一刻的想法",
						defaultValue: footprint.note }),
					_react2.default.createElement(_chipper2.default, { chips: ["早餐", "午餐", "晚餐", "购物", "门票", "公交", "飞机", "的士", { label: "特色交通" }, { label: "特色吃的" }, { label: "花销", type: "number" }] }),
					_react2.default.createElement(_chipper2.default, { chips: ["太美了", "无法呼吸", "太壮观了", "喜欢这里"] })
				)
			);
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate() {
			var focusing = this.props.focusing;

			switch (focusing) {
				case "text":
					this.refs.text.focus();
					break;
				case "photo":
					this.refs.photo.click();
					break;
			}
		}
	}, {
		key: "onPhoto",
		value: function onPhoto(url, index) {
			var footprint = this.props.footprint;

			if (footprint.photos.indexOf(url) != -1) {
				this.forceUpdate();
				return;
			}

			if (index != undefined) footprint.photos.splice(index, 1, url);else {
				footprint.photos.push(url);
				this.forceUpdate();
			}
		}
	}]);

	return Editor;
}(_react.Component);

var Title = exports.Title = function (_Component3) {
	_inherits(Title, _Component3);

	function Title() {
		_classCallCheck(this, Title);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Title).apply(this, arguments));
	}

	_createClass(Title, [{
		key: "render",
		value: function render() {
			var _this7 = this;

			var _props3 = this.props;
			var journey = _props3.journey;
			var completed = _props3.completed;
			var onMap = _props3.onMap;
			var onEdit = _props3.onEdit;
			var name = journey.name;
			var _id = journey._id;
			var startedAt = journey.startedAt;

			if (completed) {
				return _react2.default.createElement(
					_Stepper.Step,
					{ completed: true, disabled: true },
					_react2.default.createElement(
						_Stepper.StepLabel,
						null,
						_react2.default.createElement(
							"span",
							{ onClick: function onClick(e) {
									return _this7.context.router.push("journey/" + _id);
								} },
							startedAt.smartFormat(),
							_react2.default.createElement("br", null),
							name
						)
					)
				);
			} else {
				var mapToggle = null;
				if (onMap) {
					mapToggle = _react2.default.createElement(
						"div",
						{ style: { width: 100 } },
						_react2.default.createElement(_materialUi.Toggle, { labelPosition: "right", label: "Map", onToggle: onMap })
					);
				}
				return _react2.default.createElement(
					_Stepper.Step,
					{ completed: true, active: true },
					_react2.default.createElement(
						_Stepper.StepLabel,
						{ icon: "*" },
						_react2.default.createElement(
							"div",
							{ className: "grid" },
							_react2.default.createElement(
								"b",
								{ onClick: function onClick(e) {
										return _this7.context.router.push("journey/" + _id);
									} },
								name
							),
							mapToggle
						)
					),
					_react2.default.createElement(
						_Stepper.StepContent,
						null,
						_react2.default.createElement(
							"p",
							null,
							_react2.default.createElement("input", { style: { border: "1px solid lightgray", padding: 10, marginRight: 10 },
								onClick: function onClick(e) {
									return onEdit("text");
								},
								placeholder: "发状态当达人..." }),
							_react2.default.createElement(
								"span",
								{ style: { position: "relative", top: 8 } },
								_react2.default.createElement(_photoCamera2.default, { onClick: function onClick(e) {
										return onEdit("photo");
									}, color: "lightgray" })
							)
						)
					)
				);
			}
		}
	}]);

	return Title;
}(_react.Component);

Title.contextTypes = {
	router: _react.PropTypes.object
};

var Day = function (_Component4) {
	_inherits(Day, _Component4);

	function Day() {
		_classCallCheck(this, Day);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Day).apply(this, arguments));
	}

	_createClass(Day, [{
		key: "render",
		value: function render() {
			var _props4 = this.props;
			var day = _props4.day;
			var date = _props4.date;
			var onEdit = _props4.onEdit;

			return _react2.default.createElement(
				_Stepper.Step,
				{ disabled: false },
				_react2.default.createElement(
					_Stepper.StepLabel,
					{ icon: "" + day, onTouchTap: onEdit },
					_react2.default.createElement(
						"span",
						null,
						date.smartFormat("今天")
					),
					_react2.default.createElement(_moreHoriz2.default, null)
				)
			);
		}
	}]);

	return Day;
}(_react.Component);

var Footprint = function (_Component5) {
	_inherits(Footprint, _Component5);

	function Footprint() {
		_classCallCheck(this, Footprint);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Footprint).apply(this, arguments));
	}

	_createClass(Footprint, [{
		key: "render",
		value: function render() {
			var _this10 = this;

			var _props5 = this.props;
			var _props5$data = _props5.data;
			var when = _props5$data.when;
			var _props5$data$photos = _props5$data.photos;
			var photos = _props5$data$photos === undefined ? [] : _props5$data$photos;
			var note = _props5$data.note;
			var onEdit = _props5.onEdit;

			return _react2.default.createElement(
				_Stepper.Step,
				{ completed: true, active: true },
				_react2.default.createElement(
					_Stepper.StepLabel,
					{ icon: "." },
					_react2.default.createElement(
						"time",
						null,
						when.format('HH:mm'),
						" "
					),
					_react2.default.createElement(
						"span",
						null,
						note
					),
					_react2.default.createElement(_moreHoriz2.default, { onTouchTap: onEdit })
				),
				_react2.default.createElement(
					_Stepper.StepContent,
					null,
					_react2.default.createElement(
						"p",
						null,
						photos.map(function (_ref, i) {
							var url = _ref.url;
							var taken = _ref.taken;
							var loc = _ref.loc;
							return _react2.default.createElement("img", { key: i, onClick: function onClick(e) {
									return _this10.context.viewPhoto(url);
								}, style: { height: 50, margin: 2 }, src: url });
						})
					)
				)
			);
		}
	}]);

	return Footprint;
}(_react.Component);

Footprint.contextTypes = {
	viewPhoto: _react2.default.PropTypes.func
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2pvdXJuZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVPO0lBQU87O0lBRU87Ozs7Ozs7Ozs7Ozs7O21NQUNwQixRQUFNO0FBQ0wsY0FBVSxFQUFWO0FBQ0EsZUFBVyxFQUFYOzs7O2NBSG1COztzQ0FLRDs7O0FBQ2xCLGVBQVUsYUFBVixDQUF3QixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQXhCLENBQ0UsSUFERixDQUNPO1dBQVksT0FBSyxRQUFMLENBQWMsRUFBQyxzQkFBRCxFQUFkO0lBQVosQ0FEUCxDQURrQjs7OzsyQkFJWDs7O2dCQUMwQixLQUFLLEtBQUwsQ0FEMUI7T0FDTyxtQkFBVCxRQUFTLFVBRFA7T0FDbUIscUJBRG5CO2dCQUVtQixLQUFLLEtBQUwsQ0FGbkI7T0FFRiwrQkFGRTtPQUVVLHlCQUZWOztBQUdQLE9BQUksY0FBWSxJQUFaO09BQWtCLFVBQVEsQ0FBUjtPQUFXLE1BQUksRUFBSixDQUgxQjs7QUFLUCxjQUFXLE9BQVgsQ0FBbUIsVUFBQyxTQUFELEVBQVcsQ0FBWCxFQUFlO1FBQzFCLE9BQWlCLFVBQWpCLEtBRDBCO1FBQ3JCLFFBQVksVUFBWixNQURxQjtRQUNmLE9BQU0sVUFBTixLQURlOztBQUVqQyxRQUFHLGVBQWEsSUFBYixJQUFxQixDQUFDLEtBQUssVUFBTCxDQUFnQixXQUFoQixDQUFELEVBQThCO0FBQ3JELG1CQUFZLElBQVosQ0FEcUQ7QUFFckQsU0FBSSxNQUFJLFlBQVksUUFBWixDQUFxQixTQUFyQixJQUFnQyxDQUFoQyxDQUY2Qzs7O0FBSXBEO0FBQ0EsVUFBSSxPQUFLLFVBQVUsWUFBVixDQUF1QixVQUFRLENBQVIsQ0FBNUI7QUFDSixVQUFJLElBQUosQ0FBUyw4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RUFBWDtLQUNDOzs7TUFBTyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQVA7O01BREQ7S0FFQzs7O01BQU8sSUFBUDtNQUZEO0tBR0MscURBQVUsWUFBWSxNQUFaLEVBQVYsQ0FIRDtLQUREO0lBTUM7OztLQUNDOzs7TUFDRSxPQUFPLEdBQVAsQ0FBVyxnQkFBaUIsQ0FBakI7V0FBRTtXQUFJO1dBQU07Y0FBVSx1Q0FBSyxLQUFLLENBQUwsRUFBUSxTQUFTO2dCQUFHLFFBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkI7U0FBSCxFQUFnQyxPQUFPLEVBQUMsUUFBTyxFQUFQLEVBQVcsUUFBTyxDQUFQLEVBQW5CLEVBQThCLEtBQUssR0FBTCxFQUFwRjtPQUF0QixDQURiO01BREQ7S0FORDtJQURELENBRk87Ozs7UUFESDs7O1VBbUJFLGVBQWE7QUFDbkIsWUFBVSxnQkFBTSxTQUFOLENBQWdCLElBQWhCIiwiZmlsZSI6ImpvdXJuZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7VUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLCBGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b24sIEljb25CdXR0b24sIERpYWxvZywgVG9nZ2xlfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge1N0ZXAsU3RlcHBlcixTdGVwTGFiZWwsU3RlcENvbnRlbnR9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXHJcblxyXG5pbXBvcnQgTG9nbyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9kaXJlY3Rpb25zLXdhbGsnXHJcbmltcG9ydCBJY29uUHVibGlzaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuaW1wb3J0IEljb25Nb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtaG9yaXonXHJcbmltcG9ydCBJY29uQWRkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZCdcclxuaW1wb3J0IEljb25NYXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL21hcFwiXHJcbmltcG9ydCBJY29uQ2FtZXJhIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9waG90by1jYW1lcmEnXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBGb290cHJpbnQgYXMgRm9vdHByaW50REJ9IGZyb20gXCIuLi9kYlwiXHJcbmltcG9ydCBDaGlwcGVyIGZyb20gXCIuL2NoaXBwZXJcIlxyXG5cclxuY29uc3Qge0VtcHR5LCBQaG90b309VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvdXJuZXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0aXRpbmVyYXJ5OltdLFxyXG5cdFx0Zm9vdHByaW50czpbXVxyXG5cdH1cclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Sm91cm5leURCLmdldEZvb3RwcmludHModGhpcy5wcm9wcy5qb3VybmV5KVxyXG5cdFx0XHQudGhlbihmb290cHJpbnRzPT50aGlzLnNldFN0YXRlKHtmb290cHJpbnRzfSkpXHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0bGV0IHtqb3VybmV5OntzdGFydGVkQXR9LCBvbk1hcH09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IHtmb290cHJpbnRzLCBlZGl0aW5nfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgY3VycmVudERhdGU9bnVsbCwgbGFzdERheT0wLCBhbGw9W107XHJcblxyXG5cdFx0Zm9vdHByaW50cy5mb3JFYWNoKChmb290cHJpbnQsaSk9PntcclxuXHRcdFx0Y29uc3Qge3doZW4scGhvdG8sbm90ZX09Zm9vdHByaW50XHJcblx0XHRcdGlmKGN1cnJlbnREYXRlPT1udWxsIHx8ICF3aGVuLmlzU2FtZURhdGUoY3VycmVudERhdGUpKXtcclxuXHRcdFx0XHRjdXJyZW50RGF0ZT13aGVuXHJcblx0XHRcdFx0bGV0IGRheT1jdXJyZW50RGF0ZS5yZWxhdGl2ZShzdGFydGVkQXQpKzFcclxuXHRcdFx0XHR3aGlsZShsYXN0RGF5PGRheSl7XHJcblx0XHRcdFx0XHRsYXN0RGF5KytcclxuXHRcdFx0XHRcdGxldCBkYXRlPXN0YXJ0ZWRBdC5yZWxhdGl2ZURhdGUobGFzdERheS0xKVxyXG5cdFx0XHRcdFx0YWxsLnB1c2goPERheSBrZXk9e2xhc3REYXl9IGRheT17bGFzdERheX1cclxuXHRcdFx0XHRcdFx0ZGF0ZT17ZGF0ZX1cclxuXHRcdFx0XHRcdFx0b25FZGl0PXthPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOnt3aGVuOmRhdGV9fSl9Lz4pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGFsbC5wdXNoKDxGb290cHJpbnQga2V5PXtpfSBkYXRhPXtmb290cHJpbnR9XHJcblx0XHRcdFx0b25FZGl0PXthPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOmZvb3RwcmludH0pfS8+KVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdFx0bGV0IGVkaXRvcj1udWxsXHJcblx0XHRpZihlZGl0aW5nKXtcclxuXHRcdFx0Y29uc3Qge2ZvY3VzaW5nLCAuLi5vdGhlcnN9PWVkaXRpbmdcclxuXHRcdFx0ZWRpdG9yPSg8RWRpdG9yIGZvb3RwcmludD17b3RoZXJzfVxyXG5cdFx0XHRcdFx0Zm9jdXNpbmc9e2ZvY3VzaW5nfVxyXG5cdFx0XHRcdFx0b25TYXZlPXthPT50aGlzLm9uU2F2ZShhKX1cclxuXHRcdFx0XHRcdG9uQ2FuY2VsPXthPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOnVuZGVmaW5lZH0pfS8+KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+XHJcblx0XHRcdFx0XHQ8VGl0bGUgam91cm5leT17dGhpcy5wcm9wcy5qb3VybmV5fSBcclxuXHRcdFx0XHRcdFx0b25NYXA9e29uTWFwfVxyXG5cdFx0XHRcdFx0XHRvbkVkaXQ9e3R5cGU9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6e3doZW46bmV3IERhdGUoKSwgZm9jdXNpbmc6dHlwZX19KX0vPlxyXG5cdFx0XHRcdFx0e2FsbH1cclxuXHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0e2VkaXRvcn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cclxuXHRvblNhdmUoZm9vdHByaW50KXtcclxuXHRcdGNvbnN0IHtqb3VybmV5fT10aGlzLnByb3BzXHJcblx0XHRKb3VybmV5REIudXBzZXJ0KGZvb3RwcmludClcclxuXHRcdFx0LnRoZW4oYT0+e1xyXG5cdFx0XHRcdEpvdXJuZXlEQi5lbWl0KFwiZm9vdHByaW50LmNoYW5nZWRcIilcclxuXHRcdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBFZGl0b3IgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7Zm9vdHByaW50LCBvblNhdmUsIG9uQ2FuY2VsLCBmb2N1c2luZ309dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3QgYWN0aW9ucyA9IFtcclxuXHRcdFx0ICA8RmxhdEJ1dHRvblxyXG5cdFx0XHRcdGxhYmVsPVwi5YWz6ZetXCJcclxuXHRcdFx0XHRwcmltYXJ5PXtmYWxzZX1cclxuXHRcdFx0XHRvblRvdWNoVGFwPXtvbkNhbmNlbH1cclxuXHRcdFx0ICAvPixcclxuXHRcdFx0ICA8RmxhdEJ1dHRvblxyXG5cdFx0XHRcdGxhYmVsPVwi5L+d5a2YXCJcclxuXHRcdFx0XHRwcmltYXJ5PXt0cnVlfVxyXG5cdFx0XHRcdG9uVG91Y2hUYXA9e29uU2F2ZX1cclxuXHRcdFx0ICAvPixcclxuXHRcdFx0XTtcclxuXHJcblx0XHR2YXIge25vdGUsIHBob3Rvcz1bXX09Zm9vdHByaW50LFxyXG4gICAgICAgICAgICBzdHlsZXM9e2ljb25SYXRpbzoyLzMsIGljb25TaXplOnt3aWR0aDo1MCwgaGVpZ2h0OjUwfX0sXHJcbiAgICAgICAgICAgIGk9MCxcclxuICAgICAgICAgICAgdWlQaG90b3M9cGhvdG9zLm1hcChmdW5jdGlvbihwaG90byl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxQaG90byBrZXk9e3Bob3RvfSB7Li4uc3R5bGVzfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uUGhvdG89eyh1cmwpPT50aGlzLm9uUGhvdG8odXJsLGkrKyl9XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtwaG90b30vPilcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYodWlQaG90b3MubGVuZ3RoPDkpXHJcbiAgICAgICAgICAgIHVpUGhvdG9zLnB1c2goKDxQaG90byByZWY9XCJwaG90b1wiIHsuLi5zdHlsZXN9IG9uUGhvdG89e3RoaXMub25QaG90by5iaW5kKHRoaXMpfSBrZXk9e0RhdGUubm93KCl9Lz4pKVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxEaWFsb2cgdGl0bGU9e2Zvb3RwcmludC53aGVuLnNtYXJ0Rm9ybWF0KCl9XHJcblx0XHRcdFx0YWN0aW9ucz17YWN0aW9uc31cclxuXHRcdFx0XHRtb2RhbD17ZmFsc2V9XHJcblx0XHRcdFx0b3Blbj17dHJ1ZX1cclxuXHRcdFx0XHRvblJlcXVlc3RDbG9zZT17b25DYW5jZWx9PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3RleHRBbGlnbjpcImNlbnRlclwifX0+e3VpUGhvdG9zfTwvZGl2PlxyXG5cdFx0XHRcdFx0PHRleHRhcmVhIHJlZj1cInRleHRcIlxyXG5cdFx0XHRcdFx0XHRzdHlsZT17e3dpZHRoOlwiMTAwJVwiLGJvcmRlcjowLGhlaWdodDoxMDAsIGZvbnRTaXplOjEyLCBwYWRkaW5nVG9wOjUsIGJvcmRlclRvcDpcIjFweCBkb3R0ZWQgbGlnaHRncmF5XCJ9fVxyXG5cdFx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIui/meS4gOWIu+eahOaDs+azlVwiXHJcblx0XHRcdFx0XHRcdGRlZmF1bHRWYWx1ZT17Zm9vdHByaW50Lm5vdGV9Lz5cclxuXHRcdFx0XHRcdDxDaGlwcGVyIGNoaXBzPXtbXHJcblx0XHRcdFx0XHRcdFwi5pep6aSQXCIsXCLljYjppJBcIixcIuaZmumkkFwiLFwi6LSt54mpXCIsXCLpl6jnpahcIixcIuWFrOS6pFwiLFwi6aOe5py6XCIsXCLnmoTlo6tcIixcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi54m56Imy5Lqk6YCaXCJ9LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLnibnoibLlkIPnmoRcIn0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuiKsemUgFwiLHR5cGU6XCJudW1iZXJcIn1cclxuXHRcdFx0XHRcdFx0XX0vPlxyXG5cclxuXHRcdFx0XHRcdDxDaGlwcGVyIGNoaXBzPXtbXHJcblx0XHRcdFx0XHRcdFwi5aSq576O5LqGXCIsXCLml6Dms5XlkbzlkLhcIixcIuWkquWjruinguS6hlwiLFwi5Zac5qyi6L+Z6YeMXCJcclxuXHRcdFx0XHRcdFx0XX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L0RpYWxvZz5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0Y29tcG9uZW50RGlkVXBkYXRlKCl7XHJcblx0XHRjb25zdCB7Zm9jdXNpbmd9PXRoaXMucHJvcHNcclxuXHRcdHN3aXRjaChmb2N1c2luZyl7XHJcblx0XHRjYXNlIFwidGV4dFwiOlxyXG5cdFx0XHR0aGlzLnJlZnMudGV4dC5mb2N1cygpXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcInBob3RvXCI6XHJcblx0XHRcdHRoaXMucmVmcy5waG90by5jbGljaygpXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25QaG90byh1cmwsIGluZGV4KXtcclxuICAgICAgICB2YXIge2Zvb3RwcmludH09dGhpcy5wcm9wc1xyXG4gICAgICAgIGlmKGZvb3RwcmludC5waG90b3MuaW5kZXhPZih1cmwpIT0tMSl7XHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGluZGV4IT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGZvb3RwcmludC5waG90b3Muc3BsaWNlKGluZGV4LDEsdXJsKVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGZvb3RwcmludC5waG90b3MucHVzaCh1cmwpXHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRpdGxlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXksIGNvbXBsZXRlZCwgb25NYXAsIG9uRWRpdH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge25hbWUsX2lkLCBzdGFydGVkQXR9PWpvdXJuZXlcclxuXHRcdGlmKGNvbXBsZXRlZCl7XHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PFN0ZXAgY29tcGxldGVkPXt0cnVlfSBkaXNhYmxlZD17dHJ1ZX0+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGpvdXJuZXkvJHtfaWR9YCl9PlxyXG5cdFx0XHRcdFx0XHRcdHtzdGFydGVkQXQuc21hcnRGb3JtYXQoKX1cclxuXHRcdFx0XHRcdFx0XHQ8YnIvPlxyXG5cdFx0XHRcdFx0XHRcdHtuYW1lfVxyXG5cdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHQ8L1N0ZXA+XHJcblx0XHRcdClcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRsZXQgbWFwVG9nZ2xlPW51bGxcclxuXHRcdFx0aWYob25NYXApe1xyXG5cdFx0XHRcdG1hcFRvZ2dsZT0oPGRpdiBzdHlsZT17e3dpZHRoOjEwMH19PjxUb2dnbGUgbGFiZWxQb3NpdGlvbj1cInJpZ2h0XCIgbGFiZWw9XCJNYXBcIm9uVG9nZ2xlPXtvbk1hcH0vPjwvZGl2PilcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxTdGVwIGNvbXBsZXRlZD17dHJ1ZX0gYWN0aXZlPXt0cnVlfT5cclxuXHRcdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj1cIipcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XHJcblx0XHRcdFx0XHRcdFx0PGIgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBqb3VybmV5LyR7X2lkfWApfT57bmFtZX08L2I+XHJcblx0XHRcdFx0XHRcdFx0e21hcFRvZ2dsZX1cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L1N0ZXBMYWJlbD5cclxuXHRcdFx0XHRcdDxTdGVwQ29udGVudD5cclxuXHRcdFx0XHRcdFx0PHA+XHJcblx0XHRcdFx0XHRcdFx0PGlucHV0IHN0eWxlPXt7Ym9yZGVyOlwiMXB4IHNvbGlkIGxpZ2h0Z3JheVwiLHBhZGRpbmc6MTAsIG1hcmdpblJpZ2h0OjEwfX0gXHJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5vbkVkaXQoXCJ0ZXh0XCIpfVxyXG5cdFx0XHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCLlj5HnirbmgIHlvZPovr7kurouLi5cIi8+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3twb3NpdGlvbjpcInJlbGF0aXZlXCIsIHRvcDo4fX0+XHJcblx0XHRcdFx0XHRcdFx0XHQ8SWNvbkNhbWVyYSBvbkNsaWNrPXtlPT5vbkVkaXQoXCJwaG90b1wiKX0gY29sb3I9XCJsaWdodGdyYXlcIi8+XHJcblx0XHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0XHQ8L1N0ZXBDb250ZW50PlxyXG5cdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIERheSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkYXksZGF0ZSwgb25FZGl0fT10aGlzLnByb3BzXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8U3RlcCBkaXNhYmxlZD17ZmFsc2V9PlxyXG5cdFx0XHRcdDxTdGVwTGFiZWwgaWNvbj17YCR7ZGF5fWB9IG9uVG91Y2hUYXA9e29uRWRpdH0+XHJcblx0XHRcdFx0XHQ8c3Bhbj57ZGF0ZS5zbWFydEZvcm1hdChcIuS7iuWkqVwiKX08L3NwYW4+XHJcblx0XHRcdFx0XHQ8SWNvbk1vcmUvPlxyXG5cdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHQ8L1N0ZXA+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBGb290cHJpbnQgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZGF0YToge3doZW4scGhvdG9zPVtdLG5vdGV9LCBvbkVkaXR9PXRoaXMucHJvcHNcclxuXHRcdHJldHVybiAgKFxyXG5cdFx0XHQ8U3RlcCBjb21wbGV0ZWQ9e3RydWV9IGFjdGl2ZT17dHJ1ZX0+XHJcblx0XHRcdFx0PFN0ZXBMYWJlbCBpY29uPXtcIi5cIn0gPlxyXG5cdFx0XHRcdFx0PHRpbWU+e3doZW4uZm9ybWF0KCdISDptbScpfSZuYnNwOzwvdGltZT5cclxuXHRcdFx0XHRcdDxzcGFuPntub3RlfTwvc3Bhbj5cclxuXHRcdFx0XHRcdDxJY29uTW9yZSBvblRvdWNoVGFwPXtvbkVkaXR9IC8+XHJcblx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdFx0PFN0ZXBDb250ZW50PlxyXG5cdFx0XHRcdFx0PHA+XHJcblx0XHRcdFx0XHRcdHtwaG90b3MubWFwKCh7dXJsLHRha2VuLGxvY30saSk9Pig8aW1nIGtleT17aX0gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnZpZXdQaG90byh1cmwpfSBzdHlsZT17e2hlaWdodDo1MCwgbWFyZ2luOjJ9fSBzcmM9e3VybH0vPikpfVxyXG5cdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdDwvU3RlcENvbnRlbnQ+XHJcblx0XHRcdDwvU3RlcD5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0dmlld1Bob3RvOlJlYWN0LlByb3BUeXBlcy5mdW5jXHJcblx0fVxyXG59XHJcbiJdfQ==