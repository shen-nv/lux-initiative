// 模拟问题列表和对应跳转URL
const questions = [
  { text: "How is time and space perceived in dreams?", url: "faq/faq_1.html" },
  { text: "How does the Dream Tracker function?", url: "faq/faq_2.html" },
  { text: "What does recurring water represent?", url: "faq/faq_3.html" },
  { text: "What does an elevator represent in dreams?", url: "faq/faq_4.html" },
  { text: "Why does the system sometimes fail to reconstruct certain dreams?", url: "faq/faq_5.html" },
  { text: "What does a maze symbolize in dreams?", url: "faq/faq_6.html" },
  { text: "What is the 'Nightmare Loop Cycle' and how can it be interrupted?", url: "faq/faq_7.html" }
];

const searchBox = document.getElementById('faq_search-box');
const suggestions = document.getElementById('faq_suggestions');
const searchBtn = document.getElementById('faq_search-btn');

// 监听输入，动态过滤显示建议
searchBox.addEventListener('input', () => {
  const input = searchBox.value.toLowerCase();
  suggestions.innerHTML = '';
  if (!input) {
    suggestions.style.display = 'none';
    return;
  }
  const matched = questions.filter(q => q.text.toLowerCase().includes(input));
  if (matched.length === 0) {
    suggestions.style.display = 'none';
    return;
  }
  matched.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item.text;
    div.addEventListener('click', () => {
      searchBox.value = item.text;
      suggestions.style.display = 'none';
    });
    suggestions.appendChild(div);
  });
  suggestions.style.display = 'block';
});

// 点击搜索跳转
searchBtn.addEventListener('click', () => {
  const input = searchBox.value.trim();
  if (!input) return window.location.href = "404.html";
  const found = questions.find(q => q.text === input);
  if (found) {
    window.location.href = found.url;
  } else {
    window.location.href = "404.html";
  }
});

// 点击页面其他地方隐藏建议
document.addEventListener('click', (e) => {
  if (!searchBox.contains(e.target) && !suggestions.contains(e.target) && e.target !== searchBtn) {
    suggestions.style.display = 'none';
  }
});
