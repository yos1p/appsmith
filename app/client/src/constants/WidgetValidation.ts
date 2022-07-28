import { EXECUTION_PARAM_KEY } from "constants/AppsmithActionConstants/ActionConstants";
import { ValidationConfig } from "./PropertyControlConstants";

// Always add a validator function in ./worker/validation for these types
export enum ValidationTypes {
  TEXT = "TEXT",
  REGEX = "REGEX",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",
  OBJECT = "OBJECT",
  ARRAY = "ARRAY",
  OBJECT_ARRAY = "OBJECT_ARRAY",
  NESTED_OBJECT_ARRAY = "NESTED_OBJECT_ARRAY",
  DATE_ISO_STRING = "DATE_ISO_STRING",
  IMAGE_URL = "IMAGE_URL",
  FUNCTION = "FUNCTION",
  SAFE_URL = "SAFE_URL",
  TABLE_PROPERTY = "TABLE_PROPERTY",
}

export type ValidationResponse = {
  isValid: boolean;
  parsed: any;
  messages?: string[];
  transformed?: any;
};

export type ValidatorParams<T = unknown> = {
  config: ValidationConfig;
  value: T;
  props: Record<string, unknown>;
  propertyPath: string;
  unEvalValue: string;
};

export type Validator = (params: ValidatorParams) => ValidationResponse;

export const ISO_DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss.sssZ";

export const JAVASCRIPT_KEYWORDS = {
  Array: "Array",
  await: "await",
  Boolean: "Boolean",
  break: "break",
  case: "case",
  catch: "catch",
  class: "class",
  const: "const",
  continue: "continue",
  Date: "Date",
  debugger: "debugger",
  default: "default",
  delete: "delete",
  do: "do",
  else: "else",
  enum: "enum",
  eval: "eval",
  export: "export",
  extends: "extends",
  false: "false",
  finally: "finally",
  for: "for",
  function: "function",
  Function: "Function",
  hasOwnProperty: "hasOwnProperty",
  if: "if",
  implements: "implements",
  import: "import",
  in: "in",
  Infinity: "Infinity",
  instanceof: "instanceof",
  interface: "interface",
  isFinite: "isFinite",
  isNaN: "isNaN",
  isPrototypeOf: "isPrototypeOf",
  JSON: "JSON",
  length: "length",
  let: "let",
  Math: "Math",
  name: "name",
  NaN: "NaN",
  new: "new",
  null: "null",
  Number: "Number",
  Object: "Object",
  package: "package",
  private: "private",
  protected: "protected",
  public: "public",
  return: "return",
  static: "static",
  String: "String",
  super: "super",
  switch: "switch",
  this: "this",
  throw: "throw",
  toString: "toString",
  true: "true",
  try: "try",
  typeof: "typeof",
  undefined: "undefined",
  valueOf: "valueOf",
  var: "var",
  void: "void",
  while: "while",
  with: "with",
  yield: "yield",
};

export const DATA_TREE_KEYWORDS = {
  actionPaths: "actionPaths",
  appsmith: "appsmith",
  pageList: "pageList",
  [EXECUTION_PARAM_KEY]: EXECUTION_PARAM_KEY,
};

export const WINDOW_OBJECT_PROPERTIES = {
  closed: "closed",
  console: "console",
  defaultStatus: "defaultStatus",
  document: "document",
  frameElement: "frameElement",
  frames: "frames",
  history: "history",
  innerHeight: "innerHeight",
  innerWidth: "innerWidth",
  length: "length",
  localStorage: "localStorage",
  location: "location",
  name: "name",
  navigator: "navigator",
  opener: "opener",
  outerHeight: "outerHeight",
  outerWidth: "outerWidth",
  pageXOffset: "pageXOffset",
  pageYOffset: "pageYOffset",
  parent: "parent",
  screen: "screen",
  screenLeft: "screenLeft",
  screenTop: "screenTop",
  screenY: "screenY",
  scrollX: "scrollX",
  scrollY: "scrollY",
  self: "self",
  status: "status",
  top: "top",
  evaluationVersion: "evaluationVersion",
};

export const WINDOW_OBJECT_METHODS = {
  alert: "alert",
  atob: "atob",
  blur: "blur",
  btoa: "btoa",
  clearInterval: "clearInterval",
  clearTimeout: "clearTimeout",
  close: "close",
  confirm: "confirm",
  focus: "focus",
  getComputedStyle: "getComputedStyle",
  getSelection: "getSelection",
  matchMedia: "matchMedia",
  moveBy: "moveBy",
  moveTo: "moveTo",
  open: "open",
  print: "print",
  prompt: "prompt",
  requestAnimationFrame: "requestAnimationFrame",
  resizeBy: "resizeBy",
  resizeTo: "resizeTo",
  scroll: "scroll",
  scrollBy: "scrollBy",
  scrollTo: "scrollBy",
  setInterval: "setInterval",
  setTimeout: "setTimeout",
  stop: "stop",
};
