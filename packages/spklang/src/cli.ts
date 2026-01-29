#!/usr/bin/env node
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { runSource } from 'spk-core';

const args = process.argv.slice(2);
const fileArg = args.find((a: string) => !a.startsWith('-'));

if (!fileArg) {
  console.error('사용법: spklang <파일>');
  process.exit(1);
}

function findFileUp(cwd: string, fileName: string): string | null {
  let dir = resolve(cwd);
  while (true) {
    const candidate = join(dir, fileName);
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

const filePath = resolve(process.cwd(), fileArg);
const fileName = fileArg.split(/[/\\]/).pop() ?? fileArg;
const resolvedPath = existsSync(filePath) ? filePath : findFileUp(process.cwd(), fileName);

let source = '';
try {
  if (!resolvedPath) {
    throw new Error(`파일을 찾을 수 없습니다: ${fileArg}`);
  }
  source = readFileSync(resolvedPath, 'utf-8');
} catch (e) {
  const msg = e instanceof Error ? e.message : `파일을 읽을 수 없습니다: ${filePath}`;
  console.error(msg);
  process.exit(1);
}

let input = '';
if (!process.stdin.isTTY) {
  try {
    input = readFileSync(0, 'utf-8');
  } catch {
    input = '';
  }
}

const result = runSource(source, {
  input,
  onOutput: (s) => process.stdout.write(s),
});

if (!result.success) {
  if (result.message) console.error(result.message);
  process.exit(1);
}
