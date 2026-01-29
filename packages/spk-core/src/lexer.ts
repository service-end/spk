const NUMBER_PATTERN = /^흐(에*)엥$/;
const VARIABLE_PATTERN = /^(흐+)$/;

export function parseNumber(token: string): number | null {
  const m = token.match(NUMBER_PATTERN);
  if (!m) return null;
  return m[1].length;
}

export function parseVariable(token: string): number | null {
  const m = token.match(VARIABLE_PATTERN);
  if (!m) return null;
  return m[1].length;
}

function tokenizeSegment(segment: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < segment.length) {
    if (segment[i] === '흐') {
      let j = i;
      while (j < segment.length && segment[j] === '흐') j++;
      const afterH = segment.slice(j);
      const eeMatch = afterH.match(/^(에*)엥/);
      if (eeMatch) {
        tokens.push(segment.slice(i, j + eeMatch[0].length));
        i = j + eeMatch[0].length;
      } else {
        tokens.push(segment.slice(i, j));
        i = j;
      }
      continue;
    }
    i++;
  }
  return tokens;
}

function evalSegment(segment: string, vars: Map<number, number>): number {
  const tokens = tokenizeSegment(segment);
  let sum = 0;
  for (const t of tokens) {
    const n = parseNumber(t);
    const v = parseVariable(t);
    const val = n !== null ? n : (v !== null ? (vars.get(v) ?? 0) : 0);
    sum += val;
  }
  return sum;
}

export function tokenizeExpression(str: string): string[] {
  const segments = str.trim().split(/\s+/).filter(Boolean);
  const out: string[] = [];
  for (const seg of segments) {
    out.push(...tokenizeSegment(seg));
  }
  return out;
}

export function evalExpression(rawValue: string, vars: Map<number, number>): number {
  const segments = rawValue.trim().split(/\s+/).filter(Boolean);
  if (segments.length === 0) return 0;
  let result = evalSegment(segments[0], vars);
  for (let i = 1; i < segments.length; i++) {
    const segVal = evalSegment(segments[i], vars);
    const prevTokens = tokenizeSegment(segments[i - 1]);
    const currTokens = tokenizeSegment(segments[i]);
    const prevIsNum = prevTokens.length > 0 && prevTokens.every((t) => parseNumber(t) !== null);
    const currIsNum = currTokens.length > 0 && currTokens.every((t) => parseNumber(t) !== null);
    if (prevIsNum && currIsNum) result *= segVal;
    else if (prevIsNum && !currIsNum) result -= segVal;
    else if (!prevIsNum && currIsNum) result += segVal;
    else result += segVal;
  }
  return result;
}
