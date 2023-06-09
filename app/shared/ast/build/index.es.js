import { parse } from 'acorn';
import { simple, ancestor } from 'acorn-walk';
import { memoize, toPath, has, isString, isFinite as isFinite$1 } from 'lodash';
import { generate } from 'astring';

const ECMA_VERSION = 11;
/* Indicates the mode the code should be parsed in.
This influences global strict mode and parsing of import and export declarations.
*/
var SourceType;
(function (SourceType) {
    SourceType["script"] = "script";
    SourceType["module"] = "module";
})(SourceType || (SourceType = {}));
// Each node has an attached type property which further defines
// what all properties can the node have.
// We will just define the ones we are working with
var NodeTypes;
(function (NodeTypes) {
    NodeTypes["Identifier"] = "Identifier";
    NodeTypes["AssignmentPattern"] = "AssignmentPattern";
    NodeTypes["Literal"] = "Literal";
    NodeTypes["Property"] = "Property";
    // Declaration - https://github.com/estree/estree/blob/master/es5.md#declarations
    NodeTypes["FunctionDeclaration"] = "FunctionDeclaration";
    NodeTypes["ExportDefaultDeclaration"] = "ExportDefaultDeclaration";
    NodeTypes["VariableDeclarator"] = "VariableDeclarator";
    // Expression - https://github.com/estree/estree/blob/master/es5.md#expressions
    NodeTypes["MemberExpression"] = "MemberExpression";
    NodeTypes["FunctionExpression"] = "FunctionExpression";
    NodeTypes["ArrowFunctionExpression"] = "ArrowFunctionExpression";
    NodeTypes["ObjectExpression"] = "ObjectExpression";
    NodeTypes["ArrayExpression"] = "ArrayExpression";
    NodeTypes["ThisExpression"] = "ThisExpression";
})(NodeTypes || (NodeTypes = {}));

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dist = {exports: {}};

/*! http://mths.be/fromcodepoint v0.2.1 by @mathias */

if (!String.fromCodePoint) {
	(function() {
		var defineProperty = (function() {
			// IE 8 only supports `Object.defineProperty` on DOM elements
			try {
				var object = {};
				var $defineProperty = Object.defineProperty;
				var result = $defineProperty(object, object, object) && $defineProperty;
			} catch(error) {}
			return result;
		}());
		var stringFromCharCode = String.fromCharCode;
		var floor = Math.floor;
		var fromCodePoint = function(_) {
			var MAX_SIZE = 0x4000;
			var codeUnits = [];
			var highSurrogate;
			var lowSurrogate;
			var index = -1;
			var length = arguments.length;
			if (!length) {
				return '';
			}
			var result = '';
			while (++index < length) {
				var codePoint = Number(arguments[index]);
				if (
					!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
					codePoint < 0 || // not a valid Unicode code point
					codePoint > 0x10FFFF || // not a valid Unicode code point
					floor(codePoint) != codePoint // not an integer
				) {
					throw RangeError('Invalid code point: ' + codePoint);
				}
				if (codePoint <= 0xFFFF) { // BMP code point
					codeUnits.push(codePoint);
				} else { // Astral code point; split in surrogate halves
					// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
					codePoint -= 0x10000;
					highSurrogate = (codePoint >> 10) + 0xD800;
					lowSurrogate = (codePoint % 0x400) + 0xDC00;
					codeUnits.push(highSurrogate, lowSurrogate);
				}
				if (index + 1 == length || codeUnits.length > MAX_SIZE) {
					result += stringFromCharCode.apply(null, codeUnits);
					codeUnits.length = 0;
				}
			}
			return result;
		};
		if (defineProperty) {
			defineProperty(String, 'fromCodePoint', {
				'value': fromCodePoint,
				'configurable': true,
				'writable': true
			});
		} else {
			String.fromCodePoint = fromCodePoint;
		}
	}());
}

(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = void 0;



	/**
	 * \\ - matches the backslash which indicates the beginning of an escape sequence
	 * (
	 *   u\{([0-9A-Fa-f]+)\} - first alternative; matches the variable-length hexadecimal escape sequence (\u{ABCD0})
	 * |
	 *   u([0-9A-Fa-f]{4}) - second alternative; matches the 4-digit hexadecimal escape sequence (\uABCD)
	 * |
	 *   x([0-9A-Fa-f]{2}) - third alternative; matches the 2-digit hexadecimal escape sequence (\xA5)
	 * |
	 *   ([1-7][0-7]{0,2}|[0-7]{2,3}) - fourth alternative; matches the up-to-3-digit octal escape sequence (\5 or \512)
	 * |
	 *   (['"tbrnfv0\\]) - fifth alternative; matches the special escape characters (\t, \n and so on)
	 * |
	 *   \U([0-9A-Fa-f]+) - sixth alternative; matches the 8-digit hexadecimal escape sequence used by python (\U0001F3B5)
	 * )
	 */
	var jsEscapeRegex = /\\(u\{([0-9A-Fa-f]+)\}|u([0-9A-Fa-f]{4})|x([0-9A-Fa-f]{2})|([1-7][0-7]{0,2}|[0-7]{2,3})|(['"tbrnfv0\\]))|\\U([0-9A-Fa-f]{8})/g;
	var usualEscapeSequences = {
	  '0': '\0',
	  'b': '\b',
	  'f': '\f',
	  'n': '\n',
	  'r': '\r',
	  't': '\t',
	  'v': '\v',
	  '\'': '\'',
	  '"': '"',
	  '\\': '\\'
	};

	var fromHex = function fromHex(str) {
	  return String.fromCodePoint(parseInt(str, 16));
	};

	var fromOct = function fromOct(str) {
	  return String.fromCodePoint(parseInt(str, 8));
	};

	var _default = function _default(string) {
	  return string.replace(jsEscapeRegex, function (_, __, varHex, longHex, shortHex, octal, specialCharacter, python) {
	    if (varHex !== undefined) {
	      return fromHex(varHex);
	    } else if (longHex !== undefined) {
	      return fromHex(longHex);
	    } else if (shortHex !== undefined) {
	      return fromHex(shortHex);
	    } else if (octal !== undefined) {
	      return fromOct(octal);
	    } else if (python !== undefined) {
	      return fromHex(python);
	    } else {
	      return usualEscapeSequences[specialCharacter];
	    }
	  });
	};

	exports.default = _default;
	module.exports = exports.default;
} (dist, dist.exports));

var unescapeJS = /*@__PURE__*/getDefaultExportFromCjs(dist.exports);

const beginsWithLineBreakRegex = /^\s+|\s+$/;
function sanitizeScript(js, evaluationVersion) {
    // We remove any line breaks from the beginning of the script because that
    // makes the final function invalid. We also unescape any escaped characters
    // so that eval can happen
    //default value of evalutaion version is 2
    evaluationVersion = evaluationVersion ? evaluationVersion : 2;
    const trimmedJS = js.replace(beginsWithLineBreakRegex, '');
    return evaluationVersion > 1 ? trimmedJS : unescapeJS(trimmedJS);
}
// For the times when you need to know if something truly an object like { a: 1, b: 2}
// typeof, lodash.isObject and others will return false positives for things like array, null, etc
const isTrueObject = (item) => {
    return Object.prototype.toString.call(item) === '[object Object]';
};

const jsObjectVariableName = "____INTERNAL_JS_OBJECT_NAME_USED_FOR_PARSING_____";
const jsObjectDeclaration = `var ${jsObjectVariableName} =`;
const parseJSObjectWithAST = (jsObjectBody) => {
    /*
        jsObjectVariableName value is added such actual js code would never name same variable name.
        if the variable name will be same then also we won't have problem here as jsObjectVariableName will be last node in VariableDeclarator hence overriding the previous JSObjectProperties.
        Keeping this just for sanity check if any caveat was missed.
      */
    const jsCode = `${jsObjectDeclaration} ${jsObjectBody}`;
    const ast = getAST(jsCode);
    const parsedObjectProperties = new Set();
    let JSObjectProperties = [];
    simple(ast, {
        VariableDeclarator(node) {
            if (isVariableDeclarator(node) &&
                node.id.name === jsObjectVariableName &&
                node.init &&
                isObjectExpression(node.init)) {
                JSObjectProperties = node.init.properties;
            }
        },
    });
    JSObjectProperties.forEach((node) => {
        let params = new Set();
        const propertyNode = node;
        let property = {
            key: generate(propertyNode.key),
            value: generate(propertyNode.value),
            type: propertyNode.value.type,
        };
        if (isPropertyAFunctionNode(propertyNode.value)) {
            // if in future we need default values of each param, we could implement that in getFunctionalParamsFromNode
            // currently we don't consume it anywhere hence avoiding to calculate that.
            params = getFunctionalParamsFromNode(propertyNode.value);
            property = Object.assign(Object.assign({}, property), { arguments: [...params] });
        }
        // here we use `generate` function to convert our AST Node to JSCode
        parsedObjectProperties.add(property);
    });
    return [...parsedObjectProperties];
};

/* We need these functions to typescript casts the nodes with the correct types */
const isIdentifierNode = (node) => {
    return node.type === NodeTypes.Identifier;
};
const isMemberExpressionNode = (node) => {
    return node.type === NodeTypes.MemberExpression;
};
const isVariableDeclarator = (node) => {
    return node.type === NodeTypes.VariableDeclarator;
};
const isFunctionDeclaration = (node) => {
    return node.type === NodeTypes.FunctionDeclaration;
};
const isFunctionExpression = (node) => {
    return node.type === NodeTypes.FunctionExpression;
};
const isArrowFunctionExpression = (node) => {
    return node.type === NodeTypes.ArrowFunctionExpression;
};
const isObjectExpression = (node) => {
    return node.type === NodeTypes.ObjectExpression;
};
const isAssignmentPatternNode = (node) => {
    return node.type === NodeTypes.AssignmentPattern;
};
const isLiteralNode = (node) => {
    return node.type === NodeTypes.Literal;
};
const isPropertyNode = (node) => {
    return node.type === NodeTypes.Property;
};
const isPropertyAFunctionNode = (node) => {
    return (node.type === NodeTypes.ArrowFunctionExpression ||
        node.type === NodeTypes.FunctionExpression);
};
const isArrayAccessorNode = (node) => {
    return (isMemberExpressionNode(node) &&
        node.computed &&
        isLiteralNode(node.property) &&
        isFinite$1(node.property.value));
};
const wrapCode = (code) => {
    return `
    (function() {
      return ${code}
    })
  `;
};
//Tech-debt: should upgrade this to better logic
//Used slice for a quick resolve of critical bug
const unwrapCode = (code) => {
    let unwrapedCode = code.slice(32);
    return unwrapedCode.slice(0, -10);
};
const getFunctionalParamNamesFromNode = (node) => {
    return Array.from(getFunctionalParamsFromNode(node)).map((functionalParam) => functionalParam.paramName);
};
// Memoize the ast generation code to improve performance.
// Since this will be used by both the server and the client, we want to prevent regeneration of ast
// for the the same code snippet
const getAST = memoize((code, options) => parse(code, Object.assign(Object.assign({}, options), { ecmaVersion: ECMA_VERSION })));
const extractIdentifierInfoFromCode = (code, evaluationVersion, invalidIdentifiers) => {
    let ast = { end: 0, start: 0, type: "" };
    try {
        const sanitizedScript = sanitizeScript(code, evaluationVersion);
        /* wrapCode - Wrapping code in a function, since all code/script get wrapped with a function during evaluation.
           Some syntax won't be valid unless they're at the RHS of a statement.
           Since we're assigning all code/script to RHS during evaluation, we do the same here.
           So that during ast parse, those errors are neglected.
        */
        /* e.g. IIFE without braces
          function() { return 123; }() -> is invalid
          let result = function() { return 123; }() -> is valid
        */
        const wrappedCode = wrapCode(sanitizedScript);
        ast = getAST(wrappedCode);
        let { references, functionalParams, variableDeclarations } = ancestorWalk(ast);
        const referencesArr = Array.from(references).filter((reference) => {
            // To remove references derived from declared variables and function params,
            // We extract the topLevelIdentifier Eg. Api1.name => Api1
            const topLevelIdentifier = toPath(reference)[0];
            return !(functionalParams.has(topLevelIdentifier) ||
                variableDeclarations.has(topLevelIdentifier) ||
                has(invalidIdentifiers, topLevelIdentifier));
        });
        return {
            references: referencesArr,
            functionalParams: Array.from(functionalParams),
            variables: Array.from(variableDeclarations),
        };
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            // Syntax error. Ignore and return empty list
            return {
                references: [],
                functionalParams: [],
                variables: [],
            };
        }
        throw e;
    }
};
const entityRefactorFromCode = (script, oldName, newName, isJSObject, evaluationVersion, invalidIdentifiers) => {
    //Sanitizing leads to removal of special charater.
    //Hence we are not sanatizing the script. Fix(#18492)
    //If script is a JSObject then replace export default to decalartion.
    if (isJSObject)
        script = jsObjectToCode(script);
    else
        script = wrapCode(script);
    let ast = { end: 0, start: 0, type: "" };
    //Copy of script to refactor
    let refactorScript = script;
    //Difference in length of oldName and newName
    const nameLengthDiff = newName.length - oldName.length;
    //Offset index used for deciding location of oldName.
    let refactorOffset = 0;
    //Count of refactors on the script
    let refactorCount = 0;
    try {
        ast = getAST(script);
        let { references, functionalParams, variableDeclarations, identifierList, } = ancestorWalk(ast);
        const identifierArray = Array.from(identifierList);
        //To handle if oldName has property ("JSObject.myfunc")
        const oldNameArr = oldName.split(".");
        const referencesArr = Array.from(references).filter((reference) => {
            // To remove references derived from declared variables and function params,
            // We extract the topLevelIdentifier Eg. Api1.name => Api1
            const topLevelIdentifier = toPath(reference)[0];
            return !(functionalParams.has(topLevelIdentifier) ||
                variableDeclarations.has(topLevelIdentifier) ||
                has(invalidIdentifiers, topLevelIdentifier));
        });
        //Traverse through all identifiers in the script
        identifierArray.forEach((identifier) => {
            if (identifier.name === oldNameArr[0]) {
                let index = 0;
                while (index < referencesArr.length) {
                    if (identifier.name === referencesArr[index].split(".")[0]) {
                        //Replace the oldName by newName
                        //Get start index from node and get subarray from index 0 till start
                        //Append above with new name
                        //Append substring from end index from the node till end of string
                        //Offset variable is used to alter the position based on `refactorOffset`
                        //In case of nested JS action get end postion fro the property.
                        ///Default end index
                        let endIndex = identifier.end;
                        const propertyNode = identifier.property;
                        //Flag variable : true if property should be updated
                        //false if property should not be updated
                        let propertyCondFlag = oldNameArr.length > 1 &&
                            propertyNode &&
                            oldNameArr[1] === propertyNode.name;
                        //Condition to validate if Identifier || Property should be updated??
                        if (oldNameArr.length === 1 || propertyCondFlag) {
                            //Condition to extend end index in case of property match
                            if (propertyCondFlag && propertyNode) {
                                endIndex = propertyNode.end;
                            }
                            refactorScript =
                                refactorScript.substring(0, identifier.start + refactorOffset) +
                                    newName +
                                    refactorScript.substring(endIndex + refactorOffset);
                            refactorOffset += nameLengthDiff;
                            ++refactorCount;
                            //We are only looking for one match in refrence for the identifier name.
                            break;
                        }
                    }
                    index++;
                }
            }
        });
        //If script is a JSObject then revert decalartion to export default.
        if (isJSObject)
            refactorScript = jsCodeToObject(refactorScript);
        else
            refactorScript = unwrapCode(refactorScript);
        return {
            isSuccess: true,
            body: { script: refactorScript, refactorCount },
        };
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            // Syntax error. Ignore and return empty list
            return { isSuccess: false, body: { error: "Syntax Error" } };
        }
        throw e;
    }
};
const getFunctionalParamsFromNode = (node, needValue = false) => {
    const functionalParams = new Set();
    node.params.forEach((paramNode) => {
        if (isIdentifierNode(paramNode)) {
            functionalParams.add({
                paramName: paramNode.name,
                defaultValue: undefined,
            });
        }
        else if (isAssignmentPatternNode(paramNode)) {
            if (isIdentifierNode(paramNode.left)) {
                const paramName = paramNode.left.name;
                if (!needValue) {
                    functionalParams.add({ paramName, defaultValue: undefined });
                }
            }
        }
    });
    return functionalParams;
};
const constructFinalMemberExpIdentifier = (node, child = "") => {
    const propertyAccessor = getPropertyAccessor(node.property);
    if (isIdentifierNode(node.object)) {
        return `${node.object.name}${propertyAccessor}${child}`;
    }
    else {
        const propertyAccessor = getPropertyAccessor(node.property);
        const nestedChild = `${propertyAccessor}${child}`;
        return constructFinalMemberExpIdentifier(node.object, nestedChild);
    }
};
const getPropertyAccessor = (propertyNode) => {
    if (isIdentifierNode(propertyNode)) {
        return `.${propertyNode.name}`;
    }
    else if (isLiteralNode(propertyNode) && isString(propertyNode.value)) {
        // is string literal search a['b']
        return `.${propertyNode.value}`;
    }
    else if (isLiteralNode(propertyNode) && isFinite$1(propertyNode.value)) {
        // is array index search - a[9]
        return `[${propertyNode.value}]`;
    }
};
const isTypeOfFunction = (type) => {
    return (type === NodeTypes.ArrowFunctionExpression ||
        type === NodeTypes.FunctionExpression);
};
/** Function returns Invalid top-level member expressions from code
 * @param code
 * @param data
 * @param evaluationVersion
 * @returns information about all invalid property/method assessment in code
 * @example Given data {
 * JSObject1: {
 * name:"JSObject",
 * data:[]
 * },
 * Api1:{
 * name: "Api1",
 * data: []
 * }
 * },
 * For code {{Api1.name + JSObject.unknownProperty}}, function returns information about "JSObject.unknownProperty" node.
 */
const extractInvalidTopLevelMemberExpressionsFromCode = (code, data, evaluationVersion) => {
    const invalidTopLevelMemberExpressions = new Set();
    const variableDeclarations = new Set();
    let functionalParams = new Set();
    let ast = { end: 0, start: 0, type: "" };
    try {
        const sanitizedScript = sanitizeScript(code, evaluationVersion);
        const wrappedCode = wrapCode(sanitizedScript);
        ast = getAST(wrappedCode, { locations: true });
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            // Syntax error. Ignore and return empty list
            return [];
        }
        throw e;
    }
    simple(ast, {
        MemberExpression(node) {
            const { object, property, computed } = node;
            // We are only interested in top-level MemberExpression nodes
            // Eg. for Api1.data.name, we are only interested in Api1.data
            if (!isIdentifierNode(object))
                return;
            if (!(object.name in data) || !isTrueObject(data[object.name]))
                return;
            // For computed member expressions (assessed via [], eg. JSObject1["name"] ),
            // We are only interested in strings
            if (isLiteralNode(property) &&
                isString(property.value) &&
                !(property.value in data[object.name])) {
                invalidTopLevelMemberExpressions.add({
                    object,
                    property,
                });
            }
            // We ignore computed member expressions if property is an identifier (JSObject[name])
            // This is because we can't statically determine what the value of the identifier might be.
            if (isIdentifierNode(property) &&
                !computed &&
                !(property.name in data[object.name])) {
                invalidTopLevelMemberExpressions.add({
                    object,
                    property,
                });
            }
        },
        VariableDeclarator(node) {
            if (isVariableDeclarator(node)) {
                variableDeclarations.add(node.id.name);
            }
        },
        FunctionDeclaration(node) {
            if (!isFunctionDeclaration(node))
                return;
            functionalParams = new Set([
                ...functionalParams,
                ...getFunctionalParamNamesFromNode(node),
            ]);
        },
        FunctionExpression(node) {
            if (!isFunctionExpression(node))
                return;
            functionalParams = new Set([
                ...functionalParams,
                ...getFunctionalParamNamesFromNode(node),
            ]);
        },
        ArrowFunctionExpression(node) {
            if (!isArrowFunctionExpression(node))
                return;
            functionalParams = new Set([
                ...functionalParams,
                ...getFunctionalParamNamesFromNode(node),
            ]);
        },
    });
    const invalidTopLevelMemberExpressionsArray = Array.from(invalidTopLevelMemberExpressions).filter((MemberExpression) => {
        return !(variableDeclarations.has(MemberExpression.object.name) ||
            functionalParams.has(MemberExpression.object.name));
    });
    return invalidTopLevelMemberExpressionsArray;
};
const ancestorWalk = (ast) => {
    //List of all Identifier nodes with their property(if exists).
    const identifierList = new Array();
    // List of all references found
    const references = new Set();
    // List of variables declared within the script. All identifiers and member expressions derived from declared variables will be removed
    const variableDeclarations = new Set();
    // List of functional params declared within the script. All identifiers and member expressions derived from functional params will be removed
    let functionalParams = new Set();
    /*
     * We do an ancestor walk on the AST in order to extract all references. For example, for member expressions and identifiers, we need to know
     * what surrounds the identifier (its parent and ancestors), ancestor walk will give that information in the callback
     * doc: https://github.com/acornjs/acorn/tree/master/acorn-walk
     */
    ancestor(ast, {
        Identifier(node, ancestors) {
            /*
             * We are interested in identifiers. Due to the nature of AST, Identifier nodes can
             * also be nested inside MemberExpressions. For deeply nested object references, there
             * could be nesting of many MemberExpressions. To find the final reference, we will
             * try to find the top level MemberExpression that does not have a MemberExpression parent.
             * */
            let candidateTopLevelNode = node;
            let depth = ancestors.length - 2; // start "depth" with first parent
            while (depth > 0) {
                const parent = ancestors[depth];
                if (isMemberExpressionNode(parent) &&
                    /* Member expressions that are "computed" (with [ ] search)
                       and the ones that have optional chaining ( a.b?.c )
                       will be considered top level node.
                       We will stop looking for further parents */
                    /* "computed" exception - isArrayAccessorNode
                       Member expressions that are array accessors with static index - [9]
                       will not be considered top level.
                       We will continue looking further. */
                    (!parent.computed || isArrayAccessorNode(parent)) &&
                    !parent.optional) {
                    candidateTopLevelNode = parent;
                    depth = depth - 1;
                }
                else {
                    // Top level found
                    break;
                }
            }
            //If parent is a Member expression then attach property to the Node.
            //else push Identifier Node.
            const parentNode = ancestors[ancestors.length - 2];
            if (isMemberExpressionNode(parentNode)) {
                identifierList.push(Object.assign(Object.assign({}, node), { property: parentNode.property }));
            }
            else
                identifierList.push(node);
            if (isIdentifierNode(candidateTopLevelNode)) {
                // If the node is an Identifier, just save that
                references.add(candidateTopLevelNode.name);
            }
            else {
                // For MemberExpression Nodes, we will construct a final reference string and then add
                // it to the references list
                const memberExpIdentifier = constructFinalMemberExpIdentifier(candidateTopLevelNode);
                references.add(memberExpIdentifier);
            }
        },
        VariableDeclarator(node) {
            // keep a track of declared variables so they can be
            // removed from the final list of references
            if (isVariableDeclarator(node)) {
                variableDeclarations.add(node.id.name);
            }
        },
        FunctionDeclaration(node) {
            // params in function declarations are also counted as references so we keep
            // track of them and remove them from the final list of references
            if (!isFunctionDeclaration(node))
                return;
            functionalParams = new Set([
                ...functionalParams,
                ...getFunctionalParamNamesFromNode(node),
            ]);
        },
        FunctionExpression(node) {
            // params in function expressions are also counted as references so we keep
            // track of them and remove them from the final list of references
            if (!isFunctionExpression(node))
                return;
            functionalParams = new Set([
                ...functionalParams,
                ...getFunctionalParamNamesFromNode(node),
            ]);
        },
        ArrowFunctionExpression(node) {
            // params in arrow function expressions are also counted as references so we keep
            // track of them and remove them from the final list of references
            if (!isArrowFunctionExpression(node))
                return;
            functionalParams = new Set([
                ...functionalParams,
                ...getFunctionalParamNamesFromNode(node),
            ]);
        },
    });
    return {
        references,
        functionalParams,
        variableDeclarations,
        identifierList,
    };
};
//Replace export default by a variable declaration.
//This is required for acorn to parse code into AST.
const jsObjectToCode = (script) => {
    return script.replace(/export default/g, jsObjectDeclaration);
};
//Revert the string replacement from 'jsObjectToCode'.
//variable declaration is replaced back by export default.
const jsCodeToObject = (script) => {
    return script.replace(jsObjectDeclaration, "export default");
};

export { ECMA_VERSION, NodeTypes, SourceType, entityRefactorFromCode, extractIdentifierInfoFromCode, extractInvalidTopLevelMemberExpressionsFromCode, getAST, getFunctionalParamsFromNode, isIdentifierNode, isLiteralNode, isObjectExpression, isPropertyAFunctionNode, isPropertyNode, isTypeOfFunction, isVariableDeclarator, parseJSObjectWithAST };
//# sourceMappingURL=index.es.js.map
