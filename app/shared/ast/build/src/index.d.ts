/// <reference types="lodash" />
import { Node, SourceLocation, Options } from "acorn";
import { NodeTypes } from "./constants/ast";
declare type Pattern = IdentifierNode | AssignmentPatternNode;
declare type Expression = Node;
interface IdentifierNode extends Node {
    type: NodeTypes.Identifier;
    name: string;
}
interface VariableDeclaratorNode extends Node {
    type: NodeTypes.VariableDeclarator;
    id: IdentifierNode;
    init: Expression | null;
}
interface Function extends Node {
    id: IdentifierNode | null;
    params: Pattern[];
}
interface FunctionDeclarationNode extends Node, Function {
    type: NodeTypes.FunctionDeclaration;
}
interface FunctionExpressionNode extends Expression, Function {
    type: NodeTypes.FunctionExpression;
}
interface ArrowFunctionExpressionNode extends Expression, Function {
    type: NodeTypes.ArrowFunctionExpression;
}
export interface ObjectExpression extends Expression {
    type: NodeTypes.ObjectExpression;
    properties: Array<PropertyNode>;
}
interface AssignmentPatternNode extends Node {
    type: NodeTypes.AssignmentPattern;
    left: Pattern;
}
interface LiteralNode extends Node {
    type: NodeTypes.Literal;
    value: string | boolean | null | number | RegExp;
}
export interface PropertyNode extends Node {
    type: NodeTypes.Property;
    key: LiteralNode | IdentifierNode;
    value: Node;
    kind: "init" | "get" | "set";
}
declare type NodeWithLocation<NodeType> = NodeType & {
    loc: SourceLocation;
};
declare type AstOptions = Omit<Options, "ecmaVersion">;
declare type EntityRefactorResponse = {
    isSuccess: boolean;
    body: {
        script: string;
        refactorCount: number;
    } | {
        error: string;
    };
};
export declare const isIdentifierNode: (node: Node) => node is IdentifierNode;
export declare const isVariableDeclarator: (node: Node) => node is VariableDeclaratorNode;
export declare const isObjectExpression: (node: Node) => node is ObjectExpression;
export declare const isLiteralNode: (node: Node) => node is LiteralNode;
export declare const isPropertyNode: (node: Node) => node is PropertyNode;
export declare const isPropertyAFunctionNode: (node: Node) => node is FunctionExpressionNode | ArrowFunctionExpressionNode;
export declare const getAST: ((code: string, options?: AstOptions | undefined) => Node) & import("lodash").MemoizedFunction;
/**
 * An AST based extractor that fetches all possible references in a given
 * piece of code. We use this to get any references to the global entities in Appsmith
 * and create dependencies on them. If the reference was updated, the given piece of code
 * should run again.
 * @param code: The piece of script where references need to be extracted from
 */
export interface IdentifierInfo {
    references: string[];
    functionalParams: string[];
    variables: string[];
}
export declare const extractIdentifierInfoFromCode: (code: string, evaluationVersion: number, invalidIdentifiers?: Record<string, unknown> | undefined) => IdentifierInfo;
export declare const entityRefactorFromCode: (script: string, oldName: string, newName: string, isJSObject: boolean, evaluationVersion: number, invalidIdentifiers?: Record<string, unknown> | undefined) => EntityRefactorResponse;
export declare type functionParam = {
    paramName: string;
    defaultValue: unknown;
};
export declare const getFunctionalParamsFromNode: (node: FunctionDeclarationNode | FunctionExpressionNode | ArrowFunctionExpressionNode, needValue?: boolean) => Set<functionParam>;
export declare const isTypeOfFunction: (type: string) => boolean;
export interface MemberExpressionData {
    property: NodeWithLocation<IdentifierNode | LiteralNode>;
    object: NodeWithLocation<IdentifierNode>;
}
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
export declare const extractInvalidTopLevelMemberExpressionsFromCode: (code: string, data: Record<string, any>, evaluationVersion: number) => MemberExpressionData[];
export {};
