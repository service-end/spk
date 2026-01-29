import { type Stmt, type RunOptions, type RunResult, RUNTIME_SUCCESS, RUNTIME_ERROR } from './types.js';
import { evalExpression } from './lexer.js';

export function run(
  stmts: Stmt[],
  options: RunOptions = {}
): RunResult {
  const vars = new Map<number, number>();
  const output: string[] = [];
  const onOutput = options.onOutput ?? ((t: string) => output.push(t));
  let inputIndex = 0;
  const input = options.input ?? '';

  let ip = 0;
  const maxSteps = 10_000_000;
  let steps = 0;

  while (ip < stmts.length && steps < maxSteps) {
    steps++;
    const stmt = stmts[ip];
    switch (stmt.type) {
      case 'assign': {
        const val = evalExpression(stmt.valueStr, vars);
        vars.set(stmt.varIndex, val);
        ip++;
        break;
      }
      case 'input': {
        const char = inputIndex < input.length ? input[inputIndex++] : '';
        const code = char ? char.charCodeAt(0) : 0;
        vars.set(stmt.varIndex, code);
        ip++;
        break;
      }
      case 'outputNum': {
        const val = evalExpression(stmt.valueStr, vars);
        onOutput(String(val));
        ip++;
        break;
      }
      case 'outputChar': {
        const val = evalExpression(stmt.valueStr, vars);
        onOutput(String.fromCharCode(val & 0xffff));
        ip++;
        break;
      }
      case 'outputNewline': {
        onOutput('\n');
        ip++;
        break;
      }
      case 'loopStart': {
        const cond = evalExpression(stmt.conditionStr, vars);
        if (cond === 0) {
          let depth = 1;
          ip++;
          while (ip < stmts.length && depth > 0) {
            const s = stmts[ip];
            if (s.type === 'loopStart') depth++;
            else if (s.type === 'loopEnd') depth--;
            ip++;
          }
        } else {
          ip++;
        }
        break;
      }
      case 'loopEnd': {
        ip = stmt.lineIndex;
        break;
      }
    }
  }

  if (steps >= maxSteps) {
    return {
      success: false,
      message: RUNTIME_ERROR,
      output: output.join(''),
    };
  }

  return {
    success: true,
    message: RUNTIME_SUCCESS,
    output: output.join(''),
  };
}
