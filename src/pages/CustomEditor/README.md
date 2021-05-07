# @tntx/custom-syntax-editor
React自定义语法编辑器

## Usage

安装

```sh
npm install @tntx/custom-syntax-editor
```

使用

```jsx
import CustomEditor from "@tntx/custom-syntax-editor";

const keywords = [
	// groovy 关键词
	"as", "catch", "def", "enum", "for", "import", "new", "super", "throws", "while",
	"assert", "class", "default", "extends", "goto", "in", "null", "switch", "trait", "break",
	"const", "do", "false", "if", "instanceof", "package", "this", "true", "case", "continue", "else",
	"finally", "implements", "interface", "return", "throw", "try",
	// java 关键词
	"abstract", "transient", "int", "strictfp", "synchronized", "boolean", "char", "do",
	"final", "private", "short", "void", "double", "long", "protected", "static", "volatile",
	"byte", "float", "native", "public",
	// JDK 常用类
	"System", "Runtime", "String", "StringBuffer", "StringBuilder", "Date", "DateFormat",
	"SimpleDateFormat", "Calendar", "GregorianGalendar", "Math", "Integer", "Double", "Float",
	"Boolean", "List", "HashMap", "Map", "ArrayList", "Arrays", "Random", "Iterator"
];

const Demo = props => {
	
	const getCode = (code) => {
		console.log(code);
	};

    return (
       <CustomEditor
			defaultCode="" // 默认""
			readOnly={false} // 默认false
			height={400} // 默认300
			theme="night" // 默认day
			activeLine={true} // 默认true
			fold={true} // 默认true
			keywords={keywords} // 默认[]
			onChange={getCode}
		/>
    )
};

ReactDOM.render(
    <Demo />,
    document.getElementById('root')
);
```

## 编辑器效果
![Image text](https://gitee.com/bruce68/custom-syntax-editor/raw/master/src/img/pic.png)

## props参数：
|    参数    | 类型    |  默认值   |  是否必填  | 说明         |
| :------:  | :-----: | :----:   | :------: | :----------: |
| defaultCode | string |  ""     |   非必填    | 初始化赋值     |
| readOnly  | boolean |  false   |   非必填  | 设置只读       |
| height | number   |  300     |   非必填  | 编辑器高度       |
| theme  | string   |  "day"     |   非必填  | 主题："day"和"night" |
| activeLine   | boolean   |  true     |   非必填  | 当前行选中标识  |
| indentUnit   | number   |  4     |   非必填  | tab按几个空格缩进  |
| fold   | boolean   |  true     |   非必填  | 代码折叠  |
| keywords   | array   |  []     |   非必填  | 自定义提示关键词  |
| onChange  | function|  无      |   非必填  | 返回code       |
| Ctrl+F   | 键盘事件   |  -     |   内置  | 自动格式化代码  |