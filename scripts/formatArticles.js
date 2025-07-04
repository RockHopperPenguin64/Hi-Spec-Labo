const fs = require("fs");
const path = require("path");

const articlesDir = "./article";
const header = fs.readFileSync("./components/header.html", "utf8");
const sidebar = fs.readFileSync("./components/aside.html", "utf8");
const footer = fs.readFileSync("./components/footer.html", "utf8");

fs.readdirSync(articlesDir).forEach(file => {
  if (file.endsWith(".html")) {
    const filePath = path.join(articlesDir, file);
    const original = fs.readFileSync(filePath, "utf8");

    // すでに整形済みならスキップ（<html>タグがあれば整形済みと判定）
    if (original.includes("<html")) return;

    // 自動でtitleを生成（ファイル名から）
    const filePath = path.join("article", file);

    // ファイルの中身を取得
    const fileContent = fs.readFileSync(filePath, "utf8");
  
    // <h1>タグの中身を抽出
    const match = fileContent.match(/<h1[^>]*>(.*?)<\/h1>/);

    // タイトルを決定
    const title = match ? match[1].trim() : "無題";
    
    const finalHtml = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  
    <!-- フォント -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Klee+One&display=swap" rel="stylesheet">

    <!-- ファビコン -->
    <link rel="icon" href="../img/favicon.jpeg" type="jpeg">

    <!-- CSS -->
    <link rel="stylesheet" href="../css/article.css">
    <link rel="stylesheet" href="../css/global.css"> 
    <link rel="stylesheet" href="../css/aside.css">

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
