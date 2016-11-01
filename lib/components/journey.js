"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Title = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var _photosField = require("./photos-field");

var _photosField2 = _interopRequireDefault(_photosField);

var _transportationField = require("./transportation-field");

var _transportationField2 = _interopRequireDefault(_transportationField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;


var DOMAIN = "journey";

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
			footprints: [],
			itinerary: []
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Journey, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var journey = this.props.journey;

			var cond = { journey: journey._id };
			Promise.all([new Promise(function (resolve, reject) {
				return _db.Footprint.find(cond).fetch(resolve, reject);
			}), new Promise(function (resolve, reject) {
				return _db.Itinerary.find(cond).fetch(resolve, reject);
			})]).then(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2);

				var footprints = _ref2[0];
				var itinerary = _ref2[1];
				return _this2.setState({ footprints: footprints, itinerary: itinerary });
			});
		}
	}, {
		key: "getDayItinerary",
		value: function getDayItinerary(dayth) {
			var itinerary = this.state.itinerary;

			return itinerary.reduceRight(function (found, a) {
				if (a.dayth == dayth) {
					found.unshift(a);
				} else if (found.length == 0) {
					if (a.dayth < dayth) found.unshift(a);
				}
				return found;
			}, []);
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var _props = this.props;
			var _props$journey = _props.journey;
			var startedAt = _props$journey.startedAt;
			var _id = _props$journey._id;
			var onMap = _props.onMap;
			var publishable = _props.publishable;
			var _state = this.state;
			var footprints = _state.footprints;
			var itinerary = _state.itinerary;

			var currentDate = null,
			    lastDay = 0;
			var all = [];
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
						all.push(_react2.default.createElement(Day, { key: "day" + lastDay, day: lastDay,
							date: date, itinerary: _this3.getDayItinerary(lastDay),
							onEdit: function onEdit(a) {
								return _this3.editing({ when: date });
							} }));
					};

					while (lastDay < day) {
						_loop();
					}
				}
				all.push(_react2.default.createElement(Footprint, { key: i, data: footprint,
					onEdit: function onEdit(a) {
						return _this3.editing(footprint);
					} }));
			});

			if (publishable) {
				all.push(_react2.default.createElement(
					_Stepper.Step,
					{ active: true, completed: false, key: "trigger" },
					_react2.default.createElement(
						_Stepper.StepLabel,
						{ icon: "*" },
						_react2.default.createElement(
							"p",
							null,
							_react2.default.createElement("input", { style: { border: "1px solid lightgray", padding: 10, marginRight: 10 },
								onClick: function onClick(e) {
									return _this3.editing({ when: new Date(), journey: _id }, "text");
								},
								placeholder: "发状态当达人..." }),
							_react2.default.createElement(
								"span",
								{ style: { position: "relative", top: 8 } },
								_react2.default.createElement(_photoCamera2.default, {
									onClick: function onClick(e) {
										return _this3.editing({ when: new Date(), journey: _id }, "photo");
									},
									color: "lightgray" })
							)
						)
					)
				));
			}

			all.push(_react2.default.createElement(Title, { journey: this.props.journey, key: "title" }));

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_Stepper.Stepper,
					{ orientation: "vertical" },
					all.reverse()
				),
				_react2.default.createElement(Editor, { ref: "editor", onSave: function onSave(a) {
						return _this3.onSave(a);
					} })
			);
		}
	}, {
		key: "onSave",
		value: function onSave(footprint) {
			var _this4 = this;

			var journey = this.props.journey;

			var cond = { journey: journey._id };
			_db.Footprint.find(cond).fetch(function (footprints) {
				return _this4.setState({ footprints: footprints });
			});
		}
	}, {
		key: "editing",
		value: function editing(footprint, focusing) {
			this.refs.editor.setState({ footprint: footprint, focusing: focusing });
		}
	}]);

	return Journey;
}(_react.Component);

exports.default = Journey;

var Editor = function (_Component2) {
	_inherits(Editor, _Component2);

	function Editor() {
		var _Object$getPrototypeO2;

		var _temp2, _this5, _ret3;

		_classCallCheck(this, Editor);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret3 = (_temp2 = (_this5 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(Editor)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this5), _this5.state = {
			footprint: false,
			focusing: null
		}, _temp2), _possibleConstructorReturn(_this5, _ret3);
	}

	_createClass(Editor, [{
		key: "render",
		value: function render() {
			var _this6 = this;

			var footprint = this.state.footprint;


			if (!footprint) return null;

			var actions = [_react2.default.createElement(_materialUi.FlatButton, {
				label: "关闭",
				primary: false,
				onTouchTap: function onTouchTap(e) {
					return _this6.cancel();
				}
			}), _react2.default.createElement(_materialUi.FlatButton, {
				label: "保存",
				primary: true,
				onTouchTap: function onTouchTap(e) {
					return _this6.save();
				}
			})];

			var note = footprint.note;
			var photos = footprint.photos;
			var when = footprint.when;


			return _react2.default.createElement(
				_materialUi.Dialog,
				{ title: when.smartFormat(),
					actions: actions,
					modal: false,
					open: !!footprint,
					onRequestClose: function onRequestClose(e) {
						return _this6.cancel();
					} },
				_react2.default.createElement(
					"div",
					{ className: "section" },
					_react2.default.createElement(_photosField2.default, { ref: "photos", defaultValue: photos,
						iconStyle: { iconRatio: 2 / 3, iconSize: { width: 50, height: 50 } } }),
					_react2.default.createElement("textarea", { ref: "text",
						style: { width: "100%", border: 0, height: 100, fontSize: 12, paddingTop: 5, borderTop: "1px dotted lightgray" },
						placeholder: "这一刻的想法",
						defaultValue: note }),
					_react2.default.createElement(_chipper2.default, { chips: ["早餐", "午餐", "晚餐", "购物", "门票", "公交", "飞机", "的士", { label: "特色交通" }, { label: "特色吃的" }, { label: "花销", type: "number" }] }),
					_react2.default.createElement(_chipper2.default, { chips: ["太美了", "无法呼吸", "太壮观了", "喜欢这里"] })
				)
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var focusing = this.props.focusing;

			switch (focusing) {
				case "text":
					this.refs.text.focus();
					break;
				case "photo":
					this.refs.photos.focus();
					break;
			}
		}
	}, {
		key: "cancel",
		value: function cancel() {
			this.setState({ footprint: null });
		}
	}, {
		key: "save",
		value: function save() {
			var _this7 = this;

			var onSave = this.props.onSave;
			var footprint = this.state.footprint;
			var _refs = this.refs;
			var photos = _refs.photos;
			var text = _refs.text;

			footprint.photos = photos.value;
			footprint.note = text.value;
			_db.Footprint.upsert(footprint).then(function (updated) {
				_this7.setState({ footprint: null });
				onSave(updated);
			});
		}
	}]);

	return Editor;
}(_react.Component);

var Title = exports.Title = function Title(_ref3, _ref4) {
	var _ref3$journey = _ref3.journey;
	var name = _ref3$journey.name;
	var _id = _ref3$journey._id;
	var startedAt = _ref3$journey.startedAt;
	var completed = _ref3.completed;
	var onMap = _ref3.onMap;
	var router = _ref4.router;

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
							return router.push("journey/" + _id);
						}, style: { cursor: "default" } },
					startedAt.smartFormat(),
					_react2.default.createElement("br", null),
					name
				)
			)
		);
	} else {
		return _react2.default.createElement(
			_Stepper.Step,
			{ completed: true, active: true },
			_react2.default.createElement(
				_Stepper.StepLabel,
				{ icon: "*" },
				_react2.default.createElement(
					"div",
					{ className: "grid", style: { cursor: "default" } },
					_react2.default.createElement(
						"b",
						{ onClick: function onClick(e) {
								return router.push("journey/" + _id);
							} },
						name
					),
					onMap ? _react2.default.createElement(
						"div",
						{ style: { width: 100 } },
						_react2.default.createElement(_materialUi.Toggle, { labelPosition: "right", label: "Map", onToggle: onMap })
					) : null
				)
			)
		);
	}
};
Title.contextTypes = { router: _react2.default.PropTypes.obj };

var Day = function Day(_ref5) {
	var day = _ref5.day;
	var date = _ref5.date;
	var onEdit = _ref5.onEdit;
	var itinerary = _ref5.itinerary;
	var _ref5$label = _ref5.label;
	var label = _ref5$label === undefined ? _transportationField2.default.getLabel : _ref5$label;
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
			_react2.default.createElement(
				"span",
				null,
				itinerary.reduce(function (r, a) {
					var dayth = a.dayth;
					var place = a.place;
					var trans = a.trans;

					if (trans != undefined) {
						if (trans = label(trans)) place = trans + "到" + place;
					}
					return r.length ? r + "," + place : place;
				}, "")
			),
			_react2.default.createElement(_moreHoriz2.default, null)
		)
	);
};

var Footprint = function Footprint(_ref6, _ref7) {
	var _ref6$data = _ref6.data;
	var when = _ref6$data.when;
	var _ref6$data$photos = _ref6$data.photos;
	var photos = _ref6$data$photos === undefined ? [] : _ref6$data$photos;
	var note = _ref6$data.note;
	var onEdit = _ref6.onEdit;
	var viewPhoto = _ref7.viewPhoto;
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
				photos.map(function (_ref8, i) {
					var url = _ref8.url;
					var taken = _ref8.taken;
					var loc = _ref8.loc;
					return _react2.default.createElement("img", { key: i, onClick: function onClick(e) {
							return viewPhoto(url);
						}, style: { height: 50, margin: 2 }, src: url });
				})
			)
		)
	);
};
Footprint.contextTypes = { viewPhoto: _react2.default.PropTypes.func };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2pvdXJuZXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU87OztBQUVQLElBQU0sU0FBTyxTQUFQOztJQUVlOzs7Ozs7Ozs7Ozs7OzttTUFDcEIsUUFBTTtBQUNMLGVBQVcsRUFBWDtBQUNDLGNBQVUsRUFBVjs7OztjQUhrQjs7c0NBTUQ7OztPQUNYLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFEVzs7QUFFbEIsT0FBSSxPQUFLLEVBQUMsU0FBUSxRQUFRLEdBQVIsRUFBZCxDQUZjO0FBR2xCLFdBQVEsR0FBUixDQUFZLENBQ1gsSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVMsTUFBVDtXQUFrQixjQUFZLElBQVosQ0FBaUIsSUFBakIsRUFBdUIsS0FBdkIsQ0FBNkIsT0FBN0IsRUFBcUMsTUFBckM7SUFBbEIsQ0FERCxFQUVWLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFTLE1BQVQ7V0FBa0IsY0FBWSxJQUFaLENBQWlCLElBQWpCLEVBQXVCLEtBQXZCLENBQTZCLE9BQTdCLEVBQXFDLE1BQXJDO0lBQWxCLENBRkYsQ0FBWixFQUdJLElBSEosQ0FHUzs7O1FBQUU7UUFBVztXQUFhLE9BQUssUUFBTCxDQUFjLEVBQUMsc0JBQUQsRUFBYSxvQkFBYixFQUFkO0lBQTFCLENBSFQsQ0FIa0I7Ozs7a0NBU0gsT0FBTTtPQUNkLFlBQVcsS0FBSyxLQUFMLENBQVgsVUFEYzs7QUFFckIsVUFBTyxVQUFVLFdBQVYsQ0FBc0IsVUFBQyxLQUFELEVBQU8sQ0FBUCxFQUFXO0FBQ3ZDLFFBQUcsRUFBRSxLQUFGLElBQVMsS0FBVCxFQUFlO0FBQ2pCLFdBQU0sT0FBTixDQUFjLENBQWQsRUFEaUI7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aUIsQ0FBakI7U0FBRTtTQUFJO1NBQU07WUFBVSx1Q0FBSyxLQUFLLENBQUwsRUFBUSxTQUFTO2NBQUcsVUFBVSxHQUFWO09BQUgsRUFBbUIsT0FBTyxFQUFDLFFBQU8sRUFBUCxFQUFXLFFBQU8sQ0FBUCxFQUFuQixFQUE4QixLQUFLLEdBQUwsRUFBdkU7S0FBdEIsQ0FEYjtJQUREO0dBTkQ7O0NBRGU7QUFjaEIsVUFBVSxZQUFWLEdBQXVCLEVBQUMsV0FBVSxnQkFBTSxTQUFOLENBQWdCLElBQWhCLEVBQWxDIiwiZmlsZSI6ImpvdXJuZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7VUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcblxyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9uLCBGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b24sIEljb25CdXR0b24sIERpYWxvZywgVG9nZ2xlfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge1N0ZXAsU3RlcHBlcixTdGVwTGFiZWwsU3RlcENvbnRlbnR9IGZyb20gJ21hdGVyaWFsLXVpL1N0ZXBwZXInXHJcblxyXG5pbXBvcnQgTG9nbyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbWFwcy9kaXJlY3Rpb25zLXdhbGsnXHJcbmltcG9ydCBJY29uUHVibGlzaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuaW1wb3J0IEljb25Nb3JlIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtaG9yaXonXHJcbmltcG9ydCBJY29uQWRkIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZCdcclxuaW1wb3J0IEljb25NYXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9tYXBzL21hcFwiXHJcbmltcG9ydCBJY29uQ2FtZXJhIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9waG90by1jYW1lcmEnXHJcblxyXG5pbXBvcnQge0pvdXJuZXkgYXMgSm91cm5leURCLCBGb290cHJpbnQgYXMgRm9vdHByaW50REIsIFdheXBvaW50IGFzIFdheXBvaW50REIsIEl0aW5lcmFyeSBhcyBJdGluZXJhcnlEQn0gZnJvbSBcIi4uL2RiXCJcclxuaW1wb3J0IENoaXBwZXIgZnJvbSBcIi4vY2hpcHBlclwiXHJcbmltcG9ydCBQaG90b3NGaWVsZCBmcm9tIFwiLi9waG90b3MtZmllbGRcIlxyXG5pbXBvcnQgVHJhbnNwb3J0YXRpb25GaWVsZCBmcm9tIFwiLi90cmFuc3BvcnRhdGlvbi1maWVsZFwiXHJcblxyXG5jb25zdCB7RW1wdHl9PVVJXHJcblxyXG5jb25zdCBET01BSU49XCJqb3VybmV5XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvdXJuZXkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0Zm9vdHByaW50czpbXVxyXG5cdFx0LGl0aW5lcmFyeTpbXVxyXG5cdH1cclxuXHRcclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXl9PXRoaXMucHJvcHNcclxuXHRcdGxldCBjb25kPXtqb3VybmV5OmpvdXJuZXkuX2lkfVxyXG5cdFx0UHJvbWlzZS5hbGwoW1xyXG5cdFx0XHRuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT5Gb290cHJpbnREQi5maW5kKGNvbmQpLmZldGNoKHJlc29sdmUscmVqZWN0KSlcclxuXHRcdFx0LG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9Pkl0aW5lcmFyeURCLmZpbmQoY29uZCkuZmV0Y2gocmVzb2x2ZSxyZWplY3QpKVxyXG5cdFx0XHRdKS50aGVuKChbZm9vdHByaW50cyxpdGluZXJhcnldKT0+dGhpcy5zZXRTdGF0ZSh7Zm9vdHByaW50cywgaXRpbmVyYXJ5fSkpXHJcblx0fVxyXG5cdFxyXG5cdGdldERheUl0aW5lcmFyeShkYXl0aCl7XHJcblx0XHRjb25zdCB7aXRpbmVyYXJ5fT10aGlzLnN0YXRlXHJcblx0XHRyZXR1cm4gaXRpbmVyYXJ5LnJlZHVjZVJpZ2h0KChmb3VuZCxhKT0+e1xyXG5cdFx0XHRpZihhLmRheXRoPT1kYXl0aCl7XHJcblx0XHRcdFx0Zm91bmQudW5zaGlmdChhKVxyXG5cdFx0XHR9ZWxzZSBpZihmb3VuZC5sZW5ndGg9PTApe1xyXG5cdFx0XHRcdGlmKGEuZGF5dGg8ZGF5dGgpXHJcblx0XHRcdFx0XHRmb3VuZC51bnNoaWZ0KGEpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHR9LFtdKVxyXG5cdH1cclxuXHRcclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCB7am91cm5leTp7c3RhcnRlZEF0LCBfaWQgfSwgb25NYXAsIHB1Ymxpc2hhYmxlfT10aGlzLnByb3BzXHJcblx0XHRsZXQge2Zvb3RwcmludHMsIGl0aW5lcmFyeX09dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IGN1cnJlbnREYXRlPW51bGwsIGxhc3REYXk9MFxyXG5cdFx0bGV0IGFsbD1bXVxyXG5cdFx0Zm9vdHByaW50cy5mb3JFYWNoKChmb290cHJpbnQsaSk9PntcclxuXHRcdFx0Y29uc3Qge3doZW4scGhvdG8sbm90ZX09Zm9vdHByaW50XHJcblx0XHRcdGlmKGN1cnJlbnREYXRlPT1udWxsIHx8ICF3aGVuLmlzU2FtZURhdGUoY3VycmVudERhdGUpKXtcclxuXHRcdFx0XHRjdXJyZW50RGF0ZT13aGVuXHJcblx0XHRcdFx0bGV0IGRheT1jdXJyZW50RGF0ZS5yZWxhdGl2ZShzdGFydGVkQXQpKzFcclxuXHRcdFx0XHR3aGlsZShsYXN0RGF5PGRheSl7XHJcblx0XHRcdFx0XHRsYXN0RGF5KytcclxuXHRcdFx0XHRcdGxldCBkYXRlPXN0YXJ0ZWRBdC5yZWxhdGl2ZURhdGUobGFzdERheS0xKVxyXG5cdFx0XHRcdFx0YWxsLnB1c2goPERheSBrZXk9e2BkYXkke2xhc3REYXl9YH0gZGF5PXtsYXN0RGF5fVxyXG5cdFx0XHRcdFx0XHRkYXRlPXtkYXRlfSBpdGluZXJhcnk9e3RoaXMuZ2V0RGF5SXRpbmVyYXJ5KGxhc3REYXkpfVxyXG5cdFx0XHRcdFx0XHRvbkVkaXQ9e2E9PnRoaXMuZWRpdGluZyh7d2hlbjpkYXRlfSl9Lz4pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGFsbC5wdXNoKDxGb290cHJpbnQga2V5PXtpfSBkYXRhPXtmb290cHJpbnR9XHJcblx0XHRcdFx0b25FZGl0PXthPT50aGlzLmVkaXRpbmcoZm9vdHByaW50KX0vPilcclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdGlmKHB1Ymxpc2hhYmxlKXtcclxuXHRcdFx0YWxsLnB1c2goXHJcblx0XHRcdFx0PFN0ZXAgYWN0aXZlPXt0cnVlfSBjb21wbGV0ZWQ9e2ZhbHNlfSBrZXk9XCJ0cmlnZ2VyXCI+XHJcblx0XHRcdFx0XHQ8U3RlcExhYmVsIGljb249XCIqXCI+XHJcblx0XHRcdFx0XHRcdDxwPlxyXG5cdFx0XHRcdFx0XHRcdDxpbnB1dCBzdHlsZT17e2JvcmRlcjpcIjFweCBzb2xpZCBsaWdodGdyYXlcIixwYWRkaW5nOjEwLCBtYXJnaW5SaWdodDoxMH19XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT50aGlzLmVkaXRpbmcoe3doZW46bmV3IERhdGUoKSwgam91cm5leTpfaWR9LFwidGV4dFwiKX1cclxuXHRcdFx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwi5Y+R54q25oCB5b2T6L6+5Lq6Li4uXCIvPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7cG9zaXRpb246XCJyZWxhdGl2ZVwiLCB0b3A6OH19PlxyXG5cdFx0XHRcdFx0XHRcdFx0PEljb25DYW1lcmFcclxuXHRcdFx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+dGhpcy5lZGl0aW5nKHt3aGVuOm5ldyBEYXRlKCksIGpvdXJuZXk6X2lkfSxcInBob3RvXCIpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRjb2xvcj1cImxpZ2h0Z3JheVwiLz5cclxuXHRcdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvcD5cclxuXHRcdFx0XHRcdDwvU3RlcExhYmVsPlxyXG5cdFx0XHRcdDwvU3RlcD5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRhbGwucHVzaCg8VGl0bGUgam91cm5leT17dGhpcy5wcm9wcy5qb3VybmV5fSBrZXk9XCJ0aXRsZVwiLz4pXHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8U3RlcHBlciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCI+XHJcblx0XHRcdFx0XHR7YWxsLnJldmVyc2UoKX1cclxuXHRcdFx0XHQ8L1N0ZXBwZXI+XHJcblxyXG5cdFx0XHRcdDxFZGl0b3IgcmVmPVwiZWRpdG9yXCIgb25TYXZlPXthPT50aGlzLm9uU2F2ZShhKX0vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdG9uU2F2ZShmb290cHJpbnQpe1xyXG5cdFx0Y29uc3Qge2pvdXJuZXl9PXRoaXMucHJvcHNcclxuXHRcdGxldCBjb25kPXtqb3VybmV5OmpvdXJuZXkuX2lkfVxyXG5cdFx0Rm9vdHByaW50REIuZmluZChjb25kKS5mZXRjaChmb290cHJpbnRzPT50aGlzLnNldFN0YXRlKHtmb290cHJpbnRzfSkpXHJcblx0fVxyXG5cdFxyXG5cdGVkaXRpbmcoZm9vdHByaW50LCBmb2N1c2luZyl7XHJcblx0XHR0aGlzLnJlZnMuZWRpdG9yLnNldFN0YXRlKHtmb290cHJpbnQsIGZvY3VzaW5nfSlcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEVkaXRvciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRmb290cHJpbnQ6ZmFsc2UsXHJcblx0XHRmb2N1c2luZzpudWxsXHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2Zvb3RwcmludH09dGhpcy5zdGF0ZVxyXG5cdFx0XHJcblx0XHRpZighZm9vdHByaW50KVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHJcblx0XHRjb25zdCBhY3Rpb25zID0gW1xyXG5cdFx0XHQgIDxGbGF0QnV0dG9uXHJcblx0XHRcdFx0bGFiZWw9XCLlhbPpl61cIlxyXG5cdFx0XHRcdHByaW1hcnk9e2ZhbHNlfVxyXG5cdFx0XHRcdG9uVG91Y2hUYXA9e2U9PnRoaXMuY2FuY2VsKCl9XHJcblx0XHRcdCAgLz4sXHJcblx0XHRcdCAgPEZsYXRCdXR0b25cclxuXHRcdFx0XHRsYWJlbD1cIuS/neWtmFwiXHJcblx0XHRcdFx0cHJpbWFyeT17dHJ1ZX1cclxuXHRcdFx0XHRvblRvdWNoVGFwPXtlPT50aGlzLnNhdmUoKX1cclxuXHRcdFx0ICAvPixcclxuXHRcdFx0XTtcclxuXHJcbiAgICAgICAgbGV0IHtub3RlLCBwaG90b3Msd2hlbn09Zm9vdHByaW50XHJcbiAgICAgICAgXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8RGlhbG9nIHRpdGxlPXt3aGVuLnNtYXJ0Rm9ybWF0KCl9XHJcblx0XHRcdFx0YWN0aW9ucz17YWN0aW9uc31cclxuXHRcdFx0XHRtb2RhbD17ZmFsc2V9XHJcblx0XHRcdFx0b3Blbj17ISFmb290cHJpbnR9XHJcblx0XHRcdFx0b25SZXF1ZXN0Q2xvc2U9e2U9PnRoaXMuY2FuY2VsKCl9PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxyXG5cdFx0XHRcdFx0PFBob3Rvc0ZpZWxkIHJlZj1cInBob3Rvc1wiIGRlZmF1bHRWYWx1ZT17cGhvdG9zfSBcclxuXHRcdFx0XHRcdFx0aWNvblN0eWxlPXt7aWNvblJhdGlvOjIvMywgaWNvblNpemU6e3dpZHRoOjUwLCBoZWlnaHQ6NTB9fX0vPlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQ8dGV4dGFyZWEgcmVmPVwidGV4dFwiXHJcblx0XHRcdFx0XHRcdHN0eWxlPXt7d2lkdGg6XCIxMDAlXCIsYm9yZGVyOjAsaGVpZ2h0OjEwMCwgZm9udFNpemU6MTIsIHBhZGRpbmdUb3A6NSwgYm9yZGVyVG9wOlwiMXB4IGRvdHRlZCBsaWdodGdyYXlcIn19XHJcblx0XHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwi6L+Z5LiA5Yi755qE5oOz5rOVXCJcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdFZhbHVlPXtub3RlfS8+XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0PENoaXBwZXIgY2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XCLml6nppJBcIixcIuWNiOmkkFwiLFwi5pma6aSQXCIsXCLotK3nialcIixcIumXqOelqFwiLFwi5YWs5LqkXCIsXCLpo57mnLpcIixcIueahOWjq1wiLFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLnibnoibLkuqTpgJpcIn0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIueJueiJsuWQg+eahFwifSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi6Iqx6ZSAXCIsdHlwZTpcIm51bWJlclwifVxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcblxyXG5cdFx0XHRcdFx0PENoaXBwZXIgY2hpcHM9e1tcclxuXHRcdFx0XHRcdFx0XCLlpKrnvo7kuoZcIixcIuaXoOazleWRvOWQuFwiLFwi5aSq5aOu6KeC5LqGXCIsXCLllpzmrKLov5nph4xcIlxyXG5cdFx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvRGlhbG9nPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGNvbnN0IHtmb2N1c2luZ309dGhpcy5wcm9wc1xyXG5cdFx0c3dpdGNoKGZvY3VzaW5nKXtcclxuXHRcdGNhc2UgXCJ0ZXh0XCI6XHJcblx0XHRcdHRoaXMucmVmcy50ZXh0LmZvY3VzKClcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwicGhvdG9cIjpcclxuXHRcdFx0dGhpcy5yZWZzLnBob3Rvcy5mb2N1cygpXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRjYW5jZWwoKXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2Zvb3RwcmludDpudWxsfSlcclxuXHR9XHJcblx0XHJcblx0c2F2ZSgpe1xyXG5cdFx0Y29uc3Qge29uU2F2ZX09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge2Zvb3RwcmludH09dGhpcy5zdGF0ZVxyXG5cdFx0Y29uc3Qge3Bob3RvcywgdGV4dH09dGhpcy5yZWZzXHJcblx0XHRmb290cHJpbnQucGhvdG9zPXBob3Rvcy52YWx1ZVxyXG5cdFx0Zm9vdHByaW50Lm5vdGU9dGV4dC52YWx1ZVxyXG5cdFx0Rm9vdHByaW50REIudXBzZXJ0KGZvb3RwcmludClcclxuXHRcdFx0LnRoZW4odXBkYXRlZD0+e1xyXG5cdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2Zvb3RwcmludDpudWxsfSlcclxuXHRcdFx0XHRvblNhdmUodXBkYXRlZClcdFxyXG5cdFx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFRpdGxlPSh7am91cm5leTp7bmFtZSxfaWQsIHN0YXJ0ZWRBdH0sIGNvbXBsZXRlZCwgb25NYXB9LHtyb3V0ZXJ9KT0+e1xyXG5cdGlmKGNvbXBsZXRlZCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8U3RlcCBjb21wbGV0ZWQ9e3RydWV9IGRpc2FibGVkPXt0cnVlfT5cclxuXHRcdFx0XHQ8U3RlcExhYmVsPlxyXG5cdFx0XHRcdFx0PHNwYW4gb25DbGljaz17ZT0+cm91dGVyLnB1c2goYGpvdXJuZXkvJHtfaWR9YCl9IHN0eWxlPXt7Y3Vyc29yOlwiZGVmYXVsdFwifX0+XHJcblx0XHRcdFx0XHRcdHtzdGFydGVkQXQuc21hcnRGb3JtYXQoKX1cclxuXHRcdFx0XHRcdFx0PGJyLz5cclxuXHRcdFx0XHRcdFx0e25hbWV9XHJcblx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdDwvU3RlcD5cclxuXHRcdClcclxuXHR9ZWxzZXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxTdGVwIGNvbXBsZXRlZD17dHJ1ZX0gYWN0aXZlPXt0cnVlfT5cclxuXHRcdFx0XHQ8U3RlcExhYmVsIGljb249XCIqXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImdyaWRcIiBzdHlsZT17e2N1cnNvcjpcImRlZmF1bHRcIn19PlxyXG5cdFx0XHRcdFx0XHQ8YiBvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChgam91cm5leS8ke19pZH1gKX0+e25hbWV9PC9iPlxyXG5cdFx0XHRcdFx0XHR7b25NYXAgPyAoPGRpdiBzdHlsZT17e3dpZHRoOjEwMH19PjxUb2dnbGUgbGFiZWxQb3NpdGlvbj1cInJpZ2h0XCIgbGFiZWw9XCJNYXBcIm9uVG9nZ2xlPXtvbk1hcH0vPjwvZGl2PikgOiBudWxsfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9TdGVwTGFiZWw+XHJcblx0XHRcdDwvU3RlcD5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuVGl0bGUuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9ian1cclxuXHJcbmNvbnN0IERheT0oe2RheSxkYXRlLCBvbkVkaXQsIGl0aW5lcmFyeSxsYWJlbD1UcmFuc3BvcnRhdGlvbkZpZWxkLmdldExhYmVsfSk9PihcclxuXHQ8U3RlcCBkaXNhYmxlZD17ZmFsc2V9PlxyXG5cdFx0PFN0ZXBMYWJlbCBpY29uPXtgJHtkYXl9YH0gb25Ub3VjaFRhcD17b25FZGl0fT5cclxuXHRcdFx0PHNwYW4+e2RhdGUuc21hcnRGb3JtYXQoXCLku4rlpKlcIil9PC9zcGFuPlxyXG5cdFx0XHQ8c3Bhbj5cclxuXHRcdFx0e1xyXG5cdFx0XHRcdGl0aW5lcmFyeS5yZWR1Y2UoKHIsYSk9PntcclxuXHRcdFx0XHRcdGxldCB7ZGF5dGgsIHBsYWNlLCB0cmFuc309YVxyXG5cdFx0XHRcdFx0aWYodHJhbnMhPXVuZGVmaW5lZCl7XHJcblx0XHRcdFx0XHRcdGlmKHRyYW5zPWxhYmVsKHRyYW5zKSlcclxuXHRcdFx0XHRcdFx0XHRwbGFjZT1gJHt0cmFuc33liLAke3BsYWNlfWBcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiByLmxlbmd0aCA/IGAke3J9LCR7cGxhY2V9YCA6IHBsYWNlXHJcblx0XHRcdFx0fSxcIlwiKVxyXG5cdFx0XHR9XHJcblx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0PEljb25Nb3JlLz5cclxuXHRcdDwvU3RlcExhYmVsPlxyXG5cdDwvU3RlcD5cclxuKVxyXG5cclxuY29uc3QgRm9vdHByaW50PSh7ZGF0YToge3doZW4scGhvdG9zPVtdLG5vdGV9LCBvbkVkaXR9LHt2aWV3UGhvdG99KT0+KFxyXG5cdDxTdGVwIGNvbXBsZXRlZD17dHJ1ZX0gYWN0aXZlPXt0cnVlfT5cclxuXHRcdDxTdGVwTGFiZWwgaWNvbj17XCIuXCJ9ID5cclxuXHRcdFx0PHRpbWU+e3doZW4uZm9ybWF0KCdISDptbScpfSZuYnNwOzwvdGltZT5cclxuXHRcdFx0PHNwYW4+e25vdGV9PC9zcGFuPlxyXG5cdFx0XHQ8SWNvbk1vcmUgb25Ub3VjaFRhcD17b25FZGl0fSAvPlxyXG5cdFx0PC9TdGVwTGFiZWw+XHJcblx0XHQ8U3RlcENvbnRlbnQ+XHJcblx0XHRcdDxwPlxyXG5cdFx0XHRcdHtwaG90b3MubWFwKCh7dXJsLHRha2VuLGxvY30saSk9Pig8aW1nIGtleT17aX0gb25DbGljaz17ZT0+dmlld1Bob3RvKHVybCl9IHN0eWxlPXt7aGVpZ2h0OjUwLCBtYXJnaW46Mn19IHNyYz17dXJsfS8+KSl9XHJcblx0XHRcdDwvcD5cclxuXHRcdDwvU3RlcENvbnRlbnQ+XHJcblx0PC9TdGVwPlxyXG4pXHJcbkZvb3RwcmludC5jb250ZXh0VHlwZXM9e3ZpZXdQaG90bzpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cclxuXHJcbiJdfQ==