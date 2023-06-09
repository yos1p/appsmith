import { functionParam } from "../index";
declare type JsObjectProperty = {
    key: string;
    value: string;
    type: string;
    arguments?: Array<functionParam>;
};
export declare const jsObjectDeclaration: string;
export declare const parseJSObjectWithAST: (jsObjectBody: string) => Array<JsObjectProperty>;
export {};
