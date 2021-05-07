"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CodeMirror = _interopRequireWildcard(require("codemirror/lib/codemirror"));

require("codemirror/mode/groovy/groovy");

require("codemirror/addon/selection/active-line");

require("codemirror/addon/edit/matchbrackets");

require("codemirror/addon/fold/foldcode");

require("codemirror/addon/fold/foldgutter");

require("codemirror/addon/fold/brace-fold");

require("codemirror/addon/fold/indent-fold");

require("codemirror/addon/fold/comment-fold");

require("codemirror/lib/codemirror.css");

require("codemirror/addon/fold/foldgutter.css");

require("codemirror/theme/neo.css");

require("codemirror/theme/material.css");

require("./index.less");

/*
 * @CreatDate: 2019-05-31 15:05:53
 * @Describe: 自定义语法编辑器
 */
// import "codemirror/mode/javascript/javascript";
var beautify_js = require("js-beautify").js_beautify;

var CustomEditor =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(CustomEditor, _PureComponent);

  function CustomEditor(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, CustomEditor);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(CustomEditor).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      posLeft: 0,
      posTop: 0,
      tipShow: false,
      blurFlag: false,
      defaultKeywords: [],
      concatKeywords: [],
      list: []
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "listenner", function (e) {
      var targetClassName = e.target.className;
      if (typeof targetClassName !== "string") return;
      var list = ["codemirror-tipbox"];
      var returnFalse = list.find(function (item) {
        return targetClassName.includes(item);
      });
      if (returnFalse) return false;
      var targetPath = e.path;
      var flag = false;
      targetPath.forEach(function (item) {
        if (item.className) {
          if (typeof item.className !== "string") return;

          if (item.className.includes("CodeMirror-line") || item.className.includes("CodeMirror-linenumber")) {
            flag = true;
          }
        }
      });

      if (flag) {
        _this.setState({
          blurFlag: true
        });
      } else {
        _this.setState({
          blurFlag: false,
          tipShow: false
        });
      }

      if (targetClassName === "CodeMirror-scroll") {
        _this.setState({
          blurFlag: true
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "cursorActivity", function (cm) {
      var readOnly = _this.props.readOnly;
      if (readOnly) return;
      var getCursor = cm.getCursor();
      var pos = cm.cursorCoords(getCursor);
      var getLineInfo = cm.getLine(getCursor.line);
      var cursorBeforeOneChar = getLineInfo.substring(0, getCursor.ch);
      var lastIndex = cursorBeforeOneChar.lastIndexOf(" ", getCursor.ch);
      var content = cursorBeforeOneChar.substring(lastIndex + 1, getCursor.ch);
      var concatKeywords = _this.state.concatKeywords;
      var findObj = concatKeywords.find(function (item) {
        return item.toLowerCase().includes(content.toLowerCase());
      });

      if (findObj && content) {
        _this.setState({
          posLeft: pos.left,
          posTop: pos.top + 20,
          tipShow: true
        });

        _this.search(content);
      } else {
        _this.setState({
          tipShow: false
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "defaultFirst", function (val, list) {
      var findLi = "cm-field-li";
      var active = "cm-active";
      var nodeList = document.querySelectorAll(".".concat(findLi));

      if (nodeList.length > 0) {
        for (var i = 0; i < nodeList.length; i++) {
          nodeList[i].className = findLi;
        }

        nodeList[0].className = "".concat(active, " ").concat(findLi);
      }

      if (list && list.length === 1 && list[0] === val) {
        _this.setState({
          tipShow: false
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "enterFuc", function (type) {
      var findLi = "cm-field-li";
      var active = "cm-active";
      var nodeList = document.querySelectorAll(".".concat(findLi));
      var length = nodeList.length;
      var index = 0;

      for (var i = 0; i < length; i++) {
        if (nodeList[i].className.includes(active)) {
          index = i;
        }
      }

      if (type === "up") {
        nodeList[index].className = findLi;

        if (index === 0) {
          nodeList[index].className = "".concat(active, " ").concat(findLi);
        } else {
          nodeList[index - 1].className = "".concat(active, " ").concat(findLi);
        }
      } else if (type === "down") {
        nodeList[index].className = findLi;

        if (index === length - 1) {
          nodeList[index].className = "".concat(active, " ").concat(findLi);
        } else {
          nodeList[index + 1].className = "".concat(active, " ").concat(findLi);
        }
      } else if (type === "enter") {
        var node = document.querySelector(".".concat(active));

        _this.handleClick(node.innerText);

        setTimeout(function () {
          _this.setState({
            tipShow: false
          });
        }, 100);
      }

      document.querySelector(".".concat(active)).scrollIntoViewIfNeeded();
    });
    _this.ref = _react["default"].createRef();
    return _this;
  }

  (0, _createClass2["default"])(CustomEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var defaultKeywords = this.state.defaultKeywords;
      var keywords = this.props.keywords;
      var current = this.ref.current;
      var arr = (0, _toConsumableArray2["default"])(new Set(defaultKeywords.concat(keywords)));
      this.setState({
        concatKeywords: arr,
        list: arr
      });
      var _this$props = this.props,
          readOnly = _this$props.readOnly,
          defaultCode = _this$props.defaultCode,
          activeLine = _this$props.activeLine,
          fold = _this$props.fold,
          theme = _this$props.theme,
          indentUnit = _this$props.indentUnit,
          _this$props$mode = _this$props.mode,
          mode = _this$props$mode === void 0 ? "text/x-groovy" : _this$props$mode;
      this.CodeMirrorEditor = CodeMirror.fromTextArea(current, {
        mode: mode,
        theme: theme === "night" ? "material" : "neo",
        lineNumbers: true,
        matchBrackets: true,
        styleActiveLine: activeLine,
        foldGutter: fold,
        indentUnit: indentUnit,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        readOnly: readOnly ? "nocursor" : false,
        extraKeys: {
          Tab: function Tab(cm) {
            if (cm.somethingSelected()) {
              // 存在文本选择
              cm.indentSelection("add"); // 正向缩进文本
            } else {
              // 无文本选择
              // cm.indentLine(cm.getCursor().line, "add");  // 整行缩进 不符合预期
              cm.replaceSelection(Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input"); // 光标处插入 indentUnit 个空格
            }
          },
          "Shift-Tab": function ShiftTab(cm) {
            // 反向缩进
            if (cm.somethingSelected()) {
              cm.indentSelection("subtract"); // 反向缩进
            } else {
              // cm.indentLine(cm.getCursor().line, "subtract");  // 直接缩进整行
              var cursor = cm.getCursor();
              cm.setCursor({
                line: cursor.line,
                ch: cursor.ch - cm.getOption("indentUnit")
              }); // 光标回退 indexUnit 字符
            }

            return;
          },
          "Ctrl-F": function CtrlF(cm) {
            var formattValue = beautify_js(cm.getValue(), {
              indent_size: indentUnit,
              indent_char: indentUnit === "1" ? "\t" : " "
            });

            _this2.CodeMirrorEditor.setValue(formattValue);
          }
        }
      });
      this.CodeMirrorEditor.setValue(defaultCode);
      this.CodeMirrorEditor.on("cursorActivity", function (cm) {
        _this2.cursorActivity(cm);
      });
      this.CodeMirrorEditor.on("changes", function (cm) {
        if (_this2.props.onChange) {
          _this2.props.onChange(cm.getValue());
        }
      });
      this.CodeMirrorEditor.on("focus", function (cm) {
        _this2.cursorActivity(cm);

        _this2.setState({
          blurFlag: true
        });
      });
      document.body.addEventListener("click", this.listenner);
      this.CodeMirrorEditor.addKeyMap({
        "Up": function Up(cm) {
          var tipShow = _this2.state.tipShow;

          if (tipShow) {
            _this2.enterFuc("up");
          } else {
            cm.execCommand("goLineUp");
          }
        },
        "Down": function Down(cm) {
          var tipShow = _this2.state.tipShow;

          if (tipShow) {
            _this2.enterFuc("down");
          } else {
            cm.execCommand("goLineDown");
          }
        },
        "Enter": function Enter(cm) {
          var tipShow = _this2.state.tipShow;

          if (tipShow) {
            _this2.enterFuc("enter");
          } else {
            cm.execCommand("newlineAndIndent");
          }
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var defaultCode = prevProps.defaultCode;
      var nextDefaultCode = this.props.defaultCode;

      if (defaultCode !== nextDefaultCode) {
        this.CodeMirrorEditor.setValue(nextDefaultCode);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeEventListener("click", this.listenner);
    }
  }, {
    key: "search",
    value: function search(val) {
      var concatKeywords = this.state.concatKeywords;
      var arr = [];
      concatKeywords.forEach(function (item) {
        if (item.toLowerCase().includes(val.toLowerCase())) {
          arr.push(item);
        }
      });
      this.setState({
        list: arr
      });
      this.defaultFirst(val, arr);
    }
  }, {
    key: "handleClick",
    value: function handleClick(item) {
      var getCursor = this.CodeMirrorEditor.getCursor();
      var getLineInfo = this.CodeMirrorEditor.getLine(getCursor.line);
      var cursorBeforeOneChar = getLineInfo.substring(0, getCursor.ch);
      var lastIndex = cursorBeforeOneChar.lastIndexOf(" ", getCursor.ch);
      this.CodeMirrorEditor.setSelection({
        line: getCursor.line,
        ch: lastIndex + 1
      }, {
        line: getCursor.line,
        ch: getCursor.ch
      });
      this.CodeMirrorEditor.replaceSelection(item);
      this.CodeMirrorEditor.setCursor(getCursor.line, lastIndex + 1 + item.length);
      this.CodeMirrorEditor.focus();
      this.setState({
        tipShow: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          posLeft = _this$state.posLeft,
          posTop = _this$state.posTop,
          tipShow = _this$state.tipShow,
          list = _this$state.list;
      var height = this.props.height;
      return _react["default"].createElement("div", {
        className: "tntx-custom-syntax-editor",
        style: height ? {
          height: height + "px"
        } : {}
      }, _react["default"].createElement("textarea", {
        ref: this.ref
      }), _react["default"].createElement("div", {
        className: "codemirror-tipbox",
        style: {
          left: "".concat(posLeft, "px"),
          top: "".concat(posTop, "px"),
          display: tipShow ? "inline-block" : "none"
        }
      }, _react["default"].createElement("ul", {
        className: "cm-field-ul"
      }, list && list.length > 0 && list.map(function (item, index) {
        return _react["default"].createElement("li", {
          key: index,
          className: index === 0 ? "cm-active cm-field-li" : "cm-field-li",
          onClick: function onClick() {
            return _this3.handleClick(item);
          }
        }, item);
      }))));
    }
  }]);
  return CustomEditor;
}(_react.PureComponent);

CustomEditor.propTypes = {
  id: _propTypes["default"].string,
  defaultCode: _propTypes["default"].string,
  height: _propTypes["default"].number,
  theme: _propTypes["default"].string,
  activeLine: _propTypes["default"].bool,
  fold: _propTypes["default"].bool,
  readOnly: _propTypes["default"].bool,
  keywords: _propTypes["default"].array,
  indentUnit: _propTypes["default"].number
};
CustomEditor.defaultProps = {
  defaultCode: "",
  activeLine: true,
  fold: true,
  theme: "day",
  height: 300,
  readOnly: false,
  keywords: [],
  indentUnit: 4
};
var _default = CustomEditor;
exports["default"] = _default;