document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".title-card");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const keyword = input.value.trim().toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector(".title-card-title")?.innerText.toLowerCase() || "";
      const content = card.querySelector(".title-card-content")?.innerText.toLowerCase() || "";

      if (title.includes(keyword) || content.includes(keyword)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });

  // 入力空にしたら全表示に戻す（神UX）
  input.addEventListener("input", () => {
    if (input.value === "") {
      cards.forEach(card => {
        card.style.display = "";
      });
    }
  });
});
