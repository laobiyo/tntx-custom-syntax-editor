/*
 * @CreatDate: 2021-04-29 14:27:48
 * @Describe: 首页
 */

import { useEffect, useState } from "react";
import CustomEditor from "../CustomEditor";

export default props => {

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

	const defaultCode = `/**
* ETL转换器实现类，系统会执行此类的parse()方法，此类必须实现GroovyEtlHandlerCaller接口，
* 请在此类的parse方法中补您你需要实现的业务逻辑 
*
* @param response 三方原始输出报文
* @return map,  map的key对应服务出参标识
*/
import com.alibaba.fastjson.*;
import org.apache.commons.lang3.*;
import java.text.SimpleDateFormat;

public class GroovyEtlHandlerCallerImpl implements GroovyEtlHandlerCaller {

	public Map < String, Object > parse(String response) {
		Map < String, Object > map = new HashMap < > ();
		// TODO 请在此处补充需要实现的业务逻辑
		
		return map;
	}

}`;
	const getCode = (code) => {
		console.log(code);
	};

	return (
		<CustomEditor
			defaultCode={defaultCode}
			readOnly={false}
			height={400}
			theme="night"
			activeLine={true}
			fold={true}
			keywords={keywords}
			onChange={getCode}
		/>
	);
};
