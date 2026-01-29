import {
  PROGRAM_START,
  PROGRAM_END,
  ASSIGN,
  INPUT_KEYWORD,
  OUTPUT_NUM,
  OUTPUT_CHAR,
  OUTPUT_NEWLINE,
  LOOP_END,
  type Stmt,
} from './types.js';
import { parseVariable } from './lexer.js';

export function parse(source: string): { stmts: Stmt[]; error: string | null } {
  const lines = source
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const stmts: Stmt[] = [];
  const loopStartIndices: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === PROGRAM_START) continue;
    if (line === PROGRAM_END) continue;

    if (line === LOOP_END) {
      if (loopStartIndices.length === 0) {
        return { stmts: [], error: '다들 너무하는 거 같아요오 스피키 큰 잘못한 건 없는데' };
      }
      const startIdx = loopStartIndices.pop()!;
      stmts.push({ type: 'loopEnd', lineIndex: startIdx });
      continue;
    }

    if (line.includes(OUTPUT_NEWLINE)) {
      if (line.trim() !== OUTPUT_NEWLINE) {
        return { stmts: [], error: '다들 너무하는 거 같아요오 스피키 큰 잘못한 건 없는데' };
      }
      stmts.push({ type: 'outputNewline' });
      continue;
    }

    if (line.includes(ASSIGN)) {
      const idx = line.indexOf(ASSIGN);
      const subjectPart = line.slice(0, idx).trim();
      const valuePart = line.slice(idx + ASSIGN.length).trim();
      const varIdx = parseVariable(subjectPart);
      if (varIdx === null) {
        return { stmts: [], error: '다들 너무하는 거 같아요오 스피키 큰 잘못한 건 없는데' };
      }
      if (!valuePart) {
        return { stmts: [], error: '다들 너무하는 거 같아요오 스피키 큰 잘못한 건 없는데' };
      }
      stmts.push({ type: 'assign', varIndex: varIdx, valueStr: valuePart });
      continue;
    }

    const inputSuffix = ' ' + INPUT_KEYWORD;
    if (line.endsWith(INPUT_KEYWORD) && (line === INPUT_KEYWORD || line.endsWith(inputSuffix))) {
      const subjectPart = line.slice(0, -INPUT_KEYWORD.length).trim();
      const varIdx = parseVariable(subjectPart);
      if (varIdx === null) {
        return { stmts: [], error: '다들 너무하는 거 같아요오 스피키 큰 잘못한 건 없는데' };
      }
      stmts.push({ type: 'input', varIndex: varIdx });
      continue;
    }

    if (line.includes(OUTPUT_NUM)) {
      const idx = line.indexOf(OUTPUT_NUM);
      const valuePart = line.slice(0, idx).trim();
      stmts.push({ type: 'outputNum', valueStr: valuePart });
      continue;
    }

    if (line.includes(OUTPUT_CHAR)) {
      const idx = line.indexOf(OUTPUT_CHAR);
      const valuePart = line.slice(0, idx).trim();
      stmts.push({ type: 'outputChar', valueStr: valuePart });
      continue;
    }

    if (line.startsWith(INPUT_KEYWORD + ' ') || line === INPUT_KEYWORD) {
      const condPart = line.slice(INPUT_KEYWORD.length).trim();
      loopStartIndices.push(stmts.length);
      stmts.push({ type: 'loopStart', conditionStr: condPart, lineIndex: i });
      continue;
    }

    return { stmts: [], error: '다들 너무하는 거 같아요오 스피키 큰 잘못한 건 없는데' };
  }

  if (loopStartIndices.length > 0) {
    return { stmts: [], error: '다들 너무하는 거 같아요오 스피키 큰 잘못한 건 없는데' };
  }

  return { stmts, error: null };
}
