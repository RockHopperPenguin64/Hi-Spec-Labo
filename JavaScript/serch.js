// 仮記事データ
const articles = [
  {
    title: "Github完全攻略",
    content: "私と一緒にGithubを完全攻略しましょう！",
    image: "https://example.com/github-image.jpg",  // 画像URL
    date: "2023-04-01"  // 投稿日時
  },
  {
    title: "JavaScript入門",
    content: "JavaScriptの基本をマスターしよう！",
    image: "https://example.com/js-image.jpg",  // 画像URL
    date: "2023-05-05"  // 投稿日時
  },
  {
    title: "HTMLとCSSの基礎",
    content: "HTMLとCSSでウェブサイトを作成しよう。",
    image: "https://example.com/html-css-image.jpg",  // 画像URL
    date: "2023-06-10"  // 投稿日時
  },
];

// フォームの送信イベントをキャッチ
document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const searchQuery = document.getElementById("searchInput").value.toLowerCase();

  // 検索結果をフィルタリング
  const results = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery) || 
    article.content.toLowerCase().includes(searchQuery)
  );

  // 結果を表示
  displayResults(results);
});

// 検索結果を表示する関数
function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // 前回の結果をクリア

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p class='no-results'>該当する記事はありませんでした。</p>";
  } else {
    // 結果を日付順にソート（降順）
    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    results.forEach(result => {
      // カード要素を作成
      const card = document.createElement("div");
      card.classList.add("title-card");

      // 画像を追加
      const img = document.createElement("img");
      img.classList.add("title-card-image");
      img.src = result.image;  // 画像URL
      img.alt = result.title;   // 代替テキスト（画像が表示されないときのため）
      card.appendChild(img);

      // タイトルを追加
      const title = document.createElement("h3");
      title.classList.add("title-card-title");
      title.textContent = result.title;

      // コンテンツを追加
      const content = document.createElement("p");
      content.classList.add("title-card-content");
      content.textContent = result.content;

      // 投稿日時を追加
      const date = document.createElement("p");
      date.classList.add("title-card-date");
      date.textContent = `投稿日: ${new Date(result.date).toLocaleDateString()}`;  // フォーマットを調整

      // カードにタイトル、内容、投稿時間を追加
      card.appendChild(title);
      card.appendChild(content);
      card.appendChild(date);

      // カードを結果コンテナに追加
      resultsContainer.appendChild(card);

      // カードにフェードインアニメーションを追加
      setTimeout(() => {
        card.classList.add("fade-in");
      }, 50);
    });
  }
}
