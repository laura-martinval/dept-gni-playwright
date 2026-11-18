import { test } from '@playwright/test';
import * as fs from 'fs';

test('map JSON files into a combined output (no trimming) @map', async () => {
  const file1Path = './mappings/document_url.json';   // First file (initial URLs)
  const file2Path = './mappings/acquia_dam_url.json'; // Second file (expected URLs)
  const outputPath = './mappings/mapped_output.json';

  // --- Read raw file contents ---
  const rawFile1 = fs.readFileSync(file1Path, { encoding: 'utf-8' });
  const rawFile2 = fs.readFileSync(file2Path, { encoding: 'utf-8' });

  // --- Parse JSON manually without modifying strings ---
  // JSON.parse will preserve spaces inside string values.
  const list1: string[] = JSON.parse(rawFile1, (key, value) => value);
  const list2: string[] = JSON.parse(rawFile2, (key, value) => value);

  // --- Validate list lengths ---
  if (list1.length !== list2.length) {
    console.warn(
      `⚠️ Warning: Lists have different lengths (${list1.length} vs ${list2.length}).`
    );
  }

  // --- Map one-to-one without trimming ---
  const mapped = list1.map((init, index) => ({
    initial: init,             // Keep as-is, including spaces or line breaks
    expected: list2[index] ?? null, // Use null if missing
  }));

  // --- Write output exactly as is ---
  const outputJson = JSON.stringify(mapped, null, 2);
  fs.writeFileSync(outputPath, outputJson, { encoding: 'utf-8' });

  console.log(`✅ Output saved to ${outputPath}`);
});
