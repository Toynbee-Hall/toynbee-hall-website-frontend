import { readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagesDirectory = path.join(root, 'content', 'pages');
const outputPath = path.join(root, 'content', 'generated-pages.ts');
const files = (await readdir(pagesDirectory)).filter(file => file.endsWith('.json')).sort();

const imports = files.map((file, index) => `import page${index} from './pages/${file}';`).join('\n');
const values = files.map((_, index) => `page${index}`).join(', ');
const output = `${imports}\nimport type { PageContent } from './types';\n\nconst records = [${values}];\nconst duplicateSlugs = records.map(page => page.slug).filter((slug, index, all) => all.indexOf(slug) !== index);\nif (duplicateSlugs.length) throw new Error(\`Duplicate page slugs: \${Array.from(new Set(duplicateSlugs)).join(', ')}\`);\n\nexport const pages = Object.fromEntries(records.map(page => [page.slug, page])) as unknown as Record<string, PageContent>;\n`;

await writeFile(outputPath, output);
console.log(`Indexed ${files.length} page JSON files.`);
