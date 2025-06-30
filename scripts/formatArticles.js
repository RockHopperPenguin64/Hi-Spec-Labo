const fs = require("fs");
const path = require("path");

const articlesDir = "./article";
const header = fs.readFileSync("./components/header.html", "utf8");
const sidebar = fs.readFileSync("./components/sidebar.html", "utf8");
const footer = fs.readFileSync("./components/footer.html", "utf8");

fs.readdirSync(articlesDir).forEach(file => {
  if (file.endsWith(".html")) {
    const filePath = path.join(articlesDir, file);
    const original = fs.readFileSync(filePath, "utf8");

    // すでに整形済みならスキップ（<html>タグがあれば整形済みと判定）
    if (original.includes("<html")) return;

    // 自動でtitleを生成（ファイル名から）
    const title = file.replace(/\.html$/, "");

    const finalHtml = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
${header}
<main>
  <div class="content">
    ${original}
  </div>
  ${sidebar}
</main>
${footer}
</body>
</html>
`;

    fs.writeFileSync(filePath, finalHtml.trim());
    console.log(`✅ ${file} formatted.`);
  }
});
