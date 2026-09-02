import { copyFile, readFile } from 'node:fs/promises';

const outputDirectory = 'dist/pablo-vidal-portfolio/browser';
const expectedBaseHref = '<base href="/pablo-vidal-portfolio/">';
const indexPath = `${outputDirectory}/index.html`;
const notFoundPath = `${outputDirectory}/404.html`;

const indexHtml = await readFile(indexPath, 'utf8');

if (!indexHtml.includes(expectedBaseHref)) {
  throw new Error(`Invalid base href in ${indexPath}. Expected ${expectedBaseHref}`);
}

await copyFile(indexPath, notFoundPath);

const notFoundHtml = await readFile(notFoundPath, 'utf8');
if (!notFoundHtml.includes(expectedBaseHref)) {
  throw new Error(`Invalid base href in ${notFoundPath}. Expected ${expectedBaseHref}`);
}

const bundleSources = [...indexHtml.matchAll(/<(?:script[^>]+src|link[^>]+href)=["']([^"']+)["']/g)]
  .map(([, source]) => source)
  .filter((source) => /\.(?:js|css)(?:\?|$)/.test(source));

if (bundleSources.some((source) => source.startsWith('/'))) {
  throw new Error('A JavaScript or CSS bundle is rooted at the domain instead of using the configured base href.');
}

console.log(`Pages build validated: ${indexPath} and ${notFoundPath}`);
console.log(`Bundles use relative paths and resolve below /pablo-vidal-portfolio/: ${bundleSources.length}`);
