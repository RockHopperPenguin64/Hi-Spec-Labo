const fs = require('fs');
const path = require('path');
const glob = require('glob');

const BASE_URL = 'https://rockhopperpenguin64.github.io/Hi-Spec-Labo/';

// 検索対象のディレクトリ（必要なら他のフォルダも追加OK）
const targetDirs = ['.', 'article'];

// .htmlファイルをすべて取得
let files = [];
targetDirs.forEach(dir => {
  const found = glob.sync(`${dir}/**/*.html`, { ignore: '**/node_modules/**' });
  files = files.concat(found);
});

// sitemap.xmlの中身を組み立てる
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

files.forEach(file => {
  const relativePath = path.relative('.', file).replace(/\\/g, '/');
  const url = `${BASE_URL}/${relativePath}`;
  sitemap += `  <url>\n    <loc>${url}</loc>\n  </url>\n`;
});

sitemap += `</urlset>`;

// 書き出し
fs.writeFileSync('sitemap.xml', sitemap);
console.log('✅ sitemap.xml を生成しました');
