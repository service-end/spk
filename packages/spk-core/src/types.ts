export const PROGRAM_START = '세계수 교단의 제사장 네르에요';
export const PROGRAM_END = '이단 척결의 시간입니다';
export const ASSIGN = '스피키 네르지 마세요';
export const INPUT_KEYWORD = '스핔';
export const OUTPUT_NUM = '쪼아요 쪼아요 호박이 쪼아요';
export const OUTPUT_CHAR = '쪼아요 쪼아요 물걸레질 쪼아요';
export const OUTPUT_NEWLINE = '쪼아요 쪼아요 숨바꼭질 쪼아요';
export const LOOP_END = '네르지 마세요';

export const RUNTIME_SUCCESS = '오늘의 설교시간이 돌아왔어요오';
export const RUNTIME_ERROR = '다들 너무하는 거 같아요오 스피키 큰 잘못한 건 없는데';

export type Stmt =
  | { type: 'assign'; varIndex: number; valueStr: string }
  | { type: 'input'; varIndex: number }
  | { type: 'outputNum'; valueStr: string }
  | { type: 'outputChar'; valueStr: string }
  | { type: 'outputNewline' }
  | { type: 'loopStart'; conditionStr: string; lineIndex: number }
  | { type: 'loopEnd'; lineIndex: number };

export interface RunOptions {
  input?: string;
  onOutput?: (text: string) => void;
}

export interface RunResult {
  success: boolean;
  message: string;
  output: string;
}
