import { cloneDeep, round } from "lodash";

export default function (originalAst, precision) {
  const ast = cloneDeep(originalAst);
  ast.commands = ast.commands.map(com => {
    const params = {};
    Object.keys(com.params).forEach(key => {
      params[key] = round(com.params[key], precision || 6);
    });
    com.params = params;
    return com;
  });
  return ast;
}
