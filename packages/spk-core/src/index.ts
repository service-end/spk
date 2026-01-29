import { parse } from './parser.js';
import { run } from './interpreter.js';
import type { Stmt, RunOptions, RunResult } from './types.js';

export { parse, run };
export type { Stmt, RunOptions, RunResult };
export { PROGRAM_START, PROGRAM_END, RUNTIME_SUCCESS, RUNTIME_ERROR } from './types.js';
export { parseNumber, parseVariable, tokenizeExpression, evalExpression } from './lexer.js';

export function runSource(source: string, options: RunOptions = {}): RunResult {
  const { stmts, error } = parse(source);
  if (error) {
    return {
      success: false,
      message: '다들 너무하는 거 같아요오 스피키 큰 잘못한 건 없는데',
      output: '',
    };
  }
  return run(stmts, options);
}
