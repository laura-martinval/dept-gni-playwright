// Merge the per-command QA reports into a single sheet: csv-reports/qa-report.csv
//
// Usage: pnpm report   (after running `pnpm sanity` and/or `pnpm links`)
//
// Each input already uses the same header (TEST,RESULT,STATUS,COMMENTS), so we
// keep one header and concatenate the data rows in a sensible order. CSV parsing
// respects quoted fields that contain commas or newlines.

import * as fs from 'fs';

const HEADER = 'TEST,RESULT,STATUS,COMMENTS';
const OUTPUT = 'csv-reports/qa-report.csv';

// Order matters: sanity first, then link checks — matching the example sheet.
const INPUTS = [
  'csv-reports/sanity-report.csv',
  'csv-reports/links-report.csv',
  'csv-reports/links-sitemap-report.csv',
];

/** Split CSV text into raw record strings, respecting quoted newlines/commas. */
function splitCsvRecords(text) {
  const records = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"') {
      // A doubled quote ("") inside a quoted field is an escaped quote.
      if (inQuotes && text[i + 1] === '"') {
        current += '""';
        i++;
        continue;
      }
      inQuotes = !inQuotes;
      current += char;
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      // End of record (swallow a following \n after a \r).
      if (char === '\r' && text[i + 1] === '\n') i++;
      if (current.length > 0) records.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  if (current.length > 0) records.push(current);
  return records;
}

const dataRows = [];
let found = 0;

for (const file of INPUTS) {
  if (!fs.existsSync(file)) continue;
  found++;
  const records = splitCsvRecords(fs.readFileSync(file, 'utf8'));
  // Drop the header (first record) and keep the rest.
  dataRows.push(...records.slice(1));
}

if (found === 0) {
  console.error(
    '⚠ No report files found. Run `pnpm sanity` and/or `pnpm links` first, then `pnpm report`.',
  );
  process.exit(1);
}

fs.mkdirSync('csv-reports', { recursive: true });
fs.writeFileSync(OUTPUT, `${HEADER}\n${dataRows.join('\n')}\n`, 'utf8');
console.log(`📄 Combined report written: ${OUTPUT} (${dataRows.length} data row(s) from ${found} file(s))`);
