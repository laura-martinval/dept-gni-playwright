import * as fs from 'fs';
import * as path from 'path';

/**
 * Shared summary-report writer.
 *
 * Produces a QA-friendly CSV with four columns:
 *   TEST     - the name of the test / test group (blank on continuation rows)
 *   RESULT   - the URL / target that was tested
 *   STATUS   - Pass | Fail (auto-computed from the run)
 *   COMMENTS - failure detail (multi-line allowed); left blank when Pass
 *
 * The format intentionally mirrors the manually-maintained QA sheet so the
 * generated file can be pasted straight in and the STATUS/COMMENTS hand-edited
 * for known/acceptable exceptions afterwards.
 */

export type Status = 'Pass' | 'Fail';

export interface ReportRow {
  /** Test-group label. Only set it on the first row of a group; leave '' on continuation rows. */
  test: string;
  /** The URL / target that was tested. */
  result: string;
  /** Pass or Fail. */
  status: Status;
  /** Failure detail. Use '\n' to separate multiple failures on one row. */
  comments?: string;
}

export const REPORT_HEADER = 'TEST,RESULT,STATUS,COMMENTS';

/** Quote a single CSV field per RFC 4180 (only when it needs it). */
export function csvEscape(value: string | number | null | undefined): string {
  const str = value === null || value === undefined ? '' : String(value);
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toLine(row: ReportRow): string {
  return [row.test, row.result, row.status, row.comments ?? '']
    .map(csvEscape)
    .join(',');
}

/** Write a fresh report (header + rows), creating the parent directory if needed. */
export function writeReport(filePath: string, rows: ReportRow[]): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const body = rows.map(toLine).join('\n');
  fs.writeFileSync(filePath, `${REPORT_HEADER}\n${body}\n`, 'utf8');
  console.log(`📄 Report written: ${filePath} (${rows.length} row${rows.length === 1 ? '' : 's'})`);
}
